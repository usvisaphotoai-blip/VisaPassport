# /us/ead-i-765-photo-requirements

- **Target keyword:** EAD photo requirements / I-765 photo
- **Official sources:** see [uscis-official-sources.md](uscis-official-sources.md), read **2026-11-12** (uscis.gov pages “Last Reviewed/Updated 11/10/2026”).
- **Spec data:** `lib/document-specs.ts` → `uscis-photo`, `USCIS_FORM_PHOTOS`. Page text uses `{{spec.uscis-photo.*}}` tokens.
- **Cannibalization check:** No existing EAD page. Distinct from the green card page (I-485 focus); both cross-link.
- **Similarity check (2026-11-12):** 0 shared 8-word sequences against all 26 saved competitor texts in the P1 set (`qa.py`, scratchpad). Sentences rewritten where generic phrases matched.
- **QA:** title ≤ 60, description ≤ 155, one H1, Article + BreadcrumbList + FAQPage, FAQ text visible, no passive constructions flagged, mobile layout checked at 390 px.

## Spec conflict log

| Item | What competitors say | Resolution (official source) |
|---|---|---|
| Photos still required after Dec 12, 2025? | PhotoGov: yes (2 paper, 1 online); Lighthouse: only “if the instructions require it for your category”; Passlens: silent | I-765 instructions (08/21/25) list photos under **Required Documentation**, which applies to *all* applications. Page: include 2 photos with every I-765. |
| Photo age | PhotoGov: “within 30 days of filing”; others: 6 months | Instructions: “taken recently”, no number. Page uses that wording. |
| Online upload size | PhotoGov: “600 x 600, 240 KB max” (unsourced) | Not in USCIS sources; not stated on the page. |
| Accepted edition | Lighthouse (Mar 2026) vs PhotoGov (Sept 14, 2026 court order) | Form page on 2026-11-10: accepts 08/21/25, not 09/15/26 (Sept 14, 2026 order). Stated with date. |

## Elements the top competitors lack (we include)

- Photo rule applies to all categories, renewals and replacements (with the instruction quote)
- Situation → what to expect table for the 3-year photo reuse rule
- Current edition status with the court-order date
- Combined I-485 + I-765 + I-131 photo count
- Measurement diagram and in/mm/px table from the spec
- Mistake → fix table
- Official-source list with “Last verified”

## Open items

- No original do/don’t example photographs yet (needs a real photo shoot; we will not use stock or competitor images). The page uses an original SVG diagram instead.

---

# Competitor analysis (raw notes)

# Competitor research: `ead-i-765-photo-requirements`

Target keyword: **EAD photo requirements / I-765 photo**.

Researched 2026-11-12. Fetched with plain `curl -sL` (default UA). The plain-text bodies are saved in `/private/tmp/claude-501/-Users-navnitrai-personal-project-pixpassport-com/25f67058-8734-4696-bfe0-f0260ed7b21b/scratchpad/competitors/ead-i-765-photo-requirements/`, in files 1-passlens.com.txt, 2-photogov.net.txt and 3-lighthousehq.com.txt.

> Competitor numbers below are recorded as stated, not verified. Do not treat them as true. Official USCIS sources are being checked separately.

## Competitor table

| # | URL | Title | Words (main body, approx.) | Fetch result | Last updated |
|---|-----|-------|---------------------------|--------------|--------------|
| 1 | https://passlens.com/blog/ead-photo-requirements-guide | EAD Photo Requirements 2026: USCIS I-765 Passport-Style Photo Checks, 2x2 Size, and Filing Route Cautions — Passlens Blog | ~440 | 200 OK | "Updated May 24, 2026" (published 2026-05-14) |
| 2 | https://photogov.net/knowledge/requirements/ead-photo/ | US EAD Photo Requirements for Form I-765: 2026 Guide | ~2,250 | 200 OK | "Published: August 19, 2026". The content refers to a September 14, 2026 court order, so it was edited after publication |
| 3 | https://www.lighthousehq.com/blog/form-i-765 | Form I-765 Work Permit Guide: Filing Steps & Eligibility \| Lighthouse | ~3,750 total. The photo-specific part is only ~170 words (one H2 plus one bullet) | 200 OK | "Published Nov 19, 2025" (JSON-LD `dateModified` is the same). The content cites events up to March 5, 2026, so it was updated without a new date |

H1s:
1. EAD Photo Requirements 2026: USCIS I-765 Passport-Style Photo Checks, 2x2 Size, and Filing Route Cautions
2. US EAD Photo Requirements for Form I-765: 2026 Guide
3. Form I-765

## The December 12, 2025 change (the key question)

| Competitor | Mentions that USCIS stopped using applicant photos for the EAD card? | What it says about photos still being required with I-765 |
|-----------|---------------------------------------------------------------------|-------------------------------------------------------------|
| 1 Passlens | **No.** No date or policy named. It only hedges: "Do not assume every employment authorization filing still needs applicant-provided photos. Some routes depend on online filing, biometrics, or request-specific instructions." | Says the route decides: "The filing route controls the number of photos, print versus upload handling, and whether photos are needed at all." It gives no count. |
| 2 PhotoGov | **Yes.** "Since December 12, 2025, USCIS has stopped using self-submitted photos for the actual EAD card. Instead, USCIS captures your photo directly at a Biometric Services Appointment (BSA)…" | Yes, still required: "You're still required to submit passport-style photos with Form I-765 for now — USCIS hasn't formally updated the form instructions — but expect a BSA notice, especially if you don't already have a USCIS photo on file from the last three years." The rest of the page says "Two EAD photos for mail-in filing / One digital photo for online filings", and the September 2026 alert says "The photo requirements remain the same: two identical color passport-style photos for paper filings." |
| 3 Lighthouse | **Yes.** "As of December 12, 2025, USCIS changed how photos are collected for EAD cards. USCIS now uses only photos taken during biometrics appointments for the actual EAD card." Also listed under "Recent USCIS updates": "New photo collection procedures using biometrics appointments effective December 12, 2025". | Conditional: "You must still submit two passport-style photos with your full name and A-number written on the back **if the Form I-765 instructions require it for your category (such as OPT, STEM OPT, or economic hardship applications)**, but these photos will not appear on your final EAD card." Biometrics are scheduled "If you have never had a biometrics appointment, or if your most recent USCIS photo is more than three years old". |

The hub-page competitor snap2pass (see `uscis-photo-requirements.competitors.md`) contradicts itself on this point:
- It lists I-765 among forms where "applicants no longer need to include printed passport-style photos".
- Later it says "The I-765 instructions specify that you must send two identical color passport photos… within the past 30 days".

## H2 outlines

**1. Passlens**
- Start with the current I-765 instruction
- EAD passport-style photo checklist (6-row table)
- Mistakes that make EAD photo prep harder
- How to prepare an EAD-style photo in Passlens
- Related Passlens guides
- Sources

**2. PhotoGov**
- 12 Essential EAD Photo Requirements: a Checklist
- Acceptable EAD Photo Examples
- Online Filing Availability for Form I-765
- How Many EAD Photos Does Form I-765 Require — and In What Format? (paper vs online table)
- How to Take an Acceptable EAD Photo: Five Easy Steps (H3 steps 1–5)
- How to Prepare Photos for a Paper I-765 Application
- How to Prepare a Digital Photo for an Online I-765 Application
- Preparing for a Biometrics Appointment
- Four Common Reasons for an EAD Photo Rejection
- Form Edition Alert for September 2026
- Frequently Asked Questions (10 H3s):
  - What Are the EAD Photo Requirements?
  - How Many Photos… Paper I-765?
  - What Size…?
  - Can USCIS Take My Photo at a Biometrics Appointment Instead?
  - Can I Wear Glasses…?
  - How Recent…?
  - Should I Write Anything on the Back…?
  - Do I Need to Mount Photos…?
  - How Do I Submit…?
  - Is a Refugee Travel Document Photo the Same as an EAD Photo?
- Official Government Sources (11 links)

**3. Lighthouse** (a general I-765 guide, not a photo page)
- What is the I-765 form used for?
- Who can file Form I-765?
- Required supporting documents for the Form I-765 application
- Photo requirements for EAD cards
- How to complete Form I-765
- Where and how to file Form I-765
- Filing fee and payment options
- Processing times and receipt notices
- Understanding your receipt number and approval notice
- Renewing or replacing an EAD card
- Common reasons for delays or denials
- Recent USCIS updates to the application process
- EAD validity periods
- Premium processing for certain categories
- Proposed changes to asylum EAD rules
- Understanding your Employment Authorization Document (EAD)
- How to track your case and manage your USCIS account
- How to handle a change of address
- What to do if your EAD card is delayed or lost in the mail
- How to use your EAD card for employment verification
- How Lighthouse supports your immigration process
- FAQs about work authorization (13 H3s, none photo-specific)

## Specs they state (exact wording for numbers)

| Spec | 1 Passlens | 2 PhotoGov | 3 Lighthouse |
|------|-----------|-----------|--------------|
| Size | "2 x 2 inches, about 51 x 51 mm" | "2 x 2 inches (51 x 51 mm)" | Not stated (only "passport-style") |
| Head size | "Use U.S. passport-style composition guidance" (no number) | "1 to 1⅜ inches from chin to crown" | Not stated |
| Eye height | Not stated | Only mentioned in passing: "outside the required head- and eye-height ranges" (no number) | Not stated |
| Background | "Plain white or off-white style background unless the USCIS instruction says otherwise" | "Plain, white or off-white, texture, pattern, and shadow-free" | Not stated |
| Photo age | Not stated | "**taken within 30 days of filing**" (said in the checklist and twice in the FAQ) | Not stated |
| Number of photos (I-765) | Not stated ("route controls") | "Two EAD photos for mail-in filing / One digital photo for online filings" | "two passport-style photos… if the Form I-765 instructions require it for your category" |
| Back labelling | — | "Write your full name and A-Number, if you have one, on the back of each photo with a pencil or felt-tip pen" | "with your full name and A-number written on the back" |
| Mounting/retouching | — | "unmounted and unretouched". Quotes the USCIS alert about ASC identity verification | — |
| Paper | — | "printed on glossy photo paper"; "thin paper with a glossy finish" | — |
| Digital/online | "600 x 600 px at 300 DPI, or 1200 x 1200 px at 600 DPI" (print export). For upload: "check the account field rules before choosing JPEG or PNG" | "JPG, JPEG, or PNG. 600 x 600 pixels, 240 KB max". Elsewhere: "The live form controls the technical upload rules, including any current file-size limit" | — |
| Glasses | — | "Remove eyeglasses… A medical exception may apply in rare, documented cases". FAQ: "No. Remove glasses" | — |
| Head coverings | — | "No headwear is allowed unless it is worn daily for religious purposes" | — |
| Expression | "neutral expression" | Checklist implies neutral, but Step 2 says "A neutral expression or a natural closed-mouth smile works best" | — |
| Photo reuse | — | "a USCIS photo on file from the last three years" | "most recent USCIS photo is more than three years old" |
| Form edition | — | "Under a September 14, 2026 court order, USCIS continues to accept the 08/21/25 edition of Form I-765 and is not accepting the 09/15/26 edition." | "As of March 5, 2026, USCIS accepts only the 08/21/25 edition of Form I-765." |
| Other dated claims | — | Online filing "Starting in 2021… beginning with F-1 students filing for OPT"; Q27 eligibility category | Auto-extensions eliminated "October 30, 2025"; validity cut "December 5, 2025" (5 years to 18 months for (c)(9), (c)(8), (a)(3), (a)(5), (a)(10), (c)(10)); fee increase "January 1, 2026"; premium processing "$1,780" as of "March 1, 2026"; asylum EAD proposed rule "February 2026" (150 to 365 days) |

## Unique elements

- **Passlens:** a "Route check" row in its checklist (printed vs upload vs biometrics vs no photo). It warns against making a 35x45 mm photo and against "fit-to-page" printing.
- **PhotoGov:**
  - Paper vs online table and an online-filing availability section (Q27 / myUSCIS guided workflow).
  - A biometrics section with the Dec 12, 2025 change and a September 2026 form-edition alert.
  - A refugee travel document vs EAD FAQ.
  - The longest official-sources list (I-765 page, instructions, evidence checklist, filing addresses, forms available online, online filing tips, I-821 webinar, biometrics page, edition news, Policy Manual, DoS digital image requirements).
- **Lighthouse:** puts the photo topic in the context of the full I-765 process. It has a "Recent USCIS updates" bullet list with dates and names specific categories (OPT, STEM OPT, economic hardship) as examples where photos are still needed. It gives no physical photo specs at all.

## Conflicts between competitors

1. **Are photos required with I-765?**
   - PhotoGov: yes, always for now (2 paper / 1 online).
   - Lighthouse: only "if the Form I-765 instructions require it for your category".
   - Passlens: maybe none ("whether photos are needed at all").
   - Snap2pass (hub competitor): both "no longer need to include printed passport-style photos" and "must send two identical".
2. **Recency.** PhotoGov and snap2pass say "within 30 days of filing". Passlens and Lighthouse give no number. Green-card and hub competitors generally say 6 months.
3. **Digital upload rules.** PhotoGov states "600 x 600 pixels, 240 KB max" and JPG/JPEG/PNG, but also says the live form controls the size limit. Passlens says check the account rules for JPEG vs PNG. The green-card competitor Beyond Border says "JPEG only… PNG… not accepted" for USCIS digital.
4. **Form edition status.** Lighthouse says "As of March 5, 2026" only the 08/21/25 edition is accepted. PhotoGov says that after the 09/15/26 edition was published, a "September 14, 2026 court order" keeps 08/21/25 and blocks 09/15/26. They are not contradictory, but the timeline is confusing and Lighthouse has not been updated for it.
5. **Smiling.** PhotoGov allows a "natural closed-mouth smile" in Step 2 while its FAQ and other competitors say neutral.
6. **Paper finish.** PhotoGov requires glossy ("thin paper with a glossy finish"). Green-card competitors say "matte or glossy" is acceptable.

## Outdated or suspect items to flag

- Passlens (May 2026) never mentions the Dec 12, 2025 change by name.
- Lighthouse's visible date is "Nov 19, 2025", but it reports Dec 2025 and March 2026 events. Its edition info is older than the September 2026 events PhotoGov reports.
- PhotoGov's "240 KB" limit matches the DoS/DV digital rule. It may not be a USCIS myUSCIS rule, so it needs official verification.

## Elements they all cover

- I-765 photo is "passport-style", tied to the current form instructions.
- Biometrics (Passlens only in passing).
- Two of three give 2 x 2 in, and two of three give two photos for paper filing.

## Gaps: what none of them cover well

1. **Per-category matrix.** None maps eligibility categories (c)(3)(B/C) OPT/STEM, (c)(9) with or without a concurrent I-485, (c)(8) asylum, (a)(12)/(c)(19) TPS, (c)(33) DACA, (c)(26) H-4, (a)(17)/(a)(18) L-2/E spouses, (c)(11) parole. The matrix should show whether to mail photos, upload one, or expect an ASC appointment.
2. **What the Dec 12, 2025 change actually means in practice.** Nobody covers what an applicant should do if photos are mailed anyway, how the 3-year reuse works for a renewal, or what happens to OPT students who have never had USCIS biometrics. Nobody quotes or links the USCIS announcement directly; PhotoGov links only the generic biometrics page.
3. **Concurrent I-485 + I-765 + I-131 packages.** No count for the combined package. Beyond Border only says the "photos from the same session" can be reused.
4. **Online filing upload specs verified against the myUSCIS form.** Only PhotoGov tries, and it hedges. Nobody shows the actual upload field or tested limits.
5. **Renewal and replacement EADs.** Nobody covers photo rules for renewals, or for replacements of cards with errors (USCIS error vs applicant error).
6. **Physical specs on the Lighthouse page.** Its one photo section gives no size, head or background numbers, so a combined "policy + specs" page beats it.
7. **Diagram or template.** None of the three has a sized 2x2 diagram or a printable-sheet example for the two-photo paper filing.
8. **Back-labelling detail.** Nobody explains the A-Number format, what to write when you have no A-Number, or how to attach prints (envelope). Snap2pass mentions an envelope on the hub page only.

