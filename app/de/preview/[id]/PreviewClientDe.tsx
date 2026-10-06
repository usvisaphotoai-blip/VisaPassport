"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getSpecById } from "@/lib/specs";
import { usePayment, LocalPrice } from "@/app/preview/[id]/hooks/usePayment";
import { de } from "../../translations";
import { germanCountryName, germanDocLabel } from "../../docLabels";

const Icon = ({ d, size = 16, stroke = 2, className = "" }: { d: string; size?: number; stroke?: number; className?: string }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path d={d} /></svg>
);

const ICONS = {
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zoom: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  close: "M18 6L6 18M6 6l12 12",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  warn: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  photo: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
};

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

export default function PreviewClientDe({
  photoId, previewUrl, documentType, metrics, localPrice: initialLocalPrice, expertPrice: initialExpertPrice, initialIsPaid,
}: {
  photoId: string; previewUrl: string; documentType: string; metrics: Record<string, unknown>; localPrice: LocalPrice; expertPrice: LocalPrice; initialIsPaid?: boolean;
}) {
  const { data: session, status } = useSession();
  const [hasPaid, setHasPaid] = useState(initialIsPaid || false);
  const [guestEmail, setGuestEmail] = useState("");
  const [localPrice, setLocalPrice] = useState<LocalPrice>(initialLocalPrice);
  const [expertPrice, setExpertPrice] = useState<LocalPrice>(initialExpertPrice);
  const [isExpertPlan, setIsExpertPlan] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const spec = getSpecById(documentType);
  const isVisa = spec?.name?.toLowerCase().includes("visa") || documentType.toLowerCase().includes("visa");
  const docCategory = isVisa ? "Visumfoto" : "Passbild";
  const countryName = spec ? germanCountryName(spec.flag, spec.country) : "";
  const productName = spec ? germanDocLabel({ id: documentType, label: spec.name, flag: spec.flag, country: spec.country }) : docCategory;

  const verifying = false;

  const { loading, handlePayment } = usePayment({
    photoId, localPrice: isExpertPlan ? expertPrice : localPrice, isExpert: isExpertPlan, guestEmail,
    status: status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated", session, setHasPaid,
  });

  const onPaymentClick = () => {
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(trimmed && trimmed.includes("@") && trimmed.includes("."));
    if (status !== "authenticated" && !isEmailValid) { setIsEmailDialogOpen(true); return; }
    handlePayment(trimmed);
  };

  const handleDialogSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(trimmed && trimmed.includes("@") && trimmed.includes("."));
    if (isEmailValid) {
      setEmailError("");
      setGuestEmail(trimmed);
      setIsEmailDialogOpen(false);
      handlePayment(trimmed);
    } else {
      setEmailError(de.errors.invalidEmail);
    }
  };

  useEffect(() => {
    if (!isZoomOpen && !isEmailDialogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsZoomOpen(false);
      setIsEmailDialogOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isZoomOpen, isEmailDialogOpen]);

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    if (!initialLocalPrice || (tzCurrency !== initialLocalPrice.currency && tzCurrency !== "USD")) {
      fetch(`/api/currency?currency=${tzCurrency}`).then((r) => r.json()).then((d) => { if (d?.formatted) setLocalPrice(d); }).catch(console.error);
      fetch(`/api/currency?currency=${tzCurrency}&isExpert=true`).then((r) => r.json()).then((d) => { if (d?.formatted) setExpertPrice(d); }).catch(console.error);
    }
  }, [initialLocalPrice]);

  const handleEmailPhoto = async () => {
    const emailTo = window.prompt(de.result.emailPrompt);
    if (!emailTo) return;
    try {
      const res = await fetch("/api/send-photo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: emailTo, photoUrl: previewUrl, documentType, photoId }) });
      alert(res.ok ? de.result.emailSent : de.result.emailFailed);
    } catch { alert(de.result.emailFailed); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          <div className="mb-3 text-center lg:text-left">
            <h1 className="text-2xl font-black text-slate-900">
              {de.preview.title} <span className="text-lime-700">{spec?.flag || ""} {countryName}</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left — Photo */}
            <div className="w-full lg:w-[62%] space-y-4">
              <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5"><span aria-hidden="true">{spec?.flag || "📄"}</span> {productName}</p>
                </div>
                <button type="button" aria-label={de.preview.zoomLabel} className="relative w-[calc(100%-2.5rem)] cursor-zoom-in group mx-5 mb-5 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center" onClick={() => setIsZoomOpen(true)} style={{ minHeight: 240 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt={de.preview.photoAlt} className="max-h-[420px] w-auto max-w-full object-contain select-none pointer-events-none block" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="bg-white rounded-full p-2.5 border border-slate-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"><Icon d={ICONS.zoom} size={18} className="text-slate-800" /></div>
                  </div>
                </button>
              </div>
              {/* What we fixed */}
              {metrics && !hasPaid && (
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center"><Icon d={ICONS.photo} size={14} className="text-lime-600" /></div>
                    <p className="text-sm font-bold text-slate-900">{de.preview.whatWeFixed}</p>
                  </div>
                  <div className="space-y-0">
                    {de.metricFixes.map((label, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 border-b border-slate-100 last:border-0">
                        <div className="w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0"><Icon d={ICONS.check} size={11} className="text-lime-600" stroke={2.5} /></div>
                        <span className="text-sm text-slate-700 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Order Panel */}
            <div className="w-full lg:w-[38%] space-y-4">
              <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden lg:sticky lg:top-24">
                <div className="p-5 sm:p-6">
                  {!hasPaid ? (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{de.payment.orderSummary} – {de.payment.acceptedFor}</p>
                      {/* Standard plan */}
                      <button type="button" aria-pressed={!isExpertPlan} onClick={() => setIsExpertPlan(false)} className={cx("w-full text-left rounded-xl border-2 p-4 transition-colors duration-200 relative", !isExpertPlan ? "border-lime-600 bg-lime-50" : "border-slate-200 bg-white hover:border-slate-300")}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{de.payment.standardPack}</h4>
                          <p className="text-xl font-black text-slate-900">{localPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1.5">
                          {de.payment.standardFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-600 font-medium"><Icon d={ICONS.check} size={12} className={!isExpertPlan ? "text-lime-700" : "text-slate-300"} stroke={2.5} />{f}</li>))}
                        </ul>
                      </button>
                      {/* Expert plan */}
                      <button type="button" aria-pressed={isExpertPlan} onClick={() => setIsExpertPlan(true)} className={cx("w-full text-left rounded-xl border-2 p-4 transition-colors duration-200 relative", isExpertPlan ? "border-lime-600 bg-lime-50" : "border-slate-200 bg-white hover:border-slate-300")}>
                        <div className="absolute -top-2.5 right-4 bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">{de.payment.mostPopular}</div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={cx("text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest", isExpertPlan ? "bg-lime-700 text-white" : "bg-slate-100 text-slate-600")}>{de.payment.expertReview}</span>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">{de.payment.premiumPack}</h4>
                          </div>
                          <p className="text-xl font-black text-slate-900">{expertPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1.5">
                          {de.payment.premiumFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-600 font-medium"><Icon d={ICONS.check} size={12} className={isExpertPlan ? "text-lime-700" : "text-slate-300"} stroke={2.5} />{f}</li>))}
                        </ul>
                        {isExpertPlan && (
                          <div className="mt-3 bg-lime-100 rounded-lg px-3 py-2 text-xs text-lime-900 font-semibold flex items-center gap-1.5">
                            <Icon d={ICONS.shield} size={12} className="text-lime-700 shrink-0" />{de.payment.moneyBack}
                          </div>
                        )}
                      </button>

                      {status !== "authenticated" && (
                        <div>
                          <label htmlFor="guest-email-de" className="block text-xs font-bold text-slate-600 mb-1.5">{de.payment.emailForDelivery}</label>
                          <input id="guest-email-de" type="email" autoComplete="email" inputMode="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder={de.payment.enterEmail} className="w-full px-3 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-base sm:text-sm focus:ring-2 focus:ring-lime-600 focus:border-transparent outline-none transition-all" />
                        </div>
                      )}

                      <div className="space-y-2 pt-1">
                        <button type="button" onClick={onPaymentClick} disabled={loading}
                          className={cx("w-full font-bold py-4 rounded-lg transition-colors text-base flex items-center justify-center gap-2.5 disabled:opacity-50", "bg-lime-700 hover:bg-lime-800 text-white")}>
                          {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (
                            <><Icon d={ICONS.download} size={16} className="shrink-0" />{isExpertPlan ? de.payment.getExpertReview : de.payment.downloadNow} — {isExpertPlan ? expertPrice?.formatted : localPrice?.formatted}</>
                          )}
                        </button>
                        <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                          {[{ icon: ICONS.shield, text: de.payment.secureCheckout }, { icon: ICONS.refresh, text: de.payment.refundIfRejected }, { icon: ICONS.lock, text: de.payment.ssl }].map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-slate-500"><Icon d={b.icon} size={12} /><span className="text-xs font-semibold">{b.text}</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-lime-50 rounded-xl p-5 text-center border-2 border-lime-200">
                        <div aria-hidden="true" className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎉</div>
                        <p className="text-lime-900 font-bold text-lg">{de.result.paymentSuccess}</p>
                        <p className="text-lime-800 text-sm mt-1">{de.result.photoReady}</p>
                      </div>
                      <a href={`/api/download/${photoId}`} download={`photo-${documentType}.jpeg`} className="w-full bg-lime-700 hover:bg-lime-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2.5 transition-colors text-base">
                        <Icon d={ICONS.download} size={16} />{docCategory} {de.result.download}
                      </a>
                      <a href={`/passport-photo-print-template-generator?imageUrl=${encodeURIComponent(`/api/download/${photoId}`)}&width=${spec?.width_mm || ""}&height=${spec?.height_mm || ""}&name=${encodeURIComponent(spec?.name || "")}`} className="w-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 rounded-lg flex items-center justify-center gap-2.5 transition-colors text-base">
                        <Icon d={ICONS.photo} size={16} className="shrink-0" />{de.result.customizePrint}
                      </a>
                      <a href={`/api/download-sheet/${photoId}`} download={`druckbogen-A4-${documentType}.jpeg`} className="w-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 rounded-lg flex items-center justify-center gap-2.5 transition-colors text-base">
                        <Icon d={ICONS.photo} size={16} />{de.result.downloadPrintSheet}
                      </a>
                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={handleEmailPhoto} className="border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5"><Icon d={ICONS.mail} size={14} />{de.result.emailMe}</button>
                        <button type="button" className="border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5"><Icon d={ICONS.star} size={14} />{de.result.rateUs}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <Link href="/de/passbild-online" className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                  {de.result.needAnother} <span className="underline">{de.result.uploadAgain}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      {isZoomOpen && (
        <div role="dialog" aria-modal="true" aria-label={de.preview.zoomLabel} className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(4,4,10,0.96)" }} onClick={() => setIsZoomOpen(false)}>
          <button type="button" autoFocus aria-label={de.preview.closeZoom} onClick={() => setIsZoomOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center hover:bg-white/15 transition-all"><Icon d={ICONS.close} size={16} className="text-white/70" /></button>
          <div onClick={(e) => e.stopPropagation()} style={{ animation: "zoomIn 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}>
            <div className="rounded-lg overflow-hidden ">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt={de.preview.photoAlt} draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-full h-auto block" />
            </div>
            <p className="text-center text-white/60 text-xs mt-4 tracking-widest uppercase">
              {hasPaid ? de.preview.fullResolution : de.preview.watermarkedPreview} · {de.preview.escToClose}
            </p>
          </div>
          <style>{`@keyframes zoomIn { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }`}</style>
        </div>
      )}

      {/* Mobile CTA */}
      {!hasPaid && !verifying && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            <div className="max-w-lg mx-auto">
              {status !== "authenticated" && (
                <div className="mb-2.5"><input type="email" autoComplete="email" inputMode="email" aria-label={de.payment.emailForDelivery} value={guestEmail || ""} onChange={(e) => setGuestEmail(e.target.value)} placeholder={de.payment.enterEmail} className="w-full px-3 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-lime-600 outline-none transition-all" /></div>
              )}
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide max-w-[9rem] truncate">{productName}</p>
                  <p className="text-lg font-black text-slate-900 leading-tight">{(isExpertPlan ? expertPrice : localPrice)?.formatted || "..."}</p>
                </div>
                <div className="w-px h-8 bg-slate-200 shrink-0" />
                <button type="button" onClick={onPaymentClick} disabled={loading}
                  className="flex-1 font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors bg-lime-700 hover:bg-lime-800 text-white">
                  {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (<><Icon d={ICONS.download} size={16} />{isExpertPlan ? de.payment.expertReview : de.payment.downloadNow}</>)}
                </button>
              </div>
              <p className="text-center text-[11px] text-slate-500 mt-2"><span aria-hidden="true">🔒</span> {de.payment.secureCheckout} · {de.payment.refundIfRejected} · {de.payment.noSubscription}</p>
            </div>
          </div>
          <div className="h-28 lg:hidden" />
        </>
      )}

      {/* Email dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div role="dialog" aria-modal="true" aria-labelledby="email-dialog-title" className="bg-white rounded-xl w-full max-w-sm overflow-hidden">
            <form onSubmit={handleDialogSubmit} noValidate className="p-6">
              <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4 mx-auto"><Icon d={ICONS.mail} size={22} className="text-lime-700" /></div>
              <h2 id="email-dialog-title" className="text-xl font-black text-slate-900 mb-2 text-center">{de.payment.whereToSend}</h2>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed text-center">{de.payment.enterEmailForReceipt}</p>
              <label htmlFor="email-dialog-input" className="sr-only">{de.payment.emailForDelivery}</label>
              <input id="email-dialog-input" type="email" autoComplete="email" inputMode="email" value={guestEmail} onChange={(e) => { setGuestEmail(e.target.value); if (emailError) setEmailError(""); }} placeholder={de.payment.enterEmail} aria-invalid={!!emailError} aria-describedby={emailError ? "email-dialog-error" : undefined} className={cx("w-full px-4 py-3.5 bg-white border-2 rounded-lg text-base focus:ring-2 focus:ring-lime-600 focus:border-transparent outline-none transition-all", emailError ? "border-red-400" : "border-slate-200")} autoFocus required />
              <p id="email-dialog-error" role="alert" className="min-h-[1.25rem] mt-1.5 mb-3 text-sm text-red-700">{emailError}</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setIsEmailDialogOpen(false); setEmailError(""); }} className="flex-1 border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-lg text-sm transition-colors">{de.payment.cancel}</button>
                <button type="submit" className="flex-1 bg-lime-700 hover:bg-lime-800 text-white font-bold py-3.5 rounded-lg text-sm transition-colors">{de.buttons.continue} →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
