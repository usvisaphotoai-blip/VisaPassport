import React from "react";
import { SvgIcon, DOWNLOAD_ICON } from "./SharedUI";
import { LocalPrice } from "../hooks/usePayment";

interface MobileStickyCTAProps {
  showExtras: boolean;
  localPrice: LocalPrice;
  loading: boolean;
  handlePayment: () => void;
  status: string;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
}

export default function MobileStickyCTA({
  showExtras,
  localPrice,
  loading,
  handlePayment,
  status,
  guestEmail,
  setGuestEmail,
}: MobileStickyCTAProps) {
  if (!showExtras) return null;

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] px-4 pt-3 pb-4">
        {status !== "authenticated" && (
          <div className="mb-3">
            <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
              <span>Email where we send your photo:</span>
              {guestEmail && !guestEmail.includes("@") && (
                <span className="text-red-500 font-bold uppercase tracking-widest text-[8px]">Required @</span>
              )}
            </p>
            <input
              type="email"
              value={guestEmail || ""}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="e.g. yourname@gmail.com"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent outline-none transition-all"
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">
              Total
            </p>
            <p className="text-lg font-black text-slate-900 leading-none">
              {localPrice?.formatted || "..."}
            </p>
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-[#3b5bdb] hover:bg-[#2f4ac7] active:bg-[#203a9e] text-white font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#3b5bdb]/20"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <SvgIcon d={DOWNLOAD_ICON} className="w-4 h-4 shrink-0" />{" "}
                Download Photo
              </>
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 font-medium mt-3">
          🔒 Secure payment · No subscription · 50% refund if rejected
        </p>
      </div>
      <div className="lg:hidden h-28" />
    </>
  );
}
