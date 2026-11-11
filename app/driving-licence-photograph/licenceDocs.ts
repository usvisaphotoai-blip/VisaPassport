/**
 * Driving licence photo options for /driving-licence-photograph.
 * Shared by the embedded tool (client) and /preview/[id] (server) so the preview shows the chosen licence.
 */

export interface LicenceDoc {
  id: string;
  label: string;
  flag: string;
  country: string;
  /** Spec id sent as full_doc_id; drives the crop size. */
  fullDocId: string;
  /** country_code for /api/external-process. */
  countryCode: string;
  size: string;
  hint: string;
  keywords: string;
}

export const licenceDocs: LicenceDoc[] = [
  {
    id: "us-driver-license",
    label: "US Driver's License / REAL ID",
    flag: "🇺🇸",
    country: "United States",
    fullDocId: "us-passport",
    countryCode: "US",
    size: "2 × 2 in",
    hint: "Most DMVs photograph you on-site. Use this for mail-in renewals, forms that ask for a 2×2 photo, or to preview your look.",
    keywords: "usa us america dmv real id state license",
  },
  {
    id: "us-idp",
    label: "US International Driving Permit (AAA)",
    flag: "🇺🇸",
    country: "United States",
    fullDocId: "us-passport",
    countryCode: "US",
    size: "2 × 2 in",
    hint: "AAA asks for 2 identical 2×2 in photos signed on the back. Your 4×6 sheet prints several copies.",
    keywords: "idp iadp aaa international driving permit travel abroad usa",
  },
  {
    id: "uk-driving",
    label: "UK Driving Licence (DVLA)",
    flag: "🇬🇧",
    country: "United Kingdom",
    fullDocId: "uk-driving",
    countryCode: "GB",
    size: "35 × 45 mm",
    hint: "For paper D1 and provisional applications: 35×45 mm on a plain cream or light grey background. Online applications usually reuse your passport photo.",
    keywords: "uk gb britain british england scotland wales dvla provisional d1 northern ireland dva",
  },
  {
    id: "india-driving",
    label: "India Driving Licence (Sarathi)",
    flag: "🇮🇳",
    country: "India",
    fullDocId: "india-passport",
    countryCode: "IN",
    size: "35 × 45 mm",
    hint: "Sarathi uploads have a strict file-size limit that varies by form. If the portal rejects the file, compress the downloaded JPG.",
    keywords: "india sarathi parivahan rto learner licence dl",
  },
  {
    id: "germany-driving",
    label: "Germany Führerschein",
    flag: "🇩🇪",
    country: "Germany",
    fullDocId: "germany-passport",
    countryCode: "DE",
    size: "35 × 45 mm",
    hint: "Biometric 35×45 mm photo. Check whether your Führerscheinstelle wants a printed or digital photo.",
    keywords: "germany deutschland german fuhrerschein führerschein de",
  },
  {
    id: "france-driving",
    label: "France Permis de Conduire",
    flag: "🇫🇷",
    country: "France",
    fullDocId: "france-passport",
    countryCode: "FR",
    size: "35 × 45 mm",
    hint: "Online ANTS applications need an e-photo code from a certified booth or studio. Use this for paper forms and to preview your photo.",
    keywords: "france french permis conduire ants fr",
  },
  {
    id: "italy-driving",
    label: "Italy Patente di Guida",
    flag: "🇮🇹",
    country: "Italy",
    fullDocId: "italy-passport",
    countryCode: "IT",
    size: "35 × 45 mm",
    hint: "Standard 35×45 mm biometric photo on a plain light background.",
    keywords: "italy italia italian patente guida it",
  },
  {
    id: "netherlands-driving",
    label: "Netherlands Rijbewijs",
    flag: "🇳🇱",
    country: "Netherlands",
    fullDocId: "netherlands-passport",
    countryCode: "NL",
    size: "35 × 45 mm",
    hint: "Uses the same photo rules as a Dutch passport (35×45 mm).",
    keywords: "netherlands holland dutch rijbewijs nl",
  },
  {
    id: "other-driving",
    label: "Other country (35 × 45 mm standard)",
    flag: "🌍",
    country: "International",
    fullDocId: "icao-passport",
    countryCode: "EU",
    size: "35 × 45 mm",
    hint: "Most countries use the ICAO 35×45 mm biometric format. Check your licensing authority's size before printing.",
    keywords: "other international icao europe eu ireland spain canada australia",
  },
];

export const DEFAULT_LICENCE_DOC = licenceDocs[0];

export function getLicenceDoc(id: string | undefined): LicenceDoc | undefined {
  return licenceDocs.find((d) => d.id === id);
}
