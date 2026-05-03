import { NextRequest, NextResponse } from "next/server";
import { NodeHtmlMarkdown } from "node-html-markdown";

export async function GET(req: NextRequest) {
  const targetPath = req.nextUrl.searchParams.get("path");

  if (!targetPath) {
    return new NextResponse("Missing path parameter", { status: 400 });
  }

  // Construct the full URL to the local page
  const url = new URL(targetPath, req.nextUrl.origin);

  // Clone headers to forward them (e.g., cookies for auth)
  const headers = new Headers(req.headers);
  
  // CRITICAL: Override the Accept header to request HTML, otherwise we'll enter an infinite loop!
  headers.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
  
  try {
    const response = await fetch(url.toString(), {
      headers,
    });

    if (!response.ok) {
      return new NextResponse("Error fetching original content", { status: response.status });
    }

    const html = await response.text();
    
    // Parse the HTML into Markdown
    const markdown = NodeHtmlMarkdown.translate(html);
    
    // Estimate tokens (roughly 1 token per 4 characters in English text)
    const estimatedTokens = Math.ceil(markdown.length / 4);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "x-markdown-tokens": estimatedTokens.toString(),
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      },
    });
  } catch (error) {
    console.error("Failed to generate markdown:", error);
    return new NextResponse("Internal Server Error generating markdown", { status: 500 });
  }
}
