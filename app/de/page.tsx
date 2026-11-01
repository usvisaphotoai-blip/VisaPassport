import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, StatsBand, Section, SectionHeader, StepsGrid, CardGrid, CheckList, DataTable,
  FaqList, CtaBand, JsonLd, Prose, btnPrimary, textLink, ArrowRight, RelatedPages,
} from "./components/ui";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Passbild online erstellen – biometrisch & BMI-konform | PixPassport",
  description:
    "Passbild online erstellen: biometrisches Passfoto 35 × 45 mm, automatisch nach BMI-Vorgabe geprüft, in 30 Sekunden fertig. Ergebnis kostenlos ansehen, ab 6,99 €.",

  alternates: {
    canonical: "https://www.pixpassport.com/de",
    languages: {
      de: "https://www.pixpassport.com/de",
      en: "https://www.pixpassport.com/",
      fr: "https://www.pixpassport.com/fr",
      es: "https://www.pixpassport.com/es",
      "pt-BR": "https://www.pixpassport.com/br",
      "x-default": "https://www.pixpassport.com/",
    },
  },
  openGraph: {
    title: "Passbild online erstellen – in 30 Sekunden | PixPassport",
    description:
      "Biometrisches Passbild nach BMI-Vorgabe, automatisch geprüft, Hintergrund ersetzt – für Deutschland und über 50 weitere Länder. Geld zurück bei Ablehnung.",
    url: "https://www.pixpassport.com/de",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport — Passbild Online erstellen nach BMI-Vorgabe",
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const steps = [
  {
    n: "01",
    title: "Foto aufnehmen oder hochladen",
    desc: "Nehmen Sie Ihr Foto mit dem Smartphone auf oder laden Sie ein vorhandenes Bild hoch. Sie brauchen kein Fotostudio und keine professionelle Kamera.",
  },
  {
    n: "02",
    title: "KI prüft Ihr Passbild automatisch",
    desc: "Unser Passfoto-Generator ersetzt den Hintergrund, schneidet das Bild zu und prüft die biometrischen Kriterien nach BMI-Vorgabe – in Echtzeit.",
  },
  {
    n: "03",
    title: "Passbild digital herunterladen",
    desc: "Sie erhalten sofort Ihr biometrisches Passfoto in hoher Auflösung – als Datei und als Druckvorlage, z. B. für den Ausdruck bei dm oder Rossmann.",
  },
];

const benefits = [
  {
    icon: "🎯",
    title: "Biometrische Konformität garantiert",
    desc: "Jedes Passbild wird nach den offiziellen BMI- und ICAO-Kriterien für Deutschland, die EU und über 50 weitere Länder geprüft. Bei Ablehnung erstatten wir den vollen Preis.",
  },
  {
    icon: "⚡",
    title: "Fertig in unter 30 Sekunden",
    desc: "Unser Online-Tool ist rund um die Uhr verfügbar. Sie sparen sich die Fahrt und die Wartezeit beim Fotografen.",
  },
  {
    icon: "🔒",
    title: "Sichere Daten nach DSGVO",
    desc: "Wir übertragen Ihre Fotos verschlüsselt und löschen sie spätestens nach 24 Stunden automatisch. Ihre Bilder geben wir niemals weiter.",
  },
  {
    icon: "💶",
    title: "Kostenlos prüfen, ab 6,99 € kaufen",
    desc: "Sie sehen Ihr Ergebnis kostenlos, bevor Sie bezahlen. Kein Abo, keine versteckten Kosten – Sie zahlen nur für das fertige Foto.",
  },
  {
    icon: "🌍",
    title: "50+ Länder und Dokumente",
    desc: "Deutschland, Österreich, die Schweiz, die USA, Großbritannien und der gesamte Schengen-Raum: Unsere Formatdatenbank wird laufend aktualisiert.",
  },
  {
    icon: "🖨️",
    title: "Druckvorlage inklusive",
    desc: "Sie erhalten zusätzlich eine druckfertige A4-Vorlage für zu Hause oder den Fotoservice von dm und Rossmann – ideal für Visa, Führerschein und Unterlagen, die noch Papierfotos annehmen.",
  },
];

const docs = [
  {
    icon: "🛂",
    name: "Reisepass",
    detail: "ICAO-Format · hellgrauer Hintergrund · 35 × 45 mm · Abgabe digital über Fotodienstleister oder Amt",
  },
  {
    icon: "🪪",
    name: "Personalausweis",
    detail: "Biometrisch nach BMI-Vorgabe · Abgabe digital über Fotodienstleister oder Amt",
  },
  {
    icon: "✈️",
    name: "Schengen-Visum",
    detail: "Visumfoto für Deutschland und den Schengen-Raum",
  },
  { icon: "🚗", name: "Führerschein", detail: "Neuantrag und Verlängerung" },
  { icon: "🇺🇸", name: "US-Dokumente", detail: "US-Pass · Visum (DS-160) · 51 × 51 mm" },
  {
    icon: "🌐",
    name: "50+ weitere Länder",
    detail: "Aktuelle, weltweite Formatdatenbank",
  },
];

const reviews = [
  {
    name: "Michael S.",
    city: "München",
    stars: 5,
    text: "Mein Foto für den Führerscheinumtausch wurde beim ersten Versuch akzeptiert. Schnell und ohne Stress.",
  },
  {
    name: "Julia B.",
    city: "Berlin",
    stars: 5,
    text: "Ich war skeptisch, aber das Ergebnis war perfekt. Ich habe den Druckbogen bei Rossmann ausgedruckt, und alles hat sofort funktioniert.",
  },
  {
    name: "Andreas M.",
    city: "Hamburg",
    stars: 5,
    text: "Deutlich günstiger als beim Fotografen, und das Bild ist einwandfrei. Ich kann das Tool für die ganze Familie empfehlen.",
  },
];

const requirementsTable = [
  {
    param: "Format (B × H)",
    value: "35 × 45 mm",
    source: "BMI / Bundesdruckerei",
  },
  {
    param: "Gesichtshöhe",
    value: "32–36 mm (optimal)",
    source: "Lichtbild-Schablone BMI, Juli 2025",
  },
  {
    param: "Auflösung",
    value: "min. 600 dpi (827 × 1063 px)",
    source: "Auswärtiges Amt / ICAO",
  },
  {
    param: "Hintergrund",
    value: "Einfarbig, vorzugsweise hellgrau",
    source: "BMI Fotomustertafel, Juli 2025",
  },
  {
    param: "Gesichtsausdruck",
    value: "Neutral, Mund geschlossen",
    source: "ICAO Doc 9303 / BMI",
  },
  {
    param: "Kopfhaltung",
    value: "Frontal, gerade, kein Neigen",
    source: "Passverordnung (PassV)",
  },
  {
    param: "Augen",
    value: "Geöffnet, direkt zur Kamera, keine Tönung",
    source: "BMI",
  },
  {
    param: "Aktualität",
    value: "Aktuelles Erscheinungsbild (Richtwert: max. 6 Monate)",
    source: "Passverordnung (PassV)",
  },
  {
    param: "Dateiformat",
    value: "Digitale Übermittlung an die Behörde",
    source: "BMI, seit 1. Mai 2025",
  },
];

const faqItems = [
  {
    q: "Was hat sich am 1. Mai 2025 bei Passbildern geändert?",
    a: "Seit dem 1. Mai 2025 akzeptieren deutsche Behörden für Reisepass, Personalausweis und Aufenthaltstitel nur noch digitale biometrische Lichtbilder; Papierfotos wurden lediglich bis Ende Juli 2025 übergangsweise angenommen. Das Foto wird entweder von einem registrierten Fotodienstleister über eine zertifizierte Cloud übermittelt oder direkt im Amt am PointID®-Terminal aufgenommen. Für Führerschein, Visa und viele andere Dokumente können Sie weiterhin ein ausgedrucktes oder hochgeladenes Foto verwenden.",
  },
  {
    q: "Welche Passbild Größe gilt in Deutschland?",
    a: "Das offizielle Format ist 35 × 45 mm. Die Gesichtshöhe vom Kinn bis zum Scheitel muss laut BMI-Lichtbild-Schablone bei Personen ab 10 Jahren zwischen 32 und 36 mm liegen. PixPassport stellt dieses Maß bei jedem Foto automatisch sicher.",
  },
  {
    q: "Welcher Hintergrund ist für ein biometrisches Passfoto vorgeschrieben?",
    a: "Die BMI-Fotomustertafel schreibt einen einfarbigen, vorzugsweise hellgrauen Hintergrund ohne Schatten oder Muster vor. Unser Tool entfernt Ihren echten Hintergrund automatisch und ersetzt ihn durch die korrekte Farbe.",
  },
  {
    q: "Kann ich mein Passbild online selbst erstellen?",
    a: "Ja. Sie nehmen das Foto mit dem Smartphone auf, und unsere Software prüft automatisch die biometrischen Kriterien – Gesichtshöhe, Auflösung, Hintergrund, Beleuchtung und Kopfhaltung – nach BMI-Vorgabe. Beachten Sie: Für Reisepass und Personalausweis verlangt das Bürgeramt seit Mai 2025 die digitale Übermittlung durch einen registrierten Fotodienstleister oder die Aufnahme vor Ort. Klären Sie vorab, welchen Weg Ihr Amt akzeptiert.",
  },
  {
    q: "Was kostet ein Passbild beim Amt mit PointID®?",
    a: "Nutzt Ihr Amt das PointID®-System der Bundesdruckerei, kostet die Aufnahme vor Ort seit dem 1. Mai 2025 bundeseinheitlich 6,00 €. Ein biometrisches Foto von PixPassport kostet ab 6,99 € – Sie prüfen das Ergebnis vorher kostenlos.",
  },
  {
    q: "Darf ich auf dem Passbild lächeln?",
    a: "Nein. Die ICAO-Norm und die BMI-Vorgabe verlangen einen neutralen Gesichtsausdruck mit geschlossenem Mund. Ein Lächeln mit sichtbaren Zähnen führt zur Ablehnung.",
  },
  {
    q: "Für welche Dokumente kann ich den Passfoto-Generator nutzen?",
    a: "Sie können das Tool für Reisepass, Personalausweis, Führerschein, Schengen-Visum, US-Visum (DS-160) und über 50 weitere internationale Dokumente verwenden. Wir aktualisieren die Formatdatenbank laufend.",
  },
  {
    q: "Was passiert, wenn mein Passbild abgelehnt wird?",
    a: "Lehnt eine deutsche Behörde Ihr mit PixPassport erstelltes Foto ab, erstatten wir den vollen Kaufpreis ohne Rückfragen. Die Akzeptanzrate liegt bei 99,8 Prozent. Die Erstattung gilt nach den Bedingungen unserer Erstattungsrichtlinie.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport",
      url: "https://www.pixpassport.com/de",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "de",
      offers: {
        "@type": "Offer",
        price: "6.99",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "170",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "WebSite",
      name: "PixPassport",
      url: "https://www.pixpassport.com/de",
      inLanguage: "de-DE",
    },
  ],
};

const ctaHref = "/de/passbild-online?type=germany-passport";

const rejectionReasons = [
  ["Lächeln mit sichtbaren Zähnen", "Ist nicht erlaubt. Die ICAO-Norm verlangt einen neutralen Ausdruck mit geschlossenem Mund."],
  ["Getönte Brillengläser oder Spiegelungen", "Eine Brille ist erlaubt, aber die Augen müssen klar erkennbar sein – ohne Reflexionen, getönte Gläser oder verdeckenden Rahmen."],
  ["Geneigter oder gedrehter Kopf", "Ihr Kopf muss gerade und frontal zur Kamera ausgerichtet sein."],
  ["Schatten im Gesicht oder im Hintergrund", "Die Ausleuchtung muss gleichmäßig sein, ohne Über- oder Unterbelichtung."],
  ["Falscher Hintergrund", "Muster, Farben und Verläufe sind nicht erlaubt – nur ein einfarbig heller, idealerweise hellgrauer Hintergrund."],
  ["Veraltetes Foto", "Ihr Passbild muss Ihr aktuelles Erscheinungsbild zeigen. Als Richtwert gilt: nicht älter als sechs Monate."],
  ["Papierfoto für Pass oder Personalausweis", "Wird im Inland seit dem Ende der Übergangsfrist (31. Juli 2025) nicht mehr angenommen."],
];

const photoTips = [
  ["Licht von vorn", "Stellen Sie sich vor ein Fenster oder eine helle Lampe, damit Ihr Gesicht gleichmäßig ausgeleuchtet ist. Vermeiden Sie Gegenlicht."],
  ["Neutraler Hintergrund", "Eine helle, einfarbige Wand reicht aus. PixPassport ersetzt Ihren Hintergrund ohnehin automatisch durch die korrekte Farbe."],
  ["Richtiger Abstand", "Halten Sie das Smartphone etwa 40 bis 50 cm von Ihrem Gesicht entfernt. Kopf und Schultern müssen vollständig sichtbar sein."],
  ["Keine Filter", "Verzichten Sie auf Schönheitsfilter, HDR und automatische Weichzeichnung im Porträtmodus."],
  ["Brille nur ohne Spiegelungen", "Eine Brille ist erlaubt, wenn die Augen klar sichtbar sind. Getönte Gläser und Reflexionen sind nicht zulässig – im Zweifel nehmen Sie die Brille ab."],
  ["Neutraler Ausdruck", "Blicken Sie direkt in die Kamera, halten Sie den Mund geschlossen und entspannen Sie Ihr Gesicht."],
  ["Sofort prüfen lassen", "Laden Sie Ihr Foto hoch und lassen Sie alle biometrischen Kriterien automatisch prüfen, bevor Sie es einreichen."],
];

const labelled = (items: string[][]) =>
  items.map(([t, d]) => (
    <>
      <strong className="text-slate-900">{t}:</strong> {d}
    </>
  ));

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function DeHomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        eyebrow="Biometrisch · 35 × 45 mm · nach BMI-Vorgabe"
        title="Passbild online erstellen – für Reisepass, Ausweis & Visum"
        intro="Erstellen Sie Ihr biometrisches Passbild in nur 30 Sekunden. Unsere Software prüft automatisch alle amtlichen Vorgaben: Hintergrund, Format 35 × 45 mm, Gesichtsposition und Belichtung. Ergebnis kostenlos ansehen, erst dann bezahlen. Für Reisepass und Personalausweis gilt seit Mai 2025 die digitale Abgabe über das Amt oder einen registrierten Fotodienstleister – für Führerschein, Visum, Gesundheitskarte und Bewerbung genügt Ihre geprüfte Bilddatei."
        primary={{ href: ctaHref, label: "Jetzt Passbild erstellen" }}
        secondary={{ href: "#anforderungen", label: "Anforderungen ansehen" }}
        note="Ab 6,99 € · Kein Abo · Geld zurück bei Ablehnung"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1790742513/Passport-Photo-With-iPhone_szopjq.webp",
          alt: "Biometrisches Passbild mit dem Smartphone selbst aufnehmen",
          width: 1536,
          height: 1024,
        }}
      />

      <StatsBand
        items={[
          { value: "17.000+", label: "Zufriedene Nutzer" },
          { value: "4,9 / 5", label: "Nutzerbewertung" },
          { value: "99,8 %", label: "Akzeptanzrate" },
          { value: "< 30 s", label: "Bearbeitungszeit" },
          { value: "50+", label: "Länder unterstützt" },
        ]}
      />

      <Section labelledBy="how-h2">
        <SectionHeader
          id="how-h2"
          eyebrow="So funktioniert es"
          title="In drei Schritten zum digitalen Passbild"
          intro="Kein Fotostudio, keine Wartezeit. Sie erstellen Ihr biometrisches Passbild online in unter einer Minute."
        />
        <StepsGrid steps={steps} />
        <div className="mt-10">
          <Link href={ctaHref} className={btnPrimary}>
            Jetzt starten <ArrowRight />
          </Link>
        </div>
      </Section>

      <Section muted id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Offizielle Vorgaben"
          title="Passbildgröße in Deutschland: alle Anforderungen im Überblick"
          intro="Die folgenden Werte stammen aus der Lichtbild-Schablone des Bundesministeriums des Innern (BMI, Stand Juli 2025), der Passverordnung (PassV) sowie der internationalen ICAO-Norm 9303, die auch das Auswärtige Amt für Visa-Anträge anwendet."
        />
        <DataTable
          caption="Anforderungen an das biometrische Passbild in Deutschland"
          head={["Merkmal", "Vorgabe", "Quelle"]}
          rows={requirementsTable.map((r) => [r.param, r.value, r.source])}
        />
        <h3 className="mb-4 mt-10 text-lg font-bold text-slate-900">Diese Fehler führen zur Ablehnung</h3>
        <CheckList variant="dont" items={labelled(rejectionReasons)} />
        <p className="mt-6 text-sm leading-relaxed text-slate-600">
          Unser Passfoto-Generator prüft jeden dieser Punkte automatisch und zeigt Ihnen Probleme, bevor Sie bezahlen.
        </p>
      </Section>

      <Section labelledBy="why-h2">
        <SectionHeader
          id="why-h2"
          eyebrow="Warum PixPassport"
          title="Ihre Vorteile auf einen Blick"
          intro="Jeden Monat vertrauen uns Tausende Nutzerinnen und Nutzer bei ihrem Pass-, Visum- und Ausweisantrag."
        />
        <CardGrid items={benefits.map((b) => ({ icon: b.icon, title: b.title, desc: b.desc }))} />
      </Section>

      <Section muted labelledBy="docs-h2">
        <SectionHeader
          id="docs-h2"
          eyebrow="Unterstützte Dokumente"
          title="Ein Passfoto-Generator für alle Ausweisdokumente"
          intro="PixPassport deckt alle gängigen deutschen und internationalen Identitäts- und Reisedokumente ab – immer nach aktueller BMI- und ICAO-Vorgabe."
        />
        <CardGrid items={docs.map((d) => ({ icon: d.icon, title: d.name, desc: d.detail }))} />
        <p className="mt-6 text-sm text-slate-600">
          Mehr zu einzelnen Dokumenten:{" "}
          <Link href="/de/fuehrerschein-foto" className={textLink}>Führerscheinfoto</Link>,{" "}
          <Link href="/de/visum-foto" className={textLink}>Visumfoto</Link>,{" "}
          <Link href="/de/gesundheitskarte-foto" className={textLink}>Gesundheitskarte</Link>,{" "}
          <Link href="/de/passfoto-schweiz-online" className={textLink}>Passfoto Schweiz</Link>.{" "}
          Ausführlich erklärt: <Link href="/de/biometrisches-passbild" className={textLink}>biometrisches Passbild und Maße</Link>,{" "}
          <Link href="/de/passfoto-selber-machen" className={textLink}>Passfoto selber machen</Link> und{" "}
          <Link href="/de/passfoto-app-kostenlos" className={textLink}>Passfoto-App kostenlos</Link>.
        </p>
      </Section>

      <Section width="3xl" labelledBy="prose-h2">
        <SectionHeader id="prose-h2" title="Biometrisches Passbild selbst erstellen: So gelingt es zu Hause" />
        <Prose>
          <p>
            Seit der Umstellung auf digitale Passbilder am 1. Mai 2025 fragen sich viele Bürgerinnen und Bürger, ob sie
            ihr Passbild noch selbst aufnehmen dürfen. Für Reisepass und Personalausweis muss das Foto digital über einen
            registrierten Fotodienstleister an das Bürgeramt gehen oder dort aufgenommen werden. Für Führerschein, Visa,
            Gesundheitskarte und Bewerbungen können Sie Ihr Foto dagegen weiterhin selbst erstellen – mit dem richtigen
            Licht, dem richtigen Abstand und einer zuverlässigen Prüfung gelingt das auch mit dem eigenen Smartphone.
          </p>
        </Prose>
        <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Sieben Tipps für ein perfektes Passfoto</h3>
        <CheckList items={labelled(photoTips)} />
        <h3 className="mb-3 mt-8 text-lg font-bold text-slate-900">Passbild für Kinder: Diese Regeln gelten</h3>
        <Prose>
          <p>
            Bei Kindern bis einschließlich fünf Jahren verzichten die Behörden auf die volle Prüfung der
            Biometrietauglichkeit: Format, Frontalaufnahme, Schärfe, Ausleuchtung und Hintergrund müssen stimmen, bei
            Blickrichtung und Mimik gibt es Spielraum. Für Kinder von sechs bis neun Jahren gilt eine eigene
            Lichtbild-Schablone mit einer Gesichtshöhe von 22 bis 36 mm. Ab zehn Jahren gelten dieselben Vorgaben wie für
            Erwachsene.
          </p>
        </Prose>
        <h3 className="mb-3 mt-8 text-lg font-bold text-slate-900">Passbild oder Bewerbungsfoto: Der Unterschied zählt</h3>
        <Prose>
          <p>
            Ein biometrisches Passbild folgt strengen staatlichen Normen: 35 × 45 mm, neutraler Ausdruck, hellgrauer
            Hintergrund. Ein Bewerbungsfoto ist freier gestaltet und darf ein leichtes Lächeln zeigen. Mehr dazu lesen Sie
            in unserem{" "}
            <Link href="/de/bewerbungsfoto" className={textLink}>
              Ratgeber zum Bewerbungsfoto
            </Link>
            .
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="reviews-h2">
        <SectionHeader
          id="reviews-h2"
          eyebrow="Kundenbewertungen"
          title="Das sagen unsere Nutzer"
          intro="Über 17.000 Nutzer haben ihr biometrisches Passbild bereits mit PixPassport erstellt."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex flex-col gap-3 rounded-xl border-2 border-slate-200 bg-white p-6">
              <div className="text-amber-500" role="img" aria-label={`${r.stars} von 5 Sternen`}>
                <span aria-hidden="true">{"★".repeat(r.stars)}</span>
              </div>
              <blockquote className="text-sm leading-relaxed text-slate-700">„{r.text}“</blockquote>
              <figcaption className="mt-auto text-sm text-slate-500">
                <strong className="font-bold text-slate-900">{r.name}</strong> · {r.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="FAQ"
          title="Häufige Fragen zum Passbild online"
          intro="Alles Wichtige zur BMI-Vorgabe, zum Format und zur Nutzung von PixPassport."
        />
        <FaqList items={faqItems} />
        <p className="mt-8 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-500" role="note">
          <strong className="font-semibold text-slate-700">Hinweis:</strong> PixPassport ist ein unabhängiger Service zur
          Erstellung biometrischer Passbilder und steht in keiner Verbindung zum Bundesministerium des Innern (BMI) oder
          anderen Behörden. Welche Übermittlungswege Ihre Behörde akzeptiert, erfahren Sie direkt bei Ihrem Bürgeramt.
        </p>
      </Section>

      <RelatedPages keys={["biometrisch", "selber", "app", "fuehrerschein", "visum", "ratgeber"]} />

      <CtaBand
        title="Ihr Passbild in 30 Sekunden"
        text="Foto hochladen, Ergebnis kostenlos prüfen – erst dann bezahlen."
        href={ctaHref}
        label="Jetzt Passbild erstellen"
      />

      {/* Sticky CTA on mobile; spacer keeps it from covering the footer */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Link href={ctaHref} className={`${btnPrimary} w-full`}>
          Jetzt Passbild erstellen <ArrowRight />
        </Link>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
