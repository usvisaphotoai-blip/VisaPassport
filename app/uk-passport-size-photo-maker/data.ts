// Shared by the server-rendered page (content + JSON-LD) and the client uploader,
// so the visible FAQ and the FAQPage schema can never drift apart.

export type UKDocument = {
  id: string;
  label: string;
  size: string;
};

export const ukDocuments: UKDocument[] = [
  { id: "uk-seamans-card", label: "British Seaman's card", size: "35 × 45 mm" },
  { id: "uk-seamans-discharge", label: "British Seaman's discharge book", size: "35 × 45 mm" },
  { id: "uk-london-freedom", label: "London Freedom pass", size: "35 × 45 mm" },
  { id: "uk-oyster", label: "Oyster travel photocard", size: "Digital upload" },
  { id: "uk-basc", label: "UK BASC firearms / shotgun licensing", size: "35 × 45 mm" },
  { id: "uk-bno", label: "UK BNO passport", size: "35 × 45 mm" },
  { id: "uk-boat", label: "UK boat licence", size: "35 × 45 mm" },
  { id: "uk-bus", label: "UK bus pass online form", size: "Digital upload" },
  { id: "uk-driving", label: "UK driving licence", size: "35 × 45 mm" },
  { id: "uk-id", label: "UK ID / residence card", size: "35 × 45 mm" },
  { id: "uk-leisure", label: "UK leisure pass", size: "35 × 45 mm" },
  { id: "uk-passport-offline", label: "UK passport (paper application)", size: "35 × 45 mm" },
  { id: "uk-passport-online", label: "UK passport (online application)", size: "Digital upload" },
  { id: "uk-railcard", label: "UK Railcard", size: "35 × 45 mm" },
  { id: "uk-school", label: "UK school card", size: "35 × 45 mm" },
];

export const DEFAULT_UK_DOCUMENT_ID = "uk-passport-online";

export const ukFaqs = [
  {
    q: "What size does a UK passport photo need to be?",
    a: "A UK passport photo must be 35mm wide and 45mm tall, with your face centred and taking up 29-34mm from chin to crown. Our tool crops and sizes your upload to this exact spec automatically.",
  },
  {
    q: "Can I use the same photo for my driving licence and my passport?",
    a: "Yes. The UK driving licence photo uses the same 35 x 45mm format as the passport, so one compliant photo works for both, as long as the background and pose meet each document's rules.",
  },
  {
    q: "Do I need a printed photo for the Oyster card or bus pass?",
    a: "No. Oyster photocards and most bus pass applications accept a digital photo upload through the online form, so you only need a correctly cropped image file rather than a physical print.",
  },
  {
    q: "Will a photo taken on my phone be accepted?",
    a: "Yes, provided the lighting is even, the background is plain, and your expression is neutral. Our tool checks framing and resizes the image, so a well-lit phone photo is usually enough.",
  },
  {
    q: "How long does it take to get my photo?",
    a: "Processing takes under a minute. Upload your photo, choose your document, and download or print your compliant image straight away.",
  },
  {
    q: "Can I apply the same photo to more than one document?",
    a: "Yes. Upload one photo, then switch the document type at the top of the page to generate a new crop for each application, so you don't need to photograph yourself again for every form.",
  },
  {
    q: "What background do UK documents require?",
    a: "Almost every UK document on this list asks for a plain, light-coloured background with no patterns, shadows, or other people visible. Our tool flags backgrounds that are too busy or too dark before you download the photo.",
  },
];
