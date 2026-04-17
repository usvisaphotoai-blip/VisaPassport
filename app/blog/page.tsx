import Link from 'next/link';
import Image from 'next/image';
import connectToDatabase from '@/lib/mongodb';
import BlogModel from '@/models/Blog';
import fs from 'fs';
import path from 'path';

// Define the Blog Post type
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  featuredImage?: string;
}

// Helper function to read the blog posts directly from DB with fallback to JSON
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean() as BlogPost[];
    if (posts && posts.length > 0) return JSON.parse(JSON.stringify(posts)) as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts from DB:", error);
  }

  const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContents) as BlogPost[];
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

const APP_URL = 'https://www.pixpassport.com';

export const metadata = {
  title: 'Passport & Visa Photo Requirements Blog | Expert Guides 2026',
  description: 'Expert advice on global passport, visa, and ID photo requirements. Get 2026 compliance guidelines, biometric tips, and step-by-step guides for 50+ countries including US, UK, India, and Schengen.',
  keywords: ['passport photo requirements', 'visa photo guide', 'biometric photo tips', 'passport photo compliance', 'global visa photo requirements', 'UK passport photo', 'India passport photo', 'Schengen visa photo'],
  alternates: {
    canonical: `${APP_URL}/blog`,
  },
  openGraph: {
    title: 'Global Passport & Visa Photo Guides | PixPassport Blog',
    description: 'Expert advice on passport, visa, and ID photo requirements for 50+ countries. 2026 compliance guidelines and step-by-step guides.',
    url: `${APP_URL}/blog`,
    type: 'website',
  },
};

export default async function BlogIndex() {
  const posts = await getBlogPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // JSON-LD: CollectionPage schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Global Passport & Visa Photo Requirements Blog',
    description: 'Expert advice on passport, visa, and ID photo requirements for 50+ countries. 2026 compliance guidelines and step-by-step guides.',
    url: `${APP_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'PixPassport',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${APP_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  // JSON-LD: BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: APP_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${APP_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-50/50">
        <header className="bg-white border-b border-slate-100 pt-32 pb-16 px-4 md:px-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-lime-600 transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li className="text-slate-900">Blog</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Global Photo <span className="gradient-text">Compliance Guides</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Expert tips, official requirements, and step-by-step guides for perfect passport, visa, and ID photographs for 50+ countries.
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          {/* Featured Post */}
          {featuredPost && (
            <article className="mb-20">
              <Link href={`/blog/${featuredPost.slug}`} className="group relative block bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 blog-card-shadow transition-all duration-500 hover:-translate-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-16/10 lg:aspect-auto relative overflow-hidden">
                    {featuredPost.featuredImage ? (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                        <span className="text-lime-500 font-black text-4xl">PixPassport</span>
                      </div>
                    )}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-lime-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                        Featured Guide
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-bold mb-6">
                      <time dateTime={featuredPost.date}>
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                      <span>{featuredPost.author}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 group-hover:text-lime-600 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-lg text-slate-600 mb-10 line-clamp-3 font-medium leading-relaxed">
                      {featuredPost.description}
                    </p>
                    
                    <div className="mt-auto flex items-center text-lime-600 font-bold text-lg">
                      Read Full Article
                      <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Grid Section */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-8 bg-lime-500 rounded-full" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              Latest Articles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {remainingPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="aspect-16/10 relative rounded-4xl overflow-hidden mb-8 border border-slate-200 blog-card-shadow transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                        <span className="text-lime-500 font-black text-2xl">PixPassport</span>
                      </div>
                    )}
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        Guide
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest mb-4">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>8 Min Read</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-lime-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 mb-8 line-clamp-3 font-medium leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-lime-600 font-black text-sm uppercase tracking-widest">
                    Read Story
                    <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Internal Link Section */}
          <section className="mt-20 pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">Explore More Tools & Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/tool" className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-lime-300 hover:shadow-lg transition-all">
                <span className="text-2xl mb-3 block">📸</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-lime-600 block mb-2">Create Photo</span>
                <p className="text-xs text-slate-500">Upload & get a compliant biometric photo instantly</p>
              </Link>
              <Link href="/visa-photo-validator" className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-lime-300 hover:shadow-lg transition-all">
                <span className="text-2xl mb-3 block">✅</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-lime-600 block mb-2">Free Validator</span>
                <p className="text-xs text-slate-500">Check compliance before submitting</p>
              </Link>
              <Link href="/passport-photos" className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-lime-300 hover:shadow-lg transition-all">
                <span className="text-2xl mb-3 block">🛂</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-lime-600 block mb-2">Passport Directory</span>
                <p className="text-xs text-slate-500">Official passport photo sizes for 50+ countries</p>
              </Link>
              <Link href="/visa-photo" className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-lime-300 hover:shadow-lg transition-all">
                <span className="text-2xl mb-3 block">🌐</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-lime-600 block mb-2">Visa Photo Directory</span>
                <p className="text-xs text-slate-500">International visa photo specifications</p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
