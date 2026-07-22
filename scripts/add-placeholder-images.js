const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'mvp', 'js', 'products.js');
let content = fs.readFileSync(productsPath, 'utf-8');

// Detect and normalize line endings
const hasCRLF = content.includes('\r\n');
const lines = content.split(/\r?\n/);
const NL = hasCRLF ? '\r\n' : '\n';

// Badge/oldPrice config
const edits = {
  'whisky-001': `    oldPrice: 179.90,${NL}    badge: { type: 'off', value: 17 },`,
  'whisky-004': `    badge: { type: 'top' },`,
  'gin-001': `    oldPrice: 59.90,${NL}    badge: { type: 'off', value: 17 },`,
  'cerveja-001': `    oldPrice: 8.90,${NL}    badge: { type: 'off', value: 22 },`,
  'narg-002': `    badge: { type: 'top' },`,
  'vodka-003': `    badge: { type: 'top' },`,
  'maromba-001': `    oldPrice: 24.90,${NL}    badge: { type: 'off', value: 20 },`,
};

const result = [];
let i = 0;
let addedImageUrl = 0;
let currentProductId = null;
let currentProductName = null;
let inProduct = false;
let inProductArray = false;
let productStartLine = -1;

while (i < lines.length) {
  const line = lines[i];

  // Detect product array start
  if (line.includes('const PRODUCTS = [')) {
    inProductArray = true;
    result.push(line);
    i++;
    continue;
  }

  // Detect product array end
  if (inProductArray && line.trim() === '];') {
    inProductArray = false;
    result.push(line);
    i++;
    continue;
  }

  if (inProductArray) {
    const trimmed = line.trim();

    // Detect product start
    if (trimmed === '{' && !inProduct) {
      inProduct = true;
      currentProductId = null;
      currentProductName = null;
      productStartLine = result.length;
      result.push(line);
      i++;
      continue;
    }

    // Extract id and name from product lines (handle escaped quotes like Gordon\'s)
    if (inProduct) {
      const idMatch = trimmed.match(/^id:\s*'([^']*)',$/);
      const nameMatch = trimmed.match(/^name:\s*'((?:[^'\\]|\\.)*)'\s*,?$/);

      if (idMatch) currentProductId = idMatch[1];
      if (nameMatch) currentProductName = nameMatch[1].replace(/\\(.)/g, '$1');

      // Detect product end: "}," or "}"
      if (trimmed === '},' || trimmed === '}') {
        inProduct = false;

        // Add comma to inChat: true (the last property before closing brace)
        const lastIdx = result.length - 1;
        if (result[lastIdx].trim() === 'inChat: true' && !result[lastIdx].trim().endsWith(',')) {
          result[lastIdx] = result[lastIdx] + ',';
        }

        // Add imageUrl before closing brace
        if (currentProductName) {
          const seed = encodeURIComponent(currentProductName.trim()).replace(/'/g, '%27');
          result.push(`    imageUrl: 'https://picsum.photos/seed/${seed}/400/400',`);
          addedImageUrl++;
        }

        // Add oldPrice/badge after available: true
        if (currentProductId && edits[currentProductId]) {
          // Find the "available: true," line in the current product block
          const productBlock = result.slice(productStartLine);
          const availIdx = productBlock.findIndex(l => l.trim() === 'available: true,');
          if (availIdx !== -1) {
            const globalIdx = productStartLine + availIdx + 1;
            const editLines = edits[currentProductId].split(/\r?\n/);
            result.splice(globalIdx, 0, ...editLines);
            // Adjust productStartLine since we added lines
            productStartLine = -1; // Invalidate for next product
          }
        }

        result.push(line);
        i++;
        continue;
      }
    }
  }

  result.push(line);
  i++;
}

fs.writeFileSync(productsPath, result.join(NL), 'utf-8');
console.log(`Added imageUrl to ${addedImageUrl} products.`);
console.log('Done!');
