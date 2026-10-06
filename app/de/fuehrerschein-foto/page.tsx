import type { Metadata } from "next";
import {
  Hero, Section, SectionHeader, StepsGrid, CheckList, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, Prose, Note, card,
} from "../components/ui";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Führerscheinfoto online erstellen – für den Umtausch | PixPassport",
  description:
    "Führerscheinfoto online erstellen: biometrisch, 35 × 45 mm, für Erstantrag und Pflichtumtausch – mit allen Umtauschfristen bis 2033. In 30 Sekunden fertig.",
  keywords: [
    "führerschein foto",
    "passbild führerschein",
    "eu führerschein foto",
    "führerscheinumtausch foto",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/fuehrerschein-foto",
    languages: {
      de: "https://www.pixpassport.com/de/fuehrerschein-foto",
      "x-default": "https://www.pixpassport.com/de/fuehrerschein-foto",
    },
  },
  openGraph: {
    title: "Führerscheinfoto online erstellen | PixPassport",
    description:
      "Biometrisches Führerscheinfoto (35 × 45 mm) für Erstantrag und Umtausch – automatisch geprüft, in 30 Sekunden fertig.",
    url: "https://www.pixpassport.com/de/fuehrerschein-foto",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Führerscheinfoto online erstellen",
      },
    ],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-driving-license";

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Ein Smartphone genügt vollständig – kein Fotostudio nötig.",
  },
  {
    n: "2",
    title: "Automatische KI-Prüfung",
    desc: "Die Software prüft Maße, Kopfposition, Belichtung und Hintergrund nach den biometrischen Vorgaben und korrigiert Abweichungen automatisch.",
  },
  {
    n: "3",
    title: "Herunterladen und drucken",
    desc: "Sie erhalten die Datei sofort und dazu eine A4-Druckvorlage – zum Ausdrucken zu Hause oder im Fotoservice von dm und Rossmann.",
  },
];

const specs = [
  { krit: "Format", vorschrift: "35 × 45 mm", hinweis: "Hochformat, exakt – nicht größer, nicht kleiner" },
  { krit: "Gesichtshöhe", vorschrift: "32–36 mm", hinweis: "Kinn bis Scheitel, ca. 70–80 % der Bildhöhe" },
  { krit: "Hintergrund", vorschrift: "Einfarbig hell", hinweis: "Idealerweise hellgrau, ohne Muster, klarer Kontrast zum Gesicht" },
  { krit: "Bildqualität", vorschrift: "Scharf, kontrastreich", hinweis: "Fotopapier in hoher Auflösung, keine Pixel oder Knicke" },
  { krit: "Gesichtsausdruck", vorschrift: "Neutral, Mund geschlossen", hinweis: "Kein Lächeln, keine sichtbaren Zähne" },
  { krit: "Augen", vorschrift: "Geöffnet, gut erkennbar", hinweis: "Brille erlaubt, aber ohne Spiegelungen und getönte Gläser" },
  { krit: "Kopfbedeckung", vorschrift: "Grundsätzlich verboten", hinweis: "Ausnahme: religiöse Kopfbedeckung, Gesicht vollständig sichtbar" },
  { krit: "Aktualität", vorschrift: "Aktuell", hinweis: "Zeigt Ihr heutiges Erscheinungsbild (Richtwert: max. 6 Monate)" },
];

// Stufenplan nach Anlage 8e FeV
const umtauschFristen = [
  { gruppe: "Papierführerschein, Geburtsjahr 1953–1958", frist: "19. Januar 2022", status: "done" },
  { gruppe: "Papierführerschein, Geburtsjahr 1959–1964", frist: "19. Januar 2023", status: "done" },
  { gruppe: "Papierführerschein, Geburtsjahr 1965–1970", frist: "19. Januar 2024", status: "done" },
  { gruppe: "Papierführerschein, Geburtsjahr 1971 oder später", frist: "19. Januar 2025", status: "done" },
  { gruppe: "Kartenführerschein, ausgestellt 1999–2001", frist: "19. Januar 2026", status: "done" },
  { gruppe: "Kartenführerschein, ausgestellt 2002–2004", frist: "19. Januar 2027", status: "active" },
  { gruppe: "Kartenführerschein, ausgestellt 2005–2007", frist: "19. Januar 2028", status: "future" },
  { gruppe: "Kartenführerschein, ausgestellt 2008", frist: "19. Januar 2029", status: "future" },
  { gruppe: "Kartenführerschein, ausgestellt 2009 bis 18.01.2013", frist: "jährlich gestaffelt bis 19. Januar 2033", status: "future" },
  { gruppe: "Papierführerschein, Geburtsjahr vor 1953", frist: "19. Januar 2033", status: "future" },
];

const statusLabel: Record<string, string> = {
  done: "abgelaufen",
  active: "nächste Frist",
  future: "",
};

const doList = [
  "Neutrale Mimik – entspannt, Mund geschlossen",
  "Gleichmäßige Frontalansicht, Kopf gerade",
  "Heller, einfarbiger Hintergrund (idealerweise Hellgrau)",
  "Gleichmäßige Beleuchtung ohne Schatten im Gesicht",
  "Scharfes, unverwackeltes Foto mit ausreichend Auflösung",
  "Aktuelles Foto, das Ihr heutiges Aussehen zeigt",
];

const dontList = [
  "Sonnenbrillen oder getönte Gläser",
  "Kopfbedeckungen (außer aus religiösen Gründen)",
  "Starke Schatten, Überbelichtung oder Blendreflexe",
  "Filter, Weichzeichner oder Bildbearbeitungseffekte",
  "Gemusterter Hintergrund oder Personen/Objekte im Bild",
  "Lächeln oder geöffneter Mund",
];

const vergleich = [
  { kriterium: "Format", fuehrerschein: "35 × 45 mm", reisepass: "35 × 45 mm" },
  { kriterium: "Gesichtshöhe", fuehrerschein: "32–36 mm", reisepass: "32–36 mm" },
  { kriterium: "Brille", fuehrerschein: "Erlaubt, ohne Spiegelungen", reisepass: "Erlaubt, ohne Spiegelungen" },
  { kriterium: "Einreichung", fuehrerschein: "Papierfoto oder Upload möglich", reisepass: "Nur digital (seit Mai 2025)" },
  { kriterium: "Rechtsgrundlage", fuehrerschein: "§ 21 FeV i. V. m. Passverordnung", reisepass: "Passverordnung (PassV)" },
];

const kosten = [
  { label: "Foto bei PixPassport", value: "ab 6,99 €" },
  { label: "Foto beim Fotografen", value: "8–15 €" },
  { label: "Umtauschgebühr (GebOSt)", value: "25,30 €" },
  { label: "Direktversand (optional)", value: "5,10 €" },
];

const faqs = [
  {
    q: "Welche Maße muss ein Führerscheinfoto haben?",
    a: "Ein Führerscheinfoto muss in Deutschland 35 × 45 mm groß sein und im Hochformat vorliegen. Die Gesichtshöhe vom Kinn bis zum Scheitel liegt bei 32 bis 36 mm, also etwa 70 bis 80 Prozent der Bildhöhe. Nach § 21 der Fahrerlaubnis-Verordnung (FeV) muss das Lichtbild den Anforderungen der Passverordnung entsprechen – es gelten also dieselben biometrischen Vorgaben wie beim Reisepass.",
  },
  {
    q: "Darf ich auf dem Führerscheinfoto eine Brille tragen?",
    a: "Ja. Eine Brille ist – wie beim Reisepass – erlaubt, sofern die Augen klar und ohne Spiegelungen erkennbar sind und der Rahmen die Augen nicht verdeckt. Sonnenbrillen und getönte Gläser sind nicht zulässig.",
  },
  {
    q: "Brauche ich für den Führerscheinumtausch ein neues Foto?",
    a: "Ja, für den Umtausch des alten Papier- oder Scheckkartenführerscheins in den neuen EU-Kartenführerschein benötigen Sie ein aktuelles biometrisches Passfoto. Zusätzlich verlangt die Behörde üblicherweise den Personalausweis oder Reisepass sowie den bisherigen Führerschein im Original.",
  },
  {
    q: "Bis wann muss ich meinen Führerschein umtauschen?",
    a: "Der Stichtag hängt bei Papierführerscheinen vom Geburtsjahr und bei Kartenführerscheinen vom Ausstellungsjahr ab. Die nächste Frist betrifft Kartenführerscheine aus den Jahren 2002 bis 2004 und läuft am 19. Januar 2027 ab. Alle vor dem 19. Januar 2013 ausgestellten Führerscheine müssen spätestens bis zum 19. Januar 2033 umgetauscht sein.",
  },
  {
    q: "Was kostet der Führerscheinumtausch?",
    a: "Die amtliche Gebühr für den Umtausch beträgt nach der Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt) 25,30 Euro. Wer den neuen Führerschein direkt per Post erhalten möchte, zahlt in der Regel zusätzlich 5,10 Euro. Hinzu kommen die Kosten für das biometrische Foto – bei PixPassport ab 6,99 €.",
  },
  {
    q: "Kann ich das Foto selbst machen oder muss ich zum Fotografen?",
    a: "Ein selbst aufgenommenes Foto ist grundsätzlich zulässig, solange es alle amtlichen Vorgaben erfüllt. Führerscheinstellen lehnen Fotos häufig wegen falscher Maße, eines ungeeigneten Hintergrunds oder unzureichender Bildschärfe ab. PixPassport prüft und optimiert Ihr Foto automatisch nach diesen Kriterien – und erstattet den Kaufpreis, falls es trotzdem abgelehnt wird.",
  },
  {
    q: "Worin unterscheidet sich das Führerscheinfoto vom Passbild für den Reisepass?",
    a: "Bei den Fotovorgaben gibt es keinen Unterschied: Beide Fotos messen 35 × 45 mm und folgen den biometrischen Regeln der Passverordnung. Der wichtigste Unterschied ist die Einreichung: Für Reisepass und Personalausweis verlangen die Behörden seit Mai 2025 ein digital übermitteltes Foto, für den Führerschein können Sie weiterhin ein ausgedrucktes Foto mitbringen oder es – je nach Behörde – online hochladen.",
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
          name: "Führerscheinfoto",
          item: "https://www.pixpassport.com/de/fuehrerschein-foto",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Führerscheinfoto online erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: "DE",
      serviceType: "Führerscheinfoto",
    },
  ],
};

const benefits = [
  "Automatischer Zuschnitt auf exakt 35 × 45 mm",
  "Hintergrund wird automatisch durch Hellgrau ersetzt",
  "Belichtungs- und Kontrastkorrektur inklusive",
  "Prüfung nach den biometrischen Vorgaben der Passverordnung",
  "Sofort-Download als Datei und A4-Druckvorlage",
  "Geeignet für Erstantrag und Umtausch",
  "Ergebnis kostenlos ansehen, erst dann bezahlen",
  "DSGVO-konform – automatische Löschung nach 24 Stunden",
];

const fristTone = { done: "slate", active: "amber", future: "lime" } as const;

/* ─── Page ─── */
export default function FuehrerscheinFotoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Führerscheinfoto" }]}
        eyebrow="EU-Kartenführerschein · Biometrisch · 35 × 45 mm"
        title="Führerscheinfoto online erstellen"
        intro="Erstellen Sie Ihr biometrisches Passbild (35 × 45 mm) für den EU-Kartenführerschein – für den Erstantrag oder den Pflichtumtausch bis 2033. Unsere Software prüft jedes Detail nach den amtlichen Vorgaben – fertig in unter 30 Sekunden, ohne Fotostudio."
        primary={{ href: ctaHref, label: "Führerscheinfoto erstellen" }}
        secondary={{ href: "#anforderungen", label: "Alle Anforderungen" }}
        note="Ab 6,99 € · Geld zurück bei Ablehnung"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_webp/q_auto/45_35_passport_photo_ogdxnu.jpg",
          alt: "Führerscheinfoto im Format 35 × 45 mm mit vorgeschriebenem Kopfanteil von 70–80 %",
          width: 1536,
          height: 1024,
        }}
      />

      <Section width="3xl" labelledBy="why-now-h2">
        <SectionHeader id="why-now-h2" title="Führerscheinumtausch: Warum Sie jetzt ein neues Foto brauchen" />
        <Prose>
          <p>
            Alle vor dem 19. Januar 2013 ausgestellten Führerscheine müssen schrittweise in den neuen{" "}
            <strong className="text-slate-900">EU-Kartenführerschein</strong> im Scheckkartenformat umgetauscht werden.
            Grundlage dafür bildet die EU-Richtlinie 2006/126/EG, die der Gesetzgeber über die Fahrerlaubnis-Verordnung
            (FeV) in deutsches Recht umgesetzt hat.
          </p>
          <p>
            Die Fristen für alle Papierführerscheine und für Kartenführerscheine aus den Jahren 1999 bis 2001 sind bereits
            abgelaufen. Als Nächstes sind Kartenführerscheine aus den Jahren 2002 bis 2004 an der Reihe – Stichtag ist der{" "}
            <strong className="text-slate-900">19. Januar 2027</strong>.
          </p>
          <p>
            Wichtig zu wissen: Der Umtausch betrifft ausschließlich das Dokument. Ihre Fahrerlaubnis bleibt vollständig
            gültig. Wer die Frist verpasst, riskiert bei einer Kontrolle jedoch ein Verwarngeld von 10 Euro.
          </p>
          <p>
            Für jeden Umtausch und jeden Erstantrag verlangt die Führerscheinstelle ein{" "}
            <strong className="text-slate-900">aktuelles biometrisches Passfoto</strong>. PixPassport erstellt dieses Foto
            in unter 30 Sekunden – ohne Termin beim Fotografen.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="So funktioniert es"
          title="Führerscheinfoto in drei Schritten"
          intro="Kein Termin, kein Fotostudio. Alles online, direkt auf dem Smartphone."
        />
        <StepsGrid steps={steps} />
      </Section>

      <Section width="4xl" id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Offizielle Vorgaben"
          title="Anforderungen an das Führerscheinfoto"
          intro="Nach § 21 der Fahrerlaubnis-Verordnung (FeV) muss das Lichtbild den Anforderungen der Passverordnung entsprechen. PixPassport prüft jeden dieser Punkte automatisch."
        />
        <DataTable
          caption="Anforderungen an das Führerscheinfoto"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={specs.map((s) => [s.krit, <Badge key={s.krit}>{s.vorschrift}</Badge>, s.hinweis])}
        />
      </Section>

      <Section muted width="4xl" labelledBy="compare-h2">
        <SectionHeader
          id="compare-h2"
          eyebrow="Direktvergleich"
          title="Führerscheinfoto und Passbild im Vergleich"
          intro="Bei den Fotovorgaben sind beide Dokumente gleich – der Unterschied liegt im Weg zur Behörde."
        />
        <DataTable
          caption="Vergleich Führerscheinfoto und Passbild"
          head={["Kriterium", "Führerschein", "Reisepass"]}
          rows={vergleich.map((v) => [v.kriterium, v.fuehrerschein, v.reisepass])}
        />
      </Section>

      <Section width="4xl" labelledBy="fristen-h2">
        <SectionHeader
          id="fristen-h2"
          eyebrow="Stufenplan nach FeV"
          title="Führerscheinumtausch: Fristen auf einen Blick"
          intro="Nur das Dokument läuft ab – die Fahrerlaubnis selbst bleibt weiterhin gültig."
        />
        <DataTable
          caption="Fristen für den Führerscheinumtausch"
          head={["Betroffene Führerscheine", "Umtausch bis"]}
          rows={umtauschFristen.map((f) => [
            f.gruppe,
            <span key="f" className="whitespace-nowrap">
              <Badge tone={fristTone[f.status as keyof typeof fristTone]}>{f.frist}</Badge>
              {statusLabel[f.status] && <span className="ml-2 text-xs text-slate-500">({statusLabel[f.status]})</span>}
            </span>,
          ])}
        />
        <Note>
          Quelle: Fahrerlaubnis-Verordnung (FeV), Anlage 8e – Stand Oktober 2026. Die Fahrerlaubnis (das Recht zu fahren)
          bleibt unberührt; nur das Dokument muss erneuert werden.
        </Note>
      </Section>

      <Section muted labelledBy="kosten-h2">
        <SectionHeader
          id="kosten-h2"
          eyebrow="Transparente Kosten"
          title="Was kosten Foto und Umtausch insgesamt?"
          intro="Ein Überblick über alle Posten, mit denen Sie beim Führerscheinumtausch rechnen sollten."
        />
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kosten.map((k) => (
            <div key={k.label} className={`${card} flex flex-col-reverse gap-2`}>
              <dt className="text-sm leading-snug text-slate-600">{k.label}</dt>
              <dd className="text-2xl font-black text-slate-900">{k.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="Checkliste für Ihr Führerscheinfoto" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section muted labelledBy="benefits-h2">
        <SectionHeader
          id="benefits-h2"
          eyebrow="Warum PixPassport"
          title="Führerscheinfoto ohne Fotostudio"
          intro="Ein Termin beim Fotografen kostet Zeit und meist mehr Geld als nötig. PixPassport liefert das Foto vollautomatisch und in Sekunden – direkt vom Smartphone aus."
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
          title="Häufige Fragen zum Führerscheinfoto"
          intro="Antworten zu Maßen, Anforderungen und Umtauschfristen – auf Basis der Fahrerlaubnis-Verordnung (FeV) und der Gebührenordnung (GebOSt)."
        />
        <FaqList items={faqs} />
      </Section>

      <CtaBand
        title="Führerscheinfoto jetzt online erstellen"
        text="Foto hochladen und in Sekunden ein biometrisches Führerscheinfoto (35 × 45 mm) für Umtausch oder Erstantrag erhalten."
        href={ctaHref}
        label="Jetzt Foto hochladen"
      />
    </>
  );
}
