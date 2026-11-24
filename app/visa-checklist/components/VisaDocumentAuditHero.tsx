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

const STATUS_STYLES = {
  pass: { dot: "bg-emerald-500", label: "Passed", text: "text-emerald-700" },
  warn: { dot: "bg-amber-500", label: "Review", text: "text-amber-700" },
  fail: { dot: "bg-rose-500", label: "Fix", text: "text-rose-700" },
} as const;

export default function VisaDocumentAuditHero() {
  const [activeTab, setActiveTab] = useState<string>("canada");
  const currentAudit = SAMPLE_AUDITS[activeTab] || SAMPLE_AUDITS.canada;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left: pitch */}
      <div>
        <p className="text-sm font-semibold text-lime-700 mb-4">
          Free visa document checklists · Updated for 2026
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.08] mb-5 text-balance">
          Visa document checklist: what to prepare before you apply
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl text-pretty">
          The documents every visa application needs, with fees, processing times and photo specs by country. Then check your own files for anything missing or wrong before they reach the embassy.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link
            href="/visa-checklist/audit"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            Check my documents — free
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#country-directory"
            className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 transition-colors"
          >
            Browse checklists
          </a>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
          {["Official embassy rules", "Fees & processing times", "Printable PDF"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-lime-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: sample audit preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.12)]">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Sample audit</p>
            <p className="text-sm font-semibold text-slate-900 truncate">
              {currentAudit.countryFlag} {currentAudit.countryName} · {currentAudit.visaType}
            </p>
          </div>
          <div className="flex shrink-0 gap-0.5 bg-slate-100 p-0.5 rounded-lg" role="tablist" aria-label="Sample country">
            {Object.keys(SAMPLE_AUDITS).map((key) => {
              const s = SAMPLE_AUDITS[key];
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(key)}
                  className={`w-8 h-7 rounded-md text-sm transition-colors ${
                    isSelected ? "bg-white shadow-sm" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${s.countryName} sample audit`}
                >
                  {s.countryFlag}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="divide-y divide-slate-100">
          {currentAudit.items.map((item, idx) => {
            const st = STATUS_STYLES[item.status];
            return (
              <li key={idx} className="flex items-start gap-3 px-5 py-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${st.dot}`} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900 truncate">{item.name}</span>
                    <span className={`text-xs font-medium shrink-0 ${st.text}`}>{st.label}</span>
                  </div>
                  {item.status !== "pass" && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.subtext || item.detail}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl">
          <span className="text-sm text-slate-600">
            <strong className="font-semibold text-slate-900">{currentAudit.issuesCount} items</strong> need attention
          </span>
          <Link
            href={currentAudit.photoLink}
            className="text-sm font-semibold text-lime-700 hover:text-lime-800 transition-colors"
          >
            Fix photo →
          </Link>
        </div>
      </div>
    </div>
  );
}
