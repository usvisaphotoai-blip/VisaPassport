// ─── Shared flat UI for the /de section ────────────────────────────────────────
// One visual language for every German page: lime brand colour, 2px slate
// borders, no shadows, gradients or glows.

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ─── Class tokens ─── */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-lime-700 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-lime-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-700";
export const btnPrimaryAmber =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50";
export const card = "rounded-xl border-2 border-slate-200 bg-white p-6";
export const textLink = "font-semibold text-lime-700 underline underline-offset-2 hover:text-lime-800";
export const h2Class = "text-2xl font-extrabold tracking-tight text-balance break-words text-slate-900 sm:text-3xl";
export const eyebrowClass = "mb-2 text-xs font-bold uppercase tracking-widest text-lime-700";
export const proseClass = "text-base leading-relaxed text-slate-600";

/* ─── Icons ─── */
export function ArrowRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function CrossIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ─── Layout ─── */
const widths = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const;

export function Section({
  children,
  muted = false,
  width = "5xl",
  id,
  labelledBy,
}: {
  children: ReactNode;
  muted?: boolean;
  width?: keyof typeof widths;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${muted ? "border-y-2 border-slate-200 bg-slate-50" : "bg-white"}`}
    >
      <div className={`mx-auto ${widths[width]}`}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  center?: boolean;
}) {
  return (
    <header className={`mb-8 sm:mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
      <h2 id={id} className={h2Class}>
        {title}
      </h2>
      {intro && <p className={`mt-3 ${proseClass}`}>{intro}</p>}
    </header>
  );
}

/* ─── Hero ─── */
export function Hero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  note,
  image,
  breadcrumb,
  children,
  accent,
}: {
  accent?: "amber";
  breadcrumb?: { label: string; href?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  note?: ReactNode;
  image: { src: string; alt: string; width: number; height: number };
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="hero-h1" className="border-b-2 border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
        <div>
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-lime-200 bg-lime-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lime-800">
            {eyebrow}
          </p>
          <h1 id="hero-h1" className="text-3xl font-extrabold leading-tight tracking-tight text-balance break-words text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className={accent === "amber" ? btnPrimaryAmber : btnPrimary}>
              {primary.label} <ArrowRight />
            </Link>
            {secondary && (
              <Link href={secondary.href} className={btnSecondary}>
                {secondary.label}
              </Link>
            )}
          </div>
          {note && <p className="mt-4 text-sm text-slate-500">{note}</p>}
          {children}
        </div>
        <div className={`mx-auto w-full ${image.height >= image.width ? "max-w-sm" : "max-w-md lg:max-w-none"}`}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Content blocks ─── */
export function StatsBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="border-b-2 border-slate-200 bg-slate-50 px-4 py-6">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:justify-around">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col-reverse text-center">
            <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</dt>
            <dd className="text-xl font-extrabold text-lime-700 sm:text-2xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function StepsGrid({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <ol className={`grid gap-5 ${steps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className={card}>
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-700 text-base font-black text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function CardGrid({ items, cols = 3 }: { items: { title: string; desc: ReactNode; icon?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-5 ${grid}`}>
      {items.map((item) => (
        <article key={item.title} className={card}>
          {item.icon && (
            <span aria-hidden="true" className="mb-3 block text-2xl">
              {item.icon}
            </span>
          )}
          <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
        </article>
      ))}
    </div>
  );
}

export function CheckList({ items, variant = "do" }: { items: ReactNode[]; variant?: "do" | "dont" }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              variant === "do" ? "bg-lime-100 text-lime-800" : "bg-red-100 text-red-700"
            }`}
          >
            {variant === "do" ? <CheckIcon /> : <CrossIcon />}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DoDont({ dos, donts }: { dos: ReactNode[]; donts: ReactNode[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className={card}>
        <h3 className="mb-4 text-lg font-bold text-slate-900">Das sollten Sie tun</h3>
        <CheckList items={dos} />
      </div>
      <div className={card}>
        <h3 className="mb-4 text-lg font-bold text-slate-900">Das sollten Sie vermeiden</h3>
        <CheckList items={donts} variant="dont" />
      </div>
    </div>
  );
}

export function DataTable({
  head,
  rows,
  caption,
  stack = false,
}: {
  head: string[];
  rows: ReactNode[][];
  caption?: string;
  /** Below md, render each row as a labelled card instead of a scrolling table. */
  stack?: boolean;
}) {
  const s = (cls: string) => (stack ? ` ${cls}` : "");
  return (
    <div className={`rounded-xl border-2 border-slate-200 bg-white ${stack ? "md:overflow-x-auto" : "overflow-x-auto"}`}>
      <table className={`w-full border-collapse text-left text-sm${s("max-md:block")}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className={`border-b-2 border-slate-200 bg-slate-50${s("max-md:hidden")}`}>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-bold text-slate-800 sm:px-5">
                {h || <span className="sr-only">Aktion</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y divide-slate-200${s("max-md:block")}`}>
          {rows.map((row, r) => (
            <tr key={r} className={s("max-md:block max-md:px-4 max-md:py-4").trim()}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={c}
                    scope="row"
                    className={`px-4 py-3 align-top font-semibold text-slate-800 sm:px-5${s("max-md:block max-md:p-0 max-md:pb-1 max-md:text-base max-md:font-bold max-md:text-slate-900")}`}
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={c}
                    data-label={head[c]}
                    className={`px-4 py-3 align-top text-slate-600 sm:px-5${s("max-md:flex max-md:items-baseline max-md:gap-3 max-md:px-0 max-md:py-1.5 max-md:before:w-28 max-md:before:shrink-0 max-md:before:text-xs max-md:before:font-semibold max-md:before:text-slate-500 max-md:before:content-[attr(data-label)]")}`}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ children, tone = "lime" }: { children: ReactNode; tone?: "lime" | "amber" | "slate" }) {
  const tones = {
    lime: "bg-lime-100 text-lime-800",
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-600",
  };
  return <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-xl border-2 border-slate-200 bg-white open:border-lime-300">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-base font-bold text-slate-900 hover:bg-slate-50 sm:px-6">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime-200 bg-lime-50 text-sm font-bold text-lime-800 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="border-t-2 border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-600 sm:text-lg">{children}</div>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm leading-relaxed text-slate-500">{children}</p>;
}

export function QuickFacts({ items, title = "Auf einen Blick" }: { items: { label: string; value: string }[]; title?: string }) {
  return (
    <section aria-labelledby="facts-h2" className="border-b-2 border-slate-200 bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="facts-h2" className={eyebrowClass}>{title}</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((i) => (
            <div key={i.label} className="flex flex-col-reverse rounded-lg border-2 border-slate-200 bg-white px-4 py-3">
              <dt className="mt-1 text-xs leading-snug text-slate-600">{i.label}</dt>
              <dd className="text-base font-extrabold leading-tight text-slate-900 sm:text-lg">{i.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  href,
  label,
  accent,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
  accent?: "amber";
}) {
  return (
    <section className="border-t-2 border-lime-200 bg-lime-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-2xl">
          <h2 className={h2Class}>{title}</h2>
          <p className={`mt-2 ${proseClass}`}>{text}</p>
        </div>
        <Link href={href} className={`${accent === "amber" ? btnPrimaryAmber : btnPrimary} shrink-0`}>
          {label} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Brotkrümelnavigation" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-lime-700">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-slate-900">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/* ─── Internal linking: contextual "related pages" block ─── */
export const relatedPages = {
  home: { href: "/de", title: "Passbild online erstellen", desc: "Biometrisches Passbild nach BMI-Vorgabe prüfen und erstellen." },
  biometrisch: { href: "/de/biometrisches-passbild", title: "Biometrisches Passbild: Anforderungen & Maße", desc: "Alle Vorgaben zu Format, Gesichtshöhe, Hintergrund, Brille und Kinderfotos." },
  reisepass: { href: "/de/reisepass-foto", title: "Foto für den Reisepass erstellen", desc: "Reisepassfoto für Deutschland, Österreich und die Schweiz: Maße, Kinder, Brille." },
  personalausweis: { href: "/de/personalausweis-foto", title: "Foto für den Personalausweis", desc: "Digitaler Ablauf seit 2025, Kosten, Kinderregeln und Vorgaben für AT und CH." },
  brille: { href: "/de/passbild-mit-brille", title: "Passbild mit Brille", desc: "Wann die Brille erlaubt ist, Tipps gegen Spiegelungen und Länder wie die USA." },
  selber: { href: "/de/passfoto-selber-machen", title: "Passfoto selber machen", desc: "Schritt-für-Schritt-Anleitung für Licht, Abstand und Hintergrund zu Hause." },
  app: { href: "/de/passfoto-app-kostenlos", title: "Passfoto-App kostenlos – worauf achten?", desc: "Abo-Fallen und Wasserzeichen erkennen, Alternative ohne Download." },
  fuehrerschein: { href: "/de/fuehrerschein-foto", title: "Führerscheinfoto für den Umtausch", desc: "Biometrisches Foto für Erstantrag und Pflichtumtausch." },
  visum: { href: "/de/visum-foto", title: "Visumfoto nach Land", desc: "Schengen, USA, China und weitere Länder im Überblick." },
  bewerbung: { href: "/de/bewerbungsfoto", title: "Bewerbungsfoto erstellen", desc: "Tipps zu Kleidung, Licht, Hintergrund und Format für die Bewerbung." },
  egk: { href: "/de/gesundheitskarte-foto", title: "Foto für die Gesundheitskarte (eGK)", desc: "Vorgaben und Upload für AOK, TK, Barmer, DAK und weitere Kassen." },
  schweiz: { href: "/de/passfoto-schweiz-online", title: "Passfoto Schweiz", desc: "Format und Anforderungen nach fedpol-Fotomustertafel." },
  dokSchweiz: { href: "/de/dokumentenfoto-schweiz", title: "Dokumentenfoto Schweiz", desc: "ID, Führerausweis, Aufenthaltsbewilligung und Visum." },
  ratgeber: { href: "/de/guides", title: "Ratgeber zu Passbild & Visumfoto", desc: "Amtliche Vorgaben und Praxistipps für Deutschland, Österreich und die Schweiz." },
} as const;

export function RelatedPages({
  keys,
  title = "Das könnte Sie auch interessieren",
  muted = true,
}: {
  keys: (keyof typeof relatedPages)[];
  title?: string;
  muted?: boolean;
}) {
  return (
    <Section muted={muted} width="5xl" labelledBy="related-h2">
      <SectionHeader id="related-h2" title={title} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((k) => {
          const r = relatedPages[k];
          return (
            <li key={k} className={card}>
              <Link href={r.href} className={textLink}>{r.title}</Link>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.desc}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
