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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* ── Photo Display Area — original light bg ── */}
          <div className="relative w-full md:w-[280px] shrink-0 p-5 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">

            {/* Outer premium frame */}
            <div className="relative w-full max-w-[240px]">

              {/* Clickable photo wrap */}
              <div
                className="pc-photo-wrap relative cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
                onContextMenu={(e) => e.preventDefault()}
                title="Click to enlarge"
              >
                {/* ── THE FRAME: gradient border + status glow ── */}
                <div
                  className={cx(
                    "pc-mat relative rounded-[6px] p-[3px]",
                    verifying
                      ? "pc-frame-scan"
                      : overallPass
                        ? "pc-frame-pass"
                        : "pc-frame-warn"
                  )}
                  style={{
                    background:
                      verifying
                        ? "linear-gradient(145deg, rgba(96,165,250,0.50) 0%, rgba(96,165,250,0.10) 100%)"
                        : overallPass
                          ? "linear-gradient(145deg, rgba(74,222,128,0.55) 0%, rgba(74,222,128,0.10) 100%)"
                          : "linear-gradient(145deg, rgba(251,191,36,0.50) 0%, rgba(251,191,36,0.10) 100%)",
                  }}
                >
                  {/* Inner white surface — the photo lives here */}
                  <div className="rounded-[4px] overflow-hidden bg-white" style={{ position: "relative", lineHeight: 0 }}>
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
                      <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center gap-3">
                        <div style={{ position: "relative", width: 36, height: 36 }}>
                          <div
                            style={{
                              position: "absolute", inset: 0,
                              borderRadius: "50%",
                              border: "2.5px solid rgba(0,0,0,0.07)",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute", inset: 0,
                              borderRadius: "50%",
                              border: "2.5px solid transparent",
                              borderTopColor: "#3b82f6",
                              animation: "pc-spin 800ms linear infinite",
                            }}
                          />
                        </div>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 m-0">
                          Analyzing
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Corner brackets — sit on top of the gradient border */}
                  {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                    <span
                      key={pos}
                      className={cx(
                        verifying
                          ? "pc-corner-scan"
                          : overallPass
                            ? "pc-corner-pass"
                            : "pc-corner-warn"
                      )}
                      style={{
                        position: "absolute",
                        width: 11,
                        height: 11,
                        borderStyle: "solid",
                        borderWidth: 0,
                        zIndex: 3,
                        ...(pos === "tl"
                          ? { top: -1, left: -1, borderTopWidth: 2.5, borderLeftWidth: 2.5, borderRadius: "4px 0 0 0" }
                          : pos === "tr"
                            ? { top: -1, right: -1, borderTopWidth: 2.5, borderRightWidth: 2.5, borderRadius: "0 4px 0 0" }
                            : pos === "bl"
                              ? { bottom: -1, left: -1, borderBottomWidth: 2.5, borderLeftWidth: 2.5, borderRadius: "0 0 0 4px" }
                              : { bottom: -1, right: -1, borderBottomWidth: 2.5, borderRightWidth: 2.5, borderRadius: "0 0 4px 0" }),
                      }}
                    />
                  ))}
                </div>

                {/* Zoom pill */}
                <div
                  className="pc-zoom-btn absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none"
                  style={{
                    background: "rgba(15,15,15,0.72)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    whiteSpace: "nowrap",
                  }}
                >

                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    Zoom
                  </span>
                </div>
              </div>
            </div>

            {/* Status pill under photo */}
            <div className="mt-4 mb-1">
              {verifying ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Scanning
                </span>
              ) : hasPaid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100">
                  <SvgIcon
                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    className="w-3 h-3"
                    sw={2}
                  />
                  Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-700 bg-white shadow-lg border border-slate-200/60 ring-4 ring-slate-50">
                  <SvgIcon
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    className="w-3.5 h-3.5 text-indigo-500"
                    sw={2}
                  />
                  Unlock after purchase
                </span>
              )}
            </div>
          </div>

          {/* ── Specifications Panel — unchanged ── */}
          <div className="flex-1 min-w-0 p-5 md:pl-1 md:pr-6 flex flex-col justify-center">
            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                <SvgIcon
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
                  className="w-4 h-4 text-white"
                  sw={1.5}
                />
              </span>
              Photo Specifications
            </h2>

            <div className="space-y-0">
              {[
                ["Resolution", "300 DPI", "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"],
                ["Background", spec?.bg_color || "White", "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"],
                ["Format", "JPEG, sRGB", "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"],
              ].map(([label, value, icon]) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-b-0"
                >
                  <span className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <SvgIcon d={icon} className="w-3.5 h-3.5 text-slate-400" sw={1.5} />
                    {label}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                    {value}
                    <CheckMark className="w-3.5 h-3.5 text-lime-500" />
                  </span>
                </div>
              ))}
            </div>

            {!verifying && (
              <div className="mt-4">
                <div
                  className={cx(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    overallPass
                      ? "bg-gradient-to-r from-lime-50 to-emerald-50 text-lime-700 ring-1 ring-lime-200/60"
                      : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/60"
                  )}
                >
                  <span
                    className={cx(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                      overallPass ? "bg-lime-500" : "bg-amber-500"
                    )}
                  >
                    <SvgIcon
                      d={overallPass ? "M4.5 12.75l6 6 9-13.5" : "M12 9v2m0 4h.01"}
                      className="w-3 h-3 text-white"
                      sw={3}
                    />
                  </span>
                  {overallPass
                    ? `All ${passCount} checks passed`
                    : `${passCount}/${checks?.length || 0} checks passed`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}