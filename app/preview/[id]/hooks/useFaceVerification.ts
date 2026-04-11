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
  EYE_LEVEL_MIN,
  EYE_LEVEL_MAX,
  HEAD_SIZE_MIN,
  HEAD_SIZE_MAX,
  CENTERING_THRESHOLD,
  TILT_WARN_THRESHOLD,
  TILT_FAIL_THRESHOLD,
  type NormalizedLandmark,
} from "@/lib/mediapipe";

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
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, w, h);
  const ELECTRIC_BLUE = "rgba(37, 99, 235, 1)", // Vivid Blue (visible on white)
    BLUE_LIGHT = "rgba(37, 99, 235, 0.4)"; 
  const SMALL_FONT = "bold 13px system-ui, -apple-system, sans-serif";

  // Eye centers from MediaPipe landmarks
  const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
  const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
  const leftCenter = centerOfPoints(leftEyePoints);
  const rightCenter = centerOfPoints(rightEyePoints);
  const eyeY = (leftCenter.y + rightCenter.y) / 2;

  // Chin and jaw
  const chinPt = toPixel(landmarks[CHIN_TIP], w, h);
  const chinY = chinPt.y;

  // Face height and estimated top of head
  const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], w, h);
  const faceH = chinY - foreheadPt.y;
  const estimatedFullHeadH = faceH * HEAD_TOP_MULTIPLIER;
  const trueTopOfHead = Math.max(0, chinY - estimatedFullHeadH);
  
  const PPI = h / 2;
  const eyeLineInch = ((h - eyeY) / PPI).toFixed(2);
  const faceHeightInch = (estimatedFullHeadH / PPI).toFixed(2);

  const line = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
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

  ctx.strokeStyle = BLUE_LIGHT;
  ctx.lineWidth = 1.5;
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(
    box.x - 4,
    trueTopOfHead,
    box.width + 8,
    chinY - trueTopOfHead,
  );
  ctx.restore();

  ctx.strokeStyle = ELECTRIC_BLUE;
  ctx.lineWidth = 1.5; 
  line(0, eyeY, w, eyeY, [5, 3]);

  const measureX = w - 40;
  ctx.strokeStyle = ELECTRIC_BLUE;
  ctx.lineWidth = 1.5;
  line(measureX, eyeY, measureX, h, [3, 3]);
  tick(measureX, eyeY);
  tick(measureX, h - 1);
  ctx.fillStyle = ELECTRIC_BLUE;
  ctx.font = SMALL_FONT;
  ctx.save();
  ctx.translate(measureX + 16, (eyeY + h) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText(`Eyeline: ${eyeLineInch} inch`, 0, 0);
  ctx.restore();

  const faceX = w - 22;
  ctx.lineWidth = 1.5;
  line(faceX, trueTopOfHead, faceX, chinY, [3, 3]);
  tick(faceX, trueTopOfHead);
  tick(faceX, chinY);
  ctx.save();
  ctx.translate(faceX + 14, (trueTopOfHead + chinY) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText(`Face: ${faceHeightInch} inch`, 0, 0);
  ctx.restore();

  ctx.lineWidth = 1.5;
  ctx.textAlign = "center";
  const bottomY = h - 6;
  line(10, bottomY, w - 10, bottomY, [4, 4]);
  tick(10, bottomY, 4);
  tick(w - 10, bottomY, 4);
  ctx.fillText("2 inch", w / 2, bottomY - 4);
  const leftX = 18;
  line(leftX, 10, leftX, h - 10, [4, 4]);
  tick(leftX, 10, 4);
  tick(leftX, h - 10, 4);
  ctx.save();
  ctx.translate(leftX - 2, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("2 inch", 0, 0);
  ctx.restore();

  // Full Face Mesh Tessellation (Dotted)
  ctx.save();
  ctx.strokeStyle = "rgba(37, 99, 235, 0.4)"; // subtle blue match
  ctx.lineWidth = 0.5;
  ctx.setLineDash([1, 2.5]); // elegant dotted effect
  ctx.beginPath();
  for (const conn of FaceLandmarker.FACE_LANDMARKS_TESSELATION) {
    const p1 = landmarks[conn.start];
    const p2 = landmarks[conn.end];
    if (p1 && p2) {
      ctx.moveTo(p1.x * w, p1.y * h);
      ctx.lineTo(p2.x * w, p2.y * h);
    }
  }
  ctx.stroke();
  ctx.restore();

  // Eye landmark dots
  ctx.save();
  for (const pt of [...leftEyePoints, ...rightEyePoints]) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = ELECTRIC_BLUE;
    ctx.fill();
  }
  ctx.restore();

  // Tilt indicator (if tilted)
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

export function useFaceVerification(previewUrl: string) {
  const [verifying, setVerifying] = useState(true);
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const [overallPass, setOverallPass] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const runVerification = useCallback(async () => {
    try {
      setVerifying(true);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = previewUrl;
      await img.decode();
      const canvas = canvasRef.current,
        overlay = overlayRef.current;
      
      if (!canvas || !overlay) {
          throw new Error("Canvas or React refs not found");
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      canvas.width = overlay.width = img.width;
      canvas.height = overlay.height = img.height;
      ctx.drawImage(img, 0, 0);

      // ── MediaPipe detection ──
      const landmarker = await getMediaPipeLandmarker();
      const result = landmarker?.detect(canvas);
      const detections = result?.faceLandmarks || [];

      const results: ComplianceCheck[] = [];
      let allPass = true;

      const push = (
        name: string,
        status: "PASS" | "WARN" | "FAIL",
        value: string,
        detail: string,
      ) => {
        results.push({ name, status, value, detail });
        if (status === "FAIL") allPass = false;
      };

      const dimPass = img.width === 600 && img.height === 600;
      push(
        "Dimensions",
        dimPass ? "PASS" : "FAIL",
        `${img.width}×${img.height}`,
        dimPass
          ? "Perfect 600×600 pixels"
          : `Expected 600×600, got ${img.width}×${img.height}`,
      );

      if (detections.length !== 1) {
        push(
          "Face Detection",
          "FAIL",
          `${detections.length} faces`,
          detections.length === 0 ? "No face detected" : "Multiple faces found",
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

        push(
          "Eye Level",
          eyePct >= EYE_LEVEL_MIN && eyePct <= EYE_LEVEL_MAX ? "PASS" : "WARN",
          `${eyePct.toFixed(1)}%`,
          eyePct >= EYE_LEVEL_MIN && eyePct <= EYE_LEVEL_MAX
            ? `Within ${EYE_LEVEL_MIN}–${EYE_LEVEL_MAX}% range from bottom`
            : `Target: ${EYE_LEVEL_MIN}–${EYE_LEVEL_MAX}% — ${eyePct < EYE_LEVEL_MIN ? "too low" : "too high"}`,
        );

        // Head size — chin to forehead landmark
        const chinPt = toPixel(landmarks[CHIN_TIP], img.width, img.height);
        const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], img.width, img.height);
        const chinY = chinPt.y;
        
        const faceH = chinY - foreheadPt.y;
        const estimatedFullHeadH = faceH * HEAD_TOP_MULTIPLIER;
        const trueTop = Math.max(0, chinY - estimatedFullHeadH);
        const headPct = (estimatedFullHeadH / h) * 100;

        push(
          "Head Size",
          headPct >= HEAD_SIZE_MIN && headPct <= HEAD_SIZE_MAX ? "PASS" : "WARN",
          `${headPct.toFixed(1)}%`,
          headPct >= HEAD_SIZE_MIN && headPct <= HEAD_SIZE_MAX
            ? `Within ${HEAD_SIZE_MIN}–${HEAD_SIZE_MAX}% range`
            : `Target: ${HEAD_SIZE_MIN}–${HEAD_SIZE_MAX}% — ${headPct < HEAD_SIZE_MIN ? "too small" : "too large"}`,
        );

        // Orientation — left vs right distance ratio
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

        // ── Head tilt check (atan2-based) ──
        const tiltAngle = computeTiltAngle(landmarks, img.width, img.height);
        const absTilt = Math.abs(tiltAngle);
        push(
          "Head Tilt",
          absTilt <= TILT_WARN_THRESHOLD ? "PASS" : absTilt <= TILT_FAIL_THRESHOLD ? "WARN" : "FAIL",
          `${absTilt.toFixed(1)}°`,
          absTilt <= TILT_WARN_THRESHOLD
            ? "Head is level"
            : absTilt <= TILT_FAIL_THRESHOLD
              ? `Slight tilt detected (${absTilt.toFixed(1)}°)`
              : `Head is tilted ${absTilt.toFixed(1)}° — retake recommended`,
        );

        // ── Body / face rotation check ──
        const bodyTilt = detectBodyTilt(landmarks, img.width, img.height);
        push(
          "Body Alignment",
          !bodyTilt.isTilted ? "PASS" : "WARN",
          !bodyTilt.isTilted ? "Straight" : "Tilted",
          bodyTilt.description,
        );

        // Centering
        const offset =
          (Math.abs(box.x + box.width / 2 - img.width / 2) / img.width) * 100;
        push(
          "Centering",
          offset <= CENTERING_THRESHOLD ? "PASS" : "WARN",
          offset <= CENTERING_THRESHOLD ? "Centered" : `${offset.toFixed(1)}% off`,
          offset <= CENTERING_THRESHOLD
            ? "Face is horizontally centered"
            : "Face slightly off-center",
        );

        const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        let sum = 0,
          count = 0;
        for (let i = 0; i < pixels.length; i += 40) {
          sum += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          count++;
        }
        const brightness = sum / count;
        push(
          "Lighting",
          brightness > 80 && brightness < 230 ? "PASS" : "WARN",
          brightness > 80 && brightness < 230
            ? "Good"
            : brightness < 80
              ? "Dark"
              : "Bright",
          brightness > 80 && brightness < 230
            ? "Even, well-lit exposure"
            : brightness < 80
              ? "Image may be too dark"
              : "Image may be overexposed",
        );

        drawOverlay(overlay, box, landmarks, img.width, img.height);
      }
      setChecks(results);
      setOverallPass(allPass && results.every((c) => c.status !== "FAIL"));
    } catch (err) {
      console.error("Preview verification failed:", err);
      setChecks([
        {
          name: "Verification",
          status: "WARN",
          value: "Skipped",
          detail: "Could not verify — visual check recommended",
        },
      ]);
      setOverallPass(true);
    } finally {
      setVerifying(false);
    }
  }, [previewUrl]);

  useEffect(() => {
    runVerification();
  }, [runVerification]);

  return {
    verifying,
    checks,
    overallPass,
    canvasRef,
    overlayRef,
    runVerification
  };
}
