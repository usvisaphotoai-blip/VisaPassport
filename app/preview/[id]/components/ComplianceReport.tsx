import React from "react";
import { cx, CHECK_COLORS, CHECK_ICONS, SvgIcon } from "./SharedUI";
import { ComplianceCheck } from "../hooks/useFaceVerification";
import { CountrySpec } from "@/lib/specs";

interface ComplianceReportProps {
  verifying: boolean;
  checks: ComplianceCheck[];
  passCount: number;
  spec?: CountrySpec | undefined;
}

export default function ComplianceReport({
  verifying,
  checks,
  passCount,
  spec,
}: ComplianceReportProps) {
  if (verifying || !checks || checks.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 ">
      {passCount === checks.length && (
        <div className="bg-lime-50/50 border border-lime-100 rounded-2xl p-3.5 mb-5 flex items-start gap-3">
          <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center shrink-0 text-base">
            {spec?.flag || "✅"}
          </div>
          <div>
            <p className="text-[13px] font-bold text-lime-900 leading-tight">
              Biometric Validation Successful
            </p>
            <p className="text-[11px] text-lime-700 mt-0.5 font-medium leading-relaxed">
              Meets requirements for {spec?.name}. Safe to download.
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Report</h3>
        <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
          {passCount}/{checks.length} PASSED
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {checks.map((check, i) => (
          <div
            key={i}
            className={cx(
              "flex flex-col gap-0.5 px-3 py-2 rounded-xl border transition-all duration-200",
              CHECK_COLORS[check.status].bg,
              "border-transparent"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-700 truncate">{check.name}</p>
              <SvgIcon
                d={CHECK_ICONS[check.status]}
                className={cx(
                  "w-3.5 h-3.5 shrink-0",
                  CHECK_COLORS[check.status].icon,
                )}
                sw={check.status === "WARN" ? 2 : 2.5}
              />
            </div>
            <p className="text-[9px] text-slate-400 font-medium">
              {check.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
