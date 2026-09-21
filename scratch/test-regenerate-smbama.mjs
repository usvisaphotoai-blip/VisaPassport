import mongoose from 'mongoose';
import Invoice from '../models/Invoice.ts';
import { generateInvoiceForPayment } from '../lib/invoice-generator.ts';
import { generateInvoicePdfBuffer } from '../lib/pdf-invoice.ts';
import fs from 'fs';

async function testSmbama() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);

  console.log("=== Regenerating Invoice for pay_TdslAQYH7IaF8p with live Razorpay data ===");
  const res = await generateInvoiceForPayment("pay_TdslAQYH7IaF8p", {
    actor: "test_razorpay_enrichment",
    forceRegenerate: true
  });

  if (!res.success || !res.invoice) {
    throw new Error(`Generation failed: ${res.error}`);
  }

  const inv = res.invoice;
  console.log("=== ENRICHED INVOICE RESULT ===");
  console.log("Invoice Number:", inv.invoiceNumber);
  console.log("Customer Name (from Card):", inv.customerName);
  console.log("Customer Email:", inv.customerEmail);
  console.log("Customer Phone:", inv.customerPhone);
  console.log("Photo ID:", inv.photoId);
  console.log("Payment Method:", inv.paymentMethod);
  console.log("Gateway Details:", JSON.stringify(inv.gatewayDetails, null, 2));

  console.log("\n=== Generating PDF with Enriched Data ===");
  const pdfBuffer = generateInvoicePdfBuffer(inv.toObject ? inv.toObject() : inv);
  fs.writeFileSync("scratch/smbama_enriched_invoice.pdf", pdfBuffer);
  console.log("Enriched PDF saved to scratch/smbama_enriched_invoice.pdf");

  await mongoose.disconnect();
}

testSmbama().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
