"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import InvoicePreviewModal from "./InvoicePreviewModal";
import { formatCurrency } from "@/lib/currency-formatter";

interface InvoicesClientPageProps {
  initialInvoices: any[];
  initialStats: {
    totalInvoices: number;
    paidCount: number;
    totalRevenueUSD: number;
    totalRevenueINR: number;
    uninvoicedPaymentsCount: number;
  };
  initialUninvoicedPayments: any[];
}

export default function InvoicesClientPage({
  initialInvoices,
  initialStats,
  initialUninvoicedPayments,
}: InvoicesClientPageProps) {
  const [activeTab, setActiveTab] = useState<"invoices" | "uninvoiced">("invoices");

  // Invoices list state
  const [invoices, setInvoices] = useState<any[]>(initialInvoices);
  const [stats, setStats] = useState(initialStats);
  const [uninvoicedPayments, setUninvoicedPayments] = useState<any[]>(
    initialUninvoicedPayments
  );

  // Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [datePreset, setDatePreset] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Loading & Bulk States
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([]);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<string[]>([]);
  const [generatingPaymentId, setGeneratingPaymentId] = useState<string | null>(null);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  // Preview Modal State
  const [previewInvoice, setPreviewInvoice] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast("Copied: " + text);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Fetch updated invoices from API
  const refreshInvoices = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (currencyFilter !== "all") params.set("currency", currencyFilter);
      if (datePreset !== "all") params.set("datePreset", datePreset);
      if (datePreset === "custom" && startDate) params.set("startDate", startDate);
      if (datePreset === "custom" && endDate) params.set("endDate", endDate);

      const [invRes, uninvRes] = await Promise.all([
        fetch(`/api/admin/invoices?${params.toString()}`),
        fetch(`/api/admin/invoices/uninvoiced-payments`),
      ]);

      const invData = await invRes.json();
      const uninvData = await uninvRes.json();

      if (invData.invoices) {
        setInvoices(invData.invoices);
        setStats(invData.stats);
      }
      if (uninvData.payments) {
        setUninvoicedPayments(uninvData.payments);
      }
    } catch (err: any) {
      showToast("Failed to refresh data: " + err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      refreshInvoices();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, currencyFilter, datePreset, startDate, endDate]);

  // Generate single invoice
  const handleGenerateInvoice = async (paymentId: string) => {
    try {
      setGeneratingPaymentId(paymentId);
      const res = await fetch("/api/admin/invoices/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gatewayPaymentId: paymentId, paymentId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invoice generation failed");
      }

      showToast(`Invoice ${data.invoice.invoiceNumber} generated!`);
      await refreshInvoices();
      setPreviewInvoice(data.invoice);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setGeneratingPaymentId(null);
    }
  };

  // Bulk Generate Invoices
  const handleBulkGenerate = async () => {
    if (selectedPaymentIds.length === 0) return;
    try {
      setIsBulkGenerating(true);
      const res = await fetch("/api/admin/invoices/bulk-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIds: selectedPaymentIds }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Bulk generation failed");
      }

      showToast(
        `Generated ${data.summary.createdCount} new invoices (${data.summary.existingCount} already existed)`
      );
      setSelectedPaymentIds([]);
      await refreshInvoices();
      setActiveTab("invoices");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsBulkGenerating(false);
    }
  };

  // Download Single PDF
  const handleDownloadPdf = async (invoice: any) => {
    try {
      const res = await fetch(`/api/admin/invoices/${invoice._id}/pdf`);
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PixPassport-Invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showToast(`Downloaded ${invoice.invoiceNumber}.pdf`);
    } catch (err: any) {
      showToast("Download error: " + err.message, "error");
    }
  };

  // Bulk Download ZIP
  const handleBulkDownloadZip = async () => {
    if (selectedInvoiceIds.length === 0) return;
    try {
      setIsBulkDownloading(true);
      const res = await fetch("/api/admin/invoices/bulk-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceIds: selectedInvoiceIds }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Bulk ZIP download failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PixPassport-Invoices-Export-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showToast(`Downloaded ZIP archive with ${selectedInvoiceIds.length} invoices`);
      setSelectedInvoiceIds([]);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsBulkDownloading(false);
    }
  };

  const toggleSelectAllInvoices = () => {
    if (selectedInvoiceIds.length === invoices.length) {
      setSelectedInvoiceIds([]);
    } else {
      setSelectedInvoiceIds(invoices.map((inv) => inv._id));
    }
  };

  const toggleSelectInvoice = (id: string) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllPayments = () => {
    if (selectedPaymentIds.length === uninvoicedPayments.length) {
      setSelectedPaymentIds([]);
    } else {
      setSelectedPaymentIds(
        uninvoicedPayments.map((p) => p.gatewayPaymentId || p._id)
      );
    }
  };

  const toggleSelectPayment = (id: string) => {
    setSelectedPaymentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification (Flat Style) */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            toastMessage.type === "success"
              ? "bg-slate-900 text-lime-400 border-slate-800"
              : "bg-rose-950 text-rose-300 border-rose-800"
          }`}
        >
          <span>{toastMessage.type === "success" ? "✓" : "⚠️"}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Flat Header Section with App Logo */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-1">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src="/logo.png"
              alt="PixPassport Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Invoice &amp; Billing
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-lime-100 text-lime-900 text-[10px] font-bold uppercase tracking-wider border border-lime-200">
                Razorpay
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Generate, preview, and download compliance-ready accounting invoices from captured payments
            </p>
          </div>
        </div>

        {/* Flat KPI Stat Cards */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
              Total Invoices
            </div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {stats.totalInvoices}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5">
            <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wide">
              Paid Invoices
            </div>
            <div className="text-base font-black text-emerald-700 mt-0.5">
              {stats.paidCount}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5">
            <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wide">
              Invoiced Volume
            </div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {stats.totalRevenueINR > 0 ? `₹${stats.totalRevenueINR.toFixed(2)}` : ""}
              {stats.totalRevenueINR > 0 && stats.totalRevenueUSD > 0 ? " + " : ""}
              {stats.totalRevenueUSD > 0
                ? `$${stats.totalRevenueUSD.toFixed(2)}`
                : stats.totalRevenueINR === 0
                ? "$0.00"
                : ""}
            </div>
          </div>

          <button
            onClick={() => setActiveTab("uninvoiced")}
            className={`rounded-xl px-4 py-2.5 border transition-all text-left cursor-pointer ${
              activeTab === "uninvoiced"
                ? "bg-amber-500 text-slate-950 border-amber-600 font-bold"
                : stats.uninvoicedPaymentsCount > 0
                ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                : "bg-white border-slate-200 text-slate-600"
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80 tracking-wide">
              Uninvoiced Captured
            </div>
            <div className="text-base font-black flex items-center gap-1.5 mt-0.5">
              <span>{stats.uninvoicedPaymentsCount}</span>
              {stats.uninvoicedPaymentsCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-md font-bold">
                  Action
                </span>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Flat Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "invoices"
              ? "bg-slate-900 text-lime-400"
              : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <span>🧾 Generated Invoices</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-slate-300">
            {invoices.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("uninvoiced")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "uninvoiced"
              ? "bg-slate-900 text-lime-400"
              : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <span>⚡ Uninvoiced Captured Payments</span>
          {stats.uninvoicedPaymentsCount > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-500 text-slate-950 font-black">
              {stats.uninvoicedPaymentsCount}
            </span>
          )}
        </button>
      </div>

      {/* Flat Filter Toolbar (Invoices tab) */}
      {activeTab === "invoices" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Invoice #, email, order, payment ID..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
                />
                <span className="absolute left-2.5 top-2.5 text-xs text-slate-400">
                  🔍
                </span>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all text-slate-800 font-medium cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="PAID">PAID (Captured)</option>
                <option value="ISSUED">ISSUED</option>
                <option value="DRAFT">DRAFT</option>
                <option value="VOID">VOID</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Currency
              </label>
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all text-slate-800 font-medium cursor-pointer"
              >
                <option value="all">All Currencies</option>
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (AU$)</option>
              </select>
            </div>

            {/* Date Preset */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Date Range
              </label>
              <select
                value={datePreset}
                onChange={(e) => setDatePreset(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all text-slate-800 font-medium cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="custom">Custom Range...</option>
              </select>
            </div>
          </div>

          {/* Custom Date Range */}
          {datePreset === "custom" && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Flat Floating Bulk Actions Bar (Invoices) */}
      {activeTab === "invoices" && selectedInvoiceIds.length > 0 && (
        <div className="bg-slate-900 text-white rounded-xl p-3 px-5 flex flex-wrap items-center justify-between gap-3 border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400"></span>
            <span className="text-xs font-bold text-lime-400">
              {selectedInvoiceIds.length} invoice(s) selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDownloadZip}
              disabled={isBulkDownloading}
              className="px-3.5 py-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-lg font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isBulkDownloading ? "⏳" : "📦"}</span>
              <span>
                {isBulkDownloading ? "Bundling..." : "Download Selected (ZIP)"}
              </span>
            </button>
            <button
              onClick={() => setSelectedInvoiceIds([])}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Flat Floating Bulk Actions Bar (Uninvoiced Payments) */}
      {activeTab === "uninvoiced" && selectedPaymentIds.length > 0 && (
        <div className="bg-amber-950 text-amber-100 rounded-xl p-3 px-5 flex flex-wrap items-center justify-between gap-3 border border-amber-800 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-xs font-bold text-amber-300">
              {selectedPaymentIds.length} payment(s) selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkGenerate}
              disabled={isBulkGenerating}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isBulkGenerating ? "⏳" : "⚡"}</span>
              <span>
                {isBulkGenerating
                  ? "Generating..."
                  : "Generate Selected Invoices"}
              </span>
            </button>
            <button
              onClick={() => setSelectedPaymentIds([])}
              className="px-3 py-1.5 bg-amber-900 hover:bg-amber-800 text-amber-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === "invoices" ? (
        /* Invoices Table (Flat Design) */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={
                        invoices.length > 0 &&
                        selectedInvoiceIds.length === invoices.length
                      }
                      onChange={toggleSelectAllInvoices}
                      className="rounded text-lime-600 focus:ring-lime-400 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Razorpay Payment ID</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Product / Service</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-slate-400">
                      <div className="text-3xl mb-2">🧾</div>
                      <div className="font-bold text-slate-700 text-sm">
                        No Invoices Found
                      </div>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        No invoices match your current search and filters.
                      </p>
                      {stats.uninvoicedPaymentsCount > 0 && (
                        <button
                          onClick={() => setActiveTab("uninvoiced")}
                          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-lime-400 font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>⚡ View Uninvoiced Payments ({stats.uninvoicedPaymentsCount})</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv: any) => {
                    const isSelected = selectedInvoiceIds.includes(inv._id);
                    const formattedDate = inv.paymentDate
                      ? new Date(inv.paymentDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A";

                    return (
                      <tr
                        key={inv._id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          isSelected ? "bg-lime-50/40" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectInvoice(inv._id)}
                            className="rounded text-lime-600 focus:ring-lime-400 cursor-pointer"
                          />
                        </td>

                        {/* Invoice Number */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 font-mono font-black text-slate-900">
                            <span>{inv.invoiceNumber}</span>
                            <button
                              onClick={() =>
                                copyToClipboard(inv.invoiceNumber, `inv-${inv._id}`)
                              }
                              className="text-slate-300 hover:text-slate-600 transition-colors"
                              title="Copy Invoice Number"
                            >
                              {copiedKey === `inv-${inv._id}` ? "✓" : "📋"}
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            DLs: {inv.pdfMetadata?.downloadCount || 0}
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 truncate max-w-[170px]">
                            {inv.gatewayDetails?.cardHolderName ||
                              inv.customerName ||
                              "Customer"}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono truncate max-w-[170px]">
                            {inv.customerEmail}
                          </div>
                          {(inv.customerPhone ||
                            inv.gatewayDetails?.contact) && (
                            <div className="text-[10px] text-slate-500 font-mono truncate max-w-[170px]">
                              📞{" "}
                              {inv.customerPhone ||
                                inv.gatewayDetails?.contact}
                            </div>
                          )}
                          {inv.customerCountry && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              {inv.customerCountry}
                            </span>
                          )}
                        </td>

                        {/* Razorpay Payment ID */}
                        <td className="py-3 px-4 font-mono text-[11px]">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-800 truncate max-w-[130px]">
                              {inv.gatewayPaymentId || "N/A"}
                            </span>
                            {inv.gatewayPaymentId && (
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    inv.gatewayPaymentId,
                                    `pay-${inv._id}`
                                  )
                                }
                                className="text-slate-300 hover:text-slate-600 transition-colors"
                                title="Copy Razorpay Payment ID"
                              >
                                {copiedKey === `pay-${inv._id}` ? "✓" : "📋"}
                              </button>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {inv.paymentMethod || "card"}
                          </div>
                        </td>

                        {/* Order ID */}
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                          <span className="truncate max-w-[110px] block">
                            {inv.gatewayOrderId || inv.orderNumber || (inv.orderId ? `ORD-${inv.orderId}` : "—")}
                          </span>
                        </td>

                        {/* Product/Service & Photo ID */}
                        <td className="py-3 px-4">
                          <div className="truncate max-w-[200px] text-slate-800 font-semibold">
                            {inv.lineItems?.[0]?.name || "Passport Photo Processing"}
                          </div>
                          {inv.photoId && (
                            <div className="flex items-center gap-1 mt-0.5 text-[10px] font-mono text-slate-500">
                              <span>📸 {String(inv.photoId).slice(0, 14)}...</span>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    String(inv.photoId),
                                    `photo-${inv._id}`
                                  )
                                }
                                className="text-slate-300 hover:text-slate-600 transition-colors"
                                title="Copy Photo ID"
                              >
                                {copiedKey === `photo-${inv._id}` ? "✓" : "📋"}
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-4 text-right">
                          <div className="font-black text-slate-900">
                            {formatCurrency(inv.amount, inv.currency)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {inv.currency}
                          </div>
                        </td>

                        {/* Payment Date */}
                        <td className="py-3 px-4 text-slate-600">
                          <div>{formattedDate}</div>
                        </td>

                        {/* Status (Flat Badge) */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{inv.status || "PAID"}</span>
                          </span>
                        </td>

                        {/* Actions (Flat Buttons) */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setPreviewInvoice(inv)}
                              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 border border-slate-200/80"
                              title="Preview Invoice &amp; Fulfillment Trail"
                            >
                              <span>👁️</span>
                              <span>Preview</span>
                            </button>

                            <button
                              onClick={() => handleDownloadPdf(inv)}
                              className="p-1.5 text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-lime-300 rounded-lg transition-colors cursor-pointer border border-slate-200/80"
                              title="Download Server-Side PDF"
                            >
                              <span>⬇️</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Uninvoiced Payments Table (Flat Design) */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-4.5 bg-amber-50/40 border-b border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-black text-sm">⚡</span>
                <h3 className="font-black text-slate-900 text-sm tracking-tight">
                  Captured Razorpay Payments Awaiting Invoices
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified captured transactions. Click generate to assign an atomic sequential invoice number.
              </p>
            </div>

            {uninvoicedPayments.length > 0 && (
              <button
                onClick={() => {
                  setSelectedPaymentIds(
                    uninvoicedPayments.map((p) => p.gatewayPaymentId || p._id)
                  );
                }}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-lime-400 rounded-lg text-xs font-black transition-all cursor-pointer self-start sm:self-auto"
              >
                Select All ({uninvoicedPayments.length})
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={
                        uninvoicedPayments.length > 0 &&
                        selectedPaymentIds.length === uninvoicedPayments.length
                      }
                      onChange={toggleSelectAllPayments}
                      className="rounded text-amber-600 focus:ring-amber-400 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4">Razorpay Payment ID</th>
                  <th className="py-3 px-4">Order Number</th>
                  <th className="py-3 px-4">Customer Email</th>
                  <th className="py-3 px-4">Document Type</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Captured Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {uninvoicedPayments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400">
                      <div className="text-3xl mb-2">🎉</div>
                      <div className="font-bold text-slate-700 text-sm">
                        All Captured Payments Invoiced!
                      </div>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        There are no pending captured payments without an invoice.
                      </p>
                    </td>
                  </tr>
                ) : (
                  uninvoicedPayments.map((p: any) => {
                    const isSelected = selectedPaymentIds.includes(
                      p.gatewayPaymentId || p._id
                    );
                    const formattedDate = p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A";

                    const isGeneratingThis =
                      generatingPaymentId === p.gatewayPaymentId ||
                      generatingPaymentId === p._id;

                    return (
                      <tr
                        key={p._id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          isSelected ? "bg-amber-50/40" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              toggleSelectPayment(p.gatewayPaymentId || p._id)
                            }
                            className="rounded text-amber-600 focus:ring-amber-400 cursor-pointer"
                          />
                        </td>

                        {/* Razorpay Payment ID */}
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          <div className="flex items-center gap-1.5">
                            <span>{p.gatewayPaymentId || p._id}</span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  p.gatewayPaymentId || p._id,
                                  `uninv-${p._id}`
                                )
                              }
                              className="text-slate-300 hover:text-slate-600 transition-colors"
                              title="Copy Payment ID"
                            >
                              {copiedKey === `uninv-${p._id}` ? "✓" : "📋"}
                            </button>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-2">
                            <span>● Captured via Razorpay ({p.method || "card"})</span>
                            {p.photoId && (
                              <span className="text-slate-400 font-mono">
                                📸 {p.photoId.slice(0, 12)}...
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Order Number */}
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {p.orderNumber || "—"}
                        </td>

                        {/* Customer Email */}
                        <td className="py-3 px-4 text-slate-900 font-medium">
                          {p.customerEmail}
                        </td>

                        {/* Document Type */}
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                            {p.documentType} {p.isExpert ? "(Expert)" : ""}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-4 text-right">
                          <div className="font-black text-slate-900">
                            {formatCurrency(p.amount, p.currency)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {p.currency}
                          </div>
                        </td>

                        {/* Captured Date */}
                        <td className="py-3 px-4 text-slate-500 text-[11px]">
                          {formattedDate}
                        </td>

                        {/* Action */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() =>
                              handleGenerateInvoice(p.gatewayPaymentId || p._id)
                            }
                            disabled={isGeneratingThis}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold rounded-lg text-xs transition-all cursor-pointer shadow-xs disabled:opacity-50 inline-flex items-center gap-1.5"
                          >
                            <span>{isGeneratingThis ? "⏳" : "⚡"}</span>
                            <span>
                              {isGeneratingThis
                                ? "Generating..."
                                : "Generate Invoice"}
                            </span>
                          </button>
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

      {/* Flat Invoice Preview Modal */}
      {previewInvoice && (
        <InvoicePreviewModal
          invoice={previewInvoice}
          isOpen={Boolean(previewInvoice)}
          onClose={() => setPreviewInvoice(null)}
          onRefresh={refreshInvoices}
        />
      )}
    </div>
  );
}
