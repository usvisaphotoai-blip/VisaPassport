import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import InConverterOrder from "@/models/InConverterOrder";
import { getPrintSheetPrice, toMinorUnits } from "@/lib/print-sheet-pricing";
import { IN_CONVERTER_PRODUCT } from "@/lib/in-converter-checkout";

export async function POST(req: NextRequest) {
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay Keys");
      return NextResponse.json({ error: "Server configuration error: Missing payment keys" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const short = (v: unknown) => (typeof v === "string" ? v.slice(0, 40) : undefined);

    // Price always comes from the server-side table, never from the client
    const price = getPrintSheetPrice(short(body.currency));
    const preset = short(body.preset);
    const gaClientId = short(body.gaClientId);

    await dbConnect();
    const order = await InConverterOrder.create({
      status: "pending_payment",
      amount: price.amount,
      currency: price.currency,
      preset,
    });

    const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    const rzpOrder = await razorpay.orders.create({
      amount: toMinorUnits(price),
      currency: price.currency,
      receipt: `inconv_${order._id.toString()}`,
      notes: {
        product: IN_CONVERTER_PRODUCT,
        inConverterOrderId: order._id.toString(),
        ...(gaClientId ? { gaClientId } : {}),
      },
    });

    order.razorpayOrderId = rzpOrder.id;
    await order.save();

    return NextResponse.json({
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      inConverterOrderId: order._id.toString(),
    });
  } catch (error: any) {
    console.error("In-Converter Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
