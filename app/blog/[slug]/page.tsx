import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReadingProgressBar from '@/app/components/ReadingProgressBar';
import ArticleToc from '@/app/components/ArticleToc';
import GuidePhotoTool from '@/app/components/guides/GuidePhotoTool';
import FaqAccordion from '@/app/components/FaqAccordion';
import {
  APP_URL,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getPostCategory,
  getReadingTime,
  getToolDocument,
  htmlToText,
  type BlogPost,
} from '@/lib/blog';

export const revalidate = 3600;

const DEFAULT_OG_IMAGE = `${APP_URL}/og-image.jpg`;

const TOOL_TITLES: Record<string, string> = {
  'us-visa': 'Make your US visa photo now',
  'schengen-visa': 'Make your Schengen visa photo now',
  'india-visa': 'Make your India e-Visa photo now',
};

// Dynamic FAQ Extractor: Parses FAQs directly from each blog post's content
function extractFaqsFromContent(content: string): { faqs: { question: string; answer: string }[]; cleanContent: string } {
  const faqs: { question: string; answer: string }[] = [];
  const faqMatch = content.match(/<h2[^>]*>.*?(faq|frequently asked questions).*?<\/h2>/i);
  if (!faqMatch) return { faqs, cleanContent: content };

  const faqStartIndex = content.indexOf(faqMatch[0]);
  const contentAfterFaqHeader = content.slice(faqStartIndex + faqMatch[0].length);
  const nextH2Match = contentAfterFaqHeader.match(/<h2[^>]*>/i);
  const faqEndIndex = nextH2Match
    ? (faqStartIndex + faqMatch[0].length + contentAfterFaqHeader.indexOf(nextH2Match[0]))
    : content.length;

  const faqHtml = content.slice(faqStartIndex + faqMatch[0].length, faqEndIndex);

  // Pattern 1: <h3>Question</h3> <p>Answer</p>
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = h3Regex.exec(faqHtml)) !== null) {
    const q = htmlToText(match[1]);
    const a = htmlToText(match[2]);
    if (q && a) faqs.push({ question: q, answer: a });
  }

  // Pattern 2: Cards with font-bold
  if (faqs.length === 0) {
    const cardRegex = /<p[^>]*class=\"[^\"]*font-bold[^\"]*\"[^>]*>(?:Q:\s*)?([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
    while ((match = cardRegex.exec(faqHtml)) !== null) {
      const q = htmlToText(match[1]).replace(/^Q:\s*/i, '');
      const a = htmlToText(match[2]);
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Pattern 3: <p><strong>Question</strong><br>Answer</p>
  if (faqs.length === 0) {
    const pRegex = /<p[^>]*>\s*<strong[^>]*>(?:Q:\s*)?([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*([\s\S]*?)<\/p>/g;
    while ((match = pRegex.exec(faqHtml)) !== null) {
      const q = htmlToText(match[1]).replace(/^Q:\s*/i, '');
      const a = htmlToText(match[2]);
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Nothing parsed: leave the FAQ markup in the body rather than silently dropping it
  if (faqs.length === 0) return { faqs, cleanContent: content };

  // Clean raw FAQ block out of content to prevent duplicate display
  const cleanContent = content.slice(0, faqStartIndex) + content.slice(faqEndIndex);
  return { faqs, cleanContent };
}

// Give every h2/h3 a unique id (keeping any id already present) and collect them for the TOC
function addHeadingIds(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const used = new Set<string>();

  const content = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level: string, attrs: string, inner: string) => {
    const text = htmlToText(inner);
    if (!text) return match;

    const existingId = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
    let id = existingId;
    if (!id) {
      const base = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-') || 'section';
      id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    }
    used.add(id);
    headings.push({ id, text, level: Number(level) });

    return existingId ? match : `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

  return { content, headings };
}

function isOrganisation(author: string) {
  return /team|pixpassport/i.test(author);
}

// Same-category posts first, then the most recent others
function getRelatedPosts(posts: BlogPost[], current: BlogPost, count = 3): BlogPost[] {
  const category = getPostCategory(current.slug, current.title);
  const others = posts.filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter((p) => getPostCategory(p.slug, p.title) === category);
  const rest = others.filter((p) => getPostCategory(p.slug, p.title) !== category);
  return [...sameCategory, ...rest].slice(0, count);
}

// Only treat updatedAt as a modification date when it's a valid date on or after publication
function getModifiedDate(post: BlogPost): string {
  if (!post.updatedAt) return post.date;
  const updated = new Date(post.updatedAt);
  if (isNaN(updated.getTime()) || updated < new Date(post.date)) return post.date;
  return updated.toISOString().slice(0, 10);
}

// 1. Tell Next.js to Statically Generate exactly these slugs at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate dynamic SEO Meta Tags based on the specific post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | PixPassport', robots: { index: false } };
  }

  const url = `${APP_URL}/blog/${post.slug}`;
  const image = post.featuredImage || DEFAULT_OG_IMAGE;

  return {
    title: `${post.title} | PixPassport`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
      languages: {
        en: url,
        'x-default': url,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: getModifiedDate(post),
      authors: [post.author],
      section: getPostCategory(post.slug, post.title),
      siteName: 'PixPassport',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

// 3. The actual Server Component that renders the page
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const url = `${APP_URL}/blog/${post.slug}`;
  const category = getPostCategory(post.slug, post.title);
  const readTime = getReadingTime(post.content);
  const modifiedDate = getModifiedDate(post);
  const relatedPosts = getRelatedPosts(posts, post);
  const toolDocument = getToolDocument(post.slug, post.title);
  const toolTitle = (toolDocument && TOOL_TITLES[toolDocument])
    || (/visa/i.test(post.slug) ? 'Make your visa photo now' : 'Make your passport photo now');

  // Extract FAQs directly from this blog post's content (no static FAQ_MAP used)
  const { faqs, cleanContent: rawContent } = extractFaqsFromContent(post.content);

  let cleanContent = rawContent
    // The hero already renders post.title as the page's only <h1>: drop a leading <h1> that
    // repeats it and demote any other <h1> in the body to <h2>
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')
    .replace(/<h1(\s[^>]*)?>([\s\S]*?)<\/h1>/gi, '<h2$1>$2</h2>')
    // Wrap tables in a horizontally scrollable container
    .replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_match, inner: string) =>
      `<div class="table-wrapper" tabindex="0" role="region" aria-label="Table"><table>${inner}</table></div>`)
    // Body images sit below the fold
    .replace(/<img(?![^>]*\sloading=)/gi, '<img loading="lazy" decoding="async"');

  // We emit our own FAQPage schema below; a second one embedded in the post body is a duplicate
  if (faqs.length > 0) {
    cleanContent = cleanContent.replace(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?"FAQPage"[\s\S]*?<\/script>/gi, '');
  }

  const { content: processedContent, headings: bodyHeadings } = addHeadingIds(cleanContent);
  const tocHeadings = bodyHeadings.filter((h) => h.level === 2);
  if (faqs.length > 0) tocHeadings.push({ id: 'faq', text: 'Frequently Asked Questions', level: 2 });

  // JSON-LD: Article schema (BlogPosting)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: modifiedDate,
    author: isOrganisation(post.author)
      ? { '@type': 'Organization', name: post.author, url: APP_URL }
      : { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'PixPassport',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    inLanguage: 'en-US',
    articleSection: category,
    wordCount: htmlToText(post.content).split(' ').length,
    image: post.featuredImage || DEFAULT_OG_IMAGE,
    isPartOf: {
      '@type': 'Blog',
      name: 'PixPassport Blog',
      url: `${APP_URL}/blog`,
    },
  };

  // JSON-LD: FAQ schema (only created if post has FAQs)
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // JSON-LD: BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${APP_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <ReadingProgressBar />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-24">
          {/* Mobile order: header → tool → body. Desktop: tool and TOC in a sticky right column (same pattern as /guides). */}
          <article className="grid grid-cols-1 lg:grid-cols-[minmax(0,720px)_340px] lg:justify-between gap-x-10">
            <div className="min-w-0 lg:col-start-1">
              {/* Article header */}
              <header>
                <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
                  <ol className="flex items-center gap-1.5 text-sm text-slate-500">
                    <li>
                      <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    </li>
                    <li aria-hidden="true">
                      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
                    </li>
                    <li aria-hidden="true">
                      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </li>
                    <li className="truncate text-slate-700 font-medium" aria-current="page">{category}</li>
                  </ol>
                </nav>

                <h1 className="text-[1.875rem] leading-[1.18] sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem] font-bold tracking-tight text-slate-900 text-pretty">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="mt-4 sm:mt-5 text-lg sm:text-xl leading-relaxed text-slate-600 text-pretty">
                    {post.description}
                  </p>
                )}

                <div className="mt-6 sm:mt-8 flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center font-bold text-sm" aria-hidden="true">
                    {post.author.charAt(0)}
                  </div>
                  <div className="text-sm leading-tight">
                    <p className="font-semibold text-slate-900">{post.author}</p>
                    <p className="mt-1 text-slate-500 flex flex-wrap items-center gap-x-1.5">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      {modifiedDate !== post.date && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Updated <time dateTime={modifiedDate}>{formatPostDate(modifiedDate)}</time></span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{readTime}</span>
                    </p>
                  </div>
                </div>
              </header>

              {/* Featured image */}
              {post.featuredImage && (
                <figure className="mt-8 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-50 ring-1 ring-slate-200/70">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-contain"
                    />
                  </div>
                </figure>
              )}
            </div>

            <aside aria-label="Photo tool" className="min-w-0 mt-8 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                <GuidePhotoTool defaultDoc={toolDocument} title={toolTitle} source="blog_embedded_tool" />
                {tocHeadings.length > 0 && (
                  <div className="hidden lg:block max-h-[max(10rem,calc(100vh-31rem))] overflow-y-auto overscroll-contain pr-1">
                    <ArticleToc headings={tocHeadings} />
                  </div>
                )}
              </div>
            </aside>

            <div className="min-w-0 lg:col-start-1">
              {/* Mobile table of contents */}
              {tocHeadings.length > 2 && (
                <details className="group lg:hidden mt-8 rounded-2xl border border-slate-200 bg-slate-50/60">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-sm font-semibold text-slate-900">
                      In this article <span className="font-normal text-slate-500">· {tocHeadings.length} sections</span>
                    </span>
                    <svg className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <ol className="px-5 pb-4 space-y-1 border-t border-slate-200 pt-3">
                    {tocHeadings.map((heading) => (
                      <li key={heading.id}>
                        <a href={`#${heading.id}`} className="block py-1.5 text-sm text-slate-600 hover:text-lime-700">
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {/* Body */}
              <div
                className="prose-premium blog-prose mt-10 sm:mt-12 max-w-[720px]"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Dynamic FAQ Section (Extracted from Post Content) */}
              {faqs.length > 0 && (
                <section aria-labelledby="faq" className="mt-14 sm:mt-16 max-w-[720px]">
                  <h2 id="faq" className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 mb-6 scroll-mt-24">
                    Frequently Asked Questions
                  </h2>
                  <FaqAccordion faqs={faqs.map(f => ({ q: f.question, a: f.answer }))} />
                </section>
              )}

              {/* Author / sources note */}
              <aside className="mt-14 sm:mt-16 max-w-[720px] flex gap-4 rounded-2xl border border-slate-200 p-5 sm:p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center font-bold" aria-hidden="true">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Written by</p>
                  <p className="font-semibold text-slate-900">{post.author}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Our guides are checked against official government photo specifications and updated when the rules change.
                    Spotted something out of date? <Link href="/contact" className="font-medium text-lime-700 underline underline-offset-2 hover:text-lime-800">Let us know</Link>.
                  </p>
                </div>
              </aside>

              {/* CTA */}
              <section className="mt-10 max-w-[720px] rounded-3xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-10">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Get a compliant photo in under a minute
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 max-w-lg">
                  Upload a selfie. We remove the background, fix the lighting and crop to the exact size your country requires.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <a
                    href="#photo-tool"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 px-6 py-3 text-sm sm:text-base font-semibold text-slate-950 hover:bg-lime-400 transition-colors"
                  >
                    Upload my photo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </a>
                  <Link href="/visa-photo-validator" className="text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600">
                    Or check a photo you already have
                  </Link>
                </div>
              </section>
            </div>
          </article>

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-20 sm:mt-24 border-t border-slate-200 pt-12 sm:pt-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <h2 id="related-heading" className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900">
                  Keep reading
                </h2>
                <Link href="/blog" className="shrink-0 text-sm font-semibold text-lime-700 hover:text-lime-800">
                  All guides →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200/70">
                      {related.featuredImage ? (
                        <Image
                          src={related.featuredImage}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-400">PixPassport Guide</div>
                      )}
                    </div>
                    <p className="mt-4 text-xs font-medium text-slate-500">
                      {getPostCategory(related.slug, related.title)} · <time dateTime={related.date}>{formatPostDate(related.date)}</time>
                    </p>
                    <h3 className="mt-1.5 text-base sm:text-lg font-semibold leading-snug text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related tools */}
          <section aria-labelledby="tools-heading" className="mt-16 sm:mt-20">
            <h2 id="tools-heading" className="text-lg font-bold text-slate-900 mb-5">Free photo tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { href: '/visa-photo-validator', title: 'Photo validator', desc: 'Check size, head ratio and background' },
                { href: '/passport-photos', title: 'Passport photo sizes', desc: 'Official specs for 50+ countries' },
                { href: '/visa-photo', title: 'Visa photo sizes', desc: 'International visa photo guidelines' },
                { href: '/faq', title: 'Photo FAQ', desc: 'Common rejection causes, answered' },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-lime-400 hover:bg-lime-50/40 transition-colors">
                  <span className="font-semibold text-slate-900 group-hover:text-lime-800">{tool.title}</span>
                  <span className="mt-1 block text-sm text-slate-500">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
