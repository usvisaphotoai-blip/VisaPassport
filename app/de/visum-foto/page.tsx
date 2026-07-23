import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visum Foto Online Erstellen | USA, China, Indien & mehr | PixPassport",
  description:
    "Erstellen Sie Ihr Visum-Foto online für über 50 Länder (USA, China, Indien, Vietnam etc.). Automatische Anpassung an Größe, Hintergrund und Belichtung – in unter 2 Minuten.",
  keywords: [
    "visum foto",
    "usa visum foto",
    "china visum foto",
    "ds-160 foto",
    "visa picture online",
 
  ],
  alternates: { canonical: "https://www.pixpassport.com/de/visum-foto" },
};

const ctaHref = "/de/passbild-online";

const ArrowRight = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-lime-600 shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const countries = [
  { flag: "🇺🇸", name: "USA (DS-160)", size: "2×2 Zoll (51×51 mm)" },
  { flag: "🇨🇳", name: "China", size: "33×48 mm" },
  { flag: "🇮🇳", name: "Indien", size: "51×51 mm" },
  { flag: "🇻🇳", name: "Vietnam", size: "40×60 mm" },
  { flag: "🇷🇺", name: "Russland", size: "35×45 mm" },
  { flag: "🇸🇦", name: "Saudi-Arabien", size: "4×6 cm" },
  { flag: "🇧🇷", name: "Brasilien", size: "3×4 cm" },
  { flag: "🇦🇺", name: "Australien", size: "35×45 mm" },
];

const steps = [
  {
    num: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch – Smartphone-Qualität reicht vollständig aus.",
  },
  {
    num: "2",
    title: "Land & Visumsart wählen",
    desc: "Wählen Sie das Zielland und den Verwendungszweck. Unsere KI passt alle Maße automatisch an.",
  },
  {
    num: "3",
    title: "Foto prüfen & herunterladen",
    desc: "Das fertige, behördenkonforme Bild steht sofort zum Download und zum Drucken bereit.",
  },
];

const features = [
  "Automatischer Hintergrundwechsel auf Weiß oder Hellgrau",
  "Zuschnitt und Skalierung nach offiziellen Ländervorgaben",
  "KI-gestützte Belichtungs- und Kontrastkorrektur",
  "ICAO-konforme Gesichtserkennung und Ausrichtung",
  "Sofort-Download als JPEG oder druckfertiges PDF",
  "100 % datenschutzkonform – keine Speicherung Ihrer Fotos",
];

const faqs = [
  {
    q: "Welche Größe brauche ich für das USA-Visum (DS-160)?",
    a: "Für das US-amerikanische DS-160-Formular wird ein quadratisches Foto im Format 2×2 Zoll (51×51 mm) mit weißem Hintergrund benötigt. PixPassport erstellt dieses Format vollautomatisch.",
  },
  {
    q: "Funktioniert das auch für das China-Visum?",
    a: "Ja. Das chinesische Visum erfordert ein Foto im Format 33×48 mm mit weißem oder hellblauem Hintergrund. Unsere Software passt Größe, Hintergrundfarbe und Belichtung entsprechend an.",
  },
  {
    q: "Wie aktuell muss das Foto sein?",
    a: "Die meisten Botschaften verlangen ein Foto, das nicht älter als sechs Monate ist und Ihr aktuelles Erscheinungsbild widerspiegelt. Brillen sind in der Regel nicht mehr erlaubt.",
  },
  {
    q: "Kann ich das Foto direkt für den Online-Antrag verwenden?",
    a: "Ja. Sie erhalten eine digitale Datei, die Sie direkt in Online-Formulare wie DS-160, India e-Visa oder andere Portale hochladen können.",
  },
];

export default function VisumFotoPage() {
  return (
    <main className="bg-white text-slate-900 ">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-lime-50 to-white pt-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            ✅ Behördenkonform für 50+ Länder
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.07] text-slate-900">
            Visum Foto{" "}
            <span className="text-lime-600">Online Erstellen</span>
          </h1>

          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            Ob 2×2 Zoll für die USA (DS-160), 33×48 mm für China oder
            spezifische Maße für Indien, Vietnam und Russland – PixPassport
            passt Ihr Foto automatisch an die offiziellen Vorgaben von über 50
            Ländern an. Fertig in unter 2 Minuten.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-lime-200 transition-colors duration-150"
            >
              Jetzt Visum Foto erstellen <ArrowRight />
            </Link>
            <Link
              href="#laender"
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-base px-6 py-4 rounded-xl bg-white transition-colors duration-150"
            >
              Alle Länder ansehen
            </Link>
          </div>

          {/* Hero image */}
          <div className="w-full mt-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Visum Foto online erstellen – behördenkonformes Passbild für über 50 Länder"
              width={1120}
              height={480}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-semibold text-sm uppercase tracking-widest mb-2">
              So einfach geht&apos;s
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Visum Foto in 3 Schritten
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Kein Fotostudio, keine Wartezeit. Alles online – direkt am
              Smartphone oder Computer.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-3"
              >
                <span className="w-10 h-10 rounded-xl bg-lime-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-lime-200">
                  {s.num}
                </span>
                <h3 className="font-bold text-lg text-slate-900">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTRY TABLE ── */}
      <section id="laender" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Länderübersicht
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Visum Foto Maße nach Land
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Jedes Land hat eigene Vorgaben für Fotogröße, Hintergrundfarbe und
              Belichtung. Wir kennen sie alle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries.map((c) => (
              <div
                key={c.name}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2 hover:border-lime-300 hover:shadow-sm transition-all"
              >
                <span className="text-3xl">{c.flag}</span>
                <p className="font-bold text-slate-900">{c.name}</p>
                <p className="text-sm text-slate-500">{c.size}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-slate-400 text-sm">
            … und über 42 weitere Länder. Das richtige Format wird automatisch
            erkannt.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lime-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Warum PixPassport
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Alles, was Ihr Visum Foto braucht
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Unsere KI prüft Ihr Foto nach denselben Kriterien, die Botschaften
              und Konsulate weltweit anwenden – und korrigiert automatisch, was
              nicht passt. Das Ergebnis ist ein Foto, das beim ersten Versuch
              akzeptiert wird.
            </p>

            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li key={f} className="flex gap-3 text-slate-700 text-sm leading-snug">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 mt-8 bg-lime-600 hover:bg-lime-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-lime-200 transition-colors text-base"
            >
              Foto jetzt hochladen <ArrowRight />
            </Link>
          </div>

          {/* Visual stat card */}
          <div className="bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-2xl p-10 flex flex-col gap-6">
            {[
              { val: "50+", label: "unterstützte Länder" },
              { val: "< 2 Min", label: "bis zum fertigen Foto" },
              { val: "ICAO", label: "konforme Verarbeitung" },
              { val: "100 %", label: "datenschutzkonform" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-4xl font-black text-lime-700 leading-none">
                  {s.val}
                </span>
                <span className="text-slate-600 text-sm mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Häufige Fragen
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              FAQ – Visum Foto
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 bg-lime-600">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Visum Foto jetzt online erstellen
          </h2>
          <p className="text-lime-100 text-lg max-w-xl leading-relaxed">
            Kein Termin. Kein Fotostudio. Einfach Foto hochladen und in
            Sekunden ein behördenkonformes Bild für Ihr Visum erhalten.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-lime-700 hover:bg-lime-50 font-bold text-lg px-9 py-4 rounded-xl shadow-lg transition-colors"
          >
            Jetzt starten <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}