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

  return (
    <div className="w-full">
      {/* Search & Region Filter Bar */}
      <div className="mb-10 space-y-5">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or visa type (e.g., Canada Tourist, US B1/B2, Schengen, Student Visa)..."
            className="w-full pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base focus:outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-slate-900 text-lime-400 shadow-md shadow-slate-900/10 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {region === "Popular" && <span className="mr-1.5 text-amber-500">★</span>}
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Feedback */}
      <div className="flex items-center justify-between mb-6 px-1 text-xs sm:text-sm font-semibold text-slate-500">
        <span>
          Showing <strong className="text-slate-900">{filteredCountries.length}</strong> {filteredCountries.length === 1 ? 'country' : 'countries'}
        </span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("All Countries");
            }}
            className="text-lime-600 hover:text-lime-700 underline underline-offset-2"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Country Cards Grid */}
      {filteredCountries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Visa Checklists Found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            We couldn't find any countries or visas matching &quot;{searchQuery}&quot;. Try searching for &quot;Canada&quot;, &quot;US&quot;, &quot;UK&quot;, or &quot;Schengen&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("All Countries");
            }}
            className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
          >
            View All Countries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.slug}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-lime-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl filter drop-shadow-xs" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-lime-600 transition-colors">
                        <Link href={`/visa-checklist/${country.slug}`} className="focus:outline-none">
                          {country.name}
                        </Link>
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {country.region}
                      </span>
                    </div>
                  </div>

                  {country.popular && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0">
                      ★ Popular
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5">
                  {country.description}
                </p>

                {/* Badges / Specs Pill */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    📷 Photo: {country.photoSize}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                    ✓ {country.checklistsCount || (country.availableVisas?.length || 1)} Checklists
                  </span>
                </div>

                {/* Available Visas Mini List */}
                {country.availableVisas && country.availableVisas.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 flex-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Available Checklists:
                    </span>
                    {country.availableVisas.slice(0, 3).map((v) => (
                      <Link
                        key={v.slug}
                        href={`/visa-checklist/${country.slug}/${v.slug}`}
                        className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-lime-600 p-2 rounded-xl hover:bg-slate-50 transition-colors group/link"
                      >
                        <span className="truncate pr-2">{v.title}</span>
                        <span className="text-slate-300 group-hover/link:text-lime-600 group-hover/link:translate-x-0.5 transition-all text-sm shrink-0">
                          →
                        </span>
                      </Link>
                    ))}
                    {country.availableVisas.length > 3 && (
                      <span className="text-[11px] font-bold text-slate-400 pl-2 block">
                        +{country.availableVisas.length - 3} more visa types
                      </span>
                    )}
                  </div>
                )}

                {/* Primary CTA */}
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
