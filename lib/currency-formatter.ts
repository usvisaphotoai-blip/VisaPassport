/**
 * Currency Formatting Engine
 * Formats all currencies supported in lib/currency.ts with clean, PDF-safe and email-safe formatting.
 * Avoids unicode characters (like ₹, €, £, ₩, ₺, ₪) in jsPDF WinAnsi Helvetica to prevent rendering artifacts.
 */

export interface CurrencyConfig {
  code: string;
  name: string;
  prefix: string;
  decimals: number;
  symbol: string; // Unicode symbol (for web UI)
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  // Tier 1: Base Currencies
  USD: { code: "USD", name: "US Dollar", prefix: "$", decimals: 2, symbol: "$" },
  EUR: { code: "EUR", name: "Euro", prefix: "EUR ", decimals: 2, symbol: "€" },
  GBP: { code: "GBP", name: "British Pound", prefix: "GBP ", decimals: 2, symbol: "£" },
  CHF: { code: "CHF", name: "Swiss Franc", prefix: "CHF ", decimals: 2, symbol: "CHF" },
  CAD: { code: "CAD", name: "Canadian Dollar", prefix: "CAD ", decimals: 2, symbol: "C$" },
  AUD: { code: "AUD", name: "Australian Dollar", prefix: "AUD ", decimals: 2, symbol: "A$" },
  NZD: { code: "NZD", name: "New Zealand Dollar", prefix: "NZD ", decimals: 2, symbol: "NZ$" },
  JPY: { code: "JPY", name: "Japanese Yen", prefix: "JPY ", decimals: 0, symbol: "¥" },
  SGD: { code: "SGD", name: "Singapore Dollar", prefix: "SGD ", decimals: 2, symbol: "S$" },
  HKD: { code: "HKD", name: "Hong Kong Dollar", prefix: "HKD ", decimals: 0, symbol: "HK$" },

  // Tier 2: Scandinavian, Middle East & Pacific
  KRW: { code: "KRW", name: "South Korean Won", prefix: "KRW ", decimals: 0, symbol: "₩" },
  TWD: { code: "TWD", name: "New Taiwan Dollar", prefix: "NT$ ", decimals: 0, symbol: "NT$" },
  AED: { code: "AED", name: "UAE Dirham", prefix: "AED ", decimals: 0, symbol: "AED" },
  SAR: { code: "SAR", name: "Saudi Riyal", prefix: "SAR ", decimals: 0, symbol: "SAR" },
  ILS: { code: "ILS", name: "Israeli Shekel", prefix: "ILS ", decimals: 0, symbol: "₪" },
  PLN: { code: "PLN", name: "Polish Zloty", prefix: "PLN ", decimals: 2, symbol: "zł" },
  SEK: { code: "SEK", name: "Swedish Krona", prefix: "SEK ", decimals: 0, symbol: "kr" },
  NOK: { code: "NOK", name: "Norwegian Krone", prefix: "NOK ", decimals: 0, symbol: "kr" },
  DKK: { code: "DKK", name: "Danish Krone", prefix: "DKK ", decimals: 0, symbol: "kr" },
  CZK: { code: "CZK", name: "Czech Koruna", prefix: "CZK ", decimals: 0, symbol: "Kč" },

  // Tier 3: Asian & Latin Markets
  INR: { code: "INR", name: "Indian Rupee", prefix: "INR ", decimals: 2, symbol: "₹" },
  CNY: { code: "CNY", name: "Chinese Yuan", prefix: "CNY ", decimals: 0, symbol: "¥" },
  BRL: { code: "BRL", name: "Brazilian Real", prefix: "R$ ", decimals: 0, symbol: "R$" },
  MXN: { code: "MXN", name: "Mexican Peso", prefix: "MX$ ", decimals: 0, symbol: "$" },
  TRY: { code: "TRY", name: "Turkish Lira", prefix: "TRY ", decimals: 0, symbol: "₺" },
  ZAR: { code: "ZAR", name: "South African Rand", prefix: "ZAR ", decimals: 0, symbol: "R" },
  MYR: { code: "MYR", name: "Malaysian Ringgit", prefix: "MYR ", decimals: 2, symbol: "RM" },
  THB: { code: "THB", name: "Thai Baht", prefix: "THB ", decimals: 0, symbol: "฿" },

  // Tier 4: Emerging Markets
  IDR: { code: "IDR", name: "Indonesian Rupiah", prefix: "IDR ", decimals: 0, symbol: "Rp" },
  PHP: { code: "PHP", name: "Philippine Peso", prefix: "PHP ", decimals: 0, symbol: "₱" },
  VND: { code: "VND", name: "Vietnamese Dong", prefix: "VND ", decimals: 0, symbol: "₫" },
  PKR: { code: "PKR", name: "Pakistani Rupee", prefix: "PKR ", decimals: 0, symbol: "Rs" },
  NGN: { code: "NGN", name: "Nigerian Naira", prefix: "NGN ", decimals: 0, symbol: "₦" },
  EGP: { code: "EGP", name: "Egyptian Pound", prefix: "EGP ", decimals: 0, symbol: "E£" },
  COP: { code: "COP", name: "Colombian Peso", prefix: "COP ", decimals: 0, symbol: "$" },
  ARS: { code: "ARS", name: "Argentine Peso", prefix: "ARS ", decimals: 0, symbol: "$" },
  CLP: { code: "CLP", name: "Chilean Peso", prefix: "CLP ", decimals: 0, symbol: "$" },
};

export interface FormatCurrencyOptions {
  usePdfSafeCode?: boolean; // Defaults to true (safe ASCII)
  forceDecimals?: number;   // Override decimal places
  compact?: boolean;        // Space trimming
}

/**
 * Formats a numeric amount with the appropriate currency prefix.
 * Produces clean, professional outputs suitable for both invoices and emails.
 *
 * Examples:
 * - formatCurrency(10, "INR") -> "INR 10.00"
 * - formatCurrency(7.99, "USD") -> "$7.99"
 * - formatCurrency(6.99, "EUR") -> "EUR 6.99"
 * - formatCurrency(1100, "JPY") -> "JPY 1100"
 * - formatCurrency(9.99, "AUD") -> "AUD 9.99"
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  options: FormatCurrencyOptions = {}
): string {
  const num = Number(amount);
  const safeNum = isNaN(num) ? 0 : num;
  const currCode = (currency || "USD").toUpperCase().trim();
  const config = SUPPORTED_CURRENCIES[currCode];

  // Determine decimal places:
  // If explicitly specified in options, use it.
  // Otherwise, if the number has non-zero fractional cents (e.g. 9.99 or 14.5), show 2 decimals.
  // Otherwise, use the standard currency configuration (e.g. 2 for USD/INR/EUR, 0 for JPY/KRW).
  let decimals = 2;
  if (options.forceDecimals !== undefined) {
    decimals = options.forceDecimals;
  } else if (config) {
    const hasFraction = safeNum % 1 !== 0;
    decimals = hasFraction ? 2 : config.decimals;
  }

  const prefix = config ? config.prefix : `${currCode} `;
  const formattedNum = safeNum.toFixed(decimals);

  return `${prefix}${formattedNum}`.trim();
}

/**
 * Returns the currency symbol or prefix for a given currency code.
 */
export function getCurrencyPrefix(currency: string = "USD"): string {
  const currCode = (currency || "USD").toUpperCase().trim();
  return SUPPORTED_CURRENCIES[currCode]?.prefix || `${currCode} `;
}

/**
 * Aggregates an array of items with amount and currency into a totals record.
 */
export function aggregateCurrencyAmounts(
  items: Array<{ amount?: number; total?: number; currency?: string }>
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of items) {
    const rawAmt = item.total !== undefined ? item.total : item.amount;
    const amt = Number(rawAmt) || 0;
    if (amt <= 0) continue;
    const curr = (item.currency || "USD").toUpperCase().trim();
    totals[curr] = (totals[curr] || 0) + amt;
  }
  return totals;
}

/**
 * Formats a map/record of currencies and totals into a clean, combined multi-currency string.
 * Example: { "INR": 49500, "USD": 120, "EUR": 45 } -> "INR 49,500.00 + $120.00 + EUR 45.00"
 */
export function formatMultiCurrency(
  totalsMap: Record<string, number> | Map<string, number> | undefined,
  options: { joinWith?: string; fallback?: string } = {}
): string {
  if (!totalsMap) return options.fallback || "$0.00";

  const entries: [string, number][] =
    totalsMap instanceof Map
      ? Array.from(totalsMap.entries())
      : Object.entries(totalsMap);

  const activeEntries = entries.filter(([_, amt]) => Number(amt) > 0);

  if (activeEntries.length === 0) {
    return options.fallback || "$0.00";
  }

  // Sort: USD and INR first if present, then alphabetical
  activeEntries.sort(([currA], [currB]) => {
    const priority: Record<string, number> = { USD: 1, INR: 2, EUR: 3, GBP: 4, CAD: 5, AUD: 6 };
    const pA = priority[currA] || 99;
    const pB = priority[currB] || 99;
    if (pA !== pB) return pA - pB;
    return currA.localeCompare(currB);
  });

  const parts = activeEntries.map(([curr, amt]) => {
    return formatCurrency(amt, curr);
  });

  return parts.join(options.joinWith || " + ");
}

/**
 * Sanitizes input string to ensure compatibility with jsPDF standard WinAnsi / ASCII fonts.
 * Transliterates accented characters (e.g. é -> e, ü -> u) and strips unsupported unicode symbols.
 */
export function sanitizePdfText(text: string | null | undefined): string {
  if (!text) return "";
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Strip diacritics
    .replace(/[^\x20-\x7E\n\r\t]/g, " ") // Replace non-ASCII printable chars with space
    .replace(/ +/g, " ")
    .trim();
}


