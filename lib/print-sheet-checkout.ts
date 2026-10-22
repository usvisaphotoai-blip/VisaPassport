// Client-side Razorpay checkout for the HD print sheet. Pricing lives in
// lib/print-sheet-pricing.ts; the server re-prices every order.

import { trackAdsPurchaseConversion } from "@/lib/ads-conversion";
import {
  PRINT_SHEET_PRODUCT,
  PRINT_SHEET_PRODUCT_NAME,
  PrintSheetPrice,
} from "@/lib/print-sheet-pricing";

// One payment unlocks HD downloads in every print sheet tool for the rest of the session
export const HD_UNLOCK_KEY = "pixpassport_print_sheet_hd";

export function readHdUnlock(): boolean {
  try {
    return typeof window !== "undefined" && !!sessionStorage.getItem(HD_UNLOCK_KEY);
  } catch {
    return false;
  }
}

export function saveHdUnlock(orderId: string) {
  try {
    sessionStorage.setItem(HD_UNLOCK_KEY, orderId);
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
 * Opens Razorpay for the HD print sheet. Resolves with the print sheet order id once the
 * payment is verified server-side, or null if the buyer closes the window. Throws on failure.
 */
export async function buyPrintSheetHd(options: {
  price: PrintSheetPrice;
  paperSize: string;
  photoSize: string;
}): Promise<string | null> {
  const { price, paperSize, photoSize } = options;
  if (!(await loadRazorpay())) {
    throw new Error("Payment window failed to load. Please check your connection and try again.");
  }
  const gaClientId = await getGaClientId();

  const res = await fetch("/api/print-sheet/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currency: price.currency, paperSize, photoSize, gaClientId }),
  });
  const order = await res.json();
  if (!res.ok) throw new Error(order.error || "Couldn't start the payment. Please try again.");

  const gaItem = {
    item_id: PRINT_SHEET_PRODUCT,
    item_name: PRINT_SHEET_PRODUCT_NAME,
    price: price.amount,
    quantity: 1,
    item_category: "Print Sheet",
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
      description: PRINT_SHEET_PRODUCT_NAME,
      image: "https://pixpassport.com/logo.png",
      theme: { color: "#4d7c0f" },
      modal: { ondismiss: () => resolve(null) },
      handler: async (response: RazorpayResponse) => {
        try {
          const verifyRes = await fetch("/api/print-sheet/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, printSheetOrderId: order.printSheetOrderId, gaClientId }),
          });
          if (!verifyRes.ok) {
            throw new Error("We couldn't confirm your payment. Please contact support with your payment ID.");
          }
          saveHdUnlock(order.printSheetOrderId);
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
          resolve(order.printSheetOrderId);
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
