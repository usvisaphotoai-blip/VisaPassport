const EXTERNAL_API_BASE_URL = process.env.PASSPORT_API_URL;
const EXTERNAL_API_KEY = process.env.NEXT_PUBLIC_PASSPORT_API_KEY;

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
  try {
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/countries`, {
      headers: {
        "accept": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching external countries:", error);
    return [];
  }
}

export const countryMapping: Record<string, string> = {
  "algeria": "DZ",
  "australia": "AU",
  "austria": "AT",
  "belgium": "BE",
  "bulgaria": "BG",
  "china": "CN",
  "croatia": "HR",
  "czechia": "CZ",
  "denmark": "DK",
  "estonia": "EE",
  "finland": "FI",
  "france": "FR",
  "germany": "DE",
  "greece": "GR",
  "hungary": "HU",
  "india": "IN",
  "indonesia": "ID",
  "iran": "IR",
  "iraq": "IQ",
  "italy": "IT",
  "japan": "JP",
  "kazakhstan": "KZ",
  "latvia": "LV",
  "lithuania": "LT",
  "luxembourg": "LU",
  "malta": "MT",
  "netherlands": "NL",
  "new-zealand": "NZ",
  "norway": "NO",
  "poland": "PL",
  "portugal": "PT",
  "romania": "RO",
  "schengen-area": "EU",
  "singapore": "SG",
  "slovakia": "SK",
  "slovenia": "SI",
  "south-korea": "KR",
  "spain": "ES",
  "sweden": "SE",
  "switzerland": "CHE",
  "thailand": "TH",
  "turkey": "TR",
  "united-arab-emirates": "AE",
  "uk": "GB",
  "united-kingdom": "GB",
  "us": "US",
  "usa": "US",
  "general": "US"
};

export async function processExternalPhoto(
  imageFile: Blob | File,
  countryCode: string,
  documentType: string = "passport",
  extraFields: Record<string, string> = {}
): Promise<ExternalProcessResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("country_code", countryCode);
  formData.append("document_type", "passport");
  
  Object.entries(extraFields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (!EXTERNAL_API_BASE_URL) throw new Error("External API URL is not configured");

  const response = await fetch(`${EXTERNAL_API_BASE_URL}/process`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      ...(EXTERNAL_API_KEY && { "X-API-Key": EXTERNAL_API_KEY }),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.error || `Processing failed: ${response.statusText}`);
  }

  return await response.json();
}
