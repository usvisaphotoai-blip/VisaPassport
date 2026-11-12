"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export interface GuideToolDoc {
  /** Unique option key (several options may share one `docId`) */
  key: string;
  /** Stored as the photo's document type; must resolve in lib/specs.ts (e.g. "us-passport") */
  docId: string;
  label: string;
  size: string;
  bg: string;
  head: string;
  /** Photo API country code, e.g. "US" */
  countryCode: string;
  documentType: "passport" | "visa";
}

const STAGES = ["Compressing image", "Checking face, size and background", "Preparing your preview"];

/**
 * Upload-and-crop tool for the regional guide pages. Sends the same fields as the UK/CA embedded tools
 * to /api/external-process; the photo processing itself is unchanged.
 */
export default function GuideEmbeddedTool({
  docs,
  defaultDoc,
  from,
  title = "Make your photo",
  subtitle,
}: {
  docs: GuideToolDoc[];
  defaultDoc?: string;
  from: string;
  title?: string;
  subtitle?: string;
}) {
  const router = useRouter();
  const [docKey, setDocKey] = useState(defaultDoc && docs.some((d) => d.key === defaultDoc) ? defaultDoc : docs[0]?.key);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stage, setStage] = useState(-1);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const doc = docs.find((d) => d.key === docKey) ?? docs[0];

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function run(f: File) {
    setFile(f);
    setError("");
    try {
      setStage(0);
      const compressed = await compressImage(f);
      setStage(1);
      const form = new FormData();
      form.append("image", compressed);
      form.append("country_code", doc.countryCode);
      form.append("document_type", doc.documentType);
      form.append("full_doc_id", doc.docId);
      form.append("source", `${from}_guide_tool`);
      const res = await fetch("/api/external-process", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");
      setStage(2);
      router.push(`/preview/${data.photoId}?from=${from}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStage(-1);
    }
  }

  const busy = stage >= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-xl font-black text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor={`${from}-doc`} className="block text-sm font-bold text-slate-900 mb-2">
            1. Choose your document
          </label>
          <select
            id={`${from}-doc`}
            value={doc.key}
            onChange={(e) => setDocKey(e.target.value)}
            disabled={busy}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            {docs.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">Size: {doc.size}</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">Background: {doc.bg}</li>
            {doc.head && <li className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">Head: {doc.head}</li>}
          </ul>
        </div>

        <div>
          <p className="block text-sm font-bold text-slate-900 mb-2">2. Upload a photo</p>
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && run(e.target.files[0])}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f?.type.startsWith("image/")) run(f);
            }}
            className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
              dragOver ? "border-lime-600 bg-lime-50" : "border-slate-300 bg-slate-50 hover:border-lime-500"
            }`}
          >
            {busy ? (
              <>
                {preview && <img src={preview} alt="" className="mb-3 h-16 w-16 rounded-full object-cover" />}
                <span className="text-sm font-bold text-slate-900" role="status">
                  {STAGES[stage]}…
                </span>
              </>
            ) : (
              <>
                <span className="text-sm font-bold text-slate-900">Drop a photo here or tap to choose</span>
                <span className="mt-1 text-xs text-slate-500">JPEG, PNG, WebP or HEIC · free preview before you pay</span>
              </>
            )}
          </button>
          {error && (
            <p role="alert" className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
