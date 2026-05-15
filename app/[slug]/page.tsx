import { Metadata } from "next";
import { notFound } from "next/navigation";
import specs from "../../data/countries-specs.json";
import moneyPages from "../../data/money-pages.json";
import toolPages from "../../data/tool-seo-pages.json";
import { getSpecIdFromSlug, getAllSlugs, SpecEntry } from "../../lib/slug-utils";
import ProgrammaticLandingPage from "../components/ProgrammaticLandingPage";
import PassportMakerApp from "../passport-size-photo-maker/PassportMakerApp";
import { getLocalPrice } from "@/lib/currency";
import Breadcrumbs from "../components/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Rich content styles (injected once per page) ────────────────────────────
const RICH_CONTENT_STYLES = `
  .rich-content {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.0625rem;
    line-height: 1.85;
    color: #475569;
  }
  .rich-content h2 {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 800;
    color: #0f172a;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  .rich-content h2:first-child { margin-top: 0; }
  .rich-content h3 {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    font-weight: 700;
    color: #1e293b;
    margin: 2rem 0 0.65rem;
    letter-spacing: -0.015em;
    line-height: 1.4;
  }
  .rich-content h4 {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #334155;
    margin: 1.5rem 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .rich-content p { margin: 0 0 1.2rem; color: #475569; }
  .rich-content p:last-child { margin-bottom: 0; }
  .rich-content strong, .rich-content b { font-weight: 700; color: #1e293b; }
  .rich-content a { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
  .rich-content a:hover { color: #1d4ed8; }
  .rich-content ul { list-style: none; padding: 0; margin: 0 0 1.2rem; }
  .rich-content ul li { position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; color: #475569; }
  .rich-content ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2563eb;
  }
  .rich-content ol { padding-left: 1.5rem; margin: 0 0 1.2rem; }
  .rich-content ol li { padding-left: 0.25rem; margin-bottom: 0.5rem; color: #475569; }
  .rich-content ol li::marker { color: #2563eb; font-weight: 700; font-family: system-ui, sans-serif; }
  .rich-content li ul, .rich-content li ol { margin: 0.4rem 0; }
  .rich-content blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2563eb;
    background: #eff6ff;
    border-radius: 0 8px 8px 0;
    color: #1e40af;
    font-style: italic;
  }
  .rich-content blockquote p { color: inherit; margin: 0; }
  .rich-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
  .rich-content code {
    background: #f1f5f9;
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-size: 0.875em;
    color: #dc2626;
    font-family: 'Fira Code', 'Courier New', monospace;
  }
  .rich-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
    font-family: system-ui, sans-serif;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }
  .rich-content th {
    background: #f8fafc;
    font-weight: 700;
    text-align: left;
    padding: 0.7rem 1rem;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .rich-content td { padding: 0.65rem 1rem; color: #475569; border-bottom: 1px solid #f1f5f9; }
  .rich-content tr:last-child td { border-bottom: none; }
  .rich-content tr:hover td { background: #f8fafc; }
  .rich-content img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
  .rich-content details {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin: 0.75rem 0;
    overflow: hidden;
  }
  .rich-content summary {
    padding: 0.875rem 1rem;
    cursor: pointer;
    font-weight: 600;
    font-family: system-ui, sans-serif;
    color: #1e293b;
    background: #f8fafc;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rich-content summary::after { content: '+'; font-size: 1.25rem; color: #2563eb; }
  .rich-content details[open] summary::after { content: '−'; }
  .rich-content details > *:not(summary) { padding: 0.875rem 1rem; color: #475569; }
  @media (max-width: 640px) {
    .rich-content { font-size: 1rem; line-height: 1.75; }
    .rich-content h2 { font-size: 1.15rem; margin: 2rem 0 0.75rem; }
    .rich-content h3 { font-size: 1rem; }
    .rich-content th, .rich-content td { padding: 0.5rem 0.75rem; }
    .rich-content table { font-size: 0.8rem; }
  }
`;

// ─── Shared stat items ────────────────────────────────────────────────────────
const STATS = [
  { value: "100+", label: "Countries" },
  { value: "30+", label: "Compliance checks" },
  { value: "< 2 min", label: "Processing time" },
  { value: "100%", label: "Compliance rate" },
];

// ─── Shared trust badges ──────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: "🔒", title: "Privacy first", desc: "Photos never stored on our servers" },
  { icon: "✅", title: "ISO compliant", desc: "Meets ICAO 9303 biometric standards" },
  { icon: "⚡", title: "Instant result", desc: "AI processing in under 10 seconds" },
  { icon: "🆓", title: "Free preview", desc: "Check before you pay anything" },
];

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);
  if (spec) {
    const isVisaUrl = slug.includes("visa");
    const intentLabel = isVisaUrl ? "Visa" : "Passport";
    const baseUrl = `https://www.pixpassport.com/${slug}`;
    const title = isVisaUrl
      ? `Official ${spec.country} Visa Photo Online (2026) | ${spec.width_mm}x${spec.height_mm}mm`
      : `Official ${spec.country} Passport Photo Maker (2026) | 100% Approved`;
    const description = `Get your ${spec.country} ${intentLabel.toLowerCase()} photo in 2 mins. Guaranteed acceptance or money back. Official ${spec.width_mm}x${spec.height_mm}mm cropping & background check. ➜ Click to Start!`;
    return {
      title,
      description,
      keywords: [
        `${spec.country} ${intentLabel.toLowerCase()} photo online`,
        `${intentLabel} photo editor`,
        `online ${spec.country} ${intentLabel.toLowerCase()} maker`,
        `${spec.width_mm}x${spec.height_mm}mm photo online`,
      ],
      alternates: { canonical: baseUrl },
      openGraph: { title, description, url: baseUrl, siteName: "PixPassport", type: "website" },
    };
  }

  const moneyPage = moneyPages.find((p) => p.slug === slug);
  if (moneyPage) {
    return {
      title: moneyPage.title,
      description: moneyPage.metaDescription,
      alternates: { canonical: `https://www.pixpassport.com/${slug}` },
      openGraph: { title: moneyPage.title, description: moneyPage.metaDescription, url: `https://www.pixpassport.com/${slug}`, type: "website" },
    };
  }

  const toolPage = toolPages.find((p) => p.slug === slug);
  if (toolPage) {
    return {
      title: toolPage.title,
      description: toolPage.metaDescription,
      alternates: { canonical: `https://www.pixpassport.com/${slug}` },
      openGraph: { title: toolPage.title, description: toolPage.metaDescription, url: `https://www.pixpassport.com/${slug}`, type: "website" },
    };
  }

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // ── 1. Tool SEO Pages ──────────────────────────────────────────────────────
  const toolPage = toolPages.find((p) => p.slug === slug);
  if (toolPage) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: RICH_CONTENT_STYLES }} />

        <div className="bg-slate-50 min-h-screen">
          <Breadcrumbs />

          {/* Tool */}
          <PassportMakerApp />

          {/* Hero */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Official Standards · Free to try
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                {toolPage.h1}
              </h1>
              <p className="text-slate-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                {toolPage.metaDescription}
              </p>

              {/* Stats grid — 2 cols mobile, 4 cols sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-8 max-w-sm mx-auto sm:max-w-none">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="bg-slate-50 rounded-xl px-3 py-3 sm:py-4 border border-slate-100">
                    <p className="text-xl sm:text-2xl font-black text-lime-600 leading-none">{value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="bg-slate-50 border-b border-slate-200 py-5 sm:py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TRUST_ITEMS.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 text-left transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-100"
                  >
                    <span className="text-xl sm:text-2xl block mb-1.5" role="img" aria-hidden="true">{icon}</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug hidden sm:block">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO rich content */}
          <div className="bg-white border-t border-slate-100 py-12 sm:py-20 mt-6 sm:mt-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                  Complete Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Detailed Guide &amp; Frequently Asked Questions
                </h2>
                <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md mx-auto">
                  Everything you need to know about creating a compliant passport photo.
                </p>
              </div>

              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: toolPage.content }}
              />
            </div>
          </div>

          {/* Footer CTA */}

        </div>
      </>
    );
  }

  // ── 2. Country Spec Pages ─────────────────────────────────────────────────
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);

  if (spec) {
    const localPrice = await getLocalPrice(spec.price, undefined, false, true);
    const enrichedSpec = { ...spec, local_price: localPrice };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Official ${spec.country} ${spec.name} Photo Maker`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      description: `Online biometric tool for ${spec.country} ${spec.name} requirements.`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProgrammaticLandingPage spec={enrichedSpec} slug={slug} />
      </>
    );
  }

  // ── 3. Money Pages ────────────────────────────────────────────────────────
  const moneyPage = moneyPages.find((p) => p.slug === slug);
  if (moneyPage) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: RICH_CONTENT_STYLES }} />
        <div className="bg-white min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
              {moneyPage.title}
            </h1>
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: moneyPage.content }}
            />
          </div>
        </div>
      </>
    );
  }

  notFound();
}