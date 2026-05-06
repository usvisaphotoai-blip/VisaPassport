import specsData from "@/data/countries-specs.json";
import { DocumentType } from "@/app/tool/types";
import { countryMapping } from "./external-api";

export const SUPPORTED_COUNTRIES = [
  "DZ", "AU", "AT", "BE", "BG", "CN", "HR", "CZ", "DK", "EE",
  "FI", "FR", "DE", "GR", "HU", "IN", "ID", "IR", "IQ", "IT",
  "JP", "KZ", "LV", "LT", "LU", "MT", "NL", "NZ", "NO", "PL",
  "PT", "RO", "EU", "SG", "SK", "SI", "KR", "ES", "SE", "CHE",
  "TH", "TR", "AE", "GB", "US"
];

export interface CountrySpec {
  id: string;
  name: string;
  country: string;
  flag: string;
  width_mm: number | string;
  height_mm: number | string;
  width_px: number | string;
  height_px: number | string;
  head_min_pct: number | string;
  head_max_pct: number | string;
  eye_min_pct: number | string;
  eye_max_pct: number | string;
  bg_color: string;
  price: number;
  print_size: "A4" | "Letter";
  head_top_multiplier?: number;
  dpi?: number;
}

export const allSpecs = specsData as CountrySpec[];

// ---------------------------------------------------------------
// getSpecById — resolves a document-type slug to a CountrySpec.
//
// BUG FIX: The old function returned `undefined` for any slug that
// collapsed to just the country name (e.g. "nigeria" from
// "nigeria-photo"), causing route.ts to silently fall back to
// US passport defaults (50–69% head range) for country specs that
// require 70–80%. This caused hair to be cropped on those photos.
//
// Fix strategy:
//  1. Direct match (unchanged)
//  2. Strip known suffixes, then try -passport, -visa, exact (unchanged)
//  3. NEW: Try treating the base as a country name fragment and
//     searching for any spec whose id starts with that base.
//     Prefers -passport over -visa over anything else.
//  4. Special hardcoded overrides (unchanged + extended)
// ---------------------------------------------------------------
export function getSpecById(id: string): CountrySpec | undefined {
  if (!id) return undefined;

  // 1. Direct match
  const direct = allSpecs.find((s) => s.id === id);
  if (direct) return direct;

  // 2. Strip known URL suffixes to get the base slug
  const base = id
    .replace(/-photo-editor-tool$/, "")
    .replace(/-editor-tool$/, "")
    .replace(/-photo-editor$/, "")
    .replace(/-photo$/, "")
    .replace(/-editor$/, "")
    .toLowerCase()
    .trim();

  // 3. Try exact base, then base-passport, then base-visa
  const byBase =
    allSpecs.find((s) => s.id === base) ||
    allSpecs.find((s) => s.id === `${base}-passport`) ||
    allSpecs.find((s) => s.id === `${base}-visa`);
  if (byBase) return byBase;

  // 4. Special hardcoded overrides
  if (base === "us-visa" || base === "ds-160") return allSpecs.find((s) => s.id === "ds-160-visa");
  if (base === "general") return allSpecs.find((s) => s.id === "us-passport");
  if (base === "u-s-a" || base === "usa") return allSpecs.find((s) => s.id === "us-passport");
  if (base === "belguim" || base === "belgium") return allSpecs.find((s) => s.id === "belgium-passport");
  if (base === "uk" || base === "united-kingdom") return allSpecs.find((s) => s.id === "uk-passport");

  // ---------------------------------------------------------------
  // BUG FIX — Country-name fragment fallback.
  // If after stripping all known suffixes we still have no match,
  // the slug might just be the country name (e.g. "nigeria" from
  // "nigeria-photo"). Search for any spec whose id STARTS WITH the
  // base fragment, preferring -passport, then -visa, then first hit.
  // Without this, route.ts gets `undefined` and uses US defaults,
  // causing hair to be cut on 70-80% head-range country photos.
  // ---------------------------------------------------------------
  const passportFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`) && s.id.endsWith("-passport"));
  if (passportFallback) return passportFallback;

  const visaFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`) && s.id.endsWith("-visa"));
  if (visaFallback) return visaFallback;

  const anyFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`));
  if (anyFallback) return anyFallback;

  return undefined;
}

// ---------------------------------------------------------------
// getSafeSpec — always returns a spec, never undefined.
// Use this in route.ts instead of getSpecById() to make the
// fallback to US passport explicit and logged, not silent.
// ---------------------------------------------------------------
export function getSafeSpec(id: string): CountrySpec {
  const spec = getSpecById(id);
  if (!spec) {
    console.warn(`[specs] No spec found for id="${id}", falling back to us-passport`);
    return allSpecs.find((s) => s.id === "us-passport")!;
  }
  return spec;
}

export function getDocumentTypes(): DocumentType[] {
  return allSpecs.map((s) => ({
    id: s.id,
    label: s.name,
    size:
      s.width_mm !== "unspecified" && s.height_mm !== "unspecified"
        ? `${s.width_mm}×${s.height_mm} mm (${s.width_px}×${s.height_px} px)`
        : `${s.width_px}×${s.height_px} px`,
    bg_color: s.bg_color,
    country: s.country,
    flag: s.flag,
    price: s.price,
    printSize: s.print_size,
  }));
}

export function getFilteredDocumentTypes(): DocumentType[] {
  const all = getDocumentTypes();
  return all.filter((d) => {
    const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || d.id.split("-")[0].toUpperCase();
    return SUPPORTED_COUNTRIES.includes(code);
  });
}

export function getFilteredSpecs(): CountrySpec[] {
  return allSpecs.filter((s) => {
    const slug = s.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || s.id.split("-")[0].toUpperCase();
    return SUPPORTED_COUNTRIES.includes(code);
  });
}