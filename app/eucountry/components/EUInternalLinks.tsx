import Link from "next/link";
import type { FullCountryData } from "../data/types";

interface EUInternalLinksProps {
  currentCountrySlugPrefix: string;
  currentSlug: string;
  allCountries: FullCountryData[];
  internalLinksTitle: string;
  relatedCountriesTitle: string;
}

export default function EUInternalLinks({
  currentCountrySlugPrefix,
  currentSlug,
  allCountries,
  internalLinksTitle,
  relatedCountriesTitle,
}: EUInternalLinksProps) {
  const currentCountry = allCountries.find(
    (c) => c.slugPrefix === currentCountrySlugPrefix
  );

  // Sister pages within same country
  const sisterPages = currentCountry?.pages.filter(
    (p) => p.slug !== currentSlug
  ) || [];

  // Other countries (pick first page from each)
  const otherCountries = allCountries
    .filter((c) => c.slugPrefix !== currentCountrySlugPrefix)
    .slice(0, 10);

  return (
    <section className="eu-links">
      <div className="eu-links-in">
        {/* Sister pages */}
        {sisterPages.length > 0 && (
          <>
            <div className="eu-head">
              <h2 className="eu-h2">{internalLinksTitle}</h2>
            </div>
            <div className="eu-links-grid">
              {sisterPages.map((page, i) => (
                <Link
                  key={i}
                  href={`/${currentCountrySlugPrefix}/${page.slug}`}
                  className="eu-link-card"
                >
                  <div className="eu-link-flag">{currentCountry?.flag}</div>
                  <div className="eu-link-t">{page.h1}</div>
                  <div className="eu-link-d">{page.metaDescription.slice(0, 100)}...</div>
                  <span className="eu-link-arrow">→</span>
                </Link>
              ))}
              {/* Static internal links to main site */}
              <Link href="/us-visa-photo" className="eu-link-card">
                <div className="eu-link-flag">🇺🇸</div>
                <div className="eu-link-t">US Visa Photo Tool</div>
                <div className="eu-link-d">Create your DS-160 compliant photo online...</div>
                <span className="eu-link-arrow">→</span>
              </Link>
              <Link href="/photo-validator" className="eu-link-card">
                <div className="eu-link-flag">✅</div>
                <div className="eu-link-t">Free Photo Validator</div>
                <div className="eu-link-d">Check your photo for free before submitting...</div>
                <span className="eu-link-arrow">→</span>
              </Link>
              <Link href="/dv-lottery-photo-2027" className="eu-link-card">
                <div className="eu-link-flag">🎰</div>
                <div className="eu-link-t">DV Lottery 2027 Photo</div>
                <div className="eu-link-d">Get your DV lottery compliant photo...</div>
                <span className="eu-link-arrow">→</span>
              </Link>
            </div>
          </>
        )}

        {/* Other countries */}
        <div className="eu-head" style={{ marginTop: "48px" }}>
          <h2 className="eu-h2">{relatedCountriesTitle}</h2>
        </div>
        <div className="eu-links-grid">
          {otherCountries.map((country, i) => {
            const firstPage = country.pages[0];
            return (
              <Link
                key={i}
                href={`/${country.slugPrefix}/${firstPage.slug}`}
                className="eu-link-card"
              >
                <div className="eu-link-flag">{country.flag}</div>
                <div className="eu-link-t">{country.nativeName}</div>
                <div className="eu-link-d">{firstPage.metaDescription.slice(0, 80)}...</div>
                <span className="eu-link-arrow">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
