// Quick script to generate PWA icon PNGs from SVG
// Run: node scripts/generate-icons.mjs

import { writeFileSync, readFileSync } from 'fs';

const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="24" fill="#10b981"/>
  <g transform="translate(96,96)">
    <path d="M 15,-50 A 50,50 0 1,0 15,50 A 36,36 0 1,1 15,-50 Z" fill="#fff"/>
    <path d="M 38,-18 L 42,-6 L 54,-6 L 44,3 L 48,14 L 38,7 L 28,14 L 32,3 L 22,-6 L 34,-6 Z" fill="#fff"/>
  </g>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#10b981"/>
  <g transform="translate(256,256)">
    <path d="M 40,-134 A 134,134 0 1,0 40,134 A 96,96 0 1,1 40,-134 Z" fill="#fff"/>
    <path d="M 102,-48 L 112,-16 L 144,-16 L 118,8 L 128,38 L 102,19 L 76,38 L 86,8 L 60,-16 L 92,-16 Z" fill="#fff"/>
  </g>
</svg>`;

// We'll store SVGs for now — these can be converted to PNG using any SVG→PNG tool
// For PWA, modern browsers also accept SVGs
writeFileSync('public/icons/icon-192.svg', svg192);
writeFileSync('public/icons/icon-512.svg', svg512);

console.log('SVG icons generated. For production PNG icons, convert using:');
console.log('  npx svg2png-many public/icons/icon-192.svg public/icons/icon-512.svg');
