"use client";

import Link from "next/link";
import Image from "next/image";
import HomeSections from "./HomeSections";
import HomeFAQ from "./HomeFAQ";
import { SpecEntry } from "../../lib/slug-utils";
import "../home.css";
import { usePathname } from "next/navigation";
import { generateLongformContent } from "@/lib/content-weaver";

interface Props {
  spec: SpecEntry;
  slug: string;
}

export default function ProgrammaticLandingPage({ spec, slug }: Props) {
  const isVisaIntent = slug.includes("visa");
  const docName = isVisaIntent ? "Visa" : "Passport";
  const countryName = spec.country;

  // Determine the sibling link for SEO cross-linking (normalized to root)
  const countrySlug = slug.replace("-passport-photo-editor", "").replace("-visa-photo-editor", "");
  const siblingLabel = isVisaIntent ? "Passport" : "Visa";
  const siblingHref = `/${countrySlug}-${isVisaIntent ? "passport" : "visa"}-photo-editor`;
  const siblingLink = { label: `${spec.country} ${siblingLabel}`, href: siblingHref };

  const customContent = isVisaIntent ? spec.visacontent : spec.passportcontent;
  const longformContent = generateLongformContent(spec, isVisaIntent);

  // Extract headers for Table of Contents
  let tableOfContents: { id: string; text: string }[] = [];

  let processedCustomContent = customContent;
  if (customContent) {
    let index = 0;
    // Extract TOC items first
    const h2Regex = /<h2(.*?)>(.*?)<\/h2>/g;
    let match;
    while ((match = h2Regex.exec(customContent)) !== null) {
      const text = match[2].replace(/<[^>]*>?/gm, "").trim();
      tableOfContents.push({ id: `custom-section-${index++}`, text });
    }
    // Now inject IDs into the HTML for rendering
    index = 0;
    processedCustomContent = customContent.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match, attrs, content) => {
      return `<h2 id="custom-section-${index++}"${attrs}>${content}</h2>`;
    });
  } else {
    tableOfContents = longformContent
      .filter(block => block.type === "h2")
      .map((block, i) => ({ id: `section-${i}`, text: block.text || "" }));
  }

  return (
    <main className="min-h-screen bg-white hcr">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-[#f8faf9] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-sm font-semibold text-emerald-700 tracking-wide uppercase">AI Compliance Check</span>
                </div>
                <Link
                  href={siblingLink.href}
                  className="inline-flex items-center space-x-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-3 py-1 rounded-full transition-all group shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-600">Switch to {siblingLink.label}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Official {spec.country} {docName} Photo Editor Online
              </h1>
              {/* ... (rest of the component) */}

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Create a 100% compliant {docName} photo in seconds. Our AI ensures the correct {spec.width_mm}x{spec.height_mm}mm size, background color, and biometric alignment for {countryName}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/tool?type=${spec.id}`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1 hover:shadow-indigo-600/40"
                >
                  Upload Your Photo Now →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Biometric Validation",
                  "Background Removal",
                  "Instant Download",
                  "Print-Ready Sheets"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0 relative flex justify-center lg:justify-end">
              <Image
                src="/us_non_imigrant.png"
                alt={`Official ${countryName} ${docName} photo compliance example`}
                width={400}
                height={400}
                className="rounded-2xl w-full h-auto shadow-inner"
                priority
              />
              <div className="absolute inset-0 border-2 border-white/60 rounded-3xl pointer-events-none mix-blend-overlay"></div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPECS ─────────────────────────────────── */}
      <section className="py-16 bg-[#f8faf9] border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Official {countryName} Technical Requirements</h2>
            <p className="text-slate-500 mt-2">Validated against {countryName} government standards</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Dimensions", val: `${spec.width_mm} × ${spec.height_mm} mm` },
              { label: "Background", val: spec.bg_color },
              { label: "Head Size", val: `${spec.head_min_pct}% - ${spec.head_max_pct}%` },
              { label: "Resolution", val: `${spec.width_px} × ${spec.height_px} px` },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 opacity-20"></div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-lg md:text-xl font-black text-slate-900">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONGFORM CONTENT SECTION ─────────────────────── */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-16">

            {/* Sidebar / Table of Contents */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">In this guide</h4>
                <nav className="space-y-4">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="flex-1 max-w-3xl">
              <div className="prose prose-slate prose-lg max-w-none">
                {processedCustomContent ? (
                  <div dangerouslySetInnerHTML={{ __html: processedCustomContent }} />
                ) : (
                  longformContent.map((block, i) => {
                    if (block.type === "h2") {
                      const tocItem = tableOfContents.find(t => t.text === block.text);
                      return <h2 key={i} id={tocItem?.id} className="text-3xl font-extrabold text-slate-900 mt-16 mb-8 scroll-mt-24">{block.text}</h2>;
                    }
                    if (block.type === "h3") return <h3 key={i} className="text-xl font-bold text-slate-900 mt-12 mb-4">{block.text}</h3>;
                    if (block.type === "h4") return <h4 key={i} className="text-lg font-bold text-slate-900 mt-8 mb-2">{block.text}</h4>;
                    if (block.type === "p") return <p key={i} className="text-slate-600 leading-relaxed mb-6 text-lg">{block.text}</p>;
                    if (block.type === "ul") return (
                      <ul key={i} className="space-y-4 mb-8 list-none p-0">
                        {block.items?.map((li, j) => (
                          <li key={j} className="flex items-start space-x-3 text-slate-600">
                            <span className="text-blue-500 font-bold mt-1">✓</span>
                            <span className="text-lg leading-relaxed">{li}</span>
                          </li>
                        ))}
                      </ul>
                    );
                    return null;
                  })
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      <HomeSections
        price={spec.local_price ? `${spec.local_price.symbol}${spec.local_price.amount}` : `$${spec.price}`}
      />

      <HomeFAQ type={isVisaIntent ? "visa" : "passport"} />

      {/* ── STICKY CTA ────────────────────────────────────── */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
        <Link
          href={`/tool?type=${spec.id}`}
          className="pointer-events-auto flex items-center justify-between w-full bg-slate-900 text-white p-2.5 pl-6 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all border border-slate-700 hover:-translate-y-1 transform group"
        >
          <span className="font-bold text-sm">Start Your {countryName} Photo</span>
          <span className="bg-indigo-600 group-hover:bg-indigo-500 transition-colors px-5 py-2.5 rounded-xl text-sm font-black shadow-[0_4px_14px_0_rgb(79,70,229,0.39)]">Free Scan →</span>
        </Link>
      </div>
    </main>
  );
}
