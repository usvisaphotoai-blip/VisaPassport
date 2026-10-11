import { deBackgroundLabels } from "./translations";
import { getCentralCountry, formatLocalizedDocLabel, formatDualCountryLabel } from "@/lib/countries-registry";

// German names for the Germany-specific sub-documents offered in the /de tool
export const germanSubDocLabels: Record<string, string> = {
  "germany-passport": "Deutschland (Germany) – Reisepass",
  "germany-id-card": "Deutschland (Germany) – Personalausweis",
  "germany-driving-license": "Deutschland (Germany) – Führerschein",
  "germany-health-insurance": "Deutschland (Germany) – Gesundheitskarte (eGK)",
  "germany-cv": "Deutschland (Germany) – Bewerbungsfoto",
  "germany-student-id": "Deutschland (Germany) – Studierendenausweis",
  "germany-visa": "Deutschland (Germany) – Visum",
};

const specialLabels: Record<string, string> = {
  "icao-passport": "ICAO-Standard (ICAO Standard) – biometrisches Foto",
  "schengen-visa": "Schengen-Raum (Schengen Area) – Visum",
  "schengen-passport": "Schengen-Raum (Schengen Area) – Reisepass",
  "us-visa": "Vereinigte Staaten (United States) – Visum (DS-160)",
};

let regionNames: Intl.DisplayNames | null = null;
function getRegionNames() {
  if (!regionNames) {
    try {
      regionNames = new Intl.DisplayNames(["de"], { type: "region" });
    } catch {
      regionNames = null;
    }
  }
  return regionNames;
}

// Converts a flag emoji (two regional indicator symbols) into its ISO 3166 code
function flagToIso(flag?: string): string | null {
  if (!flag) return null;
  const points = Array.from(flag).map((c) => c.codePointAt(0) ?? 0);
  if (points.length !== 2 || points.some((p) => p < 0x1f1e6 || p > 0x1f1ff)) return null;
  return String.fromCharCode(...points.map((p) => p - 0x1f1e6 + 65));
}

export function germanCountryName(flag?: string, fallback = ""): string {
  const central = getCentralCountry(fallback);
  if (central) return central.translations.de;
  const iso = flagToIso(flag);
  if (!iso) return fallback;
  try {
    return getRegionNames()?.of(iso) ?? fallback;
  } catch {
    return fallback;
  }
}

/** German display label for a document type with dual German & English names */
export function germanDocLabel(doc: { id: string; label: string; flag?: string; country?: string }): string {
  if (germanSubDocLabels[doc.id]) return germanSubDocLabels[doc.id];
  if (specialLabels[doc.id]) return specialLabels[doc.id];
  const central = getCentralCountry(doc.id) || getCentralCountry(doc.country) || getCentralCountry(flagToIso(doc.flag) || undefined);
  if (central) {
    return formatLocalizedDocLabel(central, "de", doc.id.endsWith("-visa") ? "visa" : "passport");
  }
  const country = germanCountryName(doc.flag, doc.country || doc.label);
  const english = doc.country || doc.label;
  const dual = country.toLowerCase() === english.toLowerCase() ? country : `${country} (${english})`;
  return doc.id.endsWith("-visa") ? `${dual} – Visum` : `${dual} – Reisepass`;
}

export function germanBackgroundLabel(bg: string): string {
  return deBackgroundLabels[bg] ?? bg;
}

/** "35×45 mm (413×531 px)" → "35 × 45 mm" for compact German display */
export function germanSizeLabel(size: string): string {
  const mm = size.match(/^(\d+(?:[.,]\d+)?)×(\d+(?:[.,]\d+)?) mm/);
  if (mm) return `${mm[1].replace(".", ",")} × ${mm[2].replace(".", ",")} mm`;
  return size.replace(/×/g, " × ");
}
