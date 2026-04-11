import Image from "next/image";
import Link from "next/link";

/* ─── Data ─── */
const steps = [
  {
    num: "01",
    title: "Upload Photos",
    desc: "Upload your photo. We accept JPEG, PNG, and HEIC formats.",
    icon: "📤",
  },
  {
    num: "02",
    title: "Instant Validation",
    desc: "Each photo is checked against all US State Department specifications in seconds.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Compliance Report",
    desc: "See exactly which checks PASS or FAIL with clear reasons and fix suggestions.",
    icon: "📋",
  },
  {
    num: "04",
    title: "Pay $5.99",
    desc: "One-time payment to unlock your processed, fully compliant photo download.",
    icon: "💳",
  },
  {
    num: "05",
    title: "Download",
    desc: "Download your compliant, processed photo from your dashboard instantly.",
    icon: "⬇️",
  },
];

const specs = [
  {
    label: "Dimensions",
    value: "600 × 600 px",
    detail: "Square 1:1 aspect ratio",
  },
  { label: "Max File Size", value: "240 KB", detail: "JPEG format required" },
  { label: "Background", value: "Pure White", detail: "RGB (255, 255, 255)" },
  {
    label: "Eye Position",
    value: "56% – 69%",
    detail: "From bottom edge of image",
  },
  { label: "Head Size", value: "50% – 69%", detail: "Crown to chin ratio" },
  {
    label: "Expression",
    value: "Neutral",
    detail: "Mouth closed, both eyes open",
  },
];

const toolPages = [
  {
    href: "/us-visa-photo",
    title: "US Visa Photo",
    target: "DS-160 Applicants",
    desc: "600×600px, 240KB max, white background. Fully compliant with DS-160 requirements.",
  },
  {
    href: "/dv-lottery-photo-2027",
    title: "DV Lottery 2027",
    target: "Green Card Lottery",
    desc: "Same as visa specs with strict eye level validation. Ready for DV-2027 applications.",
  },
  {
    href: "/us-passport-photo",
    title: "US Passport Photo",
    target: "Passport Renewals",
    desc: "600×600px digital photo for online submissions. DIY printable 2×2 inch option.",
  },
  {
    href: "/green-card-photo",
    title: "Green Card Photo",
    target: "Permanent Residence",
    desc: "2×2 inch compliant photo. No glasses allowed. Correct biometric positioning.",
  },
  {
    href: "/photo-validator",
    title: "Free Photo Validator",
    target: "Quick Compliance Check",
    desc: "Validate any US document photo for free. Instant PASS/FAIL report, no payment needed.",
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
  "DS-160 Visa",
  "DV-2027 Lottery",
  "US Passport",
  "Green Card",
  "H1-B Visa",
  "F1 Student",
  "B1/B2 Visitor",
  "OPT/EAD Card",
];

const officialSources = [
  {
    agency: "U.S. Department of State",
    doc: "Nonimmigrant Visa Photo Requirements",
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    note: "Official photo specs for all US visa types including DS-160.",
    badge: "State Dept.",
  },
  {
    agency: "U.S. Department of State",
    doc: "Diversity Visa Lottery Photo Requirements",
    url: "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-instructions.html",
    note: "Official DV-2027 entry instructions including biometric photo rules.",
    badge: "DV Lottery",
  },
  {
    agency: "USCIS",
    doc: "Photo Requirements for Immigration Documents",
    url: "https://www.uscis.gov/forms/filing-guidance/photo-requirements",
    note: "USCIS photo standards for Green Card, EAD, and other immigration benefits.",
    badge: "USCIS",
  },
  {
    agency: "U.S. Department of State",
    doc: "Passport Photo Requirements",
    url: "https://travel.state.gov/content/travel/en/passports/need-passport/photos.html",
    note: "Official 2×2 inch photo specs for U.S. passport applications and renewals.",
    badge: "Passport",
  },
];

const rejectionReasons = [
  {
    num: "01",
    title: "Incorrect Background Color",
    why: "Off-white, cream, gray, or shadowed backgrounds fail the pure white (RGB 255,255,255) standard. Even a subtle shadow behind your ears is enough to trigger rejection.",
    check: "AI measures background luminance across 9 zones. All must read 255.",
  },
  {
    num: "02",
    title: "Wrong Eye Position",
    why: "Your eyes must sit between 56% and 69% from the bottom of the image. Photos taken too close or too far from the camera shift this ratio outside the allowed range.",
    check: "Facial landmark model measures exact eye-center Y-coordinate percentage.",
  },
  {
    num: "03",
    title: "Head Too Small or Too Large",
    why: "Head height (crown to chin) must fill 50%–69% of the image. Cropping too tight or leaving too much empty space above the head are common errors.",
    check: "Bounding box detection calculates crown-to-chin pixel span as a percentage of total height.",
  },
  {
    num: "04",
    title: "Wearing Glasses",
    why: "Since November 2016, the State Department bans all eyewear in US visa and passport photos. Prescription glasses, tinted lenses, and photochromic lenses are all prohibited.",
    check: "Object-detection model flags any eyewear present in the image.",
  },
  {
    num: "05",
    title: "Shadows on Face or Background",
    why: "Uneven lighting creates shadows across the face or cast onto the background. This is particularly common with phone cameras and indoor lighting.",
    check: "Luminance gradient analysis across facial regions and background zones.",
  },
  {
    num: "06",
    title: "File Too Large or Wrong Format",
    why: "DS-160 enforces a strict 240KB file size cap and requires JPEG format. PNG and HEIC files must be converted. Uncompressed JPEGs often exceed the size limit.",
    check: "File format validation + byte-size check. We auto-optimize to 240KB if needed.",
  },
  {
    num: "07",
    title: "Head Covering (Non-Religious)",
    why: "Hats, caps, visors, and fashion head coverings are not permitted. Religious head coverings are allowed but must not obscure facial features.",
    check: "Head region analysis for non-face occlusion above the forehead.",
  },
  {
    num: "08",
    title: "Not Looking Directly at Camera",
    why: "Eyes must be open and looking straight ahead. Downward gaze, looking to the side, or closed/squinting eyes will cause failure.",
    check: "Gaze direction vectors measured from iris position relative to eye corners.",
  },
  {
    num: "09",
    title: "Image Too Small or Wrong Aspect Ratio",
    why: "DS-160 requires at minimum 600×600 pixels in a square 1:1 ratio. Portrait or landscape crops fail immediately.",
    check: "Pixel dimension and aspect ratio verified before any further processing.",
  },
];

const documentTypes = [
  {
    doc: "DS-160 Visa Application",
    icon: "🛂",
    href: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    toolHref: "/tool?type=ds-160-visa",
    specs: [
      "600×600px minimum, JPEG only",
      "Under 240KB file size",
      "White background (RGB 255,255,255)",
      "Eyes at 56–69% from bottom",
      "Head height 50–69% of image",
      "No glasses since Nov 2016",
      "Taken within the last 6 months",
    ],
    note: "The DS-160 online form has a strict photo upload validator. Failing at the form stage after completing the entire application is frustrating — validate here first.",
  },
  {
    doc: "DV Lottery 2027 (Diversity Visa)",
    icon: "🌐",
    href: "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-instructions.html",
    toolHref: "/tool?type=dv-lottery",
    specs: [
      "Same as DS-160 photo specs",
      "Photo must be from within the last 6 months",
      "Only one entry per person allowed",
      "Wrong photo = disqualification with no appeal",
    ],
    note: "The DV Lottery is particularly unforgiving. A non-compliant photo doesn't delay your entry — it permanently disqualifies you for that year. There is no correction mechanism.",
  },
  {
    doc: "U.S. Passport (Online Renewal)",
    icon: "📘",
    href: "https://travel.state.gov/content/travel/en/passports/need-passport/photos.html",
    toolHref: "/tool?type=us-passport",
    specs: [
      "600×600px digital (for online)",
      "2×2 inch printed (for mail-in)",
      "White or off-white background",
      "Printed on matte or glossy photo paper if mailing",
      "No digital alterations to appearance",
    ],
    note: "Online passport renewal (for eligible applicants) uses the same digital 600×600px spec. Mail-in renewals require a physical 2×2 inch print — our A4 print sheet includes 20 correctly-sized photos.",
  },
  {
    doc: "Green Card (Form I-485 / I-90)",
    icon: "🟩",
    href: "https://www.uscis.gov/forms/filing-guidance/photo-requirements",
    toolHref: "/tool?type=green-card",
    specs: [
      "2×2 inch printed photos required",
      "White to off-white background",
      "No glasses allowed",
      "Taken within 30 days of filing",
      "Write your A-Number lightly on the back in pencil",
    ],
    note: "USCIS typically requires two physical 2×2 inch photos mailed with your application. Our A4 print-ready sheet makes this simple — print and cut at home.",
  },
  {
    doc: "H1-B, F1, J1, and Other Nonimmigrant Visas",
    icon: "🎓",
    href: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    toolHref: "/tool?type=nonimmigrant-visa",
    specs: [
      "All follow the same DS-160 photo standard",
      "600×600px JPEG, under 240KB",
      "Pure white background",
      "Biometric eye and head position rules apply",
      "No glasses, no head coverings (except religious)",
    ],
    note: "H1-B, H4, L1, F1, J1, O1, and B1/B2 visa photos all use the DS-160 standard. One validated photo works for any of these applications.",
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
          US Visa & Passport Photo Requirements: Why AI Precision is Necessary
        </h2>
        <p className="hc-seo-p">
          Securing a U.S. Visa (DS-160) or entering the Diversity Visa (DV)
          Lottery is a life-changing milestone for thousands. However, a single
          non-compliant photograph is often the hidden culprit behind sudden
          rejections or long administrative delays. At{" "}
          <strong>USVisaPhotoAI</strong>, we've bridged the gap between amateur
          smartphone photography and the rigorous biometric standards demanded
          by the U.S. Department of State.
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
          reasons for failure. Furthermore, the 2016 "No Glasses" policy is
          strictly enforced. Our tool doesn't just crop; it performs a
          deep-level luminance analysis to ensure your background is truly
          neutral.
        </p>
        <p className="hc-seo-p">
          We believe that high-stakes applications shouldn't require
          professional photography equipment. Whether you're applying for an{" "}
          <strong>H1-B specialty visa</strong>, a Green Card, or renewing a
          U.S. Passport, our platform empowers you to take a compliant photo
          from home. By combining expert knowledge of U.S. immigration policies
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
            { stat: "Official", label: "State Dept. Compliant" },
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
            <h2 className="hc-h2">How to Create a Compliant US Visa Photo Online</h2>
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
              href="/tool?type=us-visa"
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
            <h2 className="hc-h2">Official 2026 US Visa & Passport Photo Specifications</h2>
            <p className="hc-sub">
              Every photo validated against official U.S. State Department
              requirements.
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
            <h2 className="hc-h2">Straight from the U.S. Government</h2>
            <p className="hc-sub">
              Every requirement we enforce comes directly from official U.S.
              Department of State and USCIS publications. No guesswork — only
              authoritative specifications.
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
            USVisaPhotoAI enforces all specifications above. When in doubt,
            always verify at{" "}
            <a
              href="https://travel.state.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3d8c6e", fontWeight: 600 }}
            >
              travel.state.gov
            </a>{" "}
            or{" "}
            <a
              href="https://www.uscis.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3d8c6e", fontWeight: 600 }}
            >
              uscis.gov
            </a>
            .
          </p>
        </div>
      </section>

      {/* ────────── GLOBAL RESOURCES & GUIDES ────────── */}
      <section className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head text-center">
            <span className="hc-label">Knowledge Base</span>
            <h2 className="hc-h2">Global Photo Guides & Resources</h2>
            <p className="hc-sub">
              Access our comprehensive directory of visa photo requirements, country-specific rules, and expert specialist articles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Specialist Articles",
                desc: "Expert advice on DS-160, passport renewals, and biometric photo tips.",
                icon: "📝",
                link: "/guides#specialist-articles"
              },
              {
                title: "Visa Photo Guides",
                desc: "Master requirements for H1-B, Green Card, and US Visa types.",
                icon: "🛂",
                link: "/guides#visa-photo-guides"
              },
              {
                title: "EU Country Directory",
                desc: "Photo specifications for UK, Germany, France, and other EU nations.",
                icon: "🇪🇺",
                link: "/guides#european-photo-directories"
              }
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="group p-8 bg-white border border-slate-200 rounded-[2rem] hover:border-lime-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-lime-600 mb-4 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                <span className="mt-auto text-lime-600 font-bold text-xs uppercase tracking-widest flex items-center">
                  Explore Hub
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/guides"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-8 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95"
            >
              Browse Full Resource Center →
            </Link>
          </div>
        </div>
      </section>

      {/* ────────── REJECTION REASONS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Why Photos Get Rejected</span>
            <h2 className="hc-h2">The 9 Most Common Visa Photo Mistakes</h2>
            <p className="hc-sub">
              The U.S. Department of State rejects thousands of visa
              applications annually due to non-compliant photos. Here are the
              most frequent failures — and what our AI checks for each one.
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

      {/* ────────── DOCUMENT TYPES DEEP DIVE ────────── */}
      <section className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Document-Specific Guidance</span>
            <h2 className="hc-h2">Photo Requirements by Document Type</h2>
            <p className="hc-sub">
              While core specifications overlap, each U.S. immigration document
              has unique nuances. Here's what you need to know for each.
            </p>
          </div>
          <div className="hc-doctype-list">
            {documentTypes.map((doc, i) => (
              <div key={i} className="hc-doctype-card">
                <div className="hc-doctype-body">
                  <div className="hc-doctype-title-row">
                    <span style={{ fontSize: "22px" }}>{doc.icon}</span>
                    <h3 className="hc-doctype-h3">{doc.doc}</h3>
                  </div>
                  <div className="hc-doctype-pills">
                    {doc.specs.map((s, j) => (
                      <span key={j} className="hc-doctype-pill">{s}</span>
                    ))}
                  </div>
                  <p className="hc-doctype-note">{doc.note}</p>
                </div>
                <div className="hc-doctype-actions">
                  <a href={doc.toolHref} className="hc-btn-p hc-doctype-btn">
                    Use Tool →
                  </a>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hc-doctype-link"
                  >
                    Official Specs ↗
                  </a>
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
            <h2 className="hc-h2">How to Take a Perfect Visa Photo at Home</h2>
            <p className="hc-sub">
              You don't need a professional photographer. Follow these
              evidence-based tips and your smartphone photo will pass every
              State Department check.
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
            <h2 className="hc-h2">USVisaPhotoAI vs. Your Alternatives</h2>
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
                  <th className="hc-cmp-th hc-cmp-th-us">USVisaPhotoAI</th>
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
                  <span className="hc-cmp-card-label">USVisaPhotoAI</span>
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

      {/* ────────── TOOLS ────────── */}
      <section className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">All Tools</span>
            <h2 className="hc-h2">Choose Your Document Type</h2>
          </div>
          <div className="hc-tools">
            {toolPages.map((tool, i) => (
              <a key={i} href={tool.href} className="hc-tool">
                <span className="hc-tool-pill">{tool.target}</span>
                <div className="hc-tool-t">{tool.title}</div>
                <div className="hc-tool-d">{tool.desc}</div>
                <span className="hc-tool-lnk">Use Tool →</span>
              </a>
            ))}
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