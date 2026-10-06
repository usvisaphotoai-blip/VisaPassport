import { deBackgroundLabels } from "./translations";

// German names for the Germany-specific sub-documents offered in the /de tool
export const germanSubDocLabels: Record<string, string> = {
  "germany-passport": "Deutschland – Reisepass",
  "germany-id-card": "Deutschland – Personalausweis",
  "germany-driving-license": "Deutschland – Führerschein",
  "germany-health-insurance": "Deutschland – Gesundheitskarte (eGK)",
  "germany-cv": "Deutschland – Bewerbungsfoto",
  "germany-student-id": "Deutschland – Studierendenausweis",
  "germany-visa": "Deutschland – Visum",
};

const specialLabels: Record<string, string> = {
  "icao-passport": "ICAO-Standard – biometrisches Foto",
  "schengen-visa": "Schengen-Visum",
  "us-visa": "USA – Visum (DS-160)",
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
  const iso = flagToIso(flag);
  if (!iso) return fallback;
  try {
    return getRegionNames()?.of(iso) ?? fallback;
  } catch {
    return fallback;
  }
}

/** German display label for a document type from data/countries-specs.json */
export function germanDocLabel(doc: { id: string; label: string; flag?: string; country?: string }): string {
  if (germanSubDocLabels[doc.id]) return germanSubDocLabels[doc.id];
  if (specialLabels[doc.id]) return specialLabels[doc.id];
  const country = germanCountryName(doc.flag, doc.country || doc.label);
  return doc.id.endsWith("-visa") ? `${country} – Visum` : `${country} – Reisepass`;
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
