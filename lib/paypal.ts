export const PAYPAL_API_BASE = process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.includes("sandbox") && !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.startsWith("Ac") // User's ID starts with Ac, usually sandbox
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

export async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to generate PayPal Access Token: ${data.error_description || data.error || response.status}`);
  }

  return data.access_token;
}
