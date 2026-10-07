import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import TrustStripFr from "../components/TrustStripFr";
import HowItWorksFr from "../components/HowItWorksFr";
import RequirementsFr from "../components/RequirementsFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";

// ─── METADATA ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Code ePhoto ANTS : à quoi il sert et comment l'obtenir (2026)",
  description:
    "Code ePhoto ANTS : obligatoire pour le permis et le titre de séjour, facultatif pour passeport et CNI. Où l'obtenir, durée de validité et normes photo.",
  keywords: [
    "code ephoto ants",
    "ephoto ants",
    "ephoto permis de conduire",
    "ephoto titre de séjour",
    "photo numérique ants",
    "cabine ephoto agréée",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/ephoto-ants",
    languages: {
      fr: "https://www.pixpassport.com/fr/ephoto-ants",
    },
  },
  openGraph: {
    title: "Code ePhoto ANTS : à quoi il sert et comment l'obtenir",
    description:
      "Permis de conduire, titre de séjour, passeport, CNI : quand le code ePhoto est obligatoire, où l'obtenir et comment réussir sa photo.",
    url: "https://www.pixpassport.com/fr/ephoto-ants",
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "ePhoto ANTS en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code ePhoto ANTS : le guide 2026 | PixPassport",
    description:
      "Quand le code ePhoto est obligatoire, où l'obtenir et comment réussir sa photo.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

// ─── FAQ DATA ────────────────────────────────────────────────
const ephotoFaqs = [
  {
    q: "Qu'est-ce qu'une ePhoto ANTS et à quoi sert-elle ?",
    a: "L'ePhoto (ou e-photo) est une photo d'identité numérique associée à un code unique de 22 caractères. Ce code permet à l'ANTS ou à l'ANEF de récupérer votre photo, et souvent votre signature numérisée, directement depuis la cabine ou le photographe qui l'a réalisée. Il remplace l'envoi d'une photo papier dans les démarches en ligne.",
  },
  {
    q: "Pour quelles démarches le code ePhoto est-il obligatoire ?",
    a: "Il est obligatoire pour les demandes de permis de conduire faites en ligne sur le site de l'ANTS (première demande, renouvellement, duplicata, échange) et pour les titres de séjour demandés sur le site de l'ANEF. Pour le passeport et la carte d'identité, il est facultatif : une photo papier conforme de moins de six mois reste acceptée lors du rendez-vous en mairie.",
  },
  {
    q: "Où obtenir un code ePhoto ANTS ?",
    a: "Uniquement dans une cabine photo agréée (repérez le logo « agréé ANTS » ou « e-photo ») ou chez un photographe professionnel habilité. Le code figure sur la planche imprimée ou sur le ticket remis avec les photos. PixPassport ne délivre pas de code ePhoto.",
  },
  {
    q: "Combien de temps le code ePhoto est-il valable ?",
    a: "Le code ePhoto est valable six mois à partir de la prise de vue. Il peut être utilisé pour plusieurs démarches pendant cette période. Passé ce délai, il faut refaire une photo.",
  },
  {
    q: "Puis-je utiliser une photo prise avec mon smartphone pour obtenir un code ePhoto ?",
    a: "Non. Le code ePhoto ne peut être généré que par une cabine ou un photographe agréé. En revanche, pour le passeport, la CNI, un visa ou la carte Vitale, une photo conforme réalisée en ligne avec PixPassport suffit, sans code.",
  },
  {
    q: "PixPassport est-il affilié à l'ANTS ou à une autorité gouvernementale ?",
    a: "Non. PixPassport est un service privé et indépendant, non affilié à l'ANTS (Agence nationale des titres sécurisés), à l'ANEF ni à aucune autorité gouvernementale. Nous fournissons des photos d'identité conformes aux normes biométriques officielles.",
  },
  {
    q: "Quelles sont les normes de la photo pour une ePhoto ANTS ?",
    a: "Ce sont les mêmes que pour toute photo d'identité française : format 35×45 mm, visage de 32 à 36 mm du menton au sommet du crâne, fond uni clair (gris clair ou bleu clair, jamais blanc), expression neutre, bouche fermée, tête nue, yeux ouverts et visibles, photo de moins de six mois.",
  },
];

// ─── JSON-LD SCHEMA ──────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ephotoFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── REJECTION ERRORS DATA ───────────────────────────────────
const rejectionErrors = [
  {
    icon: "👁️",
    error: "Yeux non visibles ou regard non frontal",
    fix: "Notre IA vérifie l'axe du regard",
  },
  {
    icon: "📐",
    error: "Visage hors des 32–36 mm requis",
    fix: "Recadrage automatique et précis",
  },
  {
    icon: "🖼️",
    error: "Fond blanc, coloré ou texturé",
    fix: "Remplacement par un fond gris clair uni",
  },
  {
    icon: "☀️",
    error: "Ombres sur le visage ou le fond",
    fix: "Détection et alerte instantanée",
  },
  {
    icon: "😐",
    error: "Expression non neutre ou bouche ouverte",
    fix: "Analyse biométrique du visage",
  },
  {
    icon: "👓",
    error: "Reflets ou verres teintés sur les lunettes",
    fix: "Détection et signalement automatiques",
  },
  {
    icon: "🔍",
    error: "Photo floue ou sous-exposée",
    fix: "Contrôle qualité image automatique",
  },
];

// ─── DOCUMENTS DATA ──────────────────────────────────────────
const documents = [
  {
    title: "Permis de conduire",
    href: "/fr/photo-permis-de-conduire",
    description:
      "Code ePhoto obligatoire pour toute demande en ligne sur le site de l'ANTS : première demande, renouvellement, duplicata ou échange d'un permis étranger.",
  },
  {
    title: "Titre de séjour",
    href: "/fr/photo-titre-de-sejour",
    description:
      "Code ePhoto obligatoire pour les demandes déposées sur le site de l'ANEF (premier titre, renouvellement, changement de statut).",
  },
  {
    title: "Passeport biométrique",
    href: "/fr/photo-passeport",
    description:
      "Code ePhoto facultatif : une photo papier 35×45 mm conforme, de moins de six mois, reste acceptée lors du rendez-vous en mairie.",
  },
  {
    title: "Carte nationale d'identité (CNI)",
    href: "/fr/photo-carte-identite",
    description:
      "Mêmes règles que le passeport : photo papier acceptée en mairie, fond gris clair ou bleu clair, expression neutre, tête nue.",
  },
];

// ─── WHY PIXPASSPORT DATA ────────────────────────────────────
const features = [
  { icon: "✔", label: "Photo aux normes ANTS", detail: "Format 35×45 mm, norme ISO 19794-5" },
  { icon: "✔", label: "Vérification biométrique IA", detail: "Cadrage, fond, expression, luminosité" },
  { icon: "✔", label: "Résultat en 30 secondes", detail: "Sans rendez-vous ni photomaton" },
  { icon: "✔", label: "Compatible tous appareils", detail: "Smartphone, tablette, ordinateur" },
  { icon: "✔", label: "Planche d'impression incluse", detail: "Pour impression physique si besoin" },
  { icon: "✔", label: "Données protégées", detail: "Photos supprimées après 24 h, jamais revendues" },
];

// ─── PAGE ────────────────────────────────────────────────────
export default function EphotoAntsPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbsFr
        items={[{ label: "ePhoto ANTS", href: "/fr/ephoto-ants" }]}
      />

      {/* Hero */}
      <HeroSectionFr
        title="Code ePhoto ANTS : à quoi il sert et comment l'obtenir"
        subtitle="Permis de conduire, titre de séjour, passeport, CNI : le guide 2026"
        description="Le code ePhoto est obligatoire pour le permis de conduire et le titre de séjour, facultatif pour le passeport et la carte d'identité. Découvrez où l'obtenir et, pour les démarches sans code, créez une photo conforme depuis votre smartphone."
        ctaHref="/fr/passport-photo-online?type=france-passport"
        ctaText="Créer une photo conforme (sans code) →"
        showImage={true}
        imageAlt="Photo d'identité aux normes ANTS : 35×45 mm, fond gris clair, visage centré"
      />

      {/* Trust strip */}
      <TrustStripFr />

      {/* ── SECTION 1 : Qu'est-ce que l'ePhoto ANTS ? ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            Qu&apos;est-ce que l&apos;ePhoto ANTS ?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;ePhoto ANTS est une photo d&apos;identité numérique associée
            à un code unique de 22 caractères. Ce code permet à l&apos;ANTS (Agence
            nationale des titres sécurisés) ou à l&apos;ANEF de récupérer votre
            photo et votre signature directement auprès de la cabine ou du
            photographe agréé. Il est obligatoire pour le permis de conduire et
            le titre de séjour, mais facultatif pour le{" "}
            <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">
              passeport
            </Link>{" "}
            et la{" "}
            <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">
              carte nationale d&apos;identité
            </Link>
            , pour lesquels une photo papier conforme reste acceptée en mairie.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Le code ePhoto est valable six mois et ne peut être délivré que par
            une cabine ou un photographe agréé : PixPassport ne fournit pas ce
            code. Pour toutes les démarches qui n&apos;en exigent pas (passeport,
            CNI, visa, carte Vitale), vous pouvez en revanche créer une photo
            aux normes exactes en moins de 30 secondes, depuis votre smartphone.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔢", label: "Code à 22 caractères" },
              { icon: "⏳", label: "Valable 6 mois" },
              { icon: "🚗", label: "Obligatoire pour le permis" },
              { icon: "🏛️", label: "Obligatoire pour l'ANEF" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-xs font-bold text-slate-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : Exigences officielles ── */}
      <RequirementsFr
        countryName="France (ANTS)"
        specs={[
          { label: "Dimensions", value: "35 × 45 mm", detail: "Norme ANTS officielle" },
          { label: "Format", value: "JPEG", detail: "Qualité haute résolution" },
          { label: "Arrière-plan", value: "Gris ou bleu clair", detail: "Uni, sans ombre — blanc refusé" },
          { label: "Visage", value: "32–36 mm", detail: "Du menton au sommet" },
          { label: "Résolution", value: "300+ DPI", detail: "Qualité d'impression" },
          { label: "Norme", value: "ISO 19794-5", detail: "Standard biométrique" },
        ]}
      />

      {/* ── SECTION 3 : Comment obtenir votre code ePhoto ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            Comment obtenir votre code ePhoto ANTS en ligne ?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le code ePhoto est délivré exclusivement par une cabine photo agréée
            (logo « agréé ANTS » ou « e-photo ») ou par un photographe
            professionnel habilité. Le code est imprimé sur votre planche ou sur
            le ticket remis avec les photos : il suffit ensuite de le saisir dans
            votre démarche en ligne.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Pour les démarches sans code (passeport, CNI, visa), PixPassport
            analyse votre photo, ajuste automatiquement le cadrage{" "}
            <Link href="/fr/photo-passeport-biometrique" className="text-lime-600 hover:underline">
              biométrique
            </Link>
            , remplace l&apos;arrière-plan par un fond gris clair et génère un
            fichier conforme aux normes ANTS, avec une planche à imprimer — le
            tout en moins d&apos;une minute.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Créer une photo conforme pour une démarche sans code ePhoto
          </h3>
          <ol className="space-y-3">
            {[
              {
                emoji: "📸",
                step: "Prenez une photo avec votre téléphone",
                detail: "Fond clair, bonne lumière naturelle, regard direct vers l'objectif.",
              },
              {
                emoji: "⬆️",
                step: "Téléchargez-la sur PixPassport",
                detail: "Formats JPEG, PNG et HEIC acceptés depuis n'importe quel appareil.",
              },
              {
                emoji: "🤖",
                step: "Vérification et ajustement automatiques",
                detail: "Notre outil corrige le cadrage, le fond et la luminosité en temps réel.",
              },
              {
                emoji: "✅",
                step: "Recevez votre rapport de conformité",
                detail: "Visualisez exactement quels points sont conformes ou à corriger.",
              },
              {
                emoji: "⬇️",
                step: "Téléchargez votre photo conforme",
                detail: "Fichier JPEG + planche 10×15 cm à imprimer pour votre rendez-vous en mairie.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100"
              >
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.step}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SECTION 4 : Pour quels documents ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Code ePhoto : obligatoire ou non selon la démarche
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Démarches en ligne sur le site de l&apos;ANTS et de l&apos;ANEF
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {documents.map((doc, i) => (
              <Link
                key={i}
                href={doc.href}
                className="group p-5 border border-slate-200 rounded-xl hover:border-lime-400 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-lime-700 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {doc.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 : Erreurs courantes ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Erreurs courantes qui font refuser une photo d&apos;identité
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Ces erreurs valent aussi en cabine : vérifiez-les avant la prise de
            vue. PixPassport les détecte automatiquement.
          </p>
          <div className="space-y-3">
            {rejectionErrors.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100"
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-red-600">
                    ❌ {item.error}
                  </p>
                  <p className="text-sm text-lime-700 mt-0.5">
                    ✔ {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 : Pourquoi PixPassport ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Pas besoin de code ePhoto ? Utilisez PixPassport
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Utilisé par plus de 17&nbsp;000 personnes pour leurs démarches
            officielles en France et dans plus de 50 pays.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
              >
                <span className="text-lime-500 font-bold text-lg shrink-0">
                  {f.icon}
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 : How it works (existing component) ── */}
      <HowItWorksFr />

      {/* ── SECTION 8 : FAQ ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes — ePhoto ANTS
          </h2>
          <div className="space-y-4">
            {ephotoFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-slate-800 text-sm list-none">
                  {faq.q}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 text-lg">
                    ↓
                  </span>
                </summary>
                <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="bg-slate-100 border-y border-slate-200 py-4">
        <div className="max-w-3xl mx-auto px-4 flex items-start gap-3">
          <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-600">PixPassport</strong> est un service indépendant de création de photos d&apos;identité conformes.
            Nous ne sommes <strong className="text-slate-600">pas affiliés</strong> à l&apos;ANTS (Agence Nationale des Titres Sécurisés)
            ni à aucune autorité gouvernementale et ne délivrons pas le <strong className="text-slate-600">code ePhoto à 22 caractères</strong>.
            Notre service vous fournit une photo parfaitement conforme aux normes biométriques officielles,
            que vous pouvez ensuite utiliser pour obtenir votre code ePhoto via un photographe agréé ou une cabine homologuée.
          </p>
        </div>
      </div>

      {/* ── SECTION 9 : Internal link hub ── */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-900 mb-5 text-center">
            Guides et ressources associés
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { icon: "🛂", label: "Photo Passeport", href: "/fr/photo-passeport" },
              { icon: "🪪", label: "Photo CNI", href: "/fr/photo-carte-identite" },
              { icon: "🌐", label: "Photo Visa", href: "/fr/photo-visa" },
              { icon: "📸", label: "Photo Biométrique", href: "/fr/photo-passeport-biometrique" },
              { icon: "📐", label: "Taille photo d'identité", href: "/fr/guides/passport-photo-size" },
              { icon: "🇫🇷", label: "Guide photo France", href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-lime-400 hover:bg-lime-50 transition-all text-center"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-xs font-semibold text-slate-700">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCTAFr
        ctaHref="/fr/passport-photo-online?type=france-passport"
        ctaText="Créer une photo conforme"
      />
    </>
  );
}