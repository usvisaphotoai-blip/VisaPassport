import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function POST(req: Request) {
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay Keys");
      return NextResponse.json({ error: "Server configuration error: Missing payment keys" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });


    const session = await getServerSession(authOptions);

    const { photoId, currencyOverride, guestEmail } = await req.json();

    if (!photoId) {
      return NextResponse.json({ error: "Missing photoId" }, { status: 400 });
    }

    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (photo.status === "paid") {
      return NextResponse.json({ error: "Photo is already paid for" }, { status: 400 });
    }

    const { getSpecById } = await import("@/lib/specs");
    const spec = getSpecById(photo.documentType);
    const basePrice = spec?.price || 5.99;

    // Get localized price (Allows client override for currency)
    const { getLocalPrice } = await import("@/lib/currency");
    const localPrice = await getLocalPrice(basePrice, currencyOverride);

    // Razorpay expects amount in smallest currency unit (e.g. cents, paise)
    // Most currencies use 2 decimal places, but some like JPY don't.
    // Setting amount to Math.round(amount * 100) covers USD, EUR, GBP, INR safely.
    let amountUnit = 100;
    if (localPrice.currency === 'JPY') amountUnit = 1;
    
    const amount = Math.round(localPrice.amount * amountUnit);
    const currency = localPrice.currency;

    const options = {
      amount,
      currency,
      receipt: `receipt_${photoId}`,
      notes: {
        photoId,
        ...((session?.user as any)?.id ? { userId: (session?.user as any).id } : {}),
        ...(guestEmail ? { guestEmail } : {}),
      },
    };

    const order = await razorpay.orders.create(options);

    // Update photo with order ID and link to user or email
    photo.razorpayOrderId = order.id;
    if (session && session.user) {
      // @ts-ignore
      photo.userId = session.user.id;
      // Store user email as guestEmail for reliable delivery fallback
      if (session.user.email) {
        photo.guestEmail = session.user.email;
      }
    } else if (guestEmail) {
      photo.guestEmail = guestEmail;
    }
    await photo.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Payment Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
