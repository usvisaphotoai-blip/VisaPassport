import { ukData } from "./uk";
import { germanyData } from "./germany";
import { swedenData } from "./sweden";
import { franceData } from "./france";
import { switzerlandData } from "./switzerland";
import { norwayData } from "./norway";
import { luxembourgData } from "./luxembourg";
import { denmarkData } from "./denmark";
import { netherlandsData } from "./netherlands";
import { austriaData } from "./austria";
import { finlandData } from "./finland";
import type { FullCountryData } from "./types";

export const allCountries: FullCountryData[] = [
  ukData,
  germanyData,
  swedenData,
  franceData,
  switzerlandData,
  norwayData,
  luxembourgData,
  denmarkData,
  netherlandsData,
  austriaData,
  finlandData,
];

// Lookup helpers
export function getCountryBySlugPrefix(prefix: string): FullCountryData | undefined {
  return allCountries.find((c) => c.slugPrefix === prefix);
}

export function getPageBySlug(country: FullCountryData, slug: string) {
  return country.pages.find((p) => p.slug === slug);
}

// Price map per currency for display
export const priceDisplay: Record<string, string> = {
  GBP: "£5.99",
  EUR: "€5.99",
  CHF: "CHF 5.00",
  SEK: "50 kr",
  NOK: "50 kr",
  DKK: "30 kr",
};
