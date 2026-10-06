"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import type { SiteToolDocument } from "@/lib/country-sites";

interface SiteEmbeddedToolProps {
  siteCode: string;
  /** Curated presets from _site.md, shown first */
  documents: SiteToolDocument[];
  /** Every country the photo API supports */
  countries: SiteToolDocument[];
  defaultDoc: string;
  trust: string[];
  title?: string;
  subtitle?: string;
  ui: Record<string, string>;
}

const STAGE_ICONS = ["🗜️", "👤", "✨"];
const TRUST_ICONS = ["🔒", "✅", "⚡"];

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export default function SiteEmbeddedTool({
  siteCode,
  documents,
  countries,
  defaultDoc,
  trust,
  title,
  subtitle,
  ui,
}: SiteEmbeddedToolProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(defaultDoc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [stage, setStage] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stages = [ui.toolStageCompress, ui.toolStageAnalyse, ui.toolStageFinish];
  const isProcessing = stage >= 0;
  const allDocs = useMemo(() => [...documents, ...countries], [documents, countries]);
  const activeDoc = allDocs.find((d) => d.id === selectedDoc) || allDocs[0];

  const groups = useMemo(() => {
    const q = normalize(searchQuery.trim());
    const match = (d: SiteToolDocument) => !q || normalize(`${d.label} ${d.size}`).includes(q);
    return [
      { key: "popular", heading: ui.toolPopular, items: documents.filter(match) },
      { key: "all", heading: ui.toolAllCountries, items: countries.filter(match) },
    ].filter((g) => g.items.length > 0);
  }, [searchQuery, documents, countries, ui.toolPopular, ui.toolAllCountries]);

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

  const selectDoc = (id: string) => {
    setSelectedDoc(id);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const processFile = async (file: File) => {
    setSelectedFile(file);
    setErrorMsg("");
    try {
      setStage(0);
      const compressed = await compressImage(file);

      setStage(1);
      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", activeDoc.countryCode);
      formData.append("document_type", activeDoc.documentType || "passport");
      formData.append("full_doc_id", activeDoc.id);
      formData.append("source", `${siteCode}_embedded_tool`);

      const res = await fetch("/api/external-process", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details?.message || data.error || ui.toolError);

      setStage(2);
      router.push(`/preview/${data.photoId}?from=${siteCode}`);
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : ui.toolError);
      setStage(-1);
    }
  };

  const stepHeader = (n: number, heading: string, hint?: string) => (
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
      <div className="w-8 h-8 rounded-xl bg-lime-600 text-white font-black text-sm flex items-center justify-center shrink-0">
        {n}
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 leading-tight">{heading}</h3>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    </div>
  );

  return (
    <section aria-labelledby="tool-title">
      <div className="mb-4 px-1">
        <h2 id="tool-title" className="text-xl sm:text-2xl font-black text-slate-900">
          {title || ui.toolTitle}
        </h2>
        {(subtitle || ui.toolSubtitle) && <p className="mt-1 text-sm text-slate-600">{subtitle || ui.toolSubtitle}</p>}
      </div>

      <div className="p-3 sm:p-4 bg-slate-50/50">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* STEP 1: Select document / country */}
          <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              {stepHeader(1, ui.toolStep1, ui.toolStep1Hint)}

              <div className="relative mb-5" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isProcessing}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-label={ui.toolStep1}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left bg-white transition-all ${
                    isDropdownOpen ? "border-lime-600 ring-2 ring-lime-200" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span aria-hidden="true" className="text-2xl leading-none shrink-0">
                      {activeDoc.flag || "🌍"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{activeDoc.label}</p>
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        {activeDoc.size} · {activeDoc.background}
                      </p>
                    </div>
                  </div>
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180 text-lime-600" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 z-30 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <input
                        type="search"
                        placeholder={ui.toolSearch}
                        aria-label={ui.toolSearch}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setIsDropdownOpen(false);
                          if (e.key === "Enter" && groups[0]?.items[0]) selectDoc(groups[0].items[0].id);
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-300"
                        autoFocus
                      />
                    </div>
                    <div role="listbox" aria-label={ui.toolStep1} className="max-h-72 overflow-y-auto">
                      {groups.length === 0 && <p className="px-4 py-6 text-center text-xs text-slate-500">{ui.toolNoResults}</p>}
                      {groups.map((group) => (
                        <div key={group.key} role="group" aria-label={group.heading}>
                          <p className="sticky top-0 bg-white/95 backdrop-blur px-4 pt-3 pb-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                            {group.heading} <span className="font-semibold">({group.items.length})</span>
                          </p>
                          <ul className="divide-y divide-slate-100">
                            {group.items.map((doc) => (
                              <li key={`${group.key}-${doc.id}`}>
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={selectedDoc === doc.id}
                                  onClick={() => selectDoc(doc.id)}
                                  className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-3 ${
                                    selectedDoc === doc.id ? "bg-lime-50 text-lime-900 font-bold" : "text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  <span className="flex items-center gap-2 min-w-0">
                                    <span aria-hidden="true">{doc.flag || "🌍"}</span>
                                    <span className="truncate">{doc.label}</span>
                                  </span>
                                  <span className="text-xs text-slate-400 shrink-0">{doc.size.split(" · ")[0]}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <dl className="flex flex-wrap gap-2 text-xs font-semibold">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-lime-200 bg-lime-50 px-2.5 py-1 text-lime-800">
                  <span aria-hidden="true">📐</span>
                  <dt>{ui.toolSize}:</dt>
                  <dd className="text-slate-900 font-bold">{activeDoc.size}</dd>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-lime-200 bg-lime-50 px-2.5 py-1 text-lime-800">
                  <span aria-hidden="true">🎨</span>
                  <dt>{ui.toolBackground}:</dt>
                  <dd className="text-slate-900 font-bold">{activeDoc.background}</dd>
                </div>
                {activeDoc.head && (
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-purple-900">
                    <span aria-hidden="true">👤</span>
                    <dt>{ui.toolHead}:</dt>
                    <dd className="text-slate-900 font-bold">{activeDoc.head}</dd>
                  </div>
                )}
              </dl>
            </div>

            <ul className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
              {trust.map((t, i) => (
                <li key={t} className="flex items-center gap-1 whitespace-nowrap">
                  <span aria-hidden="true">{TRUST_ICONS[i % TRUST_ICONS.length]}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* STEP 2: Upload */}
          <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              {stepHeader(2, ui.toolStep2, ui.toolFormats)}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) processFile(file);
                }}
              />

              {isProcessing ? (
                <div className="rounded-md border-2 border-lime-400 bg-slate-50 p-6 text-center" role="status" aria-live="polite">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-lime-600 border-t-transparent animate-spin" />
                    {previewUrl && <img src={previewUrl} alt="" className="w-full h-full object-cover rounded-full p-1.5" />}
                  </div>
                  <p className="text-base font-bold text-slate-900 mb-4">{stages[stage]}…</p>
                  <ol className="bg-white rounded-xl p-3 border border-slate-200 space-y-2 text-left text-xs">
                    {stages.map((label, i) => (
                      <li key={label} className="flex items-center justify-between gap-2">
                        <span
                          className={`font-semibold ${
                            i < stage ? "text-emerald-600 line-through" : i === stage ? "text-lime-700" : "text-slate-400"
                          }`}
                        >
                          <span aria-hidden="true">{STAGE_ICONS[i]}</span> {label}
                        </span>
                        {i < stage && <span className="text-emerald-600 font-bold">✓</span>}
                        {i === stage && <span className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file?.type.startsWith("image/")) processFile(file);
                  }}
                  className={`rounded-md border-2 border-dashed p-5 sm:p-8 text-center cursor-pointer transition-all ${
                    dragOver ? "border-lime-600 bg-lime-50" : "border-slate-300 bg-slate-50/60 hover:border-lime-500 hover:bg-lime-50/30"
                  }`}
                >
                  <div aria-hidden="true" className="w-14 h-14 mx-auto mb-3 rounded-md bg-lime-100 text-lime-700 flex items-center justify-center text-2xl">
                    📷
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{ui.toolDrop}</p>
                  {ui.toolDropHint && <p className="text-xs text-slate-500 mb-4">{ui.toolDropHint}</p>}
                  <span className="inline-block px-5 py-2.5 bg-lime-700 hover:bg-lime-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all">
                    {ui.toolButton}
                  </span>
                </div>
              )}
            </div>

            {errorMsg && (
              <p role="alert" className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> {errorMsg}
              </p>
            )}
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">{ui.toolDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
