import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

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

    const { photoId, currencyOverride, isExpert, guestEmail, gaClientId, locale: rawLocale } = await req.json();

    // Language of the page the customer is buying from — drives the email language
    const { normalizeEmailLocale, localeFromReferer } = await import("@/lib/email-templates/email-i18n");
    const locale = rawLocale ? normalizeEmailLocale(rawLocale) : (localeFromReferer(req.headers.get("referer")) || "en");

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
    const basePrice = isExpert ? 9.99 : (spec?.price || 6.99);

    // Get localized price (Allows validated client override for currency)
    const { getLocalPrice } = await import("@/lib/currency");
    const validatedOverride = typeof currencyOverride === "string" && currencyOverride.trim().length === 3
      ? currencyOverride.trim().toUpperCase()
      : undefined;
    const localPrice = await getLocalPrice(basePrice, validatedOverride, isExpert);

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
        ...(gaClientId ? { gaClientId } : {}),
        priceVariant: localPrice.variant || "A",
        locale,
      },
    };

    const order = await razorpay.orders.create(options);

    const cleanGuestEmail = typeof guestEmail === "string" ? guestEmail.trim() : "";
    const customerEmail = (cleanGuestEmail || session?.user?.email || "").trim();

    // Create permanent Order record
    const permanentOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      userId: (session?.user as any)?.id || undefined,
      guestEmail: customerEmail || "guest@pixpassport.com",
      documentType: photo.documentType,
      isExpert: Boolean(isExpert),
      amount: amount / amountUnit,
      currency: currency,
      status: "pending",
      photoId: photo._id,
      metadata: {
        razorpayOrderId: order.id,
        receipt: options.receipt,
        gaClientId,
        priceVariant: localPrice.variant || "A",
      },
    });

    // Create permanent Payment record
    await Payment.create({
      orderId: permanentOrder._id,
      photoId: photo._id,
      gateway: "razorpay",
      gatewayOrderId: order.id,
      amount: amount / amountUnit,
      currency: currency,
      status: "created",
      email: customerEmail,
      metadata: {
        notes: options.notes,
      },
    });

    // Update photo with order ID and link to user or email
    photo.razorpayOrderId = order.id;
    photo.orderId = permanentOrder._id;
    if (session && session.user) {
      // @ts-ignore
      photo.userId = session.user.id;
      if (cleanGuestEmail) {
        photo.guestEmail = cleanGuestEmail;
      } else if (session.user.email) {
        photo.guestEmail = session.user.email;
      }
    } else if (cleanGuestEmail) {
      photo.guestEmail = cleanGuestEmail;
    }
    photo.isExpert = isExpert;
    photo.locale = locale;
    await photo.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      priceVariant: localPrice.variant || "A",
    });
  } catch (error: any) {
    console.error("Payment Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
