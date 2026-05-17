import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import TrustStripFr from "../components/TrustStripFr";
import HowItWorksFr from "../components/HowItWorksFr";
import RequirementsFr from "../components/RequirementsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";

export const metadata: Metadata = {
  title: "ePhoto ANTS en Ligne — Photo Numérique pour Passeport & CNI",
  description: "Générez une ePhoto conforme pour vos démarches ANTS. Photo numérique aux normes pour passeport et carte d'identité. Soumission en ligne simplifiée.",
  keywords: ["ephoto", "ephoto ANTS", "photo numérique ANTS", "photo passeport numérique", "ANTS photo en ligne"],
  alternates: { canonical: "https://www.pixpassport.com/fr/ephoto-ants" },
  openGraph: {
    title: "ePhoto ANTS en Ligne | PixPassport", description: "ePhoto conforme pour vos démarches ANTS. Photo numérique aux normes.",
    url: "https://www.pixpassport.com/fr/ephoto-ants", siteName: "PixPassport", locale: "fr_FR", type: "website",
  },
};

const ephotoFaqs = [
  { q: "Qu'est-ce qu'une ePhoto ANTS ?", a: "L'ePhoto est une photo d'identité numérique requise pour les demandes de passeport et carte d'identité via le site ANTS (Agence Nationale des Titres Sécurisés). Elle doit respecter les normes ISO/IEC 19794-5 et être accompagnée d'un code ephoto." },
  { q: "Comment obtenir un code ePhoto ?", a: "Le code ePhoto est habituellement fourni par les photomatons agréés ou les photographes professionnels. Avec PixPassport, vous pouvez créer une photo conforme aux mêmes normes depuis chez vous." },
  { q: "La photo PixPassport est-elle compatible avec ANTS ?", a: "Oui, notre outil génère des photos conformes aux spécifications techniques requises par ANTS : dimensions 35×45mm, fond blanc uni, cadrage biométrique et résolution adaptée." },
  { q: "Puis-je soumettre cette photo directement sur ANTS ?", a: "La photo générée respecte toutes les normes techniques. Pour la soumission sur ANTS, vous pouvez télécharger la photo et l'utiliser avec votre dossier de demande." },
  { q: "Quelles sont les exigences techniques de l'ePhoto ?", a: "Format JPEG, 35×45mm, fond blanc uni, visage centré de 32 à 36mm, expression neutre, yeux ouverts et regard direct vers l'objectif." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — ePhoto ANTS", applicationCategory: "PhotographyApplication", inLanguage: "fr" },
    { "@type": "FAQPage", mainEntity: ephotoFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function EphotoAntsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "ePhoto ANTS", href: "/fr/ephoto-ants" }]} />
      <HeroSectionFr
        title="ePhoto ANTS en Ligne"
        subtitle="Photo numérique pour vos démarches ANTS"
        description="Générez une ePhoto conforme pour soumettre votre demande de passeport ou carte d'identité sur le site ANTS. Vérification biométrique automatique."
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showBeforeAfter={true}
      />
      <TrustStripFr />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Qu&apos;est-ce que l&apos;ePhoto ANTS ?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            L&apos;ePhoto est le format numérique requis par l&apos;ANTS (Agence Nationale des Titres Sécurisés) pour les demandes en ligne de <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link> et <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte d&apos;identité</Link>. 
            Notre outil vous permet de créer une photo aux normes exactes depuis votre téléphone ou ordinateur, sans avoir à vous déplacer.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏛️", label: "Conforme ANTS" },
              { icon: "📱", label: "Depuis votre téléphone" },
              { icon: "⚡", label: "Prêt en 30 secondes" },
              { icon: "✅", label: "Normes ISO respectées" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-xs font-bold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequirementsFr countryName="France (ANTS)" specs={[
        { label: "Dimensions", value: "35 × 45 mm", detail: "Norme ANTS officielle" },
        { label: "Format", value: "JPEG", detail: "Qualité haute résolution" },
        { label: "Arrière-plan", value: "Blanc uni", detail: "Sans ombre ni motif" },
        { label: "Visage", value: "32-36 mm", detail: "Du menton au sommet" },
        { label: "Résolution", value: "300+ DPI", detail: "Qualité d'impression" },
        { label: "Norme", value: "ISO 19794-5", detail: "Standard biométrique" },
      ]} />
      <HowItWorksFr />
      <FaqSectionFr faqs={ephotoFaqs} title="Questions fréquentes — ePhoto ANTS" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-passport" ctaText="Créer votre ePhoto ANTS" />
    </>
  );
}
