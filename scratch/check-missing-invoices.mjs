import mongoose from 'mongoose';

async function check() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const capturedPayments = await db.collection("payments").find({ status: "captured" }).sort({ createdAt: -1 }).toArray();
  const invoices = await db.collection("invoices").find({}).toArray();

  const invoicePaymentIds = new Set(invoices.map(inv => String(inv.paymentId)));
  const invoiceGatewayIds = new Set(invoices.map(inv => inv.gatewayPaymentId).filter(Boolean));

  const missing = capturedPayments.filter(p => !invoicePaymentIds.has(String(p._id)) && !invoiceGatewayIds.has(p.gatewayPaymentId));

  console.log(`Total captured payments: ${capturedPayments.length}`);
  console.log(`Total invoices: ${invoices.length}`);
  console.log(`Captured payments missing invoices: ${missing.length}`);

  for (const p of missing.slice(0, 10)) {
    console.log(`Missing: Payment ${p._id} | Gateway: ${p.gatewayPaymentId} | Amount: ${p.amount} ${p.currency} | Email: ${p.email} | Created: ${p.createdAt}`);
  }

  await mongoose.disconnect();
}

check().catch(console.error);
