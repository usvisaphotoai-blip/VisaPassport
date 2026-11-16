"use client";

import { useMemo, useState } from "react";

interface PhotoFormatOption {
  id: string;
  label: string;
  regionHint: string;
  widthMm: number;
  heightMm: number;
}

interface PaperOption {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  defaultSheetCost: Record<CurrencyCode, number>;
}

type CurrencyCode = "USD" | "GBP" | "EUR" | "INR";

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  defaultPrice: number;
  priceMax: number;
  priceStep: number;
  sheetCostStep: number;
  sheetCostMax: number;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    defaultPrice: 15,
    priceMax: 45,
    priceStep: 1,
    sheetCostStep: 0.05,
    sheetCostMax: 3,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    defaultPrice: 12,
    priceMax: 35,
    priceStep: 1,
    sheetCostStep: 0.05,
    sheetCostMax: 2.5,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    defaultPrice: 14,
    priceMax: 40,
    priceStep: 1,
    sheetCostStep: 0.05,
    sheetCostMax: 2.5,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    defaultPrice: 150,
    priceMax: 600,
    priceStep: 10,
    sheetCostStep: 1,
    sheetCostMax: 60,
  },
};

const PHOTO_FORMATS: PhotoFormatOption[] = [
  {
    id: "35x45",
    label: "35 × 45 mm (ICAO / UK / Schengen / India)",
    regionHint: "ICAO Doc 9303 global standard",
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "2x2",
    label: "2 × 2 in / 50.8 × 50.8 mm (US Passport & Visa)",
    regionHint: "US Dept of State / Green Card / OCI",
    widthMm: 50.8,
    heightMm: 50.8,
  },
  {
    id: "50x70",
    label: "50 × 70 mm (Canada Passport & PR)",
    regionHint: "IRCC large-format portrait",
    widthMm: 50,
    heightMm: 70,
  },
  {
    id: "33x48",
    label: "33 × 48 mm (China Passport & Visa)",
    regionHint: "Chinese narrow-format ID",
    widthMm: 33,
    heightMm: 48,
  },
];

const PAPER_OPTIONS: PaperOption[] = [
  {
    id: "4x6",
    label: "4 × 6 in (4R Photo Paper)",
    widthMm: 101.6,
    heightMm: 152.4,
    defaultSheetCost: { USD: 0.25, GBP: 0.2, EUR: 0.22, INR: 12 },
  },
  {
    id: "5x7",
    label: "5 × 7 in (5R Photo Paper)",
    widthMm: 127,
    heightMm: 177.8,
    defaultSheetCost: { USD: 0.4, GBP: 0.35, EUR: 0.35, INR: 18 },
  },
  {
    id: "6x8",
    label: "6 × 8 in (6R Thermal Roll)",
    widthMm: 152.4,
    heightMm: 203.2,
    defaultSheetCost: { USD: 0.55, GBP: 0.45, EUR: 0.5, INR: 25 },
  },
  {
    id: "A4",
    label: "A4 (210 × 297 mm)",
    widthMm: 210,
    heightMm: 297,
    defaultSheetCost: { USD: 0.65, GBP: 0.5, EUR: 0.55, INR: 30 },
  },
  {
    id: "Letter",
    label: "US Letter (8.5 × 11 in)",
    widthMm: 215.9,
    heightMm: 279.4,
    defaultSheetCost: { USD: 0.65, GBP: 0.5, EUR: 0.55, INR: 30 },
  },
];

function fitGrid(
  sheetW: number,
  sheetH: number,
  photoW: number,
  photoH: number,
  margin: number,
  gap: number
) {
  const cols = Math.max(
    0,
    Math.floor((sheetW - 2 * margin + gap + 1e-6) / (photoW + gap))
  );
  const rows = Math.max(
    0,
    Math.floor((sheetH - 2 * margin + gap + 1e-6) / (photoH + gap))
  );
  return { cols, rows, max: cols * rows };
}

function computeBestSheetYield(
  paperW: number,
  paperH: number,
  photoW: number,
  photoH: number,
  marginMm: number,
  gapMm = 3
) {
  const shortSide = Math.min(paperW, paperH);
  const longSide = Math.max(paperW, paperH);
  const portrait = fitGrid(shortSide, longSide, photoW, photoH, marginMm, gapMm);
  const landscape = fitGrid(longSide, shortSide, photoW, photoH, marginMm, gapMm);

  if (landscape.max > portrait.max) {
    return { ...landscape, orientation: "Landscape" as const };
  }
  return { ...portrait, orientation: "Portrait" as const };
}

function formatMoney(amount: number, currency: CurrencyConfig) {
  if (currency.code === "INR") {
    return `${currency.symbol}${Math.round(amount).toLocaleString("en-IN")}`;
  }
  return `${currency.symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function BusinessROICalculator() {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD");
  const [formatId, setFormatId] = useState<string>("35x45");
  const [paperId, setPaperId] = useState<string>("4x6");
  const [borderless, setBorderless] = useState<boolean>(false);
  const [monthlyClients, setMonthlyClients] = useState<number>(120);
  const [copiesPerClient, setCopiesPerClient] = useState<number>(4);
  const [retailPrice, setRetailPrice] = useState<number>(CURRENCIES.USD.defaultPrice);
  const [sheetCost, setSheetCost] = useState<number>(
    PAPER_OPTIONS[0].defaultSheetCost.USD
  );

  const currency = CURRENCIES[currencyCode];
  const photoFormat =
    PHOTO_FORMATS.find((f) => f.id === formatId) ?? PHOTO_FORMATS[0];
  const paper = PAPER_OPTIONS.find((p) => p.id === paperId) ?? PAPER_OPTIONS[0];

  const handleCurrencyChange = (nextCode: CurrencyCode) => {
    setCurrencyCode(nextCode);
    setRetailPrice(CURRENCIES[nextCode].defaultPrice);
    setSheetCost(paper.defaultSheetCost[nextCode]);
  };

  const handlePaperChange = (nextPaperId: string) => {
    setPaperId(nextPaperId);
    const nextPaper =
      PAPER_OPTIONS.find((p) => p.id === nextPaperId) ?? PAPER_OPTIONS[0];
    setSheetCost(nextPaper.defaultSheetCost[currencyCode]);
  };

  const metrics = useMemo(() => {
    const marginMm = borderless ? 0 : 5;
    const yieldInfo = computeBestSheetYield(
      paper.widthMm,
      paper.heightMm,
      photoFormat.widthMm,
      photoFormat.heightMm,
      marginMm,
      3
    );

    const photosPerSheet = Math.max(1, yieldInfo.max);
    const totalPhotosNeeded = monthlyClients * copiesPerClient;
    const sheetsRequired = Math.ceil(totalPhotosNeeded / photosPerSheet);
    const customersPerSheet = Number((photosPerSheet / copiesPerClient).toFixed(2));
    const monthlyRevenue = monthlyClients * retailPrice;
    const monthlyPrintCost = sheetsRequired * sheetCost;
    const monthlyGrossProfit = monthlyRevenue - monthlyPrintCost;
    const marginPct =
      monthlyRevenue > 0 ? Math.round((monthlyGrossProfit / monthlyRevenue) * 1000) / 10 : 0;
    // Conservative estimate: 3.5 minutes saved per walk-in vs manual backdrop erase + resize + grid layout
    const hoursSavedMonthly = Math.round(((monthlyClients * 3.5) / 60) * 10) / 10;

    return {
      ...yieldInfo,
      photosPerSheet,
      sheetsRequired,
      customersPerSheet,
      monthlyRevenue,
      monthlyPrintCost,
      monthlyGrossProfit,
      marginPct,
      hoursSavedMonthly,
    };
  }, [
    borderless,
    copiesPerClient,
    monthlyClients,
    paper.heightMm,
    paper.widthMm,
    photoFormat.heightMm,
    photoFormat.widthMm,
    retailPrice,
    sheetCost,
  ]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full border border-lime-300 bg-lime-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-800">
            Interactive Studio Yield & Margin Model
          </span>
          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Print Sheet Yield & Monthly Revenue Calculator
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Uses PixPassport&apos;s exact print-sheet packing geometry (portrait or
            landscape orientation with 3 mm cut spacing) so you can estimate
            sheet consumption and walk-in margins before printing.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Currency">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const active = code === currencyCode;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleCurrencyChange(code)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {CURRENCIES[code].symbol} {code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-5 lg:col-span-6">
          <div>
            <label
              htmlFor="biz-photo-format"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-700"
            >
              Document Photo Format
            </label>
            <select
              id="biz-photo-format"
              value={formatId}
              onChange={(e) => setFormatId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-lime-600 focus:bg-white focus:outline-none"
            >
              {PHOTO_FORMATS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">{photoFormat.regionHint}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="biz-paper-size"
                className="block text-xs font-semibold uppercase tracking-wide text-slate-700"
              >
                Print Paper Size
              </label>
              <select
                id="biz-paper-size"
                value={paperId}
                onChange={(e) => handlePaperChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-lime-600 focus:bg-white focus:outline-none"
              >
                {PAPER_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Printer Margin Mode
              </span>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBorderless(false)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    !borderless
                      ? "border-lime-600 bg-lime-50 text-lime-900"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                  }`}
                >
                  5 mm Margin
                </button>
                <button
                  type="button"
                  onClick={() => setBorderless(true)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    borderless
                      ? "border-lime-600 bg-lime-50 text-lime-900"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                  }`}
                >
                  Borderless (0 mm)
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <label htmlFor="biz-monthly-clients">Monthly Walk-In / Visa Customers</label>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-slate-900">
                  {monthlyClients}
                </span>
              </div>
              <input
                id="biz-monthly-clients"
                type="range"
                min={10}
                max={1000}
                step={10}
                value={monthlyClients}
                onChange={(e) => setMonthlyClients(Number(e.target.value))}
                className="mt-2 w-full accent-lime-600"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="block text-xs font-semibold text-slate-700">
                  Printed Copies per Customer
                </span>
                <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                  {[2, 4, 6, 8].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setCopiesPerClient(count)}
                      className={`rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                        copiesPerClient === count
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <label htmlFor="biz-retail-price">Price per Customer</label>
                  <span className="font-mono text-slate-900">
                    {formatMoney(retailPrice, currency)}
                  </span>
                </div>
                <input
                  id="biz-retail-price"
                  type="range"
                  min={currency.priceStep}
                  max={currency.priceMax}
                  step={currency.priceStep}
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(Number(e.target.value))}
                  className="mt-2.5 w-full accent-lime-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <label htmlFor="biz-sheet-cost">Estimated Media + Ink Cost per Sheet</label>
                <span className="font-mono text-slate-900">
                  {formatMoney(sheetCost, currency)}
                </span>
              </div>
              <input
                id="biz-sheet-cost"
                type="range"
                min={0}
                max={currency.sheetCostMax}
                step={currency.sheetCostStep}
                value={sheetCost}
                onChange={(e) => setSheetCost(Number(e.target.value))}
                className="mt-2 w-full accent-lime-600"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-6">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Max Photos per Sheet
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {metrics.photosPerSheet} photos
              </div>
              <div className="mt-1 text-xs text-slate-600">
                {metrics.cols} × {metrics.rows} grid ({metrics.orientation})
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Monthly Print Sheets Used
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {metrics.sheetsRequired.toLocaleString()} sheets
              </div>
              <div className="mt-1 text-xs text-slate-600">
                ~{metrics.customersPerSheet} sets per sheet ({copiesPerClient} copies/set)
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-medium text-slate-500">
                Estimated Monthly Revenue
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {formatMoney(metrics.monthlyRevenue, currency)}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Supply cost: {formatMoney(metrics.monthlyPrintCost, currency)}/mo
              </div>
            </div>

            <div className="rounded-xl border border-lime-300 bg-lime-50/80 p-4">
              <div className="text-xs font-semibold text-lime-900">
                Gross Profit After Media
              </div>
              <div className="mt-1 text-2xl font-bold text-lime-950">
                {formatMoney(metrics.monthlyGrossProfit, currency)}
              </div>
              <div className="mt-1 text-xs font-medium text-lime-800">
                {metrics.marginPct}% print gross margin
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-lime-400">
                  Counter Time Reclaimed
                </div>
                <div className="mt-1 text-lg font-bold">
                  ~{metrics.hoursSavedMonthly} hours saved per month
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Estimated at ~3.5 minutes saved per customer compared with manual
                  cropping, background retouching, and sheet tiling.
                </p>
              </div>
              <a
                href="#pricing"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-lime-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-lime-400"
              >
                See Business Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
