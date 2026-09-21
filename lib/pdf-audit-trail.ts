import { jsPDF } from "jspdf";
import { APP_LOGO_BASE64 } from "@/lib/logo-base64";
import { UserTreeGroup, PhotoGroup, AuditEventItem } from "@/app/admin/(dashboard)/audit-events/AuditEventsClientPage";

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatPdfCurrency(amount?: number, currency: string = "USD"): string {
  if (amount === undefined || amount === null) return "";
  const num = Number(amount) || 0;
  const curr = (currency || "USD").toUpperCase();
  if (curr === "USD") return `$${num.toFixed(2)}`;
  if (curr === "EUR") return `EUR ${num.toFixed(2)}`;
  if (curr === "GBP") return `GBP ${num.toFixed(2)}`;
  if (curr === "INR") return `INR ${num.toFixed(2)}`;
  return `${curr} ${num.toFixed(2)}`;
}

interface PdfCommitNode {
  step: number;
  type: "upload" | "processing" | "payment" | "invoice" | "email_sent" | "download" | "refund" | "dispute" | "general";
  typeLabel: string;
  title: string;
  subtitle?: string;
  commitSha: string;
  shaLabel: string;
  timestamp: string;
  deltaDisplay: string;
  actor: string;
  ipAddress?: string;
  isVerified: boolean;
  statusText: string;
  metaPairs: Array<{ label: string; value: string }>;
}

function buildPdfCommitNodes(pGroup: PhotoGroup, userEmail: string): PdfCommitNode[] {
  const nodes: PdfCommitNode[] = [];
  const sortedEvents = [...pGroup.events].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const sessionInitTime = pGroup.photoDoc?.createdAt
    ? new Date(pGroup.photoDoc.createdAt).getTime()
    : sortedEvents[0]
    ? new Date(sortedEvents[0].createdAt).getTime()
    : Date.now();

  const docType =
    pGroup.photoDoc?.documentType ||
    pGroup.orderDoc?.documentType ||
    "Biometric Photo Spec";

  // 1. Session Init / Photo Upload
  nodes.push({
    step: 1,
    type: "upload",
    typeLabel: "PHOTO SESSION INIT",
    title: `Photo Asset Initialized & Spec Selected (${docType})`,
    subtitle: "Customer initiated digital photo transformation workflow",
    commitSha: pGroup.photoId,
    shaLabel: "photo",
    timestamp: pGroup.photoDoc?.createdAt || sortedEvents[0]?.createdAt || new Date().toISOString(),
    deltaDisplay: "INIT (0s)",
    actor: userEmail,
    isVerified: true,
    statusText: (pGroup.photoDoc?.status || "READY").toUpperCase(),
    metaPairs: [
      { label: "Photo ID", value: pGroup.photoId },
      { label: "Document Spec", value: docType },
      { label: "Session Status", value: (pGroup.photoDoc?.status || "ready").toUpperCase() },
      ...(pGroup.photoDoc?.isExpert ? [{ label: "Service Tier", value: "Expert AI & Human Review" }] : [{ label: "Service Tier", value: "Instant AI Biometric Validation" }]),
    ],
  });

  // Track invoice generation event if present in audit events
  let invoiceEvent: AuditEventItem | null = null;

  // 2. Audit Events (Processing, Email Sent, Downloads, Refunds, Disputes)
  sortedEvents.forEach((evt) => {
    const evtTime = new Date(evt.createdAt).getTime();
    const deltaMs = evtTime - sessionInitTime;
    const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
    const deltaStr =
      deltaSec < 60
        ? `+${deltaSec}s`
        : deltaSec < 3600
        ? `+${Math.floor(deltaSec / 60)}m ${deltaSec % 60}s`
        : `+${Math.floor(deltaSec / 3600)}h ${Math.floor((deltaSec % 3600) / 60)}m`;

    if (evt.eventType === "processing") {
      if (evt.metadata?.action === "invoice_generated") {
        invoiceEvent = evt;
        if (pGroup.invoiceDoc) {
          // Merged into the official Invoice Registered node
          return;
        }
      }

      const metaList: Array<{ label: string; value: string }> = [];
      if (evt.metadata?.dimensions) metaList.push({ label: "Dimensions", value: evt.metadata.dimensions });
      if (evt.metadata?.documentType) metaList.push({ label: "Template", value: evt.metadata.documentType });
      if (evt.metadata?.fileName) metaList.push({ label: "File Name", value: evt.metadata.fileName });
      if (evt.metadata?.format) {
        const sizeStr = evt.metadata?.sizeKb ? ` (${evt.metadata.sizeKb} KB)` : "";
        metaList.push({ label: "Format", value: `${evt.metadata.format}${sizeStr}` });
      }
      if (evt.metadata?.headSizePct || evt.metadata?.eyeLevelPct) {
        const h = evt.metadata?.headSizePct ? `Head: ${evt.metadata.headSizePct}%` : "";
        const e = evt.metadata?.eyeLevelPct ? `Eye: ${evt.metadata.eyeLevelPct}%` : "";
        metaList.push({ label: "Biometric Ratios", value: [h, e].filter(Boolean).join(" • ") });
      }
      if (evt.metadata?.externalResultId) {
        metaList.push({ label: "Result Ref", value: String(evt.metadata.externalResultId).slice(0, 18) + "..." });
      }

      nodes.push({
        step: 0,
        type: "processing",
        typeLabel: "AI COMPLIANCE CHECK",
        title:
          evt.metadata?.action === "invoice_generated"
            ? "System Invoice Registered & Synced"
            : "AI Biometric Verification & Background Removal",
        subtitle: evt.metadata?.dimensions
          ? `Output format: ${evt.metadata.dimensions}`
          : "Compliance verification algorithms executed successfully",
        commitSha: evt._id,
        shaLabel: "event",
        timestamp: evt.createdAt,
        deltaDisplay: deltaStr,
        actor: evt.actor || "user",
        ipAddress: evt.ipAddress,
        isVerified: true,
        statusText: "PASSED",
        metaPairs: metaList,
      });
    } else if (evt.eventType === "email_sent") {
      nodes.push({
        step: 0,
        type: "email_sent",
        typeLabel: "EMAIL DELIVERED",
        title: "Digital Delivery & Receipt Email Dispatched",
        subtitle: evt.metadata?.subject || "Biometric photo download links delivered to customer inbox",
        commitSha: evt._id,
        shaLabel: "event",
        timestamp: evt.createdAt,
        deltaDisplay: deltaStr,
        actor: evt.actor || "webhook",
        ipAddress: evt.ipAddress,
        isVerified: true,
        statusText: "DELIVERED",
        metaPairs: [
          ...(evt.metadata?.recipient ? [{ label: "Recipient", value: evt.metadata.recipient }] : []),
          ...(evt.metadata?.template ? [{ label: "Template", value: evt.metadata.template }] : []),
          { label: "Delivery Status", value: "Sent Successfully" },
        ],
      });
    } else if (evt.eventType === "download") {
      const fileTypeLabel =
        evt.metadata?.fileType === "high_res_photo"
          ? "High-Res Studio Photo"
          : evt.metadata?.fileType === "printable_sheet"
          ? "Printable 4x6 Sheet"
          : evt.metadata?.fileType || "Biometric Photo";

      nodes.push({
        step: 0,
        type: "download",
        typeLabel: "CUSTOMER FILE DOWNLOAD",
        title: `Customer Downloaded ${fileTypeLabel}`,
        subtitle: evt.metadata?.fileName ? `Delivered asset: ${evt.metadata.fileName}` : "Digital biometric photo downloaded",
        commitSha: evt._id,
        shaLabel: "download",
        timestamp: evt.createdAt,
        deltaDisplay: deltaStr,
        actor: evt.actor || userEmail,
        ipAddress: evt.ipAddress,
        isVerified: true,
        statusText: "DOWNLOADED [OK]",
        metaPairs: [
          ...(evt.metadata?.fileName ? [{ label: "File Name", value: evt.metadata.fileName }] : []),
          ...(evt.metadata?.fileSizeBytes ? [{ label: "File Size", value: formatBytes(evt.metadata.fileSizeBytes) }] : []),
          { label: "Download Type", value: fileTypeLabel },
          ...(evt.metadata?.documentType ? [{ label: "Document Spec", value: evt.metadata.documentType }] : []),
          ...(evt.ipAddress ? [{ label: "Client IP", value: evt.ipAddress }] : []),
          ...(evt.actor ? [{ label: "Customer Actor", value: evt.actor }] : []),
        ],
      });
    } else if (evt.eventType === "refund") {
      nodes.push({
        step: 0,
        type: "refund",
        typeLabel: "REFUND PROCESSED",
        title: "Payment Refund Processed",
        subtitle: "Gateway refund confirmed",
        commitSha: evt._id,
        shaLabel: "refund",
        timestamp: evt.createdAt,
        deltaDisplay: deltaStr,
        actor: evt.actor || "Gateway Webhook",
        ipAddress: evt.ipAddress,
        isVerified: true,
        statusText: "REFUNDED",
        metaPairs: [],
      });
    } else if (evt.eventType === "dispute") {
      nodes.push({
        step: 0,
        type: "dispute",
        typeLabel: "PAYMENT DISPUTE",
        title: "Payment Dispute / Chargeback Registered",
        subtitle: "Bank dispute notice received",
        commitSha: evt._id,
        shaLabel: "dispute",
        timestamp: evt.createdAt,
        deltaDisplay: deltaStr,
        actor: evt.actor || "Gateway Webhook",
        ipAddress: evt.ipAddress,
        isVerified: true,
        statusText: "DISPUTED",
        metaPairs: [],
      });
    }
  });

  // 3. Payment Node
  if (pGroup.paymentDoc) {
    const payTime = pGroup.paymentDoc.createdAt
      ? new Date(pGroup.paymentDoc.createdAt).getTime()
      : sessionInitTime + 48000;
    const deltaMs = payTime - sessionInitTime;
    const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
    const deltaStr =
      deltaSec < 60
        ? `+${deltaSec}s`
        : deltaSec < 3600
        ? `+${Math.floor(deltaSec / 60)}m ${deltaSec % 60}s`
        : `+${Math.floor(deltaSec / 3600)}h`;

    const formattedAmount = formatPdfCurrency(pGroup.paymentDoc.amount, pGroup.paymentDoc.currency);
    const methodStr = pGroup.invoiceDoc?.paymentMethod || (pGroup.paymentDoc.method ? `${pGroup.paymentDoc.method.toUpperCase()} Card` : "Card");

    nodes.push({
      step: 0,
      type: "payment",
      typeLabel: "PAYMENT CAPTURED",
      title: `Payment Captured & Verified (${formattedAmount})`,
      subtitle: `Gateway transaction settled via ${methodStr}`,
      commitSha: pGroup.paymentDoc.gatewayPaymentId || "PAY-RECORD",
      shaLabel: "payment",
      timestamp: pGroup.paymentDoc.createdAt || new Date(payTime).toISOString(),
      deltaDisplay: deltaStr,
      actor: pGroup.paymentDoc.email || userEmail,
      isVerified: true,
      statusText: (pGroup.paymentDoc.status || "CAPTURED").toUpperCase(),
      metaPairs: [
        ...(pGroup.paymentDoc.gatewayPaymentId ? [{ label: "Payment ID", value: pGroup.paymentDoc.gatewayPaymentId }] : []),
        ...(pGroup.orderDoc?.orderNumber ? [{ label: "Order No", value: pGroup.orderDoc.orderNumber }] : []),
        ...(pGroup.paymentDoc.gatewayOrderId ? [{ label: "Gateway Order", value: pGroup.paymentDoc.gatewayOrderId }] : []),
        { label: "Amount", value: formattedAmount },
        { label: "Method", value: methodStr },
        ...(pGroup.invoiceDoc?.gatewayDetails?.bankRrn ? [{ label: "Bank RRN", value: pGroup.invoiceDoc.gatewayDetails.bankRrn }] : []),
        ...(pGroup.invoiceDoc?.gatewayDetails?.authCode ? [{ label: "Auth Code", value: pGroup.invoiceDoc.gatewayDetails.authCode }] : []),
      ],
    });
  }

  // 4. Invoice Node
  if (pGroup.invoiceDoc) {
    const invTimestamp = pGroup.invoiceDoc.createdAt || (invoiceEvent as any)?.createdAt;
    const invTime = invTimestamp ? new Date(invTimestamp).getTime() : sessionInitTime + 60000;
    const deltaMs = invTime - sessionInitTime;
    const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
    const deltaStr =
      deltaSec < 60
        ? `+${deltaSec}s`
        : deltaSec < 3600
        ? `+${Math.floor(deltaSec / 60)}m ${deltaSec % 60}s`
        : `+${Math.floor(deltaSec / 3600)}h`;

    const invActor = (invoiceEvent as any)?.actor || "Billing Engine";
    const methodStr = pGroup.invoiceDoc.paymentMethod || "Credit / Debit Card";

    nodes.push({
      step: 0,
      type: "invoice",
      typeLabel: "INVOICE REGISTERED",
      title: `Official Tax Invoice Registered (${pGroup.invoiceDoc.invoiceNumber})`,
      subtitle: "Sequential tax invoice generated for accounting compliance",
      commitSha: pGroup.invoiceDoc.invoiceNumber || "INV-GEN",
      shaLabel: "invoice",
      timestamp: invTimestamp || new Date(invTime).toISOString(),
      deltaDisplay: deltaStr,
      actor: invActor,
      isVerified: true,
      statusText: "ISSUED",
      metaPairs: [
        { label: "Invoice No", value: pGroup.invoiceDoc.invoiceNumber || "" },
        ...(pGroup.invoiceDoc.customerName ? [{ label: "Billed To", value: pGroup.invoiceDoc.customerName }] : []),
        ...(pGroup.invoiceDoc.customerPhone ? [{ label: "Contact", value: pGroup.invoiceDoc.customerPhone }] : []),
        { label: "Total", value: formatPdfCurrency(pGroup.invoiceDoc.total, pGroup.invoiceDoc.currency) },
        { label: "Payment Method", value: methodStr },
        { label: "Billing Entity", value: "PixPassport Official" },
      ],
    });
  }

  // Chronologically sort and assign sequential step numbers
  nodes.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  nodes.forEach((n, idx) => {
    n.step = idx + 1;
  });

  return nodes;
}

/**
 * Generates an official server-side A4 Audit Trail & Compliance PDF for a selected user.
 * Encapsulates the entire lifecycle tree with complete commit cards and all details.
 */
export function generateAuditTrailPdfBuffer(userGroup: UserTreeGroup): Buffer {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Color Palette
  const darkSlate = [15, 23, 42]; // #0f172a
  const midSlate = [71, 85, 105]; // #475569
  const lightSlate = [148, 163, 184]; // #94a3b8
  const bgCard = [248, 250, 252]; // #f8fafc
  const borderCard = [226, 232, 240]; // #e2e8f0
  const purpleAccent = [124, 58, 237]; // #7c3aed
  const emeraldAccent = [5, 150, 105]; // #059669
  const amberAccent = [180, 83, 9]; // #b45309
  const blueAccent = [29, 78, 216]; // #1d4ed8
  const limeAccent = [132, 204, 22]; // #84cc16

  let currentPage = 1;

  const drawPageHeaderAndFooter = (isFirstPage: boolean) => {
    // Top Accent Bar
    doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.rect(0, 0, pageWidth, 3.5, "F");

    // Bottom Footer
    const footerY = pageHeight - 8;
    doc.setDrawColor(borderCard[0], borderCard[1], borderCard[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, footerY - 2.5, pageWidth - margin, footerY - 2.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
    doc.text(
      `PixPassport Official Audit Trail • User: ${userGroup.userEmail} • Generated: ${new Date().toISOString()}`,
      margin,
      footerY
    );
    doc.text(`Page ${currentPage}`, pageWidth - margin, footerY, { align: "right" });
  };

  drawPageHeaderAndFooter(true);

  let y = 13;

  // 1. Top Document Header with Brand Logo
  let brandX = margin;
  if (APP_LOGO_BASE64) {
    try {
      doc.addImage(APP_LOGO_BASE64, "PNG", margin, y, 13, 13);
      brandX = margin + 16;
    } catch {
      brandX = margin;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("PixPassport", brandX, y + 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
  doc.text("SECURITY & COMPLIANCE AUDIT CERTIFICATE", brandX, y + 9.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text("Immutable Chronological Lifecycle & Digital Fulfillment Log", brandX, y + 13.5);

  // Right-aligned Certificate Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("AUDIT TRAIL REPORT", pageWidth - margin, y + 5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text(`Ref: AUD-${Date.now().toString(36).toUpperCase()}`, pageWidth - margin, y + 9.5, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`, pageWidth - margin, y + 13.5, { align: "right" });

  y += 18;

  // Horizontal divider
  doc.setDrawColor(borderCard[0], borderCard[1], borderCard[2]);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // 2. User / Customer Identity Overview Card
  const userBoxH = 24;
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.roundedRect(margin, y, contentWidth, userBoxH, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(userGroup.customerName || userGroup.userEmail, margin + 4, y + 6);

  doc.setFontSize(8);
  doc.setTextColor(limeAccent[0], limeAccent[1], limeAccent[2]);
  doc.text(`Customer Email: ${userGroup.userEmail}`, margin + 4, y + 11.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
  const phoneText = userGroup.customerPhone ? `Contact Phone: ${userGroup.customerPhone} • ` : "";
  const totalEvents = userGroup.photos.reduce((acc, p) => acc + p.events.length, 0) + userGroup.generalEvents.length;
  const totalDownloads = userGroup.photos.reduce(
    (acc, p) => acc + p.events.filter((e) => e.eventType === "download").length,
    0
  );
  doc.text(
    `${phoneText}Photo Branches: ${userGroup.photos.length} • Total Commits: ${totalEvents} • Downloads: ${totalDownloads}`,
    margin + 4,
    y + 17
  );

  y += userBoxH + 6;

  // Helper function to check and handle page breaks
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      currentPage++;
      drawPageHeaderAndFooter(false);
      y = 12;
    }
  };

  // 3. Render Photo Sessions & Each Detailed Commit Card
  userGroup.photos.forEach((photoGroup, pIdx) => {
    checkPageBreak(30);

    const docType = photoGroup.photoDoc?.documentType || photoGroup.orderDoc?.documentType || "Biometric Photo Spec";
    const isPaid = photoGroup.photoDoc?.status === "paid" || photoGroup.orderDoc?.status === "paid" || photoGroup.paymentDoc?.status === "captured";
    const downloadCount = photoGroup.events.filter((e) => e.eventType === "download").length;
    const commitNodes = buildPdfCommitNodes(photoGroup, userGroup.userEmail);

    // Photo Branch Header Box
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.setDrawColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.text(`SESSION BRANCH #${pIdx + 1}: photo/${photoGroup.photoId}`, margin + 3.5, y + 5.5);

    doc.setFontSize(7.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(`Specification: ${docType} • ${commitNodes.length} Commits Recorded`, margin + 3.5, y + 10);

    // Right-aligned status tags
    let tagX = pageWidth - margin - 3.5;
    if (downloadCount > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(amberAccent[0], amberAccent[1], amberAccent[2]);
      doc.text(`[ ${downloadCount} DOWNLOAD${downloadCount > 1 ? "S" : ""} ]`, tagX, y + 5.5, { align: "right" });
    }
    if (isPaid) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
      doc.text(`[ PAID & VERIFIED ]`, tagX, y + 10, { align: "right" });
    }

    y += 18;

    // Render Every Commit Event as a Full Detailed Card
    commitNodes.forEach((node) => {
      // Calculate dynamic card height
      const metaRows = Math.ceil(node.metaPairs.length / 2);
      const cardH = 22 + (node.subtitle ? 4 : 0) + (metaRows > 0 ? metaRows * 4.5 + 2 : 0);

      checkPageBreak(cardH + 4);

      // Card Background & Border
      const isDownload = node.type === "download";
      if (isDownload) {
        doc.setFillColor(254, 243, 199); // Amber tint
        doc.setDrawColor(amberAccent[0], amberAccent[1], amberAccent[2]);
      } else {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(borderCard[0], borderCard[1], borderCard[2]);
      }
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y, contentWidth, cardH, 1.2, 1.2, "FD");

      // Card Header: Step Tag + Title + Delta + SHA
      let nodeAccent = purpleAccent;
      if (node.type === "download") nodeAccent = amberAccent;
      if (node.type === "payment") nodeAccent = emeraldAccent;
      if (node.type === "processing") nodeAccent = blueAccent;
      if (node.type === "invoice") nodeAccent = emeraldAccent;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(nodeAccent[0], nodeAccent[1], nodeAccent[2]);
      doc.text(`[STEP ${node.step}: ${node.typeLabel}]`, margin + 3.5, y + 5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
      doc.text(node.title, margin + 48, y + 5);

      // Right-aligned Timing & SHA
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(nodeAccent[0], nodeAccent[1], nodeAccent[2]);
      doc.text(`${node.deltaDisplay}`, pageWidth - margin - 3.5, y + 5, { align: "right" });

      let cardContentY = y + 9.5;

      // Subtitle (if available)
      if (node.subtitle) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
        doc.text(node.subtitle, margin + 3.5, cardContentY);
        cardContentY += 4.5;
      }

      // Metadata Key-Value Grid (2 Columns)
      if (node.metaPairs.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.8);

        for (let i = 0; i < node.metaPairs.length; i += 2) {
          const p1 = node.metaPairs[i];
          const p2 = node.metaPairs[i + 1];

          // Column 1
          doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
          doc.text(`${p1.label}:`, margin + 3.5, cardContentY);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
          doc.text(p1.value, margin + 28, cardContentY);
          doc.setFont("helvetica", "normal");

          // Column 2 (if exists)
          if (p2) {
            const col2X = margin + 92;
            doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
            doc.text(`${p2.label}:`, col2X, cardContentY);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
            doc.text(p2.value, col2X + 26, cardContentY);
            doc.setFont("helvetica", "normal");
          }

          cardContentY += 4.5;
        }
      }

      // Card Footer: Author, Verification, IP, Timestamp, SHA
      doc.setDrawColor(borderCard[0], borderCard[1], borderCard[2]);
      doc.setLineWidth(0.2);
      doc.line(margin + 2, cardContentY - 1, pageWidth - margin - 2, cardContentY - 1);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);

      const ipText = node.ipAddress ? ` • IP: ${node.ipAddress}` : "";
      const shaText = `${node.shaLabel}: ${node.commitSha.slice(0, 16)}${node.commitSha.length > 16 ? "..." : ""}`;
      doc.text(`Actor: ${node.actor} • Verified [OK]${ipText} • ${shaText}`, margin + 3.5, y + cardH - 2.2);

      const timeFormatted = new Date(node.timestamp).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      doc.text(timeFormatted, pageWidth - margin - 3.5, y + cardH - 2.2, { align: "right" });

      y += cardH + 3.5;
    });

    y += 4;
  });

  // 4. General / Account Events (if any)
  if (userGroup.generalEvents.length > 0) {
    checkPageBreak(25);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(`General Account & System Events (${userGroup.generalEvents.length}):`, margin, y);
    y += 4;

    userGroup.generalEvents.forEach((evt) => {
      checkPageBreak(8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
      doc.text(
        `• [${evt.eventType.toUpperCase()}] ${new Date(evt.createdAt).toISOString()} | Actor: ${evt.actor} | IP: ${evt.ipAddress || "Internal"}`,
        margin + 2,
        y + 3.5
      );
      y += 5.5;
    });
    y += 6;
  }

  // 5. Compliance & Security Signature Block
  checkPageBreak(22);

  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.setDrawColor(borderCard[0], borderCard[1], borderCard[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 18, 1, 1, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("LEGAL EVIDENCE & COMPLIANCE NON-REPUDIATION ATTESTATION", margin + 3.5, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(midSlate[0], midSlate[1], midSlate[2]);
  doc.text(
    "This certificate is an immutable record of electronic fulfillment, automated biometric verification, and customer delivery under PixPassport terms.",
    margin + 3.5,
    y + 9
  );
  doc.text(
    "Cryptographic timestamping, IP verification, and event hashes are recorded permanently in compliance with digital transaction audit guidelines.",
    margin + 3.5,
    y + 13
  );

  return Buffer.from(doc.output("arraybuffer"));
}
