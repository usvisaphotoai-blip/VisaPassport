import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Dispute from "@/models/Dispute";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { logAuditEvent, claimEmailSend, releaseEmailClaim } from "@/lib/audit";
import { fulfillPhotoPayment } from "@/lib/photo-fulfillment";
import { fulfillProductPayment } from "@/lib/product-fulfillment";
import { PRINT_SHEET_PRODUCT, PRINT_SHEET_PRODUCT_NAME } from "@/lib/print-sheet-pricing";
import { IN_CONVERTER_PRODUCT, IN_CONVERTER_PRODUCT_NAME } from "@/lib/in-converter-checkout";
import { autoGenerateAndStoreInvoice } from "@/lib/invoice-automation";
import { activateBusinessOrder } from "@/lib/business-fulfillment";
import { formatCurrency, SUPPORTED_CURRENCIES } from "@/lib/currency-formatter";
import { getPaymentFailureInfo, renderPaymentFailedEmail } from "@/lib/payment-failure";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expectedSigBuf = Buffer.from(expectedSignature, "hex");
    const signatureBuf = Buffer.from(signature, "hex");

    if (
      expectedSigBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSigBuf, signatureBuf)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment.captured or order.paid
    // Razorpay often sends order.paid which contains order and payment entities
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        // Always run fulfillment (idempotent): it also completes orders whose browser
        // verify marked the photo paid but crashed before the invoice / email.
        if (paymentEntity.id) {
          await fulfillPhotoPayment({
            photoId,
            razorpayOrderId: paymentEntity.order_id,
            razorpayPaymentId: paymentEntity.id,
            actor: "webhook",
            paymentEntity,
          });
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "paid";
          order.razorpayPaymentId = paymentEntity.id;
          await order.save();

          const customerEmail = order.email || paymentEntity.email || "customer@pixpassport.com";

          // Permanent Order record for Expert Order
          let permanentOrder = await Order.findOne({
            $or: [
              { "metadata.expertOrderId": expertOrderId },
              { "metadata.razorpayOrderId": paymentEntity.order_id },
            ],
          });

          if (permanentOrder) {
            permanentOrder.status = "paid";
            await permanentOrder.save();
          } else {
            permanentOrder = await Order.create({
              orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
              guestEmail: customerEmail,
              documentType: "expert-photo-edit",
              isExpert: true,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : 9.99,
              currency: paymentEntity.currency || "USD",
              status: "paid",
              metadata: {
                expertOrderId,
                razorpayOrderId: paymentEntity.order_id,
              },
            });
          }

          // Permanent Payment record
          let permanentPayment = await Payment.findOne({ gatewayPaymentId: paymentEntity.id });
          if (permanentPayment) {
            permanentPayment.status = "captured";
            permanentPayment.orderId = permanentOrder._id;
            await permanentPayment.save();
          } else {
            permanentPayment = await Payment.create({
              orderId: permanentOrder._id,
              gateway: "razorpay",
              gatewayOrderId: paymentEntity.order_id || `expert_${expertOrderId}`,
              gatewayPaymentId: paymentEntity.id,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : permanentOrder.amount,
              currency: paymentEntity.currency || permanentOrder.currency,
              status: "captured",
              method: paymentEntity.method,
              email: customerEmail,
              metadata: paymentEntity,
            });
          }

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: expertOrderId,
                  item_name: "Expert Manual Photo Edit",
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: "Expert Edit",
                },
              ],
            });
          }

          // Auto-generate invoice silently in background and upload to Cloudinary for Expert Order
          let expertInvoiceData: any = null;
          let expertInvoicePdfBuffer: Buffer | undefined = undefined;
          let expertInvoiceCloudinaryUrl: string | undefined = undefined;

          try {
            const invoiceAutoRes = await autoGenerateAndStoreInvoice({
              paymentIdOrGatewayId: paymentEntity.id || permanentPayment._id.toString(),
              userEmail: customerEmail,
              actor: "webhook",
            });

            if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
              expertInvoiceData = invoiceAutoRes.invoice;
              expertInvoicePdfBuffer = invoiceAutoRes.pdfBuffer;
              expertInvoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
              console.log(`[WEBHOOK] Expert background invoice created: ${expertInvoiceData.invoiceNumber}, Cloudinary: ${expertInvoiceCloudinaryUrl || "Local"}`);
            }
          } catch (invErr) {
            console.error("[WEBHOOK] Expert background invoice generation warning (non-fatal):", invErr);
          }

          const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
          const expertInvoicePdfDownloadUrl = expertInvoiceCloudinaryUrl || (expertInvoiceData ? `${appUrl}/api/invoices/${expertInvoiceData._id}/download` : "");

          // Bug 6 fix: add atomic email dedup for expert order path (was completely missing)
          const expertEmailTemplate = "expert_confirmation";
          try {
            const canSendExpertEmail = await claimEmailSend(
              { expertOrderId },
              expertEmailTemplate,
              "webhook"
            );

            if (!canSendExpertEmail) {
              console.log(`[WEBHOOK] Expert email already claimed for order ${expertOrderId}, skipping`);
              return NextResponse.json({ success: true });
            }

            const adminHtml = `
              <h2>New Expert Edit Order (Webhook Verified)</h2>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
              ${expertInvoiceData ? `<p><strong>Tax Invoice:</strong> ${expertInvoiceData.invoiceNumber} (${expertInvoiceData.currency} ${expertInvoiceData.total})</p>` : ''}
              <p><strong>Photos to Edit:</strong></p>
              <ul>
                ${order.photos.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
              </ul>
            `;

            // Notify Admin
            const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
            if (adminEmail) {
              await sendEmail({
                to: adminEmail,
                subject: `New Expert Edit Order: ${order._id}`,
                html: adminHtml,
              });
            }

            // Notify Customer
            const expertMailRes = await sendEmail({
              to: customerEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                  <h2 style="color: #0f172a; margin: 0 0 12px;">Your Expert Edit Order is Confirmed! 🌟</h2>
                  <p>Hi there,</p>
                  <p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p>
                  
                  ${expertInvoiceData ? `
                  <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin: 20px 0;">
                    <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">🧾 Payment Receipt</h3>
                    <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">Invoice No: <strong>${expertInvoiceData.invoiceNumber}</strong> • Total: <strong>${expertInvoiceData.currency} ${expertInvoiceData.total}</strong> (PAID ✓)</p>
                    <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">${expertInvoicePdfBuffer ? 'Your official Tax Invoice PDF is attached to this email.' : 'Download your official Tax Invoice PDF using the button below.'}</p>
                    ${expertInvoicePdfDownloadUrl ? `<a href="${expertInvoicePdfDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Invoice PDF</a>` : ''}
                  </div>
                  ` : ''}

                  <p style="margin-top: 20px;">Thank you for choosing PixPassport!</p>
                </div>
              `,
              attachments: expertInvoicePdfBuffer && expertInvoiceData ? [
                {
                  filename: `Tax-Invoice-${expertInvoiceData.invoiceNumber}.pdf`,
                  content: expertInvoicePdfBuffer,
                  contentType: "application/pdf",
                }
              ] : undefined,
            });
            // Bug 8/9 fix: check sendEmail return value
            if (expertMailRes.success) {
              console.log(`[WEBHOOK] Emails sent successfully for expert order ${expertOrderId}`);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder._id,
                paymentId: permanentPayment._id,
                actor: "webhook",
                metadata: {
                  recipient: customerEmail,
                  subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
                  template: "expert_confirmation",
                  invoiceNumber: expertInvoiceData?.invoiceNumber,
                  expertOrderId,
                  status: "sent",
                },
              });
            } else {
              console.error(`[WEBHOOK] Expert email returned failure for order ${expertOrderId}:`, expertMailRes.error);
              await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder._id,
                paymentId: permanentPayment._id,
                actor: "webhook",
                metadata: {
                  recipient: customerEmail,
                  template: "expert_confirmation",
                  expertOrderId,
                  status: "failed",
                  error: String(expertMailRes.error),
                },
              });
            }
          } catch (mailError) {
            console.error(`[WEBHOOK] Failed to send emails for expert edit ${expertOrderId}:`, mailError);
            await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder._id,
              paymentId: permanentPayment._id,
              actor: "webhook",
              metadata: {
                recipient: customerEmail,
                status: "failed",
                error: String(mailError),
              },
            });
          }
        }
      } else if (notes.businessOrderId && paymentEntity.id) {
        // Business cloud plan: mark paid, record payment, invoice + receipt, then activate (once)
        await fulfillProductPayment({
          kind: "business_plan",
          productOrderId: notes.businessOrderId,
          razorpayPaymentId: paymentEntity.id,
          paymentEntity,
          actor: "webhook",
        });
        await activateBusinessOrder(notes.businessOrderId).catch((bizErr) =>
          console.error("[WEBHOOK] Business activation error:", bizErr)
        );
      } else if ((notes.printSheetOrderId || notes.inConverterOrderId) && paymentEntity.id) {
        // HD print sheet / instant-download payments: mark paid, record payment, invoice + receipt email
        const isPrintSheet = Boolean(notes.printSheetOrderId);
        const { firstToMarkPaid } = await fulfillProductPayment({
          kind: isPrintSheet ? "print_sheet" : "in_converter",
          productOrderId: notes.printSheetOrderId || notes.inConverterOrderId,
          razorpayPaymentId: paymentEntity.id,
          paymentEntity,
          actor: "webhook",
        });
        // Browser verify never ran for this order, so send the server-side GA4 purchase here
        if (firstToMarkPaid && notes.gaClientId) {
          const value = paymentEntity.amount / 10 ** (SUPPORTED_CURRENCIES[String(paymentEntity.currency).toUpperCase()]?.decimals ?? 2);
          await sendGA4PurchaseEvent({
            clientId: notes.gaClientId,
            transactionId: paymentEntity.id,
            amount: value,
            currency: paymentEntity.currency,
            items: [
              {
                item_id: isPrintSheet ? PRINT_SHEET_PRODUCT : IN_CONVERTER_PRODUCT,
                item_name: isPrintSheet ? PRINT_SHEET_PRODUCT_NAME : IN_CONVERTER_PRODUCT_NAME,
                price: value,
                quantity: 1,
                item_category: isPrintSheet ? "Print Sheet" : "Instant Download",
              },
            ],
          }).catch((gaErr) => console.error("[WEBHOOK] GA4 event warning:", gaErr));
        }
      }
    } else if (event.event === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;
      const failure = getPaymentFailureInfo(paymentEntity);
      const currency = String(paymentEntity.currency || "INR").toUpperCase();
      const amount = typeof paymentEntity.amount === "number"
        ? formatCurrency(paymentEntity.amount / 10 ** (SUPPORTED_CURRENCIES[currency]?.decimals ?? 2), currency)
        : undefined;
      const failureMeta = {
        razorpayPaymentId: paymentEntity.id,
        errorCode: paymentEntity.error_code,
        errorReason: paymentEntity.error_reason,
        errorSource: paymentEntity.error_source,
        errorStep: paymentEntity.error_step,
        errorDescription: paymentEntity.error_description,
        method: paymentEntity.method,
      };
      // One email per failed Razorpay payment attempt (webhooks are retried)
      const emailTemplate = `payment_failed:${paymentEntity.id || "unknown"}`;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';

      await dbConnect();

      if (photoId && mongoose.isValidObjectId(photoId)) {
        // Atomic: a late failed-attempt webhook must never downgrade a photo that got paid
        // (customers often retry a declined card inside the same Razorpay order)
        const photo = await Photo.findOneAndUpdate(
          { _id: photoId, status: { $ne: "paid" } },
          { $set: { status: "payment_failed" } },
          { returnDocument: "after" }
        );
        if (photo) {
          // Update permanent Order & Payment status — never overwrite paid / captured records
          if (photo.orderId) {
            await Order.findOneAndUpdate({ _id: photo.orderId, status: { $ne: "paid" } }, { status: "failed" });
          }
          if (paymentEntity.order_id) {
            await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id, status: { $ne: "captured" } }, { status: "failed" });
          }

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail && await claimEmailSend({ photoId: photo._id.toString() }, emailTemplate, "webhook")) {
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const productLabel = spec.country && !documentName.toLowerCase().includes(spec.country.toLowerCase())
              ? `${spec.country} ${documentName}`
              : documentName;
            const subject = `Payment failed: ${failure.title} — PixPassport`;

            const mailRes = await sendEmail({
              to: userEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject,
              html: renderPaymentFailedEmail({
                failure,
                productLabel,
                retryUrl: `${appUrl}/preview/${photoId}`,
                retryLabel: "Retry payment",
                amount,
                details: [
                  ["Photo", productLabel],
                  ["Size", `${spec.width_px}×${spec.height_px} px`],
                  ...(paymentEntity.id ? [["Payment ID", String(paymentEntity.id)] as [string, string]] : []),
                ],
              }),
            });

            if (!mailRes.success) {
              await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
            }
            console.log(`[WEBHOOK] Payment failed email ${mailRes.success ? "sent" : "FAILED"} for photo ${photoId} (${failure.code || "unknown reason"})`);
            await logAuditEvent({
              eventType: "email_sent",
              photoId: photo._id,
              orderId: photo.orderId,
              actor: "webhook",
              metadata: {
                recipient: userEmail,
                subject,
                template: "payment_failed",
                status: mailRes.success ? "sent" : "failed",
                ...(mailRes.success ? {} : { error: String(mailRes.error) }),
                ...failureMeta,
              },
            });
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findOneAndUpdate(
          { _id: expertOrderId, status: { $ne: "paid" } },
          { $set: { status: "payment_failed" } },
          { returnDocument: "after" }
        );
        if (order) {

          await Order.findOneAndUpdate({ "metadata.expertOrderId": expertOrderId, status: { $ne: "paid" } }, { status: "failed" });
          if (paymentEntity.order_id) {
            await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id, status: { $ne: "captured" } }, { status: "failed" });
          }

          const userEmail = order.email || paymentEntity.email;
          if (userEmail && await claimEmailSend({ expertOrderId }, emailTemplate, "webhook")) {
            const subject = `Payment failed: ${failure.title} — PixPassport Expert Edit`;

            const mailRes = await sendEmail({
              to: userEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject,
              html: renderPaymentFailedEmail({
                failure,
                productLabel: "Expert Photo Edit",
                retryUrl: `${appUrl}/expert-edit`,
                retryLabel: "Retry payment",
                amount,
                details: [
                  ["Photos uploaded", String(order.photos?.length || 0)],
                  ...(paymentEntity.id ? [["Payment ID", String(paymentEntity.id)] as [string, string]] : []),
                ],
              }),
            });

            if (!mailRes.success) {
              await releaseEmailClaim({ expertOrderId }, emailTemplate);
            }
            console.log(`[WEBHOOK] Payment failed email ${mailRes.success ? "sent" : "FAILED"} for expert order ${expertOrderId} (${failure.code || "unknown reason"})`);
            await logAuditEvent({
              eventType: "email_sent",
              actor: "webhook",
              metadata: {
                recipient: userEmail,
                expertOrderId,
                subject,
                template: "expert_payment_failed",
                status: mailRes.success ? "sent" : "failed",
                ...(mailRes.success ? {} : { error: String(mailRes.error) }),
                ...failureMeta,
              },
            });
          }
        }
      }
    } else if (event.event === "refund.created" || event.event === "refund.processed" || event.event === "payment.refunded") {
      const refundEntity = event.payload?.refund?.entity || {};
      const paymentEntity = event.payload?.payment?.entity || {};
      const paymentId = refundEntity.payment_id || paymentEntity.id;

      await dbConnect();
      if (paymentId) {
        const payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment) {
          payment.status = "refunded";
          await payment.save();

          if (payment.orderId) {
            await Order.findByIdAndUpdate(payment.orderId, { status: "refunded" });
          }
        }

        // Permanent Audit Event for Refund
        await logAuditEvent({
          eventType: "refund",
          paymentId: payment?._id,
          orderId: payment?.orderId,
          photoId: payment?.photoId,
          actor: "webhook",
          metadata: {
            gatewayRefundId: refundEntity.id,
            gatewayPaymentId: paymentId,
            amount: refundEntity.amount ? refundEntity.amount / 100 : undefined,
            currency: refundEntity.currency,
            reason: refundEntity.notes?.reason || "Refund processed via Razorpay",
            status: refundEntity.status || "processed",
          },
        });
        console.log(`[WEBHOOK] Processed refund for payment ${paymentId}`);
      }
    } else if (event.event?.startsWith("dispute.")) {
      const disputeEntity = event.payload?.dispute?.entity || {};
      const paymentId = disputeEntity.payment_id;

      await dbConnect();
      let payment = null;
      let order = null;
      if (paymentId) {
        payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment && payment.orderId) {
          order = await Order.findById(payment.orderId);
          if (order) {
            order.status = "disputed";
            await order.save();
          }
        }
      }

      const disputeStatus = event.event === "dispute.won" ? "won" : event.event === "dispute.lost" ? "lost" : event.event === "dispute.closed" ? "closed" : "open";

      // Permanent Dispute record
      const dispute = await Dispute.create({
        orderId: order?._id,
        paymentId: payment?._id,
        gatewayDisputeId: disputeEntity.id,
        amount: disputeEntity.amount ? disputeEntity.amount / 100 : 0,
        currency: disputeEntity.currency || "USD",
        reason: disputeEntity.reason_code || disputeEntity.reason_description || "Dispute received",
        status: disputeStatus,
        evidence: disputeEntity,
      });

      // Permanent Audit Event for Dispute
      await logAuditEvent({
        eventType: "dispute",
        disputeId: dispute._id,
        orderId: order?._id,
        paymentId: payment?._id,
        photoId: payment?.photoId,
        actor: "webhook",
        metadata: {
          gatewayDisputeId: disputeEntity.id,
          event: event.event,
          status: disputeStatus,
          amount: disputeEntity.amount ? disputeEntity.amount / 100 : undefined,
          reason: disputeEntity.reason_code || disputeEntity.reason_description,
        },
      });
      console.log(`[WEBHOOK] Processed dispute ${disputeEntity.id} for payment ${paymentId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
