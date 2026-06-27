import type { Metadata } from "next";
import "../globals.css";
import NavbarFr from "./components/NavbarFr";
import FooterFr from "./components/FooterFr";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassport.com/"),
  title: {
    default: "PixPassport | Photo Passeport & Visa en Ligne",
    template: "%s | PixPassport",
  },
  description:
    "Créez une photo passeport, visa ou identité conforme en ligne. Vérification biométrique IA pour plus de 50 pays dont la France, les États-Unis et le Royaume-Uni.",
  authors: [{ name: "PixPassport Team" }],
  creator: "PixPassport",
  applicationName: "PixPassport",
  publisher: "PixPassport",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "PixPassport | Photo Passeport & Visa en Ligne",
    description: "Créez des photos biométriques conformes pour plus de 50 pays. Normes officielles pour la France, les États-Unis, le Royaume-Uni et plus.",
    url: "https://www.pixpassport.com/fr",
    siteName: "PixPassport",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "PixPassport - Photo Passeport en Ligne" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport | Photo Passeport & Visa en Ligne",
    description: "Photos passeport et visa professionnelles pour plus de 50 pays. Conformité biométrique garantie.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.pixpassport.com/fr",
    languages: { "en": "https://www.pixpassport.com/", "fr": "https://www.pixpassport.com/fr" },
  },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
      <NavbarFr />
      <main id="main-content" className="grow">
        {children}
      </main>
      <FooterFr />
    </>
  );
}
