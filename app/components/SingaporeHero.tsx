"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🇸🇬", text: "100% ICA Compliant" },
  { icon: "🆓", text: "Free Validation" },
];

interface SingaporeHeroProps {
  badgeText?: string;
  h1?: string;
  subtitle?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageAltAfter?: string;
  imageAltBefore?: string;
}

export default function SingaporeHero({
  badgeText = "Official Singapore ICA Standard · 413 × 531 px",
  h1 = "Resize Singapore Passport Photo Online",
  subtitle = "Create 100% ICA-compliant 35 × 45 mm (413 × 531 px) biometric photos in 30 seconds.",
  description = "Automated AI background whitening to pure white, 70%–80% chin-to-crown head ratio, and exact 413 × 531 px dimensions for MyICA, NRIC, MOM Work Passes, and Visas.",
  primaryCtaText = "Resize Singapore Photo Now →",
  primaryCtaHref = "/passport-photo-online?type=singapore-passport",
  secondaryCtaText = "View ICA Photo Rules",
  secondaryCtaHref = "/singapore-passport-photo-editor",
  imageAltAfter = "Singapore passport photo with pure white background",
  imageAltBefore = "Original photo before Singapore passport resizing",
}: SingaporeHeroProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
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
    });
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      calcPos(e.clientX);
    },
    [calcPos]
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => calcPos(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, calcPos]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      calcPos(e.touches[0].clientX);
    },
    [calcPos]
  );

  useEffect(() => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const move = (e: TouchEvent) => {
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    };
    const end = () => setIsDragging(false);
    el.addEventListener("touchmove", move, { passive: false });
    el.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", end);
    };
  }, [isDragging, calcPos]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <section className="bg-white border-b border-slate-200">
      {/* Singapore top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-700 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* ── TEXT COLUMN ── */}
          <div className="flex-1 w-full text-center lg:text-left">
            {/* Official badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1.5 mb-5 shadow-xs">
              <span className="text-base leading-none">🇸🇬</span>
              <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                {badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              {h1}
            </h1>
            
            <p className="text-lg sm:text-lg text-slate-600 font-medium mb-4 leading-snug">
              {subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            {/* ── CTA BUTTONS ── */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start mb-8">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-lime-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#10b981"
                    className="shrink-0"
                  >
                    <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-slate-700 font-semibold">
                4.9 · Trusted by 17,000+ applicants
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {trustBadges.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  <span>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BEFORE / AFTER SLIDER ── */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-3 shrink-0">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Before / After Preview
            </div>

            <div
              ref={containerRef}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[411px] rounded-sm overflow-hidden shadow-sm  select-none cursor-ew-resize bg-white group"
              style={{ touchAction: "none" }}
            >
              {/* After: Pure white background (ICA compliant) */}
              <div className="absolute inset-0 bg-white">
                <Image
                  src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp"
                  alt={imageAltAfter}
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
                <span className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                  ✓ 413 × 531 px (ICA)
                </span>
              </div>

              {/* Before: Raw casual photo */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[411px]">
                  <Image
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116464/passport_photo_a27wdx.jpg"
                    alt={imageAltBefore}
                    fill
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                    Original Selfie
                  </span>
                </div>
              </div>

              {/* Slider divider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110">
                  ↔
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center font-medium">
              Drag slider left or right to compare transformation
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
