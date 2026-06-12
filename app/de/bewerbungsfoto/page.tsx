import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bewerbungsfoto Online Erstellen 2025 | Tipps & Vorschriften | PixPassport",
  description:
    "Professionelles Bewerbungsfoto online erstellen: Hintergrund wechseln, zuschneiden, optimieren. Mit offiziellen Tipps für das perfekte Lebenslauf-Foto. Ab 5,99 €.",
  keywords: [
    "bewerbungsfoto",
    "bewerbungsfoto online erstellen",
    "lebenslauf foto",
    "bewerbungsbild tipps",
    "professionelles foto bewerbung",
    "cv foto online",
    "bewerbungsfoto hintergrund",
    "bewerbungsfoto größe",
  ],
  alternates: { canonical: "https://www.pixpassport.com/de/bewerbungsfoto" },
  openGraph: {
    title: "Bewerbungsfoto Online Erstellen | PixPassport",
    description: "Professionelles Bewerbungsfoto in Sekunden. Hintergrund entfernen, zuschneiden, KI-optimiert. Ab 5,99 €.",
    url: "https://www.pixpassport.com/de/bewerbungsfoto",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
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
          acceptedAnswer: { "@type": "Answer", text: "Das klassische Format für ein Bewerbungsfoto in Deutschland ist 4,5 × 6 cm (Hochformat). Für digitale Bewerbungen wird häufig ein Seitenverhältnis von 2:3 oder 3:4 empfohlen, bei einer Auflösung von mindestens 300 dpi." },
        },
        {
          "@type": "Question",
          name: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
          acceptedAnswer: { "@type": "Answer", text: "Nein. Das Allgemeine Gleichbehandlungsgesetz (AGG) schreibt kein Pflichtfoto vor. Dennoch fügen viele Bewerber freiwillig ein professionelles Foto bei, da es in Deutschland nach wie vor weit verbreitet ist." },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
          acceptedAnswer: { "@type": "Answer", text: "Ein biometrisches Passbild (35×45 mm) folgt strengen staatlichen Normen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln. Ein Bewerbungsfoto ist freier: leichtes Lächeln erlaubt, professionelle Kleidung, freie Hintergrundwahl. PixPassport unterstützt beide Formate." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Bewerbungsfoto", item: "https://www.pixpassport.com/de/bewerbungsfoto" },
      ],
    },
  ],
};

const ArrowRight = () => (
  <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const tips = [
  {
    icon: "👔",
    title: "Kleidung & Erscheinungsbild",
    points: [
      "Wählen Sie Kleidung, die zur angestrebten Branche passt: Hemd/Bluse für klassische Berufe, legerer aber gepflegter Look für Kreativbranchen.",
      "Dezente Farben (Dunkelblau, Grau, Anthrazit) wirken professionell und zeitlos.",
      "Auffällige Muster, Logos oder sehr grelle Farben vermeiden — sie lenken vom Gesicht ab.",
      "Schmuck dezent halten; maximal ein auffälliges Accessoire.",
    ],
  },
  {
    icon: "😊",
    title: "Mimik & Ausdruck",
    points: [
      "Ein offenes, natürliches Lächeln macht Sie sympathisch und zugänglich — im Gegensatz zum biometrischen Passbild ist hier ein Lächeln ausdrücklich erwünscht.",
      "Direkter Blick in die Kamera signalisiert Selbstbewusstsein.",
      "Entspannte Schultern, leicht nach vorne geneigter Kopf wirkt einladend.",
      "Mehrere Aufnahmen machen und das natürlichste Bild auswählen.",
    ],
  },
  {
    icon: "💡",
    title: "Licht & Hintergrund",
    points: [
      "Natürliches Licht von der Seite oder schräg von vorne ist ideal — Fenster tagsüber nutzen.",
      "Kein Gegenlicht, keine harten Schatten im Gesicht.",
      "PixPassport ersetzt den Hintergrund automatisch durch ein professionelles Neutralgrau oder Weiß.",
      "Kein unaufgeräumter oder farbiger Hintergrund — er kann die Bewerbung unprofessionell wirken lassen.",
    ],
  },
  {
    icon: "📐",
    title: "Format & Technisches",
    points: [
      "Standardformat Deutschland: 4,5 × 6 cm (Hochformat), Kopf mittig im oberen Bildbereich.",
      "Für digitale Bewerbungen: mindestens 300 dpi, Seitenverhältnis 2:3 oder 3:4.",
      "Dateigröße für E-Mail-Bewerbungen: idealerweise unter 500 kB (JPG oder PNG).",
      "PixPassport liefert druckfertiges und digitales Format in einem.",
    ],
  },
];

const comparisonRows = [
  { param: "Format", passbild: "35 × 45 mm", bewerbung: "4,5 × 6 cm (oder individuell)" },
  { param: "Hintergrund", passbild: "Einfarbig hellgrau (BMI-Pflicht)", bewerbung: "Neutral (grau, weiß, dezentes Blau)" },
  { param: "Gesichtsausdruck", passbild: "Neutral, Mund geschlossen", bewerbung: "Leichtes natürliches Lächeln empfohlen" },
  { param: "Retusche", passbild: "Keine Retusche erlaubt", bewerbung: "Dezente Nachbearbeitung erlaubt" },
  { param: "Auflösung", passbild: "Min. 600 dpi", bewerbung: "Min. 300 dpi" },
  { param: "Rechtliche Pflicht", passbild: "Ja (Passverordnung)", bewerbung: "Nein (AGG)" },
  { param: "Aktualität", passbild: "Nicht älter als 6 Monate", bewerbung: "Nicht älter als 2 Jahre empfohlen" },
];

const faqItems = [
  {
    q: "Welche Größe sollte ein Bewerbungsfoto haben?",
    a: "Das klassische Format in Deutschland ist 4,5 × 6 cm (Hochformat). Für digitale Bewerbungen empfehlen Karriereexperten ein Seitenverhältnis von 2:3 oder 3:4 bei mindestens 300 dpi. PixPassport liefert automatisch das optimale Format — sowohl für Print als auch für digitale Bewerbungsportale.",
  },
  {
    q: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
    a: "Nein. Das Allgemeine Gleichbehandlungsgesetz (AGG) schreibt kein Pflichtfoto vor — und Arbeitgeber dürfen ein Foto offiziell auch nicht verlangen. Dennoch ist das Beifügen eines Fotos in Deutschland nach wie vor weit verbreitet und kann den ersten Eindruck positiv beeinflussen. Für internationale Bewerbungen (z.B. USA, UK) ist vom Beifügen eines Fotos eher abzuraten.",
  },
  {
    q: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
    a: "Ein biometrisches Passbild (35×45 mm) muss strengen staatlichen Normen genügen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln, keine Retusche. Ein Bewerbungsfoto ist deutlich freier: natürliches Lächeln, professionelle Kleidung, dezente Nachbearbeitung und individuelle Hintergrundwahl. PixPassport unterstützt beide Formate — wählen Sie einfach den passenden Typ aus.",
  },
  {
    q: "Kann ich ein Selfie als Bewerbungsfoto verwenden?",
    a: "Grundsätzlich ja — wenn das Ergebnis professionell wirkt. Mit PixPassport laden Sie Ihr Selfie hoch, und unsere KI optimiert Beleuchtung, entfernt den Hintergrund und schneidet auf das korrekte Bewerbungsformat zu. Für Bewerbungen in Führungspositionen empfiehlt sich jedoch ein echtes Fotoshooting.",
  },
  {
    q: "Welcher Hintergrund ist für ein Bewerbungsfoto am besten?",
    a: "Ein neutraler, einfarbiger Hintergrund in Hellgrau, Weiß oder dezenten Blautönen gilt als professionell und zeitlos. Bunter, unruhiger oder gemusterter Hintergrund wirkt unprofessionell. PixPassport tauscht Ihren Hintergrund automatisch aus.",
  },
  {
    q: "Wie alt darf ein Bewerbungsfoto sein?",
    a: "Experten empfehlen, das Bewerbungsfoto nicht älter als 2 Jahre zu verwenden — es soll Ihr aktuelles Erscheinungsbild widerspiegeln. Hat sich Ihr Aussehen (Frisur, Gewicht, Brille) stark verändert, sollten Sie auf jeden Fall ein neues Foto machen.",
  },
];

export default function BewerbungsfotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="p">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="p-hero">
          <div className="p-hero__imgwrap">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Professionelles Bewerbungsfoto online erstellen mit PixPassport"
              width={1440}
              height={620}
              priority
              className="p-hero__img"
            />
          </div>
          <div className="p-container">
            <div className="p-hero__copy">
              <p className="p-eyebrow">
                <span className="p-dot" aria-hidden="true" />
                Bewerbungsfoto — Professionell, schnell, online
              </p>
              <h1 className="p-h1">
                Professionelles <span className="p-h1__lime">Bewerbungsfoto</span> Online Erstellen
              </h1>
              <p className="p-hero__sub">
                Überzeugen Sie beim ersten Eindruck. Laden Sie Ihr Selfie hoch — PixPassport optimiert
                Beleuchtung, entfernt den Hintergrund und schneidet Ihr Foto perfekt für den Lebenslauf zu.
                In Sekunden, ab 5,99 €.
              </p>
              <ul className="p-pills">
                {[
                  "✓ Hintergrund automatisch entfernt",
                  "✓ Format 4,5 × 6 cm (print) + digital",
                  "✓ KI-Bildoptimierung",
                  "✓ DSGVO-konform",
                  "✓ Ab 5,99 €",
                ].map((p) => <li key={p} className="p-pill">{p}</li>)}
              </ul>
              <div className="p-hero__actions">
                <Link href={ctaHref} className="p-btn p-btn--primary p-btn--lg">
                  Bewerbungsfoto erstellen <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <div className="p-band">
          <div className="p-container p-band__inner">
            {[
              { v: "17.000+", l: "Zufriedene Nutzer" },
              { v: "4,9 / 5",  l: "Verifizierte Bewertung" },
              { v: "< 60 s",   l: "Bearbeitungszeit" },
              { v: "2-in-1",   l: "Print & Digital" },
              { v: "5,99 €",   l: "Startpreis" },
            ].map((s) => (
              <div className="p-stat" key={s.v}>
                <span className="p-stat__v">{s.v}</span>
                <span className="p-stat__l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            TIPS SECTION
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="tips-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Expertten-Tipps</span>
              <h2 id="tips-h2" className="p-h2">
                Das perfekte Bewerbungsfoto: Tipps für einen überzeugenden ersten Eindruck
              </h2>
              <p className="p-lead">
                Diese Empfehlungen basieren auf aktuellen Karriereberatungs-Standards und der Praxis deutscher
                HR-Abteilungen. Ein gutes Bewerbungsfoto kann Ihre Chancen messbar erhöhen.
              </p>
            </header>

            <div className="p-tips">
              {tips.map((t) => (
                <article className="p-tip" key={t.title}>
                  <div className="p-tip__head">
                    <span className="p-tip__icon">{t.icon}</span>
                    <h3 className="p-tip__title">{t.title}</h3>
                  </div>
                  <ul className="p-list">
                    {t.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMPARISON TABLE
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="compare-h2">
          <div className="p-container" style={{maxWidth: "900px", margin: "0 auto"}}>
            <header className="p-sec-head">
              <span className="p-tag">Vergleich</span>
              <h2 id="compare-h2" className="p-h2">
                Bewerbungsfoto vs. biometrisches Passbild — die wichtigsten Unterschiede
              </h2>
              <p className="p-lead">
                Beide Fotoarten haben unterschiedliche Anforderungen. PixPassport unterstützt beides — wählen Sie einfach den richtigen Dokumenttyp.
              </p>
            </header>

            <div className="p-table-wrap">
              <table className="p-table" aria-label="Vergleich Bewerbungsfoto vs Passbild">
                <thead>
                  <tr>
                    <th>Kriterium</th>
                    <th>Biometrisches Passbild</th>
                    <th>Bewerbungsfoto</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r) => (
                    <tr key={r.param}>
                      <td><strong>{r.param}</strong></td>
                      <td>{r.passbild}</td>
                      <td>{r.bewerbung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SEO PROSE BLOCK
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="seo-h2">
          <div className="p-container p-prose-wrap">
            <h2 id="seo-h2" className="p-h2">
              Bewerbungsfoto in Deutschland: Was HR-Experten wirklich sagen
            </h2>
            <p className="p-prose">
              Entgegen dem Trend in englischsprachigen Ländern ist das Bewerbungsfoto in Deutschland nach
              wie vor ein fester Bestandteil vieler Bewerbungsunterlagen. Laut Umfragen unter deutschen
              Personalverantwortlichen bevorzugen über 70 % der Recruiter Bewerbungen mit professionellem
              Foto — insbesondere bei Stellen mit Kundenkontakt oder Führungsverantwortung.
            </p>

            <h3 className="p-h3">Das Allgemeine Gleichbehandlungsgesetz (AGG) und Bewerbungsfotos</h3>
            <p className="p-prose">
              Das <strong>Allgemeine Gleichbehandlungsgesetz (AGG)</strong> schützt Bewerberinnen und Bewerber
              vor Diskriminierung aufgrund von Geschlecht, Herkunft, Alter oder Religion. Arbeitgeber dürfen
              daher offiziell kein Foto im Bewerbungsprozess verlangen. In der Praxis hat sich jedoch eine
              kulturelle Norm etabliert: Das freiwillige Beifügen eines professionellen Fotos wird in vielen
              Branchen nach wie vor positiv wahrgenommen.
            </p>

            <h3 className="p-h3 mt-6">Wann kein Foto beifügen?</h3>
            <ul className="p-list">
              <li><strong>Internationale Unternehmen:</strong> Viele globale Firmen mit Sitz in Deutschland haben Blind-Recruiting eingeführt — kein Foto gewünscht.</li>
              <li><strong>US- oder UK-Bewerbungen:</strong> In diesen Ländern gilt das Beifügen eines Fotos als unprofessionell und kann zur Ablehnung führen.</li>
              <li><strong>Online-Portale ohne Foto-Feld:</strong> Wenn das Bewerbungsformular kein Foto-Upload vorsieht, kein Foto erzwingen.</li>
              <li><strong>Stellenausschreibung nennt explizit kein Foto:</strong> Den Wunsch des Arbeitgebers respektieren.</li>
            </ul>

            <h3 className="p-h3 mt-6">Digitales Bewerbungsfoto: Worauf es bei der E-Mail-Bewerbung ankommt</h3>
            <p className="p-prose">
              Für E-Mail-Bewerbungen und Online-Portale gelten besondere technische Anforderungen. Das Foto
              sollte als separate Datei <strong>(JPG oder PNG, max. 500 kB)</strong> oder eingebettet in den
              Lebenslauf geliefert werden. Zu große Dateien können E-Mail-Server blockieren. PixPassport
              liefert Ihr Bewerbungsfoto automatisch in optimierter Auflösung für beide Verwendungszwecke.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="how-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">So funktioniert es</span>
              <h2 id="how-h2" className="p-h2">In 3 Schritten zum professionellen Bewerbungsfoto</h2>
            </header>
            <ol className="p-steps">
              {[
                { n: "01", title: "Selfie oder Foto hochladen", desc: "Laden Sie ein vorhandenes Foto hoch oder machen Sie direkt ein Selfie mit Ihrem Smartphone. Kein professionelles Equipment nötig." },
                { n: "02", title: "KI-Optimierung & Hintergrundwechsel", desc: "Unsere KI entfernt den Hintergrund, optimiert Beleuchtung und Schärfe und schneidet auf das perfekte Bewerbungsformat zu." },
                { n: "03", title: "Download: Print & Digital", desc: "Erhalten Sie Ihr Foto in druckfertigem Format (4,5×6 cm) und als optimierte Digitaldatei für Online-Bewerbungen." },
              ].map((s) => (
                <li className="p-step" key={s.n}>
                  <span className="p-step__n">Schritt {s.n}</span>
                  <h3 className="p-step__title">{s.title}</h3>
                  <p className="p-step__desc">{s.desc}</p>
                </li>
              ))}
            </ol>
            <div className="p-cta-row">
              <Link href={ctaHref} className="p-btn p-btn--primary">
                Jetzt Bewerbungsfoto erstellen <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="faq-h2">
          <div className="p-container p-faq-wrap">
            <header className="p-sec-head">
              <span className="p-tag">FAQ</span>
              <h2 id="faq-h2" className="p-h2">Häufige Fragen zum Bewerbungsfoto</h2>
              <p className="p-lead">Alles, was Sie über Bewerbungsfotos in Deutschland wissen müssen.</p>
            </header>
            <div className="p-faqs">
              {faqItems.map((f, i) => (
                <details className="p-faq" key={i}>
                  <summary className="p-faq__q">
                    <span>{f.q}</span>
                    <span className="p-faq__icon" aria-hidden="true">+</span>
                  </summary>
                  <p className="p-faq__a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="p-bottom" aria-labelledby="bottom-h2">
          <div className="p-container p-bottom__inner">
            <span className="p-bottom__pre">Bereit für Ihre nächste Bewerbung?</span>
            <h2 id="bottom-h2" className="p-bottom__title">
              Ihr professionelles Bewerbungsfoto{" "}
              <span className="p-bottom__lime">in 60 Sekunden</span>
            </h2>
            <p className="p-bottom__sub">
              Kein Fotostudio, keine Wartezeit. Einfach Foto hochladen, KI optimiert alles — druckfertig und digital. Ab 5,99 €.
            </p>
            <Link href={ctaHref} className="p-btn p-btn--primary p-btn--lg">
              Bewerbungsfoto erstellen <ArrowRight />
            </Link>
          </div>
        </section>

      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .p {
          --lime: #65a30d; --lime-dk: #4d7c0f; --lime-lt: #84cc16;
          --lime-pale: #f7fee7; --lime-ring: #d9f99d;
          --ink: #0f172a; --ink2: #334155; --ink3: #64748b;
          --border: #e2e8f0; --bg: #ffffff; --bg2: #f8fafc;
          --r: 14px; --rsm: 8px;
          font-family: 'Outfit', system-ui, sans-serif;
          color: var(--ink); background: var(--bg);
          -webkit-font-smoothing: antialiased;
        }
        .icon { width: 20px; height: 20px; }
        .p-container { max-width: 1120px; margin: 0 auto; padding: 0 clamp(16px, 5vw, 40px); }

        /* Hero */
        .p-hero { padding: clamp(20px,4vw,40px) 0 0; }
        .p-hero__imgwrap { max-width: 1120px; margin: 0 auto; overflow: hidden; border-radius: var(--r); line-height: 0; }
        .p-hero__img { width: 100%; height: auto; display: block; border-radius: var(--r); }
        .p-hero__copy { padding: clamp(36px,6vw,68px) 0 clamp(44px,7vw,80px); }
        .p-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: 11.5px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--lime-dk); margin-bottom: 16px; }
        .p-dot { display: inline-block; width: 7px; height: 7px; background: var(--lime); border-radius: 50%; animation: blink 2.2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.8);opacity:.5} }
        .p-h1 { font-size: clamp(2rem,4.5vw,3.2rem); font-weight: 900; line-height: 1.08; letter-spacing: -.03em; margin: 0 0 20px; max-width: 820px; }
        .p-h1__lime { color: var(--lime); }
        .p-h2 { font-size: clamp(1.75rem,3.5vw,2.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -.02em; margin: 0 0 16px; max-width: 780px; }
        .p-h3 { font-size: clamp(1.1rem,2vw,1.35rem); font-weight: 700; line-height: 1.3; margin: 0 0 12px; }
        .p-hero__sub { font-size: clamp(.95rem,1.5vw,1.07rem); color: var(--ink2); line-height: 1.75; max-width: 680px; margin: 0 0 28px; }
        .p-pills { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-wrap: wrap; gap: 8px; }
        .p-pill { background: var(--lime-pale); border: 1.5px solid var(--lime-ring); border-radius: 999px; padding: 5px 14px; font-size: 12.5px; font-weight: 600; color: var(--lime-dk); white-space: nowrap; }
        .p-hero__actions { display: flex; align-items: flex-start; gap: 14px; }
        .p-btn { display: inline-flex; align-items: center; gap: 9px; font-family: inherit; font-weight: 700; border-radius: var(--rsm); text-decoration: none; border: none; cursor: pointer; transition: all .15s; white-space: nowrap; }
        .p-btn--primary { background: var(--lime); color: #fff; font-size: 1rem; padding: 14px 26px; box-shadow: 0 4px 20px rgba(101,163,13,.38); }
        .p-btn--primary:hover { background: var(--lime-dk); transform: translateY(-2px); }
        .p-btn--lg { font-size: 1.07rem; padding: 16px 32px; border-radius: 10px; }

        /* Band */
        .p-band { background: var(--ink); padding: 24px 0; }
        .p-band__inner { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 12px 8px; }
        .p-stat { text-align: center; }
        .p-stat__v { display: block; font-size: clamp(1.3rem,2.5vw,1.75rem); font-weight: 800; color: var(--lime-lt); }
        .p-stat__l { display: block; font-size: 11px; font-weight: 500; color: rgba(255,255,255,.5); margin-top: 4px; text-transform: uppercase; letter-spacing: .05em; }

        /* Section */
        .p-section { padding: clamp(52px,8vw,88px) 0; }
        .p-section--alt { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .p-sec-head { margin-bottom: clamp(32px,5vw,52px); }
        .p-tag { display: inline-block; background: var(--lime-pale); color: var(--lime-dk); border: 1.5px solid var(--lime-ring); border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 4px 12px; margin-bottom: 20px; }
        .p-lead { font-size: clamp(1rem,1.5vw,1.1rem); color: var(--ink3); line-height: 1.6; max-width: 640px; margin: 0; }

        /* Tips grid */
        .p-tips { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .p-tip { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r); padding: 28px 24px; }
        .p-tip__head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .p-tip__icon { font-size: 28px; flex-shrink: 0; }
        .p-tip__title { font-size: 1.1rem; font-weight: 800; margin: 0; }

        /* List */
        .p-list { padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .p-list li { padding-left: 22px; position: relative; font-size: .93rem; line-height: 1.55; color: var(--ink2); }
        .p-list li::before { content: "✓"; position: absolute; left: 0; top: 1px; color: var(--lime); font-weight: 800; font-size: .85rem; }

        /* Table */
        .p-table-wrap { overflow-x: auto; border-radius: var(--r); border: 1px solid var(--border); margin-top: 24px; }
        .p-table { width: 100%; border-collapse: collapse; font-size: .92rem; background: var(--bg); }
        .p-table thead { background: var(--ink); color: #fff; }
        .p-table thead th { padding: 14px 16px; text-align: left; font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
        .p-table tbody tr { border-bottom: 1px solid var(--border); transition: background .15s; }
        .p-table tbody tr:last-child { border-bottom: none; }
        .p-table tbody tr:hover { background: var(--bg2); }
        .p-table td { padding: 12px 16px; vertical-align: middle; }

        /* Steps */
        .p-steps { list-style: none; padding: 0; margin: 0 0 40px; display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .p-step { background: var(--bg); border: 1px solid var(--border); border-radius: var(--r); padding: 32px 24px; }
        .p-step__n { display: inline-block; background: var(--lime-pale); color: var(--lime-dk); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; padding: 4px 8px; border-radius: 6px; margin-bottom: 16px; }
        .p-step__title { font-size: 1.2rem; font-weight: 800; margin: 0 0 10px; }
        .p-step__desc { font-size: .93rem; color: var(--ink3); line-height: 1.6; margin: 0; }
        .p-cta-row { text-align: left; }

        /* Prose */
        .p-prose-wrap { max-width: 800px; }
        .p-prose { font-size: 1rem; line-height: 1.75; color: var(--ink2); margin-bottom: 16px; }
        .p-prose strong { color: var(--ink); font-weight: 700; }
        .mt-6 { margin-top: 24px; }

        /* FAQ */
        .p-faq-wrap { max-width: 800px; }
        .p-faqs { display: flex; flex-direction: column; gap: 12px; }
        .p-faq { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .p-faq__q { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 20px 24px; font-size: 1rem; font-weight: 700; cursor: pointer; user-select: none; transition: background .2s; }
        .p-faq__q:hover { background: var(--bg2); }
        .p-faq__q::-webkit-details-marker { display: none; }
        .p-faq__icon { font-size: 20px; color: var(--lime); transition: transform .3s; flex-shrink: 0; }
        .p-faq[open] .p-faq__icon { transform: rotate(45deg); }
        .p-faq__a { margin: 0; padding: 0 24px 24px; font-size: .95rem; line-height: 1.65; color: var(--ink3); }
        .p-faq[open] .p-faq__a { border-top: 1px solid var(--border); padding-top: 20px; }

        /* Bottom */
        .p-bottom { padding: clamp(60px,10vw,100px) 0; background: var(--ink); color: #fff; text-align: center; }
        .p-bottom__inner { max-width: 680px; margin: 0 auto; }
        .p-bottom__pre { display: inline-block; font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--lime-lt); margin-bottom: 16px; }
        .p-bottom__title { font-size: clamp(2rem,4vw,3rem); font-weight: 900; line-height: 1.1; letter-spacing: -.02em; margin: 0 0 24px; }
        .p-bottom__lime { color: var(--lime-lt); }
        .p-bottom__sub { font-size: clamp(1.05rem,1.5vw,1.2rem); color: rgba(255,255,255,.7); line-height: 1.6; margin: 0 auto 40px; }
      `}</style>
    </>
  );
}