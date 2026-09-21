import mongoose from 'mongoose';

async function debugInvoice() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const payment = await db.collection("payments").findOne({
    $or: [
      { gatewayPaymentId: "pay_Teh4RVDRljNJEe" },
      { gatewayOrderId: "order_Teh3oH1ilCFnCw" },
    ]
  });
  console.log("Payment record in DB:", payment);

  const photo = await db.collection("photos").findOne({ _id: new mongoose.Types.ObjectId("6ab1287fe90fa9aee409d4a4") });
  console.log("Photo record in DB:", {
    _id: photo._id,
    status: photo.status,
    guestEmail: photo.guestEmail,
    razorpayPaymentId: photo.razorpayPaymentId,
    razorpayOrderId: photo.razorpayOrderId,
    orderId: photo.orderId,
  });

  const order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId("6ab12897e90fa9aee409d4ab") });
  console.log("Order record in DB:", order);

  const existingInvoice = await db.collection("invoices").findOne({
    $or: [
      { gatewayPaymentId: "pay_Teh4RVDRljNJEe" },
      { photoId: "6ab1287fe90fa9aee409d4a4" },
    ]
  });
  console.log("Existing Invoice in DB:", existingInvoice);

  await mongoose.disconnect();
}

debugInvoice().catch(console.error);
