import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CheckList, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, Prose, Note, card, textLink, RelatedPages,
} from "../components/ui";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Foto für die Gesundheitskarte (eGK) online erstellen | PixPassport",
  description:
    "Foto für die Gesundheitskarte (eGK) online erstellen: 35 × 45 mm, heller Hintergrund – für TK, AOK, Barmer, DAK und alle Krankenkassen. In 30 Sekunden fertig.",
  keywords: [
    "gesundheitskarte foto",
    "egk foto",
    "krankenkasse foto",
    "aok foto hochladen",
    "foto für krankenkassenkarte selber machen",
    "wie muss das foto für die gesundheitskarte aussehen",
    "selbstgemachte passbilder gesundheitskarte",
    "wie alt darf das foto für die krankenkasse sein",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/gesundheitskarte-foto",
    languages: {
      de: "https://www.pixpassport.com/de/gesundheitskarte-foto",
      "x-default": "https://www.pixpassport.com/de/gesundheitskarte-foto",
    },
  },
  openGraph: {
    title: "Foto für die Gesundheitskarte (eGK) online erstellen | PixPassport",
    description:
      "Foto für die elektronische Gesundheitskarte (eGK) online erstellen – passend für alle gesetzlichen Krankenkassen.",
    url: "https://www.pixpassport.com/de/gesundheitskarte-foto",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foto für die Gesundheitskarte online erstellen",
      },
    ],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-health-insurance";

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto mit dem Smartphone aufnehmen",
    desc: "Stellen Sie sich vor eine helle Wand. Nutzen Sie Tageslicht aus einem Fenster. Halten Sie das Smartphone auf Augenhöhe und schauen Sie frontal in die Kamera.",
  },
  {
    n: "2",
    title: "Automatisch auf 35 × 45 mm zuschneiden",
    desc: "Die Software prüft Kopfposition, Hintergrund und Belichtung. Das Bild wird exakt auf das eGK-Format zugeschnitten und optimiert.",
  },
  {
    n: "3",
    title: "Herunterladen und bei der Kasse einreichen",
    desc: "Laden Sie das fertige JPEG herunter und übermitteln Sie es über das Online-Portal oder die App Ihrer Krankenkasse.",
  },
];

const specs = [
  {
    krit: "Format",
    vorschrift: "35 × 45 mm",
    hinweis: "Hochformat ohne Rand – entspricht dem gängigen Passfoto-Standard (AOK)",
  },
  {
    krit: "Kopfgröße",
    vorschrift: "70–80 % der Bildfläche",
    hinweis: "Kopf mittig, vollständig sichtbar von Scheitel bis Kinn",
  },
  {
    krit: "Blickrichtung",
    vorschrift: "Frontal, gerade",
    hinweis: "Direkt in die Kamera, keine Drehung oder Neigung",
  },
  {
    krit: "Hintergrund",
    vorschrift: "Neutral, hell",
    hinweis: "Kein Muster, keine Schatten, klarer Kontrast zur Kleidung",
  },
  {
    krit: "Augen",
    vorschrift: "Geöffnet, sichtbar",
    hinweis: "Auch bei Brillenträgern müssen die Augen klar erkennbar sein",
  },
  {
    krit: "Dateiformat",
    vorschrift: "JPEG oder PNG",
    hinweis: "JPEG wird von allen Kassen akzeptiert; Dateigrößen-Limit je nach Kasse (z. B. 5 MB bei VIACTIV)",
  },
  {
    krit: "Kopfbedeckung",
    vorschrift: "Grundsätzlich verboten",
    hinweis: "Ausnahme: religiöse Gründe – Gesicht muss vollständig sichtbar bleiben",
  },
  {
    krit: "Alter des Fotos",
    vorschrift: "Max. 6 Monate",
    hinweis: "Wichtig: Sie müssen gut wiedererkennbar sein (AOK)",
  },
];

const kassen = [
  { name: "AOK", portal: "Meine AOK", pfad: "Gesundheitskarte → Foto hochladen" },
  { name: "Techniker Krankenkasse (TK)", portal: "Meine TK", pfad: "Versichertenkarte → Foto hinzufügen" },
  { name: "Barmer", portal: "lichtbild.barmer.de", pfad: "Auftragsnummer + Geburtsdatum eingeben → Foto hochladen" },
  { name: "DAK-Gesundheit", portal: "Mein DAK", pfad: "eGK → Bild hochladen" },
  { name: "IKK / BKK / KKH / hkk", portal: "Jeweiliges Online-Portal", pfad: "Versichertenbereich → Gesundheitskarte" },
  { name: "Alle anderen GKV", portal: "Versichertenportal", pfad: "Benachrichtigungsschreiben beachten" },
];

const doList = [
  "Frontale Aufnahme, Kopf gerade und mittig positionieren",
  "Neutraler Gesichtsausdruck mit geschlossenem Mund",
  "Heller, einfarbiger Hintergrund ohne Muster oder Objekte",
  "Augen geöffnet und für den Betrachter klar erkennbar",
  "Gleichmäßige Beleuchtung ohne harte Schatten oder Gegenlicht",
  "Aktuelles Foto, das Ihr heutiges Erscheinungsbild zeigt",
];

const dontList = [
  "Sonnenbrillen oder stark getönte Brillengläser tragen",
  "Mützen, Caps oder Hüte aufsetzen (außer religiöse Kopfbedeckungen)",
  "Starke Schatten im Gesicht oder auf dem Hintergrund erzeugen",
  "Filter, Weichzeichner oder Bildbearbeitungseffekte anwenden",
  "Gemusterte Hintergründe oder andere Personen im Bild zeigen",
  "Veraltete Aufnahmen verwenden, die Ihr Aussehen nicht mehr widerspiegeln",
];

const faqs = [
  {
    q: "Wie muss das Foto für die Gesundheitskarte aussehen?",
    a: "Das Foto für die elektronische Gesundheitskarte entspricht dem gängigen Passbild-Format: 35 × 45 mm, Frontalaufnahme, Kopf füllt 70 bis 80 Prozent der Bildfläche. Der Hintergrund ist neutral und hell. Sie schauen direkt in die Kamera, Ihre Augen sind geöffnet und klar erkennbar. Streng biometrische Vorgaben wie beim Reisepass sind nicht erforderlich.",
  },
  {
    q: "Kann man ein Foto für die Krankenkassenkarte selber machen?",
    a: "Ja, Sie können das Foto selbst erstellen. Ein Smartphone oder eine Digitalkamera reicht vollkommen aus. Nehmen Sie das Bild bei Tageslicht vor einer hellen Wand auf. Halten Sie die Kamera auf Augenhöhe und schauen Sie frontal hinein. Mit einem Online-Tool schneiden Sie das Bild anschließend automatisch auf das korrekte Format zu.",
  },
  {
    q: "Werden selbstgemachte Passbilder von der Krankenkasse angenommen?",
    a: "Ja, selbstgemachte Passbilder werden angenommen, sofern sie die offiziellen Vorgaben erfüllen. AOK, TK, Barmer, DAK und alle anderen gesetzlichen Kassen akzeptieren selbst aufgenommene Fotos, wenn diese scharf, gut belichtet und frei von Filtern oder Effekten sind. Entscheidend ist die Einhaltung der Qualitätskriterien, nicht der Ort der Aufnahme.",
  },
  {
    q: "Wie alt darf das Foto für die Krankenkasse sein?",
    a: "Das Foto sollte idealerweise nicht älter als sechs Monate sein. Wichtig ist, dass Sie gut wiederzuerkennen sind. Die Krankenkassen dürfen das Lichtbild maximal zehn Jahre speichern. Danach erhalten Sie automatisch Post mit der Aufforderung, ein neues Bild einzureichen.",
  },
  {
    q: "Ist das Foto für die Gesundheitskarte Pflicht?",
    a: "Ja. Laut § 291 SGB V ist die elektronische Gesundheitskarte mit einem Lichtbild auszustatten. Das Foto dient der Identifizierung beim Arztbesuch und verhindert Kartenmissbrauch. Ab dem 15. Geburtstag ist ein Foto verpflichtend. Kinder unter 15 Jahren sowie pflegebedürftige Personen, die nicht an einer Aufnahme teilnehmen können, benötigen kein Bild.",
  },
  {
    q: "Wie reiche ich das Foto bei meiner Krankenkasse ein?",
    a: "Die meisten gesetzlichen Krankenkassen bieten einen digitalen Upload im Online-Portal oder per App an. Sie erhalten von Ihrer Kasse ein Schreiben mit einer Auftragsnummer, sobald ein neues Foto benötigt wird. Alternativ können Sie das Bild auch per Post einsenden. Papierabzüge werden nach der Digitalisierung datenschutzkonform vernichtet.",
  },
  {
    q: "Welches Dateiformat akzeptieren die Krankenkassen?",
    a: "Die meisten Kassen akzeptieren JPEG- und PNG-Dateien. VIACTIV gibt eine maximale Dateigröße von 5 MB vor. PixPassport liefert das fertige Foto in einem universell kompatiblen JPEG-Format – direkt bereit für den Upload in alle gängigen GKV-Portale.",
  },
  {
    q: "Kostet die neue Gesundheitskarte etwas?",
    a: "Nein, die Herstellung der Karte ist für Versicherte kostenlos. Die Kosten für die Fotoaufnahme selbst tragen Sie als Versicherter. PixPassport bietet eine günstige digitale Alternative zum Fotostudio, bei der Sie das Bild bequem von zu Hause aus erstellen.",
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://www.pixpassport.com/de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Foto für die Gesundheitskarte",
          item: "https://www.pixpassport.com/de/gesundheitskarte-foto",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Foto für die Gesundheitskarte (eGK) online erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: "DE",
      serviceType: "Foto für die elektronische Gesundheitskarte",
    },
  ],
};

const benefits = [
  "Automatischer Zuschnitt auf 35 × 45 mm",
  "Hintergrund wird durch helles Grau ersetzt",
  "Automatische Belichtungs- und Kontrastanpassung",
  "Sofort-Download als JPEG – direkt für den Upload",
  "Passend für alle GKV-Portale (AOK, TK, Barmer, DAK …)",
  "Für alle Versicherten ab 15 Jahren",
  "DSGVO-konform – automatische Löschung nach 24 Stunden",
  "Schneller und günstiger als das Fotostudio",
];

/* ─── Page ─── */
export default function GesundheitskarteFotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Foto für die Gesundheitskarte" }]}
        eyebrow="Für TK · AOK · Barmer · DAK · alle GKV"
        title="Foto für die Gesundheitskarte online erstellen"
        intro="Erstellen Sie Ihr Foto für die elektronische Gesundheitskarte (eGK) direkt am Smartphone. Automatische Anpassung auf 35 × 45 mm, neutraler Hintergrund und korrekte Kopfposition – in unter 30 Sekunden, ohne Fotostudio."
        primary={{ href: ctaHref, label: "Foto für die eGK erstellen" }}
        secondary={{ href: "#anforderungen", label: "Alle Anforderungen" }}
        note="Ab 6,99 € · Ergebnis vorher kostenlos ansehen"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1781618724/45877257-77dc-4b1a-9eb3-b51dee831a36_preview_gdlorb.jpg",
          alt: "Foto für die elektronische Gesundheitskarte im Format 35 × 45 mm mit Maßlinien",
          width: 843,
          height: 671,
        }}
      />

      <Section width="3xl" id="anforderungen" labelledBy="look-h2">
        <SectionHeader id="look-h2" eyebrow="Offizielle Vorgaben" title="Wie muss das Foto für die Gesundheitskarte aussehen?" />
        <Prose>
          <p>
            Das Foto für die <strong className="text-slate-900">elektronische Gesundheitskarte (eGK)</strong> folgt dem
            gängigen Passbild-Standard. Die Krankenkasse benötigt ein Frontalbild im Format{" "}
            <strong className="text-slate-900">35 × 45 mm</strong>. Ihr Kopf füllt 70 bis 80 Prozent der Bildfläche aus.
            Sie schauen direkt in die Kamera, der Kopf sitzt mittig und ist nicht geneigt.
          </p>
          <p>
            Der Hintergrund bleibt neutral und hell. Ein weißer oder hellgrauer Hintergrund ohne Muster, Schatten oder
            störende Elemente ist ideal. Ihre Augen sind geöffnet und klar erkennbar – auch als Brillenträger. Streng
            biometrische Vorgaben wie beim Reisepass verlangt die Krankenkasse nicht.
          </p>
          <p>
            Kopfbedeckungen sind grundsätzlich untersagt. Ausnahmen gelten aus religiösen Gründen, sofern das Gesicht
            vollständig sichtbar bleibt. Die Kassen akzeptieren digitale Uploads meist als JPEG oder PNG. Die Kosten für die
            Bildaufnahme tragen Sie selbst – die Herstellung der Karte ist kostenlos.
          </p>
        </Prose>
      </Section>

      <Section muted width="3xl" labelledBy="self-h2">
        <SectionHeader id="self-h2" eyebrow="Ohne Fotostudio" title="Kann man das Foto für die Krankenkassenkarte selber machen?" />
        <Prose>
          <p>
            Ja. Ein Smartphone oder eine Digitalkamera reicht vollkommen aus. Stellen Sie sich vor eine helle Wand oder
            hängen Sie ein einfarbiges Tuch auf. Tageslicht aus einem Fenster sorgt für eine gleichmäßige Ausleuchtung ohne
            harte Schatten. Halten Sie die Kamera auf Augenhöhe und schauen Sie frontal hinein.
          </p>
          <p>
            Selbstgemachte Passbilder werden von den Krankenkassen angenommen, sofern sie die Vorgaben erfüllen.
            Entscheidend ist nicht, wer das Foto aufnimmt, sondern ob es scharf, gut belichtet und frei von Filtern ist.
            PixPassport prüft das Bild bereits vor dem Download auf Format, Hintergrund und Kopfgröße.
          </p>
        </Prose>
      </Section>

      <Section width="3xl" labelledBy="age-h2">
        <SectionHeader id="age-h2" eyebrow="Gültigkeit & Aktualisierung" title="Wie alt darf das Foto für die Krankenkasse sein?" />
        <Prose>
          <p>
            Das Foto sollte idealerweise <strong className="text-slate-900">nicht älter als sechs Monate</strong> sein.
            Wichtig ist, dass Sie auf dem Bild gut wiederzuerkennen sind – die Krankenkasse nutzt das Lichtbild zur
            Identifizierung bei Arztbesuchen.
          </p>
          <p>
            Die gesetzlichen Krankenkassen dürfen Ihr Lichtbild maximal zehn Jahre speichern. Danach oder bei deutlichen
            Änderungen Ihres Aussehens erhalten Sie Post mit der Aufforderung, ein aktuelles Foto einzureichen. Kinder unter
            15 Jahren benötigen kein Foto auf der eGK; ab dem 15. Geburtstag ist es Pflicht.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="So einfach geht's"
          title="Foto für die Gesundheitskarte in drei Schritten"
          intro="Vom Smartphone-Foto zum hochladbaren Bild für Ihre Krankenkasse – ohne Termin."
        />
        <StepsGrid steps={steps} />
      </Section>

      <Section width="4xl" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Vorgaben der Krankenkassen"
          title="Foto-Anforderungen für die eGK"
          intro="Die Anforderungen basieren auf den Vorgaben der gesetzlichen Krankenkassen sowie § 291 SGB V."
        />
        <DataTable
          caption="Foto-Anforderungen für die elektronische Gesundheitskarte"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={specs.map((s) => [s.krit, <Badge key={s.krit}>{s.vorschrift}</Badge>, s.hinweis])}
        />
      </Section>

      <Section muted width="4xl" labelledBy="kassen-h2">
        <SectionHeader
          id="kassen-h2"
          eyebrow="Foto einreichen"
          title="Foto hochladen: So geht's bei Ihrer Krankenkasse"
          intro="Nach dem Download übermitteln Sie das Foto im Online-Portal Ihrer Kasse. Sie benötigen in der Regel Ihre Versichertennummer und die Auftragsnummer aus dem Benachrichtigungsschreiben."
        />
        <DataTable
          caption="Foto-Upload bei den Krankenkassen"
          head={["Krankenkasse", "Portal / App", "So finden Sie den Upload*"]}
          rows={kassen.map((k) => [k.name, k.portal, k.pfad])}
        />
        <Note>
          * Die Menüpfade können sich ändern – maßgeblich ist das Schreiben Ihrer Kasse. Alternativ ist bei allen Kassen
          der Postweg möglich. Die Karte selbst ist für Versicherte kostenlos.
        </Note>
        <p className="mt-4 text-base text-slate-600">
          Bei der Barmer?{" "}
          <Link href="/de/barmer-lichtbild-hochladen" className={textLink}>
            So laden Sie Ihr Lichtbild bei der Barmer hoch
          </Link>{" "}
          – mit Auftragsnummer, Vorgaben und Dateiformat.
        </p>
      </Section>

      <Section labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="Checkliste für Ihr Foto zur Gesundheitskarte" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section muted labelledBy="benefits-h2">
        <SectionHeader
          id="benefits-h2"
          eyebrow="Warum PixPassport"
          title="Foto für die Gesundheitskarte – ohne Aufwand"
          intro="Viele Versicherte werden vom Schreiben ihrer Krankenkasse überrascht. PixPassport erstellt das passende Foto sofort und vollautomatisch."
        />
        <div className={card}>
          <div className="grid gap-x-8 sm:grid-cols-2">
            <CheckList items={benefits.slice(0, 4)} />
            <div className="mt-3 sm:mt-0">
              <CheckList items={benefits.slice(4)} />
            </div>
          </div>
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="Häufige Fragen zum Foto für die Gesundheitskarte"
          intro="Antworten auf Basis der Angaben von AOK, Barmer, VIACTIV und § 291 SGB V."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages keys={["biometrisch", "selber", "fuehrerschein", "app", "ratgeber"]} />

      <CtaBand
        title="Ihr eGK-Foto in 30 Sekunden"
        text="Foto hochladen, Ergebnis kostenlos ansehen und direkt bei Ihrer Krankenkasse einreichen."
        href={ctaHref}
        label="eGK-Foto erstellen"
      />
    </>
  );
}
