import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG Logo with clean warm beige background (#f4ebe1)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="classicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6f4e37" />
      <stop offset="100%" stop-color="#5a3e2b" />
    </linearGradient>
    <linearGradient id="accentGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>

  <!-- Sıcak Bej Arka Plan (#f4ebe1) ve Yuvarlatılmış Şık Kenarlar -->
  <rect width="512" height="512" rx="128" fill="#f4ebe1" stroke="#e5dac8" stroke-width="12" />

  <!-- Klasik Şık Kitap Logosu -->
  <g transform="translate(32, 32)">
    <path d="M 64 120 Q 140 100 224 120 L 224 380 Q 140 360 64 380 Z" fill="url(#classicGrad)" />
    <path d="M 384 120 Q 308 100 224 120 L 224 380 Q 308 360 384 380 Z" fill="url(#classicGrad)" opacity="0.9" />

    <path d="M 80 136 Q 144 120 216 136 L 216 364 Q 144 348 80 364 Z" fill="#faf7f2" />
    <path d="M 368 136 Q 304 120 232 136 L 232 364 Q 304 348 368 364 Z" fill="#ffffff" />

    <!-- Şık Altın Ayraç -->
    <path d="M 264 112 L 264 240 L 284 220 L 304 240 L 304 112 Z" fill="url(#accentGold)" />
  </g>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
fs.writeFileSync(path.join(publicDir, 'kitaplik-logo.svg'), svgContent, 'utf8');

console.log('Beige logo & favicon SVG written successfully!');
