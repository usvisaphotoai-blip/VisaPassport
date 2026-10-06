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
4. Run `npm run sites:check -- <code>` and fix every error.
5. Restart `next dev` (the rewrites are read from this folder when `next.config.ts` loads).

## Page frontmatter

| Field | Purpose |
|---|---|
| `title`, `description` | `<title>` and meta description (≤ 60 and 120–160 chars) |
| `h1`, `intro` | The page's only H1 and the lead paragraph. Body headings start at `##` |
| `primaryKeyword` | One per page, unique in the section. The checker flags other titles that target it |
| `type` | `landing`, `guide` (Article schema) or `hub` (lists its child pages) |
| `breadcrumbLabel` | Short label for breadcrumbs and cards |
| `tool.doc` | Embeds the photo tool preset to a `tool.documents` id |
| `cta` | Hero button (secondary when a tool is shown) |
| `related` | Slugs shown under "related", which also count as internal links |
| `faq` | Rendered as an accordion plus FAQPage schema. Questions must be unique site-wide |
| `image` / `imageBriefs` | Hero image (`src` + `alt`), plus alt text and briefs for images not produced yet |
