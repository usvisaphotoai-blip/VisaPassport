import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Biometrisches Passbild online erstellen 2026 – ICAO-konform | PixPassport",
  description:
    "Biometrisches Passbild für Reisepass, Personalausweis und ePass in 30 Sekunden erstellen. KI prüft Größe, Gesichtshöhe, Hintergrund und Belichtung nach den Vorgaben der Bundesdruckerei. Sofort als Foto oder Druckbogen.",
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
    title: "Biometrisches Passbild online erstellen – ICAO-konform | PixPassport",
    description:
      "Biometrisches Passbild für Reisepass, Personalausweis und ePass in 30 Sekunden erstellen. Geprüft nach den Vorgaben der Bundesdruckerei.",
    url: "https://www.pixpassport.com/de/biometrisches-passbild",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Biometrisches Passbild online erstellen - PixPassport",
      },
    ],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Icons ─── */
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const Check = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const X = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#65a30d" aria-hidden="true">
    <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
  </svg>
);

/* ─── Data ─── */
const trustBadges = [
  { icon: "🔒", text: "Fotos werden nicht gespeichert" },
  { icon: "⚡", text: "Fertig in 30 Sekunden" },
  { icon: "🏛️", text: "Nach Bundesdruckerei-Norm" },
  { icon: "🆓", text: "Kostenlose Vorprüfung" },
];

const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Ein Smartphone-Foto in normalem Licht reicht aus.",
  },
  {
    n: "2",
    title: "KI prüft und korrigiert",
    desc: "Die KI misst Kopfgröße, Augenposition und Belichtung, tauscht den Hintergrund aus und gleicht das Ergebnis an die ICAO-Norm 9303 an.",
  },
  {
    n: "3",
    title: "Foto herunterladen",
    desc: "Sie laden das fertige Passbild als Datei herunter oder bestellen den Druckbogen für dm, Rossmann oder CEWE.",
  },
];

const specs = [
  { label: "Format", value: "35 × 45 mm", detail: "Hochformat, ohne Rand, in Farbe" },
  { label: "Gesichtshöhe", value: "32–36 mm", detail: "Kinn bis Haaransatz, nicht der ganze Kopf" },
  { label: "Hintergrund", value: "Hellgrau", detail: "Einfarbig, ohne Schatten oder Muster" },
  { label: "Kopfhaltung", value: "Frontal und gerade", detail: "Kein Neigen oder Drehen des Kopfes" },
  { label: "Augen", value: "Offen und sichtbar", detail: "Keine Brille, seit 2017 grundsätzlich untersagt" },
  { label: "Mimik", value: "Neutral", detail: "Mund geschlossen, keine sichtbaren Zähne" },
  { label: "Belichtung", value: "Gleichmäßig", detail: "Kein direkter Blitz und kein Gegenlicht" },
  { label: "Aktualität", value: "Max. 6 Monate", detail: "Zeigt Ihr derzeitiges Erscheinungsbild" },
];

const doList = [
  "Halten Sie eine neutrale Mimik mit geschlossenem Mund.",
  "Blicken Sie frontal in die Kamera und richten Sie den Kopf gerade aus.",
  "Tragen Sie Kleidung, die sich vom hellen Hintergrund abhebt.",
  "Nutzen Sie Tageslicht oder eine gleichmäßige, weiche Innenraumbeleuchtung.",
  "Verwenden Sie eine Aufnahme, die nicht älter als sechs Monate ist.",
];

const dontList = [
  "Tragen Sie keine Brille, keine Sonnenbrille und keine Kopfbedeckung.",
  "Vermeiden Sie Schatten im Gesicht und auf dem Hintergrund.",
  "Lächeln Sie nicht und öffnen Sie den Mund nicht.",
  "Bearbeiten Sie das Foto nicht nachträglich mit Filtern.",
  "Reichen Sie kein unscharfes oder stark komprimiertes Foto ein.",
];

const useCases = [
  {
    title: "Reisepass",
    desc: "Das Foto erfüllt die Vorgaben der Bundesdruckerei für den biometrischen Reisepass und wird ohne Rückfragen angenommen.",
  },
  {
    title: "Personalausweis",
    desc: "Reisepass und Personalausweis folgen derselben ICAO-Norm. Sie nutzen dasselbe Foto also für beide Dokumente.",
  },
  {
    title: "ePass und Visum",
    desc: "Auch der ePass sowie viele Visa-Anträge im Ausland verlangen dieselben internationalen biometrischen Standards.",
  },
  {
    title: "Baby- und Kinderpass",
    desc: "Die KI erkennt Babygesichter zuverlässig. Bei Kindern bis fünf Jahren prüfen Behörden Blick und Mimik zudem milder.",
  },
];

const benefits = [
  "Die Bildverarbeitung folgt der aktuellen ICAO-Norm 9303.",
  "Der Hintergrund wechselt automatisch zu einheitlichem Hellgrau.",
  "Die KI misst die Gesichtshöhe exakt und schneidet auf 35 × 45 mm zu.",
  "Belichtung, Schärfe und Kontrast werden automatisch korrigiert.",
  "Sie laden das Ergebnis sofort als JPEG oder druckfertiges PDF herunter.",
  "Sie bestellen wahlweise einen Druckbogen für dm, Rossmann oder CEWE.",
  "Das System speichert Ihre Fotos nach der Verarbeitung nicht.",
  "Das Tool eignet sich gleichermaßen für Babys, Kinder und Erwachsene.",
];

const stats = [
  { val: "35×45 mm", label: "Amtliche Passbildgröße in Deutschland" },
  { val: "< 30 Sek.", label: "Von der Aufnahme bis zum fertigen Foto" },
  { val: "ICAO 9303", label: "Zugrunde liegende internationale Norm" },
  { val: "0", label: "Gespeicherte Fotos nach der Verarbeitung" },
];

const faqs = [
  {
    q: "Was ist ein biometrisches Passbild?",
    a: "Ein biometrisches Passbild ist ein Lichtbild, das den internationalen Vorgaben der ICAO-Norm 9303 entspricht und die automatische Gesichtserkennung an Ausweisdokumenten mit Chip ermöglicht. Eine Software vergleicht charakteristische Punkte im Gesicht, etwa den Augenabstand und die Kinnlinie, mit dem gespeicherten Datensatz. Die Norm schreibt deshalb exakte Maße, eine feste Gesichtshöhe, eine helle Hintergrundfarbe und eine neutrale Mimik vor.",
  },
  {
    q: "Welche Maße hat ein biometrisches Passbild in Deutschland?",
    a: "Das Foto misst 35 × 45 mm im Hochformat. Die Gesichtshöhe vom Kinn bis zum Haaransatz liegt zwischen 32 und 36 mm. Der Hintergrund ist einfarbig und vorzugsweise hellgrau, gleichmäßig ausgeleuchtet und frei von Schatten oder Farbverläufen.",
  },
  {
    q: "Muss ich mein Passbild seit 2025 digital einreichen?",
    a: "Seit dem 1. Mai 2025 nehmen viele Meldebehörden Passbilder für Reisepass und Personalausweis digital entgegen, entweder direkt vor Ort oder über einen zugelassenen Fotodienstleister. Fragen Sie bei Ihrem Bürgeramt nach, welcher Übermittlungsweg dort gilt. Ein mit PixPassport erstelltes Foto erfüllt die technischen Vorgaben in jedem Fall und lässt sich sowohl digital übermitteln als auch ausdrucken.",
  },
  {
    q: "Kann ich das Passbild auch für den Personalausweis verwenden?",
    a: "Ja, denn Reisepass und Personalausweis folgen in Deutschland derselben ICAO-Norm. Ein mit PixPassport erstelltes Foto eignet sich für beide Dokumente, Sie lassen es also nicht doppelt anfertigen.",
  },
  {
    q: "Ist ein biometrisches Passbild für ein Baby gültig?",
    a: "Ja, jedes Kind benötigt ab der Geburt ein eigenes biometrisches Passbild. Bei Kindern bis fünf Jahren prüfen Behörden nur Größe, Frontalaufnahme, Schärfe, Ausleuchtung, Hintergrund und Bildqualität. Kriterien wie Blickrichtung oder Mimik bewerten sie milder, da ein bewusstes Stillhalten in diesem Alter kaum möglich ist.",
  },
  {
    q: "Darf ich eine Brille auf dem Passbild tragen?",
    a: "Nein, seit 2017 sind Brillen auf deutschen Passbildern nicht mehr erlaubt. Diese Regel betrifft Sonnenbrillen ebenso wie Korrektionsbrillen, da Reflexionen und Tönungen die biometrische Auswertung des Gesichts stören. Sie gilt für Reisepass, Personalausweis und ePass gleichermaßen.",
  },
  {
    q: "Wie lange ist ein biometrisches Passbild gültig?",
    a: "Behörden akzeptieren ein Foto, solange es Ihr aktuelles Erscheinungsbild zeigt und nicht älter als sechs Monate ist. Da PixPassport das Bild digital erstellt, laden Sie es jederzeit erneut herunter oder erstellen in Sekunden ein neues, aktuelles Passbild.",
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
      name: "Biometrisches Passbild online erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassport",
        url: "https://www.pixpassport.com/de",
      },
      areaServed: "DE",
      serviceType: "Biometric Passport Photo Generator",
    },
  ],
};

/* ─── Page ─── */
export default function BiometrischesPassbildPage() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-white border-b border-slate-200">
        {/* Gov-style top accent bar */}
        <div className="h-1 bg-lime-700 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── TEXT COLUMN ── */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded px-3 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-lime-600 inline-block" />
                <span className="text-xs font-semibold text-lime-800 tracking-wide uppercase">
                  ICAO-konform · Nach Bundesdruckerei-Vorgabe
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                Biometrisches Passbild online erstellen
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-normal mb-5 leading-snug">
                Fertig für Reisepass und Personalausweis in 30 Sekunden
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Die KI prüft Größe, Gesichtshöhe, Hintergrund und Belichtung nach den
                Vorgaben der Bundesdruckerei und der ICAO-Norm 9303 — automatisch,
                ohne Fototermin und ohne Fotostudio.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Passbild jetzt erstellen <ArrowRight />
                </Link>
                <Link
                  href="#anforderungen"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Alle Anforderungen ansehen
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} />
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  4.9 · Empfohlen von über 17.000 Nutzern
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {trustBadges.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── IMAGE COLUMN ── */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Beispielergebnis
              </div>

              <div
                className="relative rounded overflow-hidden border border-slate-200"
                style={{ width: "100%", maxWidth: "380px" }}
              >
                <Image
                  src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1783080868/Norway-passport-size-photo_iq6eep.jpg"
                  alt="Beispiel eines biometrischen Passbilds für Reisepass und Personalausweis nach ICAO-Norm"
                  width={380}
                  height={380}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div
                  className="absolute bottom-3 right-3 bg-lime-700 text-white text-xs font-semibold px-2.5 py-1 rounded"
                >
                  Geprüft ✓
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center max-w-xs">
                35 × 45 mm · Hellgrauer Hintergrund · Sofort druckfertig
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ WAS IST EIN BIOMETRISCHES PASSBILD ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Was ist ein biometrisches Passbild?
          </h2>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ein biometrisches Passbild unterscheidet sich deutlich von einem gewöhnlichen
            Porträtfoto. Es folgt der internationalen ICAO-Norm 9303 und ermöglicht dadurch
            die automatische Gesichtserkennung an modernen Ausweisdokumenten mit
            elektronischem Chip.
          </p>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            In Deutschland gelten diese Vorgaben für alle hoheitlichen Dokumente: Reisepass,
            Personalausweis und ePass. Die Bundesdruckerei und das Auswärtige Amt
            veröffentlichen konkrete Maßtabellen, an denen sich Behörden bei der Annahme
            eines Fotos strikt orientieren. Schon kleine Abweichungen, etwa ein zu dunkler
            Hintergrund oder eine falsche Gesichtshöhe, führen häufig zur Ablehnung.
          </p>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Seit dem 1. Mai 2025 verändert sich zusätzlich der Übermittlungsweg: Viele
            Meldebehörden nehmen Passbilder nicht mehr nur als Papierabzug an, sondern
            verlangen eine digitale Aufnahme vor Ort oder eine digitale Übermittlung durch
            einen zugelassenen Fotodienstleister. Klären Sie den genauen Ablauf am besten
            direkt mit Ihrem Bürgeramt, denn die Umsetzung unterscheidet sich von Kommune
            zu Kommune.
          </p>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            PixPassport übernimmt die technische Prüfung unabhängig vom Übermittlungsweg.
            Die KI analysiert Bildgröße, Gesichtshöhe, Kopfposition, Belichtung,
            Hintergrundfarbe und Schärfe und korrigiert Abweichungen in Echtzeit. Sie
            benötigen weder ein Fotostudio noch einen Termin, ein gewöhnliches
            Smartphone-Foto reicht als Ausgangspunkt vollkommen aus. Das Ergebnis laden Sie
            anschließend herunter und reichen es bei der Behörde oder Ihrem
            Fotodienstleister ein.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">So funktioniert es</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Biometrisches Passbild in drei Schritten
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Sie benötigen kein Fotostudio. Der gesamte Ablauf läuft online, direkt am
              Smartphone oder Computer.
            </p>
          </div>

          <ol className="grid list-none gap-6 p-0 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-600 text-lg font-black text-white">
                  {s.n}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════ ANFORDERUNGEN TABELLE ══════════════ */}
      <section id="anforderungen" className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">Offizielle Vorgaben</p>
            <h2 className="mb-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Anforderungen an das biometrische Passbild
            </h2>
            <p className="max-w-2xl leading-relaxed text-slate-500">
              Diese Kriterien entsprechen den aktuellen Vorgaben der Bundesdruckerei und der
              ICAO-Norm 9303. PixPassport prüft jeden dieser Punkte automatisch, bevor Sie
              Ihr Foto herunterladen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th scope="col" className="w-1/4 px-5 py-4 font-bold text-slate-700">Kriterium</th>
                  <th scope="col" className="w-1/3 px-5 py-4 font-bold text-slate-700">Vorschrift</th>
                  <th scope="col" className="px-5 py-4 font-bold text-slate-700">Hinweis</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr
                    key={s.label}
                    className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">{s.label}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-md bg-lime-100 px-2.5 py-0.5 text-xs font-semibold text-lime-700">
                        {s.value}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════ DO / DON'T ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">Checkliste</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Das gehört auf ein gutes Passbild
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-100">
                  <Check className="h-4 w-4 text-lime-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-100">
                      <Check className="h-3 w-3 text-lime-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
                  <X />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <X />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ ANWENDUNGSFÄLLE ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">Einsatzbereiche</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Für diese Dokumente nutzen Sie das Foto
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Ein biometrisches Passbild von PixPassport gilt für mehrere amtliche Dokumente
              gleichzeitig.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-2 font-bold text-slate-900">{u.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VORTEILE ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">Warum PixPassport</p>
            <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Biometrisches Passbild ohne Fotostudio
            </h2>
            <p className="mb-6 leading-relaxed text-slate-500">
              Ein klassisches Passfoto beim Fotografen kostet Zeit, einen Termin und meist
              zwischen 8 und 15 Euro. PixPassport ersetzt diesen Weg durch eine
              automatisierte Lösung, die alle behördlichen Anforderungen zuverlässig
              erfüllt, bequem von zu Hause aus.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {benefits.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-100">
                    <Check className="h-3 w-3 text-lime-600" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-lg bg-lime-600 px-7 py-3.5 font-bold text-white transition-colors hover:bg-lime-700"
            >
              Jetzt Passbild erstellen <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 rounded-2xl border-2 border-lime-200 bg-lime-100 p-8 sm:p-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-black leading-none text-lime-700 sm:text-3xl">{s.val}</span>
                <span className="text-xs leading-tight text-slate-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-600">Häufige Fragen</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              FAQ zum biometrischen Passbild
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Alles Wichtige zu Maßen, Anforderungen und der Verwendung Ihres biometrischen
              Passbildes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
                  <span className="shrink-0 text-2xl font-light text-lime-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t-2 border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500 sm:px-6">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}