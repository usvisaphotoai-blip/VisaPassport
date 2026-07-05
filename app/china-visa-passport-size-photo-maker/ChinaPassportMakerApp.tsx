"use client";

import { useState, useRef, useEffect } from "react";
import { compressImage } from "@/lib/compressImage";
import PreviewClient from "@/app/preview/[id]/PreviewClient";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { LocalPrice } from "@/app/preview/[id]/hooks/usePayment";

/* ─── Types ─── */
type Step = "setup" | "processing" | "preview";

/* ─── Constants ─── */
const STAGES = [
  { label: "Compressing image", icon: "🗜️" },
  { label: "Biometric analysis", icon: "👤" },
  { label: "Generating results", icon: "✨" },
];

const TIPS = [
  { icon: "☀️", tip: "Good lighting, no shadows" },
  { icon: "👤", tip: "Face camera, neutral look" },
  { icon: "📏", tip: "~1.5m (5 ft) distance" },
];

const TRUST = [
  { icon: "🔒", text: "Deleted after 24h" },
  { icon: "✅", text: "COVA Compliant" },
  { icon: "⚡", text: "Instant Result" },
];

/* ─── Sub-components ─── */
function ProcessingRing({
  stage,
  previewUrl,
}: {
  stage: number;
  previewUrl: string | null;
}) {
  return (
    <div className="relative w-36 h-36 mb-8 mx-auto">
      <div className="absolute inset-0 rounded-full bg-lime-100 animate-pulse" />
      <div className="absolute inset-1 rounded-full border-[3px] border-slate-100" />
      <div
        className="absolute inset-1 rounded-full border-[3px] border-transparent border-t-lime-500 animate-spin"
        style={{ animationDuration: "1s" }}
      />
      <div
        className="absolute inset-4 rounded-full border-[3px] border-transparent border-t-lime-300 animate-spin"
        style={{ animationDuration: "1.6s", animationDirection: "reverse" }}
      />
      <div className="absolute inset-6 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Processing"
            className={`w-full h-full object-cover transition-all duration-500 ${stage >= 2 ? "opacity-40 saturate-50" : ""}`}
          />
        ) : (
          <svg
            className="w-7 h-7 text-lime-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ChinaPassportMakerApp() {
  const [step, setStep] = useState<Step>("setup");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [photoData, setPhotoData] = useState<any>(null);
  const [localPrice, setLocalPrice] = useState<LocalPrice | null>(null);
  const [expertPrice, setExpertPrice] = useState<LocalPrice | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile) return setPreviewUrl(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    const fetchPrice = (isExpert = false) =>
      fetch(
        `/api/currency?currency=${tzCurrency}${isExpert ? "&isExpert=true" : ""}`,
      )
        .then((r) => r.json())
        .then(
          (d) =>
            d?.formatted && (isExpert ? setExpertPrice(d) : setLocalPrice(d)),
        )
        .catch(console.error);
    fetchPrice();
    fetchPrice(true);
  }, []);

  const resetToSetup = () => {
    setStep("setup");
    setSelectedFile(null);
    setPhotoData(null);
    setErrorMsg("");
    setProcessingStage(0);
  };

  const processFile = async (file: File) => {
    setErrorMsg("");
    setProcessingStage(0);
    setStep("processing");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);

    const formData = new FormData();
    formData.append("image", compressed);
    formData.append("country_code", "CN");
    formData.append("document_type", "visa");
    formData.append("source", "pixpassport_china_visa_maker");

    try {
      setProcessingStage(1);
      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.details || data.error || "Processing failed");

      setProcessingStage(2);
      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success)
        throw new Error("Failed to load generated photo details.");

      setPhotoData(photoResult.data);
      setStep("preview");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStep("setup");
      setSelectedFile(null);
      setPhotoData(null);
      setProcessingStage(0);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) await processFile(file);
  };

  /* ── PREVIEW ── */
  if (step === "preview" && photoData && localPrice && expertPrice) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto px-4 py-4 mb-2">
          <button
            onClick={resetToSetup}
            className="inline-flex items-center gap-2 text-sm font-semibold text-lime-600 hover:text-lime-700 transition-colors group"
          >
            <span className="w-7 h-7 rounded-full bg-lime-50 group-hover:bg-lime-100 flex items-center justify-center transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </span>
            Create another photo
          </button>
        </div>
        <PreviewClient
          {...{
            photoId: photoData.photoId,
            previewUrl: photoData.previewUrl,
            documentType: photoData.documentType,
            metrics: photoData.metrics,
            localPrice,
            expertPrice,
            initialIsPaid: photoData.isPaid,
          }}
        />
      </div>
    );
  }

  /* ── PROCESSING ── */
  if (step === "processing") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <ProcessingRing stage={processingStage} previewUrl={previewUrl} />
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {STAGES[processingStage].label}…
          </h2>
          <p className="text-sm text-slate-400 mb-10">
            Hang tight — almost done!
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
            {STAGES.map(({ label, icon }, i) => {
              const isDone = i < processingStage;
              const isActive = i === processingStage;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-300 ${isDone ? "bg-emerald-100 text-emerald-600" : isActive ? "bg-lime-100 text-lime-600 animate-pulse" : "bg-white text-slate-300 border border-slate-200"}`}
                  >
                    {isDone ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      icon
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium flex-1 text-left transition-colors duration-300 ${isDone ? "text-emerald-600 line-through decoration-emerald-300" : isActive ? "text-lime-700 font-semibold" : "text-slate-400"}`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="w-4 h-4 rounded-full border-2 border-lime-400 border-t-transparent animate-spin" />
                  )}
                  {isDone && (
                    <span className="text-xs font-bold text-emerald-500">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── SETUP ── */
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime-600 shadow-lg shadow-lime-200 mb-4">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          China Visa Photo Maker
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Official 33x48mm standard · COVA compliant photos in seconds
        </p>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
          <svg
            className="w-5 h-5 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold">Processing failed</p>
            <p className="text-sm mt-0.5 text-red-600">{errorMsg}</p>
          </div>
          <button
            onClick={() => setErrorMsg("")}
            className="text-red-400 hover:text-red-600 transition-colors"
            aria-label="Dismiss"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* ── Step 2: Upload ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-lime-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Upload your photo
              </p>
              <p className="text-xs text-slate-500 hidden sm:block">
                JPEG, PNG or WEBP · max 15 MB
              </p>
            </div>
          </div>

          <div className="p-5">
            <input
              ref={fileInputRef}
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 select-none ${dragOver ? "border-lime-400 bg-lime-50 scale-[1.01]" : "border-slate-200 bg-slate-50/50 hover:border-lime-300 hover:bg-lime-50/30"}`}
            >
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${dragOver ? "bg-lime-100 rotate-3" : "bg-white border border-slate-200 shadow-sm"}`}
                >
                  <svg
                    className={`w-7 h-7 transition-colors ${dragOver ? "text-lime-600" : "text-slate-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {dragOver ? "Drop it here!" : "Drag & drop your photo"}
                </p>
                <p className="text-xs text-slate-500 mb-5">
                  or tap the button below to browse
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 text-white text-sm font-bold rounded-xl hover:bg-lime-700 active:scale-95 transition-all shadow-md shadow-lime-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Choose your portrait photo
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {TIPS.map(({ icon, tip }) => (
                <div
                  key={tip}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center"
                >
                  <span className="text-xl leading-none">{icon}</span>
                  <p className="text-[11px] text-slate-500 font-medium leading-snug">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {TRUST.map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"
          >
            <span>{icon}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
