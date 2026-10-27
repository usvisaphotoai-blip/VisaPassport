import type { Metadata, Viewport } from "next";
import Link from "next/link";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const PAGE_URL = "https://www.pixpassport.com/new-zealand-passport-photo-checker";
const PAGE_TITLE = "New Zealand Passport Photo Check – Free NZ DIA Photo Checker";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Free New Zealand passport photo check online. Test your photo against official DIA rules: 900×1200 px size, 3:4 portrait ratio, 250KB–5MB file weight, background and face framing.",
  keywords: [
    "new zealand passport photo check",
    "nz passport photo checker",
    "passport photo checker nz",
    "new zealand digital passport photo requirements",
    "digital passport photos nz",
    "new zealand passport photo online",
    "dia passport photo checker",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Verify your New Zealand digital passport photo before uploading to the DIA online portal. Free biometric test for 3:4 aspect ratio, 900×1200 px dimensions, file size, lighting, and framing.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "New Zealand Passport Photo Checker Online Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Instant free New Zealand passport photo check. Validate 3:4 ratio, 900×1200 px size, file size, and background against official DIA guidelines.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function NewZealandPassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "How does this New Zealand passport photo check work?",
      answer:
        "Upload a digital portrait from your smartphone, tablet, or camera. Our biometric tool maps key facial landmarks, verifies whether your head fills 70% to 80% of the frame, evaluates your image aspect ratio against the mandatory 3:4 portrait standard, measures pixel dimensions (between 900×1200 and 4500×6000 px), and checks background uniformity and lighting. Within seconds, you receive a detailed pass/fail report with clear fix guidance.",
    },
    {
      question: "What are the official New Zealand digital passport photo requirements?",
      answer:
        "According to the New Zealand Department of Internal Affairs (DIA), your photo must be saved as a .jpg or .jpeg file between 250 KB and 5 MB in file size. Pixel dimensions must be at least 900 pixels wide by 1200 pixels high, up to a maximum of 4500 × 6000 pixels. The orientation must be vertical (portrait) with an exact 3:4 width-to-height aspect ratio. The photo must be in full colour, taken within the last 6 months by someone else (no selfies), against a plain light background.",
    },
    {
      question: "Why does the official NZ passport photo checker return an 'aspect ratio error'?",
      answer:
        "The DIA's online checker strictly expects a vertical portrait photo in a 3:4 aspect ratio (such as 900×1200, 1200×1600, or 1500×2000 pixels). If your camera captured the photo in 16:9, square 1:1, or horizontal landscape orientation, the checker flags an immediate aspect ratio error. Another common cause reported by the DIA is device regional settings: if you receive an unexpected ratio error despite correct cropping, ensure your device region and language are set to New Zealand / English (New Zealand).",
    },
    {
      question: "What file size does the Department of Internal Affairs (DIA) accept?",
      answer:
        "Your file must be between 250 KB and 5 MB. Both thresholds are strictly enforced: if your photo is smaller than 250 KB, the online application rejects it as too low quality; if it exceeds 5 MB, it will fail the upload limit. Avoid sending photos via messaging apps like WhatsApp or Messenger that compress images under 200 KB before testing.",
    },
    {
      question: "Can I take my own NZ passport photo at home, or are selfies banned?",
      answer:
        "You can take your photo at home, but someone else must take the picture for you. The DIA strictly forbids selfies because handheld arm-length photos distort facial proportions (known as wide-angle lens distortion) and make your shoulders uneven. Have a friend or family member hold the camera 1.5 metres away at eye level while you stand 0.5 metres in front of a plain light wall.",
    },
    {
      question: "Am I allowed to wear glasses for a New Zealand passport photo?",
      answer:
        "The DIA strongly recommends removing glasses to avoid upload rejection. If you must wear prescription glasses, the frames must be thin, clear, and positioned so your eyes are completely visible with zero flash reflection or lens glare. Tinted lenses and sunglasses are strictly prohibited.",
    },
    {
      question: "What background colour does the DIA require for passport photos?",
      answer:
        "The background must be plain, evenly lit, and light-coloured — such as off-white, light cream, or light grey. It must be free of textures, wallpaper patterns, furniture, and cast shadows. Standing about half a metre away from the wall prevents harsh shadows from falling behind your head.",
    },
    {
      question: "Does this checker also work for New Zealand visas and the NZeTA?",
      answer:
        "Yes, though keep the file rules in mind: Immigration New Zealand (INZ) handles visas and NZeTA applications, and its digital upload limits differ slightly from passport rules. INZ accepts photos between 900×1200 and 2250×3000 pixels with file sizes between 512 KB and 3.14 MB. Both agencies mandate a 3:4 portrait ratio, neutral expression, and 70–80% face coverage. Our tool validates these universal biometric standards.",
    },
    {
      question: "What is the difference between passing this check and official DIA approval?",
      answer:
        "The DIA's online checker performs automated technical checks (pixel count, file weight, ratio, and basic face detection). However, a human passport officer still inspects every photo during application processing to verify genuine likeness, true skin tone, absence of AI editing or filters, and subtle lighting flaws. Our checker evaluates both the technical rules and the biometric likeness criteria that passport officers inspect.",
    },
    {
      question: "Is this NZ passport photo checker free to use?",
      answer:
        "Yes, 100% free with unlimited photo tests. There is no account registration required, no subscription, and no watermark added to your uploaded image. You can test as many photos or adjustments as needed until you achieve full compliance.",
    },
    {
      question: "What happens if my photo fails the face framing or background test?",
      answer:
        "The checker provides specific, actionable feedback identifying the exact reason for the failure — such as head height too small, off-centre positioning, uneven lighting, or background shadow. You can re-shoot following the advice, or use our automated New Zealand passport photo tool to crop and fix the background to official specifications.",
    },
    {
      question: "Can children and babies be checked with this tool?",
      answer:
        "Yes. While the DIA allows subtle flexibility for infants who cannot hold their head up or keep a completely neutral expression, the file specifications (JPEG format, 250KB–5MB, 3:4 portrait ratio, plain background, and no parents' hands in the frame) still apply. Lay your infant flat on a plain light sheet and photograph from directly above.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "New Zealand Passport Photo Checker",
      url: PAGE_URL,
      description:
        "Free online New Zealand passport photo check. Validates 3:4 portrait aspect ratio, 900×1200 px to 4500×6000 px dimensions, file size (250KB–5MB), background uniformity, and official Department of Internal Affairs (DIA) guidelines.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NZD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "New Zealand Passport Photo Checker",
      url: PAGE_URL,
      citation: [
        "https://www.passports.govt.nz/passport-photos/",
        "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/applying-online/uploading-documents-and-photos/visa-and-nzeta-photos/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.pixpassport.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "New Zealand Passport Photo Checker",
          item: PAGE_URL,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PhotoCheckerTool
        initialCountry="NZ"
        lockCountry
        countryName="New Zealand"
        countryFlag="🇳🇿"
        initialDocType="passport"
        badgeText="🇳🇿 Official DIA Guidelines · Free Online Pre-Check"
        title="New Zealand Passport Photo Checker"
        highlightTitle="Free Online DIA & INZ Compliance Test"
        subtitle="Applying for a New Zealand passport online? The Department of Internal Affairs (DIA) automatically checks your photo upload against strict pixel dimensions, a 3:4 portrait aspect ratio, file size, and head coverage rules. Run your photo through our free New Zealand passport photo check first to catch framing, shadow, or aspect ratio errors before you submit to the official DIA checker."
        specs={[
          { label: "Aspect Ratio", value: "3:4 Portrait (Vertical)" },
          { label: "Pixel Dimensions", value: "900 × 1200 to 4500 × 6000 px" },
          { label: "File Size", value: "250 KB – 5 MB (.jpg / .jpeg)" },
          { label: "Face Coverage", value: "70% – 80% (chin to crown)" },
          { label: "Background", value: "Plain Light Wall (No shadows)" },
          { label: "Capture Rule", value: "Taken by another person (No selfies)" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Strict 3:4 Portrait Ratio",
            desc: "Validates your photo's vertical 3:4 orientation to eliminate the notorious 'aspect ratio error' that trips up most online applicants.",
          },
          {
            icon: "📏",
            title: "900×1200 px to 4500×6000 px",
            desc: "Confirms your image has enough high-definition clarity for DIA biometric facial scanners without exceeding the 6000 px maximum threshold.",
          },
          {
            icon: "⚖️",
            title: "250 KB to 5 MB File Weight",
            desc: "Ensures your JPEG file falls squarely within the DIA's upload bounds, alerting you if messaging compression dropped it under 250 KB.",
          },
          {
            icon: "👤",
            title: "70%–80% Face Height",
            desc: "Analyzes facial landmarks from chin to top of hair, verifying proper clearance around your head and shoulders.",
          },
          {
            icon: "🎨",
            title: "Plain Light-Coloured Background",
            desc: "Detects distracting shadows, wallpaper textures, or uneven lighting behind your head against an off-white or light grey backdrop.",
          },
          {
            icon: "🚫",
            title: "Anti-Selfie & No-Filter Policy",
            desc: "Screens for wide-angle distortion caused by arm-length selfies and flags automated phone beautification or AI smoothing.",
          },
          {
            icon: "👓",
            title: "Eyewear & Glare Warning",
            desc: "Flags thick frames, reflections, and tinted lenses. Reminds you of the DIA's strong recommendation to photograph without glasses.",
          },
          {
            icon: "😐",
            title: "Neutral Expression & Gaze",
            desc: "Verifies mouth is closed, eyes are open and directed forward, and head has no side tilt or downward angle.",
          },
        ]}
        requirementsHeading="What This New Zealand Passport Photo Check Verifies"
        requirementsIntro="Every automated test aligns with official photo standards enforced by the Department of Internal Affairs (passports.govt.nz) and Immigration New Zealand."
        stepsHeading="How to Check Your NZ Passport Photo in 3 Steps"
        steps={[
          {
            title: "1. Capture or Select Your Photo",
            desc: "Stand 0.5 m in front of a plain, light wall in natural daylight. Have someone else take a vertical portrait at eye level (never a selfie).",
          },
          {
            title: "2. Upload for Instant Verification",
            desc: "Our automated biometric scanner evaluates your 3:4 aspect ratio, face proportion, background tone, and lighting in under 3 seconds.",
          },
          {
            title: "3. Review & Submit Confidently",
            desc: "Review your detailed pass/fail report, adjust any flagged items, and upload your compliant JPEG directly to the official NZ passport application.",
          },
        ]}
        faqHeading="Frequently Asked Questions About NZ Passport Photo Checks"
        faqs={faqs}
        relatedHeading="Related New Zealand & Pacific Photo Tools"
        relatedTools={[
          {
            title: "NZ Passport Photo Requirements",
            desc: "Complete step-by-step file, size, and upload guide for New Zealand digital passports.",
            href: "/guides/new-zealand-digital-passport-photo-requirements",
            icon: "🇳🇿",
          },
          {
            title: "New Zealand Passport Photo Maker",
            desc: "Crop, resize to 3:4 portrait ratio, adjust lighting, and format your photo for DIA upload.",
            href: "/new-zealand-passport-photo-editor",
            icon: "🛠️",
          },
          {
            title: "Australian Passport Photo Checker",
            desc: "Check photos against DFAT 35×45mm size, 32–36mm face height, and white background rules.",
            href: "/australian-passport-photo-checker",
            icon: "🇦🇺",
          },
          {
            title: "Universal Passport Photo Checker",
            desc: "Validate biometric passport and visa photo compliance across 50+ countries worldwide.",
            href: "/passport-photo-checker",
            icon: "🌍",
          },
          {
            title: "UK Passport Photo Checker",
            desc: "Verify 35×45mm photos against HM Passport Office and GOV.UK specifications.",
            href: "/uk-passport-photo-checker-online-free",
            icon: "🇬🇧",
          },
          {
            title: "Visa Photo Validator",
            desc: "Online compliance checker for Schengen, US, India, China, and international visas.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
        ]}
      >
        {/* Comprehensive Editorial Deep-Dive Section */}
        <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-lime-700 bg-lime-50 px-3 py-1 rounded-full border border-lime-200 uppercase tracking-wider inline-block mb-3">
                Official Department of Internal Affairs Guidelines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                New Zealand Digital Passport Photo Requirements at a Glance
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                When renewing or applying for a New Zealand passport online, the photo upload is the single step most likely to cause delays. Below is the exact technical specification table enforced by the Department of Internal Affairs (DIA).
              </p>
            </div>

            {/* Quick Specs Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-slate-50/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Technical Standard</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Official DIA Mandate</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">File Type</td>
                    <td className="px-5 py-3.5"><code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono text-xs">.jpg</code> or <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono text-xs">.jpeg</code></td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">PNG, HEIC, WEBP or PDF files trigger an immediate file type error.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-5 py-3.5 font-bold text-slate-900">File Size</td>
                    <td className="px-5 py-3.5 font-medium">250 KB (minimum) to 5 MB (maximum)</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Files under 250 KB fail quality checks; files above 5 MB cannot be uploaded.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Pixel Dimensions</td>
                    <td className="px-5 py-3.5 font-medium">900 × 1200 px up to 4500 × 6000 px</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Recommended sweet spot is 1500 × 2000 pixels for crisp biometric facial mapping.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-5 py-3.5 font-bold text-slate-900">Aspect Ratio</td>
                    <td className="px-5 py-3.5 font-medium">3:4 Portrait (vertical)</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Must be taller than wide. Square (1:1) or wide (16:9) shots cause aspect ratio errors.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Face Framing</td>
                    <td className="px-5 py-3.5 font-medium">70% to 80% of image height</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Full head and upper shoulders must be visible with clear space above the crown.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-5 py-3.5 font-bold text-slate-900">Background Tone</td>
                    <td className="px-5 py-3.5 font-medium">Plain, light-coloured (off-white, light grey)</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Must be solid and evenly lit, with zero shadows, patterns, or objects visible.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Photographer</td>
                    <td className="px-5 py-3.5 font-medium text-red-700 font-semibold">Someone else (No Selfies)</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">Arm-length selfies warp facial symmetry and are rejected by passport examiners.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Error Fixes & Troubleshooting Guide */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl">⚠️</span>
                  <h3 className="text-base font-bold text-slate-900">Common NZ Checker Upload Errors</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 block font-semibold">1. Aspect Ratio Error:</strong>
                    Ensure the photo is strictly in vertical 3:4 orientation. If already cropped to 3:4 and still failing on passports.govt.nz, switch your browser or verify your device region is set to New Zealand.
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold">2. Photo File Too Small (&lt;250 KB):</strong>
                    Often caused when emailing a photo as &ldquo;medium&rdquo; or sharing via WhatsApp. Always export the original uncompressed picture from your camera roll.
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold">3. Shadow Behind Head:</strong>
                    Step 0.5 to 1 metre forward from the wall so that room lights don&apos;t cast a dark outline behind your hair and shoulders.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl">💡</span>
                  <h3 className="text-base font-bold text-slate-900">How to Shoot a Compliant Photo at Home</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 block font-semibold">Turn Off Beauty &amp; Portrait Modes:</strong>
                    Disable phone filters, skin-smoothing algorithms, and fake bokeh blur effects. The DIA requires 100% natural biometric sharpness.
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold">Take Off Eyeglasses:</strong>
                    Even with non-reflective coating, eyeglasses frequently reflect camera flash or cast shadows onto eye sockets. Removing them prevents instant rejection.
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold">Ask Another Person:</strong>
                    Have a helper stand 1.5 metres back at your eye level. Keep your shoulders relaxed, head upright, and expression neutral with lips sealed.
                  </li>
                </ul>
              </div>
            </div>

            {/* Trans-Tasman & Visa Comparison Callout */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇳🇿</span>
                    <span className="text-lg">🇦🇺</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-lime-400">
                      Passport vs Visa Photo Limits
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                    Do not mix up New Zealand Passport and Visa requirements
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Passports are processed by the Department of Internal Affairs (DIA, up to 4500×6000 px), while visas and NZeTAs are handled by Immigration New Zealand (INZ, maximum 2250×3000 px and 3.14 MB limit). Always check your file against the exact authority receiving your application.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href="/guides/new-zealand-digital-passport-photo-requirements"
                    className="inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 bg-lime-600 hover:bg-lime-500 text-slate-900 rounded-lg transition-colors shadow-sm"
                  >
                    Read NZ Photo Guide →
                  </Link>
                  <Link
                    href="/new-zealand-passport-photo-editor"
                    className="inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
                  >
                    NZ Photo Maker
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </PhotoCheckerTool>
    </>
  );
}
