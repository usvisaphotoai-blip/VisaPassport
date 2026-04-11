import React from "react";
import { CrossIcon, CheckIcon } from "./Icons";

interface ProcessingOverlayProps {
  isCropping: boolean;
  setIsCropping: (cropping: boolean) => void;
  cropMsg: string;
  setCropMsg: (msg: string) => void;
  selectedFile: File | null;
  previewUrl: string;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  isCropping,
  setIsCropping,
  cropMsg,
  setCropMsg,
  selectedFile,
  previewUrl,
}) => {
  if (!isCropping) return null;

  const steps = [
    { label: "Cropping", key: "crop" },
    { label: "Background removing", key: "background" },
    { label: "Resizing", key: "Applying" },
    { label: "Analyzing", key: "preview" },
  ];

  let activeIdx = 0;
  if (
    cropMsg.includes("background") ||
    cropMsg.includes("Removing") ||
    cropMsg.includes("Cloud API") ||
    cropMsg.includes("Local")
  )
    activeIdx = 1;
  else if (
    cropMsg.includes("crop") ||
    cropMsg.includes("Applying") ||
    cropMsg.includes("guidelines")
  )
    activeIdx = 2;
  else if (
    cropMsg.includes("preview") ||
    cropMsg.includes("Redirecting") ||
    cropMsg.includes("Generating")
  )
    activeIdx = 3;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden">

      {/* Close */}
      <button
        className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all z-30 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-slate-100"
        onClick={() => { setIsCropping(false); setCropMsg(""); }}
      >
        <CrossIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Keyframes */}
      <style>{`
        @keyframes scanPingPong {
          0% { top: -1%; opacity: 0; }
          4% { opacity: 1; }
          48% { top: 99%; opacity: 1; }
          52% { top: 99%; opacity: 1; }
          96% { top: -1%; opacity: 1; }
          100% { top: -1%; opacity: 0; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 0 0 rgba(99,102,241,0), inset 0 0 0 0 rgba(99,102,241,0); }
          50% { border-color: rgba(99,102,241,1); box-shadow: 0 0 30px 8px rgba(99,102,241,0.3), inset 0 0 8px 2px rgba(99,102,241,0.05); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes cornerPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        @keyframes gridFade {
          0% { opacity: 0; }
          30% { opacity: 0.12; }
          70% { opacity: 0.12; }
          100% { opacity: 0; }
        }
        @keyframes crosshairPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes overlayIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dotBounce { 
          0%, 80%, 100% { transform: translateY(0); } 
          40% { transform: translateY(-5px); } 
        }
      `}</style>

      {/* 
        Mobile: stacked vertically — photo on top, steps below
        Desktop: side-by-side — steps left, photo right
      */}
      <div
        className="flex flex-col lg:flex-row items-center gap-5 sm:gap-6 lg:gap-12 w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[1000px] px-5 sm:px-8 lg:px-12"
        style={{ animation: "overlayIn 0.35s ease-out" }}
      >

        {/* ─── Title (always on top on mobile) ─── */}
        <div className="w-full text-center lg:text-left lg:hidden">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Preparing your photo
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">AI magic in progress</p>
        </div>

        {/* ─── Photo Card (top on mobile, right on desktop) ─── */}
        <div className="order-1 lg:order-2 w-full lg:flex-1 flex items-center justify-center">
          <div
            className="relative"
            style={{ animation: "cardFloat 4.5s ease-in-out infinite" }}
          >
            {/* Pulsing border frame — BOLD glow */}
            <div
              className="absolute -inset-4 sm:-inset-5 border-[3px] border-dashed rounded-xl sm:rounded-2xl pointer-events-none"
              style={{ animation: "borderGlow 2s infinite ease-in-out" }}
            >
              {/* Corner brackets — large and vivid */}
              {[
                "-top-1.5 -left-1.5 border-t-[3px] border-l-[3px] rounded-tl-md",
                "-top-1.5 -right-1.5 border-t-[3px] border-r-[3px] rounded-tr-md",
                "-bottom-1.5 -left-1.5 border-b-[3px] border-l-[3px] rounded-bl-md",
                "-bottom-1.5 -right-1.5 border-b-[3px] border-r-[3px] rounded-br-md",
              ].map((pos, idx) => (
                <div
                  key={idx}
                  className={`absolute ${pos} w-5 h-5 sm:w-6 sm:h-6 border-indigo-500`}
                  style={{ animation: `cornerPulse 1.8s ease-in-out ${idx * 0.2}s infinite` }}
                />
              ))}
            </div>

            {/* The photo */}
            {selectedFile && (
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl ring-1 ring-slate-200/40">
                {/* 
                  Mobile: compact 200×256 
                  Tablet: 240×308
                  Desktop: 280×360+
                */}
                <img
                  src={previewUrl}
                  alt="Processing"
                  className="w-[200px] h-[256px] sm:w-[240px] sm:h-[308px] md:w-[260px] md:h-[336px] lg:w-[280px] lg:h-[360px] object-cover"
                />

                {/* Scan line — ping-pong */}
                <div
                  className="absolute left-0 w-full h-[2px] sm:h-[3px] pointer-events-none z-20"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 20%, rgba(255,255,255,0.9) 50%, rgba(99,102,241,0.7) 80%, transparent 100%)",
                    boxShadow: "0 0 24px 6px rgba(99,102,241,0.4), 0 0 48px 12px rgba(99,102,241,0.15)",
                    animation: "scanPingPong 4s ease-in-out infinite",
                    willChange: "top, opacity",
                  }}
                />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    animation: "gridFade 4s ease-in-out infinite",
                  }}
                />

                {/* Crosshair — bold and clearly visible */}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/8 via-transparent to-transparent pointer-events-none" />
              </div>
            )}


          </div>
        </div>

        {/* ─── Steps Timeline (below photo on mobile, left on desktop) ─── */}
        <div className="order-2 lg:order-1 w-full lg:flex-1">

          {/* Desktop-only title */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl xl:text-4xl font-black text-slate-900 leading-tight">
              Preparing your photo
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">Sit tight — AI magic in progress</p>
          </div>

          {/* Horizontal steps on mobile, vertical on desktop */}
          {/* Mobile: compact horizontal row */}
          <div className="flex lg:hidden items-center justify-center gap-1 w-full">
            {steps.map((step, i) => {
              const isDone = i < activeIdx;
              const isActive = i === activeIdx;
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0
                        ${isActive
                          ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                          : isDone
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        }
                      `}
                    >
                      {isDone ? <CheckIcon className="w-4 h-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-bold leading-tight text-center max-w-[64px] transition-colors duration-300 ${isActive ? "text-indigo-700" : isDone ? "text-emerald-600" : "text-slate-300"
                        }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-indigo-500" style={{ animation: "dotBounce 1.2s ease-in-out infinite" }} />
                        <div className="w-1 h-1 rounded-full bg-indigo-400" style={{ animation: "dotBounce 1.2s ease-in-out 0.2s infinite" }} />
                        <div className="w-1 h-1 rounded-full bg-indigo-300" style={{ animation: "dotBounce 1.2s ease-in-out 0.4s infinite" }} />
                      </div>
                    )}
                  </div>
                  {/* Connector line between steps */}
                  {i < steps.length - 1 && (
                    <div
                      className={`h-[2px] w-5 sm:w-8 mt-[-18px] rounded-full transition-colors duration-300 ${isDone ? "bg-gradient-to-r from-emerald-300 to-indigo-300" : "bg-slate-200"
                        }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Desktop: vertical timeline */}
          <div className="hidden lg:inline-flex flex-col items-start">
            {steps.map((step, i) => {
              const isDone = i < activeIdx;
              const isActive = i === activeIdx;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-4 transition-all duration-500 ${isActive ? "translate-x-1" : ""}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all duration-500 shrink-0
                        ${isActive
                          ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl shadow-indigo-500/40 scale-110"
                          : isDone
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-slate-50 text-slate-400 border-2 border-slate-200"
                        }
                      `}
                    >
                      {isDone ? <CheckIcon className="w-6 h-6" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 my-0.5 rounded-full transition-all duration-500 ${isDone ? "bg-gradient-to-b from-emerald-300 to-indigo-300"
                          : isActive ? "bg-gradient-to-b from-indigo-300 to-slate-200"
                            : "bg-slate-200"
                          }`}
                      />
                    )}
                  </div>
                  <div className="pt-2.5">
                    <span
                      className={`text-lg font-bold transition-all duration-500 ${isActive ? "text-indigo-700" : isDone ? "text-emerald-600" : "text-slate-300"
                        }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" style={{ animation: "dotBounce 1.2s ease-in-out infinite" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: "dotBounce 1.2s ease-in-out 0.2s infinite" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" style={{ animation: "dotBounce 1.2s ease-in-out 0.4s infinite" }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProcessingOverlay;
