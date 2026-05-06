import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const { searchParams } = new URL(request.url);
  const docType = searchParams.get("document_type") || "passport";

  const API_URL = process.env.PASSPORT_API_URL;
  const API_KEY = process.env.PASSPORT_API_KEY;

  if (!API_URL) {
    return NextResponse.json({ error: "API URL not configured" }, { status: 500 });
  }

  try {
    const targetUrl = `${API_URL}/countries/${code}?document_type=${docType}`;
    
    const response = await fetch(targetUrl, {
      headers: {
        "accept": "application/json",
        ...(API_KEY && { "X-API-Key": API_KEY })
      },
      next: { revalidate: 3600 } // Cache for 1 hour to reduce API hits
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${response.statusText}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
