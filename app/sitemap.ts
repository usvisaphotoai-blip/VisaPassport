import { MetadataRoute } from "next";
import path from "path";
import fs from "fs/promises";
import { allCountries } from "./eucountry/data/countries";

const APP_URL = "https://www.usvisaphotoai.pro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${APP_URL}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/tool`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/photo-validator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/us-visa-photo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/us-passport-photo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/green-card-photo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/dv-lottery-photo-2027`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${APP_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/refund-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const filePath = path.join(process.cwd(), "data", "seo-targets.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const targets = JSON.parse(fileContent);

    targets.forEach((target: any) => {
      sitemapEntries.push({
        url: `${APP_URL}/photo/${target.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });

    sitemapEntries.push({
      url: `${APP_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const blogPath = path.join(process.cwd(), "data", "blog-posts.json");
    const blogContent = await fs.readFile(blogPath, "utf8");
    const blogPosts = JSON.parse(blogContent);

    blogPosts.forEach((post: any) => {
      sitemapEntries.push({
        url: `${APP_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date || new Date()),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    const moneyPagePath = path.join(process.cwd(), "data", "money-pages.json");
    const moneyPageContent = await fs.readFile(moneyPagePath, "utf8");
    const moneyPages = JSON.parse(moneyPageContent);

    moneyPages.forEach((page: any) => {
      sitemapEntries.push({
        url: `${APP_URL}/visa-photo/${page.slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  // EU country landing pages
  for (const country of allCountries) {
    for (const page of country.pages) {
      sitemapEntries.push({
        url: `${APP_URL}/${country.slugPrefix}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
