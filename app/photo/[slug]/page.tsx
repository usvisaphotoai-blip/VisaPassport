import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";

// Load JSON data
async function getSeoTargets() {
  const filePath = path.join(process.cwd(), "data", "seo-targets.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent);
}

// Generate Static Params for SSG
export async function generateStaticParams() {
  const targets = await getSeoTargets();
  return targets.map((target: any) => ({
    slug: target.slug,
  }));
}

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const targets = await getSeoTargets();
  const target = targets.find((t: any) => t.slug === slug);
  
  if (!target) return notFound();

  return {
    title: target.title,
    description: target.metaDescription,
    openGraph: {
      title: target.title,
      description: target.metaDescription,
      type: "website",
    },
  };
}

// UI Requirements (Standard US 2x2 Specs)
const requirements = [
  { spec: "Dimensions", value: "600 × 600 pixels", detail: "Square (1:1) aspect ratio, 2x2 inches" },
  { spec: "File Size", value: "Maximum 240 KB", detail: "JPEG format only" },
  { spec: "Background", value: "Pure White", detail: "RGB (255, 255, 255) — no shadows, patterns, or gradients" },
  { spec: "Face Count", value: "Exactly 1 face", detail: "Clear, unobstructed, fully visible face" },
  { spec: "Eye Position", value: "56% – 69%", detail: "From bottom edge of the image" },
  { spec: "Head Size", value: "50% – 69%", detail: "Crown to chin as percentage of total height" },
  { spec: "Expression", value: "Neutral", detail: "Mouth closed, both eyes open, relaxed" },
  { spec: "Glasses", value: "Not Allowed", detail: "Remove all eyeglasses before taking photo" },
];

const stepByStep = [
  { step: "1", title: "Take Your Photo", desc: "Stand in front of a plain white wall or backdrop. Use natural lighting — avoid flash. Position your camera at eye level, about 4 feet away." },
  { step: "2", title: "Check Your Appearance", desc: "Remove glasses, hats, and headphones. Keep a neutral expression with your mouth closed and both eyes open." },
  { step: "3", title: "Upload & Validate", desc: "Upload your photo to our free validator. We'll check every specification including dimensions, file size, biometrics, and background color." },
  { step: "4", title: "Review Your Report", desc: "See your detailed compliance report. Each check tells you exactly what passed and what needs to be fixed." },
  { step: "5", title: "Download Compliant Photo", desc: "Pay $5.99 to unlock your processed, fully compliant photo — cropped, resized, and optimized for submission." },
];

export default async function ProgrammaticPhotoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const targets = await getSeoTargets();
  const target = targets.find((t: any) => t.slug === slug);

  if (!target) return notFound();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-lime-50 rounded-full opacity-60 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-lime-500 rounded-full" />
              <span className="text-sm font-medium text-lime-700">{target.documentType} Specs Supported</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {target.h1}{" "}
              <span className="gradient-text">{target.h1Subtitle}</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-2xl">
              {target.heroDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/tool?type=${target.redirectType}`}
                prefetch={true}
                className="bg-lime-600 text-white hover:bg-lime-700 rounded-lg px-8 py-4 text-base font-semibold transition-all shadow-lg shadow-lime-600/20 text-center"
              >
                Start Editing Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Table */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-lime-600 uppercase tracking-wider">Official Specs</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{target.documentType} Requirements</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Your photo must meet every one of these specifications to be accepted.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="hidden sm:grid grid-cols-3 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Specification</span>
                <span>Required Value</span>
                <span>Details</span>
              </div>
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 px-6 py-4 ${i < requirements.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-sm font-semibold text-slate-900">{req.spec}</span>
                  <span className="text-sm font-bold text-lime-600">{req.value}</span>
                  <span className="text-sm text-gray-500">{req.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-lime-600 uppercase tracking-wider">Step-by-Step</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">How to Get a Compliant Photo</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {stepByStep.map((s) => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-lime-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
