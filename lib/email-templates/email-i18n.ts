import { getCentralCountry, formatLocalizedDocLabel } from "@/lib/countries-registry";
import { germanDocLabel } from "@/app/de/docLabels";

/** Languages we send customer emails in. Matches the localized site sections (/de, /fr). */
export type EmailLocale = "en" | "de" | "fr";

export function normalizeEmailLocale(value: unknown): EmailLocale {
  if (typeof value !== "string") return "en";
  const v = value.trim().toLowerCase();
  if (v.startsWith("de")) return "de";
  if (v.startsWith("fr")) return "fr";
  return "en";
}

/** Detects the locale from the page the request came from (e.g. https://pixpassport.com/de/preview/...). */
export function localeFromReferer(referer?: string | null): EmailLocale | undefined {
  if (!referer) return undefined;
  try {
    const path = new URL(referer).pathname;
    if (path === "/de" || path.startsWith("/de/")) return "de";
    if (path === "/fr" || path.startsWith("/fr/")) return "fr";
    return "en";
  } catch {
    return undefined;
  }
}

/** Preview page for the customer's language — /de and /fr have their own translated preview pages. */
export function localizedPreviewPath(locale: EmailLocale, photoId: string) {
  return locale === "en" ? `/preview/${photoId}` : `/${locale}/preview/${photoId}`;
}

function flagToIso(flag?: string): string | null {
  if (!flag) return null;
  const points = Array.from(flag).map((c) => c.codePointAt(0) ?? 0);
  if (points.length !== 2 || points.some((p) => p < 0x1f1e6 || p > 0x1f1ff)) return null;
  return String.fromCharCode(...points.map((p) => p - 0x1f1e6 + 65));
}

/** Country + document labels in the customer's language (falls back to the English spec names). */
export function localizedDocNames(
  spec: { id?: string; name?: string; country?: string; flag?: string },
  documentType: string,
  locale: EmailLocale
): { countryName: string; documentName: string } {
  const enCountry = spec.country || spec.name || "Passport Photo";
  const enDoc = spec.name || "Passport Photo";
  if (locale === "en") return { countryName: enCountry, documentName: enDoc };

  try {
    const central =
      getCentralCountry(documentType) ||
      getCentralCountry(spec.country) ||
      getCentralCountry(flagToIso(spec.flag) || undefined);

    let countryName = central?.translations?.[locale];
    if (!countryName) {
      const iso = flagToIso(spec.flag);
      if (iso) countryName = new Intl.DisplayNames([locale], { type: "region" }).of(iso) || undefined;
    }
    countryName = countryName || enCountry;

    const kind = documentType.endsWith("-visa") ? "visa" : "passport";
    let documentName: string;
    if (locale === "de") {
      documentName = germanDocLabel({ id: documentType, label: enDoc, flag: spec.flag, country: spec.country });
    } else if (central) {
      documentName = formatLocalizedDocLabel(central, "fr", kind);
    } else {
      documentName = `${countryName} – ${kind === "visa" ? "Photo Visa" : "Photo Passeport"}`;
    }
    return { countryName, documentName };
  } catch {
    return { countryName: enCountry, documentName: enDoc };
  }
}

const BG: Record<EmailLocale, Record<string, string>> = {
  en: { white: "White", "light-gray": "Light gray", "light-grey": "Light grey", gray: "Gray", blue: "Blue", "light-blue": "Light blue", "off-white": "Off-white" },
  de: { white: "Weißer", "light-gray": "Hellgrauer", "light-grey": "Hellgrauer", gray: "Grauer", blue: "Blauer", "light-blue": "Hellblauer", "off-white": "Cremeweißer" },
  fr: { white: "blanc", "light-gray": "gris clair", "light-grey": "gris clair", gray: "gris", blue: "bleu", "light-blue": "bleu clair", "off-white": "blanc cassé" },
};

export function backgroundLabel(bg: string | undefined, locale: EmailLocale) {
  const key = (bg || "white").toLowerCase();
  const fallback = key.charAt(0).toUpperCase() + key.slice(1);
  const name = BG[locale][key] || fallback;
  if (locale === "de") return `${name} Hintergrund`;
  if (locale === "fr") return `Fond ${name}`;
  return `${name} background`;
}

export interface EmailStrings {
  htmlLang: string;
  // Shell / footer
  faq: string;
  refundPolicy: string;
  receivingBecause: string;
  // Support block
  supportTitle: string;
  supportBody: (supportLink: string, contactLink: string) => string;
  contactUs: string;
  // Delivery email
  deliverySubject: (country: string, doc: string) => string;
  deliveryPreheader: (doc: string) => string;
  paymentSuccessful: string;
  photoReady: (doc: string) => string;
  compliant: (country: string) => string;
  photoAlt: (doc: string) => string;
  downloadPhoto: string;
  viewOnline: string;
  available7Days: string;
  originalUpload: string;
  uploadHint: (country: string, printSize?: string) => string;
  receipt: string;
  invoice: string;
  item: string;
  method: string;
  paid: string;
  paidBadge: string;
  defaultMethod: string;
  invoiceAttached: string;
  invoiceAvailable: string;
  downloadPdf: string;
  // Expert order email
  expertSubject: string;
  expertHeading: string;
  orderFor: (country: string, doc: string) => string;
  hiThere: string;
  expertBody: (country: string, doc: string) => string;
  originalImage: string;
  viewUpload: string;
  paymentReceipt: string;
  invoiceNumber: string;
  amountPaid: string;
  paidCheck: string;
  paymentMethod: string;
  invoicePdfAttached: string;
  invoicePdfDownloadBelow: string;
  downloadInvoicePdf: string;
  footerTagline: string;
  // Manual "send to email" delivery
  sendPhotoSubject: (doc: string) => string;
  sendPhotoHeading: string;
  processedBy: string;
  yourDownloads: string;
  printSheetLabel: string;
  downloadPrintSheet: string;
  accessAnytime: string;
}

export const EMAIL_STRINGS: Record<EmailLocale, EmailStrings> = {
  en: {
    htmlLang: "en",
    faq: "FAQ",
    refundPolicy: "Refund Policy",
    receivingBecause: "You're receiving this because you purchased a photo on PixPassport.",
    supportTitle: "Photo rejected? Just reply to this email.",
    supportBody: (s, c) => `If your ICAO-standard photo is rejected by the authorities, or the crop/background isn't right, reply to this email and we'll fix or redo it for free. You can also write to ${s} · ${c}. We usually reply within 15 minutes to 1 hour.`,
    contactUs: "Contact us",
    deliverySubject: (country, doc) => `Your ${country} (${doc}) photo is ready — Download now! 🎉`,
    deliveryPreheader: (doc) => `Your ${doc} photo is ready to download.`,
    paymentSuccessful: "✓ Payment successful",
    photoReady: (doc) => `Your ${doc} photo is ready`,
    compliant: (country) => `${country} compliant`,
    photoAlt: (doc) => `Your ${doc} photo`,
    downloadPhoto: "⬇&nbsp; Download photo",
    viewOnline: "View online",
    available7Days: "(available for 7 days)",
    originalUpload: "Original upload",
    uploadHint: (country, size) => `Upload it to the official ${country} portal${size ? ` or print it at ${size}` : ""}.`,
    receipt: "Receipt",
    invoice: "Invoice",
    item: "Item",
    method: "Method",
    paid: "Paid",
    paidBadge: "● PAID",
    defaultMethod: "UPI / Card",
    invoiceAttached: "📎 Tax invoice PDF attached.",
    invoiceAvailable: "Tax invoice PDF available for your records.",
    downloadPdf: "Download PDF",
    expertSubject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
    expertHeading: "Your Expert Edit Order is Confirmed! 🌟",
    orderFor: (country, doc) => `Order for ${country} (${doc})`,
    hiThere: "Hi there,",
    expertBody: (country, doc) => `We have received your payment for the expert photo edit for your <strong>${country} (${doc})</strong>. Our biometric team is working on your photo now and will email it back to you as soon as it is perfected.`,
    originalImage: "Original Uploaded Image:",
    viewUpload: "View Upload",
    paymentReceipt: "🧾  Payment Receipt",
    invoiceNumber: "Invoice Number:",
    amountPaid: "Amount Paid:",
    paidCheck: "(PAID ✓)",
    paymentMethod: "Payment Method:",
    invoicePdfAttached: "Your official Tax Invoice PDF is attached to this email.",
    invoicePdfDownloadBelow: "Download your official Tax Invoice PDF using the button below.",
    downloadInvoicePdf: "⬇ Download Tax Invoice PDF",
    footerTagline: "PixPassport — Professional Visa Photo Processing",
    sendPhotoSubject: (doc) => `Your ${doc} Delivery - PixPassport`,
    sendPhotoHeading: "Your Photo is Ready! ✅",
    processedBy: "Processed by PixPassport",
    yourDownloads: "📸 Your Downloads",
    printSheetLabel: "A4 Print Sheet (20 photos, ready to cut)",
    downloadPrintSheet: "⬇ Download Print Sheet",
    accessAnytime: "You can also access your photo anytime at:",
  },
  de: {
    htmlLang: "de",
    faq: "FAQ",
    refundPolicy: "Rückerstattung",
    receivingBecause: "Sie erhalten diese E-Mail, weil Sie ein Foto bei PixPassport gekauft haben.",
    supportTitle: "Foto abgelehnt? Antworten Sie einfach auf diese E-Mail.",
    supportBody: (s, c) => `Wenn Ihr Foto nach ICAO-Standard von der Behörde abgelehnt wird oder Zuschnitt bzw. Hintergrund nicht passen, antworten Sie auf diese E-Mail – wir korrigieren oder erstellen es kostenlos neu. Sie können uns auch unter ${s} schreiben · ${c}. Wir antworten in der Regel innerhalb von 15 Minuten bis 1 Stunde.`,
    contactUs: "Kontakt",
    deliverySubject: (_country, doc) => `Ihr Foto ist fertig (${doc}) — jetzt herunterladen! 🎉`,
    deliveryPreheader: (doc) => `Ihr Foto für ${doc} steht zum Download bereit.`,
    paymentSuccessful: "✓ Zahlung erfolgreich",
    photoReady: (doc) => `Ihr Foto für ${doc} ist fertig`,
    compliant: (country) => `Konform für ${country}`,
    photoAlt: () => `Ihr Passbild`,
    downloadPhoto: "⬇&nbsp; Foto herunterladen",
    viewOnline: "Online ansehen",
    available7Days: "(7 Tage verfügbar)",
    originalUpload: "Original-Upload",
    uploadHint: (country, size) => `Laden Sie es im offiziellen Portal (${country}) hoch${size ? ` oder drucken Sie es im Format ${size} aus` : ""}.`,
    receipt: "Zahlungsbeleg",
    invoice: "Rechnung",
    item: "Artikel",
    method: "Zahlungsart",
    paid: "Bezahlt",
    paidBadge: "● BEZAHLT",
    defaultMethod: "UPI / Karte",
    invoiceAttached: "📎 Rechnung als PDF im Anhang.",
    invoiceAvailable: "Rechnung als PDF für Ihre Unterlagen verfügbar.",
    downloadPdf: "PDF herunterladen",
    expertSubject: "Ihre Experten-Fotobearbeitung ist bestätigt - PixPassport",
    expertHeading: "Ihre Experten-Bearbeitung ist bestätigt! 🌟",
    orderFor: (_country, doc) => `Bestellung für ${doc}`,
    hiThere: "Hallo,",
    expertBody: (_country, doc) => `wir haben Ihre Zahlung für die Experten-Fotobearbeitung für <strong>${doc}</strong> erhalten. Unser Biometrie-Team bearbeitet Ihr Foto jetzt und sendet es Ihnen per E-Mail zu, sobald es perfekt ist.`,
    originalImage: "Hochgeladenes Originalfoto:",
    viewUpload: "Upload ansehen",
    paymentReceipt: "🧾  Zahlungsbeleg",
    invoiceNumber: "Rechnungsnummer:",
    amountPaid: "Bezahlter Betrag:",
    paidCheck: "(BEZAHLT ✓)",
    paymentMethod: "Zahlungsart:",
    invoicePdfAttached: "Ihre offizielle Rechnung (PDF) ist dieser E-Mail beigefügt.",
    invoicePdfDownloadBelow: "Laden Sie Ihre offizielle Rechnung (PDF) über die Schaltfläche unten herunter.",
    downloadInvoicePdf: "⬇ Rechnung (PDF) herunterladen",
    footerTagline: "PixPassport — Professionelle Pass- und Visumfotos",
    sendPhotoSubject: (doc) => `Ihr Foto: ${doc} - PixPassport`,
    sendPhotoHeading: "Ihr Foto ist fertig! ✅",
    processedBy: "Bearbeitet von PixPassport",
    yourDownloads: "📸 Ihre Downloads",
    printSheetLabel: "A4-Druckbogen (20 Fotos, zum Ausschneiden)",
    downloadPrintSheet: "⬇ Druckbogen herunterladen",
    accessAnytime: "Sie können Ihr Foto auch jederzeit hier abrufen:",
  },
  fr: {
    htmlLang: "fr",
    faq: "FAQ",
    refundPolicy: "Politique de remboursement",
    receivingBecause: "Vous recevez cet e-mail car vous avez acheté une photo sur PixPassport.",
    supportTitle: "Photo refusée ? Répondez simplement à cet e-mail.",
    supportBody: (s, c) => `Si votre photo aux normes OACI est refusée par l'administration, ou si le cadrage ou le fond ne conviennent pas, répondez à cet e-mail et nous la corrigerons ou la referons gratuitement. Vous pouvez aussi écrire à ${s} · ${c}. Nous répondons généralement en 15 minutes à 1 heure.`,
    contactUs: "Nous contacter",
    deliverySubject: (_country, doc) => `Votre photo est prête (${doc}) — téléchargez-la maintenant ! 🎉`,
    deliveryPreheader: (doc) => `Votre photo pour ${doc} est prête à être téléchargée.`,
    paymentSuccessful: "✓ Paiement réussi",
    photoReady: (doc) => `Votre photo pour ${doc} est prête`,
    compliant: (country) => `Conforme pour : ${country}`,
    photoAlt: () => `Votre photo d'identité`,
    downloadPhoto: "⬇&nbsp; Télécharger la photo",
    viewOnline: "Voir en ligne",
    available7Days: "(disponible pendant 7 jours)",
    originalUpload: "Photo d'origine",
    uploadHint: (country, size) => `Importez-la sur le portail officiel (${country})${size ? ` ou imprimez-la au format ${size}` : ""}.`,
    receipt: "Reçu",
    invoice: "Facture",
    item: "Article",
    method: "Moyen de paiement",
    paid: "Payé",
    paidBadge: "● PAYÉ",
    defaultMethod: "UPI / Carte",
    invoiceAttached: "📎 Facture PDF jointe.",
    invoiceAvailable: "Facture PDF disponible pour vos dossiers.",
    downloadPdf: "Télécharger le PDF",
    expertSubject: "Votre commande de retouche par un expert est confirmée - PixPassport",
    expertHeading: "Votre commande de retouche experte est confirmée ! 🌟",
    orderFor: (_country, doc) => `Commande pour ${doc}`,
    hiThere: "Bonjour,",
    expertBody: (_country, doc) => `Nous avons bien reçu votre paiement pour la retouche experte de votre photo <strong>${doc}</strong>. Notre équipe biométrie travaille dès maintenant sur votre photo et vous l'enverra par e-mail dès qu'elle sera parfaite.`,
    originalImage: "Photo d'origine importée :",
    viewUpload: "Voir la photo",
    paymentReceipt: "🧾  Reçu de paiement",
    invoiceNumber: "Numéro de facture :",
    amountPaid: "Montant payé :",
    paidCheck: "(PAYÉ ✓)",
    paymentMethod: "Moyen de paiement :",
    invoicePdfAttached: "Votre facture officielle (PDF) est jointe à cet e-mail.",
    invoicePdfDownloadBelow: "Téléchargez votre facture officielle (PDF) avec le bouton ci-dessous.",
    downloadInvoicePdf: "⬇ Télécharger la facture (PDF)",
    footerTagline: "PixPassport — Photos d'identité et de visa professionnelles",
    sendPhotoSubject: (doc) => `Votre photo : ${doc} - PixPassport`,
    sendPhotoHeading: "Votre photo est prête ! ✅",
    processedBy: "Traitée par PixPassport",
    yourDownloads: "📸 Vos téléchargements",
    printSheetLabel: "Planche A4 (20 photos, prêtes à découper)",
    downloadPrintSheet: "⬇ Télécharger la planche",
    accessAnytime: "Vous pouvez aussi accéder à votre photo à tout moment ici :",
  },
};

export function getEmailStrings(locale: EmailLocale = "en"): EmailStrings {
  return EMAIL_STRINGS[locale] || EMAIL_STRINGS.en;
}
