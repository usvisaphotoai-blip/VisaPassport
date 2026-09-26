import { NextResponse } from "next/server";
import { getLocalPrice } from "@/lib/currency";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get("currency") || "USD";
    const isExpert = searchParams.get("isExpert") === "true";
    
    const basePriceParam = searchParams.get("basePrice");
    const defaultBasePrice = isExpert ? 9.99 : 6.99;
    const basePrice = basePriceParam ? parseFloat(basePriceParam) : defaultBasePrice;
    
    const localPrice = await getLocalPrice(basePrice, currency, isExpert);
    
    return NextResponse.json(localPrice);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch price" }, { status: 500 });
  }
}
