"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const visaTypes = [
  "US Visa Photo",
  "India Passport",
  "UK Passport",
  "Schengen Visa",
  
  "Australia Passport",
];

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🌍", text: "Global Compliance" },
  { icon: "🆓", text: "Free Validation" },
];

export default function HomeHero() {
  const [visaTypeIndex, setVisaTypeIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [photosProcessed, setPhotosProcessed] = useState(17560);

  // Slider
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // ── Visa type cycling ──────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setVisaTypeIndex((i) => (i + 1) % visaTypes.length);
        setIsAnimating(false);
      }, 300);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  // ── Counter ────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(
      () => setPhotosProcessed((p) => p + Math.floor(Math.random() * 3) + 1),
      4500,
    );
    return () => clearInterval(iv);
  }, []);

  // ── Core position calc ─────────────────────────────────────
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

  // ── Mouse ──────────────────────────────────────────────────
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

  // ── Touch — attach directly to container element ───────────
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
      e.preventDefault();           // stops page scroll while dragging
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
    () => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); },
    [],
  );

  return (
    <section className="hc-hero">
      <div className="hc-blob hc-blob1" />
      <div className="hc-blob hc-blob2" />
      <div className="hc-hero-inner">

        {/* ── TEXT ─────────────────────────────────────────────── */}
        <div className="hc-hero-text">
          <div className="hc-tp">
            <span className="hc-tp-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#10b981">
                  <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                </svg>
              ))}
            </span>
            <span className="hc-tp-ex">Excellent</span>
            <span className="hc-tp-cnt">Trusted by 17,000+ users</span>
          </div>

          <h1 className="hc-h1">Instant AI Passport & Visa Photo Creator</h1>

          
            <div className="hc-anim-txt">
              Passport • Visa • ID Card • Driver's License
            </div>
       

          <p className="hc-desc">
            100% compliant with international biometric standards (ICAO) — or your money back.
            Avoid rejection, delays, and resubmission globally.
          </p>

          <div className="hc-btns">
            <a href="/tool" className="hc-btn-p" data-cta="hero-upload">
              Upload Photo (Free Preview) →
            </a>
          </div>

          <p className="hc-micro">No signup required • Takes 30 seconds</p>

          <div className="hc-trust" style={{ marginTop: "32px" }}>
            {trustBadges.map((t, i) => (
              <div key={i} className="hc-trust-item">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BEFORE / AFTER SLIDER ────────────────────────────── */}
        {/*
          LAYER STRATEGY (fixes the mobile blank issue)
          ─────────────────────────────────────────────
          Previous code had the BEFORE on top (clipped to the left).
          On mobile, clipPath on an absolutely-positioned overlay can
          fail to render if the browser composites it on a separate layer
          before the image has loaded.

          New approach — simpler and bulletproof:
            z=0  BEFORE image  — full width, always visible as base
            z=1  AFTER image   — clipped so only RIGHT side shows
                                 (inset from LEFT by sliderPos%)

          Both images are always in the DOM and painted. Only the AFTER
          layer uses clipPath, which is far less likely to be skipped.
        */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            aspectRatio: "1 / 1",
            width: "100%",
            maxWidth: "400px",
            touchAction: "none",      // hand touch control to our handlers
            userSelect: "none",
            WebkitUserSelect: "none",
            cursor: isDragging ? "ew-resize" : "col-resize",
            boxShadow: isDragging
              ? "0 0 0 3px rgba(37,99,235,0.35), 0 8px 40px rgba(0,0,0,0.18)"
              : "0 4px 32px rgba(0,0,0,0.13)",
            transition: "box-shadow 0.2s",
          }}
        >

          {/* ── z=0: BEFORE — casual photo, full width ─────────── */}
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
            sizes="(max-width: 1024px) 100vw, 500px"
          />

          {/* ── z=1: AFTER — compliant visa photo, clipped right ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              clipPath: `inset(0 0 0 ${sliderPos}%)`,   // reveal only right portion
              willChange: "clip-path",
              pointerEvents: "none",
            }}
          >
            <Image
              src="/us_non_imigrant.png"
              alt="After – 100% compliant international biometric photo"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center 8%",  // shift down so top-of-head isn't cropped
                pointerEvents: "none",
              }}
              priority
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>

          {/* ── z=2: Divider line ──────────────────────────────── */}
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
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
              willChange: "left",
            }}
          />

          {/* ── z=3: Drag handle ───────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${sliderPos}%`,
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.12 : 1})`,
              width: "48px",
              height: "48px",
              background: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              zIndex: 3,
              pointerEvents: "none",
              willChange: "left, transform",
              boxShadow: isDragging
                ? "0 0 0 4px rgba(37,99,235,0.3), 0 4px 16px rgba(0,0,0,0.3)"
                : "0 2px 14px rgba(0,0,0,0.35)",
              transition: "box-shadow 0.15s, transform 0.1s",
            }}
          >
            {/* ← */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {/* → */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          {/* ── z=4: BEFORE badge ──────────────────────────────── */}
          <div style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            background: "rgba(0,0,0,0.62)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            pointerEvents: "none",
            zIndex: 4,
            opacity: sliderPos > 12 ? 1 : 0,
            transition: "opacity 0.2s",
          }}>
            Before
          </div>

          {/* ── z=4: AFTER badge ───────────────────────────────── */}
          <div style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            background: "rgba(16,185,129,0.92)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            pointerEvents: "none",
            zIndex: 4,
            opacity: sliderPos < 88 ? 1 : 0,
            transition: "opacity 0.2s",
          }}>
            After ✓
          </div>

          {/* ── z=5: Drag hint — fades after first interaction ─── */}
          <div style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.58)",
            color: "white",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 500,
            pointerEvents: "none",
            zIndex: 5,
            whiteSpace: "nowrap",
            opacity: hasInteracted ? 0 : 1,
            transition: "opacity 0.5s",
          }}>
            ← drag to compare →
          </div>

          {/* ── z=6: Active border ring while dragging ─────────── */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            border: isDragging ? "2px solid rgba(37,99,235,0.35)" : "2px solid transparent",
            pointerEvents: "none",
            zIndex: 6,
            transition: "border-color 0.2s",
          }} />

        </div>
      </div>
    </section>
  );
}