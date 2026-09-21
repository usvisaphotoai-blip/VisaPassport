import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import Invoice from "@/models/Invoice";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    await dbConnect();

    // 1. Get all gatewayPaymentIds and paymentIds that already have an invoice
    const existingInvoices = await Invoice.find()
      .select("paymentId gatewayPaymentId")
      .lean();

    const existingPaymentIds = new Set<string>();
    const existingGatewayPaymentIds = new Set<string>();

    for (const inv of existingInvoices) {
      if (inv.paymentId) existingPaymentIds.add(inv.paymentId.toString());
      if (inv.gatewayPaymentId) existingGatewayPaymentIds.add(inv.gatewayPaymentId);
    }

    // 2. Fetch captured payments that haven't been invoiced
    const allCapturedPayments = await Payment.find({ status: "captured" })
      .sort({ createdAt: -1 })
      .lean();

    const uninvoiced = allCapturedPayments.filter((p) => {
      const pId = p._id.toString();
      const gId = p.gatewayPaymentId;
      if (existingPaymentIds.has(pId)) return false;
      if (gId && existingGatewayPaymentIds.has(gId)) return false;
      return true;
    });

    // 3. Enrich with photo and order data for display
    const photoIds = uninvoiced.map((p) => p.photoId).filter(Boolean) as any[];
    const orderIds = uninvoiced.map((p) => p.orderId).filter(Boolean) as any[];

    const [photos, orders] = await Promise.all([
      Photo.find({ _id: { $in: photoIds } }).select("documentType isExpert secureUrl previewUrl").lean(),
      Order.find({ _id: { $in: orderIds } }).select("orderNumber guestEmail documentType isExpert").lean(),
    ]);

    const photoMap = photos.reduce((acc: any, ph: any) => {
      acc[ph._id.toString()] = ph;
      return acc;
    }, {});

    const orderMap = orders.reduce((acc: any, ord: any) => {
      acc[ord._id.toString()] = ord;
      return acc;
    }, {});

    const enriched = uninvoiced.map((p) => {
      const ph = p.photoId ? photoMap[p.photoId.toString()] : null;
      const ord = p.orderId ? orderMap[p.orderId.toString()] : null;

      const photoId = p.photoId || (p.metadata as any)?.notes?.photoId || ord?.photoId;

      return {
        _id: p._id,
        gatewayPaymentId: p.gatewayPaymentId,
        gatewayOrderId: p.gatewayOrderId,
        orderId: p.orderId,
        orderNumber: ord?.orderNumber || `ORD-${p._id}`,
        photoId: photoId ? String(photoId) : undefined,
        customerEmail: p.email || ord?.guestEmail || "N/A",
        amount: p.amount,
        currency: p.currency || "USD",
        method: p.method || "card",
        status: p.status,
        documentType: ph?.documentType || ord?.documentType || "passport-photo",
        isExpert: ph?.isExpert || ord?.isExpert || false,
        createdAt: p.createdAt,
      };
    });

    return NextResponse.json({
      uninvoicedCount: enriched.length,
      payments: enriched,
    });
  } catch (error: any) {
    console.error("[API UNINVOICED PAYMENTS GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch uninvoiced payments: " + error.message },
      { status: 500 }
    );
  }
}
