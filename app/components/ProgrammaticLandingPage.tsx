import Link from "next/link";
import Image from "next/image";
import LongformSection from "./LongformSection";      // ← NEW
import StickyCta from "./StickyCta";
import { SpecEntry, getSpecH1, getSpecMetaDescription } from "../../lib/slug-utils";
import "../home.css";
import { generateLongformContent } from "@/lib/content-weaver";
import Breadcrumbs from "./Breadcrumbs";

interface Props {
  spec: SpecEntry;
  slug: string;
}

export default function ProgrammaticLandingPage({ spec, slug }: Props) {
  const isVisaIntent = slug.includes("visa");
  const docName = isVisaIntent ? "Visa" : "Passport";
  const countryName = spec.country;

  const customH1 = getSpecH1(spec, isVisaIntent);
  const customMetaDesc = getSpecMetaDescription(spec, isVisaIntent);

  const heroH1 = customH1 || `${spec.country} ${docName} Photo Editor Online 2026`;
  const heroSubtitle = customMetaDesc || `Create a 100% compliant ${docName} photo in seconds. Our biometric checks ensure the correct ${spec.width_mm}x${spec.height_mm}mm size, background color, and biometric alignment for ${countryName}.`;

  const countrySlug = slug.replace("-passport-photo-editor", "").replace("-visa-photo-editor", "");
  const siblingLabel = isVisaIntent ? "Passport" : "Visa";
  const siblingHref = `/${countrySlug}-${isVisaIntent ? "passport" : "visa"}-photo-editor`;
  const siblingLink = { label: `${spec.country} ${siblingLabel}`, href: siblingHref };

  const customContent = isVisaIntent ? spec.visacontent : spec.passportcontent;
  const longformContent = generateLongformContent(spec, isVisaIntent);

  // Extract TOC from custom HTML or generated blocks
  let tableOfContents: { id: string; text: string }[] = [];
  let processedCustomContent = customContent;

  if (customContent) {
    let index = 0;
    const h2Regex = /<h2(.*?)>(.*?)<\/h2>/g;
    let match;
    while ((match = h2Regex.exec(customContent)) !== null) {
      const text = match[2].replace(/<[^>]*>?/gm, "").trim();
      tableOfContents.push({ id: `custom-section-${index++}`, text });
    }
    index = 0;
    processedCustomContent = customContent.replace(
      /<h2(.*?)>(.*?)<\/h2>/g,
      (_, attrs, content) => `<h2 id="custom-section-${index++}"${attrs}>${content}</h2>`
    );
  } else {
    tableOfContents = longformContent
      .filter((block) => block.type === "h2")
      .map((block, i) => ({ id: `section-${i}`, text: block.text || "" }));
  }

  return (
    <main className="min-h-screen bg-white hcr">
        <div className="h-1 bg-lime-700 w-full" />

      <Breadcrumbs 
        items={[
          { label: `${docName} Photos`, href: isVisaIntent ? "/visa-photo" : "/passport-photos" },
          { label: spec.country, href: `/${slug}` }
        ]} 
      />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-10 lg:pb-24 ">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center space-x-2 bg-lime-50 border border-emerald-100 px-3 py-1 rounded-sm">
                  <span className="flex h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span>
                  <span className="text-sm font-semibold text-lime-700 tracking-wide uppercase">AI Compliance Check</span>
                </div>
                <Link
                  href={siblingLink.href}
                  className="inline-flex items-center space-x-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-3 py-1 rounded-sm transition-all group "
                >
                  <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-600">Switch to {siblingLink.label}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                {heroH1}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/passport-photo-online?type=${spec.id}`}
                  className="relative group inline-flex items-center justify-center overflow-hidden bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  <span className="relative z-10 flex items-center">
                    Upload Your Photo Now
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Biometric Validation", "Background Removal", "Instant Download", "Print-Ready Sheets"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:w-auto flex flex-col items-center gap-3">
              <Image
                src={spec.hero_photo || "/us_non_imigrant.png"}
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
              {
                label: "Dimensions",
                val: `${spec.width_mm} × ${spec.height_mm} mm`,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
                ),
              },
              {
                label: "Background",
                val: spec.bg_color,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                ),
              },
              {
                label: "Head Size",
                val: `${spec.head_min_pct}% - ${spec.head_max_pct}%`,
                icon: (
                  <>
                    <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                  </>
                ),
              },
              {
                label: "Resolution",
                val: `${spec.width_px} × ${spec.height_px} px`,
                icon: (
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="11" r="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-4-4 3-3-2-3 3" />
                  </>
                ),
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-slate-200 text-center transition-colors hover:border-slate-300"
              >
                <div className="w-9 h-9 mx-auto rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                  <svg className="w-4.5 h-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    {s.icon}
                  </svg>
                </div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">{s.label}</p>
                <p className="text-lg font-bold text-slate-900">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONGFORM CONTENT — now uses the new component ── */}
      <LongformSection
        tableOfContents={tableOfContents}
        processedCustomContent={processedCustomContent}
        longformContent={longformContent as any}
        countryName={countryName}
        docName={docName}
      />

      {/* ── RELATED RESOURCES ─────────────────────────────── */}
      <section className="py-16 bg-[#f8faf9] border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Explore More Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <Link href="/passport-photos" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-blue-200 transition-all">
              <span className="text-2xl block mb-3">🛂</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Passport Directory</span>
              <p className="text-xs text-slate-500 mt-1">50+ country specs</p>
            </Link>
            <Link href="/visa-photo" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-emerald-200 transition-all">
              <span className="text-2xl block mb-3">🌐</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 block">Visa Directory</span>
              <p className="text-xs text-slate-500 mt-1">International visa specs</p>
            </Link>
            <Link href="/visa-photo-validator" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-purple-200 transition-all">
              <span className="text-2xl block mb-3">✅</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-purple-600 block">Free Validator</span>
              <p className="text-xs text-slate-500 mt-1">Instant PASS/FAIL</p>
            </Link>
            <Link href="/blog" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-amber-200 transition-all">
              <span className="text-2xl block mb-3">📖</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-amber-600 block">Blog & Guides</span>
              <p className="text-xs text-slate-500 mt-1">Expert advice</p>
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-4 text-center">Popular Sizing & Photo Checker Tools</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/us-passport-photo-editor" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">US Passport Photo Editor</Link>
              <Link href="/us-visa-photo-editor" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">US Visa Photo Editor</Link>
              <Link href="/ca" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">Canada Visa Size Photo</Link>
              <Link href="/uk-passport-photo-checker-online-free" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">UK Passport Photo Checker</Link>
              <Link href="/digital-visa-photo-specs-2026" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">Digital Visa Specs 2026</Link>
              <Link href="/indian-passport-size-photograph" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                Create inda icao standard photograph
              </Link>
            </div>
          </div>
        </div>
      </section>

   

      {/* ── STICKY CTA ────────────────────────────────────── */}
      <StickyCta href={`/passport-photo-online?type=${spec.id}`} countryName={countryName} docName={docName} />
    </main>
  );
}