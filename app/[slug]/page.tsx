import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import specs from "../../data/countries-specs.json";
import moneyPages from "../../data/money-pages.json";
import toolPages from "../../data/tool-seo-pages.json";
import { getSpecIdFromSlug, getAllSlugs, SpecEntry, getCanonicalSlug } from "../../lib/slug-utils";
import ProgrammaticLandingPage from "../components/ProgrammaticLandingPage";
import PassportMakerApp from "../passport-size-photo-maker/PassportMakerApp";
import { getLocalPrice } from "@/lib/currency";
import Breadcrumbs from "../components/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Check for Country Specs
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);
  if (spec) {
    const localPrice = await getLocalPrice(spec.price);
    
    // Determine the user's intent from the URL
    const isVisaUrl = slug.includes("visa");
    const intentLabel = isVisaUrl ? "Visa" : "Passport";
    
    const canonicalSlug = slug; // If it's valid, it's canonical for this intent
    const baseUrl = `https://www.pixpassport.com/${canonicalSlug}`;
    
    // SEO Optimized Title & Description based on intent (High CTR & 2026 Ready)
    const title = isVisaUrl 
      ? `Official ${spec.country} Visa Photo Online (2026) | ${spec.width_mm}x${spec.height_mm}mm`
      : `Official ${spec.country} Passport Photo Maker (2026) | 100% Approved`;
    
    const description = `Get your ${spec.country} ${intentLabel.toLowerCase()} photo in 2 mins. Guaranteed acceptance or money back. AI-powered ${spec.width_mm}x${spec.height_mm}mm cropping & background check. ➜ Click to Start!`;

    return {
      title,
      description,
      keywords: [
        `${spec.country} ${intentLabel.toLowerCase()} photo online`,
        `${intentLabel} photo editor`,
        `online ${spec.country} ${intentLabel.toLowerCase()} maker`,
        `${spec.width_mm}x${spec.height_mm}mm photo online`
      ],
      alternates: { canonical: baseUrl },
      openGraph: { title, description, url: baseUrl, siteName: "PixPassport", type: "website" },
    };
  }

  // 2. Check for Money Pages
  const moneyPage = moneyPages.find((p) => p.slug === slug);
  if (moneyPage) {
    return {
      title: moneyPage.title,
      description: moneyPage.metaDescription,
      alternates: { canonical: `https://www.pixpassport.com/${slug}` },
      openGraph: { title: moneyPage.title, description: moneyPage.metaDescription, url: `https://www.pixpassport.com/${slug}`, type: "website" },
    };
  }

  // 3. Check for Tool SEO Pages
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

  // 1. Check for Tool SEO Pages (Highest Priority for specific keywords)
  const toolPage = toolPages.find((p) => p.slug === slug);
  if (toolPage) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Breadcrumbs />
        {/* ── Hero header ── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered · Free to try
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              {toolPage.h1}
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              {toolPage.metaDescription}
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
              dangerouslySetInnerHTML={{ __html: toolPage.content }}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // 2. Handle Country Specs
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);

  if (spec) {
    // ... rest of spec logic
    const localPrice = await getLocalPrice(spec.price);
    const enrichedSpec = { ...spec, local_price: localPrice };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `Official ${spec.country} ${spec.name} Photo Maker`,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "description": `Online biometric tool for ${spec.country} ${spec.name} requirements.`,
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProgrammaticLandingPage spec={enrichedSpec} slug={slug} />
      </>
    );
  }

  // 3. Handle Money Pages
  const moneyPage = moneyPages.find((p) => p.slug === slug);
  if (moneyPage) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{moneyPage.title}</h1>
          <div className="prose prose-blue lg:prose-lg" dangerouslySetInnerHTML={{ __html: moneyPage.content }} />
        </div>
      </div>
    );
  }

  notFound();
}
