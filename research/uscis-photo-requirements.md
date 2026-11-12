# /us/uscis-photo-requirements

- **Target keyword:** USCIS photo requirements (hub)
- **Official sources:** see [uscis-official-sources.md](uscis-official-sources.md), read **2026-11-12** (uscis.gov pages “Last Reviewed/Updated 11/10/2026”).
- **Spec data:** `lib/document-specs.ts` → `uscis-photo`, `USCIS_FORM_PHOTOS`. Page text uses `{{spec.uscis-photo.*}}` tokens.
- **Cannibalization check:** Hub: links to the green card and EAD pages instead of repeating their detail; no other USCIS hub exists on the site.
- **Similarity check (2026-11-12):** 0 shared 8-word sequences against all 26 saved competitor texts in the P1 set (`qa.py`, scratchpad). Sentences rewritten where generic phrases matched.
- **QA:** title ≤ 60, description ≤ 155, one H1, Article + BreadcrumbList + FAQPage, FAQ text visible, no passive constructions flagged, mobile layout checked at 390 px.

## Spec conflict log

| Item | What competitors say | Resolution (official source) |
|---|---|---|
| Do you mail photos at all? | xpassportphoto: “In most cases… NOT”; snap2pass contradicts itself | Per-form table from each form’s current instructions. |
| Forms that always need a new USCIS photo | xpassportphoto: I-485, N-400, N-600, I-90; Beyond Border: I-90, N-400 | PA-2025-29: **I-485, I-90, N-400, N-600**. |
| Red-eye correction | “retouching” vs “allowed edit” | USCIS: unretouched = not edited or digitally enhanced. Page does not endorse any edit. |
| Head size | 22 vs 25 mm minimum | 1 in = 25.4 mm (USCIS gives inches only). |
| Upload limits | “54–240 KB” applied to USCIS uploads | Not in USCIS sources; omitted. |

## Elements the top competitors lack (we include)

- One sourced per-form table incl. I-751, I-129F, I-130, N-600, I-90
- “Who sets the rules: USCIS or State Department” table
- Biometrics/reuse rules summarized with dates
- Labeling and packaging steps
- Problem → fix table
- Official-source list with editions and “Last verified”

## Open items

- No original do/don’t example photographs yet (needs a real photo shoot; we will not use stock or competitor images). The page uses an original SVG diagram instead.

---

# Competitor analysis (raw notes)

# Competitor research: `uscis-photo-requirements` (hub page)

Target keyword: **USCIS photo requirements**.

Researched 2026-11-12. Fetched with plain `curl -sL` (default UA). The plain-text bodies are saved in `/private/tmp/claude-501/-Users-navnitrai-personal-project-pixpassport-com/25f67058-8734-4696-bfe0-f0260ed7b21b/scratchpad/competitors/uscis-photo-requirements/`, in files 1-photoaid.com.txt through 5-snap2pass.com.txt.

> Competitor numbers below are recorded as stated, not verified. Do not treat them as true. Official USCIS sources are being checked separately.

Nolo was **blocked (HTTP 403)** and was not retried. Replacements came from a WebSearch for "USCIS photo requirements" on 2026-11-12. The results ranked as follows:
1. Palomar 2015 PDF (skipped: a 2015 PDF handout)
2. photoaid (already used)
3. passport-photo.online (already used)
4. stonybrook.edu (skipped: university advisory, not a competitor page)
5. **rjimmigrationlaw.com** (used)

Two further results were added because they directly cover the post-Dec-2025 / per-form angle: **xpassportphoto.com** and **snap2pass.com**.

## Competitor table

| # | URL | Title | Words (main body, approx.) | Fetch result | Last updated |
|---|-----|-------|---------------------------|--------------|--------------|
| 1 | https://photoaid.com/uscis-photos | USCIS Photo Tool - Online Requirements Checker | ~2,100 (2,309 incl. bios) | 200 OK | Not visible. Article JSON-LD `dateModified` 2025-05-29 |
| 2 | https://passport-photo.online/citizenship-application-photo | USCIS Photo Requirements [+Photo Tool with Expert Verification] | ~1,150 (1,252 incl. bios) | 200 OK | Not visible. Article JSON-LD `dateModified` 2024-10-21 (published 2019-09-08) |
| — | https://www.nolo.com/legal-encyclopedia/photo-requirements-for-u-s-visa-and-green-card-applications.html | — | — | **Blocked (HTTP 403)**, not retried | — |
| 3 | https://rjimmigrationlaw.com/resources/uscis-photo-rules-no-edited-or-mounted-images/ | USCIS Photo Rules: No Edited or Mounted Images | ~670 | HTTP **406** status, but the full article HTML was served (no challenge page), so it was used | 2025-09-10 (article meta) |
| 4 | https://xpassportphoto.com/requirements/uscis-photos | USCIS Photo Requirements: Do You Need to Submit a Photo Yourself? | ~750 | 200 OK | "Last updated: Feb 04, 2026" |
| 5 | https://www.snap2pass.com/guides/uscis-photo-requirements-comprehensive-guide | USCIS Photo Specs Explained: 2×2, ASC Biometrics, & Per-Form Rules (2026) \| Snap2Pass | ~3,100 | 200 OK | `dateModified` 2026-05-19 (published 2025-09-11) |

H1s:
1. USCIS Photo Tool - Online Requirements Checker
2. USCIS Photo Requirements [+Photo Tool with Expert Verification]
3. USCIS Photo Rules: No Edited or Mounted Images
4. Do You Need to Submit a USCIS Photo? USCIS Photo Requirements Explained
5. USCIS Photo Specs Explained: 2×2, ASC Biometrics, & Per-Form Rules (2026)

PhotoAiD (1) and Passport Photo Online (2) use the same template and the same author bio ("Vule"), so they are effectively one operator holding two SERP slots.

## H2 outlines

**1. PhotoAiD.** The full outline is in `green-card-photo-requirements.competitors.md`. In short: a spec card, then sections on size, head, background, expression, makeup, glasses, clothing, headwear, lighting and quality, then common mistakes and a 9-question FAQ (N-400 focus).

**2. Passport Photo Online**
- USCIS Application Photo—Requirements (spec card)
- USCIS Photos—All You Need to Know. H3s:
  - Understanding USCIS photo requirements (requirements table)
  - The fine details: USCIS photo specifications
  - USCIS photo sizing details
  - Get your USCIS photo in minutes
- How does our photo tool work? (H3: Take or upload / Get verified / Enjoy / Choose your document)
- FAQ. H3s:
  - What is a USCIS passport-size photo?
  - Can you smile…?
  - How do I prepare…?
  - Where can I get photos taken…?

**3. RJ Immigration Law** (H3-only structure)
- Why Photo Requirements Matter
- What Does "Unmounted and Unretouched" Mean?
- What Happens If You Don't Follow the Rules?
- Tips for Getting the Right Photos
- FAQs About USCIS Photos (3 H4s)
- Need Help?
- Summary
- Sources

**4. xPassportPhoto**
- Do You Still Need to Submit a USCIS Photo Yourself? (H3s: USCIS Biometric Photos / Where Is a USCIS Photo Taken? / When Are Self-Submitted Photos Required?)
- How to Make a Passport-Style Photo Online (When Self-Submitted Photos Are Required)
- USCIS Photo 2x2 Inch — Photo Details & Requirements (spec card)
- Other Common Photo Types
- Frequently Asked Questions (USCIS Photos) (9 H3s)

**5. Snap2Pass**
- Important: December 2025 USCIS Photo Policy Change
- Quick Reference Table: Core Photo Specifications
- Acceptable Photo Standards: Key Details (H3s: Size and Head Position, Recent Appearance, Background and Lighting, Full Face, Attire, Head Coverings, Glasses, Photo Quality and Paper, Quantity and Identifying Info)
- Step-by-Step Guide: Taking a Compliant Photo (H3s: DIY / Professional service)
- Photo Requirements by Application Type (H3s: Green Card / Nonimmigrant Visa / Citizenship / EAD / DV Lottery)
- Common Mistakes and How to Avoid Them (7 H3s)
- Frequently Asked Questions (FAQ)
- Conclusion
- References

## Specs they state (exact wording for numbers)

| Spec | 1 PhotoAiD | 2 Passport Photo Online | 3 RJ Immigration | 4 xPassportPhoto | 5 Snap2Pass |
|------|-----------|-------------------------|------------------|------------------|-------------|
| Size | "2 x 2 inches (51mmx51mm)" | "2x2 inches (51x51 mm)" | "2×2 inches (51×51 mm)" | "51x51 mm" | "2 x 2 inches (51 x 51 mm)" |
| Head size | "between 1 inch to 1 3/8 inch (22 mm to 35 mm) or 50% to 69%"; "Head height: 1.29 in" | Table: "between 1" and 1.4" (25 and 35 mm)… (50–69% of the photo)". Sizing section: "between 1 inch and 1 3/8 inches (22 mm and 35 mm)" (contradicts itself) | "between 1 inch and 1 3/8 inches from the bottom of the chin to the top of the head" | Not stated | "(top of hair to bottom of chin) must measure 1 to 1⅜ inches (25–35 mm)"; "roughly 50–69%" |
| Eye height | "Bottom of the Photo to the Eye Line: 1.18 in" | — | — | — | — |
| Background | White / "plain light background" | "Solid white or off-white" | "white or off-white" | Not stated (card value blank) | "Plain white or off-white" |
| Photo age | "no older than 6 months" | "Taken in the last 6 months" | — | — | "within the last 6 months (USCIS often expects within 30 days for green cards)"; I-485 "within 30 days of filing"; I-765 "within the past 30 days" |
| Resolution / digital | "301 dpi" | "600x600–1200x1200 px", "≥ 300 DPI", "JPEG format, between 54–240 kilobytes" | — | "300 dpi" | "at least 600 x 600 pixels"; "under 240 KB in file size if submitting online" |
| Counts per form | N-400: in US none, outside US "2 (two) identical". FAQ: "Currently you don't need to attach anything" | "depends on your immigration visa or citizenship form" (no numbers) | — | No counts. "Applications That Always Require a New Photo": I-485, N-400, N-600, I-90 | Dec 2025 box: no printed photos for I-485, N-400, I-765, I-90, I-131 "and others". Later: I-485 "Submit two recent passport-style photos", N-400 overseas "two identical", I-765 "two identical color passport photos", "Most USCIS forms require two identical photos" |
| Back labelling | N-400 overseas: "name and A-Number written lightly in pencil" | — | — | — | "lightly write your name and Alien Registration Number (A-Number)… in pencil or felt-tip pen"; put prints "in a small envelope or wrap in a plastic bag and paperclip it" |
| Mounted/retouched | Retouching causes rejection | "Filters are forbidden" | Quotes USCIS ALERT: "photos submitted to USCIS must be unmounted and unretouched…"; "red-eye correction" counts as retouching | — | "The only minor editing that's allowed is using the red-eye reduction feature on your camera" |
| Paper | "matte or glossy" | "matte or glossy photo-quality paper" | — | — | "thin… with a glossy finish" |
| Glasses | Medical exception with doctor's statement | "remove them… only under exceptional medical circumstances… signed medical statement" | — | — | "no longer allowed… as of November 2016"; medical exception with signed statement |
| Head coverings | Medical/religious, with a statement from a religious leader or doctor | "Headgear worn for medical or religious reasons is allowed" | "religious headwear is allowed" | — | Religious or medical; must not "cover your hairline" |
| Expression | "you can only slightly smile" | "A gentle smile with your mouth closed is acceptable". FAQ: "No… keep your mouth closed… neutral" (contradicts itself) | "no smiling or frowning" | — | "A mild, natural smile is acceptable, but neutral facial expression is preferred" |
| Dec 2025 policy | Not mentioned | Not mentioned | Not mentioned (predates it) | "USCIS New Photo Policy (Release Date 12/12/2025)", linked to a uscis.gov newsroom alert | "Effective December 12, 2025, USCIS announced that it will no longer accept self-submitted photographs with most immigration applications" |
| Reuse window | — | — | — | "within the last 36 months" if taken by USCIS or an authorized provider and "the form type permits photo reuse" | — |
| Commercial photos | Recommends pharmacies/tool | Walgreens/CVS | "Use a professional service" | "USCIS does not accept photos taken at commercial studios for biometric-required applications" | Walgreens, CVS, Walmart, FedEx, UPS |
| Other forms named | N-400 | DS-160, DS-1648, DV | — | I-485, N-400, N-600, I-90 | I-485, N-400, I-765, I-90, I-131, DS-160, DS-260, DV |

## Unique elements

- **PhotoAiD:** a spec card with decimal-inch head height and eye line. It is N-400-focused and includes an N-400 documents FAQ.
- **Passport Photo Online:** a requirements table with a "Prints & Digital" column. It gives a file-size range (54–240 KB), links the DoS Photo Composition Template and DoS Photo Tool, and offers a "double money-back" guarantee.
- **RJ Immigration Law:** a law firm page built around the verbatim USCIS "unmounted and unretouched" ALERT. It explains mounted vs retouched and the consequences (delay, request for new photos, ASC identity check).
- **xPassportPhoto:**
  - The only page framed around "Do you need to submit a photo at all?".
  - Lists the reuse conditions (USCIS or authorized provider, 36 months, form permits reuse).
  - Has an "Applications That Always Require a New Photo" list.
  - Says commercial photos are not accepted for biometric-required applications.
  - Links the uscis.gov newsroom alert "new-photo-policy-helps-prevent-immigration-fraud-through-enhanced-identity-verification".
- **Snap2Pass:**
  - A Dec 2025 policy box with bullets on where photos still matter (overseas filings, consular, "expedited processing situations").
  - A quick reference table and a per-application-type section (green card / NIV / N-400 / EAD / DV).
  - A packaging tip (envelope/plastic bag + paperclip), a 7-item mistakes list and a References list.

## Conflicts between competitors

1. **Whether self-submitted photos are needed at all.**
   - xPassportPhoto: "In most cases, you do NOT need to submit a USCIS photo yourself".
   - Snap2Pass: says the same in its Dec 2025 box, then later tells I-485 and I-765 filers to submit two photos.
   - PhotoAiD: in-US N-400 needs none, overseas needs two. Its FAQ says "Currently you don't need to attach anything".
   - Passport Photo Online and RJ: assume photos are submitted.
2. **Per-form counts.**
   - Snap2Pass: two photos for I-485/I-765 (later section) vs none (Dec 2025 box).
   - xPassportPhoto: I-485, N-400, N-600 and I-90 "always require a new photo" (taken by USCIS).
   - PhotoAiD and Snap2Pass: N-400 overseas = 2.
   - From the green-card set: Boundless's spousal I-485 package = 8 + 2.
3. **Recency.** PhotoAiD and Passport Photo Online say 6 months. Snap2Pass says 6 months but "within 30 days" for I-485 and I-765 (PhotoGov's EAD page agrees on 30 days).
4. **Head size in mm and reference point.**
   - PhotoAiD: 22–35 mm.
   - Passport Photo Online: both 25–35 mm and 22–35 mm, plus "1.4"".
   - Snap2Pass: 25–35 mm measured from the "top of hair".
   - Beyond Border (green-card set): measure to the crown, "not to the top of the hair".
5. **Smiling.** PhotoAiD, Passport Photo Online and Snap2Pass allow a slight or closed-mouth smile. RJ says "no smiling". Passport Photo Online's own FAQ also says no.
6. **Red-eye.** RJ says red-eye correction is retouching and will be rejected. Snap2Pass says in-camera red-eye reduction is the one allowed edit.
7. **Digital file size.** Passport Photo Online says "54–240 kilobytes". Snap2Pass says "under 240 KB". The DV/visa rule is being applied to USCIS uploads without any source for that.
8. **Photo reuse window.** xPassportPhoto says 36 months. The EAD and green-card competitors (Lighthouse, PhotoGov, Beyond Border) say 3 years. These agree, but the list of exceptions differs: xPassportPhoto names I-485, N-400, N-600 and I-90, while Beyond Border names I-90 and N-400 and adds that I-485 always needs new biometrics.
9. **Paper.** PhotoAiD and Passport Photo Online say "matte or glossy". Snap2Pass says "thin… glossy".

## Outdated or suspect items to flag

- Passport Photo Online (schema date Oct 2024), PhotoAiD (May 2025) and RJ (Sep 2025) all predate the Dec 12, 2025 change and don't mention it. They still rank in the top 3 organic results for the head term.
- Passport Photo Online says "All USCIS photos (including those for Green Cards and Diversity Visas) must meet the same standards". This mixes up DoS DV rules and USCIS. It also lists DS-160 and DS-1648 (DoS forms) as USCIS forms.
- Snap2Pass contradicts itself between its Dec 2025 box and its per-form section. It also cites "USCIS Policy Manual – Adjustment of Status Documentation: Photo Specs" without a link.
- xPassportPhoto's spec card shows a blank background value.

## Elements they all cover

- 2 x 2 in / 51 x 51 mm (all 5).
- Head 1 to 1⅜ in (4 of 5).
- White/off-white background (4 of 5).
- Neutral expression (all, with smile disagreements).
- Glasses and religious headwear rules (4 of 5).
- Where to get photos (pharmacy/studio/tool) and a tool or law-firm CTA (all 5).

## Gaps: what none of them cover well

1. **One per-form table (the hub's core value).** No competitor has a single, sourced table with one row per form: I-485, I-765, I-131 (advance parole / reentry permit / refugee travel document), I-90, I-751, I-829, N-400, N-600, I-129F, I-130/I-130A, I-821D, I-589, I-601A. The columns should be: mail prints? how many? who in the household? photo taken at ASC? 3-year reuse allowed? online upload? source and edition date. **No competitor covers I-751, I-129F, I-130A or I-589 photo counts at all**, and I-131 is only named in a list by Snap2Pass.
2. **In US vs abroad and paper vs online.** Nobody gives these splits for each form; only N-400 is split by in-US/abroad, by PhotoAiD and Snap2Pass.
3. **A clear statement of the Dec 12, 2025 policy with a primary-source quote.** None gives a verbatim quote, effective date, link and "what it changed / what it didn't". xPassportPhoto links it but gives no quote. The top-ranking pages (PhotoAiD, Passport Photo Online) ignore it entirely.
4. **The USCIS vs DoS boundary.** Every competitor uses DoS passport/visa specs as "USCIS specs". None explains which agency sets which rule (USCIS form instructions vs DoS composition template vs DV entry rules).
5. **The ASC biometrics photo itself.** Nobody covers what to expect, glasses and head coverings at the ASC, minors' biometrics, or how to request a new photo on the card.
6. **Hub-to-spoke linking.** No competitor links out by form to deeper pages (green card, EAD, N-400, reentry permit/refugee travel document). PhotoGov's site has spokes, but its knowledge pages aren't framed as a hub.
7. **Measurement diagram plus printable 4x6 sheet guidance.** Only PhotoAiD gives eye-line numbers. Nobody gives a diagram with mm and inches together and a "print at 100%, measure after printing" check (only Passlens does, on its green-card/EAD pages).
8. **Back-labelling and packaging.** Only Snap2Pass and PhotoAiD give partial detail. A complete checklist is missing: name + A-Number, pencil or felt-tip, no pressure marks, envelope, no staples, unmounted.

