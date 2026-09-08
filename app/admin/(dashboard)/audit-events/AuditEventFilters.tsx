"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { AuditEventType } from "@/models/AuditEvent";

interface AuditEventFiltersProps {
  currentType?: string;
  currentSearch?: string;
  currentDatePreset?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  counts: Record<string, number>;
  totalCount: number;
}

export default function AuditEventFilters({
  currentType,
  currentSearch = "",
  currentDatePreset = "all",
  currentStartDate = "",
  currentEndDate = "",
  counts,
  totalCount,
}: AuditEventFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [startDate, setStartDate] = useState(currentStartDate);
  const [endDate, setEndDate] = useState(currentEndDate);
  const [showCustomDate, setShowCustomDate] = useState(currentDatePreset === "custom");

  const applyFilters = (updates: {
    type?: string;
    q?: string;
    datePreset?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.type !== undefined) {
      if (!updates.type || updates.type === "all") params.delete("type");
      else params.set("type", updates.type);
    }

    if (updates.q !== undefined) {
      if (!updates.q.trim()) params.delete("q");
      else params.set("q", updates.q.trim());
    }

    if (updates.datePreset !== undefined) {
      if (updates.datePreset === "all") {
        params.delete("datePreset");
        params.delete("startDate");
        params.delete("endDate");
      } else {
        params.set("datePreset", updates.datePreset);
        if (updates.datePreset !== "custom") {
          params.delete("startDate");
          params.delete("endDate");
        }
      }
    }

    if (updates.startDate !== undefined) {
      if (!updates.startDate) params.delete("startDate");
      else params.set("startDate", updates.startDate);
    }

    if (updates.endDate !== undefined) {
      if (!updates.endDate) params.delete("endDate");
      else params.set("endDate", updates.endDate);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ q: search });
  };

  const handleCustomDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({
      datePreset: "custom",
      startDate,
      endDate,
    });
  };

  const handleDatePresetChange = (preset: string) => {
    if (preset === "custom") {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      setStartDate("");
      setEndDate("");
      applyFilters({ datePreset: preset });
    }
  };

  const handleClear = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setShowCustomDate(false);
    startTransition(() => {
      router.push(pathname);
    });
  };

  const tabs: { type?: AuditEventType; label: string; icon: string }[] = [
    { label: "All Events", icon: "📑" },
    { type: "processing", label: "Processing", icon: "⚙️" },
    { type: "email_sent", label: "Email Sent", icon: "📧" },
    { type: "download", label: "Download", icon: "📥" },
    { type: "refund", label: "Refund", icon: "💸" },
    { type: "dispute", label: "Dispute", icon: "⚖️" },
  ];

  const datePresets = [
    { id: "all", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "7d", label: "Last 7 Days" },
    { id: "30d", label: "Last 30 Days" },
    { id: "custom", label: "Custom Range 📅" },
  ];

  const hasActiveFilters =
    Boolean(currentType) ||
    Boolean(currentSearch) ||
    currentDatePreset !== "all" ||
    Boolean(currentStartDate) ||
    Boolean(currentEndDate);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3.5">
      {/* Top Row: Search Input Bar + Clear */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
          <span className="absolute left-3.5 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer email, photo ID, order ID, or IP address..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 font-medium transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>✕</span>
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Middle Row: Date Range Filter Suite */}
      <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
            <span>📅</span>
            <span>Date:</span>
          </span>
          {datePresets.map((p) => {
            const isActive = (currentDatePreset === p.id && !showCustomDate) || (p.id === "custom" && showCustomDate);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleDatePresetChange(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Custom Date Picker Inputs if Custom Selected */}
        {showCustomDate && (
          <form onSubmit={handleCustomDateSubmit} className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium cursor-pointer focus:outline-none focus:border-lime-500"
              title="Start Date"
            />
            <span className="text-xs text-slate-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium cursor-pointer focus:outline-none focus:border-lime-500"
              title="End Date"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-lime-600 hover:bg-lime-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Apply Date
            </button>
          </form>
        )}
      </div>

      {/* Bottom Row: Event Type Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Event Type:
        </span>
        {tabs.map((tab) => {
          const isActive = tab.type ? currentType === tab.type : !currentType;
          const count = tab.type ? counts[tab.type] || 0 : totalCount;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => applyFilters({ type: tab.type || "all" })}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {isPending && (
          <span className="ml-auto text-[11px] font-medium text-lime-600 flex items-center gap-1">
            <span className="animate-spin text-xs">⟳</span> Filtering...
          </span>
        )}
      </div>
    </div>
  );
}
