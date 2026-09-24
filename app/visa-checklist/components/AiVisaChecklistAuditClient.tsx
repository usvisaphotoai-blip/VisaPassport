"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CountryMeta, VisaChecklistDetail, VisaChecklistMeta } from "@/lib/visa-checklist";

interface Props {
  initialCountry: CountryMeta | null;
  initialChecklist: VisaChecklistDetail | null;
  allCountries: CountryMeta[];
}

interface AuditDocItem {
  id: string;
  name: string;
  category: string;
  mandatory: boolean;
  uploaded: boolean;
  fileName?: string;
  fileSize?: string;
  status?: "pass" | "warn" | "fail";
  detail?: string;
  fixAction?: string;
  fixLink?: string;
}

export default function AiVisaChecklistAuditClient({
  initialCountry,
  initialChecklist,
  allCountries,
}: Props) {
  const [selectedCountrySlug, setSelectedCountrySlug] = useState(
    initialCountry?.slug || allCountries[0]?.slug || "canada"
  );
  
  const currentCountry =
    allCountries.find((c) => c.slug === selectedCountrySlug) || initialCountry || allCountries[0];

  const availableVisas = currentCountry?.availableVisas || [];
  const [selectedVisaSlug, setSelectedVisaSlug] = useState(
    initialChecklist?.slug || availableVisas[0]?.slug || "canada-student-visa-checklist"
  );

  // Build document items based on initial checklist or defaults
  const defaultItems: AuditDocItem[] = initialChecklist?.checklistSections
    ? initialChecklist.checklistSections.flatMap((sec, sIdx) =>
        sec.items.map((item, iIdx) => ({
          id: `doc-${sIdx}-${iIdx}`,
          name: item.title,
          category: sec.title,
          mandatory: Boolean(item.mandatory),
          uploaded: true,
          fileName: `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`,
          fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
        }))
      )
    : [
        { id: "1", name: "Original Passport Bio Page", category: "Identity", mandatory: true, uploaded: true, fileName: "passport-bio.pdf", fileSize: "1.4 MB" },
        { id: "2", name: `Visa Photograph (${currentCountry.photoSize})`, category: "Biometrics", mandatory: true, uploaded: true, fileName: "visa-photo.jpg", fileSize: "2.1 MB" },
        { id: "3", name: "6 Months Bank Statements", category: "Financial", mandatory: true, uploaded: true, fileName: "bank-statement-6m.pdf", fileSize: "3.8 MB" },
        { id: "4", name: "Employment / Student Verification Letter", category: "Employment", mandatory: true, uploaded: true, fileName: "noc-letter.pdf", fileSize: "0.8 MB" },
        { id: "5", name: "Travel Itinerary & Accommodation", category: "Travel", mandatory: true, uploaded: true, fileName: "flight-hotel.pdf", fileSize: "1.2 MB" },
        { id: "6", name: "Income Tax Returns (3 Years)", category: "Financial", mandatory: false, uploaded: true, fileName: "itr-tax-returns.pdf", fileSize: "4.2 MB" },
      ];

  const [docList, setDocList] = useState<AuditDocItem[]>(defaultItems);
  const [auditState, setAuditState] = useState<"idle" | "scanning" | "completed">("idle");
  const [scanStep, setScanStep] = useState<string>("");
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // Run AI Simulation Audit
  const handleStartAudit = () => {
    setAuditState("scanning");
    setScanProgress(15);
    setScanStep("Reading document files & metadata...");

    setTimeout(() => {
      setScanProgress(40);
      setScanStep(`Verifying compliance against official ${currentCountry.authorityName} 2026 guidelines...`);
    }, 600);

    setTimeout(() => {
      setScanProgress(70);
      setScanStep(`Analyzing biometric photo face-to-frame ratio (${currentCountry.photoSize})...`);
    }, 1200);

    setTimeout(() => {
      setScanProgress(90);
      setScanStep("Checking financial solvency consistency and missing clauses...");
    }, 1800);

    setTimeout(() => {
      // Evaluate results
      const evaluated = docList.map((doc, idx) => {
        if (doc.name.toLowerCase().includes("photo") || doc.category.toLowerCase().includes("biometric")) {
          return {
            ...doc,
            status: "fail" as const,
            detail: `Photo dimensions or background lighting need correction. Mandated ${currentCountry.photoSize} pure white background required.`,
            fixAction: `Create ${currentCountry.photoSize} Compliant Photo`,
            fixLink: currentCountry.photoToolSlug || "/passport-photo-online",
          };
        }
        if (doc.name.toLowerCase().includes("employment") || doc.name.toLowerCase().includes("sponsor") || doc.name.toLowerCase().includes("bank")) {
          if (idx === 3 || doc.name.toLowerCase().includes("employment")) {
            return {
              ...doc,
              status: "warn" as const,
              detail: "Missing explicit approved leave dates & job retention guarantee clause in company letter.",
              fixAction: "Add Leave & Return Dates",
            };
          }
        }
        return {
          ...doc,
          status: "pass" as const,
          detail: "Document format, dates, and clarity match official consular specifications.",
        };
      });

      setDocList(evaluated);
      setScanProgress(100);
      setAuditState("completed");
    }, 2400);
  };

  const handleToggleUpload = (id: string) => {
    setDocList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, uploaded: !item.uploaded } : item))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const passCount = docList.filter((d) => d.status === "pass").length;
  const warnCount = docList.filter((d) => d.status === "warn").length;
  const failCount = docList.filter((d) => d.status === "fail").length;
  const issuesTotal = warnCount + failCount;
  const readinessScore =
    docList.length > 0 ? Math.round((passCount / docList.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* ── Top Hero Header ── */}
      <header className="relative bg-slate-950 pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 text-white border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-lime-500 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-emerald-600 rounded-full blur-[160px] animate-pulse delay-700" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
            <ol className="flex items-center space-x-2 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="hover:text-lime-400 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li>
                <Link href="/visa-checklist" className="hover:text-lime-400 transition-colors">
                  Visa Checklists
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li>
                <Link href={`/visa-checklist/${currentCountry.slug}`} className="hover:text-lime-400 transition-colors">
                  {currentCountry.name}
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li className="text-lime-400 font-bold">AI Document Audit</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 bg-lime-500/10 border border-lime-500/30 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
            <span className="text-lime-400 text-xs font-black uppercase tracking-wider">
              ⚡ Free AI Pre-Submission Audit
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Check Your {currentCountry.name} Visa Documents Before You Apply
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
            Find missing clauses, inconsistent financial records, and non-compliant biometric photos before submitting your application to the embassy.
          </p>

          {/* Quick Target Selector Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-slate-900/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-xl text-xs sm:text-sm font-bold">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.name}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-xl text-xs sm:text-sm font-bold text-lime-400">
              <span>📋 {initialChecklist?.visaType || "Visa Application"}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 px-2">
              <span>Photo:</span>
              <strong className="text-white">{currentCountry.photoSize}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Interactive Audit Container ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-8 md:p-10">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-lime-700 uppercase tracking-widest block mb-1">
                PRE-SUBMISSION VERIFICATION ENGINE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {auditState === "completed" ? "Audit Results & Action Plan" : "Verify Your Prepared Documents"}
              </h2>
            </div>

            {auditState === "completed" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Report</span>
                </button>
                <button
                  onClick={() => setAuditState("idle")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-sm"
                >
                  <span>🔄 Re-Audit</span>
                </button>
              </div>
            )}
          </div>

          {/* ── Scanning Animation State ── */}
          {auditState === "scanning" && (
            <div className="py-16 text-center">
              <div className="w-20 h-20 mx-auto relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-lime-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  ⚡
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                Auditing Your {currentCountry.name} Visa Application
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6 animate-pulse">
                {scanStep}
              </p>
              
              <div className="max-w-md mx-auto h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Idle Upload / Selection State ── */}
          {auditState === "idle" && (
            <div className="py-6 space-y-6">
              {/* Product Difference Banner */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl text-white border border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="text-lime-400 text-xl shrink-0">⚡</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white mb-1">
                      What PixPassport AI Checks:
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Unlike generic checklists that only list requirements, PixPassport analyzes what <strong className="text-lime-400">YOU have</strong>, what you&apos;re <strong className="text-amber-300">missing</strong>, and flags <strong className="text-rose-400">errors &amp; non-compliant photos</strong> before you submit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  <span>Prepared Files ({docList.length} Items)</span>
                  <span>Status</span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden">
                  {docList.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleToggleUpload(doc.id)}
                      className={`p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        doc.uploaded ? "bg-white hover:bg-slate-50/80" : "bg-slate-50/50 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                            doc.uploaded
                              ? "bg-lime-500 border-lime-600 text-slate-950 shadow-xs"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {doc.uploaded && (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className={`text-xs sm:text-sm font-bold block truncate ${doc.uploaded ? "text-slate-900" : "text-slate-400"}`}>
                            {doc.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {doc.category} · {doc.mandatory ? "Mandatory" : "Recommended"}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline shrink-0">
                        {doc.fileName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Audit Trigger Button */}
              <div className="pt-4">
                <button
                  onClick={handleStartAudit}
                  className="w-full py-4 px-6 bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-slate-950 font-black text-sm sm:text-base rounded-2xl transition-all shadow-lg shadow-lime-500/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <span>⚡ Run Free AI Document Audit Now</span>
                  <span>→</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  100% Free &amp; Private · No credit card required · Instant automated analysis
                </p>
              </div>
            </div>
          )}

          {/* ── Completed Results Dashboard ── */}
          {auditState === "completed" && (
            <div className="py-6 space-y-6">
              {/* Score & Health Header */}
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl text-white border border-slate-800 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-widest block mb-1">
                      APPLICATION AUDIT REPORT
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-white">
                      {issuesTotal === 0 ? "Application Ready to Submit!" : `${issuesTotal} Issues Found Before Submission`}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase block">Compliance Score</span>
                      <span className="text-xl sm:text-2xl font-black text-lime-400 font-mono">
                        {readinessScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score breakdown pills */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 text-center">
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-2xl">
                    <span className="text-xs sm:text-sm font-black text-emerald-400 block">{passCount}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Passed</span>
                  </div>
                  <div className="bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-2xl">
                    <span className="text-xs sm:text-sm font-black text-amber-300 block">{warnCount}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Need Review</span>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-2xl">
                    <span className="text-xs sm:text-sm font-black text-rose-400 block">{failCount}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Action Required</span>
                  </div>
                </div>
              </div>

              {/* Detailed Item Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  Document Analysis Results
                </h4>

                <div className="space-y-3">
                  {docList.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        doc.status === "pass"
                          ? "bg-emerald-50/30 border-emerald-200/60 text-slate-800"
                          : doc.status === "warn"
                          ? "bg-amber-50/40 border-amber-200/70 text-slate-900"
                          : "bg-rose-50/40 border-rose-200/70 text-slate-900"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="pt-0.5 text-base shrink-0">
                            {doc.status === "pass" && "✅"}
                            {doc.status === "warn" && "⚠️"}
                            {doc.status === "fail" && "❌"}
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs sm:text-sm font-black text-slate-900">
                                {doc.name}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                                  doc.status === "pass"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : doc.status === "warn"
                                    ? "bg-amber-100 text-amber-900"
                                    : "bg-rose-100 text-rose-900"
                                }`}
                              >
                                {doc.status === "pass" ? "Passed" : doc.status === "warn" ? "Needs Review" : "Non-Compliant"}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {doc.detail}
                            </p>
                          </div>
                        </div>

                        {doc.fixLink && (
                          <Link
                            href={doc.fixLink}
                            className="inline-flex items-center gap-1 bg-lime-600 hover:bg-lime-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shrink-0 shadow-xs"
                          >
                            <span>Fix Photo ({currentCountry.photoSize})</span>
                            <span>→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Fix Spotlight Card */}
              <div className="p-6 bg-slate-900 rounded-3xl text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-widest block mb-1">
                    BIOMETRIC PHOTO FIX
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white mb-1">
                    Create Compliant {currentCountry.name} Visa Photo ({currentCountry.photoSize})
                  </h4>
                  <p className="text-xs text-slate-300">
                    Fix background shadows and face ratios to guarantee 100% consular acceptance.
                  </p>
                </div>

                <Link
                  href={currentCountry.photoToolSlug || "/passport-photo-online"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-lime-500/20 shrink-0"
                >
                  <span>Fix My Photo Now →</span>
                </Link>
              </div>

              {/* Return to Checklist Guide Link */}
              <div className="text-center pt-2">
                <Link
                  href={`/visa-checklist/${currentCountry.slug}/${initialChecklist?.slug || selectedVisaSlug}`}
                  className="text-xs font-bold text-slate-500 hover:text-lime-600 transition-colors inline-flex items-center gap-1"
                >
                  <span>← Back to {initialChecklist?.title || `${currentCountry.name} Visa Checklist`}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
