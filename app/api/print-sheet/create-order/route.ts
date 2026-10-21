import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import PrintSheetOrder from "@/models/PrintSheetOrder";
import {
  PRINT_SHEET_PRODUCT,
  getPrintSheetPrice,
  toMinorUnits,
} from "@/lib/print-sheet-pricing";

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
    const paperSize = short(body.paperSize);
    const photoSize = short(body.photoSize);
    const gaClientId = short(body.gaClientId);

    await dbConnect();
    const sheetOrder = await PrintSheetOrder.create({
      status: "pending_payment",
      amount: price.amount,
      currency: price.currency,
      paperSize,
      photoSize,
    });

    const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    const order = await razorpay.orders.create({
      amount: toMinorUnits(price),
      currency: price.currency,
      receipt: `sheet_${sheetOrder._id.toString()}`,
      notes: {
        product: PRINT_SHEET_PRODUCT,
        printSheetOrderId: sheetOrder._id.toString(),
        ...(gaClientId ? { gaClientId } : {}),
      },
    });

    sheetOrder.razorpayOrderId = order.id;
    await sheetOrder.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      printSheetOrderId: sheetOrder._id.toString(),
    });
  } catch (error: any) {
    console.error("Print Sheet Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
