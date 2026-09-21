import mongoose from "mongoose";
import fs from "fs";
import { generateAuditTrailPdfBuffer } from "../lib/pdf-audit-trail";

// Load .env manually
const envContent = fs.readFileSync(".env", "utf-8");
envContent.split("\n").forEach(line => {
  const [k, ...v] = line.split("=");
  if (k && v.length > 0) {
    const val = v.join("=").trim().replace(/^["']|["']$/g, '');
    process.env[k.trim()] = val;
  }
});

async function testPdfGen() {
  await mongoose.connect(process.env.MONGODB_URI || "");
  const db = mongoose.connection.db;
  if (!db) throw new Error("No db");

  // Find a user with downloads
  const downloadEvt = await db.collection("auditevents").findOne({ eventType: "download" });
  if (!downloadEvt) throw new Error("No download event found");

  const photoId = downloadEvt.photoId;
  const photo = await db.collection("photos").findOne({ _id: new mongoose.Types.ObjectId(photoId) });
  const order = await db.collection("orders").findOne({ photoId: new mongoose.Types.ObjectId(photoId) });
  const payment = await db.collection("payments").findOne({
    $or: [{ photoId }, { "metadata.notes.photoId": photoId }]
  });
  const invoice = await db.collection("invoices").findOne({ photoId });
  const events = await db.collection("auditevents").find({
    $or: [{ photoId }, { "metadata.photoId": photoId }]
  }).sort({ createdAt: 1 }).toArray();

  const userGroup = {
    userEmail: downloadEvt.actor,
    customerName: invoice?.customerName || payment?.email || "Test Customer",
    customerPhone: "+91 9876543210",
    photos: [
      {
        photoId,
        photoDoc: photo ? {
          _id: photo._id.toString(),
          documentType: photo.documentType,
          guestEmail: photo.guestEmail,
          status: photo.status,
          createdAt: photo.createdAt?.toISOString(),
        } : null,
        orderDoc: order ? {
          _id: order._id.toString(),
          orderNumber: order.orderNumber,
          guestEmail: order.guestEmail,
          amount: order.amount,
          currency: order.currency,
          status: order.status,
          documentType: order.documentType,
        } : null,
        paymentDoc: payment ? {
          _id: payment._id.toString(),
          gatewayPaymentId: payment.gatewayPaymentId,
          gatewayOrderId: payment.gatewayOrderId,
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,
          status: payment.status,
        } : null,
        invoiceDoc: invoice ? {
          _id: invoice._id.toString(),
          invoiceNumber: invoice.invoiceNumber,
          customerName: invoice.customerName,
          customerEmail: invoice.customerEmail,
          total: invoice.total,
          currency: invoice.currency,
          paymentMethod: invoice.paymentMethod,
          gatewayDetails: invoice.gatewayDetails,
        } : null,
        events: events.map(e => ({
          _id: e._id.toString(),
          eventType: e.eventType as any,
          actor: e.actor,
          ipAddress: e.ipAddress,
          userAgent: e.userAgent,
          photoId: e.photoId,
          orderId: e.orderId?.toString(),
          paymentId: e.paymentId?.toString(),
          metadata: e.metadata,
          createdAt: e.createdAt?.toISOString() || new Date().toISOString()
        }))
      }
    ],
    generalEvents: []
  };

  const pdfBuffer = generateAuditTrailPdfBuffer(userGroup);
  fs.writeFileSync("scratch/sample-audit-trail.pdf", pdfBuffer);
  console.log(`Generated PDF successfully! Size: ${pdfBuffer.byteLength} bytes written to scratch/sample-audit-trail.pdf`);

  await mongoose.disconnect();
}
testPdfGen().catch(console.error);
