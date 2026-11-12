# Competitor research: `us-passport-renewal-photo`

Target keyword: "US passport renewal photo" (online-renewal digital photo vs mail-in DS-82)
Research date: 2026-11-12. Pages fetched with plain `curl -sL`. All returned HTTP 200, no blocks.

**Competitor numbers are claims, not facts.** They are quoted as written. Official sources are checked separately. Conflicts are recorded, not resolved.

Saved body text (for the similarity check):
`/private/tmp/claude-501/-Users-navnitrai-personal-project-pixpassport-com/25f67058-8734-4696-bfe0-f0260ed7b21b/scratchpad/competitors/us-passport-renewal-photo/{1-photoaid.com,2-photogov.net,3-passport-photo.online}.txt`

## How the competitors were chosen

Ran a live WebSearch for "US passport renewal photo" twice: unrestricted, and restricted to the 9 allowed domains.

- **Unrestricted**, allowed-domain hits in order: photogov.net/knowledge/requirements/us-passport-photo-requirements/ (general requirements page, already analysed for `us-passport-photo-requirements`) → photoaid.com/blog/passport-photo-requirements (general) → passport-photo.online/passport-renewal-photo → photogov us-department-of-state-photo-guidelines → photogov 2x2-photo → photoaid.com/blog/photo-passport-renewal/ → passlens.com/blog/us-passport-photo-guide
- **Domain-restricted**, in order: 1 photoaid.com/blog/photo-passport-renewal/ · 2 passlens.com/blog/us-passport-photo-guide · 3 photogov.net/knowledge/requirements/digital-passport-photo/ · 4 passport-photo.online/passport-renewal-photo · 5 photoaid.com/passport-renewal-photo · 6 visafoto.com/usa/passport-renewal-online …

I used the domain-restricted ranking and kept only pages about renewal or digital renewal photos.
- **Skipped: passlens.com/blog/us-passport-photo-guide** (rank 2). It is a general US requirements page, and its prose looks programmatic or AI-generated: keyword-list sentences such as "Searches such as 2 by 2 passport photo, 2x2 passport photos, American passport photo size … all point back to the same official baseline", repeated near-duplicate tables, and a line contradicting itself on pixels. It is noted here only for conflicts: it says online renewal accepts "JPG, PNG, HEIC, or HEIF from 54 KB to 10 MB" but also "Digital submissions must be at least 600x600 pixels", and it lists fees "$130 (book) / $30 (card)" (dateModified 2026-05-27).
- Replacement: passport-photo.online/passport-renewal-photo (restricted rank 4, unrestricted rank 3).

## Competitor table

| # | URL | Title tag | H1 | Words (approx.) | Fetch result | Last updated |
|---|---|---|---|---|---|---|
| 1 | https://photoaid.com/blog/photo-passport-renewal/ | Passport Renewal Photo [Requirements, How Many & More] | Passport Renewal Photo [Requirements, How Many Copies & Online Renewal] | ~1,340 (incl. FAQ answers from FAQ markup) | 200 OK | Shown on page "May 7th, 2025" (modified 2025-05-07; published 2023-02-07) |
| 2 | https://photogov.net/knowledge/requirements/digital-passport-photo/ | Digital Passport Photo Requirements 2026: US Size & Rules | Digital Passport Photo: a Complete 2026 Guide | ~4,400 | 200 OK | JSON-LD 2025-12-19 (not shown on page) |
| 3 | https://passport-photo.online/passport-renewal-photo | US Passport Renewal Photo | US Passport Renewal Photo | ~2,000 (incl. ~250 words of testimonials) | 200 OK | JSON-LD modified 2025-08-07 (published 2024-12-04) |

## H2 outlines

### 1. photoaid.com (blog)
- Contents
- U.S. passport renewal photo—requirements
  - H3 Photo for U.S. passport renewal—size and format (print list + online list)
  - H3 Passport renewal photo—appearance
- How to submit a photo for passport renewal (one photo, stapling, online upload)
- PhotoAiD®—the effortless way to get photos for passport renewal
- FAQ (7 questions in an accordion; answers only in FAQ markup)
- Conclusion

### 2. photogov.net (digital passport photo guide)
- What is a Digital Passport Photo in the U.S.? (H3: Is / Isn't)
- Why Technical Compliance Matters (H3: Printed Photo Rules Still Apply)
- Key Digital Passport Photo File Specifications
- Pixel Dimensions and Square Aspect Ratio (H3s: Supported File Formats / File Size Requirements / Color Mode, Color Space, and Resolution / Compression and Image Quality)
- Digital Photos Follow Strict Biometric Requirements (H3s: Background / Head Size / Expression / Glasses, Accessories, Headwear / Recency / No Filters)
- Passport, Visa, and DV: Which Requirements Apply to You? (H3s: Online U.S. Passport Renewal (MyTravelGov) / U.S. Visa (Non-DV) / DV Lottery)
- Quick Comparison Table: Passport vs. Visa vs. DV Lottery
- Checklist: 7 Steps to Take Before Uploading Your Digital Passport Photo
- Why U.S. Digital Passport Photos Get Rejected (10 H3 reasons)
- Summary of All U.S. Digital Passport Photo Requirements (big table)
- Application Types and Required Photo Formats (table)
- How U.S. Officials Check Your Digital Passport Photo (H3s: Automated Technical Validation / Automated Biometric Detection / Manual Review / Why Multilayered)
- Frequently Asked Questions (10 H3s)

### 3. passport-photo.online (tool landing page)
- What People Are Saying (testimonials)
- [unlabelled spec widgets: online renewal vs mail renewal]
- Passport Renewal Photo: Requirements, Size & How to Apply Online
  - H3 What are the photo requirements for passport renewal? (table; H4 Glasses, smile & other guidelines)
  - H3 Photos for online passport renewal (H4 How to upload your photo to the online application: 7 steps)
  - H3 Expert-verified passport renewal photo online
- How does our photo tool work? (H3s: Take or upload / verified / Enjoy; H3 Applying via mail: Printed photos, with stapling)
- FAQ (4 H3s: size / old photo / how to attach / two photos?)

## Specs they state (exact wording)

PA = photoaid, PG = photogov, PPO = passport-photo.online.

| Spec | PA | PG | PPO |
|---|---|---|---|
| **Online renewal: pixel size** | "at least 600 x 600 pixels" | "600×600 to 1,200×1,200 px"; "Any image outside this range will be automatically rejected" | widget "Dimensions 600x600 pixels"; body "must be 600 x 600 pixels in resolution" |
| **Online: aspect ratio** | — | "1:1 square aspect ratio"; "Even a slightly rectangular image is rejected automatically" | — |
| **Online: file format** | "JPEG format" | intro "JPG, PNG, or HEIF"; section "JPEG, PNG, and HEIF"; FAQ "HEIF, HEIC, or PNG … only for online passport renewal" | "You must upload it in JPEG format" |
| **Online: file size** | "sized between 54 kB and 10 MB" | "Minimum: 54 KB / Maximum: 10 MB" | widget "from 54KB to 10MB"; body "between 54 KB and 10MB" |
| **Online: color** | "sRGB color space" | "24-bit color depth"; "sRGB color profile"; AdobeRGB/Display P3 "will … trigger a rejection" | — |
| **Online: compression** | "20:1 compression ratio or less" | "Compression must not exceed a 20:1 ratio" | "select the highest quality setting, and don't compress the file" |
| **Online: DPI** | — | "the DPI value (such as 72 or 300 DPI) makes no difference for online uploads" | — |
| **Online: background** | — | "White or off-white" | widget "Background color Off-white" |
| **Online: scanned print** | — | allowed if unavoidable: "Scan the original 2×2-inch print at 300 DPI" | "Don't scan printed pictures, or they'll be rejected" |
| **Online: edits** | — | "Permitted: Minor overall brightness or contrast corrections, Cropping …, Straightening" | "Don't edit or modify the image. Red-eye removal and filters aren't allowed" |
| **Online: portal** | "upload the file when requested by the government's website" | "MyTravelGov"; system shows "'Invalid photo'" | "Create a MyTravelGov account"; "In 'Step 2,' … Click 'Upload image'"; "green box" after initial check; agent reviews later |
| **Online renewal availability** | "testing … expected to be fully up and running in 2023" | — | "Online passport renewal is available since 2024" |
| **Mail (DS-82): size** | "2 (two) inches in height and 2 (two) inches in width" | "2×2-inch print" (scan context) | "2 x 2 inches (51 x 51 mm)"; widget "Dimensions 2x2 inches" |
| **Mail: head size** | "between 1 and 1 3/8 inches" | "between 1 inch and 1⅜ inches" | "Between 1–1 3/8 inches (25–35 mm)" |
| **Mail: DPI** | — | — | widget "Resolution (DPI) 600"; table "300–600 DPI" |
| **Mail: paper** | "printed on glossy or matte photo-quality paper" | — | "high-quality photographic paper (matte or glossy)" |
| **Mail: attaching** | "4 (four) staples located vertically in the corners and as close as possible to the edges. Photos attached in any other way or glued will be rejected" | — | "four staples in each photo corner, parallel to the edges"; "Don't glue" |
| **Number of photos** | "only 1 (one) passport photo"; passport card: "Just one, it will be used for both documents" | — (not stated in this guide) | "only one color photo" |
| **Photo age** | "less than 6 (six) months old" | "within the past 6 months" | "within the last six months" |
| **Reusing an earlier photo** | "it's NOT possible to submit a previously used one, it has to be a new photo" | FAQ "Can I Reuse a Previous Photo File …? No." | "You don't necessarily need a new photo … If you have a picture taken no longer than six months ago … you can use it" |
| **Glasses** | "no glasses" | "not permitted under any circumstances, unless you have a documented medical condition and a formal exemption" | "acceptable but only under strict conditions … It's best to remove the glasses" |
| **Smiling** | "neutral facial expression or a natural smile" | "Only neutral expression"; "No smile showing teeth" | "You can smile … as long as your teeth aren't showing" |
| **Head coverings** | "unless worn for medical or religious purposes" | "only for established religious or medical reasons" | (links out) |
| **Jewelry/piercings** | "facial piercings and jewelry are allowed if they don't cover the face" | "Facial jewelry that interferes" prohibited | — |
| **Clothing** | "avoid white clothing" (advice) | — | "darker colors … Don't wear white and off-white attire" |
| **Visa/DV contrast** | — | Visa and DV: "≤ 240 KB", "JPEG only" | — |
| **Prices** | — | — | "Online passport renewal photo: $16.95"; "Printed copies: $19.95" |

## Unique elements

- **PA**: the only one with a passport-card answer ("Just one, it will be used for both documents") and the only one saying the same photo rules apply to expedited service and passport agencies. Short. No official links.
- **PG**: the most technical: format/size/pixel matrix across renewal, visa and DV; a 7-step pre-upload checklist; 10 rejection reasons; a "how officials check" 3-stage explainer with example rejection messages ("Background not uniform", "Face not centered in the frame", "Photo may have been altered"); scanning guidance; sRGB vs Display P3 warning. Links: travel.state.gov online-renewal-photo, photos, visa photos, DV entry pages, and ICAO 9303 PDF (no dates).
- **PPO**: step-by-step MyTravelGov upload walkthrough ("Step 2", "Upload image", "Save photo", green confirmation box); side-by-side spec widgets for online vs mail; stapling instructions; customer testimonials claiming acceptance; "86% … within 15 minutes"; links to travel.state.gov renew-online, online-renewal-photo, photos.

## Outdated or contradictory items

- **PA is out of date**: it opens with "The current procedure for U.S. passport renewals requires applicants to mail their forms" and says online renewal is "expected to be fully up and running in 2023". The page was modified 2025-05-07 but still reads as 2023. It also says JPEG only, which conflicts with PG.
- **PG contradicts its own sister page**: this guide says 600×600–1,200×1,200 px is required for online renewal, while photogov's requirements page (analysed for `us-passport-photo-requirements`) says "the U.S. Department of State does not set a pixel size" for online renewal. Format lists also drift within the page (JPG/PNG/HEIF vs HEIF/HEIC/PNG). It says JPEG is "Accepted for … DS-11 submissions", though DS-11 is a print application. It allows "Minor overall brightness or contrast corrections" while photogov's requirements page bans "color correction".
- **PPO contradicts itself on DPI**: the mail widget says "600" and the requirements table says "300–600 DPI". Its online widget gives the background as "Off-white" only. It says "Online passport renewal is available since 2024", which conflicts with PA's 2023 framing.
- **The rejection messages PG quotes** ("Invalid photo", "Photo may have been altered") are not sourced.

## Conflicts between competitors

1. **Online pixel rule**: "at least 600 x 600" (PA) / 600–1,200 px with auto-rejection outside the range (PG) / exactly "600 x 600 pixels" (PPO). The excluded passlens and photogov's own requirements page add "no pixel size set".
2. **Online file format**: JPEG only (PA, PPO) vs JPEG/PNG/HEIF(HEIC) (PG).
3. **Reusing an existing photo under 6 months old**: not possible, must be new (PA) vs allowed (PPO).
4. **Scanning a print for online renewal**: rejected (PPO) vs allowed at 300 DPI (PG).
5. **Editing**: none allowed (PPO) vs minor brightness/contrast and straightening allowed (PG).
6. **Glasses**: plain "no glasses" (PA) / medical exemption (PG) / "acceptable but only under strict conditions" (PPO).
7. **Smiling**: natural smile OK (PA), teeth-hidden smile OK (PPO), neutral only (PG).
8. **Staple orientation**: "vertically in the corners" (PA) vs "parallel to the edges" (PPO).
9. **When online renewal started**: "expected … 2023" (PA) vs "available since 2024" (PPO).
10. **Print DPI**: 300–600 / 600 (PPO); nobody else states one.

## Elements they all cover

- One photo per renewal
- Taken within the last 6 months
- 54 KB–10 MB online file size (all three agree on this number)
- 2 x 2 in print with head 1–1⅜ in for mail renewal
- No glasses (with different exceptions), neutral expression
- White/off-white background
- A plug for the site's own tool

## Gaps: what none of them cover well

1. **No dated official citation for the online-renewal numbers.** PG and PPO link the travel.state.gov online-renewal-photo page but give no access date and don't quote it, and PA links nothing. The three disagree on pixels and format, and the reader can't tell which is current.
2. **Digital and print rules are mixed together.** Only PPO uses two separate widgets, and its table then blends them (DPI next to digital). PG's whole guide merges passport renewal with visa and DV numbers. Nobody gives one clean two-column table (online renewal | DS-82 mail) with a source per row.
3. **Online-renewal eligibility isn't tied to the photo choice.** None of the three explains who can renew online versus who must mail DS-82 (age at issuance, how long ago the passport was issued, name change, damaged passport, child passports), so a reader can't work out which photo they need. PA and PPO don't mention eligibility at all.
4. **No iPhone HEIC / phone export guidance for renewal.** Nobody explains how to export a phone photo correctly (HEIC vs JPEG, Display P3 vs sRGB), apart from PG's one-line P3 warning.
5. **No troubleshooting for upload failures.** Only PG lists generic rejection causes. Nobody maps upload-tool messages to fixes, explains the in-application crop tool, or says what happens when a passport agent later rejects the photo (PPO gives one sentence: an email asks for a new image).
6. **No rejection-fix table** (symptom → fix) for either channel.
7. **Passport card with online renewal**: only PA mentions the card, in one sentence and only for mail.
8. **Nobody says whether the State Department photo tool can be used for the online-renewal upload.** Only the excluded passlens touches this.
9. **No timeline or practical risk notes**: what happens to the old passport, processing while the photo is under review, and whether a rejected photo delays the whole renewal.
10. **No conflict disclosure.** None acknowledges that third-party sites disagree on pixels, format, scanning or reuse.
11. **Mail stapling**: covered by PA and PPO with differing descriptions, with no diagram and no source.
