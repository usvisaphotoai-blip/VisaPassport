import { NextRequest, NextResponse } from "next/server";
import {
  submitSingleUrl,
  submitBatchUrls,
  parseSitemapUrls,
} from "@/lib/indexnow";

/**
 * IndexNow API Route
 *
 * POST /api/indexnow
 * Body:
 *   { "urls": ["https://..."] }          — submit specific URLs
 *   { "url": "https://..." }             — submit a single URL
 *   { "sitemap": true }                  — submit all sitemap URLs
 *
 * Protected by CRON_SECRET (Authorization: Bearer <secret>).
 */
export async function POST(req: NextRequest) {
  try {
    // Auth check
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Mode 1: Submit from sitemap
    if (body.sitemap === true) {
      const sitemapUrl = body.sitemapUrl || "https://www.pixpassport.com/sitemap.xml";
      const sitemapRes = await fetch(sitemapUrl);

      if (!sitemapRes.ok) {
        return NextResponse.json(
          { error: `Failed to fetch sitemap: ${sitemapRes.status}` },
          { status: 502 }
        );
      }

      const xml = await sitemapRes.text();
      const urls = parseSitemapUrls(xml);

      console.log(`[indexnow] Parsed ${urls.length} URLs from sitemap`);

      const result = await submitBatchUrls(urls);

      return NextResponse.json({
        success: true,
        mode: "sitemap",
        ...result,
      });
    }

    // Mode 2: Submit specific URLs
    if (body.urls && Array.isArray(body.urls)) {
      const result = await submitBatchUrls(body.urls);
      return NextResponse.json({
        success: true,
        mode: "batch",
        ...result,
      });
    }

    // Mode 3: Submit a single URL
    if (body.url && typeof body.url === "string") {
      const results = await submitSingleUrl(body.url);
      return NextResponse.json({
        success: true,
        mode: "single",
        submitted: 1,
        results,
      });
    }

    return NextResponse.json(
      {
        error: "Invalid request. Provide 'url' (string), 'urls' (array), or 'sitemap' (true).",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[indexnow] API error:", error);
    return NextResponse.json(
      { error: "IndexNow submission failed", details: error.message },
      { status: 500 }
    );
  }
}
