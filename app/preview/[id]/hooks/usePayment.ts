import { useState } from "react";
import { useRouter } from "next/navigation";

export interface LocalPrice {
  currency: string;
  amount: number;
  formatted: string;
  symbol: string;
}

interface PaymentOptions {
  photoId: string;
  localPrice: LocalPrice;
  isExpert?: boolean;
  guestEmail: string;
  status: "authenticated" | "loading" | "unauthenticated";
  session: any;
  setHasPaid: (paid: boolean) => void;
}

export function usePayment({
  photoId,
  localPrice,
  isExpert,
  guestEmail,
  status,
  session,
  setHasPaid,
}: PaymentOptions) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initializeRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!(await initializeRazorpay())) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoId,
          currencyOverride: localPrice.currency,
          isExpert,
          guestEmail: status === "authenticated" ? undefined : guestEmail,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // Log Razorpay open event
      const sid = typeof window !== "undefined" ? sessionStorage.getItem("usvisa_analytics_session") : null;
      if (sid) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid, type: "razorpay_open" }),
        }).catch(() => {});
      }

      // @ts-ignore
      new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PixPassport",
        description: "Get your passport or visa photo verified & corrected instantly.",
        image: "https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, photoId }),
          });
          if (verifyRes.ok) {
            status === "authenticated"
              ? router.push("/dashboard")
              : setHasPaid(true);
          } else alert("Payment verification failed");
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || guestEmail,
        },
        theme: { color: "#84cc16" },
      }).open();
    } catch {
      alert("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePayment };
}
