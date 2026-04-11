import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import USVisaFAQ from "../components/USVisaFAQ";
import ComparisonSlider from "../components/ComparisonSlider";
import Reviews from "../components/Reviews";
import Image from "next/image";

export const metadata: Metadata = {
  title: "US Visa Photo Validator & Cropper (DS-160 Compliant)",
  description:
    "Free tool to check and resize photos for US visa applications. Ensures 600x600px, 240KB limit, white background, and correct eye position for DS-160.",
  keywords: [
    "US visa photo",
    "DS-160 photo requirements",
    "2x2 photo maker",
    "US visa photo tool",
    "visa photo checker",
    "DS-160 photo size",
    "US visa photo online",
    "how to take US visa photo with iPhone",
    "remove wall shadow US visa photo online",
    "DS-160 quality alert fix",
    "is off-white background acceptable for DS-160",
  ],
  alternates: {
    canonical: "https://www.usvisaphotoai.pro/us-visa-photo",
  },
  openGraph: {
    title: "US Visa Photo Validator & Cropper (DS-160 Compliant)",
    description:
      "Free tool to check and resize your DS-160 visa photo. Instant compliance validation.",
    type: "website",
  },
};

const requirements = [
  {
    spec: "Dimensions",
    value: "600 × 600 pixels",
    detail: "Square (1:1) aspect ratio",
  },
  { spec: "File Size", value: "Maximum 240 KB", detail: "JPEG format only" },
  {
    spec: "Background",
    value: "Pure White",
    detail: "RGB (255, 255, 255) — no shadows, patterns, or gradients",
  },
  {
    spec: "Face Count",
    value: "Exactly 1 face",
    detail: "Clear, unobstructed, fully visible face",
  },
  {
    spec: "Eye Position",
    value: "56% – 69%",
    detail: "From bottom edge of the image",
  },
  {
    spec: "Head Size",
    value: "50% – 69%",
    detail: "Crown to chin as percentage of total height",
  },
  {
    spec: "Expression",
    value: "Neutral",
    detail: "Mouth closed, both eyes open, relaxed",
  },
  {
    spec: "Glasses",
    value: "Not Allowed",
    detail: "Remove all eyeglasses before taking photo",
  },
  {
    spec: "Head Position",
    value: "Centered & Forward",
    detail: "Facing camera directly, no tilt or rotation",
  },
  {
    spec: "Head Covering",
    value: "Not Allowed",
    detail: "Except for religious or medical reasons",
  },
];

const stepByStep = [
  {
    step: "1",
    title: "Take Your Photo",
    desc: "Stand in front of a plain white wall or backdrop. Use natural lighting — avoid flash. Position your camera at eye level, about 4 feet away.",
  },
  {
    step: "2",
    title: "Check Your Appearance",
    desc: "Remove glasses, hats, and headphones. Keep a neutral expression with your mouth closed and both eyes open. Face the camera directly.",
  },
  {
    step: "3",
    title: "Upload & Validate",
    desc: "Upload your photo to our free validator. We'll check every specification including dimensions, file size, biometrics, and background color.",
  },
  {
    step: "4",
    title: "Review Your Report",
    desc: "See your detailed PASS/FAIL compliance report. Each check tells you exactly what passed and what needs to be fixed.",
  },
  {
    step: "5",
    title: "Download Compliant Photo",
    desc: "Pay $5.99 to unlock your processed, fully compliant photo — cropped, resized, and optimized for DS-160 submission.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "US Visa Photo AI Validator",
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
      "name": "How to Get a Compliant US Visa Photo",
      "description":
        "A step-by-step guide to taking and validating a US Visa DS-160 photo at home.",
      "step": stepByStep.map((s, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "name": s.title,
        "text": s.desc,
      })),
    },
  ],
};

export default function USVisaPhotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── All hero styles in one <style> tag — no JS event handlers needed ── */}
      <style>{`
        @keyframes uvp-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes uvp-float-flag {
          0%, 100% { transform: rotate(12deg) translateY(0px); }
          50%       { transform: rotate(12deg) translateY(-9px); }
        }
        @keyframes uvp-float-badge {
          0%, 100% { transform: rotate(-5deg) translateY(0px); }
          50%       { transform: rotate(-5deg) translateY(-9px); }
        }

        /* Hero layout */
        .uvp-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #eaf4f0 0%, #f0f7f4 50%, #e8f3ef 100%);
          min-height: 88vh;
          display: flex;
          align-items: center;
        }
        .uvp-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 64px;
          width: 100%;
        }
        .uvp-hero-text { flex: 1; min-width: 0; }
        .uvp-hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 420px;
        }

        /* Badge */
        .uvp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #c6e6d8;
          border-radius: 999px; padding: 6px 14px; margin-bottom: 22px;
          font-family: 'DM Sans', sans-serif;
        }
        .uvp-badge-dot {
          width: 8px; height: 8px; background: #3d8c6e;
          border-radius: 50%; display: inline-block; flex-shrink: 0;
        }
        .uvp-badge-txt {
          font-size: 11px; font-weight: 700; color: #3d8c6e;
          text-transform: uppercase; letter-spacing: 1.2px;
        }

        /* H1 */
        .uvp-h1 {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: clamp(30px, 5.5vw, 54px);
          font-weight: 800; line-height: 1.08;
          color: #0f1e2d; letter-spacing: -1.5px;
          margin: 0 0 18px;
        }
        .hc-anim-txt { font-size: clamp(20px, 5.5vw, 44px); font-weight: 800; color: #3d8c6e; transition: opacity .3s, transform .3s; line-height: 1.15; letter-spacing: -.5px; }

        /* Description */
        .uvp-desc {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 17px; color: #4a5568; line-height: 1.7;
          max-width: 500px; margin: 0 0 32px;
        }

        /* Buttons */
        .uvp-btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }

        .uvp-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          background: #3b5bdb; color: #fff;
          padding: 15px 28px; border-radius: 12px;
          font-size: 16px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 24px rgba(59,91,219,.25);
          font-family: var(--font-dm-sans), sans-serif;
          transition: background .2s, transform .2s, box-shadow .2s;
        }
        .uvp-btn-primary:hover {
          background: #2f4ac7;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(59,91,219,.35);
        }

        .uvp-btn-outline {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #0f1e2d;
          padding: 13px 22px; border-radius: 12px;
          font-size: 15px; font-weight: 600; text-decoration: none;
          border: 2px solid rgba(15,30,45,.15);
          font-family: 'DM Sans', sans-serif;
          transition: background .2s, border-color .2s;
        }
        .uvp-btn-outline:hover {
          background: rgba(15,30,45,.05);
          border-color: rgba(15,30,45,.25);
        }

        /* Trust row */
        .uvp-trust-row { display: flex; gap: 18px; flex-wrap: wrap; }
        .uvp-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: #4a5568; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
        }

        /* Visual card */
        .uvp-photo-card {
          position: relative; z-index: 10;
          background: #fff; padding: 10px;
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,.12), 0 4px 16px rgba(0,0,0,.07);
          border: 1px solid rgba(255,255,255,.9);
          transform: rotate(2deg);
          transition: transform .7s ease;
          max-width: 280px; width: 100%;
        }
        .uvp-photo-card:hover { transform: rotate(0deg); }
        .uvp-photo-card img {
          width: 100%; height: auto; border-radius: 20px; display: block;
        }
        .uvp-photo-foot {
          margin-top: 8px; padding: 8px 12px;
          background: #f0f7f4; border-radius: 12px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .uvp-photo-ok {
          font-size: 11px; font-weight: 700; color: #22543d;
          font-family: 'DM Sans', sans-serif;
        }
        .uvp-photo-px {
          font-size: 10px; color: #888; font-family: 'DM Sans', sans-serif;
        }

        /* Floating chips */
        .uvp-chip-flag {
          position: absolute; top: 20px; right: 12%; z-index: 20;
          background: #fff; border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,.12);
          padding: 10px 12px; font-size: 26px;
          animation: uvp-float-flag 3s ease-in-out infinite;
        }
        .uvp-chip-compliant {
          position: absolute; bottom: 18%; left: 4%; z-index: 20;
          background: #fff; border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,.10);
          padding: 10px 16px;
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700; color: #3d8c6e;
          border: 1.5px solid #c6e6d8;
          font-family: 'DM Sans', sans-serif;
          animation: uvp-float-badge 3.5s ease-in-out infinite .4s;
        }
        .uvp-chip-wbg {
          position: absolute; top: 38%; right: 5%; z-index: 20;
          background: #0f1e2d; color: #63bb8c;
          border-radius: 10px; padding: 7px 13px;
          font-size: 11px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(0,0,0,.18);
          letter-spacing: .3px;
          animation: uvp-float 2.8s ease-in-out infinite .8s;
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .uvp-hero { min-height: unset; }
          .uvp-hero-inner {
            flex-direction: column !important;
            gap: 40px; padding: 48px 20px;
          }
          .uvp-hero-visual { display: none !important; }
        }
      `}</style>

      <div className="bg-white">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="uvp-hero">
          {/* blobs */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(99,187,140,0.13)",
              filter: "blur(56px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(99,187,140,0.09)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          {/* dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(circle, rgba(61,140,110,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="uvp-hero-inner">
            {/* ── LEFT TEXT ── */}
            <div className="uvp-hero-text">
              <div className="uvp-badge">
                <span className="uvp-badge-dot" />
                <span className="uvp-badge-txt">Official DS-160 Compliance Checklist</span>
              </div>

              <h1 className="uvp-h1">
                US Visa Photo Maker: DS-160 Photo Crop & AI Validator <br/> 
                <span className="hc-anim-txt">No More DS-160 Rejections.</span>
              </h1>

              <p className="uvp-desc">
                Stop guessing. Our AI validator analyzes every pixel to ensure <strong>100% acceptance </strong> 
                by Department of State biometric systems. Get your perfect DS-160 photo 
                instantly—guaranteed compliant.
              </p>

              <div className="uvp-btn-row">
                <Link href="/tool?type=us-visa" className="uvp-btn-primary">
                  Create My Compliant Photo →
                </Link>
                <a href="#official-requirements" className="uvp-btn-outline">
                  See Official Standards
                </a>
              </div>

              <div className="uvp-trust-row">
                {[
                  { icon: "🔒", text: "100% Secure" },
                  { icon: "⚡", text: "Results in 30s" },
                  { icon: "✅", text: "State Dept. Compliant" },
                  { icon: "🆓", text: "Free Validation" },
                ].map((t, i) => (
                  <div key={i} className="uvp-trust-item">
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT VISUAL ── */}
            <div className="hc-visual-wrap">
               <Image
                             src="/us_ds-160_photo.webp"
                             alt="DS-160 US Visa Photo - Government-compliant 600x600px biometric upload sample"
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

        {/* ══ EXHAUSTIVE OFFICIAL REQUIREMENTS ══ */}
        <section id="official-requirements" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="hc-label">Mandatory Standards</span>
              <h2 className="hc-h2">Official 2026 US Visa Photo Requirements (DS-160)</h2>
              <p className="hc-sub mx-auto">
                The acceptance of your photo is at the discretion of the U.S.
                embassy or consulate. We recommend using a professional service
                to guarantee compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  t: "Color & Recency",
                  p: "Must be in color and taken within the last 6 months to reflect your current appearance.",
                },
                {
                  t: "Head Proportions",
                  p: "Head must be between 1 and 1 3/8 inches (22-35 mm) or 50% - 69% of the total height.",
                },
                {
                  t: "Background",
                  p: "Taken in front of a plain white or off-white background with no shadows or patterns.",
                },
                {
                  t: "Full-Face View",
                  p: "Facing the camera directly. No tilted heads or side profiles allowed.",
                },
                {
                  t: "Expression",
                  p: "Neutral facial expression with both eyes open and mouth closed.",
                },
                {
                  t: "Daily Clothing",
                  p: "Wear what you normally wear daily. No uniforms, except religious attire worn daily.",
                },
                {
                  t: "Head Coverings",
                  p: "Not allowed unless for religious purposes. Full face must be visible without shadows.",
                },
                {
                  t: "No Electronics",
                  p: "Headphones, wireless hands-free devices, or similar items are strictly prohibited.",
                },
                {
                  t: "Identification",
                  p: "Photos must NOT be scanned from existing IDs like driver's licenses.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#3d8c6e]/10 flex items-center justify-center mb-4 group-hover:bg-[#3d8c6e] group-hover:text-white transition-colors">
                    <span className="font-bold text-sm">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{item.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EYEGLASSES POLICY (CRITICAL) ══ */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-10 rounded-[40px] border border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">👓</span> US Visa Photo "No Glasses" Policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Eyeglasses are **no longer allowed** in new visa photos, except
                in rare circumstances when they cannot be removed for medical
                reasons (e.g., recent ocular surgery). A medical statement
                signed by a practitioner must be provided.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">No Glare</h4>
                  <p className="text-xs text-slate-500">
                    Reflection must not obscure the eyes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    No Frames
                  </h4>
                  <p className="text-xs text-slate-500">
                    Frames must not cover any part of the eye.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    No Shadows
                  </h4>
                  <p className="text-xs text-slate-500">
                    Frames must not cast shadows or refraction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CATEGORY SPECIFIC RULES ══ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="hc-label">Visa Categories</span>
              <h2 className="hc-h2">Additional Requirements by Category</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Nonimmigrant */}
              <div className="p-8 rounded-3xl border border-slate-100 bg-white">
                <div className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-3 py-1 rounded-full w-fit mb-4 uppercase">
                  Nonimmigrant (DS-160)
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Form DS-160 / DS-1648
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Online digital upload is required. Some consulates may require
                  one (1) physical photo at the interview.
                </p>
                <ul className="space-y-3">
                  {[
                    "Digital upload required",
                    "Interview physical copy",
                    "Scan specs apply",
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <span className="text-[#3d8c6e]">✓</span> {li}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immigrant */}
              <div className="p-8 rounded-3xl border border-slate-100 bg-white">
                <div className="bg-green-50 text-green-600 text-[10px] font-extrabold px-3 py-1 rounded-full w-fit mb-4 uppercase">
                  Immigrant (DS-260)
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Form DS-260
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  You must provide two (2) identical physical photos at your
                  immigrant visa interview.
                </p>
                <ul className="space-y-3">
                  {[
                    "Two identical photos",
                    "Photo quality paper",
                    "Exact 2x2 inch size",
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <span className="text-[#3d8c6e]">✓</span> {li}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DV Lottery */}
              <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-xl shadow-[#3d8c6e]/5 ring-2 ring-[#3d8c6e]/20">
                <div className="bg-lime-50 text-lime-600 text-[10px] font-extrabold px-3 py-1 rounded-full w-fit mb-4 uppercase">
                  Diversity Visa (DV)
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  DV Program Entry
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Strict digital specs: 600x600px square, under 240kB, JPEG
                  format.
                </p>
                <ul className="space-y-3">
                  {[
                    "600x600px Dimensions",
                    "Max 240 kB size",
                    "300 DPI scan resolution",
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <span className="text-[#3d8c6e]">✓</span> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DIY & BABY PHOTOS ══ */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold mb-6">
                  How to Take a US Visa Photo at Home
                </h2>
                <p className="text-slate-400 mb-10 leading-relaxed">
                  While we recommend a professional service, you may take the
                  photo yourself. **Photos must not be digitally enhanced or
                  altered** to change your appearance.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="text-4xl">👶</div>
                    <div>
                      <h4 className="font-bold mb-2">Baby & Toddler Guide</h4>
                      <p className="text-sm text-slate-400">
                        Lay your baby on a plain white sheet or use a car seat
                        covered with a white sheet. No other person should be in
                        the photo.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-4xl">💡</div>
                    <div>
                      <h4 className="font-bold mb-2">Lighting Tip</h4>
                      <p className="text-sm text-slate-400">
                        Ensure no shadows on your baby's face, especially if
                        taking a picture from above while the baby is lying
                        down.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-[#63bb8c]">
                  Department of State Tool
                </h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  The official free photo tool allows basic cropping to
                  600x600px. Note: A Department of State employee will make the
                  final decision on acceptability.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Resize & Rotate",
                    "Square Crop",
                    "Save for Print",
                    "Basic Compliance",
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-200"
                    >
                      <span className="text-[#3d8c6e]">✓</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CHANGE OF APPEARANCE ══ */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="hc-h2">Change of Appearance Policy</h2>
              <p className="hc-sub mx-auto">
                Even if your photo is less than 6 months old, a new photo will
                be requested if you have undergone significant changes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  t: "Facial Trauma",
                  p: "Significant surgery or trauma that alters your identifying features.",
                },
                {
                  t: "Piercings/Tattoos",
                  p: "Adding or removing numerous or large facial piercings/tattoos.",
                },
                {
                  t: "Weight Changes",
                  p: "Undergone a significant amount of weight loss or gain.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-100 text-center hover:border-[#3d8c6e] transition-all"
                >
                  <h4 className="font-extrabold text-slate-900 mb-3">
                    {card.t}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.p}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-[#f0f7f4] rounded-2xl border border-[#c6e6d8] text-center text-sm text-[#3d8c6e] font-bold">
              Note: Growing a beard or coloring your hair is generally NOT
              considered a significant change of appearance.
            </div>
          </div>
        </section>

        <USVisaFAQ />
        <Reviews />

        {/* CTA */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
              Ready for Your Visa Submission?
            </h2>
            <p className="text-slate-600 mb-10 text-lg">
              Ensure your photo meets every official requirement with our free
              validator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tool?type=us-visa"
                className="inline-block bg-[#3b5bdb] text-white hover:bg-[#2f4ac7] rounded-2xl px-12 py-5 text-lg font-extrabold transition-all shadow-xl shadow-[#3b5bdb]/20"
              >
                Validate Your Photo Now →
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-8">
              Trusted by 100k+ applicants for DS-160, DS-2648 and DV Program
              compliance.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
