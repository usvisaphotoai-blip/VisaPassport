/**
 * IndexNow Shared Utility
 *
 * Submits URLs to all IndexNow-participating search engines:
 *  - Bing (api.indexnow.org — automatically shares with all participants)
 *  - Yandex
 *  - Naver
 *  - Seznam
 *  - Yep
 *
 * Per the protocol, submitting to one participating engine shares with all,
 * but we submit to the canonical endpoint (api.indexnow.org) for reliability.
 */

const SITE_HOST = "www.pixpassport.com";

/** IndexNow-participating search engine endpoints */
const SEARCH_ENGINES = [
  "api.indexnow.org",   // canonical — auto-shares with Bing, Yandex, Naver, Seznam, Yep
] as const;

const MAX_URLS_PER_BATCH = 10_000;

export interface IndexNowResult {
  engine: string;
  status: number;
  statusText: string;
  ok: boolean;
}

export interface IndexNowSubmitResult {
  submitted: number;
  results: IndexNowResult[];
  errors: string[];
}

/**
 * Submit a single URL to IndexNow.
 */
export async function submitSingleUrl(
  url: string,
  key?: string
): Promise<IndexNowResult[]> {
  const indexNowKey = key || process.env.INDEXNOW_KEY;
  if (!indexNowKey) {
    throw new Error("INDEXNOW_KEY is not set");
  }

  const results: IndexNowResult[] = [];

  for (const engine of SEARCH_ENGINES) {
    try {
      const submitUrl = `https://${engine}/indexnow?url=${encodeURIComponent(url)}&key=${indexNowKey}`;
      const res = await fetch(submitUrl, { method: "GET" });
      results.push({
        engine,
        status: res.status,
        statusText: res.statusText,
        ok: res.ok || res.status === 202,
      });
    } catch (err: any) {
      results.push({
        engine,
        status: 0,
        statusText: err.message || "Network error",
        ok: false,
      });
    }
  }

  return results;
}

/**
 * Submit a batch of URLs to IndexNow (up to 10,000 per POST).
 * Automatically chunks if more than MAX_URLS_PER_BATCH.
 */
export async function submitBatchUrls(
  urls: string[],
  key?: string
): Promise<IndexNowSubmitResult> {
  const indexNowKey = key || process.env.INDEXNOW_KEY;
  if (!indexNowKey) {
    throw new Error("INDEXNOW_KEY is not set");
  }

  if (urls.length === 0) {
    return { submitted: 0, results: [], errors: [] };
  }

  // Single URL — use GET for simplicity
  if (urls.length === 1) {
    const results = await submitSingleUrl(urls[0], indexNowKey);
    return { submitted: 1, results, errors: [] };
  }

  const allResults: IndexNowResult[] = [];
  const errors: string[] = [];

  // Chunk URLs into batches of MAX_URLS_PER_BATCH
  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_BATCH) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_BATCH));
  }

  for (const chunk of chunks) {
    const payload = {
      host: SITE_HOST,
      key: indexNowKey,
      urlList: chunk,
    };

    for (const engine of SEARCH_ENGINES) {
      try {
        const res = await fetch(`https://${engine}/indexnow`, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });

        allResults.push({
          engine,
          status: res.status,
          statusText: res.statusText,
          ok: res.ok || res.status === 202,
        });

        if (!res.ok && res.status !== 202) {
          const body = await res.text().catch(() => "");
          errors.push(`[${engine}] HTTP ${res.status}: ${body}`);
        }
      } catch (err: any) {
        const msg = err.message || "Network error";
        errors.push(`[${engine}] ${msg}`);
        allResults.push({
          engine,
          status: 0,
          statusText: msg,
          ok: false,
        });
      }
    }
  }

  return {
    submitted: urls.length,
    results: allResults,
    errors,
  };
}

/**
 * Parse all <loc> URLs from a sitemap XML string.
 */
export function parseSitemapUrls(xml: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  }
  return urls;
}
