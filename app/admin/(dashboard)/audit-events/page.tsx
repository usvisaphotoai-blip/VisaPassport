import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import AuditEvent, { AuditEventType } from "@/models/AuditEvent";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import Payment from "@/models/Payment";
import Invoice from "@/models/Invoice";
import User from "@/models/User";
import AuditEventsClientPage, {
  AuditEventItem,
  PhotoGroup,
  UserTreeGroup,
} from "./AuditEventsClientPage";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{
    type?: string;
    q?: string;
    datePreset?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function AdminAuditEventsPage(props: Props) {
  const searchParams = await props.searchParams;
  const filterType = searchParams?.type as AuditEventType | undefined;
  const filterSearch = (searchParams?.q || "").trim().toLowerCase();
  const filterDatePreset = (searchParams?.datePreset || "all").toLowerCase();
  const filterStartDate = searchParams?.startDate || "";
  const filterEndDate = searchParams?.endDate || "";

  await dbConnect();

  // 1. Total & type-based counts across entire collection
  const countsRaw = await AuditEvent.aggregate([
    { $group: { _id: "$eventType", count: { $sum: 1 } } },
  ]);
  const countsMap = countsRaw.reduce((acc: any, c: any) => {
    acc[c._id] = c.count;
    return acc;
  }, {});
  const totalCount = Object.values(countsMap).reduce(
    (a: number, b: any) => a + Number(b),
    0
  );

  // 2. Date range timestamps calculation
  let minDateTimestamp: number | null = null;
  let maxDateTimestamp: number | null = null;
  const now = new Date();

  if (filterDatePreset === "today") {
    minDateTimestamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
  } else if (filterDatePreset === "yesterday") {
    minDateTimestamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    ).getTime();
    maxDateTimestamp =
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - 1;
  } else if (filterDatePreset === "7d") {
    minDateTimestamp = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  } else if (filterDatePreset === "30d") {
    minDateTimestamp = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  } else if (filterDatePreset === "custom") {
    if (filterStartDate) {
      minDateTimestamp = new Date(filterStartDate + "T00:00:00").getTime();
    }
    if (filterEndDate) {
      maxDateTimestamp = new Date(filterEndDate + "T23:59:59.999").getTime();
    }
  }

  // 3. Query AuditEvents from DB with high limit to include all download and payment events
  const query: any = {};
  if (filterType && filterType !== ("all" as any)) query.eventType = filterType;
  if (minDateTimestamp || maxDateTimestamp) {
    query.createdAt = {};
    if (minDateTimestamp) query.createdAt.$gte = new Date(minDateTimestamp);
    if (maxDateTimestamp) query.createdAt.$lte = new Date(maxDateTimestamp);
  }

  // Fetch up to 2500 events to ensure all recent downloads and customer sessions are captured
  let rawEventsList = await AuditEvent.find(query)
    .sort({ createdAt: -1 })
    .limit(2500)
    .lean();

  // If a specific filter (like type=download) was applied, also fetch the full sibling lifecycle events
  // for those matching photos so the complete commit graph (init -> processing -> payment -> email -> download) is visible
  if (filterType && filterType !== ("all" as any)) {
    const matchedPhotoIds = Array.from(
      new Set(
        rawEventsList
          .map((e: any) =>
            e.photoId
              ? String(e.photoId)
              : e.metadata?.photoId
              ? String(e.metadata.photoId)
              : null
          )
          .filter(Boolean) as string[]
      )
    );

    if (matchedPhotoIds.length > 0) {
      const siblingEvents = await AuditEvent.find({
        $or: [
          { photoId: { $in: matchedPhotoIds } },
          { "metadata.photoId": { $in: matchedPhotoIds } },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      // Merge and deduplicate by _id
      const eventMap = new Map<string, any>();
      rawEventsList.forEach((e: any) => eventMap.set(e._id.toString(), e));
      siblingEvents.forEach((e: any) => eventMap.set(e._id.toString(), e));
      rawEventsList = Array.from(eventMap.values()).sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }

  // 4. Collect referenced IDs
  const photoIds = Array.from(
    new Set(
      rawEventsList
        .map((e: any) =>
          e.photoId
            ? String(e.photoId)
            : e.metadata?.photoId
            ? String(e.metadata.photoId)
            : null
        )
        .filter(Boolean) as string[]
    )
  );

  const orderIds = Array.from(
    new Set(
      rawEventsList
        .map((e: any) => (e.orderId ? String(e.orderId) : null))
        .filter(Boolean) as string[]
    )
  );

  const paymentIds = Array.from(
    new Set(
      rawEventsList
        .map((e: any) => (e.paymentId ? String(e.paymentId) : null))
        .filter(Boolean) as string[]
    )
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

  const orderObjectIds = orderIds
    .map((id) => {
      try {
        return new mongoose.Types.ObjectId(id);
      } catch {
        return null;
      }
    })
    .filter(Boolean) as mongoose.Types.ObjectId[];

  const paymentObjectIds = paymentIds
    .map((id) => {
      try {
        return new mongoose.Types.ObjectId(id);
      } catch {
        return null;
      }
    })
    .filter(Boolean) as mongoose.Types.ObjectId[];

  // 5. Query associated Photos, Orders, Payments, Invoices, Users
  const [photos, orders, payments] = await Promise.all([
    Photo.find({ _id: { $in: photoObjectIds } }).lean(),
    Order.find({
      $or: [
        { _id: { $in: orderObjectIds } },
        { photoId: { $in: photoObjectIds } },
      ],
    }).lean(),
    Payment.find({
      $or: [
        { photoId: { $in: photoIds } },
        { "metadata.notes.photoId": { $in: photoIds } },
        { _id: { $in: paymentObjectIds } },
        { gatewayPaymentId: { $in: paymentIds } },
      ],
    }).lean(),
  ]);

  const gatewayPaymentIds = payments
    .map((p: any) => p.gatewayPaymentId)
    .filter(Boolean);

  const invoices = await Invoice.find({
    $or: [
      { photoId: { $in: photoIds } },
      { gatewayPaymentId: { $in: gatewayPaymentIds } },
      { orderId: { $in: orderIds } },
    ],
  }).lean();

  const userIds = Array.from(
    new Set([
      ...orders.map((o: any) => (o.userId ? String(o.userId) : null)),
      ...photos.map((p: any) => (p.userId ? String(p.userId) : null)),
      ...invoices.map((i: any) => (i.userId ? String(i.userId) : null)),
    ])
  )
    .filter(Boolean)
    .map((id) => {
      try {
        return new mongoose.Types.ObjectId(id as string);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const users = await User.find({ _id: { $in: userIds } })
    .select("_id email name")
    .lean();

  // 6. Build lookup maps
  const userMap = new Map<string, any>();
  users.forEach((u: any) => userMap.set(u._id.toString(), u));

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

  // 7. Process and build hierarchical tree & flat events
  const emailMap: Record<string, string> = {};
  const userGroupMap = new Map<string, UserTreeGroup>();
  const filteredFlatEvents: AuditEventItem[] = [];

  for (const rawEvt of rawEventsList) {
    const photoIdStr = rawEvt.photoId
      ? String(rawEvt.photoId)
      : rawEvt.metadata?.photoId
      ? String(rawEvt.metadata.photoId)
      : null;

    const photoDoc = photoIdStr ? photoMap.get(photoIdStr) : null;
    const orderDoc =
      (rawEvt.orderId ? orderMap.get(String(rawEvt.orderId)) : null) ||
      (photoIdStr ? orderMap.get(`photo_${photoIdStr}`) : null);
    const paymentDoc =
      (rawEvt.paymentId ? paymentMap.get(String(rawEvt.paymentId)) : null) ||
      (photoIdStr ? paymentMap.get(`photo_${photoIdStr}`) : null) ||
      (orderDoc ? paymentMap.get(String(orderDoc._id)) : null);
    const invoiceDoc =
      (photoIdStr ? invoiceMap.get(photoIdStr) : null) ||
      (paymentDoc?.gatewayPaymentId
        ? invoiceMap.get(paymentDoc.gatewayPaymentId)
        : null) ||
      (orderDoc ? invoiceMap.get(String(orderDoc._id)) : null);

    const userEmail =
      (rawEvt.actor && rawEvt.actor.includes("@") ? rawEvt.actor : null) ||
      rawEvt.metadata?.email ||
      rawEvt.metadata?.recipient ||
      invoiceDoc?.customerEmail ||
      paymentDoc?.email ||
      orderDoc?.guestEmail ||
      photoDoc?.guestEmail ||
      (rawEvt.ipAddress ? `Guest (${rawEvt.ipAddress})` : "System Operations");

    if (photoIdStr) emailMap[photoIdStr] = userEmail;
    if (rawEvt.orderId) emailMap[String(rawEvt.orderId)] = userEmail;

    // Filter by search string
    if (filterSearch) {
      const matchTarget = [
        userEmail,
        invoiceDoc?.customerName,
        invoiceDoc?.gatewayDetails?.cardHolderName,
        invoiceDoc?.invoiceNumber,
        invoiceDoc?.gatewayDetails?.bankRrn,
        invoiceDoc?.gatewayDetails?.authCode,
        paymentDoc?.gatewayPaymentId,
        paymentDoc?.gatewayOrderId,
        orderDoc?.orderNumber,
        photoIdStr,
        rawEvt.actor,
        rawEvt.ipAddress,
        rawEvt.eventType,
        rawEvt.metadata?.fileName,
        rawEvt.metadata?.documentType,
        rawEvt.metadata?.template,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!matchTarget.includes(filterSearch)) {
        continue;
      }
    }

    const eventItem: AuditEventItem = {
      _id: String(rawEvt._id),
      eventType: rawEvt.eventType,
      actor: rawEvt.actor,
      ipAddress: rawEvt.ipAddress,
      userAgent: rawEvt.userAgent,
      photoId: photoIdStr || undefined,
      orderId: rawEvt.orderId ? String(rawEvt.orderId) : undefined,
      paymentId: rawEvt.paymentId ? String(rawEvt.paymentId) : undefined,
      disputeId: rawEvt.disputeId ? String(rawEvt.disputeId) : undefined,
      metadata: rawEvt.metadata,
      createdAt: new Date(rawEvt.createdAt).toISOString(),
    };

    filteredFlatEvents.push(eventItem);

    // Grouping by User
    if (!userGroupMap.has(userEmail)) {
      userGroupMap.set(userEmail, {
        userEmail,
        customerName:
          invoiceDoc?.customerName ||
          invoiceDoc?.gatewayDetails?.cardHolderName ||
          (photoDoc?.userId && userMap.get(String(photoDoc.userId))?.name) ||
          null,
        customerPhone:
          invoiceDoc?.customerPhone ||
          invoiceDoc?.gatewayDetails?.contact ||
          paymentDoc?.contact ||
          null,
        photos: [],
        generalEvents: [],
      });
    }

    const uGroup = userGroupMap.get(userEmail)!;

    if (photoIdStr) {
      let pGroup = uGroup.photos.find((p) => p.photoId === photoIdStr);
      if (!pGroup) {
        pGroup = {
          photoId: photoIdStr,
          photoDoc: photoDoc
            ? {
                _id: String(photoDoc._id),
                documentType: photoDoc.documentType,
                guestEmail: photoDoc.guestEmail,
                status: photoDoc.status,
                createdAt: photoDoc.createdAt
                  ? new Date(photoDoc.createdAt).toISOString()
                  : undefined,
                isExpert: photoDoc.isExpert,
                previewUrl: photoDoc.previewUrl,
                secureUrl: photoDoc.secureUrl,
              }
            : null,
          orderDoc: orderDoc
            ? {
                _id: String(orderDoc._id),
                orderNumber: orderDoc.orderNumber,
                guestEmail: orderDoc.guestEmail,
                amount: orderDoc.amount,
                currency: orderDoc.currency,
                status: orderDoc.status,
                documentType: orderDoc.documentType,
                createdAt: orderDoc.createdAt
                  ? new Date(orderDoc.createdAt).toISOString()
                  : undefined,
              }
            : null,
          paymentDoc: paymentDoc
            ? {
                _id: String(paymentDoc._id),
                gatewayPaymentId: paymentDoc.gatewayPaymentId,
                gatewayOrderId: paymentDoc.gatewayOrderId,
                amount: paymentDoc.amount,
                currency: paymentDoc.currency,
                method: paymentDoc.method,
                status: paymentDoc.status,
                email: paymentDoc.email,
                contact: paymentDoc.contact,
                createdAt: paymentDoc.createdAt
                  ? new Date(paymentDoc.createdAt).toISOString()
                  : undefined,
              }
            : null,
          invoiceDoc: invoiceDoc
            ? {
                _id: String(invoiceDoc._id),
                invoiceNumber: invoiceDoc.invoiceNumber,
                customerName: invoiceDoc.customerName,
                customerEmail: invoiceDoc.customerEmail,
                customerPhone: invoiceDoc.customerPhone,
                total: invoiceDoc.total,
                currency: invoiceDoc.currency,
                paymentMethod: invoiceDoc.paymentMethod,
                gatewayDetails: invoiceDoc.gatewayDetails,
                createdAt: invoiceDoc.createdAt
                  ? new Date(invoiceDoc.createdAt).toISOString()
                  : undefined,
              }
            : null,
          events: [],
        };
        uGroup.photos.push(pGroup);
      }

      pGroup.events.push(eventItem);
      if (!pGroup.photoDoc && photoDoc) {
        pGroup.photoDoc = {
          _id: String(photoDoc._id),
          documentType: photoDoc.documentType,
          guestEmail: photoDoc.guestEmail,
          status: photoDoc.status,
          createdAt: photoDoc.createdAt
            ? new Date(photoDoc.createdAt).toISOString()
            : undefined,
        };
      }
      if (!pGroup.orderDoc && orderDoc) {
        pGroup.orderDoc = {
          _id: String(orderDoc._id),
          orderNumber: orderDoc.orderNumber,
          guestEmail: orderDoc.guestEmail,
          amount: orderDoc.amount,
          currency: orderDoc.currency,
          status: orderDoc.status,
          documentType: orderDoc.documentType,
        };
      }
      if (!pGroup.paymentDoc && paymentDoc) {
        pGroup.paymentDoc = {
          _id: String(paymentDoc._id),
          gatewayPaymentId: paymentDoc.gatewayPaymentId,
          gatewayOrderId: paymentDoc.gatewayOrderId,
          amount: paymentDoc.amount,
          currency: paymentDoc.currency,
          method: paymentDoc.method,
          status: paymentDoc.status,
        };
      }
      if (!pGroup.invoiceDoc && invoiceDoc) {
        pGroup.invoiceDoc = {
          _id: String(invoiceDoc._id),
          invoiceNumber: invoiceDoc.invoiceNumber,
          customerName: invoiceDoc.customerName,
          customerEmail: invoiceDoc.customerEmail,
          customerPhone: invoiceDoc.customerPhone,
          total: invoiceDoc.total,
          currency: invoiceDoc.currency,
          paymentMethod: invoiceDoc.paymentMethod,
          gatewayDetails: invoiceDoc.gatewayDetails,
        };
      }
    } else {
      uGroup.generalEvents.push(eventItem);
    }
  }

  // Convert to serializable array and sort users with high priority for paid and downloaded sessions
  const userTreeGroups = Array.from(userGroupMap.values()).map((ug) => {
    // Sort photo groups: photos with downloads or payments first, then newest event
    ug.photos.sort((a, b) => {
      const aDownloads = a.events.filter((e) => e.eventType === "download").length;
      const bDownloads = b.events.filter((e) => e.eventType === "download").length;
      if (aDownloads !== bDownloads) return bDownloads - aDownloads;

      const aPaid = a.paymentDoc ? 1 : 0;
      const bPaid = b.paymentDoc ? 1 : 0;
      if (aPaid !== bPaid) return bPaid - aPaid;

      const aTime = a.events[0] ? new Date(a.events[0].createdAt).getTime() : 0;
      const bTime = b.events[0] ? new Date(b.events[0].createdAt).getTime() : 0;
      return bTime - aTime;
    });
    return ug;
  });

  // Sort Users:
  // 1. Users with Download Events
  // 2. Users with Paid Payments / Invoices
  // 3. Followed by latest activity timestamp
  userTreeGroups.sort((a, b) => {
    const aDownloads = a.photos.reduce(
      (acc, p) => acc + p.events.filter((e) => e.eventType === "download").length,
      0
    );
    const bDownloads = b.photos.reduce(
      (acc, p) => acc + p.events.filter((e) => e.eventType === "download").length,
      0
    );

    const aPaid = a.photos.some((p) => p.paymentDoc || p.invoiceDoc) ? 1 : 0;
    const bPaid = b.photos.some((p) => p.paymentDoc || p.invoiceDoc) ? 1 : 0;

    // Highest priority: downloaded customers
    if (aDownloads > 0 || bDownloads > 0) {
      if (aDownloads !== bDownloads) return bDownloads - aDownloads;
    }

    // Next priority: paid customers
    if (aPaid !== bPaid) return bPaid - aPaid;

    // Then latest activity timestamp
    const aLatest = Math.max(
      ...a.photos.flatMap((p) =>
        p.events.map((e) => new Date(e.createdAt).getTime())
      ),
      ...a.generalEvents.map((e) => new Date(e.createdAt).getTime()),
      0
    );
    const bLatest = Math.max(
      ...b.photos.flatMap((p) =>
        p.events.map((e) => new Date(e.createdAt).getTime())
      ),
      ...b.generalEvents.map((e) => new Date(e.createdAt).getTime()),
      0
    );
    return bLatest - aLatest;
  });

  const serializedUserTreeGroups = JSON.parse(
    JSON.stringify(userTreeGroups)
  ) as UserTreeGroup[];
  const serializedFlatEvents = JSON.parse(
    JSON.stringify(filteredFlatEvents)
  ) as AuditEventItem[];

  return (
    <AuditEventsClientPage
      userTreeGroups={serializedUserTreeGroups}
      flatEvents={serializedFlatEvents}
      emailMap={emailMap}
      countsMap={countsMap}
      totalCount={totalCount}
      filterType={filterType}
      filterSearch={filterSearch}
      filterDatePreset={filterDatePreset}
      filterStartDate={filterStartDate}
      filterEndDate={filterEndDate}
    />
  );
}
