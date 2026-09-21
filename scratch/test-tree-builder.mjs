import mongoose from 'mongoose';

async function testTreeBuilder() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // 1. Fetch recent 100 audit events
  const rawEventsList = await db.collection("auditevents").find({}).sort({ createdAt: -1 }).limit(100).toArray();

  // 2. Fetch associated Photos, Orders, Payments, Invoices, Users
  const photoIds = Array.from(new Set(rawEventsList.map(e => e.photoId ? String(e.photoId) : null).filter(Boolean)));
  const orderIds = Array.from(new Set(rawEventsList.map(e => e.orderId ? String(e.orderId) : null).filter(Boolean)));
  const paymentIds = Array.from(new Set(rawEventsList.map(e => e.paymentId ? String(e.paymentId) : null).filter(Boolean)));

  const photoObjectIds = photoIds.map(id => {
    try { return new mongoose.Types.ObjectId(id); } catch(e) { return null; }
  }).filter(Boolean);

  const orderObjectIds = orderIds.map(id => {
    try { return new mongoose.Types.ObjectId(id); } catch(e) { return null; }
  }).filter(Boolean);

  const paymentObjectIds = paymentIds.map(id => {
    try { return new mongoose.Types.ObjectId(id); } catch(e) { return null; }
  }).filter(Boolean);

  const [photos, orders, payments] = await Promise.all([
    db.collection("photos").find({ _id: { $in: photoObjectIds } }).toArray(),
    db.collection("orders").find({
      $or: [
        { _id: { $in: orderObjectIds } },
        { photoId: { $in: photoObjectIds } }
      ]
    }).toArray(),
    db.collection("payments").find({
      $or: [
        { photoId: { $in: photoIds } },
        { "metadata.notes.photoId": { $in: photoIds } },
        { _id: { $in: paymentObjectIds } }
      ]
    }).toArray(),
  ]);

  const invoices = await db.collection("invoices").find({
    $or: [
      { photoId: { $in: photoIds } },
      { gatewayPaymentId: { $in: payments.map(p => p.gatewayPaymentId).filter(Boolean) } }
    ]
  }).toArray();

  const photoMap = new Map(photos.map(p => [p._id.toString(), p]));
  const orderMap = new Map();
  orders.forEach(o => {
    orderMap.set(o._id.toString(), o);
    if (o.photoId) orderMap.set(`photo_${o.photoId.toString()}`, o);
  });

  const paymentMap = new Map();
  payments.forEach(p => {
    paymentMap.set(p._id.toString(), p);
    if (p.gatewayPaymentId) paymentMap.set(p.gatewayPaymentId, p);
    if (p.photoId) paymentMap.set(`photo_${p.photoId.toString()}`, p);
    if (p.metadata?.notes?.photoId) paymentMap.set(`photo_${p.metadata.notes.photoId}`, p);
  });

  const invoiceMap = new Map();
  invoices.forEach(inv => {
    if (inv.photoId) invoiceMap.set(String(inv.photoId), inv);
    if (inv.gatewayPaymentId) invoiceMap.set(inv.gatewayPaymentId, inv);
  });

  // Group by User -> Photo -> Events
  const userGroups = new Map();

  for (const event of rawEventsList) {
    const photoIdStr = event.photoId ? String(event.photoId) : (event.metadata?.photoId ? String(event.metadata.photoId) : null);
    const photo = photoIdStr ? photoMap.get(photoIdStr) : null;
    const order = (event.orderId ? orderMap.get(String(event.orderId)) : null) || (photoIdStr ? orderMap.get(`photo_${photoIdStr}`) : null);
    const payment = (event.paymentId ? paymentMap.get(String(event.paymentId)) : null) || (photoIdStr ? paymentMap.get(`photo_${photoIdStr}`) : null);
    const invoice = (photoIdStr ? invoiceMap.get(photoIdStr) : null) || (payment?.gatewayPaymentId ? invoiceMap.get(payment.gatewayPaymentId) : null);

    const userEmail =
      (event.actor && event.actor.includes("@") ? event.actor : null) ||
      event.metadata?.email ||
      event.metadata?.recipient ||
      payment?.email ||
      order?.guestEmail ||
      photo?.guestEmail ||
      invoice?.customerEmail ||
      (event.ipAddress ? `Guest (${event.ipAddress})` : "System Operations");

    if (!userGroups.has(userEmail)) {
      userGroups.set(userEmail, {
        userEmail,
        customerName: invoice?.customerName || invoice?.gatewayDetails?.cardHolderName || null,
        customerPhone: invoice?.customerPhone || invoice?.gatewayDetails?.contact || payment?.contact || null,
        photos: new Map(),
        generalEvents: []
      });
    }

    const uGroup = userGroups.get(userEmail);

    if (photoIdStr) {
      if (!uGroup.photos.has(photoIdStr)) {
        uGroup.photos.set(photoIdStr, {
          photoId: photoIdStr,
          photoDoc: photo || null,
          orderDoc: order || null,
          paymentDoc: payment || null,
          invoiceDoc: invoice || null,
          events: []
        });
      }
      const pGroup = uGroup.photos.get(photoIdStr);
      pGroup.events.push(event);
      if (!pGroup.orderDoc && order) pGroup.orderDoc = order;
      if (!pGroup.paymentDoc && payment) pGroup.paymentDoc = payment;
      if (!pGroup.invoiceDoc && invoice) pGroup.invoiceDoc = invoice;
    } else {
      uGroup.generalEvents.push(event);
    }
  }

  console.log(`\n=== BUILT TREE FOR ${userGroups.size} USERS ===`);
  for (const [email, uGroup] of Array.from(userGroups.entries()).slice(0, 4)) {
    console.log(`\n👤 USER: ${email} (${uGroup.customerName || 'No Name'}) | Photos: ${uGroup.photos.size} | General Events: ${uGroup.generalEvents.length}`);
    for (const [pid, pGroup] of uGroup.photos.entries()) {
      console.log(`   📸 PHOTO ID: ${pid} (${pGroup.photoDoc?.documentType || 'Biometric'})`);
      if (pGroup.paymentDoc) {
        console.log(`      💳 PAYMENT: ${pGroup.paymentDoc.gatewayPaymentId} | Order: ${pGroup.orderDoc?.orderNumber || pGroup.paymentDoc.gatewayOrderId} | Amount: ${pGroup.paymentDoc.amount} ${pGroup.paymentDoc.currency} (${pGroup.paymentDoc.method})`);
      }
      if (pGroup.invoiceDoc) {
        console.log(`      🧾 INVOICE: ${pGroup.invoiceDoc.invoiceNumber} | Total: ${pGroup.invoiceDoc.total}`);
      }
      console.log(`      ⏱️ LIFECYCLE EVENTS (${pGroup.events.length}):`);
      pGroup.events.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).forEach((e, idx, arr) => {
        const prev = idx > 0 ? arr[idx - 1] : null;
        const deltaMs = prev ? (new Date(e.createdAt).getTime() - new Date(prev.createdAt).getTime()) : 0;
        const deltaStr = idx === 0 ? "START" : `+${Math.round(deltaMs / 1000)}s`;
        console.log(`         [${e.eventType.toUpperCase()}] ${new Date(e.createdAt).toISOString()} (${deltaStr}) | Actor: ${e.actor} | IP: ${e.ipAddress || 'Internal'}`);
      });
    }
  }

  await mongoose.disconnect();
}

testTreeBuilder().catch(console.error);
