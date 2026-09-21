import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { generateInvoiceForPayment } from "@/lib/invoice-generator";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    const body = await req.json();
    const { paymentIds } = body;

    if (!Array.isArray(paymentIds) || paymentIds.length === 0) {
      return NextResponse.json(
        { error: "paymentIds must be a non-empty array of payment IDs" },
        { status: 400 }
      );
    }

    // Limit batch size to prevent server timeout
    const targetIds = paymentIds.slice(0, 100);
    const results: Array<{
      paymentId: string;
      success: boolean;
      invoiceNumber?: string;
      isExisting?: boolean;
      error?: string;
    }> = [];

    let createdCount = 0;
    let existingCount = 0;
    let failedCount = 0;

    for (const pid of targetIds) {
      const res = await generateInvoiceForPayment(pid, {
        actor: auth.userEmail || "admin",
      });

      if (res.success && res.invoice) {
        if (res.isExisting) existingCount++;
        else createdCount++;

        results.push({
          paymentId: pid,
          success: true,
          invoiceNumber: res.invoice.invoiceNumber,
          isExisting: res.isExisting,
        });
      } else {
        failedCount++;
        results.push({
          paymentId: pid,
          success: false,
          error: res.error,
        });
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalRequested: targetIds.length,
        createdCount,
        existingCount,
        failedCount,
      },
      results,
    });
  } catch (error: any) {
    console.error("[API INVOICE BULK GENERATE] Error:", error);
    return NextResponse.json(
      { error: "Bulk invoice generation failed: " + error.message },
      { status: 500 }
    );
  }
}
