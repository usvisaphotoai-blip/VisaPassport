// Shared by the server page (JSON-LD) and ValidatorClient (visible FAQ) so both stay in sync.
export const FAQ_ITEMS = [
  {
    q: "How does the visa photo checker work?",
    a: "Pick your destination country and upload a photo. The checker maps your facial landmarks, measures head height and eye position against that country's biometric photo standard, and scans the background and lighting. You get a pass/fail result for each check in a few seconds.",
  },
  {
    q: "Are visa photo rules different from passport photo rules?",
    a: "Often they're the same, but not always. Canada's visitor visa uses a 35×45 mm photo while the Canadian passport uses 50×70 mm, India's e-Visa needs a square digital file, and the US DS-160 has its own pixel and file-size limits. The checker tests the biometric rules (head size, eye line, background, lighting); check the size and file rules in the table above before you upload.",
  },
  {
    q: "Which countries does this tool support?",
    a: "More than 60, including the United States, Schengen countries, India, China, Canada, Australia and the UK. Each country uses its own published photo rules rather than a generic template.",
  },
  {
    q: "Can I check a US DS-160 visa photo?",
    a: "Yes. Select United States to test the 2×2 inch framing, 50–69% head height, eye line and white background. The DS-160 upload also needs a square JPEG between 600×600 and 1200×1200 px and no larger than 240 KB.",
  },
  {
    q: "What about green card or DV Lottery photos?",
    a: "They follow US rules but have their own submission details, so we have dedicated pages: the Green Card Photo Checker for USCIS forms like I-485, and the DV Lottery Photo Checker for the 600×600 px Diversity Visa entry photo.",
  },
  {
    q: "What happens to my photo after I upload it?",
    a: "Your photo is sent over an encrypted connection to run the check. We never sell it, and we don't share it with embassies, government agencies or advertisers.",
  },
  {
    q: "How much of the frame should my head fill?",
    a: "It depends on the country. US visa photos need the head to fill 50–69% of the frame height, while most 35×45 mm visa photos (Schengen, Canada, Australia) need a 31–36 mm head — roughly 70–80% of the height.",
  },
  {
    q: "Can I submit this report with my visa application?",
    a: "No — the report is for your own pre-check. It reduces the risk of rejection, but always confirm the latest photo rules on your destination's official embassy, consulate or visa website before applying.",
  },
  {
    q: "What file formats and sizes are accepted?",
    a: "JPEG, PNG or WebP files up to 10 MB. The checker works best with a photo taken against a plain white or light grey wall in good natural light.",
  },
];
