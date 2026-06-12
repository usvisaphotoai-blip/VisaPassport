import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEXT_SERVER_DIR = path.join(__dirname, '../.next/server/app');

function processFile(filePath, targetLang) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('<html lang="en"')) {
    content = content.replace(/<html lang="en"/g, `<html lang="${targetLang}"`);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed lang attribute to ${targetLang} in: ${filePath}`);
  }
}

function walkDir(dir, targetLang) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, targetLang);
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath, targetLang);
    }
  }
}

const languages = ['fr', 'de'];

console.log('🔧 Running postbuild script: Fixing HTML lang attributes...');

for (const lang of languages) {
  const langDir = path.join(NEXT_SERVER_DIR, lang);
  const langHome = path.join(NEXT_SERVER_DIR, `${lang}.html`);
  
  processFile(langHome, lang);
  walkDir(langDir, lang);
}

console.log('✨ Postbuild complete!');
