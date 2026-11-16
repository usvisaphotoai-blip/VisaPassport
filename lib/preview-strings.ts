/**
 * UI copy for /preview/[id]. English is the default; a country section overrides any
 * subset through the `preview:` block of content/sites/<code>/_site.md, and the page
 * picks that section up from `?from=<code>`.
 *
 * Placeholders in {braces} are filled by formatPreview().
 */
export const DEFAULT_PREVIEW_STRINGS = {
  headingBefore: "Your",
  headingHighlight: "ID Photo",
  headingAfter: "Is Ready",
  supportPill: "24/7 Email Support:",
  guaranteeLine: "100% Acceptance Guarantee • Refund if Rejected",
  documentPhoto: "Document Photo",
  docPassport: "Passport",
  docVisa: "Visa",
  productPhoto: "{doc} Photo",
  verifiedCompliant: "Verified Compliant",
  photoAlt: "Passport Preview",
  meetsRequirements: "Your Photo Meets Official Requirements",
  metricFixes: [
    "ICAO Standard photo",
    "Government compliant photo",
    "AI biometric validation",
    "100% acceptance guarantee",
    "Refund if rejected",
    "Instant download + print sheet",
  ],
  backgroundCorrected: "✓ Background professionally corrected to official requirements",
  supportTitle: "24/7 Dedicated Email Support",
  supportLive: "Live 24x7",
  supportBody:
    "Questions about embassy requirements, print sizing, or need custom assistance with your photo? Our biometric support team is ready to help 24 hours a day, 7 days a week.",
  supportEmailButton: "Email support@pixpassport.com",
  supportReply: "Average reply <15 mins",
  orderSummary: "Order Summary - Accepted for passport & visa applications",
  standardPack: "Standard Pack",
  standardFeatures: [
    "AI Biometric Check",
    "Instant digital download",
    "Official A4 print sheet",
    "100% acceptance guarantee",
    "24/7 Email support",
  ],
  mostPopular: "MOST POPULAR",
  expertReview: "EXPERT REVIEW",
  premiumPack: "Premium Pack",
  premiumFeatures: [
    "Everything in Standard",
    "Human expert review in <15 min",
    "Extra compliance verifications",
    "Priority processing",
    "24/7 Email support",
    "Reduced rejection risk",
  ],
  seeExpertsFix: "See What Our Experts Fix",
  customerAvatarAlt: "Customer avatar",
  emailForDelivery: "Email for Delivery",
  emailPlaceholder: "Enter your email",
  ctaExpert: "Get Expert Review",
  ctaStandard: "Download Now",
  trustSecure: "Secure Checkout",
  trustRefund: "Refund if Rejected",
  trustSsl: "256-bit SSL",
  paidTitle: "Payment Successful!",
  paidReviewed: "Every ID photo is carefully reviewed by our experts to ensure it meets all requirements.",
  paidNotify: "If we find any issues, we’ll notify you via email with your photo.",
  paidContact: "For any questions, feel free to contact us at",
  downloadDigital: "Download Digital {doc} Photo",
  printSheet: "Customize & Print Sheet (A4 / 4×6 / 5×7)",
  modalBadge: "Human Expert Review",
  modalGuarantee: "• 100% Acceptance Guaranteed",
  modalNote:
    "This information and customer feedback is added based on user confirmation & verified submission results.",
  fixTitles: [
    "Wall Shadow Removal & Background Calibration",
    "Biometric Eye Level & Face Centering",
    "Glare & Reflection Reduction on Glasses",
    "Head Tilt Correction & Alignment",
    "Lighting & Contrast Balancing",
    "Background Uniformity & Noise Removal",
    "Official Passport Aspect Ratio & Crop",
    "Color Balance & Tone Normalization",
    "Shoulder Leveling & Posture Balance",
    "Sharpness Enhancement & Blur Correction",
    "Full ICAO Standard Compliance Verification",
  ],
  before: "Before",
  after: "After",
  beforeAlt: "Before expert fix",
  afterAlt: "After expert fix",
  modalEmailPlaceholder: "Enter email address for delivery",
  continue: "Continue",
  close: "Close",
  invalidEmail: "Please enter a valid email address.",
  zoomLabel: "Photo preview zoom",
  zoomAlt: "Full passport photo preview",
  previewOnly: "Preview Only",
  fullResolution: "Full Resolution",
  watermarked: "Watermarked Preview",
  zoomCloseDesktop: "Press Esc or click outside to close",
  zoomCloseMobile: "Tap X to close",
  mobileEmailPlaceholder: "Email for your photo",
  mobileCtaExpert: "Expert Review",
  mobileCtaStandard: "Download Photo",
  mobileTrust: "Secure · Refund if rejected · No subscription",
  dialogTitle: "Where should we send it?",
  dialogBody: "Enter your email to receive your processed photo and receipt.",
  dialogPlaceholder: "you@example.com",
  cancel: "Cancel",
  emailMe: "Email Me My Photo",
  send: "Send",
  sending: "Sending...",
  emailPrompt: "Enter your email address to receive the photo:",
  emailSent: "Photo sent! Check your inbox.",
  emailFailed: "Failed to send. Please try again.",
  emailError: "Error sending email.",
};

export type PreviewStrings = typeof DEFAULT_PREVIEW_STRINGS;

/** Merges a section's overrides onto the English defaults, ignoring unknown keys and wrong types */
export function resolvePreviewStrings(overrides?: Record<string, unknown>): PreviewStrings {
  const out: Record<string, unknown> = { ...DEFAULT_PREVIEW_STRINGS };
  if (!overrides) return out as PreviewStrings;
  for (const [key, fallback] of Object.entries(DEFAULT_PREVIEW_STRINGS)) {
    const value = overrides[key];
    if (Array.isArray(fallback)) {
      // Lists must keep their length; a short translation falls back item by item
      if (Array.isArray(value)) out[key] = fallback.map((f, i) => (typeof value[i] === "string" ? value[i] : f));
    } else if (typeof value === "string") {
      out[key] = value;
    }
  }
  return out as PreviewStrings;
}

export function formatPreview(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
}
