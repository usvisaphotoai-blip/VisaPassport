import { Metadata } from "next";
import { notFound } from "next/navigation";
import specs from "../../data/countries-specs.json";
import { getSpecIdFromSlug, getAllSlugs, SpecEntry } from "../../lib/slug-utils";
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
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);

  if (!spec) return {};

  const localPrice = await getLocalPrice(spec.price);

  const title = `${spec.country} ${spec.name} Photo Editor | Official Size & Background`;
  const description = `Create an official ${spec.country} ${spec.name} photo online. Automatic ${spec.width_mm}x${spec.height_mm}mm cropping, background removal, and biometric validation for only ${localPrice.formatted}.`;

  return {
    title,
    description,
    keywords: [
      `${spec.country} passport photo online`,
      `${spec.name} photo editor`,
      `online ${spec.country} visa photo maker`,
      `${spec.width_mm}x${spec.height_mm}mm photo online`,
      `biometric photo for ${spec.country}`,
    ],
    alternates: {
      canonical: `https://www.pixpassport.com/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.pixpassport.com/${slug}`,
      siteName: "PixPassport",
      images: [{ url: "/og-image.jpg" }],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const specId = getSpecIdFromSlug(slug);
  const spec = (specs as SpecEntry[]).find((s) => s.id === specId);

  if (!spec) {
    notFound();
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
    "offers": {
      "@type": "Offer",
      "price": localPrice.amount.toString(),
      "priceCurrency": localPrice.currency,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1200",
    },
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
