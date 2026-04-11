export interface FAQ {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;        // H2
  paragraphs: string[];   // multiple <p> blocks
  subSections?: {
    heading: string;      // H3
    paragraphs: string[];
    details?: {
      heading: string;    // H4
      paragraphs: string[];
    }[];
  }[];
}

export interface CountryPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  h1: string;
  heroDescription: string;
  ctaText: string;
  ctaSecondaryText: string;
  contentSections: ContentSection[];
  faqs: FAQ[];
}

export interface CountryData {
  code: string;              // e.g. "uk", "de"
  slugPrefix: string;        // e.g. "uk", "deutschland"
  name: string;              // English name
  nativeName: string;        // Native name
  language: string;          // e.g. "en", "de"
  locale: string;            // e.g. "en_GB", "de_DE"
  flag: string;              // emoji
  currency: string;          // e.g. "GBP", "EUR"
  embassyCity: string;       // main US embassy
  pages: CountryPage[];
}

// Localized UI strings
export interface LocalizedStrings {
  howItWorks: string;
  steps: { title: string; desc: string }[];
  specsTitle: string;
  specs: { label: string; value: string; detail: string }[];
  pricingTitle: string;
  pricingSubtitle: string;
  pricingFeatures?: string[];
  pricingOneTime?: string;
  pricingNoAccount?: string;
  privacyTitle: string;
  privacyItems: { icon: string; title: string; desc: string }[];
  trustBadges: { icon: string; text: string }[];
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  statsItems: { stat: string; label: string }[];
  uploadButton: string;
  seeHowItWorks: string;
  internalLinksTitle: string;
  relatedCountriesTitle: string;
}

export interface FullCountryData extends CountryData {
  strings: LocalizedStrings;
}
