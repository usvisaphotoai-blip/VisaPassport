import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Photo Passeport en Ligne | Conforme & Garantie | PixPassport",
  description:
    "Créez votre photo passeport, visa ou carte d'identité 100 % conforme en 30 secondes. Vérification biométrique automatique, fond supprimé, résultat immédiat. 50+ pays, garanti ou remboursé.",
  keywords: [
    "photo passeport en ligne",
    "photo identité conforme",
    "photo visa biométrique",
    "ePhoto ANTS",

  ],
  alternates: { canonical: "https://www.pixpassport.com/fr" },
  openGraph: {
    title: "PixPassport — Photo Passeport Conforme en 30 Secondes",
    description:
      "Vérification biométrique automatique, fond supprimé, conforme pour 50+ pays. Garanti ou remboursé.",
    url: "https://www.pixpassport.com/fr",
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport — Photo passeport biométrique en ligne",
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const faqs = [
  {
    q: "Ma photo passeport en ligne sera-t-elle acceptée par les autorités françaises ?",
    a: "Oui, absolument. Chaque photo est vérifiée selon les normes biométriques officielles de l'ANTS (Agence Nationale des Titres Sécurisés). Notre taux d'acceptation dépasse 99 %. En cas de refus, nous vous remboursons intégralement sur présentation de la preuve.",
  },
  {
    q: "Combien de temps faut-il pour obtenir ma photo d'identité numérique ?",
    a: "Moins de 30 secondes. Téléchargez votre selfie, notre système supprime l'arrière-plan, recadre et vérifie la conformité biométrique instantanément. Vous téléchargez votre photo immédiatement après.",
  },
  {
    q: "Puis-je utiliser une photo prise avec mon smartphone ?",
    a: "Absolument. Un selfie de bonne qualité avec n'importe quel smartphone suffit. Notre technologie corrige l'éclairage, l'angle et la netteté pour garantir la conformité aux normes officielles.",
  },
  {
    q: "Quels documents peut-on obtenir avec PixPassport ?",
    a: "Passeport, visa, carte nationale d'identité, permis de conduire et tout document officiel pour plus de 50 pays : France, États-Unis, Canada, Royaume-Uni, Schengen et bien d'autres.",
  },
  {
    q: "Comment recevoir ma photo pour la soumettre à l'ANTS en ligne ?",
    a: "Vous recevez un fichier numérique haute résolution, compatible avec le format requis par l'ANTS pour toutes les demandes en ligne de passeport ou de carte d'identité. Vous pouvez ensuite utiliser cette photo auprès d'un photographe agréé ou d'une cabine ePhoto pour obtenir votre code à 22 caractères. PixPassport ne fournit pas directement ce code ePhoto ANTS : nous vous livrons la photo conforme, vous la soumettez ensuite via les canaux officiels.",
  },
  {
    q: "PixPassport est-il affilié à l'ANTS ou à une autorité gouvernementale ?",
    a: "Non. PixPassport est un service privé et indépendant, non affilié à l'ANTS (Agence Nationale des Titres Sécurisés) ni à aucune autre autorité gouvernementale. Notre rôle est de vous fournir une photo d'identité parfaitement conforme aux normes biométriques officielles — que vous pouvez ensuite utiliser pour vos démarches administratives en toute confiance.",
  },
  {
    q: "Mes données personnelles sont-elles protégées ?",
    a: "Vos photos sont chiffrées de bout en bout, jamais revendues ni partagées avec des tiers. Elles sont supprimées automatiquement après 24 heures, conformément au RGPD.",
  },
  {
    q: "Que faire si ma photo est refusée par les autorités ?",
    a: "PixPassport offre une garantie de remboursement complet si votre photo est refusée. Contactez notre support avec la preuve officielle de refus et nous vous remboursons sans conditions.",
  },
  {
    q: "Y a-t-il une différence entre une photo numérique et une photo physique ?",
    a: "PixPassport fournit les deux : un fichier numérique haute résolution pour les démarches en ligne (ANTS, ambassades) et une planche d'impression prête à imprimer en pharmacie ou en mairie.",
  },
];

const steps = [
  {
    n: "01",
    title: "Prenez ou importez votre photo",
    desc: "Utilisez votre smartphone ou téléchargez une photo existante. Pas besoin de studio ni d'équipement professionnel.",
  },
  {
    n: "02",
    title: "Vérification & conformité automatique",
    desc: "Notre système supprime le fond, recadre et vérifie plus de 50 critères biométriques officiels en temps réel.",
  },
  {
    n: "03",
    title: "Téléchargez et soumettez",
    desc: "Recevez votre photo haute résolution compatible ANTS ou votre planche d'impression, immédiatement.",
  },
];

const benefits = [
  { icon: "🎯", title: "Conformité biométrique garantie", desc: "Validée selon les critères officiels de l'ANTS et des autorités de 50+ pays. Taux d'acceptation supérieur à 99 %. Remboursé si refusé." },
  { icon: "⚡", title: "Résultat en moins de 30 secondes", desc: "Disponible 24h/24, 7j/7. Pas de déplacement, pas d'attente en pharmacie ou en studio photo." },
  { icon: "🔒", title: "Données 100 % sécurisées & RGPD", desc: "Chiffrement de bout en bout. Vos photos sont supprimées après 24 h. Aucune revente, aucun partage." },
  { icon: "💶", title: "À partir de 5,99 € seulement", desc: "Économisez sur les frais de studio et les resoumissions en cas de refus. Tarif unique, sans abonnement." },
  { icon: "🌍", title: "50+ pays et documents couverts", desc: "France, États-Unis, Canada, Royaume-Uni, espace Schengen — base de données mondiale mise à jour en permanence." },
  { icon: "🖨️", title: "Planche d'impression incluse", desc: "Format prêt à imprimer, accepté dans toutes les pharmacies, mairies et bureaux de poste français." },
];

const docs = [
  // { icon: "🛂", name: "Passeport français", detail: "Format ICAO · fond blanc · 35×45 mm" },
  // { icon: "🪪", name: "Carte nationale d'identité", detail: "CNI française · normes ANTS" },
  { icon: "✈️", name: "Visa Schengen", detail: "Tous pays de l'espace Schengen" },
  // { icon: "🚗", name: "Permis de conduire", detail: "Échange international et renouvellement" },
  { icon: "🇺🇸", name: "Documents américains", detail: "Passeport US · visa DS-160" },
  { icon: "🌐", name: "50+ pays disponibles", detail: "Base de données mondiale à jour" },
];

const reviews = [
  { name: "Marie L.", city: "Paris",    stars: 5, text: "Photo acceptée du premier coup pour mon renouvellement de passeport. Rapide et sans prise de tête !" },
  { name: "Thomas B.", city: "Lyon",    stars: 5, text: "J'étais sceptique mais le résultat est parfait. L'ANTS a validé ma photo en ligne sans problème." },
  { name: "Isabelle M.", city: "Bordeaux", stars: 5, text: "Bien moins cher qu'en pharmacie et la photo est nickel. Je recommande vivement à toute la famille." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport",
      url: "https://www.pixpassport.com/fr",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "170" },
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.pixpassport.com/fr" },
      ],
    },
  ],
};

const ctaHref = "/fr/passport-photo-online?type=france-passport";

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function FrHomePage() {
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
              alt="Exemples de photos passeport conformes aux normes biométriques officielles"
              width={1440}
              height={620}
              priority
              className="p-hero__img p-hero__img--desk"
            />
            <Image
              src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
              alt="Photo passeport conforme en ligne sur smartphone"
              width={750}
              height={560}
              priority
              className="p-hero__img p-hero__img--mob"
            />
            {/* Floating rating badge */}

          </div>

          {/* ── Copy below image ── */}
          <div className="p-container">
            <div className="p-hero__copy">

              <p className="p-eyebrow">
                <span className="p-dot" aria-hidden="true" />
                Passeport · Visa · Carte d'identité · Permis de conduire
              </p>

              <h1 id="hero-h1" className="p-h1">
                Photo Passeport en Ligne —{" "}
                <span className="p-h1__lime">Conforme &amp; Garantie</span>{" "}
                en&nbsp;30&nbsp;Secondes
              </h1>

              <p className="p-hero__sub">
                Obtenez une photo d'identité 100&nbsp;% conforme aux normes biométriques officielles
                sans vous déplacer. Fond supprimé automatiquement, recadrage précis, téléchargement
                immédiat — acceptée par  les autorités de 50+ pays.
              </p>

              <ul className="p-pills" aria-label="Points clés">
                {[
                  "✓ Taux d'acceptation 99 %",
                  "✓ Résultat en 30 secondes",
                  "✓ 50+ pays",
                  "✓ RGPD & sécurisé",
                  "✓ Garanti ou remboursé",
                ].map((p) => (
                  <li key={p} className="p-pill">{p}</li>
                ))}
              </ul>

              <div className="p-hero__actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <Link href={ctaHref} className="p-btn p-btn--primary">
                  Obtenir ma photo d'identité
                  <ArrowRight />
                </Link>
                <Link href="/fr/photo-identite-en-ligne" className="text-sm font-semibold text-slate-600 hover:text-lime-700 underline underline-offset-4">
                  Photo d'identité en ligne
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STICKY CTA — mobile only
        ══════════════════════════════════════ */}
        <div className="p-sticky" role="complementary" aria-label="Créer ma photo">
          <Link href={ctaHref} className="p-sticky__btn">
            Créer ma photo 
            <ArrowRight />
          </Link>
        </div>

        {/* ══════════════════════════════════════
            STATS BAND
        ══════════════════════════════════════ */}
        <div className="p-band" aria-label="Chiffres clés PixPassport">
          <div className="p-container p-band__inner">
            {[
              { v: "17 000+", l: "utilisateurs satisfaits" },
              { v: "4,9 / 5",  l: "note moyenne vérifiée" },
              { v: "99 %",     l: "taux d'acceptation" },
              { v: "< 30 s",   l: "délai de traitement" },
              { v: "50+",      l: "pays couverts" },
            ].map((s) => (
              <div className="p-stat" key={s.v}>
                <span className="p-stat__v">{s.v}</span>
                <span className="p-stat__l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="how-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Processus simple</span>
              <h2 id="how-h2" className="p-h2">
                Comment obtenir votre photo passeport conforme en 3 étapes
              </h2>
              <p className="p-lead">
                Notre processus en ligne est conçu pour être aussi simple que possible.
                Pas de logiciel à installer, pas d'expérience requise — juste votre téléphone
                et 30 secondes.
              </p>
            </header>

            <ol className="p-steps" aria-label="Étapes du processus">
              {steps.map((s) => (
                <li className="p-step" key={s.n}>
                  <span className="p-step__n">Étape {s.n}</span>
                  <h3 className="p-step__title">{s.title}</h3>
                  <p className="p-step__desc">{s.desc}</p>
                </li>
              ))}
            </ol>

            <div className="p-cta-row">
              <Link href={ctaHref} className="p-btn p-btn--primary">
                Commencer maintenant — c'est gratuit
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SEO — What is a conforming photo
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="seo1-h2">
          <div className="p-container p-prose-wrap">
            <span className="p-tag">Normes officielles</span>
            <h2 id="seo1-h2" className="p-h2">
              Qu'est-ce qu'une photo d'identité conforme aux normes biométriques ?
            </h2>
            <div className="p-prose">
              <p>
                Une <strong>photo passeport conforme</strong> doit répondre à des critères précis
                définis par l'ANTS (Agence Nationale des Titres Sécurisés) pour la France et par
                l'OACI (Organisation de l'Aviation Civile Internationale) pour les documents de
                voyage internationaux. Ces exigences couvrent le fond (blanc uni), les dimensions
                (35×45 mm), l'expression neutre, les yeux ouverts, l'absence d'accessoires sur
                le visage, et la qualité de l'image (netteté, luminosité, contraste).
              </p>
              <p>
                Une photo non conforme entraîne le rejet automatique de votre dossier par les
                autorités. Cela signifie des délais supplémentaires, des frais de resoumission
                et des rendez-vous en préfecture perdus. PixPassport élimine ce risque en
                vérifiant chaque critère avant que vous ne soumettez votre demande.
              </p>
              <p>
                Notre service génère des photos conformes pour le passeport biométrique français,
                la carte nationale d'identité, les visas Schengen, le permis de conduire
                international et de nombreux autres documents officiels dans plus de 50 pays.
              </p>
            </div>

            <div className="p-checklist">
              {[
                "Fond blanc ou crème uni, sans ombre",
                "Dimensions exactes 35×45 mm (format ICAO)",
                "Expression neutre, bouche fermée",
                "Yeux ouverts, regard vers l'objectif",
                "Visage centré, dégagé, sans chapeau",
                "Photo récente (moins de 6 mois)",
                "Résolution minimale 600 dpi pour l'impression",
                "Format ePhoto compatible ANTS pour soumission en ligne",
              ].map((c) => (
                <div className="p-check" key={c}>
                  <span className="p-check__icon" aria-hidden="true"><CheckIcon /></span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY PIXPASSPORT
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="why-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Pourquoi nous choisir</span>
              <h2 id="why-h2" className="p-h2">
                Pourquoi PixPassport est la solution de référence pour votre photo d'identité en ligne
              </h2>
              <p className="p-lead">
                Des milliers de Français nous font confiance chaque mois pour leurs demandes
                de passeport, de visa et de carte d'identité.
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
              <span className="p-tag">Documents supportés</span>
              <h2 id="docs-h2" className="p-h2">
                Photo conforme pour tous vos documents officiels
              </h2>
              <p className="p-lead">
                PixPassport prend en charge l'ensemble des documents d'identité et de voyage
                français et internationaux. Une seule plateforme pour tous vos besoins.
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
            SEO — vs pharmacie comparison
        ══════════════════════════════════════ */}
        <section className="p-section" aria-labelledby="seo2-h2">
          <div className="p-container p-prose-wrap">
            <span className="p-tag">Comparaison</span>
            <h2 id="seo2-h2" className="p-h2">
              Photo passeport en ligne vs photo en pharmacie : quelle différence ?
            </h2>
            <div className="p-compare">
              <div className="p-compare__col p-compare__col--them">
                <h3 className="p-compare__title">📸 Pharmacie / Studio photo</h3>
                <ul className="p-compare__list">
                  <li>Déplacement obligatoire</li>
                  <li>Horaires limités</li>
                  <li>8 € à 15 € en moyenne</li>
                  <li>Résultat non garanti</li>
                  <li>Délai d'attente sur place</li>
                  <li>Pas de format numérique ANTS</li>
                </ul>
              </div>
              <div className="p-compare__col p-compare__col--us">
                <div className="p-compare__badge">Recommandé</div>
                <h3 className="p-compare__title">✅ PixPassport</h3>
                <ul className="p-compare__list">
                  <li>100 % en ligne, depuis chez vous</li>
                  <li>Disponible 24h/24, 7j/7</li>
                  <li>À partir de 5,99 € seulement</li>
                  <li>Garanti ou remboursé</li>
                  <li>Résultat en moins de 30 secondes</li>
                  <li>Format ePhoto ANTS inclus</li>
                </ul>
              </div>
            </div>
            <div className="p-cta-row">
              <Link href={ctaHref} className="p-btn p-btn--primary">
                Essayer PixPassport maintenant
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            REVIEWS
        ══════════════════════════════════════ */}
        <section className="p-section p-section--alt" aria-labelledby="reviews-h2">
          <div className="p-container">
            <header className="p-sec-head">
              <span className="p-tag">Avis clients</span>
              <h2 id="reviews-h2" className="p-h2">Ce que disent nos utilisateurs</h2>
              <p className="p-lead">
                Plus de 17 000 utilisateurs ont déjà obtenu leur photo d'identité conforme
                avec PixPassport.
              </p>
            </header>
            <div className="p-reviews">
              {reviews.map((r) => (
                <figure className="p-review" key={r.name}>
                  <div className="p-review__stars" aria-label={`${r.stars} étoiles sur 5`}>
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
                Questions fréquentes sur la photo passeport en ligne
              </h2>
              <p className="p-lead">
                Tout ce que vous devez savoir avant de créer votre photo d'identité numérique
                avec PixPassport.
              </p>
            </header>
            <div className="p-faqs">
              {faqs.map((f, i) => (
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
        <div className="p-disclaimer" role="note" aria-label="Information importante">
          <div className="p-container p-disclaimer__inner">
            <InfoIcon />
            <p className="p-disclaimer__text">
              <strong>PixPassport</strong> est un service indépendant de création de photos d'identité conformes.
              Nous ne sommes <strong>pas affiliés</strong> à l'ANTS (Agence Nationale des Titres Sécurisés)
              ni à aucune autorité gouvernementale.
              Nous ne fournissons pas le <strong>code ePhoto à 22 caractères</strong> délivré par les photographes
              agréés et cabines homologuées.
              Notre service vous fournit une photo parfaitement conforme aux normes biométriques officielles,
              que vous pouvez ensuite utiliser pour obtenir votre code ePhoto via les canaux officiels.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="p-bottom" aria-labelledby="bottom-h2">
          <div className="p-container p-bottom__inner">
            <span className="p-bottom__pre">Prêt à commencer ?</span>
            <h2 id="bottom-h2" className="p-bottom__title">
              Créez votre photo passeport conforme{" "}
              <span className="p-bottom__lime">en 30 secondes</span>
            </h2>
            <p className="p-bottom__sub">
              Rejoignez plus de 17 000 utilisateurs qui ont obtenu leur photo d'identité en ligne
              rapidement, sans déplacement et sans risque de refus. À partir de 5,99 €,
              garanti ou remboursé.
            </p>
            <Link href={ctaHref} className="p-btn p-btn--primary p-btn--lg">
              Créer ma photo maintenant
              <ArrowRight />
            </Link>
            <p className="p-bottom__micro">
              <ShieldIcon />
              Remboursement intégral garanti si votre photo est refusée par les autorités officielles
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
          /* Remove padding here - image touches edges of card */
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

        .p-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.95);
          border: 1.5px solid var(--border);
          border-radius: 999px;
          padding: 7px 18px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink2);
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,.12);
          margin-top: -30px;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          position: relative;
          z-index: 2;
        }
        
        .p-stars { color: #f59e0b; letter-spacing: 1px; }


        .p-hero__copy {
          padding: clamp(36px,6vw,68px) 0 clamp(44px,7vw,80px);
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

        .p-guarantee {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 500; color: var(--ink3);
        }
        .p-guarantee svg { color: var(--lime); flex-shrink: 0; }

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
        .p-lead {
          font-size: clamp(.9rem,1.4vw,1rem);
          color: var(--ink3); line-height: 1.75;
          max-width: 640px; margin: 0;
        }

        /* Steps */
        .p-steps {
          list-style: none; padding: 0; margin: 0 0 44px;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
          counter-reset: none;
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

        /* SEO prose */
        .p-prose-wrap { max-width: 860px; }
        .p-prose { margin-bottom: 36px; }
        .p-prose p {
          font-size: clamp(.9rem,1.4vw,1rem);
          color: var(--ink2); line-height: 1.8; margin: 0 0 16px;
        }
        .p-prose strong { color: var(--ink); font-weight: 600; }

        .p-checklist {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 10px 24px;
        }
        @media (max-width: 640px) { .p-checklist { grid-template-columns: 1fr; } }
        .p-check {
          display: flex; align-items: center; gap: 10px;
          font-size: .9rem; font-weight: 500; color: var(--ink2);
        }
        .p-check__icon { color: var(--lime); flex-shrink: 0; }

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

        /* Compare */
        .p-compare {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px;
        }
        @media (max-width: 580px) { .p-compare { grid-template-columns: 1fr; } }
        .p-compare__col { border-radius: var(--r); padding: 24px 22px; position: relative; }
        .p-compare__col--them {
          background: var(--bg2); border: 1.5px solid var(--border);
        }
        .p-compare__col--us {
          background: var(--lime-pale);
          border: 2px solid var(--lime);
          box-shadow: 0 4px 20px rgba(101,163,13,.15);
        }
        .p-compare__badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: var(--lime); color: #fff;
          font-size: 11px; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; border-radius: 999px;
          padding: 3px 12px; white-space: nowrap;
        }
        .p-compare__title { font-size: 1rem; font-weight: 700; color: var(--ink); margin: 0 0 14px; }
        .p-compare__list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
          font-size: .875rem; color: var(--ink2); line-height: 1.5;
        }
        .p-compare__col--them .p-compare__list { color: var(--ink3); }

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