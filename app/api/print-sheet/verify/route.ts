import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import PrintSheetOrder from "@/models/PrintSheetOrder";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { fulfillProductPayment } from "@/lib/product-fulfillment";
import { PRINT_SHEET_PRODUCT, PRINT_SHEET_PRODUCT_NAME } from "@/lib/print-sheet-pricing";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      printSheetOrderId,
      gaClientId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !printSheetOrderId) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    // Verify signature
    const generated = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const expectedBuf = Buffer.from(generated, "hex");
    const signatureBuf = Buffer.from(String(razorpay_signature), "hex");
    if (expectedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(expectedBuf, signatureBuf)) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await dbConnect();
    const order = await PrintSheetOrder.findById(printSheetOrderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Payment does not match this order" }, { status: 400 });
    }

    // Marks paid, records the payment, generates the invoice and emails the receipt
    const { firstToMarkPaid } = await fulfillProductPayment({
      kind: "print_sheet",
      productOrderId: order._id.toString(),
      razorpayPaymentId: razorpay_payment_id,
      actor: "system",
    });

    // Server-side GA4 purchase as a backup to the client event (once per order)
    if (firstToMarkPaid) {
      sendGA4PurchaseEvent({
        clientId: gaClientId,
        transactionId: razorpay_payment_id,
        amount: order.amount,
        currency: order.currency,
        items: [
          {
            item_id: PRINT_SHEET_PRODUCT,
            item_name: PRINT_SHEET_PRODUCT_NAME,
            price: order.amount,
            quantity: 1,
            item_category: "Print Sheet",
          },
        ],
      }).catch((gaErr) => console.error("[PRINT SHEET VERIFY] GA4 event warning:", gaErr));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Print Sheet Verify Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
