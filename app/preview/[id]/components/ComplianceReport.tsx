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
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      {passCount === checks.length && (
        <div className="bg-lime-50 border border-lime-200 rounded-xl p-3 mb-4 flex items-start gap-3">
          <span className="text-xl">{spec?.flag || "✅"}</span>
          <div>
            <p className="text-sm font-bold text-lime-800">
              Your photo PASSES all {spec?.name || "official"} requirements
            </p>
            <p className="text-xs text-lime-700 mt-0.5 font-medium">
              Download the official version now to avoid rejection or delays.
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900">Compliance Report</h3>
        <span className="text-xs font-bold text-lime-600">
          {passCount}/{checks.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {checks.map((check, i) => (
          <div
            key={i}
            className={cx(
              "flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs border",
              CHECK_COLORS[check.status].bg,
            )}
          >
            <SvgIcon
              d={CHECK_ICONS[check.status]}
              className={cx(
                "w-3.5 h-3.5 shrink-0",
                CHECK_COLORS[check.status].icon,
              )}
              sw={check.status === "WARN" ? 2 : 2.5}
            />
            <div className="min-w-0">
              <p className="font-bold text-slate-700 truncate">{check.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">
                {check.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
