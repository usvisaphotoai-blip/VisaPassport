import type { Metadata, Viewport } from "next";
import Link from "next/link";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const PAGE_URL = "https://www.pixpassport.com/passport-photo-checker";
const PAGE_TITLE = "Passport Photo Checker – Free Online Check for 50+ Countries";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Check your passport photo online for free. Upload a photo and get an instant pass/fail report on size, head height, background, lighting and expression for 50+ countries — no app, no sign-up.",
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
      "Upload your passport photo and see instantly whether it passes. Free online check for size, head height, background and lighting across 50+ countries.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Passport photo checker online free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Free online passport photo checker. See whether your size, head height, background and lighting pass before you submit.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

// Official headline rules for the most-checked passports. Head height is chin to crown.
const COUNTRY_RULES = [
  { country: "United States", flag: "🇺🇸", size: "2 × 2 in (51 × 51 mm)", head: "25–35 mm (1–1⅜ in)", background: "White or off-white", href: "/us-passport-photo-editor" },
  { country: "United Kingdom", flag: "🇬🇧", size: "35 × 45 mm", head: "29–34 mm", background: "Cream or light grey", href: "/uk-passport-photo-checker-online-free" },
  { country: "Canada", flag: "🇨🇦", size: "50 × 70 mm", head: "31–36 mm", background: "White or light-coloured", href: "/ca/canada-passport-photo-requirements" },
  { country: "Australia", flag: "🇦🇺", size: "35 × 45 mm", head: "32–36 mm", background: "Plain white or light grey", href: "/australian-passport-photo-checker" },
  { country: "India", flag: "🇮🇳", size: "35 × 45 mm", head: "Face ~80% of frame", background: "Plain white", href: "/india-passport-photo-editor" },
  { country: "Germany / EU", flag: "🇪🇺", size: "35 × 45 mm", head: "32–36 mm", background: "Plain light grey", href: "/germany-passport-photo-editor" },
];

export default function PassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "How does this passport photo checker work?",
      answer:
        "Pick the country that issues your passport and upload a photo. The checker maps the key points of your face, measures head height and eye position against that country's rules, and scans the background and lighting. You get a pass/fail result for each category in a few seconds, with a note on what to fix.",
    },
    {
      question: "Which countries does the checker support?",
      answer:
        "More than 50, including the United States, United Kingdom, Canada, Australia, India, China and the Schengen countries. Each country uses its own published size, head-height and background rules rather than one generic template. The UK and Australia also have dedicated checker pages with their full rulebooks.",
    },
    {
      question: "Do I need to download an app?",
      answer:
        "No. The checker runs in your phone, tablet or computer browser. There is nothing to install and no account to create.",
    },
    {
      question: "Can I check a photo I already took on my phone?",
      answer:
        "Yes, that's how most people use it. A recent smartphone photo has more than enough resolution. For the best result, face a window in daylight with a plain wall behind you and have someone else take the shot at eye level rather than taking a selfie.",
    },
    {
      question: "Will this checker work for a photo booth or studio print?",
      answer:
        "Yes. Photograph or scan the printed photo in good light and upload that image. The checker measures proportions and background tone the same way whether the original was digital or printed.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "JPEG, PNG and WebP files up to 10 MB. iPhone HEIC photos are usually converted to JPEG automatically when you share or export them.",
    },
    {
      question: "What happens if my photo fails part of the check?",
      answer:
        "You'll see which category failed — for example head size outside the allowed range, an uneven background, or a shadow across the face — with a plain-language note on what to change. Retake the photo or run it through our passport photo maker, then check it again. Re-checks are free and unlimited.",
    },
    {
      question: "If my photo passes, is acceptance guaranteed?",
      answer:
        "No checker can guarantee acceptance — the final decision always rests with the passport office. The tool measures the things automated intake systems test most (head size, eye line, background, lighting and pose), so it catches the common mistakes before you submit.",
    },
    {
      question: "What are the most common reasons passport photos are rejected?",
      answer:
        "Head too large or too small in the frame, shadows on the background or face, glasses or glare, uneven lighting, a tilted head, and a smile or open mouth.",
    },
    {
      question: "What happens to my photo after I upload it?",
      answer:
        "Your photo is sent over an encrypted connection to run the check. We never sell it, and we don't share it with government agencies or advertisers. See our data security page for details on how uploads are handled.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Passport Photo Checker",
      url: PAGE_URL,
      description:
        "Free online passport photo checker. Checks size, head height, background, lighting and expression against official rules for 50+ countries.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      url: PAGE_URL,
      dateModified: "2026-10-07",
      isPartOf: { "@type": "WebSite", name: "PixPassport", url: "https://www.pixpassport.com/" },
      citation: [
        "https://www.icao.int/Security/FAL/PKI/Pages/ICAO-Doc-9303.aspx",
        "https://travel.state.gov/content/travel/en/passports/how-apply/photos.html",
        "https://www.gov.uk/photos-for-passports",
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
          name: "Passport Photo Checker",
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
        initialCountry="US"
        lockCountry={false}
        initialDocType="passport"
        badgeText="🌍 50+ Countries · No App, No Sign-Up · Free"
        title="Passport Photo Checker"
        highlightTitle="Free Online Check for 50+ Countries"
        subtitle="Upload your passport photo, pick the issuing country, and get a pass/fail report on size, head height, background, lighting and expression in seconds — before you print, upload, or hand it over at the counter."
        specs={[
          { label: "Country Coverage", value: "50+ Countries" },
          { label: "Checks Run", value: "Size, Head, Eyes, Background, Light" },
          { label: "Result Time", value: "Under 3 Seconds" },
          { label: "Install Required", value: "None — Browser Only" },
          { label: "Re-checks", value: "Free & Unlimited" },
          { label: "Account", value: "Not Required" },
        ]}
        requirementsHeading="What the Passport Photo Checker Tests"
        requirementsIntro="Each check uses the published rules of the country you select, not a one-size-fits-all template."
        requirements={[
          {
            icon: "🌍",
            title: "Country-Specific Rules",
            desc: "Applies the size, head-height and background rules of your selected country — from the US 2×2 inch photo to the 35×45 mm EU and UK format.",
          },
          {
            icon: "📐",
            title: "Head Height & Framing",
            desc: "Measures chin-to-crown height and centering, catching the too-close and too-far mistakes that cause most rejections.",
          },
          {
            icon: "👁️",
            title: "Eye Line & Pose",
            desc: "Checks that your eyes sit in the required band, both are open, and your head isn't tilted or turned.",
          },
          {
            icon: "🎨",
            title: "Background Uniformity",
            desc: "Flags shadows, patterns and off-tone backdrops that don't match the colour your passport office requires.",
          },
          {
            icon: "💡",
            title: "Lighting & Glare",
            desc: "Picks up flash hotspots, one-sided shadows and uneven exposure across the face.",
          },
          {
            icon: "🎯",
            title: "Plain-Language Fixes",
            desc: "Every failed check comes with a short note on what caused it and what to change before you re-check.",
          },
        ]}
        stepsHeading="How to Check a Passport Photo Online"
        steps={[
          { title: "Choose Your Country", desc: "Select the country issuing your passport so the right size and head-height rules are applied." },
          { title: "Upload Your Photo", desc: "Use a phone photo, a scan of a booth print, or any clear portrait in JPEG, PNG or WebP." },
          { title: "Read Your Report", desc: "See a pass/fail result for each check, fix anything flagged, and re-check for free." },
        ]}
        faqHeading="Passport Photo Checker FAQ"
        faqs={faqs}
        relatedHeading="More Photo Checkers & Tools"
        relatedTools={[
          {
            title: "UK Passport Photo Checker",
            desc: "GOV.UK 35×45 mm rules, cream or light grey background.",
            href: "/uk-passport-photo-checker-online-free",
            icon: "🇬🇧",
          },
          {
            title: "Australian Passport Photo Checker",
            desc: "APO 35×45 mm photo with 32–36 mm face height.",
            href: "/australian-passport-photo-checker",
            icon: "🇦🇺",
          },
          {
            title: "Green Card Photo Checker",
            desc: "2×2 inch photos for USCIS forms like I-485 and I-765.",
            href: "/us-check-photo-green-card",
            icon: "🟢",
          },
          {
            title: "DV Lottery Photo Checker",
            desc: "600×600 px digital photo for the Diversity Visa entry.",
            href: "/diversity-visa-lottery-photo-checker",
            icon: "🎟️",
          },
          {
            title: "Visa Photo Checker",
            desc: "Check a visa photo for Schengen, India, China and more.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
          {
            title: "Passport Size Photo Maker",
            desc: "Crop, fix the background and download a compliant photo.",
            href: "/passport-size-photo-maker",
            icon: "📸",
          },
        ]}
      >
        <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Passport Photo Requirements by Country
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                The checker applies these rules automatically when you select a country. Always confirm the latest rules with the issuing passport office.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Country</th>
                    <th scope="col" className="px-4 py-3 font-bold">Photo size</th>
                    <th scope="col" className="px-4 py-3 font-bold">Head height</th>
                    <th scope="col" className="px-4 py-3 font-bold">Background</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COUNTRY_RULES.map((r) => (
                    <tr key={r.country}>
                      <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                        <Link href={r.href} className="hover:text-lime-700">
                          <span className="mr-2">{r.flag}</span>
                          {r.country}
                        </Link>
                      </th>
                      <td className="px-4 py-3 text-slate-600">{r.size}</td>
                      <td className="px-4 py-3 text-slate-600">{r.head}</td>
                      <td className="px-4 py-3 text-slate-600">{r.background}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </PhotoCheckerTool>
    </>
  );
}
