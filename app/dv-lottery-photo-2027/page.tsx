import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import DVLotteryFAQ from "../components/DVLotteryFAQ";
import Reviews from "../components/Reviews";
import ComparisonSlider from "../components/ComparisonSlider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DV Lottery Photo Checker 2027 - Free Green Card Photo Validator",
  description:
    "Official-standard DV-2027 photo validator. Avoid disqualification from the Diversity Visa lottery by checking your 600x600px biometric compliance instantly. Strict eye level (56-69%) and head size (50-69%) checking.",
  keywords: [
    "DV lottery photo 2027",
    "Green Card photo tool",
    "diversity visa requirements",
    "DV-2027 photo checker",
    "green card lottery photo size",
    "DV lottery photo validator",
    "US visa photo checker free",
    "DS-160 photo maker",
    "how to check DV lottery photo 600x600",
    "fix DV lottery photo eye level",
    "test green card lottery photo online",
    "DV 2027 photo rules 240KB",
  ],
  alternates: {
    canonical: "https://www.usvisaphotoai.pro/dv-lottery-photo-2027",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "DV Lottery Photo Checker 2027 AI",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "WebPage",
      name: "DV Lottery Photo Checker 2027",
      description:
        "Professional 600x600px validator for Diversity Visa lottery photos.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the most common reason for DV lottery photo rejection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Incorrect eye level and head size are the primary reasons for automatic disqualification. Eyes must be between 56% and 69% from the bottom of the photo.",
          },
        },
        {
          "@type": "Question",
          name: "Can I wear glasses in my DV-2027 lottery photo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, eyeglasses are strictly prohibited in all US visa and lottery photos since 2016.",
          },
        },
      ],
    },
  ],
};

const requirements = [
  { spec: "Dimensions", value: "600 × 600 px", critical: true },
  { spec: "Aspect Ratio", value: "1:1 (Square)", critical: true },
  { spec: "File Size", value: "Under 240 KB", critical: true },
  { spec: "Compression Ratio", value: "20:1 or less", critical: true },
  { spec: "Format", value: "JPEG (.jpg)", critical: true },
  { spec: "Color Space", value: "sRGB", critical: false },
  { spec: "Bit Depth", value: "24-bit color", critical: false },
  { spec: "Background", value: "Pure White, No Shadows", critical: true },
  { spec: "Eye Level", value: "56% – 69% from bottom", critical: true },
  { spec: "Head Size", value: "50% – 69% of image height", critical: true },
  { spec: "Expression", value: "Neutral, mouth closed", critical: false },
  { spec: "Glasses", value: "NOT ALLOWED", critical: true },
  { spec: "Face Position", value: "Centered, facing camera", critical: false },
];

const tips = [
  {
    title: "Eye Level is the #1 Rejection Reason",
    desc: "The DV lottery has the strictest eye level enforcement. Your eyes must be between 56% and 69% from the bottom edge. Even 1% off will cause rejection.",
    type: "critical",
  },
  {
    title: "Use the Correct Image Size",
    desc: "Submitting a photo that isn't exactly 600×600 pixels will result in automatic rejection. Our tool crops and resizes your photo to the exact specification.",
    type: "tip",
  },
  {
    title: "No Photo Editing or Filters",
    desc: "Do not use any photo filters, beautification tools, or heavy editing. The photo must represent your natural, current appearance.",
    type: "warning",
  },
  {
    title: "Recent Photo Only",
    desc: "Your photo must be taken within the last 6 months. Using an old photo can lead to disqualification even if you win the lottery.",
    type: "tip",
  },
];

export default function DVLotteryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @keyframes uvp-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes uvp-float-target {
          0%, 100% { transform: rotate(12deg) translateY(0px); }
          50%       { transform: rotate(12deg) translateY(-9px); }
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
        .uvp-hero-text { flex: 1; }
        .uvp-hero-visual { flex: 1; display: flex; justify-content: center; position: relative; }

        .uvp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #c6e6d8;
          border-radius: 999px; padding: 6px 14px; margin-bottom: 22px;
        }
        .uvp-badge-dot { width: 8px; height: 8px; background: #3d8c6e; border-radius: 50%; }
        .uvp-badge-txt { font-size: 11px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 1.2px; font-family: var(--font-dm-sans), sans-serif;}

        .uvp-h1 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(32px, 6vw, 56px); font-weight: 800; line-height: 1.1; color: #0f1e2d; letter-spacing: -1.5px; margin-bottom: 20px; }
        .uvp-desc { font-family: var(--font-dm-sans), sans-serif; font-size: 18px; color: #4a5568; line-height: 1.7; max-width: 540px; margin-bottom: 32px; }

        .uvp-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 32px; }
        .uvp-btn-p {
          background: #3b5bdb; color: #fff; padding: 16px 32px; border-radius: 12px;
          font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 24px rgba(59,91,219,0.2); transition: all 0.2s;
        }
        .uvp-btn-p:hover { background: #2f4ac7; transform: translateY(-2px); }

        .uvp-visual-card {
          position: relative; background: #fff; padding: 12px; border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,1);
          transform: rotate(-2deg); max-width: 320px;
        }
        .uvp-visual-card img { width: 100%; border-radius: 20px; display: block; }

        .uvp-chip-target {
          position: absolute; top: -10px; right: -15px; background: #fff; padding: 12px;
          border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); font-size: 24px;
          animation: uvp-float-target 3s ease-in-out infinite;
        }
        .uvp-chip-compliant {
          position: absolute; bottom: 20px; left: -20px; background: #fff; padding: 10px 18px;
          border-radius: 12px; border: 1.5px solid #c6e6d8; color: #3d8c6e; font-weight: 700;
          font-family: var(--font-dm-sans), sans-serif; font-size: 13px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          display: flex; align-items: center; gap: 8px; animation: uvp-float 3.5s ease-in-out infinite 0.5s;
        }

        .hc-sec { padding: 80px 24px; }
        .hc-sec-alt { background: #f8faf9; }
        .hc-in { max-width: 1100px; margin: 0 auto; }
        .hc-label { font-size: 12px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: block; text-align: center; }
        .hc-h2 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 800; color: #0f1e2d; text-align: center; margin-bottom: 48px; letter-spacing: -1px; }

        .hc-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .hc-card { background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #eef2f1; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .hc-card-t { font-family: var(--font-dm-sans), sans-serif; font-size: 20px; font-weight: 700; color: #0f1e2d; margin-bottom: 12px; }
        .hc-card-p { font-size: 15px; color: #6b7280; line-height: 1.7; }

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
                <span className="uvp-badge-txt">DV-2027 Official Specs</span>
              </div>
              <h1
                className="uvp-h1"
                style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
              >
                DV Lottery Photo Checker 2027: Free 600x600px AI Validator
              </h1>
              <p className="uvp-desc">
                Ensure 100% government compliance with our AI-powered validator.
                Avoid disqualification and secure your entry with a perfect
                600x600px biometric photo.
              </p>
              <div className="uvp-btn-row">
                <Link href="/tool?type=dv-lottery" className="uvp-btn-p">
                  Generate DV Lottery Photo Free →
                </Link>
              </div>

              <div
                style={{
                  background: "rgba(61,140,110,0.05)",
                  border: "1px solid rgba(61,140,110,0.1)",
                  borderRadius: "16px",
                  padding: "20px",
                  maxWidth: "540px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: 8,
                  }}
                >
                  Ensuring Government Photo Compliance
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4a5568",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  We place a high priority on protecting your privacy. Our
                  platform utilizes advanced AI compliance procedures to process
                  smartphone photos for formal government papers, ensuring your
                  data is handled with precision and security.
                </p>
              </div>
            </div>

            <div className="hc-visual-wrap">
              <Image
                src="/us_pasport_photo_tool.webp"
                alt="Diversity Visa Lottery 2027 - Compliant 600x600px digital photo example for DV-2027"
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

        {/* ══ HOW TO CREATE ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <span className="hc-label">The Process</span>
            <h2 className="hc-h2">
              How to Check DV Lottery Photo 600x600 for Compliance
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "#4a5568",
                maxWidth: "700px",
                margin: "-30px auto 48px",
                fontSize: "17px",
              }}
            >
              Make your own photo at home and save the trouble of professional
              appointments. Follow these simple steps for a perfect biometric
              result.
            </p>
            <div
              className="hc-card-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {[
                {
                  n: "1",
                  t: "Choose Document",
                  d: "Select 'DV Lottery photo' in our smart widget.",
                },
                {
                  n: "2",
                  t: "Upload Photo",
                  d: "Snap a picture with your phone and upload it. Follow our biometric guidelines.",
                },
                {
                  n: "3",
                  t: "AI Fine-Tuning",
                  d: "Our platform automatically optimizes lighting, centering, and background.",
                },
                {
                  n: "4",
                  t: "Download",
                  d: "Get your digital file instantly, ready for official submission.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="hc-card"
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#3d8c6e",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontWeight: 800,
                    }}
                  >
                    {step.n}
                  </div>
                  <h3 className="hc-card-t">{step.t}</h3>
                  <p className="hc-card-p">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TECHNICAL PARAMETERS ══ */}
        <section className="hc-sec">
          <div className="hc-in">
            <span className="hc-label">Official Specifications</span>
            <h2 className="hc-h2">DV-2027 Photo Size, Eye Level & Technical Rules</h2>
            <div
              style={{
                background: "#fff",
                borderRadius: "24px",
                border: "1px solid #eef2f1",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  background: "#f8faf9",
                  padding: "16px 32px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <span>Parameter</span>
                <span>Requirement</span>
              </div>
              {[
                { p: "Primary Use", v: "US Electronic Diversity Visa Lottery" },
                { p: "Dimensions (Pixels)", v: "600 x 600 px (1:1 Ratio)" },
                { p: "Dimensions (Inches)", v: "2 x 2 inches" },
                {
                  p: "Common Resolution",
                  v: "300 DPI (Up to 1200 DPI recommended)",
                },
                { p: "Background Color", v: "Pure White (RGB 255,255,255)" },
                { p: "File Format", v: "JPEG (.jpg)" },
                { p: "File Size", v: "Max 240 KB" },
                {
                  p: "Suitable for Online",
                  v: "Yes (Full DS-5501 Compliance)",
                },
                { p: "Printable", v: "Yes (Glossy or Matte Paper)" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    padding: "18px 32px",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f1e2d",
                    }}
                  >
                    {item.p}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#3d8c6e",
                    }}
                  >
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "20px",
                fontSize: "13px",
                color: "#94a3b8",
                textAlign: "center",
              }}
            >
              *Data based on latest US State Department guidelines for
              2025-2027.
            </p>
          </div>
        </section>

        {/* ══ DETAILED REQUIREMENTS ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
              }}
            >
              <div>
                <span className="hc-label" style={{ textAlign: "left" }}>
                  Design Standards
                </span>
                <h2
                  className="hc-h2"
                  style={{ textAlign: "left", marginBottom: 24 }}
                >
                  Official Diversity Visa (DV) Lottery Photo Rules
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#4a5568",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  Following US visa picture criteria is essential for successful
                  applications. Technical requirements include high contrast,
                  neutral colors, and strict adherence to dimensions.
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
                      t: "Color Accuracy",
                      d: "Must be in color (sRGB) with no digital enhancements or filters.",
                    },
                    {
                      t: "Resolution",
                      v: "300 DPI minimum. For best results, use 600-1200 DPI to avoid pixelation.",
                    },
                    {
                      t: "File Size",
                      v: "Aim for 1MB to 15MB for high-quality prints; submission limit is 240KB.",
                    },
                    {
                      t: "Image Definition",
                      d: "Clear focus, free of blur, noise, or artifacts. Must be printed on photo paper.",
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ marginBottom: "20px" }}>
                      <h4
                        style={{
                          fontSize: "15px",
                          fontWeight: 800,
                          color: "#0f1e2d",
                          marginBottom: 4,
                        }}
                      >
                        {item.t}
                      </h4>
                      <p style={{ fontSize: "14px", color: "#64748b" }}>
                        {item.d || item.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "32px",
                  padding: "40px",
                  border: "1px solid #eef2f1",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#0f1e2d",
                    marginBottom: 20,
                  }}
                >
                  Dress Code & Appearance
                </h3>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: 0,
                  }}
                >
                  {[
                    "Wear normal, everyday clothes.",
                    "Avoid uniforms or camouflage clothing.",
                    "No head coverings or headgear (except religious).",
                    "No eyeglasses or sunglasses (Spectacles are prohibited).",
                    "Keep a neutral expression (mouth closed).",
                    "Ensure both eyes are clearly visible and open.",
                  ].map((li, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        fontSize: "14px",
                        color: "#4a5568",
                        listStyle: "none",
                      }}
                    >
                      <span style={{ color: "#3d8c6e" }}>✓</span> {li}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    marginTop: "32px",
                    padding: "20px",
                    background: "#f8faf9",
                    borderRadius: "16px",
                    border: "1px solid #eef2f1",
                  }}
                >
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    <strong>Lighting Tip:</strong> Ensure equal light from both
                    sides to avoid shadows on the face or background. Take your
                    photo up against a neutral, white backdrop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOME PHOTO GUIDE ══ */}
        <section className="hc-sec">
          <div className="hc-in">
            <h2 className="hc-h2">Guide: Taking Your DV Lottery Photo at Home</h2>
            <div className="hc-card-grid">
              <div className="hc-card">
                <h3 className="hc-card-t">Body-Camera Distance</h3>
                <p className="hc-card-p">
                  Put your camera roughly 5 to 7 feet (1.5 to 2 meters) away.
                  This ensures your upper torso, head, and hair are completely
                  visible for identification. We advise taking several shots at
                  different distances.
                </p>
              </div>
              <div className="hc-card">
                <h3 className="hc-card-t">Posture & Gaze</h3>
                <p className="hc-card-p">
                  Remain comfortable but stand as straight as you can. Look
                  directly into the lens. Avoid tilting your head or looking
                  away, as both eyes must be equidistant from the camera.
                </p>
              </div>
              <div className="hc-card">
                <h3 className="hc-card-t">Babies & Newborns</h3>
                <p className="hc-card-p">
                  Spread a white sheet on the floor and place the baby on it.
                  Ensure no one else is visible. Fore slightly older babies,
                  prop them in a child's chair or have a hand support behind a
                  white sheet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
            <span className="hc-label">USVisaPhotoAI Suite</span>
            <h2 className="hc-h2">Advanced Editing Features</h2>
            <div
              className="hc-card-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {[
                {
                  t: "Smart Crop",
                  d: "Built-in cutting feature ensures even edges and perfect head-to-frame ratios.",
                },
                {
                  t: "Auto Resize",
                  d: "Instantly adjust to 600x600px without losing quality or stretching pixels.",
                },
                {
                  t: "BG Removal",
                  d: "Replaces any background with pure, neutral white (RGB 255,255,255).",
                },
                {
                  t: "Biometric Adjust",
                  d: "Optimizes brightness, color balance, and contrast for AI recognition.",
                },
              ].map((f, i) => (
                <div key={i} className="hc-card">
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#0f1e2d",
                      marginBottom: 8,
                    }}
                  >
                    {f.t}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="hc-sec">
          <div className="hc-in">
            <h2 className="hc-h2">
              Why Choose USVisaPhotoAI for Your DV Lottery Photo?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{ padding: "24px", borderBottom: "1px solid #f1f5f9" }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#3d8c6e",
                    marginBottom: 8,
                  }}
                >
                  100% Compliance Record
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>
                  Over 70,000 successful applications processed over 4 years. We
                  meet every parameter perfectly.
                </p>
              </div>
              <div
                style={{ padding: "24px", borderBottom: "1px solid #f1f5f9" }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#3d8c6e",
                    marginBottom: 8,
                  }}
                >
                  Professional Editing Suite
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>
                  Advanced AI cropping, resizing, and lighting tools included as
                  standard.
                </p>
              </div>
              <div
                style={{ padding: "24px", borderBottom: "1px solid #f1f5f9" }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#3d8c6e",
                    marginBottom: 8,
                  }}
                >
                  No Specialized Skills Needed
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>
                  Our AI handles the complexity. No need for Photoshop or
                  photography experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DVLotteryFAQ />
        <Reviews />

        {/* ════ CTA ════ */}
        <section className="hc-sec hc-sec-alt" style={{ textAlign: "center" }}>
          <div className="hc-in" style={{ maxWidth: 600 }}>
            <h2 className="hc-h2" style={{ marginBottom: 16 }}>
              Secure Your DV-2027 Entry Today
            </h2>
            <p className="uvp-desc" style={{ margin: "0 auto 32px" }}>
              Join the hundreds of thousands who trust our AI server to deliver
              flawless results. Get your official photo in seconds.
            </p>
            <Link
              href="/tool?type=dv-lottery"
              className="uvp-btn-p"
              style={{ background: "#3d8c6e" }}
            >
              Generate DV Lottery Photo Free →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
