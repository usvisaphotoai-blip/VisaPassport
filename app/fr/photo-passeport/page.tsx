import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo Passeport en Ligne — Conforme & Instantanée",
  description: "Créez une photo passeport conforme en ligne avec vérification biométrique IA. Format 35×45mm, fond blanc, cadrage automatique. Résultat en 30 secondes.",
  keywords: ["photo passeport", "photo passeport en ligne", "photo passeport conforme", "photo passeport france", "35x45mm"],
  alternates: { canonical: "https://www.pixpassport.com/fr/photo-passeport" },
  openGraph: {
    title: "Photo Passeport en Ligne | PixPassport",
    description: "Créez une photo passeport conforme avec vérification biométrique IA. Format 35×45mm, fond blanc.",
    url: "https://www.pixpassport.com/fr/photo-passeport",
    siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Passeport en Ligne" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo Passeport", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr", offers: { "@type": "Offer", price: "6.99", priceCurrency: "USD" } },
  ],
};

const passportSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme française et européenne" },
  { label: "Résolution", value: "413 × 531 px", detail: "300 DPI minimum" },
  { label: "Arrière-plan", value: "Blanc uni", detail: "RGB 255, 255, 255" },
  { label: "Taille de la tête", value: "70-80%", detail: "Du menton au sommet du crâne" },
  { label: "Position des yeux", value: "Centrés", detail: "Regard direct vers l'objectif" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée, yeux ouverts" },
];

export default function PhotoPasseportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Passeport", href: "/fr/photo-passeport" }]} />
      <HeroSectionFr
        title={fr.hero.passport.title}
        subtitle={fr.hero.passport.subtitle}
        description={fr.hero.passport.description}
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showImage={true}
      />
     

      {/* Intro section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Pourquoi utiliser PixPassport pour votre photo passeport ?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Notre outil utilise des algorithmes de vérification biométrique avancés pour garantir que votre photo est 100% conforme aux normes officielles. 
            Suppression automatique de l&apos;arrière-plan, calibrage de la taille de la tête, alignement des yeux — tout est fait automatiquement en moins de 30 secondes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🎯", label: "Précision biométrique" },
              { icon: "⚡", label: "Résultat instantané" },
              { icon: "✅", label: "100% conforme" },
              { icon: "🔒", label: "Données protégées" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-xs font-bold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* How to use section - SEO friendly */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Guide pratique</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Comment obtenir votre photo passeport en ligne ?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Suivez ce guide simple en 4 étapes pour créer une photo d&apos;identité conforme aux normes officielles françaises
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Prenez une photo avec votre smartphone",
                content: "Utilisez n'importe quel smartphone récent (iPhone ou Android) pour prendre un selfie ou faites-vous prendre par quelqu'un. Placez-vous face à une source de lumière naturelle, évitez les ombres sur le visage. Assurez-vous que votre visage est bien centré et que vos yeux sont ouverts. Pas besoin d'appareil photo professionnel ou de fond blanc — notre technologie supprime automatiquement l'arrière-plan."
              },
              {
                step: "2",
                title: "Téléchargez votre photo sur PixPassport",
                content: "Importez votre photo depuis votre galerie, ou prenez-la directement via notre interface web. Notre système analyse instantanément votre image et vérifie plus de 50 critères biométriques : taille de la tête (70-80% de la hauteur totale), position des yeux, expression faciale neutre, absence d'accessoires (lunettes, chapeau, boucles d'oreilles), qualité d'éclairage et netteté."
              },
              {
                step: "3",
                title: "Vérification automatique et corrections IA",
                content: "Notre intelligence artificielle supprime le fond d'écran pour le remplacer par un fond blanc uniforme (RGB 255,255,255), recadre automatiquement votre visage aux dimensions exactes de 35×45 mm (413×531 pixels), ajuste la luminosité et le contraste si nécessaire, et vérifie l'alignement des yeux horizontalement. Si une correction est nécessaire, notre outil vous guide en temps réel."
              },
              {
                step: "4",
                title: "Téléchargez votre photo conforme",
                content: "En moins de 30 secondes, vous recevez votre photo d'identité numérique haute résolution, prête à être soumise à l'ANTS pour votre demande de passeport ou de carte d'identité. Vous obtenez également une planche d'impression format 4×6, acceptée dans toutes les pharmacies, mairies et bureaux de poste de France. Une garantie satisfait ou remboursé vous protège en cas de refus."
              }
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <p className="text-green-800 font-medium">
              💡 <strong>Conseil important :</strong> Votre photo de passeport doit datée de moins de 6 mois. 
              Les autorités françaises vérifient systématiquement cette condition. PixPassport ajoute automatiquement 
              la date de création sur votre photo numérique.
            </p>
          </div>
        </div>
      </section>

      {/* French photo passport requirements - long form SEO content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Normes officielles de la photo passeport française
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            Conformément aux exigences de l&apos;<Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">ANTS</Link> (Agence Nationale des Titres Sécurisés) et aux standards <Link href="/fr/photo-passeport-biometrique" className="text-lime-600 hover:underline">ICAO internationaux</Link>
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {passportSpecs.map((spec) => (
              <div key={spec.label} className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-800">{spec.label}</span>
                  <span className="text-green-700  bg-green-50 px-2 py-0.5 rounded text-sm">{spec.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">📋 Critères supplémentaires à respecter :</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Expression neutre — bouche fermée, pas de sourire</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Yeux grands ouverts et bien visibles</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Visage entièrement dégagé (pas de cheveux sur le front ou les yeux)</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Pas d&apos;accessoires : lunettes, chapeau, casque audio, bijoux volumineux</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Pas d&apos;effet yeux rouges ou reflets sur la peau</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Tenue vestimentaire sobre, pas de couleur blanche (pour contraster avec le fond)</li>
              <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Fond blanc uniforme — PixPassport le supprime automatiquement</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <a href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Créer ma photo passeport conforme
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <FaqSectionFr faqs={fr.faq.passport} title="Questions fréquentes — Photo passeport" />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-passport" countryName="France" />
    </>
  );
}
