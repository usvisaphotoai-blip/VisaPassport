"use client";

import { useId, useState } from "react";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i} className="border border-slate-100 rounded-xl sm:rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={open}
                aria-controls={panelId}
                className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime-500 group"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-lime-600 transition-colors pr-4 lg:pr-8 leading-tight">
                  {faq.q}
                </span>
                <span aria-hidden="true" className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  open ? "bg-lime-500 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-lime-50 group-hover:text-lime-600"
                }`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </span>
              </button>
            </h3>
            {/* grid-rows 0fr→1fr animates to the answer's real height, so long answers are never clipped */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-in-out ${
                open ? "grid-rows-[1fr] opacity-100 border-t border-slate-50" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 sm:p-5 lg:p-6 text-gray-500 text-xs sm:text-sm leading-relaxed bg-slate-50/30">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
