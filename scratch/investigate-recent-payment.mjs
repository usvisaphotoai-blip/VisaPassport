import mongoose from 'mongoose';

async function investigate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log("=== LATEST PAYMENTS (Last 5) ===");
  const payments = await db.collection("payments").find({}).sort({ createdAt: -1 }).limit(5).toArray();
  for (const p of payments) {
    console.log(`Payment: ${p._id} | gatewayPaymentId: ${p.gatewayPaymentId} | gatewayOrderId: ${p.gatewayOrderId} | amount: ${p.amount} ${p.currency} | status: ${p.status} | email: ${p.email} | createdAt: ${p.createdAt}`);
  }

  console.log("\n=== LATEST ORDERS (Last 5) ===");
  const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).limit(5).toArray();
  for (const o of orders) {
    console.log(`Order: ${o._id} | orderNumber: ${o.orderNumber} | status: ${o.status} | guestEmail: ${o.guestEmail} | photoId: ${o.photoId} | createdAt: ${o.createdAt}`);
  }

  console.log("\n=== LATEST PHOTOS (Last 5) ===");
  const photos = await db.collection("photos").find({}).sort({ createdAt: -1 }).limit(5).toArray();
  for (const ph of photos) {
    console.log(`Photo: ${ph._id} | status: ${ph.status} | guestEmail: ${ph.guestEmail} | razorpayPaymentId: ${ph.razorpayPaymentId} | razorpayOrderId: ${ph.razorpayOrderId} | createdAt: ${ph.createdAt}`);
  }

  console.log("\n=== LATEST INVOICES (Last 5) ===");
  const invoices = await db.collection("invoices").find({}).sort({ createdAt: -1 }).limit(5).toArray();
  for (const inv of invoices) {
    console.log(`Invoice: ${inv.invoiceNumber} | paymentId: ${inv.paymentId} | gatewayPaymentId: ${inv.gatewayPaymentId} | customerEmail: ${inv.customerEmail} | cloudinaryUrl: ${inv.cloudinaryUrl} | createdAt: ${inv.createdAt}`);
  }

  console.log("\n=== LATEST AUDIT EVENTS (Last 10) ===");
  const events = await db.collection("auditevents").find({}).sort({ createdAt: -1 }).limit(10).toArray();
  for (const e of events) {
    console.log(`AuditEvent: [${e.eventType}] | actor: ${e.actor} | photoId: ${e.photoId} | orderId: ${e.orderId} | metadata: ${JSON.stringify(e.metadata)} | createdAt: ${e.createdAt}`);
  }

  await mongoose.disconnect();
}

investigate().catch(console.error);
