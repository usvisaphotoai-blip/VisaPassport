import React, { RefObject, Dispatch, SetStateAction } from "react";
import { cx, CheckMark, SvgIcon } from "./SharedUI";
import { ComplianceCheck } from "../hooks/useFaceVerification";
import { CountrySpec } from "@/lib/specs";

interface PhotoCardProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  overlayRef: RefObject<HTMLCanvasElement | null>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  verifying: boolean;
  hasPaid: boolean;
  overallPass: boolean;
  passCount: number;
  checks: ComplianceCheck[];
  spec?: CountrySpec | undefined;
}

export default function PhotoCard({
  canvasRef,
  overlayRef,
  setIsDialogOpen,
  verifying,
  hasPaid,
  overallPass,
  passCount,
  checks,
  spec,
}: PhotoCardProps) {
  return (
    <>
      <style>{`
        @keyframes pc-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pc-pulse-ring {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* Status-aware frame glow — sits on the gradient-border div */
        .pc-frame-pass {
          box-shadow:
            0 0 0 1px rgba(74,222,128,0.35),
            0 0 18px 0  rgba(74,222,128,0.20),
            0 8px 32px  rgba(0,0,0,0.10);
        }
        .pc-frame-warn {
          box-shadow:
            0 0 0 1px rgba(251,191,36,0.30),
            0 0 18px 0  rgba(251,191,36,0.15),
            0 8px 32px  rgba(0,0,0,0.10);
        }
        .pc-frame-scan {
          box-shadow:
            0 0 0 1px rgba(96,165,250,0.35),
            0 0 18px 0  rgba(96,165,250,0.22),
            0 8px 32px  rgba(0,0,0,0.10);
          animation: pc-pulse-ring 1.4s ease-in-out infinite;
        }

        /* Corner brackets colour per state */
        .pc-corner-pass  { border-color: rgba(74,222,128,0.70); }
        .pc-corner-warn  { border-color: rgba(251,191,36,0.60); }
        .pc-corner-scan  { border-color: rgba(96,165,250,0.70); }

        /* Hover scale on the mat */
        .pc-photo-wrap:hover .pc-mat {
          transform: scale(1.025);
        }
        .pc-mat {
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Zoom pill */
        .pc-zoom-btn {
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .pc-photo-wrap:hover .pc-zoom-btn {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="bg-white rounded-3xl  overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* ── Photo Display Area ── */}
          <div className="relative w-full md:w-[260px] bg-slate-50 shrink-0 p-6 flex flex-col items-center justify-center">

            {/* Outer premium frame */}
            <div className="relative w-full max-w-[260px]">

              {/* Clickable photo wrap */}
              <div
                className="pc-photo-wrap relative cursor-pointer group"
                onClick={() => setIsDialogOpen(true)}
                onContextMenu={(e) => e.preventDefault()}
                title="Click to enlarge"
              >
                {/* ── THE FRAME ── */}
                <div
                  className={cx(
                    "pc-mat relative rounded-xl p-[2.5px] transition-all duration-300",
                    verifying
                      ? "pc-frame-scan bg-blue-100"
                      : overallPass
                        ? "bg-slate-300"
                        : "bg-amber-100"
                  )}
                >
                  {/* Inner white surface */}
                  <div className="rounded-[9px] overflow-hidden bg-white shadow-inner" style={{ position: "relative", lineHeight: 0 }}>
                    <canvas
                      ref={canvasRef}
                      className="w-full h-auto bg-white select-none pointer-events-none block"
                    />
                    <canvas
                      ref={overlayRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />

                    {/* Verifying overlay */}
                    {verifying && (
                      <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-2.5">
                        <div className="w-7 h-7 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        <p className="text-[9px] font-bold tracking-widest uppercase text-blue-500">
                          Scanning
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Zoom icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/5 rounded-xl">
                   <div className="bg-white/90 p-1.5 rounded-full shadow-sm">
                      <SvgIcon d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196 7.5 7.5 0 0010.607 10.607z" className="w-3.5 h-3.5 text-slate-900" />
                   </div>
                </div>
              </div>
            </div>

            {/* Status pill under photo */}
            <div className="mt-5">
              {verifying ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50">
                  <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                  AI Verification
                </span>
              ) : hasPaid ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50">
                  <SvgIcon d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-3 h-3" />
                  Ready
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-100 shadow-sm">
                  <SvgIcon d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" className="w-3 h-3 text-slate-400" />
                  Preview
                </span>
              )}
            </div>
          </div>

          {/* ── Specifications Panel ── */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Official Specs
            </h2>

            <div className="grid gap-3">
              {[
                ["Resolution", spec?.dpi ? `${spec.dpi} DPI` : "300 DPI"],
                ["Format", "Digital JPEG"],
                ["Color Space", "sRGB"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{value}</span>
                    <CheckMark className="w-3.5 h-3.5 text-lime-500 shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {!verifying && (
              <div className="mt-6 pt-6 border-t border-slate-50">
                <div
                  className={cx(
                    "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-bold transition-all",
                    overallPass
                      ? "bg-lime-50 text-lime-700"
                      : "bg-amber-50 text-amber-700"
                  )}
                >
                  <span className={cx(
                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    overallPass ? "bg-lime-500" : "bg-amber-500"
                  )}>
                    <SvgIcon
                      d={overallPass ? "M4.5 12.75l6 6 9-13.5" : "M12 9v2m0 4h.01"}
                      className="w-3 h-3 text-white shrink-0"
                      sw={3}
                    />
                  </span>
                  <div>
                    <p>{overallPass ? "Biometric Match Found" : "Minor Issues Detected"}</p>
                    <p className="text-[9px] opacity-70 font-medium">
                      {passCount}/{checks?.length || 0} criteria satisfied
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}