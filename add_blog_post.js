const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "new-zealand-visa-photo-requirements-2026",
  "title": "New Zealand Visa Photo Requirements 2026 — Official Size, Format & Upload Rules",
  "description": "Complete 2026 guide to New Zealand visa and NZeTA photo requirements sourced directly from Immigration New Zealand (immigration.govt.nz). Covers photo size (35×45mm for paper, 3:4 digital), file format (JPEG), face coverage (70–80%), glasses rules, lighting, background, and the no-AI-editing rule. Avoid rejection — check every requirement before you upload.",
  "date": "2026-05-02",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1777701505/ChatGPT_Image_May_2_2026_11_26_59_AM_ylwxub.webp",

  "content": `
    <h2>New Zealand Visa Photo Requirements 2026 — The Complete Official Guide</h2>

    <p>Whether you are applying for a New Zealand visitor visa, a work visa, a student visa, or a New Zealand Electronic Travel Authority (NZeTA), one of the most overlooked steps is getting your photo right. Immigration New Zealand (INZ) uses automated face-recognition systems to verify uploaded photos, and photos that do not meet their technical standards will cause your application to be delayed — or in some cases, declined entirely.</p>

    <p>Every requirement on this page is sourced directly from the <a href="https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/applying-online/uploading-documents-and-photos/visa-and-nzeta-photos/" target="_blank" rel="noopener noreferrer">official Immigration New Zealand photo standards page</a>. We have not added our own interpretation — only clear explanations of what the government requires.</p>

    <div class="my-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl">
      <p class="font-bold text-red-900 mb-2">⚠️ 2026 Update: AI-Edited Photos Are Explicitly Banned</p>
      <p class="text-red-800">Immigration New Zealand has added a specific warning to their official photo page: photos that are AI-enhanced or digitally altered do not meet their standards. If INZ detects that your photo has been edited using AI tools, your visa or NZeTA application will be delayed or could be declined. This applies to filters, face-slimming, skin smoothing, background replacement, and contrast adjustments.</p>
    </div>

    <h2>Quick Reference: New Zealand Visa Photo Specifications at a Glance</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Specification</th>
            <th class="px-4 py-3 font-semibold">Online / Digital Application</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Paper-Based Application</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Photo size</td><td class="px-4 py-3">3:4 portrait aspect ratio (no fixed mm dimension)</td><td class="px-4 py-3">35 mm wide × 45 mm high</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">File format</td><td class="px-4 py-3">JPG or JPEG only</td><td class="px-4 py-3">Physical print (paper form instructions apply)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">File size</td><td class="px-4 py-3">512 KB minimum — 3.14 MB maximum</td><td class="px-4 py-3">Up to 10 MB if submitted by professional photographer</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Face coverage</td><td class="px-4 py-3">70% to 80% of the image</td><td class="px-4 py-3">70% to 80% of the image</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Recency</td><td class="px-4 py-3">Taken within the last 6 months</td><td class="px-4 py-3">Taken within the last 6 months</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">Allowed (prescription, clear, no glare, no heavy frames)</td><td class="px-4 py-3">Allowed (same rules)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Background</td><td class="px-4 py-3">Neutral and plain — no objects or other people</td><td class="px-4 py-3">Neutral and plain</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Expression</td><td class="px-4 py-3">Neutral, mouth closed, looking straight at camera</td><td class="px-4 py-3">Neutral, mouth closed</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">AI/digital editing</td><td class="px-4 py-3">❌ Strictly prohibited — grounds for application delay or decline</td><td class="px-4 py-3">❌ Strictly prohibited</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Selfies</td><td class="px-4 py-3">Only allowed in the NZeTA mobile app</td><td class="px-4 py-3">Not applicable</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Official source</td><td class="px-4 py-3" colspan="2">Immigration New Zealand — immigration.govt.nz</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Photo Size: Digital vs Paper Applications</h2>

    <p>New Zealand's photo size requirement differs depending on whether you are applying online or using a paper application form — and this is one of the most common sources of confusion.</p>

    <p><strong>For online visa and NZeTA applications:</strong> Immigration New Zealand does not specify a fixed dimension in millimetres. Instead, they require the photo to be taken in <strong>portrait mode with a 3:4 aspect ratio</strong>. This means the height of the image must be 1.33 times its width. A standard 3:4 photo taken on a smartphone in portrait orientation meets this requirement, provided it also meets all the other specifications below. The file must be between 512 KB and 3.14 MB and in JPG or JPEG format.</p>

    <p><strong>For paper-based visa applications:</strong> The print must be <strong>35 mm wide and 45 mm high</strong> — this is the standard international passport photo format also used by Australia, Canada, the UK, and Schengen countries. Additional instructions for paper submissions are found on the paper application forms themselves.</p>

    <div class="my-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">📱 NZeTA Selfie Exception</p>
      <p class="text-blue-800">Selfies are only acceptable if you are applying for a New Zealand Electronic Travel Authority (NZeTA) through the official mobile app, and only when the app gives you no other option. If you do take a selfie, Immigration New Zealand advises stretching your arm out as far as possible, holding the phone at eyebrow height, and ensuring the light source is behind the phone rather than behind your face. For all other online visa applications, selfies are not permitted.</p>
    </div>

    <h2>The No-AI-Editing Rule — What Exactly Is Prohibited?</h2>

    <p>Immigration New Zealand is explicit about this on their official photo standards page. The photo must be natural and unaltered. The following edits are all prohibited, even minor ones:</p>

    <ul>
      <li>Changing the colour, brightness, contrast, or sharpness of the image</li>
      <li>Cropping your head and shoulders to place them on a plain background (background replacement)</li>
      <li>Changing your facial features — including the size, shape, or colour of eyes, nose, ears, mouth, cheekbones, or eyebrows</li>
      <li>Skin smoothing or face slimming</li>
      <li>Digitally removing objects from the photo, especially around your face — glasses, jewellery, headbands, hats, or toys</li>
      <li>Applying filters or beautification features</li>
      <li>Using any AI editing tool</li>
    </ul>

    <p>INZ also specifically warns that if your phone automatically applies filters or alters photos when you take them, you must turn this feature off before taking your visa photo. Many modern smartphones apply skin smoothing or portrait-mode effects by default — these must be disabled.</p>

    <h2>Face Positioning and Coverage</h2>

    <p>Your face must cover between 70% and 80% of the image and must be centred in the frame. This is the same face coverage range required by Schengen countries and similar to Australia's 75–80% standard, but notably wider than the US requirement of only 50–69% coverage.</p>

    <p>Specifically, Immigration New Zealand requires:</p>
    <ul>
      <li>You are looking straight at the camera — not turned to the side or on an angle</li>
      <li>Your expression is neutral and your mouth is closed</li>
      <li>Your eyes are open</li>
      <li>The image is in focus and not blurry</li>
    </ul>

    <h2>Hair, Head Coverings, and Ears</h2>

    <p>Your hair must not cover your face or ears. The photo must show your ears unless you wear a scarf for religious or medical reasons. Head coverings must be removed unless they are worn for religious or medical reasons. If you wear a religious head covering, it must not cover your mouth or the sides of your face — your full facial features from forehead to chin and ear to ear must be visible.</p>

    <h2>Glasses Rules</h2>

    <p>New Zealand is more permissive about glasses than Australia, the United States, or the UK. You <strong>can wear prescription glasses</strong> in your New Zealand visa photo, provided:</p>
    <ul>
      <li>The lenses are clear — no tinted lenses and no sunglasses</li>
      <li>The frames are not heavy and do not cover your face</li>
      <li>There is no glare or reflection in the photo from the lenses</li>
    </ul>

    <p>Immigration New Zealand notes that if you are having issues with glare or reflection, it is best to remove your glasses for the photo.</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Glasses Policy</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-green-50"><td class="px-4 py-3 font-semibold">🇳🇿 New Zealand</td><td class="px-4 py-3">✅ Allowed — clear lenses, no glare, no heavy frames</td></tr>
          <tr class="bg-green-50"><td class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</td><td class="px-4 py-3">✅ Allowed — clear lenses, no glare</td></tr>
          <tr class="bg-red-50"><td class="px-4 py-3 font-semibold">🇦🇺 Australia</td><td class="px-4 py-3">❌ Not permitted</td></tr>
          <tr class="bg-red-50"><td class="px-4 py-3 font-semibold">🇺🇸 United States</td><td class="px-4 py-3">❌ Not permitted (since 2016)</td></tr>
          <tr class="bg-red-50"><td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td><td class="px-4 py-3">❌ Not permitted</td></tr>
          <tr class="bg-yellow-50"><td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td><td class="px-4 py-3">⚠️ Not recommended — most consulates reject them</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Lighting and Background</h2>

    <p><strong>Lighting:</strong> There must be no shadows on your face or on the background. Your face must have good contrast against the background. Immigration New Zealand recommends standing 0.5 metres away from the background, with the photographer positioned 1.5 metres in front of you.</p>

    <p><strong>Background:</strong> The background must be neutral and plain. It should show only you — no other people, objects, or distracting elements. INZ specifically warns that patterned clothing (such as t-shirts with images or busy patterns) and flowery or patterned backgrounds can create technical issues with their automated face-recognition system.</p>

    <p>Notably, unlike Australia (which specifies white or light grey) or the UK (which specifies cream or light grey), Immigration New Zealand does not mandate a specific background colour — only that it is neutral and plain. In practice, a plain white or light grey background is the safest choice as it provides maximum contrast with most skin tones and avoids the patterning issue.</p>

    <h2>Common Mistakes That Get New Zealand Visa Photos Rejected</h2>

    <ol>
      <li><strong>Using a photo taken more than 6 months ago</strong> — INZ requires the photo to reflect your current appearance</li>
      <li><strong>Uploading a HEIC or PNG file</strong> — only JPG/JPEG is accepted for online applications</li>
      <li><strong>File size below 512 KB</strong> — too small is rejected, not just too large</li>
      <li><strong>File size above 3.14 MB</strong> — exceeds the digital upload limit (note: professional photographer submissions have a higher 10 MB limit)</li>
      <li><strong>Using an AI background replacement tool</strong> — even if the result looks natural, it is explicitly prohibited</li>
      <li><strong>Face covering less than 70% of the image</strong> — a common outcome of taking photos at arm's length</li>
      <li><strong>Submitting a selfie for a visa (not NZeTA) application</strong> — selfies are only allowed in the NZeTA mobile app</li>
      <li><strong>Leaving phone beauty filters active</strong> — many phones apply smoothing by default; this must be turned off</li>
      <li><strong>Shadows on face or background</strong> — poor lighting is one of the most common automated rejection triggers</li>
      <li><strong>Head turned or at an angle</strong> — you must face directly forward, not at a slight angle</li>
    </ol>

    <h2>New Zealand Visa Photo vs NZeTA Photo — Is There a Difference?</h2>

    <p>No. The same photo standards apply to both standard visa applications and NZeTA applications. The only difference is the selfie exception: selfies are only permitted when applying for a NZeTA via the official NZeTA mobile app, and only when that is the submission method the app requires. For all other submission methods — including desktop web applications — the same non-selfie photo standards apply.</p>

    <h2>New Zealand vs Australia vs Schengen — Key Differences</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Specification</th>
            <th class="px-4 py-3 font-semibold">🇳🇿 New Zealand</th>
            <th class="px-4 py-3 font-semibold">🇦🇺 Australia</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">🇪🇺 Schengen</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-xs">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Digital size</td><td class="px-4 py-3">3:4 portrait ratio</td><td class="px-4 py-3">JPEG, no fixed ratio specified</td><td class="px-4 py-3">35×45mm equivalent</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Paper size</td><td class="px-4 py-3">35×45mm</td><td class="px-4 py-3">35–40×45–50mm</td><td class="px-4 py-3">35×45mm</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Max file size (digital)</td><td class="px-4 py-3">3.14 MB</td><td class="px-4 py-3">5 MB</td><td class="px-4 py-3">Varies by consulate (~240 KB–1 MB)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Min file size</td><td class="px-4 py-3">512 KB</td><td class="px-4 py-3">Not specified</td><td class="px-4 py-3">Not specified</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Face coverage</td><td class="px-4 py-3">70–80%</td><td class="px-4 py-3">75–80%</td><td class="px-4 py-3">70–80%</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">✅ Allowed (conditions)</td><td class="px-4 py-3">❌ Not permitted</td><td class="px-4 py-3">⚠️ Not recommended</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Background colour</td><td class="px-4 py-3">Neutral and plain (no colour specified)</td><td class="px-4 py-3">White or light grey</td><td class="px-4 py-3">Light grey / neutral</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Recency</td><td class="px-4 py-3">6 months</td><td class="px-4 py-3">6 months</td><td class="px-4 py-3">6 months</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">File format</td><td class="px-4 py-3">JPG/JPEG only</td><td class="px-4 py-3">JPEG</td><td class="px-4 py-3">JPEG</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">AI editing</td><td class="px-4 py-3">❌ Explicitly prohibited</td><td class="px-4 py-3">❌ Not permitted</td><td class="px-4 py-3">❌ Not permitted</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Using a Professional Photographer</h2>

    <p>Immigration New Zealand states on their official website that they are more likely to accept your photo if it is taken by a professional photographer. When using a professional, the file size limit is raised from 3.14 MB to 10 MB. Make sure the photographer is familiar with INZ's requirements before they take your photo — not all passport photographers are aware of the specific 3:4 ratio and minimum file size requirements that INZ enforces.</p>

    <div class="my-8 p-5 bg-green-50 border-l-4 border-green-500 rounded-xl">
      <p class="font-bold text-green-900 mb-2">✅ Official PDF from Immigration New Zealand</p>
      <p class="text-green-800">Immigration New Zealand publishes a downloadable PDF guide for photographers titled "Taking acceptable visa photos." This can be shared with your photographer before the session. It is available in English and Simplified Chinese from the official INZ website.</p>
    </div>

    <h2>Complete New Zealand Visa Photo Checklist — Before You Upload</h2>

    <ul>
      <li>☐ Photo taken within the last 6 months</li>
      <li>☐ File is JPG or JPEG format (not PNG, HEIC, or TIFF)</li>
      <li>☐ File size is between 512 KB and 3.14 MB (or up to 10 MB if from a professional photographer)</li>
      <li>☐ Aspect ratio is 3:4 portrait (height is 1.33× the width)</li>
      <li>☐ Face covers 70%–80% of the image</li>
      <li>☐ Face is centred and looking directly at the camera</li>
      <li>☐ Expression is neutral — mouth closed, eyes open</li>
      <li>☐ Head is straight, not tilted or turned</li>
      <li>☐ Ears are visible (unless covered for religious or medical reasons)</li>
      <li>☐ No head coverings (unless for religious or medical reasons)</li>
      <li>☐ If wearing glasses: clear lenses, no heavy frames, no glare</li>
      <li>☐ Background is neutral and plain — no objects, patterns, or other people</li>
      <li>☐ No shadows on face or background</li>
      <li>☐ No filters, AI edits, skin smoothing, or brightness adjustments applied</li>
      <li>☐ Phone auto-beauty or portrait mode has been turned off</li>
      <li>☐ Photo is not a photo of a photo (no screen captures of existing photos)</li>
    </ul>

    <div class="my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h4 class="text-xl font-bold mb-4 text-center">Official Source</h4>
      <div class="flex flex-col gap-3 text-center">
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🇳🇿 New Zealand</div>
          <div class="text-sm font-bold">Immigration New Zealand (INZ)</div>
          <div class="text-xs text-slate-300 mt-1">immigration.govt.nz — Ministry of Business, Innovation and Employment</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl text-sm text-slate-300">
          All specifications on this page were verified against the official INZ photo standards page as of May 2026. Requirements can change — always confirm at immigration.govt.nz before submitting your application.
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">
        Get a compliant New Zealand visa photo — free
      </p>
      <p class="text-gray-600 mb-4 text-sm">Check your photo meets INZ's 3:4 ratio, 70–80% face coverage, and JPEG format requirements.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/tool?type=new-zealand-passport" class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 shadow">Check My NZ Visa Photo</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-blue-600 hover:underline font-medium">PixPassport</a></p>
    </div>
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added New Zealand visa photo blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);