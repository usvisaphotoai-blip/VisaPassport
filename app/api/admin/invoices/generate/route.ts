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
    const { paymentId, gatewayPaymentId, forceRegenerate } = body;

    const targetId = paymentId || gatewayPaymentId;
    if (!targetId) {
      return NextResponse.json(
        { error: "Missing paymentId or gatewayPaymentId in request body" },
        { status: 400 }
      );
    }

    const result = await generateInvoiceForPayment(targetId, {
      actor: auth.userEmail || "admin",
      forceRegenerate: Boolean(forceRegenerate),
    });

    if (!result.success || !result.invoice) {
      return NextResponse.json(
        { error: result.error || "Failed to generate invoice" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      invoice: result.invoice,
      isExisting: result.isExisting,
      message: result.isExisting
        ? "Existing invoice retrieved successfully"
        : "Invoice generated successfully",
    });
  } catch (error: any) {
    console.error("[API INVOICE GENERATE] Error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
