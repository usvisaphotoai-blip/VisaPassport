# Preview Page Conversion Optimization

Close the conversion leaks and add conversion-boosting elements to maximize paid downloads on usvisaphotoai.pro.

## Problem

The preview page at `/preview/[id]` has two critical conversion leaks:
1. A **"Download Preview (Watermarked)"** button (line 1118) that lets users download for free
2. A **zoom dialog** (line 1158) that shows the full unblurred processed photo

Users can get their processed photo without paying, killing the $0.99 conversion.

## Proposed Changes

### Preview Page

#### [MODIFY] [PreviewClient.tsx](file:///c:/Users/navni/OneDrive/Desktop/usvisaphotoai/app/preview/[id]/PreviewClient.tsx)

**1. Remove free download button** — Delete the "Download Preview (Watermarked)" link at lines 1118-1129.

**2. Add blur + watermark overlay for unpaid users** — When `hasPaid === false`:
- Apply `filter: blur(8px)` to the canvas showing the processed photo
- Add a diagonal "SAMPLE" watermark overlay
- Block zoom dialog for unpaid users (or show blurred version in zoom)

**3. Add fear-based messaging block** — Below the photo, add a section with visa rejection statistics:
```
⚠️ Don't Risk Rejection
→ 30% of visa applications are delayed due to non-compliant photos
→ A rejected DV Lottery photo means permanent disqualification
→ Re-submitting costs weeks of processing time
```

**4. Add trust signals strip** — Between the photo and checkout:
```
🔒 Secure Payment  |  ✅ 12,000+ Photos Processed  |  🏛️ State Dept. Compliant
```

**5. Add Free vs Paid comparison table** — Show what free validation gives vs what paid download includes.

**6. Add CVS price anchoring** — Near the CTA:
```
CVS charges $16.99 for the same photo. Save 94%.
```

**7. Improve CTA copy** — Change from "Pay Securely & Download" to:
```
Download Compliant Photo — $0.99
```

**8. Remove zoom dialog for unpaid users** — On click, show a message like "Pay to view full resolution" instead of opening the zoom.

## Verification Plan

### Build Test
```bash
npx next build
```
Must exit with code 0.

### Browser Test
1. Navigate to the tool page at `http://localhost:3000/tool`
2. Upload a photo and process it
3. Verify redirect to `/preview/[id]`
4. Confirm the photo is blurred with "SAMPLE" watermark
5. Confirm clicking the photo does NOT show the unblurred image
6. Confirm there is no free download button
7. Confirm fear messaging, trust signals, and comparison table are visible
8. Confirm the CTA button shows the improved copy
9. Confirm CVS price anchoring is visible
