import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/dashboard/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
    ],
    sitemap: "https://www.usvisaphotoai.pro/sitemap.xml",
  };
}