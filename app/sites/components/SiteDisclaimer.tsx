import type { SiteConfig } from "@/lib/country-sites";

// The one place the "we help you prepare, the authority decides" notice is rendered.
// The text lives in content/sites/<code>/_claims.md (siteClaims.disclaimer); pages must not repeat it.
export default function SiteDisclaimer({ site }: { site: SiteConfig }) {
  const text = site.claims.disclaimer?.text;
  if (!text) return null;
  return (
    <aside aria-label={site.ui.disclaimerLabel || undefined} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 leading-relaxed">{text}</p>
    </aside>
  );
}
