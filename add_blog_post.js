const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "country-wise-visa-photo-requirements-comparison-2026",
  "title": "Country-Wise Visa Photo Requirements Comparison 2026 — Australia vs USA vs UK vs Canada vs Schengen",
  "description": "The definitive 2026 comparison of visa photo requirements across Australia, USA, UK, Canada, and all Schengen countries. Official photo sizes in mm and pixels, background color rules, head coverage percentages, glasses policy, and file format specs — all sourced from official government authorities including Department of Home Affairs, US State Department, UKVI, IRCC, and EU Visa Code.",
  "date": "2026-04-30",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1777027958/Complete_Australia_visa_photo_guide_2026._Official_size_vdcr5s.webp",

  "content": `
    <h2>Country-Wise Visa Photo Requirements Comparison 2026 — The Complete Official Guide</h2>

    <p>One of the most common — and most avoidable — reasons visa applications get rejected worldwide is a non-compliant photograph. The problem is that every country has its own official photo standard, set by its own government authority, and the specifications differ significantly from one another. A photo that is perfectly compliant for a US visa application will be automatically rejected at a UK consulate. A photo that passes Australia's ImmiAccount portal will fail on Canada's IRCC visa portal because the dimensions don't match.</p>

    <p>This guide compares the <strong>official visa photo requirements for 2026</strong> across the five most commonly applied-for travel destinations: <strong>Australia</strong> (Department of Home Affairs), <strong>United States</strong> (US Department of State), <strong>United Kingdom</strong> (UKVI — UK Visas and Immigration), <strong>Canada</strong> (IRCC — Immigration, Refugees and Citizenship Canada), and the <strong>Schengen Area</strong> (EU Visa Code, Regulation EC 810/2009). Every specification in this guide is sourced from official government portals and verified against current published requirements.</p>

    <h2>Quick Comparison: Visa Photo Size by Country 2026</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country / Authority</th>
            <th class="px-4 py-3 font-semibold">Size (mm)</th>
            <th class="px-4 py-3 font-semibold">Size (inches)</th>
            <th class="px-4 py-3 font-semibold">Aspect Ratio</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Digital Pixels</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold text-blue-800">🇦🇺 Australia (DHA)</td>
            <td class="px-4 py-3">35–40 × 45–50 mm</td>
            <td class="px-4 py-3">1.38" × 1.77"</td>
            <td class="px-4 py-3">Portrait (rectangular)</td>
            <td class="px-4 py-3">Min 300 DPI; prefer 1200×1600 px</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold text-red-800">🇺🇸 United States (State Dept.)</td>
            <td class="px-4 py-3">51 × 51 mm (2×2 in)</td>
            <td class="px-4 py-3">2" × 2"</td>
            <td class="px-4 py-3">Square (1:1)</td>
            <td class="px-4 py-3">600–1200 × 600–1200 px; max 240KB JPEG</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-800">🇬🇧 United Kingdom (UKVI)</td>
            <td class="px-4 py-3">35 × 45 mm</td>
            <td class="px-4 py-3">1.38" × 1.77"</td>
            <td class="px-4 py-3">Portrait (rectangular)</td>
            <td class="px-4 py-3">JPEG or PNG; 50KB–10MB</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold text-red-900">🇨🇦 Canada — Visa (IRCC)</td>
            <td class="px-4 py-3">35 × 45 mm</td>
            <td class="px-4 py-3">1.38" × 1.77"</td>
            <td class="px-4 py-3">Portrait (rectangular)</td>
            <td class="px-4 py-3">Digital upload; JPEG; IRCC portal</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold text-yellow-900">🇨🇦 Canada — Passport (IRCC)</td>
            <td class="px-4 py-3">50 × 70 mm</td>
            <td class="px-4 py-3">1.97" × 2.76"</td>
            <td class="px-4 py-3">Portrait (rectangular)</td>
            <td class="px-4 py-3">420×540 px (online) — 2 printed required</td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold text-blue-900">🇪🇺 Schengen Area (EU Visa Code)</td>
            <td class="px-4 py-3">35 × 45 mm</td>
            <td class="px-4 py-3">1.38" × 1.77"</td>
            <td class="px-4 py-3">Portrait (rectangular)</td>
            <td class="px-4 py-3">413×531 px at 300 DPI; max 240KB JPEG</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p><strong>Key takeaway:</strong> The US is the only major destination requiring a <strong>square</strong> photo. Canada uses two different sizes — a smaller 35×45mm for visa applications and a uniquely large 50×70mm for passports. All other destinations use the standard 35×45mm portrait format.</p>

    <h2>Background Color Requirements by Country — 2026</h2>

    <p>Background color is the single most frequently failed element in international photo submissions. Each country has a specific official requirement, and they are not the same:</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">Official Background</th>
            <th class="px-4 py-3 font-semibold">White Accepted?</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Authority</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia</td>
            <td class="px-4 py-3">Plain white or very light grey</td>
            <td class="px-4 py-3 text-green-700 font-bold">✅ Yes</td>
            <td class="px-4 py-3">Department of Home Affairs</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">🇺🇸 United States</td>
            <td class="px-4 py-3">Plain white or off-white only</td>
            <td class="px-4 py-3 text-green-700 font-bold">✅ Yes (required)</td>
            <td class="px-4 py-3">US Department of State / travel.state.gov</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td>
            <td class="px-4 py-3">Cream or light grey — NOT white</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ No — white rejected</td>
            <td class="px-4 py-3">HM Passport Office / UKVI</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</td>
            <td class="px-4 py-3">Plain white or light-coloured</td>
            <td class="px-4 py-3 text-green-700 font-bold">✅ Yes</td>
            <td class="px-4 py-3">IRCC / canada.ca</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Passport</td>
            <td class="px-4 py-3">Plain white (no grey, no off-white)</td>
            <td class="px-4 py-3 text-green-700 font-bold">✅ Yes (mandatory)</td>
            <td class="px-4 py-3">IRCC / canada.ca</td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td>
            <td class="px-4 py-3">Light grey or neutral light background</td>
            <td class="px-4 py-3 text-amber-600 font-bold">⚠️ Varies by consulate</td>
            <td class="px-4 py-3">EU Visa Code / ICAO; consulate-level spec</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-xl">
      <p class="font-bold text-amber-900 mb-2">⚠️ Critical Warning: UK Background Rule</p>
      <p class="text-amber-800">The UK is one of the most commonly misunderstood countries for background color. HM Passport Office and UKVI specifically require a <strong>cream or light grey background — not white</strong>. Pure white backgrounds can confuse the automated verification system and are a documented rejection cause. This is the opposite of the US requirement, where white is mandatory. If you are applying to both destinations, you need two separate photos with different background colors.</p>
    </div>

    <h2>Head Size and Face Coverage Requirements by Country</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">Head Height (mm)</th>
            <th class="px-4 py-3 font-semibold">Face Coverage (%)</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Standard</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia</td>
            <td class="px-4 py-3">32–36 mm (chin to crown)</td>
            <td class="px-4 py-3">75–80% of frame</td>
            <td class="px-4 py-3">ICAO / Department of Home Affairs</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">🇺🇸 United States</td>
            <td class="px-4 py-3">25–35 mm (1"–1⅜")</td>
            <td class="px-4 py-3">50–69% of frame</td>
            <td class="px-4 py-3">US Dept. of State / 9 FAM 403.9-4</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td>
            <td class="px-4 py-3">29–34 mm (chin to crown)</td>
            <td class="px-4 py-3">65–75% of frame</td>
            <td class="px-4 py-3">HM Passport Office / UKVI</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</td>
            <td class="px-4 py-3">31–36 mm (chin to crown)</td>
            <td class="px-4 py-3">~70–80% of frame</td>
            <td class="px-4 py-3">IRCC / canada.ca</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Passport</td>
            <td class="px-4 py-3">31–36 mm (chin to crown)</td>
            <td class="px-4 py-3">~44–51% of 70mm frame</td>
            <td class="px-4 py-3">IRCC / canada.ca</td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td>
            <td class="px-4 py-3">32–36 mm (chin to crown)</td>
            <td class="px-4 py-3">70–80% of frame</td>
            <td class="px-4 py-3">EU Visa Code / ICAO Doc 9303</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-red-50 border-l-4 border-red-400 rounded-xl">
      <p class="font-bold text-red-900 mb-2">🚨 Critical Difference: US vs Australia/Schengen Head Size</p>
      <p class="text-red-800">The US requires the face to cover only <strong>50–69% of the photo height</strong>. Australia and Schengen require <strong>70–80%</strong>. This is the biggest practical difference between destinations. A photo cropped correctly for a US visa will have a face that is too small for an Australian or Schengen visa submission — and vice versa. You cannot use the same photo file for both. Separate crops are always required.</p>
    </div>

    <h2>Glasses Policy by Country — 2026</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">Glasses Permitted?</th>
            <th class="px-4 py-3 font-semibold">Medical Exception?</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Policy Since</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ Not permitted</td>
            <td class="px-4 py-3">No</td>
            <td class="px-4 py-3">Enforced by DHA biometric standard</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">🇺🇸 United States</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ Not permitted</td>
            <td class="px-4 py-3">Yes — signed medical statement required</td>
            <td class="px-4 py-3">November 1, 2016</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ Not permitted</td>
            <td class="px-4 py-3">Yes — rare medical cases only</td>
            <td class="px-4 py-3">2016 (passport); enforced for visas</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</td>
            <td class="px-4 py-3 text-green-700 font-bold">✅ Allowed (conditions)</td>
            <td class="px-4 py-3">N/A — permitted with clear lenses, no glare</td>
            <td class="px-4 py-3">IRCC current guidance</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Passport</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ Not permitted</td>
            <td class="px-4 py-3">Not specified</td>
            <td class="px-4 py-3">Since 2017</td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td>
            <td class="px-4 py-3 text-red-600 font-bold">❌ Not recommended / often rejected</td>
            <td class="px-4 py-3">Consulate-dependent</td>
            <td class="px-4 py-3">Updated 2022 Schengen biometric guidelines</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-green-50 border-l-4 border-green-500 rounded-xl">
      <p class="font-bold text-green-900 mb-2">✅ Canada Visa Exception — Unique Glasses Rule</p>
      <p class="text-green-800">Canada's IRCC is the only major immigration authority that still permits prescription glasses in <strong>visa</strong> photos under its current published guidance — provided the lenses are completely clear and non-tinted, the frames do not cover any part of the eyes, and there is absolutely no glare or reflection. This rule does not extend to Canadian passport photos, where glasses have been banned since 2017. For every other destination in this comparison, the universal advice for 2026 is: <strong>remove all eyewear before your photo is taken</strong>.</p>
    </div>

    <h2>Digital File Format and Upload Requirements by Country</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">File Format</th>
            <th class="px-4 py-3 font-semibold">Max File Size</th>
            <th class="px-4 py-3 font-semibold">Min Resolution</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Upload Portal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia</td>
            <td class="px-4 py-3">JPEG / JPG</td>
            <td class="px-4 py-3">5 MB</td>
            <td class="px-4 py-3">300 DPI (prefer 1200×1600 px)</td>
            <td class="px-4 py-3">ImmiAccount — immi.homeaffairs.gov.au</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">🇺🇸 United States</td>
            <td class="px-4 py-3">JPEG only (no HEIC, PNG, PDF)</td>
            <td class="px-4 py-3">240 KB</td>
            <td class="px-4 py-3">600×600 px min; 1200×1200 px max</td>
            <td class="px-4 py-3">CEAC — ceac.state.gov (DS-160)</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td>
            <td class="px-4 py-3">JPEG or PNG</td>
            <td class="px-4 py-3">10 MB</td>
            <td class="px-4 py-3">50 KB minimum</td>
            <td class="px-4 py-3">GOV.UK visa application portal</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</td>
            <td class="px-4 py-3">JPEG</td>
            <td class="px-4 py-3">4 MB</td>
            <td class="px-4 py-3">35×45mm proportional</td>
            <td class="px-4 py-3">IRCC Online Application — canada.ca</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada Passport</td>
            <td class="px-4 py-3">JPEG (online); printed required</td>
            <td class="px-4 py-3">4 MB (online renewals)</td>
            <td class="px-4 py-3">420×540 px</td>
            <td class="px-4 py-3">Two printed copies — photographer stamp required</td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td>
            <td class="px-4 py-3">JPEG</td>
            <td class="px-4 py-3">240 KB</td>
            <td class="px-4 py-3">413×531 px at 300 DPI</td>
            <td class="px-4 py-3">VFS Global / TLS Contact / Consulate portal</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">🔵 US File Size Warning — 240KB is Strict</p>
      <p class="text-blue-800">The US CEAC portal enforces a <strong>240KB maximum file size</strong> — the smallest hard limit of any major destination. Raw smartphone photos are typically 3–8MB and must be compressed before upload. The State Department also specifies a maximum JPEG compression ratio of 20:1 — aggressive compression that creates visible blocking artifacts may be rejected during manual consular review. The UK's 10MB limit is 40 times more generous, making digital submission far more forgiving.</p>
    </div>

    <h2>Printed Photo Requirements — How Many Copies?</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">Printed Copies</th>
            <th class="px-4 py-3 font-semibold">Paper Type Required</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Special Requirements</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia (Visa)</td>
            <td class="px-4 py-3">Digital only (online applications)</td>
            <td class="px-4 py-3">N/A for online</td>
            <td class="px-4 py-3">JPEG upload to ImmiAccount</td>
          </tr>
          <tr class="bg-blue-100">
            <td class="px-4 py-3 font-semibold">🇦🇺 Australia (Passport)</td>
            <td class="px-4 py-3">2 identical prints</td>
            <td class="px-4 py-3">Glossy or semi-gloss photo paper</td>
            <td class="px-4 py-3">No inkjet home printing; DFAT recommends Australia Post</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">🇺🇸 United States (DS-160)</td>
            <td class="px-4 py-3">Digital only (DS-160 online)</td>
            <td class="px-4 py-3">N/A for online</td>
            <td class="px-4 py-3">DS-260 (immigrant visa): 2 prints at interview</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td>
            <td class="px-4 py-3">2 prints for paper applications</td>
            <td class="px-4 py-3">Matte or glossy photo paper</td>
            <td class="px-4 py-3">Optional 16-char photo code from approved UK retailers</td>
          </tr>
          <tr class="bg-red-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada (Visa)</td>
            <td class="px-4 py-3">Digital upload (online applications)</td>
            <td class="px-4 py-3">N/A for online</td>
            <td class="px-4 py-3">No photographer stamp required for visa photos</td>
          </tr>
          <tr class="bg-yellow-50">
            <td class="px-4 py-3 font-semibold">🇨🇦 Canada (Passport)</td>
            <td class="px-4 py-3">2 identical prints</td>
            <td class="px-4 py-3">Matte finish on high-quality paper</td>
            <td class="px-4 py-3"><strong>Photographer's name, address, and date must be on back</strong></td>
          </tr>
          <tr class="bg-blue-50">
            <td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td>
            <td class="px-4 py-3">2 identical prints</td>
            <td class="px-4 py-3">High-quality photo paper, min 160 GSM; 400–600 DPI print resolution</td>
            <td class="px-4 py-3">One for application form, one for visa sticker</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl">
      <p class="font-bold text-yellow-900 mb-2">🇨🇦 Canada Passport — Photographer Stamp is Mandatory</p>
      <p class="text-yellow-800">Canada's IRCC requires that for printed passport photo submissions, the photographer's name, address, and the date the photo was taken must be written or stamped on the back of one of the two photos. This is a uniquely Canadian requirement not found at any other major destination. DIY printed photos without a photographer's endorsement are technically non-compliant for passport applications (though acceptable for digital visa submissions).</p>
    </div>

    <h2>Recency — How Old Can Your Visa Photo Be?</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Country</th>
            <th class="px-4 py-3 font-semibold">Maximum Age of Photo</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Notes</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-blue-50"><td class="px-4 py-3 font-semibold">🇦🇺 Australia</td><td class="px-4 py-3">Within last 6 months</td><td class="px-4 py-3">Department of Home Affairs requirement</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">🇺🇸 United States</td><td class="px-4 py-3">Within last 6 months</td><td class="px-4 py-3">Must reflect current appearance; State Dept. rule</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">🇬🇧 United Kingdom</td><td class="px-4 py-3">Within last 1 month</td><td class="px-4 py-3">HM Passport Office requires very recent photos</td></tr>
          <tr class="bg-red-50"><td class="px-4 py-3 font-semibold">🇨🇦 Canada</td><td class="px-4 py-3">Within last 6 months</td><td class="px-4 py-3">IRCC requirement — must reflect current appearance</td></tr>
          <tr class="bg-blue-50"><td class="px-4 py-3 font-semibold">🇪🇺 Schengen</td><td class="px-4 py-3">Within last 6 months</td><td class="px-4 py-3">Some Schengen consulates (Denmark, Iceland, Norway) have historically requested 3 months — always verify with specific consulate</td></tr>
        </tbody>
      </table>
    </div>

    <div class="my-8 p-5 bg-slate-50 border-l-4 border-slate-500 rounded-xl">
      <p class="font-bold text-slate-900 mb-2">🇬🇧 UK Recency Requirement is the Strictest</p>
      <p class="text-slate-800">The UK's HM Passport Office requires photos taken <strong>within the last month</strong> — far stricter than the 6-month window allowed by the US, Australia, Canada, and most Schengen countries. If you are applying to the UK and another destination simultaneously, ensure your photos are taken within a few days of each other to avoid a situation where your UK photo is still valid but your other photos have expired, or vice versa.</p>
    </div>

    <h2>Complete Side-by-Side Comparison: All Key Specifications</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Specification</th>
            <th class="px-4 py-3 font-semibold">🇦🇺 Australia</th>
            <th class="px-4 py-3 font-semibold">🇺🇸 USA</th>
            <th class="px-4 py-3 font-semibold">🇬🇧 UK</th>
            <th class="px-4 py-3 font-semibold">🇨🇦 Canada Visa</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">🇪🇺 Schengen</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-xs">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Photo size</td><td class="px-4 py-3">35–40×45–50mm</td><td class="px-4 py-3">51×51mm (square)</td><td class="px-4 py-3">35×45mm</td><td class="px-4 py-3">35×45mm</td><td class="px-4 py-3">35×45mm</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Background</td><td class="px-4 py-3">White or light grey</td><td class="px-4 py-3">White / off-white only</td><td class="px-4 py-3">Cream or light grey (NOT white)</td><td class="px-4 py-3">White or light-coloured</td><td class="px-4 py-3">Light grey / neutral</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Head height</td><td class="px-4 py-3">32–36mm</td><td class="px-4 py-3">25–35mm (1–1⅜")</td><td class="px-4 py-3">29–34mm</td><td class="px-4 py-3">31–36mm</td><td class="px-4 py-3">32–36mm</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Face coverage</td><td class="px-4 py-3">75–80%</td><td class="px-4 py-3">50–69%</td><td class="px-4 py-3">65–75%</td><td class="px-4 py-3">~70–80%</td><td class="px-4 py-3">70–80%</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">❌ Not permitted</td><td class="px-4 py-3">❌ Not permitted (since 2016)</td><td class="px-4 py-3">❌ Not permitted</td><td class="px-4 py-3">✅ Allowed (clear, no glare)</td><td class="px-4 py-3">❌ Not recommended</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">File format</td><td class="px-4 py-3">JPEG</td><td class="px-4 py-3">JPEG only (no HEIC)</td><td class="px-4 py-3">JPEG or PNG</td><td class="px-4 py-3">JPEG</td><td class="px-4 py-3">JPEG</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Max file size</td><td class="px-4 py-3">5 MB</td><td class="px-4 py-3">240 KB (strict)</td><td class="px-4 py-3">10 MB</td><td class="px-4 py-3">4 MB</td><td class="px-4 py-3">240 KB</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Recency</td><td class="px-4 py-3">6 months</td><td class="px-4 py-3">6 months</td><td class="px-4 py-3"><strong>1 month</strong></td><td class="px-4 py-3">6 months</td><td class="px-4 py-3">6 months</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Prints required</td><td class="px-4 py-3">Digital (visa); 2 prints (passport)</td><td class="px-4 py-3">Digital (DS-160); 2 prints (DS-260)</td><td class="px-4 py-3">2 prints or photo code</td><td class="px-4 py-3">Digital upload only</td><td class="px-4 py-3">2 identical prints</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Official authority</td><td class="px-4 py-3">Dept. of Home Affairs</td><td class="px-4 py-3">US Dept. of State</td><td class="px-4 py-3">UKVI / HM Passport Office</td><td class="px-4 py-3">IRCC</td><td class="px-4 py-3">EU Visa Code EC 810/2009</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Can the Same Photo Be Used for Multiple Countries?</h2>

    <p>This is the most practical question for international travelers applying to multiple destinations simultaneously. The honest answer: <strong>rarely, and only under specific conditions</strong>. Here is what the official specifications tell us:</p>

    <ul>
      <li><strong>Australia + Schengen:</strong> Both use 35×45mm, 70–80% face coverage, and accept white/light grey backgrounds. A photo meeting Australian specs will generally also meet Schengen specs, provided the background is acceptable (light grey works for both). <strong>May be reusable if taken within 6 months.</strong></li>
      <li><strong>Australia + Canada Visa:</strong> Both use 35×45mm and similar face coverage. However, Canada allows glasses and Australia does not. Background rules are compatible. <strong>Generally reusable if you don't wear glasses.</strong></li>
      <li><strong>Australia/Schengen + UK:</strong> Same 35×45mm size. However, the UK requires a <strong>cream or light grey background</strong> while Australia accepts white. Face coverage also differs slightly (UK: 65–75% vs Australia: 75–80%). <strong>Not reliably reusable — different background and face proportion requirements.</strong></li>
      <li><strong>Any destination + USA:</strong> The US requires a square 51×51mm photo with only 50–69% face coverage. No rectangular photo from any other destination can be used for the US. <strong>Always a separate photo is required.</strong></li>
      <li><strong>Canada Passport + Canada Visa:</strong> Despite being the same country, Canadian passport photos (50×70mm) and visa photos (35×45mm) have different sizes. <strong>Cannot be reused for each other.</strong></li>
    </ul>

    <h2>Common Mistakes When Applying to Multiple Countries</h2>

    <ol>
      <li><strong>Using a UK photo for a US application</strong> — wrong size (UK is 35×45mm, US is 51×51mm square)</li>
      <li><strong>Using a US photo for Australia or Schengen</strong> — wrong aspect ratio and too little face coverage</li>
      <li><strong>Using the same white-background photo for a UK visa</strong> — UK requires cream or light grey, not white</li>
      <li><strong>Reusing a Canadian passport photo for a Canadian visa</strong> — different sizes (50×70mm vs 35×45mm)</li>
      <li><strong>Submitting a 6-month-old photo to the UK</strong> — UK requires within 1 month, not 6</li>
      <li><strong>Uploading a 5MB file to the US CEAC portal</strong> — US maximum is 240KB; file will be rejected automatically</li>
      <li><strong>Wearing glasses in an Australian or US photo</strong> — not permitted in either; only Canadian visa allows it</li>
    </ol>

    <h2>2026 Visa Photo Requirements by Country — Final Summary</h2>

    <div class="my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h4 class="text-xl font-bold mb-6 text-center">Official Governing Authorities</h4>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">🇦🇺 Australia</div><div class="text-sm font-bold">Department of Home Affairs — immi.homeaffairs.gov.au</div></div>
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">🇺🇸 United States</div><div class="text-sm font-bold">US Department of State — travel.state.gov / ceac.state.gov</div></div>
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">🇬🇧 United Kingdom</div><div class="text-sm font-bold">UK Visas & Immigration (UKVI) — gov.uk/apply-uk-visa</div></div>
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">🇨🇦 Canada</div><div class="text-sm font-bold">Immigration, Refugees and Citizenship Canada (IRCC) — canada.ca</div></div>
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">🇪🇺 Schengen</div><div class="text-sm font-bold">EU Visa Code — Regulation (EC) No 810/2009 / ICAO Doc 9303</div></div>
        <div class="p-4 bg-white/10 rounded-xl"><div class="text-xs text-slate-400 mb-1">Biometric Standard</div><div class="text-sm font-bold">ICAO Document 9303 — International Civil Aviation Organization</div></div>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-4">
        Get a compliant visa photo for any country — completely free
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/australia-visa-photo-editor" class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 shadow">Australia Visa Photo</a>
        <a href="https://www.pixpassport.com/schengen-visa-photo-editor" class="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-200 shadow">Schengen Visa Photo</a>
        <a href="https://www.pixpassport.com/us-visa-photo-editor" class="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200 shadow">US Visa Photo</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-blue-600 hover:underline font-medium">PixPassport</a></p>
    </div>
  `
}
posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log(
  "Successfully added Australia visa photo blog post targeting all visa, passport, size, and online maker keywords for 2026.",
);

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);