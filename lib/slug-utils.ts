import specs from "../data/countries-specs.json";
import moneyPages from "../data/money-pages.json";
import toolPages from "../data/tool-seo-pages.json";
import specialPages from "../data/special-photo-pages.json";

export interface SpecEntry {
  id: string;
  country: string;
  name: string;
  flag?: string;
  width_mm: number;
  height_mm: number;
  width_px?: number;
  height_px?: number;
  head_min_pct?: number;
  head_max_pct?: number;
  eye_min_pct?: number;
  eye_max_pct?: number;
  bg_color?: string;
  print_size?: string;
  price: number;
  passportcontent?: string;
  visacontent?: string;
  local_price?: {
    currency: string;
    symbol: string;
    amount: number;
  };
  hero_photo?: string;
  dpi?: number;

  // Custom SEO / Metadata overrides from data/countries-specs.json
  title?: string;
  meta_title?: string;
  metaTitle?: string;
  passport_title?: string;
  passportTitle?: string;
  passport_meta_title?: string;
  passportMetaTitle?: string;
  visa_title?: string;
  visaTitle?: string;
  visa_meta_title?: string;
  visaMetaTitle?: string;

  h1?: string;
  h1_title?: string;
  hero_title?: string;
  heroTitle?: string;
  passport_h1?: string;
  passportH1?: string;
  passport_h1_title?: string;
  passportHeroTitle?: string;
  passport_hero_title?: string;
  visa_h1?: string;
  visaH1?: string;
  visa_h1_title?: string;
  visaHeroTitle?: string;
  visa_hero_title?: string;

  meta_description?: string;
  metaDescription?: string;
  description?: string;
  meta_desc?: string;
  passport_meta_description?: string;
  passportMetaDescription?: string;
  passport_description?: string;
  passportDescription?: string;
  passport_meta_desc?: string;
  visa_meta_description?: string;
  visaMetaDescription?: string;
  visa_description?: string;
  visaDescription?: string;
  visa_meta_desc?: string;

  keywords?: string[];
  passport_keywords?: string[];
  passportKeywords?: string[];
  visa_keywords?: string[];
  visaKeywords?: string[];
}

/**
 * Resolves custom meta title for a spec if defined in countries-specs.json.
 */
export function getSpecTitle(spec: SpecEntry, isVisa: boolean): string | undefined {
  if (isVisa) {
    return (
      spec.visa_title ||
      spec.visaTitle ||
      spec.visa_meta_title ||
      spec.visaMetaTitle ||
      (spec.id.includes("visa")
        ? spec.title || spec.meta_title || spec.metaTitle
        : !spec.id.includes("passport")
        ? spec.title || spec.meta_title || spec.metaTitle
        : undefined)
    );
  } else {
    return (
      spec.passport_title ||
      spec.passportTitle ||
      spec.passport_meta_title ||
      spec.passportMetaTitle ||
      (!spec.id.includes("visa")
        ? spec.title || spec.meta_title || spec.metaTitle
        : undefined)
    );
  }
}

/**
 * Resolves custom H1 for a spec if defined in countries-specs.json.
 */
export function getSpecH1(spec: SpecEntry, isVisa: boolean): string | undefined {
  if (isVisa) {
    return (
      spec.visa_h1 ||
      spec.visaH1 ||
      spec.visa_h1_title ||
      spec.visaHeroTitle ||
      spec.visa_hero_title ||
      (spec.id.includes("visa")
        ? spec.h1 || spec.h1_title || spec.hero_title || spec.heroTitle
        : !spec.id.includes("passport")
        ? spec.h1 || spec.h1_title || spec.hero_title || spec.heroTitle
        : undefined)
    );
  } else {
    return (
      spec.passport_h1 ||
      spec.passportH1 ||
      spec.passport_h1_title ||
      spec.passportHeroTitle ||
      spec.passport_hero_title ||
      (!spec.id.includes("visa")
        ? spec.h1 || spec.h1_title || spec.hero_title || spec.heroTitle
        : undefined)
    );
  }
}

/**
 * Resolves custom meta description for a spec if defined in countries-specs.json.
 */
export function getSpecMetaDescription(spec: SpecEntry, isVisa: boolean): string | undefined {
  if (isVisa) {
    return (
      spec.visa_meta_description ||
      spec.visaMetaDescription ||
      spec.visa_description ||
      spec.visaDescription ||
      spec.visa_meta_desc ||
      (spec.id.includes("visa")
        ? spec.meta_description || spec.metaDescription || spec.description || spec.meta_desc
        : !spec.id.includes("passport")
        ? spec.meta_description || spec.metaDescription || spec.description || spec.meta_desc
        : undefined)
    );
  } else {
    return (
      spec.passport_meta_description ||
      spec.passportMetaDescription ||
      spec.passport_description ||
      spec.passportDescription ||
      spec.passport_meta_desc ||
      (!spec.id.includes("visa")
        ? spec.meta_description || spec.metaDescription || spec.description || spec.meta_desc
        : undefined)
    );
  }
}

/**
 * Resolves custom keywords for a spec if defined in countries-specs.json.
 */
export function getSpecKeywords(spec: SpecEntry, isVisa: boolean): string[] | undefined {
  if (isVisa) {
    return (
      spec.visa_keywords ||
      spec.visaKeywords ||
      (spec.id.includes("visa") || !spec.id.includes("passport") ? spec.keywords : undefined)
    );
  } else {
    return (
      spec.passport_keywords ||
      spec.passportKeywords ||
      (!spec.id.includes("visa") ? spec.keywords : undefined)
    );
  }
}

/**
 * Normalizes a country ID or name to its SEO-preferred short version.
 */
export function getShortId(id: string): string {
  return id
    .replace("-passport", "")
    .replace("-visa", "")
    .replace("ds-160", "us")
    .replace("united-states", "us")
    .replace("united-kingdom", "uk")
    .replace("united-arab-emirates", "uae")
    .replace("icao-/-eu", "icao")
    .replace("icao-eu", "icao");
}

/**
 * Generates the single canonical slug for a given spec ID.
 */
export function getCanonicalSlug(id: string): string {
  const base = getShortId(id);
  if (id.includes("visa")) {
    return `${base}-visa-photo-editor`;
  }
  return `${base}-passport-photo-editor`;
}

const specIdCache = new Map<string, string | null>();

/**
 * Maps a URL slug to a specification ID.
 * Uses a prebuilt cache for O(1) lookup speed after first resolution.
 */
export function getSpecIdFromSlug(slug?: string): string | null {
  if (!slug) return null;
  if (specIdCache.has(slug)) return specIdCache.get(slug)!;
  
  // Normalize by removing common suffixes
  const base = slug.replace(/-photo-editor$/, "").replace(/-photo$/, "");
  const isVisaIntent = base.includes("visa");
  const isPassportIntent = base.includes("passport");
  
  let result: string | null = null;

  // 1. Direct match with current IDs
  const directMatch = specs.find(s => s.id === base);
  if (directMatch) {
    result = directMatch.id;
  } else if (base === "us-visa" || base === "united-states-visa" || base === "ds-160-visa") {
    result = "us-visa";
  } else if (base === "us-passport" || base === "united-states-passport") {
    result = "us-passport";
  } else if (base === "uk-passport" || base === "united-kingdom-passport") {
    result = "uk-passport";
  } else {
    // 3. Match by normalized country name and intent
    const shortBase = getShortId(base);
    
    // Priority 1: Match with specific intent (e.g. searching for a visa spec)
    const exactIntentMatch = specs.find(s => {
      const sShortId = getShortId(s.id);
      if (sShortId !== shortBase) return false;
      if (isVisaIntent && s.id.includes("visa")) return true;
      if (isPassportIntent && (s.id.includes("passport") || !s.id.includes("visa"))) return true;
      return false;
    });

    if (exactIntentMatch) {
      result = exactIntentMatch.id;
    } else {
      // Priority 2: Fallback to any spec for that country (Passport usually)
      const countryMatch = specs.find(s => {
        const sShortId = getShortId(s.id);
        return sShortId === shortBase;
      });
      result = countryMatch?.id || null;
    }
  }

  specIdCache.set(slug, result);
  return result;
}

/**
 * Returns ONLY the canonical slug for a specification.
 */
export function getSlugsForSpec(spec: SpecEntry): string[] {
  return [getCanonicalSlug(spec.id)];
}

/**
 * Returns all canonical slugs for root-level pages (Passport, Visa, & Money Pages).
 * Ensures every country gets BOTH a passport and visa slug for maximum SEO coverage.
 */
export function getAllSlugs(): string[] {
  const slugs = new Set<string>();
  
  // 1. Process Country Specs
  const uniqueCountries = Array.from(new Set(specs.map(s => s.country)));
  
  uniqueCountries.forEach(country => {
    const base = country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    // Normalize certain country bases to match SEO preferences (e.g. United States -> us)
    const normalizedBase = getShortId(base);
    
    slugs.add(`${normalizedBase}-passport-photo-editor`);
    slugs.add(`${normalizedBase}-visa-photo-editor`);
  });

  // 2. Also ensure existing specific IDs are covered (e.g. us-visa)
  (specs as SpecEntry[]).forEach(spec => {
    slugs.add(getCanonicalSlug(spec.id));
  });

  // 3. Money Pages
  moneyPages.forEach(page => {
    slugs.add(page.slug);
  });

  // 4. Tool SEO Pages
  toolPages.forEach(page => {
    slugs.add(page.slug);
  });

  // 5. Special Photo Pages
  specialPages.forEach(page => {
    slugs.add(page.slug);
  });

  return Array.from(slugs);
}

