import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CardGrid, CheckList, DoDont, DataTable, Badge,
  FaqList, CtaBand, JsonLd, Prose, textLink, RelatedPages, QuickFacts,
} from "../components/ui";

/* ─── Metadata ─── */
const pageUrl = "https://www.pixpassport.com/de/passbild-mit-brille";
const pageTitle = "Passbild mit Brille: Regeln & Tipps 2026 | PixPassport";
const pageDescription =
  "Biometrische Passbilder mit Brille sind erlaubt – ohne Spiegelung, Tönung und verdeckenden Rahmen. Regeln, Tipps und Ausnahmen wie das USA-Visum.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "biometrische passbilder mit brille",
    "passfoto mit brille",
    "passbild mit brille",
    "passbild brille",
    "passfoto mit oder ohne brille",
    "biometrisches passbild mit oder ohne brille",
    "ausweisfoto mit brille",
    "brille auf passbild",
    "biometrisches passfoto mit brille",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: "Wann eine Brille auf dem biometrischen Passbild erlaubt ist, wann nicht – und wie das Foto ohne Spiegelung gelingt.",
    url: pageUrl,
    siteName: "PixPassport",
    type: "article",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Biometrisches Passbild mit Brille – Regeln und Tipps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: "Brille auf dem Passbild: erlaubt, wenn die Augen frei sind und nichts spiegelt. Regeln und Tipps.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Data ─── */
const trustBadges = [
  { icon: "👓", text: "Für Brillenträger" },
  { icon: "🔍", text: "Vorschau vor dem Kauf" },
  { icon: "🔒", text: "Löschung nach 24 Stunden" },
  { icon: "⚡", text: "Fertig in 30 Sekunden" },
];

const rules = [
  {
    title: "Augen und Iris klar sichtbar",
    desc: "Beide Augen müssen offen und vollständig zu erkennen sein. Die Iris darf weder vom Rahmen noch von einer Spiegelung verdeckt werden.",
  },
  {
    title: "Keine Spiegelungen auf den Gläsern",
    desc: "Lichtreflexe von Blitz, Fenster oder Lampe sind der häufigste Ablehnungsgrund bei Brillenträgern. Entspiegelte Gläser helfen.",
  },
  {
    title: "Keine getönten Gläser",
    desc: "Sonnenbrillen und getönte oder selbsttönende Gläser sind nicht erlaubt. Ausnahmen gibt es nur aus medizinischen Gründen.",
  },
  {
    title: "Rahmen darf die Augen nicht verdecken",
    desc: "Der Brillenrand darf nicht durch die Augen laufen. Sehr dicke oder tief sitzende Gestelle sind problematisch.",
  },
];

const compareRows = [
  ["Erlaubt in DE, AT, CH", "Ja, unter Bedingungen", "Ja"],
  ["Ablehnungsrisiko", "Höher (Spiegelung, Rahmen)", "Gering"],
  ["Wiedererkennung im Alltag", "Besser, wenn Sie die Brille ständig tragen", "Gut bei Kontaktlinsen oder seltenem Tragen"],
  ["USA-Visum und US-Pass", "Nicht erlaubt", "Pflicht"],
  ["Aufwand bei der Aufnahme", "Licht und Kopfhaltung genau beachten", "Kein zusätzlicher Aufwand"],
];

const tips = [
  {
    title: "Gläser gründlich reinigen",
    desc: "Fingerabdrücke und Staub erzeugen Unschärfe und verstärken Reflexe. Putzen Sie die Brille direkt vor der Aufnahme.",
  },
  {
    title: "Ohne Blitz fotografieren",
    desc: "Nutzen Sie weiches Tageslicht von vorn, etwa vor einem Fenster. Ein Blitz spiegelt sich fast immer in den Gläsern.",
  },
  {
    title: "Seitliche Lichtquellen vermeiden",
    desc: "Lampen links oder rechts erzeugen helle Flecken auf den Gläsern. Schalten Sie sie aus oder stellen Sie sich anders hin.",
  },
  {
    title: "Brille richtig sitzen lassen",
    desc: "Schieben Sie die Brille ganz nach oben, damit der Rahmen über den Pupillen liegt und die Augen frei sind.",
  },
  {
    title: "Kopf gerade halten",
    desc: "Kopf nicht neigen, um Reflexe zu vermeiden. Bewegen Sie lieber die Lichtquelle – der Kopf muss frontal bleiben.",
  },
  {
    title: "Mehrere Aufnahmen machen",
    desc: "Fotografieren Sie drei bis fünf Bilder und prüfen Sie jedes vergrößert auf Spiegelungen, bevor Sie eines auswählen.",
  },
];

const doList = [
  "Tragen Sie Ihre Alltagsbrille mit klaren, möglichst entspiegelten Gläsern.",
  "Achten Sie darauf, dass der Rahmen oberhalb der Pupillen liegt.",
  "Fotografieren Sie bei diffusem Tageslicht ohne Blitz.",
  "Prüfen Sie das Foto vergrößert auf Lichtpunkte in den Gläsern.",
  "Nehmen Sie die Brille im Zweifel ab – das ist immer zulässig.",
];

const dontList = [
  "Keine Sonnenbrille und keine getönten oder selbsttönenden Gläser.",
  "Kein Blitz und keine Ringleuchte direkt vor dem Gesicht.",
  "Keine Brille, deren Rahmen durch die Augen läuft.",
  "Kein Kippen des Kopfes, um Reflexe zu umgehen.",
  "Keine farbigen Kontaktlinsen, die die Augenfarbe verändern.",
];

const countries = [
  ["Deutschland", <Badge key="de">Erlaubt</Badge>, "Augen frei, keine Spiegelung, keine Tönung"],
  ["Österreich", <Badge key="at">Erlaubt</Badge>, "Gleiche Bedingungen wie in Deutschland"],
  ["Schweiz", <Badge key="ch">Erlaubt</Badge>, "Gesicht von Kinn bis Stirn frei, keine getönten Gläser"],
  ["Schengen-Visum", <Badge key="sv">Erlaubt</Badge>, "Nach ICAO-Norm, Augen klar sichtbar"],
  ["USA (Visum und Reisepass)", <Badge key="us" tone="amber">Nicht erlaubt</Badge>, "Seit November 2016; Ausnahme nur mit ärztlichem Attest"],
];

const specialCases = [
  {
    title: "Kontaktlinsen",
    desc: "Klare Kontaktlinsen sind problemlos. Farbige Linsen, die die natürliche Augenfarbe verändern, sind nicht zulässig.",
  },
  {
    title: "Kinder mit Brille",
    desc: "Für Kinder gelten dieselben Brillenregeln. Bei Kleinkindern ist es oft einfacher, die Brille für das Foto abzunehmen.",
  },
  {
    title: "Medizinisch getönte Gläser",
    desc: "Wer aus gesundheitlichen Gründen getönte Gläser braucht, sollte das vorab mit der Behörde klären. Ein Attest kann nötig sein.",
  },
  {
    title: "Brille nicht mehr tragen",
    desc: "Ihr Ausweis bleibt gültig, solange Sie auf dem Foto eindeutig erkennbar sind. Ein neues Foto ist dafür nicht vorgeschrieben.",
  },
];

const benefits = [
  "Vergrößerte Vorschau, in der Sie Spiegelungen auf den Gläsern sofort erkennen.",
  "Zuschnitt auf 35 × 45 mm mit korrekter Gesichtshöhe nach ICAO 9303.",
  "Hintergrund wird automatisch durch einheitliches Hellgrau ersetzt.",
  "Mehrere Versuche ohne Kosten – bezahlt wird erst ab 6,99 € für den Download.",
  "Fotos werden spätestens nach 24 Stunden automatisch gelöscht.",
];

const faqs = [
  {
    q: "Darf man auf biometrischen Passbildern eine Brille tragen?",
    a: "Ja. In Deutschland, Österreich und der Schweiz sind biometrische Passbilder mit Brille erlaubt. Die Augen müssen dabei klar erkennbar sein, die Gläser dürfen nicht spiegeln oder getönt sein, und der Rahmen darf die Augen nicht verdecken. Ob Sie die Brille tragen oder abnehmen, entscheiden Sie selbst.",
  },
  {
    q: "Passfoto mit oder ohne Brille – was ist besser?",
    a: "Ohne Brille ist das Ablehnungsrisiko geringer, weil Spiegelungen und störende Rahmen wegfallen. Wenn Sie die Brille jedoch ständig tragen, erkennt man Sie mit Brille im Alltag oft besser. Beides ist zulässig. Wer auf Nummer sicher gehen will, nimmt die Brille ab.",
  },
  {
    q: "Warum wird mein Passbild mit Brille abgelehnt?",
    a: "Die häufigsten Gründe sind Lichtreflexe auf den Gläsern, ein Rahmen, der durch die Augen läuft, getönte Gläser und ein geneigter Kopf. Auch Schatten des Brillengestells unter den Augen können zur Ablehnung führen.",
  },
  {
    q: "Wie vermeide ich Spiegelungen in der Brille auf dem Passfoto?",
    a: "Fotografieren Sie ohne Blitz bei weichem Tageslicht von vorn, schalten Sie seitliche Lampen aus und reinigen Sie die Gläser vorher. Entspiegelte Gläser helfen deutlich. Den Kopf zu neigen ist keine Lösung, weil er frontal bleiben muss – verändern Sie lieber die Position der Lichtquelle.",
  },
  {
    q: "Sind getönte oder selbsttönende Gläser erlaubt?",
    a: "Nein. Sonnenbrillen, getönte und selbsttönende Gläser sind auf Passbildern nicht zulässig. Selbsttönende Gläser können sich bei hellem Licht verdunkeln, deshalb sollten Sie sie für die Aufnahme abnehmen. Nur bei medizinischer Notwendigkeit sind Ausnahmen möglich – klären Sie das vorab mit der Behörde.",
  },
  {
    q: "Ist eine Brille auf dem Foto für das USA-Visum erlaubt?",
    a: "Nein. Seit November 2016 akzeptieren die USA keine Fotos mit Brille mehr – weder für Visa noch für US-Reisepässe. Eine Ausnahme gibt es nur aus medizinischen Gründen, etwa nach einer Augenoperation, und dann mit ärztlichem Attest.",
  },
  {
    q: "Darf ich farbige Kontaktlinsen auf dem Passbild tragen?",
    a: "Klare Kontaktlinsen sind kein Problem. Farbige Kontaktlinsen, die Ihre natürliche Augenfarbe verändern, sind nicht zulässig, da sie die biometrische Erkennung beeinträchtigen können.",
  },
  {
    q: "Muss ich ein neues Passbild machen, wenn ich keine Brille mehr trage?",
    a: "Nein, nicht zwingend. Ihr Ausweis bleibt gültig, solange Sie auf dem Foto eindeutig erkennbar sind. Bei einem neuen Antrag brauchen Sie ohnehin ein aktuelles Foto, das Ihr heutiges Aussehen zeigt.",
  },
];

/* ─── JSON-LD structured data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "de",
      dateModified: "2026-11-04",
      isPartOf: { "@type": "WebSite", name: "PixPassport", url: "https://www.pixpassport.com/de" },
    },
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
      name: "Passfoto mit Brille ohne Spiegelung aufnehmen",
      step: tips.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.desc })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Biometrisches Passbild", item: "https://www.pixpassport.com/de/biometrisches-passbild" },
        { "@type": "ListItem", position: 3, name: "Passbild mit Brille", item: pageUrl },
      ],
    },
  ],
};

/* ─── Page ─── */
export default function PassbildMitBrillePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[
          { label: "Startseite", href: "/de" },
          { label: "Biometrisches Passbild", href: "/de/biometrisches-passbild" },
          { label: "Passbild mit Brille" },
        ]}
        eyebrow="Ratgeber · Stand 2026"
        title="Biometrische Passbilder mit Brille: erlaubt oder nicht?"
        intro="Kurz gesagt: Ja, eine Brille ist auf dem Passbild erlaubt – wenn die Augen klar sichtbar sind, nichts spiegelt und die Gläser nicht getönt sind. Hier finden Sie alle Regeln, Tipps gegen Reflexe und die Länder, in denen die Brille ab muss."
        primary={{ href: ctaHref, label: "Foto mit Brille prüfen" }}
        secondary={{ href: "#regeln", label: "Die 4 Regeln" }}
        note="4,9 von 5 Sternen · über 17.000 zufriedene Nutzer"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Biometrisches Passbild mit Maßlinien für Augenposition – Grundlage für Passbilder mit Brille",
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

      <QuickFacts
        items={[
          { label: "Brille in DE, AT, CH", value: "Erlaubt" },
          { label: "Spiegelung auf den Gläsern", value: "Nicht erlaubt" },
          { label: "Sonnen- oder getönte Brille", value: "Nicht erlaubt" },
          { label: "USA-Visum und US-Pass", value: "Ohne Brille" },
        ]}
      />

      <Section width="4xl" labelledBy="allowed-h2">
        <SectionHeader id="allowed-h2" title="Passfoto mit Brille: Ist das erlaubt?" />
        <Prose>
          <p>
            Ja. Für Reisepass, Personalausweis und Aufenthaltstitel dürfen Sie in Deutschland eine Brille tragen. Die
            Vorgaben der Passverordnung und der Foto-Mustertafel des Bundesinnenministeriums verbieten die Brille nicht,
            sondern stellen Bedingungen: Die Augen müssen frei, die Gläser klar und das Bild frei von Spiegelungen sein.
          </p>
          <p>
            Der Grund ist die Gesichtserkennung. Die Software am Ausweis-Chip vermisst unter anderem den Abstand der
            Pupillen und die Form der Augenpartie. Ein Lichtreflex oder ein Rahmen, der durch die Iris läuft, verfälscht
            diese Messung – deshalb werden genau solche Fotos abgelehnt.
          </p>
          <p>
            Dieselben Regeln gelten für das{" "}
            <Link href="/de/reisepass-foto" className={textLink}>Reisepassfoto</Link>, das{" "}
            <Link href="/de/personalausweis-foto" className={textLink}>Foto für den Personalausweis</Link> und den{" "}
            <Link href="/de/fuehrerschein-foto" className={textLink}>Führerschein</Link>. Alle weiteren Vorgaben finden Sie
            im Ratgeber <Link href="/de/biometrisches-passbild" className={textLink}>biometrisches Passbild</Link>.
          </p>
        </Prose>
      </Section>

      <Section muted id="regeln" labelledBy="rules-h2">
        <SectionHeader
          id="rules-h2"
          eyebrow="Offizielle Vorgaben"
          title="Die 4 Regeln für biometrische Passbilder mit Brille"
          intro="Ist eine dieser Bedingungen nicht erfüllt, lehnt die Behörde das Foto ab."
        />
        <CardGrid cols={4} items={rules} />
      </Section>

      <Section width="4xl" labelledBy="compare-h2">
        <SectionHeader
          id="compare-h2"
          eyebrow="Entscheidungshilfe"
          title="Passbild mit oder ohne Brille – was ist besser?"
          intro="Beides ist erlaubt. Der Vergleich zeigt, wann sich welche Variante lohnt."
        />
        <DataTable
          stack
          caption="Passbild mit oder ohne Brille im Vergleich"
          head={["Kriterium", "Mit Brille", "Ohne Brille"]}
          rows={compareRows}
        />
        <div className="mt-6">
          <Prose>
            <p>
              <strong>Unsere Empfehlung:</strong> Tragen Sie die Brille fast immer, machen Sie das Foto mit Brille und
              achten Sie auf Reflexe. Tragen Sie sie nur gelegentlich oder nutzen Sie Kontaktlinsen, nehmen Sie sie ab.
            </p>
          </Prose>
        </div>
      </Section>

      <Section muted labelledBy="tips-h2">
        <SectionHeader
          id="tips-h2"
          eyebrow="Schritt für Schritt"
          title="So gelingt das Passfoto mit Brille: 6 Tipps"
          intro="Mit diesen Handgriffen vermeiden Sie Spiegelungen und Schatten – zu Hause oder beim Fotografen."
        />
        <StepsGrid steps={tips} />
      </Section>

      <Section labelledBy="check-h2">
        <SectionHeader id="check-h2" eyebrow="Checkliste" title="Brille auf dem Passbild: Das gilt" />
        <DoDont dos={doList} donts={dontList} />
      </Section>

      <Section muted width="4xl" labelledBy="country-h2">
        <SectionHeader
          id="country-h2"
          eyebrow="Länder im Vergleich"
          title="Ausweisfoto mit Brille in anderen Ländern"
          intro="Die meisten Länder folgen der ICAO-Norm und erlauben die Brille. Die wichtigste Ausnahme sind die USA."
        />
        <DataTable
          stack
          caption="Brille auf dem Passbild nach Land"
          head={["Land / Dokument", "Brille", "Hinweis"]}
          rows={countries}
        />
        <div className="mt-6">
          <Prose>
            <p>
              Vorgaben weiterer Länder finden Sie im Ratgeber{" "}
              <Link href="/de/visum-foto" className={textLink}>Visumfoto nach Land</Link>.
            </p>
          </Prose>
        </div>
      </Section>

      <Section labelledBy="special-h2">
        <SectionHeader
          id="special-h2"
          eyebrow="Sonderfälle"
          title="Kontaktlinsen, Kinder und getönte Gläser"
          intro="Antworten auf die Situationen, die in der Praxis am häufigsten Fragen aufwerfen."
        />
        <CardGrid cols={4} items={specialCases} />
      </Section>

      <Section muted labelledBy="why-h2">
        <div className="max-w-3xl">
          <SectionHeader
            id="why-h2"
            eyebrow="Warum PixPassport"
            title="Biometrisches Passfoto mit Brille vorab prüfen"
            intro="Ob Ihre Gläser spiegeln, sehen Sie oft erst auf dem fertigen Bild. Mit PixPassport prüfen Sie das vor dem Termin oder der Abgabe."
          />
          <CheckList items={benefits} />
        </div>
      </Section>

      <Section width="3xl" labelledBy="faq-h2">
        <SectionHeader
          id="faq-h2"
          eyebrow="Häufige Fragen"
          title="FAQ: Passbild mit Brille"
          intro="Antworten zu Spiegelungen, getönten Gläsern, Kontaktlinsen und Länderregeln."
        />
        <FaqList items={faqs} />
      </Section>

      <RelatedPages keys={["biometrisch", "reisepass", "personalausweis", "selber", "visum", "fuehrerschein"]} />

      <CtaBand
        title="Ihr Passfoto mit Brille jetzt prüfen"
        text="Foto hochladen, Vorschau kostenlos ansehen und erst bei Gefallen ab 6,99 € herunterladen."
        href={ctaHref}
        label="Foto mit Brille prüfen"
      />
    </>
  );
}
