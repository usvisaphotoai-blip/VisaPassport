# USCIS official sources (shared by the green card, EAD and USCIS hub pages)

Read 2026-11-12 with a normal fetch (uscis.gov allows it). Form pages show "Last Reviewed/Updated: 11/10/2026".
Numbers on the pages come only from these documents, via `lib/document-specs.ts` (`uscis-photo`, `USCIS_FORM_PHOTOS`).

## Form instructions (current editions on each form page)

| Form | Edition on uscis.gov | Photo text in the instructions |
|---|---|---|
| I-485 | 09/18/26 (page also mentions a 09/04/26 edition tied to an interim final rule under injunction) | "You must submit two identical color passport-style photographs of yourself taken recently." White to off-white, thin paper, glossy, unmounted, unretouched; 2 by 2 inches, full face, frontal; head 1 to 1 3/8 in "from the top of your hair to the bottom of your chin"; eye height 1 1/8 to 1 3/8 in "from the top of your eyes to the bottom of the photo"; head bare unless religious headwear; name and A-Number lightly in pencil or felt pen on the back. |
| I-765 | 08/21/25 (USCIS "continues to accept the 08/28/24 edition of Form I-539 and 08/21/25 edition of Form I-765 and is not accepting the 09/15/26 edition", per a Sept. 14, 2026 court order) | Same wording as I-485 ("C. Photographs", page 22 of 25). Page alert: "photos submitted to USCIS must be unmounted and unretouched. Unretouched means the photos must not be edited or digitally enhanced." Mounted or retouched photos "will delay the processing" and may lead to an ASC appointment. |
| I-131 | 01/20/25 | Two identical photos if (A) outside the U.S. filing for a Refugee Travel Document, or in the U.S. filing for Advance Parole or TPS Travel Authorization. Same size/head/eye text. Adds: "if you submit a digital photo, it must be produced from a high-resolution camera that has at least 3.5 mega pixels of resolution." Note: the PDF served on 2026-11-12 carries a "Draft – Not for Reproduction 05/13/2026" watermark while the page lists edition 01/20/25. |
| I-130 | 04/01/24 | Spouse petitions only: "two identical color passport-style photographs of yourself and your spouse (if he or she is in the United States) taken within 30 days of filing this petition." |
| I-129F | 01/20/25 | "one color passport-style photograph of yourself and one color passport-style photograph of the beneficiary taken within 30 days of filing this petition." |
| I-751 | 04/01/24 | Only petitioners filing from overseas under military or government orders: "Two passport-style photos for each petitioner and dependent, regardless of age." |
| N-400 | 01/20/25 | Only applicants residing outside the U.S. (certain armed forces members, spouses, qualifying employees' spouses). Form page: "you may need to submit physical passport photographs after you have already filed" and "we may use the photograph taken at the ASC on your Certificate of Naturalization." |
| N-600 | 01/20/25 | In the U.S., "USCIS may request that you attend an appointment at an ASC to have your photograph taken"; outside the U.S., two identical photos. |
| I-90 | 01/20/25 | No photo submission; biometrics appointment. |

## Policy Alert PA-2025-29, "Photograph Reuse for Identity Documents" (December 12, 2025)

https://www.uscis.gov/sites/default/files/document/policy-manual-updates/20251212-PhotographReuse.pdf
News alert: https://www.uscis.gov/newsroom/alerts/new-photo-policy-helps-prevent-immigration-fraud-through-enhanced-identity-verification

- "USCIS may only reuse a previously collected photograph if, at the time of filing, no more than 36 months (3 years) have passed since the date the photograph was collected at a BSA."
- N-400, N-600, I-90 and I-485 "require the collection of new biometrics, including a new photograph."
- "USCIS will not use or reuse self-submitted photographs."
- Effective immediately for requests filed on or after December 12, 2025.

## What this means for the pages (our reading, stated carefully)

- The photo printed on a green card or EAD now comes from a USCIS biometrics appointment (new, or reused if ≤ 3 years old), not from the prints you mail.
- The current I-485 and I-765 instructions still say to include two photos. The policy alert does not remove that instruction. The pages tell readers to follow the form instructions and to expect a biometrics appointment. We do not advise leaving photos out.
- Some university advisers (UW–Madison ISS, Stony Brook VISA office) also say to keep including photos until the instructions change; some commercial sites say photos are "no longer accepted". The latter goes beyond what USCIS published.

## Spec conflict log (USCIS)

| Item | Values seen | Resolution |
|---|---|---|
| Head size | "1 to 1 3/8 in" (USCIS instructions); "50–69%" (commercial sites) | Both agree: 1/2 = 50%, 1.375/2 = 68.75%. We show inches first, then mm and % as conversions. |
| Measurement points | Instructions say "top of your hair to the bottom of your chin" (not "top of head") | Use USCIS wording. |
| Eye height | "1 1/8 to 1 3/8 in from the bottom of the photo" | From instructions. |
| Photo age | "taken recently" (I-485, I-765, I-131, N-400, N-600); "within 30 days" (I-130 spouse, I-129F) | Use form-specific wording; do not invent "6 months" for USCIS forms. |
| Glasses | USCIS instructions are silent | Say USCIS form instructions do not mention glasses; recommend removing them to avoid glare (our advice, labelled as such). |
| Digital photo rules | Only I-131 mentions 3.5 MP | Do not state pixel or KB limits for USCIS. |
| I-90 photos | Some competitors (and our own /us-check-photo-green-card meta description) list I-90 as needing photos | Instructions do not ask for photos; PA-2025-29 requires new biometrics for I-90. Flag our own page. |
