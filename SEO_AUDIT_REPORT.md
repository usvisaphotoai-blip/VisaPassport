# SEO audit report: `/es` section

Branch `seo/es-content-quality`, 2026-10-09. This covers Tasks 1–7 of the `/es` content-quality brief.

**Result:** the production build passes (`npm run build`: prebuild validator 0 errors, post-build output check 0 errors across 190 prerendered files). Only 3 of 14 `/es` pages are published (`status: ready`): `/es`, `/es/foto-pasaporte` and `/es/guias`. The other 11 are drafts until you supply the data listed in section 3.

No URL, slug, `primaryKeyword`, title or H1 was changed. No page was deleted. No measurement, source URL or policy answer was added.

---

## 1. Duplicate text: before and after

Measured with `npm run seo:duplicates -- es`. Pages are compared on the text a visitor reads (intro, body, FAQ), lowercased with accents and punctuation stripped.

| Metric | Before | After |
|---|---|---|
| Identical sentences/blocks of 8+ words on 2+ pages | 7 | **0** |
| Shared runs of 8+ consecutive words | 41 | **0** |
| Duplicated words (run length × pages) | 1,633 | **0** |
| Identical H2/H3 across pages | 3 | **0** |

The known blocks were all confirmed by the audit and removed:

- **4-step tool list** (on 6 pages): replaced on each page by one sentence naming that page's preset ("Pasaporte Mexicano (SRE)", "DNI y NIE Español", "Visa Americana (DS-160)"…). The full how-to now exists only on the home page.
- **"Antes de presentar tu foto"** (3 pages) and **"Es una ayuda para preparar la foto, no una garantía…"** (5 pages): removed from the pages. The disclaimer is now one shared component (`SiteDisclaimer`), rendered once by the section layout. Its text comes from `_claims.md → disclaimer`.
- **Closing "Resolvemos / Respondemos las dudas…" paragraphs**: removed, along with the body "Preguntas frecuentes" headings that duplicated the template FAQ.
- **Lighting/distance tips** ("luz de frente", "50 cm a 1 m", "altura de los ojos"): kept only on the home page. DNI and Mexico link there.
- **"Requisitos que suelen pedirse" lists**: each page now has its own list tied to its authority:
  - Mexico: questions to settle with the SRE before the appointment.
  - Spain: checks before the Policía Nacional appointment.
  - DNI: how the face must look.
  - US visa: DS-160 upload checklist.
  - Schengen: consulate biometric points.
- **Overlapping topics** now link to the page that owns them:
  - Word/Photoshop how-to: `medidas-foto-carnet`.
  - DNI vs. passport comparison: `foto-dni`.
  - Generic passport requirements and examples: `tamano-foto-pasaporte`.

## 2. Commits

| Commit | Task |
|---|---|
| `43013fe` chore: baseline es section content… | Your uncommitted work (es content, in-section 404), committed as-is so the following diffs are reviewable |
| `2679f8d` duplicate-text audit | 1 |
| `1840e21` draft status, official sources, placeholder guards | 2 |
| `76c9062` internal link checks | 3 |
| `fff5980` centralize product claims, trust pages | 6 |
| `8c69c10` remove duplicated boilerplate | 1 (rewrite) |
| `ec2b4b5` sitemap + hreflang from frontmatter | 4 |
| `22829dc` on-page SEO validation | 5 |
| `91e8066` cannibalization guardrails | 7 |
| *(this commit)* report + README | deliverable |

### Changed files

- **Rendering:**
  - `lib/country-sites.ts`
  - `app/sites/[site]/[[...slug]]/page.tsx`
  - `app/sites/[site]/layout.tsx`
  - `app/sites/components/SiteFooter.tsx`
  - `app/sites/components/SiteDisclaimer.tsx` (new)
  - `app/components/ConditionalNavFooter.tsx`
- **Build scripts:**
  - `scripts/validate-sites.mjs`
  - `scripts/check-build-output.mjs` (new)
  - `scripts/audit-duplicates.mjs` (new)
  - `scripts/gen-sitemap-sites.mjs` (new)
  - `scripts/lib/site-content.mjs` (new)
  - `scripts/lib/site-sitemap.mjs` (new)
  - `scripts/fix-lang.mjs`
  - `package.json`
- **Content:**
  - every file in `content/sites/es/`
  - new: `_claims.md`, `sobre-nosotros.md`, `contacto.md`, `privacidad.md`, `terminos.md`
  - `content/sites/README.md`
- **Output:** `public/sitemap.xml`.

## 3. Pages blocked (draft) and what unblocks each one

To publish a page: fill in `officialSources` and `lastVerified`, put the confirmed values in the body (replacing the `<!-- [VERIFICAR …] -->` comment), then set `status: "ready"`. The validator will refuse `ready` while the page states a measurement without a source.

| Page | Data I need from you |
|---|---|
| `/es/foto-pasaporte-mexico` | From the SRE: photo size (mm, plus px if a digital upload exists), background colour, digital vs. printed, whether the office takes the photo or the applicant brings it, and rules for minors. Also the SRE source URL and the date you checked it. Confirm or correct the tool preset `mexico-passport` = 35 x 45 mm in `_site.md`. |
| `/es/foto-pasaporte-espana` | From the Policía Nacional: photo size, background, whether the photo is brought or taken at the office, and minors. Also the source URL and date. **Check the `spain-passport` preset (30 x 40 mm)**; your own content note says it may be wrong. Decide whether this page stays or merges into `/es/foto-pasaporte` (open item 5 in the original notes). |
| `/es/foto-dni` | From the Policía Nacional: DNI photo size, and whether a photo is required when renewing. Also the source URL and date. **Check the `spain-dni` preset (30 x 40 mm)**. Search Console split of Spain/Argentina/Peru traffic (open item 3). |
| `/es/tamano-foto-pasaporte` | Values for the hidden table (Mexico, Spain: mm, px, in), with one `officialSources` entry per country plus `lastVerified`. The page also states unit conversions (1 in = 25.4 mm), which the spec detector counts, so it needs at least one source before it can be `ready`. |
| `/es/foto-visa-americana` | Confirm on travel.state.gov: square JPEG, 600 x 600 – 1200 x 1200 px, ≤ 240 KB, 2 x 2 in print, "recent" photo, no glasses. These were written from memory. Send the source URL and date. Also tell me whether the tool really validates format and file size; I removed that claim until you confirm. |
| `/es/foto-visa-schengen` | Publish or merge into a future `/es/foto-visa` (open decision in the content notes). If you publish, I need a consulate or visa-centre source for 35 x 45 mm and the face proportion, plus a date. |
| `/es/medidas-foto-carnet` | *Not on your list, but the rule forces it to draft:* it states sizes (3x4, 4x4, 5x5, 32x26 mm, 300 ppp) without a source. Either give sources for which documents use those formats, or tell me these are non-normative conversions. In that case the spec rule needs an explicit opt-out field, which I didn't add without your OK. |
| `/es/sobre-nosotros` | Real "about" copy: who runs PixPassport, company details. |
| `/es/contacto` | Real support channels, hours and response times. |
| `/es/privacidad` | Spanish privacy policy, legally reviewed (GDPR/LOPDGDD). |
| `/es/terminos` | Spanish terms, legally reviewed and consistent with `_claims.md` (payment, refund, 24 h deletion). |

The four legal pages currently say the Spanish version is in preparation and link to `/about`, `/contact`, `/privacy-policy` and `/terms`. The footer links to them are built, but stay hidden until each page is `ready`.

### Product claims to confirm (`content/sites/es/_claims.md`)

All claims are live with `confirmed: false`. Edit the wording there and set `confirmed: true`; every page follows.

| Key | Current wording |
|---|---|
| `freePreview` | "Puedes subir tu foto y ver la vista previa ajustada sin coste ni registro." |
| `paidDownload` | "Solo pagas cuando descargas el resultado final." |
| `deletion24h` | "Tu foto se elimina de nuestros servidores en un plazo máximo de 24 horas." |
| `printSheet` | "…puedes descargar una hoja con varias copias para imprimir." |
| `requirementChecks` | "…la herramienta avisa de problemas habituales de encuadre y fondo…" |
| `backgroundAdjust` | "Fondo liso ajustado automáticamente" |
| `refundIfRejected` | "Reembolso si es rechazada" (used on the preview/checkout page) |
| `disclaimer` | Site-wide acceptance disclaimer |

Removed as acceptance guarantees:
- "Garantía de aceptación 100%" (×4 in the preview strings)
- "Pago 100% seguro"
- "certificar que cumple la normativa"
- "Tu foto cumple los requisitos oficiales"
- "Fotos oficiales … · Medidas 2026" (hero badge)

**Still in `_site.md` → `preview`, not centralized, please confirm:**
- "Validación biométrica por IA"
- "Foto con estándar oficial ICAO" / "Verificación integral de estándar ICAO"
- "Revisión por experto humano en <15 min"
- "Respuesta media en menos de 15 min"
- "Soporte por email 24/7"
- "Cada foto pasa por una revisión de nuestros especialistas"

## 4. Decisions and interpretations to review

1. **Links to drafts render as plain text instead of being deleted from source.** In-body links, related cards, CTAs, nav and footer links pointing at a draft are gated at render time. The source keeps the link, so it comes back automatically when the target becomes `ready`. The build fails on any *rendered* `<a href>` to a missing or draft page (`check-build-output.mjs`). Links to pages that don't exist at all were removed from source, keeping the text and leaving a `<!-- Enlazar a … cuando exista -->` note:
   - `/es/imprimir-fotos-carnet`
   - `/es/foto-visa`
   - `related: guias/como-hacer-foto-carnet-en-casa`
2. **Wrong slugs:** no `/es/foto-tamano-carnet` or `/es/foto-visado-estados-unidos` links exist. `linkAliases` in `_site.md` maps them to `/es/medidas-foto-carnet` and `/es/foto-visa-americana`, and fails the build if they appear.
3. **hreflang:** no `/es` page has a confirmed alternate-language version, so no hreflang is emitted (head or sitemap). The old self-only tags, including the wrong `es-ES` on `tamano-foto-pasaporte`, are gone. The region codes are set in frontmatter (`es-MX` for Mexico, `es-ES` for Spain and DNI, `es` by default) and are used as soon as you add `alternates`. English pages that exist and *might* be equivalents (please confirm they are the same intent before I link them):

   | `/es` page | Possible English equivalent |
   |---|---|
   | `/es/foto-pasaporte` | `/passport-photo-online` |
   | `/es/foto-visa-americana` | `/us-visa-photo-editor` |
   | `/es/foto-visa-schengen` | `/schengen-visa-photo-editor` |
   | `/es/foto-pasaporte-mexico` | `/mexico-passport-photo-editor` |
   | `/es/foto-pasaporte-espana` | `/spain-passport-photo-editor` |

   Reciprocal tags on the English side are managed in `scripts/fix-lang.mjs` and would need adding there too.
4. **`/es/foto-carnet` does not exist.** "foto carnet online" is reserved for it (`reservedKeywords`), and it will enter the sitemap automatically once created with `status: ready`. I removed "foto carnet online" from the home page's secondary keywords.
5. **Cannibalization exemption:** a long-tail page may contain its parent's keyword (`foto para pasaporte mexicano` ⊃ `foto para pasaporte`). Without this, the rule can't be met unless H1s change.
6. **Bug found and fixed:** country pages are prerendered at `/sites/es/…`, so `ConditionalNavFooter` didn't recognise them. The static HTML of every `/es` and `/br` page carried the global English navbar, footer and a second `<main>`. Fixed: the DOM now has one `<main>` and no English chrome. The footer's text still appears in the serialized RSC payload, because the root layout passes it as a prop to a client component. It's not rendered, but moving that decision server-side would remove it entirely.

## 5. Known issues left as-is

- **Tool presets show unverified sizes on a published page.** The tool on `/es` defaults to `spain-passport` and displays "30 x 40 mm · 354 x 472 px". The spec-vs-source rule only covers page copy, not `_site.md` tool presets. Verify these presets before relying on them.
- **`/es/guias` is thin.** It's a hub with no guides, and its body links all point to drafts. Consider setting it to draft until the first guide exists.
- **Home page cards:** "Elige tu documento" currently shows only *Foto para pasaporte* and *Guías*. Cards for the other documents appear as each page becomes ready.
- **`br` section (out of scope):**
  - 24 validator errors (pre-existing, not changed here), including links to the missing `/br/foto-visto-americano`, `/br/foto-visto-portugal` and `/br/foto-passaporte-brasileiro`.
  - The stricter checks only fail the build for sections with `qualityGate: true` (`es`), so `br` builds as before.
  - `br` sitemap entries also lost their self-only `pt-BR` hreflang and now use git dates for `lastmod`.
- **Rest of the sitemap:** the 214 English URLs still carry `<changefreq>`/`<priority>`. Only country-section entries were regenerated.

## 6. Remaining validator warnings (`npm run sites:check -- es`: 0 errors, 38 warnings)

| Count | Warning | Action |
|---|---|---|
| 10 | Hero image pending (`image.src` missing; alt and brief exist) | Produce the images from the briefs |
| 8 | Claim live but not confirmed | Section 3, claims table |
| 13 | Ready page or nav links to a draft (rendered as plain text) | Clears as drafts go ready |
| 4 | Draft states measurements without sources | Section 3 |
| 3 | `primaryKeyword` not in title/H1: `index` ("foto carnet y pasaporte online"), `medidas-foto-carnet` ("foto carnet medida"), `tamano-foto-pasaporte` ("tamaño de foto pasaporte") | Needs a title/H1 or keyword change, which needs your approval |

## 7. Checks now in the build

- **prebuild:** `validate-sites.mjs es` checks:
  - status, sources and placeholders
  - links, aliases and duplicate anchors
  - claims and guarantee wording
  - title/description length and uniqueness, years
  - keyword stuffing and alt text
  - heading order
  - cannibalization and size tables
- **postbuild:** `fix-lang.mjs` regenerates the country sitemap entries. Then `check-build-output.mjs` checks:
  - `[VERIFICAR` / `ANTES DE PUBLICAR` in output
  - links to draft or missing pages
  - one `<h1>` and heading order
  - canonical and robots
  - FAQ and breadcrumb JSON-LD
  - head hreflang matches the sitemap
- **manual:** `npm run seo:duplicates -- es [--strict]`.
