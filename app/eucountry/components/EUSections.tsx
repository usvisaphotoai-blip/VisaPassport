import type { LocalizedStrings } from "../data/types";
import Link from "next/link";

interface EUSectionsProps {
  strings: LocalizedStrings;
  price: string;
}

export default function EUSections({ strings, price }: EUSectionsProps) {
  return (
    <>
      {/* ────────── STRIP ────────── */}
      <section className="eu-strip">
        <div className="eu-strip-in">
          {strings.statsItems.map((s, i) => (
            <div key={i} className="eu-strip-item">
              <div className="eu-strip-stat">{s.stat}</div>
              <div className="eu-strip-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── HOW IT WORKS ────────── */}
      <section id="how-it-works" className="eu-sec eu-sec-alt">
        <div className="eu-sec-in">
          <div className="eu-head">
            <h2 className="eu-h2">{strings.howItWorks}</h2>
          </div>
          <div className="eu-steps">
            {strings.steps.map((step, i) => (
              <div key={i} className="eu-step">
                <div className="eu-step-bg">{String(i + 1).padStart(2, "0")}</div>
                <div className={`eu-step-icon${i >= 2 ? " eu-step-icon-b" : ""}`}>
                  {["📤", "⚡", "📋", "💳", "⬇️"][i] || "✅"}
                </div>
                <div className="eu-step-t">{step.title}</div>
                <div className="eu-step-d">{step.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link
              href="/tool?type=us-visa"
              className="eu-btn-p"
              style={{ display: "inline-flex" }}
            >
              {strings.uploadButton} →
            </Link>
          </div>
        </div>
      </section>

      {/* ────────── SPECS ────────── */}
      <section className="eu-sec">
        <div className="eu-sec-in">
          <div className="eu-head">
            <h2 className="eu-h2">{strings.specsTitle}</h2>
          </div>
          <div className="eu-specs">
            {strings.specs.map((spec, i) => (
              <div key={i} className="eu-spec">
                <div className="eu-spec-l">{spec.label}</div>
                <div className="eu-spec-v">{spec.value}</div>
                <div className="eu-spec-d">{spec.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── PRICING ────────── */}
      <section className="eu-sec eu-sec-alt">
        <div className="eu-sec-xs">
          <h2 className="eu-h2">{strings.pricingTitle}</h2>
          <p className="eu-sub" style={{ marginBottom: "32px" }}>
            {strings.pricingSubtitle}
          </p>
          <div className="eu-price-card" style={{ marginTop: "8px" }}>
            <div className="eu-price-pop">⭐</div>
            <div className="eu-price-amt">{price}</div>
            <div className="eu-price-note">{strings.pricingOneTime || "One-time"}</div>
            {(strings.pricingFeatures || [
              "600×600px compliant photo",
              "Background correction",
              "Auto crop & resize",
              "File size optimization",
              "A4 print sheet (20 photos)",
              "24-hour secure storage",
            ]).map((feat, i) => (
              <div key={i} className="eu-price-feat">
                <span className="eu-pf-chk">✓</span>
                <span className="eu-pf-txt">{feat}</span>
              </div>
            ))}
            <Link href="/tool?type=us-visa" className="eu-btn-block" style={{ marginTop: "24px" }}>
              {strings.uploadButton} →
            </Link>
            <div className="eu-price-sm">{strings.pricingNoAccount || "No account required"}</div>
          </div>
        </div>
      </section>

      {/* ────────── PRIVACY ────────── */}
      <section className="eu-sec">
        <div className="eu-sec-in">
          <div className="eu-head">
            <h2 className="eu-h2">{strings.privacyTitle}</h2>
          </div>
          <div className="eu-priv">
            {strings.privacyItems.map((item, i) => (
              <div key={i} className="eu-priv-item">
                <div className="eu-priv-icon">{item.icon}</div>
                <div className="eu-priv-t">{item.title}</div>
                <div className="eu-priv-d">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
