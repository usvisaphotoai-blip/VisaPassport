import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import AuditEvent from "@/models/AuditEvent";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    const { id } = await props.params;
    if (!id) {
      return NextResponse.json({ error: "Missing invoice ID parameter" }, { status: 400 });
    }

    await dbConnect();

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    let invoice: any = null;

    if (isObjectId) {
      invoice = await Invoice.findById(id).lean();
    }
    if (!invoice) {
      invoice = await Invoice.findOne({
        $or: [
          { invoiceNumber: id },
          { gatewayPaymentId: id },
          { paymentId: id },
        ],
      }).lean();
    }

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Fetch related order, payment, and photo for complete context
    const [relatedOrder, relatedPayment, relatedPhoto, auditEvents] = await Promise.all([
      invoice.orderId ? Order.findById(invoice.orderId).lean() : null,
      invoice.paymentId ? Payment.findById(invoice.paymentId).lean() : null,
      invoice.photoId ? Photo.findById(invoice.photoId).lean() : null,
      AuditEvent.find({
        $or: [
          ...(invoice.orderId ? [{ orderId: invoice.orderId }] : []),
          ...(invoice.paymentId ? [{ paymentId: invoice.paymentId }] : []),
          ...(invoice.photoId ? [{ photoId: invoice.photoId.toString() }] : []),
        ],
      })
        .sort({ createdAt: -1 })
        .limit(25)
        .lean(),
    ]);

    return NextResponse.json({
      invoice,
      relatedOrder,
      relatedPayment,
      relatedPhoto,
      auditEvents,
    });
  } catch (error: any) {
    console.error("[API ADMIN INVOICE GET ID] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice: " + error.message },
      { status: 500 }
    );
  }
}
