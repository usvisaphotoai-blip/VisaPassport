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
  title: "ePhoto ANTS en Ligne — Code Photo Numérique Passeport & CNI 2026",
  description:
    "Obtenez votre ePhoto ANTS avec code numérique officiel en 30 secondes. Photo biométrique conforme pour passeport, carte d'identité et permis de conduire. Accepté par l'ANTS — sans photomaton.",
  keywords: [
    "code ephoto ants",
    "ephoto ants en ligne",
    "photo numérique ants",
    "photo passeport france en ligne",
    "ephoto cni 2026",
    "photo identité numérique ants",
    "ephoto permis de conduire",
    "créer ephoto ants",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/ephoto-ants",
  },
  openGraph: {
    title: "ePhoto ANTS en Ligne — Photo & Code Numérique | PixPassport",
    description:
      "Créez votre ePhoto ANTS conforme en 30s. Photo biométrique + code numérique pour passeport, CNI et permis. Sans déplacement.",
    url: "https://www.pixpassport.com/fr/ephoto-ants",
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "website",
  },
};

// ─── FAQ DATA ────────────────────────────────────────────────
const ephotoFaqs = [
  {
    q: "Qu'est-ce qu'une ePhoto ANTS et à quoi sert-elle ?",
    a: "L'ePhoto ANTS est une photo d'identité numérique requise pour toute demande de passeport ou carte nationale d'identité (CNI) effectuée en ligne sur le portail officiel de l'ANTS. Elle remplace la photo papier et doit respecter les normes biométriques ISO/IEC 19794-5 : dimensions 35×45 mm, fond blanc uni, visage centré entre 32 et 36 mm.",
  },
  {
    q: "Comment obtenir un code ePhoto ANTS en ligne ?",
    a: "Le code ePhoto est généralement délivré par un photomaton agréé ou un photographe professionnel. Avec PixPassport, vous créez une photo conforme aux mêmes normes directement depuis votre téléphone ou ordinateur, sans vous déplacer. Le fichier généré peut être utilisé pour vos démarches ANTS.",
  },
  {
    q: "La photo PixPassport est-elle acceptée par l'ANTS ?",
    a: "Oui. Notre outil génère des photos respectant toutes les spécifications techniques ANTS : format JPEG, dimensions 35×45 mm, fond blanc uni, cadrage biométrique précis et résolution 300 DPI minimum. Taux d'acceptation constaté : 99,8 %.",
  },
  {
    q: "Puis-je utiliser cette photo pour une CNI, un permis de conduire et un passeport ?",
    a: "Oui. L'ePhoto ANTS générée par PixPassport est valable pour l'ensemble des documents officiels traités via le portail ANTS : passeport biométrique, carte nationale d'identité (CNI) et permis de conduire.",
  },
  {
    q: "Quelles sont les exigences techniques officielles de l'ePhoto ANTS ?",
    a: "Format JPEG, dimensions 35×45 mm, fond blanc uni sans ombre, visage centré entre 32 et 36 mm du menton au sommet du crâne, expression neutre, yeux ouverts et regard direct, résolution 300 DPI minimum, norme ISO 19794-5.",
  },
  {
    q: "Combien de temps faut-il pour obtenir mon ePhoto ?",
    a: "Moins de 30 secondes. Téléchargez votre photo, notre IA vérifie automatiquement la conformité biométrique, ajuste le cadrage et le fond, puis génère votre fichier prêt à l'emploi.",
  },
];

// ─── JSON-LD SCHEMA ──────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — ePhoto ANTS en Ligne",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "Web, iOS, Android",
      inLanguage: "fr",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Validation biométrique gratuite",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: ephotoFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
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
    error: "Arrière-plan coloré ou texturé",
    fix: "Suppression et remplacement fond blanc",
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
    error: "Lunettes portées sur la photo",
    fix: "Détection et signalement obligatoire",
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
    title: "Passeport biométrique",
    href: "/fr/photo-passeport",
    description:
      "Renouvellement ou première demande. La photo numérique conforme remplace la photo papier dans votre dossier en ligne.",
  },
  {
    title: "Carte nationale d'identité (CNI)",
    href: "/fr/photo-carte-identite",
    description:
      "Valable 10 ans pour les adultes. Mêmes normes que le passeport : 35×45 mm, fond blanc, expression neutre.",
  },
  {
    title: "Permis de conduire",
    href: "/fr/photo-identite",
    description:
      "Première obtention ou échange de permis étranger. La même photo biométrique est acceptée via l'ANTS.",
  },
  {
    title: "Titre de séjour",
    href: "/fr/photo-visa",
    description:
      "Certaines démarches préfectorales dématérialisées requièrent également une photo numérique conforme ANTS.",
  },
];

// ─── WHY PIXPASSPORT DATA ────────────────────────────────────
const features = [
  { icon: "✔", label: "Conformité ANTS garantie", detail: "Norme ISO 19794-5 respectée" },
  { icon: "✔", label: "Vérification biométrique IA", detail: "Cadrage, fond, expression, luminosité" },
  { icon: "✔", label: "Résultat en 30 secondes", detail: "Sans rendez-vous ni photomaton" },
  { icon: "✔", label: "Compatible tous appareils", detail: "Smartphone, tablette, ordinateur" },
  { icon: "✔", label: "Planche d'impression incluse", detail: "Pour impression physique si besoin" },
  { icon: "✔", label: "100 % privé", detail: "Photos non stockées ni partagées" },
];

// ─── PAGE ────────────────────────────────────────────────────
export default function EphotoAntsPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbsFr
        items={[{ label: "ePhoto ANTS", href: "/fr/ephoto-ants" }]}
      />

      {/* Hero */}
      <HeroSectionFr
        title="Code ePhoto ANTS en Ligne — Passeport & CNI 2026"
        subtitle="Photo numérique biométrique + code conforme ANTS en 30 secondes"
        description="Créez votre ePhoto ANTS sans photomaton ni rendez-vous. Notre IA vérifie automatiquement le cadrage, le fond et la conformité ISO — pour votre passeport, carte d'identité ou permis de conduire."
        ctaHref="/fr/passport-photo-online?type=france-passport"
        ctaText="Obtenir mon ePhoto ANTS →"
        showBeforeAfter={true}
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
            L&apos;ePhoto ANTS est la photo d&apos;identité numérique officielle
            exigée par l&apos;Agence Nationale des Titres Sécurisés pour toute
            demande en ligne de{" "}
            <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">
              passeport
            </Link>{" "}
            ou de{" "}
            <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">
              carte nationale d&apos;identité
            </Link>
            . Contrairement à une photo papier classique, l&apos;ePhoto est un
            fichier numérique conforme aux normes biométriques internationales
            (ISO/IEC 19794-5).
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Depuis 2021, la dématérialisation des démarches ANTS rend cette
            photo indispensable. Elle s&apos;accompagne d&apos;un code unique
            transmis lors de votre dépôt de dossier. Avec PixPassport, vous
            générez une photo aux normes exactes en moins de 30 secondes — sans
            vous déplacer en photomaton, sans attente, depuis n&apos;importe
            quel appareil.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏛️", label: "Conforme ANTS" },
              { icon: "📱", label: "Depuis votre téléphone" },
              { icon: "⚡", label: "Prêt en 30 secondes" },
              { icon: "✅", label: "Normes ISO respectées" },
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
          { label: "Arrière-plan", value: "Blanc uni", detail: "Sans ombre ni motif" },
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
            Le code ePhoto est normalement délivré par un photomaton agréé ANTS
            ou un photographe professionnel habilité. Ce processus implique un
            déplacement, une attente, et un coût souvent supérieur à 6&nbsp;€.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            PixPassport simplifie cette démarche&nbsp;: notre outil utilise une
            intelligence artificielle avancée pour analyser votre photo, ajuster
            automatiquement le cadrage{" "}
            <Link href="/fr/photo-passeport-biometrique" className="text-lime-600 hover:underline">
              biométrique
            </Link>
            , supprimer l&apos;arrière-plan et générer un fichier JPEG conforme
            aux exigences ANTS — le tout en moins d&apos;une minute.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Étapes pour créer votre ePhoto ANTS en ligne
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
                detail: "Notre IA corrige le cadrage, le fond blanc et la luminosité en temps réel.",
              },
              {
                emoji: "✅",
                step: "Recevez votre rapport de conformité",
                detail: "Visualisez exactement quels points sont conformes ou à corriger.",
              },
              {
                emoji: "⬇️",
                step: "Téléchargez votre ePhoto prête à l'emploi",
                detail: "Fichier JPEG + planche d'impression pour vos démarches ANTS.",
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
            Pour quels documents utiliser une ePhoto ANTS ?
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Valable pour l&apos;ensemble des titres traités via{" "}
            <span className="font-medium">predemande.service-public.fr</span>
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
            Erreurs courantes qui causent un refus ANTS
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            80&nbsp;% des rejets sont dus à des erreurs évitables. PixPassport
            les détecte toutes automatiquement.
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
          <p className="text-center text-slate-500 text-sm mt-6">
            Taux d&apos;acceptation ANTS constaté avec PixPassport&nbsp;:{" "}
            <span className="font-bold text-slate-800">99,8 %</span>
          </p>
        </div>
      </section>

      {/* ── SECTION 6 : Pourquoi PixPassport ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Pourquoi choisir PixPassport pour votre ePhoto ANTS ?
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Utilisé par plus de 17&nbsp;000 personnes pour leurs démarches
            officielles en France et dans 120+ pays.
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
              { icon: "📐", label: "Taille photo", href: "/fr/guides/passport-photo-size" },
              { icon: "🖼️", label: "Fond photo", href: "/fr/guides/passport-photo-background" },
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
        ctaText="Créer votre ePhoto ANTS"
      />
    </>
  );
}