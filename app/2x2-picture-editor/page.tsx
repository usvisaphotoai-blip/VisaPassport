import { Metadata } from "next";
import PassportMakerApp from "../passport-size-photo-maker/PassportMakerApp";


export const metadata: Metadata = {
  title: "2x2 Picture Editor in En – Free Online 2x2 Photo Maker",
  description:
    "Use our free 2x2 picture editor in en to create compliant 2x2 inch photos online. Automatically crop, edit, and fix the background for passport and visa photos.",
  alternates: {
    canonical: "/2x2-picture-editor",
  },
  openGraph: {
    title: "2x2 Picture Editor in En",
    description:
      "Create compliant 2x2 photos online. Upload a photo, and get a print-ready 2x2 photo instantly.",
    type: "website",
  },
};

const TRUST_ITEMS = [
  { icon: "🔒", title: "Privacy first", desc: "Photos never stored on our servers" },
  { icon: "✅", title: "ISO compliant", desc: "Meets ICAO 9303 biometric standards" },
  { icon: "⚡", title: "Instant result", desc: "AI processing in under 10 seconds" },
  { icon: "🆓", title: "Free preview", desc: "Check before you pay anything" },
];

export default function TwoByTwoPictureEditorPage() {
 

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Tool Component */}
      <PassportMakerApp title={' 2x2 Photo Editor Online: Get Compliant Passport & Visa Photos in Seconds'} subtitle={''} defaultDoc="us-passport" />

      {/* Trust Badges */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST_ITEMS.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-500/10"
              >
                <span className="text-2xl block mb-2" role="img" aria-hidden>
                  {icon}
                </span>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-snug hidden sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <article className="text-slate-600 leading-relaxed space-y-16">
          
          {/* Intro */}
          <div>
      
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Your photo serves as the <strong className="text-slate-900">single most critical element</strong> of any passport or visa application. The U.S. Department of State explicitly warns that unacceptable photos remain the number one reason applications get suspended. Our 2x2 picture editor eliminates rejection risks by automating every technical requirement mandated by federal guidelines.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              You upload a selfie. Our AI crops, resizes, and replaces the background. You download a print-ready, fully compliant 2x2 inch photo in seconds.
            </p>
          </div>

          {/* Section 1: Who Needs This */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              Documents That Require a 2x2 Inch Photo
            </h2>
            <p className="mb-6">
              A 2x2 inch photograph (51 x 51 mm) functions as the mandatory biometric identifier across multiple U.S. agencies and international consulates. You must submit this exact format for:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-lime-500 rounded-full inline-block"></span>
                  U.S. Department of State
                </h3>
                <ul className="space-y-2.5 text-slate-600 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    U.S. Passport Books and Passport Cards
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    Nonimmigrant Visas (Form DS-160)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    Immigrant Visas (Form DS-260)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    Diversity Visa Lottery Entries
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-lime-500 rounded-full inline-block"></span>
                  Other Official Uses
                </h3>
                <ul className="space-y-2.5 text-slate-600 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    Green Cards (Permanent Resident Cards)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    U.S. Nursing Licenses
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    India, Kenya, Philippines Visas
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-lime-600 mt-1 text-sm">●</span>
                    Saudi Arabia, Thailand, Vietnam Permits
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Complete Official Specs */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              Complete U.S. Government Technical Specifications
            </h2>
            <p className="mb-6">
              We engineer our tool around the exact standards published by the U.S. Department of State. Review the mandatory requirements below. Any deviation causes rejection.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold text-slate-900 uppercase tracking-wide text-xs">Requirement</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-900 uppercase tracking-wide text-xs">Exact Specification</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-900 uppercase tracking-wide text-xs">Our Tool</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Photo Dimensions</td>
                    <td className="px-5 py-3.5 text-slate-600">Exactly 2 x 2 inches (51 x 51 mm)</td>
                    <td className="px-5 py-3.5 text-lime-600 font-semibold">✓ Auto-cropped</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Head Size</td>
                    <td className="px-5 py-3.5 text-slate-600">1 to 1 3/8 inches (25–35 mm) chin to top of head; 50–69% of frame height</td>
                    <td className="px-5 py-3.5 text-lime-600 font-semibold">✓ Auto-positioned</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Background</td>
                    <td className="px-5 py-3.5 text-slate-600">Plain white or off-white; zero shadows, textures, or objects</td>
                    <td className="px-5 py-3.5 text-lime-600 font-semibold">✓ AI background removal</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Recency</td>
                    <td className="px-5 py-3.5 text-slate-600">Taken within the last 6 months</td>
                    <td className="px-5 py-3.5 text-slate-400">— User provided</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Color Profile</td>
                    <td className="px-5 py-3.5 text-slate-600">Full color; black and white not accepted</td>
                    <td className="px-5 py-3.5 text-lime-600 font-semibold">✓ Color preserved</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Expression</td>
                    <td className="px-5 py-3.5 text-slate-600">Neutral; both eyes open; mouth closed; no teeth showing</td>
                    <td className="px-5 py-3.5 text-slate-400">— User provided</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Eyeglasses</td>
                    <td className="px-5 py-3.5 text-slate-600">Not allowed unless medical exception with signed doctor's statement</td>
                    <td className="px-5 py-3.5 text-slate-400">— User responsibility</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Head Coverings</td>
                    <td className="px-5 py-3.5 text-slate-600">Prohibited unless daily religious wear; full face must show; no shadows</td>
                    <td className="px-5 py-3.5 text-slate-400">— User responsibility</td>
                  </tr>
                  <tr className="hover:bg-lime-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800">Attire</td>
                    <td className="px-5 py-3.5 text-slate-600">Daily clothing; no uniforms; no headphones or hands-free devices</td>
                    <td className="px-5 py-3.5 text-slate-400">— User provided</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-lime-50 border-l-4 border-lime-500 p-5 rounded-r-lg">
              <p className="text-lime-900 font-semibold mb-1">Digital File Requirements (Diversity Visa & DS-160)</p>
              <p className="text-lime-800 text-sm">
                JPEG format only. Maximum 240 kB file size. Square aspect ratio. Exactly 600 x 600 pixels for DV entries. Scanned photos require 300 pixels per inch resolution.
              </p>
            </div>
          </div>

          {/* Section 3: How It Works */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              How Our 2x2 Photo Editor Works
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Upload Your Portrait</h3>
                <p className="text-sm text-slate-600">Take a new photo with your phone or upload an existing one. Stand against any plain wall. Our system accepts JPG, PNG, HEIC, and HEIF formats.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-slate-900 mb-2">AI Processing</h3>
                <p className="text-sm text-slate-600">Our engine detects your face, removes the original background, replaces it with pure white, crops to the exact head-size ratio, and outputs a 2x2 inch file.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Download or Print</h3>
                <p className="text-sm text-slate-600">Preview your result free. Download a digital copy or order professional prints on photo-quality paper. We ship prints within 2–3 business days.</p>
              </div>
            </div>
          </div>

          {/* Section 4: DIY Photography Guide */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              How to Take an Acceptable Photo at Home
            </h2>
            <p className="mb-6">
              You can avoid pharmacy photo booths entirely. Follow this checklist and use your smartphone to capture a compliant image.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span className="bg-lime-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span>
                  Correct Practices
                </h3>
                <ul className="space-y-3 text-slate-600 list-none pl-0">
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-lime-500 before:rounded-full">
                    Stand 3–4 feet from a plain white or off-white wall.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-lime-500 before:rounded-full">
                    Face the camera directly. Center your head and keep it fully visible.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-lime-500 before:rounded-full">
                    Use soft, even daylight from in front of you. Avoid harsh overhead lights.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-lime-500 before:rounded-full">
                    Keep hair away from your eyes. Both eyes must show clearly.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-lime-500 before:rounded-full">
                    Wear daily clothing. Religious attire worn daily is acceptable.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✗</span>
                  Common Mistakes to Avoid
                </h3>
                <ul className="space-y-3 text-slate-600 list-none pl-0">
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">
                    Do not wear eyeglasses. Frames, glare, and shadows cause automatic rejection.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">
                    Do not smile or show teeth. Maintain a strictly neutral expression.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">
                    Do not tilt your head. Face forward without any angle or rotation.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">
                    Do not use filters, retouching apps, or digital enhancements.
                  </li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">
                    Do not take a photo of an existing printed photo. Submit an original digital file only.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Baby & Toddler Photos */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              Special Instructions for Infant and Toddler Photos
            </h2>
            <p className="mb-6">
              Photographing babies for official documents presents unique challenges. The U.S. Department of State provides specific guidance.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-lime-50 border border-lime-200 rounded-xl p-6">
                <div className="flex gap-3 items-start">
                  <span className="text-3xl">👶</span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Method 1: Lay the Baby Down</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Lay your baby on their back on a plain white or off-white sheet. Stand directly above them and capture the photo looking straight down. Ensure no shadows fall on the baby's face. No other person or object may appear in the frame.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-lime-50 border border-lime-200 rounded-xl p-6">
                <div className="flex gap-3 items-start">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Method 2: Use a Car Seat</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Drape a plain white or off-white sheet over a car seat. Place your child securely inside and photograph from the front. This supports the baby's head and provides a clean, compliant background.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Appearance Changes */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              When You Must Take a New Photo: Appearance Changes
            </h2>
            <p className="mb-6">
              The U.S. Department of State requires a new photograph if your appearance has changed significantly since your last application. Use this guide to determine if you need an updated picture.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lime-700">Minor Changes — No New Photo Needed</h3>
                <ul className="space-y-2 text-slate-600 list-none pl-0">
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-lime-400 before:rounded-full">Growing or removing a beard</li>
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-lime-400 before:rounded-full">Coloring your hair</li>
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-lime-400 before:rounded-full">Normal aging process</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-red-600">Significant Changes — New Photo Required</h3>
                <ul className="space-y-2 text-slate-600 list-none pl-0">
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-red-400 before:rounded-full">Major facial surgery or trauma</li>
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-red-400 before:rounded-full">Adding or removing numerous large piercings or tattoos</li>
                  <li className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-red-400 before:rounded-full">Significant weight loss or gain</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 7: FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-lime-500">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <details className="border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center hover:bg-lime-50 transition-colors">
                  Can I wear glasses in my passport or visa photo?
                  <span className="text-lime-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                  <p>No. Since 2016, the U.S. Department of State prohibits eyeglasses in all passport and visa photos. The only exception requires a signed medical statement from a doctor confirming recent ocular surgery that makes removal impossible. Even with a medical exception, frames must not cover the eyes, and no glare or shadows may appear.</p>
                </div>
              </details>
              <details className="border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center hover:bg-lime-50 transition-colors">
                  What file format and size do I need for online submission?
                  <span className="text-lime-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                  <p>For the DS-160 nonimmigrant visa and Diversity Visa lottery, you need a JPEG file. The DV program requires exactly 600 x 600 pixels and a file size under 240 kB. Scanned photos must use 300 pixels per inch resolution. Our tool outputs files that meet all these specifications automatically.</p>
                </div>
              </details>
              <details className="border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center hover:bg-lime-50 transition-colors">
                  How many photos do I need for an immigrant visa interview?
                  <span className="text-lime-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                  <p>Applicants using Form DS-260 for immigrant visas must bring two identical 2x2 inch photos printed on photo-quality paper to their interview. Digital copies are not sufficient for the in-person appointment.</p>
                </div>
              </details>
              <details className="border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center hover:bg-lime-50 transition-colors">
                  Does this tool work for non-U.S. visa applications?
                  <span className="text-lime-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                  <p>Yes. While the 2x2 inch format originates from U.S. requirements, many countries accept or require it. This includes India, Kenya, Philippines, Saudi Arabia, Thailand, Vietnam, and several Schengen-area nations. Always verify specific requirements on the destination country's official consulate website.</p>
                </div>
              </details>
              <details className="border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center hover:bg-lime-50 transition-colors">
                  What guarantees do you offer for acceptance?
                  <span className="text-lime-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                  <p>Our AI adheres strictly to the biometric standards published in the ICAO 9303 specification and the U.S. Department of State's Photo Composition Template. While final acceptance always rests with the adjudicating officer, our tool removes the technical errors that cause the vast majority of rejections. If a technical issue arises with your output, we reprocess it at no cost.</p>
                </div>
              </details>
            </div>
          </div>


        </article>
      </div>
    </div>
  );
}