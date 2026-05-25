import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const apiUrl = process.env.PASSPORT_API_URL;
    const apiKey = process.env.PASSPORT_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: "API configuration is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}/validate`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Validation API failed: ${response.status} ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Map the external API response format to our internal ValidationReport format
    const {
      status,
      overall_result,
      score,
      summary,
      suggestions,
      ...rawMetrics
    } = data;

    const formattedReport = {
      status: status,
      overall_result: overall_result,
      compliance_score: score,
      summary: summary,
      suggestions: suggestions,
      metrics: rawMetrics,
    };

    return NextResponse.json(formattedReport);
  } catch (error: any) {
    console.error("Validation proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
