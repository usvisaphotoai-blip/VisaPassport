import { Metadata } from "next";
import PassportMakerApp from "./PassportMakerApp";
import toolPages from "../../data/tool-seo-pages.json";

export const metadata: Metadata = {
  title: "Free Passport Photo Maker Online – AI-Powered & Instant",
  description:
    "Create compliant passport photos online for free. Select your country, upload a photo, remove the background automatically, and download a print-ready passport photo instantly.",
  alternates: {
    canonical: "/passport-size-photo-maker",
  },
  openGraph: {
    title: "Free Passport Photo Maker Online",
    description:
      "Create compliant passport & visa photos online. Select your country, upload a photo, and get a print-ready photo instantly.",
    type: "website",
  },
};

export default function PassportSizePhotoMakerPage() {
  const toolPage = toolPages.find((p) => p.slug === "passport-size-photo-maker");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero header ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered · Free to try
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            {toolPage?.h1 || "Passport Photo Maker"}
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            {toolPage?.metaDescription || "Select your country, upload any photo, and get a government-compliant biometric photo in under two minutes — completely free to preview."}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { value: "100+", label: "Countries" },
              { value: "30+", label: "Compliance checks" },
              { value: "< 2 min", label: "Processing time" },
              { value: "100%", label: "AI-powered" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-blue-600">{value}</p>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool ── */}
      <PassportMakerApp />

      {/* ── SEO content ── */}
      <div className="bg-white border-t border-slate-100 py-20 mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-center">
            Detailed Guide & Frequently Asked Questions
          </h2>
          <div
            className="prose prose-premium max-w-none text-slate-700"
            dangerouslySetInnerHTML={{
              __html: toolPage?.content || ""
            }}
          />
        </div>
      </div>
    </div>
  );
}