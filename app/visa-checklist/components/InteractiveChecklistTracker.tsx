"use client";

import { useEffect, useState } from "react";
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
  photoSpec,
  auditHref,
}: Props) {
  // Flatten all items with unique IDs
  const allItemsWithIds = checklistSections.flatMap((section, sIdx) =>
    section.items.map((item, iIdx) => ({
      ...item,
      id: `${sIdx}-${iIdx}`,
    }))
  );

  const storageKey = `visa-checklist:${visaTitle}`;
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<"all" | "mandatory" | "pending">("all");

  // Restore saved progress after mount so server and client render the same markup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCheckedIds(JSON.parse(saved));
    } catch {}
  }, [storageKey]);

  const updateChecked = (next: Record<string, boolean>) => {
    setCheckedIds(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  const totalCount = allItemsWithIds.length;
  const mandatoryCount = allItemsWithIds.filter((i) => i.mandatory).length;
  const checkedCount = allItemsWithIds.filter((i) => checkedIds[i.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  const isComplete = totalCount > 0 && checkedCount === totalCount;

  const toggleItem = (id: string) => updateChecked({ ...checkedIds, [id]: !checkedIds[id] });

  const handleCheckAll = () =>
    updateChecked(Object.fromEntries(allItemsWithIds.map((item) => [item.id, true])));

  const filters = [
    { key: "all", label: "All", count: totalCount },
    { key: "mandatory", label: "Required", count: mandatoryCount },
    { key: "pending", label: "Remaining", count: totalCount - checkedCount },
  ] as const;

  return (
    <section id="checklist-tracker" className="scroll-mt-24">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Document checklist</h2>
          <p className="text-sm text-slate-500 mt-1">
            Tick documents off as you prepare them. Your progress is saved on this device.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 whitespace-nowrap print:hidden">
          <button
            onClick={isComplete ? () => updateChecked({}) : handleCheckAll}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isComplete ? "Reset" : "Mark all done"}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / PDF
          </button>
        </div>
      </div>

      {/* ── Progress + filters (sticky while scrolling the list) ── */}
      <div className="sticky top-16 z-10 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 mb-6 bg-white/95 backdrop-blur print:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">
            <strong className="font-semibold text-slate-900">{checkedCount}</strong> of {totalCount} ready
          </span>
          <span className={isComplete ? "font-medium text-emerald-700" : "text-slate-500"}>
            {isComplete ? "All done" : `${progressPercent}%`}
          </span>
        </div>
        <div
          className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Checklist progress"
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${isComplete ? "bg-emerald-500" : "bg-lime-500"}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterMode(f.key)}
              aria-pressed={filterMode === f.key}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterMode === f.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f.label} <span className={filterMode === f.key ? "text-slate-400" : "text-slate-400"}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="space-y-10">
        {checklistSections.map((section, sIdx) => {
          const visibleItems = section.items
            .map((item, iIdx) => ({ ...item, id: `${sIdx}-${iIdx}` }))
            .filter((item) => {
              if (filterMode === "mandatory") return item.mandatory;
              if (filterMode === "pending") return !checkedIds[item.id];
              return true;
            });

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title}>
              <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
              {section.description && (
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{section.description}</p>
              )}

              <ul className="mt-4 divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {visibleItems.map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);
                  const inputId = `check-${item.id}`;

                  return (
                    <li key={item.id} className={`transition-colors ${isChecked ? "bg-slate-50/70" : "bg-white hover:bg-slate-50/50"}`}>
                      <label htmlFor={inputId} className="flex items-start gap-3.5 p-4 sm:p-5 cursor-pointer">
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-lime-500 peer-focus-visible:ring-offset-2 ${
                            isChecked ? "bg-lime-500 border-lime-500 text-white" : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </span>

                        <span className="flex-1 min-w-0">
                          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className={`font-medium transition-colors ${isChecked ? "text-slate-400 line-through" : "text-slate-900"}`}>
                              {item.title}
                            </span>
                            {!item.mandatory && <span className="text-xs text-slate-400">Optional</span>}
                          </span>
                          <span className={`block text-sm leading-relaxed mt-1 ${isChecked ? "text-slate-400" : "text-slate-600"}`}>
                            {item.description}
                          </span>
                          {item.tips && !isChecked && (
                            <span className="block mt-2.5 text-sm text-slate-600 border-l-2 border-amber-300 pl-3">
                              <span className="font-medium text-slate-800">Tip: </span>
                              {item.tips}
                            </span>
                          )}
                        </span>
                      </label>

                      {item.toolCta && !isChecked && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[3.25rem] sm:pl-[3.5rem] -mt-1 print:hidden">
                          <Link
                            href={photoSpec.toolLink || "/passport-photo-online"}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-700 hover:text-lime-800"
                          >
                            Make a compliant photo{photoSpec.size ? ` (${photoSpec.size})` : ""} →
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-slate-50 print:hidden">
        <p className="text-sm text-slate-700">
          {isComplete
            ? "Everything is ticked off. Run a quick check before you submit."
            : `${totalCount - checkedCount} documents left to prepare.`}
        </p>
        <Link
          href={auditHref || "/visa-checklist/audit"}
          className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          Check my documents — free →
        </Link>
      </div>
    </section>
  );
}
