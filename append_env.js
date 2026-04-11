const fs = require('fs');
const path = require('path');

const envContent = `

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
`;

const envPath = path.join(__dirname, '.env');
const examplePath = path.join(__dirname, '.env.example');

// Append to .env if it exists, otherwise create it
if (fs.existsSync(envPath)) {
  fs.appendFileSync(envPath, envContent);
} else {
  fs.writeFileSync(envPath, envContent.trimStart());
}

// Append or create .env.example
if (fs.existsSync(examplePath)) {
  fs.appendFileSync(examplePath, envContent);
} else {
  fs.writeFileSync(examplePath, envContent.trimStart());
}

console.log('Successfully added SMTP configurations to .env and .env.example');
