"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { fr } from "../translations";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  showBeforeAfter?: boolean;
  showTrustBadges?: boolean;
  showAnimatedText?: boolean;
}

export default function HeroSectionFr({
  title,
  subtitle,
  description,
  ctaText = fr.buttons.getApprovedPhoto,
  ctaHref = "/fr/passport-photo-online?type=france-passport",
  showBeforeAfter = false,
  showTrustBadges = true,
  showAnimatedText = false,
}: HeroProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const calcPos = useCallback((clientX: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.min(97, Math.max(3, pct)));
      setHasInteracted(true);
    });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => { e.preventDefault(); setIsDragging(true); calcPos(e.clientX); }, [calcPos]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => calcPos(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [isDragging, calcPos]);

  const onTouchStart = useCallback((e: React.TouchEvent) => { setIsDragging(true); calcPos(e.touches[0].clientX); }, [calcPos]);

  useEffect(() => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const move = (e: TouchEvent) => { e.preventDefault(); calcPos(e.touches[0].clientX); };
    const end = () => setIsDragging(false);
    el.addEventListener("touchmove", move, { passive: false });
    el.addEventListener("touchend", end);
    return () => { el.removeEventListener("touchmove", move); el.removeEventListener("touchend", end); };
  }, [isDragging, calcPos]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-20 bg-gradient-to-b from-[#f8faf9] to-white">
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-lime-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${showBeforeAfter ? "lg:grid lg:grid-cols-2 lg:gap-12 items-center" : "max-w-3xl mx-auto text-center"}`}>
          <div className={showBeforeAfter ? "" : ""}>
            {/* Trust indicator */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">{fr.preview.aiVerification}</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {title}
            </h1>
            <p className="text-lg lg:text-xl font-medium text-lime-700 mb-4">{subtitle}</p>

            {showAnimatedText && (
              <div className="text-lg font-medium text-emerald-600 mb-4">{fr.hero.home.animText}</div>
            )}

            <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-lime-600 hover:bg-lime-700 shadow-xl shadow-lime-600/20 transition-all transform hover:-translate-y-1 hover:shadow-lime-600/40 relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {ctaText}
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {showTrustBadges && (
              <>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" /></svg>
                    ))}
                  </span>
                  <span className="text-sm text-slate-500 border-l border-slate-200 pl-2">{fr.trust.trustedBy}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {fr.trust.badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <span>{b.icon}</span><span>{b.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3 mt-6">
              {["Validation biométrique", "Suppression arrière-plan", "Téléchargement instantané", "Planches d'impression"].map((item, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After Slider */}
          {showBeforeAfter && (
            <div className="mt-12 lg:mt-0 flex justify-center lg:justify-end">
              <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                style={{
                  position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1",
                  width: "100%", maxWidth: "400px", touchAction: "none", userSelect: "none", WebkitUserSelect: "none",
                  cursor: isDragging ? "ew-resize" : "col-resize",
                  boxShadow: isDragging ? "0 0 0 3px rgba(37,99,235,0.35), 0 8px 40px rgba(0,0,0,0.18)" : "0 4px 32px rgba(0,0,0,0.13)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <Image src="/Photo_Passeport_france.webp" alt="Avant — photo originale" fill style={{ objectFit: "cover", objectPosition: "center top", pointerEvents: "none", zIndex: 0 }} priority sizes="(max-width: 1024px) 100vw, 500px" />
                <div style={{ position: "absolute", inset: 0, zIndex: 1, clipPath: `inset(0 0 0 ${sliderPos}%)`, willChange: "clip-path", pointerEvents: "none" }}>
                  <Image src="/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview.jpg" alt="Après — photo biométrique conforme" fill style={{ objectFit: "cover", objectPosition: "center 8%", pointerEvents: "none" }} priority sizes="(max-width: 1024px) 100vw, 500px" />
                </div>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${sliderPos}%`, width: "2px", background: "white", transform: "translateX(-50%)", zIndex: 2, pointerEvents: "none", boxShadow: "0 0 8px rgba(0,0,0,0.4)" }} />
                <div style={{ position: "absolute", top: "50%", left: `${sliderPos}%`, transform: `translate(-50%, -50%) scale(${isDragging ? 1.12 : 1})`, width: "48px", height: "48px", background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", zIndex: 3, pointerEvents: "none", boxShadow: isDragging ? "0 0 0 4px rgba(37,99,235,0.3), 0 4px 16px rgba(0,0,0,0.3)" : "0 2px 14px rgba(0,0,0,0.35)", transition: "box-shadow 0.15s, transform 0.1s" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
                <div style={{ position: "absolute", bottom: "14px", left: "14px", background: "rgba(0,0,0,0.62)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 4, opacity: sliderPos > 12 ? 1 : 0, transition: "opacity 0.2s" }}>Avant</div>
                <div style={{ position: "absolute", bottom: "14px", right: "14px", background: "rgba(16,185,129,0.92)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 4, opacity: sliderPos < 88 ? 1 : 0, transition: "opacity 0.2s" }}>Après ✓</div>
                <div style={{ position: "absolute", bottom: "50px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.58)", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 500, pointerEvents: "none", zIndex: 5, whiteSpace: "nowrap", opacity: hasInteracted ? 0 : 1, transition: "opacity 0.5s" }}>← glisser pour comparer →</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
