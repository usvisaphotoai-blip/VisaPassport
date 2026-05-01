import React from "react";
import { SvgIcon, DOWNLOAD_ICON } from "./SharedUI";
import { LocalPrice } from "../hooks/usePayment";

interface MobileStickyCTAProps {
  showExtras: boolean;
  localPrice: LocalPrice;
  expertPrice: LocalPrice;
  isExpertPlan: boolean;
  loading: boolean;
  handlePayment: () => void;
  status: string;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
}

export default function MobileStickyCTA({
  showExtras,
  localPrice,
  expertPrice,
  isExpertPlan,
  loading,
  handlePayment,
  status,
  guestEmail,
  setGuestEmail,
}: MobileStickyCTAProps) {
  if (!showExtras) return null;

  const emailInvalid = guestEmail && !guestEmail.includes("@");
  const activePrice = isExpertPlan ? expertPrice : localPrice;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] px-3.5 pt-2.5 pb-3">
        <div className="max-w-6xl mx-auto">
          {status !== "authenticated" && (
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-slate-500">
                  Email for your photo
                </span>
                {emailInvalid && (
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    @ required
                  </span>
                )}
              </div>
              <input
                type="email"
                value={guestEmail || ""}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent outline-none transition-all"
              />
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <div className="shrink-0 text-center min-w-[52px]">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Total
              </p>
              <p className="text-[17px] font-black text-slate-900 leading-tight">
                {activePrice?.formatted || "..."}
              </p>
            </div>

            <div className="w-px h-8 bg-slate-200 shrink-0" />

            <button
              onClick={handlePayment}
              disabled={loading || (status !== "authenticated" && (!guestEmail || !guestEmail.includes("@") || !guestEmail.includes(".")))}
              className={`flex-1 ${isExpertPlan ? 'bg-[#3b5bdb]' : 'bg-[#3b5bdb]'} hover:bg-[#2f4ac7] active:bg-[#203a9e] text-white font-bold py-2.5 px-4 rounded-lg text-sm tracking-wide flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#3b5bdb]/20`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <SvgIcon d={DOWNLOAD_ICON} className="w-4 h-4 shrink-0" />
                  {isExpertPlan ? "Expert Review" : "Download Photo"}
                </>
              )}
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-2">
            🔒 Secure · No subscription · Refund if rejected
          </p>
        </div>
      </div>
      <div className="h-24" />
    </>
  );
}