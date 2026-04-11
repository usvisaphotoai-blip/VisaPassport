const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

// reference format from your file :contentReference[oaicite:0]{index=0}

const newPost = {
  slug: "us-visa-photo-size-background-rules-guide-uk-europe",
  title:
    "US Visa Photo Requirements (2026 Guide) – Size, Background, Dress Code & Official Rules",
  description:
    "Complete US visa photo requirements guide 2026. Learn official size (600x600), background rules, dress code, glasses policy, and how to avoid rejection.",
  date: "2026-04-01",
  author: "PixPassport Team",
  featuredImage:
    "https://res.cloudinary.com/ddxu2wqfm/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/blog/Gemini_Generated_Image_cpln8ccpln8ccpln_odp73i.png",

  content: `
    <h2>US Visa Photo Requirements (2026 Official Guide)</h2>

    <p>If you're applying for a US visa from the US, UK, or Europe, your photo is one of the most important parts of your application. Even a small mistake—such as incorrect size, shadows, or wearing glasses—can lead to rejection or delays.</p>

    <p>The US Department of State has strict photo requirements, and they are enforced automatically during DS-160 submission. This guide explains everything in a clear and practical way so you can avoid rejection.</p>

    <img
      src="https://res.cloudinary.com/ddxu2wqfm/image/upload/w_800,q_auto,f_auto/blog/Gemini_Generated_Image_cpln8ccpln8ccpln_odp73i.png"
      alt="US visa photo correct example with white background"
      width="400"
      height="400"
      loading="lazy"
      style="border-radius:12px;margin:24px 0;max-width:100%;height:auto;"
    />

    <h2>What is the Correct US Visa Photo Size (600x600 Explained)</h2>

    <p>The official US visa photo size for digital submission is <strong>600 x 600 pixels</strong>. The image must be square, meaning equal width and height.</p>

    <ul>
      <li>Minimum: 600 x 600 pixels</li>
      <li>Maximum: 1200 x 1200 pixels</li>
      <li>Format: JPEG (.jpg)</li>
      <li>Max file size: 240 KB</li>
    </ul>

    <p>Your face must occupy <strong>50% to 69%</strong> of the image height. The eyes should be positioned between <strong>56% and 69%</strong> from the bottom.</p>

    <p>Incorrect sizing is one of the most common reasons for DS-160 photo rejection.</p>

    <h2>US Visa Photo Background Requirements (White or Off-White)</h2>

    <p>The background must be <strong>plain white or off-white</strong>. It should be clean, evenly lit, and completely free from shadows or objects.</p>

    <img
      src="https://res.cloudinary.com/ddxu2wqfm/image/upload/w_800,q_auto,f_auto/blog/Gemini_Generated_Image_p8az3kp8az3kp8az_p5w9ny.png"
      alt="US visa photo background correct vs incorrect comparison"
      width="400"
      height="400"
      loading="lazy"
      style="border-radius:12px;margin:24px 0;max-width:100%;height:auto;"
    />

    <p>Avoid these mistakes:</p>
    <ul>
      <li>Shadows behind your head</li>
      <li>Textured or colored walls</li>
      <li>Uneven lighting</li>
    </ul>

    <p>The system uses biometric detection, so a clean background is essential.</p>

    <h2>Face Position and Expression Rules</h2>

    <p>Your face must be directly facing the camera with a neutral expression.</p>

    <ul>
      <li>Eyes open and clearly visible</li>
      <li>Mouth closed (no smiling)</li>
      <li>No head tilt</li>
      <li>Full face visible from chin to top of head</li>
    </ul>

    <p>The image should be centered both horizontally and vertically.</p>

    <h2>US Visa Photo Dress Code: What to Wear</h2>

    <p>There is no strict dress code, but guidelines must be followed.</p>

    <ul>
      <li>Wear regular everyday clothing</li>
      <li>Choose darker colors for contrast</li>
      <li>Avoid white or light-colored outfits</li>
    </ul>

    <p><strong>Not allowed:</strong></p>
    <ul>
      <li>Uniforms (except religious)</li>
      <li>Hats or caps</li>
      <li>Heavy accessories</li>
    </ul>

    <p>Head coverings are allowed only for religious or medical reasons, but your full face must remain visible.</p>

    <h2>Can You Take a US Visa Photo at Home?</h2>

    <p>Yes, you can take a US visa photo at home if you follow the official guidelines carefully.</p>

    <p><strong>Step-by-step process:</strong></p>

    <ol>
      <li>Stand against a plain white wall</li>
      <li>Use natural or soft lighting</li>
      <li>Keep camera at eye level</li>
      <li>Maintain neutral expression</li>
      <li>Crop image to 600x600 pixels</li>
    </ol>

    <p>Avoid filters or editing that changes your appearance. The photo must be clear, sharp, and recent (within 6 months).</p>

    <h2>US Visa Photo Rules for Infants & Babies</h2>

    <p>For infants and babies, the rules are slightly relaxed but still important.</p>

    <ul>
      <li>No other person should be visible</li>
      <li>Baby must face the camera</li>
      <li>Eyes should be open if possible</li>
    </ul>

    <p>Tip: Lay the baby on a white sheet and take the photo from above.</p>

    <h2>US Visa Photo Rules for Glasses & Head Coverings</h2>

    <p>Glasses are <strong>not allowed</strong> in US visa photos. Even clear lenses can cause glare or reflections.</p>

    <p>Head coverings are allowed only if:</p>
    <ul>
      <li>They are worn for religious or medical reasons</li>
      <li>Your face is fully visible</li>
      <li>No shadows are cast on your face</li>
    </ul>

    <h2>Common Mistakes That Cause Rejection</h2>

    <ul>
      <li>Wrong size (not 600x600)</li>
      <li>Shadows on face or background</li>
      <li>Blurry or low-quality image</li>
      <li>Incorrect face positioning</li>
      <li>Wearing glasses</li>
    </ul>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px 0;">
      <figure style="text-align:center;">
        <img 
          src="https://res.cloudinary.com/ddxu2wqfm/image/upload/w_400,q_auto,f_auto/blog/Gemini_Generated_Image_u1ptz8u1ptz8u1pt_uo1qix.png"
          alt="Rejected US visa photo example"
          width="400"
          height="400"
          loading="lazy"
          style="border-radius:12px;border:2px solid red;" 
        />
        <figcaption style="color:red;font-weight:600;">✗ Rejected</figcaption>
      </figure>

      <figure style="text-align:center;">
        <img 
          src="https://res.cloudinary.com/ddxu2wqfm/image/upload/w_400,q_auto,f_auto/blog/Gemini_Generated_Image_82k99z82k99z82k9_qmomzb.png"
          alt="Accepted US visa photo example"
          width="400"
          height="400"
          loading="lazy"
          style="border-radius:12px;border:2px solid green;" 
        />
        <figcaption style="color:green;font-weight:600;">✓ Accepted</figcaption>
      </figure>
    </div>

    <h2>How to Create a US Visa Photo Online</h2>

    <p>Manually editing your photo can be difficult and error-prone. Instead, you can use an AI tool to automatically generate a compliant visa photo.</p>

    <p>These tools handle:</p>
    <ul>
      <li>Background removal</li>
      <li>Face alignment</li>
      <li>Correct sizing (600x600)</li>
    </ul>

    <p><strong>👉 Try it here:</strong> <a href="https://www.pixpassport.com">Create US Visa Photo Online</a></p>

    <h2>Conclusion</h2>

    <p>US visa photo requirements are strict, but easy to follow if you understand the rules. By ensuring correct size, background, and lighting, you can avoid delays and submit your application with confidence.</p>

    <p>Taking a few minutes to get your photo right can save days or even weeks in processing time.</p>
  `,
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log(
  "Successfully added new evergreen blog post for H-1B, F-1, and K-1 visas.",
);

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassport.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);
