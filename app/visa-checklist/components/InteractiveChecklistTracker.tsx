"use client";

import { useState } from "react";
import Link from "next/link";
import { ChecklistSection, VisaPhotoSpec } from "@/lib/visa-checklist";

interface Props {
  checklistSections: ChecklistSection[];
  visaTitle: string;
  countryName: string;
  photoSpec: VisaPhotoSpec;
  auditHref?: string;
}

export default function InteractiveChecklistTracker({
  checklistSections,
  visaTitle,
  countryName,
  photoSpec,
  auditHref,
}: Props) {
  // Flatten all items with unique IDs
  const allItemsWithIds = checklistSections.flatMap((section, sIdx) =>
    section.items.map((item, iIdx) => ({
      ...item,
      id: `${sIdx}-${iIdx}`,
      sectionTitle: section.title,
    }))
  );

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<"all" | "mandatory" | "pending">("all");

  const totalCount = allItemsWithIds.length;
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCheckedIds({});
  };

  const handleCheckAll = () => {
    const allChecked: Record<string, boolean> = {};
    allItemsWithIds.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedIds(allChecked);
  };

  return (
    <div id="checklist-tracker" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-7 md:p-8 my-8 print:border-none print:shadow-none print:p-0 scroll-mt-24">
      {/* ── Top Header & Action Buttons ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/25 text-lime-800 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />
            <span>Interactive Document Checklist</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
            Document Checklist for {visaTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check off documents as you prepare them. Save or print your personal checklist before visiting the visa application center.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden shrink-0">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
            title="Print or Save as PDF"
          >
            <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / Save PDF</span>
          </button>
          
          <button
            onClick={progressPercent === 100 ? handleReset : handleCheckAll}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            {progressPercent === 100 ? "Reset Checkmarks" : "Mark All as Done"}
          </button>
        </div>
      </div>

      {/* ── Progress & Free AI Document Check Banner ── */}
      <div className="my-5 p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl text-white shadow-md border border-slate-800 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold text-white">
              Application Document Progress:
            </span>
            <span className="text-lime-400 font-extrabold text-sm sm:text-base font-mono">
              {checkedCount} / {totalCount} Ready
            </span>
          </div>
          
          <span className={`text-xs px-3 py-1 rounded-full font-extrabold self-start sm:self-auto ${
            progressPercent === 100
              ? "bg-emerald-500 text-slate-950"
              : progressPercent > 50
              ? "bg-lime-500 text-slate-950"
              : "bg-slate-800 text-slate-300"
          }`}>
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress bar track */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-lime-500 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Free AI Document Audit Callout */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <span className="text-lime-400 text-base">⚡</span>
            <span>
              <strong>Free AI Pre-Submission Audit:</strong> Check your files for missing clauses, format &amp; {photoSpec.size} photo compliance.
            </span>
          </div>

          <Link
            href={auditHref || "/visa-checklist/audit"}
            className="inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm shrink-0"
          >
            <span>Start Free AI Document Check</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* ── Filter Chips (Responsive) ── */}
      <div className="flex flex-wrap items-center gap-2 mb-6 print:hidden">
        <span className="text-xs font-bold text-slate-400 mr-1">Filter:</span>
        <button
          onClick={() => setFilterMode("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => setFilterMode("mandatory")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "mandatory"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Mandatory ({allItemsWithIds.filter(i => i.mandatory).length})
        </button>
        <button
          onClick={() => setFilterMode("pending")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "pending"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Remaining ({totalCount - checkedCount})
        </button>
      </div>

      {/* ── Sections & Items Checklist ── */}
      <div className="space-y-7">
        {checklistSections.map((section, sIdx) => {
          const visibleItems = section.items
            .map((item, iIdx) => ({
              ...item,
              id: `${sIdx}-${iIdx}`,
            }))
            .filter((item) => {
              if (filterMode === "mandatory") return item.mandatory;
              if (filterMode === "pending") return !checkedIds[item.id];
              return true;
            });

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-500" />
                  {section.title}
                </h3>
                {section.description && (
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {section.description}
                  </span>
                )}
              </div>

              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
                {visibleItems.map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-lime-50/40 text-slate-500"
                          : "bg-white hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      {/* Checkbox (min 44x44 touch target) */}
                      <div className="pt-0.5 shrink-0">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-lime-500 border-lime-600 text-slate-950 shadow-xs"
                              : "border-slate-300 bg-white group-hover:border-lime-500"
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-sm sm:text-base font-bold transition-all ${
                              isChecked ? "line-through text-slate-400 font-medium" : "text-slate-900"
                            }`}
                          >
                            {item.title}
                          </span>

                          {item.mandatory ? (
                            <span className="bg-red-50 text-red-700 border border-red-200/60 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md">
                              Mandatory
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md">
                              Recommended
                            </span>
                          )}

                          {item.toolCta && (
                            <span className="bg-lime-100 text-lime-800 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md flex items-center gap-1">
                              ⚡ Biometric Photo
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        {item.tips && (
                          <div className="mt-2 text-xs bg-amber-50/70 border border-amber-200/50 text-amber-900 p-2.5 rounded-xl flex items-start gap-1.5">
                            <span className="font-bold text-amber-600 shrink-0">💡 Tip:</span>
                            <span>{item.tips}</span>
                          </div>
                        )}

                        {item.toolCta && (
                          <div className="mt-3 print:hidden">
                            <Link
                              href={photoSpec.toolLink || "/passport-photo-online"}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-2xs transition-all"
                            >
                              <span>Create Compliant Photo ({photoSpec.size})</span>
                              <span className="text-sm">→</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Summary & CTA Card ── */}
      <div className="mt-8 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Application Status
          </span>
          <p className="text-sm font-extrabold text-slate-900">
            {checkedCount === totalCount ? "🎉 All Required Documents Checked!" : `${totalCount - checkedCount} documents remaining to prepare`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs"
          >
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Checklist</span>
          </button>
          
          <Link
            href={auditHref || "/visa-checklist/audit"}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-lime-600 hover:bg-lime-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-sm"
          >
            <span>Run Free AI Audit →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
