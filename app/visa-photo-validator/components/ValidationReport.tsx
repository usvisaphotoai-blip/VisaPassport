"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { ValidationReport, ValidationMetric } from "@/lib/validation-engine";
import { processPhotoForDocument } from "@/lib/processPhoto";
import { getSpecById } from "@/lib/specs";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  report: ValidationReport;
  onReset: () => void;
  selectedDocId?: string;
  selectedDocPrice?: number;
  /** The photo the user checked; processed directly when they click "Make It Compliant Now". */
  photo?: File | null;
  /** Object URL of `photo` owned by the checker (already shown in its upload box). */
  photoPreviewUrl?: string | null;
  /** "gauge" shows a GOV.UK-style Poor / Okay / Good dial instead of the score ring. */
  scoreDisplay?: "ring" | "gauge";
  /** Render flat cards with border-only styling and no shadow elevation. */
  flatCards?: boolean;
}

import PriceDisplay from "@/app/components/PriceDisplay";

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

// ─── Animated Score Ring ───────────────────────────────────────────────────────

function ScoreRing({ score, pass }: { score: number; pass: boolean }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const ringColor = score >= 90 ? "#10b981" : score >= 75 ? "#f59e0b" : "#ef4444";
  const textColor = score >= 90 ? "text-emerald-600" : score >= 75 ? "text-amber-600" : "text-red-600";
  const bgColor = score >= 90 ? "bg-emerald-50" : score >= 75 ? "bg-amber-50" : "bg-red-50";

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 shrink-0">
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center ${bgColor}`}>
        {/* SVG ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="6" />
          {/* Animated fill */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.2, ease: [0.34, 1.4, 0.64, 1], delay: 0.3 }}
          />
        </svg>
        {/* Score text */}
        <div className="relative z-10 text-center">
          <motion.span
            className={`block text-3xl font-black leading-none ${textColor}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {score}
          </motion.span>
          <span className={`text-[9px] font-bold uppercase tracking-wider ${textColor} opacity-70`}>Score</span>
        </div>
      </div>

      {/* Quality label */}
      <span className={`text-xs font-bold ${textColor}`}>
        {score >= 90 ? "Excellent Quality" : score >= 75 ? "Acceptable Quality" : "Requirements Failed"}
      </span>
    </div>
  );
}

// ─── Rating Gauge (GOV.UK style) ───────────────────────────────────────────────

// Bands keep the ring's thresholds but are drawn at GOV.UK's proportions
const GAUGE_BANDS = [
  { label: "Poor", color: "#d4351c", text: "text-[#d4351c]", from: 0, to: 0.22, min: 0, max: 75 },
  { label: "Okay", color: "#ffdd00", text: "text-slate-900", from: 0.22, to: 0.76, min: 75, max: 90 },
  { label: "Good", color: "#00703c", text: "text-[#00703c]", from: 0.76, to: 1, min: 90, max: 100 },
] as const;

const gaugePoint = (t: number) => {
  const a = Math.PI * t;
  return `${(100 - 80 * Math.cos(a)).toFixed(2)} ${(100 - 80 * Math.sin(a)).toFixed(2)}`;
};

function ScoreGauge({ score }: { score: number }) {
  const band = GAUGE_BANDS.find((b) => score < b.max) ?? GAUGE_BANDS[GAUGE_BANDS.length - 1];
  const within = Math.min(1, Math.max(0, (score - band.min) / (band.max - band.min)));
  const t = band.from + within * (band.to - band.from);

  // Start the needle at the far left, then swing it to the score
  const [angle, setAngle] = useState(-90);
  useEffect(() => {
    const id = requestAnimationFrame(() => setAngle((t - 0.5) * 180));
    return () => cancelAnimationFrame(id);
  }, [t]);

  return (
    <div className="flex flex-col items-center shrink-0" role="img" aria-label={`Photo rating: ${band.label} (score ${score} of 100)`}>
      <svg viewBox="0 0 200 112" className="w-32 sm:w-40 h-auto" aria-hidden>
        {GAUGE_BANDS.map((b) => (
          <path
            key={b.label}
            d={`M ${gaugePoint(b.from)} A 80 80 0 0 1 ${gaugePoint(b.to)}`}
            fill="none"
            stroke={b.color}
            strokeWidth="10"
          />
        ))}
        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "100px 100px",
            transition: "transform 1.2s cubic-bezier(0.34, 1.3, 0.64, 1) 0.3s",
          }}
        >
          <polygon points="95,100 100,36 105,100" fill="#b1b4b6" />
          <circle cx="100" cy="100" r="5" fill="#b1b4b6" />
        </g>
      </svg>
      <span className={`mt-1 text-xl sm:text-2xl font-bold ${band.text}`}>{band.label}</span>
    </div>
  );
}

// ─── Metric Card ───────────────────────────────────────────────────────────────

function MetricCard({ metric, flatCards = false }: { metric: ValidationMetric; flatCards?: boolean }) {
  const statusConfig: Record<string, any> = {
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-400",
      badge: "bg-emerald-100 text-emerald-700",
      label: "Pass",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-400",
      badge: "bg-amber-100 text-amber-700",
      label: "Warning",
    },
    fail: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-400",
      badge: "bg-red-100 text-red-700",
      label: "Fail",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-400",
      badge: "bg-red-100 text-red-700",
      label: "Error",
    },
  };

  const normalizedStatus = metric.status?.toLowerCase() || "warning";
  const cfg = statusConfig[normalizedStatus] || statusConfig.warning;

  const StatusIcon = () => {
    if (normalizedStatus === "success")
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    if (normalizedStatus === "warning")
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={flatCards ? undefined : { y: -2, transition: { duration: 0.2 } }}
      className={`rounded-xl p-4 border ${cfg.bg} ${cfg.border} ${flatCards ? "" : "transition-shadow hover:shadow-md"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-tight max-w-[80%]">
          {metric.label}
        </span>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${cfg.iconBg} ${cfg.icon} shrink-0`}>
          <StatusIcon />
        </div>
      </div>
      <div className="space-y-1">
        <p className={`text-sm font-black ${cfg.text} leading-snug`}>{metric.value}</p>
        {metric.details && (
          <p className="text-[11px] text-slate-500 font-medium leading-tight mt-1">
            {metric.details}
          </p>
        )}
        {metric.target && (
          <p className="text-[10px] text-slate-400 font-semibold mt-1">
            Target: <span className="text-slate-500">{metric.target}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Summary List ──────────────────────────────────────────────────────────────

function SummaryList({ items, title, dark = false, flatCards = false }: { items: string[]; title: string; dark?: boolean; flatCards?: boolean }) {
  const icon = dark ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-xl p-4 sm:p-5 ${
        dark
          ? `bg-slate-900 ${flatCards ? "border border-slate-800" : "shadow-xl"}`
          : `bg-white ${flatCards ? "border border-slate-200" : "border border-slate-100 shadow-lg shadow-slate-200/40"}`
      }`}
    >
      <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
        <span
          className={`w-6 h-6 rounded flex items-center justify-center ${
            dark ? "bg-amber-400/20 text-amber-400" : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {icon}
        </span>
        {title}
      </h3>

      {items.length === 0 ? (
        <p className={`text-xs italic ${dark ? "text-slate-500" : "text-slate-400"}`}>
          No items to show.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className={`flex items-start gap-2.5 text-xs leading-relaxed font-medium ${
                dark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dark ? "bg-amber-400" : "bg-emerald-400"}`}
              />
              {item}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// ─── Create Photo Processing Overlay ──────────────────────────────────────────

const CREATE_STEPS = [
  "Uploading your photo",
  "Detecting face & landmarks",
  "Removing background",
  "Adjusting head size & eye level",
  "Fixing lighting & exposure",
  "Checking country requirements",
  "Preparing your passport photo",
];

const STEP_INTERVAL_MS = 2200;

function CreatePhotoOverlay({ previewUrl, done, flatCards = false }: { previewUrl?: string | null; done: boolean; flatCards?: boolean }) {
  const [step, setStep] = useState(0);

  // Advance through the steps, holding on the last one until the request finishes
  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, CREATE_STEPS.length - 1));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [done]);

  // Lock page scroll while the overlay is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const activeStep = done ? CREATE_STEPS.length : step;
  const progress = done ? 100 : Math.min(92, ((step + 0.6) / CREATE_STEPS.length) * 100);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label="Creating your passport photo"
    >
      <motion.div
        className={`w-full max-w-md bg-white rounded-xl overflow-hidden ${flatCards ? "border border-slate-200" : "border border-slate-100 shadow-xl shadow-slate-200/40"}`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-5 p-5 sm:p-6 border-b border-slate-100">
          {/* Photo with scanning line */}
          <div className="relative shrink-0 w-24 h-32 sm:w-28 sm:h-36 bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
            {previewUrl && (
              <img src={previewUrl} alt="Your photo being processed" className="w-full h-full object-cover" />
            )}
            {!done && (
              <motion.div
                className="absolute left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            )}
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-emerald-500/20"
              >
                <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-1.5">
              {done ? "Complete" : "Processing"}
            </p>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {done ? "Your photo is ready!" : "Creating your passport photo"}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
              {done ? "Opening your photo..." : "This usually takes 10–20 seconds. Please keep this page open."}
            </p>
          </div>
        </div>

        {/* Step checklist */}
        <ul className="p-5 sm:p-6 space-y-2.5">
          {CREATE_STEPS.map((label, i) => {
            const isDone = i < activeStep;
            const isActive = i === activeStep;
            return (
              <li key={label} className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center">
                  {isDone ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.span>
                  ) : isActive ? (
                    <span className="block w-4 h-4 border-[2.5px] border-lime-600/30 border-t-lime-700 rounded-full animate-spin" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
                <span className={isDone ? "text-slate-500 font-medium" : isActive ? "text-slate-900 font-bold" : "text-slate-400 font-medium"}>
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <motion.div
            className={`h-full ${done ? "bg-emerald-500" : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600"}`}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ─── Main Report Component ─────────────────────────────────────────────────────

export default function ValidationReportView({ report, onReset, selectedDocId, selectedDocPrice, photo, photoPreviewUrl, scoreDisplay = "ring", flatCards = false }: Props) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [isCreateDone, setIsCreateDone] = useState(false);

  const { overall_result, compliance_score, summary, suggestions, metrics } = report;

  // e.g. "United Kingdom visa" and "35 × 45 mm" for the fix-it CTA
  const spec = selectedDocId ? getSpecById(selectedDocId) : undefined;
  const docKind = selectedDocId?.includes("visa") ? "visa" : "passport";
  const docLabel = spec ? `${spec.country} ${docKind}` : `your ${docKind}`;
  const sizeLabel =
    spec && spec.width_mm !== "unspecified" && spec.height_mm !== "unspecified"
      ? `${spec.width_mm} × ${spec.height_mm} mm`
      : "";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  // On mobile the report renders below the upload form — bring it into view
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isPass = overall_result === "PASS";
  const metricEntries = Object.entries(metrics).filter(([, m]) => m != null) as [string, ValidationMetric][];

  // Group metrics for visual hierarchy
  const failedMetrics = metricEntries.filter(([, m]) => {
    const s = m.status?.toLowerCase();
    return s === "fail" || s === "error";
  });
  const warningMetrics = metricEntries.filter(([, m]) => m.status?.toLowerCase() === "warning");
  const successMetrics = metricEntries.filter(([, m]) => m.status?.toLowerCase() === "success");
  const orderedMetrics: [string, ValidationMetric][] = [...failedMetrics, ...warningMetrics, ...successMetrics];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="space-y-4 scroll-mt-20"
      aria-label="Validation report"
    >
      <AnimatePresence>
        {isCreating && <CreatePhotoOverlay previewUrl={photoPreviewUrl} done={isCreateDone} flatCards={flatCards} />}
      </AnimatePresence>

      {/* ── Header Card ──────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className={`bg-white rounded-xl p-4 sm:p-6 ${flatCards ? "border border-slate-200" : "border border-slate-100 shadow-xl shadow-slate-200/40"}`}
      >
        <div className="flex flex-row items-center gap-4 sm:gap-8 justify-between">
          {/* Pass / Fail badge */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3 min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">Compliance Result</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 250 }}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-black text-sm tracking-widest uppercase ${
                isPass
                  ? `bg-emerald-500 text-white ${flatCards ? "" : "shadow-lg shadow-emerald-200"}`
                  : `bg-red-500 text-white ${flatCards ? "" : "shadow-lg shadow-red-200"}`
              }`}
            >
              {isPass ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              {overall_result}
            </motion.div>

            {/* Counts summary */}
            <div className="flex items-center gap-3 flex-wrap">
              {failedMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {failedMetrics.length} Failed
                </span>
              )}
              {warningMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {warningMetrics.length} Warnings
                </span>
              )}
              {successMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {successMetrics.length} Passed
                </span>
              )}
            </div>
          </div>

          {/* Score ring */}
          {scoreDisplay === "gauge" ? (
            <ScoreGauge score={compliance_score} />
          ) : (
            <ScoreRing score={compliance_score} pass={isPass} />
          )}
        </div>

        {overall_result === "FAIL" && (
          <div className="mt-4 sm:mt-5 rounded-xl border border-lime-200 bg-gradient-to-br from-lime-50 to-white p-4 sm:p-5">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-black text-lime-700 uppercase tracking-[0.18em] mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              1-Click Compliance Solution
            </p>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Fix All Issues for {docLabel}
            </h3>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
              Automatically fixes background, applies exact {sizeLabel ? `${sizeLabel} ` : ""}crop, and provides printable sheets.
            </p>

            {/* Main CTA */}
            <motion.button
              onClick={async () => {
                if (isCreating) return;
                const docId = selectedDocId || "general";
                if (!photo) {
                  router.push(`/passport-photo-online?type=${docId}`);
                  return;
                }
                setIsCreating(true);
                setCreateError("");
                try {
                  const photoId = await processPhotoForDocument(photo, docId, "pixpassport_checker");
                  setIsCreateDone(true);
                  await new Promise((r) => setTimeout(r, 900));
                  router.push(`/preview/${photoId}`);
                } catch (err) {
                  setCreateError(err instanceof Error ? err.message : "Processing failed. Please try again.");
                  setIsCreating(false);
                }
              }}
              disabled={isCreating}
              whileTap={{ scale: 0.98 }}
              className={`group mt-4 w-full h-13 sm:h-14 rounded-xl bg-lime-700 hover:bg-lime-800 disabled:opacity-70 disabled:cursor-wait text-white font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2 ${flatCards ? "" : "shadow-lg shadow-lime-700/25"}`}
            >
              {isCreating && (
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden />
              )}
              <span>{isCreating ? "Processing your photo..." : "Make It Compliant Now"}</span>
              {!isCreating && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </motion.button>

            {createError && (
              <p className="mt-4 text-center text-xs text-red-600 font-medium" role="alert">
                {createError}{" "}
                <a href={`/passport-photo-online?type=${selectedDocId || "general"}`} className="underline font-bold">
                  Upload in the photo maker instead
                </a>
              </p>
            )}

            <p className="mt-3 text-center text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
              Guaranteed embassy acceptance
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Metric Cards Grid ─────────────────────────────────────── */}
      {orderedMetrics.length > 0 && (
        <motion.div variants={itemVariants}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-3 px-1">
            Metric Breakdown
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {orderedMetrics.map(([key, metric]) => (
              <MetricCard key={key} metric={metric} flatCards={flatCards} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Summary & Suggestions ─────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <SummaryList items={summary} title="Compliance Summary" flatCards={flatCards} />
        <SummaryList items={suggestions} title="Improvement Actions" dark flatCards={flatCards} />
      </div>

      {/* ── Action Footer ─────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 pt-1"
      >
        <button
          onClick={onReset}
          className={`w-full sm:flex-1 h-12 sm:h-14 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 ${flatCards ? "" : "shadow-lg shadow-blue-500/30"}`}
          aria-label="Validate another photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          Validate Another
        </button>
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="text-[10px] text-slate-400 font-medium text-center leading-relaxed px-2"
      >
        This  analysis is for guidance only. Always verify requirements on your target country's official embassy website before submitting your application.
      </motion.p>
    </motion.div>
  );
}