import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, StatsBand, Section, SectionHeader, StepsGrid, CheckList, DataTable,
  FaqList, CtaBand, JsonLd, Prose, card, textLink, btnPrimary, ArrowRight,
} from "../components/ui";

export const metadata: Metadata = {
  title:
    "Bewerbungsfoto online erstellen – Tipps & Format | PixPassport",
  description:
    "Bewerbungsfoto online erstellen: Hintergrund ersetzen, zuschneiden, Licht optimieren – plus Tipps zu Kleidung, Format und Wirkung. Ab 6,99 €.",
  keywords: [
    "bewerbungsfoto",
    "bewerbungsfoto online erstellen",
    "lebenslauf foto",
    "bewerbungsbild tipps",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/bewerbungsfoto",
    languages: {
      de: "https://www.pixpassport.com/de/bewerbungsfoto",
      "x-default": "https://www.pixpassport.com/de/bewerbungsfoto",
    },
  },
  openGraph: {
    title: "Bewerbungsfoto online erstellen | PixPassport",
    description:
      "Bewerbungsfoto in Sekunden: Hintergrund ersetzen, zuschneiden, Licht optimieren. Ab 6,99 €.",
    url: "https://www.pixpassport.com/de/bewerbungsfoto",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bewerbungsfoto online erstellen",
      },
    ],
  },
};

const ctaHref = "/de/passbild-online?type=germany-cv";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Welche Größe sollte ein Bewerbungsfoto haben?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Üblich sind in Deutschland 4 × 6 cm oder 4,5 × 6 cm im Hochformat. Für digitale Bewerbungen genügt eine Datei im Seitenverhältnis 2:3 oder 3:4 mit mindestens 300 dpi bzw. rund 600 × 800 Pixeln.",
          },
        },
        {
          "@type": "Question",
          name: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein. Ein Foto ist freiwillig. Seit Inkrafttreten des Allgemeinen Gleichbehandlungsgesetzes (AGG) verzichten viele Arbeitgeber bewusst darauf, ein Foto anzufordern. Trotzdem legen viele Bewerberinnen und Bewerber freiwillig ein professionelles Foto bei.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ein biometrisches Passbild (35 × 45 mm) folgt strengen staatlichen Normen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln. Ein Bewerbungsfoto erlaubt mehr Freiheit: natürliches Lächeln, professionelle Kleidung, freie Wahl des Bildausschnitts.",
          },
        },
      ],
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
          name: "Bewerbungsfoto",
          item: "https://www.pixpassport.com/de/bewerbungsfoto",
        },
      ],
    },
  ],
};

const tips = [
  {
    icon: "👔",
    title: "Kleidung und Erscheinungsbild",
    points: [
      "Wählen Sie Kleidung, die zur angestrebten Branche passt: Hemd oder Bluse für klassische Berufe, ein legerer, aber gepflegter Look für Kreativbranchen.",
      "Dezente Farben wie Dunkelblau, Grau oder Anthrazit wirken professionell und zeitlos.",
      "Vermeiden Sie auffällige Muster, Logos oder grelle Farben, denn sie lenken vom Gesicht ab.",
      "Halten Sie Schmuck dezent und tragen Sie höchstens ein auffälliges Accessoire.",
    ],
  },
  {
    icon: "😊",
    title: "Mimik und Ausdruck",
    points: [
      "Ein offenes, natürliches Lächeln wirkt sympathisch — anders als beim biometrischen Passbild ist es hier ausdrücklich erwünscht.",
      "Ein direkter Blick in die Kamera signalisiert Selbstbewusstsein.",
      "Entspannte Schultern und ein leicht nach vorne geneigter Kopf wirken einladend.",
      "Machen Sie mehrere Aufnahmen und wählen Sie das natürlichste Bild aus.",
    ],
  },
  {
    icon: "💡",
    title: "Licht und Hintergrund",
    points: [
      "Nutzen Sie tagsüber natürliches Licht von der Seite oder schräg von vorne.",
      "Vermeiden Sie Gegenlicht und harte Schatten im Gesicht.",
      "PixPassport ersetzt den Hintergrund automatisch durch ein ruhiges, helles Grau.",
      "Ein unaufgeräumter oder farbiger Hintergrund lässt die Bewerbung schnell unprofessionell wirken.",
    ],
  },
  {
    icon: "📐",
    title: "Format und Technik",
    points: [
      "Üblich sind 4 × 6 cm oder 4,5 × 6 cm im Hochformat, der Kopf sitzt mittig im oberen Bildbereich.",
      "Für digitale Bewerbungen gilt: mindestens 300 dpi, Seitenverhältnis 2:3 oder 3:4.",
      "Halten Sie die Dateigröße für E-Mail-Bewerbungen idealerweise unter 500 kB im JPG- oder PNG-Format.",
      "PixPassport liefert Ihr Foto als hochauflösende Datei und als A4-Druckvorlage.",
    ],
  },
];

const comparisonRows = [
  {
    param: "Format",
    passbild: "35 × 45 mm",
    bewerbung: "Meist 4 × 6 cm oder 4,5 × 6 cm",
  },
  {
    param: "Hintergrund",
    passbild: "Einfarbig hellgrau (Pflicht)",
    bewerbung: "Neutral: Grau, Weiß, dezentes Blau",
  },
  {
    param: "Gesichtsausdruck",
    passbild: "Neutral, Mund geschlossen",
    bewerbung: "Leichtes, natürliches Lächeln empfohlen",
  },
  {
    param: "Retusche",
    passbild: "Keine Retusche erlaubt",
    bewerbung: "Dezente Retusche üblich",
  },
  {
    param: "Auflösung",
    passbild: "Mindestens 600 dpi",
    bewerbung: "Mindestens 300 dpi",
  },
  {
    param: "Pflicht?",
    passbild: "Ja, für Pass und Ausweis",
    bewerbung: "Nein, freiwillig",
  },
  {
    param: "Aktualität",
    passbild: "Nicht älter als 6 Monate",
    bewerbung: "Nicht älter als 2 Jahre empfohlen",
  },
];

const faqItems = [
  {
    q: "Welche Größe sollte ein Bewerbungsfoto haben?",
    a: "Üblich sind in Deutschland 4 × 6 cm oder 4,5 × 6 cm im Hochformat. Für digitale Bewerbungen empfehlen Karriereberater ein Seitenverhältnis von 2:3 oder 3:4 bei mindestens 300 dpi. Im Lebenslauf wird das Foto meist ohnehin auf die passende Größe skaliert.",
  },
  {
    q: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
    a: "Nein, ein Bewerbungsfoto ist freiwillig. Weil ein Foto Rückschlüsse auf Merkmale wie Alter, Geschlecht oder Herkunft zulässt, die das Allgemeine Gleichbehandlungsgesetz (AGG) schützt, fordern viele Arbeitgeber es bewusst nicht mehr an. Trotzdem ist das Beifügen eines Fotos in Deutschland weiterhin verbreitet. Für Bewerbungen in den USA oder Großbritannien raten Experten dagegen davon ab.",
  },
  {
    q: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
    a: "Ein biometrisches Passbild im Format 35 × 45 mm muss strengen staatlichen Normen genügen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln, keine Retusche. Ein Bewerbungsfoto erlaubt deutlich mehr Freiheit: natürliches Lächeln, professionelle Kleidung, dezente Nachbearbeitung und einen freieren Bildausschnitt.",
  },
  {
    q: "Kann ich ein Selfie als Bewerbungsfoto verwenden?",
    a: "Grundsätzlich ja, solange das Ergebnis professionell wirkt. Bitten Sie möglichst eine zweite Person um die Aufnahme oder nutzen Sie den Selbstauslöser mit Stativ – ein Selfie mit ausgestrecktem Arm verzerrt das Gesicht. PixPassport optimiert anschließend Belichtung und Hintergrund. Für Führungspositionen empfiehlt sich dennoch ein professionelles Fotoshooting.",
  },
  {
    q: "Welcher Hintergrund eignet sich am besten für ein Bewerbungsfoto?",
    a: "Ein neutraler, einfarbiger Hintergrund in Hellgrau, Weiß oder dezentem Blau gilt als professionell und zeitlos. Ein bunter, unruhiger oder gemusterter Hintergrund wirkt schnell unprofessionell. PixPassport ersetzt Ihren Hintergrund automatisch durch ein helles Grau.",
  },
  {
    q: "Wie alt darf ein Bewerbungsfoto sein?",
    a: "Experten empfehlen, ein Bewerbungsfoto nicht älter als zwei Jahre zu verwenden, damit es Ihr aktuelles Erscheinungsbild widerspiegelt. Hat sich Ihr Aussehen stark verändert, etwa durch Frisur, Gewicht oder eine neue Brille, sollten Sie unbedingt ein neues Foto machen lassen.",
  },
];

const steps = [
  {
    title: "Foto hochladen",
    desc: "Laden Sie ein vorhandenes Porträt hoch oder nehmen Sie direkt eines mit dem Smartphone auf. Sie benötigen keine professionelle Ausrüstung.",
  },
  {
    title: "Hintergrund und Licht werden optimiert",
    desc: "Die Software ersetzt den Hintergrund durch ein ruhiges Hellgrau, optimiert die Belichtung und schneidet das Bild zu.",
  },
  {
    title: "Herunterladen und verwenden",
    desc: "Sie erhalten Ihr Foto als hochauflösende Datei für Lebenslauf und Online-Bewerbung sowie als A4-Druckvorlage.",
  },
];

const skipPhoto = [
  ["Internationale Unternehmen", "Viele globale Firmen mit Sitz in Deutschland setzen auf anonymisierte Bewerbungsverfahren und wünschen kein Foto."],
  ["Bewerbungen in den USA oder Großbritannien", "Hier gilt ein Foto als unüblich und kann sogar zur Ablehnung führen."],
  ["Portale ohne Foto-Feld", "Erzwingen Sie kein Foto, wenn das Formular keinen Upload vorsieht."],
  ["Ausschreibung ohne Foto", "Respektieren Sie den ausdrücklichen Wunsch des Arbeitgebers."],
];

export default function BewerbungsfotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Bewerbungsfoto" }]}
        eyebrow="Bewerbungsfoto · professionell · online"
        title="Bewerbungsfoto online erstellen"
        intro="Überzeugen Sie beim ersten Eindruck. Laden Sie Ihr Porträt hoch – PixPassport optimiert die Belichtung, ersetzt den Hintergrund durch ein ruhiges Hellgrau und schneidet Ihr Foto zu. In Sekunden, ab 6,99 €."
        primary={{ href: ctaHref, label: "Bewerbungsfoto erstellen" }}
        secondary={{ href: "#tipps", label: "Tipps ansehen" }}
        note="Hintergrund automatisch ersetzt · Datei + A4-Druckvorlage · DSGVO-konform"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
          alt: "Porträtfoto mit neutralem hellem Hintergrund für Lebenslauf und Bewerbung",
          width: 413,
          height: 531,
        }}
      />

      <StatsBand
        items={[
          { value: "17.000+", label: "Zufriedene Nutzer" },
          { value: "4,9 / 5", label: "Nutzerbewertung" },
          { value: "< 60 s", label: "Bearbeitungszeit" },
          { value: "2-in-1", label: "Druck & digital" },
          { value: "6,99 €", label: "Startpreis" },
        ]}
      />

      <Section id="tipps" labelledBy="tips-h2">
        <SectionHeader
          id="tips-h2"
          eyebrow="Experten-Tipps"
          title="Das perfekte Bewerbungsfoto: So gelingt der erste Eindruck"
          intro="Diese Empfehlungen orientieren sich an der Praxis deutscher Personalabteilungen und Karriereberatungen."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {tips.map((t) => (
            <article key={t.title} className={card}>
              <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-slate-900">
                <span aria-hidden="true" className="text-2xl">{t.icon}</span>
                {t.title}
              </h3>
              <CheckList items={t.points} />
            </article>
          ))}
        </div>
      </Section>

      <Section muted width="4xl" labelledBy="compare-h2">
        <SectionHeader
          id="compare-h2"
          eyebrow="Vergleich"
          title="Bewerbungsfoto oder biometrisches Passbild?"
          intro="Beide Fotoarten folgen unterschiedlichen Anforderungen – hier die wichtigsten Unterschiede."
        />
        <DataTable
          caption="Vergleich von Bewerbungsfoto und Passbild"
          head={["Kriterium", "Passbild", "Bewerbungsfoto"]}
          rows={comparisonRows.map((r) => [r.param, r.passbild, r.bewerbung])}
        />
        <p className="mt-4 text-sm text-slate-600">
          Sie brauchen ein Foto für Pass oder Ausweis? Alle Vorgaben finden Sie unter{" "}
          <Link href="/de/biometrisches-passbild" className={textLink}>biometrisches Passbild</Link>.
        </p>
      </Section>

      <Section width="3xl" labelledBy="seo-h2">
        <SectionHeader id="seo-h2" title="Bewerbungsfoto in Deutschland: Was Personaler erwarten" />
        <Prose>
          <p>
            Anders als in englischsprachigen Ländern ist das Bewerbungsfoto in Deutschland nach wie vor in vielen
            Bewerbungsunterlagen zu finden – besonders bei Stellen mit Kundenkontakt oder Führungsverantwortung. Ein gut
            gewähltes Foto vermittelt Seriosität, noch bevor jemand Ihren Lebenslauf liest.
          </p>
          <p>
            Gleichzeitig verändert sich die Erwartungshaltung: Start-ups und internationale Konzerne legen zunehmend Wert
            auf Chancengleichheit und verzichten bewusst auf das Foto im Auswahlprozess. Achten Sie deshalb darauf, welche
            Kultur im jeweiligen Unternehmen herrscht.
          </p>
        </Prose>
        <h3 className="mb-3 mt-8 text-lg font-bold text-slate-900">Das AGG und Bewerbungsfotos</h3>
        <Prose>
          <p>
            Das <strong className="text-slate-900">Allgemeine Gleichbehandlungsgesetz (AGG)</strong> schützt
            Bewerberinnen und Bewerber vor Diskriminierung aufgrund von Geschlecht, Herkunft, Alter oder Religion. Da ein
            Foto solche Merkmale erkennen lässt, verzichten viele Arbeitgeber darauf, es anzufordern. Ein freiwillig
            beigefügtes, professionelles Foto wird in vielen Branchen dennoch weiterhin positiv wahrgenommen.
          </p>
        </Prose>
        <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Wann Sie auf ein Foto verzichten sollten</h3>
        <CheckList
          items={skipPhoto.map(([t, d]) => (
            <>
              <strong className="text-slate-900">{t}:</strong> {d}
            </>
          ))}
        />
        <h3 className="mb-3 mt-8 text-lg font-bold text-slate-900">Digitales Bewerbungsfoto für die E-Mail-Bewerbung</h3>
        <Prose>
          <p>
            Für E-Mail-Bewerbungen und Online-Portale gelten besondere technische Anforderungen. Liefern Sie das Foto als
            separate Datei im Format JPG oder PNG mit maximal 500 kB, oder betten Sie es direkt in den Lebenslauf ein. Zu
            große Dateien blockieren manche E-Mail-Server. PixPassport liefert Ihr Foto als hochauflösende Datei, die Sie
            für beide Zwecke verkleinern können.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="how-h2">
        <SectionHeader id="how-h2" eyebrow="So funktioniert es" title="In drei Schritten zum Bewerbungsfoto" />
        <StepsGrid steps={steps} />
        <div className="mt-10">
          <Link href={ctaHref} className={btnPrimary}>
            Jetzt Bewerbungsfoto erstellen <ArrowRight />
          </Link>
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="FAQ"
          title="Häufige Fragen zum Bewerbungsfoto"
          intro="Alles, was Sie über Bewerbungsfotos in Deutschland wissen müssen."
        />
        <FaqList items={faqItems} />
      </Section>

      <CtaBand
        title="Bereit für Ihre nächste Bewerbung?"
        text="Kein Fotostudio, keine Wartezeit. Ergebnis kostenlos ansehen – druckfertig und digital ab 6,99 €."
        href={ctaHref}
        label="Bewerbungsfoto erstellen"
      />
    </>
  );
}
