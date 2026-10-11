// ─── German Translations Dictionary ───────────────────────────────────────────
// Shared UI strings for the /de section (navigation, tool, preview, footer)

export const de = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    home: "Startseite",
    passportPhoto: "Passbild",
    diyPhoto: "Selber machen",
    drivingLicence: "Führerscheinfoto",
    visaPhoto: "Visumfoto",
    cvPhoto: "Bewerbungsfoto",
    guides: "Ratgeber",
    getPhoto: "Passbild erstellen",
    newPhoto: "Neues Foto",
    dashboard: "Mein Konto",
    logout: "Abmelden",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mainNav: "Hauptnavigation",
  },

  // ── Buttons ─────────────────────────────────────────────────────────────────
  buttons: {
    continue: "Weiter",
    getApprovedPhoto: "Jetzt Passbild erstellen →",
    clearSearch: "Suche zurücksetzen",
    startOver: "Neues Foto hochladen",
  },

  // ── Status Messages ─────────────────────────────────────────────────────────
  status: {
    processing: "Foto wird bearbeitet …",
    redirecting: "Ihr Foto ist fertig – Vorschau wird geladen …",
    processingSteps: [
      "Belichtung und Helligkeit werden korrigiert …",
      "Hintergrund wird ersetzt …",
      "Kopfgröße wird angepasst …",
      "Augenhöhe wird ausgerichtet …",
      "Biometrische Vorgaben werden geprüft …",
      "Gesichtsmerkmale werden analysiert …",
      "Foto in hoher Auflösung wird erstellt …",
    ],
  },

  // ── Error Messages ──────────────────────────────────────────────────────────
  errors: {
    genericError: "Leider ist ein Fehler aufgetreten.",
    retry: "Bitte versuchen Sie es mit einem anderen Foto erneut.",
    validationError: "Ihr Foto konnte nicht verarbeitet werden",
    noDocuments: "Kein passendes Dokument gefunden.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  },

  // ── Preview Page ────────────────────────────────────────────────────────────
  preview: {
    title: "Ihr Foto ist fertig",
    photoAlt: "Vorschau Ihres bearbeiteten Fotos mit Wasserzeichen",
    zoomLabel: "Vorschau vergrößern",
    closeZoom: "Vergrößerte Ansicht schließen",
    fullResolution: "Volle Auflösung",
    watermarkedPreview: "Vorschau mit Wasserzeichen",
    escToClose: "Schließen mit Esc",
    whatWeFixed: "Das haben wir angepasst",
  },

  // ── Payment / Order ─────────────────────────────────────────────────────────
  payment: {
    orderSummary: "Ihre Bestellung",
    acceptedFor: "für Pass- und Visumanträge",
    standardPack: "Standard",
    premiumPack: "Premium mit Expertenprüfung",
    expertReview: "Expertenprüfung",
    mostPopular: "Beliebteste Wahl",
    emailForDelivery: "E-Mail-Adresse für die Zustellung",
    enterEmail: "ihre@email.de",
    downloadNow: "Jetzt kaufen & herunterladen",
    getExpertReview: "Mit Expertenprüfung bestellen",
    secureCheckout: "Sichere Zahlung",
    refundIfRejected: "Geld zurück bei Ablehnung",
    ssl: "SSL-verschlüsselt",
    noSubscription: "Kein Abo",
    standardFeatures: [
      "Automatische biometrische Prüfung",
      "Hintergrund wird ersetzt",
      "Digitales Foto sofort zum Download",
      "Druckvorlage im A4-Format",
      "Geld zurück bei Ablehnung",
      "E-Mail-Support rund um die Uhr",
    ],
    premiumFeatures: [
      "Alle Leistungen aus „Standard“",
      "Zusätzliche Prüfung durch einen Fotoexperten",
      "Weitere Konformitätskontrollen",
      "Geringeres Ablehnungsrisiko",
      "Zustellung per E-Mail",
      "E-Mail-Support rund um die Uhr",
    ],
    moneyBack: "Volle Rückerstattung, falls Ihr Foto abgelehnt wird",
    whereToSend: "Wohin dürfen wir Ihr Foto senden?",
    enterEmailForReceipt:
      "Wir senden Ihnen das bearbeitete Foto und die Rechnung an diese Adresse.",
    cancel: "Abbrechen",
  },

  // ── Result / Download ───────────────────────────────────────────────────────
  result: {
    paymentSuccess: "Zahlung erfolgreich",
    photoReady: "Ihr Foto steht zum Download bereit.",
    download: "herunterladen (digital)",
    customizePrint: "Druckvorlage anpassen (A4 / 10 × 15 cm)",
    downloadPrintSheet: "Druckbogen A4 herunterladen",
    emailMe: "Per E-Mail senden",
    emailPrompt: "An welche E-Mail-Adresse sollen wir das Foto senden?",
    emailSent: "Foto gesendet. Bitte prüfen Sie Ihren Posteingang.",
    emailFailed: "Das Foto konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    rateUs: "Bewerten Sie uns",
    needAnother: "Noch ein Foto benötigt?",
    uploadAgain: "Neues Foto hochladen →",
  },

  // ── Metric Fixes ────────────────────────────────────────────────────────────
  metricFixes: [
    "Hintergrund gemäß amtlicher Vorgabe ersetzt",
    "Kopfgröße nach offiziellen Maßen angepasst",
    "Augenposition in den vorgeschriebenen Bereich gebracht",
    "Abstand zum oberen Bildrand korrigiert",
    "Dateigröße auf das zulässige Maximum komprimiert",
    "Auflösung für Behörden und Botschaften geprüft",
    "Druckauflösung (DPI) für den Fotoausdruck eingestellt",
  ],

  // ── Tool Page ───────────────────────────────────────────────────────────────
  tool: {
    searchPlaceholder: "Land oder Dokument suchen …",
    searchLabel: "Land oder Dokument suchen",
    selectDocument: "Dokument auswählen",
    activeRequirement: "Gewähltes Dokument",
    dimensions: "Format",
    background: "Hintergrund",
    noAiDisclaimer:
      "Wir verändern keine Gesichtszüge und erzeugen keine künstlichen Bilder. Ihr Foto wird ausschließlich zugeschnitten, skaliert, mit einem normgerechten Hintergrund versehen und nach den aktuellen Vorgaben für Pass- und Visumfotos geprüft.",
    noAiBadge: "Keine Gesichtsretusche",
    expertReview: "Expertenprüfung verfügbar",
    biometricEngine: "Biometrische Prüfung",
    calibrating:
      "Kopfgröße, Belichtung und Hintergrund werden nach den biometrischen Vorgaben angepasst.",
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description:
      "Biometrische Pass-, Visum- und Bewerbungsfotos online erstellen – automatisch geprüft nach den amtlichen Vorgaben von über 50 Ländern.",
    sections: {
      popularServices: "Fotos & Dokumente",
      tools: "Service",
      company: "Unternehmen",
    },
    badges: ["DSGVO-konform", "Löschung nach 24 h"],
    copyright: "Alle Rechte vorbehalten.",
    disclaimer:
      "PixPassport ist ein unabhängiger Fotodienst und steht in keiner Verbindung zu Behörden.",
    aboutUs: "Über uns",
    contactUs: "Kontakt",
    dataSecurity: "Datensicherheit",
    privacyPolicy: "Datenschutzerklärung",
    terms: "AGB",
    refundPolicy: "Widerruf & Erstattung",
  },
} as const;

export type DeTranslations = typeof de;

// Background colour slugs from data/countries-specs.json → German labels
export const deBackgroundLabels: Record<string, string> = {
  white: "Weiß",
  "light-gray": "Hellgrau",
  "light-blue": "Hellblau",
  blue: "Blau",
};
