import { jsPDF } from "jspdf";
import { IInvoice } from "@/models/Invoice";
import { APP_LOGO_BASE64 } from "@/lib/logo-base64";
import { formatCurrency } from "@/lib/currency-formatter";

export { formatCurrency };

/**
 * Generates an official server-side A4 PDF Invoice using jsPDF with responsive flat UI layout and app logo.
 * Enriched with Photo ID, Razorpay customer contact details, card information, and compliance logs.
 * Returns a Buffer containing the complete binary PDF.
 */
export function generateInvoicePdfBuffer(invoice: Partial<IInvoice>): Buffer {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2; // 180mm

  // Flat Color Palette
  const darkSlate = [15, 23, 42]; // #0f172a - Primary text
  const midSlate = [71, 85, 105]; // #475569 - Secondary text
  const lightSlate = [148, 163, 184]; // #94a3b8 - Muted text
  const flatBg = [248, 250, 252]; // #f8fafc - Card fill
  const flatBorder = [226, 232, 240]; // #e2e8f0 - Flat 1px borders
  const limeAccent = [132, 204, 22]; // #84cc16 - Brand Accent
  const emeraldDark = [5, 150, 105]; // #059669 - Green text
  const emeraldBg = [236, 253, 245]; // #ecfdf5 - Green tag bg
  const emeraldBorder = [167, 243, 208]; // #a7f3d0 - Green tag border

  // 1. Top Clean Flat Accent Line
  doc.setFillColor(limeAccent[0], limeAccent[1], limeAccent[2]);
  doc.rect(0, 0, pageWidth, 3.5, "F");

  let y = 14;

  // 2. Header Section: Logo + Company Info (Left) | Flat Invoice & Status (Right)
  let brandTextX = margin;

  if (APP_LOGO_BASE64) {
    try {
      doc.addImage(APP_LOGO_BASE64, "PNG", margin, y, 14, 14);
      brandTextX = margin + 18;
    } catch {
      brandTextX = margin;
    }
  }

  // Brand Name & Subtitle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(invoice.businessDetails?.name || "PixPassport", brandTextX, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text("Official Payment Receipt & Tax Invoice", brandTextX, y + 10);

  const businessAddress =
    invoice.businessDetails?.address ||
    "Khadda, Kushinagar, Uttar Pradesh, India 274802";
  const addressLines = doc.splitTextToSize(businessAddress, 85);
  doc.text(addressLines, brandTextX, y + 14.5);

  const afterAddressY = y + 14.5 + addressLines.length * 3.8;
  const contactText = `${invoice.businessDetails?.email || "support@pixpassport.com"} • ${
    invoice.businessDetails?.website || "https://pixpassport.com"
  }`;
  doc.text(contactText, brandTextX, afterAddressY);

  // Right-aligned Invoice Identifier Box (Flat Styling)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("TAX INVOICE", pageWidth - margin, y + 4.5, { align: "right" });

  doc.setFontSize(10.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(invoice.invoiceNumber || "INV-2026-000000", pageWidth - margin, y + 10, {
    align: "right",
  });

  // Flat Status Tag: PAID
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

  // Invoice Date
  const invoiceDateStr = invoice.invoiceDate
    ? new Date(invoice.invoiceDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  doc.text(`Date: ${invoiceDateStr}`, pageWidth - margin, statusBadgeY + 10.5, {
    align: "right",
  });

  y = Math.max(afterAddressY + 5.5, statusBadgeY + 14);

  // 3. Flat Separator Line
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  // 4. Two Flat Column Cards: Billed To & Payment Details (Dynamic Height)
  const colGap = 5;
  const colWidth = (contentWidth - colGap) / 2; // 87.5mm
  const cardInnerWidth = colWidth - 8;

  // Extract Customer and Gateway Data
  const photoIdStr = invoice.photoId ? String(invoice.photoId) : "";
  const phoneStr = invoice.customerPhone || invoice.gatewayDetails?.contact || "";
  const authCode = invoice.gatewayDetails?.authCode || "";
  const rrn = invoice.gatewayDetails?.bankRrn || "";
  const cardHolderName = invoice.gatewayDetails?.cardHolderName || invoice.customerName || "Customer";

  // Calculate dynamic line heights for Billed To & Payment Cards
  const custNameLines = doc.splitTextToSize(cardHolderName, cardInnerWidth);
  const custEmailLines = doc.splitTextToSize(invoice.customerEmail || "customer@pixpassport.com", cardInnerWidth);
  const payIdLines = doc.splitTextToSize(`Payment ID: ${invoice.gatewayPaymentId || "N/A"}`, cardInnerWidth);
  const orderRef = invoice.gatewayOrderId || invoice.orderNumber || "N/A";
  const orderLines = doc.splitTextToSize(`Order ID: ${orderRef}`, cardInnerWidth);

  const cardLeftLinesCount =
    1 +
    custNameLines.length +
    custEmailLines.length +
    (phoneStr ? 1 : 0) +
    (invoice.customerCountry ? 1 : 0) +
    (photoIdStr ? 1 : 0) +
    1;

  const cardRightLinesCount =
    2 +
    payIdLines.length +
    orderLines.length +
    (authCode || rrn ? 1 : 0) +
    2;

  const maxLines = Math.max(cardLeftLinesCount, cardRightLinesCount);
  const cardHeight = Math.max(38, 12 + maxLines * 4.2);

  // Left Flat Card: Billed To
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

  // Right Flat Card: Payment Information
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

  const paymentDateFormatted = invoice.paymentDate
    ? new Date(invoice.paymentDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Verified";

  doc.text(`Payment Date: ${paymentDateFormatted}`, rightColX + 4, curRightY);
  curRightY += 4.0;

  doc.text(
    `Method: ${(invoice.paymentMethod || "card").toUpperCase()}`,
    rightColX + 4,
    curRightY
  );
  curRightY += 4.0;

  if (authCode || rrn) {
    const authRrnStr = [authCode ? `Auth: ${authCode}` : "", rrn ? `RRN: ${rrn}` : ""]
      .filter(Boolean)
      .join(" • ");
    doc.text(authRrnStr, rightColX + 4, curRightY);
  }

  y += cardHeight + 6;

  // 5. Line Items Table (Responsive Flat Minimalist Design)
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

  const items =
    invoice.lineItems && invoice.lineItems.length > 0
      ? invoice.lineItems
      : [
          {
            name: "Biometric Passport Photo Processing & Template",
            description:
              "AI-powered compliance validation, background enhancement, and digital delivery.",
            quantity: 1,
            unitPrice: invoice.amount || 7.99,
            total: invoice.amount || 7.99,
          },
        ];

  const descMaxColWidth = 100;

  items.forEach((item) => {
    const rowStartY = y;

    // Item Title (wrapped)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    const titleLines = doc.splitTextToSize(item.name || "Biometric Photo Processing", descMaxColWidth);
    doc.text(titleLines, margin + 4, y + 4.8);

    let currentItemY = y + 4.8 + titleLines.length * 4.0;

    // Item Description (wrapped)
    let descLines: string[] = [];
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

    // Qty, Unit Price, Total vertically aligned with first line of item
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
    doc.text(String(item.quantity || 1), margin + 118, rowStartY + 5.5, { align: "center" });
    doc.text(formatCurrency(item.unitPrice, invoice.currency), margin + 150, rowStartY + 5.5, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(
      formatCurrency(item.total, invoice.currency),
      margin + contentWidth - 4,
      rowStartY + 5.5,
      { align: "right" }
    );

    // Flat bottom row divider
    doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
    doc.setLineWidth(0.25);
    doc.line(margin, rowStartY + rowHeight, margin + contentWidth, rowStartY + rowHeight);

    y += rowHeight;
  });

  y += 4;

  // 6. Totals Box (Responsive & Progressive Vertical Spacing)
  const totalsBoxWidth = 80;
  const totalsBoxX = margin + contentWidth - totalsBoxWidth;

  const subtotal = invoice.subtotal || invoice.amount || 0;
  const tax = invoice.tax || 0;
  const discount = invoice.discount || 0;
  const total = invoice.total || invoice.amount || 0;

  let totalsCurY = y + 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);

  // Subtotal line
  doc.text("Subtotal:", totalsBoxX, totalsCurY);
  doc.text(formatCurrency(subtotal, invoice.currency), margin + contentWidth - 4, totalsCurY, {
    align: "right",
  });
  totalsCurY += 5;

  // Tax line
  doc.text("Tax / GST (0%):", totalsBoxX, totalsCurY);
  doc.text(
    tax > 0
      ? formatCurrency(tax, invoice.currency)
      : `Tax Exempt (${formatCurrency(0, invoice.currency)})`,
    margin + contentWidth - 4,
    totalsCurY,
    { align: "right" }
  );
  totalsCurY += 5;

  // Discount line (if applicable)
  if (discount > 0) {
    doc.text("Discount:", totalsBoxX, totalsCurY);
    doc.text(
      `-${formatCurrency(discount, invoice.currency)}`,
      margin + contentWidth - 4,
      totalsCurY,
      { align: "right" }
    );
    totalsCurY += 5;
  }

  totalsCurY += 2;

  // Flat Total Paid Card
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
  doc.text(formatCurrency(total, invoice.currency), margin + contentWidth - 4, totalsCurY + 6.5, {
    align: "right",
  });

  y = totalsCurY + totalPaidCardH + 7;

  // 7. Compliance & Fulfillment Section (Flat Card)
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

  // Column 1
  const payRef = (invoice.gatewayPaymentId || "Razorpay").slice(0, 24);
  doc.text(`• Payment: Captured & Verified`, margin + 4, y + 10.5);
  doc.text(`• Ref ID: ${payRef}`, margin + 4, y + 15);
  doc.text(`• Method: ${(invoice.paymentMethod || "Card").toUpperCase()}`, margin + 4, y + 19.5);
  doc.text(`• Total: ${formatCurrency(total, invoice.currency)}`, margin + 4, y + 24);

  // Column 2
  const c2X = margin + fColWidth;
  doc.text(`• Specs: Official Standards`, c2X, y + 10.5);
  if (photoIdStr) {
    doc.text(`• Photo ID: ${photoIdStr.slice(0, 22)}`, c2X, y + 15);
  } else {
    doc.text(`• Size: ${fulfillment.photoDimensions || "Standard Pixels"}`, c2X, y + 15);
  }
  doc.text(`• Background: Corrected`, c2X, y + 19.5);
  doc.text(`• Template: 20-Photo Sheet`, c2X, y + 24);

  // Column 3
  const c3X = margin + fColWidth * 2;
  const dlCount = fulfillment.downloadCount || (fulfillment.photoProcessed ? 1 : 0);
  doc.text(`• Deliveries: ${dlCount} download(s)`, c3X, y + 10.5);
  doc.text(
    `• Email: ${fulfillment.emailDelivered ? "Delivered" : "Web Confirmation"}`,
    c3X,
    y + 15
  );
  if (fulfillment.lastDownloadedAt) {
    const dlDate = new Date(fulfillment.lastDownloadedAt).toLocaleDateString("en-US");
    doc.text(`• Date: ${dlDate}`, c3X, y + 19.5);
  } else {
    doc.text(`• Status: Completed & Active`, c3X, y + 19.5);
  }
  doc.text(`• Money-Back Guarantee: Active`, c3X, y + 24);

  // Assurance note
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(emeraldDark[0], emeraldDark[1], emeraldDark[2]);
  doc.text(
    "• Digitally authenticated & verified by PixPassport Automated Billing Engine.",
    margin + 4,
    y + 30
  );

  // 8. Footer (Bottom of A4 Page)
  const footerY = pageHeight - 15;
  doc.setDrawColor(flatBorder[0], flatBorder[1], flatBorder[2]);
  doc.setLineWidth(0.25);
  doc.line(margin, footerY - 3.5, pageWidth - margin, footerY - 3.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);

  doc.text(
    `PixPassport • ${invoice.businessDetails?.website || "https://pixpassport.com"} • ${
      invoice.businessDetails?.email || "support@pixpassport.com"
    }`,
    margin,
    footerY
  );
  doc.text(
    `Refund Policy: https://pixpassport.com/refund-policy`,
    margin,
    footerY + 3.8
  );

  doc.text(
    `Generated on ${new Date().toLocaleDateString("en-US")} | Page 1 of 1`,
    pageWidth - margin,
    footerY,
    { align: "right" }
  );

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
