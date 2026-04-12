// Map country codes to currencies
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  IN: "INR",
  GB: "GBP",
  EU: "EUR", // Europe generic
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
  CA: "CAD",
  AU: "AUD",
  JP: "JPY",
  CN: "CNY",
  MX: "MXN",
  BR: "BRL",
  US: "USD"
};

// Fixed price mapping for specific currencies
const FIXED_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  USD: { amount: 5.99, symbol: "$", decimals: 2 },
  EUR: { amount: 5.99, symbol: "€", decimals: 2 },
  GBP: { amount: 5.99, symbol: "£", decimals: 2 },
  INR: { amount: 199, symbol: "₹", decimals: 0 },
  JPY: { amount: 799, symbol: "¥", decimals: 0 },
  BRL: { amount: 30, symbol: "R$", decimals: 0 },
  CAD: { amount: 4.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 5.99, symbol: "A$", decimals: 2 },
  MXN: { amount: 99, symbol: "$", decimals: 0 },
  CNY: { amount: 29, symbol: "¥", decimals: 0 }, // Added CNY as a guess if not provided
};

export interface LocalPrice {
  currency: string;
  amount: number; // Decimal amount (e.g. 5.99 or 399)
  formatted: string; // e.g. "$5.99" or "₹399"
  symbol: string;
}

export async function getLocalPrice(
  baseUsdPrice: number = 5.99,
  forcedCurrency?: string,
): Promise<LocalPrice> {
  try {
    let currency = "USD";

    if (forcedCurrency) {
      currency = forcedCurrency.toUpperCase();
    } else {
      // 1. Try to detect country from Vercel header
      try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        const country = headersList.get("x-vercel-ip-country");
        if (country && COUNTRY_TO_CURRENCY[country]) {
          currency = COUNTRY_TO_CURRENCY[country];
        }
      } catch (e) {
        // Fallback to timezone check if header fails or not on Vercel
        currency = getClientTimezoneCurrency();
      }
    }

    // Use fixed price if available, otherwise fallback to baseUsdPrice
    const fixed = FIXED_PRICES[currency] || FIXED_PRICES["USD"];
    const amount = fixed.amount;
    const symbol = fixed.symbol;
    const decimals = fixed.decimals;

    // Format currency
    const formatted = decimals === 0 
      ? `${symbol}${amount}`
      : `${symbol}${amount.toFixed(decimals)}`;

    return {
      currency,
      amount,
      formatted,
      symbol,
    };
  } catch (error) {
    console.error("Failed to get local price, falling back to USD", error);
    return {
      currency: "USD",
      amount: 5.99,
      formatted: "$5.99",
      symbol: "$",
    };
  }
}

// Client-side utility to guess currency from timezone (100% free, no rate limits)
export function getClientTimezoneCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) return 'INR';
    if (tz.includes('London')) return 'GBP';
    if (tz.startsWith('Europe/')) return 'EUR';
    if (tz.includes('Toronto') || tz.includes('Vancouver')) return 'CAD';
    if (tz.startsWith('Australia/')) return 'AUD';
    if (tz.includes('Tokyo')) return 'JPY';
    if (tz.includes('Shanghai')) return 'CNY';
    if (tz.includes('Mexico_City')) return 'MXN';
    if (tz.includes('Sao_Paulo')) return 'BRL';
    return 'USD';
  } catch (e) {
    return 'USD';
  }
}
