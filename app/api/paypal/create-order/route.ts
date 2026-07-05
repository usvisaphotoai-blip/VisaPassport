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
    let localPrice = await getLocalPrice(basePrice, currencyOverride, isExpert);

    const PAYPAL_SUPPORTED_CURRENCIES = [
      "AUD", "BRL", "CAD", "CNY", "CZK", "DKK", "EUR", "HKD", "HUF", "ILS",
      "JPY", "MYR", "MXN", "TWD", "NZD", "NOK", "PHP", "PLN", "GBP", "RUB",
      "SGD", "SEK", "CHF", "THB", "USD",
    ];

    if (!PAYPAL_SUPPORTED_CURRENCIES.includes(localPrice.currency)) {
      // Fallback to USD if the resolved local currency is not supported by PayPal
      localPrice = await getLocalPrice(basePrice, "USD", isExpert);
    }

    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: photoId,
          amount: {
            currency_code: localPrice.currency,
            value: localPrice.amount.toFixed(localPrice.decimals ?? 2),
          },
          description: isExpert ? "Expert Photo Review" : "Digital Document Photo",
          custom_id: JSON.stringify({ photoId }),
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
      const errorMessage = data.details?.[0]?.description || data.message || "Failed to create PayPal order";
      throw new Error(errorMessage);
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
      { error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
