"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  NOSE_INDICES,
  MOUTH_INDICES,
  CHIN_TIP,
  FOREHEAD_TOP,
  HEAD_TOP_MULTIPLIER,
  type NormalizedLandmark,
} from "@/lib/mediapipe";

/* ----------------------------------------------------------------------- */

export interface ClientDetectionResult {
  faceBox: { x: number; y: number; width: number; height: number } | null;
  eyeCenter: { x: number; y: number } | null;
  chinY: number | null;
  topOfHeadY: number | null;
  imageDimensions: { width: number; height: number };
  faceCount: number;
  eyeLevelPct: number | null;
  headSizePct: number | null;
  orientationRatio: number | null;
  brightness: number;
}

interface Feedback {
  type: "success" | "warning" | "error";
  message: string;
}

interface Props {
  file: File;
  documentType: string;
  targetBackground: string;
  onDetectionComplete: (
    file: File,
    detection: ClientDetectionResult,
    feedbacks: Feedback[],
  ) => void;
  onCancel: () => void;
}

const STEP_LABELS = [
  "Loading image...",
  "Loading face AI...",
  "Detecting face...",
  "Analyzing results...",
  "Done!",
];

export default function ClientFaceDetector({
  file,
  targetBackground,
  onDetectionComplete,
  onCancel,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showCancel, setShowCancel] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Show cancel button only after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowCancel(true), 2000);
    return () => clearTimeout(t);
  }, []);

  /* ======================= FAST BRIGHTNESS SAMPLER ====================== */

  function fastBrightness(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const data = ctx.getImageData(0, 0, w, h).data;
    let sum = 0;
    let count = 0;
    // sample every 10th pixel
    for (let i = 0; i < data.length; i += 40) {
      sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      count++;
    }
    return sum / count;
  }

  /* ========================== MAIN PIPELINE ============================= */

  const runDetection = useCallback(async () => {
    try {
      setLoading(true);
      setStepIndex(0);
      setProgress(5);

      /* ---------- load image ---------- */

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      await img.decode();
      URL.revokeObjectURL(objectUrl);

      /* ---------- draw scaled preview ---------- */

      const canvas = canvasRef.current!;
      const overlay = overlayCanvasRef.current!;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      const max = 560;
      let scale = Math.min(max / img.width, max / img.height, 1);

      let drawW = Math.round(img.width * scale);
      let drawH = Math.round(img.height * scale);

      canvas.width = overlay.width = drawW;
      canvas.height = overlay.height = drawH;

      ctx.drawImage(img, 0, 0, drawW, drawH);

      setProgress(20);
      setStepIndex(1);

      /* ---------- brightness FAST ---------- */

      const avgBrightness = fastBrightness(ctx, drawW, drawH);

      /* ---------- LOAD MEDIAPIPE (CACHED) ---------- */

      const landmarker = await getMediaPipeLandmarker();

      setProgress(45);
      setStepIndex(2);

      /* ---------- DETECT FACE ---------- */

      let result = landmarker.detect(canvas);
      let detections = result.faceLandmarks;

      setProgress(75);
      setStepIndex(3);

      /* ---------- ANALYSIS ---------- */

      const localFeedbacks: Feedback[] = [];

      if (avgBrightness < 80)
        localFeedbacks.push({
          type: "warning",
          message: "Image appears too dark",
        });
      else if (avgBrightness > 230)
        localFeedbacks.push({
          type: "warning",
          message: "Image appears overexposed",
        });
      else
        localFeedbacks.push({
          type: "success",
          message: "Good lighting detected",
        });

      let faceBox = null,
        eyeCenter = null,
        chinY = null,
        topOfHeadY = null;
      let eyeLevelPct = null,
        headSizePct = null,
        orientationRatio = null;

      if (detections.length === 0) {
        localFeedbacks.push({
          type: "error",
          message: "No face detected — try a clearer photo",
        });
      } else if (detections.length > 1) {
        localFeedbacks.push({
          type: "error",
          message: `${detections.length} faces detected — only 1 allowed`,
        });
      }

      if (detections.length === 1) {
        const landmarks = detections[0];
        const box = computeFaceBox(landmarks, drawW, drawH);

        faceBox = {
          x: box.x / scale,
          y: box.y / scale,
          width: box.width / scale,
          height: box.height / scale,
        };

        // Eye centers — average of contour points
        const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, drawW, drawH);
        const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, drawW, drawH);
        const leftCenter = centerOfPoints(leftEyePoints);
        const rightCenter = centerOfPoints(rightEyePoints);

        const eyeY = (leftCenter.y + rightCenter.y) / 2;
        const eyeX = (leftCenter.x + rightCenter.x) / 2;

        eyeCenter = { x: eyeX / scale, y: eyeY / scale };

        // Chin and top of head from specific landmarks
        const chinPt = toPixel(landmarks[CHIN_TIP], drawW, drawH);
        const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], drawW, drawH);

        chinY = chinPt.y / scale;
        topOfHeadY = foreheadPt.y / scale;

        const faceH = chinY - topOfHeadY;
        const estimatedFullHeadH = faceH * HEAD_TOP_MULTIPLIER;
        
        eyeLevelPct = ((img.height - eyeY / scale) / img.height) * 100;
        headSizePct = (estimatedFullHeadH / img.height) * 100;

        // Orientation ratio — left vs right distance from eye to box edge
        const leftDist = leftCenter.x - box.x;
        const rightDist = box.x + box.width - rightCenter.x;
        const min = Math.min(leftDist, rightDist);
        orientationRatio = min > 0 ? Math.max(leftDist, rightDist) / min : 999;

        // ── Head tilt check ──
        const headTilt = computeTiltAngle(landmarks, drawW, drawH);
        const absHeadTilt = Math.abs(headTilt);

        if (absHeadTilt > 3) {
          localFeedbacks.push({
            type: "warning",
            message: `Head tilt detected (${absHeadTilt.toFixed(1)}°)`,
          });
        }

        // ── Body / orientation tilt check (Jawline based) ──
        const bodyTilt = detectBodyTilt(landmarks, drawW, drawH);
        if (bodyTilt.isTilted) {
          localFeedbacks.push({
            type: "warning",
            message: bodyTilt.description,
          });
        }

        // Face detected successfully feedback
        localFeedbacks.push({
          type: "success",
          message: "Face detected successfully",
        });

        // Eye level check
        if (eyeLevelPct >= 56 && eyeLevelPct <= 69)
          localFeedbacks.push({
            type: "success",
            message: `Eye level: ${eyeLevelPct.toFixed(1)}% ✓`,
          });
        else
          localFeedbacks.push({
            type: "warning",
            message: `Eye level: ${eyeLevelPct.toFixed(1)}% (target: 56–69%)`,
          });

        // Head size check
        if (headSizePct >= 50 && headSizePct <= 69)
          localFeedbacks.push({
            type: "success",
            message: `Head size: ${headSizePct.toFixed(1)}% ✓`,
          });
        else
          localFeedbacks.push({
            type: "warning",
            message: `Head size: ${headSizePct.toFixed(1)}% (target: 50–69%)`,
          });

        // Orientation check
        if (orientationRatio <= 2.0) {
          localFeedbacks.push({
            type: "success",
            message: "Frontal orientation ✓",
          });
        } else {
          localFeedbacks.push({
            type: "warning",
            message: "Face may not be facing camera directly",
          });
        }

        // ─── START ANIMATED SCAN ───
        // We run a smooth 2-second scanning animation in LEMON color
        const startTime = performance.now();
        const duration = 2000;

        const animateMesh = (now: number) => {
          const elapsed = now - startTime;
          const animProgress = Math.min(elapsed / duration, 1);
          
          if (overlayCanvasRef.current && box && landmarks) {
            drawOverlay(overlayCanvasRef.current, box, landmarks, drawW, drawH, animProgress);
          }
          
          if (animProgress < 1) {
            animFrameRef.current = requestAnimationFrame(animateMesh);
          }
        };
        animFrameRef.current = requestAnimationFrame(animateMesh);
        
        // Wait for the animation to finish before proceeding
        await new Promise(r => setTimeout(r, duration));

      } else {
        // No face or multiple faces detected
        await new Promise(r => setTimeout(r, 1000));
      }

      setFeedbacks(localFeedbacks);
      setProgress(100);
      setStepIndex(4);

      const detectionResult: ClientDetectionResult = {
        faceBox,
        eyeCenter,
        chinY,
        topOfHeadY,
        imageDimensions: { width: img.width, height: img.height },
        faceCount: detections.length,
        eyeLevelPct,
        headSizePct,
        orientationRatio,
        brightness: avgBrightness,
      };

      // Final short delay to show "Done!" state
      await new Promise(r => setTimeout(r, 400));

      // Send the original file downstream
      onDetectionComplete(file, detectionResult, localFeedbacks);

    } catch (err) {
      console.error(err);
      setFeedbacks([
        { type: "error", message: "Processing failed — please try again" },
      ]);
      onDetectionComplete(
        file,
        {
          faceBox: null,
          eyeCenter: null,
          chinY: null,
          topOfHeadY: null,
          imageDimensions: { width: 0, height: 0 },
          faceCount: 0,
          eyeLevelPct: null,
          headSizePct: null,
          orientationRatio: null,
          brightness: 0,
        },
        [{ type: "error", message: "Processing failed" }],
      );
    } finally {
      setLoading(false);
    }
  }, [file, targetBackground, onDetectionComplete]);

  /* ========================= ENHANCED OVERLAY ========================== */

  function drawOverlay(
    canvasEl: HTMLCanvasElement,
    box: { x: number; y: number; width: number; height: number },
    landmarks: NormalizedLandmark[],
    w: number,
    h: number,
    animProgress: number = 1, // 0 to 1
  ) {
    if (!box || !landmarks || !canvasEl) return;
    const ctx = canvasEl.getContext("2d", { willReadFrequently: true })!;
    ctx.clearRect(0, 0, w, h);

    // Full Face Mesh Tessellation (Dotted Lemon)
    ctx.save();
    ctx.strokeStyle = "rgba(163, 230, 53, 0.45)"; // LEMON color match
    ctx.lineWidth = 0.8;
    ctx.setLineDash([1, 2.5]); // elegant dotted effect
    ctx.beginPath();
    
    // Animate the connections draw
    const connections = FaceLandmarker.FACE_LANDMARKS_TESSELATION;
    const countToDraw = Math.floor(connections.length * animProgress);
    
    for (let i = 0; i < countToDraw; i++) {
       const conn = connections[i];
       const p1 = landmarks[conn.start];
       const p2 = landmarks[conn.end];
       if (p1 && p2) {
         ctx.moveTo(p1.x * w, p1.y * h);
         ctx.lineTo(p2.x * w, p2.y * h);
       }
    }
    ctx.stroke();
    ctx.restore();

    // Key Landmark dots (Eyes, Nose, Mouth) for emphasis - also animated
    const allPointIndices = [
      ...LEFT_EYE_INDICES,
      ...RIGHT_EYE_INDICES,
      ...NOSE_INDICES,
      ...MOUTH_INDICES,
    ];
    const subsetCount = Math.floor(allPointIndices.length * animProgress);
    const subsetIndices = allPointIndices.slice(0, subsetCount);
    const allPoints = getPoints(landmarks, subsetIndices, w, h);

    ctx.save();
    for (const pt of allPoints) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(163, 230, 53, 0.9)"; // Lemon dot
      ctx.fill();
    }
    ctx.restore();

    // Guidelines only appear when almost finished (at 60% progress)
    if (animProgress > 0.6) {
      const guideAlpha = Math.min((animProgress - 0.6) * 2.5, 1);
      
      const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
      const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
      const leftCenter = centerOfPoints(leftEyePoints);
      const rightCenter = centerOfPoints(rightEyePoints);
      const eyeY = (leftCenter.y + rightCenter.y) / 2;

      ctx.save();
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = `rgba(37, 99, 235, ${guideAlpha})`; // Blue guidelines
      ctx.lineWidth = 3.0;
      
      // Shadow glow for premium look
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(0,0,0,${0.6 * guideAlpha})`;
      
      ctx.beginPath();
      ctx.moveTo(0, eyeY);
      ctx.lineTo(w, eyeY);
      ctx.stroke();

      // Eye level label
      ctx.fillStyle = `rgba(37, 99, 235, ${guideAlpha})`;
      ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
      ctx.fillText("EYE LEVEL", 12, eyeY - 10);
      ctx.restore();

      // Face bounding box
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.8 * guideAlpha})`;
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(0,0,0,${0.5 * guideAlpha})`;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.restore();
    }

    // Tilt indicator line between eyes (Recalculated locally to avoid scope error)
    const currentLeftEye = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
    const currentRightEye = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
    const lCenter = centerOfPoints(currentLeftEye);
    const rCenter = centerOfPoints(currentRightEye);
    const tiltAngle = computeTiltAngle(landmarks, w, h);
    
    if (Math.abs(tiltAngle) > 2) {
      ctx.save();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.8)"; // amber
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lCenter.x, lCenter.y);
      ctx.lineTo(rCenter.x, rCenter.y);
      ctx.stroke();
      ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
      ctx.font = "bold 9px system-ui";
      ctx.fillText(`TILT: ${Math.abs(tiltAngle).toFixed(1)}°`, rCenter.x + 6, rCenter.y - 4);
      ctx.restore();
    }
  }

  useEffect(() => {
    runDetection();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [file]);

  return (
    <div className="space-y-0">
      {/* Image Canvas Area */}
      <div className="relative bg-gray-900 rounded-t-2xl overflow-hidden flex items-center justify-center min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="relative w-16 h-16 mb-5">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
              <div
                className="absolute inset-2 border-4 border-transparent border-b-indigo-400 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "0.8s",
                }}
              />
            </div>

            <p className="text-white text-sm font-semibold tracking-wide">
              {STEP_LABELS[stepIndex]}
            </p>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-4">
              {STEP_LABELS.slice(0, 4).map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < stepIndex
                        ? "bg-blue-400 scale-100"
                        : i === stepIndex
                          ? "bg-blue-500 scale-125 animate-pulse"
                          : "bg-gray-600 scale-100"
                    }`}
                  />
                  {i < 3 && (
                    <div
                      className={`w-4 h-0.5 transition-colors duration-300 ${i < stepIndex ? "bg-blue-400/50" : "bg-gray-700"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-56 h-1.5 bg-gray-800 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            className="max-width-full h-auto object-contain shadow-2xl"
          />
          <canvas
            ref={overlayCanvasRef}
            className="absolute top-0 left-0 max-w-full h-auto object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Inline Feedback Cards */}
      {feedbacks.length > 0 && (
        <div className="bg-white border-x border-b border-slate-100 rounded-b-2xl px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {feedbacks.map((fb, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  fb.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : fb.type === "warning"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {fb.type === "success" ? (
                  <svg
                    className="w-3.5 h-3.5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : fb.type === "warning" ? (
                  <svg
                    className="w-3.5 h-3.5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3.5 h-3.5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {fb.message}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cancel button — only after loading, with delay */}
      {loading && showCancel && (
        <div className="pt-3 px-4">
          <button
            onClick={onCancel}
            className="w-full px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-slate-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
