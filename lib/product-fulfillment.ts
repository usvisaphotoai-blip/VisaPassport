import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import PrintSheetOrder from "@/models/PrintSheetOrder";
import InConverterOrder from "@/models/InConverterOrder";
import AuditEvent from "@/models/AuditEvent";
import Invoice from "@/models/Invoice";
import { claimEmailSend, releaseEmailClaim, countFailedEmailSends, logAuditEvent } from "@/lib/audit";
import { withKeyedLock } from "@/lib/keyed-lock";
import { autoGenerateAndStoreInvoice, sendOfficialInvoiceEmail } from "@/lib/invoice-automation";
import { fetchRazorpayPayment } from "@/lib/razorpay-lookup";
import { PRINT_SHEET_PRODUCT_NAME } from "@/lib/print-sheet-pricing";
import { IN_CONVERTER_PRODUCT_NAME } from "@/lib/in-converter-checkout";

export type ProductKind = "print_sheet" | "in_converter";

const MAX_EMAIL_FAILURES = 3;

const PRODUCTS: Record<ProductKind, { model: any; documentType: string; name: string; description: string; noteKey: string }> = {
  print_sheet: {
    model: PrintSheetOrder,
    documentType: "print-sheet",
    name: PRINT_SHEET_PRODUCT_NAME,
    description: "High-resolution, watermark-free printable passport photo sheet (custom paper and photo size).",
    noteKey: "printSheetOrderId",
  },
  in_converter: {
    model: InConverterOrder,
    documentType: "in-converter",
    name: IN_CONVERTER_PRODUCT_NAME,
    description: "Instant download of the converted passport-size photo, no waiting period.",
    noteKey: "inConverterOrderId",
  },
};

export interface FulfillProductPaymentOptions {
  kind: ProductKind;
  /** PrintSheetOrder / InConverterOrder _id */
  productOrderId: string;
  razorpayPaymentId: string;
  /** Razorpay payment entity when known (webhook / reconcile); fetched from Razorpay otherwise */
  paymentEntity?: any;
  actor: string;
}

/**
 * Idempotent fulfillment for one-off product payments (HD print sheet, instant download):
 * mark the product order paid → Order/Payment records → tax invoice → receipt email.
 * The customer email comes from Razorpay checkout, since these flows don't collect one.
 * Returns whether this call was the one that flipped the order to paid (for GA4).
 */
export async function fulfillProductPayment(opts: FulfillProductPaymentOptions): Promise<{ success: boolean; firstToMarkPaid: boolean; error?: string }> {
  if (!PRODUCTS[opts.kind] || !mongoose.isValidObjectId(opts.productOrderId)) {
    return { success: false, firstToMarkPaid: false, error: "Invalid order" };
  }
  return withKeyedLock(`product:${opts.productOrderId}`, () => fulfill(opts));
}

async function fulfill(opts: FulfillProductPaymentOptions): Promise<{ success: boolean; firstToMarkPaid: boolean; error?: string }> {
  const product = PRODUCTS[opts.kind];
  const tag = `[PRODUCT FULFILL:${opts.kind}:${opts.actor}]`;

  await dbConnect();

  const transitioned = await product.model.findOneAndUpdate(
    { _id: opts.productOrderId, status: { $ne: "paid" } },
    { $set: { status: "paid", razorpayPaymentId: opts.razorpayPaymentId } },
    { returnDocument: "after" }
  );
  const firstToMarkPaid = Boolean(transitioned);
  const productOrder = transitioned || (await product.model.findById(opts.productOrderId));
  if (!productOrder) return { success: false, firstToMarkPaid: false, error: "Order not found" };

  try {
    // Repeat calls (webhook after verify, reconcile) stop early once everything is done
    if (!firstToMarkPaid) {
      const existing: any = await Payment.findOne({ gatewayPaymentId: opts.razorpayPaymentId }).lean();
      if (existing?.email && (await isProductFulfilled(existing))) {
        return { success: true, firstToMarkPaid };
      }
    }

    const entity = opts.paymentEntity || (await fetchRazorpayPayment(opts.razorpayPaymentId));
    const razorpayOrderId: string | undefined = entity?.order_id || productOrder.razorpayOrderId;
    const email: string | undefined = entity?.email || undefined;
    const orderKey = razorpayOrderId || `${opts.kind}_${productOrder._id}`;

    // Permanent Order record (upsert: webhook and browser verify often arrive together)
    const order: any = await Order.findOneAndUpdate(
      { "metadata.razorpayOrderId": orderKey },
      {
        ...(email ? { $set: { guestEmail: email } } : {}),
        $setOnInsert: {
          orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          ...(email ? {} : { guestEmail: "customer@pixpassport.com" }),
          documentType: product.documentType,
          amount: productOrder.amount,
          currency: productOrder.currency,
          status: "paid",
          metadata: { razorpayOrderId: orderKey, [product.noteKey]: productOrder._id.toString() },
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    // Permanent Payment record — carries the product line item for the invoice
    const payment: any = await Payment.findOneAndUpdate(
      { gatewayPaymentId: opts.razorpayPaymentId },
      {
        ...(email ? { $set: { email } } : {}),
        $setOnInsert: {
          orderId: order._id,
          gateway: "razorpay",
          gatewayOrderId: orderKey,
          amount: productOrder.amount,
          currency: productOrder.currency,
          status: "captured",
          method: entity?.method,
          metadata: {
            notes: entity?.notes,
            product: { kind: opts.kind, orderId: productOrder._id.toString(), name: product.name, description: product.description },
          },
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    const inv = await autoGenerateAndStoreInvoice({
      paymentIdOrGatewayId: payment._id.toString(),
      userEmail: email,
      actor: opts.actor,
    });
    if (!inv.success || !inv.invoice) {
      console.error(`${tag} Invoice generation failed:`, inv.error);
      return { success: true, firstToMarkPaid };
    }

    if (!email) {
      console.warn(`${tag} No customer email from Razorpay for ${opts.razorpayPaymentId}, skipping receipt.`);
      return { success: true, firstToMarkPaid };
    }
    if ((await countFailedEmailSends({ orderId: order._id }, "tax_invoice")) >= MAX_EMAIL_FAILURES) {
      return { success: true, firstToMarkPaid };
    }

    if (await claimEmailSend({ orderId: order._id }, "tax_invoice", opts.actor)) {
      const mailRes = await sendOfficialInvoiceEmail({
        invoice: inv.invoice,
        pdfBuffer: inv.pdfBuffer,
        cloudinaryUrl: inv.cloudinaryUrl,
        recipientEmail: email,
      });
      if (!mailRes.success) {
        console.error(`${tag} Receipt email failed:`, mailRes.error);
        await releaseEmailClaim({ orderId: order._id }, "tax_invoice");
        await logAuditEvent({
          eventType: "email_sent",
          orderId: order._id,
          paymentId: payment._id,
          actor: opts.actor,
          metadata: { recipient: email, template: "tax_invoice", status: "failed", error: String(mailRes.error) },
        });
      }
    }
  } catch (err: any) {
    // The product is already unlocked; invoice / email will be retried by the webhook or reconcile job
    console.error(`${tag} Post-payment processing error:`, err);
  }

  return { success: true, firstToMarkPaid };
}

/** Invoice exists and the receipt was sent (or has failed too often to retry). */
async function isProductFulfilled(payment: any): Promise<boolean> {
  const [invoiced, claimed, failures] = await Promise.all([
    Invoice.exists({ gatewayPaymentId: payment.gatewayPaymentId }),
    AuditEvent.exists({ eventType: "email_sent", orderId: payment.orderId, "metadata.template": "tax_invoice", "metadata.status": { $ne: "failed" } }),
    countFailedEmailSends({ orderId: payment.orderId }, "tax_invoice"),
  ]);
  return Boolean(invoiced) && (Boolean(claimed) || failures >= MAX_EMAIL_FAILURES);
}
