import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import InConverterOrder from "@/models/InConverterOrder";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { fulfillProductPayment } from "@/lib/product-fulfillment";
import { IN_CONVERTER_PRODUCT, IN_CONVERTER_PRODUCT_NAME } from "@/lib/in-converter-checkout";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      inConverterOrderId,
      gaClientId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !inConverterOrderId) {
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
    const order = await InConverterOrder.findById(inConverterOrderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Payment does not match this order" }, { status: 400 });
    }

    // Marks paid, records the payment, generates the invoice and emails the receipt
    const { firstToMarkPaid } = await fulfillProductPayment({
      kind: "in_converter",
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
            item_id: IN_CONVERTER_PRODUCT,
            item_name: IN_CONVERTER_PRODUCT_NAME,
            price: order.amount,
            quantity: 1,
            item_category: "Instant Download",
          },
        ],
      }).catch((gaErr) => console.error("[IN-CONVERTER VERIFY] GA4 event warning:", gaErr));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("In-Converter Verify Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
