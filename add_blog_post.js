const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "germany-student-visa-photo-requirements",
  "title": "Germany Student Visa Photo Requirements (2026 Complete Guide): Size, Background, Biometric Rules & Common Mistakes",
  "description": "Official 2026 guide to Germany student visa photo requirements. Covers biometric size (35x45mm), face coverage (70-80%), background colour, resolution (600 DPI), number of photos, and common rejection reasons. Verified against the Federal Foreign Office (Auswärtiges Amt), Federal Ministry of the Interior (BMI), and ICAO Document 9303.",
  "date": "2026-06-11",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1781145889/Germany-Student-Visa-Photo-Requirements_rdqxuo.webp",

  "content": `
    <h1>Germany Student Visa Photo Requirements (2026 Complete Guide): Size, Background, Biometric Rules &amp; Common Mistakes</h1>

    <p>Applying for a Germany student visa (Visum zu Studienzwecken) requires submitting biometric photographs that meet strict official standards. A photo that does not comply with these standards is one of the most common reasons for visa application delays and rejections. This guide covers every official requirement for your Germany student visa photo in 2026 — size, face coverage, background, resolution, expression, glasses, head coverings, and how many photos you need to submit.</p>

    <p>All specifications in this guide are sourced from the <strong>Federal Foreign Office of Germany (Auswärtiges Amt)</strong>, the <strong>Federal Ministry of the Interior and Community (Bundesministerium des Innern und für Heimat, BMI)</strong>, and the <strong>International Civil Aviation Organisation (ICAO) Document 9303</strong>, which Germany's biometric photo rules are based on. Always verify the latest requirements with your local German Mission or Consulate before submitting your application at <strong>auswaertiges-amt.de</strong>.</p>

    <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">Key Facts at a Glance</p>
      <ul class="text-blue-800 text-sm space-y-1 list-disc pl-5">
        <li>Photo size: <strong>35 mm (width) x 45 mm (height)</strong></li>
        <li>Face coverage: <strong>70–80% of the photo</strong> (32–36 mm from chin to crown)</li>
        <li>Background: <strong>Plain light grey or white</strong> — must contrast with face and hair</li>
        <li>Number of photos: <strong>2 identical recent photos</strong> for most German Missions</li>
        <li>Age of photo: <strong>Taken within the last 6 months</strong></li>
        <li>Resolution: <strong>Minimum 600 DPI</strong> (827 x 1063 pixels)</li>
        <li>Format: <strong>Colour photograph only</strong> — no black and white</li>
        <li>Glasses: <strong>Not permitted</strong></li>
      </ul>
    </div>

    <h2>Who Needs a Germany Student Visa?</h2>

    <p>According to the <strong>Federal Foreign Office (Auswärtiges Amt)</strong>, citizens of non-EU/EEA countries who intend to study in Germany for more than 90 days must obtain a national visa (Category D) before travelling. There are two types relevant to students:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Student Visa (Visum zu Studienzwecken):</strong> For applicants who have already received a formal admission letter from a German university or higher education institution.</li>
      <li><strong>Student Applicant Visa (Visum zur Studienbewerbung):</strong> For applicants still in the process of applying to German universities. Valid for up to 9 months. Must be converted to a residence permit after arrival.</li>
    </ul>

    <p>Both visa categories require the same biometric photograph standards as set out below. Citizens of EU, EEA, and Switzerland do not require a visa to study in Germany.</p>

    <h2>Official Germany Student Visa Photo Size Requirements</h2>

    <p>Germany's visa photo specifications are defined by the <strong>Federal Ministry of the Interior (BMI)</strong> and aligned with <strong>ICAO Document 9303</strong> biometric standards, as applied by the Federal Foreign Office across all German Missions worldwide.</p>

    <h3>Dimensions</h3>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Width:</strong> 35 mm</li>
      <li><strong>Height:</strong> 45 mm</li>
      <li><strong>Face height (chin to crown of head):</strong> 32–36 mm — this ensures the face occupies 70–80% of the total photo area.</li>
    </ul>

    <div class="my-6 overflow-x-auto">
      <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">Specification</th>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">Official Requirement</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Photo width</td><td class="border border-gray-200 px-4 py-3">35 mm</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Photo height</td><td class="border border-gray-200 px-4 py-3">45 mm</td></tr>
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Face height (chin to crown)</td><td class="border border-gray-200 px-4 py-3">32–36 mm (70–80% of frame)</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Minimum print resolution</td><td class="border border-gray-200 px-4 py-3">600 DPI (827 × 1063 pixels)</td></tr>
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Colour</td><td class="border border-gray-200 px-4 py-3">Colour only (no black and white)</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Age of photograph</td><td class="border border-gray-200 px-4 py-3">Within the last 6 months</td></tr>
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Number of photos required</td><td class="border border-gray-200 px-4 py-3">2 identical photos (standard; varies by Mission)</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Print finish</td><td class="border border-gray-200 px-4 py-3">Matte or semi-matte (not glossy)</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Background Requirements</h2>

    <p>According to the official photo sample guidelines published by German authorities and aligned with ICAO Document 9303 standards:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>The background must be <strong>plain and uniform</strong> — no patterns, gradients, or objects in the background.</li>
      <li>The official German biometric photo sample specifies a <strong>neutral light grey background</strong>. A plain white background is also accepted, provided it provides sufficient contrast with the applicant's face and hair.</li>
      <li>For applicants with light or blonde hair, a <strong>medium grey background</strong> is recommended to ensure adequate contrast.</li>
      <li>For applicants with dark hair, a <strong>light grey or white background</strong> is recommended.</li>
      <li><strong>No shadows</strong> should appear on the background or on the applicant's face.</li>
    </ul>

    <div class="my-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
      <p class="font-bold text-amber-900 mb-2">Note on Background Colour</p>
      <p class="text-amber-800 text-sm">The Federal Ministry of the Interior's official biometric photo template specifies a neutral grey background, not pure white. While white is accepted at many German Missions, the preferred standard per published German authority templates is light grey. Check with your specific German Embassy or Consulate for their local preference before having your photo taken.</p>
    </div>

    <h2>Face and Expression Requirements</h2>

    <p>Germany's student visa photo must meet the following face and expression requirements, per ICAO Document 9303 as applied by the Federal Foreign Office:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Facing directly forward</strong> — no tilting, turning, or angling of the head.</li>
      <li><strong>Neutral expression</strong> — mouth closed, neither smiling nor frowning.</li>
      <li><strong>Both eyes open and clearly visible</strong> — eyes must not be closed, half-closed, or obscured.</li>
      <li><strong>Forehead and full crown of head fully visible</strong> — the top of the head must not be cut off.</li>
      <li><strong>Chin fully visible</strong> — the chin must not be cut off at the bottom of the frame.</li>
      <li><strong>Even, shadow-free illumination</strong> — no shadows on the face or behind the head. Over-exposure and under-exposure must be avoided.</li>
      <li><strong>Natural skin tone and eye colour</strong> — colour balance must represent the applicant accurately.</li>
      <li>The image must be <strong>sharp, in focus, and not blurred</strong>.</li>
    </ul>

    <h2>Glasses Policy</h2>

    <p>Per the updated guidance from German authorities aligned with current biometric standards:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Glasses are not permitted</strong> in Germany visa and passport photos.</li>
      <li>This applies to all types of eyewear, including prescription glasses, tinted glasses, and sunglasses.</li>
      <li>If you normally wear glasses, you must remove them for your visa photo.</li>
    </ul>

    <h2>Head Coverings</h2>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>Head coverings are <strong>not permitted</strong> in Germany visa photos except where worn for <strong>documented religious reasons</strong>.</li>
      <li>If a head covering is worn for religious reasons, it <strong>must not obscure any part of the face</strong> — the full face from chin to forehead must be clearly visible.</li>
      <li>Hats, caps, or fashion headwear are not permitted under any circumstances.</li>
    </ul>

    <h2>How Many Photos Are Required for a Germany Student Visa?</h2>

    <p>According to standard requirements across German Missions and confirmed by the Federal Foreign Office:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>Most German Embassies and Consulates require <strong>2 identical biometric photographs</strong> for a national visa (Category D) application, which includes the student visa.</li>
      <li>Both photos must be identical — taken in the same session, meeting all the specifications above.</li>
      <li>Some German Missions may require a different number of photos. For example, German Missions in India require <strong>3 photos not older than 6 months</strong>, while the German Embassy in Georgia requires <strong>2 photos not older than 1 year</strong>.</li>
    </ul>

    <div class="my-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl">
      <p class="font-bold text-red-900 mb-2">Check Your Local German Mission</p>
      <p class="text-red-800 text-sm">Photo quantity requirements can vary by country. Always verify the exact number of photos required with the <strong>German Embassy or Consulate responsible for your country of residence</strong> before submitting your application. The official directory of German Missions is at <strong>auswaertiges-amt.de</strong>.</p>
    </div>

    <h2>Digital Photo Submissions</h2>

    <p>Germany's domestic document workflow changed from 1 May 2025, when the Federal Ministry of the Interior introduced digital-only photo submission for passport and national ID card applications processed inside Germany. However, for <strong>visa applications submitted at German Missions abroad</strong> — which includes student visa applications — both digital photo uploads and printed photos continue to be accepted depending on the consulate's online application portal requirements. The same biometric specifications (35x45mm, 600 DPI minimum, 70–80% face coverage) apply to digital submissions.</p>

    <h2>Common Reasons for Photo Rejection</h2>

    <p>The following are the most frequent reasons Germany student visa photos are rejected by German Missions:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>Photo is older than 6 months</li>
      <li>Face coverage is below 70% or above 80% of the photo area</li>
      <li>Background is not plain — patterned, dark, or has shadows</li>
      <li>Photo is blurred, underexposed, or overexposed</li>
      <li>Glasses are present in the photo</li>
      <li>Head is tilted or turned to one side</li>
      <li>The top of the head or chin is cut off</li>
      <li>Shadows are visible on the face or background</li>
      <li>Photo has been digitally altered to change facial features</li>
      <li>Photo is printed on glossy paper rather than matte or semi-matte</li>
      <li>Resolution is below 600 DPI (photo appears pixelated or unclear)</li>
    </ul>

    <h2>Germany Student Visa Photo Requirements vs. Other Common Visa Formats</h2>

    <div class="my-6 overflow-x-auto">
      <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">Feature</th>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">Germany Student Visa</th>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">India e-Visa</th>
            <th class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">US Visa / Passport</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Photo size</td><td class="border border-gray-200 px-4 py-3">35 x 45 mm</td><td class="border border-gray-200 px-4 py-3">51 x 51 mm (2x2 inch)</td><td class="border border-gray-200 px-4 py-3">51 x 51 mm (2x2 inch)</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Face coverage</td><td class="border border-gray-200 px-4 py-3">70–80%</td><td class="border border-gray-200 px-4 py-3">50% minimum</td><td class="border border-gray-200 px-4 py-3">50–69%</td></tr>
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Background</td><td class="border border-gray-200 px-4 py-3">Light grey / white</td><td class="border border-gray-200 px-4 py-3">White</td><td class="border border-gray-200 px-4 py-3">White</td></tr>
          <tr class="bg-gray-50"><td class="border border-gray-200 px-4 py-3">Glasses</td><td class="border border-gray-200 px-4 py-3">Not permitted</td><td class="border border-gray-200 px-4 py-3">Not permitted</td><td class="border border-gray-200 px-4 py-3">Not permitted</td></tr>
          <tr class="bg-white"><td class="border border-gray-200 px-4 py-3">Max photo age</td><td class="border border-gray-200 px-4 py-3">6 months</td><td class="border border-gray-200 px-4 py-3">6 months</td><td class="border border-gray-200 px-4 py-3">6 months</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Frequently Asked Questions</h2>

    <div class="my-6 space-y-4">

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Can I use the same photo for my Germany student visa and my residence permit application in Germany?</p>
        <p class="text-gray-700 text-sm">The biometric photo specifications (35x45mm, 70–80% face coverage, light background, 600 DPI) are the same for both the student visa application abroad and the residence permit (Aufenthaltstitel) application at the local Ausländerbehörde in Germany. However, your visa photo must be no older than 6 months at the time of each separate application. If significant time has passed between your visa application and your residence permit application, a new photo will be required.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Does Germany require a white or grey background for visa photos?</p>
        <p class="text-gray-700 text-sm">Both are referenced across official sources. The Federal Ministry of the Interior's official biometric photo template specifies a light grey background. White backgrounds are accepted at most German Missions provided there is adequate contrast between the background and the applicant's face and hair. The key requirement per ICAO Document 9303 — which Germany follows — is that the background must be plain, uniform, and contrasting with the face. When in doubt, use a neutral light grey.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Are photos taken on a smartphone accepted for the Germany student visa?</p>
        <p class="text-gray-700 text-sm">German Missions accept printed photos taken with a smartphone provided the final printed image meets all biometric specifications: 35x45mm, minimum 600 DPI print resolution, correct face coverage, plain background, sharp focus, and no shadows. The photo must be printed on matte or semi-matte photo paper, not on standard printer paper. For digital submission through an online visa portal, the image file must meet the resolution requirements set by that specific portal.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Is the Germany student visa photo the same as a Schengen visa photo?</p>
        <p class="text-gray-700 text-sm">The Germany student visa is a national visa (Category D), not a Schengen visa (Category C). However, both use the same 35x45mm biometric photo specification as defined by the Federal Foreign Office and aligned with the Schengen Visa Code (Regulation (EC) No 810/2009) and ICAO Document 9303.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: How many photos do I need for a Germany student visa application in India?</p>
        <p class="text-gray-700 text-sm">According to published requirements from German Missions in India, applicants applying from India are required to submit <strong>3 biometric photos not older than 6 months</strong>. This differs from the standard 2-photo requirement at many other German Missions. Always verify current requirements directly with your nearest German Embassy or Consulate in India at india.diplo.de before your appointment.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Can I wear religious head coverings in my Germany student visa photo?</p>
        <p class="text-gray-700 text-sm">Yes, head coverings worn for documented religious reasons are permitted. However, the covering must not obscure any part of the face — the full face from chin to forehead must be completely and clearly visible. No shadow may fall on the face as a result of the head covering. Hats or fashion headwear are not permitted under any circumstances.</p>
      </div>

    </div>

    <div class="my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h4 class="text-xl font-bold mb-4 text-center">Official Sources Used in This Guide</h4>
      <div class="flex flex-col gap-3 text-center">
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">Primary Authority</div>
          <div class="text-sm font-bold">Federal Foreign Office of Germany (Auswärtiges Amt)</div>
          <div class="text-xs text-slate-300 mt-1">auswaertiges-amt.de — Official visa requirements, student visa guidance, and German Mission directory</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">Biometric Standards Authority</div>
          <div class="text-sm font-bold">Federal Ministry of the Interior and Community (BMI) / Bundesdruckerei</div>
          <div class="text-xs text-slate-300 mt-1">bmi.bund.de — Official biometric photo specifications and Passbild templates</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">International Standard</div>
          <div class="text-sm font-bold">International Civil Aviation Organisation (ICAO) — Document 9303</div>
          <div class="text-xs text-slate-300 mt-1">icao.int — International biometric travel document standards that Germany's photo rules are based on</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">EU Regulation</div>
          <div class="text-sm font-bold">Schengen Visa Code — Regulation (EC) No 810/2009</div>
          <div class="text-xs text-slate-300 mt-1">EUR-Lex — European Parliament and Council regulation governing photo standards across Schengen area visas</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl text-sm text-slate-300">
          All specifications were verified against official sources as of June 2026. Photo requirements can change. Always verify the latest requirements directly with the German Embassy or Consulate responsible for your country at <strong>auswaertiges-amt.de</strong> before submitting your application.
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">
        Get Your Germany Student Visa Photo Right — First Time
      </p>
      <p class="text-gray-600 mb-4 text-sm">Automatically verify and prepare your photo to meet Germany student visa standards — 35x45mm biometric format, plain light background, 70–80% face coverage, 600 DPI resolution — before submitting your application at your German Mission.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=germany-visa" class="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition duration-200 shadow">Prepare My Germany Visa Photo</a>
        <a href="https://www.auswaertiges-amt.de/en/visa-service" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition duration-200">Official German Mission Portal →</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-gray-700 hover:underline font-medium">PixPassport</a></p>
    </div>

    <!--
      Meta Title: Germany Student Visa Photo Requirements 2026 — Size, Background & Biometric Rules
      Meta Description: Official Germany student visa photo guide 2026. Biometric size 35x45mm, face coverage 70-80%, light grey background, 600 DPI, 2 photos required. Sourced from Auswärtiges Amt, BMI, and ICAO Document 9303.
      Slug: germany-student-visa-photo-requirements
      Last Updated: June 2026
    -->
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added Germany student visa photo requirements blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);