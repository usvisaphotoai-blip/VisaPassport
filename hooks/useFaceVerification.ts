import { useState, useCallback } from "react";
import { getMediaPipeLandmarker, NormalizedLandmark } from "@/lib/mediapipe";
import { validateBiometrics, ValidationReport } from "@/lib/validation-engine";

const API_BASE_URL = process.env.NEXT_PUBLIC_PASSPORT_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PASSPORT_API_KEY;

export function useFaceVerification() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyPhoto = useCallback(async (
    file: File, 
    countryCode: string, 
    docType: string
  ) => {
    setIsProcessing(true);
    setError(null);
    setReport(null);

    try {
      if (!API_BASE_URL) throw new Error("API URL is not configured in .env");

      // 1. Fetch specifications from the external API
      const specRes = await fetch(`${API_BASE_URL}/countries/${countryCode}?document_type=${docType}`, {
        headers: { 
          "accept": "application/json",
          ...(API_KEY && { "X-API-Key": API_KEY })
        }
      });
      if (!specRes.ok) throw new Error("Failed to fetch country specifications");
      const spec = await specRes.json();

      // 2. Initialize MediaPipe
      const landmarker = await getMediaPipeLandmarker();

      // 3. Prepare the image for MediaPipe
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });

      // 4. Run MediaPipe analysis
      const result = landmarker.detect(img);
      URL.revokeObjectURL(objectUrl);

      // 5. Execute validation engine
      const landmarks = result.faceLandmarks[0] || [];
      const validationReport = validateBiometrics(
        landmarks,
        file,
        img.width,
        img.height,
        spec
      );

      setReport(validationReport);
    } catch (err: any) {
      console.error("Verification Error:", err);
      setError(err.message || "An error occurred during verification");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    verifyPhoto,
    isProcessing,
    report,
    setReport,
    error,
    setError
  };
}
