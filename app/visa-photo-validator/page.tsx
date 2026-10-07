import type { Metadata } from "next";
import ValidatorClient from "./components/ValidatorClient";
import { FAQ_ITEMS } from "./content";

const PAGE_URL = "https://www.pixpassport.com/visa-photo-validator";
const PAGE_TITLE = "Visa Photo Checker – Free Online Visa Photo Validator (60+ Countries)";
const PAGE_DESCRIPTION =
  "Check your visa photo free before you apply. Test head size, eye line, background and lighting against the rules for US DS-160, Schengen, India, China, Canada and 55+ more countries.";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/f_webp/q_auto/visa_photo_validator_passport_photo_validator_pixpassport_usvisaphotoai_lcvdyd.png";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, alt: "Visa photo checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Visa Photo Checker",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
      "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
      { "@type": "ListItem", position: 2, name: "Visa Photo Checker", item: PAGE_URL },
    ],
  },
];

export default function VisaPhotoValidatorPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ValidatorClient />
    </main>
  );
}
