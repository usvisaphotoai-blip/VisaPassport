import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import PrintSheetOrder from "@/models/PrintSheetOrder";
import InConverterOrder from "@/models/InConverterOrder";
import { fetchCapturedPaymentForOrder } from "@/lib/razorpay-lookup";
import { fulfillPhotoPayment } from "@/lib/photo-fulfillment";
import { fulfillProductPayment } from "@/lib/product-fulfillment";

/**
 * Safety net for payments that were captured at Razorpay but never fulfilled here —
 * the buyer closed the tab / 3-D Secure redirect lost the handler, and the webhook
 * didn't arrive. Asks Razorpay directly and runs the normal (idempotent) fulfillment.
 */

const DEFAULT_LOOKBACK_HOURS = 72;
/** Skip checkouts that are probably still open — browser verify will handle them */
const MIN_AGE_MS = 3 * 60 * 1000;
const RECONCILE_INTERVAL_MS = 10 * 60 * 1000;

export interface ReconcileSummary {
  checked: number;
  recovered: string[];
  completed: number;
  errors: string[];
}

/** Fulfill a captured Razorpay payment for whichever product its notes point to. */
async function fulfillCaptured(captured: any, actor: string): Promise<boolean> {
  const notes = captured.notes || {};
  if (notes.photoId) {
    const res = await fulfillPhotoPayment({
      photoId: notes.photoId,
      razorpayOrderId: captured.order_id,
      razorpayPaymentId: captured.id,
      paymentEntity: captured,
      actor,
    });
    return res.success;
  }
  if (notes.printSheetOrderId || notes.inConverterOrderId) {
    const res = await fulfillProductPayment({
      kind: notes.printSheetOrderId ? "print_sheet" : "in_converter",
      productOrderId: notes.printSheetOrderId || notes.inConverterOrderId,
      razorpayPaymentId: captured.id,
      paymentEntity: captured,
      actor,
    });
    return res.success;
  }
  return false;
}

/**
 * Check one unpaid photo against Razorpay (used when the buyer reopens the preview page).
 * Returns true if a captured payment was found and the photo is now fulfilled.
 */
const lastPreviewCheck = new Map<string, number>();
const PREVIEW_CHECK_INTERVAL_MS = 60 * 1000;

export async function reconcilePhotoPayment(photo: { _id: any; status?: string; razorpayOrderId?: string }): Promise<boolean> {
  if (photo.status === "paid" || !photo.razorpayOrderId) return false;

  // At most one Razorpay lookup per photo per minute (page refreshes, crawlers)
  const key = photo._id.toString();
  const now = Date.now();
  if (now - (lastPreviewCheck.get(key) || 0) < PREVIEW_CHECK_INTERVAL_MS) return false;
  lastPreviewCheck.set(key, now);
  if (lastPreviewCheck.size > 5000) {
    for (const [k, t] of lastPreviewCheck) if (now - t > PREVIEW_CHECK_INTERVAL_MS) lastPreviewCheck.delete(k);
  }

  try {
    const captured = await fetchCapturedPaymentForOrder(photo.razorpayOrderId, 4000);
    if (!captured) return false;
    console.warn(`[RECONCILE] Recovering captured payment ${captured.id} for photo ${photo._id} on preview load`);
    const res = await fulfillPhotoPayment({
      photoId: photo._id.toString(),
      razorpayOrderId: captured.order_id,
      razorpayPaymentId: captured.id,
      paymentEntity: captured,
      actor: "reconcile",
    });
    return res.success;
  } catch (err) {
    console.error(`[RECONCILE] Preview reconcile failed for photo ${photo._id}:`, err);
    return false;
  }
}

export async function reconcileRecentPayments(lookbackHours = DEFAULT_LOOKBACK_HOURS): Promise<ReconcileSummary> {
  await dbConnect();
  const since = new Date(Date.now() - lookbackHours * 60 * 60 * 1000);
  const before = new Date(Date.now() - MIN_AGE_MS);
  const summary: ReconcileSummary = { checked: 0, recovered: [], completed: 0, errors: [] };

  // Razorpay orders we never saw paid: photo checkouts (Payment records) + product orders
  const orderIds = new Set<string>();
  const unpaidPayments = await Payment.find({
    gateway: "razorpay",
    status: { $in: ["created", "failed"] },
    createdAt: { $gte: since, $lte: before },
  }).select("gatewayOrderId").limit(500).lean();
  for (const p of unpaidPayments as any[]) if (p.gatewayOrderId) orderIds.add(p.gatewayOrderId);

  for (const model of [PrintSheetOrder, InConverterOrder] as any[]) {
    const pending = await model.find({
      status: { $ne: "paid" },
      razorpayOrderId: { $exists: true },
      createdAt: { $gte: since, $lte: before },
    }).select("razorpayOrderId").limit(500).lean();
    for (const o of pending) orderIds.add(o.razorpayOrderId);
  }

  for (const orderId of orderIds) {
    if (!orderId.startsWith("order_")) continue;
    summary.checked++;
    try {
      const captured = await fetchCapturedPaymentForOrder(orderId);
      if (!captured) continue;
      if (await fulfillCaptured(captured, "reconcile")) {
        summary.recovered.push(captured.id);
        console.warn(`[RECONCILE] Recovered captured payment ${captured.id} (${orderId})`);
      }
    } catch (err: any) {
      summary.errors.push(`${orderId}: ${err?.message || err}`);
    }
  }

  // Captured photo payments: finish any whose invoice or email didn't complete
  // (fulfillment exits early when both are already done)
  const captured = await Payment.find({
    gateway: "razorpay",
    status: "captured",
    photoId: { $exists: true },
    gatewayPaymentId: { $regex: /^pay_/ },
    createdAt: { $gte: since, $lte: before },
  }).select("photoId gatewayOrderId gatewayPaymentId").limit(500).lean();
  for (const p of captured as any[]) {
    try {
      const res = await fulfillPhotoPayment({
        photoId: p.photoId.toString(),
        razorpayOrderId: p.gatewayOrderId,
        razorpayPaymentId: p.gatewayPaymentId,
        actor: "reconcile",
      });
      if (res.success) summary.completed++;
    } catch (err: any) {
      summary.errors.push(`${p.gatewayPaymentId}: ${err?.message || err}`);
    }
  }

  // Product payments recorded by the new flow: finish any missing invoice / receipt
  // (legacy paid orders without a Payment record are left alone)
  const productPayments = await Payment.find({
    gateway: "razorpay",
    status: "captured",
    "metadata.product.kind": { $exists: true },
    createdAt: { $gte: since, $lte: before },
  }).select("gatewayPaymentId metadata").limit(500).lean();
  for (const p of productPayments as any[]) {
    const notes = p.metadata?.notes || {};
    const productOrderId = p.metadata.product.orderId || notes.printSheetOrderId || notes.inConverterOrderId;
    if (!productOrderId) continue;
    try {
      const res = await fulfillProductPayment({
        kind: p.metadata.product.kind,
        productOrderId,
        razorpayPaymentId: p.gatewayPaymentId,
        actor: "reconcile",
      });
      if (res.success) summary.completed++;
    } catch (err: any) {
      summary.errors.push(`${p.gatewayPaymentId}: ${err?.message || err}`);
    }
  }

  return summary;
}

let running = false;
let started = false;

/** In-process scheduler for the PM2-hosted server (started from instrumentation.ts). */
export function startPaymentReconcileScheduler() {
  if (started) return;
  started = true;

  const run = async () => {
    if (running) return;
    running = true;
    try {
      const s = await reconcileRecentPayments();
      if (s.recovered.length || s.errors.length) {
        console.warn(`[RECONCILE] checked=${s.checked} recovered=${s.recovered.join(",") || 0} errors=${s.errors.length}`, s.errors);
      }
    } catch (err) {
      console.error("[RECONCILE] Scheduled run failed:", err);
    } finally {
      running = false;
    }
  };

  setTimeout(run, 60 * 1000).unref();
  setInterval(run, RECONCILE_INTERVAL_MS).unref();
  console.log(`[RECONCILE] Payment reconcile scheduler started (every ${RECONCILE_INTERVAL_MS / 60000} min)`);
}

