import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Biometrisches Passbild Online Erstellen | ICAO-konform | PixPassport",
  description:
    "Biometrisches Passbild nach offiziellen ICAO- und Bundesdruckerei-Vorgaben online erstellen. Für Reisepass, Personalausweis & ePass. Automatischer Zuschnitt, Hintergrund & Prüfung – fertig in 30 Sekunden.",
  keywords: [
    "biometrisches passbild",
    "passbild online erstellen",
    "biometrisches foto",
    "passfoto online",

  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/biometrisches-passbild",
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Icons ─── */
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const Check = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const X = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Machen Sie ein aktuelles Selfie oder laden Sie ein vorhandenes Porträtfoto hoch. Smartphone-Qualität genügt vollständig.",
  },
  {
    n: "2",
    title: "Automatische KI-Prüfung",
    desc: "Unsere KI überprüft Ausleuchtung, Kopfgröße, Gesichtsausdruck und Hintergrundfarbe nach ICAO-Norm – und korrigiert automatisch.",
  },
  {
    n: "3",
    title: "Download & Druck",
    desc: "Laden Sie das fertige biometrische Passbild herunter oder bestellen Sie den Druckbogen für dm, Rossmann oder CEWE.",
  },
];

const specs = [
  { label: "Format", value: "35 × 45 mm", detail: "Hochformat, gemäß ISO/IEC 19794-5" },
  { label: "Auflösung", value: "min. 600 dpi", detail: "Mindestens 600 × 800 Pixel" },
  { label: "Hintergrund", value: "Hellgrau oder Weiß", detail: "Einheitlich, keine Muster oder Schatten" },
  { label: "Kopfgröße", value: "27–36 mm", detail: "Scheitel bis Kinn, ca. 70–80 % des Bildausschnitts" },
  { label: "Augen", value: "Geöffnet, deutlich sichtbar", detail: "Keine Sonnenbrille, Tönungsbrille nicht erlaubt" },
  { label: "Gesichtsausdruck", value: "Neutral", detail: "Mund geschlossen, keine sichtbaren Zähne" },
  { label: "Belichtung", value: "Gleichmäßig", detail: "Kein Blitzlicht direkt auf das Gesicht, kein Gegenlicht" },
  { label: "Alter des Fotos", value: "Max. 6 Monate", detail: "Muss aktuelles Erscheinungsbild zeigen" },
];

const doList = [
  "Neutrale Mimik – entspannt, Mund geschlossen",
  "Gleichmäßige Frontalansicht ohne Kopfneigung",
  "Kleidung in Kontrastfarbe zum hellen Hintergrund",
  "Natürliches Tageslicht oder gleichmäßige Innenbeleuchtung",
  "Aktuelle Aufnahme (nicht älter als 6 Monate)",
];

const dontList = [
  "Sonnenbrillen, getönte Gläser oder Kopfbedeckungen (außer aus religiösen Gründen)",
  "Starke Schatten im Gesicht oder auf dem Hintergrund",
  "Lächeln oder geöffneter Mund",
  "Filter oder Bildbearbeitungseffekte",
  "Unscharfe oder pixelige Aufnahmen",
];

const useCases = [
  {
    title: "Reisepass",
    desc: "PixPassport erfüllt alle Vorgaben der Bundesdruckerei für den biometrischen Reisepass und liefert ein Foto, das Behörden ohne Rückfragen akzeptieren.",
  },
  {
    title: "Personalausweis",
    desc: "Da dieselbe ICAO-Norm gilt, eignet sich dasselbe Passbild auch für den neuen Personalausweis mit elektronischem Chip.",
  },
  {
    title: "ePass & Visum",
    desc: "Auch für den ePass sowie viele Visa-Anträge im Ausland erfüllt das Foto die internationalen biometrischen Standards.",
  },
  {
    title: "Baby- und Kinderpass",
    desc: "Unser System erkennt Babygesichter zuverlässig und passt Zuschnitt sowie Beurteilung an die besonderen Anforderungen für Kleinkinder an.",
  },
];

const faqs = [
  {
    q: "Was ist ein biometrisches Passbild?",
    a: "Ein biometrisches Passbild ist ein Lichtbild, das den internationalen ICAO-9303-Normen entspricht. Es dient als maschinenlesbare Identifikation in Reisepässen, Personalausweisen und ePässen. Software zur Gesichtserkennung vergleicht charakteristische Punkte im Gesicht, etwa den Abstand der Augen oder die Kinnlinie, mit dem gespeicherten Chip-Datensatz. Damit dieser Abgleich zuverlässig funktioniert, schreibt die Norm exakte Maße, Kopfgröße, Hintergrundfarbe und einen neutralen Gesichtsausdruck vor.",
  },
  {
    q: "Welche Maße hat ein biometrisches Passbild in Deutschland?",
    a: "In Deutschland muss ein biometrisches Passbild das Format 35 × 45 mm aufweisen. Die Kopfgröße, gemessen vom Scheitel bis zum Kinn, soll zwischen 27 und 36 mm liegen und etwa 70 bis 80 Prozent der Bildhöhe einnehmen. Der Hintergrund muss hell, also weiß oder hellgrau, sowie gleichmäßig ausgeleuchtet sein, ohne Schatten oder Farbverläufe.",
  },
  {
    q: "Kann ich das Passbild auch für den Personalausweis verwenden?",
    a: "Ja, die Anforderungen für Reisepass und Personalausweis sind in Deutschland identisch, da beide Dokumente derselben ICAO-Norm folgen. Ein mit PixPassport erstelltes biometrisches Foto eignet sich daher gleichermaßen für beide Dokumente und muss nicht doppelt erstellt werden.",
  },
  {
    q: "Ist ein biometrisches Passbild für ein Baby gültig?",
    a: "Ja, auch Babys benötigen seit der Geburt ein eigenes biometrisches Passbild. Das Foto muss grundsätzlich dieselben Vorgaben erfüllen, etwa hinsichtlich Hintergrund und Bildgröße. Bei Kleinstkindern werden Kriterien wie Blickrichtung oder neutraler Ausdruck jedoch pragmatischer beurteilt, da ein bewusstes Stillhalten kaum möglich ist.",
  },
  {
    q: "Darf ich eine Brille auf dem Passbild tragen?",
    a: "Nein, seit 2017 sind Brillen auf deutschen Passbildern grundsätzlich nicht mehr erlaubt. Diese Regel gilt unabhängig davon, ob es sich um eine Sonnenbrille oder eine Korrektionsbrille handelt, da Reflexionen und Tönungen die biometrische Auswertung des Gesichts stören können. Die Vorgabe betrifft Reisepass, Personalausweis und ePass gleichermaßen.",
  },
  {
    q: "Wie lange ist ein biometrisches Passbild gültig?",
    a: "Behörden akzeptieren Passbilder grundsätzlich, wenn sie nicht älter als sechs Monate sind und das aktuelle Erscheinungsbild der Person korrekt wiedergeben. Da PixPassport das Bild rein digital erstellt, können Sie es bei Bedarf jederzeit erneut herunterladen oder ein neues, aktuelles Foto in wenigen Sekunden anfertigen.",
  },
];

/* ─── Page ─── */
export default function BiometrischesPassbildPage() {
  return (
    <main className="bg-white text-slate-900  antialiased">

      {/* ══════════════ HERO ══════════════ */}
      <section className="  pt-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            ✅ ICAO-konform · Bundesdruckerei-geprüft
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.07] text-slate-900 max-w-3xl">
            <span className="text-lime-600">Biometrisches Passbild</span>{" "}
            Online Erstellen
          </h1>

          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            Erstellen Sie ein offizielles Passbild für <strong>Reisepass, Personalausweis und ePass</strong> nach
            den Vorgaben der Bundesdruckerei und der ICAO-Norm. Unsere KI übernimmt Zuschnitt,
            Hintergrundkorrektur und Qualitätsprüfung – fertig in unter 30 Sekunden.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-lime-200 transition-colors"
            >
              Biometrisches Passbild erstellen <ArrowRight />
            </Link>
            <Link
              href="#anforderungen"
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-base px-6 py-4 rounded-xl bg-white transition-colors"
            >
              Alle Anforderungen ansehen
            </Link>
          </div>

          <div className="w-full mt-4 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Beispiele biometrisches Passbild für Reisepass und Personalausweis nach ICAO-Norm"
              width={1120}
              height={480}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ WAS IST EIN BIOMETRISCHES PASSBILD ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-slate-900">
            Was ist ein biometrisches Passbild?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Ein <strong>biometrisches Passbild</strong> unterscheidet sich deutlich von einem
            gewöhnlichen Porträtfoto. Es folgt den internationalen Normen der ICAO
            (International Civil Aviation Organization, Standard 9303) und ermöglicht
            dadurch die automatische Gesichtserkennung in modernen Ausweisdokumenten mit
            elektronischem Chip.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            In Deutschland gelten diese Vorgaben für alle hoheitlichen Dokumente –
            Reisepass, Personalausweis und ePass. Die Bundesdruckerei veröffentlicht
            konkrete Maßtabellen und Prüfkriterien, an denen sich Behörden bei der
            Annahme von Passbildern strikt orientieren. Schon kleine Abweichungen,
            etwa ein zu dunkler Hintergrund oder eine leicht geneigte Kopfhaltung,
            führen häufig zur Ablehnung des Fotos.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Genau hier setzt PixPassport an. Unsere Plattform übernimmt die gesamte
            technische Prüfung automatisch: Bildgröße, Kopfposition, Belichtung,
            Hintergrundfarbe und Bildschärfe werden per KI analysiert und in Echtzeit
            korrigiert. Sie benötigen weder ein Fotostudio noch einen Termin – ein
            normales Smartphone-Foto reicht als Ausgangspunkt vollkommen aus.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Das Ergebnis ist ein druckfertiges, behördlich anerkanntes Foto, das Sie
            sofort herunterladen und bei der zuständigen Meldebehörde, dem Bürgeramt
            oder direkt online bei der Passbeantragung einreichen können.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">So funktioniert es</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Biometrisches Passbild in 3 Schritten
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Kein Fotostudio nötig. Alles online, direkt am Smartphone oder Computer.
            </p>
          </div>

          <ol className="grid sm:grid-cols-3 gap-6 list-none p-0">
            {steps.map((s) => (
              <li key={s.n} className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-xl bg-lime-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-lime-200">
                  {s.n}
                </span>
                <h3 className="font-bold text-lg text-slate-900">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════ ANFORDERUNGEN TABELLE ══════════════ */}
      <section id="anforderungen" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Offizielle Vorgaben</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Anforderungen an das biometrische Passbild
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Die folgenden Kriterien entsprechen den aktuellen Vorgaben der Bundesdruckerei
              und der ICAO-Norm 9303. PixPassport prüft jeden dieser Punkte automatisch,
              bevor Sie Ihr Foto herunterladen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/4">Kriterium</th>
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Vorschrift</th>
                  <th className="px-5 py-4 font-bold text-slate-700">Hinweis</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr
                    key={s.label}
                    className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">{s.label}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block bg-lime-50 text-lime-700 font-semibold px-2.5 py-0.5 rounded-md text-xs">
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
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Checkliste</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Dos &amp; Don&apos;ts für Ihr Passbild
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* DO */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-lime-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-lime-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                  <X />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Einsatzbereiche</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Für welche Dokumente Sie das Foto nutzen können
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Ein biometrisches Passbild von PixPassport gilt für mehrere amtliche Dokumente gleichzeitig.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{u.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VORTEILE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Warum PixPassport</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Biometrisches Passbild ohne Fotostudio
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Ein klassisches Passfoto beim Fotografen kostet Zeit, einen Termin und meist
              zwischen 8 und 15 Euro. PixPassport ersetzt diesen Weg durch eine vollständig
              automatisierte Lösung, die sämtliche behördlichen Anforderungen zuverlässig
              erfüllt – bequem von zu Hause aus.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "ICAO-konforme Bildverarbeitung nach aktueller Norm",
                "Automatischer Hintergrundwechsel auf Weiß/Hellgrau",
                "KI-gestützter Zuschnitt auf exakt 35 × 45 mm",
                "Belichtungs- und Kontrastkorrektur inklusive",
                "Sofort-Download als JPEG oder druckfertiges PDF",
                "Druckbogen für dm, Rossmann und CEWE verfügbar",
                "100 % datenschutzkonform – keine Speicherung Ihrer Fotos",
                "Geeignet für Babys, Kinder und Erwachsene",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700 text-sm leading-snug">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-lime-600" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-lime-200 transition-colors"
            >
              Jetzt Passbild erstellen <ArrowRight />
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-2xl p-10 grid grid-cols-2 gap-8">
            {[
              { val: "35×45 mm", label: "Offizielle Passbild-Größe (DE)" },
              { val: "< 30 Sek", label: "Bis zum fertigen Foto" },
              { val: "ICAO 9303", label: "Internationale Norm" },
              { val: "100 %", label: "Datenschutzkonform" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-lime-700 leading-none">{s.val}</span>
                <span className="text-slate-600 text-xs leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Häufige Fragen</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              FAQ – Biometrisches Passbild
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Alles Wichtige zu Maßen, Anforderungen und der Verwendung Ihres biometrischen Passbildes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-slate-900 text-base pr-4">{f.q}</h3>
                  <span className="text-lime-600 text-2xl font-light shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="py-20 px-4 bg-lime-600">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Jetzt biometrisches Passbild erstellen
          </h2>
          <p className="text-lime-100 text-lg max-w-xl leading-relaxed">
            Kein Termin, kein Fotostudio. Laden Sie einfach ein Foto hoch und erhalten Sie
            in Sekunden ein ICAO-konformes Passbild für Reisepass oder Personalausweis.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-lime-700 hover:bg-lime-50 font-bold text-lg px-9 py-4 rounded-xl shadow-lg transition-colors"
          >
            Passbild jetzt hochladen <ArrowRight />
          </Link>
        </div>
      </section>

    </main>
  );
}