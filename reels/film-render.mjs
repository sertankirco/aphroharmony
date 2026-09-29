// Kullanım: node film-render.mjs [--qc] [--fps 60]
import { chromium } from 'playwright-core';
import path from 'node:path'; import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url'; import { spawn } from 'node:child_process';
const qcOnly = process.argv.includes('--qc');
const fps = Number(process.argv[process.argv.indexOf('--fps') + 1]) || 60;
const base = path.join(process.env.LOCALAPPDATA || '', 'ms-playwright');
const d = readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort().reverse()[0];
const browser = await chromium.launch({ executablePath: path.join(base, d, 'chrome-win64', 'chrome.exe') });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
const film = path.resolve('../film/aphro-product-film.html'), out = path.resolve('../film/out');
await page.goto(pathToFileURL(film).href + '?capture', { waitUntil: 'load' });
const grab = (t) => page.evaluate((t) => { seek(t); return document.getElementById('stage').toDataURL('image/png'); }, t);

// determinizm + döngü
const f0 = await grab(0), f16 = await grab(16), f0b = await grab(0);
const mid1 = await grab(5.123), mid2 = await grab(5.123);
const near = await grab(15.999);
console.log('seek(0) == seek(16):', f0 === f16, '| seek(0) tekrar:', f0 === f0b, '| seek(5.123) tekrar:', mid1 === mid2, '| seek(15.999) == seek(0):', near === f0);
// süreklilik: ardışık 60fps kareler arasında büyük sıçrama var mı (kart boyutu üzerinden)
const jumps = await page.evaluate(() => { const r = []; return r; });

// kontak sayfası: vuruş başı + orta noktalar
mkdirSync(path.join(out, 'qc'), { recursive: true });
const times = [0, 0.3, 0.8, 1.3, 1.62, 2.3, 2.8, 3.3, 3.9, 4.3, 4.8, 5.3, 5.7, 6.3, 6.9, 7.3, 7.64, 8.25, 8.6, 9.3, 12, 15.99];
for (const t of times) writeFileSync(path.join(out, 'qc', `t${t.toFixed(2).padStart(5, '0')}.png`), Buffer.from((await grab(t)).split(',')[1], 'base64'));
console.log('qc kareleri:', times.length, '| sayfa hataları:', errors.length ? errors : 'yok');
if (qcOnly) { await browser.close(); process.exit(0); }

// MP4
const N = Math.round(16 * fps);
const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', path.join(out, 'aphro-product-film.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let i = 0; i < N; i++) {
  const png = Buffer.from((await grab(i / fps)).split(',')[1], 'base64');
  if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 120 === 0) process.stdout.write(`kare ${i}/${N}\n`);
}
ff.stdin.end(); await new Promise(r => ff.on('close', r));
await browser.close(); console.log('mp4 hazır');
