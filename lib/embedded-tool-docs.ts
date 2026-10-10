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
};

/** Every supported country's document types from the main app's spec data, excluding the given country's own. */
export function getOtherCountryDocs(excludeCountry: string, excludeIdPrefixes: string[]): ToolDoc[] {
  return getFilteredDocumentTypes()
    .filter((d) => d.country !== excludeCountry && !excludeIdPrefixes.some((p) => d.id.startsWith(p)))
    .map((d) => ({
      id: d.id,
      label: d.label,
      size: d.size,
      bg: d.bg_color ? d.bg_color.charAt(0).toUpperCase() + d.bg_color.slice(1) : "White",
      head: "Per official spec",
      flag: d.flag || "🌍",
      isLocal: false,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/** Same document-id → country-code resolution as lib/processPhoto.ts */
export function getCountryCode(docId: string): string {
  const slug = docId.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
  let code = countryMapping[slug] || "US";
  if (docId.includes("ds-160")) code = "US";
  if (docId.includes("schengen")) code = "EU";
  if (docId.startsWith("france-")) code = "FR";
  return code;
}
