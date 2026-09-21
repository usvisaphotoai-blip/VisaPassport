import https from 'https';
import mongoose from 'mongoose';
import fs from 'fs';
import { jsPDF } from "jspdf";

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const uri = process.env.MONGODB_URI;

async function fetchRz(pid) {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  return new Promise((resolve, reject) => {
    const req = https.request(`https://api.razorpay.com/v1/payments/${pid}`, {
      headers: { Authorization: `Basic ${auth}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const payment = await db.collection("payments").findOne({ gatewayPaymentId: "pay_TdslAQYH7IaF8p" });
  const rz = await fetchRz("pay_TdslAQYH7IaF8p");

  console.log("=== RAZORPAY EXTRACTED DATA ===");
  console.log("Card Name:", rz.card?.name);
  console.log("Contact:", rz.contact);
  console.log("Email:", rz.email);
  console.log("Notes PhotoId:", rz.notes?.photoId);
  console.log("Bank RRN:", rz.acquirer_data?.rrn);
  console.log("Auth Code:", rz.acquirer_data?.auth_code);
  console.log("Card:", `${rz.card?.network} ${rz.card?.type} (•••• ${rz.card?.last4})`);
  console.log("Fee:", rz.fee ? (rz.fee/100).toFixed(2) : "0");

  // Update existing invoice document in DB with full enriched data
  await db.collection("invoices").updateOne(
    { gatewayPaymentId: "pay_TdslAQYH7IaF8p" },
    {
      $set: {
        photoId: rz.notes?.photoId || payment.photoId,
        customerName: rz.card?.name || "Sylvia Mbama",
        customerEmail: rz.email || "smbama@gmail.com",
        customerPhone: rz.contact || "+233244282905",
        paymentMethod: `${rz.card?.network || "Visa"} ${rz.card?.type || "Debit"} (•••• ${rz.card?.last4 || "4262"})`,
        gatewayDetails: {
          gatewayPaymentId: rz.id,
          gatewayOrderId: rz.order_id,
          bankRrn: rz.acquirer_data?.rrn,
          authCode: rz.acquirer_data?.auth_code,
          cardId: rz.card_id,
          cardHolderName: rz.card?.name,
          cardLast4: rz.card?.last4,
          cardNetwork: rz.card?.network,
          cardType: rz.card?.type,
          cardSubType: rz.card?.sub_type,
          fee: rz.fee ? rz.fee / 100 : undefined,
          tax: rz.tax ? rz.tax / 100 : undefined,
          description: rz.description,
          notes: rz.notes,
          contact: rz.contact,
        }
      }
    }
  );
  console.log("✓ Updated invoice in MongoDB with Razorpay data!");

  await mongoose.disconnect();
}

run().catch(console.error);
