import { getSiteCodes, getSiteConfig } from "@/lib/country-sites";
import SiteNotFound, { type SiteNotFoundCopy } from "../components/SiteNotFound";

// Unknown slugs 404 inside the [site] layout, so the section's navbar and footer stay visible.
// not-found.tsx gets no params, so every section's copy is passed down and picked by pathname.
export default function NotFound() {
  const copy: Record<string, SiteNotFoundCopy> = {};
  for (const code of getSiteCodes()) {
    const site = getSiteConfig(code);
    if (!site) continue;
    copy[site.basePath] = {
      title: site.ui.notFoundTitle || "Page not found",
      body: site.ui.notFoundBody || "This page doesn't exist or has moved.",
      cta: site.ui.notFoundCta || site.ui.backLink || site.ui.breadcrumbHome,
      home: site.basePath,
      tool: site.navCta?.href,
      toolLabel: site.navCta?.label,
    };
  }
  return <SiteNotFound copy={copy} />;
}
