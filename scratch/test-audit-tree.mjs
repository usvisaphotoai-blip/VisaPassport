import mongoose from 'mongoose';

async function testTree() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;
  const auditEvents = await db.collection("auditevents").find({}).sort({ createdAt: -1 }).limit(100).toArray();
  const photos = await db.collection("photos").find({}).toArray();
  const orders = await db.collection("orders").find({}).toArray();
  const payments = await db.collection("payments").find({}).toArray();
  const invoices = await db.collection("invoices").find({}).toArray();
  const users = await db.collection("users").find({}).toArray();

  console.log(`Loaded: ${auditEvents.length} audit events, ${photos.length} photos, ${orders.length} orders, ${payments.length} payments, ${invoices.length} invoices, ${users.length} users.`);

  // Maps
  const photoMap = new Map();
  photos.forEach(p => photoMap.set(p._id.toString(), p));

  const orderMap = new Map();
  orders.forEach(o => {
    orderMap.set(o._id.toString(), o);
    if (o.orderNumber) orderMap.set(o.orderNumber, o);
  });

  const paymentMap = new Map();
  payments.forEach(p => {
    paymentMap.set(p._id.toString(), p);
    if (p.gatewayPaymentId) paymentMap.set(p.gatewayPaymentId, p);
    if (p.gatewayOrderId) paymentMap.set(p.gatewayOrderId, p);
  });

  const invoiceMap = new Map();
  invoices.forEach(inv => {
    if (inv.gatewayPaymentId) invoiceMap.set(inv.gatewayPaymentId, inv);
    if (inv.paymentId) invoiceMap.set(inv.paymentId.toString(), inv);
    if (inv.photoId) invoiceMap.set(inv.photoId.toString(), inv);
  });

  const userMap = new Map();
  users.forEach(u => userMap.set(u._id.toString(), u));

  // Build tree
  const userNodes = new Map();

  auditEvents.forEach(evt => {
    const photoIdStr = evt.photoId ? evt.photoId.toString() : (evt.metadata?.photoId ? String(evt.metadata.photoId) : "");
    const orderIdStr = evt.orderId ? evt.orderId.toString() : (evt.metadata?.orderId ? String(evt.metadata.orderId) : "");
    const paymentIdStr = evt.paymentId ? evt.paymentId.toString() : (evt.metadata?.paymentId ? String(evt.metadata.paymentId) : (evt.metadata?.gatewayPaymentId || ""));

    const photo = photoIdStr ? photoMap.get(photoIdStr) : null;
    const order = orderIdStr ? orderMap.get(orderIdStr) : null;
    const payment = paymentIdStr ? paymentMap.get(paymentIdStr) : (photo?.razorpayPaymentId ? paymentMap.get(photo.razorpayPaymentId) : null);
    const invoice = payment?.gatewayPaymentId ? invoiceMap.get(payment.gatewayPaymentId) : (photoIdStr ? invoiceMap.get(photoIdStr) : null);

    const email = (
      (evt.actor && evt.actor.includes("@") ? evt.actor : null) ||
      evt.metadata?.email ||
      evt.metadata?.guestEmail ||
      evt.metadata?.recipient ||
      invoice?.customerEmail ||
      payment?.email ||
      order?.guestEmail ||
      photo?.guestEmail ||
      "guest@pixpassport.com"
    ).toLowerCase();

    const userName =
      invoice?.gatewayDetails?.cardHolderName ||
      invoice?.customerName ||
      payment?.customerName ||
      (email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1));

    if (!userNodes.has(email)) {
      userNodes.set(email, {
        email,
        name: userName,
        phone: invoice?.customerPhone || invoice?.gatewayDetails?.contact || payment?.contact || "",
        country: invoice?.customerCountry || "",
        firstSeen: evt.createdAt,
        lastActive: evt.createdAt,
        photos: new Map(),
        eventsCount: 0,
      });
    }

    const uNode = userNodes.get(email);
    uNode.eventsCount++;
    if (new Date(evt.createdAt) > new Date(uNode.lastActive)) uNode.lastActive = evt.createdAt;
    if (new Date(evt.createdAt) < new Date(uNode.firstSeen)) uNode.firstSeen = evt.createdAt;

    const pKey = photoIdStr || "general_session";
    if (!uNode.photos.has(pKey)) {
      uNode.photos.set(pKey, {
        photoId: photoIdStr || null,
        documentType: photo?.documentType || order?.documentType || evt.metadata?.documentType || "passport-photo",
        dimensions: evt.metadata?.dimensions || "Official Spec",
        status: photo?.status || "processed",
        createdAt: photo?.createdAt || evt.createdAt,
        transactions: new Map(),
        standaloneEvents: [],
      });
    }

    const pNode = uNode.photos.get(pKey);
    const tKey = payment?.gatewayPaymentId || paymentIdStr || (photo?.razorpayPaymentId) || "unpaid_session";

    if (tKey !== "unpaid_session" || payment || invoice) {
      if (!pNode.transactions.has(tKey)) {
        pNode.transactions.set(tKey, {
          paymentId: payment?.gatewayPaymentId || paymentIdStr || null,
          orderId: payment?.gatewayOrderId || order?.orderNumber || orderIdStr || null,
          bankRrn: invoice?.gatewayDetails?.bankRrn || null,
          authCode: invoice?.gatewayDetails?.authCode || null,
          method: invoice?.paymentMethod || payment?.method || "CARD",
          amount: invoice?.amount || payment?.amount || order?.amount || 7.99,
          currency: invoice?.currency || payment?.currency || "USD",
          status: payment?.status || "captured",
          capturedAt: payment?.createdAt || evt.createdAt,
          invoiceNumber: invoice?.invoiceNumber || null,
          events: [],
        });
      }
      const tNode = pNode.transactions.get(tKey);
      tNode.events.push(evt);
    } else {
      pNode.standaloneEvents.push(evt);
    }
  });

  console.log(`\n=== TREE BUILT: ${userNodes.size} Users ===`);
  userNodes.forEach((u, em) => {
    console.log(`\n👤 USER: ${u.name} <${em}> (${u.eventsCount} events)`);
    u.photos.forEach((ph, pId) => {
      console.log(`  📸 PHOTO: ${pId} [${ph.documentType}] - ${ph.transactions.size} transactions, ${ph.standaloneEvents.length} standalone events`);
      ph.transactions.forEach((tx, tId) => {
        console.log(`    💳 TRANSACTION: ${tId} (Order: ${tx.orderId}, ${tx.currency} ${tx.amount}) - ${tx.events.length} events`);
        tx.events.forEach(e => {
          console.log(`      ⏱️ [${e.eventType}] at ${new Date(e.createdAt).toLocaleTimeString()} - ${JSON.stringify(e.metadata || {})}`);
        });
      });
    });
  });

  await mongoose.disconnect();
}

testTree().catch(console.error);
