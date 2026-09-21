import mongoose from 'mongoose';

async function checkAuditEvents() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;

  console.log("=== CHECKING AUDIT EVENTS FOR pay_TdslAQYH7IaF8p ===");
  const payment = await db.collection("payments").findOne({ gatewayPaymentId: "pay_TdslAQYH7IaF8p" });
  console.log("Payment found:", payment ? { id: payment._id, photoId: payment.photoId, orderId: payment.orderId } : "none");

  if (payment) {
    const filters = [];
    if (payment._id) filters.push({ paymentId: payment._id.toString() });
    if (payment.photoId) filters.push({ photoId: payment.photoId.toString() });
    if (payment.orderId) filters.push({ orderId: payment.orderId.toString() });
    
    const events = await db.collection("auditevents").find({ $or: filters }).sort({ createdAt: 1 }).toArray();
    console.log(`Found ${events.length} audit events for this payment:`);
    events.forEach((ev, i) => {
      console.log(`[${i+1}] Type: ${ev.eventType} | At: ${ev.createdAt} | Actor: ${ev.actor}`);
      console.log(`     PhotoID: ${ev.photoId} | OrderID: ${ev.orderId} | PaymentID: ${ev.paymentId} | UserID: ${ev.userId}`);
      console.log(`     Metadata:`, JSON.stringify(ev.metadata));
      console.log(`     IP: ${ev.ipAddress} | UA: ${ev.userAgent}`);
    });
  }

  console.log("\n=== RECENT 10 GENERAL AUDIT EVENTS ===");
  const recent = await db.collection("auditevents").find({}).sort({ createdAt: -1 }).limit(10).toArray();
  recent.forEach((ev, i) => {
    console.log(`[${i+1}] Type: ${ev.eventType} | PhotoID: ${ev.photoId} | PaymentID: ${ev.paymentId} | OrderID: ${ev.orderId} | UserID: ${ev.userId} | Metadata keys: ${ev.metadata ? Object.keys(ev.metadata).join(', ') : 'none'}`);
  });

  await mongoose.disconnect();
}

checkAuditEvents().catch(console.error);
