import { getFilteredDocumentTypes } from "@/lib/specs";
import { getCentralCountry } from "@/lib/countries-registry";

export interface DocSearchOption {
  id: string;
  label: string;
  country?: string;
  flag?: string;
  size?: string;
  /** Lowercased, accent-stripped search terms (EN/FR/DE/ES/PT names and aliases), space-joined. */
  keywords: string;
  /** Display names per language, used to show which translation matched. */
  names: string[];
}

// "Passport" / "visa" in English, French, German, Spanish and Portuguese.
const DOC_WORDS: Record<string, string[]> = {
  passport: ["passport", "passeport", "reisepass", "pass", "pasaporte", "passaporte"],
  visa: ["visa", "visum", "visado", "visto"],
};

// Countries missing from the registry, plus aliases people commonly type.
const EXTRA_NAMES: Record<string, string[]> = {
  "icao-passport": ["Other country", "ICAO", "Autre pays", "Anderes Land", "Otro país", "Outro país", "35x45"],
  "russia-passport": ["Russia", "Russie", "Russland", "Rusia", "Rússia"],
  "saudi-arabia-passport": ["Saudi Arabia", "Arabie saoudite", "Saudi-Arabien", "Arabia Saudita", "Arábia Saudita", "KSA"],
  "yemen-passport": ["Yemen", "Yémen", "Jemen", "Iémen"],
  "yemen-visa": ["Yemen", "Yémen", "Jemen", "Iémen"],
  "us-passport": ["USA", "US", "America", "Amérique", "Amerika", "EUA", "EEUU", "2x2"],
  "us-visa": ["USA", "US", "America", "Amérique", "Amerika", "EUA", "EEUU", "DS-160", "Vereinigte Staaten", "États-Unis", "Estados Unidos"],
  "uk-passport": ["UK", "Great Britain", "England", "Grande-Bretagne", "Angleterre", "Großbritannien", "England", "Inglaterra", "Gran Bretaña", "Grã-Bretanha"],
  "schengen-visa": ["EU", "Europe", "UE", "Europa", "Europäische Union", "Union européenne", "União Europeia"],
  "germany-passport": ["Personalausweis"],
};

export const normalizeSearch = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Built on the server so the full spec list and translations are not bundled into client JS. */
export function getDocSearchOptions(): DocSearchOption[] {
  return getFilteredDocumentTypes()
    .map(({ id, label, country, flag, size }) => {
      const central = getCentralCountry(id) || (country ? getCentralCountry(country) : undefined);
      const names = [
        ...(central ? Object.values(central.translations) : []),
        ...(EXTRA_NAMES[id] ?? []),
      ];
      const kind = id.endsWith("-visa") ? "visa" : id.endsWith("-passport") ? "passport" : "";
      const terms = [label, country ?? "", central?.country_code ?? "", ...names, ...(DOC_WORDS[kind] ?? [])];
      return {
        id,
        label,
        country,
        flag,
        size,
        names: [...new Set(names)],
        keywords: normalizeSearch([...new Set(terms)].join(" ")),
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}
