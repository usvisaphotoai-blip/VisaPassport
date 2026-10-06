import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CardGrid, CheckList, FaqList, CtaBand, JsonLd, Badge, card, textLink,
} from "../components/ui";

const ctaHref = "/de/passbild-online?type=switzerland-passport";

export const metadata: Metadata = {
  title: "Passfoto Schweiz: Format, Anforderungen & online vorbereiten",
  description:
    "Passfoto Schweiz: 35 × 45 mm, biometrische Anforderungen nach fedpol-Fotomustertafel, Brillen- und Kopfbedeckungsregeln sowie praktische Tipps fürs Smartphone.",
  alternates: {
    canonical: "https://www.pixpassport.com/de/passfoto-schweiz-online",
    languages: {
      "de-CH": "https://www.pixpassport.com/de/passfoto-schweiz-online",
    },
  },
  openGraph: {
    title: "Passfoto Schweiz: Format & Anforderungen",
    description:
      "35 × 45 mm, 29–34 mm Gesichtshöhe und die wichtigsten Aufnahmehinweise für Schweizer Passfotos nach der fedpol-Fotomustertafel.",
    url: "https://www.pixpassport.com/de/passfoto-schweiz-online",
    siteName: "PixPassport",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
        width: 843,
        height: 671,
        alt: "Beispiel eines hell und gleichmässig ausgeleuchteten Schweizer Passfotos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passfoto Schweiz: Format & Anforderungen",
    description:
      "Die wichtigsten Anforderungen für ein Schweizer Passfoto, einfach erklärt.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"],
  },
};

const specifications = [
  ["Format", "35 × 45 mm", "Hochformat, ohne Rand, randscharf zugeschnitten"],
  ["Gesichtshöhe", "29–34 mm", "Von der Kinnspitze bis zur Schädeldecke"],
  ["Fotoalter", "Max. 12 Monate", "Muss das aktuelle Aussehen zeigen"],
  ["Hintergrund", "Hell & einfarbig", "Ohne Schatten, Muster oder Gegenstände"],
];

const requirements = [
  {
    title: "Gerade & frontal",
    text: "Kopf und Schultern stehen gerade zur Kamera. Beide Augen sind offen, auf gleicher Höhe sichtbar und blicken direkt ins Objektiv.",
  },
  {
    title: "Neutraler Ausdruck",
    text: "Der Mund bleibt geschlossen, das Gesicht wirkt entspannt. Ein neutraler Ausdruck hält alle Gesichtsmerkmale klar erkennbar.",
  },
  {
    title: "Keine Brille",
    text: "Seit 2010 sind Brillen auf Schweizer Passfotos grundsätzlich nicht mehr zulässig, da Fassung und Reflexionen die Augen verdecken können. Nur bei zwingender medizinischer Notwendigkeit ist eine Ausnahme möglich.",
  },
  {
    title: "Kopf frei sichtbar",
    text: "Mützen, Kappen und Hüte sind nicht erlaubt. Religiöse oder medizinisch begründete Kopfbedeckungen sind zulässig, sofern das Gesicht von Kinn bis Stirn und von Ohr zu Ohr vollständig sichtbar bleibt.",
  },
  {
    title: "Gleichmässiges Licht",
    text: "Weiches Licht von vorne vermeidet Schatten im Gesicht und auf dem Hintergrund sowie störende Hautreflexionen und rote Augen.",
  },
  {
    title: "Scharf & unverfälscht",
    text: "Verwenden Sie die hochauflösende Originalaufnahme ohne Filter oder Bildbearbeitung. Das Foto muss scharf und kontrastreich sein und darf keine sichtbare Pixelstruktur zeigen.",
  },
];

const steps = [
  ["Kamera aufstellen", "Positionieren Sie das Handy auf Augenhöhe. Ein Stativ oder eine zweite Person sorgt für eine natürlichere Perspektive als ein nahes Selfie."],
  ["Ruhig positionieren", "Stellen Sie sich mit etwas Abstand vor eine helle, ungemusterte Wand. Lassen Sie oberhalb des Kopfes und um die Schultern ausreichend Platz."],
  ["Bei weichem Licht aufnehmen", "Nutzen Sie Tageslicht oder eine Lichtquelle von vorne. Prüfen Sie die Aufnahme direkt auf harte Schatten, Spiegelungen und Unschärfe."],
  ["Format vorbereiten", "Bereiten Sie das Originalfoto im Seitenverhältnis 35 × 45 mm vor und vergleichen Sie es vor der Einreichung mit den Vorgaben Ihrer zuständigen Stelle."],
];

const faqs = [
  {
    q: "Wie gross muss ein Passfoto in der Schweiz sein?",
    a: "Für Schweizer Pässe und Identitätskarten gilt laut fedpol-Fotomustertafel das Format 35 × 45 mm ohne Rand. Die Gesichtshöhe von der Kinnspitze bis zur Schädeldecke liegt bei Erwachsenen zwischen 29 und 34 mm. Für Säuglinge und Kinder bis 11 Jahre gelten bei Kopfhaltung und Ausdruck teils gelockerte Vorgaben.",
  },
  {
    q: "Kann ich das Schweizer Passfoto online vorbereiten?",
    a: "Sie können eine geeignete Datei online aus einem sauberen Originalfoto vorbereiten. Ob ein eigenes Foto für Ihren Antrag akzeptiert wird, hängt jedoch von Dokument und Kanton ab: Für den biometrischen Pass nehmen die meisten Passbüros das Foto vor Ort auf, da gleichzeitig Fingerabdrücke erfasst werden. Für die Identitätskarte akzeptieren viele Gemeinden ein mitgebrachtes Foto, sofern es der Fotomustertafel entspricht.",
  },
  {
    q: "Darf ich auf dem Schweizer Passfoto eine Brille tragen?",
    a: "Nein. Seit 2010 sind Brillen auf Passfotos in der Schweiz grundsätzlich verboten, weil Fassung und Glasreflexionen die Augenpartie verdecken können. Nur bei zwingender medizinischer Notwendigkeit ist eine Ausnahme möglich, wobei die Augen dabei vollständig und ohne Spiegelung sichtbar bleiben müssen.",
  },
  {
    q: "Sind Kopftuch, Kippa oder Turban auf dem Foto erlaubt?",
    a: "Religiös oder medizinisch begründete Kopfbedeckungen sind zulässig. Voraussetzung ist, dass das Gesicht von der Kinnspitze bis zum Haaransatz und von Ohr zu Ohr vollständig sichtbar bleibt, damit die Gesichtserkennung nicht beeinträchtigt wird.",
  },
  {
    q: "Welcher Hintergrund ist für ein Schweizer Passfoto geeignet?",
    a: "Der Hintergrund muss hell, einfarbig und gleichmässig ausgeleuchtet sein. Er darf keine Schatten, Muster oder Gegenstände enthalten und muss sich klar von Kopf und Haaren abheben.",
  },
  {
    q: "Wie aktuell muss das Passfoto sein?",
    a: "Gemäss fedpol-Fotomustertafel darf das Foto bei der Antragstellung höchstens 12 Monate alt sein. Bei Kindern empfiehlt fedpol ein besonders frisches Foto, weil sich das Erscheinungsbild schnell verändert.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Passfoto Schweiz: Format, Anforderungen & online vorbereiten",
      description:
        "Leitfaden zu Format und Fotoanforderungen für Schweizer Passfotos gemäss fedpol-Fotomustertafel.",
      inLanguage: "de-CH",
      url: "https://www.pixpassport.com/de/passfoto-schweiz-online",
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
        caption: "Beispiel eines neutral ausgeleuchteten Schweizer Passfotos",
      },
    },
    {
      "@type": "HowTo",
      name: "Schweizer Passfoto mit dem Smartphone vorbereiten",
      description:
        "Vier Schritte für eine geeignete Ausgangsaufnahme vor der Prüfung durch die zuständige Stelle.",
      step: steps.map(([name, text], position) => ({
        "@type": "HowToStep",
        position: position + 1,
        name,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Passfoto Schweiz", item: "https://www.pixpassport.com/de/passfoto-schweiz-online" },
      ],
    },
  ],
};

const checklist = [
  "Termin- oder Einreichungshinweise der zuständigen Stelle vorab lesen.",
  "Nur die scharfe Originaldatei verwenden, nicht aus einem Messenger oder Screenshot weiterleiten.",
  "Brille abnehmen und Kopfbedeckung nur bei religiösem oder medizinischem Grund tragen.",
  "Bei Ausdruck: Fotopapier, Anzahl der Bilder und rechtwinklige Ecken nach Vorgabe prüfen.",
  "Bei Unsicherheit vor dem Termin direkt beim Passbüro oder der Einwohnerkontrolle nachfragen.",
];

export default function PassfotoSchweizPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Passfoto Schweiz" }]}
        eyebrow="Schweizer Passfoto · fedpol-Fotomustertafel"
        title="Passfoto Schweiz: richtiges Format, klarer Ablauf"
        intro="Die fedpol-Fotomustertafel schreibt für Schweizer Pass und Identitätskarte ein Format von 35 × 45 mm vor: frontal, ohne Brille und mit hellem, gleichmässigem Hintergrund. Bereiten Sie eine saubere Aufnahme vor und klären Sie den Einreichungsweg vorab mit Ihrer kantonalen Stelle."
        primary={{ href: ctaHref, label: "Passfoto vorbereiten" }}
        secondary={{ href: "#anforderungen", label: "Anforderungen ansehen" }}
        note="Ab CHF 15.99 · Ergebnis vorher kostenlos ansehen"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
          alt: "Schweizer Passfoto im Format 35 × 45 mm mit Maßlinien für die Gesichtshöhe",
          width: 843,
          height: 671,
        }}
      >
        <p className="mt-6 rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <strong>Wichtig:</strong> Beim biometrischen Pass nimmt das Passbüro das Foto meist vor Ort auf, da gleichzeitig
          Fingerabdrücke erfasst werden. Für die Identitätskarte akzeptieren viele Gemeinden ein mitgebrachtes Foto.
        </p>
      </Hero>

      <Section muted labelledBy="masse-h2">
        <SectionHeader
          id="masse-h2"
          eyebrow="Die Masse im Überblick"
          title="Was Ihr Passfoto erfüllen muss"
          intro="Die fedpol-Fotomustertafel definiert Format, Gesichtsgrösse, Fotoalter und Bildqualität für Pass und Identitätskarte. Bei Kindern sowie bei medizinischen oder religiösen Ausnahmen gelten teils abweichende Regeln."
        />
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specifications.map(([label, value, detail]) => (
            <div key={label} className={card}>
              <dt className="text-xs font-bold uppercase tracking-widest text-lime-700">{label}</dt>
              <dd className="mt-3">
                <span className="block text-xl font-extrabold text-slate-900">{value}</span>
                <span className="mt-1 block text-sm text-slate-600">{detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="anforderungen" labelledBy="req-h2">
        <SectionHeader
          id="req-h2"
          eyebrow="Biometrische Anforderungen"
          title="Sechs Merkmale eines guten Passfotos"
          intro="Diese Punkte orientieren sich an der fedpol-Fotomustertafel und dem ICAO-9303-Standard. Über die Annahme entscheidet stets die zuständige Behörde."
        />
        <CardGrid items={requirements.map((r) => ({ title: r.title, desc: r.text }))} />
      </Section>

      <Section muted labelledBy="steps-h2">
        <SectionHeader
          id="steps-h2"
          eyebrow="Mit dem Smartphone"
          title="In vier Schritten zur passenden Aufnahme"
          intro="Ein einfacher Ablauf für zu Hause – ohne kompliziertes Setup."
        />
        <StepsGrid steps={steps.map(([title, desc]) => ({ title, desc }))} />
      </Section>

      <Section labelledBy="submit-h2">
        <div className="grid gap-8 lg:grid-cols-2">
          <SectionHeader
            id="submit-h2"
            eyebrow="Für die Einreichung"
            title="Vor dem Termin prüfen"
            intro={
              <>
                Speichern Sie Ihre Originaldatei in hoher Auflösung und klären Sie, ob Ihre Behörde einen Ausdruck, eine
                digitale Datei oder die Aufnahme vor Ort verlangt. Für weitere Ausweise lesen Sie unseren{" "}
                <Link href="/de/dokumentenfoto-schweiz" className={textLink}>Guide zum Dokumentenfoto Schweiz</Link>.
              </>
            }
          />
          <div className={card}>
            <CheckList items={checklist} />
          </div>
        </div>
      </Section>

      <Section muted width="3xl" labelledBy="faq-h2">
        <SectionHeader id="faq-h2" eyebrow="Häufige Fragen" title="Passfoto Schweiz: FAQ" />
        <FaqList items={faqs} />
        <p className="mt-6 text-sm text-slate-600">
          Format: <Badge>35 × 45 mm</Badge> · Gesichtshöhe: <Badge>29–34 mm</Badge>
        </p>
      </Section>

      <CtaBand
        title="Passfoto online vorbereiten"
        text="Starten Sie mit Ihrem Originalfoto – Format und Hintergrund werden automatisch angepasst."
        href={ctaHref}
        label="Foto vorbereiten"
      />
    </>
  );
}
