import { getFilteredDocumentTypes } from "@/lib/specs";
import { countryMapping } from "@/lib/external-api";

export type ToolDoc = {
  id: string;
  label: string;
  size: string;
  bg: string;
  head: string;
  flag: string;
  /** true for the page's own country documents (uses the page's fixed country code) */
  isLocal: boolean;
  countryCode?: string;
};

/** Every supported country's document types from the main app's spec data, excluding the given country's own. */
export function getOtherCountryDocs(excludeCountry: string, excludeIdPrefixes: string[]): ToolDoc[] {
  return getFilteredDocumentTypes()
    .filter((d) => d.country !== excludeCountry && !excludeIdPrefixes.some((p) => d.id.startsWith(p)))
    .map((d) => {
      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
      const countryCode = countryMapping[slug] || (d as any).countryCode;
      return {
        id: d.id,
        label: d.label,
        size: d.size,
        bg: d.bg_color ? d.bg_color.charAt(0).toUpperCase() + d.bg_color.slice(1) : "White",
        head: "Per official spec",
        flag: d.flag || "🌍",
        isLocal: false,
        countryCode,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

/** Same document-id → country-code resolution as lib/processPhoto.ts */
export function getCountryCode(docId: string): string {
  const slug = docId.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
  let code = countryMapping[slug] || "US";
  if (docId.includes("ds-160")) code = "US";
  if (docId.includes("schengen")) code = "EU";
  if (docId.startsWith("france-")) code = "FR";
  if (docId.startsWith("germany-")) code = "DE";
  if (docId.startsWith("uk-")) code = "GB";
  if (docId.startsWith("canada-")) code = "CA";
  if (docId === "foto-3x4") code = "BR-3*4";
  return code;
}
