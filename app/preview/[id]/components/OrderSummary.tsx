import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { SvgIcon, CheckMark, DOWNLOAD_ICON, DownloadBtn } from "./SharedUI";
import { LocalPrice } from "../hooks/usePayment";
import ReviewModal from "./ReviewModal";
import { getSpecById } from "@/lib/specs";

interface OrderSummaryProps {
  productName: string;
  localPrice: LocalPrice;
  hasPaid: boolean;
  timeLeft: number;
  formatTime: (s: number) => string;
  loading: boolean;
  verifying: boolean;
  handlePayment: () => void;
  documentType: string;
  photoId: string;
  status: "authenticated" | "loading" | "unauthenticated";
  guestEmail: string;
  setGuestEmail: Dispatch<SetStateAction<string>>;
  expertPrice: LocalPrice;
  isExpertPlan: boolean;
  setIsExpertPlan: Dispatch<SetStateAction<boolean>>;
  handleEmailPhoto: () => void;
}

export default function OrderSummary({
  productName,
  localPrice,
  hasPaid,
  timeLeft,
  formatTime,
  loading,
  verifying,
  handlePayment,
  documentType,
  photoId,
  status,
  guestEmail,
  setGuestEmail,
  expertPrice,
  isExpertPlan,
  setIsExpertPlan,
  handleEmailPhoto,
}: OrderSummaryProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const spec = getSpecById(documentType);
  const flag = spec?.flag || "📄";

  return (
    <div className="w-full lg:w-[45%]">
      <div className="bg-white rounded-3xl border border-slate-100  overflow-hidden lg:sticky lg:top-6">
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Selected Document
              </h3>
              <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xl">{flag}</span>
                {productName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Time Left
              </p>
              <p className="text-base font-mono font-bold text-red-500">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {!hasPaid ? (
            <div className="space-y-4">
              {/* Plan Selection */}
              <div className="grid gap-3">
                {/* Basic Plan */}
                <button
                  onClick={() => setIsExpertPlan(false)}
                  className={`group relative flex flex-col text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    !isExpertPlan
                      ? "border-lime-500 bg-lime-50/30"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1 ${
                        !isExpertPlan ? "bg-lime-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        AI Basic
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Standard Pack</h4>
                    </div>
                    <p className="text-lg font-black text-slate-900">{localPrice?.formatted}</p>
                  </div>
                  
                  <ul className="space-y-1.5 mb-1">
                    {[
                      "AI Biometric Compliance Check",
                      "Automated Background Removal",
                      "Instant Digital Download",
                      "A4 Printable Photo Sheet"
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                        <CheckMark className={!isExpertPlan ? "text-lime-500" : "text-slate-300"} />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Expert Plan */}
                <button
                  onClick={() => setIsExpertPlan(true)}
                  className={`group relative flex flex-col text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isExpertPlan
                      ? "border-[#3b5bdb] bg-[#3b5bdb]/5"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 bg-[#3b5bdb] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-lg shadow-[#3b5bdb]/20">
                    MOST POPULAR
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1 ${
                        isExpertPlan ? "bg-[#3b5bdb] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        Expert Review
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Premium Pack</h4>
                    </div>
                    <p className="text-lg font-black text-slate-900">{expertPrice?.formatted}</p>
                  </div>
                  
                  <ul className="space-y-1.5">
                    {[
                      "Everything in Standard Pack",
                      "Human Expert Manual Review",
                      "Manual Correction of Subtle Errors",
                      "100% Acceptance Guaranteed"
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                        <CheckMark className={isExpertPlan ? "text-[#3b5bdb]" : "text-slate-300"} />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              </div>

              {/* Guest Email Field */}
              {status !== "authenticated" && (
                <div className="pt-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email for Delivery
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              {/* Action Button */}
              <div className="pt-1">
                <button
                  onClick={handlePayment}
                  disabled={loading || verifying}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl transition-all text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <SvgIcon d={DOWNLOAD_ICON} className="w-4 h-4 shrink-0" />
                      {isExpertPlan ? "Get Expert Review" : "Download Now"} &ndash; {isExpertPlan ? expertPrice?.formatted : localPrice?.formatted}
                    </>
                  )}
                </button>
                <p className="text-center text-[9px] text-slate-400 mt-3 font-medium flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1">
                    <SvgIcon d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" className="w-2.5 h-2.5" />
                    Refund if rejected
                  </span>
                  <span>•</span>
                  <span>Secure Checkout</span>
                </p>
              </div>
            </div>
          ) : (
            /* Paid View */
            <div className="space-y-4">
              <div className="bg-lime-50 rounded-2xl p-6 text-center border border-lime-100">
                <p className="text-lime-700 font-bold text-xl mb-1">Payment Successful!</p>
                <p className="text-lime-600 text-sm">Your photo is ready for download.</p>
              </div>
              
              <DownloadBtn
                href={`/api/download/${photoId}`}
                download={`studio-photo-${documentType}.jpeg`}
                className="bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white py-4"
              >
                Download Digital Photo
              </DownloadBtn>
              
              <DownloadBtn
                href={`/api/download-sheet/${photoId}`}
                download={`print-sheet-A4-${documentType}.jpeg`}
                className="bg-slate-800 hover:bg-slate-900 text-white py-4"
              >
                Download A4 Print Sheet
              </DownloadBtn>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={handleEmailPhoto}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <SvgIcon d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" className="w-4 h-4" />
                  Email Me
                </button>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  ⭐ Rate Us
                </button>
              </div>
              <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/tool"
          className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
        >
          Need another photo? <span className="underline">Upload again →</span>
        </Link>
      </div>
    </div>
  );
}
