import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import BusinessOrder from "@/models/BusinessOrder";
import {
  BUSINESS_PLAN_CURRENCY,
  BUSINESS_PRODUCT,
  getBusinessPlan,
} from "@/lib/business-plans";
import { cleanText, parseBilling } from "@/lib/business-fulfillment";

export async function POST(req: NextRequest) {
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("[BUSINESS] Missing Razorpay keys");
      return NextResponse.json({ error: "Payments are temporarily unavailable. Please try again later." }, { status: 500 });
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Price always comes from the server-side plan table
    const plan = getBusinessPlan(body.planId);
    if (!plan) {
      return NextResponse.json({ error: "Please choose a plan." }, { status: 400 });
    }

    const { billing, errors } = parseBilling(body);
    if (!billing) {
      return NextResponse.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 400 });
    }
    if (body.acceptTerms !== true) {
      return NextResponse.json({ error: "Please accept the terms to continue.", fields: { acceptTerms: "Required" } }, { status: 400 });
    }

    const gaClientId = cleanText(body.gaClientId, 40);

    await dbConnect();
    const businessOrder = await BusinessOrder.create({
      status: "pending_payment",
      planId: plan.id,
      planName: plan.name,
      photoLimit: plan.photoLimit,
      amount: plan.priceUsd,
      currency: BUSINESS_PLAN_CURRENCY,
      onboardingToken: crypto.randomBytes(24).toString("hex"),
      billing,
    });

    const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    const order = await razorpay.orders.create({
      amount: Math.round(plan.priceUsd * 100),
      currency: BUSINESS_PLAN_CURRENCY,
      receipt: `biz_${businessOrder._id.toString()}`,
      notes: {
        product: BUSINESS_PRODUCT,
        plan: plan.id,
        businessOrderId: businessOrder._id.toString(),
        company: billing.companyName.slice(0, 200),
        ...(gaClientId ? { gaClientId } : {}),
      },
    });

    businessOrder.razorpayOrderId = order.id;
    await businessOrder.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      businessOrderId: businessOrder._id.toString(),
    });
  } catch (error) {
    console.error("[BUSINESS] Create order error:", error);
    return NextResponse.json({ error: "Couldn't start the payment. Please try again." }, { status: 500 });
  }
}
