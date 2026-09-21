import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();
    const status = (searchParams.get("status") || "all").toUpperCase();
    const currency = (searchParams.get("currency") || "all").toUpperCase();
    const datePreset = searchParams.get("datePreset") || "all";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "50", 10)));

    // Build Query
    const query: any = {};

    // Filter by Status
    if (status !== "ALL" && ["DRAFT", "ISSUED", "PAID", "VOID"].includes(status)) {
      query.status = status;
    }

    // Filter by Currency
    if (currency !== "ALL") {
      query.currency = currency;
    }

    // Filter by Date Range
    const now = new Date();
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    if (datePreset === "today") {
      minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (datePreset === "yesterday") {
      minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (datePreset === "7d") {
      minDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (datePreset === "30d") {
      minDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (datePreset === "custom") {
      if (startDate) minDate = new Date(startDate + "T00:00:00");
      if (endDate) maxDate = new Date(endDate + "T23:59:59.999");
    }

    if (minDate || maxDate) {
      query.paymentDate = {};
      if (minDate) query.paymentDate.$gte = minDate;
      if (maxDate) query.paymentDate.$lte = maxDate;
    }

    // Search query
    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [
        { invoiceNumber: searchRegex },
        { customerEmail: searchRegex },
        { customerName: searchRegex },
        { customerPhone: searchRegex },
        { gatewayPaymentId: searchRegex },
        { gatewayOrderId: searchRegex },
        { orderNumber: searchRegex },
        { photoId: searchRegex },
        { "gatewayDetails.bankRrn": searchRegex },
        { "gatewayDetails.cardHolderName": searchRegex },
      ];
    }

    // Fetch invoices with pagination
    const totalCount = await Invoice.countDocuments(query);
    const invoices = await Invoice.find(query)
      .sort({ paymentDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Summary KPIs across all invoices with multi-currency support
    const allInvoices = await Invoice.find().select("amount total currency status").lean();
    const paidInvoices = allInvoices.filter((inv) => inv.status === "PAID");
    const paidCount = paidInvoices.length;

    const revenueByCurrency: Record<string, number> = {};
    for (const inv of paidInvoices) {
      const amt = Number(inv.total !== undefined ? inv.total : inv.amount) || 0;
      const curr = (inv.currency || "USD").toUpperCase().trim();
      revenueByCurrency[curr] = (revenueByCurrency[curr] || 0) + amt;
    }

    const totalRevenueUSD = revenueByCurrency["USD"] || 0;
    const totalRevenueINR = revenueByCurrency["INR"] || 0;

    // Count uninvoiced captured payments accurately
    const existingInvoices = await Invoice.find()
      .select("paymentId gatewayPaymentId")
      .lean();

    const existingPaymentObjIds = existingInvoices
      .map((inv) => inv.paymentId)
      .filter(Boolean);
    const existingGatewayPaymentIds = existingInvoices
      .map((inv) => inv.gatewayPaymentId)
      .filter(Boolean);

    const uninvoicedPaymentsCount = await Payment.countDocuments({
      status: "captured",
      _id: { $nin: existingPaymentObjIds },
      gatewayPaymentId: { $nin: existingGatewayPaymentIds },
    });

    return NextResponse.json({
      invoices,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
      stats: {
        totalInvoices: allInvoices.length,
        paidCount,
        totalRevenueUSD,
        totalRevenueINR,
        revenueByCurrency,
        uninvoicedPaymentsCount,
      },
    });
  } catch (error: any) {
    console.error("[API ADMIN INVOICES GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices: " + error.message },
      { status: 500 }
    );
  }
}
