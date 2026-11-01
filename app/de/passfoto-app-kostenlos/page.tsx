import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Section, SectionHeader, StepsGrid, CheckList, DataTable,
  FaqList, CtaBand, JsonLd, btnPrimary, textLink, ArrowRight, RelatedPages,
} from "../components/ui";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
const url = "https://www.pixpassport.com/de/passfoto-app-kostenlos";

export const metadata: Metadata = {
  title: "Passfoto-App kostenlos: Worauf achten? (2026) | PixPassport",
  description:
    "Passfoto-App kostenlos: Abo-Fallen und Wasserzeichen erkennen, Checkliste für iPhone & Android und die Alternative ohne Download. Vorschau gratis, ab 6,99 €.",
  keywords: [
    "passfoto app kostenlos",
    "passbild app kostenlos",
    "passfoto app iphone",
    "passfoto app android",
    "passfoto app ohne wasserzeichen",
    "beste passfoto app",
    "biometrisches passbild app",
    "passbild erstellen app",
  ],
  alternates: {
    canonical: url,
    languages: { de: url, "x-default": url },
  },
  openGraph: {
    title: "Passfoto-App kostenlos: Worauf Sie achten müssen | PixPassport",
    description:
      "Abo-Fallen, Wasserzeichen und Qualitätskriterien bei Passbild-Apps – plus eine Alternative ohne App-Download direkt im Browser.",
    url,
    siteName: "PixPassport",
    type: "article",
    locale: "de_DE",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Passfoto-App kostenlos – Ratgeber und Checkliste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passfoto-App kostenlos: Worauf Sie achten müssen",
    description: "Passbild-Apps für iPhone & Android: Abo-Fallen erkennen und das Passfoto ohne Download erstellen.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const ctaHref = "/de/passbild-online?type=germany-passport";

const traps = [
  <><strong className="text-slate-900">Verstecktes Abo:</strong> Aus der Testphase wird automatisch ein Dauerabo.</>,
  <><strong className="text-slate-900">Wasserzeichen:</strong> Erst nach dem Export sichtbar, ohne Zahlung unbrauchbar.</>,
  <><strong className="text-slate-900">Geringe Auflösung:</strong> Für den Druck brauchen Sie mindestens 300 dpi.</>,
  <><strong className="text-slate-900">Unnötige Rechte:</strong> Standort oder Kontakte braucht ein Passfoto nicht.</>,
];

const checklist = [
  "Ist der Preis vor dem Export klar sichtbar?",
  "Bleibt das Foto ohne Wasserzeichen?",
  "Werden 35 × 45 mm und 32–36 mm Kopfhöhe automatisch gesetzt?",
  "Gibt es eine Druckvorlage mit 300 dpi?",
  "Wird erklärt, wann Fotos gelöscht werden?",
];

const compare = [
  ["Installation", "Download nötig", "Direkt im Browser"],
  ["Kosten", "Oft Abo oder In-App-Käufe", "Einmalzahlung ab 6,99 €"],
  ["Prüfung", "Oft nur grober Rahmen", "ICAO-Norm und deutsche Schablone"],
  ["Druckvorlage", "Oft nur Einzelfoto", "10 × 15 cm Bogen"],
];

const steps = [
  {
    title: "Foto aufnehmen",
    desc: "Helle Wand, Tageslicht von vorn, Kamera auf Augenhöhe aus 1,5 bis 2 Metern. Filter ausschalten, neutral blicken.",
  },
  {
    title: "Im Browser hochladen",
    desc: "Öffnen Sie PixPassport auf dem Smartphone. Hintergrund und Zuschnitt werden automatisch angepasst.",
  },
  {
    title: "Prüfen und herunterladen",
    desc: "Vorschau kostenlos ansehen, dann Datei und 10 × 15 cm Druckvorlage laden und bei dm oder Rossmann drucken.",
  },
];

const faqs = [
  {
    q: "Welche Passfoto-App ist wirklich kostenlos?",
    a: "Viele Apps erlauben das Erstellen gratis, verlangen aber Geld für den Download in hoher Auflösung oder das Entfernen des Wasserzeichens. Prüfen Sie vorher, was im Gratis-Umfang enthalten ist. Bei PixPassport laden Sie Ihr Foto kostenlos hoch, lassen es freistellen und prüfen die Vorschau. Erst für den HD-Download fällt eine Einmalzahlung ab 6,99 € an, ohne Abo.",
  },
  {
    q: "Welche ist die beste Passfoto-App?",
    a: "Die eine beste App gibt es nicht, es kommt auf Ihren Zweck an. Achten Sie auf klare Preise, ein Ergebnis ohne Wasserzeichen, automatische Prüfung der Maße (35 × 45 mm, Kopfhöhe 32–36 mm), eine Druckvorlage mit 300 dpi und transparenten Datenschutz. Die Checkliste oben hilft beim Vergleichen.",
  },
  {
    q: "Gibt es Passfoto-Apps ohne Wasserzeichen und ohne Abo?",
    a: "Ja, aber prüfen Sie vor dem Export, ob das Foto wirklich ohne Wasserzeichen heruntergeladen werden kann und was es kostet. Bei PixPassport zahlen Sie einmalig für den HD-Download, die Vorschau davor ist kostenlos.",
  },
  {
    q: "Sind Passfoto-Apps für Behörden zugelassen?",
    a: "Die Entscheidung trifft immer die Behörde. Wichtig sind das Format 35 × 45 mm, die richtige Kopfhöhe (32–36 mm) und ein heller, schattenfreier Hintergrund. Für Reisepass und Personalausweis wird das Foto in Deutschland seit dem 1. Mai 2025 in der Regel digital übermittelt. Fragen Sie deshalb vorab bei Ihrem Amt nach.",
  },
  {
    q: "Funktioniert das mit iPhone und Android?",
    a: "Ja. Webbasierte Lösungen wie PixPassport laufen auf iPhone, iPad und Android direkt im Browser (Safari, Chrome, Firefox), ohne Download aus dem App Store oder von Google Play.",
  },
  {
    q: "Kann ich mit einer App ein biometrisches Passbild selber machen?",
    a: "Ja, eine App oder Web-Lösung kann Ihr Foto zuschneiden, den Hintergrund ersetzen und die Maße prüfen. Die Aufnahme selbst (Licht, Haltung, Mimik) müssen Sie aber richtig machen, denn Software kann ein verwackeltes oder schlecht beleuchtetes Foto nicht retten.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Passfoto-App kostenlos: Worauf Sie achten müssen",
      url,
      inLanguage: "de",
      datePublished: "2026-10-11",
      dateModified: "2026-10-11",
      mainEntityOfPage: url,
      image: "https://www.pixpassport.com/og-image.jpg",
      author: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/de" },
      publisher: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/de" },
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
      name: "Passfoto mit Smartphone und Web-App erstellen",
      description: "Biometrisches Passbild ohne App-Installation direkt im Browser erstellen.",
      totalTime: "PT1M",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassport.com/de" },
        { "@type": "ListItem", position: 2, name: "Passfoto-App kostenlos", item: url },
      ],
    },
  ],
};

export default function PassfotoAppKostenlosPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <Hero
        breadcrumb={[{ label: "Startseite", href: "/de" }, { label: "Passfoto-App kostenlos" }]}
        eyebrow="Ratgeber · Kein App-Download nötig"
        title="Passfoto-App kostenlos: Worauf Sie achten müssen"
        intro="Viele Passbild-Apps versprechen Gratis-Fotos, verlangen dann aber ein Abo oder Geld fürs Entfernen des Wasserzeichens. Erstellen Sie Ihr biometrisches Passbild stattdessen ohne Installation direkt im Browser."
        primary={{ href: ctaHref, label: "Passbild direkt online erstellen" }}
        secondary={{ href: "#fallen", label: "Abo-Fallen vermeiden" }}
        note="Ab 6,99 € · Kein Abo · Kostenlose Vorschau"
        image={{
          src: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_standard_photo_ikqyqh.jpg",
          alt: "Passfoto-App kostenlos – biometrische Passbilder mit dem Smartphone erstellen",
          width: 843,
          height: 671,
        }}
      />

      <Section id="fallen" width="3xl" labelledBy="traps-h2">
        <SectionHeader
          id="traps-h2"
          eyebrow="Augen auf beim Download"
          title="Typische Fallen bei kostenlosen Passfoto-Apps"
        />
        <CheckList variant="dont" items={traps} />
        <h3 className="mb-4 mt-10 text-lg font-bold text-slate-900">Checkliste vor der Nutzung</h3>
        <CheckList items={checklist} />
      </Section>

      <Section muted id="vergleich" width="3xl" labelledBy="cmp-h2">
        <SectionHeader id="cmp-h2" eyebrow="Vergleich" title="Store-App oder Browser?" />
        <DataTable
          caption="Vergleich zwischen Store-Apps und PixPassport"
          head={["", "Store-App", "PixPassport"]}
          rows={compare}
        />
      </Section>

      <Section id="anleitung" labelledBy="steps-h2">
        <SectionHeader id="steps-h2" eyebrow="So funktioniert es" title="In 3 Schritten zum Passfoto ohne App" />
        <StepsGrid steps={steps} />
        <div className="mt-10">
          <Link href={ctaHref} className={btnPrimary}>
            Jetzt starten <ArrowRight />
          </Link>
        </div>
      </Section>

      <Section muted width="3xl" id="faq" labelledBy="faq-h2">
        <SectionHeader id="faq-h2" eyebrow="FAQ" title="Häufige Fragen zu Passfoto-Apps" />
        <FaqList items={faqs} />
        <p className="mt-8 text-xs leading-relaxed text-slate-500" role="note">
          PixPassport ist ein unabhängiger Service und steht in keiner Verbindung zu Behörden. Für Reisepass und
          Personalausweis fragen Sie bitte vorab Ihr Amt. Mehr zur Aufnahme:{" "}
          <Link href="/de/passfoto-selber-machen" className={textLink}>Passfoto selber machen</Link>,{" "}
          <Link href="/de/biometrisches-passbild" className={textLink}>Biometrisches Passbild</Link>.
        </p>
      </Section>

      <RelatedPages keys={["home", "fuehrerschein", "visum", "ratgeber"]} />

      <CtaBand
        title="Passfoto kostenlos prüfen und erstellen"
        text="Foto im Browser hochladen, Ergebnis kostenlos ansehen, erst dann bezahlen."
        href={ctaHref}
        label="Passbild jetzt erstellen"
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Link href={ctaHref} className={`${btnPrimary} w-full`}>
          Jetzt Passbild erstellen <ArrowRight />
        </Link>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
