import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, Prose, Note, QuickFacts, textLink, RelatedPages,
} from "../components/ui";

const PAGE_URL = "https://www.pixpassport.com/de/barmer-lichtbild-hochladen";
const ctaHref = "/de/passbild-online?type=germany-health-insurance";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Barmer Lichtbild hochladen: Anleitung, Vorgaben & Dateiformat (2026)",
  description:
    "Barmer Foto für die Gesundheitskarte hochladen: Auftragsnummer, Vorgaben (Gesicht 70–80 %, kein Passbild nötig), Schritt-für-Schritt mit dem Handy und passendes Dateiformat.",
  keywords: [
    "barmer lichtbild hochladen",
    "barmer foto hochladen",
    "barmer foto gesundheitskarte",
    "barmer lichtbild upload",
    "lichtbild.barmer.de",
    "barmer gesundheitskarte foto hochladen",
    "barmer auftragsnummer lichtbild",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      de: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Barmer Lichtbild hochladen: Anleitung & Vorgaben | PixPassport",
    description: "So laden Sie Ihr Foto für die Barmer-Gesundheitskarte hoch – mit dem Handy, in wenigen Minuten.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "de_DE",
    type: "article",
    images: [
      { url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Barmer Lichtbild hochladen" },
    ],
  },
};

/* ─── Data ─── */
const quickFacts = [
  { label: "Upload-Portal", value: "lichtbild.barmer.de" },
  { label: "Sie brauchen", value: "Auftragsnummer + Geburtsdatum" },
  { label: "Login bei Meine Barmer", value: "Nicht nötig" },
  { label: "Gesichtshöhe", value: "70–80 % des Fotos" },
  { label: "Biometrisches Passbild", value: "Nicht erforderlich" },
  { label: "Neue Karte", value: "Ca. 2 Wochen nach Prüfung" },
];

const requirements = [
  { krit: "Person", vorgabe: "Nur Sie", hinweis: "Das Foto zeigt das Gesicht der versicherten Person – keine weiteren Personen oder Gegenstände" },
  { krit: "Gesichtshöhe", vorgabe: "70–80 %", hinweis: "Das Gesicht nimmt 70 bis 80 % der Bildhöhe ein" },
  { krit: "Blickrichtung", vorgabe: "Frontal", hinweis: "Von vorne fotografiert, Gesicht gut erkennbar" },
  { krit: "Licht", vorgabe: "Gleichmäßig", hinweis: "Gesicht gleichmäßig und gut ausgeleuchtet, keine harten Schatten" },
  { krit: "Augen", vorgabe: "Klar erkennbar", hinweis: "Keine verdunkelten Brillen, keine Schirmmützen" },
  { krit: "Hintergrund", vorgabe: "Ruhig", hinweis: "Keine störenden Konturen – eine helle, einfarbige Wand ist ideal" },
  { krit: "Kopfbedeckung", vorgabe: "Nicht erlaubt", hinweis: "Ausnahme: Religionsgemeinschaft oder geistlicher Orden" },
  { krit: "Fotoart", vorgabe: "Handyfoto ok", hinweis: "Laut Barmer muss es kein Passbild und kein biometrisches Bild sein" },
];

const phoneSteps = [
  {
    title: "Schreiben der Barmer bereitlegen",
    desc: "Im Schreiben bzw. auf dem Kartenantrag finden Sie die Auftragsnummer. Zusammen mit Ihrem Geburtsdatum ist sie Ihr Zugang zum Upload – ein Login bei Meine Barmer brauchen Sie nicht.",
  },
  {
    title: "Ort mit gutem Licht wählen",
    desc: "Stellen Sie sich mit dem Gesicht zu einem Fenster, etwa einen Schritt vor eine helle, einfarbige Wand. So vermeiden Sie Schatten auf dem Gesicht und hinter dem Kopf.",
  },
  {
    title: "Foto aufnehmen lassen",
    desc: "Bitten Sie jemanden, Sie aus etwa einem Meter auf Augenhöhe zu fotografieren. Blicken Sie gerade in die Kamera, Mund geschlossen. Selfies mit ausgestrecktem Arm verzerren das Gesicht.",
  },
  {
    title: "Zuschneiden und prüfen",
    desc: "Schneiden Sie das Bild so zu, dass Ihr Gesicht 70–80 % der Höhe füllt. Mit PixPassport passiert das automatisch: Zuschnitt im Hochformat 35 × 45 mm, ruhiger heller Hintergrund, JPEG-Datei.",
  },
  {
    title: "Auf lichtbild.barmer.de hochladen",
    desc: "Öffnen Sie lichtbild.barmer.de im Browser des Handys, geben Sie Auftragsnummer und Geburtsdatum (TT.MM.JJJJ) ein, bestätigen Sie die Bildhinweise und wählen Sie das Foto aus der Galerie.",
  },
  {
    title: "Neue Karte abwarten",
    desc: "Nach der Prüfung Ihrer Daten erhalten Sie die neue Gesundheitskarte laut Barmer nach ungefähr zwei Wochen per Post. Eine neue Karte müssen Sie nicht separat bestellen.",
  },
];

const fileSpecs = [
  { krit: "Dateiformat", empfehlung: "JPEG (.jpg)", hinweis: "Wird von allen Krankenkassen-Portalen akzeptiert. HEIC-Fotos vom iPhone vorher in JPEG umwandeln" },
  { krit: "Dateigröße", empfehlung: "Unter 5 MB", hinweis: "Barmer nennt kein Limit; 5 MB ist bei anderen Kassen (z. B. AOK Baden-Württemberg) üblich" },
  { krit: "Seitenverhältnis", empfehlung: "Hochformat 35 : 45", hinweis: "Entspricht dem üblichen Passbild-Format – Gesicht 70–80 % der Höhe" },
  { krit: "Auflösung", empfehlung: "Mind. ca. 413 × 531 px", hinweis: "Entspricht 35 × 45 mm bei 300 dpi; Handyfotos haben deutlich mehr" },
  { krit: "Bearbeitung", empfehlung: "Keine Filter", hinweis: "Nur zuschneiden und Hintergrund beruhigen – keine Beauty- oder Weichzeichner-Effekte" },
];

const doList = [
  "Gesicht frontal, gerade und mittig im Bild",
  "Gesicht füllt 70–80 % der Bildhöhe",
  "Helle, ruhige Wand ohne Muster im Hintergrund",
  "Gleichmäßiges Tageslicht von vorne",
  "Augen offen und klar erkennbar",
  "Foto als JPEG speichern",
];

const dontList = [
  "Sonnenbrille, getönte Gläser oder Schirmmütze",
  "Weitere Personen, Haustiere oder Gegenstände im Bild",
  "Harte Schatten im Gesicht oder an der Wand",
  "Filter, Beauty-Modus oder Weichzeichner",
  "Unruhiger Hintergrund wie Regale, Pflanzen oder Türen",
  "Kopfbedeckung ohne religiösen Grund",
];

const faqs = [
  {
    q: "Wo kann ich mein Lichtbild bei der Barmer hochladen?",
    a: "Auf lichtbild.barmer.de. Sie melden sich dort mit der Auftragsnummer aus dem Schreiben der Barmer und Ihrem Geburtsdatum an. Ein Login bei Meine Barmer ist nicht nötig. Alternativ können Sie das Foto per Post schicken oder in einer Barmer-Filiale abgeben.",
  },
  {
    q: "Wo finde ich die Auftragsnummer für den Barmer-Lichtbildupload?",
    a: "Die Auftragsnummer steht im Schreiben, mit dem die Barmer Sie um ein Foto bittet, auf dem Kartenantrag oben links unterhalb Ihrer persönlichen Daten. Wenn Sie das Schreiben nicht mehr haben, schickt Ihnen die Barmer auf Anfrage ein neues mit neuer Auftragsnummer.",
  },
  {
    q: "Muss das Foto für die Barmer ein biometrisches Passbild sein?",
    a: "Nein. Die Barmer schreibt ausdrücklich, dass es kein Passbild und kein biometrisches Bild sein muss. Ein Handyfoto reicht, wenn das Gesicht frontal, gut beleuchtet und gut erkennbar ist und 70 bis 80 Prozent der Bildhöhe einnimmt.",
  },
  {
    q: "Welches Dateiformat und welche Dateigröße akzeptiert die Barmer?",
    a: "Die Barmer nennt auf ihren Infoseiten kein festes Format und kein Größenlimit. Am sichersten ist ein JPEG-Foto im Hochformat unter 5 MB. Fotos im iPhone-Format HEIC sollten Sie vorher in JPEG umwandeln. PixPassport liefert das Foto direkt als JPEG.",
  },
  {
    q: "Kann ich das Barmer-Foto mit dem Handy hochladen?",
    a: "Ja. Öffnen Sie lichtbild.barmer.de im Browser Ihres Smartphones, geben Sie Auftragsnummer und Geburtsdatum ein und wählen Sie das Foto aus Ihrer Galerie. Eine eigene App brauchen Sie dafür nicht.",
  },
  {
    q: "Warum funktioniert der Login beim Barmer-Lichtbildupload nicht?",
    a: "Prüfen Sie Auftragsnummer und Geburtsdatum (Format TT.MM.JJJJ). Möglicherweise ist auch die Frist für den Upload abgelaufen. Außerdem sollten Cookies aktiviert sein und Sie einen aktuellen Browser nutzen. Hilft das nicht, fordern Sie bei der Barmer ein neues Schreiben an.",
  },
  {
    q: "Wann kommt die neue Barmer-Gesundheitskarte?",
    a: "Laut Barmer erhalten Sie die Karte ungefähr zwei Wochen nach der Prüfung Ihrer Daten per Post. Eine neue Karte müssen Sie nicht zusätzlich bestellen.",
  },
  {
    q: "Braucht mein Kind ein Foto für die Barmer-Karte?",
    a: "Erst ab dem 15. Geburtstag. In Ausnahmefällen, etwa bei nicht mobilen Pflegebedürftigen oder dauerhaftem Wohnsitz im Ausland, kann die Karte auch ohne Foto ausgestellt werden. Informieren Sie die Barmer dann am besten schriftlich.",
  },
  {
    q: "Wie lange speichert die Barmer mein Foto?",
    a: "Die Barmer speichert das Lichtbild nach § 291 SGB V für zehn Jahre und löscht es danach. Dann werden Sie erneut um ein aktuelles Foto gebeten.",
  },
];

/* ─── JSON-LD ─── */
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
      "@type": "HowTo",
      name: "Barmer Lichtbild mit dem Handy hochladen",
      inLanguage: "de-DE",
      step: phoneSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Foto für die Gesundheitskarte", item: "https://www.pixpassport.com/de/gesundheitskarte-foto" },
        { "@type": "ListItem", position: 3, name: "Barmer Lichtbild hochladen", item: PAGE_URL },
      ],
    },
  ],
};

/* ─── Page ─── */
export default function BarmerLichtbildPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[
          { label: "Startseite", href: "/de" },
          { label: "Foto für die Gesundheitskarte", href: "/de/gesundheitskarte-foto" },
          { label: "Barmer Lichtbild hochladen" },
        ]}
        eyebrow="Barmer · elektronische Gesundheitskarte"
        title="Barmer Lichtbild hochladen: So klappt es mit dem Handy"
        intro="Die Barmer hat Sie um ein Foto für die Gesundheitskarte gebeten? Hier finden Sie die Vorgaben der Barmer, eine Schritt-für-Schritt-Anleitung für das Smartphone und das passende Dateiformat für den Upload auf lichtbild.barmer.de."
        accent="amber"
        primary={{ href: ctaHref, label: "Foto für die Barmer erstellen" }}
        secondary={{ href: "#anleitung", label: "Zur Anleitung" }}
        note="Ab 6,99 € · Ergebnis vorher kostenlos ansehen"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1781618724/45877257-77dc-4b1a-9eb3-b51dee831a36_preview_gdlorb.jpg",
          alt: "Foto für die Barmer-Gesundheitskarte im Hochformat mit Maßlinien",
          width: 843,
          height: 671,
        }}
      />

      <QuickFacts items={quickFacts} title="Barmer Lichtbild-Upload auf einen Blick" />

      <Section width="3xl" labelledBy="intro-h2">
        <SectionHeader id="intro-h2" eyebrow="Kurz erklärt" title="Wann bittet die Barmer um ein Foto?" />
        <Prose>
          <p>
            Die Barmer verschickt ein Schreiben, wenn sie ein Foto für Ihre elektronische Gesundheitskarte (eGK) braucht –
            zum Beispiel ab dem 15. Geburtstag oder wenn das gespeicherte Foto älter als zehn Jahre ist. Sie laden das Foto
            dann auf <strong className="text-slate-900">lichtbild.barmer.de</strong> hoch, schicken es per Post oder geben
            es in einer Filiale ab. Allgemeine Infos für alle Kassen finden Sie in unserem Ratgeber{" "}
            <Link href="/de/gesundheitskarte-foto" className={textLink}>Foto für die Gesundheitskarte</Link>.
          </p>
        </Prose>
      </Section>

      <Section muted width="4xl" id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Vorgaben der Barmer"
          title="Welche Anforderungen hat die Barmer an das Foto?"
          intro="Die Barmer verlangt kein biometrisches Passbild. Diese Mindestanforderungen nennt sie für den Upload:"
        />
        <DataTable
          caption="Foto-Anforderungen der Barmer für die Gesundheitskarte"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={requirements.map((r) => [r.krit, <Badge key={r.krit}>{r.vorgabe}</Badge>, r.hinweis])}
        />
        <Note>
          Quelle: Bildhinweise auf lichtbild.barmer.de und Infoseite der Barmer zum Foto für die Gesundheitskarte (Stand
          November 2025). Maßgeblich sind die Angaben im Upload-Portal.
        </Note>
      </Section>

      <Section id="anleitung" labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="Schritt für Schritt"
          title="Barmer Lichtbild mit dem Handy hochladen"
          intro="Vom Schreiben der Barmer bis zur neuen Karte – alles mit dem Smartphone, ohne Fotostudio."
        />
        <StepsGrid steps={phoneSteps} />
      </Section>

      <Section muted width="4xl" labelledBy="file-h2">
        <SectionHeader
          id="file-h2"
          eyebrow="Datei vorbereiten"
          title="Dateigröße und Format für den Barmer-Upload"
          intro="Die Barmer nennt auf ihren Infoseiten kein festes Dateiformat und kein Größenlimit. Mit diesen Werten sind Sie auf der sicheren Seite:"
        />
        <DataTable
          caption="Empfohlene Dateieinstellungen für den Barmer-Lichtbildupload"
          head={["Einstellung", "Empfehlung", "Warum"]}
          rows={fileSpecs.map((f) => [f.krit, <Badge key={f.krit}>{f.empfehlung}</Badge>, f.hinweis])}
        />
        <Note>
          iPhone-Tipp: Unter Einstellungen → Kamera → Formate „Maximale Kompatibilität“ wählen, dann speichert die Kamera
          JPEG statt HEIC.
        </Note>
      </Section>

      <Section labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="So wird Ihr Barmer-Foto angenommen" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section muted width="3xl" labelledBy="pp-h2">
        <SectionHeader id="pp-h2" eyebrow="Ohne Aufwand" title="Foto für die Barmer in 30 Sekunden vorbereiten" />
        <Prose>
          <p>
            Laden Sie Ihr Handyfoto bei PixPassport hoch. Das Tool schneidet es im Hochformat zu, setzt Ihr Gesicht auf 70 bis
            80 Prozent der Bildhöhe, ersetzt einen unruhigen Hintergrund durch helles Grau und gibt Ihnen eine JPEG-Datei, die
            Sie direkt auf lichtbild.barmer.de hochladen können. Das Ergebnis sehen Sie vor dem Kauf kostenlos.
          </p>
          <p>
            Sie sind bei einer anderen Kasse versichert? Die Vorgaben von AOK, TK, DAK und weiteren Kassen finden Sie auf
            unserer Seite{" "}
            <Link href="/de/gesundheitskarte-foto" className={textLink}>Foto für die Gesundheitskarte (eGK)</Link>.
          </p>
        </Prose>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="Häufige Fragen zum Barmer Lichtbild-Upload"
          intro="Antworten auf Basis der Angaben der Barmer und § 291 SGB V."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages keys={["egk", "selber", "app", "biometrisch"]} />

      <CtaBand
        accent="amber"
        title="Ihr Barmer-Foto in 30 Sekunden"
        text="Handyfoto hochladen, Ergebnis kostenlos ansehen und auf lichtbild.barmer.de einreichen."
        href={ctaHref}
        label="Foto für die Barmer erstellen"
      />
    </>
  );
}
