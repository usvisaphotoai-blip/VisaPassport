require('dotenv').config({ path: '.env.local' });

// Simulated Next.js process.env behavior
const rawClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const cleanClientId = rawClientId.replace(/['"]+/g, '').trim();

const PAYPAL_API_BASE = "production" === "production" && !cleanClientId.includes("sandbox") && !cleanClientId.startsWith("Ac")
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function run() {
  const clientId = (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").replace(/['"]+/g, '').trim();
  const clientSecret = (process.env.PAYPAL_CLIENT_SECRET || "").replace(/['"]+/g, '').trim();

  console.log("clientId:", clientId);
  console.log("PAYPAL_API_BASE:", PAYPAL_API_BASE);

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  console.log("Status:", response.status);
  const data = await response.json();
  console.log(data.access_token ? "Token OK" : data);
}
run();
