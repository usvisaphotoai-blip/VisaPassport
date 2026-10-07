"use client";

import { useState, useRef, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";
import { ukDocuments, DEFAULT_UK_DOCUMENT_ID } from "./data";

// Interactive uploader only. All indexable copy lives in page.tsx (server component).
export default function UKDocumentClient() {
  const router = useRouter();
  const listboxId = useId();
  const [selectedDoc, setSelectedDoc] = useState(DEFAULT_UK_DOCUMENT_ID);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const filteredDocs = ukDocuments.filter((doc) =>
    doc.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentDoc = ukDocuments.find((d) => d.id === selectedDoc);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const processFile = async () => {
    if (!selectedFile) return;
    setErrorMsg("");
    setIsProcessing(true);

    try {
      const compressed = await compressImage(selectedFile);

      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", "GB"); // GB for UK
      formData.append(
        "document_type",
        selectedDoc.includes("visa") ? "visa" : "passport"
      );
      formData.append("source", "uk_document_maker");

      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success) {
        throw new Error("Failed to load generated photo details.");
      }

      router.push(`/preview/${data.photoId}?from=uk-passport`);
    } catch (err) {
      setErrorMsg((err instanceof Error && err.message) || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const chooseDoc = (id: string) => {
    setSelectedDoc(id);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="p-8 sm:p-10">
        {/* Step 1: Select Document */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-600 text-white font-bold mr-3 text-sm">
              1
            </span>
            Select your UK document
          </h2>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-controls={listboxId}
              className="w-full bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors font-medium cursor-pointer hover:border-slate-400 flex items-center justify-between text-left"
            >
              <span className="truncate pr-4">
                {currentDoc?.label} {currentDoc?.size ? `(${currentDoc.size})` : ""}
              </span>
              <svg aria-hidden="true" className={`w-5 h-5 shrink-0 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="relative">
                    <svg aria-hidden="true" className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search documents..."
                      aria-label="Search UK documents"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setIsDropdownOpen(false);
                        if (e.key === "Enter" && filteredDocs[0]) chooseDoc(filteredDocs[0].id);
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-shadow"
                      autoFocus
                    />
                  </div>
                </div>
                <ul id={listboxId} role="listbox" aria-label="UK documents" className="max-h-64 overflow-auto py-2">
                  {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc) => (
                      <li
                        key={doc.id}
                        role="option"
                        aria-selected={selectedDoc === doc.id}
                        tabIndex={0}
                        onClick={() => chooseDoc(doc.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            chooseDoc(doc.id);
                          }
                        }}
                        className={`px-4 py-3 cursor-pointer text-sm transition-colors focus:outline-none focus:bg-slate-50
                          ${selectedDoc === doc.id ? "bg-lime-50 text-lime-900 font-medium" : "text-slate-700 hover:bg-slate-50"}
                        `}
                      >
                        {doc.label} {doc.size && <span className="text-slate-400 ml-1">({doc.size})</span>}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-sm text-slate-500 text-center">No documents found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Upload Photo */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-600 text-white font-bold mr-3 text-sm">
              2
            </span>
            Upload your photo
          </h2>

          {!selectedFile ? (
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload a portrait photo"
              className={`relative rounded-xl border-2 border-dashed p-12 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-500
                ${dragOver ? "border-lime-600 bg-lime-50" : "border-slate-300 hover:border-lime-500"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
              />
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <svg aria-hidden="true" className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-lg font-medium text-slate-900 mb-2">Drag & drop your portrait photo</p>
              <p className="text-sm text-slate-500 mb-6">Or click to browse from your device</p>
              <span className="inline-block px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                Select image
              </span>
            </div>
          ) : (
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-40 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Your uploaded photo"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-medium text-slate-900 mb-1 line-clamp-1">{selectedFile.name}</p>
                  <p className="text-sm text-slate-500 mb-4">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center justify-center sm:justify-start gap-1.5"
                  >
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {errorMsg && (
          <div role="alert" className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <svg aria-hidden="true" className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-rose-800">Processing failed</p>
              <p className="text-sm text-rose-600 mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Step 3: Process */}
        <div className="pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={processFile}
            disabled={!selectedFile || isProcessing}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2
              ${!selectedFile
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : isProcessing
                  ? "bg-lime-600 text-white cursor-wait"
                  : "bg-lime-600 hover:bg-lime-700 text-white"
              }
            `}
          >
            {isProcessing ? (
              <>
                <svg aria-hidden="true" className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing photo...
              </>
            ) : (
              <>
                Proceed to verification
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
