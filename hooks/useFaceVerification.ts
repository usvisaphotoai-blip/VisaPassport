import { useState, useCallback } from "react";
import { getMediaPipeLandmarker, NormalizedLandmark } from "@/lib/mediapipe";
import { validateBiometrics, ValidationReport } from "@/lib/validation-engine";

export function useFaceVerification() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyPhoto = useCallback(
    async (file: File, countryCode: string, docType: string) => {
      setIsProcessing(true);
      setError(null);
      setReport(null);

      // Keep a reference so we can always revoke even if an error is thrown
      // mid-pipeline.
      let objectUrl: string | null = null;

      try {
        // ── Step 1: Fetch country specifications via secure internal proxy ──

        const specRes = await fetch(
          `/api/proxy/countries/${countryCode}?document_type=${docType}`,
          { headers: { accept: "application/json" } }
        );

        if (!specRes.ok) {
          // Try to surface a human-readable error from the response body.
          const errorData = await specRes.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              errorData.details ||
              `Failed to fetch country specifications (HTTP ${specRes.status})`
          );
        }

        // FIX (Bug #5): Guard against the API returning null / non-object JSON.
        const spec: unknown = await specRes.json();
        if (!spec || typeof spec !== "object" || Array.isArray(spec)) {
          throw new Error(
            "Invalid specification received from the API — expected a JSON object"
          );
        }

        // ── Step 2: Initialise MediaPipe ──────────────────────────────────

        const landmarker = await getMediaPipeLandmarker();

        // ── Step 3: Load the image ────────────────────────────────────────

        objectUrl = URL.createObjectURL(file);
        const img = new Image();

        // Wait for the browser to fully load the element.
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error("Failed to load the image file"));
          img.src = objectUrl!;
        });

        // FIX (Bug #1): THE PRIMARY CAUSE OF FLAKINESS.
        //
        // `img.onload` fires when the browser has received enough data to
        // render the image, but the pixel data may not be fully decoded yet.
        // MediaPipe's `detect()` reads raw pixel values directly from the
        // HTMLImageElement — if decoding is still in progress it gets
        // incomplete data, so landmarks come back empty or wrong.
        //
        // `img.decode()` returns a Promise that resolves only once the image
        // is *fully decoded into pixel memory*, guaranteeing that any
        // subsequent canvas draw or library call sees complete pixel data.
        await img.decode();

        // ── Step 4: Run MediaPipe face-landmark detection ─────────────────

        const result = landmarker.detect(img);

        // FIX (Bug #2): Revoke the object URL only after detect() returns.
        // detect() is synchronous in @mediapipe/tasks-vision, but placing the
        // revoke here (rather than before detect) ensures we never free the
        // underlying Blob while a synchronous or future-async call is still
        // reading it.
        URL.revokeObjectURL(objectUrl);
        objectUrl = null; // Mark as revoked so the finally-block skips it.

        // FIX (Bug #3): Explicit guard on the detection result.
        //
        // Previously the code did `result.faceLandmarks[0] || []` which
        // silently passed an empty array into validateBiometrics. That caused
        // the validator to reach landmark index accesses like `landmarks[159]`
        // and throw a runtime TypeError — or, worse, produce a nonsensical
        // report with all-zero values.
        //
        // Now we throw a clear, user-facing error immediately so the catch
        // block can surface it properly.
        if (
          !result.faceLandmarks ||
          result.faceLandmarks.length === 0 ||
          !result.faceLandmarks[0] ||
          result.faceLandmarks[0].length === 0
        ) {
          throw new Error(
            "No face detected in the image. Please use a clear, front-facing photo."
          );
        }

        // ── Step 5: Run the validation engine ────────────────────────────

        const landmarks = result.faceLandmarks[0];
        const validationReport = validateBiometrics(
          landmarks,
          file,
          img.naturalWidth,
          img.naturalHeight,
          spec as Record<string, any>
        );

        setReport(validationReport);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during verification";

        console.error("Verification Error:", err);
        setError(message);
      } finally {
        // Guarantee the object URL is always released, even if we threw
        // before the explicit revoke above.
        if (objectUrl !== null) {
          URL.revokeObjectURL(objectUrl);
        }

        setIsProcessing(false);
      }
    },
    []
  );

  return {
    verifyPhoto,
    isProcessing,
    report,
    setReport,
    error,
    setError,
  };
}