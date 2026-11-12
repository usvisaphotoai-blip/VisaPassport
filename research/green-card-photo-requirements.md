# /us/green-card-photo-requirements

- **Target keyword:** green card photo requirements
- **Official sources:** see [uscis-official-sources.md](uscis-official-sources.md), read **2026-11-12** (uscis.gov pages “Last Reviewed/Updated 11/10/2026”).
- **Spec data:** `lib/document-specs.ts` → `uscis-photo`, `USCIS_FORM_PHOTOS`. Page text uses `{{spec.uscis-photo.*}}` tokens.
- **Cannibalization check:** Existing `/us-check-photo-green-card` targets “green card photo checker” (tool intent). This page targets “green card photo requirements” (informational) and links to the checker; the checker now links back.
- **Similarity check (2026-11-12):** 0 shared 8-word sequences against all 26 saved competitor texts in the P1 set (`qa.py`, scratchpad). Sentences rewritten where generic phrases matched.
- **QA:** title ≤ 60, description ≤ 155, one H1, Article + BreadcrumbList + FAQPage, FAQ text visible, no passive constructions flagged, mobile layout checked at 390 px.

## Spec conflict log

| Item | What competitors say | Resolution (official source) |
|---|---|---|
| When USCIS began taking the card photo itself | Beyond Border: “As of July 2026”; PhotoGov tool page: “since late 2024”; 4 others silent | PA-2025-29, dated **December 12, 2025**. Stated with the alert link. |
| Photos needed with I-485 | PhotoGov tool page: most I-485 filings need no photos; Beyond Border: photo captured at biometrics; Boundless: 8 photos for a marriage package | I-485 instructions (09/18/26) still ask for **2 identical photos**; package total derived form by form (I-485 + I-765 + I-131 = 6). |
| Head size | 22–35 mm (PhotoAiD) vs 25–35 mm; “crown” vs “top of hair” | USCIS: **1 to 1 3/8 in from the top of your hair to the bottom of your chin** (25.4–34.9 mm). |
| Smiling | “slight smile allowed” vs “not acceptable” | USCIS instructions define no expression rule; page says so and recommends a neutral face. |
| Glasses | PhotoGov guide: medical exception in checklist, “No exceptions” in FAQ | USCIS instructions are silent; page says so and recommends removing glasses (labelled as our advice). |
| Digital files | “JPEG only”; “240 KB cap” | USCIS sets no pixel/KB rule for mailed photos; only I-131 mentions a 3.5 MP camera. No digital limits stated. |
| I-90 photos | Some pages and our own /us-check-photo-green-card meta description list I-90 as needing photos | I-90 instructions ask for none; PA-2025-29 requires new biometrics. |

## Elements the top competitors lack (we include)

- Per-form photo table rendered from the instructions, with edition dates and links (I-485, I-765, I-131, I-130, I-129F, I-751, N-400, N-600, I-90)
- Dated explanation of PA-2025-29 with the alert linked
- “Unretouched” vs background replacement: tells readers to start with a plain wall so the tool only crops
- Measurement diagram drawn from the spec (head range and eye band to scale)
- in/mm/px conversion in the spec table (300 DPI, labelled as our conversion)
- Green card vs DV lottery comparison table
- Rejection reason → fix table
- Printable checklist
- Visible “Last verified” line and official-source list

## Open items

- No original do/don’t example photographs yet (needs a real photo shoot; we will not use stock or competitor images). The page uses an original SVG diagram instead.

---

# Competitor analysis (raw notes)

# Competitor research: `green-card-photo-requirements`

Target keyword: **green card photo requirements**. This covers USCIS filing photos for I-485, I-90, I-751 and similar forms, how they differ from DV lottery digital photos, and how many photos each form needs.

Researched 2026-11-12. Fetched with plain `curl -sL` (default UA). The plain-text bodies are saved in `/private/tmp/claude-501/-Users-navnitrai-personal-project-pixpassport-com/25f67058-8734-4696-bfe0-f0260ed7b21b/scratchpad/competitors/green-card-photo-requirements/`, in files 1-photoaid.com.txt through 6-photogov.net-knowledge.txt.

> Competitor numbers below are recorded as stated, not verified. Do not treat them as true. Official USCIS sources are being checked separately.

## Competitor table

| # | URL | Title | Words (main body, approx.) | Fetch result | Last updated |
|---|-----|-------|---------------------------|--------------|--------------|
| 1 | https://photoaid.com/uscis-photos | USCIS Photo Tool - Online Requirements Checker | ~2,100 (2,309 incl. author bios) | 200 OK | Not visible. Article JSON-LD `dateModified` 2025-05-29; published 2021-05-02 |
| 2 | https://passlens.com/blog/green-card-photo-requirements-guide | Green Card Photo Requirements 2026: USCIS 2x2 Passport-Style Photos, I-485, I-90, and DV Lottery Differences — Passlens Blog | ~500 | 200 OK | "Updated May 24, 2026" (published 2026-05-14) |
| 3 | https://www.boundless.com/blog/green-card-photo-requirements | Green Card Photo Requirements \| Boundless Immigration | ~800 | 200 OK | "Updated December 5, 2024" |
| 4 | https://www.beyondborderglobal.com/resources/what-are-the-green-card-photo-requirements | What Are The Current Green Card Photo Requirements in 2026? | ~1,600 unique (1,968 raw; spec and rejection tables render twice) | 200 OK | "LAST UPDATED July 16, 2026" (JSON-LD `dateModified` 2026-09-21) |
| 5 | https://photogov.net/documents/us-green-card-photo/ | Green Card Photo Tool — Make Your Green Card Photo at Home | ~2,300 (incl. ~1,000-word FAQ accordion; tool UI + doc list included) | 200 OK | None shown |
| 6 | https://photogov.net/knowledge/requirements/green-card-photo-requirements/ | Green Card Photo Requirements Official Guide, 2026 Updated | ~3,750 | 200 OK | "Published: March 4, 2026" |

H1s:
1. USCIS Photo Tool - Online Requirements Checker
2. Green Card Photo Requirements 2026: USCIS 2x2 Passport-Style Photos, I-485, I-90, and DV Lottery Differences
3. What Are the Green Card Photo Requirements?
4. What Are The Current Green Card Photo Requirements in 2026?
5. Green Card Photo Tool — Make Your Green Card Photo at Home in 30 Seconds
6. Green Card Photo Requirements: Official 2026 Guide, Expert Verified

Note: photoaid.com/uscis-photos is a USCIS/N-400 page rather than a green-card page, but it ranks for the term and is reused on the USCIS hub research. PhotoAiD and passport-photo.online share the same template and author bios, so they look like the same operator.

## H2 outlines

**1. PhotoAiD**
- Key Benefits of Using Our Passport Photo Tool
- Passport photo-taking tips
- USCIS 2x2 Photo: Requirements (spec card)
- USCIS Photo Requirements & Photo Checker
- USCIS photo specifications
- USCIS photo size and dimensions
- Head position
- Background
- Facial expression
- Makeup
- Glasses
- Clothing
- Headwear
- Lighting
- Quality
- USCIS Photo Tool Online (H3: Common mistakes while taking photos for the USCIS)
- Choose your document
- Frequently asked questions. H3s:
  - What is the correct size…
  - Are the US passport photo requirements the same…
  - Can I take a USCIS photo with my phone?
  - Do I need to attach photos for the N-400 Form?
  - What to wear…
  - Can I smile…
  - Can I wear make-up…
  - What documents do I need to send with my N-400?
  - How many photos do I need to attach to my USCIS application?
- Was this information helpful?

**2. Passlens**
- First identify the green-card route (3-row route table)
- When the route asks for passport-style 2x2 photos
- Do not mix green card lottery and USCIS filing rules
- How to prepare the correct file
- Related Passlens guides
- Sources

**3. Boundless.** It has one real H2. The other section labels are bold paragraphs.
- Green Card Photo Requirements (bulleted list)
- Bold label: Where to get a green card photo (price list)
- Bold label: Frequently Asked Questions:
  - How many photos must I submit with my visa application?
  - What type of paper…
  - Do the photos have to be in color?
  - What size…
  - Can I wear sunglasses…

**4. Beyond Border**
- (Key-takeaways box above the fold)
- What Are the USCIS Green Card Photo Requirements in 2026? (13-row spec table)
- Green Card Photo Example
- Where to Take a Green Card Photo?
- Need help with your U.S. visa application? (CTA)
- How Do Green Card Photo Requirements Differ From Passport Photos?
- What Are the Most Common Reasons Green Card Photos Are Rejected? (10-row cause/prevention table)
- What Is the Difference Between Green Card Photo Requirements and DV Lottery Photo Requirements?
- How Often Do Green Card Holders Need to Submit New Photos?
- Work With an Employment-Based Green Card Specialist
- Frequently Asked Questions (5 Q&As. The questions are collapsed and only the answers were captured.)

**5. PhotoGov tool page**
- Turn Your Selfie Into an Interview-Ready Green Card Photo
- Get photo for: US Green Card (Permanent Resident) 2x2 (tool)
- How Our Green Card Photo Tool Works
- What Is a Green Card Photo?
- Your Final Green Card Photo from PhotoGov (parameter table)
- Green Card Photos That Pass the Checks (image grid)
- Green Card Photos That Don't Pass the Checks (image grid)
- Why Use the PhotoGov Green Card Photo Tool
- PhotoGov & the Official Green Card Photo Standards
- Frequently Asked Questions (14 Q&As)
- Official Government Sources
- Other Documents — US ID Photos

**6. PhotoGov knowledge page**
- 12 Essential 2026 Green Card Photo Requirements: Checklist
- Acceptable Green Card Photo Examples
- Unacceptable Green Card Photo Examples
- Green Card Printed and Digital Photo Explained (print vs digital table)
- Where to Take Green Card Photo? (H3s: pharmacies, shipping centers, post offices, studios, online editor)
- Green Card Photo Services: Overview (cost/time/approval-chance table)
- Taking Your Green Card Photo at Home
- Taking a Green Card Photo of Your Baby
- Frequently Asked Questions (16 H3 Q&As)
- Other Pages — United States ID Photos
- Official Government Documentation Sources

## Specs they state (exact wording for numbers)

| Spec | 1 PhotoAiD | 2 Passlens | 3 Boundless | 4 Beyond Border | 5 PhotoGov tool | 6 PhotoGov knowledge |
|------|-----------|-----------|-------------|-----------------|-----------------|----------------------|
| Size | "2 x 2 inches (51mmx51mm)" | "2 x 2 inches" | "2 inches x 2 inches"; "2 x 2 inches (51 x 51 mm)" | "2 inches by 2 inches"; "2 x 2 inches (51 x 51 mm)" | "2×2 inches (51×51 mm)" | "2 × 2 inches (51 × 51 mm)" |
| Head size | "between 1 inch to 1 3/8 inch (22 mm to 35 mm) or 50% to 69%"; spec card "Head height: 1.29 in" | Not stated ("centered head") | "1 inch to 1 and 3/8 inches (25 mm - 35 mm)" | "1 inch to 1 and 3/8 inches", measured "to the top of the crown of the head, not to the top of the hair"; "The face must occupy between 50% and 69%" | "1-1⅜ inches (25-35 mm), 50-69% of the image" | "1–1⅜ inches (25–35 mm), or 50–69% of the photo's height" |
| Eye height | "Bottom of the Photo to the Eye Line: 1.18 in" | Not stated | "between 1 and 1/8 inches to 1 and 3/8 inches (28 mm – 35 mm) from the bottom of the photo" | Not stated | Not stated | FAQ: "between 1 1/8 and 1 3/8 inches (28 to 35 mm) from the bottom edge" |
| Background | "light and uniform with a white color"; also "plain light background" | "plain white or off-white style background" | "white or off-white background" | "Plain white or off-white, with no patterns or shadows" | "Plain, white/off-white" | "Plain white or off-white"; FAQ: "No cream, grey, or blue tints" |
| Photo age | "no older than 6 months from the date of application" | Not stated | "Taken within the last 6 months" | "Taken within the last six months" | "Taken within the last 6 months" | "within the last six months" |
| Resolution / digital | "301 dpi" | "600 x 600 px at 300 DPI or 1200 x 1200 px at 600 DPI" (print export) | Not stated | "Digital minimum resolution 600 by 600 pixels"; "maximum 1200 by 1200 pixels"; "JPEG only. PNG, TIFF, and other formats are not accepted" | "High‑resolution digital file at 600 DPI"; JPEG/PDF | "600 × 600 to 1200 × 1200 pixels (square) at a 600 DPI"; "JPEG (.jpg) format, maximum 240 KB, 24-bit sRGB" |
| Number of photos | N-400: in US none ("photos are taken at their appointment"); outside US "2 (two) identical photographs". FAQ: "Currently you don't need to attach anything" | Not stated ("route controls") | In-US spousal package: "Beneficiary: eight (8) total", "Sponsoring spouse: two (2) total". DS-260: "two 2-inch by 2-inch photos at their green card interview" | I-485: "photo captured at the biometrics appointment". DS-260: "two identical printed 2 x 2 photos". I-90/N-400: "USCIS always takes a new photograph" | Each family member "their own individual 2×2-inch photograph"; no count | "two identical printed photos to your green card interview"; in-US: "specified in the instructions for Form I‑485" |
| Back-of-photo labelling | N-400 (overseas): "name and A-Number written lightly in pencil on the back" | — | — | — | — | — |
| Glasses | Not allowed; medical exception "you must provide an appropriate statement from your doctor" | — | "No eyeglasses, except… medical reasons… A medical statement signed by a doctor" | "Not permitted, except with medical documentation" | FAQ: "no glasses" | Checklist: medical exception with doctor's statement. FAQ: "No exceptions, even with medical documentation" (contradicts itself) |
| Head coverings | Medical/religious only; needs "statement from a leader in your religious community or a doctor" | — | "No hat or head covering that hides the hair, unless worn daily for religious reasons" | "Not permitted, except with religious documentation" | "no head coverings (except religious)" | Religious OK if not obscuring "facial features or the hairline"; medical needs doctor's statement |
| Expression | "you can only slightly smile" / "Smiling gently is generally allowed" | "neutral expression" | "neutral facial expression and both eyes open" | "A slight or natural smile is also not acceptable" | Neutral | "No smiling" |
| Paper | "matte or glossy high-quality photo paper" | — | "matte or glossy photo paper" | "Matte or glossy finishes are both acceptable" | — | "matte or glossy photo‑quality paper" |
| Policy change (USCIS-captured photos) | Not mentioned | Hints only ("biometrics, or online-account handling") | Not mentioned | "As of July 2026, USCIS creates your green card using a photo taken by USCIS…"; reuse "only if that photo is less than 3 years old" | FAQ: "since late 2024, USCIS collects biometric photographs at the ASC appointment for most I-485 filings" | Not mentioned |
| DV vs green card | — | DV is "digital, square, and bound to the official Diversity Visa instructions for that entry year" | — | DV "exactly 600 x 600 pixels, or an existing 2 x 2 inch print scanned at 300 pixels per inch" | Banner: DV "requires a different photo" | Digital table mixes DV rules (240 KB) into green card |
| Other numbers | Camera distance "16–20 inch (40–50 cm)" front, "4–6 foot (1–2 meter)" rear | — | Prices: Walmart "$7.44", Target "$12.99", UPS "around $11.99", FedEx "$14.95", Walgreens/CVS "$14.99", AAA $10/$15 | Prices: Walmart "$7.64", UPS "$11.99", FedEx "$14.95", Walgreens "$16.99", CVS "$17.99", USPS "around $15.00"; camera "at least 8 megapixels" | "$6.90" in US; template reviewed "every eight weeks" | Tripod distance "5–7 feet"; selfie "about 20 inches"; "at least 12 megapixels"; "4 to 6 feet"; prices $15–$18, Walmart $8–$12 |

## Unique elements

- **PhotoAiD:** a spec card that is the only one giving decimal inches ("Head height: 1.29 in", eye line "1.18 in", "301 dpi"). It covers makeup, and lists N-400 supporting documents including pencil labelling. It has author/legal-expert bios and an on-page rating (4.73/5, 145 votes).
- **Passlens:** a "route" table that splits USCIS filing, I-90 replacement/renewal and DV. It gives print-export pixel guidance (600 px @300 DPI / 1200 px @600 DPI) and a "measure the print, don't trust printer preview" tip. It ends with a Sources list (USCIS I-485, I-90, DoS DV, DoS passport photo).
- **Boundless:** the only page with a **per-person photo count for a marriage-based package (8 + 2)**. It also has a retail price list including AAA tiers and an affiliate pitch (MyPassportPhotos).
- **Beyond Border:**
  - A key-takeaways box and a 13-row spec table.
  - A 10-row rejection-cause table.
  - A GC-vs-passport section ("The difference is not the photo. It is who captures it").
  - A GC-vs-DV section and a "How often do green card holders need new photos" section covering reuse and the I-90/N-400 always-new rule.
  - Attorney byline/reviewer and links to the USCIS policy.
- **PhotoGov tool:**
  - An embedded tool and a final-photo parameter table.
  - Pass/fail image grids.
  - An official-sources list (DoS, USCIS, ICAO 9303, **22 CFR §42.33**).
  - A list of the forms their template follows ("I-485, I-90, I-130A, and N-400").
- **PhotoGov knowledge:** a 12-point checklist table, a printed-vs-digital table, and a service comparison table with an "Approval Chance" column. It has a baby/infant section with DoS-style infant exceptions and a long FAQ with retouching rules.

## Conflicts between competitors

1. **Whether you mail photos with I-485 at all.** Three different answers:
   - Boundless implies prints in the package ("Beneficiary: eight (8)").
   - Beyond Border says the I-485 photo is "captured at the biometrics appointment".
   - PhotoGov tool says "since late 2024… no longer requires photos submitted with the application".
   - PhotoGov knowledge defers to I-485 instructions and otherwise talks only about two prints for the interview.
2. **When the USCIS-captured-photo policy started.** Beyond Border says "As of July 2026". PhotoGov tool says "since late 2024". Others on the hub/EAD pages say December 12, 2025. Four green-card competitors (PhotoAiD, Passlens, Boundless, PhotoGov knowledge) don't mention it at all.
3. **Photo counts.** Boundless gives 8 (beneficiary) + 2 (sponsor). PhotoGov gives "two identical". PhotoAiD (N-400) gives "2" outside the US, none inside, and in its FAQ "don't need to attach anything".
4. **Head size in mm.** PhotoAiD says "22 mm to 35 mm". Boundless, PhotoGov tool and PhotoGov knowledge say "25 mm - 35 mm" / "25–35 mm". Beyond Border says to measure "to the top of the crown… not to the top of the hair". Others (and the snap2pass hub competitor) say "top of the head/hair".
5. **Smiling.** PhotoAiD allows "slightly smile" / "Smiling gently is generally allowed". Beyond Border says "A slight or natural smile is also not acceptable". PhotoGov knowledge says "No smiling".
6. **Glasses.** Most allow a medical exception with a doctor's statement. PhotoGov knowledge FAQ says "No exceptions, even with medical documentation", which contradicts its own checklist.
7. **Head coverings.** Boundless says covering must not hide "the hair" unless religious. Beyond Border requires "religious documentation". PhotoAiD wants a statement from a religious leader or doctor. PhotoGov says religious is fine and documentation is for medical only.
8. **Digital file rules.** Beyond Border says "JPEG only… PNG… not accepted", with 600–1200 px. PhotoGov knowledge adds "maximum 240 KB, 24-bit sRGB", which looks like DV/visa rules carried over. Passlens gives no file size.
9. **Photo reuse window.** Beyond Border says "less than 3 years old". No other green-card competitor gives a window.
10. **Is a green card photo the same as a passport photo?** PhotoAiD and PhotoGov knowledge say "identical". Beyond Border says the photos are nearly identical but "USCIS applies stricter quality review than passport offices".

## Outdated or suspect items to flag

- Boundless was last updated Dec 5, 2024. It predates the USCIS photo-collection change, and its 8 + 2 count and prices are old.
- PhotoAiD's article schema dates to May 2025. It has no mention of USCIS-captured photos and says the "USCIS photo is a US passport photo".
- PhotoGov knowledge (March 2026) frames all green-card photos as interview prints and never mentions USCIS-captured photos for in-US filers.
- PhotoGov tool's "since late 2024" date conflicts with everyone else.
- Beyond Border's "As of July 2026" framing conflicts with the Dec 12, 2025 date the EAD/hub competitors give.

## Elements they all cover

- 2 x 2 in (51 x 51 mm) square, colour, white/off-white plain background.
- Head size about 1 to 1⅜ in / 50–69% (all except Passlens).
- Neutral expression, eyes open, facing the camera.
- Glasses rule (all except Passlens) and religious headwear exception.
- 6-month recency (all except Passlens).
- Where to get photos (pharmacy/shipping/studio/online tool) in 4 of 6.
- A tool or service CTA on 5 of 6.

## Gaps: what none of them cover well

1. **A per-form photo table for green-card-related forms.** None has one row per form (I-485, I-130/I-130A, I-765 filed with I-485, I-131 filed with I-485, I-90, I-751, I-829, N-400). Each row should say: do you mail prints, how many, is the photo taken at the ASC, can a photo under 3 years old be reused, and which form edition the info is from. **No one covers I-751 or I-829 at all.** Only Passlens and Beyond Border mention I-90.
2. **Separate scenarios.** Nobody cleanly separates (a) adjustment of status inside the US, (b) consular processing via DS-260, (c) card renewal/replacement (I-90), (d) removing conditions (I-751) and (e) DV entry. They also don't say who must supply photos in each case (beneficiary, petitioner, derivative children).
3. **The USCIS change is not explained with a date and source.** No green-card competitor quotes the actual USCIS alert, links it with its date, or explains what happens to prints that are still included.
4. **Labelling the back.** Only PhotoAiD (N-400) mentions it. No green-card page explains name + A-Number, pencil/felt-tip, envelope packaging or "unmounted/unretouched".
5. **DV vs USCIS side-by-side.** No complete comparison table. It should cover the entry photo (600 x 600 px, file size, entry-year recency, digital only) against the USCIS filing print and the immigrant-visa interview prints. Passlens and Beyond Border cover it in prose only.
6. **No measurement diagram.** Nobody shows inches, mm, % and eye-height on one 2x2 template. PhotoAiD's spec card is the closest.
7. **Children/infants.** These are only covered by PhotoGov knowledge, and using DoS passport rules. Nobody covers derivative children on I-485 or whether children under 14 are photographed at the ASC.
8. **What to expect at the ASC biometrics photo.** Nobody covers glasses removal, head coverings, appearance changes, or what to do if you dislike the card photo.
9. **Conflicting numbers left unresolved.** Nobody points out the 22 vs 25 mm and crown vs hair inconsistencies, so a page that clearly states and sources one measurement would stand out.

