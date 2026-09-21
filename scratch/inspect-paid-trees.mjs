import mongoose from 'mongoose';

async function testPaid() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;
  const payments = await db.collection("payments").find({ status: "captured" }).limit(5).toArray();

  for (const pay of payments) {
    const photoId = pay.photoId || pay.metadata?.notes?.photoId;
    console.log(`\n=================== PAID TRANSACTION: ${pay.gatewayPaymentId} ===================`);
    console.log("Payment:", {
      gatewayPaymentId: pay.gatewayPaymentId,
      gatewayOrderId: pay.gatewayOrderId,
      amount: pay.amount,
      currency: pay.currency,
      email: pay.email,
      method: pay.method,
      createdAt: pay.createdAt
    });

    const photo = photoId ? await db.collection("photos").findOne({
      $or: [
        { _id: new mongoose.Types.ObjectId(photoId) },
        { razorpayPaymentId: pay.gatewayPaymentId }
      ]
    }) : null;
    console.log("Photo:", photo ? { _id: photo._id, docType: photo.documentType, guestEmail: photo.guestEmail, status: photo.status, createdAt: photo.createdAt } : null);

    const order = await db.collection("orders").findOne({
      $or: [
        ...(pay.orderId ? [{ _id: pay.orderId }] : []),
        ...(pay.gatewayOrderId ? [{ "metadata.razorpayOrderId": pay.gatewayOrderId }] : []),
        ...(photoId ? [{ photoId: new mongoose.Types.ObjectId(photoId) }] : [])
      ]
    });
    console.log("Order:", order ? { orderNumber: order.orderNumber, guestEmail: order.guestEmail, amount: order.amount, currency: order.currency, createdAt: order.createdAt } : null);

    const invoice = await db.collection("invoices").findOne({
      $or: [
        { gatewayPaymentId: pay.gatewayPaymentId },
        ...(photoId ? [{ photoId: String(photoId) }] : [])
      ]
    });
    console.log("Invoice:", invoice ? { invoiceNumber: invoice.invoiceNumber, total: invoice.total, customerName: invoice.customerName, createdAt: invoice.createdAt } : null);

    const events = await db.collection("auditevents").find({
      $or: [
        { paymentId: pay._id },
        { paymentId: String(pay._id) },
        ...(pay.gatewayPaymentId ? [{ "metadata.gatewayPaymentId": pay.gatewayPaymentId }] : []),
        ...(photoId ? [{ photoId: String(photoId) }, { photoId: new mongoose.Types.ObjectId(photoId) }] : []),
        ...(order?._id ? [{ orderId: order._id }, { orderId: String(order._id) }] : [])
      ]
    }).sort({ createdAt: 1 }).toArray();

    console.log(`Related Audit Events (${events.length}):`);
    events.forEach(e => {
      console.log(`  - [${e.eventType.toUpperCase()}] @ ${e.createdAt.toISOString()} | actor: ${e.actor} | IP: ${e.ipAddress} | meta: ${JSON.stringify(e.metadata)}`);
    });
  }

  await mongoose.disconnect();
}

testPaid().catch(console.error);
