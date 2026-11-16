import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import BusinessOrder from "@/models/BusinessOrder";
import { fulfillProductPayment } from "@/lib/product-fulfillment";
import { activateBusinessOrder } from "@/lib/business-fulfillment";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { BUSINESS_PRODUCT } from "@/lib/business-plans";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      businessOrderId,
      gaClientId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !mongoose.isValidObjectId(businessOrderId)) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

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
    const order = await BusinessOrder.findById(businessOrderId).select("+onboardingToken");
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Payment does not match this order" }, { status: 400 });
    }

    // Marks paid, records the payment, generates the tax invoice and emails the receipt
    const { firstToMarkPaid } = await fulfillProductPayment({
      kind: "business_plan",
      productOrderId: order._id.toString(),
      razorpayPaymentId: razorpay_payment_id,
      actor: "system",
    });

    // Starts the 30-day period and sends sales + welcome emails (once)
    await activateBusinessOrder(order._id.toString()).catch((err) =>
      console.error("[BUSINESS] Activation error:", err)
    );

    if (firstToMarkPaid) {
      sendGA4PurchaseEvent({
        clientId: gaClientId,
        transactionId: razorpay_payment_id,
        amount: order.amount,
        currency: order.currency,
        items: [
          {
            item_id: `${BUSINESS_PRODUCT}_${order.planId}`,
            item_name: order.planName,
            price: order.amount,
            quantity: 1,
            item_category: "Business Plan",
          },
        ],
      }).catch((gaErr) => console.error("[BUSINESS] GA4 warning:", gaErr));
    }

    return NextResponse.json({
      success: true,
      businessOrderId: order._id.toString(),
      onboardingToken: order.onboardingToken,
      planName: order.planName,
      email: order.billing.email,
      contactName: order.billing.contactName,
      companyName: order.billing.companyName,
    });
  } catch (error) {
    console.error("[BUSINESS] Verify error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
