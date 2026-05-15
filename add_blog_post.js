const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "india-visa-requirements-for-foreigners",
  "title": "India Visa Requirements for Foreigners (2026 Complete Guide): e-Visa, Types, Fees, Photos & Application Process",
  "description": "Complete 2026 guide to India visa requirements for foreign nationals. Covers e-Visa eligibility (166+ countries), types of visas, fees, photo specifications (2×2 inch/51×51mm), entry airports, FRRO registration, and step-by-step application process. Verified against indianvisaonline.gov.in, boi.gov.in, mha.gov.in and mea.gov.in.",
  "date": "2026-05-15",
  "author": "PixPassport Team",
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1778863761/india-Visa-Requirements-for-Foreigners_gyycfq.webp",

  "content": `
    <h1>India Visa Requirements for Foreigners (2026 Complete Guide): e-Visa, Types, Fees, Photos & Application Process</h1>

    <p>Planning to travel to India in 2026? Whether you are visiting for tourism, business, medical treatment, or to meet family, obtaining the correct visa before arrival is a legal requirement for almost all foreign nationals. India operates one of the world's largest e-Visa systems, covering citizens of over 166 countries and territories — but the rules, fees, photo specifications, and entry requirements vary significantly by nationality and purpose of visit.</p>

    <p>This guide is compiled exclusively from official Indian government sources: the <strong>Bureau of Immigration (boi.gov.in)</strong>, the <strong>Indian Visa Online portal (indianvisaonline.gov.in)</strong>, the <strong>Ministry of Home Affairs (mha.gov.in)</strong>, and the <strong>Ministry of External Affairs (mea.gov.in)</strong>. Every factual claim is sourced from these portals. Visa rules can change — always verify the latest requirements at <strong>indianvisaonline.gov.in</strong> before submitting your application.</p>

    <div class="my-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
      <p class="font-bold text-amber-900 mb-2">Important: Beware of Fake Visa Websites</p>
      <p class="text-amber-800 text-sm">The Government of India has <strong>not authorised any agent or intermediary</strong> to charge fees for facilitating emergency or express visas or e-Visas. The only official Indian e-Visa application portal is <strong>indianvisaonline.gov.in/evisa</strong>. Any other website charging "service fees" or "express processing" fees for Indian government visas is unofficial. Report suspicious websites to Indian immigration authorities.</p>
    </div>

    <h2>Do Foreigners Need a Visa to Enter India?</h2>

    <p>According to the official <strong>Indian Visa Online portal (indianvisaonline.gov.in)</strong>, all foreign nationals entering India must possess a valid international travel document in the form of a national passport along with a valid visa issued by an Indian Mission or Post, or an e-Visa granted by the Bureau of Immigration — except for nationals specifically exempted under bilateral agreements.</p>

    <p>The following nationalities are exempt from obtaining a visa before arrival, per official sources:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Nepal and Bhutan:</strong> Citizens of Nepal and Bhutan do not require a visa to enter India. However, if entering India from China, Macau, Hong Kong, or Pakistan, a passport and visa are required. (Source: Bureau of Immigration, boi.gov.in)</li>
      <li><strong>Maldives:</strong> Maldivian citizens visiting India for up to 90 days for tourism are exempt from visa requirements when holding a valid Maldivian passport, per the Incredible India government portal (incredibleindia.gov.in).</li>
      <li><strong>Diplomatic and Official Passport holders:</strong> Subject to separate bilateral visa exemption agreements listed on the Ministry of External Affairs website (mea.gov.in/bvwa-menu.htm).</li>
    </ul>

    <p>All other foreign nationals — including citizens of the United States, United Kingdom, European Union, Canada, Australia, and most other countries — require either an e-Visa or a regular (sticker) visa issued by an Indian Mission or Post.</p>

    <h2>What Is the India e-Visa?</h2>

    <p>The India e-Visa (Electronic Travel Authorisation or ETA) is a fully online visa system operated by the Bureau of Immigration, Ministry of Home Affairs, Government of India. It allows eligible foreign nationals to apply for a visa from their home country without visiting an Indian embassy or consulate. According to <strong>indianvisaonline.gov.in</strong>, the e-Visa is available for tourism, business, medical treatment, and conference purposes.</p>

    <p>Key official facts about the India e-Visa, per the Bureau of Immigration (boi.gov.in and indianvisaonline.gov.in):</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>The e-Visa is <strong>non-extendable</strong> and <strong>non-convertible</strong> once granted.</li>
      <li>It is <strong>not valid for visiting Protected Areas, Restricted Areas, or Cantonment Areas</strong> — separate permission from civil authority is required for those zones.</li>
      <li>Biometric details (fingerprints and photograph) are captured at immigration on arrival in India.</li>
      <li>e-Visa holders <strong>must arrive through designated Immigration Check Posts</strong> (airports and seaports) — see the full list below.</li>
      <li>The e-Visa fee is <strong>non-refundable</strong> whether the application is approved or rejected.</li>
    </ul>

    <h2>Types of India e-Visa — Official Categories</h2>

    <p>According to the Ministry of Home Affairs document on visa details (mha.gov.in) and the Indian e-Visa portal (indianvisaonline.gov.in), there are three main sub-categories of India e-Visa:</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-orange-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">e-Visa Type</th>
            <th class="px-4 py-3 font-semibold">Purpose</th>
            <th class="px-4 py-3 font-semibold">Validity Options</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Entries</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">e-Tourist Visa</td>
            <td class="px-4 py-3">Recreation, sightseeing, visiting friends/relatives, short-term yoga programmes, short courses (music, dance, cooking, language etc.)</td>
            <td class="px-4 py-3">30 days / 1 year / 5 years</td>
            <td class="px-4 py-3">Double (30-day); Multiple (1-yr & 5-yr)</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">e-Business Visa</td>
            <td class="px-4 py-3">All activities permitted under regular Business Visa</td>
            <td class="px-4 py-3">1 year</td>
            <td class="px-4 py-3">Multiple</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">e-Medical Visa</td>
            <td class="px-4 py-3">Medical treatment including Indian systems of medicine (Ayurveda, Yoga, etc.)</td>
            <td class="px-4 py-3">60 days</td>
            <td class="px-4 py-3">Triple</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">e-Medical Attendant Visa</td>
            <td class="px-4 py-3">Accompanying an e-Medical Visa holder (up to 2 attendants)</td>
            <td class="px-4 py-3">Co-terminus with principal e-Medical Visa</td>
            <td class="px-4 py-3">Triple</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">e-Conference Visa</td>
            <td class="px-4 py-3">Attending conferences, seminars, workshops organised by Government of India Ministries, State Governments, PSUs, and their subordinate organisations</td>
            <td class="px-4 py-3">30 days</td>
            <td class="px-4 py-3">Single</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">📋 Official Source Note</p>
      <p class="text-blue-800 text-sm">The above categories and entry rules are sourced directly from <strong>indianvisaonline.gov.in</strong> (Bureau of Immigration, Ministry of Home Affairs, Government of India). For maximum stay rules: the 1-year and 5-year e-Tourist Visa holders must not exceed <strong>180 days in India during one calendar year</strong>. The 30-day e-Tourist Visa permits a stay of 30 days from the date of arrival. Always confirm current rules at <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" class="underline" target="_blank" rel="noopener noreferrer">indianvisaonline.gov.in/evisa/tvoa.html</a> before applying.</p>
    </div>

    <h2>Types of Regular (Sticker) Visa — Indian Mission/Post</h2>

    <p>For those not eligible for e-Visa, or whose purpose of visit falls outside e-Visa categories, a regular visa must be obtained from the Indian Mission or Post (embassy/consulate) in your country. The Ministry of Home Affairs (mha.gov.in) recognises the following principal categories of regular visa:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Tourist Visa (T):</strong> For recreation, sightseeing, casual visits to friends or relatives, short-term yoga programmes. Not for activities that generate income.</li>
      <li><strong>Business Visa (B):</strong> For business activities, trade visits, establishing business ventures, attending business meetings.</li>
      <li><strong>Employment Visa (E):</strong> For foreign nationals taking up employment with Indian companies or organisations. Requires a minimum salary threshold (₹16.25 lakhs per annum as per MHA guidelines). Not granted for manual or clerical work.</li>
      <li><strong>Student Visa (S):</strong> For pursuing full-time academic or research programmes at recognised Indian educational institutions.</li>
      <li><strong>Medical Visa (MED):</strong> For medical treatment at recognised/specialised hospitals in India. Requires a letter from the hospital.</li>
      <li><strong>Medical Attendant Visa (MED-X):</strong> For attendants accompanying a Medical Visa holder. Maximum of 2 attendants per patient.</li>
      <li><strong>Conference Visa (C):</strong> For attending conferences, seminars, workshops, etc.</li>
      <li><strong>Transit Visa (TR):</strong> For transiting through India to a destination outside India. Valid for a stay not exceeding 3 days for each leg of the journey. Can be issued for 2 entries.</li>
      <li><strong>Research Visa (R):</strong> For research work at recognised institutions.</li>
      <li><strong>Journalist Visa (J):</strong> For journalists and media personnel.</li>
      <li><strong>Intern Visa (IN):</strong> For foreign nationals undertaking internship with Indian organisations.</li>
      <li><strong>Film Visa (F):</strong> For foreign nationals involved in film shooting in India.</li>
      <li><strong>Missionary Visa (M):</strong> For religious/missionary activities.</li>
    </ul>

    <p>Apply for regular visas through the official portal at <strong>indianvisaonline.gov.in</strong> (select "Regular/Paper visa by Indian Mission/Post").</p>

    <h2>e-Visa vs Regular Visa — Comparison</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-green-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Feature</th>
            <th class="px-4 py-3 font-semibold">e-Visa</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Regular (Sticker) Visa</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Application Method</td><td class="px-4 py-3">100% online at indianvisaonline.gov.in</td><td class="px-4 py-3">Online form + in-person submission at Indian Mission/Post or VFS Global/BLS centre</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Eligible Countries</td><td class="px-4 py-3">166+ countries/territories (check indianvisaonline.gov.in for current list)</td><td class="px-4 py-3">All countries (subject to specific restrictions)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Entry Points</td><td class="px-4 py-3">Designated airports and seaports only</td><td class="px-4 py-3">Any authorised Immigration Check Post</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Processing Time</td><td class="px-4 py-3">Up to 72 hours (per Bureau of Immigration); apply at least 4 days before arrival</td><td class="px-4 py-3">Minimum 3 working days (varies by Mission)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Extensible?</td><td class="px-4 py-3">No — non-extendable (except e-Medical in some cases)</td><td class="px-4 py-3">Yes — through FRRO/FRO</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Convertible?</td><td class="px-4 py-3">No — non-convertible</td><td class="px-4 py-3">Possible in certain circumstances via FRRO</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Embassy Visit Required?</td><td class="px-4 py-3">No</td><td class="px-4 py-3">Yes (or authorised VFS/BLS centre)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Protected/Restricted Areas</td><td class="px-4 py-3">Not valid — separate permit required</td><td class="px-4 py-3">Separate Restricted Area Permit (RAP) required</td></tr>
        </tbody>
      </table>
    </div>

    <h2>e-Visa Eligible Countries</h2>

    <p>According to the Bureau of Immigration (indianvisaonline.gov.in), citizens of over <strong>166 countries and territories</strong> are currently eligible for India e-Visa. These include nationals of the United States, United Kingdom, all European Union member states, Canada, Australia, New Zealand, UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, South Africa, Japan, South Korea, Singapore, and many more.</p>

    <p>The complete and up-to-date list of eligible countries is published on the official portal at <strong>indianvisaonline.gov.in/evisa</strong>. The list is subject to change by the Government of India. Nationals of countries not on the eligible list must apply for a regular visa at the nearest Indian Mission or Post.</p>

    <div class="my-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl">
      <p class="font-bold text-red-900 mb-2">🚫 Important Restriction — Pakistani Nationals</p>
      <p class="text-red-800 text-sm">Pakistani nationals are not eligible for the India e-Visa scheme. Additionally, per the Bureau of Immigration (boi.gov.in), as of 27 April 2025, all existing valid visas (except medical visas, long-term visas, and diplomatic/official visas) issued to Pakistani nationals were revoked. Visa and immigration rules for Pakistani nationals are subject to specific government policy — verify directly with the nearest Indian Mission before travel.</p>
    </div>

    <h2>Visa on Arrival — Japan, South Korea & UAE</h2>

    <p>Per the official <strong>indianvisaonline.gov.in</strong> portal, Visa on Arrival is available at selected Indian airports for nationals of:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Japan</strong></li>
      <li><strong>South Korea</strong></li>
      <li><strong>UAE</strong> — only for UAE nationals who have previously obtained an e-Visa or regular/paper visa for India</li>
    </ul>

    <p>Japanese nationals are required to fill an application form and approach the "Visa Counter" at the designated airport on arrival, per Ministry of Home Affairs guidelines. An immigration officer then stamps the Visa on Arrival on the passport after checking eligibility criteria and payment of fee.</p>

    <h2>India e-Tourist Visa — Validity Options (2026)</h2>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-orange-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">e-Tourist Visa Type</th>
            <th class="px-4 py-3 font-semibold">Validity from Grant Date</th>
            <th class="px-4 py-3 font-semibold">Max Stay Per Visit</th>
            <th class="px-4 py-3 font-semibold">Max Stay Per Year</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Entries</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">30-Day e-Tourist Visa</td>
            <td class="px-4 py-3">1 year from date of grant of ETA</td>
            <td class="px-4 py-3">30 days from date of arrival</td>
            <td class="px-4 py-3">30 days</td>
            <td class="px-4 py-3">Double entry</td>
          </tr>
          <tr class="bg-white">
            <td class="px-4 py-3 font-semibold">1-Year e-Tourist Visa</td>
            <td class="px-4 py-3">1 year (365 days) from date of grant of ETA</td>
            <td class="px-4 py-3">Continuous stay not to exceed 180 days</td>
            <td class="px-4 py-3">180 days per calendar year</td>
            <td class="px-4 py-3">Multiple entry</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="px-4 py-3 font-semibold">5-Year e-Tourist Visa</td>
            <td class="px-4 py-3">5 years from date of grant of ETA</td>
            <td class="px-4 py-3">Continuous stay not to exceed 180 days</td>
            <td class="px-4 py-3">180 days per calendar year</td>
            <td class="px-4 py-3">Multiple entry</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p><strong>Note on 180-day rule:</strong> Per indianvisaonline.gov.in, if a 1-year or 5-year e-Tourist Visa holder intends to stay for more than 180 days continuously, they are required to register with the FRRO/FRO concerned within two weeks after the expiry of 180 days.</p>

    <h2>India e-Visa Fees (2026)</h2>

    <p>Fees for India e-Visas are set in US dollars and vary by nationality and visa duration. The fee schedule is published by the Bureau of Immigration. According to official fee schedules (updated February 2026) sourced via indianvisaonline.gov.in:</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-orange-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">e-Tourist Visa Type</th>
            <th class="px-4 py-3 font-semibold">Fee (Most Nationalities)</th>
            <th class="px-4 py-3 font-semibold">Period Note</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Bank Charge</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">30-Day e-Tourist Visa (Jul–Mar)</td><td class="px-4 py-3">USD 25</td><td class="px-4 py-3">Peak season rate</td><td class="px-4 py-3 text-gray-500">+2.5% (card) or +3% (PayPal)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">30-Day e-Tourist Visa (Apr–Jun)</td><td class="px-4 py-3">USD 10</td><td class="px-4 py-3">Off-season rate</td><td class="px-4 py-3 text-gray-500">+2.5% (card) or +3% (PayPal)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">1-Year e-Tourist Visa</td><td class="px-4 py-3">USD 40</td><td class="px-4 py-3">Most nationalities</td><td class="px-4 py-3 text-gray-500">+2.5% (card) or +3% (PayPal)</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">5-Year e-Tourist Visa</td><td class="px-4 py-3">USD 80 (most); USD 160 (US); USD 484 (UK)</td><td class="px-4 py-3">Varies by nationality</td><td class="px-4 py-3 text-gray-500">+2.5% (card) or +3% (PayPal)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">e-Business / e-Medical / e-Medical Attendant / e-Conference Visa</td><td class="px-4 py-3">USD 80 (most nationalities; varies by country)</td><td class="px-4 py-3">Country-specific</td><td class="px-4 py-3 text-gray-500">+2.5% (card) or +3% (PayPal)</td></tr>
        </tbody>
      </table>
    </div>

    <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">📋 Fee Verification</p>
      <p class="text-blue-800 text-sm">Fees above are based on the Bureau of Immigration official e-Visa fee schedule (updated 20 February 2026). Certain nationalities pay different rates — for example, Japan and Sri Lanka pay USD 25 flat for 30-day, 1-year, and 5-year visas; South Africa's 30-day visa is free. Always verify the exact fee for your nationality at the official portal <strong>indianvisaonline.gov.in/evisa</strong> before applying, as fees are country-specific and non-refundable.</p>
    </div>

    <h2>India e-Visa Photo Requirements (2026)</h2>

    <p>Uploading the correct photograph is mandatory for all India e-Visa applications submitted through <strong>indianvisaonline.gov.in</strong>. An incorrect photo is one of the most common reasons for application delays and rejections. The following specifications are sourced directly from the official Indian Visa Online portal's photo requirements page (indianvisaonline.gov.in/visa/instruction.html and indianvisaonline.gov.in/visa/VSS_IMAGE.pdf).</p>

    <div class="overflow-x-auto my-8 rounded-2xl shadow-md border border-slate-200">
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="bg-orange-700 text-white">
            <th class="px-4 py-3 font-semibold rounded-tl-2xl">Requirement</th>
            <th class="px-4 py-3 font-semibold rounded-tr-2xl">Official Specification (indianvisaonline.gov.in)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Photo Shape</td><td class="px-4 py-3">Square — width and height must be equal</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Photo Size (Print)</td><td class="px-4 py-3">2 × 2 inches (51mm × 51mm)</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Head Height</td><td class="px-4 py-3">1 inch to 1⅜ inches (25mm to 35mm) from chin to top of hair</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">File Format (Digital)</td><td class="px-4 py-3">JPEG / JPG only</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">File Size (e-Visa digital upload)</td><td class="px-4 py-3">Between 10 KB and 1 MB</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">File Size (Regular visa / BLS / VFS)</td><td class="px-4 py-3">Between 10 KB and 300 KB</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Minimum Resolution</td><td class="px-4 py-3">350 × 350 pixels (square); 600 × 600 pixels recommended</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Background</td><td class="px-4 py-3">Plain white or off-white — no patterns, shadows, or objects</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Expression</td><td class="px-4 py-3">Neutral — mouth closed, eyes open, looking directly at camera</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Glasses</td><td class="px-4 py-3">Not permitted (e-Visa). Regular visa: thin-framed prescription glasses with no reflections or glare may be accepted — confirm with the Mission</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Head Coverings</td><td class="px-4 py-3">Not permitted except for religious reasons; face must be fully visible from chin to forehead</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Photo Age</td><td class="px-4 py-3">Recent — taken within the last 6 months, must match current appearance</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Selfies</td><td class="px-4 py-3">Not accepted — photo must be taken by another person</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Editing / Filters</td><td class="px-4 py-3">Not permitted — natural skin tone and colour required</td></tr>
          <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Colour</td><td class="px-4 py-3">Full colour — black-and-white photos not accepted</td></tr>
          <tr class="bg-white"><td class="px-4 py-3 font-semibold">Clothing</td><td class="px-4 py-3">Avoid white-coloured and uniform clothing (may blend with background)</td></tr>
        </tbody>
      </table>
    </div>

    <div class="my-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
      <p class="font-bold text-amber-900 mb-2">⚠️ India Visa Photo vs Indian Passport Photo — These Are Different</p>
      <p class="text-amber-800 text-sm">India visa photos are <strong>square (51×51mm / 2×2 inch)</strong>. Indian passport photos for the Passport Seva portal are <strong>rectangular (35×45mm)</strong>. These are two entirely different specifications. Do not use an Indian passport photo for a visa application, or vice versa.</p>
    </div>

    <h3>Common India Visa Photo Rejection Reasons</h3>
    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li>Photo is not square (rectangular photos are rejected)</li>
      <li>Face not centred or head tilted</li>
      <li>Eyes not looking directly at the camera</li>
      <li>Shadows on face or background</li>
      <li>Glasses present (especially for e-Visa applications)</li>
      <li>Photo taken as a selfie</li>
      <li>File size exceeds the limit (over 1 MB for e-Visa, or 300 KB for regular visa)</li>
      <li>Non-JPEG file format (PNG, HEIC, PDF not accepted)</li>
      <li>Photo older than 6 months</li>
      <li>Background not plain white/off-white</li>
      <li>Heavy editing, filters, or colour alteration applied</li>
    </ul>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">
        Check Your India Visa Photo for Free
      </p>
      <p class="text-gray-600 mb-4 text-sm">Automatically verify your photo meets India e-Visa standards — 2×2 inch square format, white background, JPEG under 1 MB — before you submit your application at indianvisaonline.gov.in.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=india-visa" class="px-6 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition duration-200 shadow">Check My India Visa Photo</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-orange-600 hover:underline font-medium">PixPassport</a></p>
    </div>

    <h2>Required Documents for India e-Visa Application</h2>

    <p>According to the official Indian e-Visa portal (indianvisaonline.gov.in), the following documents must be submitted for an e-Visa application:</p>

    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>Valid passport:</strong> Must have at least <strong>6 months validity</strong> from the date of arrival in India, and at least <strong>2 blank pages</strong> for immigration stamping.</li>
      <li><strong>Colour JPEG photograph:</strong> Meeting the specifications above (2×2 inch square, white background, JPEG, 10 KB–1 MB).</li>
      <li><strong>Scanned copy of passport biographical page (data page):</strong> PDF format, maximum 300 KB, showing your personal details and photograph clearly.</li>
      <li><strong>Return/onward ticket:</strong> Proof of travel out of India.</li>
      <li><strong>Proof of sufficient funds:</strong> For your intended stay.</li>
      <li><strong>Address in India:</strong> Hotel booking or host address (required in the application form).</li>
    </ul>

    <p><strong>Additional documents by visa type (per indianvisaonline.gov.in):</strong></p>
    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>e-Business Visa:</strong> Business card, details of the sending and receiving organisations.</li>
      <li><strong>e-Medical Visa:</strong> Letter from the recognised/specialised hospital in India confirming treatment, appointment details.</li>
      <li><strong>e-Conference Visa:</strong> Invitation letter from the organising body.</li>
    </ul>

    <h2>Step-by-Step India e-Visa Application Process</h2>

    <p>The following steps reflect the official application process as described on <strong>indianvisaonline.gov.in/evisa</strong>:</p>

    <ol class="list-decimal pl-6 my-4 space-y-3 text-gray-700">
      <li>Visit the official portal: <strong>indianvisaonline.gov.in/evisa</strong> and click <em>"Apply here for e-Visa"</em>.</li>
      <li>Fill in the online application form with your passport details, travel plans, address in India, and personal information. Save your <strong>Temporary Application ID</strong> in case you need to return to complete the form.</li>
      <li>Upload your square JPEG photograph (10 KB–1 MB) and a scanned PDF of your passport's biographical page (max 300 KB).</li>
      <li>Pay the visa fee online using a credit or debit card, or PayPal. A banking charge applies (2.5% for cards, per official FAQs). Note: the fee is non-refundable.</li>
      <li>Await your Electronic Travel Authorisation (ETA) by email. Processing typically takes <strong>up to 72 hours</strong> per the Bureau of Immigration, though applicants should apply well in advance.</li>
      <li>Check your application status at indianvisaonline.gov.in. Ensure the status shows <strong>"Granted"</strong> before travelling.</li>
      <li><strong>Print a copy of your ETA</strong> and carry it with you — it must be presented at the Immigration Check Post on arrival, where the e-Visa will be stamped on your passport.</li>
    </ol>

    <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
      <p class="font-bold text-blue-900 mb-2">📅 How Far in Advance to Apply</p>
      <p class="text-blue-800 text-sm">Per official guidance on indianvisaonline.gov.in: <strong>30-day e-Tourist Visa</strong> — can be applied up to 120 days before arrival date. <strong>1-year and 5-year e-Tourist Visas</strong> — can also be applied up to 120 days before the intended arrival date. Apply at least 4 business days before your travel date to account for processing time, as per Bureau of Immigration guidelines.</p>
    </div>

    <h2>e-Arrival Card — Mandatory for All Arrivals (2026)</h2>

    <p>Per the Bureau of Immigration (boi.gov.in and indianvisaonline.gov.in), all foreign nationals — including OCI card holders — are now required to submit an <strong>e-Arrival Card online within 72 hours before arrival in India</strong>. This is separate from the visa and is for immigration record purposes.</p>

    <p>The e-Arrival Card can be submitted at <strong>boi.gov.in</strong>, <strong>indianvisaonline.gov.in</strong>, or through the official <strong>"Indian Visa Su-Swagatam" mobile app</strong>.</p>

    <h2>Designated Entry Points for e-Visa Holders</h2>

    <p>e-Visa holders can only enter India through designated Immigration Check Posts. Per indianvisaonline.gov.in, the following airports and seaports are designated for e-Visa entry:</p>

    <h3>Designated Airports (33 airports, per official list)</h3>
    <p>Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Goa (Dabolim), Goa (Mopa), Jaipur, Cochin, Ahmedabad, Amritsar, Pune, Varanasi, Trivandrum, Lucknow, Gaya, Bagdogra, Bhubaneswar, Calicut, Chandigarh, Coimbatore, Guwahati, Indore, Kannur, Madurai, Mangalore, Nagpur, Port Blair, Surat, Tiruchirapalli, Vijayawada, and Visakhapatnam.</p>

    <h3>Designated Seaports (for general e-Visa entry)</h3>
    <p>Agatti, Calicut, Chennai, Cochin, Goa, Kamarajar, Kandla, Kattupalli, Kolkata, Kollam, Mangalore, Mumbai, Mundra, Nhava Sheva, Port Blair, Vallarpadam, Visakhapatnam, Vizhinjam, and Vizhinjam International.</p>

    <p><strong>Note:</strong> Entry by cruise ship is allowed through 5 designated seaports: <strong>Mumbai, Chennai, Cochin, Goa (Mormugao), and New Mangalore</strong>, per the official e-Visa FAQ.</p>

    <p>e-Visa holders can <strong>exit from any authorised Immigration Check Post</strong> in India — they are not restricted to departure from the same airport they arrived at.</p>

    <h2>FRRO Registration</h2>

    <p>Per Ministry of Home Affairs guidelines, foreign nationals staying in India for more than 180 days on a 1-year or 5-year e-Tourist Visa are required to register with the <strong>Foreigners Regional Registration Office (FRRO) or Foreigners Registration Office (FRO)</strong> within two weeks after the expiry of 180 days.</p>

    <p>Foreign nationals on certain long-stay regular visas (such as student, employment, and research visas) may also have FRRO registration requirements. Confirm your specific obligations based on your visa type and duration of stay. FRRO services are accessible through the online portal at <strong>indianfrro.gov.in</strong>.</p>

    <h2>OCI Card — Overseas Citizen of India</h2>

    <p>Per the Bureau of Immigration (boi.gov.in), the OCI (Overseas Citizen of India) Card is a <strong>lifelong multiple-entry visa</strong> issued to a person who is a citizen of another country but who, or whose parents, grandparents, or great-grandparents, was a citizen of India at the time of, or at any time after, the commencement of the Constitution of India.</p>

    <p>An OCI card is not a visa in the traditional sense, but functions as a permanent travel document for entry into India without requiring a separate visa. OCI holders are, however, still required to submit the e-Arrival Card before arriving in India.</p>

    <h2>Special Rules for Specific Nationalities</h2>

    <h3>Nepal and Bhutan Nationals</h3>
    <p>Citizens of Nepal and Bhutan do not require a visa to enter India. However, if entering from China, Macau, Hong Kong, or Pakistan, a passport and visa are required. (Source: Bureau of Immigration, boi.gov.in)</p>

    <h3>Maldivian Nationals</h3>
    <p>Maldivian citizens may visit India visa-free for up to 90 days for tourism with a valid Maldivian passport, per the Incredible India government portal.</p>

    <h3>Pakistani Nationals</h3>
    <p>Pakistani nationals are not eligible for the India e-Visa. Per Bureau of Immigration (boi.gov.in), effective 27 April 2025, all valid visas (except medical visas, long-term visas, and diplomatic/official visas) issued to Pakistani nationals were revoked. Persons of Pakistani origin (where the person or either parent or grandparent was born in or permanently resident in Pakistan) are also excluded from the e-Visa scheme. Always check with the nearest Indian Mission for current rules.</p>

    <h3>Dual Citizens</h3>
    <p>India does not permit dual citizenship. Indian-born individuals who have acquired foreign citizenship must use their foreign passport to enter India. OCI card holders use their foreign passport in conjunction with their OCI card.</p>

    <h3>Yellow Fever Vaccination Requirement</h3>
    <p>Per the official e-Visa FAQ on indianvisaonline.gov.in: all foreigners arriving in India within 6 days of departure from any <strong>Yellow Fever endemic country</strong> are required to possess (in original) a valid Yellow Fever vaccination certificate at the time of arrival. The list of endemic countries is published by the Ministry of Health and Family Welfare at <strong>mohfw.gov.in</strong>.</p>

    <h2>Visa Extension and Conversion</h2>

    <p>Per the Bureau of Immigration:</p>
    <ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">
      <li><strong>e-Visa is non-extendable</strong> in most cases. Extension of e-Medical Visa may be granted up to 6 months on a case-by-case basis by the FRRO/FRO.</li>
      <li><strong>e-Visa is non-convertible</strong> — it cannot be converted to any other visa category.</li>
      <li>Extension of regular visas may be granted by the FRRO/FRO. Any further extension beyond what FRRO can grant must be approved by the Ministry of Home Affairs.</li>
    </ul>

    <h2>Overstay Penalties</h2>

    <p>Overstaying your Indian visa is a serious immigration violation. Foreign nationals who overstay are subject to penalties, deportation, and potential bans from future entry into India. Per the Bureau of Immigration, foreign nationals in India must comply with the terms and conditions of their visa including duration of stay. If you need to extend your stay, contact your jurisdictional FRRO/FRO before your visa expires.</p>

    <h2>Conference Clearance for Events (New — 2026)</h2>

    <p>Per the Bureau of Immigration (boi.gov.in), a new online portal has been launched at <strong>conference.epolclearance.gov.in</strong> — the Conference Clearance System — for expeditious processing of political clearances for foreign nationals participating in conferences, seminars, workshops, and sports events organised in India by Government/autonomous institutions/private bodies.</p>

    <h2>Frequently Asked Questions (FAQ)</h2>

    <div class="my-6 space-y-5">

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Can I apply for an India e-Visa if my passport has less than 6 months validity?</p>
        <p class="text-gray-700 text-sm">No. Per indianvisaonline.gov.in, your passport must have at least <strong>6 months validity from the date of arrival in India</strong> to be eligible for an e-Visa. You must also have at least 2 blank pages available in your passport.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Can I visit Restricted or Protected Areas on an India e-Visa?</p>
        <p class="text-gray-700 text-sm">No. Per the Bureau of Immigration, e-Visa is <strong>not valid for visiting Protected Areas, Restricted Areas, or Cantonment Areas</strong>. A separate permit from the relevant civil authority is required. Some areas such as Arunachal Pradesh, Sikkim border zones, Andaman & Nicobar Islands, and Lakshadweep require separate permits — check with the Indian Mission before travel.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Is the India e-Visa fee refundable if my visa is rejected?</p>
        <p class="text-gray-700 text-sm">No. Per the official FAQ on indianvisaonline.gov.in: <em>"e-Visa processing fee once submitted is non-refundable as the fee is for processing of the application and is not dependent on either grant or rejection of the application."</em></p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Can I enter India by cruise ship on an e-Visa?</p>
        <p class="text-gray-700 text-sm">Yes. Per indianvisaonline.gov.in, entry by cruise ship is permitted through 5 designated seaports: <strong>Mumbai, Chennai, Cochin, Goa (Mormugao), and New Mangalore</strong>.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: Do I need to submit an e-Arrival Card even if I have a regular visa?</p>
        <p class="text-gray-700 text-sm">Yes. Per the Bureau of Immigration (boi.gov.in), all foreign nationals — including OCI card holders — must submit the e-Arrival Card online within 72 hours before arrival in India, regardless of visa type. This can be done at boi.gov.in, indianvisaonline.gov.in, or via the official "Indian Visa Su-Swagatam" mobile app.</p>
      </div>

      <div class="p-5 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="font-bold text-gray-800 mb-2">Q: How do I check my India e-Visa application status?</p>
        <p class="text-gray-700 text-sm">You can check your application status at <strong>indianvisaonline.gov.in</strong>. Ensure the status shows "Granted" before travelling. Your ETA will also be sent to your registered email address.</p>
      </div>

    </div>

    <div class="my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
      <h4 class="text-xl font-bold mb-4 text-center">Official Sources Used in This Guide</h4>
      <div class="flex flex-col gap-3 text-center">
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🇮🇳 Primary Source</div>
          <div class="text-sm font-bold">Indian Visa Online — Bureau of Immigration, Ministry of Home Affairs</div>
          <div class="text-xs text-slate-300 mt-1">indianvisaonline.gov.in — Official Government of India visa application portal (e-Visa, Regular Visa, OCI)</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🏛️ Immigration Authority</div>
          <div class="text-sm font-bold">Bureau of Immigration — Ministry of Home Affairs, Government of India</div>
          <div class="text-xs text-slate-300 mt-1">boi.gov.in — Primary authority for entry, stay, and exit rules for foreign nationals in India</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🏛️ Ministry</div>
          <div class="text-sm font-bold">Ministry of Home Affairs, Government of India</div>
          <div class="text-xs text-slate-300 mt-1">mha.gov.in — Official visa categories and rules document (AnnexIII)</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🌐 Ministry</div>
          <div class="text-sm font-bold">Ministry of External Affairs, Government of India</div>
          <div class="text-xs text-slate-300 mt-1">mea.gov.in — Visa exemption agreements and bilateral arrangements</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl">
          <div class="text-xs text-slate-400 mb-1">🌏 Tourism</div>
          <div class="text-sm font-bold">Incredible India — Official Tourism Portal</div>
          <div class="text-xs text-slate-300 mt-1">incredibleindia.gov.in — Visa and immigration guidance for international visitors</div>
        </div>
        <div class="p-4 bg-white/10 rounded-xl text-sm text-slate-300">
          All specifications were verified against official sources as of May 2026. Immigration rules and visa fees can change at any time. Always verify the latest requirements at <strong>indianvisaonline.gov.in</strong> and <strong>boi.gov.in</strong> before submitting your application or travelling.
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">
        Get Your India Visa Photo Right — First Time
      </p>
      <p class="text-gray-600 mb-4 text-sm">Automatically verify and prepare your photo to meet India e-Visa standards — 2×2 inch square format, white background, JPEG under 1 MB — before submitting your application at indianvisaonline.gov.in.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassport.com/passport-photo-online?type=india-visa" class="px-6 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition duration-200 shadow">Prepare My India Visa Photo</a>
        <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg border border-orange-600 text-orange-700 font-medium hover:bg-orange-50 transition duration-200">Apply at Official Portal →</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassport.com" class="text-orange-600 hover:underline font-medium">PixPassport</a></p>
    </div>

    <!--
      Meta Title: India Visa Requirements for Foreigners 2026 — Complete Guide
      Meta Description: Official 2026 India visa guide for foreigners. e-Visa eligibility (166+ countries), types, fees, photo requirements (2×2 inch JPEG), entry airports, FRRO rules. Verified from indianvisaonline.gov.in and boi.gov.in.
      Slug: india-visa-requirements-foreigners-2026
      Last Updated: May 2026
    -->
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added India visa requirements 2026 blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);