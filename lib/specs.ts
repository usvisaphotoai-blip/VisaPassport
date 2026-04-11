import specsData from "@/data/countries-specs.json";
import { DocumentType } from "@/app/tool/types";

export interface CountrySpec {
  id: string;
  name: string;
  country: string;
  flag: string;
  width_mm: number;
  height_mm: number;
  width_px: number;
  height_px: number;
  head_min_pct: number;
  head_max_pct: number;
  eye_min_pct: number;
  eye_max_pct: number;
  bg_color: string;
  price: number;
  print_size: "A4" | "Letter";
}

export const allSpecs = specsData as CountrySpec[];

export function getSpecById(id: string): CountrySpec | undefined {
  // 1. Direct match
  const direct = allSpecs.find((s) => s.id === id);
  if (direct) return direct;

  // 2. Slug-style match (remove common suffixes)
  const base = id
    .replace(/-photo-editor$/, "")
    .replace(/-photo$/, "")
    .replace(/-editor-tool$/, "");
  
  const byproduct = allSpecs.find((s) => 
    s.id === base || 
    s.id === `${base}-visa` || 
    s.id === `${base}-passport`
  );
  if (byproduct) return byproduct;

  // 3. Special cases
  if (base === "us-visa") return allSpecs.find(s => s.id === "ds-160-visa");
  if (base === "general") return allSpecs.find(s => s.id === "us-passport");
  if (base === "u-s-a") return allSpecs.find(s => s.id === "us-passport");
  if (base === "belguim" || base === "belgium-visa") return allSpecs.find(s => s.id === "belgium-passport");

  return undefined;
}

export function getDocumentTypes(): DocumentType[] {
  return allSpecs.map((s) => ({
    id: s.id,
    label: s.name,
    size: `${s.width_mm}×${s.height_mm} mm (${s.width_px}×${s.height_px} px)`,
    bg: s.bg_color,
    country: s.country,
    flag: s.flag,
    price: s.price,
    printSize: s.print_size
  }));
}
