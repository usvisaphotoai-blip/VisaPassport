"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const visaTypes = [
  "DS-160 Photo",
  "DV-2027 Lottery",
  "US Visa Photo",
  "H1-B Visa Photo",
  "Passport Photo",
  "Green Card Photo",
];

interface EUHeroProps {
  h1: string;
  description: string;
  ctaText: string;
  ctaSecondaryText: string;
  flag: string;
  countryName: string;
  trustBadges: { icon: string; text: string }[];
}

export default function EUHero({
  h1,
  description,
  ctaText,
  ctaSecondaryText,
  flag,
  countryName,
  trustBadges,
}: EUHeroProps) {
  const [visaTypeIndex, setVisaTypeIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <section className="eu-hero">
      <div className="eu-blob eu-blob1" />
      <div className="eu-blob eu-blob2" />
      <div className="eu-hero-inner">
        {/* TEXT */}
        <div className="eu-hero-text">
          <div className="eu-country-badge">
            <span className="eu-country-flag">{flag}</span>
            <span>{countryName}</span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", fontSize: "14px", color: "var(--eu-c-text-s)", marginBottom: "16px", marginTop: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Based on <a href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html" target="_blank" rel="noopener" style={{ color: "var(--eu-c-prim)", textDecoration: "underline" }}>U.S. Department of State guidelines</a>
            </span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Updated: April 2026
            </span>
          </div>

          <h1 className="eu-h1">{h1}</h1>

          <div className="eu-anim-wrap">
            <div
              className="eu-anim-txt"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "translateY(-8px)" : "translateY(0)",
              }}
            >
              {visaTypes[visaTypeIndex]}
            </div>
          </div>

          <p className="eu-desc">{description}</p>

          <div className="eu-btns">
            <Link href="/tool?type=us-visa" className="eu-btn-p">
              {ctaText} →
            </Link>
            <a href="#how-it-works" className="eu-btn-s">
              {ctaSecondaryText}
            </a>
          </div>

          <div className="eu-trust" style={{ marginTop: "32px" }}>
            {trustBadges.map((t, i) => (
              <div key={i} className="eu-trust-item">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PHOTO VISUAL */}
        <div className="eu-visual-wrap">
          <Image
            src="/us_non_imigrant.png"
            alt={`US Visa Photo - ${countryName} compliant 600x600px`}
            width={500}
            height={500}
            style={{
              borderRadius: "16px",
              width: "100%",
              height: "auto",
            }}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}
