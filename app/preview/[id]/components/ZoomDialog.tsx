import React, { Dispatch, SetStateAction } from "react";
import { cx, SvgIcon } from "./SharedUI";

interface ZoomDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  previewUrl: string;
  hasPaid: boolean;
}

export default function ZoomDialog({
  isDialogOpen,
  setIsDialogOpen,
  previewUrl,
  hasPaid,
}: ZoomDialogProps) {
  if (!isDialogOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsDialogOpen(false)}
    >
      <button
        className="absolute top-5 right-5 w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200"
        onClick={() => setIsDialogOpen(false)}
        aria-label="Close dialog"
      >
        <SvgIcon d="M6 18L18 6M6 6l12 12" className="w-5 h-5" sw={2.5} />
      </button>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-[11px] font-semibold tracking-widest uppercase bg-white/5 px-4 py-1 rounded-full border border-white/10">
        High-Resolution Preview
      </div>
      <div
        className="relative w-full max-w-[90vw] md:max-w-lg max-h-[85vh] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.55)] cursor-zoom-out animate-in zoom-in-95 duration-200"
        onClick={(e) => {
          e.stopPropagation();
          setIsDialogOpen(false);
        }}
      >
        <div
          className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 p-4 md:p-5 rounded-3xl flex items-center justify-center"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src={previewUrl}
            alt="High resolution passport preview"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            className={cx(
              "max-w-full max-h-[75vh] object-contain bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.35)]",
              !hasPaid
                ? "pointer-events-none select-none"
                : "border border-slate-300",
            )}
          />
        </div>
      </div>
    </div>
  );
}
