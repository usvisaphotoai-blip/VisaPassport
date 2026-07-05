require('dotenv').config({ path: '.env.local' });
const { PAYPAL_API_BASE } = require('./.next/server/lib/paypal.js') || { PAYPAL_API_BASE: "https://api-m.sandbox.paypal.com" };

async function run() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  
  const { access_token } = await tokenRes.json();
  
  const createOrder = async (currency) => {
    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: currency, value: "5.99" } }]
      })
    });
    console.log(currency, res.status, await res.text());
  };
  
  await createOrder("USD");
  await createOrder("INR");
}
run();
