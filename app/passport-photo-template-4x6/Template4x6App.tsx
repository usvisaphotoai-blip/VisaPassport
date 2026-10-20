"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  PHOTO_SIZES,
  PhotoSizeKey,
  bestFit,
  mmToPx,
} from "./sheet";

// Below this the print starts to look soft
const MIN_PRINT_DPI = 200;
const DOWNLOAD_DELAY_MS = 10_000;

export default function Template4x6App() {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [size, setSize] = useState<PhotoSizeKey>("us");
  const [borderless, setBorderless] = useState(false);
  const [cropLines, setCropLines] = useState(true);
  const [copies, setCopies] = useState<number>(0); // 0 = fill the sheet
  const [isDragging, setIsDragging] = useState(false);
  const [downloading, setDownloading] = useState<"jpg" | "pdf" | null>(null);
  const [countdownMs, setCountdownMs] = useState(0); // elapsed time of the pre-download countdown

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);

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
      if (isFirstPhoto && window.matchMedia("(max-width: 1023px)").matches) {
        requestAnimationFrame(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
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

  // Draw the 300 DPI sheet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!imageObj || !crop || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cW = mmToPx(fit.sheetW);
    const cH = mmToPx(fit.sheetH);
    canvas.width = cW;
    canvas.height = cH;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cW, cH);

    const pW = mmToPx(photo.width);
    const pH = mmToPx(photo.height);
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
          ctx.lineWidth = Math.max(1, mmToPx(0.15));
          ctx.strokeRect(x, y, pW, pH);
        }
        drawn++;
      }
    }

    // Small footer only when the bottom margin has room for it
    if (cH - (y0 + gridH) >= mmToPx(3)) {
      ctx.fillStyle = "#64748b";
      ctx.font = `${mmToPx(2)}px Arial`;
      ctx.textBaseline = "bottom";
      ctx.textAlign = "center";
      ctx.fillText(`pixpassport.com · 4x6 template · ${photo.label}`, cW / 2, cH - mmToPx(0.8));
    }
    // crop is derived from imageObj + size, so those deps cover it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageObj, size, fit.cols, fit.rows, fit.sheetW, fit.sheetH, count, cropLines]);

  const download = async (format: "jpg" | "pdf") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(format);
    try {
      const base = `pixpassport-4x6-passport-photo-template-${size}`;
      if (format === "jpg") {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.98));
        if (!blob) return;
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
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, fit.sheetW, fit.sheetH);
        pdf.save(`${base}.pdf`);
      }
      const { gtag } = window as Window & { gtag?: (...args: unknown[]) => void };
      gtag?.("event", "template_4x6_download", { format, size, borderless, count });
    } finally {
      setDownloading(null);
    }
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Wait DOWNLOAD_DELAY_MS before the file is generated; the dialog blocks edits meanwhile
  const startDownload = (format: "jpg" | "pdf") => {
    if (downloading) return;
    setDownloading(format);
    setCountdownMs(0);
    const startedAt = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= DOWNLOAD_DELAY_MS) {
        clearTimer();
        setCountdownMs(DOWNLOAD_DELAY_MS);
        download(format);
      } else {
        setCountdownMs(elapsed);
      }
    }, 100);
  };

  const cancelDownload = () => {
    clearTimer();
    setDownloading(null);
  };

  const secondsLeft = Math.ceil((DOWNLOAD_DELAY_MS - countdownMs) / 1000);
  const countingDown = downloading !== null && countdownMs < DOWNLOAD_DELAY_MS;

  const stepLabel = "text-xs font-bold uppercase tracking-wide text-slate-500 mb-2";
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2";

  return (
    <section id="template-tool" aria-labelledby="tool-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-8 sm:pb-10 scroll-mt-24">
      <h2 id="tool-heading" className="sr-only">Make your 4×6 passport photo sheet</h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-clip grid grid-cols-1 lg:grid-cols-12">
        {/* Controls */}
        <div className={`lg:col-span-5 p-4 sm:p-6 lg:p-7 ${imageObj ? "border-t" : ""} lg:border-t-0 lg:border-r border-slate-100 space-y-5`}>

          {/* Step 1: upload */}
          <div>
            <p className={stepLabel}>1. Upload photo</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsDragging(false);
              }}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
              className={`w-full border-2 border-dashed rounded-xl ${imageObj ? "p-3" : "p-4 sm:p-6"} text-center transition-colors ${focusRing} ${
                isDragging ? "border-lime-500 bg-lime-50" : "border-lime-300 bg-lime-50/30 hover:bg-lime-50/70"
              }`}
            >
              {imageObj ? (
                <span className="flex items-center gap-3 text-left">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageObj.src} alt="" className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-800 truncate">{fileName}</span>
                    <span className="block text-xs text-lime-700 font-semibold">Change photo</span>
                  </span>
                </span>
              ) : (
                <>
                  <span className="mx-auto mb-2 flex w-11 h-11 items-center justify-center rounded-xl bg-white border border-lime-100 text-lime-600 shadow-sm" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </span>
                  <span className="block text-sm font-bold text-slate-800">Drop your photo here or tap to upload</span>
                  <span className="block text-xs text-slate-500 mt-1">JPG, PNG or WebP · stays on your device</span>
                </>
              )}
            </button>
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
          </div>

          {/* Step 2: size */}
          <fieldset>
            <legend className={stepLabel}>2. Photo size</legend>
            <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
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
                    className={`text-left rounded-xl border px-2.5 sm:px-3 py-2 sm:py-2.5 transition-colors ${focusRing} ${
                      active ? "border-lime-500 bg-lime-50 ring-1 ring-lime-500" : "border-slate-200 hover:border-lime-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                      <span className="text-[13px] sm:text-sm font-bold text-slate-800">{s.label}</span>
                      <span className={`text-[11px] sm:text-xs font-bold whitespace-nowrap rounded-full px-2 py-0.5 ${active ? "bg-lime-600 text-white" : "bg-lime-50 text-lime-700"}`}>
                        {n} per sheet
                      </span>
                    </span>
                    <span className="block text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug line-clamp-2" title={s.usedFor}>{s.usedFor}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Step 3: options */}
          <fieldset className="space-y-3">
            <legend className={stepLabel}>3. Layout options</legend>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={borderless} onChange={(e) => toggleBorderless(e.target.checked)} className="mt-1 w-4 h-4 accent-lime-600" />
              <span>
                <span className="block text-sm font-semibold text-slate-800">Edge-to-edge (no margin)</span>
                <span className="block text-xs text-slate-500">Fits more photos, e.g. 6 × 2×2 in. Order a borderless 4x6 print so nothing gets trimmed.</span>
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={cropLines} onChange={(e) => setCropLines(e.target.checked)} className="w-4 h-4 accent-lime-600" />
              <span className="text-sm font-semibold text-slate-800">Show crop lines</span>
            </label>
            {fit.max > 1 && (
              <label className="block pt-1">
                <span className="flex justify-between text-sm font-semibold text-slate-800">
                  Copies <span className="text-lime-700" aria-live="polite">{count} of {fit.max}</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={fit.max}
                  value={count}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="w-full mt-2 accent-lime-600"
                />
              </label>
            )}
          </fieldset>

          {/* Step 4: download (mobile uses the sticky bar below once a photo is loaded) */}
          <div className={imageObj ? "hidden lg:block" : ""}>
            <p className={stepLabel}>4. Download</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={!imageObj || downloading !== null}
                onClick={() => startDownload("jpg")}
                className={`rounded-xl bg-lime-600 hover:bg-lime-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
              >
                {downloading === "jpg" ? "Preparing…" : "Download JPG"}
              </button>
              <button
                type="button"
                disabled={!imageObj || downloading !== null}
                onClick={() => startDownload("pdf")}
                className={`rounded-xl border border-lime-600 text-lime-700 hover:bg-lime-50 disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent disabled:cursor-not-allowed text-sm font-bold py-3 transition-colors ${focusRing}`}
              >
                {downloading === "pdf" ? "Preparing…" : "Download PDF"}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {imageObj
                ? "JPG for CVS, Walgreens or photo labs · PDF for home printing at 100% scale."
                : "Upload a photo to enable downloads."}
            </p>
          </div>
        </div>

        {/* Preview: first on mobile once a photo is loaded, so the result is visible right away */}
        <div
          ref={previewRef}
          className={`lg:col-span-7 bg-slate-100 p-4 sm:p-6 lg:p-8 scroll-mt-20 ${imageObj ? "order-first lg:order-none" : "hidden lg:block"}`}
        >
          <div className="lg:sticky lg:top-24 flex flex-col items-center justify-center lg:min-h-[480px]">
            {imageObj ? (
              <>
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label={`Preview: ${count} passport photos at ${photo.label} on a 4x6 inch sheet`}
                  className={`bg-white shadow-lg h-auto w-full ${fit.orientation === "portrait" ? "max-w-[240px] sm:max-w-[300px]" : "max-w-[360px] sm:max-w-[460px]"}`}
                />
                <p className="text-[11px] sm:text-xs text-slate-500 mt-3 sm:mt-4 text-center">
                  {fit.orientation === "portrait" ? "4 × 6 in" : "6 × 4 in"} · {fit.cols} × {fit.rows} grid · {count} photo{count === 1 ? "" : "s"} · {mmToPx(fit.sheetW)} × {mmToPx(fit.sheetH)} px
                </p>
                {printDpi !== null && printDpi < MIN_PRINT_DPI && (
                  <p role="status" className="mt-3 max-w-sm text-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Low resolution: this photo prints at about {printDpi} DPI and may look blurry. Use the original, full-size photo for a sharp print.
                  </p>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-[160px] sm:w-[180px] aspect-[2/3] bg-white rounded shadow-md border border-slate-200 grid grid-cols-2 grid-rows-3 gap-1.5 p-2" aria-hidden>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-sm border border-dashed border-slate-300" />
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-4">Your 4×6 sheet preview appears here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: keep downloads in reach while adjusting options */}
      {imageObj && (
        <>
          <div className="h-20 lg:hidden" aria-hidden />
          <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-white/95 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
            <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={downloading !== null}
                onClick={() => startDownload("jpg")}
                className={`rounded-xl bg-lime-600 hover:bg-lime-700 disabled:opacity-60 text-white text-sm font-bold py-3 transition-colors ${focusRing}`}
              >
                {downloading === "jpg" ? "Preparing…" : `Download JPG (${count})`}
              </button>
              <button
                type="button"
                disabled={downloading !== null}
                onClick={() => startDownload("pdf")}
                className={`rounded-xl border border-lime-600 text-lime-700 bg-white hover:bg-lime-50 disabled:opacity-60 text-sm font-bold py-3 transition-colors ${focusRing}`}
              >
                {downloading === "pdf" ? "Preparing…" : "Download PDF"}
              </button>
            </div>
          </div>
        </>
      )}

      {downloading && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4"
          onKeyDown={(e) => e.key === "Escape" && countingDown && cancelDownload()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-dialog-title"
            className="w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center"
          >
            <p className="text-5xl font-black text-lime-600 tabular-nums" aria-hidden>
              {countingDown ? secondsLeft : "✓"}
            </p>
            <h3 id="download-dialog-title" className="mt-2 text-lg font-extrabold text-slate-900">
              {countingDown
                ? `Preparing your 4×6 ${downloading.toUpperCase()}…`
                : `Your ${downloading.toUpperCase()} is downloading`}
            </h3>
            <p className="sr-only" aria-live="polite">
              {countingDown ? `Download starts in ${secondsLeft} seconds` : "Download started"}
            </p>

            <div
              className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden"
              role="progressbar"
              aria-label="Download preparation"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((countdownMs / DOWNLOAD_DELAY_MS) * 100)}
            >
              <div
                className="h-full bg-lime-500 transition-[width] duration-100 ease-linear"
                style={{ width: `${(countdownMs / DOWNLOAD_DELAY_MS) * 100}%` }}
              />
            </div>

            <ul className="mt-5 space-y-2 text-left text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-lime-600 font-bold" aria-hidden>✓</span>Print at 100% / actual size, not &quot;fit to page&quot;</li>
              <li className="flex gap-2"><span className="text-lime-600 font-bold" aria-hidden>✓</span>Use glossy or matte 4×6 photo paper</li>
              <li className="flex gap-2"><span className="text-lime-600 font-bold" aria-hidden>✓</span>Cut along the thin black crop lines</li>
            </ul>

            {countingDown ? (
              <button
                type="button"
                autoFocus
                onClick={cancelDownload}
                className={`mt-6 w-full rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold py-3 transition-colors ${focusRing}`}
              >
                Cancel
              </button>
            ) : (
              <p className="mt-6 text-xs text-slate-500">Check your downloads folder.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
