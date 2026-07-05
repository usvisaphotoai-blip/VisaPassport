import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { photoId, currencyOverride, isExpert, guestEmail, gaClientId } = await req.json();

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
    const basePrice = isExpert ? 9.99 : (spec?.price || 5.99);

    const { getLocalPrice } = await import("@/lib/currency");
    const localPrice = await getLocalPrice(basePrice, currencyOverride, isExpert);

    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: photoId,
          amount: {
            currency_code: localPrice.currency,
            value: localPrice.amount.toFixed(2),
          },
          description: isExpert ? "Expert Photo Review" : "Digital Document Photo",
          custom_id: JSON.stringify({
            photoId,
            userId: session?.user?.email || guestEmail,
            isExpert,
            gaClientId
          }),
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      }
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal Create Order Error:", data);
      throw new Error("Failed to create PayPal order");
    }

    // Save paypalOrderId to DB
    photo.paypalOrderId = data.id;
    if (session && session.user && session.user.email) {
      photo.guestEmail = session.user.email;
    } else if (guestEmail) {
      photo.guestEmail = guestEmail;
    }
    photo.isExpert = isExpert;
    await photo.save();

    return NextResponse.json({
      orderId: data.id,
      amount: localPrice.amount.toFixed(2),
      currency: localPrice.currency,
    });
  } catch (error: any) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
