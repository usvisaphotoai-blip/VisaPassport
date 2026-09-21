"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/currency-formatter";

interface InvoicePreviewModalProps {
  invoice: any;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function InvoicePreviewModal({
  invoice,
  isOpen,
  onClose,
  onRefresh,
}: InvoicePreviewModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [detailedData, setDetailedData] = useState<any>(null);

  // Close on escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Fetch full invoice detail with audit logs
    if (invoice?._id || invoice?.invoiceNumber) {
      const targetId = invoice._id || invoice.invoiceNumber;
      fetch(`/api/admin/invoices/${targetId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.invoice) {
            setDetailedData(data);
          }
        })
        .catch((err) => console.error("Failed to load detailed invoice data:", err));
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, invoice]);

  if (!isOpen || !invoice) return null;

  const currentInvoice = detailedData?.invoice || invoice;
  const auditEvents = detailedData?.auditEvents || [];

  const copyToClipboard = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const targetId = currentInvoice._id || currentInvoice.invoiceNumber;
      const res = await fetch(`/api/admin/invoices/${targetId}/pdf`);
      if (!res.ok) throw new Error("PDF download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PixPassport-Invoice-${currentInvoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert("Error downloading PDF: " + err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const invoiceDateStr = currentInvoice.invoiceDate
    ? new Date(currentInvoice.invoiceDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US");

  const paymentDateStr = currentInvoice.paymentDate
    ? new Date(currentInvoice.paymentDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Verified";

  const fulfillment = currentInvoice.fulfillmentEvidence || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Flat Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-lime-500/20 border border-lime-500/40 flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="PixPassport"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight">
                  Invoice Preview
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                  {currentInvoice.invoiceNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official server-side generated A4 invoice replica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <span>{isDownloading ? "⏳" : "⬇️"}</span>
              <span>{isDownloading ? "Generating..." : "Download PDF"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
            >
              <span>🖨️</span>
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer border border-slate-700"
              aria-label="Close Preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100/70">
          {/* Printable Sheet Container (Flat A4 Paper Style) */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden relative print:shadow-none print:border-none">
            {/* Top Clean Flat Brand Stripe */}
            <div className="h-1 bg-lime-500 w-full"></div>

            <div className="p-6 sm:p-10 space-y-6">
              {/* Document Header with Logo */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 p-1 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="PixPassport Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                      {currentInvoice.businessDetails?.name || "PixPassport"}
                    </h1>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1 mb-1.5">
                      Official Payment Receipt &amp; Tax Invoice
                    </p>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      {currentInvoice.businessDetails?.address ||
                        "Khadda, Kushinagar, Uttar Pradesh, India 274802"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {currentInvoice.businessDetails?.email || "support@pixpassport.com"} •{" "}
                      {currentInvoice.businessDetails?.website || "https://pixpassport.com"}
                    </p>
                    {currentInvoice.businessDetails?.taxId && (
                      <p className="text-xs font-semibold text-slate-700 mt-1">
                        GSTIN / Tax ID: {currentInvoice.businessDetails.taxId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right flex flex-col sm:items-end">
                  <div className="inline-block bg-slate-900 text-white font-black text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                    TAX INVOICE
                  </div>
                  <div className="flex items-center gap-2 sm:justify-end">
                    <span className="text-lg font-mono font-black text-slate-900">
                      {currentInvoice.invoiceNumber}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(currentInvoice.invoiceNumber, "invNum")
                      }
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors text-xs"
                      title="Copy Invoice Number"
                    >
                      {copiedField === "invNum" ? "✓" : "📋"}
                    </button>
                  </div>

                  <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>PAID</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    Date: {invoiceDateStr}
                  </p>
                </div>
              </div>

              {/* Two Flat Info Cards: Billed To & Payment Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Billed To */}
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    BILLED TO
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {currentInvoice.gatewayDetails?.cardHolderName ||
                      currentInvoice.customerName ||
                      "Customer"}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                    <span>{currentInvoice.customerEmail}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(currentInvoice.customerEmail, "custEmail")
                      }
                      className="text-slate-400 hover:text-slate-700 text-[10px]"
                      title="Copy Email"
                    >
                      {copiedField === "custEmail" ? "✓" : "📋"}
                    </button>
                  </div>

                  {(currentInvoice.customerPhone ||
                    currentInvoice.gatewayDetails?.contact) && (
                    <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                      <span>
                        📞{" "}
                        {currentInvoice.customerPhone ||
                          currentInvoice.gatewayDetails?.contact}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            currentInvoice.customerPhone ||
                              currentInvoice.gatewayDetails?.contact,
                            "custPhone"
                          )
                        }
                        className="text-slate-400 hover:text-slate-700 text-[10px]"
                        title="Copy Phone"
                      >
                        {copiedField === "custPhone" ? "✓" : "📋"}
                      </button>
                    </div>
                  )}

                  {currentInvoice.customerCountry && (
                    <div className="text-xs text-slate-500 pt-0.5">
                      Country:{" "}
                      <span className="font-semibold text-slate-700">
                        {currentInvoice.customerCountry}
                      </span>
                    </div>
                  )}

                  {currentInvoice.photoId && (
                    <div className="flex items-center gap-1 text-xs pt-1 border-t border-slate-200/60 mt-1">
                      <span className="text-slate-500 font-semibold">Photo ID:</span>
                      <span className="font-mono text-[11px] font-bold text-slate-800">
                        {String(currentInvoice.photoId)}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(String(currentInvoice.photoId), "photoId")
                        }
                        className="text-slate-400 hover:text-slate-700 text-[10px]"
                        title="Copy Photo ID"
                      >
                        {copiedField === "photoId" ? "✓" : "📋"}
                      </button>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 pt-0.5">
                    Delivery: Digital Biometric Download
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    PAYMENT TRANSACTION
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Gateway:</span>
                    <span className="font-bold text-slate-800">Razorpay</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Payment ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[11px] font-bold text-slate-800 truncate max-w-[140px]">
                        {currentInvoice.gatewayPaymentId || "N/A"}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(currentInvoice.gatewayPaymentId, "payId")
                        }
                        className="text-slate-400 hover:text-slate-700 text-[10px]"
                        title="Copy Payment ID"
                      >
                        {copiedField === "payId" ? "✓" : "📋"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-mono text-[11px] font-semibold text-slate-700">
                      {currentInvoice.gatewayOrderId || currentInvoice.orderNumber || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Payment Method:</span>
                    <span className="font-semibold text-slate-800">
                      {currentInvoice.paymentMethod || "CARD"}
                    </span>
                  </div>

                  {(currentInvoice.gatewayDetails?.bankRrn ||
                    currentInvoice.gatewayDetails?.authCode) && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Bank Auth / RRN:</span>
                      <span className="font-mono font-medium text-slate-700">
                        {[
                          currentInvoice.gatewayDetails?.authCode
                            ? `Auth: ${currentInvoice.gatewayDetails.authCode}`
                            : "",
                          currentInvoice.gatewayDetails?.bankRrn
                            ? `RRN: ${currentInvoice.gatewayDetails.bankRrn}`
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Payment Date:</span>
                    <span className="text-slate-700 font-medium">{paymentDateStr}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-semibold text-emerald-700">Captured</span>
                  </div>
                </div>
              </div>

              {/* Line Items Table (Flat Design) */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-4">Item &amp; Description</th>
                      <th className="py-2.5 px-4 text-center w-16">Qty</th>
                      <th className="py-2.5 px-4 text-right w-28">Unit Price</th>
                      <th className="py-2.5 px-4 text-right w-28">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {(currentInvoice.lineItems || []).map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <div className="font-black text-slate-900">{item.name}</div>
                          {item.description && (
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700">
                          {item.quantity || 1}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-slate-700">
                          {formatCurrency(item.unitPrice, currentInvoice.currency)}
                        </td>
                        <td className="py-3 px-4 text-right font-black text-slate-900">
                          {formatCurrency(item.total, currentInvoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals Breakdown (Flat Style) */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-1">
                <div className="text-xs text-slate-500 max-w-sm space-y-1">
                  <div className="font-bold text-slate-700">Payment Assurance</div>
                  <p className="leading-relaxed">
                    Processed securely via Razorpay gateway. All biometric photos include
                    a 100% government acceptance guarantee and 24-hour privacy retention compliance.
                  </p>
                </div>

                <div className="w-full sm:w-72 bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Subtotal:</span>
                    <span className="text-slate-800 font-bold">
                      {formatCurrency(
                        currentInvoice.subtotal || currentInvoice.amount,
                        currentInvoice.currency
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Tax / GST (0%):</span>
                    <span className="text-slate-700">
                      {currentInvoice.tax > 0
                        ? formatCurrency(currentInvoice.tax, currentInvoice.currency)
                        : "Tax Exempt ($0.00)"}
                    </span>
                  </div>

                  {currentInvoice.discount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-700">
                      <span>Discount:</span>
                      <span>
                        -{formatCurrency(currentInvoice.discount, currentInvoice.currency)}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-black text-slate-900">Total Paid:</span>
                    <span className="text-lg font-black text-emerald-700">
                      {formatCurrency(
                        currentInvoice.total || currentInvoice.amount,
                        currentInvoice.currency
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compliance & Fulfillment Verification Box (Flat Card) */}
              <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Service Fulfillment &amp; Compliance Trail
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Verified Complete
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Payment Verification
                    </div>
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Razorpay Captured</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">
                      ID: {currentInvoice.gatewayPaymentId}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Biometric Processing
                    </div>
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Photo Processed</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Specs: {fulfillment.photoDimensions || "Official Size"} • Background Valid
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Customer Delivery
                    </div>
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>
                        {fulfillment.downloadCount
                          ? `${fulfillment.downloadCount} Download(s)`
                          : "Delivery Active"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Email: {fulfillment.emailDelivered ? "Delivered" : "Web Confirmation"}
                    </div>
                  </div>
                </div>

                {/* Razorpay Gateway Evidence & Notes */}
                {(currentInvoice.gatewayDetails?.notes ||
                  currentInvoice.gatewayDetails?.cardId ||
                  currentInvoice.gatewayDetails?.fee) && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Razorpay Payment &amp; Notes Metadata:</span>
                      {currentInvoice.gatewayDetails?.fee !== undefined && (
                        <span className="text-slate-600 font-mono">
                          Platform Fee: ₹{currentInvoice.gatewayDetails.fee.toFixed(2)} (GST: ₹{(currentInvoice.gatewayDetails.tax || 0).toFixed(2)})
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-white p-2.5 rounded-lg border border-slate-200 text-slate-600">
                      {currentInvoice.photoId && (
                        <div>
                          <span className="text-slate-400">photoId: </span>
                          <span className="font-bold text-slate-800">
                            {String(currentInvoice.photoId)}
                          </span>
                        </div>
                      )}
                      {currentInvoice.gatewayDetails?.notes?.guestEmail && (
                        <div>
                          <span className="text-slate-400">guestEmail: </span>
                          <span className="text-slate-800">
                            {currentInvoice.gatewayDetails.notes.guestEmail}
                          </span>
                        </div>
                      )}
                      {currentInvoice.gatewayDetails?.cardId && (
                        <div>
                          <span className="text-slate-400">cardId: </span>
                          <span className="text-slate-800">
                            {currentInvoice.gatewayDetails.cardId}
                          </span>
                        </div>
                      )}
                      {currentInvoice.gatewayDetails?.notes?.gaClientId && (
                        <div>
                          <span className="text-slate-400">gaClientId: </span>
                          <span className="text-slate-800">
                            {currentInvoice.gatewayDetails.notes.gaClientId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {auditEvents.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      System Audit Trail ({auditEvents.length} events logged):
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[10px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      {auditEvents.map((evt: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 py-0.5 border-b border-slate-50 last:border-0"
                        >
                          <span className="font-bold text-slate-800">
                            [{evt.eventType.toUpperCase()}]
                          </span>
                          <span className="text-slate-500 truncate flex-1 ml-2">
                            {evt.metadata?.recipient ||
                              evt.metadata?.fileName ||
                              evt.actor ||
                              JSON.stringify(evt.metadata || {})}
                          </span>
                          <span className="text-slate-400 shrink-0">
                            {new Date(evt.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Document Footer */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                <div>
                  PixPassport • Professional Visa &amp; Passport Photo Processing
                </div>
                <div>
                  <a
                    href="https://pixpassport.com/refund-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 underline font-medium"
                  >
                    100% Refund Policy &amp; Terms
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Flat Action Bar */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>PDF Downloads Recorded:</span>
            <span className="font-bold text-slate-800">
              {currentInvoice.pdfMetadata?.downloadCount || 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-lime-400 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <span>{isDownloading ? "⏳" : "⬇️"}</span>
              <span>{isDownloading ? "Generating..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
