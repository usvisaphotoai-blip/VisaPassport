import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_URL, REGIONS, getRegionalPages } from "@/lib/regional-content";

const region = REGIONS.us;
const URL = `${BASE_URL}/us`;

export const metadata: Metadata = {
  title: { absolute: "US Photo Requirements: Passport, Green Card & USCIS | PixPassport" },
  description: region.hubDescription,
  alternates: { canonical: URL, languages: { [region.lang]: URL, "x-default": URL } },
  openGraph: { title: region.hubTitle, description: region.hubDescription, url: URL, siteName: "PixPassport", locale: region.ogLocale, type: "website" },
};

/** Existing U.S. tools elsewhere on the site */
const TOOLS = [
  { href: "/us-passport-photo-editor", label: "US passport photo editor", desc: "Turn a phone photo into a 2 × 2 in passport photo." },
  { href: "/us-check-photo-green-card", label: "Green card photo checker", desc: "Test a photo you already have before you mail it to USCIS." },
  { href: "/diversity-visa-lottery-photo-checker", label: "DV lottery photo checker", desc: "Check a digital photo before you upload it to the DV entry form." },
  { href: "/us-visa-photo-editor", label: "US visa photo (DS-160)", desc: "Digital photo for a U.S. visa application." },
  { href: "/2x2-picture-editor", label: "2 × 2 picture editor", desc: "Crop any photo to 2 × 2 inches for printing." },
  { href: "/usa-driver-license-photo-editor", label: "Driver's license photo", desc: "Photo rules for state driver's licenses and IDs." },
];

export default function USHub() {
  const pages = getRegionalPages("us");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: region.hubTitle,
    description: region.hubDescription,
    url: URL,
    inLanguage: region.lang,
    hasPart: pages.map((p) => ({ "@type": "Article", headline: p.h1, url: p.url })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: region.name, item: URL },
      ],
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="bg-white border-b border-slate-200">
        <Breadcrumbs items={[{ label: region.name, href: "/us" }]} />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{region.hubTitle}</h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
          Most U.S. documents use the same 2 × 2 inch photo, but the rules around it differ. Passports, USCIS forms and
          the DV lottery each set their own limits on how old the photo can be, how you send it and how many copies you
          need. Pick your document below.
        </p>

        <h2 className="mt-10 text-xl font-black text-slate-900">Photo requirement guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/us/${p.slug}`} className="block h-full rounded-xl border border-slate-200 bg-white p-4 hover:border-lime-500">
                <span className="block font-bold text-slate-900">{p.breadcrumbLabel}</span>
                <span className="mt-1 block text-sm text-slate-600">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-black text-slate-900">Photo tools</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="block h-full rounded-xl border border-slate-200 bg-white p-4 hover:border-lime-500">
                <span className="block font-bold text-slate-900">{t.label}</span>
                <span className="mt-1 block text-sm text-slate-600">{t.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
