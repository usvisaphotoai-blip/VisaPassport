import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getSpecTitle, getSpecH1, getSpecMetaDescription, getSpecKeywords } from "../../lib/slug-utils";
import { getRouteBySlug, createMetadata } from "../../lib/slug-router";
import ProgrammaticLandingPage from "../components/ProgrammaticLandingPage";
import PassportMakerApp from "../passport-size-photo-maker/PassportMakerApp";
import SpecialPhotoPageClient from "../components/SpecialPhotoPageClient";
import { getLocalPrice } from "@/lib/currency";
import Breadcrumbs from "../components/Breadcrumbs";
import ToolPageRenderer from "../components/ToolPageRenderer";
import { extractFaqsFromContent } from "@/lib/tool-faqs";
import UKPageFinder from "../uk/components/UKPageFinder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
  const route = getRouteBySlug(slug);
  if (!route) return {};

  switch (route.type) {
    case "tool": {
      const toolPage = route.data;
      return createMetadata({
        title: toolPage.title,
        description: toolPage.metaDescription,
        canonical: `https://www.pixpassport.com/${slug}`,
      });
    }

    case "money": {
      const moneyPage = route.data;
      return createMetadata({
        title: moneyPage.title,
        description: moneyPage.metaDescription,
        canonical: `https://www.pixpassport.com/${slug}`,
      });
    }

    case "special": {
      const specialPage = route.data;
      const { image, ...og } = specialPage.openGraph;
      return createMetadata({
        title: specialPage.title,
        description: specialPage.metaDescription,
        canonical: `https://www.pixpassport.com/${slug}`,
        openGraph: { ...og, ...(image && { images: [{ url: image, alt: specialPage.heroTitle }] }) },
      });
    }

    case "spec": {
      const { data: spec, canonicalSlug, isVisaUrl } = route;
      const intentLabel = isVisaUrl ? "Visa" : "Passport";
      const baseUrl = `https://www.pixpassport.com/${canonicalSlug}`;

      let defaultTitle = isVisaUrl
        ? `${spec.country} Visa Photo Online (2026) | ${spec.width_mm}x${spec.height_mm}mm`
        : `${spec.country} Passport Photo Maker (2026) | 100% Approved`;

      let defaultDescription = `Create your ${spec.country} ${intentLabel.toLowerCase()} photo online in 2 mins. ${spec.width_mm}x${spec.height_mm}mm with automatic cropping and background checks.`;

      let keywords = [
        `${spec.country} ${intentLabel.toLowerCase()} photo online`,
        `${intentLabel} photo editor`,
        `online ${spec.country} ${intentLabel.toLowerCase()} maker`,
        `${spec.width_mm}x${spec.height_mm}mm photo online`,
      ];

      if (canonicalSlug === "us-passport-photo-editor") {
        defaultTitle = "US Passport Photo Checker & 2x2 Maker Online Free | 51x51mm Tool";
        defaultDescription = "Consolidated US passport photo checker and 2×2 maker. Convert selfies to official 2×2 inch / 51×51 mm (600×600 px) US passport photos with biometric check, 240KB limit, and rejection checklist.";
        keywords = [
          "us passport photo tool",
          "2x2 picture size online free",
          "2x2 photo maker",
          "us passport photo checker",
          "us passport photo size",
          "america passport photo size",
          "american passport picture size",
        ];
      }

      const customTitle = getSpecTitle(spec, isVisaUrl);
      const customDescription = getSpecMetaDescription(spec, isVisaUrl);
      const customKeywords = getSpecKeywords(spec, isVisaUrl);

      const title = customTitle || defaultTitle;
      const description = customDescription || defaultDescription;
      if (customKeywords && customKeywords.length > 0) {
        keywords = customKeywords;
      }

      return createMetadata({
        title,
        description,
        canonical: baseUrl,
        keywords,
      });
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  switch (route.type) {
    case "tool": {
      const toolPage = route.data;
      const isIcaoPage = slug.startsWith("icao-");
      let defaultDoc = (toolPage as any).defaultDoc;
      if (!defaultDoc) {
        if (isIcaoPage) defaultDoc = "icao-passport";
        else if (slug.includes("china")) defaultDoc = "china-passport";
        else if (slug.includes("dubai")) defaultDoc = "uae-passport";
        else if (slug.includes("uk")) defaultDoc = "uk-passport";
        else defaultDoc = "uk-passport";
      }

      const pageUrl = `https://www.pixpassport.com/${slug}`;
      const { faqs } = extractFaqsFromContent(toolPage.content);
      const toolSchemas = [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: toolPage.h1,
          description: toolPage.metaDescription,
          url: pageUrl,
          applicationCategory: "PhotographyApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
            { "@type": "ListItem", position: 2, name: toolPage.h1, item: pageUrl },
          ],
        },
        ...(faqs.length > 0
          ? [{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }]
          : []),
      ];

      return (
        <div className="bg-slate-50 min-h-screen">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchemas) }}
          />
          <Breadcrumbs />

          {/* Tool */}
          <PassportMakerApp
            title={toolPage.h1}
            subtitle={toolPage.metaDescription}
            img={(toolPage as any).img}
            defaultDoc={defaultDoc}
            hideDocSelector={isIcaoPage}
            isIcaoPage={isIcaoPage}
          />

          {/* Hero */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Official Standards · Free to try
              </div>

              {/* Stats grid */}
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

        

          {/* SEO rich content */}
          <div className="bg-white border-t border-slate-200/80 py-12 sm:py-16 mt-6 sm:mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-lime-50 border border-lime-200 text-lime-700 text-xs font-extrabold uppercase tracking-wider mb-3">
                  Complete Biometric Guide
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Detailed Guide &amp; Frequently Asked Questions
                </h2>
                <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md mx-auto font-medium">
                  Everything you need to know about creating a compliant passport photo.
                </p>
              </div>

              <ToolPageRenderer html={toolPage.content} />
            </div>
          </div>
          {slug === "uk-passport-photo-requirements-tool" && <UKPageFinder current="/uk-passport-photo-requirements-tool" />}
        </div>
      );
    }

    case "spec": {
      const spec = route.data;
      const isVisaUrl = route.isVisaUrl;
      const localPrice = await getLocalPrice(spec.price, undefined, false, true);
      const enrichedSpec = { ...spec, local_price: localPrice };

      const customTitle = getSpecTitle(spec, isVisaUrl);
      const customDescription = getSpecMetaDescription(spec, isVisaUrl);
      const customH1 = getSpecH1(spec, isVisaUrl);

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: customH1 || customTitle || `Official ${spec.country} ${spec.name} Photo Maker`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        description: customDescription || `Online biometric tool for ${spec.country} ${spec.name} requirements.`,
      };

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <ProgrammaticLandingPage spec={enrichedSpec} slug={slug} />
          {route.canonicalSlug === "uk-passport-photo-editor" && <UKPageFinder current="/uk-passport-photo-editor" />}
        </>
      );
    }

    case "money": {
      const moneyPage = route.data;
      return (
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
      );
    }

    case "special": {
      const specialPage = route.data;
      const pageUrl = `https://www.pixpassport.com/${slug}`;
      const specialSchemas = [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          url: pageUrl,
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          ...specialPage.jsonLd,
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: specialPage.title,
          url: pageUrl,
          description: specialPage.metaDescription,
          isPartOf: { "@type": "WebSite", name: "PixPassport", url: "https://www.pixpassport.com/" },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: specialPage.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
            { "@type": "ListItem", position: 2, name: specialPage.breadcrumbLabel ?? specialPage.title, item: pageUrl },
          ],
        },
      ];
      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(specialSchemas) }}
          />
          <SpecialPhotoPageClient {...specialPage} slug={slug} />
        </>
      );
    }
  }
}