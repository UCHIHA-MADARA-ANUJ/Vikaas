import pkg from '/home/runner/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
const { chromium } = pkg;
import { mkdirSync } from 'fs';

mkdirSync('screenshots/pages', { recursive: true });

const BASE = 'https://bfc188c5-7bd4-4c58-a548-e1ededc067d8-00-2w8q0kzl03vli.pike.replit.dev/technova-2047';

// Use system Nix Chromium which has all libs bundled
const browser = await chromium.launch({
  headless: true,
  executablePath: '/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', err => errors.push(err.message));

async function snap(label, path) {
  await page.screenshot({ path: `screenshots/pages/${label}.png` });
  console.log(`  ✓ ${label}`);
}

// ── Loader: clear sessionStorage so it plays ──────────────────────────────
console.log('→ loader');
await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
await page.evaluate(() => sessionStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1800);
await snap('01-loader-chakra-assembly');
await page.waitForTimeout(5500);
await snap('02-loader-telemetry');
await page.waitForTimeout(6500);
await snap('03-loader-flag-unfurl');

// ── Skip loader for remaining pages ───────────────────────────────────────
await page.evaluate(() => sessionStorage.setItem('hasSeenLoader', 'true'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await snap('04-home-hero');
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(1200);
await snap('04b-home-scroll');

const routes = [
  ['05-vision',  '/vision'],
  ['06-pillars', '/pillars'],
  ['07-impact',  '/impact'],
  ['08-roadmap', '/roadmap'],
  ['09-team',    '/team'],
];

for (const [name, path] of routes) {
  console.log(`→ ${name}`);
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
  await page.waitForTimeout(2500);
  await snap(name + '-top');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
  await page.waitForTimeout(1500);
  await snap(name + '-mid');
}

await browser.close();

console.log('\n─── Console errors collected ───');
if (errors.length === 0) console.log('  none ✓');
errors.forEach(e => console.log('  ✗', e));
console.log('\nAll done.');
