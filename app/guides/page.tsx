import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { allCountries } from '@/app/eucountry/data/countries';

// Types for aggregation
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  featuredImage?: string;
}

interface MoneyPage {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
}

const APP_URL = 'https://www.usvisaphotoai.pro';

export const metadata = {
  title: 'Master US Visa & Passport Photo Guides | Resource Center 2026',
  description: 'The ultimate directory for US visa, passport, and green card photo requirements. Expert guides, country-specific rules, and biometric compliance tips.',
  keywords: ['US visa photo guides', 'passport photo requirements directory', 'EU visa photo rules', 'DS-160 photo help', 'US citizenship photo guides'],
  alternates: {
    canonical: `${APP_URL}/guides`,
  },
};

async function getData() {
  const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json');
  const moneyPath = path.join(process.cwd(), 'data', 'money-pages.json');

  let blogPosts: BlogPost[] = [];
  let moneyPages: MoneyPage[] = [];

  try {
    const blogData = fs.readFileSync(blogPath, 'utf8');
    blogPosts = JSON.parse(blogData);
  } catch (e) {
    console.error("Error loading blog posts:", e);
  }

  try {
    const moneyData = fs.readFileSync(moneyPath, 'utf8');
    moneyPages = JSON.parse(moneyData);
  } catch (e) {
    console.error("Error loading money pages:", e);
  }

  return { blogPosts, moneyPages, euCountries: allCountries };
}

export default async function GuidesPage() {
  const { blogPosts, moneyPages, euCountries } = await getData();

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-lime-600 transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Guides</span>
          </nav>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 max-w-4xl tracking-tight">
            The Master <span className="text-lime-600">Resource Hub</span> for US Visa & Passport Photos
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            Everything you need to know about biometric compliance, country-specific rules, and expert tips to ensure your photo is never rejected.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Section 1: Master Visa Photo Guides (Core SEO) */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-10 bg-lime-500 rounded-full" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Master Visa Photo Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moneyPages.slice(0, 12).map((page) => (
              <Link 
                key={page.slug} 
                href={`/visa-photo/${page.slug}`}
                className="group p-8 bg-white border border-slate-200 rounded-[2rem] hover:border-lime-500 hover:shadow-2xl hover:shadow-lime-500/5 transition-all duration-300"
              >
                <div className="text-xs font-bold text-lime-600 uppercase tracking-widest mb-4 bg-lime-50 w-fit px-3 py-1 rounded-full">
                  {page.category || 'Expert Guide'}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors mb-4 leading-tight">
                  {page.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {page.metaDescription}
                </p>
                <div className="mt-6 flex items-center text-slate-400 group-hover:text-lime-600 transition-colors font-bold text-xs uppercase tracking-widest">
                  Read Detailed Guide
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: European Photo Directories */}
        <section className="mb-24">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-lime-500 rounded-full" />
                <h2 className="text-3xl font-black tracking-tight">European Resource Center</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                {euCountries.map((country) => (
                  <div key={country.code}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{country.flag}</span>
                      <h3 className="text-lg font-black tracking-wide">{country.name}</h3>
                    </div>
                    <ul className="space-y-4">
                      {country.pages.map((page) => (
                        <li key={page.slug}>
                          <Link 
                            href={`/${country.slugPrefix}/${page.slug}`}
                            className="text-slate-400 hover:text-lime-400 transition-colors text-sm font-medium flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-lime-500 transition-colors" />
                            {page.h1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Specialist Articles (The Blog) */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-10 bg-blue-500 rounded-full" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Specialist Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-full md:w-48 aspect-square relative rounded-3xl overflow-hidden shrink-0">
                  {post.featuredImage ? (
                    <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center font-black text-slate-300">USVPAI</div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>Guide</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-lime-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                    {post.description}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-lime-600 font-bold text-xs uppercase tracking-widest flex items-center group/btn">
                    Read article
                    <svg className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-lime-500 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 max-w-2xl mx-auto text-slate-900">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
              Ready to validate your photo?
            </h2>
            <p className="text-lg md:text-xl font-bold mb-10 opacity-80">
              Join 12,000+ applicants who secured their US visa with a perfect photo.
            </p>
            <Link 
              href="/tool" 
              className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-2xl shadow-slate-900/20"
            >
              Get Approved Photo Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
