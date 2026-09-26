import { NextResponse } from "next/server";
import {
  submitBatchUrls,
  parseSitemapUrls,
} from "@/lib/indexnow";

/**
 * IndexNow Cron Job
 *
 * Automatically submits ALL sitemap URLs to IndexNow search engines.
 * Runs on a daily schedule via Vercel Cron.
 *
 * GET /api/cron/indexnow
 * Header: Authorization: Bearer <CRON_SECRET>
 */
export async function GET(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const indexNowKey = process.env.INDEXNOW_KEY;
    if (!indexNowKey) {
      return NextResponse.json(
        { error: "INDEXNOW_KEY not configured" },
        { status: 500 }
      );
    }

    // Fetch the live sitemap
    const sitemapUrl = "https://www.pixpassport.com/sitemap.xml";
    console.log(`[cron/indexnow] Fetching sitemap from ${sitemapUrl}...`);

    const sitemapRes = await fetch(sitemapUrl, {
      headers: { "User-Agent": "PixPassport-IndexNow-Bot/1.0" },
    });

    if (!sitemapRes.ok) {
      console.error(`[cron/indexnow] Failed to fetch sitemap: ${sitemapRes.status}`);
      return NextResponse.json(
        { error: `Sitemap fetch failed: ${sitemapRes.status}` },
        { status: 502 }
      );
    }

    const xml = await sitemapRes.text();
    const urls = parseSitemapUrls(xml);

    console.log(`[cron/indexnow] Parsed ${urls.length} URLs from sitemap`);

    if (urls.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No URLs found in sitemap",
        submitted: 0,
      });
    }

    // Submit all URLs
    const result = await submitBatchUrls(urls, indexNowKey);

    console.log(
      `[cron/indexnow] Submission complete. Submitted: ${result.submitted}, Errors: ${result.errors.length}`
    );

    if (result.errors.length > 0) {
      console.warn("[cron/indexnow] Errors:", result.errors);
    }

    return NextResponse.json({
      success: true,
      message: `IndexNow: ${result.submitted} URLs submitted to search engines`,
      submitted: result.submitted,
      results: result.results,
      errors: result.errors,
    });
  } catch (error: any) {
    console.error("[cron/indexnow] Cron error:", error);
    return NextResponse.json(
      { error: "IndexNow cron failed", details: error.message },
      { status: 500 }
    );
  }
}
