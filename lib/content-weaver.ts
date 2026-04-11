import { SpecEntry } from "@/lib/slug-utils";

interface ContentBlock {
  type: "h2" | "h3" | "h4" | "p" | "ul";
  text?: string;
  items?: string[];
}

interface AgencyData {
  name: string;
  portal_type: string;
}

const AGENCIES: Record<string, AgencyData> = {
  "United States": { name: "U.S. Department of State", portal_type: "State.gov portal" },
  "United Kingdom": { name: "HM Passport Office (HMPO)", portal_type: "Gov.uk digital service" },
  "India": { name: "Ministry of External Affairs", portal_type: "Passport Seva Online" },
  "Australia": { name: "Australian Passport Office (DFAT)", portal_type: "APO Online" },
  "China": { name: "National Immigration Administration", portal_type: "NIA Service Platform" },
  "Germany": { name: "Bürgeramt", portal_type: "Municipal authorities" },
  "France": { name: "ANTS (Agence Nationale des Titres Sécurisés)", portal_type: "ANTS Digital Service" },
  "Canada": { name: "Immigration, Refugees and Citizenship Canada (IRCC)", portal_type: "IRCC Portal" },
  "Japan": { name: "Ministry of Foreign Affairs", portal_type: "MOFA Online Services" },
  "Schengen": { name: "Schengen Area Member States", portal_type: "Schengen Consulate" },
};

// Extremely simple deterministic hash to pick an array index consistently
function getSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

function pickVariant<T>(variants: T[], seed: number, offset: number = 0): T {
  return variants[(seed + offset) % variants.length];
}

export function generateLongformContent(spec: SpecEntry, isVisa: boolean): ContentBlock[] {
  const country = spec.country;
  const docType = isVisa ? "Visa" : "Passport";
  const agency = AGENCIES[country] || { name: `${country} Immigration Authorities`, portal_type: "official government portal" };
  const sizeText = `${spec.width_mm}x${spec.height_mm}mm`;
  
  // Create a unique seed for this specific document and country so it never changes on reload
  const seed = getSeed(spec.id);
  
  const content: ContentBlock[] = [];

  // --- H2: Introduction ---
  const introHeaders = [
    `The Essential Guide to Obtaining an Official ${country} ${docType} Photo`,
    `Complete Requirements for Your ${country} ${docType} Photograph`,
    `How to Get a Compliant ${docType} Photo for ${country}`,
    `Everything You Need to Know About ${country} ${docType} Photos`
  ];
  content.push({ type: "h2", text: pickVariant(introHeaders, seed, 0) });

  const introP1 = [
    `Navigating the complexities of international travel often begins with a single, crucial document: your ${docType} photo. For individuals applying to ${country}, adhering to the strict biometric standards set by the ${agency.name} is not just a recommendation—it is a mandatory requirement for application acceptance. In an era where border control systems are increasingly reliant on high-definition facial recognition technology, a minor error in your photo's dimensions or lighting can result in immediate rejection, costing you time, processing fees, and missed travel opportunities.`,
    `Applying for a ${country} ${docType} can be a stressful process, and one of the most common reasons for delays is a non-compliant photograph. The ${agency.name} enforces rigorous biometric criteria that must be met perfectly. From precise sizing to facial geometry, your submitted picture is analyzed by sophisticated software. A single rejection due to improper lighting or incorrect dimensions could postpone your travel plans indefinitely.`,
    `Securing your ${docType} for ${country} requires meticulous attention to detail, beginning with your portrait. The ${agency.name} utilizes advanced identification systems to process thousands of applications daily. If your photo fails to align with biometric standards, it triggers an automatic flag. Understanding the strict rules around shadows, dimensions, and backgrounds is crucial to ensuring your documents are approved on the first attempt without unnecessary friction.`,
    `Your application to ${country} hinges significantly on providing an acceptable ${docType} photo. The ${agency.name} has implemented uncompromising standards to integrate with global security networks. With automated digital infrastructure replacing human reviewers, even a millimeter of deviation in head size or an incorrect background hue will cause an outright dismissal of your paperwork. Precision is absolutely essential.`
  ];
  content.push({ type: "p", text: pickVariant(introP1, seed, 1) });

  const introP2 = [
    `Our AI-powered platform has been specifically calibrated to the unique specifications of ${country}'s ${docType} standards. By combining modern computer vision with the official ${sizeText} requirement, we provide a seamless bridge between your smartphone camera and a government-ready biometric file.`,
    `To eliminate these risks, our tool leverages artificial intelligence customized to the exact policies of ${country}. We automatically adjust your image to the mandated ${sizeText} format, ensuring that your final download meets every single technical specification required by immigration officials.`,
    `This is where our intelligent software steps in. We have encoded the specific ${sizeText} requirements of ${country} directly into our validation engine. Whether you took the picture in your living room or office, the AI instantly corrects the crop and background to produce a compliant, high-resolution result.`,
    `With our compliance engine, producing a flawless ${docType} photo is effortless. Optimized closely for ${country}'s ${docType} templates—including the strict ${sizeText} frame—the system dynamically scales and isolates your portrait, delivering a pristine image guaranteed to pass digital submission checks.`
  ];
  content.push({ type: "p", text: pickVariant(introP2, seed, 2) });

  // --- H2: Technical Specifications ---
  const techHeaders = [
    `Understanding the ${country} ${sizeText} Requirement`,
    `Technical Breakdown: ${country} ${docType} Dimensions`,
    `Size & Background Guidelines for ${country}`,
    `Biometric Rules for ${country} ${docType}s`
  ];
  content.push({ type: "h2", text: pickVariant(techHeaders, seed, 3) });

  const techP1 = [
    `The ${country} government mandates a precise ${spec.width_mm}mm width by ${spec.height_mm}mm height for all ${docType} submissions. This specific aspect ratio is designed to fit standardized authentication hardware used at embassies and border crossings worldwide. However, the exact exterior dimensions are only the beginning of the technical journey.`,
    `Submitting an image to the ${agency.name} requires absolute adherence to their size mandate: exactly ${spec.width_mm}mm wide and ${spec.height_mm}mm tall. This sizing ensures the photo physically and digitally aligns perfectly onto official documents. Yet, getting the edges right is just one piece of the puzzle.`,
    `For ${country}, the official decree for ${docType} photos is a stringent dimension of ${spec.width_mm}x${spec.height_mm}mm. These measurements correspond directly to the scanning boxes utilized by the ${agency.portal_type}. Beyond the overall dimensions, the internal composition is heavily scrutinized.`,
    `Your image must be cropped precisely to ${spec.width_mm}mm x ${spec.height_mm}mm to satisfy the structural demands of ${country}. This format is internationally recognized and facilitates quick database scanning. While the bounding box is critical, the placement of your face within it is even more vital.`
  ];
  content.push({ type: "p", text: pickVariant(techP1, seed, 4) });

  const techSub1 = [
    `Biometric Composition and Head Positioning`,
    `Facial Scaling Requirements`,
    `Head-to-Chin Ratio Guidelines`,
    `Geometry and Alignment`
  ];
  content.push({ type: "h3", text: pickVariant(techSub1, seed, 5) });

  const techP2 = [
    `For a ${docType} photo to be considered 'biometrically valid' in ${country}, your head must occupy a specific percentage of the total frame—typically between ${spec.head_min_pct}% and ${spec.head_max_pct}%. Our AI automatically measures the distance from your chin to the crown of your head, ensuring that your facial features are perfectly centered and scaled according to ICAO 9303 international standards.`,
    `The ${agency.name} expects your head to fill exactly ${spec.head_min_pct}% to ${spec.head_max_pct}% of the image's height. If it is too small, identity verification systems fail; too large, and the photo is discarded. We use pixel-perfect landmark detection to guarantee your head size fits natively within this permitted tolerance.`,
    `In accordance with biometric processing rules in ${country}, facial area requirements dictate that your head size must range between ${spec.head_min_pct}% and ${spec.head_max_pct}% of the vertical height. Misjudging this distance is the leading cause of application rejection, which is why our cropping algorithm handles the math for you.`,
    `To pass the automated checks in ${country}, the top of your hair to the bottom of your chin must cover ${spec.head_min_pct}% to ${spec.head_max_pct}% of the overall picture. Our intelligent cropping mechanism dynamically identifies your facial boundaries and zooms the canvas to maintain strict regulatory compliance.`
  ];
  content.push({ type: "p", text: pickVariant(techP2, seed, 6) });

  const techBullets = [
    [
      "Head must be centered horizontally and vertically.",
      `Background must be a uniform ${spec.bg_color} without shadows or patterns.`,
      "Neutral facial expression with both eyes open and visible.",
      "No glasses, headwear (unless for religious reasons), or excessive accessories."
    ],
    [
      `Solid, pattern-free ${spec.bg_color} backdrop is strictly enforced.`,
      "Look directly at the camera with a neutral, closed-mouth expression.",
      "Ensure uniform lighting across the face (no harsh shadows).",
      "Hair must not obscure the eyes or edges of the face."
    ],
    [
      "Face and shoulders must be squarely aligned to the lens.",
      "Remove all tinted eyewear; prescription glasses are often prohibited.",
      `The background color must exclusively be ${spec.bg_color}.`,
      "Eyes must be positioned centrally and looking straight ahead."
    ]
  ];
  content.push({ type: "ul", items: pickVariant(techBullets, seed, 7) });

  // --- H2: The Role of AI in Validation ---
  const aiHeaders = [
    `How AI Ensures Your ${country} ${docType} Photo Compliance`,
    `The Advantage of Computed Verification for ${country}`,
    `Why Machine Learning is Superior to Manual Editing`,
    `Automated Quality Control for ${country} Applications`
  ];
  content.push({ type: "h2", text: pickVariant(aiHeaders, seed, 8) });

  const aiP1 = [
    `Traditional photo booths and manual cropping tools often fail to meet the rigorous standards of the ${agency.portal_type}. This is where our advanced Computer Vision model steps in. When you upload your image, our system performs a 50-point biometric check in real-time.`,
    `Trying to manually format a picture frequently results in human error, causing rejections by the ${agency.name}. Bypassing these issues entirely, our AI architecture scans your photograph against a rich database of international constraints in under five seconds.`,
    `The ${agency.portal_type} is incredibly unforgiving of DIY photo attempts. By employing cutting-edge machine learning grids, our application conducts rapid, multi-faceted verification sweeps to ensure your portrait satisfies every legal requirement without requiring you to use complex photo editing software.`,
    `Human intuition is a poor substitute for mathematical precision when it comes to official documents. By utilizing deep-learning facial recognition algorithms, we eliminate the guesswork, transforming an amateur snapshot into a fully vetted photograph meant for ${country}.`
  ];
  content.push({ type: "p", text: pickVariant(aiP1, seed, 9) });

  const aiSub1 = [
    `Facial Landmark Detection`,
    `Precision Eye-Level Tracking`,
    `Sub-millimeter Biometric Mapping`,
    `Advanced Feature Isolation`
  ];
  content.push({ type: "h3", text: pickVariant(aiSub1, seed, 10) });

  const aiP2 = [
    `Unlike human editors, our AI identifies subtle facial landmarks such as the exact distance between your pupillary centers and the horizontal plane of your eye line. For ${country} specifically, maintaining a level eye-height of approximately ${spec.eye_min_pct}% from the bottom of the photo is critical for automated digital gates (e-Gates) to process your identity correctly.`,
    `Our software constructs a wireframe over your face to triangulate key attributes. Immigration scanners for ${country} require your eye-line to sit firmly between ${spec.eye_min_pct}% and ${spec.eye_max_pct}% from the bottom edge. Our AI shifts and tilts your original photo until these metrics fall cleanly into the green zone.`,
    `By calculating the exact pixel layout of your ocular positioning, the AI anchors the image perfectly. The rules for ${country} demand that eyes remain at exactly ${spec.eye_min_pct}% height relative to the base. If you uploaded a slightly tilted image, our processor dynamically corrects the alignment to pass e-Gate validation protocols.`,
    `The engine specifically hones in on the ocular axis. If your eyes do not align to the ${spec.eye_min_pct}% to ${spec.eye_max_pct}% vertical threshold mandated by ${country}, the image will flag a warning. We prevent these warnings from becoming rejections by fixing the geometry proactively.`
  ];
  content.push({ type: "p", text: pickVariant(aiP2, seed, 11) });

  const aiP3 = [
    `Furthermore, our background removal engine uses deep learning to isolate every strand of hair, ensuring the backdrop is replaced with the government-mandated ${spec.bg_color} while preserving the natural edges required by high-security printing processes.`,
    `We also utilize a dedicated background substitution pipeline. It intelligently distinguishes between foreground boundaries and your environment, swapping out busy living rooms with a pristine ${spec.bg_color} canvas—an essential step for physical processing.`,
    `Beyond geometry, we tackle the backdrop. The neural network effortlessly strips away shadows and clutter, generating the flawless ${spec.bg_color} background that ${country} administrators expect to see upon reviewing your file.`,
    `Finally, the system addresses the surroundings. Our isolation algorithms cleanly extract your silhouette—retaining natural hair textures—and injects a pure, mathematically verified ${spec.bg_color} background directly behind you.`
  ];
  content.push({ type: "p", text: pickVariant(aiP3, seed, 12) });

  // --- H2: Common Pitfalls ---
  const pitfallHeaders = [
    `Avoiding Rejection: Why Manual ${country} Photos Often Fail`,
    `Common Mistakes Leading to ${docType} Application Denials`,
    `Top Reasons Your ${docType} Photo Could Be Rejected`,
    `Navigating the Pitfalls of ${country} Biometric Submissions`
  ];
  content.push({ type: "h2", text: pickVariant(pitfallHeaders, seed, 13) });

  const pitfallP1 = [
    `Statistical data from ${agency.name} suggests that nearly 15% of all ${docType} applications are delayed due to poor quality photography. The most common culprit is 'unrepresentative lighting,' which creates harsh shadows on the face or background. While a human might ignore a slight shadow under the nose, an automated scanner may interpret it as a facial feature, leading to a biometric mismatch.`,
    `Countless applications submitted to the ${agency.name} are placed on hold due to easily preventable photography errors. Sub-optimal lighting ranks highest among these issues; shadows cast over the neck, behind the ears, or across the jawline disrupt standard biometric scanning, leading to sudden bureaucratic delays.`,
    `A significant portion of ${docType} delays requested by the ${agency.name} stem from amateur photography mishaps. Uneven lighting is highly detrimental. Flash reflections on the skin or dark shadows obscuring the eyes confuse identity evaluation software, causing immediate flags in the validation system.`,
    `The sheer volume of applications rejected by the ${agency.portal_type} highlights the importance of compliance. When applicants attempt to take photos in poorly lit environments, artificial shadows alter the perceived structure of the face. Machines read these shadows as permanent physical anomalies, triggering non-compliance errors.`
  ];
  content.push({ type: "p", text: pickVariant(pitfallP1, seed, 14) });

  const pitfallSub1 = [
    `The 'Digital Shadow' Problem`,
    `Issues with Resolution and Compression`,
    `Pixelation and Unintentional Blurring`,
    `Compression Artifacts and Clarity`
  ];
  content.push({ type: "h3", text: pickVariant(pitfallSub1, seed, 15) });

  const pitfallP2 = [
    `Another frequent issue is digital noise or pixelation. If you attempt to resize a small photo manually to ${spec.width_px}x${spec.height_px} pixels, the resulting image often loses the sharp detail required for biometric verification. Our tool utilizes advanced rendering to ensure that even photos taken in moderate lighting are sharpened to meet the professional resolution standards of ${country}.`,
    `Applicants frequently run into trouble when compressing or cropping images via standard phone galleries. Down-scaling a photo to ${spec.width_px}x${spec.height_px} pixels using basic algorithms often introduces structural artifacting. We prevent this degradation by employing an enterprise-grade processing suite optimized specifically for ${country}'s visual clarity mandates.`,
    `Blurry edges and low-resolution artifacting also plague many submissions. For a photo to be printed or scanned physically at ${spec.width_px}x${spec.height_px} px, it must retain immense sharpness. Our pipeline guarantees that digital compression rules do not destroy the granular details necessary to pass the final evaluation stages.`,
    `Finally, improper focal quality can ruin an application. Expanding a cropped photo to fill a ${spec.width_px}x${spec.height_px} canvas typically degrades its DPI (dots-per-inch). We apply intelligent post-processing filters that stabilize pixel density, guaranteeing that ${country} border agents receive a flawlessly clear image.`
  ];
  content.push({ type: "p", text: pickVariant(pitfallP2, seed, 16) });

  // --- H2: Step-by-Step Instructions ---
  const stepHeaders = [
    `How to Create Your ${country} ${docType} Photo at Home`,
    `A Simple Guide to Capturing Your ${country} Photo`,
    `Generating Your Biometric Image in 4 Easy Steps`,
    `The Fast Track to a Compliant ${country} ${docType}`
  ];
  content.push({ type: "h2", text: pickVariant(stepHeaders, seed, 17) });

  const stepP1 = [
    `With our platform, you don't need to visit a professional studio or pharmacy. Follow these simple steps to get an embassy-ready photo for your ${country} application:`,
    `Save money and time by skipping the trip to a physical photo booth. Here is the safest, fastest way to secure documentation for ${country}:`,
    `Producing a premium-tier identification photo from the comfort of your living room is entirely achievable. Adhere to this quick process:`,
    `Forget waiting in line. You can finalize your ${docType} application directly from your phone by following four standard procedures:`
  ];
  content.push({ type: "p", text: pickVariant(stepP1, seed, 18) });

  const stepBullets = [
    [
      `**Step 1: Capture**: Stand 3-4 feet away from a plain wall. Ensure even lighting on both sides of your face (natural daylight facing a window is best).`,
      `**Step 2: Upload**: Select your ${country} ${docType} requirement above and upload your original image. Our AI handles the rest.`,
      `**Step 3: AI Processing**: Our system will automatically crop, remove the background, and validate your biometric landmarks in under 10 seconds.`,
      `**Step 4: Download**: Receive your digital file for the ${agency.portal_type} and a printable 4x6 inch (10x15cm) sheet for physical applications.`
    ],
    [
      `**1. Prepare the Lighting**: Face an open window to allow soft, natural light to illuminate your face equally. Do not use flash.`,
      `**2. Snap the Shot**: Keep your shoulders completely square. Look straight into the camera lens with a neutral expression.`,
      `**3. Let AI Work**: Submit the picture above. The engine will scale it to ${sizeText} and inject the verified ${spec.bg_color} background.`,
      `**4. Complete**: Get the official file via email, guaranteed to pass checks at the ${agency.name}.`
    ],
    [
      `**Setup**: Ask a friend to stand around 1.5 meters from you. Make sure there is no harsh indoor lighting casting shadows down your nose.`,
      `**Shoot**: Look dead ahead. Ensure your hair is tucked behind your shoulders and both ears (if applicable) are visible.`,
      `**Validate**: Upload it. Our engine verifies tilt, contrast, and distance-to-camera automatically against ${country} metrics.`,
      `**Export**: Save your ${docType} bundle, which includes standard digital sizes and international print layouts.`
    ]
  ];
  content.push({ type: "ul", items: pickVariant(stepBullets, seed, 19) });

  // --- H2: Final Thoughts ---
  const finalHeaders = [
    `Your Seamless Path to ${country} Travel`,
    `Guaranteed Acceptance for Your ${country} Application`,
    `Travel to ${country} with Total Confidence`,
    `Finalizing Your Official ${docType} Submissions`
  ];
  content.push({ type: "h2", text: pickVariant(finalHeaders, seed, 20) });

  const finalP1 = [
    `A ${docType} photo is the first impression you make on a foreign government. By choosing an AI-driven solution, you are eliminating human error and ensuring that your application for ${country} proceeds without unnecessary friction. Whether you are renewing your document via the ${agency.portal_type} or visiting an embassy in person, our verified photos provide the confidence of 100% compliance.`,
    `When interacting with the ${agency.name}, professionalism is key. Utilizing algorithmic correction guarantees that your documentation won't falter over simple aesthetic technicalities. The peace of mind afforded by a pre-validated, ${sizeText} perfectly formatted picture cannot be overstated.`,
    `Submitting to the ${agency.portal_type} shouldn't involve guesswork. We've built an infrastructure designed exclusively to keep your travel plans on track. Handing off the strict mathematical requirements of ${country} to advanced software guarantees you a flawless, stress-free submission.`,
    `Do not let a poorly cropped image jeopardize your timeline. The ${docType} rules for ${country} are unforgiving by design, acting as the primary filter for identity screening. Relying on our AI verification safeguards your application against arbitrary delays and immediate denials.`
  ];
  content.push({ type: "p", text: pickVariant(finalP1, seed, 21) });

  const finalP2 = [
    `Join thousands of travelers who have saved hours of frustration by using the world's most advanced biometric photo engine. Your journey to ${country} starts with a perfect photo.`,
    `Experience the simplicity of digital compliance. Process your portrait today and finalize your ${country} paperwork with absolute certainty.`,
    `Our track record speaks for itself. Secure your verified ${docType} photograph right now and move forward with your international plans seamlessly.`,
    `Don't leave your travel itinerary to chance. Join a growing community of global citizens who rely on our platform to bypass bureaucratic red tape.`
  ];
  content.push({ type: "p", text: pickVariant(finalP2, seed, 22) });

  return content;
}
