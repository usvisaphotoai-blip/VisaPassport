import { notFound } from "next/navigation";
import { filterPublishedLinks, getPublishedPaths, getSiteCodes, getSiteConfig } from "@/lib/country-sites";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";

// Served at /<code>/* through the rewrites in next.config.ts. dynamicParams stays on (the default)
// so unknown slugs reach the page's notFound() and render [site]/not-found.tsx inside this layout;
// unknown site codes never get here because the rewrites only cover existing folders.

export function generateStaticParams() {
  return getSiteCodes().map((site) => ({ site }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site: code } = await params;
  const site = getSiteConfig(code);
  if (!site) notFound();
  // Nav and footer never point at draft pages
  const published = getPublishedPaths(code);
  const nav = filterPublishedLinks(site, site.nav, published);
  const footer = {
    ...site.footer,
    columns: site.footer.columns
      .map((col) => ({ ...col, links: filterPublishedLinks(site, col.links, published) }))
      .filter((col) => col.links.length > 0),
  };

  return (
    <div lang={site.lang} className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-900 focus:shadow-lg"
      >
        {site.ui.skipToContent}
      </a>
      <SiteNavbar
        basePath={site.basePath}
        homeLabel={site.ui.breadcrumbHome}
        navLabel={site.ui.mainNav}
        menuLabel={site.ui.menu}
        links={nav}
        cta={site.navCta}
      />
      <main id="main-content" className="grow">
        {children}
      </main>
      <SiteFooter site={{ ...site, footer }} />
    </div>
  );
}
