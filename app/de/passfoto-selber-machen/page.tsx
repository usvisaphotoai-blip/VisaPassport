import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, DoDont, DataTable,
  FaqList, CtaBand, JsonLd, Prose, btnPrimary, textLink, ArrowRight, RelatedPages,
} from "../components/ui";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
const url = "https://www.pixpassport.com/de/passfoto-selber-machen";

export const metadata: Metadata = {
  title: "Passfoto selber machen: Anleitung & Maße 2026 | PixPassport",
  description:
    "Passfoto selber machen mit dem Handy: Anleitung in 4 Schritten, Maße 35 × 45 mm, Hintergrund, Licht und Druck. Ergebnis kostenlos prüfen, ab 6,99 €.",
  keywords: [
    "passfoto selber machen",
    "passbild selber machen",
    "passfoto selber machen handy",
    "passfoto selber machen iphone",
    "biometrisches passfoto selber machen",
    "passfoto selber drucken",
    "passfoto selber machen kostenlos",
    "passfoto zuhause machen",
  ],
  alternates: {
    canonical: url,
    languages: { de: url, "x-default": url },
  },
  openGraph: {
    title: "Passfoto selber machen: Anleitung & Maße | PixPassport",
    description:
      "Passbild zu Hause selbst aufnehmen: Maße, Licht, Hintergrund und automatische Prüfung nach BMI- und ICAO-Vorgabe. Ergebnis vorab kostenlos ansehen.",
    url,
    siteName: "PixPassport",
    type: "article",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Passfoto selber machen – Anleitung mit Maßen und biometrischer Ausrichtung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passfoto selber machen: Anleitung & Maße",
    description: "Biometrisches Passfoto zu Hause erstellen: 35 × 45 mm, Licht, Hintergrund und Prüfung.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const ctaHref = "/de/passbild-online?type=germany-passport";

const steps = [
  {
    title: "Licht und Hintergrund vorbereiten",
    desc: "Stellen Sie sich vor eine helle, einfarbige Wand und nutzen Sie weiches Tageslicht von vorn, zum Beispiel gegenüber einem Fenster.",
  },
  {
    title: "Kamera auf Augenhöhe ausrichten",
    desc: "Lassen Sie sich aus 1,5 bis 2 Metern Abstand fotografieren oder nutzen Sie ein Stativ mit Timer. Kein Arm-Selfie.",
  },
  {
    title: "Frontal blicken, neutral, Mund geschlossen",
    desc: "Kopf gerade, Augen offen, nicht lächeln. Filter und Porträtmodus bitte ausschalten.",
  },
  {
    title: "Hochladen und prüfen lassen",
    desc: "PixPassport ersetzt den Hintergrund, schneidet auf 35 × 45 mm zu und prüft alle Kriterien. Das Ergebnis sehen Sie kostenlos, bevor Sie bezahlen.",
  },
];

const specs = [
  ["Format", "35 × 45 mm"],
  ["Gesichtshöhe", "32–36 mm (Kinn bis Scheitel)"],
  ["Hintergrund", "Einfarbig hell, ohne Schatten"],
  ["Ausdruck", "Neutral, Mund geschlossen"],
  ["Kopfhaltung", "Gerade und frontal"],
  ["Brille", "Nur ohne Spiegelung und Tönung"],
  ["Kopfbedeckung", "Grundsätzlich nicht erlaubt"],
];

const dos = [
  "Gleichmäßiges Tageslicht von vorn nutzen.",
  "Kamera auf Augenhöhe, Abstand 1,5 bis 2 Meter.",
  "Haare aus dem Gesicht streichen.",
  "Foto vor dem Druck automatisch prüfen lassen.",
];

const donts = [
  "Kein Arm-Selfie, es verzerrt das Gesicht.",
  "Keine Schönheitsfilter oder Retusche.",
  "Nicht lächeln, keine Zähne zeigen.",
  "Keinen Blitz aus kurzer Distanz verwenden.",
];

const faqs = [
  {
    q: "Kann ich ein Passfoto selber machen?",
    a: "Ja, Aufnahme und Bearbeitung sind erlaubt. Entscheidend ist, dass das Foto die biometrischen Vorgaben erfüllt und von der Behörde akzeptiert wird. Für Führerschein, Gesundheitskarte, Visa oder Bewerbungen können Sie ein selbst erstelltes Passbild in der Regel problemlos nutzen.",
  },
  {
    q: "Darf man Passfotos selber machen?",
    a: "Ja, es gibt kein Verbot. Die Behörde prüft das Bild bei der Abgabe und lehnt es ab, wenn es die Vorgaben nicht erfüllt. Für Reisepass und Personalausweis wird das Foto in Deutschland seit dem 1. Mai 2025 in der Regel digital übermittelt. Fragen Sie deshalb vorab bei Ihrem Amt nach, wie ein selbst erstelltes Foto eingereicht werden kann.",
  },
  {
    q: "Welche Größe hat ein Passfoto?",
    a: "In Deutschland 35 × 45 mm. Die Gesichtshöhe vom Kinn bis zum Scheitel muss zwischen 32 und 36 mm liegen, das Gesicht mittig platziert sein und etwa 70 bis 80 Prozent der Bildhöhe einnehmen. In Österreich und der Schweiz gelten dieselben Maße.",
  },
  {
    q: "Welchen Hintergrund brauche ich?",
    a: "Einen einfarbigen, hellen Hintergrund ohne Schatten und Muster, am besten hellgrau. Wenn Sie Ihr Foto bei PixPassport hochladen, ersetzt unsere Software den Hintergrund automatisch.",
  },
  {
    q: "Kann ich das Passfoto zu Hause ausdrucken?",
    a: "Das hängt vom Dokument und der Behörde ab. Für Reisepass und Personalausweis wird in Deutschland inzwischen meist ein digitales Foto verlangt. Für Dokumente, die Ausdrucke akzeptieren, etwa Visa oder je nach Stelle der Führerschein, können Sie die fertige Vorlage auf Fotopapier oder bei dm und Rossmann für wenige Cent ausdrucken.",
  },
  {
    q: "Kann ich ein Passfoto kostenlos selber machen?",
    a: "Das Fotografieren mit dem Smartphone kostet nichts. Bei PixPassport laden Sie Ihr Foto kostenlos hoch, lassen es freistellen und prüfen die Vorschau. Erst für den hochauflösenden Download samt Druckvorlage fällt eine Einmalzahlung ab 6,99 € an, ohne Abo.",
  },
  {
    q: "Welches Smartphone brauche ich?",
    a: "Jedes gängige Smartphone ab 12 Megapixeln genügt. Wichtiger als die Ausrüstung sind gutes Licht, die Kamera auf Augenhöhe und die Einhaltung der biometrischen Vorgaben.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Passfoto selber machen: Anleitung & Maße",
      url,
      inLanguage: "de",
      datePublished: "2026-10-11",
      dateModified: "2026-10-11",
      mainEntityOfPage: url,
      image: "https://www.pixpassport.com/og-image.jpg",
      author: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/de" },
      publisher: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/de" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "HowTo",
      name: "Passfoto selber machen mit dem Smartphone",
      description: "Biometrisches Passbild im Format 35 × 45 mm zu Hause aufnehmen und online prüfen.",
      totalTime: "PT2M",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Passfoto selber machen", item: url },
      ],
    },
  ],
};

export default function PassfotoSelberMachenPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Passfoto selber machen" }]}
        eyebrow="Anleitung · 35 × 45 mm"
        title="Passfoto selber machen: So gelingt es zu Hause"
        intro="Mit dem Handy ein biometrisches Passfoto aufnehmen: Wir zeigen die wichtigsten Regeln. PixPassport schneidet Ihr Bild zu und prüft es automatisch. Ergebnis kostenlos ansehen, erst dann bezahlen."
        primary={{ href: ctaHref, label: "Passfoto jetzt erstellen" }}
        secondary={{ href: "#anleitung", label: "Zur Anleitung" }}
        note="Ab 6,99 € · Kein Abo · Geld zurück bei Ablehnung"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Passfoto selber machen mit dem Smartphone – Maßlinien und biometrische Ausrichtung",
          width: 843,
          height: 671,
        }}
      />

      <Section id="anleitung" labelledBy="steps-h2">
        <SectionHeader id="steps-h2" eyebrow="So funktioniert es" title="In 4 Schritten Ihr Passfoto selber machen" />
        <StepsGrid steps={steps} />
      </Section>

      <Section muted id="vorgaben" width="3xl" labelledBy="spec-h2">
        <SectionHeader
          id="spec-h2"
          eyebrow="Maße und Vorgaben"
          title="Das muss Ihr Passfoto erfüllen"
          intro="Die Werte folgen der deutschen Vorgabe und der ICAO-Norm. In Österreich und der Schweiz gelten dieselben Maße."
        />
        <DataTable caption="Biometrische Passbild-Kriterien" head={["Kriterium", "Vorgabe"]} rows={specs} />
      </Section>

      <Section width="3xl" labelledBy="dodont-h2">
        <SectionHeader id="dodont-h2" eyebrow="Tipps" title="Do's und Don'ts beim Fotografieren" />
        <DoDont dos={dos} donts={donts} />
      </Section>

      <Section muted width="3xl" labelledBy="amt-h2">
        <SectionHeader id="amt-h2" eyebrow="Wichtig" title="Ausdrucken oder digital abgeben?" />
        <Prose>
          <p>
            Für Führerschein, Gesundheitskarte, Visa und Bewerbungen können Sie Ihr Foto selbst erstellen. Die fertige
            10 × 15 cm Vorlage drucken Sie bei dm, Rossmann oder Müller als normalen Abzug für etwa 0,25 bis 0,35 €.
          </p>
          <p>
            Für Reisepass und Personalausweis wird das Lichtbild in Deutschland seit Mai 2025 in der Regel digital
            übermittelt. Fragen Sie vorab Ihr Amt, wie ein selbst erstelltes Foto angenommen wird. Mehr dazu im Ratgeber
            zum{" "}
            <Link href="/de/biometrisches-passbild" className={textLink}>
              biometrischen Passbild
            </Link>
            .
          </p>
        </Prose>
      </Section>

      <Section width="3xl" id="faq" labelledBy="faq-h2">
        <SectionHeader id="faq-h2" eyebrow="FAQ" title="Häufige Fragen zum Passfoto selber machen" />
        <FaqList items={faqs} />
        <p className="mt-8 text-xs leading-relaxed text-slate-500" role="note">
          PixPassport ist ein unabhängiger Service und steht in keiner Verbindung zu Behörden. Fragen Sie bei Ihrem Amt,
          welche Übermittlungswege akzeptiert werden. Weitere Themen:{" "}
          <Link href="/de/passfoto-app-kostenlos" className={textLink}>Passfoto-App kostenlos</Link>,{" "}
          <Link href="/de/fuehrerschein-foto" className={textLink}>Führerscheinfoto</Link>,{" "}
          <Link href="/de/visum-foto" className={textLink}>Visumfoto</Link>.
        </p>
      </Section>

      <RelatedPages keys={["egk", "bewerbung", "schweiz", "ratgeber"]} />

      <CtaBand
        title="Ihr Passfoto in 30 Sekunden"
        text="Foto hochladen, Ergebnis kostenlos prüfen – erst dann bezahlen."
        href={ctaHref}
        label="Passfoto jetzt erstellen"
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Link href={ctaHref} className={`${btnPrimary} w-full`}>
          Jetzt Passfoto erstellen <ArrowRight />
        </Link>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
