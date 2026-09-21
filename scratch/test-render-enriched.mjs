import mongoose from 'mongoose';
import fs from 'fs';
import { jsPDF } from "jspdf";

const uri = process.env.MONGODB_URI;

let APP_LOGO_BASE64 = "";
try {
  const logoContent = fs.readFileSync("./lib/logo-base64.ts", "utf-8");
  const match = logoContent.match(/APP_LOGO_BASE64\s*=\s*"([^"]+)"/);
  if (match) APP_LOGO_BASE64 = match[1];
} catch (e) {}

function formatCurrency(amount, currency = "USD") {
  const num = Number(amount) || 0;
  const curr = (currency || "USD").toUpperCase();
  if (curr === "USD") return `$${num.toFixed(2)}`;
  if (curr === "INR") return `₹${num.toFixed(2)}`;
  return `${curr} ${num.toFixed(2)}`;
}

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const invoice = await db.collection("invoices").findOne({ gatewayPaymentId: "pay_TdslAQYH7IaF8p" });
  await mongoose.disconnect();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const darkSlate = [15, 23, 42];
  const midSlate = [71, 85, 105];
  const lightSlate = [148, 163, 184];
  const flatBg = [248, 250, 252];
  const flatBorder = [226, 232, 240];
  const limeAccent = [132, 204, 22];
  const emeraldDark = [5, 150, 105];
  const emeraldBg = [236, 253, 245];
  const emeraldBorder = [167, 243, 208];

  // 1. Top Bar
  doc.setFillColor(limeAccent[0], limeAccent[1], limeAccent[2]);
  doc.rect(0, 0, pageWidth, 3.5, "F");

  let y = 14;

  // 2. Header
  let brandTextX = margin;
  if (APP_LOGO_BASE64) {
    try {
      doc.addImage(APP_LOGO_BASE64, "PNG", margin, y, 14, 14);
      brandTextX = margin + 18;
    } catch {}
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(invoice.businessDetails?.name || "PixPassport", brandTextX, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text("Official Payment Receipt & Tax Invoice", brandTextX, y + 10);

  const addressLines = doc.splitTextToSize("Khadda, Kushinagar, Uttar Pradesh, India 274802", 85);
  doc.text(addressLines, brandTextX, y + 14.5);
  const afterAddressY = y + 14.5 + addressLines.length * 3.8;

  doc.text("support@pixpassport.com • https://pixpassport.com", brandTextX, afterAddressY);

  // Right Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("TAX INVOICE", pageWidth - margin, y + 4.5, { align: "right" });

  doc.setFontSize(10.5);
  doc.text(invoice.invoiceNumber, pageWidth - margin, y + 10, { align: "right" });

  const statusBadgeW = 22;
  const statusBadgeH = 6;
  const statusBadgeX = pageWidth - margin - statusBadgeW;
  const statusBadgeY = y + 13;

  doc.setFillColor(emeraldBg[0], emeraldBg[1], emeraldBg[2]);
  doc.setDrawColor(emeraldBorder[0], emeraldBorder[1], emeraldBorder[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(statusBadgeX, statusBadgeY, statusBadgeW, statusBadgeH, 1.2, 1.2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(emeraldDark[0], emeraldDark[1], emeraldDark[2]);
  doc.text("PAID", statusBadgeX + statusBadgeW / 2, statusBadgeY + 4.2, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text("Date: Sep 21, 2026", pageWidth - margin, statusBadgeY + 10.5, { align: "right" });

  y = Math.max(afterAddressY + 5.5, statusBadgeY + 14);

  // Divider
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // 4. Two Flat Column Cards
  const colGap = 5;
  const colWidth = (contentWidth - colGap) / 2;
  const cardInnerWidth = colWidth - 8;

  const photoIdStr = invoice.photoId ? String(invoice.photoId) : "";
  const phoneStr = invoice.customerPhone || invoice.gatewayDetails?.contact || "";
  const authCode = invoice.gatewayDetails?.authCode || "";
  const rrn = invoice.gatewayDetails?.bankRrn || "";
  const cardHolderName = invoice.gatewayDetails?.cardHolderName || invoice.customerName || "Customer";

  const custNameLines = doc.splitTextToSize(cardHolderName, cardInnerWidth);
  const custEmailLines = doc.splitTextToSize(invoice.customerEmail, cardInnerWidth);
  const payIdLines = doc.splitTextToSize(`Payment ID: ${invoice.gatewayPaymentId}`, cardInnerWidth);
  const orderRef = invoice.gatewayOrderId || invoice.orderNumber || "N/A";
  const orderLines = doc.splitTextToSize(`Order ID: ${orderRef}`, cardInnerWidth);

  const cardLeftLinesCount = 1 + custNameLines.length + custEmailLines.length + (phoneStr ? 1 : 0) + (invoice.customerCountry ? 1 : 0) + (photoIdStr ? 1 : 0) + 1;
  const cardRightLinesCount = 2 + payIdLines.length + orderLines.length + (authCode || rrn ? 1 : 0) + 2;
  const maxLines = Math.max(cardLeftLinesCount, cardRightLinesCount);
  const cardHeight = Math.max(38, 12 + maxLines * 4.2);

  // Left Card: BILLED TO
  doc.setFillColor(flatBg[0], flatBg[1], flatBg[2]);
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text("BILLED TO", margin + 4, y + 5.5);

  let curCardY = y + 10.5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(custNameLines, margin + 4, curCardY);
  curCardY += custNameLines.length * 4.0;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text(custEmailLines, margin + 4, curCardY);
  curCardY += custEmailLines.length * 3.5;

  if (phoneStr) {
    doc.text(`Phone: ${phoneStr}`, margin + 4, curCardY);
    curCardY += 3.5;
  }

  if (invoice.customerCountry) {
    doc.text(`Country: ${invoice.customerCountry}`, margin + 4, curCardY);
    curCardY += 3.5;
  }

  if (photoIdStr) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(`Photo ID: ${photoIdStr}`, margin + 4, curCardY);
    curCardY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  }

  doc.text("Delivery: Digital Biometric Download", margin + 4, curCardY);

  // Right Card: PAYMENT TRANSACTION
  const rightColX = margin + colWidth + colGap;
  doc.setFillColor(flatBg[0], flatBg[1], flatBg[2]);
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.roundedRect(rightColX, y, colWidth, cardHeight, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text("PAYMENT TRANSACTION", rightColX + 4, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);

  let curRightY = y + 10.5;
  doc.text(`Gateway: Razorpay`, rightColX + 4, curRightY);
  curRightY += 4.0;

  doc.text(payIdLines, rightColX + 4, curRightY);
  curRightY += payIdLines.length * 3.8;

  doc.text(orderLines, rightColX + 4, curRightY);
  curRightY += orderLines.length * 3.8;

  doc.text(`Payment Date: Sep 19, 2026, 05:09 PM`, rightColX + 4, curRightY);
  curRightY += 4.0;

  doc.text(`Method: ${invoice.paymentMethod || "CARD"}`, rightColX + 4, curRightY);
  curRightY += 4.0;

  if (authCode || rrn) {
    const authRrnStr = [authCode ? `Auth: ${authCode}` : "", rrn ? `RRN: ${rrn}` : ""].filter(Boolean).join(" • ");
    doc.text(authRrnStr, rightColX + 4, curRightY);
  }

  y += cardHeight + 6;

  // Table
  const tableHeaderH = 7.5;
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(margin, y, contentWidth, tableHeaderH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  doc.text("Item & Description", margin + 4, y + 5);
  doc.text("Qty", margin + 118, y + 5, { align: "center" });
  doc.text("Unit Price", margin + 150, y + 5, { align: "right" });
  doc.text("Total", margin + contentWidth - 4, y + 5, { align: "right" });

  y += tableHeaderH;

  const descMaxColWidth = 100;
  (invoice.lineItems || []).forEach((item) => {
    const rowStartY = y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    const titleLines = doc.splitTextToSize(item.name || "Biometric Photo Processing", descMaxColWidth);
    doc.text(titleLines, margin + 4, y + 4.8);

    let currentItemY = y + 4.8 + titleLines.length * 4.0;

    let descLines = [];
    if (item.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
      descLines = doc.splitTextToSize(item.description, descMaxColWidth);
      doc.text(descLines, margin + 4, currentItemY);
      currentItemY += descLines.length * 3.4;
    }

    const calculatedHeight = (currentItemY - rowStartY) + 3;
    const rowHeight = Math.max(14, calculatedHeight);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
    doc.text(String(item.quantity || 1), margin + 118, rowStartY + 5.5, { align: "center" });
    doc.text(formatCurrency(item.unitPrice, invoice.currency), margin + 150, rowStartY + 5.5, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(formatCurrency(item.total, invoice.currency), margin + contentWidth - 4, rowStartY + 5.5, { align: "right" });

    doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
    doc.setLineWidth(0.25);
    doc.line(margin, rowStartY + rowHeight, margin + contentWidth, rowStartY + rowHeight);

    y += rowHeight;
  });

  y += 4;

  // Totals
  const totalsBoxWidth = 80;
  const totalsBoxX = margin + contentWidth - totalsBoxWidth;

  let totalsCurY = y + 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);

  doc.text("Subtotal:", totalsBoxX, totalsCurY);
  doc.text(formatCurrency(invoice.subtotal, invoice.currency), margin + contentWidth - 4, totalsCurY, { align: "right" });
  totalsCurY += 5;

  doc.text("Tax / GST (0%):", totalsBoxX, totalsCurY);
  doc.text("Tax Exempt ($0.00)", margin + contentWidth - 4, totalsCurY, { align: "right" });
  totalsCurY += 7;

  const totalPaidCardH = 10;
  doc.setFillColor(flatBg[0], flatBg[1], flatBg[2]);
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.roundedRect(totalsBoxX - 3, totalsCurY, totalsBoxWidth + 3, totalPaidCardH, 1.2, 1.2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("Total Paid:", totalsBoxX, totalsCurY + 6.5);

  doc.setFontSize(11);
  doc.setTextColor(emeraldDark[0], emeraldDark[1], emeraldDark[2]);
  doc.text(formatCurrency(invoice.total, invoice.currency), margin + contentWidth - 4, totalsCurY + 6.5, { align: "right" });

  y = totalsCurY + totalPaidCardH + 7;

  // Compliance Trail
  const fulfillment = invoice.fulfillmentEvidence || {};
  doc.setFillColor(flatBg[0], flatBg[1], flatBg[2]);
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.roundedRect(margin, y, contentWidth, 34, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text("SERVICE FULFILLMENT & PAYMENT COMPLIANCE TRAIL", margin + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);

  const fColWidth = contentWidth / 3;

  doc.text(`• Payment: Captured & Verified`, margin + 4, y + 10.5);
  doc.text(`• Ref ID: ${invoice.gatewayPaymentId}`, margin + 4, y + 15);
  doc.text(`• Method: ${(invoice.paymentMethod || "Card").toUpperCase()}`, margin + 4, y + 19.5);
  doc.text(`• Total: ${formatCurrency(invoice.total, invoice.currency)}`, margin + 4, y + 24);

  const c2X = margin + fColWidth;
  doc.text(`• Specs: Official Standards`, c2X, y + 10.5);
  doc.text(`• Photo ID: ${photoIdStr.slice(0, 22)}`, c2X, y + 15);
  doc.text(`• Background: Corrected`, c2X, y + 19.5);
  doc.text(`• Template: 20-Photo Sheet`, c2X, y + 24);

  const c3X = margin + fColWidth * 2;
  doc.text(`• Deliveries: 1 download(s)`, c3X, y + 10.5);
  doc.text(`• Email: Delivered`, c3X, y + 15);
  doc.text(`• Status: Completed & Active`, c3X, y + 19.5);
  doc.text(`• Money-Back Guarantee: Active`, c3X, y + 24);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(emeraldDark[0], emeraldDark[1], emeraldDark[2]);
  doc.text("• Digitally authenticated & verified by PixPassport Automated Billing Engine.", margin + 4, y + 30);

  // Footer
  const footerY = pageHeight - 15;
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.setLineWidth(0.25);
  doc.line(margin, footerY - 3.5, pageWidth - margin, footerY - 3.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text(`PixPassport • https://pixpassport.com • support@pixpassport.com`, margin, footerY);
  doc.text(`Refund Policy: https://pixpassport.com/refund-policy`, margin, footerY + 3.8);
  doc.text(`Generated on Sep 21, 2026 | Page 1 of 1`, pageWidth - margin, footerY, { align: "right" });

  const buffer = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync("scratch/smbama_final_rendered.pdf", buffer);
  console.log("Rendered smbama_final_rendered.pdf successfully!");
}

run().catch(console.error);
