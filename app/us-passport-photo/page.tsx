import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import PassportFAQ from "../components/PassportFAQ";
import Reviews from "../components/Reviews";
import ComparisonSlider from "../components/ComparisonSlider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "US Passport Photo Maker - 600x600px & DIY Printable 2x2 Inch",
  description:
    "Official-compliant US passport photo tool. Create 600×600px digital photos for online renewal or printable 2×2 inch versions. 100% State Dept. compliance guaranteed.",
  keywords: [
    "US passport photo",
    "passport photo maker",
    "2x2 passport photo",
    "passport photo online",
    "DIY passport photo",
    "passport photo requirements",
    "passport renewal photo",
    "digital passport photo 600x600",
    "print US passport photo 4x6 template Walgreens",
    "how to take passport photo at home iPhone",
    "can I wear makeup on US passport photo",
    "fix US passport photo shadow",
  ],
  alternates: {
    canonical: "https://www.usvisaphotoai.pro/us-passport-photo",
  },
};

const requirements = [
  { spec: "Digital Size", value: "600 × 600 pixels", icon: "📐" },
  { spec: "Print Size", value: "2 × 2 inches", icon: "🖨️" },
  { spec: "Max File Size", value: "240 KB (JPEG)", icon: "📁" },
  { spec: "Background", value: "Pure White", icon: "⬜" },
  { spec: "Eye Position", value: "56% – 69%", icon: "👁️" },
  { spec: "Head Size", value: "50% – 69%", icon: "📏" },
  { spec: "Expression", value: "Neutral", icon: "😐" },
  { spec: "Glasses", value: "Not Allowed", icon: "🚫" },
];

const diyTips = [
  {
    title: "Fixing Backgrounds without Shadows",
    desc: "Stand 2-3 feet in front of a plain white wall. Make sure there are no shadows, marks, or visible textures behind you.",
  },
  {
    title: "How to Light a Passport Photo at Home",
    desc: "Use natural daylight from a window. Avoid using flash as it can create harsh shadows and uneven lighting on your face.",
  },
  {
    title: "How far should the camera be for a passport photo?",
    desc: "Place your phone at eye level, about 4 feet away. Use the front camera with a timer or have someone take the photo for you.",
  },
  {
    title: "Centering the Head Correctly",
    desc: "Center your face in the frame with some space above your head and below your chin. Our tool will crop to the exact requirements.",
  },
  {
    title: "Can I Print US Passport Photos on Matte Paper?",
    desc: "For printable photos, use matte photo paper on a color printer. Avoid glossy paper as it can cause reflections during scanning.",
  },
  {
    title: "Always Validate Passport Photos Online First",
    desc: "Always validate your photo digitally first using our free checker. This saves time and ensures your printed photos will be accepted.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "US Passport Photo Maker AI",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "5.99",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "HowTo",
      "baseSalary": "0",
      "name": "DIY Passport Photo Tips",
      "description":
        "How to take a compliant US passport photo at home using your smartphone.",
      "step": diyTips.map((tip, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "name": tip.title,
        "text": tip.desc,
      })),
    },
  ],
};

export default function USPassportPhotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @keyframes uvp-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes uvp-float-flag {
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50%       { transform: rotate(-12deg) translateY(-8px); }
        }

        .uvp-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #eaf4f0 0%, #f0f7f4 50%, #e8f3ef 100%);
          min-height: 80vh; display: flex; align-items: center;
        }
        .uvp-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 60px 24px;
          display: flex; flex-direction: row; align-items: center; gap: 64px; width: 100%;
        }
        .uvp-hero-text { flex: 1.2; }
        .uvp-hero-visual { flex: 0.8; display: flex; justify-content: center; position: relative; }

        .uvp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #c6e6d8;
          border-radius: 999px; padding: 6px 14px; margin-bottom: 22px;
        }
        .uvp-badge-dot { width: 8px; height: 8px; background: #3d8c6e; border-radius: 50%; }
        .uvp-badge-txt { font-size: 11px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 1.2px; font-family: var(--font-dm-sans), sans-serif;}

        .uvp-h1 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(32px, 6vw, 56px); font-weight: 800; line-height: 1.1; color: #0f1e2d; letter-spacing: -1.5px; margin-bottom: 20px; }
        .uvp-desc { font-family: var(--font-dm-sans), sans-serif; font-size: 18px; color: #4a5568; line-height: 1.7; max-width: 560px; margin-bottom: 32px; }

        .uvp-btn-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .uvp-btn-p {
          background: #3b5bdb; color: #fff; padding: 16px 32px; border-radius: 12px;
          font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 24px rgba(59,91,219,0.2); transition: all 0.2s;
        }
        .uvp-btn-p:hover { background: #2f4ac7; transform: translateY(-2px); }
        .uvp-btn-s {
           border: 1px solid #e2e8f0; background: #fff; color: #0f1e2d; padding: 16px 32px; border-radius: 12px;
           font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s;
        }
        .uvp-btn-s:hover { background: #f8fafc; border-color: #cbd5e1; }

        .uvp-visual-card {
          position: relative; background: #fff; padding: 12px; border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,1);
          transform: rotate(2deg); max-width: 320px;
        }
        .uvp-visual-card img { width: 100%; border-radius: 20px; display: block; }

        .uvp-chip-flag {
          position: absolute; top: -15px; left: -20px; background: #fff; padding: 12px;
          border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); font-size: 24px;
          animation: uvp-float-flag 3s ease-in-out infinite;
        }
        .uvp-chip-status {
          position: absolute; bottom: 20px; right: -25px; background: #fff; padding: 10px 18px;
          border-radius: 12px; border: 1.5px solid #c6e6d8; color: #3d8c6e; font-weight: 700;
          font-family: var(--font-dm-sans), sans-serif; font-size: 13px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          display: flex; align-items: center; gap: 8px; animation: uvp-float 3.5s ease-in-out infinite 0.5s;
        }

        .hc-sec { padding: 90px 24px; }
        .hc-sec-alt { background: #f8faf9; }
        .hc-in { max-width: 1100px; margin: 0 auto; }
        .hc-label { font-size: 12px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: block; text-align: center; }
        .hc-h2 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 800; color: #0f1e2d; text-align: center; margin-bottom: 48px; letter-spacing: -1.2px; }

        .hc-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        .hc-spec-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #eef2f1; text-align: center; transition: transform 0.2s; }
        .hc-spec-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
        .hc-spec-ic { font-size: 28px; margin-bottom: 16px; display: block; }
        .hc-spec-l { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; display: block; }
        .hc-spec-v { font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; color: #3d8c6e; }

        .hc-tip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .hc-tip-card { background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #eef2f1; display: flex; gap: 20px; }
        .hc-tip-num { width: 36px; height: 36px; background: #3d8c6e; color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; shrink: 0; }
        .hc-tip-t { font-family: var(--font-dm-sans), sans-serif; font-size: 18px; font-weight: 700; color: #0f1e2d; margin-bottom: 8px; }
        .hc-tip-p { font-size: 14px; color: #64748b; line-height: 1.6; }

        @media (max-width: 1023px) {
          .uvp-hero-inner { flex-direction: column; text-align: center; padding: 48px 20px; }
          .uvp-hero-text { display: flex; flex-direction: column; align-items: center; }
          .uvp-btn-row { justify-content: center; }
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
                <span className="uvp-badge-txt">
                  Digital & Print Optimization
                </span>
              </div>
              <h1 className="uvp-h1">US Passport Photo Maker: Free 2x2 Crop & Digital Validator</h1>
              <p className="uvp-desc">
                Engineered for both online renewals and mail-in applications.
                Get your compliant 600x600px digital file or printable 2x2 inch
                template in under 30 seconds.
              </p>
              <div className="uvp-btn-row">
                <Link href="/tool?type=us-passport" className="uvp-btn-p">
                  Create Passport Photo →
                </Link>
                <Link href="#diy-tips" className="uvp-btn-s">
                  Read DIY Guide
                </Link>
              </div>
              <p
                style={{
                  marginTop: 20,
                  fontSize: "14px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#3d8c6e" }}>●</span> Trusted by 100k+
                applicants for Department of State compliance.
              </p>
            </div>

            <div className="hc-visual-wrap">
              <Image
                src="/us_green_card_photo.webp"
                alt="US Passport Photo AI - Official 2x2 inch printable and digital compliance sample"
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

        <TrustSection />

        {/* ══ HIGH VALUE CONTENT: DIGITAL VS PRINT ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <span className="hc-label">The Professional Edge</span>
            <h2 className="hc-h2">US Passport Photo Size: 600x600 Digital vs 2x2 Physical Print</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
                marginBottom: "48px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "40px",
                  borderRadius: "32px",
                  border: "1px solid #eef2f1",
                }}
              >
                <div
                  style={{
                    background: "#eff6ff",
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    fontSize: "24px",
                  }}
                >
                  💻
                </div>
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: "16px",
                  }}
                >
                  Digital Requirements (600x600px)
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  Required for online renewal systems like **Travel.State.Gov**.
                  The file must be exactly square (1:1 aspect ratio), between
                  600x600 and 1200x1200px, and under 240KB. Our system
                  automatically compresses your photo to remove digital noise
                  and ensures the sRGB color profile is preserved for biometric
                  extraction.
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "40px",
                  borderRadius: "32px",
                  border: "1px solid #eef2f1",
                }}
              >
                <div
                  style={{
                    background: "#ecfdf5",
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    fontSize: "24px",
                  }}
                >
                  🖨️
                </div>
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: "16px",
                  }}
                >
                  Physical Print Requirements (2x2 Inch)
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  Used for mail-in forms (DS-11, DS-82). These must be printed
                  on matte or glossy photo-quality paper. Crucially, the head
                  height must be **1 to 1 3/8 inches** from the bottom. Our
                  downloadable 4x6 print template allows you to print 2 photos
                  at once at any local drugstore (Walgreens, CVS).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════ REQUIREMENTS GRID (PREMIUM) ════ */}
        <section className="hc-sec">
          <div className="hc-in">
            <span className="hc-label">Official Standards</span>
            <h2 className="hc-h2">Official 2026 US Passport Photo Requirements</h2>
            <div className="hc-grid-4">
              {requirements.map((req, i) => (
                <div key={i} className="hc-spec-card">
                  <span className="hc-spec-ic">{req.icon}</span>
                  <span className="hc-spec-l">{req.spec}</span>
                  <p className="hc-spec-v">{req.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HIGH VALUE CONTENT: AT-HOME GUIDE ══ */}
        <section id="diy-tips" className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <span className="hc-label">Step-by-Step Guide</span>
            <h2 className="hc-h2">How to Take a US Passport Photo at Home with Good Lighting</h2>
            <div
              style={{
                background: "#fff",
                padding: "48px",
                borderRadius: "40px",
                border: "1px solid #eef2f1",
                marginBottom: 60,
              }}
            >
              <div style={{ maxWidth: 800 }}>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#0f1e2d",
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  How to avoid the #1 rejection reason: Shadows.
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  The Department of State is extremely strict about **uniform
                  lighting**. Harsh shadows behind the ears or on the wall will
                  result in an immediate fail. To get a studio-quality photo at
                  home:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {[
                    {
                      t: "The 3-Foot Rule",
                      d: "Stand exactly 3 feet in front of the wall. This allows light to wrap around your head, eliminating dark silhouettes behind your shoulders.",
                    },
                    {
                      t: "Window Light Only",
                      d: "Turn off all indoor lights (which create yellow/blue tints). Face a large window during high-sun hours for natural, soft white light.",
                    },
                    {
                      t: "The Eye-Level Phone",
                      d: "Do not take a selfie. Have someone hold the phone at your eye level. Selfies distort facial proportions, making the nose appear larger than the biometric requirement allows.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "16px" }}>
                      <span style={{ color: "#3d8c6e", fontWeight: 800 }}>
                        0{idx + 1}.
                      </span>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#4a5568",
                          margin: 0,
                        }}
                      >
                        <strong>{item.t}:</strong> {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hc-tip-grid">
              {diyTips.map((tip, i) => (
                <div key={i} className="hc-tip-card">
                  <div className="hc-tip-num">{i + 1}</div>
                  <div>
                    <h3 className="hc-tip-t">{tip.title}</h3>
                    <p className="hc-tip-p">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PassportFAQ />
        <Reviews />

        {/* ════ CTA ════ */}
        <section className="hc-sec" style={{ textAlign: "center" }}>
          <div className="hc-in" style={{ maxWidth: 640 }}>
            <h2 className="hc-h2" style={{ marginBottom: 16 }}>
              Ready to Renew Your Passport?
            </h2>
            <p className="uvp-desc" style={{ margin: "0 auto 32px" }}>
              Skip the long lines and professional studios. Create your US
              Passport photo instantly from your phone.
            </p>
            <div className="uvp-btn-row" style={{ justifyContent: "center" }}>
              <Link href="/tool?type=us-passport" className="uvp-btn-p">
                Start My Passport Photo →
              </Link>
            </div>
            <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: 24 }}>
              FREE verification included · Digital & Print-ready downloads
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
