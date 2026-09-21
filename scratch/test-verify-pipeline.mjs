import mongoose from 'mongoose';
import { autoGenerateAndStoreInvoice } from '../lib/invoice-automation.js';

async function testPipeline() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // Find recent payment
  const payment = await db.collection("payments").findOne({ gatewayPaymentId: "pay_Teh4RVDRljNJEe" });
  console.log("Found payment:", payment?.gatewayPaymentId, "Amount:", payment?.amount, payment?.currency);

  const res = await autoGenerateAndStoreInvoice({
    paymentIdOrGatewayId: payment.gatewayPaymentId,
    userEmail: "ipl961304@gmail.com",
    actor: "system"
  });

  console.log("Pipeline result:", {
    success: res.success,
    invoiceNumber: res.invoice?.invoiceNumber,
    cloudinaryUrl: res.cloudinaryUrl,
    pdfBufferLength: res.pdfBuffer?.length,
  });

  await mongoose.disconnect();
}

testPipeline().catch(console.error);
