import specs from "../data/countries-specs.json";

export interface SpecEntry {
  id: string;
  country: string;
  name: string;
  width_mm: number;
  height_mm: number;
  unit: string;
  paper: string;
  price: number;
  local_price?: {
    currency: string;
    symbol: string;
    amount: number;
  };
}

/**
 * Maps a URL slug to a specification ID.
 * Examples:
 * - "india-passport-photo-editor" -> "india-passport"
 * - "us-visa-photo-editor" -> "ds-160-visa"
 * - "uk-passport-photo-editor" -> "uk-passport"
 */
export function getSpecIdFromSlug(slug?: string): string | null {
  if (!slug) return null;
  const base = slug.replace(/-photo-editor$/, "").replace(/-photo$/, "");
  
  // Direct match
  if (specs.find(s => s.id === base)) return base;
  
  // Special cases for US
  if (base === "us-visa" || base === "united-states-visa") return "ds-160-visa";
  if (base === "us-passport" || base === "united-states-passport") return "us-passport";
  
  // Try finding by base or country name
  const match = specs.find(s => 
    s.id === base || 
    s.id === `${base}-passport` || 
    s.id === `${base}-visa` ||
    s.country.toLowerCase().replace(/\s+/g, "-") === base.replace(/-visa$/, "").replace(/-passport$/, "")
  );

  // If it's a visa slug, try to prefer a visa ID
  if (base.includes("-visa")) {
    const countryBase = base.replace(/-visa$/, "");
    const visaMatch = specs.find(s => s.id.includes("visa") && s.country.toLowerCase().replace(/\s+/g, "-") === countryBase);
    if (visaMatch) return visaMatch.id;
  }
  
  return match?.id || null;
}

/**
 * Generates SEO-friendly slugs for a specification.
 */
export function getSlugsForSpec(spec: SpecEntry): string[] {
  const base = spec.id;
  return [
    `${base}-photo-editor`,
    `${base}-photo`,
    // If it's "ds-160-visa", also allow "us-visa-photo-editor"
    ...(base === "ds-160-visa" ? ["us-visa-photo-editor", "us-visa-photo"] : []),
  ];
}

/**
 * Generates SEO-friendly slugs specifically for Visa photos.
 */
export function getVisaSlugsForSpec(spec: SpecEntry): string[] {
  const country = spec.country.toLowerCase().replace(/\s+/g, "-");
  return [
    `${country}-visa-photo-editor`,
    `${country}-visa-photo`,
  ];
}

/**
 * Returns all possible slugs for sitemap and static params.
 */
export function getAllSlugs(): string[] {
  const slugs: string[] = [];
  (specs as SpecEntry[]).forEach(spec => {
    slugs.push(...getSlugsForSpec(spec));
  });
  return slugs;
}

/**
 * Returns all possible Visa slugs.
 */
export function getAllVisaSlugs(): string[] {
  const slugs: string[] = [];
  (specs as SpecEntry[]).forEach(spec => {
    slugs.push(...getVisaSlugsForSpec(spec));
  });
  return slugs;
}
