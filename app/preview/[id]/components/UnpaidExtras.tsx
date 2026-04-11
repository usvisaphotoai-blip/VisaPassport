import React, { useState } from "react";
import { cx, SvgIcon, CHECK_ICONS } from "./SharedUI";
import { ComplianceCheck } from "../hooks/useFaceVerification";
import { CountrySpec } from "@/lib/specs";

interface UnpaidExtrasProps {
  showExtras: boolean;
  checks: ComplianceCheck[];
  documentType: string;
  spec?: CountrySpec | undefined;
}

export default function UnpaidExtras({
  showExtras,
  checks,
  documentType,
  spec,
}: UnpaidExtrasProps) {
  const [reportEmail, setReportEmail] = useState("");
  const [sendingReport, setSendingReport] = useState(false);

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail) return;
    setSendingReport(true);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: reportEmail, checks, documentType }),
      });
      alert(
        res.ok
          ? "Validation report safely sent to your inbox!"
          : "Failed to send the report.",
      );
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setSendingReport(false);
      setReportEmail("");
    }
  };

  if (!showExtras) return null;

  return (
    <>
      {checks.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="bg-slate-200 text-slate-700 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                <SvgIcon
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Get your report emailed
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  We'll send you a copy of this compliance report so you can
                  reference it later or share it with family.
                </p>
                <form onSubmit={handleSendReport} className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    disabled={sendingReport}
                    className="flex-1 w-full text-sm rounded-lg border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 px-3 py-2 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={sendingReport}
                    className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-colors whitespace-nowrap sm:min-w-[120px]"
                  >
                    {sendingReport ? "Sending..." : "Send Report"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fear block */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 shadow-sm mt-4">
        <div className="flex items-center gap-2 mb-3">
          <SvgIcon
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            className="w-5 h-5 text-amber-600 shrink-0"
          />
          <h3 className="text-sm font-black text-amber-900">
            Don&apos;t Risk Rejection
          </h3>
        </div>
        <div className="space-y-2">
          {[
            [
              "30%",
              "of visa applications are delayed due to non-compliant photos",
            ],
            [
              "$0",
              "second chances for DV Lottery — a rejected photo means permanent disqualification",
            ],
            [
              "4-8 weeks",
              "additional processing time if you need to re-submit your application",
            ],
          ].map(([stat, text]) => (
            <div key={stat} className="flex items-start gap-2.5">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                {stat}
              </span>
              <p className="text-xs text-amber-800 leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>



      {/* Free vs Paid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mt-4">
        <h3 className="text-sm font-black text-slate-900 mb-3">
          What You Get
        </h3>
        <div className="space-y-1.5">
          {[
            ["Biometric compliance check", true],
            ["PASS/FAIL report", true],
            [`Background removal to ${spec?.bg_color || "white"}`, false],
            [`Auto-crop to ${spec?.width_px || 600}×${spec?.height_px || 600}px`, false],
            ["File optimization (<240KB)", false],
            ["A4 print sheet (20 photos)", false],
            ["HD download", false],
          ].map(([feature, free], i) => (
            <div
              key={i}
              className={cx(
                "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs",
                i % 2 === 0 ? "bg-slate-50" : "",
              )}
            >
              <span className="text-slate-700 font-medium">
                {feature as string}
              </span>
              <div className="flex items-center gap-4">
                {[free, true].map((has, j) => (
                  <span key={j} className="w-12 text-center">
                    <SvgIcon
                      d={has ? CHECK_ICONS.PASS : CHECK_ICONS.FAIL}
                      className={cx(
                        "w-4 h-4 mx-auto",
                        has ? "text-lime-500" : "text-slate-300",
                      )}
                      sw={has ? 2.5 : 2}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-2.5 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span />
            <div className="flex items-center gap-4">
              <span className="w-12 text-center">Free</span>
              <span className="w-12 text-center text-lime-600">Paid</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
