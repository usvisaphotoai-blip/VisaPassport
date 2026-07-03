import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { de } from "./translations";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Biometrisches Passbild Online 2026 | 35x45 mm KI Passfoto",
  description:
    "Erstellen Sie ein 100 % konformes biometrisches Passbild nach offiziellen BMI-Vorgaben (35×45 mm). Digitale Übermittlung, KI-Prüfung, Hintergrund entfernt – in 30 Sekunden. Ab 5,99 €.",
  keywords: [
    "biometrisches passbild",
    "passbild online erstellen",
    "passfoto generator 2025",
    "passbild größe 35x45",
 
  ],
  alternates: { canonical: "https://www.pixpassport.com/de" },
  openGraph: {
    title: "PixPassport — Biometrisches Passbild in 30 Sekunden",
    description:
      "Automatische biometrische Prüfung nach BMI-Vorgaben, Hintergrund entfernt, konform für 50+ Länder. Garantiert oder Geld zurück.",
    url: "https://www.pixpassport.com/de",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport — Biometrisches Passbild Online",
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
    desc: "Nutzen Sie Ihr Smartphone oder laden Sie ein vorhandenes Foto hoch. Kein Studio, keine professionelle Ausrüstung erforderlich.",
  },
  {
    n: "02",
    title: "Automatische KI-Prüfung & Konformität",
    desc: "Unser System entfernt den Hintergrund, schneidet zu und überprüft über 50 offizielle biometrische Kriterien nach BMI-Standard in Echtzeit.",
  },
  {
    n: "03",
    title: "Digital herunterladen und einreichen",
    desc: "Erhalten Sie sofort Ihr hochauflösendes, digitales Passbild – bereit zur Übermittlung an die Behörde oder zum Ausdrucken bei Rossmann / dm.",
  },
];

const benefits = [
  { icon: "🎯", title: "Biometrische Konformität garantiert", desc: "Validiert nach offiziellen BMI/ICAO-Kriterien für Deutschland, EU und 50+ Länder. Akzeptanzrate über 99 %. Geld zurück bei Ablehnung." },
  { icon: "⚡", title: "Ergebnis in unter 30 Sekunden", desc: "Rund um die Uhr verfügbar. Keine Fahrt, keine Wartezeit beim Fotografen oder in der Apotheke." },
  { icon: "🔒", title: "100 % Sichere Daten & DSGVO", desc: "End-to-End-Verschlüsselung. Ihre Fotos werden nach 24 Stunden gelöscht. Kein Weiterverkauf, kein Teilen." },
  { icon: "💶", title: "Schon ab 5,99 €", desc: "Sparen Sie sich die Studio-Gebühren und Nachbesserungen. Einmaliger Tarif, kein Abonnement. Günstiger als die 6 € Behördengebühr für PointID®." },
  { icon: "🌍", title: "50+ Länder und Dokumente", desc: "Deutschland, USA, Kanada, UK, Schengen-Raum — weltweite Datenbank ständig aktualisiert." },
  { icon: "🖨️", title: "Druckbogen inklusive", desc: "Druckfertiges Format (z.B. für Rossmann, dm oder zu Hause), das bei allen Behörden akzeptiert wird." },
];

const docs = [
  { icon: "🛂", name: "Deutscher Reisepass", detail: "ICAO Format · hellgrauer Hintergrund · 35×45 mm" },
  { icon: "🪪", name: "Personalausweis", detail: "Deutsche CNI · Biometrische BMI-Standards 2025" },
  { icon: "✈️", name: "Schengen Visum", detail: "Alle Länder im Schengen-Raum" },
  { icon: "🚗", name: "Führerschein", detail: "Neuantrag und Verlängerung" },
  { icon: "🇺🇸", name: "US Dokumente", detail: "US Pass · Visum DS-160" },
  { icon: "🌐", name: "50+ weitere Länder", detail: "Aktuelle weltweite Datenbank" },
];

const reviews = [
  { name: "Michael S.", city: "München",    stars: 5, text: "Foto wurde beim ersten Mal für meinen Passantrag akzeptiert. Schnell und stressfrei!" },
  { name: "Julia B.", city: "Berlin",    stars: 5, text: "Ich war skeptisch, aber das Ergebnis ist perfekt. Habe den Druckbogen bei Rossmann gedruckt und alles lief super." },
  { name: "Andreas M.", city: "Hamburg", stars: 5, text: "Viel günstiger als beim Fotografen und das Bild ist einwandfrei. Sehr zu empfehlen für die ganze Familie." },
];

const requirementsTable = [
  { param: "Format (B × H)", value: "35 × 45 mm", source: "BMI / Bundesdruckerei" },
  { param: "Gesichtshöhe", value: "32–36 mm (optimal)", source: "Lichtbild-Schablone BMI, Juli 2025" },
  { param: "Auflösung", value: "min. 600 dpi (827 × 1063 px)", source: "Auswärtiges Amt / ICAO" },
  { param: "Hintergrund", value: "Einfarbig, vorzugsweise hellgrau", source: "BMI Fotomustertafel, Juli 2025" },
  { param: "Gesichtsausdruck", value: "Neutral, Mund geschlossen", source: "ICAO Doc 9303 / BMI" },
  { param: "Kopfhaltung", value: "Frontal, gerade, kein Neigen", source: "Passverordnung (PassV)" },
  { param: "Augen", value: "Geöffnet, direkt in Kamera, keine Tönung", source: "BMI" },
  { param: "Aktualität", value: "Nicht älter als 6 Monate", source: "Passverordnung" },
  { param: "Dateiformat", value: "JPG, PNG, PDF (digital)", source: "BMI ab 1. Mai 2025" },
  { param: "Dateigröße", value: "Empfohlen unter 300 kB", source: "Auswärtiges Amt" },
];

const faqItems = [
  {
    q: "Was hat sich ab 1. Mai 2025 bei Passbildern geändert?",
    a: "Seit dem 1. Mai 2025 sind für Reisepässe, Personalausweise und Aufenthaltstitel in Deutschland ausschließlich digitale biometrische Lichtbilder zulässig (BMI-Regelung). Papierbilder werden von den Bürgerämtern nicht mehr akzeptiert. Das Foto muss entweder direkt in der Behörde aufgenommen oder von einem registrierten Fotodienstleister über eine BSI-zertifizierte Cloud digital übermittelt werden.",
  },
  {
    q: "Welche Maße hat das offizielle deutsche Passbild?",
    a: "Das offizielle Format ist 35 × 45 mm (Breite × Höhe). Die Gesichtshöhe (Kinn bis Haaransatz) soll laut BMI-Lichtbild-Schablone (Stand Juli 2025) zwischen 32 und 36 mm betragen. PixPassport stellt dieses Format automatisch sicher.",
  },
  {
    q: "Welche Hintergrundfarbe ist für deutsche Passbilder vorgeschrieben?",
    a: "Laut der offiziellen BMI-Fotomustertafel (Juli 2025) muss der Hintergrund einfarbig und vorzugsweise hellgrau sein. Er darf keine Schatten, Muster oder Verläufe aufweisen. PixPassport entfernt Ihren Hintergrund automatisch und ersetzt ihn durch die korrekte Farbe.",
  },
  {
    q: "Kann ich mein Passbild zu Hause selbst machen?",
    a: "Ja. Mit PixPassport nehmen Sie Ihr Foto einfach per Smartphone auf. Unsere KI prüft automatisch alle über 50 biometrischen Kriterien (Gesichtshöhe, Auflösung, Hintergrund, Beleuchtung, Kopfhaltung) nach BMI-Standard und liefert ein konformes digitales Passbild.",
  },
  {
    q: "Wie viel kostet ein Passbild beim Amt mit PointID®?",
    a: "Wenn die Behörde das PointID®-System der Bundesdruckerei nutzt, kostet die Lichtbilderfassung vor Ort ab dem 1. Mai 2025 bundeseinheitlich 6,00 €. Mit PixPassport erhalten Sie Ihr konformes Passbild schon ab 5,99 € – ohne Wartezeit und Anreise.",
  },
  {
    q: "Ist ein Lächeln auf dem Passbild erlaubt?",
    a: "Nein. Laut ICAO-Norm und den deutschen BMI-Vorgaben ist ein neutraler Gesichtsausdruck mit geschlossenem Mund erforderlich. Ein Lächeln mit sichtbaren Zähnen führt zur Ablehnung des Fotos.",
  },
  {
    q: "Für welche Dokumente kann ich PixPassport nutzen?",
    a: "PixPassport unterstützt Reisepass, Personalausweis, Führerschein, Schengen-Visum, US-Visum (DS-160), und 50+ weitere internationale Dokumente. Die Formatdatenbank wird laufend aktualisiert.",
  },
  {
    q: "Was ist die Geld-zurück-Garantie?",
    a: "Falls Ihr mit PixPassport erstelltes Foto von einer deutschen Behörde abgelehnt wird, erstatten wir Ihnen den vollen Kaufpreis – ohne Diskussion. Unsere Akzeptanzrate liegt bei über 99 %.",
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
      offers: { "@type": "Offer", price: "5.99", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "210" },
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
      ],
    },
  ],
};

const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function DeHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="p">

        {/* ══════════════════════════════════════
            HERO — image on top, copy below
        ══════════════════════════════════════ */}
        <section className="p-hero" aria-labelledby="hero-h1">

          {/* ── Full-width image block ── */}
          <div className="p-hero__imgwrap">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Beispiele für offizielle biometrische Passbilder nach BMI-Standard"
              width={1440}
              height={620}
              priority
              className="p-hero__img p-hero__img--desk"
            />
            <Image
              src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
              alt="Biometrisches Passbild konform online per Smartphone erstellen"
              width={750}
              height={560}
              priority
              className="p-hero__img p-hero__img--mob"
            />
          </div>

          {/* ── Copy below image ── */}
          <div className="p-container">
            <div className="p-hero__copy">

              <p className="p-eyebrow">
                <span className="p-dot" aria-hidden="true" />
                Neu ab Mai 2025 — Digitales Passbild nach BMI-Vorgaben
              </p>

              <h1 id="hero-h1" className="p-h1">
                Biometrisches Passbild Online Erstellen —{" "}
                <span className="p-h1__lime">Konform & Garantiert</span>{" "}
                in 30 Sekunden
              </h1>

              <p className="p-hero__sub">
                Erstellen Sie Ihr konformes digitales Passbild (35×45 mm) nach den offiziellen BMI-Vorgaben — für Reisepass, Personalausweis, Visum und mehr. KI-Prüfung nach über 50 biometrischen Kriterien. Geld-zurück-Garantie.
              </p>

              <ul className="p-pills" aria-label="Key points">
                {[
                  "✓ 99,8 % Akzeptanzrate",
                  "✓ Ergebnis in 30 Sekunden",
                  "✓ Offizielle BMI-Konformität",
                  "✓ 50+ Länder",
                  "✓ DSGVO & Sicher",
                  "✓ Geld-zurück-Garantie",
                ].map((p) => (
                  <li key={p} className="p-pill">{p}</li>
                ))}
              </ul>

              <div className="p-hero__actions">
                <Link href={ctaHref} className="p-btn p-btn--primary">
                  Jetzt Passbild erstellen
                  <ArrowRight />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STICKY CTA — mobile only
        ══════════════════════════════════════ */}
        <div className="p-sticky" role="complementary" aria-label="Foto erstellen">
          <Link href={ctaHref} className="p-sticky__btn">
            Jetzt Passbild erstellen
            <ArrowRight />
          </Link>
        </div>

        {/* ══════════════════════════════════════
            STATS BAND
        ══════════════════════════════════════ */}
        <div className="p-band" aria-label="PixPassport Statistiken">
          <div className="p-container p-band__inner">
            {[
              { v: "17.000+", l: "Zufriedene Nutzer" },
              { v: "4,9 / 5",  l: "Verifizierte Bewertung" },
              { v: "99,8 %",     l: "Akzeptanzrate" },
              { v: "< 30 s",   l: "Bearbeitungszeit" },
              { v: "50+",      l: "Länder unterstützt" },
            ].map((s) => (
              <div className="p-stat" key={s.v}>
                <span className="p-stat__v">{s.v}</span>
                <span className="p-stat__l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            NEW 2025 REGULATION ALERT
        ══════════════════════════════════════ */}
        <section className="p-section p-section--notice" aria-labelledby="notice-h2">
          <div className="p-container p-prose-wrap">
            <div className="p-notice">
              <span className="p-notice__badge">⚠️ Wichtige Änderung ab 1. Mai 2025</span>
              <h2 id="notice-h2" className="p-h2 mt-4">
                Neue BMI-Regelung: Passbilder nur noch digital
              </h2>
              <div className="p-prose">
                <p>
                  Seit dem 1. Mai 2025 werden in Deutschland für Reisepässe, Personalausweise und Aufenthaltstitel
                  ausschließlich <strong>digitale biometrische Lichtbilder</strong> akzeptiert (Quelle:{" "}
                  <a href="https://www.bmi.bund.de/SharedDocs/kurzmeldungen/DE/2025/04/neue-passbilder.html" target="_blank" rel="noopener noreferrer" className="p-link">
                    Bundesministerium des Innern (BMI)
                  </a>). Papierfotos werden nicht mehr angenommen.
                </p>
                <h3 className="p-h3">Was bedeutet das für Sie?</h3>
              </div>
              <ul className="p-list">
                <li>Das digitale Passbild muss über eine BSI-zertifizierte verschlüsselte Cloud an die Behörde übermittelt werden.</li>
                <li>Alternativ kann das Bild direkt beim Bürgeramt mit dem PointID®-System der Bundesdruckerei aufgenommen werden (Kosten: 6,00 € vor Ort).</li>
                <li>Alte Papierfotos können weiterhin für andere Zwecke (z.B. Bibliotheksausweis, Angelschein) genutzt werden.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="how-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">So funktioniert es</span>
              <h2 id="how-h2" className="p-h2">
                In 3 Schritten zum konformen digitalen Passbild
              </h2>
              <p className="p-lead">
                Kein Fotostudio, keine Wartezeiten. Erstellen Sie Ihr biometrisches Passbild direkt vom Smartphone — in weniger als einer Minute.
              </p>
            </header>

            <ol className="p-steps" aria-label="Schritte">
              {steps.map((s) => (
                <li className="p-step" key={s.n}>
                  <span className="p-step__n">Schritt {s.n}</span>
                  <h3 className="p-step__title">{s.title}</h3>
                  <p className="p-step__desc">{s.desc}</p>
                </li>
              ))}
            </ol>

            <div className="p-cta-row">
              <Link href={ctaHref} className="p-btn p-btn--primary">
                Jetzt starten
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OFFICIAL REQUIREMENTS TABLE
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="req-h2">
          <div className="p-container p-prose-wrap">
            <span className="p-tag">Offizielle Vorgaben</span>
            <h2 id="req-h2" className="p-h2">
              Biometrisches Passbild: Anforderungen laut BMI &amp; ICAO (Stand 2025)
            </h2>
            <div className="p-prose">
              <p>
                Die folgenden Vorgaben basieren auf der offiziellen{" "}
                <strong>Lichtbild-Schablone des Bundesministeriums des Innern (BMI, Stand Juli 2025)</strong>,
                der Passverordnung (PassV) sowie den internationalen ICAO-Doc-9303-Normen, die auch vom
                Auswärtigen Amt für Visumsanträge angewandt werden.
              </p>
            </div>

            <div className="p-table-wrap">
              <table className="p-table" aria-label="Offizielle Passbild-Anforderungen">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Vorgeschriebener Wert</th>
                    <th>Quelle</th>
                  </tr>
                </thead>
                <tbody>
                  {requirementsTable.map((r) => (
                    <tr key={r.param}>
                      <td><strong>{r.param}</strong></td>
                      <td>{r.value}</td>
                      <td className="p-table__src">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-prose mt-8">
              <h3 className="p-h3">Häufige Ablehnungsgründe — was Sie vermeiden müssen</h3>
            </div>
            <ul className="p-list">
              <li><strong>Lächeln mit sichtbaren Zähnen:</strong> Nicht erlaubt. Neutraler Gesichtsausdruck mit geschlossenem Mund ist Pflicht (ICAO-Norm).</li>
              <li><strong>Getöntes Brillenglas oder Reflexionen:</strong> Führt zur sofortigen Ablehnung durch die Behörde.</li>
              <li><strong>Geneigter oder gedrehter Kopf:</strong> Der Kopf muss gerade und frontal zur Kamera ausgerichtet sein.</li>
              <li><strong>Schatten im Gesicht oder auf dem Hintergrund:</strong> Gleichmäßige Ausleuchtung ist Pflicht — Über- und Unterbelichtung werden abgelehnt.</li>
              <li><strong>Falscher Hintergrund:</strong> Muster, Farben oder Verläufe sind nicht erlaubt. Nur einfarbig hellgrau.</li>
              <li><strong>Foto älter als 6 Monate:</strong> Das Passbild muss Ihr aktuelles Erscheinungsbild widerspiegeln.</li>
              <li><strong>Papierfoto (seit 1. Mai 2025):</strong> Im Inland nicht mehr zulässig für offizielle Ausweisdokumente.</li>
            </ul>
            <div className="p-prose mt-4">
              <p>
                PixPassport prüft automatisch alle diese Punkte und weist Sie auf Probleme hin, bevor Sie bezahlen.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY PIXPASSPORT
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="why-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Warum wir</span>
              <h2 id="why-h2" className="p-h2">
                Warum PixPassport die beste Lösung für Ihr biometrisches Passbild ist
              </h2>
              <p className="p-lead">
                Tausende Nutzer vertrauen uns jeden Monat für ihre Pass-, Visum- und Ausweisanträge.
              </p>
            </header>
            <div className="p-benefits">
              {benefits.map((b) => (
                <article className="p-benefit" key={b.title}>
                  <span className="p-benefit__icon" aria-hidden="true">{b.icon}</span>
                  <h3 className="p-benefit__title">{b.title}</h3>
                  <p className="p-benefit__desc">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            DOCUMENTS
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="docs-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Unterstützte Dokumente</span>
              <h2 id="docs-h2" className="p-h2">
                Konforme Fotos für all Ihre offiziellen Dokumente
              </h2>
              <p className="p-lead">
                PixPassport unterstützt alle gängigen deutschen und internationalen Identitäts- und Reisedokumente — eine Plattform für alle Anforderungen, stets nach aktuellem BMI- und ICAO-Standard.
              </p>
            </header>
            <div className="p-docs">
              {docs.map((d) => (
                <div className="p-doc" key={d.name}>
                  <span className="p-doc__icon" aria-hidden="true">{d.icon}</span>
                  <h3 className="p-doc__name">{d.name}</h3>
                  <p className="p-doc__detail">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SEO PROSE BLOCK
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="seo-prose-h2">
          <div className="p-container p-prose-wrap">
            <h2 id="seo-prose-h2" className="p-h2">
              Biometrisches Passbild selber machen — so gelingt das perfekte Foto zu Hause
            </h2>
            <div className="p-prose">
              <p>
                Seit der Einführung der digitalen Passpflicht am <strong>1. Mai 2025</strong> stellen sich viele Bürgerinnen
                und Bürger die Frage: Kann ich mein Passbild noch selbst machen? Die Antwort lautet <strong>ja</strong> —
                sofern das Ergebnis den offiziellen BMI-Vorgaben entspricht und digital über einen registrierten
                Fotodienstleister an das Bürgeramt übermittelt wird.
              </p>

              <h3 className="p-h3">Tipps für ein erstklassiges Selfie-Passbild</h3>
            </div>
            <ul className="p-list">
              <li><strong>Lichtquelle vor Ihnen:</strong> Stellen Sie sich vor ein Fenster oder eine helle Lampe, damit Ihr Gesicht gleichmäßig ausgeleuchtet ist. Kein Gegenlicht.</li>
              <li><strong>Neutraler Hintergrund:</strong> Eine helle, einfarbige Wand (am besten hellgrau oder weiß) ist ideal. PixPassport tauscht den Hintergrund automatisch aus.</li>
              <li><strong>Abstand zur Kamera:</strong> Halten Sie das Smartphone ca. 40–50 cm entfernt. Kopf und Schultern sollen vollständig sichtbar sein.</li>
              <li><strong>Keine Filter oder Bearbeitungen:</strong> Verwenden Sie keine Schönheitsfilter, kein HDR, keine automatische Portraitmodus-Weichzeichnung.</li>
              <li><strong>Brille:</strong> Wenn möglich ohne Brille fotografieren. Brillen mit Tönung oder starken Reflexionen sind grundsätzlich nicht zulässig.</li>
              <li><strong>Ausdruck:</strong> Blicken Sie direkt in die Kamera, Mund geschlossen, entspannter neutraler Ausdruck.</li>
            </ul>

            <div className="p-prose mt-6">
              <h3 className="p-h3">Passbild für Kinder — besondere Regeln beachten</h3>
              <p>
                Bei Kindern unter <strong>5 Jahren</strong> ist laut BMI keine Prüfung der Biometrietauglichkeit erforderlich.
                Die Augen müssen aber trotzdem erkennbar geöffnet und das Gesicht frontal sichtbar sein. Für Kinder
                ab 5 Jahren gelten dieselben biometrischen Anforderungen wie für Erwachsene. PixPassport erkennt
                automatisch, ob es sich um ein Kinderfoto handelt, und wendet die entsprechenden Toleranzgrenzen an.
              </p>

              <h3 className="p-h3 mt-6">Passbild vs. Bewerbungsfoto — was ist der Unterschied?</h3>
              <p>
                Ein <strong>biometrisches Passbild</strong> folgt strengen staatlichen Normen (35×45 mm, neutraler Ausdruck,
                hellgrauer Hintergrund). Ein <strong>Bewerbungsfoto</strong> ist freier gestaltet: Es darf ein leichtes Lächeln
                zeigen, kann professionell retuschiert sein und wird in der Regel im Hochformat 4:5 oder 3:4 geliefert.
                PixPassport unterstützt beide Formate — wählen Sie einfach beim Erstellen den passenden Dokumenttyp aus.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            REVIEWS
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="reviews-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Kundenbewertungen</span>
              <h2 id="reviews-h2" className="p-h2">Was unsere Nutzer sagen</h2>
              <p className="p-lead">
                Über 17.000 Nutzer haben ihr konformes digitales Passbild bereits mit PixPassport erstellt.
              </p>
            </header>
            <div className="p-reviews">
              {reviews.map((r) => (
                <figure className="p-review" key={r.name}>
                  <div className="p-review__stars" aria-label={`${r.stars} Sterne von 5`}>
                    {"★".repeat(r.stars)}
                  </div>
                  <blockquote className="p-review__text">
                    <p>"{r.text}"</p>
                  </blockquote>
                  <figcaption className="p-review__author">
                    <span className="p-review__avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                    <span><strong>{r.name}</strong> · {r.city}</span>
                  </figcaption>
                </figure>
              ))}
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
              <h2 id="faq-h2" className="p-h2">
                Häufig gestellte Fragen zum biometrischen Passbild 2025
              </h2>
              <p className="p-lead">
                Alles Wichtige zu den neuen BMI-Vorgaben, Formaten und der Nutzung von PixPassport.
              </p>
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
            DISCLAIMER — subtle & professional
        ══════════════════════════════════════ */}
        <div className="p-disclaimer" role="note" aria-label="Wichtige Information">
          <div className="p-container p-disclaimer__inner">
            <InfoIcon />
            <p className="p-disclaimer__text">
              <strong>PixPassport</strong> ist ein unabhängiger Service zur Erstellung konformer Passbilder.
              Wir sind <strong>nicht mit dem BMI</strong> (Bundesministerium des Innern) oder anderen
              Behörden verbunden.
              Unser Service liefert Ihnen ein digital konformes Passbild nach biometrischen Vorgaben, 
              das Sie für Ihre offiziellen Anträge nutzen können.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="p-bottom" aria-labelledby="bottom-h2">
          <div className="p-container p-bottom__inner">
            <span className="p-bottom__pre">Bereit loszulegen?</span>
            <h2 id="bottom-h2" className="p-bottom__title">
              Erstellen Sie Ihr konformes Passbild{" "}
              <span className="p-bottom__lime">in 30 Sekunden</span>
            </h2>
            <p className="p-bottom__sub">
              Schließen Sie sich über 17.000 Nutzern an, die ihr biometrisches Passbild online schnell, 
              bequem und ohne Ablehnungsrisiko erstellt haben. Ab 5,99 €, Geld-zurück-Garantie.
            </p>
            <Link href={ctaHref} className="p-btn p-btn--primary p-btn--lg">
              Passbild jetzt erstellen
              <ArrowRight />
            </Link>
            <p className="p-bottom__micro">
              <ShieldIcon />
              Volle Rückerstattung, falls Ihr Passbild von den Behörden abgelehnt wird
            </p>
          </div>
        </section>

      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .p {
          --lime:      #65a30d;
          --lime-dk:   #4d7c0f;
          --lime-lt:   #84cc16;
          --lime-pale: #f7fee7;
          --lime-ring: #d9f99d;
          --ink:       #0f172a;
          --ink2:      #334155;
          --ink3:      #64748b;
          --border:    #e2e8f0;
          --bg:        #ffffff;
          --bg2:       #f8fafc;
          --notice-bg: #fefce8;
          --notice-border: #fef08a;
          --r:         14px;
          --rsm:       8px;
          font-family: 'Outfit', system-ui, sans-serif;
          color: var(--ink);
          background: var(--bg);
          -webkit-font-smoothing: antialiased;
        }

        .p-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 clamp(16px, 5vw, 40px);
        }

        /* ══ HERO ══ */
        .p-hero { 
          background: var(--bg);
          padding: clamp(20px, 4vw, 40px) 0 0;
        }

        .p-hero__imgwrap {
          position: relative;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          line-height: 0;
          overflow: hidden;
          background: var(--bg2);
          border-radius: var(--r);
        }
        .p-hero__img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--r);
        }
        .p-hero__img--desk { display: block; }
        .p-hero__img--mob  { display: none; }
        @media (max-width: 640px) {
          .p-hero__img--desk { display: none; }
          .p-hero__img--mob  { display: block; }
        }

        .p-hero__copy {
          padding: clamp(36px,6vw,68px) clamp(16px, 5vw, 40px) clamp(44px,7vw,80px);
          max-width: 1120px;
          margin: 0 auto;
        }

        .p-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: .09em;
          text-transform: uppercase;
          color: var(--lime-dk);
          margin-bottom: 16px;
        }
        .p-dot {
          display: inline-block;
          width: 7px; height: 7px;
          background: var(--lime);
          border-radius: 50%;
          animation: blink 2.2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.8); opacity: .5; }
        }

        .p-h1 {
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.03em;
          color: var(--ink);
          margin: 0 0 20px;
          max-width: 820px;
        }
        .p-h1__lime { color: var(--lime); }

        .p-hero__sub {
          font-size: clamp(.95rem, 1.5vw, 1.07rem);
          color: var(--ink2);
          line-height: 1.75;
          max-width: 680px;
          margin: 0 0 28px;
        }

        .p-pills {
          list-style: none; padding: 0; margin: 0 0 32px;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .p-pill {
          background: var(--lime-pale);
          border: 1.5px solid var(--lime-ring);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--lime-dk);
          white-space: nowrap;
        }

        .p-hero__actions {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 14px;
        }

        .p-btn {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: inherit; font-weight: 700;
          border-radius: var(--rsm);
          text-decoration: none; border: none; cursor: pointer;
          transition: background .15s, transform .15s, box-shadow .15s;
          white-space: nowrap;
        }
        .p-btn--primary {
          background: var(--lime); color: #fff;
          font-size: 1rem; padding: 14px 26px;
          box-shadow: 0 4px 20px rgba(101,163,13,.38);
        }
        .p-btn--primary:hover {
          background: var(--lime-dk);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(101,163,13,.48);
        }
        .p-btn--primary:active { transform: none; }
        .p-btn--lg { font-size: 1.07rem; padding: 16px 32px; border-radius: 10px; }

        /* ══ STICKY ══ */
        .p-sticky {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0; z-index: 200;
          padding: 12px 16px;
          background: rgba(15,23,42,.97);
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .p-sticky__btn {
          display: flex; align-items: center;
          justify-content: center; gap: 10px;
          width: 100%;
          background: var(--lime); color: #fff;
          font-family: inherit; font-size: .98rem; font-weight: 700;
          border-radius: 10px; padding: 15px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(101,163,13,.4);
        }
        @media (max-width: 768px) {
          .p-sticky { display: block; }
          main.p    { padding-bottom: 76px; }
        }

        /* ══ BAND ══ */
        .p-band { background: var(--ink); padding: 24px 0; }
        .p-band__inner {
          display: flex; justify-content: space-around;
          flex-wrap: wrap; gap: 12px 8px;
        }
        .p-stat { text-align: center; }
        .p-stat__v {
          display: block;
          font-size: clamp(1.3rem,2.5vw,1.75rem);
          font-weight: 800; color: var(--lime-lt); line-height: 1;
        }
        .p-stat__l {
          display: block; font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,.5); margin-top: 4px;
          text-transform: uppercase; letter-spacing: .05em;
        }

        /* ══ SECTIONS ══ */
        .p-section { padding: clamp(52px,8vw,88px) 0; }
        .p-section--alt {
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .p-section--notice {
          background: var(--notice-bg);
          border-top: 2px solid var(--notice-border);
          border-bottom: 2px solid var(--notice-border);
        }

        .p-sec-head { margin-bottom: clamp(32px,5vw,52px); }
        .p-tag {
          display: inline-block;
          background: var(--lime-pale); color: var(--lime-dk);
          border: 1.5px solid var(--lime-ring); border-radius: 999px;
          font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 4px 13px; margin-bottom: 12px;
        }
        .p-h2 {
          font-size: clamp(1.55rem,3vw,2.15rem);
          font-weight: 800; color: var(--ink);
          letter-spacing: -.025em; line-height: 1.15;
          margin: 0 0 12px;
        }
        .p-h3 { font-size: clamp(1.1rem,2vw,1.4rem); font-weight: 700; line-height: 1.3; margin: 0 0 12px; color: var(--ink); }
        .p-lead {
          font-size: clamp(.9rem,1.4vw,1rem);
          color: var(--ink3); line-height: 1.75;
          max-width: 640px; margin: 0;
        }

        /* Notice block */
        .p-notice { background: #fff; border: 1px solid var(--notice-border); border-radius: var(--r); padding: 32px; }
        .p-notice__badge { display: inline-block; background: #fef9c3; border: 1px solid #fde047; color: #854d0e; border-radius: 6px; font-size: 13px; font-weight: 700; padding: 5px 12px; }

        /* Steps */
        .p-steps {
          list-style: none; padding: 0; margin: 0 0 44px;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        @media (max-width: 680px) { .p-steps { grid-template-columns: 1fr; } }
        .p-step {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--r); padding: 26px 22px;
          transition: border-color .18s, box-shadow .18s, transform .18s;
        }
        .p-step:hover {
          border-color: var(--lime);
          box-shadow: 0 8px 28px rgba(101,163,13,.12);
          transform: translateY(-3px);
        }
        .p-step__n {
          display: inline-block;
          font-size: 10.5px; font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--lime); background: var(--lime-pale);
          border: 1.5px solid var(--lime-ring); border-radius: 999px;
          padding: 3px 10px; margin-bottom: 14px;
        }
        .p-step__title { font-size: .97rem; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
        .p-step__desc  { font-size: .87rem; color: var(--ink3); line-height: 1.65; margin: 0; }

        .p-cta-row { text-align: center; }

        /* Requirements table */
        .p-table-wrap { overflow-x: auto; margin: 24px 0; border-radius: var(--r); border: 1px solid var(--border); }
        .p-table { width: 100%; border-collapse: collapse; font-size: .92rem; background: var(--bg); }
        .p-table thead { background: var(--ink); color: #fff; }
        .p-table thead th { padding: 14px 16px; text-align: left; font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
        .p-table tbody tr { border-bottom: 1px solid var(--border); transition: background .15s; }
        .p-table tbody tr:last-child { border-bottom: none; }
        .p-table tbody tr:hover { background: var(--bg2); }
        .p-table td { padding: 12px 16px; vertical-align: middle; }
        .p-table__src { font-size: .82rem; color: var(--ink3); }

        /* List */
        .p-list { padding-left: 0; margin: 0 0 12px; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .p-list li { padding-left: 24px; position: relative; font-size: .97rem; line-height: 1.55; color: var(--ink2); }
        .p-list li::before { content: "✓"; position: absolute; left: 0; top: 1px; color: var(--lime); font-weight: 800; font-size: .85rem; }

        /* SEO prose */
        .p-prose-wrap { max-width: 860px; }
        .p-prose { margin-bottom: 36px; }
        .p-prose p {
          font-size: clamp(.9rem,1.4vw,1rem);
          color: var(--ink2); line-height: 1.8; margin: 0 0 16px;
        }
        .p-prose strong { color: var(--ink); font-weight: 600; }
        .mt-4 { margin-top: 16px; }
        .mt-6 { margin-top: 24px; }
        .mt-8 { margin-top: 32px; }

        /* Benefits */
        .p-benefits {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 18px;
        }
        @media (max-width: 860px) { .p-benefits { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 520px)  { .p-benefits { grid-template-columns: 1fr; } }
        .p-benefit {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--r); padding: 24px 20px;
          transition: border-color .18s, box-shadow .18s, transform .18s;
        }
        .p-benefit:hover {
          border-color: var(--lime);
          box-shadow: 0 6px 22px rgba(101,163,13,.12);
          transform: translateY(-3px);
        }
        .p-benefit__icon  { font-size: 1.8rem; display: block; margin-bottom: 12px; }
        .p-benefit__title { font-size: .95rem; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
        .p-benefit__desc  { font-size: .85rem; color: var(--ink3); line-height: 1.65; margin: 0; }

        /* Docs */
        .p-docs {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
        }
        @media (max-width: 700px) { .p-docs { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 420px) { .p-docs { grid-template-columns: 1fr; } }
        .p-doc {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 6px;
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--r); padding: 22px 14px;
          transition: border-color .18s, transform .15s;
        }
        .p-doc:hover { border-color: var(--lime); transform: translateY(-2px); }
        .p-doc__icon   { font-size: 1.9rem; }
        .p-doc__name   { font-size: .9rem; font-weight: 700; color: var(--ink); margin: 0; }
        .p-doc__detail { font-size: .76rem; color: var(--ink3); margin: 0; }

        /* Reviews */
        .p-reviews {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 18px;
        }
        @media (max-width: 780px) { .p-reviews { grid-template-columns: 1fr; gap: 14px; } }
        .p-review {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--r); padding: 24px 20px; margin: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .p-review__stars { color: #f59e0b; font-size: 14px; letter-spacing: 1px; }
        .p-review__text  { margin: 0; }
        .p-review__text p {
          font-size: .9rem; color: var(--ink2);
          line-height: 1.7; margin: 0; font-style: italic;
        }
        .p-review__author {
          display: flex; align-items: center; gap: 10px;
          font-size: .85rem; color: var(--ink3);
        }
        .p-review__author strong { color: var(--ink); font-weight: 700; }
        .p-review__avatar {
          width: 34px; height: 34px;
          background: var(--lime-pale); border: 1.5px solid var(--lime-ring);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--lime-dk); flex-shrink: 0;
        }

        /* FAQ */
        .p-faq-wrap { max-width: 800px; }
        .p-faqs { display: flex; flex-direction: column; gap: 10px; }
        .p-faq {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--r); overflow: hidden;
          transition: border-color .18s, box-shadow .18s;
        }
        .p-faq[open] {
          border-color: var(--lime-ring);
          box-shadow: 0 4px 16px rgba(101,163,13,.09);
        }
        .p-faq__q {
          display: flex; justify-content: space-between;
          align-items: center; gap: 12px;
          padding: 18px 20px; font-size: .95rem; font-weight: 600;
          color: var(--ink); cursor: pointer; list-style: none;
          transition: background .15s;
        }
        .p-faq__q::-webkit-details-marker { display: none; }
        .p-faq__q:hover { background: var(--lime-pale); }
        .p-faq__icon {
          flex-shrink: 0; width: 24px; height: 24px;
          background: var(--lime-pale); border: 1.5px solid var(--lime-ring);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: var(--lime-dk); font-size: 14px; font-weight: 700;
          transition: transform .22s, background .18s, color .18s;
        }
        details[open] .p-faq__icon {
          transform: rotate(45deg);
          background: var(--lime); color: #fff; border-color: var(--lime);
        }
        .p-faq__a {
          padding: 12px 20px 18px; font-size: .9rem;
          color: var(--ink2); line-height: 1.74;
          border-top: 1px solid var(--border); margin: 0;
        }

        /* Bottom CTA */
        .p-bottom {
          background: var(--ink);
          padding: clamp(64px,10vw,108px) 0;
          text-align: center;
        }
        .p-bottom__inner { display: flex; flex-direction: column; align-items: center; }
        .p-bottom__pre {
          font-size: 11px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: var(--lime-lt); margin-bottom: 14px; display: block;
        }
        .p-bottom__title {
          font-size: clamp(1.8rem,4vw,2.85rem);
          font-weight: 900; color: #fff;
          letter-spacing: -.03em; line-height: 1.1; margin: 0 0 16px;
        }
        .p-bottom__lime { color: var(--lime-lt); }
        .p-bottom__sub {
          font-size: clamp(.9rem,1.5vw,1rem); color: rgba(255,255,255,.6);
          max-width: 520px; line-height: 1.72; margin: 0 0 34px;
        }
        .p-bottom__micro {
          display: flex; align-items: center; gap: 7px;
          margin-top: 16px; font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,.4);
        }
        .p-bottom__micro svg { color: var(--lime-lt); opacity: .7; flex-shrink: 0; }

        /* Disclaimer */
        .p-disclaimer {
          background: #f1f5f9;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 18px 0;
        }
        .p-disclaimer__inner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .p-disclaimer__inner svg {
          flex-shrink: 0;
          color: var(--ink3);
          margin-top: 2px;
        }
        .p-disclaimer__text {
          font-size: 12px;
          color: var(--ink3);
          line-height: 1.7;
          margin: 0;
        }
        .p-disclaimer__text strong {
          color: var(--ink2);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}