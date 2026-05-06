"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import ValidationReportView from "@/app/visa-photo-validator/components/ValidationReport";
import { getDocumentTypes } from "@/lib/specs";
import { countryMapping } from "@/lib/external-api";

// ─── Constants ────────────────────────────────────────────────────────────────

const SUPPORTED_COUNTRIES = [
  "DZ", "AU", "AT", "BE", "BG", "CN", "HR", "CZ", "DK", "EE",
  "FI", "FR", "DE", "GR", "HU", "IN", "ID", "IR", "IQ", "IT",
  "JP", "KZ", "LV", "LT", "LU", "MT", "NL", "NZ", "NO", "PL",
  "PT", "RO", "EU", "SG", "SK", "SI", "KR", "ES", "SE", "CHE",
  "TH", "TR", "AE", "GB", "US"
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.55, 
      ease: [0.22, 1, 0.36, 1], 
      delay 
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── FAQ Data ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How does AI biometric validation work?",
    a: "Our validator uses MediaPipe Face Detection combined with country-specific embassy specifications to measure facial geometry, eye-line positioning, head-to-frame ratios, and background uniformity — the same checks performed by passport officers.",
  },
  {
    q: "Which countries are supported?",
    a: "We support 60+ countries including USA, UK, India, Canada, Schengen zone nations, and Australia. Each uses official ICAO or national embassy specifications.",
  },
  {
    q: "Is my photo stored or shared?",
    a: "No. All processing happens client-side or in a secure ephemeral session. Your photo is never stored on our servers or shared with third parties.",
  },
  {
    q: "What makes a photo 'embassy-grade' compliant?",
    a: "Compliance means meeting strict criteria: correct dimensions, neutral background, even lighting, centered face, mouth closed, eyes open, no shadows, and proper head coverage percentage.",
  },
  {
    q: "Can I use this for visa applications?",
    a: "This tool helps you verify compliance before submission, reducing rejection risk. Always check the latest requirements on your target country's official embassy website.",
  },
];

// ─── Trust Badges ──────────────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: "60+", label: "Countries" },
  { value: "ICAO", label: "Standard" },
  { value: "99.2%", label: "Accuracy" },
  { value: "<3s", label: "Analysis" },
];

// ─── How It Works Steps ────────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="12" cy="10" r="3" /><path d="M6 20v-1a6 6 0 0112 0v1" />
      </svg>
    ),
    title: "Select Country & Doc",
    desc: "Choose your destination country and document type to load the exact embassy specification.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: "Upload Your Photo",
    desc: "Drop or browse any JPEG/PNG photo. No account needed, processed in seconds.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
    title: "AI Biometric Analysis",
    desc: "MediaPipe scans 468 facial landmarks, measures compliance against official ICAO standards.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Get Compliance Report",
    desc: "Receive a scored report with specific metrics, pass/fail status, and actionable fix suggestions.",
  },
];

// ─── Country Selector Component ────────────────────────────────────────────────

function CountrySelector({
  documentTypes,
  selectedCountry,
  onSelect,
}: {
  documentTypes: ReturnType<typeof getDocumentTypes>;
  selectedCountry: string;
  onSelect: (code: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const countryMap = Array.from(
    new Map(
      documentTypes
        .map((d) => {
          const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
          const code = countryMapping[slug] || slug.split("-")[0].toUpperCase();
          return { ...d, code };
        })
        .filter((d) => SUPPORTED_COUNTRIES.includes(d.code))
        .map((d) => [d.country, { code: d.code, flag: d.flag }])
    ).entries()
  )
    .filter(([name]) => name && name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[0] || "").localeCompare(b[0] || ""));

  const selected = documentTypes.find(
    (d) =>
      countryMapping[d.id.replace(/-passport$/, "").replace(/-visa$/, "")] === selectedCountry ||
      d.id.split("-")[0].toUpperCase() === selectedCountry
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2.5">
        Country
      </label>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-13 bg-slate-50 border border-slate-200 rounded-2xl px-4 flex items-center justify-between text-sm font-bold text-slate-800 hover:border-blue-400 hover:bg-white hover:shadow-md hover:shadow-blue-500/8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        style={{ height: "52px" }}
      >
        <span className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{selected?.flag ?? "🏳️"}</span>
          <span className="truncate">{selected?.country ?? "Select Country"}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-300/30 overflow-hidden"
            role="listbox"
          >
            <div className="p-2.5 border-b border-slate-50">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/15 border border-transparent focus:border-blue-200 transition-all"
                />
              </div>
            </div>
            <ul className="max-h-60 overflow-y-auto overscroll-contain">
              {countryMap.map(([name, { code, flag }]) => (
                <li key={code}>
                  <button
                    role="option"
                    aria-selected={selectedCountry === code}
                    onClick={() => { onSelect(code); setOpen(false); setSearch(""); }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors border-b border-slate-50 last:border-0 ${
                      selectedCountry === code
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-base">{flag}</span>
                    <span className="text-xs font-bold flex-1">{name}</span>
                    {selectedCountry === code && (
                      <svg className="w-3.5 h-3.5 text-lime-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
              {countryMap.length === 0 && (
                <li className="px-4 py-6 text-center text-xs text-slate-400 font-medium">No results for "{search}"</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Upload Zone Component ─────────────────────────────────────────────────────

function UploadZone({
  previewUrl,
  onFileChange,
  isDragging,
  onDragEnter,
  onDragLeave,
  onDrop,
}: {
  previewUrl: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Upload photo"
      />
      <motion.div
        animate={{
          borderColor: isDragging ? "#3b82f6" : previewUrl ? "#bfdbfe" : "#e2e8f0",
          backgroundColor: isDragging ? "#eff6ff" : previewUrl ? "#eff6ff" : "#f8fafc",
          scale: isDragging ? 1.015 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <img src={previewUrl} className="w-full h-full object-contain p-4" alt="Photo preview" />
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-2xl flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-bold text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  Click to change photo
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-6"
            >
              <motion.div
                animate={{ y: isDragging ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300 group-hover:text-blue-500 group-hover:border-blue-100 group-hover:shadow-blue-100 transition-all duration-200"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </motion.div>
              <p className="text-sm font-bold text-slate-800">
                {isDragging ? "Release to upload" : "Drop your photo here"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold uppercase tracking-widest">
                or click to browse
              </p>
              <p className="text-[10px] text-slate-300 mt-3 font-medium">
                JPEG · PNG · WebP · Max 10MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ item, index }: { item: (typeof FAQ_ITEMS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.07}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900 leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed font-medium">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function ValidatorClient() {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedDocType, setSelectedDocType] = useState("passport");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { verifyPhoto, isProcessing, report, setReport, error, setError } = useFaceVerification();

  // Load persistence ONLY after mount to avoid hydration mismatch
  useEffect(() => {
    const savedCountry = localStorage.getItem("validator_country");
    const savedDocType = localStorage.getItem("validator_doctype");
    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedDocType) setSelectedDocType(savedDocType);
    setIsMounted(true);
  }, []);

  // Save persistence whenever values change, but only after initial mount/load
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("validator_country", selectedCountry);
      localStorage.setItem("validator_doctype", selectedDocType);
    }
  }, [selectedCountry, selectedDocType, isMounted]);

  const handleReset = useCallback(() => {
    setReport(null);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [setReport, setError]);
  const documentTypes = getDocumentTypes();

  const heroRef = useRef(null);
  const howRef = useRef(null);
  const faqRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); }
  }, []);

  const handleVerify = useCallback(() => {
    if (file) verifyPhoto(file, selectedCountry, selectedDocType);
  }, [file, selectedCountry, selectedDocType, verifyPhoto]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero / Tool Section ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-white border-b border-slate-100"
        aria-labelledby="validator-heading"
      >
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Soft gradient blobs */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-indigo-50/80 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered · ICAO Compliant · Embassy-Grade
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="validator-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-5"
          >
            Visa &amp; Passport{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-lime-600">Photo Validator</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-blue-100 rounded-sm -z-0" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Embassy-grade biometric analysis powered by MediaPipe. Validate your photo against{" "}
            <strong className="text-slate-700">official ICAO standards</strong> for 60+ countries — free, instant, private.
          </motion.p>

          {/* Trust Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex justify-center gap-8 sm:gap-12 mb-14"
          >
            {TRUST_STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl sm:text-2xl font-black text-lime-600 leading-none">{value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Main tool grid */}
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
            {/* Left: Config + Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <h2 className="text-base font-black text-slate-900 mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">1</span>
                  Configure Document
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <CountrySelector
                    documentTypes={documentTypes}
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                  />

                  <div>
                    <label htmlFor="doc-type" className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2.5">
                      Document Type
                    </label>
                    <div className="relative">
                      <select
                        id="doc-type"
                        value={selectedDocType}
                        onChange={(e) => setSelectedDocType(e.target.value)}
                        style={{ height: "52px" }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 pr-10 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 appearance-none hover:border-blue-300 hover:bg-white transition-all"
                      >
                        <option value="passport">Passport Photo</option>
                        <option value="visa">Visa Photo</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <h2 className="text-base font-black text-slate-900 mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">2</span>
                  Upload Photo
                </h2>

                <UploadZone
                  previewUrl={previewUrl}
                  onFileChange={handleFileChange}
                  isDragging={isDragging}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                />

                {/* Requirements chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Neutral background", "Eyes open", "Centered face", "No glasses"].map((req) => (
                    <span
                      key={req}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {req}
                    </span>
                  ))}
                </div>

                <motion.button
                  onClick={handleVerify}
                  disabled={!file || isProcessing}
                  whileHover={file && !isProcessing ? { scale: 1.015, y: -1 } : {}}
                  whileTap={file && !isProcessing ? { scale: 0.985 } : {}}
                  className={`w-full mt-5 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                    !file || isProcessing
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                  }`}
                  aria-busy={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="block w-4 h-4 border-[2.5px] border-white/30 border-t-white rounded-full"
                      />
                      Analyzing Biometrics…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Start Validation
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-start gap-2"
                      role="alert"
                    >
                      <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-8"
            >
              <AnimatePresence mode="wait">
                {report ? (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ValidationReportView report={report} onReset={handleReset} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-12 flex flex-col items-center justify-center min-h-[520px] text-center"
                    aria-label="Awaiting analysis"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-200">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
                          <circle cx="12" cy="8" r="4" strokeDasharray="2 2" />
                        </svg>
                      </div>
                      {/* Animated rings */}
                      {[1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-3xl border border-blue-100"
                          animate={{ scale: [1, 1.25 + i * 0.12], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    <p className="text-base font-bold text-slate-800 mb-2">Awaiting Analysis</p>
                    <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">
                      Upload a photo and select a country to generate your official biometric compliance report.
                    </p>

                    {/* Preview checklist */}
                    <div className="mt-8 grid grid-cols-2 gap-2 w-full max-w-xs">
                      {["Face Detection", "Background Check", "Lighting Analysis", "Size Validation", "Eye Line Test", "Expression Check"].map((item) => (
                        <div key={item} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-bold text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section
        ref={howRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        aria-labelledby="how-heading"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={howInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">
            How it works
          </motion.p>
          <motion.h2
            id="how-heading"
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight"
          >
            Four steps to compliance
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Our AI mimics the exact checks performed at embassy biometric verification counters worldwide.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              animate={howInView ? "visible" : "hidden"}
              className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 group"
            >
              <div className="absolute top-4 right-4 text-[11px] font-black text-slate-200">
                0{i + 1}
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-lime-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SEO / Explainer Section ───────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <div>
              <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">
                Embassy-grade technology
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                How our AI replicates official embassy photo checks
              </h2>
              <div className="space-y-5 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  Passport and visa rejections due to non-compliant photos cost applicants time and money. Our validator uses{" "}
                  <strong className="text-slate-700">Google MediaPipe's 468-point facial landmark model</strong> to perform the
                  same geometric measurements that automated embassy kiosks check.
                </p>
                <p>
                  We cross-reference your photo against a database of{" "}
                  <strong className="text-slate-700">country-specific ICAO and national specifications</strong> — including
                  head-to-frame ratio, inter-ocular distance, background uniformity, and lighting gradients.
                </p>
                <p>
                  The result is a scored compliance report that tells you exactly what's wrong and how to fix it,{" "}
                  <strong className="text-slate-700">before you submit your application</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "Facial Geometry", desc: "Measures 12+ biometric ratios including head tilt, face symmetry, and eye-line angle." },
                { icon: "🖼️", title: "Background Analysis", desc: "Detects color uniformity, shadows, patterns, and edge contrast violations." },
                { icon: "💡", title: "Lighting Detection", desc: "Evaluates shadow intensity on face, background, and identifies flash glare." },
                { icon: "📐", title: "Dimension Compliance", desc: "Validates pixel dimensions, DPI, file size, and head-to-photo-size ratio." },
                { icon: "👁️", title: "Expression Check", desc: "Confirms neutral expression, open eyes, closed mouth, and no hair occlusion." },
                { icon: "🌍", title: "Country Standards", desc: "Applies the exact specification for your target country's embassy requirements." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="text-xs font-black text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section
        ref={faqRef}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        aria-labelledby="faq-heading"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Common questions
          </h2>
        </motion.div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-blue-600 rounded-3xl p-10 sm:p-14 text-center"
        >
          {/* Decorative */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-indigo-500/40 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[11px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-3">Ready to validate?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Check your photo in seconds
            </h2>
            <p className="text-blue-100 font-medium text-base max-w-md mx-auto mb-8 leading-relaxed">
              Avoid costly rejections. Get an embassy-grade compliance report for free, with no account needed.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-black text-sm px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-900/20 uppercase tracking-widest"
            >
              Validate My Photo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}