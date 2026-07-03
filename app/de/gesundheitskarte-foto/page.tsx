import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Foto für Gesundheitskarte (eGK) Online Erstellen | PixPassport",
  description:
    "Foto für die elektronische Gesundheitskarte (eGK) online erstellen. 35×45 mm, frontal, für TK, AOK, Barmer, DAK & alle gesetzlichen Krankenkassen. Direkt hochladen – fertig in 30 Sekunden.",
  keywords: [
    "gesundheitskarte foto",
    "egk foto",
    "krankenkasse foto",
    "aok foto hochladen",
 
  ],
  alternates: { canonical: "https://www.pixpassport.com/de/gesundheitskarte-foto" },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-health-insurance";

/* ─── Icons ─── */
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const Check = ({ cls = "w-3.5 h-3.5 text-lime-600" }: { cls?: string }) => (
  <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const Cross = () => (
  <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Ein Smartphone genügt – kein Fotostudio, kein Termin.",
  },
  {
    n: "2",
    title: "Automatische Anpassung",
    desc: "Unsere KI schneidet das Bild auf 35×45 mm zu, korrigiert den Hintergrund und prüft Belichtung und Kopfposition.",
  },
  {
    n: "3",
    title: "Download & direkt hochladen",
    desc: "Laden Sie das fertige Foto als JPEG herunter und reichen Sie es direkt im Online-Portal Ihrer Krankenkasse ein.",
  },
];

const specs = [
  {
    krit: "Format",
    vorschrift: "35 × 45 mm",
    hinweis: "Hochformat, ohne Rand – entspricht dem gängigen Passfoto-Standard (AOK)",
  },
  {
    krit: "Kopfgröße",
    vorschrift: "70–80 % der Bildfläche",
    hinweis: "Kopf mittig, vollständig sichtbar von Scheitel bis Kinn",
  },
  {
    krit: "Blickrichtung",
    vorschrift: "Frontal, gerade",
    hinweis: "Direkt in die Kamera, keine Seitenansicht",
  },
  {
    krit: "Hintergrund",
    vorschrift: "Neutral, hell",
    hinweis: "Kein Muster, keine Schatten, klarer Kontrast zur Kleidung",
  },
  {
    krit: "Augen",
    vorschrift: "Geöffnet, sichtbar",
    hinweis: "Auch bei Brillenträgern müssen die Augen klar erkennbar sein (AOK)",
  },
  {
    krit: "Dateiformat",
    vorschrift: "JPEG oder PNG",
    hinweis: "Max. 5 MB beim digitalen Upload (VIACTIV); die meisten Kassen akzeptieren JPEG",
  },
  {
    krit: "Kopfbedeckung",
    vorschrift: "Grundsätzlich verboten",
    hinweis: "Ausnahme: religiöse Gründe – Gesicht muss vollständig sichtbar bleiben (AOK)",
  },
  {
    krit: "Alter des Fotos",
    vorschrift: "Aktuell",
    hinweis: "Foto wird nach max. 10 Jahren neu angefordert (§ 291 SGB V / AOK)",
  },
];

const kassen = [
  { name: "AOK", portal: "Meine AOK", pfad: "Gesundheitskarte → Foto hochladen" },
  { name: "Techniker Krankenkasse (TK)", portal: "Meine TK", pfad: "Versichertenkarte → Foto hinzufügen" },
  { name: "Barmer", portal: "Barmer-App / Online-Portal", pfad: "Meine Gesundheitskarte → Foto einreichen" },
  { name: "DAK-Gesundheit", portal: "Mein DAK", pfad: "eGK → Bild hochladen" },
  { name: "IKK / BKK / KKH / hkk", portal: "Jeweiliges Online-Portal", pfad: "Versichertenbereich → Gesundheitskarte" },
  { name: "Alle anderen GKV", portal: "Versichertenportal", pfad: "Benachrichtigungsschreiben beachten" },
];

const doList = [
  "Frontale Aufnahme, Kopf gerade und mittig",
  "Neutraler Gesichtsausdruck, Mund geschlossen",
  "Heller, einfarbiger Hintergrund ohne Muster",
  "Augen geöffnet und klar erkennbar",
  "Gleichmäßige Beleuchtung, kein Gegenlicht",
  "Aktuelles Foto – sollte Ihr heutiges Erscheinungsbild zeigen",
];

const dontList = [
  "Sonnenbrillen oder stark getönte Gläser",
  "Mützen, Caps oder Hüte (außer religiöse Kopfbedeckungen)",
  "Starke Schatten im Gesicht oder auf dem Hintergrund",
  "Filter, Weichzeichner oder Bildbearbeitungseffekte",
  "Gemusterter Hintergrund oder andere Personen im Bild",
  "Veraltete Aufnahmen, die Ihr Aussehen nicht mehr widerspiegeln",
];

const faqs = [
  {
    q: "Welche Anforderungen hat das Foto für die Gesundheitskarte?",
    a: "Laut AOK muss das Bild für die elektronische Gesundheitskarte dem gängigen Passfoto-Format entsprechen: 35×45 mm, Frontaufnahme, Kopf 70–80 % der Bildfläche, neutraler Hintergrund, Augen geöffnet. Streng biometrische Anforderungen wie beim Reisepass sind nicht erforderlich.",
  },
  {
    q: "Ist das Foto für die Gesundheitskarte Pflicht?",
    a: "Ja. Laut § 291 SGB V ist die elektronische Gesundheitskarte mit einem Lichtbild des Versicherten auszustatten. Das Foto dient der Identifizierung beim Arztbesuch und verhindert Kartenmissbrauch. Ab dem 15. Geburtstag ist ein Foto verpflichtend.",
  },
  {
    q: "Wie reiche ich das Foto bei meiner Krankenkasse ein?",
    a: "Die meisten gesetzlichen Krankenkassen (AOK, TK, Barmer, DAK u. a.) bieten einen digitalen Upload im Online-Kundenportal oder per App an. Sie erhalten von Ihrer Kasse ein Schreiben mit einer Auftragsnummer, sobald ein neues Foto benötigt wird. Alternativ ist auch der Postweg möglich.",
  },
  {
    q: "Wie oft muss ich ein neues Foto einreichen?",
    a: "Krankenkassen sind gesetzlich verpflichtet, das Lichtbild regelmäßig zu aktualisieren. Gemäß AOK und Barmer darf ein Foto maximal 10 Jahre gespeichert werden. Sie erhalten automatisch Post, wenn ein neues Bild benötigt wird.",
  },
  {
    q: "Darf mein Kind eine Gesundheitskarte ohne Foto haben?",
    a: "Ja. Kinder unter 15 Jahren sind von der Fotopflicht befreit. Erst mit Vollendung des 15. Lebensjahres wird ein aktuelles Foto für die eGK verpflichtend – Sie erhalten dann automatisch eine Benachrichtigung von Ihrer Krankenkasse (Barmer, AOK etc.).",
  },
  {
    q: "Welches Dateiformat akzeptieren die Krankenkassen?",
    a: "Die meisten Kassen akzeptieren JPEG- und PNG-Dateien beim digitalen Upload. VIACTIV gibt eine maximale Dateigröße von 5 MB vor. PixPassport liefert das fertige Foto in einem universell kompatiblen JPEG-Format – direkt bereit für den Upload.",
  },
  {
    q: "Kostet die neue Gesundheitskarte etwas?",
    a: "Die Herstellung der Karte ist für Versicherte kostenlos. Die Kosten für die Fotoaufnahme selbst tragen die Versicherten (AOK). PixPassport bietet eine günstige digitale Alternative zum Fotostudio.",
  },
];

/* ─── Page ─── */
export default function GesundheitskarteFotoPage() {
  return (
    <main className="bg-white text-slate-900 font-sans antialiased">

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-gradient-to-b from-lime-50 via-white to-white pt-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            🏥 Für TK · AOK · Barmer · DAK · alle GKV
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.07] text-slate-900 max-w-3xl">
            Foto für{" "}
            <span className="text-lime-600">Gesundheitskarte</span>{" "}
            Online Erstellen
          </h1>

          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            Erstellen Sie Ihr Foto für die <strong>elektronische Gesundheitskarte (eGK)</strong> direkt
            am Smartphone. Automatische Anpassung auf 35×45 mm, neutraler Hintergrund und
            korrekte Kopfposition – in unter 30 Sekunden, ohne Fotostudio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-lime-200 transition-colors"
            >
              Foto für eGK erstellen <ArrowRight />
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
              alt="Foto für die elektronische Gesundheitskarte online erstellen – 35x45mm, für alle gesetzlichen Krankenkassen"
              width={1120}
              height={480}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ WAS IST DIE EGK ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Warum braucht die Gesundheitskarte ein Foto?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Die <strong>elektronische Gesundheitskarte (eGK)</strong> ist seit dem 1. Oktober 2011
            der offizielle Versicherungsnachweis aller gesetzlich Versicherten in Deutschland.
            Gesetzliche Grundlage ist <strong>§ 291 SGB V</strong>, der vorschreibt, dass die
            Karte mit einem Lichtbild des Versicherten auszustatten ist.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Das Foto dient laut AOK der eindeutigen Identifizierung beim Arztbesuch und soll
            Kartenmissbrauch verhindern. Legt ein Versicherter die eGK vor, ist der Arzt
            verpflichtet, die Identität anhand von Foto, Name und Geburtsdatum zu prüfen.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Krankenkassen sind gesetzlich verpflichtet, das Foto <strong>regelmäßig zu
            aktualisieren</strong>. Fotos dürfen maximal 10 Jahre gespeichert werden – danach
            erhalten Versicherte automatisch Post mit der Aufforderung, ein neues Bild
            einzureichen. <strong>Ab dem 15. Geburtstag</strong> ist ein Foto auf der eGK
            verpflichtend.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">So einfach geht&apos;s</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Gesundheitskarte Foto in 3 Schritten
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Vom Selfie zum hochladbaren Foto für Ihre Krankenkasse – direkt am Smartphone,
              ohne Termin.
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
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Offizielle Vorgaben (AOK, Barmer, VIACTIV)</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Foto-Anforderungen für die eGK
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Die Anforderungen basieren auf den Vorgaben der gesetzlichen Krankenkassen (AOK, Barmer,
              VIACTIV) sowie § 291 SGB V. Alle Punkte werden von PixPassport automatisch
              geprüft und angepasst.
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
                  <tr key={s.krit} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{s.krit}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block bg-lime-50 text-lime-700 font-semibold px-2.5 py-0.5 rounded-md text-xs">
                        {s.vorschrift}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{s.hinweis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Hinweis: Streng biometrische Anforderungen wie beim Reisepass (ICAO 9303) sind für
            die eGK nicht erforderlich – ein gut erkennbares Frontalfoto genügt (AOK).
          </p>
        </div>
      </section>

      {/* ══════════════ KRANKENKASSE UPLOAD TABELLE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Foto einreichen</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Foto hochladen: So geht&apos;s bei Ihrer Krankenkasse
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Nach dem Download bei PixPassport können Sie das Foto direkt im Online-Portal
              Ihrer Kasse hochladen. Sie benötigen in der Regel Ihre Versichertennummer und
              die Auftragsnummer aus dem Benachrichtigungsschreiben.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Krankenkasse</th>
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Portal / App</th>
                  <th className="px-5 py-4 font-bold text-slate-700">Upload-Pfad</th>
                </tr>
              </thead>
              <tbody>
                {kassen.map((k, i) => (
                  <tr key={k.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{k.name}</td>
                    <td className="px-5 py-4 text-slate-600">{k.portal}</td>
                    <td className="px-5 py-4 text-slate-500">{k.pfad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Alternativ ist bei allen Kassen der Postweg möglich. Papierabzüge werden vor
            der Kartenproduktion digitalisiert und nach Druck datenschutzgerecht vernichtet
            (Barmer/VIACTIV). Die Karte selbst ist für Versicherte kostenlos.
          </p>
        </div>
      </section>

      {/* ══════════════ DO / DON'T ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Checkliste</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Dos &amp; Don&apos;ts für das Gesundheitskarte Foto
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center">
                  <Check cls="w-4 h-4 text-lime-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                  <Cross />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Cross />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ VORTEILE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-2">Warum PixPassport</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Gesundheitskarte Foto – ohne Aufwand
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Viele Versicherte werden unvorbereitet vom Schreiben ihrer Krankenkasse
              überrascht. PixPassport erstellt das Foto sofort, vollautomatisch und
              konform mit den Anforderungen aller gesetzlichen Krankenkassen.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Automatischer Zuschnitt auf 35×45 mm",
                "Hintergrundkorrektur auf Weiß/Hellgrau",
                "KI-Belichtungs- und Kontrastanpassung",
                "Sofort-Download als JPEG – direkt für den Upload",
                "Kompatibel mit allen GKV-Portalen (AOK, TK, Barmer, DAK …)",
                "Auch für Kinder ab 15 Jahren geeignet",
                "100 % datenschutzkonform – keine Speicherung Ihrer Fotos",
                "Alternative zum Fotostudio: schneller, günstiger, bequemer",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700 text-sm leading-snug">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center shrink-0">
                    <Check />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-lime-200 transition-colors"
            >
              Jetzt eGK Foto erstellen <ArrowRight />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-2xl p-10 grid grid-cols-2 gap-8">
            {[
              { val: "35×45 mm", label: "Offizielles Fotoformat (eGK)" },
              { val: "< 30 Sek", label: "Bis zum fertigen Upload-Foto" },
              { val: "§ 291 SGB V", label: "Gesetzliche Grundlage" },
              { val: "10 Jahre", label: "Max. Speicherdauer bei der Kasse" },
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
              FAQ – Gesundheitskarte Foto
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Antworten auf die häufigsten Fragen zum Foto für die eGK – basierend auf
              offiziellen Angaben von AOK, Barmer, VIACTIV und § 291 SGB V.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
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
            Gesundheitskarte Foto jetzt online erstellen
          </h2>
          <p className="text-lime-100 text-lg max-w-xl leading-relaxed">
            Kein Termin, kein Fotostudio. Einfach Foto hochladen und in Sekunden ein
            konformes eGK-Foto für TK, AOK, Barmer, DAK & alle gesetzlichen
            Krankenkassen erhalten.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-lime-700 hover:bg-lime-50 font-bold text-lg px-9 py-4 rounded-xl shadow-lg transition-colors"
          >
            Jetzt Foto hochladen <ArrowRight />
          </Link>
        </div>
      </section>

    </main>
  );
}