import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";

// Dynamically import heavy bottom-page components
const ReviewSection = dynamic(() => import("../../components/Reviews"), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-50 animate-pulse rounded-[3rem]" />
});

import ReadingProgressBar from "../../components/ReadingProgressBar";
import TocSidebar from "../../components/TocSidebar";
import FaqAccordion from "../../components/FaqAccordion";

// Helper to slugify heading text
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Extract headings and inject IDs into HTML
function processContent(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  
  // Replace <h2> and <h3> with ID-injected versions
  const processedHtml = html.replace(/<(h[23])>(.*?)<\/h[23]>/g, (match, tag, text) => {
    const id = slugify(text);
    headings.push({ id, text, level: parseInt(tag[1]) });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { processedHtml, headings };
}

// Load JSON data
async function getMoneyPages() {
  const filePath = path.join(process.cwd(), "data", "money-pages.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent);
}

// Generate Static Params for SSG
export async function generateStaticParams() {
  try {
    const pages = await getMoneyPages();
    return pages.map((page: any) => ({
      slug: page.slug,
    }));
  } catch (e) {
    return [];
  }
}

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pages = await getMoneyPages();
  const page = pages.find((p: any) => p.slug === slug);
  
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
        canonical: `/visa-photo/${slug}`
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "article",
      url: `https://www.usvisaphotoai.pro/visa-photo/${slug}`,
      images: page.featuredImage ? [{ url: page.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function MoneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pages = await getMoneyPages();
  const page = pages.find((p: any) => p.slug === slug);

  if (!page) return notFound();

  const { processedHtml, headings } = processContent(page.content);
  
  // Enhanced Metadata
  const wordCount = page.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 225); // Average reading speed
  const publishDate = page.updatedAt || "Updated March 2026"; 

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="bg-white selection:bg-lime-100 selection:text-lime-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ReadingProgressBar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-lime-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 -left-48 w-80 h-80 bg-slate-200/30 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
                {/* Breadcrumb / Meta Row */}
                <nav className="flex flex-wrap items-center gap-4 mb-8">
                    <Link href="/" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-lime-600 transition-colors">
                        Home
                    </Link>
                    <span className="w-1 h-3 bg-slate-200 rotate-12" />
                    <span className="text-xs font-bold text-lime-600 uppercase tracking-widest">
                        Visa Photo
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {readingTime} Min Read
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest bg-lime-100 px-2 py-0.5 rounded">
                        {publishDate}
                    </span>
                </nav>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-950 leading-[1.05] tracking-tight mb-8">
                    {page.title}
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mb-12 italic border-l-4 border-lime-500 pl-6">
                    A comprehensive technical breakdown of biometric compliance for secure US visa applications.
                </p>

                {/* Author Card */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                    <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-lime-900/10">
                        AI
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-950">USVisaPhotoAI Staff</p>
                        <p className="text-xs text-slate-400 font-medium">Compliance Specialist Editor</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* Featured Image */}
            {page.featuredImage && (
              <figure className="mb-16 -mx-4 sm:mx-0 group">
                <div className="aspect-[21/9] relative rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 bg-slate-100">
                  <Image
                    src={page.featuredImage}
                    alt={page.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/20 to-transparent pointer-events-none z-10" />
                </div>
                <figcaption className="mt-6 text-center text-xs text-slate-400 font-bold uppercase tracking-widest italic flex items-center justify-center gap-2">
                  <span className="w-1 h-3 bg-lime-500 rounded-full" />
                  Official 2026 Biometric Specification Model
                </figcaption>
              </figure>
            )}

            {/* Content Body */}
            <div className="prose prose-slate prose-lg max-w-none prose-premium
                prose-headings:font-extrabold prose-headings:text-slate-950 
                prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:tracking-tight prose-h2:mt-16 prose-h2:mb-8
                prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-12 prose-h3:mb-6
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8
                prose-a:text-lime-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-ul:my-8 prose-li:text-slate-600 prose-li:mb-2 prose-strong:text-slate-950
                prose-img:rounded-3xl prose-img:shadow-xl
                first-letter:text-7xl first-letter:font-bold first-letter:text-lime-600 first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
            </div>

            {/* CTA Middle Card */}
            <section className="my-20 p-10 lg:p-16 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden shadow-3xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-lime-500/20 px-4 py-2 rounded-full mb-8 border border-lime-500/30">
                        <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                        <span className="text-xs font-bold text-lime-400 tracking-widest uppercase">AI-Powered Compliance</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight">Stop Guessing. <br/><span className="text-lime-400">Perfect It</span> in Seconds.</h2>
                    <p className="text-slate-400 mb-10 text-lg lg:text-xl leading-relaxed text-balance font-medium">
                        Our algorithm simulates the exact scanners used by the US Department of State. Ensure your 600x600 photo passes on the first try.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/tool" className="inline-flex items-center gap-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold px-12 py-6 rounded-2xl transition-all shadow-xl shadow-lime-500/30 text-xl scale-110 hover:scale-105 active:scale-100">
                            Check My Photo Free ⚡
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Area with Accordion */}
            <section id="faq" className="mt-24 pt-24 border-t border-slate-100">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1.5 h-8 bg-lime-500 rounded-full" />
                <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">Technical FAQs</h2>
              </div>
              <FaqAccordion faqs={page.faqs} />
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="hidden lg:block lg:col-span-4 pl-8 border-l border-slate-100">
             <TocSidebar headings={headings} />
          </aside>
        </div>
      </article>

      <div className="bg-slate-50 py-16 border-y border-slate-100">
        <ReviewSection />
      </div>

      <section className="relative bg-slate-950 py-32 lg:py-48 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.1)_0,transparent_70%)]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl lg:text-7xl font-extrabold mb-10 tracking-tight leading-[1.1] italic uppercase">Avoid <span className="text-lime-500 font-black">Rejection.</span></h2>
              <p className="text-slate-400 text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                  Join 100,000+ applicants who secured their visas by validating their biometrics first.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/tool" className="bg-lime-500 text-slate-950 font-black px-14 py-6 rounded-3xl hover:bg-lime-400 transition-all shadow-3xl shadow-lime-500/20 text-2xl uppercase tracking-tighter">
                    Check Photo Free ⚡
                </Link>
                <Link href="/" className="text-slate-200 border-2 border-slate-800 hover:border-slate-500 hover:bg-slate-900 px-14 py-6 rounded-3xl font-bold transition-all text-xl uppercase tracking-widest">
                    All Tools
                </Link>
              </div>
          </div>
      </section>
    </div>
  );
}
