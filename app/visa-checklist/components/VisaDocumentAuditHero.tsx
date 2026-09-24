"use client";

import { useState } from "react";
import Link from "next/link";

interface AuditSample {
  countryName: string;
  countryFlag: string;
  visaType: string;
  photoLink: string;
  photoSpec: string;
  docsCount: number;
  statusLabel: string;
  items: {
    status: "pass" | "warn" | "fail";
    name: string;
    detail: string;
    subtext?: string;
    category: string;
  }[];
  issuesCount: number;
}

const SAMPLE_AUDITS: Record<string, AuditSample> = {
  canada: {
    countryName: "Canada",
    countryFlag: "🇨🇦",
    visaType: "Tourist Visa (V-1 / TRV)",
    photoLink: "/ca",
    photoSpec: "35×45 mm · Pure White BG",
    docsCount: 6,
    statusLabel: "2 Items Need Attention",
    issuesCount: 2,
    items: [
      {
        status: "pass",
        category: "Identity Check",
        name: "Original Passport Bio Page",
        detail: "Valid for 6+ months · All 3 bio pages clearly legible · No glare",
      },
      {
        status: "pass",
        category: "Financial Proof",
        name: "Bank Statement (6 Months)",
        detail: "Consistent salary credits · Closing liquid balance: CAD $8,200",
      },
      {
        status: "pass",
        category: "Travel & Lodging",
        name: "Travel Itinerary & Hotel",
        detail: "Confirmed hotel bookings match entry/exit flight dates",
      },
      {
        status: "pass",
        category: "Tax Verification",
        name: "Income Tax Returns (3 Yrs)",
        detail: "Verified taxable income matches employment declarations",
      },
      {
        status: "warn",
        category: "Consistency Check",
        name: "Employment Letter / NOC",
        detail: "Some expected information could not be detected",
        subtext: "Missing explicit approved leave dates & job retention guarantee clause",
      },
      {
        status: "fail",
        category: "Biometric Audit",
        name: "Visa Photograph (35×45mm)",
        detail: "Photo does not meet IRCC biometric requirements",
        subtext: "Background has uneven shadow cast · Face covers 62% instead of mandated 70-80% (31-36mm)",
      },
    ],
  },
  usa: {
    countryName: "United States",
    countryFlag: "🇺🇸",
    visaType: "B1/B2 Visitor Visa",
    photoLink: "/us-visa-photo-editor",
    photoSpec: "2×2 in (51×51 mm / 600×600 px)",
    docsCount: 6,
    statusLabel: "2 Items Need Attention",
    issuesCount: 2,
    items: [
      {
        status: "pass",
        category: "Application Form",
        name: "DS-160 Confirmation Page",
        detail: "Barcode crisp & scannable · Personal details match passport exactly",
      },
      {
        status: "pass",
        category: "Appointment Form",
        name: "Appointment Confirmation",
        detail: "OFC Biometrics & Consular interview slots confirmed",
      },
      {
        status: "pass",
        category: "Financial Proof",
        name: "Bank Statement (6 Months)",
        detail: "Clean transaction history with verifiable domestic funds",
      },
      {
        status: "pass",
        category: "Home Ties",
        name: "Property & Asset Documentation",
        detail: "Deed records and municipal tax filings verified",
      },
      {
        status: "warn",
        category: "Document Quality",
        name: "Employer Verification Letter",
        detail: "Missing official corporate letterhead stamp/seal",
        subtext: "Consular officers look for verifiable organizational contact information",
      },
      {
        status: "fail",
        category: "Biometric Audit",
        name: "US 2×2 Inch Photograph",
        detail: "Photo fails automated State Department check",
        subtext: "Eyeglasses detected (strictly prohibited since 2016) · Uneven background lighting",
      },
    ],
  },
  uk: {
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    visaType: "Standard Visitor Visa",
    photoLink: "/uk",
    photoSpec: "35×45 mm · Light Grey/Cream BG",
    docsCount: 5,
    statusLabel: "2 Items Need Attention",
    issuesCount: 2,
    items: [
      {
        status: "pass",
        category: "Identity Check",
        name: "Current Passport",
        detail: "Valid for entire trip · Minimum 1 blank visa vignette page",
      },
      {
        status: "pass",
        category: "Financial Proof",
        name: "Payslips & Salary Record",
        detail: "Net monthly pay corresponds to bank statement deposits",
      },
      {
        status: "pass",
        category: "Travel Proof",
        name: "Flight & Accommodation",
        detail: "London & Edinburgh lodging verified with confirmed dates",
      },
      {
        status: "warn",
        category: "Financial Audit",
        name: "Bank Statement Discrepancy",
        detail: "Unexplained recent lump-sum deposit detected (£2,400)",
        subtext: "UKVI caseworkers require documented paper trail for sudden deposit spikes",
      },
      {
        status: "fail",
        category: "Biometric Audit",
        name: "Digital Biometric Photo",
        detail: "Background color does not meet UKVI specifications",
        subtext: "Pure stark white used instead of mandated light grey or off-white cream",
      },
    ],
  },
  schengen: {
    countryName: "Schengen Area",
    countryFlag: "🇪🇺",
    visaType: "Short Stay Tourist Type C",
    photoLink: "/visa-photo",
    photoSpec: "35×45 mm · ICAO 9303 Standard",
    docsCount: 6,
    statusLabel: "2 Items Need Attention",
    issuesCount: 2,
    items: [
      {
        status: "pass",
        category: "Application Form",
        name: "Harmonized Schengen Form",
        detail: "All 37 fields completed · Signed in original by applicant",
      },
      {
        status: "pass",
        category: "Mandatory Insurance",
        name: "Travel Medical Insurance (€30k)",
        detail: "Zero deductible · Valid across all 29 Schengen member states",
      },
      {
        status: "pass",
        category: "Flight Proof",
        name: "Round-Trip Flight Itinerary",
        detail: "Entry port (Paris CDG) & exit port (Rome FCO) confirmed",
      },
      {
        status: "pass",
        category: "Accommodation",
        name: "Hotel Reservations (14 Nights)",
        detail: "Every consecutive night in the Schengen territory accounted for",
      },
      {
        status: "warn",
        category: "Consistency Check",
        name: "Employer Leave NOC",
        detail: "Approved leave end date does not include flight buffer day",
        subtext: "Ensure authorized leave covers the complete travel timeframe",
      },
      {
        status: "fail",
        category: "Biometric Audit",
        name: "ICAO Visa Photograph",
        detail: "Photo does not meet ICAO 9303 biometric standard",
        subtext: "Slight head rotation (3.2°) & visible dental expression detected",
      },
    ],
  },
};

export default function VisaDocumentAuditHero() {
  const [activeTab, setActiveTab] = useState<string>("canada");
  const currentAudit = SAMPLE_AUDITS[activeTab] || SAMPLE_AUDITS.canada;

  return (
    <div className="w-full">
      {/* ── Top Hero Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Direct Value Pitch */}
        <div className="lg:col-span-6 text-left">
          {/* Official badge */}
          <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/25 px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-lime-800">
              Pre-Submission Document &amp; Photo Audit
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.12] mb-4 text-pretty">
            Check Your Visa Documents Before You Apply
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6 text-pretty">
            Upload your documents. Find missing, incorrect, unreadable, or incorrectly formatted files before submitting your application to the embassy.
          </p>

         

          {/* Value Comparison Callout */}
          <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl text-white mb-7 border border-slate-800 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                  Generic websites say:
                </span>
                <p className="text-slate-300 italic text-xs leading-relaxed">
                  &ldquo;Here are the documents you may need.&rdquo;
                </p>
              </div>
              <div className="sm:pl-1">
                <span className="text-lime-400 font-extrabold block mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <span>⚡</span> PixPassport says:
                </span>
                <p className="text-white font-semibold text-xs leading-relaxed">
                  &ldquo;Here is what <span className="text-lime-400 font-bold">YOU have</span>, what you&apos;re <span className="text-amber-300 font-bold">missing</span>, and what <span className="text-rose-400 font-bold">needs attention</span>.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <Link
              href="/visa-checklist/audit"
              className="inline-flex items-center justify-center gap-2 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-lime-600/20 text-center"
            >
              <span>⚡ Free AI Document Checklist</span>
              <span className="font-bold text-base">→</span>
            </Link>
            <Link
              href="/passport-photo-online"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-sm px-5 py-3.5 rounded-xl transition-colors border border-slate-200 text-center"
            >
              <span>Fix Biometric Photo Online</span>
              <span className="text-lime-700 font-bold">→</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/>
              </svg>
              Embassy Guidelines Verified
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/>
              </svg>
              50+ Countries
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/>
              </svg>
              Printable PDF Formats
            </span>
          </div>
        </div>

        {/* Right Column: Live Interactive Audit Window */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-slate-950 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800 text-white relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Window Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">
                  APPLICATION AUDIT
                </span>
              </div>

              {/* Sample country tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {Object.keys(SAMPLE_AUDITS).map((key) => {
                  const s = SAMPLE_AUDITS[key];
                  const isSelected = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-lime-500 text-slate-950 shadow-xs scale-105"
                          : "text-slate-400 hover:text-white"
                      }`}
                      aria-label={`View ${s.countryName} sample audit`}
                    >
                      <span>{s.countryFlag}</span>
                      <span className="hidden sm:inline">{s.countryName.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Application Overview Meta Card */}
            <div className="flex items-center justify-between bg-slate-900/90 rounded-2xl p-3.5 sm:p-4 border border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Target Application
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                  <span>{currentAudit.countryFlag}</span>
                  <span>{currentAudit.countryName} · {currentAudit.visaType}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Status
                </span>
                <span className="text-xs font-extrabold text-amber-300 font-mono">
                  Ready to Review
                </span>
              </div>
            </div>

            {/* Document Verification Live List */}
            <div className="space-y-2 mb-5">
              {currentAudit.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all ${
                    item.status === "pass"
                      ? "bg-slate-900/60 border-slate-800/80 text-slate-200"
                      : item.status === "warn"
                      ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
                      : "bg-rose-950/30 border-rose-500/40 text-rose-200"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="pt-0.5 shrink-0 text-sm">
                      {item.status === "pass" && (
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                      {item.status === "warn" && (
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                          ⚠
                        </span>
                      )}
                      {item.status === "fail" && (
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-[10px]">
                          ✕
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {item.name}
                        </span>
                        <span
                          className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                            item.status === "pass"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : item.status === "warn"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {item.status === "pass" ? "Passed" : item.status === "warn" ? "Needs Review" : "Non-Compliant"}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                        {item.detail}
                      </p>

                      {item.subtext && (
                        <div className="mt-1 text-[10px] font-medium text-slate-300/90 pl-2 border-l-2 border-slate-700">
                          {item.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Attention Bar & Fix Link */}
            <div className="pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-black text-rose-400">
                  {currentAudit.issuesCount} items need attention
                </span>
                <span className="text-xs text-slate-500">before submission</span>
              </div>

              <Link
                href={currentAudit.photoLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs py-2 px-4 rounded-xl transition-all shadow-md shadow-lime-500/20"
              >
                <span>Fix Biometric Photo</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
