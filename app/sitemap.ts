import { MetadataRoute } from "next";
import path from "path";
import fs from "fs/promises";
import { getAllSlugs, getAllVisaSlugs } from "../lib/slug-utils";

const APP_URL = "https://www.pixpassport.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${APP_URL}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/tool`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/visa-photo-validator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${APP_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${APP_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/refund-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Programmatic Global Pages (100+)
  const globalSlugs = getAllSlugs();
  globalSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${APP_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Visa Silo Pages (50+)
  const visaSlugs = getAllVisaSlugs();
  visaSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${APP_URL}/visa-photo/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  try {
    // Legacy/Core SEO targets (optional, keeping if file exists)
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
    } catch (e) { }

    // Blog
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

    // Money Pages (Visa Photos) - Requested to keep ("dont tuch visa routs")
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

  return sitemapEntries;
}
