import mongoose from 'mongoose';

async function inspect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  const db = mongoose.connection.db;
  const payments = await db.collection("payments").find({ gatewayPaymentId: "pay_TdslAQYH7IaF8p" }).toArray();
  console.log("=== PAYMENT RECORD (pay_TdslAQYH7IaF8p) ===");
  console.log(JSON.stringify(payments[0], null, 2));

  console.log("\n=== ALL RECENT 3 PAYMENTS ===");
  const allPay = await db.collection("payments").find({ status: "captured" }).limit(3).toArray();
  allPay.forEach(p => {
    console.log("ID:", p.gatewayPaymentId, "Email:", p.customerEmail || p.email, "Phone/Contact:", p.contact || p.phone, "Metadata:", p.metadata, "RawEvent keys:", p.rawEvent ? Object.keys(p.rawEvent) : null);
  });

  const orders = await db.collection("orders").find({}).limit(2).toArray();
  console.log("\n=== SAMPLE ORDER RECORD ===");
  console.log(JSON.stringify(orders[0], null, 2));

  await mongoose.disconnect();
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});
