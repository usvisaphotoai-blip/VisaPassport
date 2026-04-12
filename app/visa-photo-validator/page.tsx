import type { Metadata } from "next";
import Link from "next/link";

import TrustSection from "../components/TrustSection";
import ComparisonSlider from "../components/ComparisonSlider";
import Image from "next/image";
import { allSpecs } from "@/lib/specs";
export const metadata: Metadata = {
  title: "Free AI Passport Photo & Visa Validator | Instant Biometric Check",
  description:
    "Check your passport, visa, or ID photo for 100% biometric compliance. Our free official-standard global photo validator gives an instant PASS/FAIL report for 50+ countries.",
  keywords: [
    "passport photo validator",
    "visa photo checker",
    "free passport photo compliance check",
    "AI biometric photo check",
    "validate passport photo online",
    "US visa photo validator",
    "UK passport photo checker",
    "Schengen visa photo check",
    "global passport photo validation",
    "ICAO photo checker",
    "check my passport photo",
    "visa photo requirements check"
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/photo-validator",
  },
};

const checks = [
  {
    name: "Dimensions",
    desc: "35x45mm, 2x2in, or 600x600px",
    icon: "📐",
  },
  { name: "File Format", desc: "JPEG or PNG under size limits", icon: "📁" },
  {
    name: "Face Detection",
    desc: "Exactly one face detected and visible",
    icon: "👤",
  },
  {
    name: "Eye Position",
    desc: "Centered eyes per country requirements",
    icon: "👁️",
  },
  { name: "Head Size", desc: "Crown-to-chin ratio of 50-80%", icon: "📏" },
  {
    name: "Background",
    desc: "White, light gray, or neutral color",
    icon: "⬜",
  },
  {
    name: "Glasses Check",
    desc: "No eyeglasses or sunglasses detected",
    icon: "🚫",
  },
  { name: "Expression", desc: "Neutral expression, mouth closed", icon: "😐" },
];

// supportedDocs is dynamically generated from allSpecs

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Global Photo Validator AI",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "25000"
      }
    },
    {
      "@type": "Service",
      "name": "Free Global Photo Compliance Check",
      "provider": {
        "@type": "Organization",
        "name": "PixPassport"
      },
      "description": "Instant PASS/FAIL biometric report for passport, visa, and ID photos globally."
    }
  ]
};

export default function PhotoValidatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        @keyframes uvp-scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes uvp-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        .uvp-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #eaf4f0 0%, #f0f7f4 50%, #e8f3ef 100%);
          min-height: 85vh; display: flex; align-items: center;
        }
        .uvp-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 60px 24px;
          display: flex; flex-direction: row; align-items: center; gap: 64px; width: 100%;
        }
        .uvp-hero-text { flex: 1.2; text-align: left; }
        .uvp-hero-visual { flex: 0.8; display: flex; justify-content: center; position: relative; }

        .uvp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #c6e6d8;
          border-radius: 999px; padding: 6px 14px; margin-bottom: 22px;
        }
        .uvp-badge-dot { width: 8px; height: 8px; background: #3d8c6e; border-radius: 50%; }
        .uvp-badge-txt { font-size: 11px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 1.2px; font-family: var(--font-dm-sans), sans-serif;}

        .uvp-h1 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(32px, 6vw, 56px); font-weight: 800; line-height: 1.1; color: #0f1e2d; letter-spacing: -1.5px; margin-bottom: 20px; }
        .uvp-desc { font-family: var(--font-dm-sans), sans-serif; font-size: 18px; color: #4a5568; line-height: 1.7; max-width: 540px; margin-bottom: 40px; }

        .uvp-upload-btn {
           background: #3b5bdb; color: #fff; padding: 18px 40px; border-radius: 12px;
           font-family: var(--font-dm-sans), sans-serif; font-size: 17px; font-weight: 700; text-decoration: none;
           box-shadow: 0 8px 24px rgba(59,91,219,0.2); transition: all 0.2s; display: inline-block;
        }
        .uvp-upload-btn:hover { background: #2f4ac7; transform: translateY(-2px); }

        .hc-sec { padding: 90px 24px; }
        .hc-sec-alt { background: #f8faf9; }
        .hc-in { max-width: 1100px; margin: 0 auto; }
        .hc-label { font-size: 12px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: block; text-align: center; }
        .hc-h2 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 800; color: #0f1e2d; text-align: center; margin-bottom: 48px; letter-spacing: -1.2px; }

        .hc-check-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        .hc-check-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #eef2f1; text-align: center; }
        .hc-check-ic { font-size: 24px; margin-bottom: 12px; display: block; }
        .hc-check-t { font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; color: #0f1e2d; margin-bottom: 4px; }
        .hc-check-p { font-size: 13px; color: #64748b; line-height: 1.5; }

        .hc-feature-row { display: flex; align-items: center; gap: 64px; margin-bottom: 80px; }
        .hc-feature-text { flex: 1; }
        .hc-feature-visual { flex: 1; background: #fff; border-radius: 32px; padding: 40px; border: 1px solid #eef2f1; box-shadow: 0 20px 40px rgba(0,0,0,0.02); }

        @media (max-width: 1023px) {
          .uvp-hero-inner { flex-direction: column; text-align: center; padding: 48px 20px; }
          .uvp-hero-text { display: flex; flex-direction: column; align-items: center; }
          .hc-feature-row { flex-direction: column; gap: 40px; }
          .uvp-hero-visual { display: none; }
        }
      `}</style>

      <div className="hcr">
        {/* ══ HERO ══ */}
        <section className="uvp-hero">
          <div className="uvp-hero-inner">
            <div className="uvp-hero-text">
              <div className="uvp-badge">
                <span className="uvp-badge-dot" />
                <span className="uvp-badge-txt">AI Biometric Analysis</span>
              </div>
              <h1 className="uvp-h1">Free AI Passport & Visa Photo Validator: Instant Biometric Check</h1>
              <p className="uvp-desc">
                Get an instant PASS/FAIL compliance report. Our AI mirrors the
                software used by Embassies globally to ensure your passport, visa,
                or ID photo meets all official ICAO and government standards.
              </p>
              <Link href="/tool" className="uvp-upload-btn">
                Upload & Validate Free →
              </Link>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  ✓ Instant PASS/FAIL Report
                </p>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  ✓ 100% Free
                </p>
              </div>
            </div>

            <div className="hc-visual-wrap">
              <Image
                src="/us_non_imigrant.png"
                alt="PixPassport Validator - 600x600px biometric compliance report example"
                width={500}
                height={500}
                style={{
                  borderRadius: "16px",
                  width: "100%",
                  height: "auto",
                }}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </section>


        {/* ══ HIGH VALUE CONTENT: AI VS HUMAN ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <div className="hc-feature-row">
              <div className="hc-feature-text">
                <span className="hc-label" style={{ textAlign: "left" }}>
                  The Technology
                </span>
                <h2
                  className="hc-h2"
                  style={{ textAlign: "left", marginBottom: 24 }}
                >
                  How Our AI Checks Passport & Visa Photo Compliance
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    color: "#4a5568",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  Our validator doesn't just check size; it performs a deep
                  biometric analysis. By detecting **64 facial landmarks**, we
                  calculate the exact geometry required by the Department of
                  State's automated facial recognition systems.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      t: "Pixel-Perfect Dimensions",
                      d: "Checks if your photo is exactly 600x600px without upscaling artifacts.",
                    },
                    {
                      t: "Luminance Balancing",
                      d: "Ensures no 'hot spots' or shadows on the face that trigger OCR errors.",
                    },
                    {
                      t: "Gaze Alignment",
                      d: "Verifies the subject is facing squarely with eyes fixed on the lens.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#3d8c6e", fontWeight: 800 }}>
                        ✓
                      </span>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#64748b",
                          margin: 0,
                        }}
                      >
                        <strong>{item.t}:</strong> {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hc-feature-visual">
                <div style={{ marginBottom: 24 }}>
                  <h4
                    style={{
                      fontWeight: 800,
                      color: "#0f1e2d",
                      marginBottom: 4,
                    }}
                  >
                    Embassy-Grade Validation System
                  </h4>
                  <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                    Mirroring the official DOS validation pipeline
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {[
                    { l: "Head Height", v: "58.2%", s: "PASS" },
                    { l: "Eye Level", v: "64.1%", s: "PASS" },
                    { l: "Background", v: "Pure White", s: "PASS" },
                  ].map((log, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#64748b" }}>
                        {log.l}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#0f1e2d",
                          }}
                        >
                          {log.v}
                        </span>
                        <span
                          style={{
                            fontSize: "10px",
                            background: "#eef7f2",
                            color: "#3d8c6e",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontWeight: 800,
                          }}
                        >
                          {log.s}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ ALL CHECKS GRID ════ */}
        <section className="hc-sec">
          <div className="hc-in">
            <span className="hc-label">Compliance Protocol</span>
            <h2 className="hc-h2">Biometric Photo Requirements We Check Instantly</h2>
            <div className="hc-check-grid">
              {checks.map((c, i) => (
                <div key={i} className="hc-check-card">
                  <span className="hc-check-ic">{c.icon}</span>
                  <h3 className="hc-check-t">{c.name}</h3>
                  <p className="hc-check-p">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HIGH VALUE CONTENT: REJECTION REASONS ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <span className="hc-label">Expert Advice</span>
            <h2 className="hc-h2">Why Passport & Visa Photos Get Rejected: Top 3 Issues</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "32px",
                  borderRadius: "24px",
                  border: "1px solid #eef2f1",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: 12,
                  }}
                >
                  1. Digital Compression
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  Many "free" online tools over-compress images, creating pixel
                  artifacts. While the photo looks fine to you, the State
                  Department's scanner sees this as "Noise" and will reject the
                  file instantly.
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "32px",
                  borderRadius: "24px",
                  border: "1px solid #eef2f1",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: 12,
                  }}
                >
                  2. Color Space Mismatch
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  Photos must be in the **sRGB** color space. If your phone
                  saves in "Display P3" or "CMYK", colors will appear distorted
                  during the biometric scan. Our validator automatically
                  corrects color profiles.
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "32px",
                  borderRadius: "24px",
                  border: "1px solid #eef2f1",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: 12,
                  }}
                >
                  3. Retouching Artifacts
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  Using a brush tool to "whiten" a background often leaves soft
                  edges around the hair. Automated scanners detect these
                  inconsistencies as "Photo Alteration," a secondary
                  disqualification reason.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SUPPORTED DOCS ══ */}
        <section className="hc-sec">
          <div className="hc-in">
            <h2 className="hc-h2">Global Supported Document Types</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {allSpecs.map((doc, i) => (
                <Link
                  key={i}
                  href={`/${doc.id}-photo-editor`}
                  style={{
                    textDecoration: "none",
                    background: "#fff",
                    border: "1px solid #eef2f1",
                    padding: "24px",
                    borderRadius: "16px",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                  className="card-hover"
                >
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f1e2d",
                      margin: 0,
                    }}
                  >
                    {doc.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#3d8c6e",
                      marginTop: 8,
                      fontWeight: 700,
                    }}
                  >
                    View Specs →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ AI VALIDATION GUIDE ══ */}
        <section className="hc-sec bg-white">
          <div className="hc-in">
            <span className="hc-label">Step-by-Step Guide</span>
            <h2 className="hc-h2" style={{ marginBottom: 24 }}>How to Use Our AI Document Photo Validator</h2>
            <div className="prose prose-premium max-w-3xl mx-auto text-slate-600">
              <p>Ensuring your passport or visa photo complies with international biometric standards is critical to avoiding application delays or rejections. Our AI Document Photo Validator provides a government-grade scan of your image in just seconds. Follow these steps to generate your guaranteed-compliant photo.</p>

              <h3>1. Upload Your Image</h3>
              <p>Start by taking a photo against any background with decent lighting. Ideally, face the camera directly with a neutral expression. Then, upload your JPEG or PNG image directly into the validator. Our tool handles high-resolution images smoothly and protects your privacy by processing everything securely.</p>

              <h3>2. Select Your Specific Document Type</h3>
              <p>With requirements varying wildly between 50+ countries, it's essential to select the exact document you need. Whether it's a 2x2 inch US Visa, a 35x45 mm Schengen Passport photo, or a 51x51 mm Indian Passport, our database instantly applies the precise dimensional and biometric rules associated with your selection.</p>

              <h3>3. Instant Metric Analysis</h3>
              <p>Our AI model will scan 64 precision facial landmarks. It calculates the exact crown-to-chin height, eye-level positioning, and background luminance. The tool automatically removes non-compliant backgrounds, replacing them with pure white, light gray, or blue based on the country's official mandates. You'll instantly see a complete PASS/FAIL breakdown pinpointing any rejections.</p>

              <h3>4. Download or Print</h3>
              <p>Once you achieve a 100% PASS score, download your pristine, ready-to-submit biometric photo or generate a 4x6 print sheet for local printing. Our results match algorithmic Embassy scanning software, ensuring you can submit your application globally with total confidence.</p>
            </div>
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section className="hc-sec hc-sec-alt" style={{ textAlign: "center" }}>
          <div className="hc-in" style={{ maxWidth: 600 }}>
            <h2 className="hc-h2" style={{ marginBottom: 16 }}>
              Don't Risk an RFE or Rejection
            </h2>
            <p className="uvp-desc" style={{ margin: "0 auto 32px" }}>
              Our validator provides the same level of scrutiny as an Embassy
              official. Get your free report in seconds.
            </p>
            <Link
              href="/tool"
              style={{
                background: "#3d8c6e",
                color: "#fff",
                padding: "18px 48px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "18px",
                display: "inline-block",
              }}
            >
              Upload & Validate Free →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
