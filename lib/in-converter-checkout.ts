// Client-side Razorpay checkout for skipping the free-download wait on the photo
// passport size converter. Pricing is reused from lib/print-sheet-pricing.ts; the
// server re-prices every order.

import { trackAdsPurchaseConversion } from "@/lib/ads-conversion";
import { PrintSheetPrice } from "@/lib/print-sheet-pricing";

export const IN_CONVERTER_PRODUCT = "in_converter_skip_wait";
export const IN_CONVERTER_PRODUCT_NAME = "Instant Passport Photo Download";

// One payment skips the wait for the rest of the session
const SKIP_WAIT_KEY = "pixpassport_in_converter_skip_wait";

export function readSkipWaitUnlock(): boolean {
  try {
    return typeof window !== "undefined" && !!sessionStorage.getItem(SKIP_WAIT_KEY);
  } catch {
    return false;
  }
}

export function saveSkipWaitUnlock(orderId: string) {
  try {
    sessionStorage.setItem(SKIP_WAIT_KEY, orderId);
  } catch {
    // Private mode: stays unlocked until the page is reloaded
  }
}

type Gtag = (...args: unknown[]) => void;
type RazorpayResponse = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", cb: (res: { error?: { description?: string } }) => void) => void;
};
type RazorpayWindow = Window & { gtag?: Gtag; Razorpay?: new (options: object) => RazorpayInstance };

const win = () => window as RazorpayWindow;
const gtag = () => win().gtag;

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (win().Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getGaClientId = () =>
  new Promise<string>((resolve) => {
    const g = gtag();
    if (typeof g !== "function") return resolve("");
    setTimeout(() => resolve(""), 500);
    try {
      g("get", "G-RJFKP2ZXNX", "client_id", (id: string) => resolve(id || ""));
    } catch {
      resolve("");
    }
  });

/**
 * Opens Razorpay to skip the free-download wait. Resolves with the order id once the
 * payment is verified server-side, or null if the buyer closes the window. Throws on failure.
 */
export async function buySkipWait(options: { price: PrintSheetPrice; preset: string }): Promise<string | null> {
  const { price, preset } = options;
  if (!(await loadRazorpay())) {
    throw new Error("Payment window failed to load. Please check your connection and try again.");
  }
  const gaClientId = await getGaClientId();

  const res = await fetch("/api/in-converter/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currency: price.currency, preset, gaClientId }),
  });
  const order = await res.json();
  if (!res.ok) throw new Error(order.error || "Couldn't start the payment. Please try again.");

  const gaItem = {
    item_id: IN_CONVERTER_PRODUCT,
    item_name: IN_CONVERTER_PRODUCT_NAME,
    price: price.amount,
    quantity: 1,
    item_category: "Instant Download",
  };
  gtag()?.("event", "begin_checkout", { value: price.amount, currency: price.currency, items: [gaItem] });

  const Razorpay = win().Razorpay;
  if (!Razorpay) throw new Error("Payment window failed to load. Please try again.");

  return new Promise<string | null>((resolve, reject) => {
    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "PixPassport",
      description: IN_CONVERTER_PRODUCT_NAME,
      image: "https://pixpassport.com/logo.png",
      theme: { color: "#4d7c0f" },
      modal: { ondismiss: () => resolve(null) },
      handler: async (response: RazorpayResponse) => {
        try {
          const verifyRes = await fetch("/api/in-converter/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, inConverterOrderId: order.inConverterOrderId, gaClientId }),
          });
          if (!verifyRes.ok) {
            throw new Error("We couldn't confirm your payment. Please contact support with your payment ID.");
          }
          saveSkipWaitUnlock(order.inConverterOrderId);
          gtag()?.("event", "purchase", {
            transaction_id: response.razorpay_payment_id,
            value: price.amount,
            currency: price.currency,
            items: [gaItem],
          });
          trackAdsPurchaseConversion({
            transactionId: response.razorpay_payment_id,
            value: price.amount,
            currency: price.currency,
          });
          resolve(order.inConverterOrderId);
        } catch (err) {
          reject(err);
        }
      },
    });
    rzp.on("payment.failed", (response) => {
      reject(new Error(`Payment failed: ${response.error?.description || "please try again."}`));
    });
    rzp.open();
  });
}
