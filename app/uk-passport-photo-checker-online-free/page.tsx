import type { Metadata, Viewport } from "next";
import UKPassportPhotoCheckerClient from "./UKPassportPhotoCheckerClient";
import { FAQ_ITEMS } from "./content";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "UK Passport Photo Checker – Requirements & Online Check",
  description:
    "Check your UK passport photo online against size, background, lighting and biometric requirements. Instant photo validation with no sign-up required.",
  alternates: {
    canonical: "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
    languages: {
      en: "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
      "x-default": "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "UK Passport Photo Checker – Requirements & Online Check",
    description:
      "Free UK passport photo checker online. Upload your photo and instantly verify it meets official GOV.UK passport photo requirements.",
    url: "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
    siteName: "PixPassport",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        width: 1200,
        height: 630,
        alt: "UK Passport Photo Checker Online Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Passport Photo Checker – Requirements & Online Check",
    description:
      "Free UK passport photo checker online. Upload your photo and instantly verify GOV.UK passport photo compliance.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp"],
  },
};

export default function UKPassportPhotoCheckerPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UK Passport Photo Checker Online Free",
      "url": "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
      "description":
        "Free UK passport photo checker online. Upload your photo and instantly verify compliance with official GOV.UK and HM Passport Office standards.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GBP"
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "UK Passport Photo Checker Online Free",
      "url": "https://www.pixpassport.com/uk-passport-photo-checker-online-free",
      "dateModified": "2026-10-07",
      "isPartOf": { "@type": "WebSite", "name": "PixPassport", "url": "https://www.pixpassport.com/" },
      "citation": [
        "https://www.gov.uk/photos-for-passports",
        "https://www.icao.int/Security/FAL/PKI/Pages/ICAO-Doc-9303.aspx"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.pixpassport.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "UK Passport Photo Checker Online Free",
          "item": "https://www.pixpassport.com/uk-passport-photo-checker-online-free"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PixPassport",
      "url": "https://www.pixpassport.com/",
      "logo": "https://www.pixpassport.com/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PixPassport",
      "url": "https://www.pixpassport.com/"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <UKPassportPhotoCheckerClient />
    </>
  );
}