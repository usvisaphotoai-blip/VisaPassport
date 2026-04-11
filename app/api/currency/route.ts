import { NextResponse } from "next/server";
import { getLocalPrice } from "@/lib/currency";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get("currency") || "USD";
    
    const localPrice = await getLocalPrice(5.99, currency);
    
    return NextResponse.json(localPrice);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch price" }, { status: 500 });
  }
}
