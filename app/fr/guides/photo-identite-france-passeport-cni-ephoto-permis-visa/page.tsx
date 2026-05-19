import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";

export const metadata: Metadata = {
  title: "Photo d’Identité France 2026 : Passeport, CNI, ePhoto Permis, Visa",
  description: "Créez une photo d’identité officielle en ligne pour passeport, CNI, ePhoto permis, visa, titre de séjour, carte Vitale et plus. Guide France 2026 complet.",
  keywords: [
    "photo identite france",
    "photo passeport en ligne",
    "photo cni en ligne",
    "ephoto permis de conduire",
    "photo titre de sejour",
    "norme photo identite 2026"
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa"
  },
  openGraph: {
    title: "Comment Créer une Photo d’Identité Officielle en Ligne en France (2026) | PixPassport",
    url: "https://www.pixpassport.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
    locale: "fr_FR",
    type: "article"
  }
};

const guideFaqs = [
  {
    q: "Peut-on sourire sur une photo d’identité française ?",
    a: "Un léger sourire naturel peut parfois être toléré dans un cadre informel, mais pour les documents officiels (Passeport, CNI, Visa), une expression strictement neutre avec la bouche fermée est obligatoire."
  },
  {
    q: "Puis-je porter des lunettes ?",
    a: "Oui, à condition que les verres soient parfaitement transparents (sans teinte), qu'il n'y ait aucun reflet sur les verres et que la monture ne cache aucune partie de vos yeux."
  },
  {
    q: "Puis-je utiliser une photo prise avec un téléphone ?",
    a: "Oui ! Avec PixPassport, vous pouvez prendre une photo depuis votre smartphone. Notre IA et nos experts ajustent automatiquement les dimensions, le fond et la conformité aux normes biométriques de l'ANTS."
  },
  {
    q: "Combien de temps une photo reste-t-elle valide ?",
    a: "Pour la plupart des demandes administratives en France, la photo doit être récente et dater de moins de 6 mois."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Comment Créer une Photo d’Identité Officielle en Ligne en France (2026) : Passeport, CNI, ePhoto Permis, Visa, Titre de Séjour et Plus",
      "description": "Créez une photo d’identité officielle en ligne pour passeport, CNI, ePhoto permis, visa, titre de séjour, carte Vitale et plus. Guide France 2026 complet.",
      "inLanguage": "fr",
      "author": { "@type": "Organization", "name": "PixPassport" }
    }
  ]
};

export default function FranceGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr
        items={[
          { label: "Guides", href: "/fr/guides" },
          { label: "Photo d'identité France", href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa" }
        ]}
      />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Comment Créer une Photo d’Identité Officielle en Ligne en France (2026) : Passeport, CNI, ePhoto Permis, Visa, Titre de Séjour et Plus
          </h1>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            En France, une photo d’identité conforme est indispensable pour de nombreuses démarches administratives. Une photo incorrecte peut entraîner un refus du dossier, un retard administratif ou l’obligation de refaire votre demande.
          </p>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Aujourd’hui, grâce aux outils en ligne, il est possible de créer une photo officielle depuis votre domicile en quelques minutes, sans cabine photo ni déplacement.
          </p>

          {/* Table of Contents / Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 mb-12 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Dans ce guide complet mis à jour pour 2026, vous découvrirez :</h2>
            <ul className="space-y-2.5">
              {[
                "Les règles officielles des photos d’identité françaises",
                "Les dimensions et exigences des différents documents",
                "Comment créer une photo conforme en ligne",
                "Les erreurs fréquentes à éviter",
                "Les spécificités des ePhotos pour le permis de conduire",
                "Les documents français nécessitant une photo d’identité"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-lime-500 shrink-0" />
                  <span className="text-slate-600 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 1: Quels documents français nécessitent une photo d’identité ? */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">📂 Quels documents français nécessitent une photo d’identité ?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            En France, plusieurs documents administratifs exigent une photo biométrique récente :
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                title: "🪪 Documents d’identité",
                items: ["Photo Passeport", "Photo Carte Nationale d'Identité (CNI)", "Photo Visa", "Photo Naturalisation"]
              },
              {
                title: "✈️ Séjour & Immigration",
                items: ["Photo Titre de Séjour", "Photo Carte de Séjour", "Photo Carte de Résident", "Photo Demande d’Immigration", "Photo Permis de Travail"]
              },
              {
                title: "🚗 Permis & Autorisations",
                items: ["Photo Permis de Conduire", "Photo Permis de Conduire ePhoto", "Photo Permis de Chasse"]
              },
              {
                title: "🏢 Cartes professionnelles",
                items: ["Photo Carte Vitale", "Photo Carte Étudiant", "Photo Carte Professionnelle", "Photo Badge Professionnel", "Photo Carte de Transport"]
              }
            ].map((cat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-950 text-base mb-3 border-b border-slate-200/60 pb-2">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-center gap-2">
                      <span className="text-lime-500 text-xs font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 2: Normes officielles des photos d’identité françaises en 2026 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">📏 Normes officielles des photos d’identité françaises en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            La France applique des règles biométriques strictes pour assurer une identification fiable. Voici les exigences principales :
          </p>

          <div className="space-y-4 mb-12">
            {[
              {
                title: "Taille de la photo",
                desc: "Dimensions physiques standardisées de 35 mm × 45 mm, avec une résolution d’impression recommandée de 300 DPI (soit 413 × 531 pixels)."
              },
              {
                title: "Taille du visage",
                desc: "Le visage doit être correctement cadré et mesurer entre 32 mm à 36 mm, mesuré du bas du menton jusqu'au sommet du crâne."
              },
              {
                title: "Fond requis",
                desc: "Uni et clair (gris clair ou bleu très clair). Sans texture et sans ombre. Les fonds blancs purs sont formellement refusés par l'administration française."
              },
              {
                title: "Position du visage",
                desc: "Regarder directement l’objectif, garder la tête parfaitement droite, maintenir une expression neutre, fermer la bouche et garder les yeux bien ouverts."
              },
              {
                title: "Lunettes de vue",
                desc: "Autorisées uniquement si aucun reflet n’apparaît sur les verres, que la monture ne couvre pas les yeux, et que les verres ne sont pas teintés."
              },
              {
                title: "Éclairage et contraste",
                desc: "Uniforme et naturel si possible. Aucune ombre sur le visage ou l'arrière-plan, et aucune surexposition."
              }
            ].map((norm, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{norm.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{norm.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 3: Photo Passeport & CNI France */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🛂 Photo Passeport & CNI France</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            La photo de passeport et de Carte Nationale d’Identité (CNI) française suit précisément les normes biométriques nationales. Elle est requise pour une première demande ou un renouvellement, que ce soit pour un adulte ou un enfant. Une photo récente (de moins de 6 mois) et non conforme entraînera systématiquement le rejet du dossier.
          </p>

          {/* Section 4: Photo Permis de Conduire ePhoto */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🚗 Photo Permis de Conduire ePhoto</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            L’ePhoto est différente d’une photo d’identité classique. Elle combine une photo biométrique, votre signature numérique et un code de transfert unique. Cette ePhoto est utilisée pour la création, le renouvellement, les duplicatas, ou le changement d'adresse sur votre permis de conduire via le site de l'ANTS.
          </p>

          {/* Table comparison */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-12">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Élément</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Photo classique</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">ePhoto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Photo papier", classic: "Oui", ephoto: "Oui" },
                  { name: "Signature numérique", classic: "Non", ephoto: "Oui" },
                  { name: "Code unique", classic: "Non", ephoto: "Oui" },
                  { name: "Téléchargement ANTS", classic: "Non", ephoto: "Oui" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.name}</td>
                    <td className="px-4 py-3 text-slate-500">{row.classic}</td>
                    <td className="px-4 py-3 font-bold text-lime-600">{row.ephoto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 5: Titre de Séjour, Visa & Naturalisation */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🛂 Titre de Séjour, Visa & Naturalisation</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Les étrangers vivant en France ou souhaitant y séjourner doivent également fournir des photos d'identité conformes aux normes biométriques strictes de l'administration française, sous peine de refus. Que ce soit pour un visa de tourisme, d'études ou de travail, ou pour une demande de nationalité française (Naturalisation), la photo doit être d'une netteté parfaite et montrer fidèlement les traits du visage.
          </p>

          {/* Section 6: Cartes d'usage quotidien */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💳 Cartes Vitale, Étudiant et Professionnelle</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Qu’il s’agisse de votre Carte Vitale pour la sécurité sociale, de votre badge professionnel pour les accès de sécurité en entreprise, de votre carte étudiant ou de votre carte de transport régional (Navigo par exemple), une photo d'identité nette et professionnelle est requise pour une identification optimale.
          </p>

          {/* Section 7: Comment créer une photo d’identité en ligne ? */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">⚡ Comment créer une photo d’identité en ligne ?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Créer une photo officielle en ligne est désormais extrêmement simple et s'effectue en quelques étapes clés :
          </p>

          <div className="space-y-6 mb-12">
            {[
              {
                step: "01",
                title: "Prendre une photo",
                desc: "Utilisez un smartphone récent. Placez-vous face à une fenêtre pour un éclairage naturel, et demandez à quelqu'un de vous prendre en photo à environ 1,5 m en regardant bien le capteur."
              },
              {
                step: "02",
                title: "Importer l’image",
                desc: "Téléchargez simplement votre photo sur PixPassport. Notre système IA va analyser l'image pour détecter le visage et ajuster le centrage."
              },
              {
                step: "03",
                title: "Choisir le document",
                desc: "Sélectionnez le document de votre choix (Passeport, CNI, Visa, ePhoto, Carte Vitale) pour appliquer le recadrage conforme."
              },
              {
                step: "04",
                title: "Vérifier la conformité",
                desc: "Notre technologie IA et nos experts contrôlent manuellement la taille du visage, la position des yeux, l'absence d'ombres, et la qualité du fond."
              },
              {
                step: "05",
                title: "Télécharger ou imprimer",
                desc: "Obtenez instantanément votre format numérique haute résolution conforme pour l'ANTS, ou recevez votre planche d'impression directement chez vous."
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-5 items-start bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="shrink-0 w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center font-black text-lime-700 text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 8: Erreurs fréquentes à éviter */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">⚠️ Erreurs fréquentes à éviter</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                title: "😊 Sourire excessif",
                desc: "Les expressions faciales exagérées ou les sourires prononcés sont systématiquement rejetés. Gardez une expression neutre."
              },
              {
                title: "👥 Ombres sur le visage",
                desc: "Une lumière asymétrique crée des ombres. Privilégiez un éclairage de face, doux et naturel."
              },
              {
                title: "🎨 Fond incorrect",
                desc: "Les arrière-plans avec du blanc pur, des motifs, ou des couleurs sombres ne sont pas autorisés."
              },
              {
                title: "🕶️ Accessoires gênants",
                desc: "Évitez les chapeaux, casquettes, bandeaux, ou lunettes de soleil. Les cheveux ne doivent pas masquer votre visage."
              }
            ].map((err, i) => (
              <div key={i} className="bg-red-50/50 border border-red-100 rounded-2xl p-5">
                <h3 className="font-bold text-red-950 text-base mb-1">{err.title}</h3>
                <p className="text-xs text-red-700/90 leading-relaxed">{err.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 9: Pourquoi utiliser un créateur de photo en ligne ? */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💡 Pourquoi utiliser un créateur de photo en ligne ?</h2>
          <ul className="space-y-4 mb-12">
            {[
              {
                title: "Gain de temps optimal",
                desc: "Pas de déplacement en cabine photo ni de file d'attente."
              },
              {
                title: "Disponibilité 24h/24",
                desc: "Réalisez vos clichés quand vous le souhaitez, depuis chez vous, sur smartphone ou ordinateur."
              },
              {
                title: "Coût réduit",
                desc: "Des prix compétitifs pour des photos professionnelles validées par l'administration."
              },
              {
                title: "Contrôle automatique et humain",
                desc: "Notre double vérification (IA + experts) garantit une conformité totale avec les prérequis de l'ANTS."
              }
            ].map((adv, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{adv.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{adv.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA Box */}
          <div className="bg-lime-50 border border-lime-200 rounded-3xl p-8 text-center mt-12 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950 mb-2">Créez votre photo d’identité officielle dès aujourd'hui</h3>
            <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
              Utilisez notre outil en ligne 100% conforme pour obtenir vos photos passeport, CNI, visa ou ePhoto en quelques secondes.
            </p>
            <Link
              href="/fr/passport-photo-online"
              className="inline-flex items-center px-8 py-4 bg-lime-600 text-white rounded-2xl font-bold text-base hover:bg-lime-700 transition-all shadow-lg hover:shadow-lime-600/20 active:scale-95 duration-200"
            >
              Commencer gratuitement →
            </Link>
          </div>
        </div>
      </article>

      <FaqSectionFr faqs={guideFaqs} title="Questions fréquentes — Photos d’identité en France" />
      <StickyCTAFr />
    </>
  );
}
