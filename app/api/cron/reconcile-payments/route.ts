import { NextResponse } from "next/server";
import { reconcileRecentPayments } from "@/lib/payment-reconcile";

/**
 * Manually run the payment reconcile job (it also runs every 10 min in-process).
 * Protected by CRON_SECRET header.
 * GET /api/cron/reconcile-payments?hours=72
 * Header: Authorization: Bearer <CRON_SECRET>
 */
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hours = Number(new URL(req.url).searchParams.get("hours")) || 72;
    const summary = await reconcileRecentPayments(Math.min(Math.max(hours, 1), 24 * 30));
    return NextResponse.json({ success: true, ...summary });
  } catch (error: any) {
    console.error("[cron/reconcile-payments] Error:", error);
    return NextResponse.json({ error: "Reconcile failed" }, { status: 500 });
  }
}
