import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer votre Photo Passeport & Visa — Outil en Ligne | PixPassport",
  description: "Outil professionnel de création de photos passeport et visa. Téléchargez votre photo, sélectionnez votre pays, obtenez une photo conforme en 30 secondes.",
  alternates: {
    canonical: "https://www.pixpassport.com/fr/passport-photo-online",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-online",
      fr: "https://www.pixpassport.com/fr/passport-photo-online",
      "x-default": "https://www.pixpassport.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Créer votre Photo — PixPassport", description: "Outil de création de photos passeport et visa conformes.",
    url: "https://www.pixpassport.com/fr/passport-photo-online", siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Créer votre Photo en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Créer votre Photo Passeport & Visa | PixPassport",
    description: "Outil de création de photos passeport et visa conformes en 30 secondes.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

export default function FrToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
