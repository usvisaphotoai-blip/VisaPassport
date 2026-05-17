import { Metadata } from "next";
import PrintTemplateApp from "./PrintTemplateApp";

export const metadata: Metadata = {
  title: "Passport Photo Print Template Generator – Print at Home",
  description:
    "Create a printable passport photo sheet instantly. Upload one passport photo and generate multiple copies on A4, 4×6, or custom paper sizes. Free online template tool.",
  alternates: {
    canonical:
      "https://www.pixpassport.com/passport-photo-print-template-generator",
  },
  openGraph: {
    title: "Passport Photo Print Template Generator",
    description:
      "Create a printable passport photo sheet instantly. Generate multiple copies on A4, 4×6, or custom paper sizes.",
    type: "website",
    url: "https://www.pixpassport.com/passport-photo-print-template-generator",
  },
};

const STATS = [
  { value: "4×6 to A4", label: "Paper Sizes" },
  { value: "Multiple", label: "Layout Options" },
  { value: "300 DPI", label: "High-Res Print" },
  { value: "Free", label: "Template Tool" },
];

const TRUST_ITEMS = [
  {
    icon: "🖨️",
    title: "Print-Ready",
    desc: "Optimized for home & store printing",
  },
  { icon: "✂️", title: "Crop Lines", desc: "Easy cutting with guide lines" },
  { icon: "⚡", title: "Instant", desc: "Generate sheets in seconds" },
  { icon: "🔒", title: "Private", desc: "All processing happens securely" },
];

const faqs = [
  {
    q: "How many passport photos fit on a 4x6 inch paper?",
    a: "A standard 4x6 inch (10x15 cm) paper can comfortably fit up to 6 standard 2x2 inch (51x51 mm) or 35x45 mm passport photos. Our tool automatically arranges them for optimal printing with crop lines.",
  },
  {
    q: "How do I print passport photos at home?",
    a: "Simply upload your cropped passport photo to our tool, select your paper size (e.g., 4x6 or A4), and choose how many copies you want. Click 'Generate' to download a 300 DPI high-resolution JPG or PDF. You can then print this file using your home color printer on high-quality photo paper.",
  },
  {
    q: "Is it free to create a print template?",
    a: "Yes, our passport photo print template generator is completely free. You can generate and download your print-ready layout without any cost.",
  },
  {
    q: "Do I need special photo paper?",
    a: "Yes, for official use, you should print your passport photos on high-quality glossy or matte photo paper (depending on your country's requirements). Standard printer paper is usually rejected by government agencies.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Passport Photo Print Template Generator",
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function PrintTemplateGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Tool Component */}
        <PrintTemplateApp />

        {/* Hero Info Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Passport Photo Print Template Generator
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Create a printable passport photo sheet instantly. Upload one
              photo and generate multiple copies on A4, 4×6, or custom paper
              sizes for printing at home.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-8 max-w-xl mx-auto sm:max-w-none">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-slate-50 rounded-xl px-3 py-3 sm:py-4 border border-slate-100"
                >
                  <p className="text-xl sm:text-2xl font-black text-lime-600 leading-none">
                    {value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRUST_ITEMS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 text-left transition-transform hover:-translate-y-0.5"
                >
                  <span
                    className="text-xl sm:text-2xl block mb-1.5"
                    role="img"
                    aria-hidden
                  >
                    {icon}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                    {title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug hidden sm:block">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Content & FAQ */}
        <div className="bg-white py-14 sm:py-20 mt-6 sm:mt-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                How to Print Passport Photos at Home
              </h2>
              <p className="text-slate-600 text-lg">
                Stop paying exorbitant fees at pharmacies or photo studios. If
                you already have a digital passport photo, you can print it
                yourself for cents.
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
              <h3 className="text-xl font-bold text-slate-800">
                1. Prepare your photo
              </h3>
              <p>
                Make sure your digital passport photo meets all official
                requirements (background color, expression, dimensions). If you
                haven't formatted it yet, use our{" "}
                <a
                  href="/passport-photo-online"
                  className="text-lime-600 underline"
                >
                  Passport Photo Online tool
                </a>{" "}
                to automatically crop and format your image.
              </p>

              <h3 className="text-xl font-bold text-slate-800">
                2. Generate a print template
              </h3>
              <p>
                Upload your formatted digital photo to the generator above.
                Select the paper size you have in your printer (4x6 inches is
                standard for photo paper, but A4 works too). Choose how many
                copies you want. The tool will automatically arrange them with
                precise crop lines.
              </p>

              <h3 className="text-xl font-bold text-slate-800">
                3. Print and cut
              </h3>
              <p>
                Download the generated high-resolution (300 DPI) JPG or PDF.
                Print it at 100% scale (do not check "fit to page"). Use the
                thin black crop lines as a guide to cut out your photos
                perfectly.
              </p>
            </div>

            <div className="mt-14">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Extended SEO Content */}
        <div className="mt-20 prose prose-slate max-w-none">
          <h2 className="text-3xl font-black text-slate-900">
            Free Passport Photo Print Template Generator
          </h2>

          <p>
            Printing passport photos at home has become one of the easiest and
            most affordable ways to create official photo prints without
            visiting a photo studio or pharmacy. Instead of paying high printing
            fees for multiple copies, you can simply upload one passport image
            and automatically generate a complete printable sheet in seconds.
          </p>

          <p>
            Our free Passport Photo Print Template Generator helps users create
            high-quality print-ready layouts for passport, visa, ID card, and
            biometric photos. Whether you need 4 photos, 8 photos, 12 photos, or
            20 passport photos on one sheet, the tool automatically arranges
            everything for perfect printing.
          </p>

          <h2>How to Use the Passport Photo Print Tool</h2>

          <p>Using the tool requires only three simple steps:</p>

          <ol>
            <li>Upload your passport photo from your device.</li>

            <li>
              Select your preferred paper size such as:
              <ul>
                <li>4×6 photo paper</li>
                <li>5×7 paper</li>
                <li>A4 paper</li>
                <li>Letter paper</li>
                <li>Custom dimensions</li>
              </ul>
            </li>

            <li>Choose the number of copies and click Generate.</li>
          </ol>

          <p>
            The system instantly creates a high-resolution printable passport
            photo sheet that you can download as JPG, PNG, or PDF.
          </p>

          <h2>Print Multiple Passport Photos from One Image</h2>

          <p>
            Many people only have one digital passport photo but need several
            printed copies for passport applications, visa applications,
            government documents, student IDs, driving licenses, employment
            forms, or travel documents.
          </p>

          <p>
            Instead of manually copying and resizing images using complicated
            editing software, our template generator automatically duplicates
            your photo and places it correctly on the page.
          </p>

          <p>Popular layouts include:</p>

          <ul>
            <li>4 passport photos on one sheet</li>
            <li>6 passport photos on 4×6 paper</li>
            <li>8 passport photos on A4</li>
            <li>12 passport photos on one page</li>
            <li>16 passport photos on one sheet</li>
            <li>20 passport photos on one sheet</li>
            <li>Custom layouts</li>
          </ul>

          <h2>Why Print Passport Photos at Home?</h2>

          <p>
            Traditional passport photo printing services often charge much more
            than the actual printing cost. Home printing offers several
            advantages:
          </p>

          <ul>
            <li>Lower cost compared with photo studios</li>

            <li>Instant generation and download</li>

            <li>Unlimited copies</li>

            <li>No waiting time</li>

            <li>Supports different paper sizes</li>

            <li>Print anytime</li>

            <li>Ideal for passport, visa and ID photos</li>
          </ul>

          <p>
            If you already have a printer and photo paper, the total cost per
            passport photo can be extremely low compared with retail printing
            services.
          </p>

          <h2>Best Paper for Passport Photo Printing</h2>

          <p>
            For best results, use high-quality photo paper rather than regular
            printer paper.
          </p>

          <ul>
            <li>Glossy photo paper</li>

            <li>Matte photo paper</li>

            <li>4×6 photo sheets</li>

            <li>A4 photo sheets</li>
          </ul>

          <p>
            Always print at 300 DPI for sharp details and accurate colors. Avoid
            selecting "Fit to Page" during printing because it can alter the
            official dimensions of the passport photos.
          </p>

          <h2>Who Can Use This Tool?</h2>

          <p>This tool is useful for:</p>

          <ul>
            <li>Passport applicants</li>
            <li>Visa applicants</li>
            <li>Students</li>
            <li>Travelers</li>
            <li>Government documentation</li>
            <li>ID card creation</li>
            <li>Parents printing children's passport photos</li>
            <li>Photographers</li>
          </ul>

          <h2>Create Passport Photo Sheets Online for Free</h2>

          <p>
            No software installation is required. Upload your image, select a
            layout, generate your sheet, and download your print-ready file
            instantly. The process takes only a few seconds and works on desktop
            and mobile devices.
          </p>

          <p>
            Whether you need passport photos on A4 paper, passport photos on 4×6
            paper, or multiple passport photos arranged automatically, this free
            online tool simplifies the entire process.
          </p>
        </div>
      </div>
    </>
  );
}
