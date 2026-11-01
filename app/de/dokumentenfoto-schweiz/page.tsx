import type { Metadata } from "next";
import {
  Hero, Section, SectionHeader, StepsGrid, CheckList, FaqList, CtaBand, JsonLd, Badge, Prose, card, RelatedPages,
} from "../components/ui";

const ctaHref = "/de/passbild-online?type=switzerland-passport";

export const metadata: Metadata = {
  title: "Dokumentenfoto Schweiz: online für ID, Führerausweis & Visum",
  description:
    "Dokumentenfoto für die Schweiz online vorbereiten: Anforderungen nach fedpol-Fotomustertafel für ID, Führerausweis, Aufenthaltsbewilligung und Visum.",
  alternates: {
    canonical: "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
    languages: {
      "de-CH": "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
    },
  },
  openGraph: {
    title: "Dokumentenfoto Schweiz: online vorbereiten",
    description:
      "Die wichtigsten Fotoanforderungen für Schweizer Dokumente – verständlich erklärt und mobil umsetzbar.",
    url: "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
    siteName: "PixPassport",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp",
        width: 600,
        height: 400,
        alt: "Beispiel eines neutral ausgeleuchteten Schweizer Dokumentenfotos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dokumentenfoto Schweiz: online vorbereiten",
    description:
      "Anforderungen und Tipps für Dokumentenfotos in der Schweiz.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp"],
  },
};

const documents = [
  {
    code: "01",
    title: "Identitätskarte",
    format: "35 × 45 mm",
    text: "Viele Gemeinden akzeptieren ein mitgebrachtes Foto auf Fotopapier nach fedpol-Fotomustertafel. Manche erstellen es auch direkt am Schalter. Fragen Sie vor dem Termin bei Ihrer Einwohnerkontrolle nach.",
  },
  {
    code: "02",
    title: "Führerausweis",
    format: "35 × 45 mm, farbig",
    text: "Das Strassenverkehrsamt verlangt ein aktuelles Farbfoto nach denselben Kriterien wie beim Pass: gerader Blick, neutraler Hintergrund, keine getönten Gläser. Das gedruckte Foto auf dem Ausweis erscheint schwarzweiss.",
  },
  {
    code: "03",
    title: "Aufenthaltsbewilligung",
    format: "Vor Ort erfasst",
    text: "Für die Ausweise B, C, Ci, L und G werden Foto, Unterschrift und bei Personen ausserhalb EU/EFTA auch Fingerabdrücke persönlich in einem kantonalen Ausweiszentrum erfasst. Ein eigenes Foto lässt sich hier nicht einreichen.",
  },
  {
    code: "04",
    title: "Visumfoto",
    format: "Je nach Zielland",
    text: "Ein Schengen-Visum folgt in der Regel dem Format 35 × 45 mm nach ICAO-Norm. Andere Zielländer wie die USA verlangen abweichende Masse. Massgebend sind stets die Vorgaben der Botschaft oder des Konsulats.",
  },
];

const checklist = [
  ["Frontal aufnehmen", "Kopf gerade, Schultern gerade, Blick direkt in die Kamera und beide Augen offen."],
  ["Neutral ausleuchten", "Weiches Licht von vorne; keine Schatten im Gesicht, keine Reflexionen und keine roten Augen."],
  ["Hintergrund ruhig halten", "Einfarbig, hell und klar vom Kopf getrennt – ohne Muster, Gegenstände oder andere Personen."],
  ["Ohne Filter speichern", "Verwenden Sie das scharfe Original ohne Beauty-Filter, digitale Retusche oder Screenshot eines Fotos."],
];

const steps = [
  ["Aufnehmen", "Stellen Sie das Smartphone auf Augenhöhe. Bitten Sie möglichst eine zweite Person um das Foto oder verwenden Sie ein Stativ."],
  ["Dokument wählen", "Wählen Sie ID, Führerausweis oder Visum, bevor Sie die passenden Masse prüfen. Für Aufenthaltsbewilligungen entfällt dieser Schritt."],
  ["Ausgerichtet vorbereiten", "Laden Sie das Original hoch und richten Sie den Bildausschnitt nachvollziehbar auf das benötigte Format aus."],
  ["Stelle prüfen", "Vergleichen Sie Datei, Ausdruck und Einreichungsweg mit den aktuellen Hinweisen der zuständigen Behörde."],
];

const faqs = [
  {
    q: "Was ist ein Dokumentenfoto?",
    a: "Ein Dokumentenfoto ist ein Porträt für einen Ausweis, einen Führerausweis, eine Bewilligung oder ein Visum. Je nach Dokument gelten Vorgaben zu Format, Blickrichtung, Bildqualität, Hintergrund und Einreichungsweg, meist gestützt auf die fedpol-Fotomustertafel.",
  },
  {
    q: "Kann ich ein Dokumentenfoto mit dem Handy machen?",
    a: "Ja, für Dokumente, bei denen ein eigenes Foto zulässig ist. Mit einer aktuellen Smartphone-Kamera gelingt eine scharfe Ausgangsaufnahme, wenn die Kamera auf Augenhöhe steht und das Licht gleichmässig von vorne kommt. Verwenden Sie die Originaldatei statt eines Screenshots und verzichten Sie auf Filter.",
  },
  {
    q: "Gilt 35 × 45 mm für jedes Schweizer Dokument?",
    a: "Für Pass, Identitätskarte und Führerausweis ja. Bei Aufenthaltsbewilligungen für ausländische Staatsangehörige wird das Foto dagegen persönlich in einem Ausweiszentrum erfasst, ein eigenes Foto ist dort nicht vorgesehen. Bei Visa gelten zusätzlich die Regeln des Ziellands.",
  },
  {
    q: "Darf ich ein selbst erstelltes Foto für den Schweizer Pass einreichen?",
    a: "Beim biometrischen Pass nimmt das kantonale Passbüro das Foto meist direkt beim Termin auf, da gleichzeitig Fingerabdrücke erfasst werden. Für die Identitätskarte akzeptieren dagegen viele Gemeinden ein mitgebrachtes Foto. Prüfen Sie dies vor dem Termin bei Ihrer zuständigen Pass- oder Einwohnerstelle.",
  },
  {
    q: "Darf ich auf dem Foto eine Brille tragen?",
    a: "Für Pass, Identitätskarte und Führerausweis grundsätzlich nicht: Seit 2010 sind Brillen auf Schweizer Ausweisfotos verboten, weil Fassung und Reflexionen die Augen verdecken können. Eine Ausnahme gilt nur bei zwingender medizinischer Notwendigkeit.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Dokumentenfoto Schweiz: online für ID, Führerausweis & Visum",
      description:
        "Anforderungen und mobile Anleitung für Dokumentenfotos in der Schweiz.",
      inLanguage: "de-CH",
      url: "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
    },
    {
      "@type": "HowTo",
      name: "Dokumentenfoto mit dem Smartphone vorbereiten",
      description:
        "Eine kompakte Anleitung zur Vorbereitung eines Dokumentenfotos für Schweizer Stellen.",
      step: steps.map(([name, text], position) => ({
        "@type": "HowToStep",
        position: position + 1,
        name,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Dokumentenfoto Schweiz", item: "https://www.pixpassport.com/de/dokumentenfoto-schweiz" },
      ],
    },
  ],
};

export default function DokumentenfotoSchweizPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Dokumentenfoto Schweiz" }]}
        eyebrow="Foto-Guide Schweiz · ID · Führerausweis · Visum"
        title="Dokumentenfoto Schweiz, klar vorbereitet"
        intro="Bereiten Sie ein passendes Foto für ID, Führerausweis oder Visum direkt mit dem Smartphone vor. Für Aufenthaltsbewilligungen gilt eine Ausnahme: Dort erfasst ein kantonales Zentrum das Foto persönlich. Verbindlich ist stets die ausstellende Stelle."
        primary={{ href: ctaHref, label: "Foto vorbereiten" }}
        secondary={{ href: "#dokumente", label: "Dokument auswählen" }}
        note="Ab CHF 15.99 · Ergebnis vorher kostenlos ansehen"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp",
          alt: "Druckbogen mit mehreren Dokumentenfotos im Format 35 × 45 mm",
          width: 600,
          height: 400,
        }}
      />

      <Section muted width="4xl" labelledBy="short-h2">
        <SectionHeader id="short-h2" eyebrow="Die kurze Antwort" title="Ein Foto, mehrere Regeln" />
        <Prose>
          <p>
            Ein Dokumentenfoto ist keine Einheitslösung. Pass, Identitätskarte und Führerausweis folgen der
            fedpol-Fotomustertafel mit dem Format 35 × 45 mm. Aufenthaltsbewilligungen für ausländische Staatsangehörige
            werden dagegen persönlich in einem kantonalen Ausweiszentrum erfasst, und Visa richten sich nach den Vorgaben
            des Ziellands. Mit einer sauberen Ausgangsaufnahme sparen Sie überall dort Zeit, wo ein eigenes Foto zulässig
            ist.
          </p>
        </Prose>
      </Section>

      <Section id="dokumente" labelledBy="docs-h2">
        <SectionHeader
          id="docs-h2"
          eyebrow="Dokument wählen"
          title="Welches Foto benötigen Sie?"
          intro="Starten Sie mit dem Verwendungszweck. So vermeiden Sie ein Foto im falschen Format oder eine unnötige Aufnahme."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {documents.map((d) => (
            <article key={d.title} className={card}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                <Badge>{d.format}</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted labelledBy="rules-h2">
        <SectionHeader
          id="rules-h2"
          eyebrow="Vor der Aufnahme"
          title="Vier Punkte, die fast immer zählen"
          intro="Diese Grundregeln stammen aus der fedpol-Fotomustertafel. Spezifische Vorgaben der Behörde haben immer Vorrang."
        />
        <div className={card}>
          <CheckList
            items={checklist.map(([t, d]) => (
              <>
                <strong className="text-slate-900">{t}:</strong> {d}
              </>
            ))}
          />
        </div>
      </Section>

      <Section labelledBy="steps-h2">
        <SectionHeader id="steps-h2" eyebrow="Mobil vorbereitet" title="Vom Handy zur sauberen Datei" />
        <StepsGrid steps={steps.map(([title, desc]) => ({ title, desc }))} />
      </Section>

      <Section muted width="3xl" labelledBy="faq-h2">
        <SectionHeader id="faq-h2" eyebrow="Häufige Fragen" title="Dokumentenfoto Schweiz: FAQ" />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages keys={["schweiz", "biometrisch", "visum", "ratgeber"]} />

      <CtaBand
        title="Mit einer klaren Aufnahme beginnen"
        text="Foto hochladen, Format wählen und das Ergebnis vorab kostenlos prüfen."
        href={ctaHref}
        label="Dokumentenfoto vorbereiten"
      />
    </>
  );
}
