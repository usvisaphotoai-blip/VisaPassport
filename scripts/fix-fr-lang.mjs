import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEXT_SERVER_DIR = path.join(__dirname, '../.next/server/app');
const FR_DIR = path.join(NEXT_SERVER_DIR, 'fr');
const FR_HOME = path.join(NEXT_SERVER_DIR, 'fr.html');

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('<html lang="en"')) {
    content = content.replace(/<html lang="en"/g, '<html lang="fr"');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed lang attribute in: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

console.log('🔧 Running postbuild script: Fixing HTML lang attributes for French routes...');
processFile(FR_HOME);
walkDir(FR_DIR);
console.log('✨ Postbuild complete!');
