"use client";

import React, { useState, useMemo } from "react";
import AuditDetailModal from "./AuditDetailModal";
import AuditEventFilters from "./AuditEventFilters";
import { AuditEventType } from "@/models/AuditEvent";

export interface AuditEventItem {
  _id: string;
  eventType: AuditEventType;
  actor?: string;
  ipAddress?: string;
  userAgent?: string;
  photoId?: string;
  orderId?: string;
  paymentId?: string;
  disputeId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface PhotoGroup {
  photoId: string;
  photoDoc: {
    _id?: string;
    documentType?: string;
    guestEmail?: string;
    status?: string;
    createdAt?: string;
    isExpert?: boolean;
    previewUrl?: string;
    secureUrl?: string;
  } | null;
  orderDoc: {
    _id?: string;
    orderNumber?: string;
    guestEmail?: string;
    amount?: number;
    currency?: string;
    status?: string;
    documentType?: string;
    createdAt?: string;
  } | null;
  paymentDoc: {
    _id?: string;
    gatewayPaymentId?: string;
    gatewayOrderId?: string;
    amount?: number;
    currency?: string;
    method?: string;
    status?: string;
    email?: string;
    contact?: string;
    createdAt?: string;
  } | null;
  invoiceDoc: {
    _id?: string;
    invoiceNumber?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    total?: number;
    currency?: string;
    paymentMethod?: string;
    gatewayDetails?: {
      bankRrn?: string;
      authCode?: string;
      cardId?: string;
      cardHolderName?: string;
      cardLast4?: string;
      cardNetwork?: string;
      cardType?: string;
      fee?: number;
      tax?: number;
    };
    createdAt?: string;
  } | null;
  events: AuditEventItem[];
}

export interface UserTreeGroup {
  userEmail: string;
  customerName?: string | null;
  customerPhone?: string | null;
  photos: PhotoGroup[];
  generalEvents: AuditEventItem[];
}

interface AuditEventsClientPageProps {
  userTreeGroups: UserTreeGroup[];
  flatEvents: AuditEventItem[];
  emailMap: Record<string, string>;
  countsMap: Record<string, number>;
  totalCount: number;
  filterType?: string;
  filterSearch?: string;
  filterDatePreset?: string;
  filterStartDate?: string;
  filterEndDate?: string;
}

export interface CommitTreeNode {
  id: string;
  type:
    | "upload"
    | "processing"
    | "payment"
    | "invoice"
    | "email_sent"
    | "download"
    | "refund"
    | "dispute"
    | "general";
  title: string;
  subtitle?: string;
  commitSha: string;
  shaLabel: string;
  timestamp: string;
  deltaDisplay: string;
  actor: string;
  ipAddress?: string;
  userAgent?: string;
  isVerified: boolean;
  statusBadge: { label: string; bg: string; text: string; border: string; icon: string };
  metaPills: Array<{
    label: string;
    value: string;
    isMono?: boolean;
    icon?: string;
    copyable?: boolean;
  }>;
  rawEvent?: AuditEventItem;
}

const nodeTypeStyles: Record<
  string,
  {
    ringBg: string;
    ringBorder: string;
    lineColor: string;
    icon: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    label: string;
  }
> = {
  upload: {
    ringBg: "bg-violet-600",
    ringBorder: "border-violet-300 ring-violet-100",
    lineColor: "bg-violet-400",
    icon: "📸",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    badgeBorder: "border-violet-200",
    label: "Photo Session Init",
  },
  processing: {
    ringBg: "bg-blue-600",
    ringBorder: "border-blue-300 ring-blue-100",
    lineColor: "bg-blue-400",
    icon: "⚙️",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    label: "AI Compliance Check",
  },
  payment: {
    ringBg: "bg-emerald-600",
    ringBorder: "border-emerald-300 ring-emerald-100",
    lineColor: "bg-emerald-400",
    icon: "💳",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    label: "Payment Captured",
  },
  invoice: {
    ringBg: "bg-teal-600",
    ringBorder: "border-teal-300 ring-teal-100",
    lineColor: "bg-teal-400",
    icon: "🧾",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
    badgeBorder: "border-teal-200",
    label: "Invoice Registered",
  },
  email_sent: {
    ringBg: "bg-indigo-600",
    ringBorder: "border-indigo-300 ring-indigo-100",
    lineColor: "bg-indigo-400",
    icon: "📧",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    badgeBorder: "border-indigo-200",
    label: "Email Delivered",
  },
  download: {
    ringBg: "bg-amber-500",
    ringBorder: "border-amber-300 ring-amber-200 ring-4",
    lineColor: "bg-amber-500",
    icon: "📥",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    badgeBorder: "border-amber-300 font-black",
    label: "Customer File Download",
  },
  refund: {
    ringBg: "bg-purple-600",
    ringBorder: "border-purple-300 ring-purple-100",
    lineColor: "bg-purple-400",
    icon: "💸",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200",
    label: "Refund Issued",
  },
  dispute: {
    ringBg: "bg-rose-600",
    ringBorder: "border-rose-300 ring-rose-100",
    lineColor: "bg-rose-400",
    icon: "⚖️",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    label: "Payment Dispute",
  },
  general: {
    ringBg: "bg-slate-500",
    ringBorder: "border-slate-300 ring-slate-100",
    lineColor: "bg-slate-300",
    icon: "📌",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-200",
    label: "System Event",
  },
};

function formatCurrency(amount?: number, currency: string = "USD"): string {
  if (amount === undefined || amount === null) return "";
  const num = Number(amount) || 0;
  const curr = (currency || "USD").toUpperCase();
  if (curr === "USD") return `$${num.toFixed(2)}`;
  if (curr === "INR") return `₹${num.toFixed(2)}`;
  if (curr === "EUR") return `€${num.toFixed(2)}`;
  if (curr === "GBP") return `£${num.toFixed(2)}`;
  return `${curr} ${num.toFixed(2)}`;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function AuditEventsClientPage({
  userTreeGroups,
  flatEvents,
  emailMap,
  countsMap,
  totalCount,
  filterType,
  filterSearch,
  filterDatePreset,
  filterStartDate,
  filterEndDate,
}: AuditEventsClientPageProps) {
  const [viewMode, setViewMode] = useState<"tree" | "stream">("tree");
  const [treeSegment, setTreeSegment] = useState<"all" | "downloaded" | "paid" | "guests">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadingPdfKey, setDownloadingPdfKey] = useState<string | null>(null);

  // Auto-expand all sessions that have downloads, payments, or the top 15 users
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    userTreeGroups.forEach((ug, i) => {
      const hasDownloads = ug.photos.some((p) =>
        p.events.some((e) => e.eventType === "download")
      );
      const hasPayment = ug.photos.some((p) => p.paymentDoc || p.invoiceDoc);
      if (hasDownloads || hasPayment || i < 15) {
        init[ug.userEmail] = true;
      }
    });
    return init;
  });

  const [expandedPhotos, setExpandedPhotos] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    userTreeGroups.forEach((ug) => {
      ug.photos.forEach((p) => {
        const hasDownloads = p.events.some((e) => e.eventType === "download");
        const hasPayment = Boolean(p.paymentDoc || p.invoiceDoc);
        if (hasDownloads || hasPayment) {
          init[p.photoId] = true;
        }
      });
    });
    return init;
  });

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const toggleUser = (userEmail: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userEmail]: !prev[userEmail],
    }));
  };

  const togglePhoto = (photoId: string) => {
    setExpandedPhotos((prev) => ({
      ...prev,
      [photoId]: !prev[photoId],
    }));
  };

  const expandAll = () => {
    const nextUsers: Record<string, boolean> = {};
    const nextPhotos: Record<string, boolean> = {};
    userTreeGroups.forEach((ug) => {
      nextUsers[ug.userEmail] = true;
      ug.photos.forEach((p) => {
        nextPhotos[p.photoId] = true;
      });
    });
    setExpandedUsers(nextUsers);
    setExpandedPhotos(nextPhotos);
  };

  const collapseAll = () => {
    setExpandedUsers({});
    setExpandedPhotos({});
  };

  // Trigger server-side PDF generation and download
  const handleDownloadPdf = async ({ email, photoId }: { email?: string; photoId?: string }) => {
    const key = email ? `user-${email}` : `photo-${photoId}`;
    try {
      setDownloadingPdfKey(key);
      const params = new URLSearchParams();
      if (email) params.set("email", email);
      if (photoId) params.set("photoId", photoId);

      const res = await fetch(`/api/admin/audit-events/export-pdf?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to generate PDF" }));
        alert(`PDF Generation Error: ${err.error || err.details || "Server error"}`);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const contentDisposition = res.headers.get("content-disposition");
      let filename = email ? `audit-trail-${email}.pdf` : `audit-trail-${photoId}.pdf`;
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) filename = match[1];
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      console.error("PDF Download error:", error);
      alert(`Failed to download PDF: ${error.message}`);
    } finally {
      setDownloadingPdfKey(null);
    }
  };

  // Segment metrics for Tree Quick Filters
  const totalDownloadedUsers = useMemo(() => {
    return userTreeGroups.filter((ug) =>
      ug.photos.some((p) => p.events.some((e) => e.eventType === "download"))
    ).length;
  }, [userTreeGroups]);

  const totalPaidUsers = useMemo(() => {
    return userTreeGroups.filter((ug) =>
      ug.photos.some((p) => p.paymentDoc || p.invoiceDoc)
    ).length;
  }, [userTreeGroups]);

  const totalGuestUsers = useMemo(() => {
    return userTreeGroups.filter(
      (ug) =>
        !ug.photos.some(
          (p) => p.paymentDoc || p.invoiceDoc || p.events.some((e) => e.eventType === "download")
        )
    ).length;
  }, [userTreeGroups]);

  // Filtered User Tree Groups based on quick segment
  const displayedUserTreeGroups = useMemo(() => {
    if (treeSegment === "downloaded") {
      return userTreeGroups.filter((ug) =>
        ug.photos.some((p) => p.events.some((e) => e.eventType === "download"))
      );
    }
    if (treeSegment === "paid") {
      return userTreeGroups.filter((ug) =>
        ug.photos.some((p) => p.paymentDoc || p.invoiceDoc)
      );
    }
    if (treeSegment === "guests") {
      return userTreeGroups.filter(
        (ug) =>
          !ug.photos.some(
            (p) => p.paymentDoc || p.invoiceDoc || p.events.some((e) => e.eventType === "download")
          )
      );
    }
    return userTreeGroups;
  }, [userTreeGroups, treeSegment]);

  // Convert each photo session group into a sequence of GitHub-Commit-style timeline nodes
  const buildPhotoCommitNodes = (pGroup: PhotoGroup, userEmail: string): CommitTreeNode[] => {
    const nodes: CommitTreeNode[] = [];
    const sortedAuditEvents = [...pGroup.events].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Baseline session timestamp
    const sessionInitTime = pGroup.photoDoc?.createdAt
      ? new Date(pGroup.photoDoc.createdAt).getTime()
      : sortedAuditEvents[0]
      ? new Date(sortedAuditEvents[0].createdAt).getTime()
      : Date.now();

    // 1. Session Init / Photo Upload Commit Node
    const docType =
      pGroup.photoDoc?.documentType ||
      pGroup.orderDoc?.documentType ||
      "Biometric Passport/Visa Spec";
    nodes.push({
      id: `upload-${pGroup.photoId}`,
      type: "upload",
      title: `Photo Asset Initialized & Spec Selected (${docType})`,
      subtitle: `Customer initiated digital photo transformation workflow`,
      commitSha: pGroup.photoId,
      shaLabel: "photo",
      timestamp: pGroup.photoDoc?.createdAt || sortedAuditEvents[0]?.createdAt || new Date().toISOString(),
      deltaDisplay: "INIT (0s)",
      actor: userEmail,
      isVerified: true,
      statusBadge: {
        label: pGroup.photoDoc?.status?.toUpperCase() || "READY",
        bg: "bg-violet-50",
        text: "text-violet-700",
        border: "border-violet-200",
        icon: "📸",
      },
      metaPills: [
        { label: "Photo ID", value: pGroup.photoId, isMono: true, copyable: true },
        { label: "Document Spec", value: docType, icon: "📋" },
        ...(pGroup.photoDoc?.isExpert ? [{ label: "Service", value: "Expert AI & Human Review", icon: "⭐" }] : []),
      ],
    });

    // Track invoice generation event if present in audit events
    let invoiceEvent: AuditEventItem | null = null;

    // 2. Add Audit Events as Commit Nodes (Processing, Email Sent, Downloads, Refunds, Disputes)
    sortedAuditEvents.forEach((evt) => {
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
            // Merged into official Invoice Registered node
            return;
          }
        }

        const metaPills: Array<{ label: string; value: string; isMono?: boolean; icon?: string; copyable?: boolean }> = [];
        if (evt.metadata?.fileName) metaPills.push({ label: "File", value: evt.metadata.fileName, isMono: true, icon: "📄" });
        if (evt.metadata?.dimensions) metaPills.push({ label: "Dimensions", value: evt.metadata.dimensions, icon: "📐" });
        if (evt.metadata?.documentType) metaPills.push({ label: "Template", value: evt.metadata.documentType, icon: "📋" });
        if (evt.metadata?.format) {
          const sizeStr = evt.metadata?.sizeKb ? ` (${evt.metadata.sizeKb} KB)` : "";
          metaPills.push({ label: "Format", value: `${evt.metadata.format}${sizeStr}`, icon: "🖼️" });
        }
        if (evt.metadata?.headSizePct || evt.metadata?.eyeLevelPct) {
          const h = evt.metadata?.headSizePct ? `Head: ${evt.metadata.headSizePct}%` : "";
          const e = evt.metadata?.eyeLevelPct ? `Eye: ${evt.metadata.eyeLevelPct}%` : "";
          metaPills.push({ label: "Biometric Ratios", value: [h, e].filter(Boolean).join(" • "), icon: "🎯" });
        }
        if (evt.metadata?.externalResultId) {
          metaPills.push({ label: "Result Ref", value: String(evt.metadata.externalResultId).slice(0, 18) + "...", isMono: true, copyable: true });
        }

        nodes.push({
          id: evt._id,
          type: "processing",
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
          actor: evt.actor || "AI Worker Engine",
          ipAddress: evt.ipAddress,
          userAgent: evt.userAgent,
          isVerified: true,
          statusBadge: {
            label: "PASSED",
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
            icon: "⚙️",
          },
          metaPills,
          rawEvent: evt,
        });
      } else if (evt.eventType === "email_sent") {
        nodes.push({
          id: evt._id,
          type: "email_sent",
          title: "Digital Delivery & Receipt Email Dispatched",
          subtitle: evt.metadata?.subject || "Biometric photo download links delivered to customer inbox",
          commitSha: evt._id,
          shaLabel: "event",
          timestamp: evt.createdAt,
          deltaDisplay: deltaStr,
          actor: evt.actor || "SMTP Mailer",
          ipAddress: evt.ipAddress,
          isVerified: true,
          statusBadge: {
            label: "DELIVERED",
            bg: "bg-indigo-50",
            text: "text-indigo-700",
            border: "border-indigo-200",
            icon: "📧",
          },
          metaPills: [
            ...(evt.metadata?.recipient ? [{ label: "Recipient", value: evt.metadata.recipient, isMono: true, icon: "✉️" }] : []),
            ...(evt.metadata?.template ? [{ label: "Template", value: evt.metadata.template }] : []),
          ],
          rawEvent: evt,
        });
      } else if (evt.eventType === "download") {
        // High-prominence Download Commit Node
        const fileTypeLabel =
          evt.metadata?.fileType === "high_res_photo"
            ? "High-Res Studio Photo"
            : evt.metadata?.fileType === "printable_sheet"
            ? "Printable 4x6 Sheet"
            : evt.metadata?.fileType || "Biometric Photo";

        nodes.push({
          id: evt._id,
          type: "download",
          title: `📥 Customer Downloaded ${fileTypeLabel}`,
          subtitle: evt.metadata?.fileName ? `Delivered asset: ${evt.metadata.fileName}` : "Digital biometric photo downloaded",
          commitSha: evt._id,
          shaLabel: "download",
          timestamp: evt.createdAt,
          deltaDisplay: deltaStr,
          actor: evt.actor || userEmail,
          ipAddress: evt.ipAddress,
          userAgent: evt.userAgent,
          isVerified: true,
          statusBadge: {
            label: "DOWNLOADED ✓",
            bg: "bg-amber-100",
            text: "text-amber-900 font-black",
            border: "border-amber-300",
            icon: "📥",
          },
          metaPills: [
            ...(evt.metadata?.fileName ? [{ label: "File Name", value: evt.metadata.fileName, isMono: true, icon: "📄" }] : []),
            ...(evt.metadata?.fileSizeBytes ? [{ label: "File Size", value: formatBytes(evt.metadata.fileSizeBytes), icon: "📦" }] : []),
            { label: "Download Type", value: fileTypeLabel, icon: "📥" },
            ...(evt.metadata?.documentType ? [{ label: "Document Spec", value: evt.metadata.documentType, icon: "📋" }] : []),
            ...(evt.ipAddress ? [{ label: "Client IP", value: evt.ipAddress, isMono: true, icon: "🌐" }] : []),
            ...(evt.actor ? [{ label: "Customer Actor", value: evt.actor, isMono: true }] : []),
          ],
          rawEvent: evt,
        });
      } else if (evt.eventType === "refund") {
        nodes.push({
          id: evt._id,
          type: "refund",
          title: "Payment Refund Processed",
          subtitle: "Gateway refund confirmed",
          commitSha: evt._id,
          shaLabel: "refund",
          timestamp: evt.createdAt,
          deltaDisplay: deltaStr,
          actor: evt.actor || "Gateway Webhook",
          ipAddress: evt.ipAddress,
          isVerified: true,
          statusBadge: {
            label: "REFUNDED",
            bg: "bg-purple-50",
            text: "text-purple-700",
            border: "border-purple-200",
            icon: "💸",
          },
          metaPills: [],
          rawEvent: evt,
        });
      } else if (evt.eventType === "dispute") {
        nodes.push({
          id: evt._id,
          type: "dispute",
          title: "Payment Dispute / Chargeback Registered",
          subtitle: "Bank dispute notice received",
          commitSha: evt._id,
          shaLabel: "dispute",
          timestamp: evt.createdAt,
          deltaDisplay: deltaStr,
          actor: evt.actor || "Gateway Webhook",
          ipAddress: evt.ipAddress,
          isVerified: true,
          statusBadge: {
            label: "DISPUTED",
            bg: "bg-rose-50",
            text: "text-rose-700",
            border: "border-rose-200",
            icon: "⚖️",
          },
          metaPills: [],
          rawEvent: evt,
        });
      }
    });

    // 3. Insert Payment & Invoice Nodes if they exist
    if (pGroup.paymentDoc) {
      const payTime = pGroup.paymentDoc.createdAt
        ? new Date(pGroup.paymentDoc.createdAt).getTime()
        : sessionInitTime + 30000;
      const deltaMs = payTime - sessionInitTime;
      const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
      const deltaStr =
        deltaSec < 60
          ? `+${deltaSec}s`
          : deltaSec < 3600
          ? `+${Math.floor(deltaSec / 60)}m ${deltaSec % 60}s`
          : `+${Math.floor(deltaSec / 3600)}h`;

      const formattedAmount = formatCurrency(pGroup.paymentDoc.amount, pGroup.paymentDoc.currency);
      const methodStr = pGroup.invoiceDoc?.paymentMethod || (pGroup.paymentDoc.method || "CARD").toUpperCase();

      nodes.push({
        id: `pay-${pGroup.paymentDoc.gatewayPaymentId || pGroup.paymentDoc._id}`,
        type: "payment",
        title: `Payment Captured & Verified (${formattedAmount})`,
        subtitle: `Gateway transaction settled via ${methodStr}`,
        commitSha: pGroup.paymentDoc.gatewayPaymentId || "PAY-RECORD",
        shaLabel: "payment",
        timestamp: pGroup.paymentDoc.createdAt || new Date(payTime).toISOString(),
        deltaDisplay: deltaStr,
        actor: pGroup.paymentDoc.email || userEmail,
        isVerified: true,
        statusBadge: {
          label: (pGroup.paymentDoc.status || "CAPTURED").toUpperCase(),
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: "💳",
        },
        metaPills: [
          ...(pGroup.paymentDoc.gatewayPaymentId
            ? [{ label: "Payment ID", value: pGroup.paymentDoc.gatewayPaymentId, isMono: true, copyable: true, icon: "🔑" }]
            : []),
          ...(pGroup.orderDoc?.orderNumber
            ? [{ label: "Order No", value: pGroup.orderDoc.orderNumber, isMono: true, copyable: true, icon: "📦" }]
            : []),
          ...(pGroup.paymentDoc.gatewayOrderId
            ? [{ label: "Gateway Order", value: pGroup.paymentDoc.gatewayOrderId, isMono: true }]
            : []),
          { label: "Amount", value: formattedAmount, icon: "💵" },
          { label: "Method", value: methodStr, icon: "💳" },
          ...(pGroup.invoiceDoc?.gatewayDetails?.bankRrn
            ? [{ label: "Bank RRN", value: pGroup.invoiceDoc.gatewayDetails.bankRrn, isMono: true }]
            : []),
          ...(pGroup.invoiceDoc?.gatewayDetails?.authCode
            ? [{ label: "Auth Code", value: pGroup.invoiceDoc.gatewayDetails.authCode, isMono: true }]
            : []),
        ],
      });
    }

    if (pGroup.invoiceDoc) {
      const invTimestamp = pGroup.invoiceDoc.createdAt || (invoiceEvent as any)?.createdAt;
      const invTime = invTimestamp
        ? new Date(invTimestamp).getTime()
        : sessionInitTime + 60000;
      const deltaMs = invTime - sessionInitTime;
      const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
      const deltaStr =
        deltaSec < 60
          ? `+${deltaSec}s`
          : deltaSec < 3600
          ? `+${Math.floor(deltaSec / 60)}m ${deltaSec % 60}s`
          : `+${Math.floor(deltaSec / 3600)}h`;

      const invActor = (invoiceEvent as any)?.actor || "Billing Engine";

      nodes.push({
        id: `inv-${pGroup.invoiceDoc.invoiceNumber}`,
        type: "invoice",
        title: `Official Tax Invoice Registered (${pGroup.invoiceDoc.invoiceNumber})`,
        subtitle: `Sequential tax invoice generated for accounting compliance`,
        commitSha: pGroup.invoiceDoc.invoiceNumber || "INV-GEN",
        shaLabel: "invoice",
        timestamp: invTimestamp || new Date(invTime).toISOString(),
        deltaDisplay: deltaStr,
        actor: invActor,
        isVerified: true,
        statusBadge: {
          label: "ISSUED",
          bg: "bg-teal-50",
          text: "text-teal-700",
          border: "border-teal-200",
          icon: "🧾",
        },
        metaPills: [
          { label: "Invoice No", value: pGroup.invoiceDoc.invoiceNumber || "", isMono: true, copyable: true, icon: "🧾" },
          ...(pGroup.invoiceDoc.customerName ? [{ label: "Billed To", value: pGroup.invoiceDoc.customerName, icon: "👤" }] : []),
          ...(pGroup.invoiceDoc.customerPhone ? [{ label: "Contact", value: pGroup.invoiceDoc.customerPhone, isMono: true, icon: "📞" }] : []),
          { label: "Total", value: formatCurrency(pGroup.invoiceDoc.total, pGroup.invoiceDoc.currency), icon: "💰" },
          ...(pGroup.invoiceDoc.paymentMethod ? [{ label: "Method", value: pGroup.invoiceDoc.paymentMethod, icon: "💳" }] : []),
        ],
        rawEvent: invoiceEvent || undefined,
      });
    }

    // Sort all nodes chronologically
    return nodes.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-600 text-lg shadow-xs">
              🛡️
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Permanent Audit Events Log
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                GitHub commit graph style audit trail with server-side PDF compliance export
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher & Counter Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode("tree")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "tree"
                  ? "bg-slate-900 text-lime-400 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🌳</span>
              <span>Git Commit Tree</span>
            </button>
            <button
              onClick={() => setViewMode("stream")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "stream"
                  ? "bg-slate-900 text-lime-400 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>📋</span>
              <span>Flat Table Stream</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-center shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Audit Events</div>
            <div className="text-base font-black text-slate-900">{totalCount}</div>
          </div>
        </div>
      </header>

      {/* Advanced Filter Suite */}
      <AuditEventFilters
        currentType={filterType}
        currentSearch={filterSearch}
        currentDatePreset={filterDatePreset}
        currentStartDate={filterStartDate}
        currentEndDate={filterEndDate}
        counts={countsMap}
        totalCount={totalCount}
      />

      {/* ========================================================================= */}
      {/* 1. GITHUB COMMIT-STYLE LIFECYCLE GRAPH TREE                               */}
      {/* ========================================================================= */}
      {viewMode === "tree" ? (
        <div className="space-y-6">
          {/* Action Bar with Quick Segment Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-1">
            {/* Quick Segment Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Show Sessions:
              </span>
              <button
                onClick={() => setTreeSegment("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  treeSegment === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>✨ All ({userTreeGroups.length})</span>
              </button>

              <button
                onClick={() => setTreeSegment("downloaded")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  treeSegment === "downloaded"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                }`}
              >
                <span>📥 Downloaded Sessions ({totalDownloadedUsers})</span>
              </button>

              <button
                onClick={() => setTreeSegment("paid")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  treeSegment === "paid"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100"
                }`}
              >
                <span>💳 Paid Orders ({totalPaidUsers})</span>
              </button>

              <button
                onClick={() => setTreeSegment("guests")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  treeSegment === "guests"
                    ? "bg-slate-700 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>👥 Guest Tests ({totalGuestUsers})</span>
              </button>
            </div>

            {/* Global Expand / Collapse */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>➕</span>
                <span>Expand All</span>
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>➖</span>
                <span>Collapse All</span>
              </button>
            </div>
          </div>

          {displayedUserTreeGroups.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400 shadow-xs">
              <div className="text-4xl mb-3">🔍</div>
              <div className="font-black text-slate-800 text-base">No Audit Commit Events Found</div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing search filters or widening your date filter to view events in the graph.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {displayedUserTreeGroups.map((uGroup) => {
                const isUserExpanded = Boolean(expandedUsers[uGroup.userEmail]);
                const isDownloadingThisUserPdf = downloadingPdfKey === `user-${uGroup.userEmail}`;
                const totalPhotos = uGroup.photos.length;
                const totalDownloads = uGroup.photos.reduce(
                  (acc, p) => acc + p.events.filter((e) => e.eventType === "download").length,
                  0
                );
                const totalUserEvents =
                  uGroup.photos.reduce((acc, p) => acc + p.events.length, 0) +
                  uGroup.generalEvents.length;

                return (
                  <div
                    key={uGroup.userEmail}
                    className="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden transition-all"
                  >
                    {/* Level 1 Header: User / Identity (GitHub Repository / User Card) */}
                    <div
                      onClick={() => toggleUser(uGroup.userEmail)}
                      className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-lime-400 text-slate-950 flex items-center justify-center font-black text-base shadow-sm shrink-0">
                          👤
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-white text-sm sm:text-base tracking-tight truncate">
                              {uGroup.customerName || uGroup.userEmail}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-lime-300 border border-slate-700 text-[11px] font-mono font-bold">
                              {uGroup.userEmail}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(uGroup.userEmail, `email-${uGroup.userEmail}`);
                              }}
                              className="text-slate-400 hover:text-white text-xs"
                              title="Copy Email"
                            >
                              {copiedKey === `email-${uGroup.userEmail}` ? "✓" : "📋"}
                            </button>

                            {totalDownloads > 0 && (
                              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[11px] font-black flex items-center gap-1 shadow-xs animate-pulse">
                                <span>📥</span>
                                <span>{totalDownloads} Download{totalDownloads > 1 ? "s" : ""}</span>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                            {uGroup.customerPhone && (
                              <span className="font-mono text-slate-300 font-medium">
                                📞 {uGroup.customerPhone}
                              </span>
                            )}
                            <span className="text-slate-600">•</span>
                            <span className="text-lime-400 font-semibold">
                              ⑂ {totalPhotos} Photo Branch{totalPhotos > 1 ? "es" : ""}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span>{totalUserEvents} Total Commit Events</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Actions: PDF Download & Branch Toggle */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPdf({ email: uGroup.userEmail });
                          }}
                          disabled={isDownloadingThisUserPdf}
                          className="px-3 py-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                          title="Generate & download official server-side audit trail PDF certificate"
                        >
                          <span>{isDownloadingThisUserPdf ? "⏳" : "📄"}</span>
                          <span>{isDownloadingThisUserPdf ? "Generating..." : "Export Audit PDF"}</span>
                        </button>

                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-lime-400 border border-slate-700">
                          {isUserExpanded ? "Collapse ▲" : "View Branches ▼"}
                        </span>
                      </div>
                    </div>

                    {/* Level 2 & 3: Branches & Commit Tree */}
                    {isUserExpanded && (
                      <div className="p-4 sm:p-6 space-y-6 bg-slate-50/50">
                        {uGroup.photos.map((pGroup) => {
                          const isPhotoExpanded = Boolean(expandedPhotos[pGroup.photoId]);
                          const isDownloadingThisPhotoPdf = downloadingPdfKey === `photo-${pGroup.photoId}`;
                          const commitNodes = buildPhotoCommitNodes(pGroup, uGroup.userEmail);
                          const photoDownloads = pGroup.events.filter((e) => e.eventType === "download").length;

                          const docType =
                            pGroup.photoDoc?.documentType ||
                            pGroup.orderDoc?.documentType ||
                            "Biometric Photo Spec";
                          const isPaid =
                            pGroup.photoDoc?.status === "paid" ||
                            pGroup.orderDoc?.status === "paid" ||
                            pGroup.paymentDoc?.status === "captured";

                          return (
                            <div
                              key={pGroup.photoId}
                              className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all ${
                                photoDownloads > 0
                                  ? "border-amber-300 ring-2 ring-amber-100/80"
                                  : "border-slate-200/90"
                              }`}
                            >
                              {/* Branch Header (GitHub Branch Tag) */}
                              <div
                                onClick={() => togglePhoto(pGroup.photoId)}
                                className={`p-3.5 sm:p-4 border-b flex flex-wrap items-center justify-between gap-3 cursor-pointer transition-colors ${
                                  photoDownloads > 0
                                    ? "bg-amber-50/70 border-amber-200 hover:bg-amber-100/60"
                                    : "bg-slate-100/90 border-slate-200 hover:bg-slate-200/60"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs text-white ${
                                      photoDownloads > 0 ? "bg-amber-500" : "bg-violet-600"
                                    }`}
                                  >
                                    {photoDownloads > 0 ? "📥" : "⑂"}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono text-xs font-black text-slate-800">
                                        branch:
                                      </span>
                                      <span className="font-mono text-xs font-bold text-violet-950 bg-violet-100 px-2 py-0.5 rounded-md border border-violet-200 flex items-center gap-1">
                                        <span>photo/{pGroup.photoId.slice(0, 12)}...</span>
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          copyToClipboard(pGroup.photoId, `pid-${pGroup.photoId}`);
                                        }}
                                        className="text-slate-400 hover:text-slate-800 text-xs"
                                        title="Copy Full Photo ID"
                                      >
                                        {copiedKey === `pid-${pGroup.photoId}` ? "✓" : "📋"}
                                      </button>
                                      <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-700">
                                        {docType}
                                      </span>
                                      {isPaid && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500 text-white font-black tracking-wider">
                                          PAID &amp; VERIFIED
                                        </span>
                                      )}
                                      {photoDownloads > 0 && (
                                        <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black tracking-wider shadow-xs flex items-center gap-1">
                                          <span>📥</span>
                                          <span>{photoDownloads} DOWNLOAD{photoDownloads > 1 ? "S" : ""} COMPLETED</span>
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium flex items-center gap-2">
                                      <span>{commitNodes.length} Commits in this branch</span>
                                      {pGroup.paymentDoc && (
                                        <>
                                          <span className="text-slate-300">•</span>
                                          <span className="font-mono text-emerald-700 font-bold">
                                            {formatCurrency(pGroup.paymentDoc.amount, pGroup.paymentDoc.currency)}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDownloadPdf({ photoId: pGroup.photoId });
                                    }}
                                    disabled={isDownloadingThisPhotoPdf}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer flex items-center gap-1 shadow-2xs disabled:opacity-50"
                                    title="Download audit PDF for this photo branch"
                                  >
                                    <span>{isDownloadingThisPhotoPdf ? "⏳" : "📄"}</span>
                                    <span>{isDownloadingThisPhotoPdf ? "PDF..." : "Branch PDF"}</span>
                                  </button>

                                  <span
                                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                                      photoDownloads > 0
                                        ? "text-amber-950 bg-amber-200/80 border-amber-300"
                                        : "text-violet-800 bg-violet-50 border-violet-200"
                                    }`}
                                  >
                                    {isPhotoExpanded ? "Collapse Tree ▲" : "View Tree ▼"}
                                  </span>
                                </div>
                              </div>

                              {/* GitHub Commit Tree Timeline Body */}
                              {isPhotoExpanded && (
                                <div className="p-4 sm:p-6 bg-slate-50/40">
                                  {/* Git Commit Spine Timeline */}
                                  <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-300 before:rounded">
                                    <div className="space-y-5">
                                      {commitNodes.map((node, nodeIdx) => {
                                        const style = nodeTypeStyles[node.type] || nodeTypeStyles.general;
                                        const isDownloadNode = node.type === "download";

                                        return (
                                          <div key={node.id} className="relative group">
                                            {/* Commit Node Circle on Branch Spine */}
                                            <div
                                              className={`absolute -left-6 sm:-left-8 top-3.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full ${style.ringBg} text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-xs z-10 ${
                                                isDownloadNode ? "ring-4 ring-amber-200 scale-110" : ""
                                              }`}
                                              title={`${style.label} (Step ${nodeIdx + 1})`}
                                            >
                                              <span className="text-[11px]">{style.icon}</span>
                                            </div>

                                            {/* Commit Box (GitHub Style Commit Card) */}
                                            <div
                                              className={`rounded-2xl border p-4 transition-all ${
                                                isDownloadNode
                                                  ? "bg-amber-50/60 border-amber-300 shadow-xs ring-1 ring-amber-200/80"
                                                  : "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs"
                                              }`}
                                            >
                                              {/* Commit Card Header */}
                                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                                                <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                  {/* Type Badge */}
                                                  <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}
                                                  >
                                                    <span>{style.icon}</span>
                                                    <span>{style.label}</span>
                                                  </span>

                                                  {/* Commit Title */}
                                                  <h4
                                                    className={`font-black text-xs sm:text-sm tracking-tight ${
                                                      isDownloadNode ? "text-amber-950" : "text-slate-900"
                                                    }`}
                                                  >
                                                    {node.title}
                                                  </h4>
                                                </div>

                                                {/* SHA Pill & Delta Duration */}
                                                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                                                  <span
                                                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                                      isDownloadNode
                                                        ? "bg-amber-500 text-slate-950 font-black"
                                                        : "bg-slate-900 text-lime-400"
                                                    }`}
                                                  >
                                                    {node.deltaDisplay}
                                                  </span>

                                                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1.5 py-0.5">
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase">
                                                      {node.shaLabel}:
                                                    </span>
                                                    <code className="font-mono text-[10px] font-bold text-slate-700">
                                                      {node.commitSha.length > 10
                                                        ? `${node.commitSha.slice(0, 8)}...`
                                                        : node.commitSha}
                                                    </code>
                                                    <button
                                                      onClick={() =>
                                                        copyToClipboard(node.commitSha, `sha-${node.id}`)
                                                      }
                                                      className="text-slate-400 hover:text-slate-800 text-[10px]"
                                                      title="Copy Commit Hash / ID"
                                                    >
                                                      {copiedKey === `sha-${node.id}` ? "✓" : "📋"}
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Commit Subtitle / Description */}
                                              {node.subtitle && (
                                                <p
                                                  className={`text-xs mt-2 font-medium ${
                                                    isDownloadNode ? "text-amber-900 font-semibold" : "text-slate-500"
                                                  }`}
                                                >
                                                  {node.subtitle}
                                                </p>
                                              )}

                                              {/* Metadata Pills Grid */}
                                              {node.metaPills.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                                  {node.metaPills.map((pill, pIdx) => (
                                                    <div
                                                      key={pIdx}
                                                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs ${
                                                        isDownloadNode
                                                          ? "bg-white border-amber-200 text-amber-950"
                                                          : "bg-slate-50 border-slate-200/80 text-slate-700"
                                                      }`}
                                                    >
                                                      {pill.icon && <span className="text-xs">{pill.icon}</span>}
                                                      <span className="text-slate-400 text-[10px] font-semibold">
                                                        {pill.label}:
                                                      </span>
                                                      <span
                                                        className={`font-bold ${
                                                          isDownloadNode ? "text-amber-950" : "text-slate-900"
                                                        } ${pill.isMono ? "font-mono text-[11px]" : ""}`}
                                                      >
                                                        {pill.value}
                                                      </span>
                                                      {pill.copyable && (
                                                        <button
                                                          onClick={() =>
                                                            copyToClipboard(
                                                              pill.value,
                                                              `pill-${node.id}-${pIdx}`
                                                            )
                                                          }
                                                          className="text-slate-400 hover:text-slate-700 text-[10px] ml-0.5"
                                                          title={`Copy ${pill.label}`}
                                                        >
                                                          {copiedKey === `pill-${node.id}-${pIdx}`
                                                            ? "✓"
                                                            : "📋"}
                                                        </button>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}

                                              {/* Commit Author, Timing, and Inspector Trigger Bar */}
                                              <div className="flex flex-wrap items-center justify-between gap-3 mt-3.5 pt-3 border-t border-slate-100 text-[11px]">
                                                {/* Left: Author & Network IP */}
                                                <div className="flex flex-wrap items-center gap-2 text-slate-500">
                                                  <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                                                    <span>👤</span>
                                                    <span>{node.actor}</span>
                                                  </span>

                                                  {node.isVerified && (
                                                    <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black">
                                                      Verified ✓
                                                    </span>
                                                  )}

                                                  {node.ipAddress && (
                                                    <span className="font-mono text-slate-400 text-[10px]">
                                                      🌐 {node.ipAddress}
                                                    </span>
                                                  )}
                                                </div>

                                                {/* Right: Timestamp & Inspect Modal Action */}
                                                <div className="flex items-center gap-3">
                                                  <span className="text-slate-400 font-mono text-[10px]">
                                                    🕒 {new Date(node.timestamp).toLocaleString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      second: "2-digit",
                                                    })}
                                                  </span>

                                                  {node.rawEvent ? (
                                                    <AuditDetailModal
                                                      event={node.rawEvent}
                                                      email={uGroup.userEmail}
                                                      conf={{
                                                        badge: style.badgeBg + " " + style.badgeText + " " + style.badgeBorder,
                                                        icon: style.icon,
                                                        label: style.label,
                                                      }}
                                                    />
                                                  ) : (
                                                    <button
                                                      onClick={() =>
                                                        copyToClipboard(
                                                          JSON.stringify(node, null, 2),
                                                          `copy-node-${node.id}`
                                                        )
                                                      }
                                                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                                      title="Copy Event Snapshot"
                                                    >
                                                      <span>{copiedKey === `copy-node-${node.id}` ? "✓ Copied" : "📋 Snapshot"}</span>
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* General User Events (Account Level) */}
                        {uGroup.generalEvents.length > 0 && (
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                            <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                              <span>📌</span>
                              <span>General Account &amp; System Events ({uGroup.generalEvents.length})</span>
                            </div>
                            <div className="space-y-2">
                              {uGroup.generalEvents.map((evt) => (
                                <div
                                  key={evt._id}
                                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                                      {evt.eventType}
                                    </span>
                                    <span className="font-semibold text-slate-800">
                                      {evt.actor || "System Action"}
                                    </span>
                                    {evt.ipAddress && (
                                      <code className="text-[10px] text-slate-400 font-mono">
                                        ({evt.ipAddress})
                                      </code>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="font-mono text-[10px] text-slate-400">
                                      {new Date(evt.createdAt).toLocaleString()}
                                    </span>
                                    <AuditDetailModal
                                      event={evt}
                                      email={uGroup.userEmail}
                                      conf={{
                                        badge: "bg-slate-100 text-slate-700 border-slate-200",
                                        icon: "📌",
                                        label: evt.eventType,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. FLAT STREAM TABLE VIEW                                                 */
        /* ========================================================================= */
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Date &amp; Time
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Actor &amp; Network
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Photo &amp; Transaction References
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Details Summary
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {flatEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                      <div className="text-3xl mb-2">🔍</div>
                      <div className="font-bold text-slate-700">No audit events match your filter criteria</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Try clearing your date range, search query, or event type filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  flatEvents.map((event) => {
                    const style = nodeTypeStyles[event.eventType] || nodeTypeStyles.general;
                    const email =
                      (event.actor && event.actor.includes("@") ? event.actor : null) ||
                      event.metadata?.email ||
                      (event.orderId && emailMap[event.orderId]) ||
                      (event.photoId && emailMap[event.photoId]) ||
                      null;

                    return (
                      <tr key={event._id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Event Type */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}
                          >
                            <span>{style.icon}</span>
                            <span>{style.label}</span>
                          </span>
                        </td>

                        {/* Timestamp */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-slate-900">
                            {new Date(event.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {new Date(event.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Actor & IP */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            {email ? (
                              <>
                                <span className="font-bold text-slate-900 truncate max-w-[220px]" title={email}>
                                  {email}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-lime-700 font-semibold bg-lime-50 border border-lime-200/80 px-1.5 py-0.2 rounded">
                                    Customer
                                  </span>
                                  {event.actor && !event.actor.includes("@") && (
                                    <span className="text-[9px] text-slate-400 capitalize">({event.actor})</span>
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="font-semibold text-slate-800 capitalize">
                                {event.actor || "system"}
                              </span>
                            )}
                            {event.ipAddress && (
                              <code className="text-[10px] text-slate-400 font-mono mt-0.5">
                                {event.ipAddress}
                              </code>
                            )}
                          </div>
                        </td>

                        {/* References */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1 text-[11px] font-mono text-slate-600">
                            {event.photoId && (
                              <div className="flex items-center gap-1">
                                <span className="text-slate-400 text-[10px]">Photo:</span>
                                <code className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                                  {String(event.photoId).slice(-8)}
                                </code>
                              </div>
                            )}
                            {event.orderId && (
                              <div className="flex items-center gap-1">
                                <span className="text-slate-400 text-[10px]">Order:</span>
                                <code className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                                  {String(event.orderId).slice(-8)}
                                </code>
                              </div>
                            )}
                            {event.paymentId && (
                              <div className="flex items-center gap-1">
                                <span className="text-slate-400 text-[10px]">Pay:</span>
                                <code className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                                  {String(event.paymentId).slice(-8)}
                                </code>
                              </div>
                            )}
                            {!event.photoId && !event.orderId && !event.paymentId && (
                              <span className="text-slate-400 text-xs italic font-sans">System Level</span>
                            )}
                          </div>
                        </td>

                        {/* Details Summary */}
                        <td className="px-5 py-4">
                          <div className="max-w-xs text-xs text-slate-600 truncate">
                            {event.metadata?.fileName && (
                              <div className="font-mono text-[11px] text-slate-800 truncate" title={event.metadata.fileName}>
                                📄 {event.metadata.fileName}
                              </div>
                            )}
                            {event.metadata?.documentType && (
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Spec: <span className="font-semibold text-slate-700">{event.metadata.documentType}</span>
                              </div>
                            )}
                            {event.metadata?.dimensions && (
                              <div className="text-[11px] text-slate-500">
                                Size: <span className="font-semibold">{event.metadata.dimensions}</span>
                              </div>
                            )}
                            {!event.metadata?.fileName && !event.metadata?.documentType && !event.metadata?.dimensions && (
                              <span className="text-slate-400 italic">Metadata recorded</span>
                            )}
                          </div>
                        </td>

                        {/* Modal Action */}
                        <td className="px-5 py-4 text-right">
                          <AuditDetailModal
                            event={event}
                            email={email}
                            conf={{
                              badge: style.badgeBg + " " + style.badgeText + " " + style.badgeBorder,
                              icon: style.icon,
                              label: style.label,
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
