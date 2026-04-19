import { useState, useCallback, useRef, useEffect } from "react";
import {
  FaceLandmarker,
  getMediaPipeLandmarker,
  computeFaceBox,
  computeTiltAngle,
  detectBodyTilt,
  getPoints,
  centerOfPoints,
  toPixel,
  LEFT_EYE_INDICES,
  RIGHT_EYE_INDICES,
  JAW_OUTLINE_INDICES,
  CHIN_TIP,
  FOREHEAD_TOP,
  HEAD_TOP_MULTIPLIER,
  TILT_WARN_THRESHOLD,
  TILT_FAIL_THRESHOLD,
  type NormalizedLandmark,
} from "@/lib/mediapipe";
import { getSpecById, type CountrySpec } from "@/lib/specs";

export interface ComplianceCheck {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  value: string;
  detail: string;
}

/* ── Overlay drawing ── */
export function drawOverlay(
  canvas: HTMLCanvasElement,
  box: { x: number; y: number; width: number; height: number },
  landmarks: NormalizedLandmark[],
  w: number,
  h: number,
  spec?: CountrySpec | undefined,
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, w, h);
  const ELECTRIC_BLUE = "rgba(16, 185, 129, 0.9)";
  const BLUE_LIGHT = "rgba(16, 185, 129, 0.4)";
  const SMALL_FONT = "bold 13px system-ui, -apple-system, sans-serif";

  // Eye centers from MediaPipe landmarks
  const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
  const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
  const leftCenter = centerOfPoints(leftEyePoints);
  const rightCenter = centerOfPoints(rightEyePoints);
  const eyeY = (leftCenter.y + rightCenter.y) / 2;

  // Chin and forehead
  const chinPt = toPixel(landmarks[CHIN_TIP], w, h);
  const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], w, h);
  const chinY = chinPt.y;

  // Face height and estimated top of head
  const faceH = chinY - foreheadPt.y;
  const multiplier = Number(spec?.head_top_multiplier) || HEAD_TOP_MULTIPLIER;
  const estimatedFullHeadH = faceH * multiplier;
  const trueTopOfHead = Math.max(0, chinY - estimatedFullHeadH);

  // BUG FIX #1 — `width_mm` / `height_mm` can be "unspecified" strings.
  // `Number("unspecified")` → NaN, so `|| fallback` correctly kicks in.
  // The old code used `spec?.height_mm || 51` which would pass the string
  // "unspecified" through (truthy), causing `fillText("unspecified mm")`.
  const targetH_mm = Number(spec?.height_mm) || 51;
  const targetW_mm = Number(spec?.width_mm) || 51;

  // BUG FIX #3 — use separate PPM per axis so non-square specs render
  // the width ruler correctly (e.g. 35×45 mm documents).
  const PPM_H = h / targetH_mm;
  const PPM_W = w / targetW_mm;

  const eyeLineMM = ((h - eyeY) / PPM_H).toFixed(1);
  const faceHeightMM = (estimatedFullHeadH / PPM_H).toFixed(1);

  const line = (
    x1: number, y1: number,
    x2: number, y2: number,
    dash: number[] = [],
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const tick = (x: number, y: number, size = 6) => {
    line(x - size, y, x + size, y);
  };

  // Face bounding box
  ctx.strokeStyle = BLUE_LIGHT;
  ctx.lineWidth = 0.75;
  ctx.save();
  ctx.setLineDash([3, 4]);
  ctx.strokeRect(box.x - 4, trueTopOfHead, box.width + 8, chinY - trueTopOfHead);
  ctx.restore();

  // Eye-level guide line
  ctx.strokeStyle = ELECTRIC_BLUE;
  ctx.lineWidth = 0.75;
  line(0, eyeY, w, eyeY, [4, 4]);

  // Eyeline measurement ruler (right side)
  const measureX = w - 40;
  ctx.strokeStyle = ELECTRIC_BLUE;
  ctx.lineWidth = 0.75;
  line(measureX, eyeY, measureX, h, [3, 3]);
  tick(measureX, eyeY);
  tick(measureX, h - 1);
  ctx.fillStyle = ELECTRIC_BLUE;
  ctx.font = SMALL_FONT;
  ctx.save();
  ctx.translate(measureX + 16, (eyeY + h) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText(`Eyeline: ${eyeLineMM}mm`, 0, 0);
  ctx.restore();

  // Face-height measurement ruler (right side, inner)
  const faceX = w - 22;
  ctx.lineWidth = 0.75;
  line(faceX, trueTopOfHead, faceX, chinY, [3, 3]);
  tick(faceX, trueTopOfHead);
  tick(faceX, chinY);
  ctx.save();
  ctx.translate(faceX + 14, (trueTopOfHead + chinY) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText(`Face: ${faceHeightMM}mm`, 0, 0);
  ctx.restore();

  // Bottom width ruler
  ctx.lineWidth = 0.75;
  ctx.textAlign = "center";
  const bottomY = h - 6;
  line(10, bottomY, w - 10, bottomY, [4, 4]);
  tick(10, bottomY, 4);
  tick(w - 10, bottomY, 4);
  ctx.fillText(`${targetW_mm}mm`, w / 2, bottomY - 4);

  // Left height ruler
  const leftX = 18;
  line(leftX, 10, leftX, h - 10, [4, 4]);
  tick(leftX, 10, 4);
  tick(leftX, h - 10, 4);
  ctx.save();
  ctx.translate(leftX - 2, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${targetH_mm}mm`, 0, 0);
  ctx.restore();

  // ── Target Ranges ──
  const drawTargetZone = (
    minPct: number,
    maxPct: number,
    color: string,
    label: string,
  ) => {
    ctx.fillStyle = color;
    const yMin = h * (1 - maxPct / 100);
    const yMax = h * (1 - minPct / 100);
    ctx.fillRect(0, yMin, w, yMax - yMin);
    ctx.fillStyle = color.replace("0.05", "0.6");
    ctx.font = "bold 9px system-ui";
    ctx.fillText(label, 80, yMin + 12);
  };

  const minEye = Number(spec?.eye_min_pct) || 56;
  const maxEye = Number(spec?.eye_max_pct) || 69;
  drawTargetZone(minEye, maxEye, "rgba(16, 185, 129, 0.05)", "EYE TARGET");

  const minHead = Number(spec?.head_min_pct) || 50;
  const maxHead = Number(spec?.head_max_pct) || 69;
  // BUG FIX #7 — removed unused `headRangeY_min` variable (was `h * 0.1` but never referenced)
  const headRangeH_min = h * (minHead / 100);
  const headRangeH_max = h * (maxHead / 100);

  ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
  ctx.lineWidth = 3;
  line(w - 5, h - headRangeH_max, w - 5, h - headRangeH_min);
  ctx.fillStyle = "rgba(245, 158, 11, 0.8)";
  ctx.fillText("HEAD", w - 15, h - headRangeH_max - 5);

  // Head dots (Eyes)
  ctx.save();
  for (const pt of [...leftEyePoints, ...rightEyePoints]) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = ELECTRIC_BLUE;
    ctx.fill();
  }
  ctx.restore();

  // Tilt indicator
  const tiltAngle = computeTiltAngle(landmarks, w, h);
  if (Math.abs(tiltAngle) > 2) {
    ctx.save();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(leftCenter.x, leftCenter.y);
    ctx.lineTo(rightCenter.x, rightCenter.y);
    ctx.stroke();
    ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
    ctx.font = "bold 9px system-ui";
    ctx.fillText(
      `TILT: ${Math.abs(tiltAngle).toFixed(1)}°`,
      rightCenter.x + 6,
      rightCenter.y - 4,
    );
    ctx.restore();
  }
}

/* ── Hook ── */
export function useFaceVerification(previewUrl: string, documentType: string) {
  const [verifying, setVerifying] = useState(true);
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const [overallPass, setOverallPass] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const isMountedRef = useRef(true);

  // BUG FIX #6 — isMounted lifecycle
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runVerification = useCallback(async () => {
    try {
      if (!isMountedRef.current) return;
      setVerifying(true);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = previewUrl;
      await img.decode();

      // BUG FIX #5 — check refs *and* mount status right after the first
      // async yield (img.decode). If the component unmounted during decode
      // the refs will be null; throwing here would land in the catch block
      // and silently set overallPass=true. We return cleanly instead.
      if (!isMountedRef.current) return;

      const canvas = canvasRef.current;
      const overlay = overlayRef.current;

      if (!canvas || !overlay) {
        // Refs are null — component likely unmounted; bail silently.
        return;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      canvas.width = overlay.width = img.width;
      canvas.height = overlay.height = img.height;
      ctx.drawImage(img, 0, 0);

      // BUG FIX #8 — detect a null landmarker explicitly and surface a
      // meaningful error rather than silently reporting "No face detected".
      const landmarker = await getMediaPipeLandmarker();
      if (!isMountedRef.current) return;

      if (!landmarker) {
        throw new Error("MediaPipe FaceLandmarker failed to initialise");
      }

      const result = landmarker.detect(canvas);
      if (!isMountedRef.current) return;

      const detections = result?.faceLandmarks ?? [];

      const results: ComplianceCheck[] = [];

      // BUG FIX #4 — track WARN separately so the overall result is
      // accurate: a photo with only warnings is NOT a clean pass.
      let hasFail = false;
      let hasWarn = false;

      const push = (
        name: string,
        status: "PASS" | "WARN" | "FAIL",
        value: string,
        detail: string,
      ) => {
        results.push({ name, status, value, detail });
        if (status === "FAIL") hasFail = true;
        if (status === "WARN") hasWarn = true;
      };

      const spec = getSpecById(documentType);
      const targetW = Number(spec?.width_px) || 600;
      const targetH = Number(spec?.height_px) || 600;

      const dimPass = img.width === targetW && img.height === targetH;
      push(
        "Dimensions",
        dimPass ? "PASS" : "FAIL",
        `${img.width}×${img.height}`,
        dimPass
          ? `Perfect ${targetW}×${targetH} pixels`
          : `Expected ${targetW}×${targetH}, got ${img.width}×${img.height}`,
      );

      if (detections.length !== 1) {
        push(
          "Face Detection",
          "FAIL",
          `${detections.length} faces`,
          detections.length === 0
            ? "No face detected"
            : "Multiple faces found",
        );
      } else {
        push("Face Detection", "PASS", "1 face", "Single face verified");

        const landmarks = detections[0];
        const box = computeFaceBox(landmarks, img.width, img.height);
        const h = img.height;

        // Eye centers
        const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, img.width, img.height);
        const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, img.width, img.height);
        const leftCenter = centerOfPoints(leftEyePoints);
        const rightCenter = centerOfPoints(rightEyePoints);
        const eyeY = (leftCenter.y + rightCenter.y) / 2;
        const eyePct = ((h - eyeY) / h) * 100;

        const minEye = Number(spec?.eye_min_pct) || 56;
        const maxEye = Number(spec?.eye_max_pct) || 69;
        // TOLERANCE: Add 0.2% padding to account for rounding and AI landmark variations
        const eyePass = eyePct >= (minEye - 0.2) && eyePct <= (maxEye + 0.2);
        push(
          "Eye Level",
          eyePass ? "PASS" : "WARN",
          `${eyePct.toFixed(1)}%`,
          eyePass
            ? `Within ${minEye}–${maxEye}% range from bottom`
            : `Target: ${minEye}–${maxEye}% — ${eyePct < minEye ? "eyes too low" : "eyes too high"}`,
        );

        // Head size
        const chinPt = toPixel(landmarks[CHIN_TIP], img.width, img.height);
        const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], img.width, img.height);
        const chinY = chinPt.y;
        const faceH = chinY - foreheadPt.y;
        const multiplier = Number(spec?.head_top_multiplier) || HEAD_TOP_MULTIPLIER;
        const estimatedFullHeadH = faceH * multiplier;
        const headPct = (estimatedFullHeadH / h) * 100;

        const minHead = Number(spec?.head_min_pct) || 50;
        const maxHead = Number(spec?.head_max_pct) || 69;
        // TOLERANCE: Add 0.2% padding to account for rounding and AI landmark variations
        const headPass = headPct >= (minHead - 0.2) && headPct <= (maxHead + 0.2);
        push(
          "Head Size",
          headPass ? "PASS" : "WARN",
          `${headPct.toFixed(1)}%`,
          headPass
            ? `Within ${minHead}–${maxHead}% range`
            : `Target: ${minHead}–${maxHead}% — ${headPct < minHead ? "too small" : "too large"}`,
        );

        // Orientation
        const lDist = leftCenter.x - box.x;
        const rDist = box.x + box.width - rightCenter.x;
        const ratio =
          Math.min(lDist, rDist) > 0
            ? Math.max(lDist, rDist) / Math.min(lDist, rDist)
            : 999;
        push(
          "Orientation",
          ratio <= 2.0 ? "PASS" : "WARN",
          ratio <= 2.0 ? "Frontal" : "Tilted",
          ratio <= 2.0
            ? "Face is directly facing camera"
            : "Face may not be directly centered",
        );

        // Head tilt
        const tiltAngle = computeTiltAngle(landmarks, img.width, img.height);
        const absTilt = Math.abs(tiltAngle);
        push(
          "Head Tilt",
          absTilt <= TILT_WARN_THRESHOLD
            ? "PASS"
            : absTilt <= TILT_FAIL_THRESHOLD
              ? "WARN"
              : "FAIL",
          `${absTilt.toFixed(1)}°`,
          absTilt <= TILT_WARN_THRESHOLD
            ? "Head is level"
            : absTilt <= TILT_FAIL_THRESHOLD
              ? `Slight tilt detected (${absTilt.toFixed(1)}°)`
              : `Head is tilted ${absTilt.toFixed(1)}° — retake recommended`,
        );

        // Body alignment
        const bodyTilt = detectBodyTilt(landmarks, img.width, img.height);
        push(
          "Body Alignment",
          !bodyTilt.isTilted ? "PASS" : "WARN",
          !bodyTilt.isTilted ? "Straight" : "Tilted",
          bodyTilt.description,
        );

        // Centering
        const centeringThreshold = 8;
        const offset =
          (Math.abs(box.x + box.width / 2 - img.width / 2) / img.width) * 100;
        push(
          "Centering",
          offset <= centeringThreshold ? "PASS" : "WARN",
          offset <= centeringThreshold ? "Centered" : `${offset.toFixed(1)}% off`,
          offset <= centeringThreshold
            ? "Face is horizontally centered"
            : "Face slightly off-center",
        );

        // Lighting
        const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        let sum = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 40) {
          sum += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          count++;
        }
        const brightness = sum / count;
        const lightOk = brightness > 80 && brightness < 230;
        push(
          "Lighting",
          lightOk ? "PASS" : "WARN",
          lightOk ? "Good" : brightness < 80 ? "Dark" : "Bright",
          lightOk
            ? "Even, well-lit exposure"
            : brightness < 80
              ? "Image may be too dark"
              : "Image may be overexposed",
        );

        drawOverlay(overlay, box, landmarks, img.width, img.height, spec);
      }

      if (!isMountedRef.current) return;

      setChecks(results);
      // BUG FIX #4 — overall pass requires zero FAILs AND zero WARNs.
      // Previously WARNs were ignored, letting substandard photos "pass".
      setOverallPass(!hasFail && !hasWarn);

    } catch (err) {
      console.error("Preview verification failed:", err);

      if (!isMountedRef.current) return; // BUG FIX #6 — guard in catch path too

      setChecks([
        {
          name: "Verification",
          status: "WARN",
          value: "Skipped",
          detail: "Could not verify — visual check recommended",
        },
      ]);
      // BUG FIX #5 — do NOT silently set overallPass=true when refs are
      // null due to unmount; the early return above handles that case.
      // Here we only reach this point for genuine errors, so keep false.
      setOverallPass(false);
    } finally {
      if (isMountedRef.current) {
        setVerifying(false);
      }
    }
  }, [previewUrl, documentType]);

  useEffect(() => {
    runVerification();
  }, [runVerification]);

  return {
    verifying,
    checks,
    overallPass,
    canvasRef,
    overlayRef,
    runVerification,
  };
}