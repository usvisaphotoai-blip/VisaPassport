import { jsPDF } from "jspdf";
import fs from "fs";

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

const sampleInvoice = {
  invoiceNumber: "INV-2026-000045",
  invoiceDate: new Date("2026-09-21"),
  customerName: "Dr. Alexander Montgomery Christopher-Williams III",
  customerEmail: "alexander.montgomery.christopher.williams@international-enterprises.co.uk",
  customerCountry: "United Kingdom",
  gatewayPaymentId: "pay_TdcS9Etm89vkt8_LONG_EXPANDED_ID",
  orderNumber: "ORD-1789817960887-HSJBO-EXTRA-LONG-REF-99",
  paymentDate: new Date("2026-09-19T17:09:00Z"),
  paymentMethod: "card",
  amount: 23.97,
  currency: "USD",
  subtotal: 23.97,
  tax: 0,
  discount: 3.99,
  total: 19.98,
  lineItems: [
    {
      name: "United States (United States Visa (DS-160)) - AI Biometric Photo & Print Template",
      description: "Instant biometric compliance validation, AI background enhancement, official spec formatting (600x600px, 300 DPI), and downloadable 20-photo A4 print template.",
      quantity: 1,
      unitPrice: 7.99,
      total: 7.99,
    },
    {
      name: "Schengen Visa Biometric Photo Processing Pack (35x45 mm)",
      description: "Automated neutral background removal, biometrics alignment, lighting balance and high-res digital download.",
      quantity: 2,
      unitPrice: 7.99,
      total: 15.98,
    }
  ],
  fulfillmentEvidence: {
    photoDimensions: "600x600 px, 35x45 mm",
    photoProcessed: true,
    emailDelivered: true,
    downloadCount: 3,
    lastDownloadedAt: new Date("2026-09-19T17:10:00Z"),
  }
};

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 15;
const contentWidth = pageWidth - margin * 2; // 180mm

const darkSlate = [15, 23, 42];
const midSlate = [71, 85, 105];
const lightSlate = [148, 163, 184];
const flatBg = [248, 250, 252];
const flatBorder = [226, 232, 240];
const limeAccent = [132, 204, 22];
const emeraldDark = [5, 150, 105];
const emeraldBg = [236, 253, 245];
const emeraldBorder = [167, 243, 208];

// 1. Top Brand Stripe
doc.setFillColor(limeAccent[0], limeAccent[1], limeAccent[2]);
doc.rect(0, 0, pageWidth, 3.5, "F");

let y = 14;

// 2. Header Section
let brandTextX = margin;
if (APP_LOGO_BASE64) {
  try {
    doc.addImage(APP_LOGO_BASE64, "PNG", margin, y, 14, 14);
    brandTextX = margin + 18;
  } catch (e) {}
}

doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
doc.text("PixPassport", brandTextX, y + 5.5);

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
doc.text(sampleInvoice.invoiceNumber, pageWidth - margin, y + 10, { align: "right" });

// Status Tag: PAID
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

// Date
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

// Two Column Cards
const colGap = 5;
const colWidth = (contentWidth - colGap) / 2;
const cardInnerWidth = colWidth - 8;

const custNameLines = doc.splitTextToSize(sampleInvoice.customerName || "Customer", cardInnerWidth);
const custEmailLines = doc.splitTextToSize(sampleInvoice.customerEmail || "N/A", cardInnerWidth);

const cardLeftLinesCount = 1 + custNameLines.length + custEmailLines.length + (sampleInvoice.customerCountry ? 1 : 0) + 1;
const cardRightLinesCount = 5;
const maxLines = Math.max(cardLeftLinesCount, cardRightLinesCount);
const cardHeight = Math.max(36, 12 + maxLines * 4.5);

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

if (sampleInvoice.customerCountry) {
  doc.text(`Country: ${sampleInvoice.customerCountry}`, margin + 4, curCardY);
  curCardY += 3.8;
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
curRightY += 4.2;

const payIdLines = doc.splitTextToSize(`Payment ID: ${sampleInvoice.gatewayPaymentId}`, cardInnerWidth);
doc.text(payIdLines, rightColX + 4, curRightY);
curRightY += payIdLines.length * 4.0;

const orderLines = doc.splitTextToSize(`Order Number: ${sampleInvoice.orderNumber}`, cardInnerWidth);
doc.text(orderLines, rightColX + 4, curRightY);
curRightY += orderLines.length * 4.0;

doc.text(`Payment Date: Sep 19, 2026, 05:09 PM`, rightColX + 4, curRightY);
curRightY += 4.2;
doc.text(`Method: CARD • Status: Captured`, rightColX + 4, curRightY);

y += cardHeight + 6;

// Table Header
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

// Render Items
const descMaxColWidth = 100;
sampleInvoice.lineItems.forEach((item) => {
  const rowStartY = y;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  const titleLines = doc.splitTextToSize(item.name, descMaxColWidth);
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
  doc.text(formatCurrency(item.unitPrice, sampleInvoice.currency), margin + 150, rowStartY + 5.5, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(
    formatCurrency(item.total, sampleInvoice.currency),
    margin + contentWidth - 4,
    rowStartY + 5.5,
    { align: "right" }
  );

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
doc.text(formatCurrency(sampleInvoice.subtotal, sampleInvoice.currency), margin + contentWidth - 4, totalsCurY, {
  align: "right",
});
totalsCurY += 5;

doc.text("Tax / GST (0%):", totalsBoxX, totalsCurY);
doc.text("Tax Exempt ($0.00)", margin + contentWidth - 4, totalsCurY, { align: "right" });
totalsCurY += 5;

if (sampleInvoice.discount > 0) {
  doc.text("Discount:", totalsBoxX, totalsCurY);
  doc.text(`-${formatCurrency(sampleInvoice.discount, sampleInvoice.currency)}`, margin + contentWidth - 4, totalsCurY, { align: "right" });
  totalsCurY += 5;
}

totalsCurY += 2;

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
doc.text(formatCurrency(sampleInvoice.total, sampleInvoice.currency), margin + contentWidth - 4, totalsCurY + 6.5, {
  align: "right",
});

y = totalsCurY + totalPaidCardH + 7;

// Compliance Trail Card
const fulfillment = sampleInvoice.fulfillmentEvidence || {};
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
doc.text(`• Ref ID: ${sampleInvoice.gatewayPaymentId.slice(0, 24)}`, margin + 4, y + 15);
doc.text(`• Method: ${(sampleInvoice.paymentMethod || "Card").toUpperCase()}`, margin + 4, y + 19.5);
doc.text(`• Total: ${formatCurrency(sampleInvoice.total, sampleInvoice.currency)}`, margin + 4, y + 24);

const c2X = margin + fColWidth;
doc.text(`• Specs: Official Standards`, c2X, y + 10.5);
doc.text(`• Size: ${fulfillment.photoDimensions || "600x600 px"}`, c2X, y + 15);
doc.text(`• Background: Corrected`, c2X, y + 19.5);
doc.text(`• Template: 20-Photo Sheet`, c2X, y + 24);

const c3X = margin + fColWidth * 2;
doc.text(`• Deliveries: 3 download(s)`, c3X, y + 10.5);
doc.text(`• Email: Delivered`, c3X, y + 15);
doc.text(`• Status: Completed & Active`, c3X, y + 19.5);
doc.text(`• Money-Back Guarantee: Active`, c3X, y + 24);

// Assurance Note (Rendered with clean green bullet / text, no unsupported Unicode symbol)
doc.setFont("helvetica", "bold");
doc.setFontSize(7.5);
doc.setTextColor(emeraldDark[0], emeraldDark[1], emeraldDark[2]);
doc.text(
  "• Digitally authenticated & verified by PixPassport Automated Billing Engine.",
  margin + 4,
  y + 30
);

// Footer
const footerY = pageHeight - 15;
doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
doc.setLineWidth(0.25);
doc.line(margin, footerY - 3.5, pageWidth - margin, footerY - 3.5);

doc.setFont("helvetica", "normal");
doc.setFontSize(7.5);
doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);

doc.text(
  `PixPassport • https://pixpassport.com • support@pixpassport.com`,
  margin,
  footerY
);
doc.text(
  `Refund Policy: https://pixpassport.com/refund-policy`,
  margin,
  footerY + 3.8
);

doc.text(
  `Generated on Sep 21, 2026 | Page 1 of 1`,
  pageWidth - margin,
  footerY,
  { align: "right" }
);

const buffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync("scratch/test_multi_invoice.pdf", buffer);
console.log("Multi-item responsive PDF created! Total height used (y):", y);
