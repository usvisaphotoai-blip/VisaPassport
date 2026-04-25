"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { documentTypes, bgColors } from "@/app/tool/constants";
import { compressImage } from "@/lib/compressImage";
import type { ClientDetectionResult } from "@/app/components/ClientFaceDetector";
import PreviewClient from "@/app/preview/[id]/PreviewClient";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { LocalPrice } from "@/app/preview/[id]/hooks/usePayment";

const ClientFaceDetector = dynamic(
  () => import("@/app/components/ClientFaceDetector"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500">Initializing AI…</p>
      </div>
    ),
  }
);

/* ─── tiny reusable badge ─── */
function StepBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0 transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {n}
    </span>
  );
}

/* ─── background colour pill ─── */
const BG_META: Record<string, { label: string; swatch: string }> = {
  white:        { label: "White",        swatch: "#ffffff" },
  "light-gray": { label: "Light Gray",   swatch: "#f3f4f6" },
  "light-blue": { label: "Light Blue",   swatch: "#dbeafe" },
  blue:         { label: "Blue",         swatch: "#0047ab" },
  transparent:  { label: "Transparent",  swatch: "transparent" },
  original:     { label: "Keep Original",swatch: "linear-gradient(135deg,#e2e8f0 25%,#cbd5e1 25%,#cbd5e1 50%,#e2e8f0 50%,#e2e8f0 75%,#cbd5e1 75%)" },
};

export default function PassportMakerApp() {
  const [step, setStep] = useState<"setup" | "processing" | "preview">("setup");

  // Setup State
  const [selectedDoc, setSelectedDoc] = useState("general");
  const [selectedBg, setSelectedBg] = useState("white");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  // Processing State
  const [processingStage, setProcessingStage] = useState(0); // 0-3
  const [errorMsg, setErrorMsg] = useState("");
  const originalFileRef = useRef<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Result State
  const [photoData, setPhotoData] = useState<any>(null);
  const [localPrice, setLocalPrice] = useState<LocalPrice | null>(null);

  const STAGES = [
    "Compressing image…",
    "Detecting face…",
    "Removing background…",
    "Generating passport photo…",
  ];

  // Sync background with country default
  useEffect(() => {
    const spec = documentTypes.find((d) => d.id === selectedDoc);
    if (spec?.bg_color && bgColors.some((b) => b.id === spec.bg_color)) {
      setSelectedBg(spec.bg_color as string);
    }
  }, [selectedDoc]);

  // Pre-fetch currency
  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    fetch(`/api/currency?currency=${tzCurrency}`)
      .then((r) => r.json())
      .then((d) => { if (d?.formatted) setLocalPrice(d); })
      .catch(console.error);
  }, []);

  /* ── helpers ── */
  const resetToSetup = () => {
    setStep("setup");
    setSelectedFile(null);
    setPhotoData(null);
    setErrorMsg("");
    setProcessingStage(0);
  };

  const processFile = async (file: File) => {
    setErrorMsg("");
    originalFileRef.current = file;
    setProcessingStage(0);
    setStep("processing");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) await processFile(file);
  };

  const handleDetectionComplete = useCallback(
    async (detectedFile: File, detection: ClientDetectionResult) => {
      try {
        let finalFile: File | Blob = detectedFile;

        if (selectedBg !== "original") {
          setProcessingStage(2);
          const formData = new FormData();
          formData.append("image", detectedFile);

          const bgRes = await fetch("/api/remove-bg", { method: "POST", body: formData });
          if (!bgRes.ok) {
            finalFile = detectedFile;
            console.warn("BG removal failed, using original");
          } else {
            const removedBlob = await bgRes.blob();
            if (selectedBg === "transparent") {
              finalFile = removedBlob;
            } else {
              const bgImg = new Image();
              const blobUrl = URL.createObjectURL(removedBlob);
              bgImg.src = blobUrl;
              await bgImg.decode();
              URL.revokeObjectURL(blobUrl);

              const c = document.createElement("canvas");
              const cx = c.getContext("2d")!;
              c.width = bgImg.width;
              c.height = bgImg.height;

              const colors: Record<string, string> = {
                white: "#ffffff",
                "light-gray": "#f3f4f6",
                "light-blue": "#eff6ff",
                blue: "#0047ab",
              };
              cx.fillStyle = colors[selectedBg] || "#ffffff";
              cx.fillRect(0, 0, c.width, c.height);
              cx.drawImage(bgImg, 0, 0);
              finalFile = await new Promise<Blob>((r) =>
                c.toBlob((b) => r(b!), "image/jpeg", 0.98)
              );
            }
          }
        }

        setProcessingStage(3);
        const cropFormData = new FormData();
        const isTransparent = selectedBg === "transparent";
        cropFormData.append(
          "image",
          finalFile instanceof File
            ? finalFile
            : new File([finalFile], isTransparent ? "photo.png" : "photo.jpg", {
                type: isTransparent ? "image/png" : "image/jpeg",
              })
        );
        cropFormData.append("targetBackground", selectedBg);
        cropFormData.append("type", selectedDoc);
        cropFormData.append(
          "faceData",
          JSON.stringify({
            faceBox: detection.faceBox,
            eyeCenter: detection.eyeCenter,
            chinY: detection.chinY,
            topOfHeadY: detection.topOfHeadY,
            imageDimensions: detection.imageDimensions,
          })
        );

        const cropRes = await fetch("/api/crop", { method: "POST", body: cropFormData });
        const cropData = await cropRes.json();
        if (!cropRes.ok) throw new Error(cropData.error || "Crop failed");

        const photoRes = await fetch(`/api/photo/${cropData.photoId}`);
        const photoResult = await photoRes.json();
        if (!photoRes.ok || !photoResult.success)
          throw new Error("Failed to load generated photo details.");

        setPhotoData(photoResult.data);
        setStep("preview");
      } catch (err: any) {
        setErrorMsg(err.message || "Something went wrong. Please try again.");
        resetToSetup();
      }
    },
    [selectedBg, selectedDoc]
  );

  const activeDoc = documentTypes.find((d) => d.id === selectedDoc) || documentTypes[4];
  const availableBgs = bgColors.filter((b) =>
    ["white", "light-gray", "light-blue", "blue", "transparent", "original"].includes(b.id)
  );

  /* ── PREVIEW ── */
  if (step === "preview" && photoData && localPrice) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto px-4 py-4 mb-2">
          <button
            onClick={resetToSetup}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Create another photo
          </button>
        </div>
        <PreviewClient
          photoId={photoData.photoId}
          previewUrl={photoData.previewUrl}
          documentType={photoData.documentType}
          metrics={photoData.metrics}
          localPrice={localPrice}
          initialIsPaid={photoData.isPaid}
        />
      </div>
    );
  }

  /* ── PROCESSING ── */
  if (step === "processing") {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Animated rings */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-300 animate-spin [animation-duration:1.5s]" />
          <div className="absolute inset-4 overflow-hidden rounded-full flex items-center justify-center bg-slate-100">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Processing preview" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${processingStage >= 2 ? "opacity-50" : "opacity-100"}`}
              />
            ) : (
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {STAGES[processingStage]}
        </h2>
        <p className="text-sm text-slate-500 mb-8">Our AI is working on your photo</p>

        {/* Progress steps */}
        <div className="w-full max-w-xs space-y-2">
          {STAGES.map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                  i < processingStage
                    ? "bg-green-500"
                    : i === processingStage
                    ? "bg-blue-600 animate-pulse"
                    : "bg-slate-200"
                }`}
              />
              <span
                className={`text-sm transition-colors duration-300 ${
                  i < processingStage
                    ? "text-green-600 font-medium line-through decoration-green-400"
                    : i === processingStage
                    ? "text-blue-700 font-semibold"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Hidden face detector */}
        {selectedFile && (
          <div className="opacity-0 absolute pointer-events-none w-px h-px overflow-hidden">
            <ClientFaceDetector
              file={selectedFile}
              documentType={selectedDoc}
              targetBackground={selectedBg}
              onDetectionComplete={(f, d) => {
                setProcessingStage(1);
                handleDetectionComplete(f, d);
              }}
              onCancel={resetToSetup}
            />
          </div>
        )}
      </div>
    );
  }

  /* ── SETUP ── */
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

      {/* Error banner */}
      {errorMsg && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold">Processing failed</p>
            <p className="text-sm mt-0.5 text-red-600">{errorMsg}</p>
          </div>
          <button
            onClick={() => setErrorMsg("")}
            className="ml-auto text-red-400 hover:text-red-600"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Step 1: Country / Document ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <StepBadge n={1} active />
          <div>
            <p className="text-sm font-bold text-slate-900">Select country &amp; document</p>
            <p className="text-xs text-slate-500">We'll auto-apply the correct specifications</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Country / Document type
            </label>
            <div className="relative">
              <select
                value={selectedDoc}
                onChange={(e) => setSelectedDoc(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 pr-10 font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition cursor-pointer"
              >
                {documentTypes.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.flag} {doc.label} ({doc.size})
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Spec card */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 space-y-3">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {activeDoc.flag} {activeDoc.label} requirements
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "Size", value: activeDoc.size },
                { label: "Background", value: activeDoc.bg_color },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-500 font-semibold mb-0.5">{label}</p>
                  <p className="font-bold text-slate-800 capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Step 2: Background ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <StepBadge n={2} active />
          <div>
            <p className="text-sm font-bold text-slate-900">Choose background colour</p>
            <p className="text-xs text-slate-500">AI will replace your background automatically</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {(availableBgs.length > 0 ? availableBgs : Object.entries(BG_META).map(([id, meta]) => ({ id, ...meta }))).map((bg: any) => {
              const meta = BG_META[bg.id] ?? { label: bg.label ?? bg.id, swatch: "#ffffff" };
              const isSelected = selectedBg === bg.id;
              return (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-slate-200 shrink-0"
                    style={{ background: meta.swatch }}
                  />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Step 3: Upload ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <StepBadge n={3} active />
          <div>
            <p className="text-sm font-bold text-slate-900">Upload your photo</p>
            <p className="text-xs text-slate-500">JPEG, PNG or WEBP · max 15 MB</p>
          </div>
        </div>

        <div className="p-6">
          <input
            ref={fileInputRef}
            id="photo-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 ${
              dragOver
                ? "border-blue-400 bg-blue-50 scale-[1.01]"
                : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            <div className="flex flex-col items-center justify-center py-14 px-8 text-center select-none">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                dragOver ? "bg-blue-100" : "bg-white border border-slate-200"
              }`}>
                <svg className={`w-8 h-8 transition-colors ${dragOver ? "text-blue-600" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>

              <p className="text-base font-bold text-slate-900 mb-1">
                {dragOver ? "Drop to upload" : "Drag & drop or click to browse"}
              </p>
              <p className="text-sm text-slate-500 mb-5">
                Use a front-facing photo with good lighting for best results
              </p>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Choose photo
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "☀️", tip: "Good natural lighting, no harsh shadows" },
              { icon: "👤", tip: "Face the camera directly, neutral expression" },
              { icon: "📏", tip: "Taken from ~1.5m away (5 feet)" },
            ].map(({ icon, tip }) => (
              <div key={tip} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-base leading-none mt-0.5">{icon}</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-2">
        {[
          { icon: "🔒", text: "Photos deleted after 24 h" },
          { icon: "✅", text: "30+ compliance checks" },
          { icon: "🌍", text: "100+ countries supported" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>{icon}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}