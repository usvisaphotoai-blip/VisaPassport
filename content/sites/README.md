# Country SEO sections

Each folder here is a full country section, generated from Markdown by
`lib/country-sites.ts` and `app/sites/[site]/[[...slug]]/page.tsx`. The folder
name is the URL prefix (`br/` → `/br`). Nothing else needs to change.

## Add a country

1. Copy `br/` to `<code>/` (e.g. `mx/`). Don't reuse an existing route prefix (`uk`, `ca`, `fr`, `de`).
2. In `_site.md`, translate every value and set `lang`, `ogLocale`, `country`, nav, footer and `ui` strings.
   Only list `tool.documents` whose `countryCode` exists in the photo API
   (`GET https://api.pixpassport.com/countries`). Unknown codes silently fall back to EU 35x45.
3. Rewrite the pages. File path = URL: `index.md` → `/<code>`, `guias/index.md` → `/<code>/guias`.
4. Run `npm run sites:check -- <code>` and fix every error (add `qualityGate: true` once the section is clean).
5. Restart `next dev` (the rewrites are read from this folder when `next.config.ts` loads).

## Page frontmatter

| Field | Purpose |
|---|---|
| `title`, `description` | `<title>` and meta description (30–60 and 70–155 chars), unique, no year |
| `h1`, `intro` | The page's only H1 and the lead paragraph. Body headings start at `##` |
| `primaryKeyword` | One per page, unique in the section. The checker flags other titles that target it |
| `type` | `landing`, `guide` (Article schema) or `hub` (lists its child pages) |
| `breadcrumbLabel` | Short label for breadcrumbs and cards |
| `tool.doc` | Embeds the photo tool preset to a `tool.documents` id |
| `cta` | Hero button (secondary when a tool is shown) |
| `related` | Slugs shown under "related", which also count as internal links |
| `faq` | Rendered as an accordion plus FAQPage schema. Questions must be unique site-wide |
| `image` / `imageBriefs` | Hero image (`src` + `alt`), plus alt text and briefs for images not produced yet |
| `status` | `draft` or `ready`. Drafts render `noindex`, stay out of the sitemap and are never linked (nav, footer, cards, related, in-body links render as plain text) |
| `officialSources` / `lastVerified` | `[{name, url}]` and `YYYY-MM-DD`. Rendered as "Fuente oficial y fecha de consulta". Required on a ready page that states a measurement |
| `updated` | Date of the last real content change; used for the sitemap `<lastmod>` (falls back to git, then `date`) |
| `hreflang` / `alternates` | `alternates: { en: "/passport-photo-online" }` adds reciprocal hreflang (head + sitemap) with `hreflang` as this page's code (`es-MX`, `es-ES`; default: section `lang`). No alternates → no hreflang |
| `type: legal` | About/contact/privacy/terms: no tool, badge or hero visual; listed through `legalLinks`, not as cards |

## Section config (`_site.md`) and claims (`_claims.md`)

- `qualityGate: true` turns the content-quality rules into build errors for that section (es).
- `legalLinks`, `reservedKeywords` (keyword → planned route), `sizeTablePages`, `linkAliases` (wrong slug → real route).
- `_claims.md` holds every product claim (`siteClaims`). Pages and `_site.md` write `{{claim:key}}` or `{{claim:key.short}}`; never type the claim itself. `disclaimer` is rendered once by the layout.
- Editorial notes go inside `<!-- -->`; comments are stripped before rendering. `[VERIFICAR` / `ANTES DE PUBLICAR` must never be visible.

## Checks

| Command | When | What |
|---|---|---|
| `npm run sites:check -- es` | prebuild | frontmatter, links, claims, specs vs sources, on-page SEO, cannibalization |
| `npm run seo:duplicates -- es` | manual | 8+ word passages and H2/H3 shared across pages (`--strict` exits 1) |
| `npm run sitemap:sites` | postbuild (via fix-lang) | country entries of `public/sitemap.xml` from frontmatter |
| `node scripts/check-build-output.mjs` | postbuild | placeholders, links to drafts, headings, canonical, robots, JSON-LD, hreflang = sitemap |
