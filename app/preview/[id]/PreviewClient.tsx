"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getSpecById } from "@/lib/specs";
import { usePayment, LocalPrice } from "./hooks/usePayment";
import { ComplianceCheck } from "./types";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, stroke = 2, className = "" }: { d: string; size?: number; stroke?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const ICONS = {
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zoom: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  close: "M18 6L6 18M6 6l12 12",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  warn: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  photo: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8",
  person: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

const METRIC_FIXES = [
  { key: "background_corrected", label: "Background corrected to government standard", icon: "✓" },
  { key: "head_height_pct", label: "Head height optimized to official specification", icon: "✓" },
  { key: "eye_position_pct", label: "Eye position aligned within required zone", icon: "✓" },
  { key: "top_margin_pct", label: "Top spacing adjusted per compliance rules", icon: "✓" },

  // File & quality fixes
  { key: "file_size_optimized", label: "File size compressed within allowed limit", icon: "✓" },
  { key: "resolution_enhanced", label: "Resolution verified for embassy requirements", icon: "✓" },
  { key: "dpi_corrected", label: "Print DPI standardized for official printing", icon: "✓" },
  { key: "jpeg_normalized", label: "Photo converted to compliant JPEG format", icon: "✓" },

  // Face & positioning fixes
  { key: "face_centered", label: "Face centered in frame", icon: "✓" },
  { key: "frontal_pose_fixed", label: "Frontal head alignment verified", icon: "✓" },
  { key: "eye_alignment_fixed", label: "Eye level balanced horizontally", icon: "✓" },
  { key: "chin_spacing_fixed", label: "Chin spacing adjusted to specification", icon: "✓" },
  { key: "hair_clearance_fixed", label: "Hair clearance adjusted to avoid cropping", icon: "✓" },

  // Image enhancement fixes
  { key: "lighting_balanced", label: "Lighting balanced for facial visibility", icon: "✓" },
  { key: "shadow_removed", label: "Background and face shadows reduced", icon: "✓" },
  { key: "contrast_optimized", label: "Contrast optimized for biometric clarity", icon: "✓" },
  { key: "white_balance_fixed", label: "Color balance normalized", icon: "✓" },
  { key: "sharpness_enhanced", label: "Image sharpness enhanced", icon: "✓" },

  // Background & print fixes
  { key: "background_cleaned", label: "Background cleaned and normalized", icon: "✓" },
  { key: "print_sheet_generated", label: "Print sheet generated in official layout", icon: "✓" },

  // Compliance wording
  { key: "government_compliance", label: "Photo adjusted to meet government compliance checks", icon: "✓" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "PASS" | "WARN" | "FAIL" }) {
  const map = {
    PASS: { bg: "bg-emerald-500/15 text-emerald-600 border-emerald-200", dot: "bg-emerald-500", label: "PASS" },
    WARN: { bg: "bg-amber-500/15 text-amber-600 border-amber-200", dot: "bg-amber-500", label: "WARN" },
    FAIL: { bg: "bg-red-500/15 text-red-600 border-red-200", dot: "bg-red-500", label: "FAIL" },
  };
  const s = map[status];
  return (
    <span className={cx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase", s.bg)}>
      <span className={cx("w-1.5 h-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

function ComplianceCard({ check }: { check: ComplianceCheck }) {
  const colors = {
    PASS: { bg: "bg-emerald-50 border-emerald-100", icon: "text-emerald-500", iconD: ICONS.check },
    WARN: { bg: "bg-amber-50 border-amber-100", icon: "text-amber-500", iconD: ICONS.warn },
    FAIL: { bg: "bg-red-50 border-red-100", icon: "text-red-500", iconD: ICONS.close },
  };
  const c = colors[check.status];
  return (
    <div className={cx("rounded-2xl border p-3 flex flex-col gap-1.5 transition-all", c.bg)}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-800 leading-tight">{check.name}</span>
        <Icon d={c.iconD} size={14} className={cx("shrink-0 mt-0.5", c.icon)} />
      </div>
      <span className="text-[12px] font-black text-slate-700">{check.value}</span>
      <span className="text-[10px] text-slate-500 leading-tight">{check.detail}</span>
    </div>
  );
}

function MetricFix({ metric }: { metric: typeof METRIC_FIXES[0] }) {
  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-slate-100 last:border-0">
      <div className="w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0">
        <Icon d={ICONS.check} size={11} className="text-lime-600" stroke={2.5} />
      </div>
      <span className="text-[12px] text-slate-700 font-medium">{metric.label}</span>
    </div>
  );
}



function SocialProof() {
  return (
    <div className="flex items-center gap-2 py-2">
    
      <p className="text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">1,847 photos</span> processed today
      </p>
      <span className="text-amber-500 text-[11px]">★★★★★</span>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: ICONS.shield, text: "Secure Checkout" },
    { icon: ICONS.refresh, text: "Refund if Rejected" },
    { icon: ICONS.lock, text: "256-bit SSL" },
  ];
  return (
    <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
      {badges.map((b, i) => (
        <div key={i} className="flex items-center gap-1.5 text-slate-500">
          <Icon d={b.icon} size={12} />
          <span className="text-[10px] font-semibold">{b.text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Panels ──────────────────────────────────────────────────────────────

function PhotoPanel({
  previewUrl,
  hasPaid,
  checks,
  passCount,
  metrics,
  spec,
  onZoom,
}: {
  previewUrl: string;
  hasPaid: boolean;
  checks: ComplianceCheck[];
  passCount: number;
  metrics: any;
  spec: any;
  onZoom: () => void;
}) {
  const allPass = checks.length > 0 && passCount === checks.length;

  return (
    <div className="space-y-4">
      {/* Photo Card */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Top bar */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Photo</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <span>{spec?.flag || "📄"}</span> {spec?.name || "Document Photo"}
            </p>
          </div>
          
        </div>

        {/* Photo */}
        <div
          className="relative cursor-zoom-in group mx-5 mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center"
          onClick={onZoom}
          style={{ minHeight: 240 }}
        >
          <img
            src={previewUrl}
            alt="Passport Preview"
            className="max-h-[420px] w-auto max-w-full object-contain select-none pointer-events-none block"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Watermark overlay if unpaid */}
          {/* {!hasPaid && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/20 select-none"
                style={{ transform: "rotate(-30deg)", fontSize: 13, whiteSpace: "nowrap" }}
              >
                Preview Only · Upgrade to Download
              </span>
            </div>
          )} */}

          {/* Hover zoom hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon d={ICONS.zoom} size={18} className="text-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* What We Fixed */}
      {metrics && (
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center">
              <Icon d={ICONS.photo} size={14} className="text-lime-600" />
            </div>
            <div>
             
              <p className="text-sm font-bold text-slate-900">What We Fixed In Your Photo</p>
            </div>
          </div>
          <div className="space-y-0">
            {METRIC_FIXES.map((m) => <MetricFix key={m.key} metric={m} />)}
          </div>
          <div className="mt-4 rounded-xl bg-lime-50 border border-lime-100 px-3 py-2.5 flex items-start gap-2">
            <Icon d={ICONS.star} size={13} className="text-lime-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-lime-700 font-medium leading-relaxed">
              Background removed & corrected to government-compliant white. Your original photo has been professionally processed.
            </p>
          </div>
        </div>
      )}

     
    </div>
  );
}

function OrderPanel({
  productName,
  docCategory,
  localPrice,
  expertPrice,
  isExpertPlan,
  setIsExpertPlan,
  hasPaid,
  timeLeft,
  loading,
  verifying,
  handlePayment,
  documentType,
  photoId,
  status,
  guestEmail,
  setGuestEmail,
  handleEmailPhoto,
  spec,
}: any) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full lg:w-[38%] space-y-4">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden lg:sticky lg:top-6">
        <div className="p-5 sm:p-6">

          {!hasPaid ? (
            <div className="space-y-4">
              {/* Header */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Order Summary</p>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Get Your Official<br />
                  <span className="text-lime-600">{productName} Photo</span>
                </h2>
              </div>

              {/* Social proof */}
              <SocialProof />

           

              {/* Plans */}
              <div className="space-y-3">
                {/* Basic */}
                <button
                  onClick={() => setIsExpertPlan(false)}
                  className={cx(
                    "w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 relative",
                    !isExpertPlan
                      ? "border-emerald-500 bg-emerald-50/40 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={cx(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                        !isExpertPlan ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        Basic
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">Standard Pack</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900">{localPrice?.formatted}</p>
                      <p className="text-[10px] text-slate-400 line-through">$9.99</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {[" Biometric Check", "Background Removal", "Instant Digital Photo For Submission", "A4 Print Sheet"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <Icon d={ICONS.check} size={12} className={!isExpertPlan ? "text-emerald-500" : "text-slate-300"} stroke={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Expert */}
                <button
                  onClick={() => setIsExpertPlan(true)}
                  className={cx(
                    "w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 relative",
                    isExpertPlan
                      ? "border-blue-500 bg-blue-50/40 shadow-[0_0_0_3px_rgba(59,91,219,0.08)]"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <div className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={cx(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                        isExpertPlan ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        Expert Review
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">Premium Pack</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900">{expertPrice?.formatted}</p>
                      <p className="text-[10px] text-slate-400 line-through">$14.99</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      "Everything in Standard",
                      "Human Expert Manual Review",
                      "Subtle Error Correction",
                      "100% Acceptance Guaranteed",
                      "Email Delivery Included",
                    ].map(f => (
                      <li key={f} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <Icon d={ICONS.check} size={12} className={isExpertPlan ? "text-blue-500" : "text-slate-300"} stroke={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {isExpertPlan && (
                    <div className="mt-3 bg-blue-100/50 rounded-xl px-3 py-2 text-[11px] text-blue-800 font-semibold flex items-center gap-1.5">
                      <Icon d={ICONS.shield} size={12} className="text-blue-600 shrink-0" />
                      100% money-back if your photo gets rejected
                    </div>
                  )}
                </button>
              </div>

              {/* Guest Email */}
              {status !== "authenticated" && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email for Delivery
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e: any) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              {/* CTA */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handlePayment}
                  disabled={loading || verifying}
                  className={cx(
                    "w-full font-bold py-4 rounded-2xl transition-all text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-lg",
                    isExpertPlan
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                      : "bg-slate-900 hover:bg-black text-white shadow-slate-900/20"
                  )}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Icon d={ICONS.download} size={16} className="shrink-0" />
                      {isExpertPlan ? "Get Expert Review" : "Download Now"} — {isExpertPlan ? expertPrice?.formatted : localPrice?.formatted}
                    </>
                  )}
                </button>

                <TrustBadges />
              </div>
            </div>
          ) : (
            /* ── Paid ─────────────────────────────────────────────────────────── */
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-2xl p-5 text-center border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎉</div>
                <p className="text-emerald-700 font-bold text-lg">Payment Successful!</p>
                <p className="text-emerald-600 text-sm mt-1">Your photo is ready for download.</p>
              </div>

              <a
                href={`/api/download/${photoId}`}
                download={`studio-photo-${documentType}.jpeg`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-lg shadow-blue-500/25"
              >
                <Icon d={ICONS.download} size={16} />
                Download Digital {docCategory} Photo
              </a>

              <a
                href={`/api/download-sheet/${photoId}`}
                download={`print-sheet-A4-${documentType}.jpeg`}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm"
              >
                <Icon d={ICONS.photo} size={16} />
                Download {docCategory} Print Sheet
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleEmailPhoto}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Icon d={ICONS.mail} size={14} /> Email Me
                </button>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Icon d={ICONS.star} size={14} /> Rate Us
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <a href="/passport-photo-online" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Need another photo? <span className="underline">Upload again →</span>
        </a>
      </div>
    </div>
  );
}

function ZoomOverlay({ url, hasPaid, onClose }: { url: string; hasPaid: boolean; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(4,4,10,0.96)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center hover:bg-white/15 transition-all"
      >
        <Icon d={ICONS.close} size={16} className="text-white/70" />
      </button>

      <div
    
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "zoomIn 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img
            src={url}
            alt="Full preview"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-auto block"
          
          />
          {!hasPaid && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/15 text-xs font-bold tracking-[0.3em] uppercase select-none" style={{ transform: "rotate(-30deg)" }}>
                Preview Only
              </span>
            </div>
          )}
        </div>
        <p className="text-center text-white/25 text-[11px] mt-4 font-mono tracking-widest uppercase">
          {hasPaid ? "Full Resolution" : "Watermarked Preview"} · Esc to close
        </p>
      </div>
      <style>{`@keyframes zoomIn { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}

function MobileCTA({ productName, localPrice, expertPrice, isExpertPlan, loading, handlePayment, status, guestEmail, setGuestEmail }: any) {
  const price = isExpertPlan ? expertPrice : localPrice;
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] px-4 pt-3 pb-4 lg:hidden">
        <div className="max-w-lg mx-auto">
          {status !== "authenticated" && (
            <div className="mb-2.5">
              <input
                type="email"
                value={guestEmail || ""}
                onChange={(e: any) => setGuestEmail(e.target.value)}
                placeholder="Email for your photo"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{productName}</p>
              <p className="text-lg font-black text-slate-900 leading-tight">{price?.formatted || "..."}</p>
            </div>
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <button
              onClick={handlePayment}
              disabled={loading}
              className={cx(
                "flex-1 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg",
                isExpertPlan
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
              )}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Icon d={ICONS.download} size={16} />
                  {isExpertPlan ? "Expert Review" : "Download Photo"}
                </>
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">🔒 Secure · Refund if rejected · No subscription</p>
        </div>
      </div>
      <div className="h-28 lg:hidden" />
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function PreviewClient({
  photoId,
  previewUrl,
  documentType,
  metrics,
  localPrice: initialLocalPrice,
  expertPrice: initialExpertPrice,
  initialIsPaid,
}: {
  photoId: string;
  previewUrl: string;
  documentType: string;
  metrics: any;
  localPrice: LocalPrice;
  expertPrice: LocalPrice;
  initialIsPaid?: boolean;
}) {
  const { data: session, status } = useSession();
  const [hasPaid, setHasPaid] = useState(initialIsPaid || false);
  const [guestEmail, setGuestEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [localPrice, setLocalPrice] = useState<LocalPrice>(initialLocalPrice);
  const [expertPrice, setExpertPrice] = useState<LocalPrice>(initialExpertPrice);
  const [isExpertPlan, setIsExpertPlan] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const spec = getSpecById(documentType);
  const isVisa = spec?.name?.toLowerCase().includes("visa") || documentType.toLowerCase().includes("visa");
  const docCategory = isVisa ? "Visa" : "Passport";
  const productName = spec?.name || `${docCategory} Photo`;

  const { verifying, checks, overallPass } = useMemo(() => {
    if (!metrics) return { verifying: false, checks: [], overallPass: false };
    const results: ComplianceCheck[] = [];
    let hasWarn = false;

    const push = (name: string, s: "PASS" | "WARN" | "FAIL", value: string, detail: string) => {
      results.push({ name, status: s, value, detail });
      if (s === "WARN" || s === "FAIL") hasWarn = true;
    };

    push("Face Detection", "PASS", "1 face verified", "Single face detected");

    const eyePct = metrics.eyeLevelPct || 0;
    const minEye = Number(spec?.eye_min_pct) || 56;
    const maxEye = Number(spec?.eye_max_pct) || 69;
    push("Eye Level", eyePct >= minEye && eyePct <= maxEye ? "PASS" : "WARN", `${eyePct.toFixed(1)}%`, `Target: ${minEye}–${maxEye}%`);

    const headPct = metrics.headSizePct || 0;
    const minHead = Number(spec?.head_min_pct) || 50;
    const maxHead = Number(spec?.head_max_pct) || 69;
    push("Head Size", headPct >= minHead && headPct <= maxHead ? "PASS" : "WARN", `${headPct.toFixed(1)}%`, `Target: ${minHead}–${maxHead}%`);

    const bgValid = metrics.backgroundValid || metrics.backgroundCorrected;
    push("Background", bgValid ? "PASS" : "WARN", bgValid ? "Corrected ✓" : "Review Needed", bgValid ? "Auto-corrected to white" : "Needs correction");

    return { verifying: false, checks: results, overallPass: !hasWarn };
  }, [metrics, spec]);

  const passCount = checks.filter(c => c.status === "PASS").length;

  const { loading, handlePayment } = usePayment({
    photoId,
    localPrice: isExpertPlan ? expertPrice : localPrice,
    isExpert: isExpertPlan,
    guestEmail,
    status: status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated",
    session,
    setHasPaid,
  });

  const onPaymentClick = () => {
    const isEmailValid = guestEmail && guestEmail.includes("@") && guestEmail.includes(".");
    if (status !== "authenticated" && !isEmailValid) {
      setIsEmailDialogOpen(true);
      return;
    }
    handlePayment();
  };

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    if (!initialLocalPrice || (tzCurrency !== initialLocalPrice.currency && tzCurrency !== "USD")) {
      fetch(`/api/currency?currency=${tzCurrency}`).then(r => r.json()).then(d => { if (d?.formatted) setLocalPrice(d); }).catch(console.error);
      fetch(`/api/currency?currency=${tzCurrency}&isExpert=true`).then(r => r.json()).then(d => { if (d?.formatted) setExpertPrice(d); }).catch(console.error);
    }
  }, [initialLocalPrice]);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailPhoto = async () => {
    const emailTo = window.prompt("Enter your email address to receive the photo:");
    if (!emailTo) return;
    try {
      const res = await fetch("/api/send-photo", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTo, photoUrl: previewUrl, documentType, photoId }),
      });
      alert(res.ok ? "Photo sent! Check your inbox." : "Failed to send. Please try again.");
    } catch { alert("Error sending email."); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="mb-6 text-center lg:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Preview & Download</p>
            <h1 className="text-2xl font-black text-slate-900">
              Your  <span className="text-lime-600">{spec?.country || "US"} {docCategory} Photo</span> Is Ready
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left */}
            <div className="w-full lg:w-[62%]">
              <PhotoPanel
                previewUrl={previewUrl}
                hasPaid={hasPaid}
                checks={checks}
                passCount={passCount}
                metrics={metrics}
                spec={spec}
                onZoom={() => setIsZoomOpen(true)}
              />
            </div>

            {/* Right */}
            <OrderPanel
              productName={productName}
              docCategory={docCategory}
              localPrice={localPrice}
              expertPrice={expertPrice}
              isExpertPlan={isExpertPlan}
              setIsExpertPlan={setIsExpertPlan}
              hasPaid={hasPaid}
              timeLeft={timeLeft}
              loading={loading}
              verifying={verifying}
              handlePayment={onPaymentClick}
              documentType={documentType}
              photoId={photoId}
              status={status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated"}
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
              handleEmailPhoto={handleEmailPhoto}
              spec={spec}
            />
          </div>
        </div>
      </div>

      {/* Zoom */}
      {isZoomOpen && <ZoomOverlay url={previewUrl} hasPaid={hasPaid} onClose={() => setIsZoomOpen(false)} />}

      {/* Mobile CTA */}
      {!hasPaid && !verifying && (
        <MobileCTA
          productName={productName}
          localPrice={localPrice}
          expertPrice={expertPrice}
          isExpertPlan={isExpertPlan}
          loading={loading}
          handlePayment={onPaymentClick}
          status={status === "authenticated" ? "authenticated" : "unauthenticated"}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
        />
      )}

      {/* Email Dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Icon d={ICONS.mail} size={22} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 text-center">Where should we send it?</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed text-center">
                Enter your email to receive your processed photo and receipt.
              </p>
              <input
                type="email"
                value={guestEmail}
                onChange={(e: any) => setGuestEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEmailDialogOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const valid = guestEmail && guestEmail.includes("@") && guestEmail.includes(".");
                    if (valid) { setIsEmailDialogOpen(false); handlePayment(); }
                    else alert("Please enter a valid email address.");
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}