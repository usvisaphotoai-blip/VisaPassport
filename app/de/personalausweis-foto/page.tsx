import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero,
  Section,
  SectionHeader,
  StepsGrid,
  CardGrid,
  CheckList,
  DoDont,
  DataTable,
  Badge,
  FaqList,
  CtaBand,
  JsonLd,
  Prose,
  textLink,
  RelatedPages,
  QuickFacts,
} from "../components/ui";

/* ─── Metadata ─── */
const pageUrl = "https://www.pixpassport.com/de/personalausweis-foto";

export const metadata: Metadata = {
  title: "Foto für Personalausweis: Regeln & Ablauf 2026 | PixPassport",
  description:
    "Foto für den Personalausweis: 35 × 45 mm, digitale Übermittlung seit Mai 2025, Kosten, Kinderregeln und Vorgaben für Österreich und die Schweiz.",
  keywords: [
    "foto für personalausweis",
    "personalausweis foto",
    
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Foto für Personalausweis: Regeln & Ablauf 2026 | PixPassport",
    description:
      "Maße, Hintergrund, Brille, Kinderfotos und der digitale Ablauf im Bürgeramt – alles zum Personalausweis-Foto.",
    url: pageUrl,
    siteName: "PixPassport",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foto für den Personalausweis mit Maßlinien nach ICAO-Norm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto für Personalausweis: Regeln & Ablauf 2026 | PixPassport",
    description:
      "Maße, Kosten, Kinderfotos und der digitale Ablauf im Bürgeramt seit Mai 2025.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Data ─── */
const trustBadges = [
  { icon: "🔒", text: "Löschung nach 24 Stunden" },
  { icon: "⚡", text: "Fertig in 30 Sekunden" },
  { icon: "🏛️", text: "Nach BMI-Lichtbild-Schablone" },
  { icon: "🆓", text: "Kostenlose Vorschau" },
];

const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Porträt oder Selfie hoch, aufgenommen bei Tageslicht vor einer hellen Wand.",
  },
  {
    n: "2",
    title: "Automatisch prüfen lassen",
    desc: "Die Software misst Gesichtshöhe und Augenposition, ersetzt den Hintergrund und gleicht das Bild mit der BMI-Lichtbild-Schablone ab.",
  },
  {
    n: "3",
    title: "Ergebnis nutzen",
    desc: "Sie wissen vor dem Termin, ob Ihr Foto passt, und laden es als Datei oder Druckvorlage herunter – etwa für Führerschein, Visum oder Auslandsantrag.",
  },
];

const specs = [
  {
    label: "Format",
    value: "35 × 45 mm",
    detail: "Hochformat, randlos, in Farbe",
  },
  {
    label: "Gesichtshöhe",
    value: "32–36 mm",
    detail: "Kinn bis Scheitel, ab 10 Jahren (6–9 Jahre: 22–36 mm)",
  },
  {
    label: "Hintergrund",
    value: "Hellgrau",
    detail: "Einfarbig, gleichmäßig ausgeleuchtet, ohne Schatten",
  },
  {
    label: "Kopfhaltung",
    value: "Frontal",
    detail: "Gerade, weder geneigt noch gedreht",
  },
  {
    label: "Augen",
    value: "Offen",
    detail: "Brille erlaubt, aber ohne Spiegelung und Tönung",
  },
  {
    label: "Mimik",
    value: "Neutral",
    detail: "Mund geschlossen, kein Lächeln",
  },
  {
    label: "Kopfbedeckung",
    value: "Nicht erlaubt",
    detail: "Ausnahme aus religiösen oder medizinischen Gründen",
  },
  {
    label: "Übermittlung",
    value: "Digital",
    detail: "Seit 1. Mai 2025 Pflicht in Deutschland",
  },
];

const options = [
  {
    title: "Im Bürgeramt",
    desc: "Viele Ämter haben ein Foto-Terminal. Die Aufnahme kostet bundesweit 6 € pro Dokument. Für Kleinkinder sind die Geräte oft nicht geeignet.",
  },
  {
    title: "Beim Fotodienstleister",
    desc: "Registrierte Fotografen und Drogeriemärkte übermitteln das Bild verschlüsselt in eine Cloud. Sie erhalten einen Code, den das Amt einscannt.",
  },
  {
    title: "Vorab selbst prüfen",
    desc: "Mit PixPassport testen Sie vorher, ob Brille, Frisur oder Kleidung den Vorgaben entsprechen – so vermeiden Sie einen zweiten Termin.",
  },
  {
    title: "Österreich, Schweiz und Ausland",
    desc: "Hier gelten teils andere Abläufe. Fragen Sie bei Passbehörde, Gemeinde oder Botschaft, ob ein eigenes Foto angenommen wird.",
  },
];

const countries = [
  {
    label: "Deutschland",
    doc: "Personalausweis",
    format: "35 × 45 mm",
    face: "32–36 mm",
    note: "Nur digitale Aufnahme im Amt oder beim registrierten Fotografen",
  },
  {
    label: "Österreich",
    doc: "Personalausweis",
    format: "35 × 45 mm",
    face: "Kopf ca. zwei Drittel des Bildes",
    note: "Farbfoto, max. 6 Monate alt, heller einfarbiger Hintergrund",
  },
  {
    label: "Schweiz",
    doc: "Identitätskarte",
    format: "35 × 45 mm",
    face: "29–34 mm",
    note: "Ablauf je nach Kanton; bei der Gemeinde oder Passstelle nachfragen",
  },
];

const doList = [
  "Schauen Sie direkt in die Kamera, Kopf gerade, Mund geschlossen.",
  "Halten Sie Stirn und Augen frei, Haare hinter die Schultern oder aus dem Gesicht.",
  "Tragen Sie Kleidung, die sich vom hellgrauen Hintergrund abhebt.",
  "Nehmen Sie die Brille im Zweifel ab, wenn Gläser spiegeln.",
  "Lassen Sie das Foto kurz vor dem Termin aufnehmen, damit es Ihr aktuelles Aussehen zeigt.",
];

const dontList = [
  "Kein Lächeln und keine asymmetrische Mimik, auch kein halbes Lächeln.",
  "Keine Sonnenbrille, keine getönten Gläser, keine Mütze oder Kappe.",
  "Keine Schatten im Gesicht oder auf dem Hintergrund.",
  "Keine Filter, Beauty-Apps oder nachträgliche Retusche.",
  "Kein Schnuller, Spielzeug oder stützende Hand bei Babyfotos.",
];

const kids = [
  {
    title: "Babys und Kinder bis 5 Jahre",
    desc: "Blickrichtung, Kopfhaltung und Mimik dürfen abweichen. Format, Schärfe, Ausleuchtung und Hintergrund müssen trotzdem stimmen.",
  },
  {
    title: "Kinder von 6 bis 9 Jahren",
    desc: "Es gilt eine eigene Schablone mit einer Gesichtshöhe von 22 bis 36 mm.",
  },
  {
    title: "Ab 10 Jahren",
    desc: "Es gelten die Vorgaben für Erwachsene mit 32 bis 36 mm Gesichtshöhe.",
  },
];

const benefits = [
  "Prüfung nach BMI-Lichtbild-Schablone und ICAO-Norm 9303.",
  "Hintergrund wird automatisch durch einheitliches Hellgrau ersetzt.",
  "Zuschnitt auf 35 × 45 mm mit korrekter Gesichtshöhe.",
  "Druckvorlage für den Führerschein, der weiterhin ein Papierfoto verlangt.",
  "Kostenlose Vorschau, Download ab 6,99 €.",
  "Fotos werden spätestens nach 24 Stunden gelöscht.",
];

const stats = [
  { val: "35×45 mm", label: "Format des Ausweisfotos in DE, AT und CH" },
  { val: "6 €", label: "Gebühr für die Aufnahme im Bürgeramt" },
  { val: "ICAO 9303", label: "Zugrunde liegende internationale Norm" },
  { val: "24 h", label: "Bis zur automatischen Löschung Ihrer Fotos" },
];

const faqs = [
  {
    q: "Welches Foto brauche ich für den Personalausweis?",
    a: "Sie brauchen ein biometrisches Lichtbild im Format 35 × 45 mm, frontal aufgenommen, mit neutraler Mimik, offenen Augen und einfarbig hellem Hintergrund. Die Gesichtshöhe liegt ab 10 Jahren bei 32 bis 36 mm. Seit dem 1. Mai 2025 muss das Foto in Deutschland digital vorliegen: aufgenommen im Bürgeramt oder bei einem registrierten Fotodienstleister.",
  },
  {
    q: "Kann ich ein selbst gemachtes Foto für den Personalausweis verwenden?",
    a: "In Deutschland nicht mehr. Seit Mai 2025 nehmen die Behörden nur noch Fotos an, die im Amt aufgenommen oder von einem registrierten Fotografen über eine zertifizierte Cloud übermittelt werden. So soll verhindert werden, dass bearbeitete oder verschmolzene Bilder (Morphing) in den Ausweis gelangen. Ein selbst erstelltes Foto eignet sich weiterhin für den Führerschein, Visa, die Gesundheitskarte und viele Anträge im Ausland.",
  },
  {
    q: "Was kostet ein Foto für Personalausweis oder Reisepass?",
    a: "Im Bürgeramt kostet die digitale Aufnahme bundesweit 6 € pro Dokument. Drogeriemärkte bieten die Aufnahme mit Code ab etwa 6 € an, Fotostudios meist zwischen 10 und 30 €. Hinzu kommt die Gebühr für den Ausweis selbst: 37 € ab 24 Jahren, 22,80 € für jüngere Antragsteller.",
  },
  {
    q: "Sind Passbilder für Personalausweis und Reisepass gleich?",
    a: "Ja. Beide Dokumente folgen denselben biometrischen Vorgaben. Wer Reisepass und Personalausweis gleichzeitig beantragt, kann ein Foto für beide verwenden. Im Bürgeramt fällt die Gebühr von 6 € allerdings pro Dokument an.",
  },
  {
    q: "Darf ich auf dem Foto für den Personalausweis eine Brille tragen?",
    a: "Ja, wenn die Augen klar zu erkennen sind. Getönte Gläser, Sonnenbrillen, Spiegelungen und Rahmen, die über die Augen reichen, führen zur Ablehnung. Am sichersten ist es, die Brille abzunehmen.",
  },
  {
    q: "Wie alt darf das Foto sein?",
    a: "Das Foto muss Ihr aktuelles Aussehen zeigen. Als Richtwert gilt: nicht älter als sechs Monate. In Österreich ist diese Grenze ausdrücklich vorgeschrieben.",
  },
  {
    q: "Welche Regeln gelten in Österreich und der Schweiz?",
    a: "Das Format 35 × 45 mm ist in allen drei Ländern gleich. In Österreich ist ein Farbfoto vorgeschrieben, nicht älter als sechs Monate, mit hellem einfarbigem Hintergrund. In der Schweiz liegt die Gesichtshöhe für die Identitätskarte laut kantonalen Merkblättern bei 29 bis 34 mm. Wie das Foto eingereicht wird, regelt die jeweilige Gemeinde oder Passstelle.",
  },
];

/* ─── JSON-LD structured data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Foto für Personalausweis: Regeln & Ablauf 2026 | PixPassport",
      inLanguage: "de",
      dateModified: "2026-11-04",
      isPartOf: {
        "@type": "WebSite",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
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
      name: "Foto für Personalausweis vorab prüfen",
      step: steps.map((s) => ({
        "@type": "HowToStep",
        name: s.title,
        text: s.desc,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://www.pixpassport.com/de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Personalausweis-Foto",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Personalausweis-Foto prüfen und erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: ["DE", "AT", "CH"],
      serviceType: "Foto für Personalausweis",
    },
  ],
};

/* ─── Page ─── */
export default function PersonalausweisFotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[
          { label: "Startseite", href: "/de" },
          { label: "Personalausweis-Foto" },
        ]}
        eyebrow="Stand 2026 · BMI-Vorgaben & ICAO-Norm"
        title="Personalausweis Foto erstellen"
        intro="Ein Foto für Personalausweis und Reisepass muss 35 × 45 mm groß sein, frontal aufgenommen und seit Mai 2025 digital übermittelt werden. Hier finden Sie alle Vorgaben, Kosten und Kinderregeln – und prüfen Ihr Foto vor dem Termin."
        primary={{ href: ctaHref, label: "Foto jetzt prüfen" }}
        secondary={{ href: "#anforderungen", label: "Alle Anforderungen" }}
        note="4,9 von 5 Sternen · über 17.000 zufriedene Nutzer"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Personalausweis-Foto mit Maßlinien für Gesichtshöhe und Augenposition",
          width: 843,
          height: 671,
        }}
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {trustBadges.map((t) => (
            <li
              key={t.text}
              className="flex items-center gap-1.5 rounded-md border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              <span aria-hidden="true">{t.icon}</span>
              {t.text}
            </li>
          ))}
        </ul>
      </Hero>

      <QuickFacts
        items={[
          { label: "Format", value: "35 × 45 mm" },
          { label: "Gesichtshöhe", value: "32–36 mm" },
          { label: "Aufnahme im Bürgeramt", value: "6 € pro Dokument" },
          { label: "Abgabe", value: "Digital seit Mai 2025" },
        ]}
      />

      <Section width="4xl" labelledBy="what-h2">
        <SectionHeader
          id="what-h2"
          title="Foto für Personalausweis: was sich 2025 geändert hat"
        />
        <Prose>
          <p>
            Bis April 2025 konnten Sie Passbilder für den Personalausweis
            ausgedruckt mit ins Bürgeramt bringen. Seit dem 1. Mai 2025 ist das
            vorbei: Die Behörden akzeptieren nur noch digitale Lichtbilder. Die
            Übergangsfrist für Papierfotos endete am 31. Juli 2025.
          </p>
          <p>
            Sie haben zwei Wege. Entweder lassen Sie sich direkt im Bürgeramt am
            Foto-Terminal fotografieren, oder Sie gehen zu einem registrierten
            Fotodienstleister, etwa einem Fotostudio oder Drogeriemarkt. Dieser
            lädt das Bild in eine verschlüsselte, vom BSI zertifizierte Cloud
            und gibt Ihnen einen Code mit. Das Amt ruft das Foto über diesen
            Code ab.
          </p>
          <p>
            Hintergrund der Änderung ist der Schutz vor sogenanntem Morphing:
            Dabei werden zwei Gesichter zu einem Bild verschmolzen, sodass zwei
            Personen denselben Ausweis nutzen könnten. Die geschlossene digitale
            Kette soll das verhindern.
          </p>
          <p>
            Die Vorgaben an das Bild selbst sind gleich geblieben. Genau hier
            hilft PixPassport: Sie prüfen vorab, ob Brille, Frisur und Kleidung
            passen, und sparen sich einen zweiten Termin. Für den{" "}
            <Link href="/de/fuehrerschein-foto" className={textLink}>
              Führerschein
            </Link>
            , der weiterhin ein Papierfoto verlangt, sowie für ein{" "}
            <Link href="/de/visum-foto" className={textLink}>
              Visum
            </Link>{" "}
            oder die{" "}
            <Link href="/de/gesundheitskarte-foto" className={textLink}>
              Gesundheitskarte
            </Link>{" "}
            nutzen Sie das Foto direkt.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="options-h2">
        <SectionHeader
          id="options-h2"
          eyebrow="Ihre Optionen"
          title="Wo Sie Fotos für den Personalausweis bekommen"
          intro="Welcher Weg sich lohnt, hängt von Ihrem Bürgeramt, dem Alter des Antragstellers und Ihrem Wohnort ab."
        />
        <CardGrid cols={4} items={options} />
      </Section>

      <Section labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="So funktioniert es"
          title="Foto für Personalausweis prüfen – in drei Schritten"
          intro="Sie brauchen nur ein Smartphone und eine helle Wand. Alles läuft online."
        />
        <StepsGrid steps={steps} />
      </Section>

      <Section muted width="4xl" id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Offizielle Vorgaben"
          title="Anforderungen an das Personalausweis-Foto"
          intro="Diese Kriterien folgen der Personalausweisverordnung, der BMI-Lichtbild-Schablone und der ICAO-Norm 9303."
        />
        <DataTable
          stack
          caption="Foto für Personalausweis: Anforderungen im Überblick"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={specs.map((s) => [
            s.label,
            <Badge key={s.label}>{s.value}</Badge>,
            s.detail,
          ])}
        />
      </Section>

      <Section labelledBy="check-h2">
        <SectionHeader
          id="check-h2"
          eyebrow="Checkliste"
          title="Häufige Ablehnungsgründe vermeiden"
          intro="Die meisten Ausweisfotos scheitern an Mimik, Schatten oder spiegelnden Brillengläsern."
        />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section muted labelledBy="kids-h2">
        <SectionHeader
          id="kids-h2"
          eyebrow="Kinder"
          title="Personalausweis-Foto für Babys und Kinder"
          intro="Auch Kinder brauchen ein biometrisches Foto. Je jünger, desto großzügiger sind die Regeln. Die Terminals im Amt sind für Kleinkinder oft ungeeignet – planen Sie dann einen Fotografen ein."
        />
        <CardGrid cols={3} items={kids} />
      </Section>

      <Section width="4xl" id="laender" labelledBy="country-h2">
        <SectionHeader
          id="country-h2"
          eyebrow="D-A-CH im Vergleich"
          title="Ausweisfoto in Deutschland, Österreich und der Schweiz"
          intro="Das Format ist überall gleich, Gesichtsgröße und Einreichung unterscheiden sich."
        />
        <DataTable
          stack
          caption="Ausweisfoto: Vorgaben nach Land"
          head={["Land", "Dokument", "Format", "Gesichtsgröße", "Hinweis"]}
          rows={countries.map((c) => [
            c.label,
            c.doc,
            c.format,
            c.face,
            c.note,
          ])}
        />
        <div className="mt-6">
          <Prose>
            <p>
              Mehr zur Schweiz lesen Sie unter{" "}
              <Link href="/de/dokumentenfoto-schweiz" className={textLink}>
                Dokumentenfoto Schweiz
              </Link>
              . Für den Pass gelten dieselben Maße wie beim{" "}
              <Link href="/de/reisepass-foto" className={textLink}>
                Reisepassfoto
              </Link>
              .
            </p>
          </Prose>
        </div>
      </Section>

      <Section muted labelledBy="why-h2">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              id="why-h2"
              eyebrow="Warum PixPassport"
              title="Ihr Passfoto für den Ausweis vorab prüfen"
              intro="Ein abgelehntes Foto kostet einen zweiten Termin. Mit PixPassport sehen Sie vorher, ob Ihr Bild die Vorgaben erfüllt."
            />
            <CheckList items={benefits} />
          </div>
          <dl className="grid grid-cols-2 gap-4 rounded-xl border-2 border-slate-200 bg-white p-5 sm:gap-6 sm:p-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-tight text-slate-600">
                  {s.label}
                </dt>
                <dd className="text-xl font-black leading-none text-lime-700 sm:text-3xl">
                  {s.val}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="FAQ: Foto für Personalausweis"
          intro="Antworten zu Ablauf, Kosten, Brille und den Regeln in Österreich und der Schweiz."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages
        keys={[
          "reisepass",
          "biometrisch", "brille",
          "fuehrerschein",
          "dokSchweiz",
          "ratgeber",
        ]}
      />

      <CtaBand
        title="Foto vor dem Termin prüfen"
        text="Foto hochladen, Ergebnis in 30 Sekunden kostenlos ansehen – ab 6,99 €."
        href={ctaHref}
        label="Foto für Personalausweis prüfen"
      />
    </>
  );
}
