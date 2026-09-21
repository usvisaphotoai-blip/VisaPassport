import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import AuditEvent from "@/models/AuditEvent";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import Payment from "@/models/Payment";
import Invoice from "@/models/Invoice";
import User from "@/models/User";
import { verifyAdminSession } from "@/lib/admin-auth";
import { generateAuditTrailPdfBuffer } from "@/lib/pdf-audit-trail";
import { UserTreeGroup, PhotoGroup, AuditEventItem } from "@/app/admin/(dashboard)/audit-events/AuditEventsClientPage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const targetEmail = (searchParams.get("email") || searchParams.get("userEmail") || "").trim();
    const targetPhotoId = (searchParams.get("photoId") || "").trim();

    if (!targetEmail && !targetPhotoId) {
      return NextResponse.json(
        { error: "Missing required query parameter: 'email' or 'photoId'" },
        { status: 400 }
      );
    }

    // 1. Find User by email or direct query
    const userDoc = targetEmail ? await User.findOne({ email: targetEmail }).lean() : null;

    // 2. Fetch all Photos for this user or photoId
    const photoQuery: any = { $or: [] };
    if (targetPhotoId) {
      try {
        photoQuery.$or.push({ _id: new mongoose.Types.ObjectId(targetPhotoId) });
      } catch {
        // ignore invalid objectId
      }
    }
    if (targetEmail) {
      photoQuery.$or.push({ guestEmail: targetEmail });
      if (userDoc) {
        photoQuery.$or.push({ userId: userDoc._id });
      }
    }

    const photos = photoQuery.$or.length > 0 ? await Photo.find(photoQuery).lean() : [];
    const photoIds = Array.from(
      new Set([
        ...photos.map((p: any) => p._id.toString()),
        ...(targetPhotoId ? [targetPhotoId] : []),
      ])
    );

    const photoObjectIds = photoIds
      .map((id) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as mongoose.Types.ObjectId[];

    const photoQueryIds = [...photoIds, ...photoObjectIds];

    // 3. Fetch all Orders, Payments, Invoices, and AuditEvents
    const [orders, payments, invoices, rawEventsList] = await Promise.all([
      Order.find({
        $or: [
          { guestEmail: targetEmail },
          { photoId: { $in: photoQueryIds } },
          ...(userDoc ? [{ userId: userDoc._id }] : []),
        ],
      }).lean(),
      Payment.find({
        $or: [
          { email: targetEmail },
          { photoId: { $in: photoQueryIds } },
          { "metadata.notes.photoId": { $in: photoIds } },
        ],
      }).lean(),
      Invoice.find({
        $or: [
          { customerEmail: targetEmail },
          { photoId: { $in: photoIds } },
        ],
      }).lean(),
      AuditEvent.find({
        $or: [
          ...(targetEmail
            ? [
                { actor: targetEmail },
                { "metadata.email": targetEmail },
                { "metadata.recipient": targetEmail },
              ]
            : []),
          { photoId: { $in: photoQueryIds } },
          { "metadata.photoId": { $in: photoIds } },
        ],
      })
        .sort({ createdAt: 1 })
        .lean(),
    ]);

    // Lookup Maps
    const photoMap = new Map<string, any>();
    photos.forEach((p: any) => photoMap.set(p._id.toString(), p));

    const orderMap = new Map<string, any>();
    orders.forEach((o: any) => {
      orderMap.set(o._id.toString(), o);
      if (o.photoId) orderMap.set(`photo_${String(o.photoId)}`, o);
    });

    const paymentMap = new Map<string, any>();
    payments.forEach((p: any) => {
      paymentMap.set(p._id.toString(), p);
      if (p.gatewayPaymentId) paymentMap.set(p.gatewayPaymentId, p);
      if (p.photoId) paymentMap.set(`photo_${String(p.photoId)}`, p);
      if (p.metadata?.notes?.photoId) {
        paymentMap.set(`photo_${String(p.metadata.notes.photoId)}`, p);
      }
    });

    const invoiceMap = new Map<string, any>();
    invoices.forEach((inv: any) => {
      if (inv.photoId) invoiceMap.set(String(inv.photoId), inv);
      if (inv.gatewayPaymentId) invoiceMap.set(inv.gatewayPaymentId, inv);
      if (inv.orderId) invoiceMap.set(String(inv.orderId), inv);
    });

    // Determine primary customer metadata
    const primaryInvoice = invoices[0];
    const primaryPayment = payments[0];
    const customerName =
      primaryInvoice?.customerName ||
      primaryInvoice?.gatewayDetails?.cardHolderName ||
      (userDoc as any)?.name ||
      null;
    const customerPhone =
      primaryInvoice?.customerPhone ||
      primaryInvoice?.gatewayDetails?.contact ||
      (primaryPayment as any)?.contact ||
      (primaryPayment?.metadata as any)?.notes?.contact ||
      null;

    const userEmail = targetEmail || (photos[0] as any)?.guestEmail || (rawEventsList[0] as any)?.actor || "customer@pixpassport.com";

    // 4. Construct UserTreeGroup
    const photoGroupsMap = new Map<string, PhotoGroup>();
    const generalEvents: AuditEventItem[] = [];

    // Ensure all known photos exist in photoGroupsMap
    photoIds.forEach((pid) => {
      const pDoc = photoMap.get(pid);
      const oDoc = orderMap.get(`photo_${pid}`);
      const payDoc = paymentMap.get(`photo_${pid}`);
      const invDoc = invoiceMap.get(pid);

      photoGroupsMap.set(pid, {
        photoId: pid,
        photoDoc: pDoc
          ? {
              _id: String(pDoc._id),
              documentType: pDoc.documentType,
              guestEmail: pDoc.guestEmail,
              status: pDoc.status,
              createdAt: pDoc.createdAt ? new Date(pDoc.createdAt).toISOString() : undefined,
              isExpert: pDoc.isExpert,
              previewUrl: pDoc.previewUrl,
              secureUrl: pDoc.secureUrl,
            }
          : null,
        orderDoc: oDoc
          ? {
              _id: String(oDoc._id),
              orderNumber: oDoc.orderNumber,
              guestEmail: oDoc.guestEmail,
              amount: oDoc.amount,
              currency: oDoc.currency,
              status: oDoc.status,
              documentType: oDoc.documentType,
              createdAt: oDoc.createdAt ? new Date(oDoc.createdAt).toISOString() : undefined,
            }
          : null,
        paymentDoc: payDoc
          ? {
              _id: String(payDoc._id),
              gatewayPaymentId: payDoc.gatewayPaymentId,
              gatewayOrderId: payDoc.gatewayOrderId,
              amount: payDoc.amount,
              currency: payDoc.currency,
              method: payDoc.method,
              status: payDoc.status,
              email: payDoc.email,
              contact: payDoc.contact,
              createdAt: payDoc.createdAt ? new Date(payDoc.createdAt).toISOString() : undefined,
            }
          : null,
        invoiceDoc: invDoc
          ? {
              _id: String(invDoc._id),
              invoiceNumber: invDoc.invoiceNumber,
              customerName: invDoc.customerName,
              customerEmail: invDoc.customerEmail,
              customerPhone: invDoc.customerPhone,
              total: invDoc.total,
              currency: invDoc.currency,
              paymentMethod: invDoc.paymentMethod,
              gatewayDetails: invDoc.gatewayDetails,
              createdAt: invDoc.createdAt ? new Date(invDoc.createdAt).toISOString() : undefined,
            }
          : null,
        events: [],
      });
    });

    // Populate events
    for (const rawEvt of rawEventsList) {
      const eventItem: AuditEventItem = {
        _id: String(rawEvt._id),
        eventType: rawEvt.eventType,
        actor: rawEvt.actor,
        ipAddress: rawEvt.ipAddress,
        userAgent: rawEvt.userAgent,
        photoId: rawEvt.photoId ? String(rawEvt.photoId) : undefined,
        orderId: rawEvt.orderId ? String(rawEvt.orderId) : undefined,
        paymentId: rawEvt.paymentId ? String(rawEvt.paymentId) : undefined,
        disputeId: rawEvt.disputeId ? String(rawEvt.disputeId) : undefined,
        metadata: rawEvt.metadata,
        createdAt: new Date(rawEvt.createdAt).toISOString(),
      };

      const pidStr = rawEvt.photoId
        ? String(rawEvt.photoId)
        : rawEvt.metadata?.photoId
        ? String(rawEvt.metadata.photoId)
        : null;

      if (pidStr) {
        if (!photoGroupsMap.has(pidStr)) {
          photoGroupsMap.set(pidStr, {
            photoId: pidStr,
            photoDoc: null,
            orderDoc: null,
            paymentDoc: null,
            invoiceDoc: null,
            events: [],
          });
        }
        photoGroupsMap.get(pidStr)!.events.push(eventItem);
      } else {
        generalEvents.push(eventItem);
      }
    }

    const userTreeGroup: UserTreeGroup = {
      userEmail,
      customerName,
      customerPhone,
      photos: Array.from(photoGroupsMap.values()),
      generalEvents,
    };

    // 5. Generate Server-Side PDF Buffer
    const pdfBuffer = generateAuditTrailPdfBuffer(userTreeGroup);

    const safeFilename = `audit-trail-${userEmail.replace(/[^a-zA-Z0-9]/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[AUDIT-PDF-EXPORT] Error generating audit trail PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate audit trail PDF certificate", details: error?.message },
      { status: 500 }
    );
  }
}
