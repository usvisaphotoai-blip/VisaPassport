const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "france-visa-requirements-latest-guide",
  "title": "France Visa Photo Requirements (2026 Latest Guide): Size, Rules & Tips for Students, Professionals & Tourists",
  "description": "Complete 2026 guide to France Schengen visa photo requirements. Covers official ICAO size (35–40×45mm), face height (32–36mm), background rules, file format, lighting, and tips for students, professionals & tourists. Verified against france-visas.gouv.fr.",
  "date": "2026-05-13",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1778666011/france-visa-photo-requirements-2026_ujgvwz.webp",

  "content": `
    <h1>France Visa Photo Requirements (2026 Latest Guide): Size, Rules & Tips for Students, Professionals & Tourists</h1>

    <p>Applying for a France visa — whether a short-stay Schengen tourist visa, a long-stay student visa, or a professional work permit — requires submitting a photograph that meets the official ICAO (International Civil Aviation Organisation) photo standards referenced directly by the French Ministry of Foreign Affairs on the official <strong>france-visas.gouv.fr</strong> portal.</p>

    <p>An incorrect photograph is one of the most common — and most avoidable — reasons for visa application delays and rejections. The biometric face-recognition systems used at French consulates and VFS Global / TLScontact visa application centres are sensitive to size, face coverage, lighting, and image quality. A photo that looks perfectly normal to the human eye can still fail automated checks if it falls outside the technical specifications.</p>

    <p>This guide covers every official France visa photo requirement for 2026, verified against <strong>france-visas.gouv.fr</strong> (the official French visa portal operated by the Ministry of Foreign Affairs) and the <strong>ICAO Doc 9303</strong> standard that France-Visas explicitly references for all photo submissions.</p>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1778666011/france-visa-photo-size-35x45mm-example_h8ralx.webp"
      alt="France visa photo size example 35x45mm with face height measurement showing 32–36mm chin to forehead"
      title="France Visa Photo Size — Official ICAO Dimensions 35×45mm"
      loading="lazy"
      class="w-full rounded-2xl shadow-md my-6"
    />

    <h2>France Visa Photo Requirements — Official Specifications</h2>

    <p>According to the <strong>france-visas.gouv.fr FAQ</strong> (Ministry of Foreign Affairs, France), all visa applications require photographs that comply with the <strong>ICAO standard</strong>. France-Visas specifies two identical physical photographs for in-person applications, and one digital upload for online submissions. The photo must be recent and conform to reality.</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-blue-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Requirement</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Official Standard (france-visas.gouv.fr / ICAO Doc 9303)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Photo Width</td><td class="px-4 py-3">35mm to 40mm</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Photo Height</td><td class="px-4 py-3">45mm (standard ICAO format)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Face Height (chin to forehead, excluding hair)</td><td class="px-4 py-3">32mm to 36mm — 70% to 80% of the total image height</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Background</td><td class="px-4 py-3">Plain white or very light grey — no patterns, shadows, or objects</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Expression</td><td class="px-4 py-3">Neutral — mouth closed, eyes open, looking directly at camera</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Photo Age</td><td class="px-4 py-3">Recent — must conform to current appearance</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">Not permitted under ICAO standard (referenced by france-visas.gouv.fr)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Head Coverings</td><td class="px-4 py-3">Not permitted except for religious or medical reasons</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Shadows</td><td class="px-4 py-3">None on face or background</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Retouching / Filters</td><td class="px-4 py-3">Not permitted — colour neutrality and natural skin tone required</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Standard</td><td class="px-4 py-3">ICAO Doc 9303 / ISO IEC compliant</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Identical copies required</td><td class="px-4 py-3">2 (physical in-person); 1 digital upload (online applications)</td></tr>
        </tbody>
      </table>
    </div>

    <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">📋 Official Source Note</p>
      <p class="text-blue-800 text-sm">The specifications above are drawn directly from the <strong>france-visas.gouv.fr FAQ</strong> and the <strong>ICAO photograph requirements document</strong> linked from the official France-Visas portal. France-Visas states: <em>"The photo should be between 35 and 40 mm wide. The size of the face should be 32 to 36 mm (70 to 80% of the picture) from chin to forehead (excluding hair) and comply with the ICAO standard."</em></p>
    </div>

    <h3>Photo Size — Width and Height</h3>
    <p>The official france-visas.gouv.fr FAQ specifies that the photograph must be <strong>35mm to 40mm wide</strong> and conform to the standard ICAO portrait format of <strong>45mm height</strong>. The most common compliant size used at French consulates and visa application centres worldwide is <strong>35mm × 45mm</strong>, which is the standard Schengen biometric format. A width up to 40mm is also accepted, giving a small tolerance — but 35×45mm is the format to request at any photo studio.</p>

    <h3>Face Height — The Critical Measurement</h3>
    <p>This is the most precisely defined — and most commonly failed — requirement. The official france-visas.gouv.fr specification states that <strong>the face must measure 32mm to 36mm from chin to forehead (excluding hair)</strong>. This corresponds to 70%–80% of the total image height. This is measured from the bottom of the chin to the top of the forehead — not to the top of the hair. A common mistake is standing too far from the camera, producing a face height below 32mm, which will fail automated biometric scanning.</p>

    <h3>Background</h3>
    <p>The background must be <strong>plain white or very light grey</strong>, uniformly lit with no shadows, patterns, textures, or other people or objects. The ICAO standard — which france-visas.gouv.fr explicitly references — requires a light, neutral background that creates clear contrast with the applicant's face. Any colour tint, shadow gradient, or visible pattern will cause rejection.</p>

    <h3>Facial Expression</h3>
    <p>Your expression must be <strong>neutral with your mouth fully closed</strong>. Eyes must be open, clearly visible, and looking directly at the camera lens. No smiling, squinting, frowning, or raised eyebrows. This requirement exists because ICAO-compliant facial recognition systems measure biometric distances between facial landmarks — altered expressions change these distances and reduce matching accuracy across border control databases.</p>

    <h3>Age of Photo</h3>
    <p>France-Visas states the photograph <strong>"must be recent and conform to reality."</strong> Standard consulate guidance across French embassies and VFS Global centres specifies a photo taken within the <strong>last 6 months</strong>, accurately reflecting your current appearance. If your appearance has significantly changed — new facial hair, different hairstyle, significant weight change — a new photo is required even within the 6-month window.</p>

    <h3>Photo Quality</h3>
    <p>The photograph must be <strong>in sharp focus</strong>, with no blur, pixelation, grain, or ink marks. Colour rendering must be natural — no oversaturation or desaturation. For physical submissions, the photo must be printed on professional photographic paper. The ICAO standard specifies <strong>even lighting without shadows, reflections, or excessive glare</strong>, with all facial features clearly visible.</p>

    <h2>Technical Specifications — Digital Submissions</h2>

    <h3>File Format and Pixel Dimensions</h3>
    <p>For digital uploads via visa application portals and VFS Global / TLScontact centres, accepted file formats are <strong>JPG, JPEG, and PNG</strong> in the sRGB colour space. The minimum pixel dimensions are <strong>400 × 600 pixels</strong>. A recommended resolution of <strong>300 DPI</strong> or higher at the 35×45mm print dimensions — translating to approximately 413 × 531 pixels at 300 DPI — ensures the image meets biometric quality checks. Any modern smartphone (12 megapixels or above) in good lighting will produce sufficient resolution.</p>

    <h3>File Size</h3>
    <p>For digital submissions through VFS Global and TLScontact centres handling French visa applications, the maximum accepted file size is <strong>120 KB</strong>. This is a strict technical limit — files exceeding this threshold will trigger an upload error. If your photo file is larger, export it as a compressed JPEG at high quality (not maximum) to bring it within the limit while retaining sufficient detail. The minimum pixel requirement of 400×600 pixels still applies, so do not over-compress.</p>

    <div class="my-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
      <p class="font-bold text-amber-900 mb-2">⚠️ Important: File Size Limit</p>
      <p class="text-amber-800 text-sm">The digital file size limit for VFS Global and TLScontact digital submissions for French visa applications is <strong>120 KB maximum</strong>. This is commonly misquoted as 4 MB or higher. Export your photo as a compressed JPEG and verify the file size before uploading. Files over 120 KB will be rejected at the upload stage.</p>
    </div>

    <h3>Printed vs Digital Requirements</h3>
    <p>For in-person consulate and visa centre applications, <strong>two identical physical prints</strong> on photographic paper (35×45mm) are required. For online portal submissions, a single digital image upload is accepted. Both routes require identical subject-side standards — face coverage, background, expression, lighting — with only the delivery format differing. Confirm your application method through your VFS Global or TLScontact confirmation to ensure you prepare the correct format.</p>

    <h3>Lighting and Contrast</h3>
    <p>Lighting must be <strong>even and diffuse</strong> with no shadows on either the face or the background. The ICAO standard (Doc 9303) specifies that all facial features must be clearly visible with no reflections, harsh highlights, or shadow areas. Stand approximately 50cm from your background to prevent your shadow from falling on it. For applicants with very light skin tones, a pale grey background provides better biometric contrast than pure white.</p>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1778666011/france-visa-photo-correct-vs-incorrect-example_ylpttb.webp"
      alt="Correct vs incorrect France visa photo examples — lighting, background shadows, face coverage comparison"
      title="France Visa Photo — Correct vs Incorrect Comparison Guide"
      loading="lazy"
      class="w-full rounded-2xl shadow-md my-6"
    />

    <h2>Do's and Don'ts for France Visa Photos</h2>

    <div class="grid md:grid-cols-2 gap-6 my-8">
      <div class="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h3 class="text-green-800 font-bold text-lg mb-4">✅ Do's</h3>
        <ul class="space-y-2 text-green-900 text-sm">
          <li>✔ Use a plain white or very light grey background</li>
          <li>✔ Ensure face height is 32–36mm (chin to forehead, excluding hair)</li>
          <li>✔ Centre your face squarely in the frame</li>
          <li>✔ Keep your expression neutral — mouth closed, eyes fully open</li>
          <li>✔ Ensure even, shadow-free lighting on face and background</li>
          <li>✔ Look directly at the camera lens</li>
          <li>✔ Ensure your full face, chin, and forehead are visible</li>
          <li>✔ Use a recent photo taken within 6 months</li>
          <li>✔ Use minimum 300 DPI resolution; keep file under 120 KB for digital</li>
          <li>✔ Disable all phone beauty filters, portrait mode, and AI enhancements</li>
          <li>✔ Have both ears visible (unless covered for religious reasons)</li>
          <li>✔ Use a photo that accurately reflects your current appearance</li>
        </ul>
      </div>
      <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 class="text-red-800 font-bold text-lg mb-4">❌ Don'ts</h3>
        <ul class="space-y-2 text-red-900 text-sm">
          <li>✘ Do not wear glasses — not permitted under ICAO standard</li>
          <li>✘ Do not tilt, turn, or angle your head</li>
          <li>✘ Do not smile or alter your expression</li>
          <li>✘ Do not wear a hat, cap, or head covering (except religious/medical)</li>
          <li>✘ Do not use patterned, coloured, or textured backgrounds</li>
          <li>✘ Do not apply filters, skin smoothing, brightness edits, or AI tools</li>
          <li>✘ Do not submit a selfie — arm-length photos produce insufficient face coverage</li>
          <li>✘ Do not submit a blurry, pixelated, or low-resolution photo</li>
          <li>✘ Do not upload a digital file exceeding 120 KB</li>
          <li>✘ Do not wear sunglasses, tinted lenses, or coloured contacts</li>
          <li>✘ Do not submit a photo taken more than 6 months ago</li>
          <li>✘ Do not print on standard inkjet paper — use photographic paper only</li>
        </ul>
      </div>
    </div>

    <h2>France Visa Photo Requirements by Applicant Type</h2>

    <p>The official ICAO-compliant photo specifications are identical for all France visa categories. However, different applicant groups make predictably different mistakes. Here is what to watch for depending on your visa type.</p>

    <h3>Students — Campus France / Long-Stay Student Visa (India to France)</h3>

    <p>Indian students applying for a French long-stay student visa (type D) through Campus France represent one of the largest applicant groups. The photo requirements are identical to all other visa categories, but several errors appear repeatedly in this group:</p>

    <ul>
      <li><strong>Selfies:</strong> The face height achieved at arm's length is almost always below the 32mm minimum. Use a tripod or ask someone else to hold the phone, positioned at eye level, using the rear camera.</li>
      <li><strong>Beauty mode and filters left active:</strong> Many Android and iPhone camera apps apply skin smoothing, eye widening, or scene enhancements by default. These alter facial geometry in ways that fail biometric verification. Go to Camera Settings and turn off every enhancement before the shoot.</li>
      <li><strong>Old passport photos reused:</strong> Student applicants commonly reuse photos from earlier visa applications. If the photo is more than 6 months old or your appearance has changed, take a new one — consulate staff check this during in-person verification.</li>
      <li><strong>Coloured or patterned backgrounds:</strong> A white bedsheet pinned against a plain wall works well as long as it is completely crease-free and evenly lit.</li>
    </ul>

    <h3>Professionals — Passeport Talent / Work Visa / ICT Applicants</h3>

    <p>For Passeport Talent (talent passport) and Intra-Company Transfer (ICT) visa applicants, the photo must meet the same ICAO technical standards — professional visa applications carry no additional latitude on photo requirements. Practical considerations specific to this group:</p>

    <ul>
      <li><strong>Dress code:</strong> France-Visas guidance does not mandate any specific clothing. Wear something plain and neutral. A shirt or blouse in a solid, muted colour works well — it keeps visual attention on the face and avoids the automated border area flagging that high-contrast patterns near the chin can occasionally trigger.</li>
      <li><strong>Glasses:</strong> Even if you wear prescription glasses every day, remove them for the photo. France-Visas references the ICAO standard, under which glasses are not permitted. Glare and lens reflections on any lens type — including anti-reflective coated lenses — cause biometric processing failures.</li>
      <li><strong>Facial hair consistency:</strong> Ensure your appearance in the photo matches your current appearance at the time of travel. Changes in beard or moustache style after photo submission may require a new photo at the application centre.</li>
    </ul>

    <h3>Tourists — Short-Stay Schengen Visa (Type C)</h3>

    <p>Tourist visa applicants must meet the same photo standards as long-stay applicants — there is no simplified process for short stays. The most common error among tourist applicants is submitting a cropped holiday or travel photograph. These almost always fail on background, lighting, or face coverage grounds. A purpose-taken photo against a plain background takes under five minutes to arrange and is far more reliable than cropping an existing photo.</p>

    <h3>Children and Infants</h3>

    <p>Children of all ages applying for a France Schengen visa require an individual photograph — a child cannot appear in a parent's photo. The same ICAO-compliant 35×45mm dimensions and 32–36mm face height rules apply. Official guidance provides limited flexibility for very young children:</p>

    <ul>
      <li><strong>Eyes:</strong> Infants who cannot sustain a direct forward gaze are accepted with minor deviations, but the face must still be clearly visible and centred.</li>
      <li><strong>Mouth:</strong> A slightly open mouth is accepted for infants and very young toddlers who cannot hold a closed expression.</li>
      <li><strong>Support:</strong> If the infant must be supported, ensure no hands, arms, or other objects are visible in the frame. A car seat covered with a plain white cloth, photographed from directly above, is a practical solution for newborns.</li>
      <li><strong>Children under 12:</strong> France-Visas confirms that children under 12 are exempt from biometric data collection (fingerprints) at the application stage, but an ICAO-compliant photo must still be included in the application file.</li>
    </ul>

    <img
      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1778666011/france-visa-photo-lighting-setup-home-tips_dn1hli.webp"
      alt="Home photography setup for France visa photo — window light, white background, rear camera on tripod"
      title="How to Take a Compliant France Visa Photo at Home"
      loading="lazy"
      class="w-full rounded-2xl shadow-md my-6"
    />

    <h2>Common Reasons for France Visa Photo Rejection</h2>

    <ol>
      <li><strong>Face height below 32mm:</strong> The most common automated rejection trigger — face occupying less than 70% of image height, usually from standing too far from the camera.</li>
      <li><strong>Incorrect photo width or dimensions:</strong> Photo outside the 35–40mm width range, or aspect ratio not conforming to ICAO portrait format.</li>
      <li><strong>Shadows on face or background:</strong> Poor single-source or overhead lighting creates shadows that fail biometric analysis.</li>
      <li><strong>Non-white or non-grey background:</strong> Any colour, pattern, or texture results in rejection under ICAO standards.</li>
      <li><strong>Photo not recent:</strong> Photo older than 6 months, or that no longer reflects current appearance.</li>
      <li><strong>Glasses worn:</strong> Prohibited under the ICAO standard referenced by france-visas.gouv.fr — glare and reflections cause system failures.</li>
      <li><strong>Retouching, filters, or AI editing:</strong> Skin smoothing, brightness adjustment, background replacement, and AI enhancement are all grounds for rejection — colour neutrality and natural skin tone are required.</li>
      <li><strong>Head not straight:</strong> Tilted, turned, or chin-up/chin-down poses fail ICAO geometric alignment requirements.</li>
      <li><strong>Low image quality:</strong> Blurry, pixelated, or low-contrast images fail automated quality screening.</li>
      <li><strong>Digital file over 120 KB:</strong> Exceeds the upload limit for VFS Global / TLScontact digital submissions — causes upload error rather than rejection of the application itself, but prevents submission.</li>
      <li><strong>Printed on inkjet paper:</strong> Physical copies on standard office paper are rejected at the application counter — photographic paper is required.</li>
    </ol>

    <div class="my-8 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
      <p class="font-bold text-amber-900 mb-2"> Glasses Policy — Official Position</p>
      <p class="text-amber-800 text-sm">France-Visas.gouv.fr explicitly states that all photos must comply with the ICAO standard. The ICAO Doc 9303 standard does not permit glasses in biometric travel document photos, as lens reflections — including those from anti-reflective coated lenses — interfere with automated facial feature detection. Remove all glasses, including prescription eyewear, for your France visa photograph.</p>
    </div>

    <h2>Tips to Take a France Visa Photo at Home</h2>

    <p>You do not need a professional studio. A modern smartphone and a few minutes of preparation are sufficient to produce a fully ICAO-compliant photo.</p>

    <h3>Smartphone Setup</h3>
    <ul>
      <li>Use the <strong>rear camera</strong>, not the front-facing camera — rear cameras have higher resolution and less barrel distortion.</li>
      <li>Ask someone to take the photo, or use a tripod with a 3–5 second self-timer.</li>
      <li>Position the camera at <strong>eye level</strong> — not above or below — to avoid facial distortion.</li>
      <li>Set camera to its highest JPEG quality setting.</li>
      <li>Disable portrait mode, beauty mode, AI scene enhancement, Photographic Styles (iPhone: Settings → Camera → Photographic Styles → None), and all automatic filters. On Android, these are typically under Camera → Settings → Beauty, AI Shot, or Filters.</li>
    </ul>

    <h3>Background Setup</h3>
    <ul>
      <li>Use a plain white bedsheet, a sheet of white foam board, or a white wall as your backdrop.</li>
      <li>Stand <strong>50–60cm away from the background</strong> — this distance prevents your shadow from falling on it.</li>
      <li>Avoid standing near coloured walls — ambient colour reflection can tint an otherwise white background under certain lighting conditions.</li>
      <li>Ensure the background is crease-free and uniformly lit across its entire visible area.</li>
    </ul>

    <h3>Lighting</h3>
    <ul>
      <li><strong>Natural window light</strong> is the most reliable source — face a window so light falls evenly across your face.</li>
      <li>Never photograph with the window behind you — this creates a silhouette with an overexposed background.</li>
      <li>For artificial lighting, use two light sources of equal intensity placed at 45-degree angles on either side of your face — this eliminates shadow.</li>
      <li>Avoid overhead lighting — it reliably creates shadows under eyes, nose, and chin that automated systems flag.</li>
    </ul>

    <h2>Where to Get France Visa Photos</h2>

    <h3>Online Photo Tools</h3>
    <p>Online tools like PixPassport allow you to upload a photo taken at home and have it automatically verified against ICAO and France Schengen specifications — checking face coverage ratio, background uniformity, file size, image sharpness, and aspect ratio before submission. This is the fastest, most cost-effective option if you have a good smartphone camera.</p>

    <h3>Photo Studios</h3>
    <p>Professional studios familiar with ICAO and Schengen biometric standards can produce compliant prints in minutes. When visiting a studio, ask specifically for a <strong>Schengen visa photo, 35×45mm, ICAO compliant</strong> — do not simply say "passport photo," as default sizes vary by country. Confirm they print on photographic paper and can produce the correct dimensions before you sit down.</p>

    <h3>When to Choose Each</h3>
    <p>Use an online tool when: applying through a digital portal, checking compliance before a studio visit, or when no professional studio is easily accessible. Use a studio when: physical prints are required, your consulate requests professionally produced photographs, or adequate home lighting is not achievable.</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Specification</th>
            <th class="px-4 py-3 font-semibold">🇫🇷 France (Schengen / ICAO)</th>
            <th class="px-4 py-3 font-semibold">🇳🇿 New Zealand</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">🇺🇸 United States</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-xs">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Print size</td><td class="px-4 py-3">35–40mm wide × 45mm high</td><td class="px-4 py-3">35×45mm</td><td class="px-4 py-3">51×51mm (2×2 inches)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Face height</td><td class="px-4 py-3">32–36mm (chin to forehead, excl. hair) = 70–80%</td><td class="px-4 py-3">70–80% of image height</td><td class="px-4 py-3">50–69% of image height (ICAO base)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Background</td><td class="px-4 py-3">White or very light grey</td><td class="px-4 py-3">Neutral and plain (no colour specified)</td><td class="px-4 py-3">White or off-white</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">❌ Not permitted (ICAO standard)</td><td class="px-4 py-3">✅ Allowed (conditions apply)</td><td class="px-4 py-3">❌ Not permitted (since 2016)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Digital file format</td><td class="px-4 py-3">JPG / PNG (sRGB)</td><td class="px-4 py-3">JPG / JPEG only</td><td class="px-4 py-3">JPEG</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Digital file size</td><td class="px-4 py-3">Max 120 KB (VFS Global / TLScontact)</td><td class="px-4 py-3">512 KB – 3.14 MB</td><td class="px-4 py-3">Not specified (varies by portal)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Min pixel dimensions</td><td class="px-4 py-3">400 × 600 px</td><td class="px-4 py-3">Not specified (min 512 KB ensures quality)</td><td class="px-4 py-3">600 × 600 px</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Photo age</td><td class="px-4 py-3">Recent (current appearance) / 6 months</td><td class="px-4 py-3">6 months</td><td class="px-4 py-3">6 months</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Standard</td><td class="px-4 py-3">ICAO Doc 9303</td><td class="px-4 py-3">INZ biometric standard</td><td class="px-4 py-3">State Department / ICAO</td></tr>
        </tbody>
      </table>
    </div>

    <h2>France Visa Photo Checklist — Before You Submit</h2>

    <ul>
      <li>☐ Photo is recent — taken within 6 months and reflects current appearance</li>
      <li>☐ Photo width is 35–40mm; height is 45mm (standard 35×45mm is the safest)</li>
      <li>☐ Face height (chin to forehead, excluding hair) is 32–36mm</li>
      <li>☐ Digital file is JPG or PNG in sRGB colour space</li>
      <li>☐ Digital file is under 120 KB and at least 400 × 600 pixels</li>
      <li>☐ Face is centred and looking directly at the camera</li>
      <li>☐ Expression is neutral — mouth closed, eyes fully open</li>
      <li>☐ Head is straight — no tilt, turn, or chin angle</li>
      <li>☐ Background is plain white or very light grey — no shadows, patterns, or objects</li>
      <li>☐ No glasses of any type (prescription, tinted, anti-reflective)</li>
      <li>☐ No hat or head covering (unless religious or medical)</li>
      <li>☐ No filters, AI edits, skin smoothing, beauty mode, or background replacement</li>
      <li>☐ Both ears visible (unless covered for religious reasons)</li>
      <li>☐ Photo is sharp — no blur, grain, pixelation, or compression artefacts</li>
      <li>☐ Lighting is even — no shadows under eyes, nose, or chin</li>
      <li>☐ Printed on photographic paper (if submitting physical copies)</li>
      <li>☐ Two identical copies prepared (for in-person consulate submissions)</li>
    </ul>

    <div class="my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h4 class="text-xl font-bold mb-4 text-center">Official Sources Used in This Guide</h4>
      <div class="flex flex-col gap-3 text-center">
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🇫🇷 Primary Source</div>
          <div class="text-sm font-bold">France-Visas — Ministry of Foreign Affairs of France</div>
          <div class="text-xs text-slate-300 mt-1">france-visas.gouv.fr — Official French visa portal (FAQ and ISO/IEC photo requirements PDF)</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🌍 International Standard</div>
          <div class="text-sm font-bold">ICAO Doc 9303 — International Civil Aviation Organisation</div>
          <div class="text-xs text-slate-300 mt-1">icao.int — Machine Readable Travel Documents standard, explicitly referenced by france-visas.gouv.fr</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl text-sm text-slate-300">
          All specifications on this page were verified against official sources as of May 2026. Requirements can change — always confirm at france-visas.gouv.fr before submitting your application.
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">
        Check your France visa photo for free
      </p>
      <p class="text-gray-600 mb-4 text-sm">Automatically verify your photo meets ICAO standards — 32–36mm face height, white background, under 120 KB file size, and JPG format — before you submit your application.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=france-passport" class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 shadow">Check My France Visa Photo</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-blue-600 hover:underline font-medium">PixPassport</a></p>
    </div>

    <!-- SEO Meta Tags (for CMS / head injection) -->
    <!--
      Meta Title: France Visa Photo Requirements latest — Official Size & Rules
      Meta Description: Official latest France Schengen visa photo guide. ICAO size 35×45mm, face 32–36mm, white background, 120KB max. Tips for students, professionals & tourists.
      Slug: france-visa-requirements-latest-guide
    -->
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added France visa photo requirements blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);