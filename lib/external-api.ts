const EXTERNAL_API_BASE_URL = process.env.PASSPORT_API_URL || "https://api.pixpassport.com";
const EXTERNAL_API_KEY = process.env.PASSPORT_API_KEY || "";

const EXTERNAL_US_API_BASE_URL = process.env.PASSPORT_US_API_URL || "https://api.photoresizer.us";
const EXTERNAL_US_API_KEY = process.env.PASSPORT_API_KEY || "";

export function getApiConfigForCountry(countryCode: string) {
  const normalized = countryCode?.toUpperCase();
  if (normalized === "US" || normalized === "USA") {
    return {
      baseUrl: EXTERNAL_US_API_BASE_URL,
      apiKey: EXTERNAL_US_API_KEY,
    };
  }
  return {
    baseUrl: EXTERNAL_API_BASE_URL,
    apiKey: EXTERNAL_API_KEY,
  };
}

export interface ExternalCountry {
  country_code: string;
  country_name: string;
  document_type: string;
  dimensions: string;
}

export interface ExternalProcessResponse {
  status: string;
  result_id: string;
  image_url: string;
  print_sheet_url: string;
  preview_url: string;
  dimensions: string;
  format: string;
  size_kb: number;
  metrics: {
    head_height_pct: number;
    eye_position_pct: number;
    top_margin_pct: number;
    background_valid: boolean;
    background_corrected: boolean;
  };
}

export async function fetchExternalCountries(): Promise<ExternalCountry[]> {
  if (!EXTERNAL_API_BASE_URL) {
    console.error("fetchExternalCountries: PASSPORT_API_URL is not configured");
    return [];
  }

  try {
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/countries`, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch countries: ${response.status} ${response.statusText}`
      );
    }

    const data: unknown = await response.json();

    // Guard: the API must return an array
    if (!Array.isArray(data)) {
      console.error(
        "fetchExternalCountries: unexpected response shape (expected array)",
        data
      );
      return [];
    }

    return data as ExternalCountry[];
  } catch (error) {
    console.error("Error fetching external countries:", error);
    return [];
  }
}

export const countryMapping: Record<string, string> = {
  algeria: "DZ",
  dz: "DZ",
  argentina: "AR",
  ar: "AR",
  australia: "AU",
  au: "AU",
  austria: "AT",
  at: "AT",
  bahrain: "BH",
  bh: "BH",
  belgium: "BE",
  be: "BE",
  bhutan: "BT",
  bt: "BT",
  "foto-3x4": "BR-3*4",
  "foto": "BR-3*4",
  "br-3*4": "BR-3*4",
  "br-3x4": "BR-3*4",
  "3x4": "BR-3*4",
  brazil: "BR",
  br: "BR",
  bulgaria: "BG",
  bg: "BG",
  canada: "CA",
  ca: "CA",
  china: "CN",
  cn: "CN",
  colombia: "CO",
  co: "CO",
  croatia: "HR",
  hr: "HR",
  czechia: "CZ",
  cz: "CZ",
  denmark: "DK",
  dk: "DK",
  estonia: "EE",
  ee: "EE",
  finland: "FI",
  fi: "FI",
  france: "FR",
  fr: "FR",
  germany: "DE",
  de: "DE",
  greece: "GR",
  gr: "GR",
  "hong-kong": "HK",
  hongkong: "HK",
  hk: "HK",
  hungary: "HU",
  hu: "HU",
  iceland: "IS",
  is: "IS",
  india: "IN",
  in: "IN",
  indonesia: "ID",
  id: "ID",
  iran: "IR",
  ir: "IR",
  ireland: "IE",
  ie: "IE",
  iraq: "IQ",
  iq: "IQ",
  italy: "IT",
  it: "IT",
  japan: "JP",
  jp: "JP",
  kazakhstan: "KZ",
  kz: "KZ",
  latvia: "LV",
  lv: "LV",
  lithuania: "LT",
  lt: "LT",
  luxembourg: "LU",
  lu: "LU",
  malawi: "MW",
  mw: "MW",
  malaysia: "MY",
  my: "MY",
  malta: "MT",
  mt: "MT",
  mexico: "MX",
  mx: "MX",
  nepal: "NP",
  np: "NP",
  netherlands: "NL",
  nl: "NL",
  "new-zealand": "NZ",
  nz: "NZ",
  nigeria: "NI",
  nigerian: "NI",
  ni: "NI",
  ng: "NI",
  nga: "NI",
  norway: "NO",
  no: "NO",
  peru: "PER",
  per: "PER",
  pe: "PER",
  philippines: "PH",
  ph: "PH",
  poland: "PL",
  pl: "PL",
  portugal: "PT",
  pt: "PT",
  romania: "RO",
  ro: "RO",
  russia: "RU",
  ru: "RU",
  "saudi-arabia": "SA",
  saudi: "SA",
  sa: "SA",
  "schengen-area": "EU",
  "schengen-visa": "EU",
  schengen: "EU",
  icao: "EU",
  "icao-passport": "EU",
  "icao-standard": "EU",
  eu: "EU",
  uae: "AE",
  singapore: "SG",
  sg: "SG",
  slovakia: "SK",
  sk: "SK",
  slovenia: "SI",
  si: "SI",
  "south-africa": "ZA",
  southafrica: "ZA",
  za: "ZA",
  "south-korea": "KR",
  southkorea: "KR",
  kr: "KR",
  spain: "ES",
  es: "ES",
  "sri-lanka": "LK",
  srilanka: "LK",
  lk: "LK",
  sweden: "SE",
  se: "SE",
  switzerland: "CHE",
  swiss: "CHE",
  ch: "CHE",
  che: "CHE",
  tajikistan: "TJ",
  tj: "TJ",
  thailand: "TH",
  th: "TH",
  turkey: "TR",
  tr: "TR",
  "united-arab-emirates": "AE",
  ae: "AE",
  uk: "GB",
  "united-kingdom": "GB",
  gb: "GB",
  us: "US",
  usa: "US",
  "united-states": "US",
  general: "US",
};

export async function processExternalPhoto(
  imageFile: Blob | File,
  countryCode: string,
  documentType: string = "passport",
  extraFields: Record<string, string> = {}
): Promise<ExternalProcessResponse> {
  const { baseUrl, apiKey } = getApiConfigForCountry(countryCode);

  if (!baseUrl) {
    throw new Error(
      "External API URL is not configured. Set the PASSPORT_API_URL environment variable."
    );
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("country_code", countryCode);
  // NOTE: documentType param is accepted but the API always uses "passport".
  // Kept for forward-compatibility; change the hardcoded value if the API
  // starts honouring the document_type field.
  formData.append("document_type", "passport");

  for (const [key, value] of Object.entries(extraFields)) {
    formData.append(key, value);
  }

  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(`${baseUrl}/process`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    // Try to surface a structured error from the response body.
    const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const message =
      (typeof errorData.message === "string" && errorData.message) ||
      (typeof errorData.detail === "string" && errorData.detail) ||
      (typeof errorData.error === "string" && errorData.error) ||
      `Processing failed: ${response.status} ${response.statusText}`;

    // Fallback to "US" standard config if external API lacks config for the requested country
    if (countryCode !== "US" && message.includes("No config found for country")) {
      console.warn(`[external-api] ${message} — falling back to country_code "EU"`);
      formData.set("country_code", "EU");
      const fallbackRes = await fetch(`${baseUrl}/process`, {
        method: "POST",
        headers,
        body: formData,
      });
      if (fallbackRes.ok) {
        const fallbackData = (await fallbackRes.json()) as unknown;
        if (fallbackData && typeof fallbackData === "object" && !Array.isArray(fallbackData)) {
          return fallbackData as ExternalProcessResponse;
        }
      }
    }

    throw new Error(message);
  }

  const data: unknown = await response.json();

  // Basic shape guard to catch silent API contract breaks early.
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      "Unexpected response from the photo-processing API — expected a JSON object"
    );
  }

  return data as ExternalProcessResponse;
}