"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import ValidationReportView from "@/app/visa-photo-validator/components/ValidationReport";
import { getFilteredDocumentTypes, SUPPORTED_COUNTRIES } from "@/lib/specs";
import { countryMapping } from "@/lib/external-api";
import { FAQ_ITEMS } from "@/app/visa-photo-validator/content";

// ─── Trust Stats ──────────────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: "60+", label: "Countries Supported" },
  { value: "ICAO", label: "Official Standard" },
  { value: "Free", label: "Unlimited Checks" },
  { value: "<3s", label: "Analysis Time" },
];

// ─── Requirement Steps ────────────────────────────────────────────────────────

const REQUIREMENTS = [
  {
    emoji: "🎯",
    title: "Facial Geometry",
    desc: "Measures 12+ biometric ratios: head tilt, face symmetry, and eye-line angle — all checked against official specs.",
  },
  {
    emoji: "🖼️",
    title: "Background Check",
    desc: "Detects background color uniformity, shadow presence, pattern violations, and edge contrast issues.",
  },
  {
    emoji: "💡",
    title: "Lighting Analysis",
    desc: "Evaluates shadow intensity on the face and background, and flags flash glare or uneven exposure.",
  },
  {
    emoji: "📐",
    title: "Dimension Validation",
    desc: "Verifies pixel dimensions, DPI, file size, and the head-to-photo-height ratio for your country.",
  },
  {
    emoji: "👁️",
    title: "Expression & Eyes",
    desc: "Confirms neutral expression, open eyes, closed mouth, and checks for hair or glasses obstructing the face.",
  },
  {
    emoji: "🌍",
    title: "Country-Specific Rules",
    desc: "Applies the exact embassy specification for your destination — not a one-size-fits-all approximation.",
  },
];

// ─── Visa Photo Use Cases ─────────────────────────────────────────────────────
const VISA_USE_CASES = [
  {
    icon: "🇺🇸",
    title: "US Visa (DS-160)",
    desc: "2×2 inch framing with the head filling 50–69% of the height and a white background. The CEAC upload needs a square JPEG of 600–1200 px, no larger than 240 KB, and no glasses.",
  },
  {
    icon: "🇪🇺",
    title: "Schengen Visa",
    desc: "35×45 mm with a 32–36 mm head, neutral expression and a plain light background. The same photo works for most Schengen consulates and visa centres.",
  },
  {
    icon: "🇮🇳",
    title: "India e-Visa",
    desc: "A square digital photo with your full face centred against a plain white or light background. Check the size limits shown on the e-Visa form before uploading.",
  },
  {
    icon: "🇨🇳",
    title: "China Visa",
    desc: "33×48 mm with a 28–33 mm head height, white background, and ears and eyebrows visible. China is stricter than most countries on framing.",
  },
  {
    icon: "🇨🇦",
    title: "Canada Visitor Visa",
    desc: "35×45 mm with a 31–36 mm head — smaller than the 50×70 mm Canadian passport photo — against a plain white or light background.",
  },
  {
    icon: "🇦🇺",
    title: "Australia Visa (ImmiAccount)",
    desc: "35×45 mm with a 32–36 mm face height and a plain light background — the same rules as the Australian passport photo.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ValidatorClient() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedDocType, setSelectedDocType] = useState("passport");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { verifyPhoto, isProcessing, loadingMessage, report, setReport, error, setError } = useFaceVerification();

  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem("validator_country");
      const savedDocType = localStorage.getItem("validator_doctype");
      if (savedCountry) setSelectedCountry(savedCountry);
      if (savedDocType) setSelectedDocType(savedDocType);
    } catch { /* storage blocked (cookies disabled, in-app browsers) — throwing here crashes the page */ }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("validator_country", selectedCountry);
        localStorage.setItem("validator_doctype", selectedDocType);
      } catch { /* storage full or blocked */ }
    }
  }, [selectedCountry, selectedDocType, isMounted]);

  const handleReset = useCallback(() => {
    setReport(null);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [setReport, setError]);

  const documentTypes = getFilteredDocumentTypes();

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
    <div className="min-h-screen bg-slate-100">

      {/* ── HERO / TOOL ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200" aria-labelledby="validator-heading">

    

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">

          <div className="lg:flex lg:items-end lg:justify-between lg:gap-8 mb-4 lg:mb-5">
          <div className="min-w-0">
          {/* Badge */}
          <div className="flex justify-start mb-2.5">
            <span className="inline-flex items-center gap-2 bg-lime-50 border border-lime-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold text-lime-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              ICAO Compliant · Embassy-Grade · Free &amp; Instant
            </span>
          </div>

          {/* H1 — primary SEO keyword */}
          <h1 id="validator-heading" className="text-left text-xl sm:text-2xl lg:text-[2rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-2">
            Visa Photo Checker{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-lime-600">— Free Validator for 60+ Countries</span>
            </span>
          </h1>

          {/* Meta description-quality subhead */}
          <p className="text-left text-sm sm:text-base text-slate-500 font-medium max-w-2xl leading-relaxed">
            Check your <strong className="text-slate-700">visa photo</strong> against the destination country&apos;s rules before you apply — US DS-160, Schengen, India, China, Canada, Australia and 55+ more. Results in under 3 seconds.
          </p>

          </div>

          {/* Trust stats */}
          <div className="flex justify-start gap-6 sm:gap-10 lg:gap-8 mt-3 lg:mt-0 lg:shrink-0 lg:pb-1">
            {TRUST_STATS.map(({ value, label }) => (
              <div key={label} className="text-left">
                <div className="text-xl sm:text-xl font-black text-lime-600 leading-none">{value}</div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
          </div>

          {/* Tool grid */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 lg:items-stretch">

            {/* Left: config + upload */}
            <div className="space-y-3">

              {/* Step 1 */}
              <div className="bg-gray-100 rounded-md p-3 sm:p-4">
                <h2 className="text-sm sm:text-base font-black text-slate-900 mb-3 flex items-center gap-2.5 sm:gap-3">
                  <span className="w-7 h-7 rounded-lg bg-lime-600 text-white flex items-center justify-center text-xs font-black">1</span>
                  Choose Destination Country
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <CountrySelector documentTypes={documentTypes} selectedCountry={selectedCountry} onSelect={setSelectedCountry} />
                  <div>
                    <label htmlFor="doc-type" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Document Type
                    </label>
                    <div className="relative">
                      <select
                        id="doc-type"
                        value={selectedDocType}
                        onChange={(e) => setSelectedDocType(e.target.value)}
                        className="w-full h-11 sm:h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 pr-9 sm:pr-10 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-300 appearance-none hover:border-lime-300 hover:bg-white transition-all"
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
              <div className="bg-gray-100 rounded-md p-3 sm:p-4 ">
                <h2 className="text-sm sm:text-base font-black text-slate-900 mb-3 flex items-center gap-2.5 sm:gap-3">
                  <span className="w-7 h-7 rounded-lg bg-lime-600 text-white flex items-center justify-center text-xs font-black">2</span>
                  Upload Your Photo
                </h2>

                <UploadZone
                  previewUrl={previewUrl}
                  onFileChange={handleFileChange}
                  isDragging={isDragging}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                />

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                  {["Neutral background", "Eyes open", "Centered face", "No glasses"].map((req) => (
                    <span key={req} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {req}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={!file || isProcessing}
                  className={`w-full mt-3 sm:mt-4 h-12 sm:h-14 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500/30 ${
                    !file || isProcessing
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-lime-600 text-white shadow-lg shadow-lime-200 hover:bg-lime-700 hover:-translate-y-0.5 active:scale-[0.99]"
                  }`}
                  aria-busy={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="block w-4 h-4 border-[2.5px] border-lime-600/30 border-t-lime-600 rounded-full animate-spin" />
                      {loadingMessage}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Check My Photo
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  )}
                </button>

                {error && (
                  <p className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-start gap-2" role="alert">
                    <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Right: result — on desktop it matches the left column height and scrolls inside */}
            <div className="relative">
            <div className="lg:absolute lg:inset-0 lg:overflow-y-auto lg:overscroll-contain lg:p-1.5 lg:-m-1.5">
              {report ? (
                <ValidationReportView 
                  photo={file}
                  photoPreviewUrl={previewUrl}
                  report={report} 
                  onReset={handleReset} 
                  selectedDocId={
                    (documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry && d.id.endsWith(`-${selectedDocType}`);
                    }) || documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry;
                    }))?.id || (selectedCountry === "CHE" || selectedCountry === "CH" ? "switzerland-passport" : selectedCountry === "NI" || selectedCountry === "NI" ? "nigeria-passport" : "us-passport")
                  }
                  selectedDocPrice={
                    (documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry && d.id.endsWith(`-${selectedDocType}`);
                    }) || documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry;
                    }))?.price || 6.99
                  }
                />
              ) : (
                <div
                  className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col items-center justify-center h-full min-h-[240px] text-center"
                  aria-label="Awaiting analysis"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-200 mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
                    </svg>
                  </div>
                  <p className="text-base font-bold text-slate-800 mb-2">Ready to validate</p>
                  <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">
                    Upload a photo and select your country to get an official biometric compliance report.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-2 w-full max-w-xs">
                    {["Face Detection", "Background Check", "Lighting Analysis", "Size Validation", "Eye Line Test", "Expression Check"].map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>
  {/* ── RELATED TOOLS ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100" aria-labelledby="related-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Related tools</p>
            <h2 id="related-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              More photo checkers &amp; editors
            </h2>
            <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Once your photo passes validation, use these dedicated editors from PixPassport to crop, resize, and export it to the exact spec.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto ">
            {[
              { href: "/passport-photo-checker", label: "Passport Photo Checker" },
              { href: "/us-check-photo-green-card", label: "Green Card Photo Checker" },
              { href: "/australian-passport-photo-checker", label: "Australian Passport Photo Checker" },
              { href: "/diversity-visa-lottery-photo-checker", label: "DV Lottery Photo Checker" },
              { href: "/uk-passport-photo-checker-online-free", label: "UK Passport Photo Checker" },
              { href: "/passport-size-photo-maker", label: "Passport Size Photo Maker" },
              { href: "/us-passport-photo-editor", label: "US Passport Photo Editor" },
              { href: "/us-visa-photo-editor", label: "US Visa Photo Editor" },
              { href: "/schengen-visa-photo-editor", label: "Schengen Visa Photo Editor" },
              { href: "/icao-standard-photograph", label: "ICAO Standard Photo Tool" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 bg-white hover:bg-lime-50/80 border border-slate-200 hover:border-lime-300 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 hover:text-lime-700 transition-all shadow-xs"
              >
                {label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ── WHAT THIS TOOL CHECKS ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="checks-heading">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Six-point analysis</p>
          <h2 id="checks-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What the visa photo checker tests
          </h2>
          <p className="mt-4 text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Every photo is measured against the biometric photo standard of the country you select.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REQUIREMENTS.map(({ emoji, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-lime-100 hover:shadow-lime-100/30 transition-all duration-200 group">
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── US VISA & IMMIGRATION PHOTO USE CASES ─────────────────── */}
      <section className="bg-white border-y border-slate-100" aria-labelledby="us-uses-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Popular destinations</p>
            <h2 id="us-uses-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Visa photo rules for popular destinations
            </h2>
            <p className="mt-4 text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Visa photos usually follow the destination&apos;s passport photo standard, but size and upload rules differ. Here&apos;s what the most-requested visas need. Applying for a green card or the DV Lottery? Use our dedicated <Link href="/us-check-photo-green-card" className="text-lime-700 font-bold hover:underline">Green Card Photo Checker</Link> or <Link href="/diversity-visa-lottery-photo-checker" className="text-lime-700 font-bold hover:underline">DV Lottery Photo Checker</Link>.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISA_USE_CASES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-lime-200 hover:bg-white transition-all duration-200">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONG-FORM SEO CONTENT ─────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">

          {/* Block 1: Why photo rejections happen */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
            <div>
              <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">The hidden cost of a bad photo</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Why embassies reject visa photos
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  Visa photos are rarely rejected because of how applicants look — they&apos;re rejected because they miss a technical rule. A shadow on the background, a head that sits too high in the frame, or a warm colour cast is enough to send an application back.
                </p>
                <p>
                  Most countries base their visa photo rules on the <strong className="text-slate-700">ICAO Doc 9303</strong> biometric standard, which defines head-to-frame ratios, eye position, background and lighting. Each country then adds its own size and upload rules.
                </p>
                <p>
                  This checker tests those biometric rules before you submit, so you catch the problem at home rather than at the visa centre.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "35×45 mm", label: "the most common visa photo size worldwide" },
                { stat: "2×2 in", label: "the US visa photo size (600–1200 px digital)" },
                { stat: "6 months", label: "the maximum photo age most consulates accept" },
                { stat: "ICAO 9303", label: "the biometric standard most visa photo rules build on" },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-white border border-slate-100 rounded-xl p-5">
                  <div className="text-2xl font-black text-lime-600 mb-1">{stat}</div>
                  <p className="text-xs text-slate-500 font-medium leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 1b: Visa vs passport photo differences */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
            <div className="order-2 lg:order-1 grid grid-cols-1 gap-4">
              {[
                { title: "Same biometric rules", desc: "Head size, eye line, a neutral expression, even lighting and a plain background are required for almost every visa and passport photo. The checker tests all of these." },
                { title: "Different sizes", desc: "Some countries use a different size for visas than for passports — Canada uses 35×45 mm for visas but 50×70 mm for passports. Check the table below before printing." },
                { title: "Different upload rules", desc: "Online visa forms often add pixel and file-size limits, such as the US DS-160 (600–1200 px square, max 240 KB) or the India e-Visa's square upload." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Visa vs passport</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Visa photo vs passport photo: what&apos;s different
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  For most destinations, a visa photo follows the same biometric rules as that country&apos;s passport photo. The differences are usually in the print size and in the digital upload limits of online visa forms.
                </p>
                <p>
                  Choose your destination, upload your photo, and get an itemised report on the biometric checks — then confirm the size and file rules for your specific visa form before you submit.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Country guide */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Country requirements</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Visa photo requirements by country
              </h2>
              <p className="mt-4 text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Every country sets its own photo size and rules. Here are the most-requested visa photo requirements:
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-lg shadow-slate-200/40 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Country</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Size</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Background</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Head height</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { flag: "🇺🇸", country: "USA (DS-160 visa)", size: "2×2 in / 600–1200 px square", bg: "White", head: "50–69% of frame" },
                    { flag: "🇪🇺", country: "Schengen", size: "35×45 mm", bg: "Plain light", head: "32–36 mm" },
                    { flag: "🇮🇳", country: "India (e-Visa)", size: "Square digital photo", bg: "White or light", head: "Full face, centred" },
                    { flag: "🇨🇳", country: "China", size: "33×48 mm", bg: "White", head: "28–33 mm" },
                    { flag: "🇨🇦", country: "Canada (visitor visa)", size: "35×45 mm", bg: "White or light", head: "31–36 mm" },
                    { flag: "🇦🇺", country: "Australia", size: "35×45 mm", bg: "Plain white or light grey", head: "32–36 mm" },
                  ].map(({ flag, country, size, bg, head }) => (
                    <tr key={country} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                        <span>{flag}</span>{country}
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{size}</td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{bg}</td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{head}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-medium text-center mt-4">
              Requirements shown are current as of 2026. Always confirm on the official embassy, consulate or visa website before submitting.
            </p>
          </div>

          {/* Block 3: How our system works */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            <div>
              <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Under the hood</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                How the visa photo checker works
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  When you upload a photo, <strong className="text-slate-700">Google MediaPipe Face Mesh</strong> detects and maps 468 facial landmarks in real time — key points around your eyes, nose, mouth, jawline, and forehead. From those points, the tool calculates the geometric ratios visa and passport agencies use.
                </p>
                <p>
                  It checks your <strong className="text-slate-700">head-to-frame height ratio</strong> to confirm your face fills the correct percentage of the image. It measures the <strong className="text-slate-700">inter-ocular distance</strong> — the pixel gap between your pupils — to verify the photo meets the biometric alignment standard. It samples the background to check for shadows, color cast, and pattern violations, — the most common reasons visa photos are rejected.
                </p>
                <p>
                  All results are scored against the photo standard of the country you select. The report tells you which checks passed, which failed, and what to fix before you print, crop, or submit.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { step: "01", title: "Select your destination country", desc: "The tool loads that country's photo specification — head ratios, eye line, background and expression rules." },
                { step: "02", title: "Upload your JPEG, PNG, or WebP photo", desc: "Drop your photo into the upload zone. No account required. It's sent over an encrypted connection to run the check." },
                { step: "03", title: "Biometric scan runs in under 3 seconds", desc: "MediaPipe maps 468 facial landmarks and runs all geometric, lighting, and background checks against the loaded specification." },
                { step: "04", title: "Read your scored compliance report", desc: "Every check shows as Pass, Warning, or Fail with a reason and a fix instruction. Your overall compliance score tells you at a glance whether the photo is ready to submit." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                  <span className="text-[11px] font-black text-slate-300 leading-none shrink-0 mt-0.5">{step}</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── TIPS SECTION ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="tips-heading">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">Before you upload</p>
          <h2 id="tips-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How to take a visa photo at home
          </h2>
          <p className="mt-4 text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            You don&apos;t need a studio. These steps produce a compliant visa photo with any modern smartphone.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "☀️", title: "Use natural light", desc: "Stand facing a window. Natural indirect light fills your face evenly and eliminates shadows without harsh highlights." },
            { icon: "🧱", title: "Find a plain white wall", desc: "A white or light grey wall works as your background. Move at least 1 metre away from it to avoid casting shadows on the surface behind you." },
            { icon: "📱", title: "Shoot at eye level", desc: "Place your phone at the same height as your eyes. Shooting from above or below distorts facial geometry and fails the head-tilt check." },
            { icon: "😐", title: "Neutral expression, eyes open", desc: "Look directly into the camera, keep your mouth closed, eyes fully open, and hold a relaxed neutral expression. No smiling." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-lime-100 transition-colors duration-200">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="faq-heading">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-lime-600 uppercase tracking-[0.2em] mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Visa photo checker FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden bg-lime-600 rounded-xl p-10 sm:p-14 text-center">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-lime-500/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-lime-500/40 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-lime-200 uppercase tracking-[0.2em] mb-3">Ready?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Check your visa photo in seconds
            </h2>
            <p className="text-lime-100 font-medium text-base max-w-md mx-auto mb-8 leading-relaxed">
              Avoid a costly rejection. Upload your photo now and get a full compliance report — no account needed, completely free.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-lime-700 font-black text-sm px-8 py-4 rounded-xl hover:bg-lime-50 transition-all hover:-translate-y-0.5 shadow-lg shadow-lime-900/20 uppercase tracking-widest"
            >
              Validate My Photo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Country Dropdown ─────────────────────────────────────────────────────────

function CountrySelector({
  documentTypes,
  selectedCountry,
  onSelect,
}: {
  documentTypes: ReturnType<typeof getFilteredDocumentTypes>;
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
          const code = countryMapping[slug] || slug.toUpperCase();
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
      d.id.replace(/-passport$/, "").replace(/-visa$/, "").toUpperCase() === selectedCountry
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        Country
      </label>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-11 sm:h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 flex items-center justify-between text-sm font-bold text-slate-800 hover:border-lime-400 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-lime-500/20"
      >
        <span className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span className="text-xl leading-none">{selected?.flag ?? "🏳️"}</span>
          <span className="truncate">{selected?.country ?? "Select Country"}</span>
        </span>
        <span className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 w-[calc(200%+0.75rem)] sm:w-auto sm:right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl shadow-slate-300/30 overflow-hidden"
          role="listbox"
        >
          <div className="p-2.5 border-b border-slate-100">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500/15 border border-transparent focus:border-lime-200 transition-all"
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
                    selectedCountry === code ? "bg-lime-50 text-lime-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span className="text-xs font-bold flex-1">{name}</span>
                  {selectedCountry === code && (
                    <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
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
        </div>
      )}
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

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
      <div
        className={`h-48 sm:h-56 lg:h-[200px] xl:h-[220px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${
          isDragging
            ? "border-lime-500 bg-lime-50 scale-[1.01]"
            : previewUrl
            ? "border-lime-200 bg-lime-50"
            : "border-slate-200 bg-slate-50 group-hover:border-lime-300 group-hover:bg-white"
        }`}
      >
        {previewUrl ? (
          <div className="w-full h-full relative">
            <img src={previewUrl} className="w-full h-full object-contain p-3" alt="Photo preview" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-bold text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click to change photo
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-300 group-hover:text-lime-500 group-hover:border-lime-100 transition-all duration-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-bold text-slate-800">{isDragging ? "Release to upload" : "Drop your photo here"}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold uppercase tracking-widest">or click to browse</p>
            <p className="text-[10px] text-slate-300 mt-2 font-medium">JPEG · PNG · WebP · Max 10 MB</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ item }: { item: (typeof FAQ_ITEMS)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900 leading-snug">{item.q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <p hidden={!open} className="px-6 pb-5 text-sm text-slate-500 leading-relaxed font-medium">{item.a}</p>
    </div>
  );
}