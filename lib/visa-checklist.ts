import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface ChecklistItem {
  title: string;
  description: string;
  mandatory?: boolean;
  category?: "identity" | "financial" | "travel" | "employment" | "photo" | "additional";
  tips?: string;
  toolCta?: boolean;
}

export interface ChecklistSection {
  title: string;
  category?: string;
  description?: string;
  items: ChecklistItem[];
}

export interface VisaPhotoSpec {
  size: string;
  width_mm?: number;
  height_mm?: number;
  faceHeight?: string;
  background: string;
  glasses?: string;
  headCovering?: string;
  toolLink: string;
}

export interface VisaChecklistFaq {
  question: string;
  answer: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface VisaChecklistMeta {
  title: string;
  shortTitle?: string;
  slug: string;
  country: string;
  countrySlug: string;
  countryFlag?: string;
  visaType: string;
  category: string;
  description: string;
  lastUpdated: string;
  processingTime: string;
  fee: string;
  validity: string;
  stayDuration?: string;
  entryType?: string; // Multiple Entry, Single Entry
  onlineSubmission?: boolean;
  officialAuthority?: string; // e.g. IRCC, US Department of State, UK Visas and Immigration (UKVI)
  officialPortalUrl?: string;
  photoRequirements: VisaPhotoSpec;
  checklistSections: ChecklistSection[];
  faq: VisaChecklistFaq[];
  featuredImage?: string;
  keywords?: string;
}

export interface VisaChecklistDetail extends VisaChecklistMeta {
  contentHtml: string;
  toc: TocHeading[];
}

export interface CountryMeta {
  name: string;
  slug: string;
  code: string;
  flag: string;
  region: "North America" | "Europe / Schengen" | "Asia & Pacific" | "Middle East" | "Other";
  popular: boolean;
  authorityName: string;
  authorityUrl?: string;
  photoSize: string;
  photoToolSlug: string;
  description: string;
  processingOverview: string;
  heroImage?: string;
  checklistsCount?: number;
  availableVisas?: {
    title: string;
    slug: string;
    visaType: string;
    processingTime: string;
    fee: string;
  }[];
}

const CHECKLIST_ROOT_DIR = path.join(process.cwd(), "content/visa-checklist");

/**
 * Slugify heading for anchors
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract H2, H3, H4 headings for Table of Contents
 */
function extractToc(markdownContent: string): TocHeading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const rawText = match[2].replace(/[\*\_~`]/g, "").trim();
    const id = slugify(rawText);
    toc.push({ id, text: rawText, level });
  }

  return toc;
}

/**
 * Custom marked renderer with scroll margin and clean IDs
 */
function compileMarkdownToHtml(markdownContent: string): string {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const rawText = text.replace(/<[^>]*>/g, "");
    const id = slugify(rawText);

    if (depth === 2) {
      return `<h2 id="${id}" class="scroll-mt-24 text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4 pb-3 border-b border-slate-200">${text}</h2>\n`;
    }
    if (depth === 3) {
      return `<h3 id="${id}" class="scroll-mt-24 text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3 text-slate-800">${text}</h3>\n`;
    }
    if (depth === 4) {
      return `<h4 id="${id}" class="scroll-mt-24 text-base font-bold text-slate-800 mt-6 mb-2">${text}</h4>\n`;
    }
    return `<h${depth} class="font-bold text-slate-900 mt-6 mb-3">${text}</h${depth}>\n`;
  };

  renderer.table = function ({ header, rows }) {
    return `<div class="table-wrapper my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
      <table class="w-full text-left font-medium border-collapse text-sm">
        <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
          ${header}
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-600">
          ${rows}
        </tbody>
      </table>
    </div>`;
  };

  return marked(markdownContent, { renderer }) as string;
}

/**
 * Get all available countries for Visa Checklists
 */
export function getAllVisaCountries(): CountryMeta[] {
  if (!fs.existsSync(CHECKLIST_ROOT_DIR)) {
    return [];
  }

  const countryFolders = fs
    .readdirSync(CHECKLIST_ROOT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const countries: CountryMeta[] = [];

  for (const folder of countryFolders) {
    const countryDir = path.join(CHECKLIST_ROOT_DIR, folder);
    const countryJsonPath = path.join(countryDir, "country.json");

    let countryData: Partial<CountryMeta> = {};
    if (fs.existsSync(countryJsonPath)) {
      try {
        countryData = JSON.parse(fs.readFileSync(countryJsonPath, "utf8"));
      } catch (e) {
        console.error(`Error reading country.json in ${folder}:`, e);
      }
    }

    // Find all markdown checklists in this country folder
    const mdFiles = fs
      .readdirSync(countryDir)
      .filter((file) => file.endsWith(".md"));

    const checklists = mdFiles.map((file) => {
      const fullPath = path.join(countryDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = data.slug || file.replace(/\.md$/, "");
      return {
        title: data.title || slug,
        slug,
        visaType: data.visaType || "Visa",
        processingTime: data.processingTime || "Varies",
        fee: data.fee || "Varies",
      };
    });

    const defaultName = folder
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const country: CountryMeta = {
      name: countryData.name || defaultName,
      slug: countryData.slug || folder,
      code: countryData.code || folder.toUpperCase().slice(0, 2),
      flag: countryData.flag || "🌐",
      region: countryData.region || "Other",
      popular: Boolean(countryData.popular),
      authorityName: countryData.authorityName || "Immigration & Consular Authority",
      authorityUrl: countryData.authorityUrl,
      photoSize: countryData.photoSize || "35x45 mm",
      photoToolSlug: countryData.photoToolSlug || "/passport-photo-online",
      description: countryData.description || `Official visa document checklists, biometric photo specifications, and application guides for ${defaultName}.`,
      processingOverview: countryData.processingOverview || "15 - 30 working days standard processing.",
      heroImage: countryData.heroImage,
      checklistsCount: checklists.length,
      availableVisas: checklists,
    };

    countries.push(country);
  }

  // Sort by popular first, then alphabetically by name
  return countries.sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get country details and all its visa checklists
 */
export function getVisaCountry(countrySlug: string): {
  country: CountryMeta | null;
  checklists: VisaChecklistMeta[];
} {
  const allCountries = getAllVisaCountries();
  const country = allCountries.find((c) => c.slug === countrySlug) || null;

  if (!country) {
    return { country: null, checklists: [] };
  }

  const countryDir = path.join(CHECKLIST_ROOT_DIR, countrySlug);
  if (!fs.existsSync(countryDir)) {
    return { country, checklists: [] };
  }

  const mdFiles = fs
    .readdirSync(countryDir)
    .filter((file) => file.endsWith(".md"));

  const checklists: VisaChecklistMeta[] = [];

  for (const file of mdFiles) {
    const fullPath = path.join(countryDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = data.slug || file.replace(/\.md$/, "");

    checklists.push({
      title: data.title || "Visa Document Checklist",
      shortTitle: data.shortTitle || data.title,
      slug,
      country: data.country || country.name,
      countrySlug: country.slug,
      countryFlag: country.flag,
      visaType: data.visaType || "Visitor Visa",
      category: data.category || "Tourism & Visit",
      description: data.description || `Required document checklist and guidelines for ${data.visaType || 'visa'} to ${country.name}.`,
      lastUpdated: data.lastUpdated || "2026-03-24",
      processingTime: data.processingTime || "15 - 30 Days",
      fee: data.fee || "Varies",
      validity: data.validity || "Varies",
      stayDuration: data.stayDuration,
      entryType: data.entryType || "Multiple Entry",
      onlineSubmission: data.onlineSubmission ?? true,
      officialAuthority: data.officialAuthority || country.authorityName,
      officialPortalUrl: data.officialPortalUrl || country.authorityUrl,
      photoRequirements: data.photoRequirements || {
        size: country.photoSize,
        background: "Plain White",
        toolLink: country.photoToolSlug,
      },
      checklistSections: data.checklistSections || [],
      faq: data.faq || [],
      featuredImage: data.featuredImage,
      keywords: data.keywords,
    });
  }

  return { country, checklists };
}

/**
 * Get single visa checklist detail by countrySlug and checklistSlug
 */
export function getVisaChecklist(
  countrySlug: string,
  checklistSlug: string
): VisaChecklistDetail | null {
  const countryDir = path.join(CHECKLIST_ROOT_DIR, countrySlug);
  if (!fs.existsSync(countryDir)) return null;

  const mdFiles = fs
    .readdirSync(countryDir)
    .filter((file) => file.endsWith(".md"));

  let targetFile: string | null = null;
  let fileData: Record<string, any> = {};
  let fileMarkdownContent = "";

  for (const file of mdFiles) {
    const fullPath = path.join(countryDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(content);
    const fileSlug = parsed.data.slug || file.replace(/\.md$/, "");
    if (fileSlug === checklistSlug) {
      targetFile = file;
      fileData = parsed.data;
      fileMarkdownContent = parsed.content;
      break;
    }
  }

  if (!targetFile) return null;

  const allCountries = getAllVisaCountries();
  const country = allCountries.find((c) => c.slug === countrySlug);

  const contentHtml = compileMarkdownToHtml(fileMarkdownContent);
  const toc = extractToc(fileMarkdownContent);

  return {
    title: fileData.title || "Visa Document Checklist",
    shortTitle: fileData.shortTitle || fileData.title,
    slug: checklistSlug,
    country: fileData.country || country?.name || countrySlug,
    countrySlug,
    countryFlag: country?.flag || "🌐",
    visaType: fileData.visaType || "Visitor Visa",
    category: fileData.category || "Tourism & Visit",
    description: fileData.description || "Official document checklist and step-by-step submission guide.",
    lastUpdated: fileData.lastUpdated || "2026-03-24",
    processingTime: fileData.processingTime || "15 - 30 Days",
    fee: fileData.fee || "Varies",
    validity: fileData.validity || "Varies",
    stayDuration: fileData.stayDuration,
    entryType: fileData.entryType || "Multiple Entry",
    onlineSubmission: fileData.onlineSubmission ?? true,
    officialAuthority: fileData.officialAuthority || country?.authorityName || "Immigration Authority",
    officialPortalUrl: fileData.officialPortalUrl || country?.authorityUrl,
    photoRequirements: fileData.photoRequirements || {
      size: country?.photoSize || "35x45 mm",
      background: "Plain White",
      toolLink: country?.photoToolSlug || "/passport-photo-online",
    },
    checklistSections: fileData.checklistSections || [],
    faq: fileData.faq || [],
    featuredImage: fileData.featuredImage,
    keywords: fileData.keywords,
    contentHtml,
    toc,
  };
}

/**
 * Return all country slugs for generateStaticParams
 */
export function getAllVisaCountryPaths(): { country: string }[] {
  const countries = getAllVisaCountries();
  return countries.map((c) => ({ country: c.slug }));
}

/**
 * Return all country & checklist slugs for generateStaticParams
 */
export function getAllVisaChecklistPaths(): { country: string; checklist: string }[] {
  const countries = getAllVisaCountries();
  const paths: { country: string; checklist: string }[] = [];

  for (const country of countries) {
    const countryDir = path.join(CHECKLIST_ROOT_DIR, country.slug);
    if (fs.existsSync(countryDir)) {
      const files = fs
        .readdirSync(countryDir)
        .filter((file) => file.endsWith(".md"));

      for (const file of files) {
        const fullPath = path.join(countryDir, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(content);
        const slug = data.slug || file.replace(/\.md$/, "");
        paths.push({
          country: country.slug,
          checklist: slug,
        });
      }
    }
  }

  return paths;
}
