import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Visa Photo Tool — Free Validator & Maker for DS-160, Green Card, Passport",
  description:
    "Free AI-powered US visa photo tool. Validate and create compliant 2x2 photos for DS-160, DV lottery, green card (I-485/DS-260), and US passport applications.",
  keywords: [
    "US visa photo tool",
    "DS-160 photo maker",
    "green card photo tool",
    "passport photo validator",
    "2x2 photo tool",
    "DV lottery photo tool",

    "US visa photo requirements checker",
    "600x600 visa photo tool",
    "US passport photo size validator",
    "AI visa photo checker",
    "DS-160 photo validator free",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/tool",
  },
  openGraph: {
    title: "US Visa Photo Tool — Free Validator & Maker",
    description:
      "Free AI-powered US visa photo tool. Validate and create compliant 2x2 photos for DS-160, DV lottery, green card, and passport applications.",
    url: "https://www.pixpassport.com/tool",
    siteName: "PixPassport",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport - Free US Visa Photo Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Visa Photo Tool — Free Validator & Maker",
    description:
      "Free AI-powered US visa photo tool for DS-160, green card, passport, and DV lottery applications.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
