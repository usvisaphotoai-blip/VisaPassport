import type { Metadata } from "next";
import "../globals.css";
import NavbarDe from "./components/NavbarDe";
import FooterDe from "./components/FooterDe";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassport.com/"),
  title: {
    default: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    template: "%s | PixPassport",
  },
  description:
    "Erstellen Sie biometrische Passbilder, Visumfotos oder Bewerbungsfotos online. KI-gestützte biometrische Prüfung für Deutschland, Österreich, Schweiz und über 50 weitere Länder.",
  authors: [{ name: "PixPassport Team" }],
  creator: "PixPassport",
  applicationName: "PixPassport",
  publisher: "PixPassport",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    description: "Erstellen Sie konforme biometrische Fotos für über 50 Länder. Offizielle Standards für Deutschland (Personalausweis, Führerschein) und mehr.",
    url: "https://www.pixpassport.com/de",
    siteName: "PixPassport",
    images: [{ url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg", width: 1200, height: 630, alt: "PixPassport - Passfoto Online" }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    description: "Professionelle Pass- und Visumfotos für über 50 Länder. Biometrische Konformität garantiert.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"],
  },
  alternates: {
    canonical: "https://www.pixpassport.com/de",
    languages: { "en": "https://www.pixpassport.com/", "fr": "https://www.pixpassport.com/fr", "de": "https://www.pixpassport.com/de" },
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PixPassport",
            url: "https://www.pixpassport.com/de",
            description: "Professionelles Tool zur Erstellung biometrischer Passbilder, Visumfotos und Ausweisfotos nach offiziellen Vorgaben.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "All",
            inLanguage: "de",
            offers: { "@type": "Offer", price: "5.99", priceCurrency: "EUR" },
          }),
        }}
      />
    
      <NavbarDe />
      <main id="main-content" className="grow">
        {children}
      </main>
      <FooterDe />
    </>
  );
}
