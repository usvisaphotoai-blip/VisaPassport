// Price A/B test: visitors are bucketed into A (control) or B via a sticky cookie
// set in middleware. Only standard (non-expert) prices for the currencies below change.
export const PRICE_AB_COOKIE = "px_price_ab";
export const PRICE_AB_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export type PriceVariant = "A" | "B";

export const PRICE_VARIANT_B_OVERRIDES: Record<string, number> = {
  USD: 8.99,
  EUR: 7.99,
  GBP: 7.99,
};

export function isPriceVariant(value: unknown): value is PriceVariant {
  return value === "A" || value === "B";
}

export function assignPriceVariant(): PriceVariant {
  return Math.random() < 0.65 ? "A" : "B";
}

export async function getPriceVariant(): Promise<PriceVariant> {
  try {
    const { cookies } = await import("next/headers");
    const value = (await cookies()).get(PRICE_AB_COOKIE)?.value;
    return isPriceVariant(value) ? value : "A";
  } catch {
    return "A";
  }
}
