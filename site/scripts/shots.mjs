// Ekran görüntüleri: node scripts/shots.mjs [url]  → shots/*.png  (önce: npm run build && npm run preview)
// playwright-core ve Chromium, ../reels altındaki kurulumdan kullanılır.
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '../../reels/package.json'));
const { chromium } = require('playwright-core');
const base = path.join(os.homedir(), 'AppData/Local/ms-playwright');
const dir = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()[0];
const url = process.argv[2] || 'http://localhost:4173/';
const out = path.join(here, '../shots');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: path.join(base, dir, 'chrome-win64', 'chrome.exe') });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(name, viewport, mobile) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await wait(2200);
  const stops = await page.evaluate(() => {
    const top = (s) => document.querySelector(s).getBoundingClientRect().top + scrollY;
    const center = (s) => { const r = document.querySelector(s).getBoundingClientRect(); return r.top + scrollY + r.height / 2 - innerHeight / 2; };
    const h = document.documentElement.scrollHeight - innerHeight;
    return {
      '01-hero': 0,
      '02-gecis': center('#a-story') * 0.5,
      '03-hikaye': center('#a-story'),
      '04-gecis': (center('#a-story') + top('#icerik')) / 2,
      '05-icerik': top('#icerik') + innerHeight * 0.45,
      '06-kullanim': top('#kullanim') + innerHeight * 0.1,
      '07-siparis': center('#a-order'),
      '08-footer': h,
    };
  });
  for (const [k, y] of Object.entries(stops)) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(700);
    await page.screenshot({ path: path.join(out, `${name}-${k}.png`) });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(name, 'hatalar:', errors.length ? errors : 'yok', '| yatay taşma:', overflow);
  await page.close();
}

await run('masaustu', { width: 1440, height: 900 }, false);
await run('mobil', { width: 390, height: 844 }, true);
await browser.close();
