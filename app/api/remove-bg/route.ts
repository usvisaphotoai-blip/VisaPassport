import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiUrl = process.env.REMOVE_BG_API_URL;
    const apiToken = process.env.REMOVE_BG_API_TOKEN;

    if (!apiUrl || !apiToken) {
      console.error("Missing REMOVE_BG_API_URL or REMOVE_BG_API_TOKEN configuration");
      return NextResponse.json({ error: "Background removal service is not configured" }, { status: 500 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", file);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${apiToken}`,
      },
      body: backendFormData,
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("BG removal API failed:", res.status, errorData);
      return NextResponse.json({ error: "Background removal API failed", details: errorData }, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
      },
    });

  } catch (err: any) {
    console.error("Proxy remove-bg error:", err);
    return NextResponse.json({ error: "Failed to process background removal", details: err.message }, { status: 500 });
  }
}
