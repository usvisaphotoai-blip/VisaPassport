"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🌍", text: "50+ Countries" },
  { icon: "🆓", text: "Free Validation" },
];

export default function HomeHero() {
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

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      calcPos(e.clientX);
    },
    [calcPos],
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
    [calcPos],
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
    [],
  );

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200">
        {/* Gov-style top accent bar */}
        <div className="h-1 bg-lime-700 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── TEXT COLUMN ── */}
            <div className="flex-1 w-full">
              {/* Official badge */}
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded px-3 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-lime-600 inline-block" />
                <span className="text-xs font-semibold text-lime-800 tracking-wide uppercase">
                  Official Biometric Photo Tool · ICAO Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                Passport &amp; Visa Photo Maker
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-normal mb-5 leading-snug">
                Get a compliant biometric photo in 30 seconds
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated checks against official government specifications for 50+
                countries — dimensions, background, face position, eye level — all
                in under 5 seconds.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <a
                  href="/passport-photo-online"
                  className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Get Your ID Photo Now →
                </a>
                <a
                  href="/visa-photo-validator"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Free Validator
                </a>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#1d4ed8"
                    >
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  4.9 · Trusted by 17,000+ users
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BEFORE / AFTER SLIDER ── */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Before &amp; After
              </div>

              <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="relative rounded overflow-hidden border border-slate-200"
                style={{
                  aspectRatio: "1 / 1",
                  width: "100%",
                  maxWidth: "380px",
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  cursor: isDragging ? "ew-resize" : "col-resize",
                }}
              >
                {/* BEFORE — base layer */}
                <Image
                  src="/us_non_imigrant_before.webp"
                  alt="Before – original casual photo"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                />

                {/* AFTER — clipped right */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                    willChange: "clip-path",
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src="/us_non_imigrant.png"
                    alt="After – 100% compliant biometric photo"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 8%",
                      pointerEvents: "none",
                    }}
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${sliderPos}%`,
                    width: "2px",
                    background: "white",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    pointerEvents: "none",
                    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                    willChange: "left",
                  }}
                />

                {/* Handle */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: `${sliderPos}%`,
                    transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
                    width: "44px",
                    height: "44px",
                    background: "white",
                    border: "2px solid #e2e8f0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                    zIndex: 3,
                    pointerEvents: "none",
                    willChange: "left, transform",
                    transition: "transform 0.1s",
                  }}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#555"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#555"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>

                {/* BEFORE badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    fontWeight: 600,
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos > 12 ? 1 : 0,
                    transition: "opacity 0.2s",
                    letterSpacing: "0.04em",
                  }}
                >
                  BEFORE
                </div>

                {/* AFTER badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "#1d4ed8",
                    color: "white",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    fontWeight: 600,
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos < 88 ? 1 : 0,
                    transition: "opacity 0.2s",
                    letterSpacing: "0.04em",
                  }}
                >
                  COMPLIANT ✓
                </div>

                {/* Drag hint */}
                {!hasInteracted && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "48px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0,0,0,0.55)",
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: "3px",
                      fontSize: "11px",
                      fontWeight: 500,
                      pointerEvents: "none",
                      zIndex: 5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ← drag to compare →
                  </div>
                )}
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-400 text-center max-w-xs">
                Processed · White background · Biometric crop · Print-ready
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-7">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
              Example Output
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              See your photo transform
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              From upload to print-ready — the complete process with biometric
              compliance built in.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                alt: "Passport photo with measurements",
                label: "Photo Processing",
                note: "Face detection with biometric measurements applied",
                href: undefined as string | undefined,
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                alt: "Final compliant photo",
                label: "Final Output",
                note: "Government-compliant photo with white/grey background",
                href: undefined as string | undefined,
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg",
                alt: "4x6 print sheet",
                label: "Print Template",
                note: "Ready-to-print 4×6 inch sheet with crop guides",
                href: "https://www.photoresizer.co.in/passport-photo-print-template-generator",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded overflow-hidden bg-white"
              >
                <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                  
                      />
                    </a>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="px-4 py-3 border-t border-slate-100">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-blue-700 hover:underline inline-flex items-center gap-1 mb-1"
                    >
                      {item.label} <span className="text-xs">↗</span>
                    </a>
                  ) : (
                    <div className="text-sm font-bold text-slate-900 mb-1">
                      {item.label}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 leading-relaxed">
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}