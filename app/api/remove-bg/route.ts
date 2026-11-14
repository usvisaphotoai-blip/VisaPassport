import { NextRequest, NextResponse } from "next/server";

// Sliding window rate limiter to protect upstream paid API credits
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string, limit = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip")) || "anonymous";

    if (!checkRateLimit(ip, 15, 60000)) {
      return NextResponse.json(
        { error: "Too many background removal requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 15MB maximum limit" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Uploaded file must be a valid image" }, { status: 400 });
    }

    const apiBase = (process.env.PASSPORT_API_URL || "https://api.pixpassport.com").replace(/\/$/, "");
    const apiKey = process.env.PASSPORT_API_KEY;

    if (!apiKey) {
      console.error("Missing PASSPORT_API_KEY configuration");
      return NextResponse.json({ error: "Background removal service is not configured" }, { status: 500 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", file, file.name || "photo.jpg");

    const res = await fetch(`${apiBase}/remove-bg`, {
      method: "POST",
      headers: {
        accept: "image/png",
        "X-API-Key": apiKey,
      },
      body: backendFormData,
      signal: AbortSignal.timeout(45_000),
    });

    if (!res.ok) {
      const errorText = await res.text();
      let message = "Background removal API failed";
      try {
        const parsed = JSON.parse(errorText) as Record<string, unknown>;
        if (typeof parsed.error === "string" && parsed.error) message = parsed.error;
        else if (typeof parsed.detail === "string" && parsed.detail) message = parsed.detail;
        else if (typeof parsed.message === "string" && parsed.message) message = parsed.message;
      } catch {
        // Upstream returned non-JSON error body
      }
      console.error("BG removal API failed:", res.status, errorText);
      return NextResponse.json({ error: message, details: errorText }, { status: res.status });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: unknown) {
    console.error("Proxy remove-bg error:", err);
    const details = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Failed to process background removal", details }, { status: 500 });
  }
}
