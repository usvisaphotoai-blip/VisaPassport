import mongoose from 'mongoose';

async function test() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;
  const auditEvents = await db.collection("auditevents").find({}).sort({ createdAt: -1 }).limit(50).toArray();
  console.log("Total sample audit events:", auditEvents.length);

  const samplePhotoIds = Array.from(new Set(auditEvents.map(e => e.photoId ? String(e.photoId) : null).filter(Boolean)));
  console.log("Sample photo IDs in audit events:", samplePhotoIds.slice(0, 5));

  for (const pid of samplePhotoIds.slice(0, 3)) {
    const eventsForPhoto = await db.collection("auditevents").find({
      $or: [
        { photoId: pid },
        { photoId: new mongoose.Types.ObjectId(pid) }
      ]
    }).sort({ createdAt: 1 }).toArray();

    const photo = await db.collection("photos").findOne({ _id: new mongoose.Types.ObjectId(pid) });
    const payment = await db.collection("payments").findOne({
      $or: [
        { photoId: pid },
        { "metadata.notes.photoId": pid },
        ...(photo?.razorpayPaymentId ? [{ gatewayPaymentId: photo.razorpayPaymentId }] : [])
      ]
    });
    const order = await db.collection("orders").findOne({
      $or: [
        { photoId: pid },
        ...(photo?.orderId ? [{ _id: photo.orderId }] : []),
        ...(payment?.orderId ? [{ _id: payment.orderId }] : [])
      ]
    });
    const invoice = await db.collection("invoices").findOne({
      $or: [
        { photoId: pid },
        ...(payment?.gatewayPaymentId ? [{ gatewayPaymentId: payment.gatewayPaymentId }] : [])
      ]
    });

    console.log(`\n================= TREE FOR PHOTO ${pid} =================`);
    console.log("Photo Doc:", photo ? { _id: photo._id, docType: photo.documentType, guestEmail: photo.guestEmail, status: photo.status } : null);
    console.log("Order Doc:", order ? { orderNumber: order.orderNumber, guestEmail: order.guestEmail, amount: order.amount, currency: order.currency } : null);
    console.log("Payment Doc:", payment ? { gatewayPaymentId: payment.gatewayPaymentId, gatewayOrderId: payment.gatewayOrderId, amount: payment.amount, status: payment.status } : null);
    console.log("Invoice Doc:", invoice ? { invoiceNumber: invoice.invoiceNumber, total: invoice.total } : null);
    console.log(`Audit Events Count: ${eventsForPhoto.length}`);
    eventsForPhoto.forEach(e => {
      console.log(`  - [${e.eventType}] @ ${e.createdAt.toISOString()} | IP: ${e.ipAddress || 'N/A'} | actor: ${e.actor || 'N/A'}`);
    });
  }

  await mongoose.disconnect();
}

test().catch(console.error);
