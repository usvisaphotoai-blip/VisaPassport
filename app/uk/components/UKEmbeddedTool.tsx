"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";

export const ukDocumentsList = [
  { id: "uk-passport-online", label: "UK Passport (Digital Upload)", size: "35 × 45 mm", bg: "Light Grey / White", head: "29–34 mm" },
  { id: "uk-passport-offline", label: "UK Passport (Paper / Printed 35x45 mm)", size: "35 × 45 mm", bg: "Light Grey / White", head: "29–34 mm" },
  { id: "uk-driving", label: "UK Driving Licence (DVLA)", size: "35 × 45 mm", bg: "Plain Light Background", head: "Centered" },
  { id: "uk-visa", label: "UK Visa / Residence Permit (BRP)", size: "35 × 45 mm", bg: "Light Grey / White", head: "Biometric 70-80%" },
  { id: "uk-oyster", label: "Oyster Photocard", size: "Digital Upload", bg: "Plain Light", head: "Centered" },
  { id: "uk-railcard", label: "UK Railcard", size: "35 × 45 mm", bg: "Light Background", head: "Centered" },
  { id: "uk-bus", label: "UK Bus Pass", size: "Digital Upload", bg: "Plain Light", head: "Centered" },
  { id: "uk-bno", label: "UK BNO Passport", size: "35 × 45 mm", bg: "Light Grey / White", head: "29–34 mm" },
  { id: "uk-seamans-card", label: "British Seaman's Card", size: "35 × 45 mm", bg: "Light Grey", head: "Centered" },
  { id: "uk-firearms", label: "UK BASC Firearms Licence", size: "35 × 45 mm", bg: "Light Grey / White", head: "Centered" },
];

const STAGES = [
  { label: "Compressing image", icon: "🗜️" },
  { label: "Biometric analysis for UK (GB)", icon: "👤" },
  { label: "Generating compliant results", icon: "✨" },
];

const TRUST = [
  { icon: "🔒", text: "Deleted after 24h" },
  { icon: "✅", text: "30+ checks" },
  { icon: "🇬🇧", text: "HMPO & DVLA ready" },
];

interface UKEmbeddedToolProps {
  defaultDoc?: string;
  toolTitle?: string;
  toolSubtitle?: string;
}

export default function UKEmbeddedTool({
  defaultDoc = "uk-passport-online",
  toolTitle,
  toolSubtitle,
}: UKEmbeddedToolProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(defaultDoc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const filteredDocs = ukDocumentsList.filter((doc) =>
    doc.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDocObj = ukDocumentsList.find((d) => d.id === selectedDoc) || ukDocumentsList[0];

  const processFile = async (fileToProcess?: File) => {
    const file = fileToProcess || selectedFile;
    if (!file) return;

    setErrorMsg("");
    setIsProcessing(true);
    setProcessingStage(0);

    try {
      setProcessingStage(0); // Compressing
      const compressed = await compressImage(file);

      setProcessingStage(1); // External API for GB
      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", "GB"); // Always United Kingdom / GB
      formData.append(
        "document_type",
        selectedDoc.includes("visa") ? "visa" : "passport"
      );
      formData.append("full_doc_id", selectedDoc);
      formData.append("source", "uk_embedded_tool");

      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      setProcessingStage(2); // Finalizing
      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();

      if (!photoRes.ok || !photoResult.success) {
        throw new Error("Failed to load generated photo details.");
      }

      router.push(`/preview/${data.photoId}?from=uk`);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
  
      
      

      <div className="p-5 sm:p-4 bg-slate-50/50">
        {/* Split Grid: Step 1 (Select Document) + Step 2 (Upload Photo) */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          
          {/* STEP 1: Select Document */}
          <div className="bg-white rounded-md border border-slate-200 p-5 sm:p-6 flex flex-col justify-between ">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-lime-600 text-white font-black text-sm flex items-center justify-center  shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Select UK Document Type
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official UK HMPO, DVLA, or UKVI specification
                  </p>
                </div>
              </div>

              {/* Custom Searchable Dropdown */}
              <div className="relative mb-5" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left bg-white transition-all ${
                    isDropdownOpen
                      ? "border-lime-600 ring-2 ring-lime-200 "
                      : "border-slate-200 hover:border-slate-300 "
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl leading-none shrink-0">🇬🇧</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {activeDocObj.label}
                      </p>
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        {activeDocObj.size} · {activeDocObj.bg}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isDropdownOpen ? "rotate-180 text-lime-600" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 z-30 mt-2 bg-white border border-slate-200 rounded-xl  overflow-hidden animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <input
                        type="text"
                        placeholder="Search UK documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-300"
                        autoFocus
                      />
                    </div>
                    <ul className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                      {filteredDocs.map((doc) => (
                        <li
                          key={doc.id}
                          onClick={() => {
                            setSelectedDoc(doc.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-3 cursor-pointer text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                            selectedDoc === doc.id
                              ? "bg-lime-50 text-lime-900 font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>🇬🇧</span>
                            <span>{doc.label}</span>
                          </div>
                          <span className="text-xs text-slate-400">{doc.size}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Spec Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-lime-200 bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-800">
                  <span>📐</span> Size: <strong className="text-slate-900">{activeDocObj.size}</strong>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-lime-200 bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-800">
                  <span>🎨</span> BG: <strong className="text-slate-900">{activeDocObj.bg}</strong>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-900">
                  <span>👤</span> Head: <strong className="text-slate-900">{activeDocObj.head}</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-500">
              {TRUST.map((t) => (
                <div key={t.text} className="flex items-center gap-1">
                  <span>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: Upload Photo & Process */}
          <div className="bg-white rounded-md border border-slate-200 p-5 sm:p-6 flex flex-col justify-between ">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-lime-600 text-white font-black text-sm flex items-center justify-center  shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Upload Your Photo
                  </h3>
                  <p className="text-xs text-slate-500">
                    JPEG, PNG or WEBP · Max 15 MB
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                onChange={handleFileChange}
              />

              {isProcessing ? (
                <div className="rounded-md border-2 border-lime-400 bg-slate-50 p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-lime-600 border-t-transparent animate-spin" />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Processing preview"
                        className="w-full h-full object-cover rounded-full p-1.5"
                      />
                    )}
                  </div>
                  <p className="text-base font-bold text-slate-900 mb-1">
                    {STAGES[processingStage]?.label}…
                  </p>
                  <p className="text-xs text-slate-400 mb-4">
                    Running 30+ UK biometric checks against GB server...
                  </p>

                  <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2 text-left text-xs">
                    {STAGES.map((st, i) => {
                      const isDone = i < processingStage;
                      const isActive = i === processingStage;
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <span className={`font-semibold ${isDone ? "text-emerald-600 line-through" : isActive ? "text-lime-700" : "text-slate-400"}`}>
                            {st.icon} {st.label}
                          </span>
                          {isDone && <span className="text-emerald-600 font-bold">Done ✓</span>}
                          {isActive && <span className="text-lime-600 font-bold animate-pulse">Running…</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : selectedFile ? (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Selected photo"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="mt-2 text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <span>🗑️</span> Change photo
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`rounded-md border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? "border-lime-600 bg-lime-50"
                      : "border-slate-300 bg-slate-50/60 hover:border-lime-500 hover:bg-lime-50/30"
                  }`}
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-md bg-lime-100 text-lime-700 flex items-center justify-center text-2xl ">
                    📷
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-1">
                    Drag &amp; Drop portrait photo here
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Or click to browse from device · Free preview
                  </p>
                  <button
                    type="button"
                    className="px-5 py-2.5 bg-lime-700 hover:bg-lime-800 text-white font-bold text-xs sm:text-sm rounded-xl  transition-all"
                  >
                    Select Photo for UK Verification
                  </button>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <span>⚠️</span> {errorMsg}
              </div>
            )}

            {!isProcessing && selectedFile && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => processFile()}
                  className="w-full py-3.5 bg-lime-700 hover:bg-lime-800 text-white font-bold text-sm rounded-xl  transition-all flex items-center justify-center gap-2"
                >
                  Proceed to UK Verification →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

  );
}
