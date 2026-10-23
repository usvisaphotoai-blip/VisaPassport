"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

const formatClock = (ms: number) => {
  const total = Math.ceil(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

export default function Template4x6App() {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [size, setSize] = useState<PhotoSizeKey>("us");
  const [borderless, setBorderless] = useState(false);
  const [cropLines, setCropLines] = useState(true);
  const [copies, setCopies] = useState<number>(0); // 0 = fill the sheet
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
  const timerRef = useRef<number | null>(null);
  const scrollToPreviewRef = useRef(false);

  const photo = PHOTO_SIZES[size];
  const fit = bestFit(size, borderless);
  const count = copies === 0 ? fit.max : Math.min(copies, fit.max);

  // Center-crop of the source to the target aspect ratio, so photos never stretch
  const crop = (() => {
    if (!imageObj) return null;
    const targetRatio = photo.width / photo.height;
    const srcRatio = imageObj.naturalWidth / imageObj.naturalHeight;
    let sx = 0, sy = 0, sw = imageObj.naturalWidth, sh = imageObj.naturalHeight;
    if (srcRatio > targetRatio) {
      sw = imageObj.naturalHeight * targetRatio;
      sx = (imageObj.naturalWidth - sw) / 2;
    } else if (srcRatio < targetRatio) {
      sh = imageObj.naturalWidth / targetRatio;
      sy = (imageObj.naturalHeight - sh) / 2;
    }
    return { sx, sy, sw, sh };
  })();
  const printDpi = crop ? Math.round(crop.sw / (photo.width / 25.4)) : null;
  const hdPrice = useMemo(() => getPrintSheetPrice(getClientTimezoneCurrency()), []);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

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
      const isFirstPhoto = !imageObj;
      setImageObj(img);
      setFileName(file.name);
      setUploadError(null);
      // On small screens the preview sits above the controls; bring it into view once
      scrollToPreviewRef.current = isFirstPhoto && window.matchMedia("(max-width: 1023px)").matches;
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

  // Runs after the post-upload layout has mounted, so previewRef is set
  useEffect(() => {
    if (!imageObj || !scrollToPreviewRef.current) return;
    scrollToPreviewRef.current = false;
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageObj]);

  // Draws the sheet onto a canvas at the given DPI
  const renderSheet = (canvas: HTMLCanvasElement, dpi: number) => {
    const ctx = canvas.getContext("2d");
    if (!imageObj || !crop || !ctx) return;
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

    ctx.imageSmoothingQuality = "high";
    let drawn = 0;
    for (let r = 0; r < fit.rows && drawn < count; r++) {
      for (let c = 0; c < fit.cols && drawn < count; c++) {
        const x = x0 + c * pW;
        const y = y0 + r * pH;
        ctx.drawImage(imageObj, crop.sx, crop.sy, crop.sw, crop.sh, x, y, pW, pH);
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
    if (canvasRef.current) renderSheet(canvasRef.current, FREE_DPI);
    // renderSheet only reads these values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageObj, size, fit.cols, fit.rows, fit.sheetW, fit.sheetH, count, cropLines]);

  const download = async (format: Format, hd: boolean) => {
    setDialogError(null);
    try {
      const canvas = document.createElement("canvas");
      renderSheet(canvas, hd ? DPI : FREE_DPI);
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

  const stepLabel = "text-xs font-bold uppercase tracking-wide text-slate-500 mb-2";
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2";

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
        <div className="lg:col-span-5 min-w-0 p-4 sm:p-6 border-t lg:border-t-0 lg:border-r border-slate-100 space-y-6">

          {/* Photo */}
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageObj.src} alt="" className="w-11 h-11 object-cover rounded-lg border border-slate-200 shrink-0" />
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
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`Preview: ${count} passport photos at ${photo.label} on a 4x6 inch sheet`}
              className={`bg-white shadow-lg h-auto w-full ${fit.orientation === "portrait" ? "max-w-[240px] sm:max-w-[300px]" : "max-w-[360px] sm:max-w-[460px]"}`}
            />
            <p className="text-[11px] sm:text-xs text-slate-500 mt-3 sm:mt-4 text-center">
              {fit.orientation === "portrait" ? "4 × 6 in" : "6 × 4 in"} · {fit.cols} × {fit.rows} grid · {count} photo{count === 1 ? "" : "s"}
            </p>
            {printDpi !== null && printDpi < MIN_PRINT_DPI && (
              <p role="status" className="mt-3 max-w-sm text-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Low resolution: this photo prints at about {printDpi} DPI and may look blurry. Use the original, full-size photo for a sharp print.
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
