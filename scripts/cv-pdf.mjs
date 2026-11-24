// Prints the /cv/ pages to PDF. Run against a running `astro preview` (default http://localhost:4321).
// Usage: CHROME_PATH=/path/to/chrome node scripts/cv-pdf.mjs [baseUrl]
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = process.argv[2] ?? 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const page = await browser.newPage();
for (const [path, file] of [['/cv/', 'vladislav-li-cv-ru.pdf'], ['/en/cv/', 'vladislav-li-cv-en.pdf']]) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `${root}public/cv/${file}`, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('wrote', `public/cv/${file}`);
}
await browser.close();
