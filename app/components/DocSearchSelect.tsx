"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface DocOption {
  id: string;
  label: string;
  country?: string;
  flag?: string;
  size?: string;
  /** Accent-stripped, lowercased search terms (translations, aliases). */
  keywords?: string;
  /** Country names in other languages, shown when one of them matched. */
  names?: string[];
}

// Same rule as normalizeSearch in lib/doc-search-options.ts (not imported: that module pulls in all specs).
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

interface Props {
  options: DocOption[];
  /** Ids shown first when the search box is empty. */
  popularIds?: string[];
  defaultId?: string;
  /** Name of the hidden input submitted with the parent form. */
  name: string;
}

/**
 * Searchable country/document picker (ARIA combobox). Submits the chosen
 * document id through a hidden input, so it works inside a plain GET form.
 */
export default function DocSearchSelect({ options, popularIds = [], defaultId, name }: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const initial = options.find((o) => o.id === defaultId) ?? options[0];
  const [selected, setSelected] = useState<DocOption | undefined>(initial);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) {
      const popular = popularIds
        .map((id) => options.find((o) => o.id === id))
        .filter((o): o is DocOption => Boolean(o));
      const rest = options.filter((o) => !popularIds.includes(o.id));
      return [...popular, ...rest].map((o) => ({ o, hint: undefined as string | undefined }));
    }
    // Every typed word must match (so "passeport france" works). Rank: label starts
    // with the query, then any word in label/translations starts with it, then substring.
    const words = q.split(/\s+/);
    return options
      .map((o) => {
        const label = norm(o.label);
        const hay = `${label} ${norm(o.country ?? "")} ${o.keywords ?? ""}`;
        if (!words.every((w) => hay.includes(w))) return null;
        const tokens = hay.split(/[\s()-]+/);
        const rank = label.startsWith(q) ? 0 : words.every((w) => tokens.some((t) => t.startsWith(w))) ? 1 : 2;
        // Show the translated name the user typed, e.g. "Deutschland" for Germany Passport.
        const hint = label.includes(words[0])
          ? undefined
          : o.names?.find((n) => norm(n).includes(words[0]) && norm(n) !== norm(o.country ?? ""));
        return { o, rank, hint };
      })
      .filter((r): r is { o: DocOption; rank: number; hint: string | undefined } => r !== null)
      .sort((a, b) => a.rank - b.rank)
      .map(({ o, hint }) => ({ o, hint }));
  }, [query, options, popularIds]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (o: DocOption) => {
    setSelected(o);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      // Enter picks the highlighted option; with the list closed it submits the form.
      if (open && results[active]) {
        e.preventDefault();
        choose(results[active].o);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  const shown = open ? query : selected ? `${selected.flag ?? ""} ${selected.label}`.trim() : "";

  return (
    <div ref={wrapRef} className="relative flex-1">
      <input type="hidden" name={name} value={selected?.id ?? ""} />
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        aria-label="Search your country or document in English, French, German, Spanish or Portuguese"
        placeholder={selected ? `${selected.flag ?? ""} ${selected.label}`.trim() : "Search country or document"}
        value={shown}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        className="w-full border border-slate-300 rounded pl-3 pr-9 py-3 text-sm text-slate-800 bg-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {open ? <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> : <path d="m6 9 6 6 6-6" />}
      </svg>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 w-full max-h-72 overflow-auto rounded border border-slate-200 bg-white shadow-lg text-sm"
        >
          {!query && popularIds.length > 0 && (
            <li role="presentation" className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Popular
            </li>
          )}
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-3 text-slate-500">
              No match. Try &ldquo;Other country (ICAO)&rdquo; for standard 35×45 mm.
            </li>
          )}
          {results.map(({ o, hint }, i) => (
            <li
              key={o.id}
              id={`${listId}-${i}`}
              data-index={i}
              role="option"
              aria-selected={selected?.id === o.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(o)}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center justify-between gap-3 px-3 py-2 cursor-pointer ${
                i === active ? "bg-lime-50" : ""
              } ${!query && i === popularIds.length ? "border-t border-slate-100" : ""}`}
            >
              <span className="text-slate-800">
                <span className="mr-2">{o.flag}</span>
                {o.label}
                {hint && <span className="ml-1.5 text-xs text-slate-500">· {hint}</span>}
              </span>
              {o.size && <span className="text-[11px] text-slate-400 whitespace-nowrap">{o.size.split(" (")[0]}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
