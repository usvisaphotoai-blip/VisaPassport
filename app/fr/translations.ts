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
    upload: "Télécharger une photo",
    selectCountry: "Choisir un pays",
    continue: "Continuer",
    createNow: "Créer maintenant",
    download: "Télécharger",
    checkout: "Procéder au paiement",
    startNow: "Commencer maintenant",
    uploadPhoto: "Télécharger votre photo →",
    getApprovedPhoto: "Obtenir ma photo conforme →",
    tryFree: "Essai gratuit →",
    loadMore: "Voir plus",
    clearSearch: "Effacer la recherche",
    startOver: "Recommencer",
    showGuide: "Voir le guide",
  },

  // ── Status Messages ─────────────────────────────────────────────────────────
  status: {
    uploading: "Téléchargement en cours...",
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
    title: "Votre photo d'identité est prête",
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
    ],
    premiumFeatures: [
      "Tout le pack Standard inclus",
      "Révisée par un expert photo",
      "Vérifications de conformité supplémentaires",
      "Réduction des risques de rejet",
      "Acceptation 100% garantie",
      "Livraison par email incluse",
    ],
    moneyBack: "Remboursement intégral si votre photo est rejetée",
    whereToSend: "Où devons-nous l'envoyer ?",
    enterEmailForReceipt: "Entrez votre email pour recevoir votre photo traitée et votre reçu.",
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
    "Photo convertie au format JPEG conforme",
    "Visage centré dans le cadre",
    "Niveau des yeux équilibré horizontalement",
    "Espacement du menton ajusté selon les spécifications",
    "Éclairage équilibré pour la visibilité du visage",
    "Balance des couleurs normalisée",
    "Netteté de l'image améliorée",
    "Arrière-plan nettoyé et normalisé",
    "Planche d'impression générée au format officiel",
    "Photo ajustée pour répondre aux contrôles de conformité gouvernementaux",
  ],

  // ── Hero Sections ───────────────────────────────────────────────────────────
  hero: {
    home: {
      title: "Photo Passeport en Ligne",
      subtitle: "Obtenez une photo d'identité conforme en 30 secondes",
      description: "Évitez les rejets, les retards et les resoumissions. Vérifications biométriques professionnelles conformes aux normes officielles mondiales — instantanément.",
      cta: "Obtenir votre photo d'identité →",
      animText: "Passeport • Visa • Carte d'identité • Permis de conduire",
    },
    passport: {
      title: "Photo Passeport en Ligne",
      subtitle: "Conforme aux normes officielles françaises et internationales",
      description: "Créez une photo passeport 35×45mm parfaitement conforme avec vérification biométrique IA. Fond blanc, cadrage automatique, résultat instantané.",
    },
    id: {
      title: "Photo d'Identité en Ligne",
      subtitle: "Conforme aux normes ANTS et préfecture",
      description: "Photo d'identité aux normes françaises pour CNI, permis de conduire et tous documents officiels. Résultat instantané.",
    },
    visa: {
      title: "Photo Visa en Ligne",
      subtitle: "Conforme pour tous les pays et types de visa",
      description: "Créez une photo visa conforme aux exigences de chaque pays. Schengen, États-Unis, Canada, et plus de 50 pays supportés.",
    },
    ephoto: {
      title: "ePhoto ANTS en Ligne",
      subtitle: "Photo numérique pour vos démarches ANTS",
      description: "Générez une ePhoto conforme pour soumettre votre demande de passeport ou carte d'identité sur le site ANTS.",
    },
    cni: {
      title: "Photo Carte d'Identité en Ligne",
      subtitle: "Aux normes de la carte nationale d'identité française",
      description: "Photo conforme aux exigences de la CNI française. Format 35×45mm, fond blanc uni, cadrage biométrique automatique.",
    },
    biometric: {
      title: "Photo Passeport Biométrique",
      subtitle: "Conforme aux normes OACI internationales",
      description: "Photo biométrique conforme aux standards OACI pour passeports et visas. Vérification automatique de la position des yeux, taille de la tête et arrière-plan.",
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
    { stat: "12 000+", label: "Photos traitées" },
    { stat: "99,8%", label: "Taux d'acceptation" },
    { stat: "120+", label: "Pays supportés" },
    { stat: "30s", label: "Prêt en secondes" },
    { stat: "Officiel", label: "Conforme OACI" },
  ],

  // ── How It Works ────────────────────────────────────────────────────────────
  howItWorks: {
    sectionLabel: "Processus simple",
    title: "Comment créer une photo d'identité conforme en ligne",
    subtitle: "De l'envoi à la photo conforme en moins d'une minute.",
    steps: [
      { num: "01", title: "Télécharger votre photo", desc: "Envoyez votre photo. Nous acceptons les formats JPEG, PNG et HEIC depuis n'importe quel appareil.", icon: "📤" },
      { num: "02", title: "Validation instantanée", desc: "Votre photo est automatiquement vérifiée selon les règles spécifiques de chaque pays en quelques secondes.", icon: "⚡" },
      { num: "03", title: "Rapport de conformité", desc: "Visualisez exactement quels points sont conformes ou non, avec des raisons claires et des suggestions de correction.", icon: "📋" },
      { num: "04", title: "Petit frais", desc: "Tarification locale selon votre pays. Paiement unique pour des résultats professionnels.", icon: "💳" },
      { num: "05", title: "Télécharger", desc: "Obtenez votre photo conforme traitée et votre planche d'impression instantanément.", icon: "⬇️" },
    ],
    cta: "Commencer — Télécharger votre photo →",
  },

  // ── Requirements ────────────────────────────────────────────────────────────
  requirements: {
    sectionLabel: "Exigences officielles",
    title: "Spécifications techniques officielles 2026",
    subtitle: "Chaque photo est validée selon les exigences biométriques officielles des gouvernements et de l'OACI.",
    specs: [
      { label: "Dimensions", value: "35×45mm / 2×2in", detail: "Toutes tailles mondiales supportées" },
      { label: "Format", value: "JPEG / PNG", detail: "Optimisé pour la qualité" },
      { label: "Arrière-plan", value: "Dynamique", detail: "Blanc, gris clair, gris" },
      { label: "Position des yeux", value: "Biométrique", detail: "Centré selon les règles locales" },
      { label: "Taille de la tête", value: "Calibrée", detail: "Automatique du sommet au menton" },
      { label: "Expression", value: "Neutre", detail: "Bouche fermée, yeux ouverts" },
    ],
    note: {
      title: "Les exigences biométriques sont essentielles",
      text: "Les raisons de rejet les plus courantes sont une position incorrecte des yeux et une taille de tête inadaptée. Votre visage doit être centré, regardant directement l'objectif avec une expression neutre. Pas de lunettes, couvre-chefs (sauf religieux/médicaux), ni d'ombres sur le visage.",
    },
  },

  // ── FAQ Data ────────────────────────────────────────────────────────────────
  faq: {
    passport: [
      { q: "Quelle est la taille d'une photo passeport ?", a: "La taille standard d'une photo passeport en France est de 35×45mm. Pour les États-Unis, c'est 51×51mm (2×2 pouces). Notre outil adapte automatiquement les dimensions selon le pays sélectionné." },
      { q: "Puis-je utiliser mon téléphone pour prendre ma photo ?", a: "Oui ! Utilisez le mode photo standard (pas le mode portrait) de votre téléphone. Placez-vous face à une fenêtre pour un éclairage naturel et uniforme. Demandez à quelqu'un de prendre la photo à environ 1 à 1,5 mètre de distance." },
      { q: "Puis-je porter des lunettes sur ma photo ?", a: "Non, la plupart des pays exigent que vous retiriez vos lunettes pour la photo. Cela inclut les lunettes de vue et de soleil. Notre outil détecte automatiquement les lunettes et vous avertit." },
      { q: "Quel fond utiliser pour la photo ?", a: "Un fond blanc uni est requis pour la majorité des pays. Utilisez un mur blanc ou une feuille blanche. Tenez-vous à environ 1 mètre du fond pour éviter les ombres. Notre outil corrige automatiquement l'arrière-plan." },
      { q: "La photo est-elle conforme aux normes officielles ?", a: "Oui, notre système vérifie automatiquement la conformité avec les normes OACI (Organisation de l'Aviation Civile Internationale) et les exigences spécifiques de chaque pays. Nous garantissons l'acceptation à 100%." },
      { q: "Combien coûte le service ?", a: "La validation de votre photo est gratuite. Le téléchargement de la photo traitée et conforme coûte un petit montant unique, adapté à votre devise locale. Aucun abonnement." },
      { q: "Mes photos sont-elles en sécurité ?", a: "Absolument. Toutes les photos originales sont automatiquement supprimées après 24 heures. Nous sommes conformes au RGPD et ne stockons jamais vos photos personnelles de manière permanente." },
      { q: "Puis-je utiliser cette photo pour une demande de visa ?", a: "Oui ! Notre outil supporte les photos pour passeports, visas, cartes d'identité et permis de conduire pour plus de 50 pays." },
    ],
    visa: [
      { q: "Quelles sont les dimensions d'une photo visa ?", a: "Les dimensions varient selon le pays. Pour un visa Schengen : 35×45mm. Pour un visa américain (DS-160) : 51×51mm (600×600 pixels). Notre outil sélectionne automatiquement le bon format." },
      { q: "La photo est-elle compatible avec le formulaire DS-160 ?", a: "Oui, notre outil génère des photos parfaitement compatibles avec le formulaire DS-160 pour les visas américains, avec les bonnes dimensions (600×600px) et la qualité requise." },
      { q: "Puis-je utiliser la même photo pour un passeport et un visa ?", a: "Pas toujours. Les exigences peuvent différer entre passeport et visa, même pour le même pays. Nous vous recommandons de créer une photo spécifique pour chaque document." },
    ],
    home: [
      { q: "Qu'est-ce que PixPassport ?", a: "PixPassport est un outil en ligne professionnel qui crée des photos d'identité conformes pour passeports, visas et cartes d'identité. Notre système vérifie automatiquement la conformité biométrique pour plus de 50 pays." },
      { q: "Comment fonctionne le service ?", a: "Téléchargez simplement votre photo, sélectionnez votre pays et type de document. Notre système analyse automatiquement votre photo, corrige l'arrière-plan, calibre la taille et vérifie la conformité biométrique en moins de 30 secondes." },
      { q: "La validation est-elle vraiment gratuite ?", a: "Oui ! La validation photo est 100% gratuite pour tous les pays. Vous ne payez un petit frais que si vous souhaitez télécharger la photo traitée et la planche d'impression." },
      { q: "Quels pays sont supportés ?", a: "Nous supportons plus de 50 pays dont la France, les États-Unis, le Royaume-Uni, l'Inde, le Canada, l'Australie, l'Allemagne et tous les pays Schengen." },
      { q: "Mes données sont-elles protégées ?", a: "Oui, nous sommes conformes au RGPD. Toutes les photos sont supprimées après 24 heures. Les liens de téléchargement expirent après 1 heure. Aucune donnée n'est conservée de façon permanente." },
    ],
  },

  // ── Testimonials ────────────────────────────────────────────────────────────
  testimonials: [
    { name: "Marie Dupont", text: "Service incroyable ! La suppression de l'arrière-plan était parfaite pour ma demande de visa. Économie d'un déplacement au studio.", country: "France", date: "Il y a 2 jours" },
    { name: "Jean-Pierre Martin", text: "Très rapide et précis. Les vérifications automatiques m'ont donné confiance que ma photo serait acceptée.", country: "France", date: "Il y a 3 jours" },
    { name: "Chloé Laurent", text: "C'est parfait ! L'outil a très bien géré mes cheveux bouclés lors de la suppression de l'arrière-plan.", country: "France", date: "Il y a 1 semaine" },
    { name: "Marc Lefèvre", text: "Outil excellent pour les photos passeport de toute la famille. Fait en moins de 10 minutes.", country: "Belgique", date: "Il y a 1 semaine" },
    { name: "Sophie Berger", text: "Interface claire et résultats excellents. Téléchargement du fichier haute résolution immédiat.", country: "Suisse", date: "Il y a 2 semaines" },
    { name: "Karim Benali", text: "Précis et abordable. Les instructions étaient très claires.", country: "Maroc", date: "Il y a 3 semaines" },
    { name: "Isabelle Roy", text: "Un sauveur ! J'avais besoin d'une photo visa urgente tard le soir et ça a fonctionné.", country: "Canada", date: "Il y a 1 mois" },
    { name: "Thomas Petit", text: "Résultat parfait directement depuis le navigateur du téléphone.", country: "France", date: "Il y a 1 mois" },
  ],

  // ── Tool Page ───────────────────────────────────────────────────────────────
  tool: {
    searchPlaceholder: "Rechercher un pays ou type de document…",
    activeRequirement: "Exigence active",
    dimensions: "Dimensions",
    background: "Arrière-plan",
    noAiDisclaimer: "Nous n'utilisons pas l'IA pour modifier les traits du visage et ne créons pas d'images synthétiques. Nous fournissons uniquement le recadrage, le redimensionnement, la normalisation de l'arrière-plan et la validation de conformité basés sur les directives 2026 pour photos passeport et visa.",
    noAiBadge: "Pas d'IA pour l'édition faciale",
    expertReview: "Révision expert disponible",
    biometricEngine: "Moteur biométrique officiel",
    calibrating: "Calibrage de la taille de la tête, correction de l'éclairage et vérification des normes biométriques OACI.",
  },

  // ── Guides ──────────────────────────────────────────────────────────────────
  guides: {
    index: {
      title: "Guides Photo d'Identité",
      subtitle: "Tout ce que vous devez savoir pour des photos conformes",
    },
    size: {
      title: "Taille Photo Passeport : Guide Complet 2026",
      description: "Découvrez les dimensions exactes requises pour les photos passeport dans chaque pays. Guide complet avec tableaux de tailles et conseils pratiques.",
    },
    background: {
      title: "Fond Photo Passeport : Règles et Astuces",
      description: "Apprenez les règles d'arrière-plan pour les photos passeport. Couleur, éclairage, ombres — tout ce qu'il faut savoir pour un fond conforme.",
    },
    howTo: {
      title: "Comment Prendre une Photo Passeport à la Maison",
      description: "Guide étape par étape pour prendre une photo passeport professionnelle chez vous avec votre téléphone. Conseils d'éclairage, position et cadrage.",
    },
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description: "Votre compagnon mondial pour des photos passeport et visa sécurisées et biométriques. Nous garantissons une conformité à 100% avec les directives officielles gouvernementales pour plus de 50 pays.",
    sections: {
      popularServices: "Services populaires",
      tools: "Outils et ressources",
      company: "Entreprise",
    },
    badges: ["100% Privé", "Vérification instantanée"],
    copyright: "Tous droits réservés.",
    disclaimer: "Avertissement : Ce site n'est affilié à aucune agence gouvernementale.",
    aboutUs: "À propos",
    contactUs: "Nous contacter",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    refundPolicy: "Politique de remboursement",
  },
} as const;

export type FrTranslations = typeof fr;
