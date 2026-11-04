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
const pageUrl = "https://www.pixpassport.com/de/reisepass-foto";

export const metadata: Metadata = {
  title: "Foto für Reisepass: Reisepassfoto erstellen | PixPassport",
  description:
    "Foto für Reisepass erstellen: 35 × 45 mm, Gesichtshöhe 32–36 mm, heller Hintergrund. Alle Vorgaben für Deutschland, Österreich und die Schweiz.",
  keywords: [
    "foto für reisepass",
    "foto reisepass",
    "bilder für reisepass",
    "reisepassfoto",
    "reisepass fotos",
    "passfoto für reisepass",
    "passbild reisepass",
    "kinderreisepass foto",
    "reisepass foto österreich",
    "reisepass foto schweiz",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Foto für Reisepass: Reisepassfoto erstellen | PixPassport",
    description:
      "Reisepassfoto nach ICAO-Norm: Maße, Hintergrund, Kinder und die Regeln für Deutschland, Österreich und die Schweiz.",
    url: pageUrl,
    siteName: "PixPassport",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foto für den Reisepass mit Maßlinien nach ICAO-Norm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto für Reisepass: Reisepassfoto erstellen | PixPassport",
    description:
      "Reisepassfoto nach ICAO-Norm: Maße, Hintergrund, Kinder und Regeln für DE, AT und CH.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Data ─── */
const trustBadges = [
  { icon: "🔒", text: "Löschung nach 24 Stunden" },
  { icon: "⚡", text: "Fertig in 30 Sekunden" },
  { icon: "🌍", text: "DE · AT · CH" },
  { icon: "🆓", text: "Kostenlose Vorschau" },
];

const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträt hoch. Ein Smartphone-Foto bei Tageslicht genügt.",
  },
  {
    n: "2",
    title: "Automatisch anpassen lassen",
    desc: "Die Software schneidet auf 35 × 45 mm zu, misst die Gesichtshöhe, ersetzt den Hintergrund und prüft das Ergebnis nach ICAO 9303.",
  },
  {
    n: "3",
    title: "Reisepassfoto herunterladen",
    desc: "Sie erhalten das fertige Foto als Datei und als Druckvorlage für 10 × 15 cm bzw. A4.",
  },
];

const specs = [
  {
    label: "Format",
    value: "35 × 45 mm",
    detail: "Hochformat, ohne Rand, in Farbe",
  },
  {
    label: "Gesichtshöhe",
    value: "32–36 mm",
    detail: "Kinn bis Scheitel (Deutschland, ab 10 Jahren)",
  },
  {
    label: "Hintergrund",
    value: "Hellgrau",
    detail: "Einfarbig, ohne Muster und Schatten",
  },
  {
    label: "Kopfhaltung",
    value: "Frontal",
    detail: "Gerade, nicht geneigt oder gedreht",
  },
  {
    label: "Augen",
    value: "Offen",
    detail: "Brille nur ohne Spiegelung, Tönung und verdeckenden Rahmen",
  },
  {
    label: "Mimik",
    value: "Neutral",
    detail: "Mund geschlossen, nicht lächeln",
  },
  {
    label: "Auflösung",
    value: "≥ 600 dpi",
    detail: "Für Druck empfohlen (827 × 1063 Pixel)",
  },
  {
    label: "Aktualität",
    value: "Max. 6 Monate",
    detail: "Muss Ihr heutiges Aussehen zeigen",
  },
];

const countries = [
  {
    label: "Deutschland",
    format: "35 × 45 mm",
    face: "32–36 mm",
    age: "ca. 6 Monate",
    note: "Seit 1. Mai 2025 nur digitale Übermittlung",
  },
  {
    label: "Österreich",
    format: "35 × 45 mm",
    face: "ca. zwei Drittel des Bildes",
    age: "max. 6 Monate",
    note: "Farbfoto, einfarbiger heller Hintergrund",
  },
  {
    label: "Schweiz",
    format: "35 × 45 mm",
    face: "29–34 mm",
    age: "aktuell",
    note: "Maß laut kantonalen Merkblättern; Passstelle fragen",
  },
];

const doList = [
  "Blicken Sie frontal in die Kamera, mit geradem Kopf und neutraler Mimik.",
  "Stellen Sie sich ca. 50 cm vor eine helle, glatte Wand.",
  "Sorgen Sie für gleichmäßiges Tageslicht ohne Schatten im Gesicht.",
  "Tragen Sie Kleidung, die sich vom hellen Hintergrund abhebt.",
  "Halten Sie die Haare aus dem Gesicht, damit Stirn und Ohrenansatz frei sind.",
];

const dontList = [
  "Keine Sonnenbrille, keine getönten Gläser, keine Kopfbedeckung (Ausnahme: religiöse oder medizinische Gründe).",
  "Kein Lächeln, kein geöffneter Mund, keine hochgezogenen Augenbrauen.",
  "Keine Filter, kein Weichzeichner und keine Retusche.",
  "Kein Blitz direkt ins Gesicht und kein Gegenlicht.",
  "Keine unscharfen oder stark komprimierten Aufnahmen.",
];

const useCases = [
  {
    title: "Erwachsene",
    desc: "Das Foto erfüllt die ICAO-Vorgaben für den Reisepass. Es ist auch für den Personalausweis nutzbar, denn beide Dokumente verlangen dasselbe Format.",
  },
  {
    title: "Kinder ab 6 Jahren",
    desc: "Für 6- bis 9-Jährige gilt eine kleinere Gesichtshöhe von 22–36 mm, ab 10 Jahren die Erwachsenenmaße.",
  },
  {
    title: "Babys und Kleinkinder",
    desc: "Bis fünf Jahre sind Blickrichtung, Kopfhaltung und Mimik gelockert. Das Kind muss allein im Bild sein.",
  },
  {
    title: "Österreich und Schweiz",
    desc: (
      <>
        Das Format 35 × 45 mm gilt auch hier. Details zur Schweiz finden Sie im
        Ratgeber{" "}
        <Link href="/de/passfoto-schweiz-online" className={textLink}>
          Passfoto Schweiz
        </Link>
        .
      </>
    ),
  },
];

const benefits = [
  "Zuschnitt exakt auf 35 × 45 mm mit korrekter Gesichtshöhe.",
  "Fertige Bilder für Reisepass, Visum und Führerschein in einem Schritt.",
  "Hintergrund wird automatisch durch einheitliches Hellgrau ersetzt.",
  "Belichtung, Schärfe und Kontrast werden automatisch korrigiert.",
  "Druckvorlage mit mehreren Fotos auf einem Blatt, z. B. für den Fotoservice im Drogeriemarkt.",
  "Kostenlose Vorschau, bezahlt wird erst ab 6,99 € für den Download.",
  "Fotos werden spätestens nach 24 Stunden automatisch gelöscht.",
  "Geeignet für Erwachsene, Kinder und Babys.",
];

const stats = [
  { val: "35×45 mm", label: "Format des Reisepassfotos in DE, AT und CH" },
  { val: "< 30 Sek.", label: "Von der Aufnahme bis zum fertigen Foto" },
  { val: "ICAO 9303", label: "Zugrunde liegende internationale Norm" },
  { val: "24 h", label: "Bis zur automatischen Löschung Ihrer Fotos" },
];

const faqs = [
  {
    q: "Wie muss ein Foto für Reisepass und Personalausweis aussehen?",
    a: "Ein Foto für den Reisepass misst 35 × 45 mm im Hochformat und zeigt Sie frontal mit neutraler Mimik und offenen Augen. In Deutschland liegt die Gesichtshöhe zwischen 32 und 36 mm. Der Hintergrund ist einfarbig hell, gleichmäßig ausgeleuchtet und ohne Schatten. Das Foto muss Ihr aktuelles Aussehen zeigen und darf in der Regel nicht älter als sechs Monate sein.",
  },
  {
    q: "Welche Maße haben Bilder für Reisepass-Anträge?",
    a: "Bilder für Reisepass haben in Deutschland, Österreich und der Schweiz das Format 35 × 45 mm. Für den Druck empfehlen sich mindestens 600 dpi, das entspricht etwa 827 × 1063 Pixeln. Wichtiger als die reine Größe ist die Gesichtshöhe: In Deutschland sind 32–36 mm vorgeschrieben, in der Schweiz nennen die Merkblätter 29–34 mm.",
  },
  {
    q: "Kann ich mein Passfoto für den Reisepass selbst machen?",
    a: "Das hängt vom Land und vom Einreichungsweg ab. In Deutschland nehmen die Behörden seit dem 1. Mai 2025 nur noch digitale Lichtbilder an, entweder direkt im Amt oder über einen registrierten Fotodienstleister mit zertifizierter Übermittlung. Ein selbst erstelltes Foto eignet sich dort nicht für den Antrag. Es eignet sich aber, um Vorgaben zu prüfen, Fotos für Visa oder den Führerschein zu erstellen und für Anträge im Ausland, die ein eigenes Foto zulassen. Fragen Sie vorab Ihre Passbehörde.",
  },
  {
    q: "Gilt das Foto auch für Österreich und die Schweiz?",
    a: "Das Format 35 × 45 mm ist in allen drei Ländern gleich. In Österreich verlangt die Passgesetz-Durchführungsverordnung ein Farbfoto mit einfarbigem hellem Hintergrund, das höchstens sechs Monate alt ist und auf dem nur die antragstellende Person zu sehen ist. In der Schweiz liegt die Gesichtshöhe laut Merkblättern bei 29–34 mm. Welche Übermittlung die Passstelle akzeptiert, sollten Sie vor Ort klären.",
  },
  {
    q: "Brauche ich für den Kinderreisepass ein besonderes Foto?",
    a: "Der klassische Kinderreisepass wird in Deutschland seit dem 1. Januar 2024 nicht mehr neu ausgestellt. Kinder erhalten stattdessen einen regulären Reisepass mit demselben Fotoformat. Für Kinder bis fünf Jahre gelten gelockerte Regeln bei Kopfhaltung, Blick und Mimik. Das Kind darf allein im Bild sein, ohne Schnuller, Mütze oder stützende Hand. Für 6- bis 9-Jährige liegt die Gesichtshöhe bei 22–36 mm.",
  },
  {
    q: "Darf ich auf dem Reisepassfoto eine Brille tragen?",
    a: "Ja, eine normale Sehbrille ist in Deutschland erlaubt, solange die Augen klar erkennbar sind. Spiegelungen, getönte Gläser, Sonnenbrillen und Rahmen, die die Augen verdecken, führen zur Ablehnung. Am sichersten ist es, die Brille für die Aufnahme abzunehmen.",
  },
  {
    q: "Wie viel kostet ein Reisepassfoto?",
    a: "Beim Fotografen oder Automaten zahlen Sie meist zwischen 6 und 15 Euro, im Fotostudio mitunter mehr. Mit PixPassport sehen Sie das Ergebnis kostenlos in der Vorschau und zahlen ab 6,99 € erst für den Download.",
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
      name: "Foto für Reisepass: Reisepassfoto erstellen | PixPassport",
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
      name: "Foto für den Reisepass online erstellen",
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
          name: "Reisepassfoto",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Reisepassfoto erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: ["DE", "AT", "CH"],
      serviceType: "Foto für Reisepass",
    },
  ],
};

/* ─── Page ─── */
export default function ReisepassFotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[
          { label: "Startseite", href: "/de" },
          { label: "Reisepassfoto" },
        ]}
        eyebrow="DE · AT · CH · Stand 2026"
        title="Deutsches Reisepassfoto erstellen"
        intro="Das Foto für Reisepass und Ausweis muss 35 × 45 mm groß sein, frontal aufgenommen und vor hellem Hintergrund ausgeleuchtet. PixPassport schneidet zu, ersetzt den Hintergrund und prüft Ihr Bild nach ICAO 9303 – ohne Fototermin."
        primary={{ href: ctaHref, label: "Reisepassfoto erstellen" }}
        secondary={{ href: "#anforderungen", label: "Alle Anforderungen" }}
        note="4,9 von 5 Sternen · über 17.000 zufriedene Nutzer"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Foto für den Reisepass mit Maßlinien für Gesichtshöhe und Augenposition nach ICAO-Norm",
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
          { label: "Gesichtshöhe (DE)", value: "32–36 mm" },
          { label: "Hintergrund", value: "Hellgrau, einfarbig" },
          { label: "Abgabe in Deutschland", value: "Digital seit Mai 2025" },
        ]}
      />

      <Section width="4xl" labelledBy="what-h2">
        <SectionHeader
          id="what-h2"
          title="Foto für Reisepass: das müssen Sie wissen"
        />
        <Prose>
          <p>
            Ein Foto für Reisepass und Ausweis ist kein gewöhnliches Porträt. Es
            folgt der internationalen ICAO-Norm 9303, damit die
            Gesichtserkennung am Chip des Passes zuverlässig funktioniert. Schon
            kleine Abweichungen wie ein dunkler Hintergrund, ein Schatten im
            Gesicht oder eine falsche Gesichtshöhe führen deshalb zur Ablehnung.
          </p>
          <p>
            In Deutschland gelten für Reisepass und Personalausweis dieselben
            Vorgaben. Die Behörden orientieren sich an der Foto-Mustertafel und
            der Lichtbild-Schablone des Bundesinnenministeriums. Wenn Sie
            bereits ein{" "}
            <Link href="/de/biometrisches-passbild" className={textLink}>
              biometrisches Passbild
            </Link>{" "}
            für den Personalausweis haben, können Sie es für den Reisepass
            grundsätzlich weiterverwenden, sofern es aktuell ist.
          </p>
          <p>
            <strong>Wichtig seit Mai 2025:</strong> Deutsche Passbehörden
            akzeptieren für Reisepass und Personalausweis keine Papierfotos
            mehr. Das Lichtbild wird im Amt digital aufgenommen oder von einem
            registrierten Fotodienstleister übermittelt. PixPassport hilft Ihnen
            deshalb vor allem, Ihr Foto vorab nach den Vorgaben zu prüfen und es
            für alle Anträge zu erstellen, die ein eigenes Foto zulassen, etwa
            Visa, Führerschein oder Anträge im Ausland. Fragen Sie bei Ihrer
            Behörde nach dem genauen Ablauf.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="So funktioniert es"
          title="Reisepassfoto in drei Schritten erstellen"
          intro="Sie brauchen kein Fotostudio. Alles läuft online, am Smartphone oder am Computer."
        />
        <StepsGrid steps={steps} />
      </Section>

      <Section width="4xl" id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Offizielle Vorgaben"
          title="Anforderungen an das Passfoto für den Reisepass"
          intro="Diese Kriterien entsprechen der BMI-Lichtbild-Schablone und der ICAO-Norm 9303. PixPassport prüft jeden Punkt automatisch."
        />
        <DataTable
          stack
          caption="Passfoto Reisepass: Anforderungen im Überblick"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={specs.map((s) => [
            s.label,
            <Badge key={s.label}>{s.value}</Badge>,
            s.detail,
          ])}
        />
      </Section>

      <Section muted labelledBy="check-h2">
        <SectionHeader
          id="check-h2"
          eyebrow="Checkliste"
          title="Bilder für Reisepass: so gelingen sie"
        />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section width="4xl" id="laender" labelledBy="country-h2">
        <SectionHeader
          id="country-h2"
          eyebrow="D-A-CH im Vergleich"
          title="Reisepassfoto in Deutschland, Österreich und der Schweiz"
          intro="Das Format ist in allen drei Ländern 35 × 45 mm. Unterschiede gibt es bei Gesichtshöhe und Einreichung."
        />
        <DataTable
          stack
          caption="Passfoto Reisepass: Vorgaben nach Land"
          head={[
            "Land",
            "Format",
            "Gesichtsgröße",
            "Alter des Fotos",
            "Hinweis",
          ]}
          rows={countries.map((c) => [
            c.label,
            c.format,
            c.face,
            c.age,
            c.note,
          ])}
        />
        <div className="mt-6">
          <Prose>
            <p>
              Mehr zur Schweiz lesen Sie bei{" "}
              <Link href="/de/passfoto-schweiz-online" className={textLink}>
                Passfoto Schweiz online
              </Link>{" "}
              und{" "}
              <Link href="/de/dokumentenfoto-schweiz" className={textLink}>
                Dokumentenfoto Schweiz
              </Link>
              . Die verbindlichen Angaben erhalten Sie immer bei Ihrer
              zuständigen Passstelle.
            </p>
          </Prose>
        </div>
      </Section>

      <Section muted labelledBy="use-h2">
        <SectionHeader
          id="use-h2"
          eyebrow="Wer braucht was?"
          title="Bilder für Reisepass: Erwachsene, Kinder und Babys"
          intro="Die Regeln unterscheiden sich nach Alter, vor allem bei Gesichtshöhe und Mimik."
        />
        <CardGrid cols={4} items={useCases} />
      </Section>

      <Section labelledBy="why-h2">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              id="why-h2"
              eyebrow="Warum PixPassport"
              title="Passfoto Reisepass ohne Termin"
              intro="Statt Fotograf oder Automat prüfen und optimieren Sie Ihr Passfoto bequem von zu Hause nach den amtlichen Vorgaben."
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

      <Section muted width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="FAQ zum Foto für Reisepass"
          intro="Antworten zu Maßen, Kinderfotos und den Regeln in Deutschland, Österreich und der Schweiz."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages
        muted={false}
        keys={[
          "personalausweis",
          "biometrisch", "brille",
          "selber",
          "schweiz",
          "ratgeber",
        ]}
      />

      <CtaBand
        title="Ihr Reisepassfoto jetzt erstellen"
        text="Foto hochladen, Ergebnis in 30 Sekunden kostenlos ansehen – ab 6,99 €."
        href={ctaHref}
        label="Foto für Reisepass erstellen"
      />
    </>
  );
}
