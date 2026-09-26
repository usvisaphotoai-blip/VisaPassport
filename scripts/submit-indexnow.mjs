#!/usr/bin/env node

/**
 * IndexNow Manual Submission Script
 *
 * Usage:
 *   # Submit all sitemap URLs
 *   node scripts/submit-indexnow.mjs
 *
 *   # Submit specific URLs
 *   node scripts/submit-indexnow.mjs https://www.pixpassport.com/new-page https://www.pixpassport.com/updated-page
 *
 * Requires: INDEXNOW_KEY in .env or as environment variable
 */

import "dotenv/config";

const SITE_HOST = "www.pixpassport.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITEMAP_URL = `https://${SITE_HOST}/sitemap.xml`;
const SEARCH_ENGINE = "api.indexnow.org";

if (!INDEXNOW_KEY) {
  console.error("❌ INDEXNOW_KEY is not set. Add it to your .env file.");
  process.exit(1);
}

/**
 * Parse <loc> URLs from sitemap XML.
 */
function parseSitemapUrls(xml) {
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  }
  return urls;
}

/**
 * Submit URLs via POST to IndexNow.
 */
async function submitBatch(urls) {
  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    urlList: urls,
  };

  console.log(`\n📤 Submitting ${urls.length} URLs to ${SEARCH_ENGINE}...`);

  const res = await fetch(`https://${SEARCH_ENGINE}/indexnow`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const statusEmoji = res.ok || res.status === 202 ? "✅" : "❌";
  console.log(`${statusEmoji} ${SEARCH_ENGINE}: HTTP ${res.status} ${res.statusText}`);

  if (!res.ok && res.status !== 202) {
    const body = await res.text().catch(() => "");
    console.error(`   Response: ${body}`);
  }

  return { status: res.status, ok: res.ok || res.status === 202 };
}

async function main() {
  const args = process.argv.slice(2);

  let urls;

  if (args.length > 0) {
    // Submit specific URLs from CLI arguments
    urls = args.filter((arg) => arg.startsWith("http"));
    if (urls.length === 0) {
      console.error("❌ No valid URLs provided. URLs must start with http:// or https://");
      process.exit(1);
    }
    console.log(`🔗 Submitting ${urls.length} URL(s) from CLI arguments...`);
  } else {
    // Fetch and parse sitemap
    console.log(`🗺️  Fetching sitemap from ${SITEMAP_URL}...`);
    const res = await fetch(SITEMAP_URL);

    if (!res.ok) {
      console.error(`❌ Failed to fetch sitemap: HTTP ${res.status}`);
      process.exit(1);
    }

    const xml = await res.text();
    urls = parseSitemapUrls(xml);
    console.log(`📋 Found ${urls.length} URLs in sitemap`);
  }

  if (urls.length === 0) {
    console.log("⚠️  No URLs to submit.");
    process.exit(0);
  }

  // Show first few URLs
  console.log("\n📝 Sample URLs:");
  urls.slice(0, 5).forEach((url) => console.log(`   ${url}`));
  if (urls.length > 5) {
    console.log(`   ... and ${urls.length - 5} more`);
  }

  // Submit in batches of 10,000
  const BATCH_SIZE = 10_000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await submitBatch(batch);
  }

  console.log(`\n🎉 Done! ${urls.length} URLs submitted to IndexNow.`);
  console.log("   Search engines will crawl and index these pages soon.");
}

main().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
