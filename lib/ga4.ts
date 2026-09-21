export const GA4_MEASUREMENT_ID = "G-RJFKP2ZXNX";
export const GA4_API_SECRET = process.env.GA4_API_SECRET || "";

export interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
}

export interface GA4PurchaseParams {
  clientId?: string;
  userId?: string;
  transactionId: string;
  amount: number;
  currency: string;
  items: GA4Item[];
}

/**
 * Sends a purchase event to GA4 via the Measurement Protocol.
 */
export async function sendGA4PurchaseEvent({
  clientId,
  userId,
  transactionId,
  amount,
  currency,
  items,
}: GA4PurchaseParams) {
  if (!GA4_API_SECRET) {
    console.warn(
      "[GA4] Warning: GA4_API_SECRET is not set in environment variables. Server-side Measurement Protocol purchase event skipped. Please set GA4_API_SECRET from Google Analytics > Admin > Data Streams > Measurement Protocol API secrets."
    );
    return;
  }

  // Use provided client ID or generate a fallback GA4 formatted client ID (e.g. 123456789.1234567890)
  const effectiveClientId =
    clientId && clientId.trim().length > 0
      ? clientId.trim()
      : `${Math.floor(100000000 + Math.random() * 900000000)}.${Math.floor(Date.now() / 1000)}`;

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const payload: any = {
    client_id: effectiveClientId,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: transactionId,
          value: Number(amount) || 0,
          currency: (currency || "USD").toUpperCase(),
          items: items || [],
        },
      },
    ],
  };

  if (userId) {
    payload.user_id = userId;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[GA4] Failed to send event: ${response.status} ${errorText}`);
    } else {
      console.log(`[GA4] Purchase event sent for transaction ${transactionId} (Client ID: ${effectiveClientId})`);
    }
  } catch (error) {
    console.error("[GA4] Network error sending event:", error);
  }
}

