import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import connectToDatabase from '@/lib/mongodb';
import BlogModel from '@/models/Blog';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  featuredImage?: string;
  updatedAt?: string;
}

export const APP_URL = 'https://www.pixpassport.com';

// Published posts from MongoDB (newest first), falling back to the bundled JSON.
// Wrapped in React `cache` so generateMetadata and the page share one query per request.
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean();
    if (posts && posts.length > 0) {
      // Strip ObjectIds/Dates so the result is plain serialisable data
      return JSON.parse(JSON.stringify(posts)) as BlogPost[];
    }
  } catch (error) {
    console.error('Error reading blog posts from DB:', error);
  }

  try {
    const fileContents = fs.readFileSync(path.join(process.cwd(), 'data', 'blog-posts.json'), 'utf8');
    const posts = JSON.parse(fileContents) as BlogPost[];
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
});

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getReadingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 225));
  return `${minutes} min read`;
}

export function getPostCategory(slug: string, title: string): string {
  const lower = (slug + ' ' + title).toLowerCase();
  if (lower.includes('us-visa') || lower.includes('us visa') || lower.includes('ds-160') || lower.includes('green card') || lower.includes('dv-lottery') || lower.includes('h1b')) return 'US Visas & Passports';
  if (lower.includes('schengen') || lower.includes('france') || lower.includes('germany') || lower.includes('europe')) return 'Schengen & Europe';
  if (lower.includes('uk-') || lower.includes('uk visa') || lower.includes('uk digital')) return 'UK Visas & Passports';
  if (lower.includes('australia') || lower.includes('new zealand') || lower.includes('zealand')) return 'Australia & Pacific';
  if (lower.includes('india')) return 'India e-Visa';
  if (lower.includes('baby') || lower.includes('infant') || lower.includes('child')) return 'Baby & Child Photos';
  return 'Compliance Guides';
}

// Document preselected in the embedded photo tool. Undefined lets the tool fall back to the
// visitor's last choice (multi-country posts). Order matters: a US slug may also mention "uk"/"europe".
export function getToolDocument(slug: string, title: string): string | undefined {
  const lower = (slug + ' ' + title).toLowerCase();
  if (/comparison|country-wise/.test(lower)) return undefined;
  if (/us-visa|us visa|ds-160|dv-lottery|green card/.test(lower)) return 'us-visa';
  if (/us-passport|us passport/.test(lower)) return 'us-passport';
  if (/india/.test(lower)) return lower.includes('visa') ? 'india-visa' : 'india-passport';
  if (/schengen|france|germany|europe/.test(lower)) return 'schengen-visa';
  if (/australia/.test(lower)) return 'australia-passport';
  if (/zealand/.test(lower)) return 'new-zealand-passport';
  if (/canada/.test(lower)) return 'canada-passport';
  if (/\buk\b|uk-|united kingdom/.test(lower)) return 'uk-passport';
  return undefined;
}

// Dates are stored as YYYY-MM-DD; format in UTC so a server west of UTC doesn't show the previous day
export function formatPostDate(date: string, month: 'short' | 'long' = 'short'): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', times: '×', hellip: '…' };

// Strip tags and decode the common HTML entities so text extracted from post HTML reads cleanly
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === '#') {
        const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, ' ')
    .trim();
}
