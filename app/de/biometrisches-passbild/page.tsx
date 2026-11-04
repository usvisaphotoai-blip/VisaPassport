import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CardGrid, CheckList, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, Prose, textLink, RelatedPages,
} from "../components/ui";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Biometrisches Passbild: Anforderungen 2026 & Maße | PixPassport",
  description:
    "Alle Anforderungen an das biometrische Passbild: 35 × 45 mm, Gesichtshöhe 32–36 mm, Hintergrund, Brille und Kinderregeln – mit automatischer Fotoprüfung.",
  keywords: [
    "biometrisches Passbild",
    "Passbild online erstellen",
    "biometrisches Passbild Anforderungen",
    "Passbild Reisepass",
    "Passbild Personalausweis 2026",
    "Passbild Größe 35x45",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/biometrisches-passbild",
    languages: {
      en: "https://www.pixpassport.com/passport-photos",
      fr: "https://www.pixpassport.com/fr/photo-passeport",
      de: "https://www.pixpassport.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassport.com/passport-photos",
    },
  },
  openGraph: {
    title: "Biometrisches Passbild: Anforderungen 2026 & Maße | PixPassport",
    description:
      "Alle Vorgaben für das biometrische Passbild in Deutschland – und Ihr Foto automatisch prüfen lassen.",
    url: "https://www.pixpassport.com/de/biometrisches-passbild",
    siteName: "PixPassport",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Biometrisches Passbild – Anforderungen und Maße",
      },
    ],
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
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Ein Smartphone-Foto in normalem Licht reicht aus.",
  },
  {
    n: "2",
    title: "Automatisch prüfen und korrigieren",
    desc: "Die Software misst Kopfgröße, Augenposition und Belichtung, ersetzt den Hintergrund und gleicht das Ergebnis mit der ICAO-Norm 9303 ab.",
  },
  {
    n: "3",
    title: "Foto herunterladen",
    desc: "Sie laden das fertige Passbild als Datei und als A4-Druckvorlage herunter, z. B. für den Fotoservice von dm oder Rossmann.",
  },
];

const specs = [
  { label: "Format", value: "35 × 45 mm", detail: "Hochformat, ohne Rand, in Farbe" },
  { label: "Gesichtshöhe", value: "32–36 mm", detail: "Kinn bis Scheitel, ab 10 Jahren (6–9 Jahre: 22–36 mm)" },
  { label: "Hintergrund", value: "Hellgrau", detail: "Einfarbig, ohne Schatten oder Muster" },
  { label: "Kopfhaltung", value: "Frontal und gerade", detail: "Kein Neigen oder Drehen des Kopfes" },
  { label: "Augen", value: "Offen und sichtbar", detail: "Brille erlaubt – ohne Spiegelungen, Tönung oder verdeckenden Rahmen" },
  { label: "Mimik", value: "Neutral", detail: "Mund geschlossen, keine sichtbaren Zähne" },
  { label: "Belichtung", value: "Gleichmäßig", detail: "Kein direkter Blitz und kein Gegenlicht" },
  { label: "Aktualität", value: "Aktuell", detail: "Zeigt Ihr derzeitiges Erscheinungsbild (Richtwert: max. 6 Monate)" },
];

const doList = [
  "Halten Sie eine neutrale Mimik mit geschlossenem Mund.",
  "Blicken Sie frontal in die Kamera und richten Sie den Kopf gerade aus.",
  "Tragen Sie Kleidung, die sich vom hellen Hintergrund abhebt.",
  "Nutzen Sie Tageslicht oder eine gleichmäßige, weiche Innenraumbeleuchtung.",
  "Verwenden Sie eine Aufnahme, die nicht älter als sechs Monate ist.",
];

const dontList = [
  "Tragen Sie keine Sonnenbrille, keine getönten Gläser und keine Kopfbedeckung (Ausnahme: religiöse oder medizinische Gründe).",
  "Vermeiden Sie Schatten im Gesicht und auf dem Hintergrund.",
  "Lächeln Sie nicht und öffnen Sie den Mund nicht.",
  "Bearbeiten Sie das Foto nicht nachträglich mit Filtern.",
  "Reichen Sie kein unscharfes oder stark komprimiertes Foto ein.",
];

const useCases = [
  {
    title: "Reisepass",
    desc: "Das Foto erfüllt die biometrischen Vorgaben für den Reisepass. Seit Mai 2025 muss es digital an das Bürgeramt übermittelt werden.",
  },
  {
    title: "Personalausweis",
    desc: "Reisepass und Personalausweis folgen denselben Vorgaben. Ein Foto genügt also für beide Dokumente.",
  },
  {
    title: "Visum und Aufenthaltstitel",
    desc: "Viele Visa-Anträge verlangen dieselben internationalen ICAO-Standards. Für Abweichungen siehe unseren Visumfoto-Ratgeber.",
  },
  {
    title: "Babys und Kinder",
    desc: "Bis einschließlich fünf Jahren gelten gelockerte Regeln bei Blick und Mimik, für 6- bis 9-Jährige eine eigene Schablone.",
  },
];

const benefits = [
  "Die Bildverarbeitung folgt der aktuellen ICAO-Norm 9303.",
  "Der Hintergrund wird automatisch durch einheitliches Hellgrau ersetzt.",
  "Die Gesichtshöhe wird exakt gemessen und das Foto auf 35 × 45 mm zugeschnitten.",
  "Belichtung, Schärfe und Kontrast werden automatisch korrigiert.",
  "Sie laden das Ergebnis sofort als Datei und als A4-Druckvorlage herunter.",
  "Sie sehen das Ergebnis kostenlos, bevor Sie bezahlen (ab 6,99 €).",
  "Ihre Fotos werden spätestens nach 24 Stunden automatisch gelöscht.",
  "Das Tool eignet sich gleichermaßen für Babys, Kinder und Erwachsene.",
];

const stats = [
  { val: "35×45 mm", label: "Amtliche Passbildgröße in Deutschland" },
  { val: "< 30 Sek.", label: "Von der Aufnahme bis zum fertigen Foto" },
  { val: "ICAO 9303", label: "Zugrunde liegende internationale Norm" },
  { val: "24 h", label: "Bis zur automatischen Löschung Ihrer Fotos" },
];

const faqs = [
  {
    q: "Was ist ein biometrisches Passbild?",
    a: "Ein biometrisches Passbild ist ein Lichtbild, das den internationalen Vorgaben der ICAO-Norm 9303 entspricht und die automatische Gesichtserkennung an Ausweisdokumenten mit Chip ermöglicht. Eine Software vergleicht charakteristische Punkte im Gesicht, etwa den Augenabstand und die Kinnlinie, mit dem gespeicherten Datensatz. Die Norm schreibt deshalb exakte Maße, eine feste Gesichtshöhe, eine helle Hintergrundfarbe und eine neutrale Mimik vor.",
  },
  {
    q: "Welche Maße hat ein biometrisches Passbild in Deutschland?",
    a: "Das Foto misst 35 × 45 mm im Hochformat. Die Gesichtshöhe vom Kinn bis zum Scheitel liegt bei Personen ab zehn Jahren zwischen 32 und 36 mm, bei Kindern von sechs bis neun Jahren zwischen 22 und 36 mm. Der Hintergrund ist einfarbig hell, vorzugsweise hellgrau, gleichmäßig ausgeleuchtet und frei von Schatten oder Farbverläufen.",
  },
  {
    q: "Muss ich mein Passbild seit 2025 digital einreichen?",
    a: "Ja. Seit dem 1. Mai 2025 akzeptieren die Pass- und Personalausweisbehörden nur noch digitale Lichtbilder; die Übergangsfrist für Papierfotos endete am 31. Juli 2025. Das Foto wird entweder im Amt aufgenommen (z. B. am PointID®-Terminal) oder von einem registrierten Fotodienstleister über eine zertifizierte Cloud übermittelt. Fragen Sie bei Ihrem Bürgeramt nach, welcher Weg dort angeboten wird. Ein Foto von PixPassport können Sie für Dokumente nutzen, die ein selbst erstelltes Foto zulassen, etwa Führerschein, Visa oder die Gesundheitskarte.",
  },
  {
    q: "Kann ich das Passbild auch für den Personalausweis verwenden?",
    a: "Ja, denn Reisepass und Personalausweis folgen in Deutschland denselben biometrischen Vorgaben. Ein Foto eignet sich für beide Dokumente, Sie müssen es also nicht doppelt anfertigen lassen.",
  },
  {
    q: "Ist ein biometrisches Passbild für ein Baby gültig?",
    a: "Ja, jedes Kind benötigt ab der Geburt ein eigenes biometrisches Passbild. Bei Kindern bis einschließlich fünf Jahren prüfen Behörden nur Größe, Frontalaufnahme, Schärfe, Ausleuchtung, Hintergrund und Bildqualität. Abweichungen bei Kopfhaltung, Blickrichtung und Mimik sind zulässig, da ein bewusstes Stillhalten in diesem Alter kaum möglich ist.",
  },
  {
    q: "Darf ich eine Brille auf dem Passbild tragen?",
    a: "Ja, in Deutschland ist eine Brille auf dem Passbild erlaubt. Die Augen müssen jedoch klar erkennbar sein: Spiegelungen auf den Gläsern, getönte Gläser und Sonnenbrillen sind nicht zulässig, und der Rahmen darf die Augen nicht verdecken. Wer auf Nummer sicher gehen will, nimmt die Brille für die Aufnahme ab.",
  },
  {
    q: "Wie lange ist ein biometrisches Passbild gültig?",
    a: "Das Foto muss Ihr aktuelles Erscheinungsbild zeigen; als Richtwert gilt, dass es nicht älter als sechs Monate sein sollte. Ein neues, aktuelles Passbild erstellen Sie bei Bedarf in wenigen Sekunden.",
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
      "@type": "HowTo",
      name: "Biometrisches Passbild online erstellen",
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
          name: "Biometrisches Passbild",
          item: "https://www.pixpassport.com/de/biometrisches-passbild",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Biometrisches Passbild erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: "DE",
      serviceType: "Biometrisches Passbild",
    },
  ],
};

/* ─── Page ─── */
export default function BiometrischesPassbildPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Biometrisches Passbild" }]}
        eyebrow="Stand 2026 · BMI-Vorgaben & ICAO-Norm"
        title="Biometrisches Passbild: alle Anforderungen 2026"
        intro="Maße, Hintergrund, Brille und Kinderregeln im Überblick. Unsere Software prüft Größe, Gesichtshöhe, Hintergrund und Belichtung nach der BMI-Lichtbild-Schablone und der ICAO-Norm 9303 – ohne Fototermin und ohne Fotostudio."
        primary={{ href: ctaHref, label: "Foto jetzt prüfen lassen" }}
        secondary={{ href: "#anforderungen", label: "Alle Anforderungen" }}
        note="4,9 von 5 Sternen · über 17.000 zufriedene Nutzer"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Biometrisches Passbild mit Maßlinien für Gesichtshöhe und Augenposition nach ICAO-Norm",
          width: 843,
          height: 671,
        }}
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {trustBadges.map((t) => (
            <li key={t.text} className="flex items-center gap-1.5 rounded-md border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span aria-hidden="true">{t.icon}</span>
              {t.text}
            </li>
          ))}
        </ul>
      </Hero>

      <Section width="4xl" labelledBy="what-h2">
        <SectionHeader id="what-h2" title="Was ist ein biometrisches Passbild?" />
        <Prose>
          <p>
            Ein biometrisches Passbild unterscheidet sich deutlich von einem gewöhnlichen Porträtfoto. Es folgt der
            internationalen ICAO-Norm 9303 und ermöglicht dadurch die automatische Gesichtserkennung an modernen
            Ausweisdokumenten mit elektronischem Chip.
          </p>
          <p>
            In Deutschland gelten diese Vorgaben für Reisepass, Personalausweis und elektronischen Aufenthaltstitel. Das
            Bundesministerium des Innern (BMI) und das Auswärtige Amt veröffentlichen eine Foto-Mustertafel und
            Lichtbild-Schablonen, an denen sich Behörden bei der Annahme eines Fotos strikt orientieren. Schon kleine
            Abweichungen, etwa ein zu dunkler Hintergrund oder eine falsche Gesichtshöhe, führen häufig zur Ablehnung.
          </p>
          <p>
            Seit dem 1. Mai 2025 hat sich zusätzlich der Übermittlungsweg geändert: Für Reisepass und Personalausweis
            nehmen die Behörden keine Papierabzüge mehr an, sondern nur noch eine digitale Aufnahme vor Ort oder die
            digitale Übermittlung durch einen registrierten Fotodienstleister. Klären Sie den genauen Ablauf am besten
            direkt mit Ihrem Bürgeramt.
          </p>
          <p>
            PixPassport übernimmt die technische Prüfung: Die Software analysiert Bildgröße, Gesichtshöhe, Kopfposition,
            Belichtung, Hintergrundfarbe und Schärfe und korrigiert Abweichungen in Echtzeit. Das Ergebnis nutzen Sie für
            alle Anträge, die ein selbst erstelltes Foto zulassen – etwa für den{" "}
            <Link href="/de/fuehrerschein-foto" className={textLink}>Führerschein</Link>, ein{" "}
            <Link href="/de/visum-foto" className={textLink}>Visum</Link> oder die{" "}
            <Link href="/de/gesundheitskarte-foto" className={textLink}>Gesundheitskarte</Link>.
          </p>
        </Prose>
      </Section>

      <Section muted labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="So funktioniert es"
          title="Biometrisches Passbild in drei Schritten"
          intro="Sie benötigen kein Fotostudio. Der gesamte Ablauf läuft online, direkt auf dem Smartphone oder am Computer."
        />
        <StepsGrid steps={steps} />
      </Section>

      <Section width="4xl" id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Offizielle Vorgaben"
          title="Anforderungen an das biometrische Passbild"
          intro="Diese Kriterien entsprechen der aktuellen BMI-Lichtbild-Schablone (Stand Juli 2025) und der ICAO-Norm 9303. PixPassport prüft jeden dieser Punkte automatisch, bevor Sie Ihr Foto herunterladen."
        />
        <DataTable
          caption="Anforderungen an das biometrische Passbild"
          head={["Kriterium", "Vorgabe", "Hinweis"]}
          rows={specs.map((s) => [s.label, <Badge key={s.label}>{s.value}</Badge>, s.detail])}
        />
      </Section>

      <Section muted labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="Das gehört auf ein gutes Passbild" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section labelledBy="use-h2">
        <SectionHeader
          id="use-h2"
          eyebrow="Einsatzbereiche"
          title="Wofür Sie ein biometrisches Passbild brauchen"
          intro="Ein biometrisches Passbild erfüllt die Vorgaben mehrerer amtlicher Dokumente gleichzeitig."
        />
        <CardGrid cols={4} items={useCases} />
      </Section>

      <Section muted labelledBy="why-h2">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              id="why-h2"
              eyebrow="Warum PixPassport"
              title="Biometrisches Passbild ohne Fotostudio"
              intro="Ein klassisches Passfoto beim Fotografen kostet Zeit, einen Termin und meist zwischen 8 und 15 Euro. PixPassport prüft und optimiert Ihr Foto automatisch nach den behördlichen Anforderungen – bequem von zu Hause aus."
            />
            <CheckList items={benefits} />
          </div>
          <dl className="grid grid-cols-2 gap-6 rounded-xl border-2 border-slate-200 bg-white p-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-tight text-slate-600">{s.label}</dt>
                <dd className="text-2xl font-black leading-none text-lime-700 sm:text-3xl">{s.val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="FAQ zum biometrischen Passbild"
          intro="Alles Wichtige zu Maßen, Anforderungen und der Verwendung Ihres biometrischen Passbildes."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages keys={["reisepass", "personalausweis", "selber", "egk", "schweiz", "ratgeber"]} />

      <CtaBand
        title="Ihr Foto jetzt prüfen lassen"
        text="Foto hochladen, Ergebnis in 30 Sekunden kostenlos ansehen – ab 6,99 €."
        href={ctaHref}
        label="Passbild erstellen"
      />
    </>
  );
}
