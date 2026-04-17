import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import BlogModel from '@/models/Blog';
import ReadingProgressBar from '@/app/components/ReadingProgressBar';
import TocSidebar from '@/app/components/TocSidebar';
import FaqAccordion from '@/app/components/FaqAccordion';

// Define the Blog Post type
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  featuredImage?: string;
}

// FAQ mapping per blog slug — curated, relevant FAQs for each article
const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  'how-to-take-baby-passport-photo-at-home': [
    { question: 'Can I take my baby\'s passport photo at home?', answer: 'Yes, the US Department of State allows parents to take their baby\'s passport photo at home as long as it meets biometric guidelines: plain white background, no hands visible, and the baby\'s face must be clearly visible and facing the camera.' },
    { question: 'Do baby passport photos need eyes open?', answer: 'For newborns under a few weeks old, the State Department is lenient and eyes can be slightly or completely closed. For older infants, the eyes must be open and generally looking toward the camera.' },
    { question: 'What is the best method to photograph a baby for a passport?', answer: 'The two best methods are the Flat Lay Method (laying the baby on a white sheet on the floor and photographing from directly above) and the Car Seat Method (draping a white sheet over the car seat and photographing at eye level).' },
    { question: 'Can I use a flash for baby passport photos?', answer: 'No, never use a camera flash for baby passport photos. It creates harsh shadows and can startle the baby. Instead, use indirect natural light from a large window.' },
  ],
  'us-passport-photo-requirements-2024': [
    { question: 'What size should a US passport photo be?', answer: 'A US passport photo must be exactly 2x2 inches (51x51 mm). The head must measure between 1 inch and 1 3/8 inches from chin to top of head, occupying 50% to 69% of the total image height.' },
    { question: 'Can I wear glasses in my US passport photo?', answer: 'No. Since November 2016, the US State Department has implemented a complete ban on wearing any type of glasses in passport photos, including prescription glasses, sunglasses, and fashion frames.' },
    { question: 'What background color is required for US passport photos?', answer: 'The background must be plain white or off-white. It cannot have any textures, patterns, gradients, or shadows.' },
    { question: 'Can I smile in my passport photo?', answer: 'You must have a neutral facial expression with both eyes open and mouth closed. A very natural, unexaggerated smile is technically acceptable, but showing teeth is not allowed.' },
  ],
  'digital-vs-printed-passport-photos': [
    { question: 'Do I need a printed or digital passport photo?', answer: 'It depends on your application type. First-time applicants (Form DS-11), minors, and those with lost/damaged passports need printed photos. Online passport renewals and eVisas require digital photos.' },
    { question: 'What are the digital passport photo specifications?', answer: 'Digital passport photos must be JPEG format, 600x600 pixels minimum (1200x1200 max), between 54KB and 10MB, and in 24-bit sRGB color.' },
    { question: 'How can I print a passport photo cheaply?', answer: 'Use a 4x6 print sheet that tiles six 2x2 passport photos onto a standard 4x6 inch canvas. Print it as a regular photo at CVS, Walgreens, or Walmart for about 39 cents instead of paying $17 for the passport photo service.' },
  ],
  'how-to-fix-passport-photo-shadows': [
    { question: 'Why do shadows cause passport photo rejections?', answer: 'Shadows disrupt the uniform white background required by the State Department and create uneven lighting on your face, which causes facial recognition algorithms to fail the biometric scan.' },
    { question: 'How do I prevent shadows in passport photos?', answer: 'Stand at least 1.5-2 feet away from the wall, use natural window light (avoid overhead lights and camera flash), and face the light source directly. Use a white reflector to fill in dark areas on your face.' },
    { question: 'Can I fix passport photo shadows after taking the photo?', answer: 'Yes, AI-powered background removal tools like PixPassport can strip away the shadowed background and replace it with a pure white canvas, eliminating both background and some facial shadows digitally.' },
  ],
  'can-you-smile-in-passport-photos': [
    { question: 'Is smiling allowed in US passport photos?', answer: 'The official guideline requires a neutral facial expression with both eyes open and mouth closed. A very subtle, natural smile is technically acceptable, but showing teeth or exaggerated smiling will cause rejection.' },
    { question: 'Why can\'t you smile with teeth in passport photos?', answer: 'Wide smiling changes the facial geometry that biometric recognition algorithms rely on. The distances between eyes, nose, mouth, and chin are altered, causing the software to fail.' },
    { question: 'Can babies smile in passport photos?', answer: 'For infants, the rules are relaxed. Crying, yawning, or slightly open mouths are generally accepted for very young babies, as long as the child\'s face is fully visible.' },
  ],
  'what-to-wear-for-passport-photo-dress-code': [
    { question: 'Can I wear a white shirt in my passport photo?', answer: 'Technically you can, but it\'s strongly discouraged. A white shirt blends into the required white background, making you look like a floating head and potentially confusing automated recognition systems.' },
    { question: 'Are uniforms allowed in passport photos?', answer: 'No. All types of uniforms are banned, including military, police, airline, medical scrubs, and any clothing that resembles a uniform. You must wear everyday civilian clothing.' },
    { question: 'Can I wear religious head coverings in passport photos?', answer: 'Yes, but only if the head covering is worn daily for religious purposes. You must submit a signed statement verifying this, and the covering cannot cast shadows on your face or obscure your full facial features.' },
    { question: 'What colors should I wear for a passport photo?', answer: 'Dark or jewel tones work best: black, navy blue, forest green, deep burgundy, or dark grey. These create good contrast against the white background and help automated systems clearly identify your outline.' },
  ],
  'printing-passport-photos-at-cvs-walgreens': [
    { question: 'How much does it cost to print passport photos at CVS?', answer: 'CVS and Walgreens charge $16.99-$19.99 for their passport photo service. However, you can print a 4x6 print sheet with six passport photos for about 39 cents if you prepare the file yourself.' },
    { question: 'Can I print my own passport photos at home?', answer: 'You can print at home on photo-quality paper, but the print quality must match professional standards. Most home inkjet printers don\'t produce acceptable quality. It\'s better to use a 4x6 print sheet at a pharmacy kiosk.' },
    { question: 'What is a 4x6 passport photo print sheet?', answer: 'A 4x6 print sheet is a standard photo-sized file (1200x1800 pixels at 300 DPI) that tiles six individual 2x2 inch passport photos onto a single sheet. You print it as a regular photo and cut out the individual photos.' },
  ],
  'glasses-in-passport-photos-banned': [
    { question: 'When were glasses banned from US passport photos?', answer: 'The US State Department implemented a complete ban on wearing glasses in all passport and visa photos starting November 1, 2016.' },
    { question: 'Are there any exceptions to the glasses ban?', answer: 'The only exception is for severe, documented medical necessity — typically reserved for patients recovering from ocular surgery who cannot expose their eyes to light. A signed medical statement from a licensed practitioner is required.' },
    { question: 'Can I wear contact lenses in passport photos?', answer: 'Clear prescription contact lenses are fine. However, colored or decorative contact lenses that alter your natural eye color should be removed, as they change your appearance for identification purposes.' },
  ],
  'hair-rules-for-passport-photos': [
    { question: 'Do I need to show my ears in a US passport photo?', answer: 'No. Unlike some countries, the United States does not require your ears to be visible. Long hair covering your ears is acceptable as long as your full face and cheeks remain visible.' },
    { question: 'Can I wear a bun or ponytail in my passport photo?', answer: 'Yes, but be careful with high buns. The top of the bun is counted as the top of your head for the head-size calculation, which may make your actual face too small. A low ponytail or bun at the nape of the neck is safest.' },
    { question: 'Do I need to shave my beard for a passport photo?', answer: 'No. Beards and facial hair are perfectly acceptable. The government primarily analyzes the upper half of your face. Keep your beard as it normally is.' },
  ],
  'passport-photo-background-requirements': [
    { question: 'What background is required for US passport photos?', answer: 'The background must be plain white or off-white with absolute uniformity. No textures, patterns, gradients, or shadows are allowed.' },
    { question: 'Can I take a passport photo against a colored wall?', answer: 'With AI background removal tools like PixPassport, you can take a photo against any background. The AI will strip the background and replace it with a compliant pure white canvas.' },
    { question: 'Why does my white wall look grey in passport photos?', answer: 'Camera sensors interpret colors differently than the human eye. Insufficient lighting, shadows from overhead lights, and camera white balance settings can make a white wall appear grey in photos.' },
  ],
  'green-card-photo-rejection-fix-background-shadows': [
    { question: 'Why was my green card photo rejected?', answer: 'In 90% of cases, green card photo rejections are caused by background issues — shadows, grey tones, textures, or non-uniform lighting behind your head.' },
    { question: 'How can I fix passport photo shadows online?', answer: 'Use an AI-powered tool like PixPassport to automatically remove the background and replace it with a pure white (#FFFFFF) canvas. This eliminates all shadows and guarantees a uniform background.' },
    { question: 'Is a free US visa photo validator reliable?', answer: 'Free validators are good for preliminary checks (head size, basic dimensions), but they rarely tell you how to fix issues. For guaranteed compliance, use a professional tool that both validates and fixes your photo.' },
  ],
  'dv-lottery-2027-guide-photo-requirements-results': [
    { question: 'When will DV Lottery 2027 results be announced?', answer: 'DV-2027 results will be available through the Entrant Status Check starting in May 2026. You must check your status online — the State Department does not notify winners by email.' },
    { question: 'What are the DV Lottery photo requirements?', answer: 'Photos must be exactly 600x600 pixels, max 240KB, JPEG format. Head size must occupy 50-69% of image height. Eyes must be between 56-69% from the bottom. Background must be plain white with no shadows.' },
    { question: 'Can a bad photo disqualify my DV Lottery entry?', answer: 'Yes. The State Department uses AI to screen photos before human review. If your photo fails biometric standards, your entry is automatically disqualified without notice — you\'ll simply see "Not Selected."' },
  ],
  'green-card-photo-requirements-2026-checklist': [
    { question: 'Are green card photo requirements the same as passport photos?', answer: 'Yes, the technical specifications are identical: 2x2 inches physical (600x600 pixels digital), white background, 50-69% head ratio. However, green card photo rejections carry higher stakes as they can delay residency by months.' },
    { question: 'Can I take a selfie for my green card photo?', answer: 'Selfies are not recommended. Photos taken at arm\'s length distort facial features due to wide-angle lenses. The camera should be at least 4 feet away from your face.' },
    { question: 'Can I use beauty filters on my green card photo?', answer: 'Absolutely not. Using beauty filters, removing moles/scars, or changing eye color is considered fraud by USCIS and can have serious legal consequences.' },
  ],
  'digital-passport-photo-file-size-compression-guide': [
    { question: 'What is the file size limit for DS-160 passport photos?', answer: 'The maximum file size is 240KB (kilobytes). The minimum is 54KB. Files larger or smaller than this range will be rejected by the CEAC website.' },
    { question: 'How do I reduce passport photo file size without losing quality?', answer: 'Use JPEG compression with a compression ratio around 20:1, maintaining 24-bit sRGB color. The ideal file size range is 150-200KB. Professional tools like PixPassport handle this automatically.' },
    { question: 'Why does my phone photo fail the DS-160 upload?', answer: 'Modern phone cameras take 3-5MB photos at high resolution. These are far too large for the DS-160 system. You need to resize to 600x600 pixels and compress the file to under 240KB.' },
  ],
  'us-visa-denial-reasons-interview-tips-detailed': [
    { question: 'Why was my US visa denied without looking at my documents?', answer: 'Officers often cite Section 214(b), which assumes immigrant intent. If your DS-160 answers are inconsistent with your verbal responses, or if algorithmic risk-assessment has flagged your profile, the decision may be largely made before the interview.' },
    { question: 'Can a bad photo cause US visa denial?', answer: 'Yes. Your DS-160 photo is scanned against the US-VISIT database before your interview. A grainy, poorly lit, or non-compliant photo generates a "Quality Alert" that flags your file, causing extra scrutiny from the start.' },
    { question: 'What is Section 214(b) visa denial?', answer: 'Section 214(b) of the Immigration and Nationality Act assumes every nonimmigrant visa applicant intends to immigrate. The burden is on you to prove strong ties to your home country. Most quick denials cite this section.' },
  ],
  'damaged-passport-us-visa-rules': [
    { question: 'Can I travel with a slightly damaged passport?', answer: 'It depends on the type of damage. Slight curling of edges or fanned pages are acceptable. Water damage, loose binding, torn pages, or any damage to the RFID chip will cause you to be turned away.' },
    { question: 'Do I need a new photo when renewing a damaged passport?', answer: 'Yes. The US government requires a photo taken within the last 6 months for all passport renewals. You cannot reuse the photo from your old passport.' },
    { question: 'What counts as a "mutilated" passport?', answer: 'A passport is considered mutilated if the data page is unreadable, pages are torn or missing, the cover is detached, or the RFID chip cannot be scanned by machine readers.' },
  ],
  'us-visa-photo-requirements-h1b-f1-k1': [
    { question: 'Are photo requirements the same for H-1B, F-1, and K-1 visas?', answer: 'Yes, all nonimmigrant visas use the same DS-160 digital photo standard: 600x600 pixels, max 240KB, JPEG format, white background, and no glasses.' },
    { question: 'Do I need printed photos for a K-1 visa?', answer: 'Yes. The K-1 fiancé visa often requires both a digital DS-160 upload (600x600 pixels) and two identical printed 2x2 inch photos on high-quality photographic paper for the consular interview.' },
    { question: 'Can I wear my work uniform in an H-1B visa photo?', answer: 'No. Even if your specialty occupation requires a uniform (lab coat, scrubs, etc.), you must remove it and wear standard civilian clothing for your visa photo.' },
  ],
  'us-visa-photo-size-background-rules-guide-uk-europe': [
  { question: 'What is the correct size for a US visa photo?', answer: 'The digital photo must be between 600x600 and 1200x1200 pixels in a square format. Printed photos must be exactly 2x2 inches (51x51 mm).' },

  { question: 'What is the file size limit for a US visa photo?', answer: 'The maximum file size for a US visa digital photo is 240 KB, and the format must be JPEG (.jpg).' },

  { question: 'What background is required for a US visa photo?', answer: 'The background must be plain white or off-white, with no shadows, patterns, or objects visible.' },

  { question: 'Can I take a US visa photo at home in the UK or Europe?', answer: 'Yes, you can take your visa photo at home if you follow official rules like proper lighting, white background, and correct size (600x600 pixels).' },

  { question: 'Are glasses allowed in US visa photos?', answer: 'No, glasses are not allowed in US visa photos unless you have a medical exemption with a doctor’s certificate.' },

  { question: 'What should I wear for a US visa photo?', answer: 'Wear regular everyday clothing in solid colors. Avoid white clothing, uniforms, or anything that blends with the background.' },

  { question: 'Can I smile in a US visa photo?', answer: 'No, you must maintain a neutral expression with your mouth closed and eyes open, looking directly at the camera.' },

  { question: 'How recent must a US visa photo be?', answer: 'The photo must be taken within the last 6 months to reflect your current appearance.' },

  { question: 'What head size is required in a US visa photo?', answer: 'Your head must cover 50% to 69% of the image height, ensuring proper facial recognition.' },

  { question: 'Can I use a passport photo for a US visa?', answer: 'Yes, if it meets US visa requirements such as 2x2 inches size, white background, and proper face positioning.' },

  { question: 'Are filters or photo editing allowed for US visa photos?', answer: 'No, filters or edits that change your appearance are not allowed. Only basic cropping and resizing are permitted.' },

  { question: 'What happens if my US visa photo is rejected?', answer: 'If your photo does not meet the requirements, you will need to upload a new one, which may delay your visa application process.' },

  { question: 'Can I wear makeup in a US visa photo?', answer: 'Yes, but it should be natural and not alter your facial features significantly.' },

  { question: 'Are shadows allowed in US visa photos?', answer: 'No, there should be no shadows on your face or background. Lighting must be even and clear.' },

  { question: 'Can babies or infants have different photo rules?', answer: 'Yes, infant rules are slightly relaxed, but the baby must still face the camera and no other person should be visible.' },

  { question: 'Can I wear a head covering in a US visa photo?', answer: 'Yes, but only for religious or medical reasons, and your full face must remain clearly visible.' },

  { question: 'What is the correct photo format for DS-160 upload?', answer: 'The photo must be in JPEG format with square dimensions and meet size and file limits.' },

  { question: 'Can I take a selfie for a US visa photo?', answer: 'No, selfies are not recommended. The photo should be taken by another person or with a tripod to ensure proper framing and alignment.' },

  { question: 'Do I need printed photos for a US visa interview?', answer: 'In many cases, yes. You may need to bring two identical 2x2 inch printed photos to your visa interview.' },

  { question: 'How can I ensure my US visa photo is accepted?', answer: 'Follow official guidelines for size, background, lighting, and expression, or use an automated tool to generate a compliant photo.' }
],
  'us-visa-photo-requirements-2026': [
  {
    question: 'What are the US visa photo requirements for 2026?',
    answer: 'For 2026, US visa photos must be 600x600 pixels in size, under 240KB file size, in JPEG format, with a plain white background. The face must be centered, clearly visible, and without glasses.'
  },
  {
    question: 'What is the correct size for a US visa photo?',
    answer: 'The required digital size is 600x600 pixels (square). For printed photos, the size must be 2x2 inches (51x51 mm).'
  },
  {
    question: 'What is the maximum file size allowed for US visa photos?',
    answer: 'The maximum file size allowed is 240KB. If your image exceeds this, you must compress it without losing clarity.'
  },
  {
    question: 'What background is required for a US visa photo?',
    answer: 'A plain white or off-white background is required. Shadows, patterns, or colored backgrounds are not allowed.'
  },
  {
    question: 'Can I wear glasses in a US visa photo?',
    answer: 'No, glasses are not allowed in US visa photos unless medically necessary. Even then, you must provide a signed medical statement.'
  },
  {
    question: 'Can I take a US visa photo using my phone?',
    answer: 'Yes, you can take a US visa photo using a smartphone, but you must ensure proper lighting, a white background, correct framing, and no shadows.'
  },
  {
    question: 'What percentage of the photo should the face cover?',
    answer: 'The head should cover approximately 50% to 69% of the total image height, ensuring proper alignment as per US Department of State guidelines.'
  },
  {
    question: 'What expression is required for a US visa photo?',
    answer: 'You must have a neutral facial expression with both eyes open and mouth closed. Smiling or exaggerated expressions are not allowed.'
  },
  {
    question: 'Can I edit or enhance my US visa photo?',
    answer: 'Basic adjustments like cropping and resizing are allowed, but filters, beautification, or altering facial features is strictly prohibited.'
  },
  {
    question: 'How recent should my US visa photo be?',
    answer: 'Your photo must be taken within the last 6 months and reflect your current appearance.'
  }
]

};

// Default FAQ for articles that don't have a specific mapping
const DEFAULT_FAQ = [
  { question: 'What are the standard passport photo dimensions?', answer: 'Passport photo sizes vary by country. The most common sizes are 2x2 inches (51x51 mm) for the US and India, and 35x45 mm for the UK, Europe, Australia, and many other nations. PixPassport automatically applies the correct rules for your selected country.' },
  { question: 'Can I take a passport photo with my phone?', answer: 'Yes, modern smartphones are perfect for passport photos. Use natural lighting, avoid shadows on the face, and use an AI tool like PixPassport to automatically crop, remove the background, and verify 100% biometric compliance.' },
  { question: 'How much does PixPassport cost?', answer: 'PixPassport processes your photo for a small one-time fee (typically around $5.99). You receive a fully compliant digital file and a 4x6 printable sheet, saving you significant money compared to studio or pharmacy pricing.' },
  { question: 'How do I ensure my photo won\'t be rejected?', answer: 'To avoid rejection, ensure even lighting, a neutral expression, and no glasses (for most countries). Our AI validator performs 64+ biometric checks to ensure your photo matches the exact standards used by immigration agencies.' },
  { question: 'Is my data safe with PixPassport?', answer: 'Absolutely. All uploaded photos are automatically and permanently deleted from our servers within 24 hours. We never share or sell your personal data, and we are fully GDPR and CCPA compliant.' },
];

const APP_URL = 'https://www.pixpassport.com';

// Helper to get ALL posts
async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean() as BlogPost[];
    if (posts && posts.length > 0) return posts;
  } catch (error) {
    console.error("Error reading blog posts from DB:", error);
  }

  const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// 1. Tell Next.js to Statically Generate exactly these slugs at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate dynamic SEO Meta Tags based on the specific post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: 'Post Not Found | PixPassport' };
  }

  return {
    title: `${post.title} | PixPassport`,
    description: post.description,
    alternates: {
      canonical: `${APP_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${APP_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      siteName: 'PixPassport',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
    ...(post.featuredImage && {
      openGraphImages: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
    }),
  };
}

// 3. The actual Server Component that renders the page
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const faqs = FAQ_MAP[post.slug] || DEFAULT_FAQ;

  // JSON-LD: Article schema (BlogPosting)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: APP_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PixPassport',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${APP_URL}/blog/${post.slug}`,
    },
    url: `${APP_URL}/blog/${post.slug}`,
    inLanguage: 'en-US',
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
        width: 1200,
        height: 630,
      },
    }),
    isPartOf: {
      '@type': 'Blog',
      name: 'PixPassport Blog',
      url: `${APP_URL}/blog`,
    },
  };

  // JSON-LD: FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // JSON-LD: BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: APP_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${APP_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${APP_URL}/blog/${post.slug}`,
      },
    ],
  };

  // Extract headings for TOC
  const headings = post.content.match(/<h[23][^>]*>(.*?)<\/h[23]>/g)?.map((h) => {
    const level = h.startsWith('<h2') ? 2 : 3;
    const text = h.replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return { id, text, level };
  }) || [];

  // Inject IDs into content headings if they don't have them
  let processedContent = post.content;
  headings.forEach((h) => {
    const tag = h.level === 2 ? 'h2' : 'h3';
    // This is a simple replacement, assuming headings don't have IDs already
    const regex = new RegExp(`<${tag}[^>]*>${h.text}<\/${tag}>`, 'g');
    processedContent = processedContent.replace(regex, `<${tag} id="${h.id}">${h.text}<\/${tag}>`);
  });

  return (
    <>
      <ReadingProgressBar />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Modern Hero Section */}
        <header className="relative bg-slate-950 pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-600 rounded-full blur-[150px] animate-pulse delay-700" />
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
              <ol className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-lime-400 transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li>
                  <Link href="/blog" className="hover:text-lime-400 transition-colors">Blog</Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li className="text-slate-300 truncate max-w-[200px]" title={post.title}>
                  {post.title}
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center space-x-2 mb-6 bg-lime-500/10 border border-lime-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                Compliance Guide 2026
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-8 text-pretty">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-white text-[10px]">
                  {post.author.charAt(0)}
                </div>
                <span>By {post.author}</span>
              </div>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <span>8 min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-6xl mx-auto -mt-10 px-4 relative z-20">
            <div className="relative aspect-[2/1] md:aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-center">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <TocSidebar headings={headings} />
            </aside>

            {/* Reading Content */}
            <div className="w-full max-w-3xl blog-content-wrapper">
              <div
                className="prose-premium max-w-none"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* FAQ Section */}
              <section className="mt-20 pt-16 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-8 bg-lime-500 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 !m-0 !p-0 !border-0">
                    Expert Q&A
                  </h2>
                </div>
                <div className="space-y-4">
                  <FaqAccordion faqs={faqs.map(f => ({ q: f.question, a: f.answer }))} />
                </div>
              </section>

              {/* Enhanced CTA */}
              <section className="mt-20 p-10 md:p-14 bg-slate-950 rounded-[2.5rem] text-center relative overflow-hidden group border border-lime-500/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-600/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10 leading-tight">
                  Avoid Common Rejections Instantly
                </h2>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed relative z-10 font-medium">
                  Our AI ensures your photo meets 2026 biometric standards: perfect 600x600 size, correct head ratio, and pure white background.
                </p>
                <Link href="/tool" className="inline-flex items-center justify-center bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xl py-4 px-10 rounded-2xl transition-all shadow-xl shadow-lime-500/20 group/btn relative z-10">
                  Fix My Photo Now
                  <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <div className="mt-8 flex items-center justify-center gap-4 text-slate-500 text-sm font-bold opacity-60">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-lime-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/></svg>
                    Official Size
                  </span>
                  <span className="w-1 h-1 bg-slate-800 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-lime-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/></svg>
                    Bio-Verified
                  </span>
                </div>
              </section>

              {/* Related Resources */}
              <section className="mt-16">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Related Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/visa-photo-validator" className="group flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
                    <span className="text-2xl">✅</span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Free Photo Validator</span>
                      <p className="text-xs text-slate-500 mt-0.5">Instant PASS/FAIL compliance check</p>
                    </div>
                  </Link>
                  <Link href="/passport-photos" className="group flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
                    <span className="text-2xl">🛂</span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Passport Photo Directory</span>
                      <p className="text-xs text-slate-500 mt-0.5">Official sizes for 50+ countries</p>
                    </div>
                  </Link>
                  <Link href="/visa-photo" className="group flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Visa Photo Directory</span>
                      <p className="text-xs text-slate-500 mt-0.5">International visa photo specs</p>
                    </div>
                  </Link>
                  <Link href="/faq" className="group flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
                    <span className="text-2xl">❓</span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">FAQ</span>
                      <p className="text-xs text-slate-500 mt-0.5">Common questions answered</p>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
