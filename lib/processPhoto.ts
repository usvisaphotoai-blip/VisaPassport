import { compressImage } from "@/lib/compressImage";
import { countryMapping } from "@/lib/external-api";

/**
 * Sends a photo to /api/external-process for the given document id
 * (e.g. "uk-passport", "india-visa") and returns the created photo id.
 * Shared by the photo maker and the checkers' "Make It Compliant Now" CTA.
 */
export async function processPhotoForDocument(file: File, docId: string, source = "pixpassport_tool"): Promise<string> {
  const countrySlug = docId.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
  let countryCode = countryMapping[countrySlug] || "US";

  // Handle special cases for country mapping
  if (docId.includes("ds-160")) countryCode = "US";
  if (docId.includes("schengen")) countryCode = "EU";
  if (docId.startsWith("france-")) countryCode = "FR";
  if (docId.startsWith("germany-")) countryCode = "DE";
  if (docId.startsWith("uk-")) countryCode = "GB";
  if (docId.startsWith("canada-")) countryCode = "CA";
  if (docId === "foto-3x4") countryCode = "BR-3*4";

  const documentType = docId.includes("visa") ? "visa" : "passport";
  const compressed = await compressImage(file);

  const formData = new FormData();
  formData.append("image", compressed);
  formData.append("country_code", countryCode);
  formData.append("document_type", documentType);
  formData.append("full_doc_id", docId);
  formData.append("source", source);

  const res = await fetch("/api/external-process", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.details || data.error || "Processing failed");
  return data.photoId;
}
