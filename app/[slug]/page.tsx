import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import specs from "../../data/countries-specs.json";
import moneyPages from "../../data/money-pages.json";
import { getSpecIdFromSlug, getAllSlugs, SpecEntry, getCanonicalSlug } from "../../lib/slug-utils";
import ProgrammaticLandingPage from "../components/ProgrammaticLandingPage";
import { getLocalPrice } from "@/lib/currency";

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
    
    // SEO Optimized Title & Description based on intent
    const title = `${spec.country} ${intentLabel} Photo Editor | Official Size & Background`;
    const description = `Create an official ${spec.country} ${intentLabel} photo online. Automatic ${spec.width_mm}x${spec.height_mm}mm cropping, background removal, and biometric validation for only ${localPrice.formatted}.`;

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

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Handle Country Specs
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);

  if (spec) {
    // Determine the user's intent from the URL
    const isVisaUrl = slug.includes("visa");
    const intentSuffix = isVisaUrl ? "visa" : "passport";
    
    // Construct the expected canonical slug for this specific country and intent
    const countryBase = spec.country.toLowerCase().replace(/\s+/g, "-");
    const expectedPrefix = specs.find(s => s.id === "us-visa" && spec.country === "United States") ? "us" : countryBase;
    
    // Actually, let's use a simpler check: 
    // If the slug is for visa but spec is for passport, that's fine (fallback).
    // We only redirect if the WHOLE slug doesn't match the canonical pattern.
    // e.g. /united-states-visa-photo-editor -> /us-visa-photo-editor
    
    // Use the short ID normalization to find the "true" base
    const shortId = slug.replace("-passport-photo-editor", "").replace("-visa-photo-editor", "");
    const normalizedTarget = slug.includes("visa") ? `${shortId}-visa-photo-editor` : `${shortId}-passport-photo-editor`;
    
    // We strictly want to ensure the target uses the most SEO-friendly short ID (e.g. 'us' not 'united-states')
    // But since getAllSlugs() already generates them correctly, we can just check if slug is one of the valid ones.
    
    if (slug !== normalizedTarget) {
       // Only redirect if something is really weird, but for now let's trust the canonicalSlug logic in metadata.
    }

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

  // 2. Handle Money Pages
  const moneyPage = moneyPages.find((p) => p.slug === slug);
  if (moneyPage) {
    // For now use the same landing page logic or a generic view
    // You can customize this later to show the money page content specifically
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
