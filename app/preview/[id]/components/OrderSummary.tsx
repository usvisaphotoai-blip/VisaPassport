import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { SvgIcon, CheckMark, DOWNLOAD_ICON, DownloadBtn } from "./SharedUI";
import { LocalPrice } from "../hooks/usePayment";
import ReviewModal from "./ReviewModal";

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
  handleEmailPhoto,
}: OrderSummaryProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <div className="w-full lg:w-[45%]">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm lg:sticky lg:top-6">
        <div className="p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
            Order Summary
          </h3>

          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-900">
                {productName} — Digital
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                600×600 px · White BG · 300 DPI
              </p>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {localPrice?.formatted || "..."}
            </p>
          </div>

          {!hasPaid && (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between mt-3">
                <div>
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                    Limited Time Offer
                  </p>
                  <p className="text-sm font-black text-amber-700 mt-0.5">
                    Introductory price for early users
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 line-through text-xs font-bold mr-2">
                    {localPrice?.symbol || "$"}
                    {((localPrice?.amount || 5.99) * 2).toFixed(
                      (localPrice?.amount || 0) % 1 === 0 ? 0 : 2,
                    )}
                  </span>
                  <span className="text-lg font-black text-amber-600">
                    {localPrice?.formatted || "..."}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-xl px-3 py-2 mt-3">
                <SvgIcon
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  className="w-4 h-4 text-lime-600 shrink-0"
                />
                <p className="text-xs text-lime-800">
                  <span className="font-black">
                    CVS/Walgreens charges $16.99
                  </span>{" "}
                  for the same photo. You save{" "}
                  <span className="font-black">94%</span>.
                </p>
              </div>
            </>
          )}

          <div className="py-3 space-y-2.5 border-b border-slate-100 mt-3">
            {[
              "Auto-cropped 600×600 px photo",
              "White background applied",
              "Optimized under 240KB (DS-160)",
              "A4 print sheet (20 photos)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs">
                <CheckMark />{" "}
                <span className="text-slate-600 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 py-3 border-b border-slate-100">
            <SvgIcon
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              className="w-5 h-5 text-slate-400 shrink-0 mt-0.5"
              sw={1.5}
            />
            <div>
              <p className="text-xs font-bold text-slate-700">
                Money-back Guarantee
              </p>
              <p className="text-[10px] text-slate-400 leading-snug">
                50% refund if photo is rejected.{" "}
                <a href="/terms" className="underline hover:text-slate-600">
                  Terms
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-black text-slate-900 uppercase">
              Total
            </span>
            <span className="text-2xl font-black text-slate-900">
              {localPrice?.formatted || "..."}
            </span>
          </div>

          {!hasPaid && (
            <div className="py-3 mt-2 space-y-4 border-t border-slate-100">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-sm font-bold text-slate-800">
                  One-time payment: {localPrice?.formatted || "..."}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  No subscription &bull; No hidden charges
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                  After payment, you will:
                </p>
                <div className="space-y-1.5">
                  {[
                    "Download your approved US visa photo",
                    "Get instant compliance report",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-2 text-sm">
                      <CheckMark className="w-5 h-5 text-lime-500 shrink-0" />
                      <span className="text-slate-700 font-medium leading-tight">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-lime-50/50 rounded-xl p-3 border border-lime-100/50 space-y-2">
                {[
                  ["🔒", "Secure payment via Razorpay"],
                  ["💳", "Supports UPI, Cards, Wallets"],
                  ["🛡️", "100% safe & encrypted"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-xs">
                    <span className="text-base shrink-0">{icon}</span>
                    <span className="text-slate-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {hasPaid ? (
            <div className="space-y-3 mt-4">
              <div className="bg-lime-50 rounded-xl p-4 border border-lime-200 text-center">
                <p className="text-lime-700 font-bold text-lg">
                  🎉 Your photo is ready!
                </p>
              
              </div>
              <DownloadBtn
                href={`/api/download/${photoId}`}
                download={`studio-photo-${documentType}.jpeg`}
                className="bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white shadow-lg shadow-[#3b5bdb]/20 hover:-translate-y-0.5"
              >
                Download Phone Photo
              </DownloadBtn>
              <DownloadBtn
                href={`/api/download-sheet/${photoId}`}
                download={`print-sheet-A4-${documentType}.jpeg`}
                className="bg-slate-800 hover:bg-slate-900 text-white shadow-lg shadow-slate-800/20 hover:-translate-y-0.5"
              >
                Download Print Sheet (A4)
              </DownloadBtn>
              <a
                href={`https://api.whatsapp.com/send?text=I%20just%20created%20my%20US%20visa%20photo%20using%20USVisaPhotoAI.pro!%20Check%20it%20out:%20https://usvisaphotoai.pro`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.645-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Share via WhatsApp
              </a>
              <button
                onClick={handleEmailPhoto}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <SvgIcon
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  className="w-5 h-5"
                />
                Email Me My Photo
              </button>
              <button
                onClick={() => setIsReviewOpen(true)}
                className="w-full bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 shadow-sm text-slate-800 font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2 mt-1"
              >
                ⭐ Leave a Review
              </button>
              <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
            </div>
          ) : (
            <div className="mt-4">
              {status !== "authenticated" && (
                <div className="mb-4">
                  <label
                    htmlFor="guestEmail"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Get your report emailed
                  </label>
                  <input
                    type="email"
                    id="guestEmail"
                    value={guestEmail || ""}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email to receive your report"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                    Enter your email to receive your compliance report and access it anytime.
                  </p>
                </div>
              )}
              <button
                onClick={handlePayment}
                disabled={loading || verifying}
                className="w-full bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#3b5bdb]/20 hover:-translate-y-0.5 transition-all text-base tracking-wide flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : verifying ? (
                  "Verifying photo..."
                ) : (
                  <span className="flex items-center gap-2">
                    <SvgIcon d={DOWNLOAD_ICON} className="w-5 h-5" />
                    Download Approved Photo &ndash; {localPrice?.formatted || "..."}
                  </span>
                )}
              </button>
              {!verifying && (
                <p className="text-center text-xs font-medium text-slate-500 mt-3 flex items-center justify-center gap-1.5 border border-slate-200 bg-slate-50 py-1.5 px-3 rounded-full w-max mx-auto">
                  <SvgIcon
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    className="w-4 h-4 text-slate-400"
                  />
                  Pay only when you're satisfied with preview
                </p>
              )}
            </div>
          )}

          {!hasPaid && (
            <div className="mt-4 flex flex-col items-center justify-center gap-1 text-[10px] text-red-500 font-bold bg-red-50 border border-red-100 py-2.5 rounded-xl">
              <div className="flex items-center gap-1.5">
                <SvgIcon
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  className="w-3.5 h-3.5"
                />
                ⏳ Your processed photo will be deleted in 24 hours
              </div>
              <p className="font-medium opacity-80">Download it now before it expires</p>
            </div>
          )}

          <p className="text-[10px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            Processed securely by Razorpay
          </p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/tool"
          className="text-xs font-bold text-slate-500 hover:text-[#3b5bdb] flex items-center justify-center gap-1 group"
        >
          Need another photo? <span className="underline decoration-slate-300 group-hover:decoration-[#3b5bdb]">Upload again →</span>
        </Link>
      </div>
    </div>
  );
}
