import https from 'https';

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

console.log("Key ID present:", Boolean(keyId), "Key Secret present:", Boolean(keySecret));

if (keyId && keySecret) {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const paymentId = "pay_TdslAQYH7IaF8p";

  const req = https.request(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log("=== RAZORPAY API PAYMENT DETAILS ===");
        console.log(JSON.stringify(json, null, 2));
      } catch (e) {
        console.log("Raw response:", data);
      }
    });
  });
  req.on('error', (e) => console.error("Error:", e));
  req.end();
}
