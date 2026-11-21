import type { Metadata, Viewport } from "next";
import Link from "next/link";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const PAGE_URL = "https://www.pixpassport.com/australian-passport-photo-checker";
const PAGE_TITLE = "Australian Passport Photo Checker: Size and Head Check";
const PAGE_DESCRIPTION =
  "Free Australian passport photo checker. Test head height (32-36 mm chin to crown), background, lighting and glasses against the Passport Office guidelines before you apply.";
const OG_IMAGE = "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg";
const APO_GUIDELINES = "https://www.passports.gov.au/PhotoGuidelines";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-AU": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_AU",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Australian passport photo checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const GUIDES = [
  { label: "Australian passport photo requirements", href: "/guides/australian-passport-photo-requirements" },
  { label: "Australian passport photo size", href: "/guides/australian-passport-photo-size" },
  { label: "Online or at home: what is allowed", href: "/guides/australian-passport-photo-online" },
  { label: "Australia visa photo requirements", href: "/guides/australia-visa-photo-requirements" },
  { label: "Australian citizenship photo requirements", href: "/guides/australian-citizenship-photo-requirements" },
  { label: "Baby and newborn passport photo", href: "/guides/australian-baby-passport-photo" },
  { label: "Passport photo mistakes and fixes", href: "/guides/australian-passport-photo-mistakes" },
  { label: "Where to get an Australian passport photo", href: "/guides/where-to-get-australian-passport-photo" },
];

export default function AustralianPassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "Is the Australian passport photo checker free?",
      answer:
        "Yes. The checker is free to use, with no account needed. Upload a photo, read the results, fix anything it flags and check again as many times as you like.",
    },
    {
      question: "Does a pass mean my photo will be accepted?",
      answer:
        "No. A pass means your photo has a good chance of meeting the guidelines we can test, such as head height, background, lighting and glasses. The Passport Office makes the final decision, and the checker cannot test print quality, paper or how recent the photo is.",
    },
    {
      question: "What size does an Australian passport photo need to be?",
      answer:
        "The photo must be 35-40 mm wide x 45-50 mm high, with the head measuring 32-36 mm from chin to crown. A 35 x 45 mm photo is inside this range. The head height is the part people most often get wrong, especially when they use a template made for another country.",
    },
    {
      question: "Can I wear glasses in an Australian passport photo?",
      answer:
        "Not unless you cannot remove them for medical reasons. Needing glasses to see is not enough on its own. If you must wear them, the frames must not cover your eyes and the lenses must have no reflections. The checker flags glasses so you can retake the photo without them.",
    },
    {
      question: "Can I use the checker for an Australian visa photo?",
      answer:
        "Yes, as a pre-check of head position, background and lighting. Visa photo rules depend on your visa checklist and upload screen, and there is no single official file size for every visa. Check your file against the limits shown in your own application before you submit it.",
    },
    {
      question: "Can the checker make my passport prints?",
      answer:
        "No. Australian passports need 2 colour prints made by dye sublimation on glossy paper of at least 200 gsm. A professional provider, such as a post office, photographer or camera store, can make these. Use the checker to test a photo before you pay for prints, or to check the prints you get back.",
    },
    {
      question: "Can I check a printed or booth photo?",
      answer:
        "Yes. Photograph the print flat, straight on and in even light, then upload it. The checker looks at the face, head height and background. It cannot judge the print itself, so check for streaks, ink marks and damage by eye, and confirm the paper and print type with your provider.",
    },
    {
      question: "Is my photo stored?",
      answer:
        "Your photo is sent over an encrypted connection to run the check. We never sell it, and we do not share it with the Australian Passport Office, the Department of Home Affairs or advertisers. See our privacy policy for full details on how we handle images.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Australian Passport Photo Checker",
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      inLanguage: "en-AU",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Australian Passport Photo Checker",
      url: PAGE_URL,
      inLanguage: "en-AU",
      citation: [APO_GUIDELINES],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
        { "@type": "ListItem", position: 2, name: "Australian Passport Photo Checker", item: PAGE_URL },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
      <PhotoCheckerTool
        initialCountry="AU"
        lockCountry
        countryName="Australia"
        countryFlag="🇦🇺"
        initialDocType="passport"
        badgeText="🇦🇺 Based on the Australian Passport Office guidelines · Free"
        title="Australian Passport Photo Checker"
        highlightTitle="Size, Head Height and Background"
        subtitle="Upload a photo to check the 32-36 mm head height, background, lighting and glasses before you apply. The Passport Office recommends a professional provider for passport photos and does not recommend online services or apps, so use this as a pre-check, then confirm your photo against the official guidelines."
        specs={[
          { label: "Photo Size", value: "35–40 × 45–50 mm" },
          { label: "Head Height", value: "32–36 mm (chin to crown)" },
          { label: "Background", value: "Plain white or light grey" },
          { label: "Glasses", value: "Not allowed (medical exceptions)" },
          { label: "Prints", value: "2 × dye-sublimation, 200 gsm glossy" },
          { label: "Expression", value: "Neutral, eyes open" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Photo Size and Shape",
            desc: "Checks that your photo has the portrait shape of an Australian passport photo, which is 35–40 mm wide x 45–50 mm high.",
          },
          {
            icon: "📏",
            title: "32–36 mm Head Height",
            desc: "Maps facial landmarks to estimate your chin-to-crown height, catching photos taken too close or too far away.",
          },
          {
            icon: "🎨",
            title: "Background and Lighting",
            desc: "Looks for a plain white or light grey background and flags shadows, patterns and uneven light.",
          },
          {
            icon: "👓",
            title: "Glasses",
            desc: "Detects glasses so you can retake the photo without them. Glasses are only allowed if they cannot be removed for medical reasons.",
          },
          {
            icon: "😐",
            title: "Pose and Expression",
            desc: "Checks that your face is centred and straight on, with your eyes open and a neutral expression.",
          },
          {
            icon: "🗓️",
            title: "What It Cannot Check",
            desc: "Print type, paper weight and the 6-month rule. Confirm these with your provider: dye-sublimation prints, glossy 200 gsm paper, taken in the last 6 months.",
          },
        ]}
        requirementsHeading="What Does the Checker Test?"
        requirementsIntro="Each check is based on the Australian Passport Office photo guidelines. A pass means your photo has a good chance of meeting the guidelines we can test. It is not an approval."
        stepsHeading="How Do You Use the Checker?"
        steps={[
          { title: "Upload a Clear Photo", desc: "Use a front-facing photo taken by someone else, against a plain white or light grey wall, in even light." },
          { title: "Read the Results", desc: "The checker shows head height, background, lighting and glasses results, with a plain explanation of anything it flags." },
          { title: "Fix and Recheck", desc: "Retake the photo to fix problems (do not edit it), then check again before you get professional prints." },
        ]}
        faqHeading="Australian Passport Photo Checker FAQ"
        faqs={faqs}
        relatedHeading="More Photo Checkers and Tools"
        relatedTools={[
          {
            title: "Passport Photo Checker",
            desc: "Check a passport photo against the rules for 50+ countries.",
            href: "/passport-photo-checker",
            icon: "🌍",
          },
          {
            title: "Australia Visa Photo Maker",
            desc: "Crop a 35 x 45 mm digital photo for visa uploads. Check it against your visa's upload limits.",
            href: "/australia-visa-photo-editor",
            icon: "🇦🇺",
          },
          {
            title: "UK Passport Photo Checker",
            desc: "Check a photo against the UK 35 x 45 mm rules.",
            href: "/uk-passport-photo-checker-online-free",
            icon: "🇬🇧",
          },
          {
            title: "NZ Passport Photo Checker",
            desc: "Check the 3:4 ratio and digital file rules for New Zealand passports.",
            href: "/new-zealand-passport-photo-checker",
            icon: "🇳🇿",
          },
          {
            title: "Visa Photo Checker",
            desc: "Check a visa photo for Schengen, India, China and more.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
        ]}
      >
        <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
            <blockquote className="border-l-4 border-lime-500 bg-lime-50/60 rounded-r-lg px-5 py-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Important:</strong> The Australian Passport Office recommends a professional
              passport photo provider and does not recommend online photo services or apps. Use our tool to check or prepare a
              photo, but always confirm it meets the{" "}
              <a href={APO_GUIDELINES} target="_blank" rel="noopener noreferrer" className="font-semibold text-lime-700 hover:text-lime-800">
                official guidelines
              </a>{" "}
              before you apply.
            </blockquote>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">What the Checker Cannot Do</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2">It cannot make a dye-sublimation print</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Australian passports need 2 colour prints made by dye sublimation (not inkjet) on glossy paper of at least
                    200 gsm. Home printing and digital files do not meet this rule.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2">It does not replace the official guidelines</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Passport Office makes the final decision. A pass means your photo has a good chance of meeting the
                    guidelines we can test, not that it will be accepted.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Where to get professional prints</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Post offices, professional photographers, camera stores, some pharmacies and some chain stores take
                    passport photos.{" "}
                    <Link href="/guides/where-to-get-australian-passport-photo" className="font-semibold text-lime-700 hover:text-lime-800">
                      See what to ask for
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">Australian Photo Guides</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {GUIDES.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="block border border-slate-200 hover:border-lime-600 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:text-lime-700 transition-colors"
                    >
                      {g.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </PhotoCheckerTool>
    </>
  );
}
