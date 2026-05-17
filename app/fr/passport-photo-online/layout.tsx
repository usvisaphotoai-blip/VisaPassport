import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer votre Photo Passeport & Visa — Outil en Ligne",
  description: "Outil professionnel de création de photos passeport et visa. Téléchargez votre photo, sélectionnez votre pays, obtenez une photo conforme en 30 secondes.",
  alternates: { canonical: "https://www.pixpassport.com/fr/passport-photo-online" },
  openGraph: {
    title: "Créer votre Photo — PixPassport", description: "Outil de création de photos passeport et visa conformes.",
    url: "https://www.pixpassport.com/fr/passport-photo-online", siteName: "PixPassport", locale: "fr_FR", type: "website",
  },
};

export default function FrToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
