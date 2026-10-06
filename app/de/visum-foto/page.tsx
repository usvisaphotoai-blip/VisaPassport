import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CheckList, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, card, textLink, ArrowRight,
} from "../components/ui";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Visumfoto online erstellen – Schengen, USA & mehr | PixPassport",
  description:
    "Visumfoto online erstellen: Schengen 35 × 45 mm, USA (DS-160) 51 × 51 mm, China 33 × 48 mm. Anforderungen je Land, automatisch geprüft in 30 Sekunden.",
  keywords: [
    "Visumfoto",
    "Visum Foto",
    "Passbild Visum",
    "Schengen Visum Foto",
    "US Visum Foto",
    "DS-160 Foto",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/visum-foto",
    languages: {
      en: "https://www.pixpassport.com/visa-photo",
      fr: "https://www.pixpassport.com/fr/photo-visa",
      de: "https://www.pixpassport.com/de/visum-foto",
      "x-default": "https://www.pixpassport.com/visa-photo",
    },
  },
  openGraph: {
    title: "Visumfoto online erstellen – Schengen, USA & mehr | PixPassport",
    description:
      "Visumfotos nach den Vorgaben des jeweiligen Landes – automatisch geprüft und in 30 Sekunden fertig.",
    url: "https://www.pixpassport.com/de/visum-foto",
    siteName: "PixPassport",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visumfoto online erstellen",
      },
    ],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=schengen-visa";

/* ─── Data ─── */
const countries = [
  {
    land: "Schengen-Visum",
    format: "35 × 45 mm",
    hintergrund: "Hell, idealerweise hellgrau",
    hinweis: "ICAO-Norm, gilt auch für das nationale Visum für Deutschland",
    type: "schengen-visa",
  },
  {
    land: "USA (DS-160)",
    format: "51 × 51 mm (2 × 2 Zoll)",
    hintergrund: "Weiß",
    hinweis: "Keine Brille; digital 600 × 600 bis 1200 × 1200 px",
    type: "us-visa",
  },
  {
    land: "China",
    format: "33 × 48 mm",
    hintergrund: "Weiß",
    hinweis: "Ohne Kopfbedeckung, Ohren möglichst sichtbar",
    type: "china-passport",
  },
  {
    land: "Weitere Länder",
    format: "Je nach Land",
    hintergrund: "Meist weiß oder hellgrau",
    hinweis: "Über 50 Formate im Tool – maßgeblich ist die Botschaft",
    type: "",
  },
];

const steps = [
  {
    n: "1",
    title: "Zielland wählen",
    desc: "Wählen Sie im Tool das Land bzw. die Visumart. Format, Kopfgröße und Hintergrundfarbe werden automatisch übernommen.",
  },
  {
    n: "2",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Porträt hoch. Ein Smartphone-Foto bei Tageslicht vor einer hellen Wand reicht aus.",
  },
  {
    n: "3",
    title: "Prüfen und herunterladen",
    desc: "Die Software prüft Ihr Foto, ersetzt den Hintergrund und schneidet es zu. Sie erhalten die Datei für den Online-Antrag und eine Druckvorlage.",
  },
];

const doList = [
  "Blicken Sie frontal in die Kamera, der Kopf ist gerade.",
  "Halten Sie den Mund geschlossen und den Gesichtsausdruck neutral.",
  "Sorgen Sie für gleichmäßiges Licht ohne Schatten im Gesicht.",
  "Verwenden Sie ein aktuelles Foto (nicht älter als sechs Monate).",
  "Prüfen Sie vorab die Vorgaben der Botschaft oder des Visa-Zentrums.",
];

const dontList = [
  "Keine Sonnenbrille, keine getönten Gläser – für die USA gar keine Brille.",
  "Keine Kopfbedeckung, außer aus religiösen oder medizinischen Gründen.",
  "Keine Filter, Beauty-Modi oder nachträgliche Retusche.",
  "Kein gemusterter Hintergrund und keine weiteren Personen im Bild.",
  "Kein Screenshot oder über Messenger komprimiertes Foto.",
];

const faqs = [
  {
    q: "Welche Größe hat ein Visumfoto?",
    a: "Das hängt vom Zielland ab. Für das Schengen-Visum und das nationale Visum für Deutschland gilt das ICAO-Format 35 × 45 mm. Die USA verlangen ein quadratisches Foto im Format 51 × 51 mm (2 × 2 Zoll), China 33 × 48 mm. PixPassport übernimmt das richtige Format automatisch, sobald Sie das Zielland auswählen.",
  },
  {
    q: "Ist das Visumfoto dasselbe wie ein biometrisches Passbild?",
    a: "Für das Schengen-Visum ja: Es gelten dieselben ICAO-Vorgaben wie für das deutsche biometrische Passbild – 35 × 45 mm, neutraler Ausdruck, heller Hintergrund. Andere Länder weichen bei Format, Kopfgröße oder Hintergrundfarbe ab, daher sollten Sie das Foto immer für das jeweilige Zielland erstellen.",
  },
  {
    q: "Darf ich auf dem Visumfoto eine Brille tragen?",
    a: "Für das Schengen-Visum ist eine Brille erlaubt, solange die Augen klar erkennbar sind und es keine Spiegelungen oder getönten Gläser gibt. Für US-Visa sind Brillen seit November 2016 grundsätzlich nicht mehr erlaubt – Ausnahmen gibt es nur mit ärztlichem Attest.",
  },
  {
    q: "Welches Foto brauche ich für den DS-160-Antrag (US-Visum)?",
    a: "Für den DS-160 laden Sie ein quadratisches Farbfoto hoch: mindestens 600 × 600 und höchstens 1200 × 1200 Pixel, JPEG-Format, maximal 240 kB, weißer Hintergrund, ohne Brille und nicht älter als sechs Monate. Zum Interview bringen Sie zusätzlich einen Ausdruck im Format 51 × 51 mm mit, falls das Konsulat ihn verlangt.",
  },
  {
    q: "Kann ich mein Visumfoto selbst machen?",
    a: "In den meisten Fällen ja. Botschaften und Visa-Zentren akzeptieren selbst aufgenommene Fotos, wenn sie alle Vorgaben erfüllen. Einige Visa-Zentren nehmen das Foto beim Termin auch selbst auf. Prüfen Sie daher vorab die Hinweise auf der Website der zuständigen Auslandsvertretung.",
  },
  {
    q: "Wie alt darf ein Visumfoto sein?",
    a: "In der Regel darf das Foto nicht älter als sechs Monate sein und muss Ihr aktuelles Erscheinungsbild zeigen. Für US-Visa gilt diese Grenze ausdrücklich, auch bei unveränderter Frisur oder Brille.",
  },
];

/* ─── JSON-LD structured data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Visumfoto", item: "https://www.pixpassport.com/de/visum-foto" },
      ],
    },
    {
      "@type": "Service",
      name: "Visumfoto online erstellen",
      provider: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/de" },
      areaServed: ["DE", "AT", "CH"],
      serviceType: "Visumfoto",
    },
  ],
};

const schengenRules = [
  "Format 35 × 45 mm, Hochformat",
  "Gesichtshöhe 32–36 mm (Kinn bis Scheitel)",
  "Heller, einfarbiger Hintergrund, idealerweise hellgrau",
  "Brille erlaubt, wenn die Augen ohne Spiegelung sichtbar sind",
  "Nicht älter als sechs Monate",
];

const usRules = [
  "Quadratisch: 51 × 51 mm (2 × 2 Zoll)",
  "Digital: 600 × 600 bis 1200 × 1200 Pixel, JPEG, max. 240 kB",
  "Rein weißer Hintergrund",
  "Keine Brille (seit November 2016)",
  "Nicht älter als sechs Monate",
];

/* ─── Page ─── */
export default function VisumFotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Visumfoto" }]}
        eyebrow="Schengen · USA · China · über 50 Länder"
        title="Visumfoto online erstellen"
        intro="Jedes Land hat eigene Vorgaben für das Visumfoto. Wählen Sie Ihr Zielland, laden Sie ein Foto hoch – PixPassport passt Format, Kopfgröße und Hintergrund automatisch an und prüft das Ergebnis in unter 30 Sekunden."
        primary={{ href: ctaHref, label: "Schengen-Visumfoto erstellen" }}
        secondary={{ href: "#laender", label: "Anforderungen nach Land" }}
        note="Ergebnis kostenlos ansehen · ab 6,99 € · Geld zurück bei Ablehnung"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
          alt: "Beispiel eines Visumfotos nach ICAO-Norm mit Maßlinien für Kopfgröße",
          width: 1030,
          height: 890,
        }}
      />

      <Section id="laender" labelledBy="laender-h2">
        <SectionHeader
          id="laender-h2"
          eyebrow="Vorgaben im Vergleich"
          title="Visumfoto-Anforderungen nach Land"
          intro="Die wichtigsten Formate im Überblick. Maßgeblich sind immer die aktuellen Hinweise der Botschaft, des Konsulats oder des Visa-Zentrums."
        />
        <DataTable
          caption="Visumfoto-Anforderungen nach Land"
          head={["Land / Visum", "Format", "Hintergrund", "Hinweis", ""]}
          rows={countries.map((c) => [
            c.land,
            <Badge key="f">{c.format}</Badge>,
            c.hintergrund,
            c.hinweis,
            <Link key="l" href={c.type ? `/de/passbild-online?type=${c.type}` : "/de/passbild-online"} className={`${textLink} whitespace-nowrap`}>
              {c.type ? "Foto erstellen" : "Land wählen"}
              <span className="sr-only"> – {c.land}</span>
            </Link>,
          ])}
        />
      </Section>

      <Section muted>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className={card}>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">Foto für das Schengen-Visum</h2>
            <p className="mb-5 mt-3 text-base leading-relaxed text-slate-600">
              Für alle Schengen-Staaten – und für das nationale Visum für Deutschland – gilt das biometrische ICAO-Format.
              Es entspricht weitgehend dem deutschen{" "}
              <Link href="/de/biometrisches-passbild" className={textLink}>biometrischen Passbild</Link>.
            </p>
            <CheckList items={schengenRules} />
          </article>
          <article className={card}>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">Foto für das US-Visum (DS-160)</h2>
            <p className="mb-5 mt-3 text-base leading-relaxed text-slate-600">
              Die USA weichen deutlich vom europäischen Format ab. Das Foto wird zuerst digital im DS-160-Formular
              hochgeladen.
            </p>
            <CheckList items={usRules} />
            <Link href="/de/passbild-online?type=us-visa" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lime-700 hover:text-lime-800">
              US-Visumfoto erstellen <ArrowRight />
            </Link>
          </article>
        </div>
      </Section>

      <Section labelledBy="steps-h2">
        <SectionHeader id="steps-h2" eyebrow="So funktioniert es" title="Visumfoto in drei Schritten" />
        <StepsGrid steps={steps} />
      </Section>

      <Section muted labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="So wird Ihr Visumfoto angenommen" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader id="faq-h2" eyebrow="Häufige Fragen" title="FAQ zum Visumfoto" />
        <FaqList items={faqs} />
      </Section>

      <CtaBand
        title="Ihr Visumfoto in 30 Sekunden"
        text="Zielland wählen, Foto hochladen, Ergebnis kostenlos prüfen – erst dann bezahlen."
        href={ctaHref}
        label="Visumfoto erstellen"
      />
    </>
  );
}
