/**
 * Read-only Razorpay REST lookups used to confirm payments server-side
 * (reconciliation, and product flows whose browser verify only sends IDs).
 */

function getAuthHeader(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

async function razorpayGet(path: string, timeoutMs = 8000): Promise<any | null> {
  const auth = getAuthHeader();
  if (!auth) return null;
  try {
    const res = await fetch(`https://api.razorpay.com/v1${path}`, {
      headers: { Authorization: auth },
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[RAZORPAY LOOKUP] GET ${path} failed:`, err);
    return null;
  }
}

/** Fetch a single Razorpay payment entity (pay_xxx). */
export async function fetchRazorpayPayment(paymentId: string, timeoutMs?: number): Promise<any | null> {
  if (!paymentId || !paymentId.startsWith("pay_")) return null;
  return razorpayGet(`/payments/${paymentId}`, timeoutMs);
}

/** Return the captured payment entity for a Razorpay order, or null if none was captured. */
export async function fetchCapturedPaymentForOrder(orderId: string, timeoutMs?: number): Promise<any | null> {
  if (!orderId || !orderId.startsWith("order_")) return null;
  const data = await razorpayGet(`/orders/${orderId}/payments`, timeoutMs);
  const items: any[] = data?.items || [];
  return items.find((p) => p.status === "captured") || null;
}
