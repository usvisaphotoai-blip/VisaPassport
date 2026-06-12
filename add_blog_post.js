const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "uk-visa-photo-requirements",
  "title": "UK Visa Photo Requirements (2026 Complete Guide): Size, Background, Biometric Rules & Common Mistakes",
  "description": "Official 2026 guide to UK visa photo requirements. Covers exact 35×45mm size, head height 29–34mm, light grey/cream background (not white), no glasses rule, resolution 300–600 DPI, number of photos, and top rejection reasons. Verified against UK Visas and Immigration (UKVI), HMPO, and ICAO Document 9303.",
  "date": "2026-06-12",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1781255425/uk-visa-photo-requirements_sdwkdj.webp",

  "content": `
    <h1>UK Visa Photo Requirements (2026 Complete Guide): Size, Background, Biometric Rules &amp; Common Mistakes</h1>

    <p>Submitting a non-compliant photograph is one of the most common — and most avoidable — reasons UK visa applications are delayed or rejected. Whether you are applying for a Standard Visitor Visa, Student Visa (formerly Tier 4), Skilled Worker Visa, Family Visa, or any other UK immigration route, your photograph must meet the precise biometric standards set by <strong>UK Visas and Immigration (UKVI)</strong>, which sits under the <strong>Home Office</strong>.</p>

    <p>This guide covers every official UK visa photo requirement for 2026: exact dimensions, face height, background colour, resolution, expression, glasses rules, headwear, and how many prints to submit. All specifications are sourced from <strong>UK Visas and Immigration (UKVI)</strong>, <strong>His Majesty's Passport Office (HMPO)</strong>, and <strong>ICAO Document 9303</strong> — the international biometric photography standard that underpins UK rules. Always confirm the latest requirements on <strong>gov.uk</strong> before submitting your application.</p>

    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">Get Your UK Visa Photo Right — First Time</p>
      <p class="text-gray-600 mb-4 text-sm">Automatically verify and resize your photo to 35×45mm, light grey background, 29–34mm head height, 300 DPI — before your UKVI biometric appointment.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=uk-visa" class="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition duration-200 shadow">Prepare My UK Visa Photo</a>
        <a href="https://www.gov.uk/uk-visa-photos" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition duration-200">Official UKVI Guidelines →</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-gray-700 hover:underline font-medium">PixPassport</a></p>
    </div>

    <h2>Quick Reference: UK Visa Photo Requirements at a Glance (2026)</h2>

    <table class="w-full border-collapse border border-gray-300 my-6 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Requirement</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Official Specification</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="border border-gray-300 px-4 py-2">Photo size</td><td class="border border-gray-300 px-4 py-2">35mm wide × 45mm tall</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Head height (chin to crown)</td><td class="border border-gray-300 px-4 py-2">29mm – 34mm</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Background colour</td><td class="border border-gray-300 px-4 py-2">Plain light grey or cream — <strong>not</strong> white</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Print resolution</td><td class="border border-gray-300 px-4 py-2">Minimum 300 DPI, maximum 600 DPI</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Digital file format</td><td class="border border-gray-300 px-4 py-2">JPEG or PNG</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Digital file size</td><td class="border border-gray-300 px-4 py-2">50 KB – 10 MB</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Number of prints required</td><td class="border border-gray-300 px-4 py-2">2 identical photos (paper applications)</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Recency</td><td class="border border-gray-300 px-4 py-2">Taken within the last 1 month (adults)</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Glasses</td><td class="border border-gray-300 px-4 py-2">Not permitted (banned since 2021 in line with ICAO)</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Expression</td><td class="border border-gray-300 px-4 py-2">Neutral, mouth closed, eyes open and forward-facing</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Headwear</td><td class="border border-gray-300 px-4 py-2">Not permitted except religious/medical exemptions</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Paper type</td><td class="border border-gray-300 px-4 py-2">Plain colour photographic paper, professionally printed</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Photo editing</td><td class="border border-gray-300 px-4 py-2">Not permitted — no retouching, filters, or enhancements</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Issuing authority</td><td class="border border-gray-300 px-4 py-2">UK Visas and Immigration (UKVI), Home Office</td></tr>
      </tbody>
    </table>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1781145889/UK-Visa-Photo-Size-Diagram_35x45mm.webp"
      alt="UK visa photo size diagram showing 35mm x 45mm dimensions and 29–34mm head height"
      class="rounded-xl my-6 w-full max-w-lg mx-auto block"
    />

    <h2>UK Visa Photo Size: Exact Dimensions</h2>

    <p>The required print size for all UK visa photographs is <strong>35mm wide by 45mm tall</strong> — a portrait-orientation rectangle, not a square. This is identical to the UK passport photo size and is set by UKVI in line with ICAO biometric standards.</p>

    <h3>Head Height Requirements</h3>
    <p>Within that 45mm height, the distance from your chin to the top of your head (crown, not hair) must measure between <strong>29mm and 34mm</strong>. This equates to approximately 64–76% of the total photo height. A head that is too large or too small is one of the most common reasons UKVI rejects photos at biometric appointment centres.</p>

    <h3>Digital Photo Pixel Dimensions</h3>
    <ul>
      <li><strong>At 300 DPI:</strong> 413 × 531 pixels (minimum acceptable for digital submission)</li>
      <li><strong>At 600 DPI:</strong> 827 × 1063 pixels (recommended for highest quality)</li>
      <li><strong>File format:</strong> JPEG or PNG</li>
      <li><strong>File size:</strong> Between 50 KB and 10 MB</li>
    </ul>

    <h2>Background Colour: Light Grey or Cream — Not White</h2>

    <p>This is the single most misunderstood UK visa photo requirement, and the cause of a large proportion of rejections. <strong>The background must be plain light grey or cream — pure white is not acceptable.</strong></p>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1781145889/UK-Visa-Photo-Background-Comparison.webp"
      alt="Comparison of correct light grey background vs rejected pure white background for UK visa photo"
      class="rounded-xl my-6 w-full max-w-lg mx-auto block"
    />

    <h3>Why Does UKVI Reject White Backgrounds?</h3>
    <p>The automated biometric face-matching system used at UKVI application centres is calibrated against a neutral off-white tone. A pure white background can create overexposure artefacts — especially around the hairline and ears — that interfere with automated facial geometry checks. Applicants who arrive at their biometric appointment with a white-background photo are commonly sent back to a photo booth, causing delays.</p>

    <h4>Acceptable background colours include:</h4>
    <ul>
      <li>Light grey (pale neutral grey, not dark grey)</li>
      <li>Cream (warm off-white)</li>
      <li>Plain off-white with no patterns, shadows, or gradients</li>
    </ul>

    <h4>Background colours that will be rejected:</h4>
    <ul>
      <li>Pure white (RGB 255,255,255)</li>
      <li>Coloured backgrounds (blue, yellow, green, etc.)</li>
      <li>Patterned, textured, or shadowed backgrounds</li>
      <li>Backgrounds where the face blends into the background</li>
    </ul>

    <h2>Face and Expression Requirements</h2>

    <p>UKVI biometric rules require your face to be clearly and neutrally presented so that automated and manual identity checks can be carried out accurately.</p>

    <h3>Facial Expression</h3>
    <ul>
      <li><strong>Expression:</strong> Neutral — relaxed face, mouth closed</li>
      <li><strong>Eyes:</strong> Open, clearly visible, looking directly at the camera</li>
      <li><strong>Head position:</strong> Facing straight forward — no tilting, turning, or angling</li>
      <li>No smiling, frowning, or raised eyebrows</li>
      <li>Both ears should be visible where possible</li>
      <li>Hair must not cover the eyes or eyebrows</li>
    </ul>

    <h3>Lighting and Focus</h3>
    <ul>
      <li>Photo must be in sharp focus — no blurring</li>
      <li>Even lighting across the face — no shadows on the face or background</li>
      <li>No red-eye effect</li>
      <li>No flash shadows behind the head</li>
      <li>Natural daylight or two balanced lamps at equal distance from both sides of the face is recommended</li>
    </ul>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1781145889/UK-Visa-Photo-Expression-Guide.webp"
      alt="UK visa photo expression guide: correct neutral expression vs rejected smiling expression"
      class="rounded-xl my-6 w-full max-w-lg mx-auto block"
    />

    <h2>Glasses Rules: No Glasses Permitted (Since 2021)</h2>

    <p><strong>Glasses of any kind are not permitted in UK visa photographs as of 2021.</strong> This includes prescription glasses, reading glasses, and fashion frames. The UK implemented a full ban on glasses in line with updated ICAO guidance adopted by most major immigration authorities globally. Contact lenses are permitted as they are invisible in photographs.</p>

    <h4>Glasses that are always rejected:</h4>
    <ul>
      <li>Prescription glasses (any frame style)</li>
      <li>Reading glasses</li>
      <li>Sunglasses or tinted lenses</li>
      <li>Transition or photochromic lenses</li>
      <li>Fashion frames with clear lenses</li>
    </ul>

    <h2>Headwear Rules</h2>

    <p>Hats, caps, beanies, and all casual headwear are not permitted. Religious and medical exemptions apply under the following strict conditions:</p>

    <h3>Religious Head Coverings (Permitted with Conditions)</h3>
    <ul>
      <li>Permitted: hijab, turban, kippah, and other daily religious headwear</li>
      <li>Full face must be visible from chin to top of forehead</li>
      <li>Both sides of the face must be clearly visible from ear to ear</li>
      <li>The covering must not cast any shadow on the face</li>
      <li>Eyebrows, eyes, nose, mouth, and chin must all be clearly visible</li>
    </ul>

    <h3>Medical Head Coverings</h3>
    <ul>
      <li>Permitted for documented medical reasons</li>
      <li>A signed supporting letter may be required</li>
      <li>Same face visibility conditions apply as for religious coverings</li>
    </ul>

    <h2>Photo Print Requirements</h2>

    <h3>Number of Photos Required</h3>
    <p>For paper-based UK visa applications, you must submit <strong>2 identical photographs</strong>, unattached and loose (not stapled or glued). Both copies must be identical — printed from the same source at the same time.</p>

    <h3>Print Quality</h3>
    <ul>
      <li>Professionally printed on plain colour photographic paper</li>
      <li>In colour — black and white photos are not accepted</li>
      <li>Not creased, torn, marked, or bent</li>
      <li>Not printed on ordinary office paper</li>
      <li>No digital alterations — no blemish removal, skin tone adjustment, or other post-processing</li>
    </ul>

    <h3>Writing on the Back of the Photo</h3>
    <p>Where required by your specific application form, write your <strong>full name and date of birth</strong> lightly on the back of one photo using a pencil (not pen, which can bleed through).</p>

    <h2>UK Visa Photo Requirements by Visa Category</h2>

    <p>UKVI applies the same 35 × 45mm biometric photo specification across all visa categories. The table below confirms this for the most common visa routes:</p>

    <table class="w-full border-collapse border border-gray-300 my-6 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Visa Category</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Photo Size</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Same UKVI Standard?</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="border border-gray-300 px-4 py-2">Standard Visitor Visa</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Student Visa (formerly Tier 4)</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Skilled Worker Visa</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Family Visa (Spouse/Partner)</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Graduate Visa</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Health and Care Worker Visa</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Indefinite Leave to Remain (ILR)</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">✅ Yes</td></tr>
      </tbody>
    </table>

    <h2>Child and Infant Photo Rules</h2>

    <p>Children's photos follow the same background, size, and lighting requirements as adults, with the following relaxed rules:</p>

    <ul>
      <li><strong>Babies under 1 year:</strong> Eyes do not need to be open</li>
      <li><strong>Children under 6 years:</strong> Do not need to be looking directly at the lens, but must be facing forward</li>
      <li>No toys, dummies, or hands should appear in the photo</li>
      <li>No parent's hands or other people should be visible</li>
      <li>The child must appear alone in the photo with a clear background</li>
      <li>A supporting hand may be used to keep an infant in position, but must not be visible in the final image</li>
    </ul>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1781145889/UK-Visa-Photo-Child-Requirements.webp"
      alt="UK visa photo requirements for children and infants 2026"
      class="rounded-xl my-6 w-full max-w-lg mx-auto block"
    />

    <h2>Top Reasons UK Visa Photos Are Rejected</h2>

    <p>UKVI automated and manual checks at biometric appointment centres consistently reject photos for the following reasons. Review this list before submitting your application:</p>

    <table class="w-full border-collapse border border-gray-300 my-6 text-sm">
      <thead>
        <tr class="bg-red-50">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Rejection Reason</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">How to Fix It</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="border border-gray-300 px-4 py-2">Pure white background</td><td class="border border-gray-300 px-4 py-2">Retake against a light grey or cream background</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Glasses worn</td><td class="border border-gray-300 px-4 py-2">Remove all glasses — no exceptions</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Head too large or too small</td><td class="border border-gray-300 px-4 py-2">Ensure chin-to-crown = 29–34mm within the 45mm height</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Shadows on face or background</td><td class="border border-gray-300 px-4 py-2">Use even, diffuse lighting from both sides</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Smiling or open mouth</td><td class="border border-gray-300 px-4 py-2">Adopt a neutral expression, mouth firmly closed</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Hair covering eyes or eyebrows</td><td class="border border-gray-300 px-4 py-2">Tie hair back or push it behind the ears</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Photo older than 1 month</td><td class="border border-gray-300 px-4 py-2">Retake the photo — UKVI recency rules are strictly enforced</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Blurry or out-of-focus image</td><td class="border border-gray-300 px-4 py-2">Use rear camera on a stand; avoid front selfie camera</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Photo edited or filtered</td><td class="border border-gray-300 px-4 py-2">Do not apply any post-processing; submit the original</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Red-eye effect</td><td class="border border-gray-300 px-4 py-2">Use natural light or indirect flash; use red-eye reduction setting</td></tr>
      </tbody>
    </table>

    <h2>How to Take a Compliant UK Visa Photo at Home (Step-by-Step)</h2>

    <p>You do not need a professional photo studio. A compliant UK visa photo can be taken at home following these steps:</p>

    <ol class="list-decimal pl-6 space-y-2 my-4">
      <li><strong>Choose your background.</strong> Stand in front of a plain off-white, cream, or light grey wall. Avoid patterned wallpaper. Do not use a white wall — it will likely appear pure white.</li>
      <li><strong>Set up lighting.</strong> Use natural daylight from a window facing you, or two lamps positioned at equal distances on either side. Avoid single-direction lighting that creates shadows.</li>
      <li><strong>Remove glasses and headwear.</strong> Remove all glasses. Remove all headwear unless worn for documented religious or medical reasons.</li>
      <li><strong>Position your camera at eye level.</strong> Use a phone stand or ask someone to hold the camera. Position the camera 1–1.5 metres away. Do not use the selfie (front-facing) camera — use the rear camera for higher resolution.</li>
      <li><strong>Adopt the correct expression.</strong> Look directly into the camera. Keep your mouth closed and your face relaxed. Both eyes must be fully open.</li>
      <li><strong>Check the framing.</strong> Your full face, top of the head (with a small gap above), and the top of your shoulders should all be visible. Verify your chin-to-crown head height will fall within 29–34mm once printed at 35×45mm.</li>
      <li><strong>Verify and resize.</strong> Use a UKVI-compliant tool to resize the photo to exactly 35×45mm at 300 DPI, confirm the background colour is correct, and check no shadows are present before printing.</li>
    </ol>

    <h2>Where to Print Your UK Visa Photo in 2026</h2>

    <p>You can have your UK visa photo professionally printed at the following locations in the UK:</p>

    <ul>
      <li><strong>Boots Pharmacy</strong> — photo kiosk and counter service, approximately £8–10 for 2 photos</li>
      <li><strong>Snappy Snaps</strong> — professional print service available at most branches</li>
      <li><strong>Post Offices</strong> — photo booth and counter service at selected branches</li>
      <li><strong>Tesco and Asda photo kiosks</strong> — self-service print from a prepared digital file</li>
      <li><strong>Independent photo studios</strong> — most offer an official biometric photo service</li>
    </ul>

    <p>If you have already prepared a compliant digital file (correctly cropped to 35×45mm at 300 DPI), you can use a self-service kiosk to print — this is typically faster and cheaper than the counter service.</p>

    <h2>UK Visa Photo vs UK Passport Photo: Key Differences</h2>

    <table class="w-full border-collapse border border-gray-300 my-6 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Requirement</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">UK Visa (UKVI)</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">UK Passport (HMPO)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="border border-gray-300 px-4 py-2">Photo size</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td><td class="border border-gray-300 px-4 py-2">35 × 45mm</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Background</td><td class="border border-gray-300 px-4 py-2">Light grey or cream</td><td class="border border-gray-300 px-4 py-2">Light grey or cream</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Head height</td><td class="border border-gray-300 px-4 py-2">29–34mm</td><td class="border border-gray-300 px-4 py-2">29–34mm</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Recency</td><td class="border border-gray-300 px-4 py-2">Within 1 month</td><td class="border border-gray-300 px-4 py-2">Within 1 month (renewal)</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Issuing authority</td><td class="border border-gray-300 px-4 py-2">UKVI (Home Office)</td><td class="border border-gray-300 px-4 py-2">HMPO</td></tr>
        <tr class="bg-gray-50"><td class="border border-gray-300 px-4 py-2">Countersignature needed?</td><td class="border border-gray-300 px-4 py-2">Rarely</td><td class="border border-gray-300 px-4 py-2">Sometimes (first-time, child)</td></tr>
        <tr><td class="border border-gray-300 px-4 py-2">Cross-use acceptable?</td><td class="border border-gray-300 px-4 py-2">✅ A UKVI-spec photo satisfies HMPO</td><td class="border border-gray-300 px-4 py-2">⚠️ Some HMPO photos fail UKVI's stricter background check</td></tr>
      </tbody>
    </table>

    <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-5 my-8">
      <p class="font-semibold text-yellow-800 mb-1">⚠️ Important Note on Cross-Use</p>
      <p class="text-sm text-yellow-700">A photo that satisfies the UKVI visa specification will generally also satisfy HMPO passport requirements. However, the reverse is not guaranteed — some photos that pass HMPO checks carry a background tone that UKVI's automated system flags. If in doubt, prepare a dedicated photo for your visa application.</p>
    </div>

    <h2>Frequently Asked Questions (FAQ)</h2>

    <h3>Can I wear glasses in my UK visa photo in 2026?</h3>
    <p>No. Glasses of any kind — including prescription glasses and reading glasses — are not permitted in UK visa photographs. This ban has been in place since 2021 in line with updated ICAO guidance. Contact lenses are permitted as they are not visible in photographs.</p>

    <h3>Does the UK visa photo background have to be white?</h3>
    <p>No. This is a very common mistake. The UK visa photo background must be <strong>light grey or cream</strong> — pure white is specifically not acceptable. A white background is one of the leading causes of rejection at UKVI biometric appointments.</p>

    <h3>How old can my UK visa photo be?</h3>
    <p>Your UK visa photo must have been taken <strong>within the last one month</strong> for adult applicants. Using an older photo — even one taken 6–12 weeks ago — is a grounds for rejection.</p>

    <h3>How many photos do I need for a UK visa application?</h3>
    <p>Paper-based applications require <strong>2 identical photographs</strong>, unattached and loose. Online applications via the UKVI portal or ID Check app use a digital upload — no prints are required for those routes.</p>

    <h3>Can I use my UK passport photo for my UK visa application?</h3>
    <p>A UKVI-standard visa photo will generally satisfy HMPO passport requirements. However, some passport photos may fail UKVI's stricter background tone check. It is safest to prepare a dedicated photo confirmed against UKVI specifications.</p>

    <h3>Can I wear a hijab or religious head covering in my UK visa photo?</h3>
    <p>Yes, provided the head covering is worn daily for genuine religious reasons. Your full face from chin to top of forehead — and both sides from ear to ear — must be completely visible. The covering must not cast any shadow on your face.</p>

    <h3>What is the correct UK visa photo size in pixels?</h3>
    <p>At 300 DPI (minimum acceptable), a 35×45mm photo is <strong>413 × 531 pixels</strong>. At 600 DPI (recommended), it is 827 × 1063 pixels. The JPEG file must be between 50 KB and 10 MB.</p>

    <h3>Can I take my UK visa photo on my phone?</h3>
    <p>Yes. Use the rear (main) camera — not the front selfie camera — at 1–1.5 metres distance on a stand. Ensure even lighting, a light grey or cream background, and verify the image is in sharp focus before printing or uploading. A compliant tool can then resize and verify the result before submission.</p>

    <h3>Do I need to print my UK visa photo if I apply online?</h3>
    <p>No. Online applications via the UKVI portal or the ID Check app require a digital photo upload only. You cannot mix formats — online applicants use digital photos exclusively.</p>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">Verify Your UK Visa Photo Before You Submit</p>
      <p class="text-gray-600 mb-4 text-sm">Auto-check your photo against all 2026 UKVI requirements: 35×45mm, light grey background, 29–34mm head height, no glasses, 300 DPI. Avoid rejection at your biometric appointment.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=uk-visa" class="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition duration-200 shadow">Check My UK Visa Photo</a>
        <a href="https://www.gov.uk/uk-visa-photos" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition duration-200">Read Official UKVI Rules →</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-gray-700 hover:underline font-medium">PixPassport</a></p>
    </div>

    <!--
      Meta Title: UK Visa Photo Requirements 2026 — Size, Background & Biometric Rules
      Meta Description: Official UK visa photo guide 2026. 35×45mm size, head 29–34mm, light grey/cream background (not white), no glasses, 300–600 DPI. Sourced from UKVI, HMPO, and ICAO Document 9303.
      Slug: uk-visa-photo-requirements
      Last Updated: June 2026
    -->
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added UK visa photo requirements blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);