// Pricing for the HD print sheet download. Kept separate from lib/currency.ts,
// which prices the main passport photo product.

export interface PrintSheetPrice {
  currency: string;
  amount: number;
  symbol: string;
  decimals: number;
  formatted: string;
}

// Base price is 2 in USD / GBP / EUR; other currencies are rounded local equivalents
const PRINT_SHEET_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  USD: { amount: 2, symbol: "$", decimals: 2 },
  GBP: { amount: 2, symbol: "£", decimals: 2 },
  EUR: { amount: 2, symbol: "€", decimals: 2 },
  CHF: { amount: 2, symbol: "CHF ", decimals: 2 },
  CAD: { amount: 2.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 2.99, symbol: "A$", decimals: 2 },
  NZD: { amount: 3.49, symbol: "NZ$", decimals: 2 },
  SGD: { amount: 2.99, symbol: "S$", decimals: 2 },
  HKD: { amount: 15, symbol: "HK$", decimals: 0 },
  JPY: { amount: 300, symbol: "¥", decimals: 0 },
  KRW: { amount: 2900, symbol: "₩", decimals: 0 },
  TWD: { amount: 59, symbol: "NT$", decimals: 0 },
  AED: { amount: 7, symbol: "AED ", decimals: 0 },
  SAR: { amount: 7, symbol: "SAR ", decimals: 0 },
  ILS: { amount: 7, symbol: "₪", decimals: 0 },
  PLN: { amount: 7.99, symbol: "zł", decimals: 2 },
  SEK: { amount: 22, symbol: "kr ", decimals: 0 },
  NOK: { amount: 22, symbol: "kr ", decimals: 0 },
  DKK: { amount: 15, symbol: "kr ", decimals: 0 },
  CZK: { amount: 45, symbol: "Kč ", decimals: 0 },
  INR: { amount: 30, symbol: "₹", decimals: 0 },
  CNY: { amount: 14, symbol: "¥", decimals: 0 },
  BRL: { amount: 9.9, symbol: "R$", decimals: 2 },
  MXN: { amount: 35, symbol: "$", decimals: 0 },
  TRY: { amount: 59, symbol: "₺", decimals: 0 },
  ZAR: { amount: 35, symbol: "R", decimals: 0 },
  MYR: { amount: 8.9, symbol: "RM", decimals: 2 },
  THB: { amount: 69, symbol: "฿", decimals: 0 },
  IDR: { amount: 25000, symbol: "Rp", decimals: 0 },
  PHP: { amount: 99, symbol: "₱", decimals: 0 },
  VND: { amount: 39000, symbol: "₫", decimals: 0 },
  PKR: { amount: 299, symbol: "Rs ", decimals: 0 },
  NGN: { amount: 1500, symbol: "₦", decimals: 0 },
  EGP: { amount: 79, symbol: "E£", decimals: 0 },
  COP: { amount: 7900, symbol: "$", decimals: 0 },
};

// ISO 4217 currencies without a minor unit; everything else is charged in cents / paise etc.
const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "KRW", "VND", "CLP"]);

export const PRINT_SHEET_PRODUCT = "print_sheet_hd";
export const PRINT_SHEET_PRODUCT_NAME = "HD Passport Photo Print Sheet";

export function isSupportedPrintSheetCurrency(currency: string | null | undefined): boolean {
  return !!currency && currency.toUpperCase() in PRINT_SHEET_PRICES;
}

/** Price for a currency, falling back to USD for anything unsupported. */
export function getPrintSheetPrice(currency?: string | null): PrintSheetPrice {
  const code = isSupportedPrintSheetCurrency(currency) ? currency!.toUpperCase() : "USD";
  const { amount, symbol, decimals } = PRINT_SHEET_PRICES[code];
  return {
    currency: code,
    amount,
    symbol,
    decimals,
    formatted: `${symbol}${decimals === 0 ? amount.toLocaleString("en-US") : amount.toFixed(decimals)}`,
  };
}

/** Amount in the smallest currency unit, as Razorpay expects. */
export function toMinorUnits(price: Pick<PrintSheetPrice, "amount" | "currency">): number {
  return ZERO_DECIMAL_CURRENCIES.has(price.currency)
    ? Math.round(price.amount)
    : Math.round(price.amount * 100);
}
