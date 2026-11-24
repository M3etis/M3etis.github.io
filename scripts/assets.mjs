// Generates social images and touch icons with a headless Chrome (system font stack, "Clarity" palette).
// Usage: CHROME_PATH=/path/to/chrome node scripts/assets.mjs
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const portrait = `data:image/jpeg;base64,${readFileSync(root + 'src/assets/portrait.jpg').toString('base64')}`;
const favicon = readFileSync(root + 'public/favicon.svg', 'utf8');

const base = `
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #ffffff; color: #111113;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased; }`;

const copy = {
  ru: {
    name: 'Владислав Ли',
    role: 'AI Product Engineer / Frontend Engineer',
    title: 'AI-автоматизации и интерфейсы, которые делают сложное понятным.',
  },
  en: {
    name: 'Vladislav Li',
    role: 'AI Product Engineer / Frontend Engineer',
    title: 'AI automations and interfaces that make complex work clear.',
  },
};

const og = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${base}
.wrap { display: grid; grid-template-columns: 1fr 360px; height: 100%; }
.text { display: flex; flex-direction: column; padding: 72px 56px 64px 80px; }
.who { font-size: 26px; font-weight: 600; }
.who span { color: #0066e6; }
h1 { margin-top: auto; font-size: 64px; line-height: 1.04; letter-spacing: -0.035em; font-weight: 700; }
.url { margin-top: 36px; font-size: 22px; color: #5f5f66; }
.photo { margin: 40px 40px 40px 0; overflow: hidden; border-radius: 32px; background: #f5f5f7; }
.photo img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 28%; }
</style></head><body><div class="wrap"><div class="text">
<p class="who">${c.name} · <span>${c.role}</span></p>
<h1>${c.title}</h1>
<p class="url">m3etis.is-a.dev</p>
</div><div class="photo"><img src="${portrait}" alt=""></div></div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const shot = async (html, path, width, height, type = 'png') => {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode()));
  });
  await page.screenshot({ path: root + path, type, ...(type === 'jpeg' ? { quality: 82 } : {}) });
  await page.close();
  console.log('wrote', path);
};

for (const lang of ['ru', 'en']) await shot(og(copy[lang]), `public/og-${lang}.png`, 1200, 630);

// Square portrait for JSON-LD `image`.
await shot(
  `<html><body style="margin:0;width:600px;height:600px;background:url(${portrait}) 50% 30%/cover"></body></html>`,
  'public/og-portrait.jpg', 600, 600, 'jpeg',
);

// Apple touch icon: favicon on a solid background (iOS ignores transparency).
await shot(
  `<html><body style="margin:0;width:180px;height:180px;background:#111113">${favicon.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`,
  'public/apple-touch-icon.png', 180, 180,
);

await browser.close();
