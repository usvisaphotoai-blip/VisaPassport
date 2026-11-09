/**
 * Editorial content for /visa-checklist/[country]/[checklist]/audit pages.
 * Written to answer what applicants actually search for before submitting:
 * "what gets this visa refused", "what do I check in each document".
 * Facts here must stay consistent with the matching markdown in content/visa-checklist.
 */

export interface AuditGuideCheck {
  document: string;
  check: string;
  why: string;
}

export interface AuditGuideMistake {
  title: string;
  detail: string;
  fix: string;
}

export interface AuditGuide {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  h1: string;
  intro: string;
  checks: AuditGuideCheck[];
  mistakes: AuditGuideMistake[];
  readyList: string[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
}

export const AUDIT_GUIDES: Record<string, AuditGuide> = {
  "us-b1-b2-tourist-visa-checklist": {
    seoTitle: "US B1/B2 Visa Document Check: Free Pre-Interview Audit (2026)",
    seoDescription:
      "Check your DS-160, 2x2 photo, bank statements and home-ties documents before your US B1/B2 interview. See the 8 mistakes that lead to Section 214(b) refusals.",
    keywords:
      "US B1/B2 visa document check, B1 B2 visa documents audit, DS-160 checklist, US visa interview documents, Section 214(b) refusal, US visa photo 2x2",
    h1: "US B1/B2 Visa Document Check Before Your Interview",
    intro:
      "A B1/B2 decision is made in a few minutes at the interview, so your paperwork has to be consistent and ready before you walk in. Use the audit above to go through every document on the checklist, then read the checks below. They cover the points that most often cause a Section 214(b) refusal or a turned-away appointment.",
    checks: [
      {
        document: "DS-160 confirmation page",
        check:
          "Print the page with the barcode. Compare your name, passport number, travel purpose and employer against the passport and your other documents.",
        why: "The officer sees your DS-160 answers. Any mismatch with what you say or show raises doubt about your credibility.",
      },
      {
        document: "Passport and previous passports",
        check:
          "Original passport valid for the trip (check whether your country is on the 6-month club exemption). Bring every old passport that holds US or other visas.",
        why: "Earlier visas and travel history are evidence that you travel and return.",
      },
      {
        document: "2x2 inch photo",
        check:
          "Printed 2x2 in (51x51 mm), white or off-white background, no glasses, head 1 to 1 3/8 in (50% to 69% of the image height), taken in the last 6 months, no filters or retouching.",
        why: "Photos that fail the State Department face checks delay or block the application. A digital upload does not replace the printed copy you may be asked for.",
      },
      {
        document: "Employment or business proof",
        check:
          "Employer letter with your role, years of service, salary and approved leave dates, plus recent pay slips. Self-employed applicants: business registration and tax records.",
        why: "This shows a job to return to, which is one of the main ties to your home country.",
      },
      {
        document: "Bank statements and tax returns",
        check:
          "Six months of statements with regular activity, and tax returns that match your declared income. Explain any large one-off deposit.",
        why: "Funds that cannot be explained, or income that does not match your job, weaken the case that you can fund the trip yourself.",
      },
      {
        document: "Sponsor documents (if someone else pays)",
        check:
          "Form I-134 signed by the sponsor, with their proof of US status, income and bank statements. Be ready to explain the relationship.",
        why: "A sponsor with no clear reason to pay, or thin financials, is a common reason for questions.",
      },
      {
        document: "Itinerary",
        check:
          "A realistic plan of cities, dates and purpose. Do not buy non-refundable flights or hotels before the visa is approved.",
        why: "A clear, temporary purpose supports non-immigrant intent. The State Department advises against paying for non-refundable travel first.",
      },
    ],
    mistakes: [
      {
        title: "Weak ties to the home country",
        detail:
          "Section 214(b) presumes every applicant is an intending immigrant until proven otherwise. Documents that only show money, with nothing on job, family or property, leave that presumption in place.",
        fix: "Bring employment, family and property evidence that fits your own story, and be ready to explain it in your own words.",
      },
      {
        title: "DS-160 answers that do not match your documents",
        detail:
          "Job title, salary, travel dates or prior refusals that differ between the form and your papers are treated as inconsistencies.",
        fix: "Re-read your submitted DS-160 against each document before the appointment.",
      },
      {
        title: "Wearing glasses in the photo",
        detail:
          "Eyeglasses have not been allowed in US visa photos since November 2016, including prescription glasses.",
        fix: "Retake the photo without glasses on a plain white background using the [US visa photo editor](/us-visa-photo-editor).",
      },
      {
        title: "Missing the physical photo or old passports",
        detail:
          "Applicants bring only the digital upload, or leave expired passports at home.",
        fix: "Put a printed 2x2 photo and all old passports in your folder the night before.",
      },
      {
        title: "Unexplained large deposits",
        detail:
          "A big balance that appeared recently, with no source, looks borrowed or staged.",
        fix: "Add a short note, or the supporting document (sale deed, bonus letter, gift letter), for any unusual deposit.",
      },
      {
        title: "Bringing paperwork the officer did not ask for",
        detail:
          "Long stacks of documents do not replace a clear answer. Officers decide mostly from the interview.",
        fix: "Keep the folder organised so you can find a document in seconds if asked.",
      },
    ],
    readyList: [
      "DS-160 confirmation page with barcode, printed",
      "Appointment confirmation and MRV fee receipt",
      "Passport, plus every previous passport",
      "Printed 2x2 inch photo, no glasses, white background",
      "Employer letter and recent pay slips (or business papers)",
      "Six months of bank statements and three years of tax returns",
      "I-134 and sponsor documents, if someone else is paying",
      "A short, consistent explanation of your trip",
    ],
    faq: [
      {
        question: "Can this audit guarantee my B1/B2 visa is approved?",
        answer:
          "No. Only a consular officer decides, and most of that decision happens in the interview. The audit helps you spot missing, inconsistent or non-compliant documents beforehand, so you do not lose the appointment over a preventable mistake.",
      },
      {
        question: "Which documents do I need to bring to the B1/B2 interview?",
        answer:
          "At minimum the DS-160 confirmation page, appointment confirmation, fee receipt, your passport and old passports, and a printed 2x2 photo. Supporting documents such as employment, finances and travel history are not mandatory, but they help you answer questions about your ties to home.",
      },
      {
        question: "How many months of bank statements do I need for a US visitor visa?",
        answer:
          "The State Department does not publish a fixed number. Six months of statements showing regular activity is the common practice and what our checklist recommends. Consistency with your income matters more than a high balance.",
      },
      {
        question: "What is Section 214(b)?",
        answer:
          "It is the part of US immigration law that presumes visa applicants intend to immigrate unless they show strong ties to their home country. Most B1/B2 refusals are issued under this section.",
      },
      {
        question: "Do I need a hotel and flight booked before the interview?",
        answer:
          "No. The State Department advises against buying non-refundable tickets or hotel rooms before the visa is approved. A written outline of your plans is enough.",
      },
    ],
    sources: [
      { label: "travel.state.gov: Visitor Visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
      { label: "travel.state.gov: U.S. Visa Photo Requirements", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html" },
      { label: "CEAC DS-160", url: "https://ceac.state.gov/genniv/" },
    ],
  },

  "uk-standard-visitor-visa-checklist": {
    seoTitle: "UK Standard Visitor Visa Document Check: Free Audit (2026)",
    seoDescription:
      "Check your UK visitor visa bank statements, photo, employment proof and accommodation details before applying. Common refusal reasons and what gov.uk really requires.",
    keywords:
      "UK visitor visa document check, UK standard visitor visa documents, UK visit visa bank statement, UK visa refusal reasons, UK visa photo requirements, UKVI checklist",
    h1: "UK Standard Visitor Visa Document Check Before You Apply",
    intro:
      "Many UK visitor visa guides list fixed documents that gov.uk does not actually require. The audit above checks your set against what UKVI asks for and what caseworkers commonly look at. Use the checks below to see what each document must show, and what usually triggers a refusal.",
    checks: [
      {
        document: "Passport",
        check:
          "Valid for your whole stay in the UK. The name and number must match the online application exactly.",
        why: "UKVI reads the passport data against the form. A typo creates an avoidable query.",
      },
      {
        document: "Digital photo",
        check:
          "JPEG, at least 600x750 pixels, 50KB to 10MB, plain light-coloured background (white, cream or light grey are accepted), neutral expression, taken in the last month.",
        why: "Gov.uk accepts white, cream or light grey. A rejected upload holds up the application.",
      },
      {
        document: "Bank statements",
        check:
          "Recent statements in your own name that show your name, account number and transactions. Avoid screenshots of balances or mobile banking apps. Explain large or unusual deposits.",
        why: "Gov.uk does not publish a fixed number of months or a minimum balance. The statements are there to show you can fund the trip and return journey without public funds.",
      },
      {
        document: "Income and trip cost",
        check:
          "The income and trip-cost figures you enter online must match your payslips, tax records and statements.",
        why: "Inconsistent figures are a more common problem than a low balance.",
      },
      {
        document: "Employment or business proof",
        check:
          "An employer letter with your role, salary and approved leave dates, or business registration and tax records if self-employed.",
        why: "Not an official requirement, but it is the usual way to show you will leave the UK at the end of your visit.",
      },
      {
        document: "Accommodation and plans",
        check:
          "State where you will stay. A host address, or a refundable hotel booking. A short cover letter explaining the purpose and dates helps.",
        why: "Accommodation is part of the online form, and a clear purpose supports a genuine visit.",
      },
      {
        document: "Sponsor or host documents",
        check:
          "If someone else pays, include their statements and a note on your relationship and why they are paying.",
        why: "An unexplained sponsor is a frequent cause of doubt about who is funding the trip.",
      },
    ],
    mistakes: [
      {
        title: "Insufficient or unclear funds",
        detail:
          "Statements that do not show where the money comes from, or that do not match the income declared in the form.",
        fix: "Use full statements in your own name, and add a short note for any large deposit.",
      },
      {
        title: "Screenshots instead of bank statements",
        detail:
          "Screenshots of balances or banking apps are easy to challenge as unverifiable.",
        fix: "Download or request official statements from the bank.",
      },
      {
        title: "Not showing you will return home",
        detail:
          "No job, family or property evidence, or a very long planned stay for the stated purpose.",
        fix: "Add employer or business evidence and keep the stated dates realistic.",
      },
      {
        title: "A vague purpose of visit",
        detail:
          "Reasons like \"tourism\" with no places, dates or reasons are hard for a caseworker to accept.",
        fix: "Write a short cover letter with dates, places and what you plan to do.",
      },
      {
        title: "Previous refusals left out",
        detail:
          "Not declaring a prior UK, Schengen, US or other refusal.",
        fix: "Declare every previous refusal honestly. Non-disclosure can itself be grounds for refusal.",
      },
      {
        title: "Photo rejected at upload",
        detail:
          "Wrong dimensions, shadows, tinted glasses or an old image.",
        fix: "Create a compliant file with the [UK visa photo tool](/uk).",
      },
    ],
    readyList: [
      "Passport valid for the whole stay",
      "Digital photo: 600x750 px or larger, JPEG, plain light background",
      "Recent bank statements in your own name, no screenshots",
      "Income and trip cost that match your documents",
      "Employer letter or business evidence (recommended)",
      "Accommodation details and a short cover letter",
      "Sponsor documents if someone else pays",
      "Honest declaration of any previous refusals",
    ],
    faq: [
      {
        question: "How many months of bank statements does a UK visitor visa need?",
        answer:
          "Gov.uk does not set a number. Many applicants submit three to six months. Recent statements in your own name that match the income you declare are what matter.",
      },
      {
        question: "Is there a minimum balance for the UK Standard Visitor visa?",
        answer:
          "No official minimum is published. You must show you can pay for the trip and your return journey and will not need public funds. Any specific figure you see online is third-party guidance.",
      },
      {
        question: "Why is a UK visitor visa refused?",
        answer:
          "Common reasons are unclear or insufficient funds, unexplained deposits, weak evidence of ties to your home country, an unclear purpose of visit, and inconsistent or undisclosed information. The refusal letter states the grounds.",
      },
      {
        question: "Can the photo background be white?",
        answer:
          "Yes. Gov.uk accepts a plain, light-coloured background, which includes white, cream and light grey.",
      },
      {
        question: "Does this audit replace the official application?",
        answer:
          "No. You still apply on gov.uk and attend the visa application centre. The audit is a preparation tool and cannot guarantee a decision.",
      },
    ],
    sources: [
      { label: "gov.uk: Standard Visitor visa", url: "https://www.gov.uk/standard-visitor" },
      { label: "gov.uk: Apply for a Standard Visitor visa", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "gov.uk: Take a digital photo for your visa", url: "https://www.gov.uk/photos-for-passports" },
    ],
  },
};

export function getAuditGuide(slug: string): AuditGuide | null {
  return AUDIT_GUIDES[slug] ?? null;
}
