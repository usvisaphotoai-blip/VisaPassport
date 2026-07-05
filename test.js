require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Find any photo
  const db = mongoose.connection.db;
  const photo = await db.collection('photos').findOne({});
  if (!photo) {
    console.log("No photos found");
    process.exit(1);
  }
  
  console.log("Testing with photoId:", photo._id.toString());
  
  const res = await fetch("http://localhost:3000/api/paypal/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      photoId: photo._id.toString(),
      currencyOverride: "INR", // Let's try INR
      isExpert: false
    })
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
  
  const res2 = await fetch("http://localhost:3000/api/paypal/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      photoId: photo._id.toString(),
      currencyOverride: "USD",
      isExpert: false
    })
  });
  
  const text2 = await res2.text();
  console.log("Status2:", res2.status);
  console.log("Response2:", text2);
  
  process.exit(0);
}

run().catch(console.error);
