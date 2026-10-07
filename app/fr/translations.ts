// ─── French Translations Dictionary ───────────────────────────────────────────
// All user-facing French strings for the /fr section

export const fr = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    home: "Accueil",
    passportPhoto: "Photo Passeport",
    idPhoto: "Photo d'identité",
    visaPhoto: "Photo Visa",
    guides: "Guides",
    start: "Commencer",
    getPhoto: "Obtenir ma photo",
    newPhoto: "Nouvelle photo",
    login: "Connexion",
    signup: "Inscription",
    dashboard: "Tableau de bord",
    logout: "Déconnexion",
    faq: "FAQ",
  },

  // ── Buttons ─────────────────────────────────────────────────────────────────
  buttons: {
    upload: "Importer une photo",
    selectCountry: "Choisir un pays",
    continue: "Continuer",
    createNow: "Créer maintenant",
    download: "Télécharger",
    checkout: "Procéder au paiement",
    startNow: "Commencer maintenant",
    uploadPhoto: "Importer votre photo →",
    getApprovedPhoto: "Obtenir ma photo conforme →",
    tryFree: "Essai gratuit →",
    loadMore: "Voir plus",
    clearSearch: "Effacer la recherche",
    startOver: "Recommencer",
    showGuide: "Voir le guide",
  },

  // ── Status Messages ─────────────────────────────────────────────────────────
  status: {
    uploading: "Envoi en cours...",
    processing: "Traitement de votre photo...",
    biometricCheck: "Vérification biométrique...",
    ready: "Votre photo est prête",
    redirecting: "Redirection vers votre photo...",
    processingSteps: [
      "Correction de l'éclairage et de l'exposition...",
      "Suppression de l'arrière-plan...",
      "Calibrage de la taille de la tête...",
      "Alignement du niveau des yeux...",
      "Vérification des normes biométriques OACI...",
      "Analyse des points faciaux...",
      "Finalisation de la sortie haute résolution...",
    ],
  },

  // ── Error Messages ──────────────────────────────────────────────────────────
  errors: {
    unsupportedFormat: "Format non pris en charge",
    invalidImage: "Veuillez sélectionner une image valide",
    genericError: "Une erreur est survenue",
    retry: "Veuillez réessayer",
    validationError: "Erreur de validation",
    noDocuments: "Aucun document trouvé",
  },

  // ── Preview Page ────────────────────────────────────────────────────────────
  preview: {
    title: "Votre photo est prête",
    aiVerification: "Vérification IA",
    compliant: "Photo conforme",
    downloadPreview: "Télécharger l'aperçu",
    yourPhoto: "Votre photo",
    activeRequirement: "Exigence active",
    dimensions: "Dimensions",
    background: "Arrière-plan",
    fullResolution: "Pleine résolution",
    watermarkedPreview: "Aperçu avec filigrane",
    escToClose: "Échap pour fermer",
    previewOnly: "Aperçu uniquement",
    whatWeFixed: "Ce que nous avons corrigé",
    faceDetection: "Détection du visage",
    eyeLevel: "Niveau des yeux",
    headSize: "Taille de la tête",
    backgroundCheck: "Arrière-plan",
    oneFaceVerified: "1 visage vérifié",
    singleFaceDetected: "Un seul visage détecté",
    corrected: "Corrigé ✓",
    reviewNeeded: "Vérification nécessaire",
    autoCorrected: "Auto-corrigé en blanc",
    needsCorrection: "Nécessite une correction",
    target: "Cible",
  },

  // ── Payment / Order ─────────────────────────────────────────────────────────
  payment: {
    orderSummary: "Résumé de la commande",
    acceptedFor: "Acceptée pour les demandes de passeport et visa",
    standardPack: "Pack Standard",
    premiumPack: "Pack Premium",
    expertReview: "Révision Expert",
    mostPopular: "LE PLUS POPULAIRE",
    emailForDelivery: "Email pour la livraison",
    enterEmail: "Entrez votre email",
    downloadNow: "Télécharger maintenant",
    getExpertReview: "Obtenir la révision expert",
    secureCheckout: "Paiement sécurisé",
    refundIfRejected: "Remboursement si rejetée",
    ssl: "SSL 256-bit",
    noSubscription: "Sans abonnement",
    standardFeatures: [
      "Vérification biométrique",
      "Acceptation 100% garantie",
      "Suppression de l'arrière-plan",
      "Photo numérique instantanée",
      "Planche d'impression A4",
      "Support par email 24/7",
    ],
    premiumFeatures: [
      "Tout le pack Standard inclus",
      "Révisée par un expert photo",
      "Vérifications de conformité supplémentaires",
      "Support par email 24/7",
      "Réduction des risques de rejet",
      "Acceptation 100% garantie",
      "Livraison par email incluse",
    ],
    moneyBack: "Remboursement intégral si votre photo est rejetée",
    whereToSend: "Où devons-nous l'envoyer ?",
    enterEmailForReceipt:
      "Entrez votre email pour recevoir votre photo traitée et votre reçu.",
    cancel: "Annuler",
  },

  // ── Result / Download ───────────────────────────────────────────────────────
  result: {
    paymentSuccess: "Paiement réussi !",
    photoReady: "Votre photo est prête à télécharger.",
    downloadDigital: "Télécharger la photo numérique",
    downloadPrintSheet: "Télécharger la planche d'impression",
    emailMe: "M'envoyer par email",
    rateUs: "Évaluez-nous",
    needAnother: "Besoin d'une autre photo ?",
    uploadAgain: "Télécharger à nouveau →",
  },

  // ── Metric Fixes ────────────────────────────────────────────────────────────
  metricFixes: [
    "Arrière-plan corrigé selon la norme gouvernementale",
    "Taille de la tête optimisée selon les spécifications officielles",
    "Position des yeux alignée dans la zone requise",
    "Espacement supérieur ajusté selon les règles de conformité",
    "Taille du fichier compressée dans la limite autorisée",
    "Résolution vérifiée pour les exigences de l'ambassade",
    "DPI d'impression standardisé pour l'impression officielle",

  
  ],

  // ── Hero Sections ───────────────────────────────────────────────────────────
  hero: {
    home: {
      title: "Photo Passeport en Ligne",
      subtitle: "Obtenez une photo d'identité conforme en 30 secondes",
      description:
        "Évitez les rejets, les retards et les resoumissions. Vérifications biométriques professionnelles conformes aux normes officielles mondiales — instantanément.",
      cta: "Obtenir votre photo d'identité →",
      animText: "Passeport • Visa • Carte d'identité • Permis de conduire",
    },
    passport: {
      title: "Photo Passeport en Ligne",
      subtitle: "Aux normes ANTS 2026 pour votre passeport français",
      description:
        "Créez une photo passeport 35×45 mm aux normes ANTS depuis votre smartphone : fond gris clair, visage cadré entre 32 et 36 mm, vérification biométrique automatique. Fichier numérique et planche 10×15 cm prêts en 30 secondes.",
    },
    id: {
      title: "Photo d'Identité en Ligne",
      subtitle: "Conforme aux normes ANTS et préfecture",
      description:
        "Photo d'identité aux normes françaises pour CNI, permis de conduire et tous documents officiels. Résultat instantané.",
    },
    visa: {
      title: "Photo Visa en Ligne",
      subtitle: "Le bon format pour chaque pays et chaque type de visa",
      description:
        "Créez une photo visa au bon format pour votre destination : visa Schengen, visa américain (DS-160), visa chinois, canadien, indien et plus de 50 pays. Dimensions et fond ajustés automatiquement.",
    },
    ephoto: {
      title: "ePhoto ANTS en Ligne",
      subtitle: "Photo numérique pour vos démarches ANTS",
      description:
        "Générez une ePhoto conforme pour soumettre votre demande de passeport ou carte d'identité sur le site ANTS.",
    },
    cni: {
      title: "Photo Carte d'Identité en Ligne",
      subtitle: "Aux normes de la carte nationale d'identité française",
      description:
        "Photo conforme aux exigences de la CNI française. Format 35×45 mm, fond gris clair uni, cadrage biométrique automatique.",
    },
    biometric: {
      title: "Photo Passeport Biométrique",
      subtitle: "Conforme aux normes OACI internationales",
      description:
        "Photo biométrique conforme aux standards OACI pour passeports et visas. Vérification automatique de la position des yeux, taille de la tête et arrière-plan.",
    },
  },

  // ── Trust Badges ────────────────────────────────────────────────────────────
  trust: {
    badges: [
      { icon: "🔒", text: "Sécurisé et privé" },
      { icon: "⚡", text: "Résultat en 30s" },
      { icon: "🌍", text: "Conformité mondiale" },
      { icon: "🆓", text: "Validation gratuite" },
    ],
    trustedBy: "Utilisé par plus de 17 000 utilisateurs",
    excellent: "Excellent",
    reviewsOn: "avis sur",
  },

  // ── Stats Strip ─────────────────────────────────────────────────────────────
  stats: [
    { stat: "17 000+", label: "Utilisateurs" },
    { stat: "99,8%", label: "Taux d'acceptation" },
    { stat: "50+", label: "Pays supportés" },
    { stat: "30s", label: "Prêt en secondes" },
    { stat: "Officiel", label: "Conforme OACI" },
  ],

  // ── How It Works ────────────────────────────────────────────────────────────
  howItWorks: {
    sectionLabel: "Processus simple",
    title: "Comment créer une photo d'identité conforme en ligne",
    subtitle: "De l'envoi à la photo conforme en moins d'une minute.",
    steps: [
      {
        num: "01",
        title: "Importer votre photo",
        desc: "Envoyez votre photo. Nous acceptons les formats JPEG, PNG et HEIC depuis n'importe quel appareil.",
        icon: "📤",
      },
      {
        num: "02",
        title: "Validation instantanée",
        desc: "Votre photo est automatiquement vérifiée selon les règles spécifiques de chaque pays en quelques secondes.",
        icon: "⚡",
      },
      {
        num: "03",
        title: "Rapport de conformité",
        desc: "Visualisez exactement quels points sont conformes ou non, avec des raisons claires et des suggestions de correction.",
        icon: "📋",
      },
      {
        num: "04",
        title: "Paiement unique",
        desc: "Tarification locale selon votre pays. Paiement unique pour des résultats professionnels.",
        icon: "💳",
      },
      {
        num: "05",
        title: "Télécharger",
        desc: "Obtenez votre photo conforme traitée et votre planche d'impression instantanément.",
        icon: "⬇️",
      },
    ],
    cta: "Commencer — Importer votre photo →",
  },

  // ── Requirements ────────────────────────────────────────────────────────────
  requirements: {
    sectionLabel: "Exigences officielles",
    title: "Spécifications techniques officielles 2026",
    subtitle:
      "Chaque photo est validée selon les exigences biométriques officielles des gouvernements et de l'OACI.",
    specs: [
      {
        label: "Dimensions",
        value: "35×45mm / 2×2in",
        detail: "Toutes tailles mondiales supportées",
      },
      {
        label: "Format",
        value: "JPEG / PNG",
        detail: "Optimisé pour la qualité",
      },
      {
        label: "Arrière-plan",
        value: "Dynamique",
        detail: "Blanc, gris clair, gris",
      },
      {
        label: "Position des yeux",
        value: "Biométrique",
        detail: "Centré selon les règles locales",
      },
      {
        label: "Taille de la tête",
        value: "Calibrée",
        detail: "Automatique du sommet au menton",
      },
      {
        label: "Expression",
        value: "Neutre",
        detail: "Bouche fermée, yeux ouverts",
      },
    ],
    note: {
      title: "Les exigences biométriques sont essentielles",
      text: "Les motifs de refus les plus fréquents en mairie sont un fond blanc ou non uniforme, un visage trop petit ou trop grand et une expression non neutre. En France, la tête doit être nue (couvre-chef interdit), le visage dégagé et sans ombre. Les lunettes sont tolérées si les yeux restent parfaitement visibles : monture fine, verres non teintés, aucun reflet.",
    },
  },

  // ── FAQ Data ────────────────────────────────────────────────────────────────
  faq: {
    visa: [
      {
        q: "Quelle taille pour une photo visa ?",
        a: "Cela dépend du pays de destination. Visa Schengen : 35×45 mm. Visa américain (DS-160) : 51×51 mm, soit 600×600 pixels minimum pour le fichier numérique. Visa chinois : 33×48 mm. Visa indien : 51×51 mm. Visa canadien : 35×45 mm. Choisissez votre destination dans l'outil : PixPassport applique automatiquement le bon format.",
      },
      {
        q: "Quelle couleur de fond pour une photo visa ?",
        a: "Le fond change selon le pays : blanc pour les États-Unis, l'Inde et la Chine, blanc ou très clair pour le Canada, clair et uni pour l'espace Schengen. Attention : une photo faite pour un visa américain sur fond blanc n'est pas valable pour un passeport ou une carte d'identité français, qui exigent un fond gris clair ou bleu clair.",
      },
      {
        q: "Ma photo est-elle compatible avec le formulaire DS-160 du visa américain ?",
        a: "Oui. Pour le DS-160, PixPassport génère un fichier JPEG carré de 600×600 pixels minimum, sur fond blanc, avec une tête occupant 50 à 69 % de la hauteur de l'image et un poids inférieur à 240 Ko. Les lunettes sont interdites sur les photos de visa américain depuis 2016.",
      },
      {
        q: "Puis-je utiliser ma photo de passeport français pour un visa Schengen ?",
        a: "Souvent oui, car le format est le même (35×45 mm). Vérifiez toutefois les consignes du consulat ou du centre de visas (VFS Global, TLScontact) : la photo doit dater de moins de six mois et certains consulats demandent un fond plus clair que celui du passeport français.",
      },
      {
        q: "Les lunettes sont-elles autorisées sur une photo visa ?",
        a: "Les États-Unis les interdisent totalement. La plupart des autres pays les tolèrent si les yeux restent parfaitement visibles, sans reflet ni verres teintés, mais beaucoup recommandent de les retirer. Pour éviter tout refus, le plus sûr est de poser sans lunettes.",
      },
      {
        q: "Faut-il une photo pour l'ESTA, l'AVE canadienne ou l'ETIAS ?",
        a: "Non. Ces autorisations de voyage électroniques ne demandent pas de photo d'identité : seuls les renseignements du passeport sont requis. Une photo n'est nécessaire que si vous demandez un vrai visa (par exemple un visa B1/B2 pour les États-Unis ou un visa visiteur pour le Canada).",
      },
      {
        q: "La photo convient-elle pour un visa long séjour ou un titre de séjour en France ?",
        a: "Pour un visa long séjour, nous fournissons une photo au format 35×45 mm aux normes françaises, à joindre au dossier du consulat. Pour un titre de séjour demandé en ligne sur le site de l'ANEF, une e-photo avec code est obligatoire : elle doit être réalisée dans une cabine ou chez un photographe agréé. PixPassport ne délivre pas ce code.",
      },
      {
        q: "Comment préparer ma photo pour un e-Visa indien ?",
        a: "Le e-Visa indien exige un fichier JPEG carré sur fond blanc uni, visage centré et de face, d'un poids compris entre 10 Ko et 1 Mo. Sélectionnez « Inde – Visa » dans l'outil : le cadrage et le fond sont ajustés automatiquement.",
      },
      {
        q: "Combien de temps une photo visa reste-t-elle valable ?",
        a: "La plupart des consulats exigent une photo de moins de six mois au moment du dépôt du dossier. Si vous préparez plusieurs demandes, refaites une photo récente plutôt que de réutiliser un ancien cliché.",
      },
      {
        q: "Que faire si ma photo visa est refusée ?",
        a: "Contactez notre support avec le motif de refus indiqué par le consulat ou le portail en ligne. Si le refus est lié à la conformité de la photo, nous vous remboursons ou vous fournissons une nouvelle photo conforme.",
      },
    ],
  },

  // ── Testimonials ────────────────────────────────────────────────────────────
  testimonials: [
    {
      name: "Marie Dupont",
      text: "Service incroyable ! La suppression de l'arrière-plan était parfaite pour ma demande de visa. Économie d'un déplacement au studio.",
      country: "France",
      date: "Il y a 2 jours",
    },
    {
      name: "Jean-Pierre Martin",
      text: "Très rapide et précis. Les vérifications automatiques m'ont donné confiance que ma photo serait acceptée.",
      country: "France",
      date: "Il y a 3 jours",
    },
    {
      name: "Chloé Laurent",
      text: "C'est parfait ! L'outil a très bien géré mes cheveux bouclés lors de la suppression de l'arrière-plan.",
      country: "France",
      date: "Il y a 1 semaine",
    },
    {
      name: "Marc Lefèvre",
      text: "Outil excellent pour les photos passeport de toute la famille. Fait en moins de 10 minutes.",
      country: "Belgique",
      date: "Il y a 1 semaine",
    },
    {
      name: "Sophie Berger",
      text: "Interface claire et résultats excellents. Téléchargement du fichier haute résolution immédiat.",
      country: "Suisse",
      date: "Il y a 2 semaines",
    },
    {
      name: "Karim Benali",
      text: "Précis et abordable. Les instructions étaient très claires.",
      country: "Maroc",
      date: "Il y a 3 semaines",
    },
    {
      name: "Isabelle Roy",
      text: "Un sauveur ! J'avais besoin d'une photo visa urgente tard le soir et ça a fonctionné.",
      country: "Canada",
      date: "Il y a 1 mois",
    },
    {
      name: "Thomas Petit",
      text: "Résultat parfait directement depuis le navigateur du téléphone.",
      country: "France",
      date: "Il y a 1 mois",
    },
  ],

  // ── Tool Page ───────────────────────────────────────────────────────────────
  tool: {
    searchPlaceholder: "Rechercher un pays ou type de document…",
    activeRequirement: "Exigence active",
    dimensions: "Dimensions",
    background: "Arrière-plan",
    noAiDisclaimer:
      "Nous n'utilisons pas l'IA pour modifier les traits du visage et ne créons pas d'images synthétiques. Nous fournissons uniquement le recadrage, le redimensionnement, la normalisation de l'arrière-plan et la validation de conformité basés sur les directives 2026 pour photos passeport et visa.",
    noAiBadge: "Pas d'IA pour l'édition faciale",
    expertReview: "Révision expert disponible",
    biometricEngine: "Moteur biométrique officiel",
    calibrating:
      "Calibrage de la taille de la tête, correction de l'éclairage et vérification des normes biométriques OACI.",
  },

  // ── Guides ──────────────────────────────────────────────────────────────────
  guides: {
    index: {
      title: "Guides photo d'identité et passeport",
      subtitle: "Taille, fond, ePhoto ANTS, photo faite à la maison : tout pour une photo acceptée du premier coup en France",
    },
    size: {
      title: "Taille photo d'identité et passeport : 35×45 mm et formats par pays",
      description:
        "Format officiel 35×45 mm, taille du visage (32 à 36 mm), résolution en pixels et tableau des dimensions par pays pour passeport, CNI et visa.",
    },
    background: {
      title: "Fond photo d'identité : quelle couleur choisir ?",
      description:
        "Pourquoi le fond blanc est refusé en France, quelles couleurs sont acceptées (gris clair, bleu clair) et les règles de fond pour chaque pays.",
    },
    howTo: {
      title: "Faire sa photo d'identité soi-même à la maison",
      description:
        "Prendre sa photo d'identité avec son téléphone, étape par étape : lumière, fond, distance, réglages du smartphone et erreurs à éviter.",
    },
    franceGuide: {
      title: "Photo d'identité en France : passeport, CNI, ePhoto, permis, visa",
      description:
        "Quels documents exigent une photo, normes ANTS 2026, différence entre photo classique et ePhoto pour le permis de conduire et le titre de séjour.",
    },
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description:
      "Votre compagnon mondial pour des photos passeport et visa sécurisées et biométriques. Nous garantissons une conformité à 100% avec les directives officielles gouvernementales pour plus de 50 pays.",
    sections: {
      popularServices: "Services populaires",
      tools: "Outils et ressources",
      company: "Entreprise",
    },
    badges: ["100% Privé", "Vérification instantanée"],
    copyright: "Tous droits réservés.",
    disclaimer:
      "PixPassport est un service indépendant de retouche photo. Nous ne sommes pas affiliés à l'ANTS (Agence Nationale des Titres Sécurisés) ni à aucune agence gouvernementale et ne fournissons pas le code ePhoto à 22 caractères.",
    aboutUs: "À propos",
    contactUs: "Nous contacter",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    refundPolicy: "Politique de remboursement",
  },
} as const;

export type FrTranslations = typeof fr;
