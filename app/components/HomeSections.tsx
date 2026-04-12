import Image from "next/image";
import Link from "next/link";

/* ─── Data ─── */
const steps = [
  {
    num: "01",
    title: "Upload Photo",
    desc: "Upload your photo. We accept JPEG, PNG, and HEIC formats from any device.",
    icon: "📤",
  },
  {
    num: "02",
    title: "Instant Validation",
    desc: "Your photo is automatically checked against specific country rules in seconds.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Compliance Report",
    desc: "See exactly which points PASS or FAIL with clear reasons and fix suggestions.",
    icon: "📋",
  },
  {
    num: "04",
    title: "Small Fee",
    desc: "Local pricing based on your country. One-time payment for pro results.",
    icon: "💳",
  },
  {
    num: "05",
    title: "Download",
    desc: "Get your compliant, processed photo and print sheet instantly.",
    icon: "⬇️",
  },
];

const specs = [
  {
    label: "Dimensions",
    value: "35x45mm / 2x2in",
    detail: "Supports all global sizes",
  },
  { label: "Format", value: "JPEG / PNG", detail: "Optimized for quality" },
  { label: "Background", value: "Dynamic", detail: "White, Off-white, Gray" },
  {
    label: "Eye Position",
    value: "Biometric",
    detail: "Centered per local rules",
  },
  { label: "Head Size", value: "Scaled", detail: "Automatic crown-to-chin" },
  {
    label: "Expression",
    value: "Neutral",
    detail: "Mouth closed, eyes open",
  },
];

const toolPages = [
  {
    href: "/india-passport-photo-editor",
    title: "India Passport",
    target: "Passport Applicants",
    desc: "35x45mm, white background. Fully compliant with Indian passport standards.",
  },
  {
    href: "/uk-passport-photo-editor",
    title: "UK Passport",
    target: "HMPO Applicants",
    desc: "35x45mm, light gray background. HMPO and Digital Code compliant.",
  },
  {
    href: "/us-visa-photo-editor",
    title: "US Visa Photo",
    target: "DS-160 Applicants",
    desc: "600x600px, white background. Perfect for DS-160 and Green Card.",
  },
  {
    href: "/visa-photo-validator",
    title: "Free Validator",
    target: "Compliance Check",
    desc: "Validate any official document photo for free. Instant PASS/FAIL report.",
  },
];

const privacyItems = [
  {
    icon: "⏱️",
    title: "24-Hour Auto-Delete",
    desc: "All original photos are automatically and permanently deleted after 24 hours.",
  },
  {
    icon: "🔗",
    title: "Expiring Links",
    desc: "Download URLs are signed and expire after 1 hour. No permanent access.",
  },
  {
    icon: "🛡️",
    title: "GDPR & CCPA",
    desc: "Full data deletion options. We comply with global privacy regulations.",
  },
  {
    icon: "🗑️",
    title: "No Permanent Storage",
    desc: "Processed images are never stored after download. Your data is yours.",
  },
];

const docPills = [
  "India Passport",
  "UK Passport",
  "US Visa",
  "Schengen Visa",
  " Visa",
  "Australia Passport",
  "UAE Visa",
  "Saudi Arabia Passport",
];

const officialSources = [
  {
    agency: "International Civil Aviation Org",
    doc: "Doc 9303 Machine Readable Travel Documents",
    url: "https://www.icao.int/publications/pages/publication.aspx?docnum=9303",
    note: "The global standard for biometric passport photos.",
    badge: "ICAO",
  },
  {
    agency: "U.S. Department of State",
    doc: "Visa and Passport Photo Requirements",
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    note: "Official photo specs for all visa types globally.",
    badge: "State Dept.",
  },
  {
    agency: "GOV.UK",
    doc: "UK Passport Photo Rules",
    url: "https://www.gov.uk/photos-for-passports",
    note: "Official UK government standards for passport photos.",
    badge: "UK HMPO",
  },
  {
    agency: "EU Commission",
    doc: "Schengen Visa Photo Standards",
    url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
    note: "European standards for Schengen visa applications.",
    badge: "EU Visa",
  },
];

const rejectionReasons = [
  {
    num: "01",
    title: "Incorrect Background Color",
    why: "Shadows, patterns, or the wrong shade (e.g. blue instead of white) are the top rejection reasons globally.",
    check: "AI measures background luminance and color uniformity across 9 zones.",
  },
  {
    num: "02",
    title: "Wrong Eye Position",
    why: "Eyes must be positioned precisely for facial recognition cameras at border control.",
    check: "Facial landmark model measures exact eye-center coordinates.",
  },
  {
    num: "03",
    title: "Head Size Mismatch",
    why: "Whether it's 70% or 50%, every country has a specific head-to-image ratio requirement.",
    check: "Bounding box detection calculates crown-to-chin pixel span.",
  },
  {
    num: "04",
    title: "Shadows on Face",
    why: "Uneven lighting obscures biometric markers like the nose bridge or lip line.",
    check: "Luminance gradient analysis across facial regions.",
  },
];

const documentTypes = [
  {
    doc: "Passport Photos",
    icon: "🛂",
    href: "/tool",
    toolHref: "/tool",
    specs: [
      "Custom sizes (35x45mm, 40x60mm, etc.)",
      "Dynamic background removal",
      "Head size scaling per country",
      "Print-ready sheets (A4/Letter)",
    ],
    note: "We support over 50 countries. Our AI automatically adapts to the specific sizing and biometric rules of the country you select.",
  },
  {
    doc: "Visa Photos",
    icon: "🌐",
    href: "/tool",
    toolHref: "/tool",
    specs: [
      "Square or Rectangular formats",
      "Digital upload optimization",
      "Color-space (sRGB) validation",
      "JPEG compression under local limits",
    ],
    note: "Visa requirements are often stricter than passports. We ensure your digital file is ready for any online submission portal.",
  },
];

const expertTips = [
  {
    icon: "💡",
    title: "Use Natural Light — Facing a Window",
    body: "Position yourself facing a window with natural daylight. This creates even, shadow-free illumination. Avoid overhead lights, which cast downward shadows on the nose and chin. Avoid lamps behind you, which create dark backgrounds.",
  },
  {
    icon: "📱",
    title: "Disable Portrait Mode on Your Phone",
    body: "iPhone and Android portrait modes add artificial bokeh blur to the background. This can corrupt the pure-white RGB requirement. Use standard photo mode and stand against a white wall or door instead.",
  },
  {
    icon: "📏",
    title: "Distance Matters More Than You Think",
    body: "Stand approximately 3–5 feet from your camera or phone. Too close and your head fills the entire frame (head size > 69%). Too far and your head is too small (< 50%). Have someone else take the photo rather than a selfie.",
  },
  {
    icon: "🧱",
    title: "The Best DIY White Background",
    body: "Tape a large white poster board or sheet to a wall. Stand at least 3 feet in front of it to prevent your shadow from falling onto it. A white door works well too. Avoid paper with any texture, watermarks, or slight cream tones.",
  },
  {
    icon: "👀",
    title: "Look Directly at the Camera Lens",
    body: "Look at the camera lens — not the screen. On phones, the lens is above the screen. Looking at the screen preview causes a subtle downward gaze that fails the eye direction check. Have someone count down before they take the shot.",
  },
  {
    icon: "🪥",
    title: "Remove Everything from Your Face",
    body: "Remove glasses, earrings, face jewelry, headphones, and AirPods. Tie back hair so ears are fully visible. Remove hats and caps. Religious head coverings are permitted but must not shade the face or obscure the hairline.",
  },
];

const comparisonRows = [
  ["Price", "$5.99 one-time", "$15–$25 + travel", "$3–$15 per photo"],
  ["DS-160 Upload Ready", "✅ Yes", "⚠️ Not always digital", "⚠️ Varies"],
  ["Eye Position Check (56–69%)", "✅ AI-measured", "❌ Human eye only", "⚠️ Basic only"],
  ["Head Size Check (50–69%)", "✅ Pixel-precise", "❌ Not measured", "⚠️ Crop only"],
  ["Background RGB Validation", "✅ 9-zone analysis", "❌ Visual only", "⚠️ Basic removal"],
  ["Glasses Detection", "✅ Auto-detected", "❌ Manual reminder", "⚠️ Not always"],
  ["Free Validation Before Paying", "✅ Always free", "❌ Pay upfront", "❌ Pay upfront"],
  ["A4 Print Sheet (20 photos)", "✅ Included", "✅ Printed for you", "❌ Extra cost"],
  ["24-Hour Photo Deletion", "✅ Auto-deleted", "⚠️ May retain copies", "⚠️ Unknown"],
  ["Processing Time", "Under 30 seconds", "15–30 minutes", "1–5 minutes"],
  ["Available 24/7", "✅ Yes", "❌ Business hours", "✅ Yes"],
];

export default function HomeSections({
  price,
  seoContent,
}: {
  price: string;
  seoContent?: React.ReactNode;
}) {
  const defaultSeoContent = (
    <div className="hc-seo-grid">
      <div className="hc-seo-visual">
        <div
          style={{
            padding: "40px",
            background: "#f8faf9",
            borderRadius: "32px",
            border: "1px solid #eef2f1",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#3d8c6e",
              marginBottom: 16,
            }}
          >
            Quality Matters Most
          </h3>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: 0,
            }}
          >
            {[
              "Pixel-Level Integrity (No artifacts)",
              "Pure RGB 255 White Background",
              "Standardized Eye Level (56-69%)",
              "Head Height Alignment (50-69%)",
              "Luminance Balance Analysis",
              "Strict 64-Point Biometric Scan",
            ].map((li, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#4a5568",
                  listStyle: "none",
                }}
              >
                <span style={{ color: "#3d8c6e" }}>✓</span> {li}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hc-seo-text">
        <h2 className="hc-seo-h2">
          Official Global Document Photo Requirements: Why AI Precision is Necessary
        </h2>
        <p className="hc-seo-p">
          Securing an international passport, navigating a Schengen Visa application,
          or applying for residency are life-changing milestones for millions. However,
          a single non-compliant photograph is often the hidden culprit behind sudden
          rejections or long administrative delays. At{" "}
          <strong>PixPassport</strong>, we've bridged the gap between amateur
          smartphone photography and the rigorous ICAO biometric standards demanded
          by immigration agencies worldwide.
        </p>
        <p className="hc-seo-p">
          <strong>Why Biometric Accuracy is Non-Negotiable:</strong> Modern
          embassy systems use advanced facial recognition algorithms to verify
          identities. These systems aren't just looking for a "good" picture;
          they require specific geometry. Your eyes must be positioned between{" "}
          <strong>56% and 69%</strong> from the bottom edge of the image, and
          the head must fill exactly 50% to 69% of the height. Even a 1%
          deviation can trigger an automatic system flag. Our AI-driven
          validator scans <strong>64 unique facial landmarks</strong> in under
          five seconds.
        </p>
        <p className="hc-seo-p">
          <strong>Common Pitfalls:</strong> While most applicants know they need
          a white background, "pure white" (RGB 255,255,255) is harder to
          achieve than it looks. Shadows behind the ears, "hot spots" from
          camera flashes, or subtle tints from indoor lighting are common
          reasons for failure. Furthermore, the universal "No Glasses" biometric policy is
          strictly enforced by most nations. Our tool doesn't just crop; it performs a
          deep-level luminance analysis to ensure your background is truly
          neutral.
        </p>
        <p className="hc-seo-p">
          We believe that high-stakes applications shouldn't require
          professional photography equipment. Whether you're applying for a{" "}
          <strong>Schengen Visa</strong>, an Australian ETA, or renewing your
          UK or Indian Passport, our platform empowers you to take a compliant photo
          from home. By combining expert knowledge of global immigration policies
          with cutting-edge computer vision, we provide a stress-free path to a
          perfect submission.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ────────── RESPONSIVE FIXES ────────── */}
      <style>{`
        /* ── Document Type Cards ── */
        .hc-doctype-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 32px;
        }
        .hc-doctype-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: start;
        }
        .hc-doctype-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .hc-doctype-h3 {
          font-size: 18px;
          font-weight: 800;
          color: #1a202c;
          margin: 0;
        }
        .hc-doctype-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }
        .hc-doctype-pill {
          font-size: 12px;
          font-weight: 600;
          color: #2d6a4f;
          background: #f0faf6;
          border: 1px solid #b2dfdb;
          padding: 4px 10px;
          border-radius: 999px;
        }
        .hc-doctype-note {
          font-size: 14px;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }
        .hc-doctype-actions {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          min-width: 130px;
        }
        .hc-doctype-btn {
          font-size: 13px !important;
          padding: 10px 14px !important;
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
        }
        .hc-doctype-link {
          font-size: 12px;
          color: #3d8c6e;
          text-align: center;
          text-decoration: underline;
        }
        @media (max-width: 640px) {
          .hc-doctype-card {
            grid-template-columns: 1fr;
          }
          .hc-doctype-actions {
            flex-direction: row;
            min-width: unset;
            align-items: center;
          }
          .hc-doctype-btn {
            flex: 1;
          }
          .hc-doctype-h3 {
            font-size: 16px;
          }
        }

        /* ── Comparison Table (desktop) ── */
        .hc-cmp-table-wrap {
          margin-top: 32px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .hc-cmp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .hc-cmp-th {
          padding: 14px 18px;
          font-weight: 700;
          border-bottom: 2px solid #b2dfdb;
          white-space: nowrap;
        }
        .hc-cmp-th-feat {
          text-align: left;
          color: #1a202c;
          background: #f0faf6;
        }
        .hc-cmp-th-us {
          text-align: center;
          color: #2d6a4f;
          font-weight: 800;
          background: #d8f3dc;
          border-bottom-color: #3d8c6e;
        }
        .hc-cmp-th-alt {
          text-align: center;
          color: #4a5568;
          background: #f0faf6;
        }
        .hc-cmp-td {
          padding: 12px 18px;
          border-bottom: 1px solid #e2e8f0;
        }
        .hc-cmp-td-feat {
          font-weight: 600;
          color: #2d3748;
        }
        .hc-cmp-td-us {
          text-align: center;
          color: #2d6a4f;
          font-weight: 700;
        }
        .hc-cmp-td-alt {
          text-align: center;
          color: #4a5568;
        }
        .hc-cmp-row-even { background: #fff; }
        .hc-cmp-row-odd  { background: #f8fdf9; }
        .hc-cmp-us-even  { background: #f0faf6; }
        .hc-cmp-us-odd   { background: #e8f5e9; }

        /* ── Comparison Mobile Cards ── */
        .hc-cmp-cards { display: none; }

        @media (max-width: 700px) {
          .hc-cmp-table-wrap { display: none; }
          .hc-cmp-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 24px;
          }
          .hc-cmp-card {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px;
          }
          .hc-cmp-card-feat {
            font-size: 14px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f0faf6;
          }
          .hc-cmp-card-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            border-bottom: 1px dashed #f0f4f8;
            gap: 8px;
          }
          .hc-cmp-card-row:last-child { border-bottom: none; }
          .hc-cmp-card-row-us {
            background: #f0faf6;
            border-radius: 8px;
            padding: 6px 10px;
            border-bottom: none;
            margin-bottom: 4px;
          }
          .hc-cmp-card-label {
            font-size: 11px;
            font-weight: 600;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            white-space: nowrap;
          }
          .hc-cmp-card-val {
            font-size: 13px;
            color: #4a5568;
            text-align: right;
          }
          .hc-cmp-card-val-us {
            color: #2d6a4f;
            font-weight: 700;
          }
        }
      `}</style>

      {/* ────────── PILLS ────────── */}
      <section className="hc-pills">
        <div className="hc-pills-in">
          <span className="hc-pills-lbl">Available for:</span>
          {docPills.map((t, i) => (
            <a
              key={i}
              href={`/tool?type=${t.toLowerCase().replace(/[\s/]/g, "-")}`}
              className="hc-pill"
            >
              {t}
            </a>
          ))}
        </div>
      </section>

      {/* ────────── STRIP ────────── */}
      <section className="hc-strip">
        <div className="hc-strip-in">
          {[
            { stat: "12,000+", label: "Photos Processed" },
            { stat: "99.8%", label: "Acceptance Rate" },
            { stat: "120+", label: "Countries Supported" },
            { stat: "30s", label: "Ready in Seconds" },
            { stat: "Official", label: "ICAO Compliant" },
          ].map((s, i) => (
            <div key={i} className="hc-strip-item">
              <div className="hc-strip-stat">{s.stat}</div>
              <div className="hc-strip-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>



      {/* ────────── HOW IT WORKS ────────── */}
      <section id="how-it-works" className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Simple Process</span>
            <h2 className="hc-h2">How to Create a Compliant Biometric Photo Online</h2>
            <p className="hc-sub">
              From upload to compliant photo in under a minute.
            </p>
          </div>
          <div className="hc-steps">
            {steps.map((step, i) => (
              <div key={i} className="hc-step">
                <div className="hc-step-bg">{step.num}</div>
                <div
                  className={`hc-step-icon${i >= 2 ? " hc-step-icon-b" : ""}`}
                >
                  {step.icon}
                </div>
                <div className="hc-step-t">{step.title}</div>
                <div className="hc-step-d">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="hc-sec-cta">
            <a
              href="/tool"
              className="hc-btn-p"
              style={{ display: "inline-flex" }}
            >
              Start Now — Upload Your Photo →
            </a>
          </div>
        </div>
      </section>

      {/* ────────── SPECS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Official Requirements</span>
            <h2 className="hc-h2">Official 2026 Global Document Photo Specifications</h2>
            <p className="hc-sub">
              Every photo is validated against official ICAO and government-specific
              biometric requirements.
            </p>
          </div>
          <div className="hc-specs">
            {specs.map((spec, i) => (
              <div key={i} className="hc-spec">
                <div className="hc-spec-l">{spec.label}</div>
                <div className="hc-spec-v">{spec.value}</div>
                <div className="hc-spec-d">{spec.detail}</div>
              </div>
            ))}
          </div>
          <div className="hc-spec-note">
            <div className="hc-spec-note-icon">ℹ️</div>
            <div>
              <div className="hc-spec-note-t">
                Biometric Requirements are Critical
              </div>
              <div className="hc-spec-note-p">
                The most common rejection reasons are incorrect eye position
                and head size. Your face must be centered, looking directly at
                the camera with a neutral expression. No glasses, head
                coverings (except religious/medical), or shadows on the face.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── OFFICIAL SOURCES ────────── */}
      <section className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Verified by Official Sources</span>
            <h2 className="hc-h2">Straight from Official Government Sources</h2>
            <p className="hc-sub">
              Every requirement we enforce comes directly from official global publications,
              including the European Commission, HMPO, and the Department of State.
              No guesswork — only authoritative specifications.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {officialSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "24px",
                  background: "#f0faf6",
                  border: "1px solid #b2dfdb",
                  borderRadius: "16px",
                  textDecoration: "none",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#2d6a4f",
                      background: "#d8f3dc",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {src.badge}
                  </span>
                  <span style={{ fontSize: "13px", color: "#3d8c6e" }}>↗</span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1b4332",
                    marginBottom: "4px",
                  }}
                >
                  {src.agency}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#2d6a4f",
                    marginBottom: "8px",
                  }}
                >
                  {src.doc}
                </div>
                <div
                  style={{ fontSize: "13px", color: "#4a5568", lineHeight: "1.5" }}
                >
                  {src.note}
                </div>
              </a>
            ))}
          </div>
          <p
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "13px",
              color: "#718096",
            }}
          >
            PixPassport automatically adjusts your images to comply with the global specifications above.
            When in doubt, always refer to your country's official passport or visa agency portal.
          </p>
        </div>
      </section>


      {/* ────────── REJECTION REASONS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Why Photos Get Rejected</span>
            <h2 className="hc-h2">Common Biometric Photo Mistakes</h2>
            <p className="hc-sub">
              Consulates and embassies reject thousands of applications annually due to non-compliant photos.
              Here are the most frequent failures — and what our AI checks for each one.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            {rejectionReasons.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "16px",
                    fontSize: "36px",
                    fontWeight: 900,
                    color: "#f0faf6",
                    lineHeight: 1,
                  }}
                >
                  {r.num}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1a202c",
                    marginBottom: "8px",
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#4a5568",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                  }}
                >
                  {r.why}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#3d8c6e",
                    background: "#f0faf6",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  ✓ Our check: {r.check}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ────────── EXPERT TIPS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Expert Guidance</span>
            <h2 className="hc-h2">How to Take a Perfect Photo at Home</h2>
            <p className="hc-sub">
              You don't need a professional photographer. Follow these
              evidence-based tips and your smartphone photo will pass every
              official biometric check.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {expertTips.map((tip, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                  {tip.icon}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#1a202c",
                    marginBottom: "8px",
                  }}
                >
                  {tip.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#4a5568",
                    lineHeight: "1.7",
                  }}
                >
                  {tip.body}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "32px",
              padding: "20px 28px",
              background: "#fffbeb",
              border: "1px solid #f6e05e",
              borderRadius: "16px",
              fontSize: "14px",
              color: "#744210",
            }}
          >
            <strong>💡 Pro Tip:</strong> After taking your photo, upload it to
            our free validator before paying anything. You'll see an instant
            PASS/FAIL report with the exact reason for any failure — so you can
            retake and re-upload until it's perfect, completely free.
          </div>
        </div>
      </section>

      {/* ────────── COMPARISON TABLE ────────── */}
      <section className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Why Us</span>
            <h2 className="hc-h2">PixPassport vs. Your Alternatives</h2>
            <p className="hc-sub">
              See why thousands choose our AI tool over photo studios and other
              online services.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hc-cmp-table-wrap">
            <table className="hc-cmp-table">
              <thead>
                <tr>
                  <th className="hc-cmp-th hc-cmp-th-feat">Feature</th>
                  <th className="hc-cmp-th hc-cmp-th-us">PixPassport</th>
                  <th className="hc-cmp-th hc-cmp-th-alt">Photo Studio</th>
                  <th className="hc-cmp-th hc-cmp-th-alt">Other Online Tools</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feat, us, studio, other], i) => (
                  <tr key={i} className={i % 2 === 0 ? "hc-cmp-row-even" : "hc-cmp-row-odd"}>
                    <td className="hc-cmp-td hc-cmp-td-feat">{feat}</td>
                    <td className={`hc-cmp-td hc-cmp-td-us ${i % 2 === 0 ? "hc-cmp-us-even" : "hc-cmp-us-odd"}`}>{us}</td>
                    <td className="hc-cmp-td hc-cmp-td-alt">{studio}</td>
                    <td className="hc-cmp-td hc-cmp-td-alt">{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="hc-cmp-cards">
            {comparisonRows.map(([feat, us, studio, other], i) => (
              <div key={i} className="hc-cmp-card">
                <div className="hc-cmp-card-feat">{feat}</div>
                <div className="hc-cmp-card-row hc-cmp-card-row-us">
                  <span className="hc-cmp-card-label">PixPassport</span>
                  <span className="hc-cmp-card-val hc-cmp-card-val-us">{us}</span>
                </div>
                <div className="hc-cmp-card-row">
                  <span className="hc-cmp-card-label">Photo Studio</span>
                  <span className="hc-cmp-card-val">{studio}</span>
                </div>
                <div className="hc-cmp-card-row">
                  <span className="hc-cmp-card-label">Other Online</span>
                  <span className="hc-cmp-card-val">{other}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── PRICING ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-xs">
          <span className="hc-label">Simple Pricing</span>
          <h2 className="hc-h2">Why pay more?</h2>
          <p className="hc-sub" style={{ marginBottom: "32px" }}>
            Photo studios charge $10–$20 + travel time. Get the same compliant
            photo here in 30 seconds for just {price}.
          </p>

          <div className="hc-price-card" style={{ marginTop: "8px" }}>
            <div className="hc-price-pop">Most Popular</div>
            <div className="hc-price-amt">{price}</div>
            <div className="hc-price-note">
              One-time · 1 digital photo + A4 print sheet
            </div>

            <div style={{ marginTop: "24px" }}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Free Includes:
              </p>
              <div className="hc-price-feat" style={{ marginBottom: "20px" }}>
                <span className="hc-pf-chk">✓</span>
                <span className="hc-pf-txt">
                  Check if your photo passes or fails
                </span>
              </div>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Paid Includes:
              </p>
              {[
                "Official compliant photo download",
                "Auto crop & resize (600x600)",
                "Background correction to pure white",
                "File size optimization (<240KB)",
                "A4 print sheet (20 photos)",
                "24-hour secure storage",
              ].map((feat, i) => (
                <div key={i} className="hc-price-feat">
                  <span className="hc-pf-chk">✓</span>
                  <span className="hc-pf-txt">{feat}</span>
                </div>
              ))}
            </div>

            <a
              href="/tool"
              className="hc-btn-block"
              style={{ marginTop: "24px" }}
            >
              Get My Approved Photo →
            </a>
            <div className="hc-price-sm">
              No account required · One-time payment
            </div>
          </div>
        </div>
      </section>


      {/* ────────── PRIVACY ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Your Privacy Matters</span>
            <h2 className="hc-h2">Built With Trust &amp; Security</h2>
          </div>
          <div className="hc-priv">
            {privacyItems.map((item, i) => (
              <div key={i} className="hc-priv-item">
                <div className="hc-priv-icon">{item.icon}</div>
                <div className="hc-priv-t">{item.title}</div>
                <div className="hc-priv-d">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── SEO CONTENT GUIDE ────────── */}
      <section className="hc-seo-sec">
        {seoContent || defaultSeoContent}
      </section>

      {/* ────────── FINAL CTA ────────── */}
      <section className="hc-sec hc-sec-dk hc-final">
        <h2 className="hc-final-h2">Ready to Get Your Compliant Photo?</h2>
        <p className="hc-final-p">
          Don't risk rejection. Validate your photo for free and get a
          compliant version in under a minute.
        </p>
        <a href="/tool" className="hc-btn-final">
          Check Your Photo Free →
        </a>
        <div
          className="hc-final-note"
          style={{ color: "white", opacity: 0.7 }}
        >
          No account required · Free validation · $5.99 to download
        </div>
      </section>
    </>
  );
}