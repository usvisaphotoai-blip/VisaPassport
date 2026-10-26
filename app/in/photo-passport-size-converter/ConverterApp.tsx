"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  DPI_OPTIONS,
  KB_OPTIONS,
  PRESETS,
  PresetKey,
  Unit,
  customPixels,
  presetPixels,
} from "./presets";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getPrintSheetPrice } from "@/lib/print-sheet-pricing";
import { buySkipWait, readSkipWaitUnlock } from "@/lib/in-converter-checkout";

// Longest side kept from the upload; larger photos are scaled down to keep editing fast
const MAX_SOURCE_PX = 4000;
const MIN_OUTPUT_PX = 50;
// iOS Safari caps canvases at ~16.7 MP, so keep each side at or below 4000 px
const MAX_OUTPUT_PX = 4000;
const MIN_ZOOM = 0.5; // below 1 the photo shrinks inside the frame with white around it
const MAX_ZOOM = 4;
const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
// Free downloads wait this long; paying skips straight to the file
const WAIT_MS = 4 * 60 * 1000;
const formatClock = (ms: number) => {
  const total = Math.ceil(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

// Sensible starting values when the custom unit changes
const UNIT_DEFAULTS: Record<Unit, [string, string]> = {
  px: ["200", "230"],
  mm: ["35", "45"],
  cm: ["3.5", "4.5"],
  in: ["2", "2"],
};
const PREVIEW_W = 520; // preview canvas backing width (shown at ~260 css px)

type Output = {
  url: string;
  bytes: number;
  w: number;
  h: number;
  resized: boolean; // pixel size had to be reduced to reach the KB limit
  overLimit: boolean;
};

const toJpeg = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), "image/jpeg", quality),
  );

const scaledCopy = (canvas: HTMLCanvasElement, w: number, h: number) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0, w, h);
  return c;
};

// Highest JPEG quality that fits maxBytes; shrinks the pixel size only as a last resort
async function encodeWithinLimit(canvas: HTMLCanvasElement, maxBytes: number) {
  const first = await toJpeg(canvas, 0.92);
  if (!maxBytes || first.size <= maxBytes) return { blob: first, canvas, overLimit: false };

  let lo = 0.3, hi = 0.92;
  let best: Blob | null = null;
  for (let i = 0; i < 7; i++) {
    const q = (lo + hi) / 2;
    const b = await toJpeg(canvas, q);
    if (b.size <= maxBytes) { best = b; lo = q; } else { hi = q; }
  }
  if (best) return { blob: best, canvas, overLimit: false };

  let scale = 1;
  let last = first;
  let lastCanvas = canvas;
  while (scale > 0.3) {
    scale *= 0.85;
    lastCanvas = scaledCopy(canvas, Math.round(canvas.width * scale), Math.round(canvas.height * scale));
    last = await toJpeg(lastCanvas, 0.6);
    if (last.size <= maxBytes) return { blob: last, canvas: lastCanvas, overLimit: false };
  }
  return { blob: last, canvas: lastCanvas, overLimit: true };
}

const formatKb = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${parseFloat((bytes / 1024 / 1024).toFixed(2))} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function ConverterApp() {
  const [srcImg, setSrcImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<{ x: number; y: number } | null>(null);

  const [preset, setPreset] = useState<PresetKey>("35x45");
  const [customW, setCustomW] = useState("200");
  const [customH, setCustomH] = useState("230");
  const [customUnit, setCustomUnit] = useState<Unit>("px");
  const [dpi, setDpi] = useState<number>(300);
  const [maxKb, setMaxKb] = useState<number>(0);

  const [output, setOutput] = useState<Output | null>(null);
  const [processing, setProcessing] = useState(false);
  const [encodeError, setEncodeError] = useState<string | null>(null);
  const [toolInView, setToolInView] = useState(true);

  // Download wait / pay-to-skip
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countdownMs, setCountdownMs] = useState(0);
  const [waitUnlocked, setWaitUnlocked] = useState(readSkipWaitUnlock);
  const [payLoading, setPayLoading] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [autoDownloaded, setAutoDownloaded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const outputUrlRef = useRef<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);
  const runRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const skipWaitPrice = useMemo(() => getPrintSheetPrice(getClientTimezoneCurrency()), []);

  // Best-effort background copy to Cloudinary; never blocks or surfaces errors to the user
  const uploadToCloudinary = (blob: Blob, kind: "original" | "cropped") => {
    blobToDataUrl(blob)
      .then((dataUrl) =>
        fetch("/api/in-converter/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl, kind, preset }),
          keepalive: true,
        }),
      )
      .catch((err) => console.warn(`[in-converter] ${kind} upload failed:`, err));
  };

  // Target output size in pixels
  const target = useMemo(() => {
    if (preset !== "custom") return presetPixels(preset, dpi);
    return customPixels(parseFloat(customW) || 0, parseFloat(customH) || 0, customUnit, dpi);
  }, [preset, dpi, customW, customH, customUnit]);
  const targetError =
    target.w < MIN_OUTPUT_PX || target.h < MIN_OUTPUT_PX
      ? `Size is too small. Use at least ${MIN_OUTPUT_PX} × ${MIN_OUTPUT_PX} px.`
      : target.w > MAX_OUTPUT_PX || target.h > MAX_OUTPUT_PX
        ? `Size is too large. Keep it under ${MAX_OUTPUT_PX} px per side.`
        : null;
  const aspect = targetError ? 35 / 45 : target.w / target.h;

  // Upright, size-capped copy of the upload that all cropping reads from
  const source = useMemo(() => {
    if (!srcImg) return null;
    const quarter = rotation % 180 !== 0;
    const scale = Math.min(1, MAX_SOURCE_PX / Math.max(srcImg.naturalWidth, srcImg.naturalHeight));
    const w = Math.round(srcImg.naturalWidth * scale);
    const h = Math.round(srcImg.naturalHeight * scale);
    const c = document.createElement("canvas");
    c.width = quarter ? h : w;
    c.height = quarter ? w : h;
    const ctx = c.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(srcImg, -w / 2, -h / 2, w, h);
    return c;
  }, [srcImg, rotation]);

  // Crop rectangle in source pixels, always inside the image
  const crop = useMemo(() => {
    if (!source) return null;
    const W = source.width, H = source.height;
    const baseW = Math.min(W, H * aspect);
    const w = baseW / zoom;
    const h = w / aspect;
    // Crop smaller than the image: stay inside it. Larger (zoomed out): keep the image inside the crop.
    const clampAxis = (v: number, size: number, full: number) =>
      size <= full
        ? Math.min(full - size / 2, Math.max(size / 2, v))
        : Math.min(size / 2, Math.max(full - size / 2, v));
    const clampX = (x: number) => clampAxis(x, w, W);
    const clampY = (y: number) => clampAxis(y, h, H);
    // Default framing sits a little above center, where faces usually are
    const cx = clampX(center?.x ?? W / 2);
    const cy = clampY(center?.y ?? H * 0.45);
    return { x: cx - w / 2, y: cy - h / 2, w, h, cx, cy, clampX, clampY };
  }, [source, aspect, zoom, center]);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Warn before the tab closes or navigates away while the free-download wait is running
  useEffect(() => {
    const countdownRunning = !waitUnlocked && countdownMs > 0 && countdownMs < WAIT_MS;
    if (!countdownRunning) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [waitUnlocked, countdownMs]);

  // The mobile download bar only shows while the tool is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setToolInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse-wheel / trackpad zoom; React's onWheel is passive and can't stop the page scrolling
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => clampZoom(z * Math.exp(-e.deltaY * 0.002)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [srcImg]);

  const loadFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("That file isn't an image. Please upload a JPG, PNG or WebP photo.");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = url;
      const isFirstPhoto = !srcImg;
      setSrcImg(img);
      setFileName(file.name);
      setUploadError(null);
      setRotation(0);
      setZoom(1);
      setCenter(null);
      uploadToCloudinary(file, "original");
      if (isFirstPhoto && window.matchMedia("(max-width: 1023px)").matches) {
        requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setUploadError(
        /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name)
          ? "Your browser can't open HEIC photos. On iPhone, export the photo as JPG (or set Camera → Formats → Most Compatible) and upload again."
          : "We couldn't open this image. Please try a different JPG or PNG file.",
      );
    };
    img.src = url;
  };

  // Live crop preview
  useEffect(() => {
    const canvas = previewRef.current;
    if (!source || !crop || !canvas) return;
    canvas.width = PREVIEW_W;
    canvas.height = Math.round(PREVIEW_W / aspect);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);
  }, [source, crop, aspect]);

  // Render + encode the final file (debounced, latest run wins)
  useEffect(() => {
    if (!source || !crop || targetError) return;
    const run = ++runRef.current;
    const t = setTimeout(async () => {
      setProcessing(true);
      setEncodeError(null);
      try {
        const out = document.createElement("canvas");
        out.width = target.w;
        out.height = target.h;
        const ctx = out.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, out.width, out.height);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(source, crop.x, crop.y, crop.w, crop.h, 0, 0, out.width, out.height);
        const res = await encodeWithinLimit(out, maxKb * 1024);
        if (run !== runRef.current) return;
        if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
        const url = URL.createObjectURL(res.blob);
        outputUrlRef.current = url;
        setOutput({
          url,
          bytes: res.blob.size,
          w: res.canvas.width,
          h: res.canvas.height,
          resized: res.canvas.width !== target.w,
          overLimit: res.overLimit,
        });
      } catch {
        if (run === runRef.current) {
          setOutput(null);
          setEncodeError("Something went wrong while creating the photo. Try a smaller size or a different photo.");
        }
      } finally {
        if (run === runRef.current) setProcessing(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [source, crop, target.w, target.h, maxKb, targetError]);

  const pan = (dx: number, dy: number) => {
    if (!crop) return;
    setCenter({ x: crop.clampX(crop.cx + dx), y: crop.clampY(crop.cy + dy) });
  };

  const pointerDistance = () => {
    const [a, b] = [...pointersRef.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!crop) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      // Second finger down: switch from dragging to pinch-zoom
      dragRef.current = null;
      pinchRef.current = { dist: pointerDistance(), zoom };
    } else if (pointersRef.current.size === 1) {
      dragRef.current = { x: e.clientX, y: e.clientY, cx: crop.cx, cy: crop.cy };
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId) || !crop) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pinch = pinchRef.current;
    if (pinch && pointersRef.current.size >= 2) {
      setZoom(clampZoom((pinch.zoom * pointerDistance()) / pinch.dist));
      return;
    }
    const d = dragRef.current;
    if (!d) return;
    const ratio = crop.w / e.currentTarget.clientWidth;
    setCenter({
      x: crop.clampX(d.cx - (e.clientX - d.x) * ratio),
      y: crop.clampY(d.cy - (e.clientY - d.y) * ratio),
    });
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    // Lifting one finger of a pinch shouldn't make the photo jump
    dragRef.current = null;
  };

  const onEditorKey = (e: React.KeyboardEvent) => {
    if (!crop) return;
    const step = crop.w * 0.03;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
    };
    if (moves[e.key]) { e.preventDefault(); pan(...moves[e.key]); }
    if (e.key === "+" || e.key === "=") setZoom((z) => clampZoom(z + 0.1));
    if (e.key === "-") setZoom((z) => clampZoom(z - 0.1));
  };

  const fileLabel = preset === "custom" ? "custom" : `${preset}mm`;

  // Actually saves the file: fires once the wait is over (or skipped by paying)
  const runDownload = () => {
    if (!output) return;
    const link = document.createElement("a");
    link.href = output.url;
    link.download = `passport-size-photo-${fileLabel}-${output.w}x${output.h}px.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    fetch(output.url)
      .then((r) => r.blob())
      .then((blob) => uploadToCloudinary(blob, "cropped"))
      .catch(() => {});
    const { gtag } = window as Window & { gtag?: (...args: unknown[]) => void };
    gtag?.("event", "in_converter_download", { preset, dpi, maxKb, bytes: output.bytes, paid: waitUnlocked });
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Starts (or resumes) the free-download wait and opens the "please wait" dialog;
  // paying already-unlocked sessions skip straight to the file
  const openDialog = () => {
    if (!canDownload) return;
    setDialogError(null);
    setAutoDownloaded(false);
    setDialogOpen(true);
    if (waitUnlocked || freeReady) return; // handled by the auto-download effect below
    if (timerRef.current || countdownMs >= WAIT_MS) return;
    const startedAt = Date.now() - countdownMs;
    timerRef.current = window.setInterval(() => {
      const elapsed = Math.min(Date.now() - startedAt, WAIT_MS);
      setCountdownMs(elapsed);
      if (elapsed >= WAIT_MS) clearTimer();
    }, 250);
  };

  const closeDialog = () => {
    if (payLoading) return;
    setDialogOpen(false);
  };

  const payForSkipWait = async () => {
    if (payLoading) return;
    setPayLoading(true);
    setDialogError(null);
    try {
      const orderId = await buySkipWait({ price: skipWaitPrice, preset: fileLabel });
      if (orderId) {
        clearTimer();
        setWaitUnlocked(true);
      }
    } catch (err) {
      setDialogError(err instanceof Error ? err.message : "Couldn't start the payment. Please try again.");
    } finally {
      setPayLoading(false);
    }
  };

  const freeReady = countdownMs >= WAIT_MS;

  // The wait is over (or paid for): download automatically, once
  useEffect(() => {
    if (!dialogOpen || autoDownloaded) return;
    if (waitUnlocked || freeReady) {
      setAutoDownloaded(true);
      runDownload();
    }
    // runDownload only reads output/preset/dpi/maxKb/waitUnlocked, captured fresh each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, waitUnlocked, freeReady, autoDownloaded]);

  const upscaling = crop ? crop.w < target.w * 0.9 : false;
  const canDownload = !!output && !processing && !targetError && !encodeError;
  // Head guide: taller for portrait sizes (head is ~70–80% of a 3.5×4.5 cm photo)
  const guide = aspect < 0.9 ? { cy: 45, rx: 27, ry: 36 } : { cy: 46, rx: 25, ry: 30 };

  const stepLabel = "text-xs font-bold uppercase tracking-wide text-slate-500 mb-2";
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2";
  const chip = (active: boolean) =>
    `rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${focusRing} ${
      active ? "border-lime-500 bg-lime-50 text-lime-800 ring-1 ring-lime-500" : "border-slate-200 text-slate-700 hover:border-lime-300"
    }`;

  const uploadBox = (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsDragging(false);
        }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
        className={`w-full border-2 border-dashed rounded-xl ${srcImg ? "p-3" : "p-6 sm:p-10"} text-center transition-colors ${focusRing} ${
          isDragging ? "border-lime-500 bg-lime-50" : "border-lime-300 bg-lime-50/30 hover:bg-lime-50/70"
        }`}
      >
        {srcImg ? (
          <span className="flex items-center gap-3 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={srcImg.src} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-800 truncate">{fileName}</span>
              <span className="block text-xs text-lime-700 font-semibold">Change photo</span>
            </span>
          </span>
        ) : (
          <>
            <span className="mx-auto mb-3 flex w-12 h-12 items-center justify-center rounded-xl bg-white border border-lime-100 text-lime-600 shadow-sm" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <span className="block text-base font-bold text-slate-800">Upload a photo to convert</span>
            <span className="block text-sm text-slate-500 mt-1">Drop it here or tap to choose · JPG, PNG or WebP</span>
            <span className="block text-xs text-slate-400 mt-2">Processed securely and auto-deleted from our servers within 24 hours.</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        className="hidden"
        aria-label="Upload photo"
        onChange={(e) => {
          loadFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {uploadError && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {uploadError}
        </p>
      )}
    </>
  );

  const resultStatus = output && (
    <p className="text-xs text-slate-600">
      <span className="font-semibold text-slate-800">{output.w} × {output.h} px</span>
      {" · "}{preset === "custom" && customUnit === "px" ? "JPG" : `${dpi} DPI`}{" · "}
      <span className="font-semibold text-slate-800">{formatKb(output.bytes)}</span>
      {maxKb > 0 && !output.overLimit && <span className="ml-1.5 text-lime-700 font-bold">✓ under {formatKb(maxKb * 1024)}</span>}
    </p>
  );

  const step = !srcImg ? 1 : !canDownload ? 2 : 3;
  const steps = [
    { n: 1, label: "Upload" },
    { n: 2, label: "Adjust & choose size" },
    { n: 3, label: "Download" },
  ];

  return (
    <section ref={sectionRef} id="converter-tool" aria-labelledby="converter-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-8 sm:pb-10 scroll-mt-24">
      <h2 id="converter-heading" className="sr-only">Convert your photo to passport size</h2>

      <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-4" aria-label="Steps">
        {steps.map((s, i) => (
          <li key={s.n} className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span
                aria-hidden
                className={`flex w-5 h-5 sm:w-6 sm:h-6 shrink-0 items-center justify-center rounded-full text-[11px] sm:text-xs font-bold ${
                  step > s.n ? "bg-lime-600 text-white" : step === s.n ? "bg-lime-600 text-white ring-4 ring-lime-100" : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > s.n ? "✓" : s.n}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold ${step === s.n ? "text-slate-900" : "text-slate-400"}`}>{s.label}</span>
            </span>
            {i < steps.length - 1 && <span className="w-4 sm:w-8 h-px bg-slate-200" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-clip grid grid-cols-1 lg:grid-cols-12">
        {/* Editor */}
        <div ref={editorRef} className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 lg:p-8 scroll-mt-20 border-b lg:border-b-0 lg:border-r border-slate-100">
          {!srcImg ? (
            <div className="h-full flex flex-col justify-center">{uploadBox}</div>
          ) : (
            <div className="lg:sticky lg:top-24 flex flex-col items-center">
              <p className={`${stepLabel} self-start`}>Drag to position · zoom to fit the head</p>
              <div
                ref={frameRef}
                role="application"
                aria-label="Crop area. Drag or use arrow keys to move the photo. Pinch, scroll or use plus and minus to zoom."
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={onEditorKey}
                // Width also follows viewport height so the whole frame fits on short (landscape) screens
                style={{ maxWidth: `max(120px, min(var(--frame-w), calc((100svh - 240px) * ${aspect})))` }}
                className={`relative w-full [--frame-w:220px] sm:[--frame-w:260px] lg:[--frame-w:300px] touch-none select-none cursor-grab active:cursor-grabbing rounded-sm shadow-lg ring-1 ring-slate-200 ${focusRing}`}
              >
                <canvas ref={previewRef} className="block w-full h-auto bg-white" />
                {/* Head position guide */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 w-full h-full" aria-hidden>
                  <ellipse cx="50" cy={guide.cy} rx={guide.rx} ry={guide.ry} fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
                  <ellipse cx="50" cy={guide.cy} rx={guide.rx} ry={guide.ry} fill="none" stroke="#65a30d" strokeWidth="1.5" strokeDasharray="4 4" strokeDashoffset="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                </svg>
              </div>

              <div className="w-full max-w-[320px] mt-4 space-y-3">
                <label className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600 w-10">Zoom</span>
                  <input
                    type="range"
                    min={MIN_ZOOM}
                    max={MAX_ZOOM}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 accent-lime-600"
                  />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => { setRotation((r) => (r + 90) % 360); setCenter(null); }} className={`rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 py-2.5 ${focusRing}`}>
                    ↻ Rotate
                  </button>
                  <button type="button" onClick={() => { setZoom(1); setCenter(null); }} className={`rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 py-2.5 ${focusRing}`}>
                    Reset
                  </button>
                </div>
              </div>

              {upscaling && (
                <p role="status" className="mt-3 max-w-sm text-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  The cropped area is smaller than the output size, so it will be enlarged and may look soft. Zoom out or use the original photo.
                </p>
              )}
              <p className="mt-3 text-[11px] text-slate-500 text-center max-w-xs">
                Keep the face inside the dashed oval, with a little space above the head.
                {zoom < 1 && " Zoomed out: the empty area is filled with white."}
              </p>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="lg:col-span-5 p-4 sm:p-6 lg:p-7 space-y-5">
          {srcImg && <div>{uploadBox}</div>}

          <fieldset>
            <legend className={stepLabel}>Passport size</legend>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRESETS) as Exclude<PresetKey, "custom">[]).map((key) => {
                const p = PRESETS[key];
                const px = presetPixels(key, dpi);
                const active = preset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPreset(key)}
                    className={`text-left rounded-xl border px-2.5 sm:px-3 py-2 transition-colors ${focusRing} ${
                      active ? "border-lime-500 bg-lime-50 ring-1 ring-lime-500" : "border-slate-200 hover:border-lime-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-[13px] sm:text-sm font-bold text-slate-800">{p.label}</span>
                    <span className="block text-[11px] font-semibold text-lime-700">{px.w} × {px.h} px</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2" title={p.usedFor}>{p.usedFor}</span>
                  </button>
                );
              })}
              <button
                type="button"
                aria-pressed={preset === "custom"}
                onClick={() => setPreset("custom")}
                className={`col-span-2 text-left rounded-xl border px-3 py-2 transition-colors ${focusRing} ${
                  preset === "custom" ? "border-lime-500 bg-lime-50 ring-1 ring-lime-500" : "border-slate-200 hover:border-lime-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">Custom size</span>
                <span className="text-[11px] text-slate-500 ml-2">e.g. 200 × 230 px for exam forms</span>
              </button>
            </div>

            {preset === "custom" && (
              <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2">
                <label className="block">
                  <span className="block text-[11px] font-bold text-slate-500 mb-1">Width</span>
                  <input inputMode="decimal" value={customW} onChange={(e) => setCustomW(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none" />
                </label>
                <span className="pb-2 text-slate-400" aria-hidden>×</span>
                <label className="block">
                  <span className="block text-[11px] font-bold text-slate-500 mb-1">Height</span>
                  <input inputMode="decimal" value={customH} onChange={(e) => setCustomH(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none" />
                </label>
                <label className="block">
                  <span className="sr-only">Unit</span>
                  <select
                    value={customUnit}
                    onChange={(e) => {
                      const u = e.target.value as Unit;
                      setCustomUnit(u);
                      setCustomW(UNIT_DEFAULTS[u][0]);
                      setCustomH(UNIT_DEFAULTS[u][1]);
                    }} className="rounded-lg border border-slate-300 px-2 py-2 text-sm font-semibold bg-white focus:border-lime-500 outline-none">
                    <option value="px">px</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="in">inch</option>
                  </select>
                </label>
                {targetError && <p role="alert" className="col-span-4 text-xs font-medium text-red-700">{targetError}</p>}
              </div>
            )}
          </fieldset>

          {!(preset === "custom" && customUnit === "px") && (
            <fieldset>
              <legend className={stepLabel}>Resolution (DPI)</legend>
              <div className="flex gap-2">
                {DPI_OPTIONS.map((d) => (
                  <button key={d} type="button" aria-pressed={dpi === d} onClick={() => setDpi(d)} className={`flex-1 ${chip(dpi === d)}`}>
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">300 DPI is standard for printing and most online forms.</p>
            </fieldset>
          )}

          <label className="block">
            <span className={`block ${stepLabel}`}>Max file size</span>
            <select
              value={maxKb}
              onChange={(e) => setMaxKb(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold bg-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none"
            >
              {KB_OPTIONS.map((kb) => (
                <option key={kb} value={kb}>
                  {kb === 0 ? "No limit (best quality)" : `Under ${kb >= 1024 ? "1 MB" : `${kb} KB`}`}
                </option>
              ))}
            </select>
            <span className="block text-[11px] text-slate-500 mt-1.5">Check your form&apos;s notification for its KB limit.</span>
          </label>

          {/* Result + download */}
          <div className={`rounded-xl border border-slate-200 p-3 ${srcImg ? "" : "opacity-60"}`}>
            <div className="flex items-center gap-3">
              <div className="w-14 shrink-0 rounded border border-slate-200 bg-slate-50 overflow-hidden" style={{ aspectRatio: `${aspect}` }}>
                {output && srcImg && !targetError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={output.url} alt="Converted passport size photo" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="text-sm font-bold text-slate-800">
                  {!srcImg
                    ? "Your converted photo"
                    : targetError || encodeError
                      ? "Fix the size to continue"
                      : processing
                        ? "Converting…"
                        : "Ready to download"}
                </p>
                {!srcImg ? (
                  <p className="text-xs text-slate-500">Upload a photo to start.</p>
                ) : targetError || encodeError ? (
                  <p className="text-xs text-red-700">{targetError ?? encodeError}</p>
                ) : (
                  resultStatus
                )}
              </div>
            </div>
            {output && srcImg && !targetError && output.resized && !output.overLimit && (
              <p className="mt-2 text-[11px] text-amber-800 bg-amber-50 rounded-md px-2 py-1.5">
                Pixel size was reduced to get under the KB limit. Choose a higher limit to keep {target.w} × {target.h} px.
              </p>
            )}
            {output && srcImg && !targetError && output.overLimit && (
              <p className="mt-2 text-[11px] text-red-700 bg-red-50 rounded-md px-2 py-1.5">
                Couldn&apos;t get under the KB limit at this size. Pick a higher limit or a smaller photo size.
              </p>
            )}
            <button
              type="button"
              disabled={!canDownload || !srcImg}
              onClick={openDialog}
              className={`hidden lg:block mt-3 w-full rounded-xl bg-lime-600 hover:bg-lime-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
            >
              Download passport size photo
            </button>
            {canDownload && srcImg && (
              <p className="hidden lg:block mt-2 text-[11px] text-slate-500 text-center">
                {waitUnlocked || freeReady
                  ? "Ready — downloads instantly."
                  : `Free, ready in ${formatClock(WAIT_MS - countdownMs)} · or pay ${skipWaitPrice.formatted} to skip the wait.`}
              </p>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            Need copies to print? Make a{" "}
            <Link href="/passport-photo-template-4x6" className="text-lime-700 font-semibold underline">4×6 print sheet</Link>{" "}
            from your downloaded photo.
          </p>
        </div>
      </div>

      {/* Mobile: download always in reach */}
      {srcImg && <div className="h-20 lg:hidden" aria-hidden />}
      {srcImg && toolInView && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-white/95 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
            <div className="max-w-md mx-auto flex items-center gap-3">
              <div className="min-w-0 flex-1 text-xs text-slate-600 truncate">
                {targetError || encodeError
                  ? <span className="text-red-700">Fix the size to continue</span>
                  : processing
                    ? "Converting…"
                    : output ? `${output.w}×${output.h} px · ${formatKb(output.bytes)}` : ""}
              </div>
              <button
                type="button"
                disabled={!canDownload}
                onClick={openDialog}
                className={`shrink-0 rounded-xl bg-lime-600 hover:bg-lime-700 disabled:opacity-60 text-white text-sm font-bold px-5 py-3 transition-colors ${focusRing}`}
              >
                Download JPG
              </button>
            </div>
          </div>
        </>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="in-converter-dialog-title"
            className="relative w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <button
              type="button"
              autoFocus
              onClick={closeDialog}
              disabled={payLoading}
              aria-label="Close"
              className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors ${focusRing}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 id="in-converter-dialog-title" className="text-lg font-extrabold text-slate-900 pr-8">
              {waitUnlocked || freeReady ? "Your photo is ready" : "Preparing your photo…"}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {output?.w} × {output?.h} px · {fileLabel}
            </p>

            {waitUnlocked || freeReady ? (
              <div className="mt-5 rounded-xl border border-lime-200 bg-lime-50 p-4 text-center">
                <p className="text-sm font-semibold text-lime-800">
                  {autoDownloaded ? "Downloaded ✓" : "Starting your download…"}
                </p>
                <button
                  type="button"
                  onClick={runDownload}
                  className={`mt-3 w-full rounded-xl bg-lime-600 hover:bg-lime-700 text-white text-sm font-bold py-2.5 transition-colors ${focusRing}`}
                >
                  Download again
                </button>
              </div>
            ) : (
              <>
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="flex justify-between text-sm text-slate-700">
                    Free download in
                    <span className="font-bold tabular-nums text-slate-900" aria-hidden>{formatClock(WAIT_MS - countdownMs)}</span>
                  </p>
                  <div
                    className="mt-2 h-1.5 rounded-full bg-amber-100 overflow-hidden"
                    role="progressbar"
                    aria-label="Free download countdown"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round((countdownMs / WAIT_MS) * 100)}
                  >
                    <div
                      className="h-full bg-amber-500 transition-[width] duration-200 ease-linear"
                      style={{ width: `${(countdownMs / WAIT_MS) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-amber-900 mt-3">
                    ⚠ Please don&apos;t close or leave this page — your download starts automatically when the timer ends.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={payLoading}
                  onClick={payForSkipWait}
                  className={`mt-3 w-full rounded-xl bg-lime-600 hover:bg-lime-700 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
                >
                  {payLoading ? "Opening secure checkout…" : `Pay ${skipWaitPrice.formatted} · Download now`}
                </button>
                <p className="text-xs text-slate-500 mt-2 text-center">No wait · same photo, same quality</p>
              </>
            )}

            {dialogError && (
              <p role="alert" className="mt-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {dialogError}
              </p>
            )}
            <p className="sr-only" aria-live="polite">
              {waitUnlocked || freeReady ? "Your photo is ready to download" : ""}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
