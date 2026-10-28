export async function register() {
  // Production Node server only (PM2 on the VPS) — dev shares the live DB and Razorpay keys
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV === "production" && process.env.DISABLE_PAYMENT_RECONCILE !== "1") {
      const { startPaymentReconcileScheduler } = await import("@/lib/payment-reconcile");
      startPaymentReconcileScheduler();
    }
  }
}
