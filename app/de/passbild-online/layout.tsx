import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passbild Online Erstellen 2026 | Biometrisches Passfoto 35x45 mm",
  description: "Biometrisches Passbild online erstellen: KI-Prüfung, Hintergrund entfernen, ICAO-konform in 30 Sekunden.",
  alternates: {
    canonical: "https://www.pixpassport.com/de/passbild-online",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-online",
      fr: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassport.com/de/passbild-online",
      "x-default": "https://www.pixpassport.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Passbild Online Erstellen — PixPassport",
    description: "Biometrisches Passbild online erstellen: KI-Prüfung, Hintergrund entfernen, ICAO-konform in 30 Sekunden.",
    url: "https://www.pixpassport.com/de/passbild-online",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Passbild Online Erstellen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passbild Online Erstellen | PixPassport",
    description: "Biometrisches Passbild online erstellen in 30 Sekunden.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

export default function DeToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
