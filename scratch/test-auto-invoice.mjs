import mongoose from 'mongoose';

async function verifyInvoiceSetup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const latestInvoices = await db.collection("invoices").find({}).sort({ createdAt: -1 }).limit(3).toArray();
  console.log(`\n=== VERIFYING RECENT INVOICES (${latestInvoices.length}) ===`);
  for (const inv of latestInvoices) {
    console.log(`🧾 Invoice: ${inv.invoiceNumber}`);
    console.log(`   Customer: ${inv.customerName} (${inv.customerEmail})`);
    console.log(`   Photo ID: ${inv.photoId || 'N/A'}`);
    console.log(`   Amount: ${inv.currency} ${inv.total}`);
    console.log(`   Cloudinary URL: ${inv.cloudinaryUrl || 'Not uploaded yet'}`);
    console.log(`   Cloudinary Public ID: ${inv.cloudinaryPublicId || 'N/A'}`);
  }

  await mongoose.disconnect();
}

verifyInvoiceSetup().catch(console.error);
