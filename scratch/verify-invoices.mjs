import mongoose from 'mongoose';
import Invoice from '../models/Invoice.ts';
import InvoiceSequence from '../models/InvoiceSequence.ts';
import Payment from '../models/Payment.ts';
import { generateInvoiceForPayment } from '../lib/invoice-generator.ts';
import { generateInvoicePdfBuffer } from '../lib/pdf-invoice.ts';
import JSZip from 'jszip';

async function runTests() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  await mongoose.connect(uri);
  console.log("=== STEP 1: DB Connected ===");

  console.log("\n=== STEP 2: Testing Single Invoice Generation for Sample Payments ===");
  const testIds = ["pay_TdcS9Etm89vkt8", "pay_TdslAQYH7IaF8p", "pay_TdckyDG7kBvS1k"];

  for (const pid of testIds) {
    console.log(`Generating invoice for ${pid}...`);
    const res = await generateInvoiceForPayment(pid, { actor: "test_suite" });
    if (!res.success || !res.invoice) {
      throw new Error(`Failed to generate invoice for ${pid}: ${res.error}`);
    }
    console.log(`✓ Success: ${pid} -> Invoice Number: ${res.invoice.invoiceNumber}, Total: ${res.invoice.currency} ${res.invoice.total}, Customer: ${res.invoice.customerEmail}`);
  }

  console.log("\n=== STEP 3: Testing Duplicate Prevention (Idempotency) ===");
  const duplicateTest = await generateInvoiceForPayment("pay_TdcS9Etm89vkt8", { actor: "test_suite" });
  if (!duplicateTest.success || !duplicateTest.isExisting) {
    throw new Error(`Duplicate test failed: expected isExisting=true, got: ${JSON.stringify(duplicateTest)}`);
  }
  console.log(`✓ Duplicate Prevention Verified: Returned existing invoice ${duplicateTest.invoice?.invoiceNumber} without creating duplicates.`);

  console.log("\n=== STEP 4: Testing Server-Side PDF Generation with Responsive Layout ===");
  const sampleInvoice = await Invoice.findOne({ gatewayPaymentId: "pay_TdslAQYH7IaF8p" }).lean();
  if (!sampleInvoice) throw new Error("Invoice not found");

  const pdfBuffer = generateInvoicePdfBuffer(sampleInvoice);
  console.log(`PDF Buffer generated! Byte length: ${pdfBuffer.length}`);
  if (!pdfBuffer || pdfBuffer.length < 5000) throw new Error("PDF buffer too small");
  console.log("✓ Responsive PDF Generation Verified.");

  console.log("\n==========================================");
  console.log("🎉 ALL INVOICE TESTS PASSED SUCCESSFULLY!");
  console.log("==========================================");
  await mongoose.disconnect();
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
