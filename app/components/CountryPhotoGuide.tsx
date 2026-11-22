import type { ReactNode } from "react";
import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";

/*
 * Shared layout for standalone country photo guides (/<country>-passport-photo-size, ...).
 * Same visual style as /sri-lanka-passport-photo-size. Each page passes its own content;
 * metadata stays in the page file because Next.js needs the `metadata` export there.
 */

const SITE = "https://www.pixpassport.com";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg";

export const GUIDE_OG_IMAGE = OG_IMAGE;

export type GuideBlock =
  | { type: "paragraphs"; items: ReactNode[] }
  | { type: "table"; caption: string; head: string[]; rows: ReactNode[][] }
  | { type: "cards"; cols?: 2 | 3; items: { title: string; body: ReactNode }[] }
  | { type: "list"; ordered?: boolean; items: ReactNode[] }
  | { type: "callout"; title: string; body: ReactNode; tone?: "amber" | "rose" }
  | { type: "subheading"; text: string };

export interface GuideSection {
  id: string;
  nav: string;
  title: string;
  intro?: ReactNode;
  blocks: GuideBlock[];
}

export interface CountryPhotoGuideProps {
  pageUrl: string;
  title: string;
  description: string;
  h1: string;
  flag: string;
  datePublished: string;
  dateModified: string;
  breadcrumb: { label: string; href?: string }[];
  quickAnswer: ReactNode;
  heroNotes?: ReactNode[];
  cta: { href: string; label: string; note?: string };
  specCards: { label: string; value: string; note: string }[];
  /** Optional to-scale photo diagram; facePct draws the face zone when the rules give one */
  diagram?: { widthMm: number; heightMm: number; facePct?: [number, number]; label: string };
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  /** Country-specific FAQ heading, e.g. "Irish Passport Photo FAQs" */
  faqTitle: string;
  sources: { href: string; label: string; note: string }[];
  sourcesNote: ReactNode;
  related: { href: string; label: string }[];
  bottomCta: { title: string; text: string; label: string; href: string };
}

/* ───────────── Pieces ───────────── */

function PhotoDiagram({ widthMm: w, heightMm: h, facePct, label }: NonNullable<CountryPhotoGuideProps["diagram"]>) {
  const faceTop = h * 0.09;
  const faceH = facePct ? (h * (facePct[0] + facePct[1])) / 200 : 0;
  return (
    <svg viewBox={`-14 -6 ${w + 31} ${h + 17}`} className="w-full max-w-[260px] h-auto" role="img" aria-labelledby="guide-diagram-title">
      <title id="guide-diagram-title">{label}</title>
      <rect x="0" y="0" width={w} height={h} rx="0.6" fill="#eef6ff" stroke="#0f172a" strokeWidth="0.5" />
      {facePct && (
        <rect x="2" y={faceTop} width={w - 4} height={faceH} fill="none" stroke="#65a30d" strokeWidth="0.35" strokeDasharray="1 0.8" />
      )}
      <ellipse cx={w / 2} cy={h * 0.44} rx={w * 0.26} ry={h * 0.27} fill="#cbd5e1" />
      <path d={`M${w * 0.11} ${h} C${w * 0.17} ${h * 0.8} ${w * 0.34} ${h * 0.73} ${w / 2} ${h * 0.73} C${w * 0.66} ${h * 0.73} ${w * 0.83} ${h * 0.8} ${w * 0.89} ${h} Z`} fill="#cbd5e1" />
      <line x1="0" y1={h + 5} x2={w} y2={h + 5} stroke="#475569" strokeWidth="0.3" />
      <line x1="0" y1={h + 3.5} x2="0" y2={h + 6.5} stroke="#475569" strokeWidth="0.3" />
      <line x1={w} y1={h + 3.5} x2={w} y2={h + 6.5} stroke="#475569" strokeWidth="0.3" />
      <text x={w / 2} y={h + 10} textAnchor="middle" fontSize="3.4" fill="#0f172a" fontWeight="700">
        {w} mm ({w / 10} cm)
      </text>
      <line x1="-4" y1="0" x2="-4" y2={h} stroke="#475569" strokeWidth="0.3" />
      <line x1="-5.5" y1="0" x2="-2.5" y2="0" stroke="#475569" strokeWidth="0.3" />
      <line x1="-5.5" y1={h} x2="-2.5" y2={h} stroke="#475569" strokeWidth="0.3" />
      <text x="-7" y={h / 2} textAnchor="middle" fontSize="3.4" fill="#0f172a" fontWeight="700" transform={`rotate(-90 -7 ${h / 2})`}>
        {h} mm ({h / 10} cm)
      </text>
      {facePct && (
        <>
          <text x={w + 2} y="6" fontSize="2.6" fill="#4d7c0f">face</text>
          <text x={w + 2} y="9" fontSize="2.6" fill="#4d7c0f">
            {facePct[0] === facePct[1] ? `${facePct[0]}%+` : `${facePct[0]}–${facePct[1]}%`}
          </text>
        </>
      )}
    </svg>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "paragraphs":
      return (
        <div className="space-y-3">
          {block.items.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-slate-600 leading-relaxed">{p}</p>
          ))}
        </div>
      );
    case "subheading":
      return <h3 className="font-bold text-slate-900 text-base">{block.text}</h3>;
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-slate-900 text-white">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="p-4 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 ? "bg-slate-50" : undefined}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="p-4 font-semibold text-slate-900">{cell}</th>
                    ) : (
                      <td key={c} className="p-4 text-slate-700">{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cards":
      return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${block.cols === 3 ? "lg:grid-cols-3" : ""} gap-4 sm:gap-5`}>
          {block.items.map((c) => (
            <div key={c.title} className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900 text-base mb-2">{c.title}</h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-2">{c.body}</div>
            </div>
          ))}
        </div>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={`space-y-2.5 text-sm sm:text-base text-slate-700 leading-relaxed pl-5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
    }
    case "callout":
      return (
        <div className={`p-5 rounded-2xl border ${block.tone === "rose" ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"}`}>
          <h3 className="font-bold text-slate-900 text-sm mb-1">{block.title}</h3>
          <div className="text-sm text-slate-700 leading-relaxed">{block.body}</div>
        </div>
      );
  }
}

/* ───────────── Layout ───────────── */

export default function CountryPhotoGuide(props: CountryPhotoGuideProps) {
  const { pageUrl, cta } = props;
  const crumbs = [{ label: "Home", href: "/" }, ...props.breadcrumb];
  const updated = new Date(`${props.dateModified}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE}/#organization`, name: "PixPassport", url: `${SITE}/`, logo: `${SITE}/logo.png` },
      { "@type": "WebSite", "@id": `${SITE}/#website`, name: "PixPassport", url: `${SITE}/`, publisher: { "@id": `${SITE}/#organization` } },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: props.h1,
        description: props.description,
        inLanguage: "en",
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
        image: OG_IMAGE,
        mainEntityOfPage: pageUrl,
        isPartOf: { "@id": `${SITE}/#website` },
        citation: props.sources.map((s) => s.href),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: c.href ? `${SITE}${c.href === "/" ? "/" : c.href}` : pageUrl,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: props.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const jumpLinks = [...props.sections.map((s) => ({ href: `#${s.id}`, label: s.nav })), { href: "#faq", label: "FAQ" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 bg-slate-50">
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
                  {last || !c.href ? (
                    <span className="text-slate-900 font-semibold" aria-current={last ? "page" : undefined}>{c.label}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-lime-700">{c.label}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* ── HERO + QUICK ANSWER ── */}
      <section aria-labelledby="page-title" className="bg-white pt-10 pb-10 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-lime-800 bg-lime-50 border border-lime-200 px-3 py-1 rounded-full mb-4">
            <span aria-hidden="true">{props.flag}</span> Updated {updated}
          </p>
          <h1 id="page-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl">
            {props.h1}
          </h1>

          <div className={`mt-6 grid grid-cols-1 ${props.diagram ? "lg:grid-cols-[1fr_auto]" : ""} gap-8 items-center`}>
            <div>
              <div className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">{props.quickAnswer}</div>
              {props.heroNotes?.map((n, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed max-w-2xl mt-3">{n}</p>
              ))}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-700"
                >
                  {cta.label}
                </Link>
                {props.sections[0] && (
                  <a href={`#${props.sections[0].id}`} className="text-sm font-semibold text-slate-700 underline hover:text-lime-800">
                    See the details
                  </a>
                )}
              </div>
              {cta.note && <p className="text-xs text-slate-500 mt-3">{cta.note}</p>}
            </div>
            {props.diagram && (
              <div className="flex justify-center">
                <PhotoDiagram {...props.diagram} />
              </div>
            )}
          </div>

          <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {props.specCards.map((c) => (
              <div key={c.label} className="rounded-2xl border border-lime-200 bg-lime-50 p-4 sm:p-5">
                <dt className="text-xs font-semibold text-lime-800">{c.label}</dt>
                <dd className="text-lg sm:text-2xl font-black text-slate-900 mt-1">{c.value}</dd>
                <dd className="text-xs text-slate-600 mt-0.5">{c.note}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-lime-100 hover:text-lime-800 px-3.5 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      {props.sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-heading`}
          className={`py-12 lg:py-16 border-b border-slate-200 scroll-mt-20 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id={`${s.id}-heading`} className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              {s.title}
            </h2>
            {s.intro && <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">{s.intro}</p>}
            <div className="space-y-6">
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── FAQ ── */}
      <section id="faq" aria-labelledby="faq-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            {props.faqTitle}
          </h2>
          <FaqAccordion faqs={props.faqs} />
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section aria-labelledby="sources-heading" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sources-heading" className="text-lg font-bold text-slate-900 mb-3">Official sources</h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
            {props.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a> ({s.note})
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">{props.sourcesNote}</p>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section aria-labelledby="related-heading" className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="related-heading" className="text-lg font-bold text-slate-900 mb-4">Related tools</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {props.related.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block p-4 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 hover:border-lime-400 hover:text-lime-800">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section aria-labelledby="cta-heading" className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-lime-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            {props.bottomCta.title}
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">{props.bottomCta.text}</p>
          <Link
            href={props.bottomCta.href}
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-slate-900"
          >
            {props.bottomCta.label}
          </Link>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3">
        <Link href={cta.href} className="flex items-center justify-center bg-amber-700 text-white text-sm font-bold py-3 rounded-xl">
          {cta.label}
        </Link>
      </div>
    </>
  );
}
