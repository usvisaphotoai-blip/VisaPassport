# P0 – Technical fixes (2026-11-12)

## What changed

| # | Issue | Fix |
|---|---|---|
| 1 | `/romania-passport-photo-editor` and `/romania-visa-photo-editor` listed twice | Postbuild now deduplicates `<loc>` (keeps one entry, newest lastmod, all images). |
| 2 | Denmark pages had `hreflang="de"` | Root cause: `scripts/fix-lang.mjs` matched `startsWith('/de')`, which also matches `/denmark-…`. The same bug gave `/france-passport-photo-editor` and `/france-visa-photo-editor` `hreflang="fr"`. Sitemap hreflang is now read from each page's rendered `<head>` (English copy → `en`). |
| 3 | hreflang targets missing or non-reciprocal | `/passport-photos` and `/visa-photo` (both 200, indexable, referenced by FR/DE pages) added. Every hreflang target in the sitemap is now itself listed. The three FR variants (`/fr/photo-identite`, `/fr/photo-carte-identite`, `/fr/photo-passeport-biometrique`) claimed `en=/passport-photos` in the sitemap only; their heads list only themselves, so the sitemap now matches. `/es` and `/br` were already reciprocal with `/`, `/fr`, `/de`. |
| 4 | Homepage `<loc>` without trailing slash | Written as `https://www.pixpassport.com/` (same URL Next.js renders as the canonical). |
| 5 | Placeholder lastmod (54 × 2026-04-12, 20 × 2026-04-18) | lastmod now follows content changes (see below). Seeded from git history: e.g. Latvia's page changed on 2026-06-10, not 2026-04-18. The 28 URLs still dated 2026-04-18/19 really were last edited then (verified: the Algeria entry is byte-identical since 2026-04-18). |
| 6 | changefreq / priority | Removed from all entries and from every generator. |
| 7 | noindex / utility pages | None were listed (live check of all 249 URLs: all 200, all `index, follow`, canonical = loc). Postbuild now drops any page whose built head says `noindex` and any `/admin`, `/dashboard`, `/login`, `/signup`, `/preview`, `/api`, `/expert-edit` URL. |
| 8 | UK cannibalization | See below. |
| 9 | Thin Schengen pages | Follow-up (see below). |

Also added: `/uk` hub (200, indexable, `/ca` was already listed).

## How lastmod works now

- `scripts/lib/sitemap-sources.mjs` maps each URL to the content that renders it: its Markdown file, its entry in `data/countries-specs.json` / `tool-seo-pages.json` / `blog-posts.json`, or its `app/<route>/` files. For country spec pages, the other intent's copy and SEO fields are excluded (editing the passport copy does not bump the visa page).
- `data/sitemap-lastmod.json` stores `{ url: { hash, lastmod } }`. At postbuild, a changed hash sets lastmod to the build date; an unchanged hash keeps the stored date. Markdown `updatedAt` frontmatter wins when present. No git history is needed at build time (Vercel clones are shallow).
- `npm run sitemap:seed` rebuilds the manifest from git history.
- `/es`, `/br` (frontmatter/git) and `/guides` (`dateModified`) keep their existing generators.

## UK page roles (item 8)

| URL | Primary keyword / intent | Notes |
|---|---|---|
| `/uk-passport-size-photo-maker` | "uk passport size photo maker" – make a new photo for any of 15 UK documents (transactional) | Unchanged copy. |
| `/uk-passport-photo-editor` | "uk passport photo editor" – edit a photo you already have (crop, background) | **Retitled.** It used the generic template title "United Kingdom Passport Photo Maker (2026) \| 100% Approved", which competed head-on with the maker page and made an unsupported claim. New title: "UK Passport Photo Editor: Crop & Fix Your Photo Online". |
| `/uk-passport-photo-checker-online-free` | "uk passport photo checker" – check an existing photo | Unchanged copy. |
| `/uk-passport-photo-requirements-tool` | "uk passport photo requirements" / "uk passport photo size" – informational | Unchanged copy. |
| `/blog/uk-digital-passport-photo` | "uk digital passport photo" – online application, digital upload | Unchanged copy (lives in MongoDB). |

All five now render a shared "Which UK passport photo page do you need?" block (`app/uk/components/UKPageFinder.tsx`) that links to the other four with task-based anchor text.

**Recommendations for your decision (not done):**
1. **Merge candidate:** `/uk-passport-photo-editor` → `/uk-passport-size-photo-maker`. Both are transactional and embed the same tool. If Search Console shows them swapping for "uk passport photo maker" after the retitle, 301 the editor page into the maker page.
2. Trim the full "official rules" sections on the checker (`Official UK passport photo rules`) and editor (`UK Biometric Passport: Official HMPO Photo Requirements 2026`) pages to a 3-line summary that links to `/uk-passport-photo-requirements-tool`. Today all three restate the same rules.
3. The editor page states "HMPO data shows approximately one in five online passport applications encounters a photo issue". I could not find a source for this; remove it or cite it.

## Pages that are indexable but not in the sitemap (your call)

Postbuild now prints these on every build:

- `/czechia-passport-photo-editor`, `/czechia-visa-photo-editor` – relevant to P3 (`/czech-republic-…` would duplicate them; see P3 notes).
- `/bhutan-…`, `/malawi-…` (≈157 characters of copy each – thin; noindex or expand before listing), `/tajikistan-…`, `/singapore-passport-photo-editor`, `/icao-passport-photo-editor`, `/icao-visa-photo-editor` (ICAO was consolidated into `/icao-standard-photograph`; these two should probably canonicalize or redirect there).
- `/passport-photo-app`, `/passport-photo-editor` (tool pages; likely cannibalize `/passport-size-photo-maker`).
- `/visa-checklist/<country>/<checklist>/audit` (5 pages; utility pages – consider `noindex`).

## Other findings (not changed)

- `/us` returns 200: `app/[slug]` resolves "us" to the US passport spec, creating a duplicate of `/us-passport-photo-editor` (canonical points there, so low risk). P1 adds a real `/us` hub.
- Any unknown slug that contains a country name renders that country's spec page (e.g. `/romania`). Canonicals point to the right URL, but these should return 404.
- Claims without a policy behind them on existing pages: "100% Compliance rate" (stats block on tool pages), "100% Approved" (default spec page title for all countries without a custom title), "guaranteed acceptance" (tool page copy). Recommend removing.
- `/br` navigation links to `/br/foto-visto-americano`, `/br/foto-visto-portugal`, `/br/foto-passaporte-brasileiro`, which do not exist.

## Follow-up: Schengen pages (item 9)

Thin, templated copy (passport / visa characters): Bulgaria 905 / 289, Croatia 903 / 287, Czechia 903 / 287, Greece 901 / 285, Hungary 903 / 287, Latvia 906 / 285, Lithuania 912 / 291, Luxembourg 914 / 293, Norway 906 / 285, Slovakia 910 / 289, Slovenia 905 / –, Finland 2078 / 1342. Ten of them share one hero image (`visa-photo-using-pixpassport_qgrqmf.jpg`). These need country-specific copy from each issuing authority and their own images. Scheduled after P1–P2.
