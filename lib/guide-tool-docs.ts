import { toolLabel } from "./document-specs";
import type { GuideToolDoc } from "@/app/components/guide/GuideEmbeddedTool";

/**
 * Tool presets for the regional guide pages. Labels come from lib/document-specs.ts; `docId`,
 * `countryCode` and `documentType` must be values the photo API already supports (GET /countries).
 * All U.S. documents below are 2 × 2 in, which the API's "US" passport preset produces.
 */
export const GUIDE_TOOL_DOCS: Record<string, GuideToolDoc[]> = {
  us: [
    { key: "uscis", docId: "us-passport", label: "USCIS forms: green card, EAD, travel document", ...toolLabel("uscis-photo"), countryCode: "US", documentType: "passport" },
  ],
};

export function guideToolDocs(region: string): GuideToolDoc[] {
  return GUIDE_TOOL_DOCS[region] ?? [];
}
