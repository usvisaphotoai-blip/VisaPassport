"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getSpecById } from "@/lib/specs";
import { usePayment, LocalPrice } from "@/app/preview/[id]/hooks/usePayment";
import { de } from "../../translations";
import { ExpertsFixModal } from "@/app/preview/[id]/PreviewClient";
import { PREVIEW_STRINGS_DE } from "@/lib/preview-strings-localized";
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
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
};

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

function DedicatedSupportBanner() {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 text-white shadow-md">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-lime-950/60 border border-lime-500/30 flex items-center justify-center shrink-0 shadow-inner">
          <Icon d={ICONS.mail} size={22} className="text-lime-400" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">E-Mail-Support rund um die Uhr</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#134e4a]/70 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live 24/7
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">Fragen zu Ihrem Foto oder Ihrer Bestellung? Unser Support-Team hilft Ihnen jederzeit per E-Mail weiter.</p>
          <div className="pt-1 flex flex-wrap items-center gap-3.5">
            <a href="mailto:support@pixpassport.com" className="inline-flex items-center gap-2 bg-[#84cc16] hover:bg-[#74b816] active:scale-[0.98] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-lime-500/20">
              <Icon d={ICONS.mail} size={15} className="text-white" /><span>support@pixpassport.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium"><Icon d={ICONS.clock} size={14} className="text-lime-400" /><span>Antwort in unter 15 Min.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  const t = PREVIEW_STRINGS_DE;

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
    <div lang="de" className="min-h-screen bg-slate-200/40 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-4 sm:py-5">
        <div className="w-full max-w-6xl">
          <div className="mb-3 text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {de.preview.title} <span className="text-lime-600">{spec?.flag || ""} {countryName}</span>
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 mt-2 flex-wrap">
              <a href="mailto:support@pixpassport.com" className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4fde6] border border-[#a3e635] rounded-full text-xs font-semibold text-slate-900 hover:bg-[#ecfccb] transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <Icon d={ICONS.mail} size={13} className="text-lime-700 shrink-0" />
                <span>24/7 E-Mail-Support: <span className="underline font-bold">support@pixpassport.com</span></span>
              </a>
              <div className="flex items-center gap-1.5 text-slate-600 text-xs sm:text-sm font-semibold">
                <Icon d={ICONS.shield} size={14} className="text-emerald-600 shrink-0" />
                <span>{de.payment.refundIfRejected}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left — Photo */}
            <div className="w-full lg:w-[62%] space-y-3">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5"><span aria-hidden="true">{spec?.flag || "📄"}</span> {productName}</p>
                </div>
                <button type="button" aria-label={de.preview.zoomLabel} className="relative w-[calc(100%-2rem)] cursor-zoom-in group mx-4 mb-4 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center" onClick={() => setIsZoomOpen(true)} style={{ minHeight: 200 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt={de.preview.photoAlt} className="max-h-[320px] lg:max-h-[360px] w-auto max-w-full object-contain select-none pointer-events-none block" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="bg-white rounded-full p-2.5 border border-slate-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"><Icon d={ICONS.zoom} size={18} className="text-slate-800" /></div>
                  </div>
                </button>
              </div>
              {/* What we fixed */}
              {metrics && !hasPaid && (
                <div className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center"><Icon d={ICONS.photo} size={14} className="text-lime-600" /></div>
                    <p className="text-sm font-bold text-slate-900">{de.preview.whatWeFixed}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {de.metricFixes.map((label, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-slate-100">
                        <div className="w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0"><Icon d={ICONS.check} size={11} className="text-lime-600" stroke={2.5} /></div>
                        <span className="text-[13px] text-slate-700 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 rounded-xl bg-lime-50 border border-lime-200 px-3 py-2.5 flex items-start gap-2">
                    <Icon d={ICONS.star} size={13} className="text-lime-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-lime-700 font-medium leading-relaxed">✓ Hintergrund professionell an die amtlichen Vorgaben angepasst</p>
                  </div>
                </div>
              )}
              <div className="hidden lg:block"><DedicatedSupportBanner /></div>
            </div>

            {/* Right — Order Panel */}
            <div className="w-full lg:w-[38%] space-y-3">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden lg:sticky lg:top-4">
                <div className="p-4 sm:p-5">
                  {!hasPaid ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon d={ICONS.shield} size={14} className="text-emerald-600 shrink-0" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{de.payment.orderSummary} – {de.payment.acceptedFor}</p>
                      </div>
                      {/* Standard plan */}
                      <button type="button" aria-pressed={!isExpertPlan} onClick={() => setIsExpertPlan(false)} className={cx("w-full text-left rounded-xl border-2 p-3 transition-colors duration-150 relative", !isExpertPlan ? "border-emerald-500 bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300")}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{de.payment.standardPack}</h4>
                          <p className="text-xl font-black text-slate-900">{localPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1">
                          {de.payment.standardFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-[13px] text-slate-600 font-medium"><Icon d={ICONS.check} size={12} className={!isExpertPlan ? "text-emerald-600" : "text-slate-300"} stroke={2.5} />{f}</li>))}
                        </ul>
                      </button>
                      {/* Expert plan */}
                      <button type="button" aria-pressed={isExpertPlan} onClick={() => setIsExpertPlan(true)} className={cx("w-full text-left rounded-2xl border-2 p-3 sm:p-4 transition-all duration-200 relative", isExpertPlan ? "border-lime-500 bg-lime-50/30 shadow-[0_0_0_1px_rgba(132,204,22,0.2)]" : "border-slate-200 bg-white hover:border-lime-300")}>
                        <div className="absolute -top-3 right-5 bg-[#ff9500] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider z-10">{de.payment.mostPopular}</div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="inline-block bg-lime-100 text-lime-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">{de.payment.expertReview}</span>
                            <h4 className="text-lg font-bold text-slate-900 mt-1">{de.payment.premiumPack}</h4>
                          </div>
                          <p className="text-2xl font-black text-slate-900">{expertPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1">
                          {de.payment.premiumFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-[13.5px] text-slate-700 font-medium"><Icon d={ICONS.check} size={12} className="text-emerald-500 shrink-0" stroke={3} />{f}</li>))}
                        </ul>
                        <div role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setIsExpertPlan(true); startTransition(() => setIsFixModalOpen(true)); }} className="mt-3 bg-lime-50/80 border border-lime-200/90 rounded-xl p-3 flex items-center justify-between gap-3 group/fix hover:bg-lime-100/70 transition-colors cursor-pointer">
                          <div className="space-y-1.5">
                            <h5 className="text-sm font-bold text-slate-900 leading-tight group-hover/fix:text-lime-700 transition-colors">{t.seeExpertsFix}</h5>
                            <div className="flex items-center">
                              <div className="flex -space-x-2 overflow-hidden py-0.5">
                                {["photo-1534528741775-53994a69daeb", "photo-1507003211169-0a1dd7228f2d", "photo-1494790108377-be9c29b29330", "photo-1500648767791-00dcc994a43e", "photo-1573496359142-b8d87734a5a2"].map((id) => (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img key={id} src={`https://images.unsplash.com/${id}?w=100&auto=format&fit=crop&q=80`} alt={t.customerAvatarAlt} className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
                                ))}
                              </div>
                              <span className="text-xs font-semibold text-slate-600 ml-2.5">+2.7k</span>
                            </div>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-emerald-500 group-hover/fix:bg-emerald-600 text-white flex items-center justify-center shrink-0"><Icon d={ICONS.arrowRight} size={16} stroke={2.5} /></div>
                        </div>
                        {isExpertPlan && (
                          <div className="mt-3 bg-lime-50/80 border border-lime-200/90 rounded-xl px-3 py-2.5 text-xs text-lime-900 font-semibold flex items-center gap-1.5">
                            <Icon d={ICONS.shield} size={12} className="text-lime-700 shrink-0" />{de.payment.moneyBack}
                          </div>
                        )}
                      </button>

                      {status !== "authenticated" && (
                        <div>
                          <label htmlFor="guest-email-de" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{de.payment.emailForDelivery}</label>
                          <input id="guest-email-de" type="email" autoComplete="email" inputMode="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder={de.payment.enterEmail} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-all" />
                        </div>
                      )}

                      <div className="space-y-2 pt-1">
                        <button type="button" onClick={onPaymentClick} disabled={loading}
                          className={cx("w-full font-bold py-3.5 rounded-xl transition-colors text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-50", isExpertPlan ? "bg-lime-600 hover:bg-lime-700 text-white shadow-md shadow-lime-600/20" : "bg-slate-900 hover:bg-black text-white")}>
                          {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (
                            <><Icon d={ICONS.lock} size={15} className="shrink-0" />{isExpertPlan ? de.payment.getExpertReview : de.payment.downloadNow} — {isExpertPlan ? expertPrice?.formatted : localPrice?.formatted}</>
                          )}
                        </button>
                        <div className="flex items-center justify-center gap-x-5 gap-y-1.5 py-2 flex-wrap border-t border-slate-100 mt-2">
                          {[{ icon: ICONS.shield, text: de.payment.secureCheckout }, { icon: ICONS.refresh, text: de.payment.refundIfRejected }, { icon: ICONS.lock, text: de.payment.ssl }].map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-slate-500"><Icon d={b.icon} size={13} className="text-emerald-600" /><span className="text-[11px] font-semibold">{b.text}</span></div>
                          ))}
                        </div>
                        <div className="hidden lg:flex justify-center pt-1">
                          <a href="https://razorpay.com/" target="_blank" rel="noopener noreferrer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img referrerPolicy="origin" src="https://badges.razorpay.com/badge-dark.png" style={{ height: 40, width: 100 }} alt="Razorpay | Payment Gateway | Neobank" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-200">
                        <div aria-hidden="true" className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                        <p className="text-emerald-800 font-semibold text-xl">{de.result.paymentSuccess}</p>
                        <p className="text-emerald-600 text-sm mt-1">{de.result.photoReady}</p>
                      </div>
                      <a href={`/api/download/${photoId}`} download={`photo-${documentType}.jpeg`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
                        <Icon d={ICONS.download} size={16} />{docCategory} {de.result.download}
                      </a>
                      <a href={`/passport-photo-print-template-generator?imageUrl=${encodeURIComponent(`/api/download/${photoId}`)}&width=${spec?.width_mm || ""}&height=${spec?.height_mm || ""}&name=${encodeURIComponent(spec?.name || "")}`} className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
                        <Icon d={ICONS.photo} size={16} className="shrink-0" />{de.result.customizePrint}
                      </a>
                      <a href={`/api/download-sheet/${photoId}`} download={`druckbogen-A4-${documentType}.jpeg`} className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
                        <Icon d={ICONS.photo} size={16} />{de.result.downloadPrintSheet}
                      </a>
                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={handleEmailPhoto} className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5"><Icon d={ICONS.mail} size={14} />{de.result.emailMe}</button>
                        <button type="button" className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5"><Icon d={ICONS.star} size={14} />{de.result.rateUs}</button>
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
        <div role="dialog" aria-modal="true" aria-label={de.preview.zoomLabel} className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-md select-none" onClick={() => setIsZoomOpen(false)}>
          <button type="button" autoFocus aria-label={de.preview.closeZoom} onClick={() => setIsZoomOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/15 shadow-lg"><Icon d={ICONS.close} size={18} className="text-white" /></button>
          <div className="relative max-w-full max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-white/15 shadow-2xl flex items-center justify-center max-w-[92vw] sm:max-w-[80vw] md:max-w-[560px] max-h-[75vh] sm:max-h-[80vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt={de.preview.photoAlt} draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-auto h-auto max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain block select-none pointer-events-none" />
              {!hasPaid && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                  <span className="text-white/20 text-xs sm:text-sm md:text-base font-black tracking-[0.35em] uppercase drop-shadow" style={{ transform: "rotate(-30deg)" }}>Nur Vorschau</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-4 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-white/80 text-[11px] sm:text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              <span>{hasPaid ? de.preview.fullResolution : de.preview.watermarkedPreview}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">{de.preview.escToClose}</span>
            </div>
          </div>
        </div>
      )}

      <ExpertsFixModal
        isOpen={isFixModalOpen}
        onClose={() => setIsFixModalOpen(false)}
        onContinue={(email: string) => { setIsExpertPlan(true); setIsFixModalOpen(false); if (email) setGuestEmail(email); handlePayment((email || guestEmail).trim()); }}
        expertPrice={expertPrice?.formatted}
        previewUrl={previewUrl}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        status={status === "authenticated" ? "authenticated" : "unauthenticated"}
        t={t}
      />

      {/* Mobile CTA */}
      {!hasPaid && !verifying && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            <div className="max-w-lg mx-auto">
              {status !== "authenticated" && (
                <div className="mb-2.5"><input type="email" autoComplete="email" inputMode="email" aria-label={de.payment.emailForDelivery} value={guestEmail || ""} onChange={(e) => setGuestEmail(e.target.value)} placeholder={de.payment.enterEmail} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all" /></div>
              )}
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest max-w-[9rem] truncate">{productName}</p>
                  <p className="text-lg font-black text-slate-900 leading-tight">{(isExpertPlan ? expertPrice : localPrice)?.formatted || "..."}</p>
                </div>
                <div className="w-px h-8 bg-slate-200 shrink-0" />
                <button type="button" onClick={onPaymentClick} disabled={loading}
                  className="flex-1 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (<><Icon d={ICONS.lock} size={15} />{isExpertPlan ? de.payment.expertReview : de.payment.downloadNow}</>)}
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2.5"><Icon d={ICONS.shield} size={12} className="text-emerald-600 shrink-0" /><p className="text-center text-[11px] text-slate-500 font-semibold">{de.payment.secureCheckout} · {de.payment.refundIfRejected} · {de.payment.noSubscription}</p></div>
            </div>
          </div>
          <div className="h-28 lg:hidden" />
        </>
      )}

      {/* Email dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 px-4">
          <div role="dialog" aria-modal="true" aria-labelledby="email-dialog-title" className="bg-white rounded-2xl w-full max-w-sm overflow-hidden border border-slate-200">
            <form onSubmit={handleDialogSubmit} noValidate className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto"><Icon d={ICONS.mail} size={22} className="text-lime-600" /></div>
              <h2 id="email-dialog-title" className="text-xl font-black text-slate-900 mb-2 text-center">{de.payment.whereToSend}</h2>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed text-center">{de.payment.enterEmailForReceipt}</p>
              <label htmlFor="email-dialog-input" className="sr-only">{de.payment.emailForDelivery}</label>
              <input id="email-dialog-input" type="email" autoComplete="email" inputMode="email" value={guestEmail} onChange={(e) => { setGuestEmail(e.target.value); if (emailError) setEmailError(""); }} placeholder={de.payment.enterEmail} aria-invalid={!!emailError} aria-describedby={emailError ? "email-dialog-error" : undefined} className={cx("w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all", emailError ? "border-red-400" : "border-slate-200")} autoFocus required />
              <p id="email-dialog-error" role="alert" className="min-h-[1.25rem] mt-1.5 mb-3 text-sm text-red-700">{emailError}</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setIsEmailDialogOpen(false); setEmailError(""); }} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-colors">{de.payment.cancel}</button>
                <button type="submit" className="flex-1 bg-lime-600 hover:bg-lime-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">{de.buttons.continue} →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
