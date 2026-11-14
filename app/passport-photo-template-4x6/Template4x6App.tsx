"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getPrintSheetPrice } from "@/lib/print-sheet-pricing";
import { buyPrintSheetHd, readHdUnlock } from "@/lib/print-sheet-checkout";
import {
  DPI,
  PHOTO_SIZES,
  PhotoSizeKey,
  bestFit,
} from "./sheet";

type Format = "jpg" | "pdf";

// Below this the print starts to look soft
const MIN_PRINT_DPI = 200;
// Free downloads wait this long and render at FREE_DPI; paid HD downloads are instant at full DPI
const FREE_DELAY_MS = 270_000;
const FREE_DPI = 200;
// Interactive preview uses a size-capped copy so dragging/zooming stays smooth on large phone photos
const PREVIEW_MAX_PX = 2000;
// Cap background-removal uploads well under Vercel's 4.5 MB body limit while keeping 300+ DPI headroom
const REMOVE_BG_MAX_PX = 2400;
const REMOVE_BG_MAX_BYTES = 3.5 * 1024 * 1024;
const MIN_ZOOM = 0.5; // below 1 the photo shrinks inside each cell with white around it
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.05;
const PAN_STEP = 0.025; // fraction of the cell per button tap

const BG_PRESETS = [
  { id: "white", label: "White", hex: "#ffffff" },
  { id: "light-gray", label: "Light Gray", hex: "#f3f4f6" },
  { id: "light-blue", label: "Light Blue", hex: "#dbeafe" },
  { id: "blue", label: "Blue", hex: "#0047ab" },
  { id: "red", label: "Red", hex: "#dc2626" },
] as const;

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

// Stored normalized (0..1) so framing stays identical if original and cutout dimensions differ
type CenterPoint = { nx: number; ny: number } | null;

function computeCrop(
  imageObj: HTMLImageElement | null,
  photoW: number,
  photoH: number,
  zoom: number,
  center: CenterPoint,
) {
  if (!imageObj) return null;
  const W = imageObj.naturalWidth;
  const H = imageObj.naturalHeight;
  const targetRatio = photoW / photoH;
  const baseW = Math.min(W, H * targetRatio);
  const sw = baseW / zoom;
  const sh = sw / targetRatio;

  // Crop smaller than the image: stay inside it. Larger (zoomed out): keep the image inside the cell.
  const axisBounds = (size: number, full: number): [number, number] =>
    size <= full ? [size / 2, full - size / 2] : [full - size / 2, size / 2];

  const [minX, maxX] = axisBounds(sw, W);
  const [minY, maxY] = axisBounds(sh, H);
  const clampX = (x: number) => Math.min(maxX, Math.max(minX, x));
  const clampY = (y: number) => Math.min(maxY, Math.max(minY, y));

  const cx = clampX((center?.nx ?? 0.5) * W);
  const cy = clampY((center?.ny ?? 0.5) * H);
  return {
    W,
    H,
    sx: cx - sw / 2,
    sy: cy - sh / 2,
    sw,
    sh,
    cx,
    cy,
    minX,
    maxX,
    minY,
    maxY,
    clampX,
    clampY,
  };
}

function makePreviewSource(img: HTMLImageElement | null) {
  if (!img) return null;
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const scale = Math.min(1, PREVIEW_MAX_PX / Math.max(W, H));
  if (scale === 1) {
    return { el: img as CanvasImageSource, width: W, height: H };
  }
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(W * scale));
  c.height = Math.max(1, Math.round(H * scale));
  const ctx = c.getContext("2d");
  if (!ctx) {
    return { el: img as CanvasImageSource, width: W, height: H };
  }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, c.width, c.height);
  return { el: c as CanvasImageSource, width: c.width, height: c.height };
}

async function prepareRemoveBgFile(img: HTMLImageElement): Promise<File> {
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const scale = Math.min(1, REMOVE_BG_MAX_PX / Math.max(W, H));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(W * scale));
  c.height = Math.max(1, Math.round(H * scale));
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, c.width, c.height);

  for (const q of [0.92, 0.85, 0.75, 0.65]) {
    const blob = await new Promise<Blob | null>((resolve) => c.toBlob(resolve, "image/jpeg", q));
    if (blob && (blob.size <= REMOVE_BG_MAX_BYTES || q === 0.65)) {
      return new File([blob], "photo.jpg", { type: "image/jpeg" });
    }
  }
  throw new Error("Could not prepare photo for background removal.");
}

const formatClock = (ms: number) => {
  const total = Math.ceil(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

// Button that triggers once on tap/keyboard and repeats smoothly while held down
function RepeatableButton({
  onAction,
  disabled,
  label,
  title,
  className = "",
  children,
}: {
  onAction: () => void;
  disabled?: boolean;
  label: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const actionRef = useRef(onAction);
  const delayRef = useRef<number | null>(null);
  const repeatRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const clearSuppressRef = useRef<number | null>(null);

  useEffect(() => {
    actionRef.current = onAction;
  }, [onAction]);

  const stopHold = useCallback(() => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (disabled) stopHold();
  }, [disabled, stopHold]);

  useEffect(() => {
    return () => {
      stopHold();
      if (clearSuppressRef.current) clearTimeout(clearSuppressRef.current);
    };
  }, [stopHold]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || e.button !== 0) return;
    stopHold();
    if (clearSuppressRef.current) {
      clearTimeout(clearSuppressRef.current);
      clearSuppressRef.current = null;
    }
    suppressClickRef.current = true;
    actionRef.current();

    delayRef.current = window.setTimeout(() => {
      repeatRef.current = window.setInterval(() => actionRef.current(), 55);
    }, 260);

    const onRelease = () => {
      stopHold();
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      window.removeEventListener("blur", onRelease);
      clearSuppressRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        clearSuppressRef.current = null;
      }, 350);
    };
    window.addEventListener("pointerup", onRelease);
    window.addEventListener("pointercancel", onRelease);
    window.addEventListener("blur", onRelease);
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      if (clearSuppressRef.current) {
        clearTimeout(clearSuppressRef.current);
        clearSuppressRef.current = null;
      }
      return;
    }
    if (!disabled) actionRef.current();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      title={title ?? label}
      onPointerDown={handlePointerDown}
      onPointerLeave={stopHold}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}

export default function Template4x6App() {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [cutoutImg, setCutoutImg] = useState<HTMLImageElement | null>(null);
  const [bgMode, setBgMode] = useState<"original" | "color">("original");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [customColor, setCustomColor] = useState<string>("#e0f2fe");
  const [bgLoading, setBgLoading] = useState(false);
  const [bgError, setBgError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [size, setSize] = useState<PhotoSizeKey>("us");
  const [borderless, setBorderless] = useState(false);
  const [cropLines, setCropLines] = useState(true);
  const [copies, setCopies] = useState<number>(0); // 0 = fill the sheet
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<CenterPoint>(null);
  const [isSheetDragging, setIsSheetDragging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countdownMs, setCountdownMs] = useState(0); // elapsed time of the free-download countdown
  const [hdUnlocked, setHdUnlocked] = useState(readHdUnlock);
  const [payLoading, setPayLoading] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const cutoutUrlRef = useRef<string | null>(null);
  const bgAbortRef = useRef<AbortController | null>(null);
  const bgRequestIdRef = useRef(0);
  const bgLoadingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const scrollToPreviewRef = useRef(false);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dragRef = useRef<{ x: number; y: number; cx: number; cy: number; ratio: number } | null>(null);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const photo = PHOTO_SIZES[size];
  const fit = bestFit(size, borderless);
  const count = copies === 0 ? fit.max : Math.min(copies, fit.max);

  const useCutout = bgMode === "color" && !!cutoutImg;
  const activeImageObj = useCutout ? cutoutImg : imageObj;

  // Downscaled copies for smooth 60fps preview dragging/zooming; downloads always use full resolution
  const origPreviewSource = useMemo(() => makePreviewSource(imageObj), [imageObj]);
  const cutoutPreviewSource = useMemo(() => makePreviewSource(cutoutImg), [cutoutImg]);
  const activePreviewSource = useCutout ? cutoutPreviewSource : origPreviewSource;

  const crop = useMemo(
    () => computeCrop(activeImageObj, photo.width, photo.height, zoom, center),
    [activeImageObj, photo.width, photo.height, zoom, center],
  );
  const printDpi = crop ? Math.round(crop.sw / (photo.width / 25.4)) : null;
  const hdPrice = useMemo(() => getPrintSheetPrice(getClientTimezoneCurrency()), []);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    if (cutoutUrlRef.current) URL.revokeObjectURL(cutoutUrlRef.current);
    bgAbortRef.current?.abort();
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Trackpad pinch-to-zoom on the preview canvas without hijacking normal vertical page scrolling
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setZoom((z) => clampZoom(z * Math.exp(-e.deltaY * 0.01)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [imageObj]);

  const selectSize = (key: PhotoSizeKey) => {
    setSize(key);
    setCopies(0);
  };

  const toggleBorderless = (checked: boolean) => {
    setBorderless(checked);
    setCopies(0);
  };

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
      if (cutoutUrlRef.current) {
        URL.revokeObjectURL(cutoutUrlRef.current);
        cutoutUrlRef.current = null;
      }
      bgAbortRef.current?.abort();
      bgAbortRef.current = null;
      bgRequestIdRef.current += 1;
      bgLoadingRef.current = false;
      pointersRef.current.clear();
      dragRef.current = null;
      pinchRef.current = null;
      setIsSheetDragging(false);
      setImageObj(img);
      setCutoutImg(null);
      setBgMode("original");
      setBgColor("#ffffff");
      setBgLoading(false);
      setBgError(null);
      setFileName(file.name);
      setUploadError(null);
      setZoom(1);
      setCenter(null);
      // On small screens the preview sits above the controls; bring it into view once
      scrollToPreviewRef.current = !imageObj && window.matchMedia("(max-width: 1023px)").matches;
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

  const handleRemoveBg = async (targetColor: string) => {
    if (!imageObj || bgLoadingRef.current) return;
    bgAbortRef.current?.abort();
    const controller = new AbortController();
    bgAbortRef.current = controller;
    const reqId = ++bgRequestIdRef.current;

    bgLoadingRef.current = true;
    setBgLoading(true);
    setBgError(null);
    setBgColor(targetColor);

    try {
      const uploadFile = await prepareRemoveBgFile(imageObj);
      if (reqId !== bgRequestIdRef.current) return;

      const form = new FormData();
      form.append("image", uploadFile);

      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: form,
        signal: controller.signal,
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errData?.error || "Could not remove the background. Please try again.");
      }

      const blob = await res.blob();
      const cutoutUrl = URL.createObjectURL(blob);
      const cutout = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => {
          URL.revokeObjectURL(cutoutUrl);
          reject(new Error("Could not read the processed image. Please try again."));
        };
        el.src = cutoutUrl;
      });

      if (reqId !== bgRequestIdRef.current) {
        URL.revokeObjectURL(cutoutUrl);
        return;
      }

      if (cutoutUrlRef.current) URL.revokeObjectURL(cutoutUrlRef.current);
      cutoutUrlRef.current = cutoutUrl;
      setCutoutImg(cutout);
      setBgMode("color");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (reqId === bgRequestIdRef.current) {
        setBgError(err instanceof Error ? err.message : "Background removal failed. Please try again.");
      }
    } finally {
      if (reqId === bgRequestIdRef.current) {
        bgLoadingRef.current = false;
        setBgLoading(false);
      }
    }
  };

  const handleSelectBgColor = (hex: string) => {
    if (bgLoadingRef.current) return;
    setBgColor(hex);
    setBgError(null);
    if (cutoutImg) {
      setBgMode("color");
    } else {
      void handleRemoveBg(hex);
    }
  };

  // Runs after the post-upload layout has mounted, so previewRef is set
  useEffect(() => {
    if (!imageObj || !scrollToPreviewRef.current) return;
    scrollToPreviewRef.current = false;
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageObj]);

  // Draws the sheet onto a canvas at the given DPI
  const renderSheet = (canvas: HTMLCanvasElement, dpi: number, fullResolution = false) => {
    const ctx = canvas.getContext("2d");
    if (!activeImageObj || !crop || !ctx) return;
    const px = (mm: number) => Math.round((mm * dpi) / 25.4);

    const cW = px(fit.sheetW);
    const cH = px(fit.sheetH);
    canvas.width = cW;
    canvas.height = cH;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cW, cH);

    const pW = px(photo.width);
    const pH = px(photo.height);
    const gridW = fit.cols * pW;
    const gridH = fit.rows * pH;
    const x0 = Math.round((cW - gridW) / 2);
    const y0 = Math.round((cH - gridH) / 2);

    const srcEl = !fullResolution && activePreviewSource ? activePreviewSource.el : activeImageObj;
    const srcW = !fullResolution && activePreviewSource ? activePreviewSource.width : activeImageObj.naturalWidth;
    const srcH = !fullResolution && activePreviewSource ? activePreviewSource.height : activeImageObj.naturalHeight;
    const scaleX = srcW / activeImageObj.naturalWidth;
    const scaleY = srcH / activeImageObj.naturalHeight;

    const sx = crop.sx * scaleX;
    const sy = crop.sy * scaleY;
    const sw = crop.sw * scaleX;
    const sh = crop.sh * scaleY;

    // Intersect with source bounds so zoomed-out padding stays strictly in-bounds across browsers
    const visSx = Math.max(0, sx);
    const visSy = Math.max(0, sy);
    const visEx = Math.min(srcW, sx + sw);
    const visEy = Math.min(srcH, sy + sh);
    const visSw = visEx - visSx;
    const visSh = visEy - visSy;

    ctx.imageSmoothingQuality = "high";
    let drawn = 0;
    for (let r = 0; r < fit.rows && drawn < count; r++) {
      for (let c = 0; c < fit.cols && drawn < count; c++) {
        const x = x0 + c * pW;
        const y = y0 + r * pH;
        if (useCutout || visSw > 0 && visSh > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, pW, pH);
          ctx.clip();
          if (useCutout) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(x, y, pW, pH);
          }
          if (visSw > 0 && visSh > 0) {
            const destX = x + ((visSx - sx) / sw) * pW;
            const destY = y + ((visSy - sy) / sh) * pH;
            const destW = (visSw / sw) * pW;
            const destH = (visSh / sh) * pH;
            ctx.drawImage(srcEl, visSx, visSy, visSw, visSh, destX, destY, destW, destH);
          }
          ctx.restore();
        }
        if (cropLines) {
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = Math.max(1, px(0.15));
          ctx.strokeRect(x, y, pW, pH);
        }
        drawn++;
      }
    }

    // Small footer only when the bottom margin has room for it
    if (cH - (y0 + gridH) >= px(3)) {
      ctx.fillStyle = "#64748b";
      ctx.font = `${px(2)}px Arial`;
      ctx.textBaseline = "bottom";
      ctx.textAlign = "center";
      ctx.fillText(`pixpassport.com · 4x6 template · ${photo.label}`, cW / 2, cH - px(0.8));
    }
  };

  // The on-screen preview stays at free quality so the HD file is only available after payment
  useEffect(() => {
    if (canvasRef.current) renderSheet(canvasRef.current, FREE_DPI, false);
    // renderSheet only reads these values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImageObj, activePreviewSource, useCutout, bgColor, crop, size, fit.cols, fit.rows, fit.sheetW, fit.sheetH, count, cropLines]);

  const stepZoom = useCallback((delta: number) => {
    setZoom((z) => clampZoom(Math.round((z + delta) * 1000) / 1000));
  }, []);

  const nudgePhoto = useCallback(
    (dxFactor: number, dyFactor: number) => {
      if (!activeImageObj) return;
      setCenter((prev) => {
        const c = computeCrop(activeImageObj, photo.width, photo.height, zoom, prev);
        if (!c) return prev;
        return {
          nx: c.clampX(c.cx + c.sw * dxFactor) / c.W,
          ny: c.clampY(c.cy + c.sh * dyFactor) / c.H,
        };
      });
    },
    [activeImageObj, photo.width, photo.height, zoom],
  );

  const resetAdjustment = useCallback(() => {
    setZoom(1);
    setCenter(null);
  }, []);

  const pointerDistance = () => {
    const [a, b] = [...pointersRef.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onSheetPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!crop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      dragRef.current = null;
      setIsSheetDragging(false);
      pinchRef.current = { dist: Math.max(1, pointerDistance()), zoom };
    } else if (pointersRef.current.size === 1) {
      // Scale pointer CSS delta by 1 cell's width on screen so dragging matches the finger/cursor 1:1
      const ratio = (crop.sw * fit.sheetW) / (rect.width * photo.width);
      dragRef.current = { x: e.clientX, y: e.clientY, cx: crop.cx, cy: crop.cy, ratio };
      setIsSheetDragging(true);
    }
  };

  const onSheetPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointersRef.current.has(e.pointerId) || !crop) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pinch = pinchRef.current;
    if (pinch && pointersRef.current.size >= 2) {
      setZoom(clampZoom((pinch.zoom * pointerDistance()) / pinch.dist));
      return;
    }
    const d = dragRef.current;
    if (!d) return;
    setCenter({
      nx: crop.clampX(d.cx - (e.clientX - d.x) * d.ratio) / crop.W,
      ny: crop.clampY(d.cy - (e.clientY - d.y) * d.ratio) / crop.H,
    });
  };

  const endSheetDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    dragRef.current = null;
    setIsSheetDragging(false);
  };

  const onSheetKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!crop) return;
    if (e.key === "ArrowUp") { e.preventDefault(); nudgePhoto(0, PAN_STEP); }
    else if (e.key === "ArrowDown") { e.preventDefault(); nudgePhoto(0, -PAN_STEP); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); nudgePhoto(PAN_STEP, 0); }
    else if (e.key === "ArrowRight") { e.preventDefault(); nudgePhoto(-PAN_STEP, 0); }
    else if (e.key === "+" || e.key === "=") { e.preventDefault(); stepZoom(ZOOM_STEP); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); stepZoom(-ZOOM_STEP); }
    else if (e.key === "0") { e.preventDefault(); resetAdjustment(); }
  };

  const download = async (format: Format, hd: boolean) => {
    setDialogError(null);
    try {
      const canvas = document.createElement("canvas");
      renderSheet(canvas, hd ? DPI : FREE_DPI, true);
      const base = `pixpassport-4x6-passport-photo-template-${size}${hd ? "-hd" : ""}`;
      if (format === "jpg") {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95));
        if (!blob) throw new Error("toBlob failed");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${base}.jpg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        const { default: jsPDF } = await import("jspdf");
        const pdf = new jsPDF({
          orientation: fit.orientation,
          unit: "mm",
          format: [fit.sheetW, fit.sheetH],
        });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, fit.sheetW, fit.sheetH);
        pdf.save(`${base}.pdf`);
      }
      const { gtag } = window as Window & { gtag?: (...args: unknown[]) => void };
      gtag?.("event", "template_4x6_download", { format, size, borderless, count, hd });
    } catch (err) {
      console.warn("[Download] Failed:", err);
      setDialogError("Your file couldn't be created. Please try again.");
    }
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // The free-download countdown starts on the first open and keeps running while the
  // dialog is closed, so reopening picks up where it left off; paying skips it
  const openDialog = () => {
    setDialogError(null);
    setDialogOpen(true);
    if (hdUnlocked || timerRef.current || countdownMs >= FREE_DELAY_MS) return;
    const startedAt = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Math.min(Date.now() - startedAt, FREE_DELAY_MS);
      setCountdownMs(elapsed);
      if (elapsed >= FREE_DELAY_MS) clearTimer();
    }, 250);
  };

  const closeDialog = () => {
    if (payLoading) return;
    setDialogOpen(false);
  };

  const payForHd = async () => {
    if (payLoading) return;
    setPayLoading(true);
    setDialogError(null);
    try {
      const orderId = await buyPrintSheetHd({ price: hdPrice, paperSize: "4x6", photoSize: size });
      if (orderId) {
        clearTimer();
        setHdUnlocked(true);
      }
    } catch (err) {
      setDialogError(err instanceof Error ? err.message : "Couldn't start the payment. Please try again.");
    } finally {
      setPayLoading(false);
    }
  };

  const freeReady = countdownMs >= FREE_DELAY_MS;
  const countdownRunning = !hdUnlocked && countdownMs > 0 && !freeReady;

  const canMoveUp = crop ? crop.cy < crop.maxY - 0.5 : false;
  const canMoveDown = crop ? crop.cy > crop.minY + 0.5 : false;
  const canMoveLeft = crop ? crop.cx < crop.maxX - 0.5 : false;
  const canMoveRight = crop ? crop.cx > crop.minX + 0.5 : false;
  const hasHorizontalSlack = crop ? crop.maxX - crop.minX > 1 : false;
  const hasVerticalSlack = crop ? crop.maxY - crop.minY > 1 : false;
  const isAdjusted = Math.abs(zoom - 1) > 0.005 || center !== null;
  const isCustomBgActive =
    useCutout && !BG_PRESETS.some((p) => p.hex.toLowerCase() === bgColor.toLowerCase());

  const stepLabel = "text-xs font-bold uppercase tracking-wide text-slate-500 mb-2";
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2";
  const adjustBtn = `inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-lime-700 hover:text-lime-800 active:bg-lime-50 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-700 transition-colors select-none cursor-pointer ${focusRing}`;

  const openPicker = () => inputRef.current?.click();
  const dragHandlers = {
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); },
    onDragLeave: (e: React.DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsDragging(false);
    },
    onDrop: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); loadFile(e.dataTransfer.files?.[0]); },
  };
  const dropHandlers = { onClick: openPicker, ...dragHandlers };
  const dropTone = isDragging ? "border-lime-700 bg-lime-50" : "border-lime-300 bg-lime-50/30 hover:bg-lime-50/70";

  const fileInput = (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        className="hidden"
        aria-label="Upload passport photo"
        onChange={(e) => {
          loadFile(e.target.files?.[0]);
          // Allow picking the same file again
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

  // Before a photo is loaded, show only the upload step; the layout tools appear afterwards
  if (!imageObj) {
    return (
      <section id="template-tool" aria-labelledby="tool-heading" className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 pb-8 sm:pb-10 scroll-mt-24">
        <h2 id="tool-heading" className="sr-only">Make your 4×6 passport photo sheet</h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sm:p-4">
          <button
            type="button"
            {...dropHandlers}
            className={`group w-full border-2 border-dashed rounded-xl px-4 py-10 sm:py-14 text-center transition-colors ${focusRing} ${dropTone}`}
          >
            <span className="mx-auto mb-4 flex w-14 h-14 items-center justify-center rounded-full bg-lime-100 text-lime-700 transition-transform group-hover:-translate-y-0.5" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <span className="block text-base sm:text-lg font-bold text-slate-800">Drop your photo here or tap to upload</span>
            <span className="block text-xs sm:text-sm text-slate-500 mt-1">JPG, PNG or WebP · stays on your device</span>
            <span className="mt-5 inline-flex items-center rounded-full bg-lime-700 group-hover:bg-lime-800 text-white text-sm font-bold px-6 py-2.5 shadow-sm transition-colors">
              Choose photo
            </span>
          </button>
          {fileInput}
          <p className="mt-3 sm:mt-4 mb-1 text-center text-sm text-slate-500">
            Don&apos;t have a passport photo yet?{" "}
            <Link href="/passport-photo-online" className="font-semibold text-lime-700 hover:text-lime-800 underline underline-offset-2">
              Make one online →
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="template-tool" aria-labelledby="tool-heading" {...dragHandlers} className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-8 sm:pb-10 scroll-mt-24">
      <h2 id="tool-heading" className="sr-only">Make your 4×6 passport photo sheet</h2>
      <div className={`bg-white rounded-2xl border shadow-sm overflow-clip grid grid-cols-1 lg:grid-cols-12 transition-colors ${isDragging ? "border-lime-700 ring-2 ring-lime-700" : "border-slate-200"}`}>
        {/* Controls */}
        <div className="lg:col-span-5 min-w-0 p-4 sm:p-6 border-t lg:border-t-0 lg:border-r border-slate-100 space-y-5">

          {/* Photo */}
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(useCutout ? cutoutImg : imageObj).src}
                alt=""
                style={useCutout ? { backgroundColor: bgColor } : undefined}
                className="w-11 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
              />
              <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 truncate">{fileName}</span>
              <button
                type="button"
                onClick={openPicker}
                className={`shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-lime-700 hover:text-lime-700 transition-colors ${focusRing}`}
              >
                Change
              </button>
            </div>
            {fileInput}
          </div>

          {/* Background removal & color */}
          <div role="group" aria-labelledby="bg-heading" className="min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span id="bg-heading" className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Background
              </span>
              {cutoutImg && !bgLoading && (
                <button
                  type="button"
                  onClick={() => setBgMode((m) => (m === "color" ? "original" : "color"))}
                  className={`text-xs font-semibold text-lime-700 hover:text-lime-800 cursor-pointer rounded px-1 ${focusRing}`}
                >
                  {bgMode === "color" ? "Show original" : "Use removed BG"}
                </button>
              )}
            </div>

            {!cutoutImg && (
              <button
                type="button"
                disabled={bgLoading}
                onClick={() => void handleRemoveBg(bgColor)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border border-lime-700 bg-lime-50/70 hover:bg-lime-100/80 disabled:opacity-60 disabled:cursor-wait text-lime-800 text-xs sm:text-sm font-bold py-2.5 px-3 transition-colors cursor-pointer ${focusRing}`}
              >
                {bgLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-lime-700 border-t-transparent animate-spin" aria-hidden />
                    <span>Removing background…</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    <span>Remove background</span>
                  </>
                )}
              </button>
            )}

            <div className={cutoutImg ? "" : "mt-2.5"}>
              <p className="text-[11px] font-medium text-slate-500 mb-1.5">
                {cutoutImg
                  ? "Background color"
                  : "Or pick a color (removes background automatically)"}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-1.5">
                {BG_PRESETS.map((preset) => {
                  const active = useCutout && bgColor.toLowerCase() === preset.hex;
                  const pending = bgLoading && bgColor.toLowerCase() === preset.hex;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      disabled={bgLoading}
                      aria-pressed={active}
                      onClick={() => handleSelectBgColor(preset.hex)}
                      className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition-colors cursor-pointer disabled:opacity-50 ${focusRing} ${
                        active || pending
                          ? "border-lime-700 bg-lime-50 text-slate-900 ring-1 ring-lime-700"
                          : "border-slate-200 bg-white hover:border-lime-600/60 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shrink-0 shadow-inner"
                        style={{ backgroundColor: preset.hex }}
                        aria-hidden
                      />
                      <span className="text-[11px] font-semibold truncate">{preset.label}</span>
                    </button>
                  );
                })}

                {cutoutImg ? (
                  <label
                    className={`relative flex items-center gap-1.5 rounded-lg border px-2 py-1.5 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-lime-700 focus-within:ring-offset-2 ${
                      isCustomBgActive
                        ? "border-lime-700 bg-lime-50 text-slate-900 ring-1 ring-lime-700"
                        : "border-slate-200 bg-white hover:border-lime-600/60 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shrink-0 shadow-inner"
                      style={{
                        background: isCustomBgActive
                          ? bgColor
                          : "conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)",
                      }}
                      aria-hidden
                    />
                    <span className="text-[11px] font-semibold truncate">Custom</span>
                    <input
                      type="color"
                      aria-label="Choose custom background color"
                      value={isCustomBgActive ? bgColor : customColor}
                      onClick={() => setBgMode("color")}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomColor(val);
                        setBgColor(val);
                        setBgMode("color");
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                ) : (
                  <button
                    type="button"
                    disabled={bgLoading}
                    onClick={() => handleSelectBgColor(customColor)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition-colors cursor-pointer disabled:opacity-50 ${focusRing} ${
                      bgLoading && bgColor.toLowerCase() === customColor.toLowerCase()
                        ? "border-lime-700 bg-lime-50 text-slate-900 ring-1 ring-lime-700"
                        : "border-slate-200 bg-white hover:border-lime-600/60 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shrink-0 shadow-inner"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)",
                      }}
                      aria-hidden
                    />
                    <span className="text-[11px] font-semibold truncate">Custom</span>
                  </button>
                )}
              </div>
            </div>

            {bgError && (
              <p role="alert" className="mt-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {bgError}
              </p>
            )}
          </div>

          {/* Size */}
          <fieldset className="min-w-0">
            <legend className={stepLabel}>Photo size</legend>
            <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {(Object.keys(PHOTO_SIZES) as PhotoSizeKey[]).map((key) => {
                const s = PHOTO_SIZES[key];
                const n = bestFit(key, borderless).max;
                const active = key === size;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectSize(key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime-700 ${
                      active ? "bg-lime-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 shrink-0 rounded-full border-2 ${active ? "border-lime-700 bg-lime-700 shadow-[inset_0_0_0_2px_white]" : "border-slate-300"}`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-800">{s.label}</span>
                      <span className="block text-xs text-slate-500 truncate" title={s.usedFor}>{s.usedFor}</span>
                    </span>
                    <span className={`shrink-0 text-xs font-semibold ${active ? "text-lime-700" : "text-slate-400"}`}>
                      {n} photos
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Options */}
          <fieldset className="min-w-0 space-y-3">
            <legend className={stepLabel}>Options</legend>
            {fit.max > 1 && (
              <label className="block">
                <span className="flex justify-between text-sm text-slate-700">
                  Copies <span className="font-semibold text-lime-700" aria-live="polite">{count} of {fit.max}</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={fit.max}
                  value={count}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="w-full mt-1 accent-lime-700"
                />
              </label>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input type="checkbox" checked={cropLines} onChange={(e) => setCropLines(e.target.checked)} className="w-4 h-4 accent-lime-700" />
                Crop lines
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input type="checkbox" checked={borderless} onChange={(e) => toggleBorderless(e.target.checked)} className="w-4 h-4 accent-lime-700" />
                No margin
              </label>
            </div>
            {!borderless && bestFit(size, true).max > fit.max && (
              <p className="text-xs text-slate-500">Tick &quot;No margin&quot; to fit {bestFit(size, true).max} photos (needs a borderless print).</p>
            )}
            {borderless && (
              <p className="text-xs text-slate-500">Print borderless (photo lab or borderless printer setting), or the outer edges get trimmed.</p>
            )}
          </fieldset>

          {/* Download (mobile uses the sticky bar below) */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={openDialog}
              className={`w-full rounded-xl bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
            >
              {countdownRunning ? `Download · free in ${formatClock(FREE_DELAY_MS - countdownMs)}` : "Download"}
            </button>
            <p className="text-xs text-slate-500 mt-2 text-center">
              JPG or PDF · print at 100%{borderless ? ", borderless" : ""}
            </p>
          </div>
        </div>

        {/* Preview: first on mobile, so the result is visible right away */}
        <div
          ref={previewRef}
          className="lg:col-span-7 bg-slate-100 p-4 sm:p-6 lg:p-8 scroll-mt-20 order-first lg:order-none"
        >
          <div className="lg:sticky lg:top-24 flex flex-col items-center justify-center lg:min-h-[480px]">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 mb-2.5 text-center">
              Drag on the photos to move · use controls below to zoom &amp; align
            </p>
            <canvas
              ref={canvasRef}
              role="application"
              tabIndex={0}
              aria-label={`4x6 sheet preview with ${count} passport photos at ${photo.label}. Drag or use arrow keys to move the photo inside each cell, pinch or use plus and minus to zoom.`}
              onPointerDown={onSheetPointerDown}
              onPointerMove={onSheetPointerMove}
              onPointerUp={endSheetDrag}
              onPointerCancel={endSheetDrag}
              onKeyDown={onSheetKeyDown}
              style={{
                maxWidth: `max(180px, min(var(--sheet-w), calc((100svh - 330px) * ${fit.sheetW / fit.sheetH})))`,
              }}
              className={`bg-white shadow-lg h-auto w-full touch-none select-none transition-shadow ${
                isSheetDragging
                  ? "cursor-grabbing ring-2 ring-lime-700"
                  : "cursor-grab ring-1 ring-slate-300/70 hover:ring-lime-600/60"
              } ${focusRing} ${
                fit.orientation === "portrait"
                  ? "[--sheet-w:240px] sm:[--sheet-w:300px]"
                  : "[--sheet-w:360px] sm:[--sheet-w:460px]"
              }`}
            />
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 text-center">
              {fit.orientation === "portrait" ? "4 × 6 in" : "6 × 4 in"} · {fit.cols} × {fit.rows} grid · {count} photo{count === 1 ? "" : "s"}
            </p>

            {/* Zoom and position controls applied uniformly to every cell on the sheet */}
            <div className="w-full max-w-[380px] sm:max-w-[420px] mt-3 bg-white rounded-xl border border-slate-200 p-3 sm:p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Adjust photo in each cell
                </span>
                <button
                  type="button"
                  onClick={resetAdjustment}
                  disabled={!isAdjusted}
                  className={`text-xs font-semibold text-lime-700 hover:text-lime-800 disabled:text-slate-300 disabled:pointer-events-none cursor-pointer ${focusRing} rounded px-1`}
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 w-10 shrink-0">Zoom</span>
                <RepeatableButton
                  label="Zoom out"
                  title="Zoom out"
                  disabled={zoom <= MIN_ZOOM + 0.001}
                  onAction={() => stepZoom(-ZOOM_STEP)}
                  className={`${adjustBtn} w-8 h-8 shrink-0`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </RepeatableButton>
                <input
                  type="range"
                  min={MIN_ZOOM}
                  max={MAX_ZOOM}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(clampZoom(Number(e.target.value)))}
                  aria-label="Zoom"
                  className="flex-1 min-w-0 accent-lime-700 cursor-pointer"
                />
                <RepeatableButton
                  label="Zoom in"
                  title="Zoom in"
                  disabled={zoom >= MAX_ZOOM - 0.001}
                  onAction={() => stepZoom(ZOOM_STEP)}
                  className={`${adjustBtn} w-8 h-8 shrink-0`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </RepeatableButton>
                <span className="text-xs font-bold tabular-nums text-slate-700 w-10 text-right shrink-0">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Move photo inside each cell">
                <RepeatableButton
                  label="Move photo up"
                  title="Move photo up"
                  disabled={!canMoveUp}
                  onAction={() => nudgePhoto(0, PAN_STEP)}
                  className={`${adjustBtn} py-2 px-1.5`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
                  </svg>
                  <span>Up</span>
                </RepeatableButton>
                <RepeatableButton
                  label="Move photo down"
                  title="Move photo down"
                  disabled={!canMoveDown}
                  onAction={() => nudgePhoto(0, -PAN_STEP)}
                  className={`${adjustBtn} py-2 px-1.5`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                  </svg>
                  <span>Down</span>
                </RepeatableButton>
                <RepeatableButton
                  label="Move photo left"
                  title="Move photo left"
                  disabled={!canMoveLeft}
                  onAction={() => nudgePhoto(PAN_STEP, 0)}
                  className={`${adjustBtn} py-2 px-1.5`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                  </svg>
                  <span>Left</span>
                </RepeatableButton>
                <RepeatableButton
                  label="Move photo right"
                  title="Move photo right"
                  disabled={!canMoveRight}
                  onAction={() => nudgePhoto(-PAN_STEP, 0)}
                  className={`${adjustBtn} py-2 px-1.5`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                  <span>Right</span>
                </RepeatableButton>
              </div>

              {!hasHorizontalSlack && !hasVerticalSlack ? (
                <p className="text-[11px] text-slate-500 text-center">
                  Zoom in or out to move the photo inside each cell.
                </p>
              ) : zoom < 1 ? (
                <p className="text-[11px] text-slate-500 text-center">
                  Zoomed out: empty area inside each cell is filled with white.
                </p>
              ) : null}
            </div>

            {printDpi !== null && printDpi < MIN_PRINT_DPI && (
              <p role="status" className="mt-3 max-w-sm text-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Low resolution: this photo prints at about {printDpi} DPI and may look blurry.{" "}
                {zoom > 1 ? "Zoom out or use a higher-resolution photo." : "Use the original, full-size photo for a sharp print."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: keep downloads in reach while adjusting options */}
      <div className="h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-white/95 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={openDialog}
            className={`w-full rounded-xl bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
          >
            {countdownRunning
              ? `Download · free in ${formatClock(FREE_DELAY_MS - countdownMs)}`
              : `Download (${count} photo${count === 1 ? "" : "s"})`}
          </button>
        </div>
      </div>

      {dialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-dialog-title"
            className="relative w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <button
              type="button"
              autoFocus
              onClick={closeDialog}
              aria-label="Close"
              className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ${focusRing}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 id="download-dialog-title" className="text-lg font-extrabold text-slate-900 pr-8">
              Download your 4×6 sheet
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {count} photo{count === 1 ? "" : "s"} · {photo.label}
            </p>

            {hdUnlocked ? (
              <div className="mt-5">
                <p className="text-sm font-semibold text-lime-700">HD unlocked · {DPI} DPI</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => download("jpg", true)}
                    className={`rounded-xl bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
                  >
                    Download JPG
                  </button>
                  <button
                    type="button"
                    onClick={() => download("pdf", true)}
                    className={`rounded-xl border border-lime-700 text-lime-700 hover:bg-lime-50 text-sm font-bold py-3 transition-colors ${focusRing}`}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Free: standard quality after the countdown */}
                <div className="mt-5 rounded-xl border border-slate-200 p-4">
                  {freeReady ? (
                    <>
                      <p className="text-sm font-semibold text-slate-800">Free download ready</p>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => download("jpg", false)}
                          className={`rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold py-2.5 transition-colors ${focusRing}`}
                        >
                          Download JPG
                        </button>
                        <button
                          type="button"
                          onClick={() => download("pdf", false)}
                          className={`rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold py-2.5 transition-colors ${focusRing}`}
                        >
                          Download PDF
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="flex justify-between text-sm text-slate-700">
                        Free download in
                        <span className="font-bold tabular-nums text-slate-900" aria-hidden>{formatClock(FREE_DELAY_MS - countdownMs)}</span>
                      </p>
                      <div
                        className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden"
                        role="progressbar"
                        aria-label="Free download countdown"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round((countdownMs / FREE_DELAY_MS) * 100)}
                      >
                        <div
                          className="h-full bg-slate-400 transition-[width] duration-200 ease-linear"
                          style={{ width: `${(countdownMs / FREE_DELAY_MS) * 100}%` }}
                        />
                      </div>
                    </>
                  )}
                  <p className="text-xs text-slate-500 mt-2">Standard quality ({FREE_DPI} DPI). You can close this window, the timer keeps running.</p>
                </div>

                {/* Paid: HD, no wait */}
                <button
                  type="button"
                  disabled={payLoading}
                  onClick={payForHd}
                  className={`mt-3 w-full rounded-xl bg-lime-700 hover:bg-lime-800 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
                >
                  {payLoading ? "Opening secure checkout…" : `Pay ${hdPrice.formatted} · Download HD now`}
                </button>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Sharp {DPI} DPI print · JPG & PDF · no wait
                </p>
              </>
            )}

            {dialogError && (
              <p role="alert" className="mt-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {dialogError}
              </p>
            )}
            <p className="sr-only" aria-live="polite">
              {hdUnlocked ? "HD download ready" : freeReady ? "Free download ready" : ""}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
