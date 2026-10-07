import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer votre photo d'identité, passeport ou visa | PixPassport",
  description: "Importez votre photo, choisissez le document (passeport, CNI, visa…) et obtenez une photo conforme en 30 secondes.",
  // App step, not a landing page: keep it out of the index so /fr/photo-identite-en-ligne
  // (its hreflang equivalent in the sitemap) is the page that ranks for "photo d'identité en ligne".
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.pixpassport.com/fr/passport-photo-online",
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
