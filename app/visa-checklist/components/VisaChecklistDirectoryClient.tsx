"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CountryMeta } from "@/lib/visa-checklist";

interface Props {
  countries: CountryMeta[];
}

const REGIONS = [
  "All Countries",
  "Popular",
  "North America",
  "Europe / Schengen",
  "Asia & Pacific",
  "Middle East",
];

export default function VisaChecklistDirectoryClient({ countries }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Countries");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch =
        searchQuery === "" ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (country.availableVisas &&
          country.availableVisas.some(
            (v) =>
              v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              v.visaType.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesRegion =
        selectedRegion === "All Countries"
          ? true
          : selectedRegion === "Popular"
          ? country.popular
          : country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, selectedRegion]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All Countries");
  };

  return (
    <div className="w-full">
      {/* Search & region filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or visa type"
            aria-label="Search country or visa type"
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                aria-pressed={isSelected}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-slate-500">
        <span>
          {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
        </span>
        {(searchQuery || selectedRegion !== "All Countries") && (
          <button onClick={resetFilters} className="font-medium text-slate-700 hover:text-slate-900">
            Clear filters
          </button>
        )}
      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200">
          <h3 className="text-base font-semibold text-slate-900 mb-1">No checklists found</h3>
          <p className="text-sm text-slate-500 mb-5">
            Nothing matches &quot;{searchQuery}&quot;. Try Canada, US, UK or Schengen.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm transition-colors"
          >
            View all countries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country) => (
            <div
              key={country.slug}
              className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)] transition-all"
            >
              <div className="flex items-center gap-3 p-5 pb-4">
                <span className="text-3xl leading-none" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-slate-900">
                    <Link href={`/visa-checklist/${country.slug}`} className="hover:text-lime-700 transition-colors">
                      {country.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {country.region} · Photo {country.photoSize}
                  </p>
                </div>
                {country.popular && (
                  <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    Popular
                  </span>
                )}
              </div>

              {country.availableVisas && country.availableVisas.length > 0 && (
                <ul className="flex-1 border-t border-slate-100 px-2 py-2">
                  {country.availableVisas.slice(0, 3).map((v) => (
                    <li key={v.slug}>
                      <Link
                        href={`/visa-checklist/${country.slug}/${v.slug}`}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors group/link"
                      >
                        <span className="truncate">{v.title}</span>
                        <span className="text-slate-300 group-hover/link:text-slate-600 transition-colors" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                  {country.availableVisas.length > 3 && (
                    <li>
                      <Link
                        href={`/visa-checklist/${country.slug}`}
                        className="block px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900"
                      >
                        +{country.availableVisas.length - 3} more
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
