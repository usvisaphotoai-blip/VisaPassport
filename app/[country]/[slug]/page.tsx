import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocalPrice } from "@/lib/currency";
import { allCountries, getCountryBySlugPrefix, getPageBySlug, priceDisplay } from "@/app/eucountry/data/countries";
import "@/app/eucountry/eucountry.css";

import EUHero from "@/app/eucountry/components/EUHero";
import EUSections from "@/app/eucountry/components/EUSections";
import EUContentBody from "@/app/eucountry/components/EUContentBody";
import EUFAQ from "@/app/eucountry/components/EUFAQ";
import EUInternalLinks from "@/app/eucountry/components/EUInternalLinks";

/* ── Static params for ISR ── */
export async function generateStaticParams() {
  const params: { country: string; slug: string }[] = [];
  for (const c of allCountries) {
    for (const p of c.pages) {
      params.push({ country: c.slugPrefix, slug: p.slug });
    }
  }
  return params;
}

/* ── Dynamic metadata ── */
type PageParams = { params: Promise<{ country: string; slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, slug } = await params;
  const countryData = getCountryBySlugPrefix(country);
  if (!countryData) return {};
  const page = getPageBySlug(countryData, slug);
  if (!page) return {};

  const url = `https://www.usvisaphotoai.pro/${countryData.slugPrefix}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.metaKeywords,
    alternates: {
      canonical: url,
      languages: {
        "x-default": `https://www.usvisaphotoai.pro/en-gb/${
          allCountries.find((c) => c.slugPrefix === "en-gb")?.pages[
            countryData.pages.findIndex((cp) => cp.slug === page.slug)
          ]?.slug || "us-visa-photo-requirements"
        }`,
        ...Object.fromEntries(
          allCountries.map((c) => {
            const currentIdx = countryData.pages.findIndex((cp) => cp.slug === page.slug);
            const matchingPage = c.pages[currentIdx];
            return [
              c.locale.replace("_", "-"),
              matchingPage
                ? `https://www.usvisaphotoai.pro/${c.slugPrefix}/${matchingPage.slug}`
                : `https://www.usvisaphotoai.pro/${c.slugPrefix}/${c.pages[0].slug}`,
            ];
          })
        ),
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "USVisaPhotoAI",
      locale: countryData.locale,
      type: "website",
      images: [
        {
          url: "https://www.usvisaphotoai.pro/og-image.png",
          width: 1200,
          height: 630,
          alt: page.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ── Page component ── */
export default async function EUCountryPage({ params }: PageParams) {
  const { country, slug } = await params;
  const countryData = getCountryBySlugPrefix(country);
  if (!countryData) notFound();
  const page = getPageBySlug(countryData, slug);
  if (!page) notFound();

  // If the user wants ALL European countries (except UK) to use Euro, 
  // we will map their actual currency string to EUR if they are not GBP.
  const overrideCurrency = countryData.currency === "GBP" ? "GBP" : "EUR";
  const localPrice = await getLocalPrice(5.99, overrideCurrency);
  const price = localPrice.formatted;

  /* FAQ schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* Breadcrumb schema */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.usvisaphotoai.pro" },
      {
        "@type": "ListItem",
        position: 2,
        name: countryData.nativeName,
        item: `https://www.usvisaphotoai.pro/${countryData.slugPrefix}/${countryData.pages[0].slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
        item: `https://www.usvisaphotoai.pro/${countryData.slugPrefix}/${page.slug}`,
      },
    ],
  };

  return (
    <div className="eu-root">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="eu-breadcrumb" aria-label="Breadcrumb">
        <div className="eu-breadcrumb-in">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href={`/${countryData.slugPrefix}/${countryData.pages[0].slug}`}>
            {countryData.flag} {countryData.nativeName}
          </Link>
          <span>›</span>
          <span>{page.h1}</span>
        </div>
      </nav>

      {/* Hero */}
      <EUHero
        h1={page.h1}
        description={page.heroDescription}
        ctaText={page.ctaText}
        ctaSecondaryText={page.ctaSecondaryText}
        flag={countryData.flag}
        countryName={countryData.nativeName}
        trustBadges={countryData.strings.trustBadges}
      />

      {/* Sections (steps, specs, pricing, privacy) */}
      <EUSections strings={countryData.strings} price={price} />

      {/* Long-form SEO content */}
      <EUContentBody sections={page.contentSections} />

      {/* FAQ */}
      <EUFAQ faqs={page.faqs} title={countryData.strings.faqTitle} />

      {/* Internal links */}
      <EUInternalLinks
        currentCountrySlugPrefix={countryData.slugPrefix}
        currentSlug={page.slug}
        allCountries={allCountries}
        internalLinksTitle={countryData.strings.internalLinksTitle}
        relatedCountriesTitle={countryData.strings.relatedCountriesTitle}
      />

      {/* Final CTA */}
      <section className="eu-sec eu-sec-dk eu-final">
        <h2 className="eu-final-h2">{countryData.strings.ctaTitle}</h2>
        <p className="eu-final-p">{countryData.strings.ctaDescription}</p>
        <Link href="/tool?type=us-visa" className="eu-btn-final">
          {countryData.strings.ctaButton} →
        </Link>
        <p className="eu-final-note">No account required • Free validation</p>
      </section>
    </div>
  );
}
