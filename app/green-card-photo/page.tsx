import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import GreenCardFAQ from "../components/GreenCardFAQ";
import Reviews from "../components/Reviews";
import ComparisonSlider from "../components/ComparisonSlider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Green Card Photo Maker & Validator - Official 2x2 Inch USCIS Specs",
  description: "Official-standard green card photo tool for I-485, DS-260, and I-90 applications. Validates 2x2 inch (51x51mm) biometrics, head size, and background compliance instantly.",
  keywords: [
    "green card photo", 
    "permanent residence photo", 
    "USCIS photo requirements", 
    "2x2 green card photo", 
    "I-485 photo tool",
    "DS-260 immigrant visa photo",
    "green card photo size pixels",
  ],
  alternates: {
    canonical: "https://www.usvisaphotoai.pro/green-card-photo",
  },
};

const requirements = [
  { spec: "Print Size", value: "2 × 2 inches", emphasis: true },
  { spec: "Digital Size", value: "600 × 600 px", emphasis: false },
  { spec: "Max File Size", value: "240 KB (JPEG)", emphasis: false },
  { spec: "Background", value: "Pure White", emphasis: false },
  { spec: "Eye Level", value: "56% – 69%", emphasis: true },
  { spec: "Head Size", value: "50% – 69%", emphasis: true },
  { spec: "Glasses", value: "NOT ALLOWED", emphasis: true },
  { spec: "Expression", value: "Neutral", emphasis: false },
];

const appTypes = [
  { title: "Adjustment of Status", form: "I-485", desc: "2 photos for adjusting to permanent resident while in the US." },
  { title: "Consular Processing", form: "DS-260", desc: "Photos for immigrant visa interview at US embassy." },
  { title: "Card Renewal", form: "I-90", desc: "New photos when renewing your green card every 10 years." },
  { title: "Remove Conditions", form: "I-751", desc: "Updated photos to remove conditions on conditional residence." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Green Card Photo Maker AI",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",

        "priceCurrency": "USD"
      }
    },
    {
       "@type": "WebPage",
       "name": "Green Card Photo Maker & Validator",
       "description": "Professional 2x2 inch USCIS-compliant green card photo tool."
    }
  ]
};

export default function GreenCardPhotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        @keyframes uvp-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes uvp-float-shield {
          0%, 100% { transform: rotate(8deg) translateY(0px); }
          50%       { transform: rotate(8deg) translateY(-8px); }
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

        .uvp-btn-p {
          background: #3b5bdb; color: #fff; padding: 16px 36px; border-radius: 12px;
          font-family: var(--font-dm-sans), sans-serif; font-size: 16px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 24px rgba(59,91,219,0.2); transition: all 0.2s; display: inline-block;
        }
        .uvp-btn-p:hover { background: #2f4ac7; transform: translateY(-2px); }

        .uvp-visual-card {
          position: relative; background: #fff; padding: 12px; border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,1);
          transform: rotate(-3deg); max-width: 320px;
        }
        .uvp-visual-card img { width: 100%; border-radius: 20px; display: block; }

        .uvp-chip-shield {
          position: absolute; top: -10px; right: -20px; background: #fff; padding: 12px;
          border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); font-size: 24px;
          animation: uvp-float-shield 3s ease-in-out infinite;
        }
        .uvp-chip-verify {
          position: absolute; bottom: 20px; left: -25px; background: #fff; padding: 10px 18px;
          border-radius: 12px; border: 1.5px solid #c6e6d8; color: #3d8c6e; font-weight: 700;
          font-family: var(--font-dm-sans), sans-serif; font-size: 13px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          display: flex; align-items: center; gap: 8px; animation: uvp-float 3.5s ease-in-out infinite 0.3s;
        }

        .hc-sec { padding: 90px 24px; }
        .hc-sec-alt { background: #f8faf9; }
        .hc-in { max-width: 1100px; margin: 0 auto; }
        .hc-label { font-size: 12px; font-weight: 700; color: #3d8c6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: block; text-align: center; }
        .hc-h2 { font-family: var(--font-dm-sans), sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 800; color: #0f1e2d; text-align: center; margin-bottom: 48px; letter-spacing: -1.2px; }

        .hc-feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .hc-feature-card { background: #fff; padding: 40px; border-radius: 32px; border: 1px solid #eef2f1; transition: transform 0.2s; }
        .hc-feature-card:hover { transform: translateY(-5px); }
        .hc-feature-t { font-family: var(--font-dm-sans), sans-serif; font-size: 22px; font-weight: 800; color: #0f1e2d; margin-bottom: 16px; }
        .hc-feature-p { font-size: 15px; color: #64748b; line-height: 1.7; }

        @media (max-width: 1023px) {
          .uvp-hero-inner { flex-direction: column; text-align: center; padding: 48px 20px; }
          .uvp-hero-text { display: flex; flex-direction: column; align-items: center; }
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
                <span className="uvp-badge-txt">Permanent Residence Compliance</span>
              </div>
              <h1 className="uvp-h1">Green Card Photo Tool</h1>
              <p className="uvp-desc">
                The most reliable validator for I-485 and DS-260 biometric photos. Guaranteed 2x2 inch (51x51mm) 
                compliance for USCIS and Department of State applications.
              </p>
              <div className="uvp-btn-row">
                <Link href="/tool?type=green-card" className="uvp-btn-p">
                  Validate Green Card Photo Free →
                </Link>
              </div>
            
            </div>

            <div className="hc-visual-wrap">
              <Image
                src="/us_green_card_photo.webp"
                alt="US Green Card Photo AI - Standard 2x2 inch biometric compliance example for USCIS"
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

        {/* ══ HIGH VALUE CONTENT: BIOMETRIC MAPPING ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in">
             <span className="hc-label">Technical Standard</span>
             <h2 className="hc-h2">Biometric Data Extraction</h2>
             <div className="hc-feature-grid">
                <div className="hc-feature-card">
                   <div style={{ fontSize: "32px", marginBottom: "20px" }}>🧠</div>
                   <h3 className="hc-feature-t">Automated Facial Mapping</h3>
                   <p className="hc-feature-p">
                      When you submit Form I-485, your photo is digitized and run through the USCIS facial recognition system. 
                      This system measures over 12 unique facial landmarks (distance between pupils, width of nose, etc.). 
                      If your photo has **soft focus** or **uneven lighting**, the system cannot extract this data, 
                      leading to a Request for Evidence (RFE).
                   </p>
                </div>
                <div className="hc-feature-card">
                   <div style={{ fontSize: "32px", marginBottom: "20px" }}>📸</div>
                   <h3 className="hc-feature-t">Form-Specific Formatting</h3>
                   <p className="hc-feature-p">
                      Whether it's the **DS-260** for consular processing or the **I-90** for card renewal, 
                      the requirements are standardized but the submission methods vary. Our tool provides both 
                      a 600x600px digital file for online uploads and a printable 4x6 template (containing two 2x2 photos) 
                      for physical mail-ins.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* ════ REQUIREMENTS GRID (PREMIUM) ════ */}
        <section className="hc-sec">
          <div className="hc-in">
            <span className="hc-label">Official Specs</span>
            <h2 className="hc-h2">Green Card Photo Requirements</h2>
            <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid #eef2f1", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
              {requirements.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "24px 32px", borderBottom: i < requirements.length - 1 ? "1px solid #f1f5f9" : "none", background: r.emphasis ? "#f8faf9" : "transparent" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#0f1e2d" }}>{r.spec}</span>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: r.emphasis ? "#3d8c6e" : "#64748b" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HIGH VALUE CONTENT: NO GLASSES POLICY ══ */}
        <section className="hc-sec hc-sec-alt">
          <div className="hc-in" style={{ maxWidth: "800px" }}>
             <span className="hc-label">Policy Deep Dive</span>
             <h2 className="hc-h2" style={{ marginBottom: 24 }}>The "No Glasses" Standard</h2>
             <div style={{ background: "#fff", padding: "48px", borderRadius: "40px", border: "1px solid #eef2f1" }}>
                <p style={{ fontSize: "17px", color: "#4a5568", lineHeight: 1.8, marginBottom: 24 }}>
                   Effective November 1, 2016, the U.S. government implemented a strict **No Glasses** policy for all passport 
                   and visa photos. This is the **#1 reason** for green card photo rejection in the current year.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                   <div style={{ paddingLeft: "20px", borderLeft: "4px solid #ef4444" }}>
                      <h4 style={{ fontWeight: 800, color: "#0f1e2d", marginBottom: 8 }}>Glare Rejection</h4>
                      <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>Even the smallest reflection on the lens can obscure the eyes, which are the most critical biometric data point.</p>
                   </div>
                   <div style={{ paddingLeft: "20px", borderLeft: "4px solid #ef4444" }}>
                      <h4 style={{ fontWeight: 800, color: "#0f1e2d", marginBottom: 8 }}>Frame Obstruction</h4>
                      <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>Thick frames can hide facial borders, preventing the mapping algorithm from calculating head proportions correctly.</p>
                   </div>
                   <div style={{ paddingLeft: "20px", borderLeft: "4px solid #3d8c6e" }}>
                      <h4 style={{ fontWeight: 800, color: "#0f1e2d", marginBottom: 8 }}>Medical Exceptions</h4>
                      <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>While rare, medical exceptions require a signed statement from a healthcare professional. We highly recommend removing glasses to ensure 0% risk of RFE.</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* ══ APPLICATION TYPES ══ */}
        <section className="hc-sec">
          <div className="hc-in">
            <span className="hc-label">Guidelines by Form</span>
            <h2 className="hc-h2">Compliance for All Forms</h2>
            <div className="hc-feature-grid">
              {appTypes.map((a, i) => (
                <div key={i} style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid #eef2f1" }}>
                  <div style={{ display: "inline-block", background: "#f1f5f9", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, color: "#3d8c6e", marginBottom: "16px" }}>FORM {a.form}</div>
                  <h3 className="hc-feature-t" style={{ fontSize: "18px" }}>{a.title}</h3>
                  <p className="hc-feature-p" style={{ fontSize: "14px" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GreenCardFAQ />
        <Reviews />

        {/* ════ CTA ════ */}
        <section className="hc-sec hc-sec-alt" style={{ textAlign: "center" }}>
          <div className="hc-in" style={{ maxWidth: 600 }}>
            <h2 className="hc-h2" style={{ marginBottom: 16 }}>Ready for Your Green Card Interview?</h2>
            <p className="uvp-desc" style={{ margin: "0 auto 32px" }}>
              Ensure your application isn't delayed by a simple photo error. Use our official validator now.
            </p>
            <Link href="/tool?type=green-card" className="uvp-btn-p">
              Validate My Photo Now →
            </Link>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: 20 }}>
               Trusted for I-485, DS-260, and I-90 compliance.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
