// Google Ads purchase conversion, fired through the Google tag loaded in app/layout.tsx.
// Call only after the payment has been verified server-side.
export function trackAdsPurchaseConversion({
  transactionId,
  value,
  currency,
}: {
  transactionId: string;
  value: number;
  currency: string;
}) {
  if (typeof window === "undefined" || typeof (window as any).gtag !== "function") return;
  try {
    (window as any).gtag("event", "ads_conversion_PURCHASE_1", {
      transaction_id: transactionId,
      value,
      currency: currency.toUpperCase(),
    });
  } catch (err) {
    console.warn("[Ads] Failed to dispatch purchase conversion:", err);
  }
}
