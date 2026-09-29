// APHROHARMONY Reels — one-command build.
//   node reels/build.mjs --qc   → compliance check + QC contact sheet + low-fps silent preview (no final MP4)
//   node reels/build.mjs        → compliance check + full 30 fps render + audio → APHROHARMONY_REELS_FINAL.mp4
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { buildAudio } from './audio.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const QC = process.argv.includes('--qc');
const C = JSON.parse(readFileSync(path.join(here, 'config.json'), 'utf8'));
const out = path.join(here, 'out');
mkdirSync(out, { recursive: true });
const log = (...a) => console.log('[reels]', ...a);
const ff = args => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' }); if (r.status) throw new Error('ffmpeg failed: ' + args.join(' ')); };

// ---------- 1. compliance: only text added through config.json is checked (never the pack image itself)
function screenTexts() {
  const t = [], walk = (v, p) => typeof v === 'string' ? t.push([p, v]) : Object.entries(v).forEach(([k, x]) => walk(x, Array.isArray(v) ? `${p}[${k}]` : `${p}.${k}`));
  walk(C.copy, 'copy');
  return t;
}
{
  const exempt = new Set(C.compliance.exempt), bad = [];
  const pats = C.compliance.banned.map(p => new RegExp(p, 'iu'));
  for (const [where, text] of screenTexts()) {
    if (exempt.has(where)) continue;
    const low = text.toLocaleLowerCase('tr');
    for (const re of pats) if (re.test(low)) bad.push(`${where}: "${text}"  ↔  /${re.source}/`);
  }
  const LEGAL = 'Takviye edici gıdadır. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz.';
  if (C.copy.legal !== LEGAL) bad.push(`copy.legal must be exactly: "${LEGAL}"`);
  const VERIFIED = ['L-Arjinin', 'Demir dikeni', 'Epimedium', 'Maca kökü', 'Cüce palmiye', 'Ginkgo biloba', 'E vitamini', 'Çinko'];
  const ing = C.copy.ingredients;
  if (ing.length !== 8 || !VERIFIED.every(v => ing.includes(v))) bad.push('copy.ingredients must list exactly the 8 verified ingredients');
  const { bottleWidth } = C.product;
  if (bottleWidth < 400 || bottleWidth > 420) bad.push(`product.bottleWidth ${bottleWidth} is outside 400–420`);
  if (bad.length) { console.error('[reels] COMPLIANCE CHECK FAILED — nothing rendered:\n  ' + bad.join('\n  ')); process.exit(1); }
  log('compliance check passed (' + screenTexts().length + ' config texts)');
}

// ---------- 2. product: Lanczos upscale + light sharpening only (no AI, pack pixels unchanged otherwise)
const src = path.resolve(here, C.productImage), hq = path.join(out, 'product_hq.png');
if (!existsSync(src)) { console.error('[reels] product image not found: ' + src); process.exit(1); }
ff(['-i', src, '-vf', `scale=iw*${C.product.upscale}:ih*${C.product.upscale}:flags=lanczos,unsharp=5:5:${C.product.sharpen}:5:5:0`, hq]);
log('product prepared →', path.relative(here, hq));

// ---------- 3. browser
function chromePath() {
  const base = path.join(process.env.LOCALAPPDATA || '', 'ms-playwright');
  const dirs = existsSync(base) ? readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort().reverse() : [];
  for (const d of dirs) { const p = path.join(base, d, 'chrome-win64', 'chrome.exe'); if (existsSync(p)) return p; }
  return undefined;
}
const browser = await chromium.launch({ executablePath: chromePath(), args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: C.format.width, height: C.format.height }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('[page error]', e.message));
await page.goto(pathToFileURL(path.join(here, 'scene.html')).href);
const info = await page.evaluate(([cfg, url, qc]) => window.init(cfg, url, qc), [C, pathToFileURL(hq).href, QC]);
log(`bottle cutout ${info.cropW}×${info.cropH}px (upscaled ×${C.product.upscale}), shown at ${C.product.bottleWidth}px wide`);
const shot = async t => { await page.evaluate(t => window.render(t), t); return page.screenshot({ type: 'png' }); };
const D = C.format.duration, eps = 1 / C.format.fps / 2;

// pipe PNG frames into an H.264 file
async function encode(file, fps, times) {
  const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', QC ? 'veryfast' : 'slow', '-crf', QC ? '23' : '16', '-pix_fmt', 'yuv420p', file], { stdio: ['pipe', 'ignore', 'inherit'] });
  for (let i = 0; i < times.length; i++) {
    const buf = await shot(times[i]);
    if (!p.stdin.write(buf)) await new Promise(r => p.stdin.once('drain', r));
    if (!QC && i % 90 === 0) log(`frame ${i}/${times.length}`);
  }
  p.stdin.end(); await new Promise(r => p.on('close', r));
}

if (QC) {
  // ---------- QC: contact sheet of the requested moments + overflow report + low-fps silent preview
  const dir = path.join(out, 'qc'); rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const report = [];
  for (const [i, t0] of C.qc.times.entries()) {
    const t = Math.min(t0, D - eps);
    writeFileSync(path.join(dir, `f${String(i).padStart(3, '0')}.png`), await shot(t));
    const o = await page.evaluate(() => window.overflow());
    if (o.length) report.push(`t=${t0.toFixed(2)}  ` + o.join(' | '));
  }
  const cols = C.qc.cols || 5, rows = Math.ceil(C.qc.times.length / cols);
  ff(['-framerate', '1', '-i', path.join(dir, 'f%03d.png'), '-vf', `scale=360:640,tile=${cols}x${rows}:padding=8:color=0x333333`, '-frames:v', '1', path.join(out, 'qc_sheet.png')]);
  const n = Math.round(D * C.qc.fps);
  await encode(path.join(out, 'qc_preview.mp4'), C.qc.fps, Array.from({ length: n }, (_, i) => i / C.qc.fps));
  writeFileSync(path.join(out, 'qc_report.txt'), report.length ? 'Text outside safe area:\n' + report.join('\n') + '\n' : 'All visible text inside the safe area at every QC moment.\n');
  log(report.length ? `QC: ${report.length} safe-area warning(s) → out/qc_report.txt` : 'QC: all text inside the safe area');
  log('QC sheet   →', path.join(out, 'qc_sheet.png'));
  log('QC preview →', path.join(out, 'qc_preview.mp4'), `(${C.qc.fps} fps, silent)`);
  await browser.close();
} else {
  // ---------- FINAL: 30 fps frames, audio, optional VO, loudness, verify
  const fps = C.format.fps, N = Math.round(D * fps);
  await encode(path.join(out, 'frames.mp4'), fps, Array.from({ length: N }, (_, i) => i / fps));
  await browser.close();
  const music = path.join(out, 'audio.wav'); buildAudio(C, music); log('audio synthesized');
  const vo = path.join(here, C.audio.voFile), final = path.resolve(here, C.output);
  const loud = `loudnorm=I=${C.audio.lufs}:TP=${C.audio.truePeak}:LRA=11`;
  const args = existsSync(vo)
    ? ['-i', path.join(out, 'frames.mp4'), '-i', music, '-i', vo, '-filter_complex',
       `[2:a]asplit[v1][v2];[1:a][v1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[m];[m][v2]amix=inputs=2:normalize=0,${loud}[a]`, '-map', '0:v', '-map', '[a]']
    : ['-i', path.join(out, 'frames.mp4'), '-i', music, '-af', loud, '-map', '0:v', '-map', '1:a'];
  ff([...args, '-ar', '48000', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', String(D), '-movflags', '+faststart', final]);
  const pr = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=width,height,r_frame_rate', '-of', 'compact', final], { encoding: 'utf8' });
  log(existsSync(vo) ? 'voice-over mixed from ' + C.audio.voFile : 'no ' + C.audio.voFile + ' found — rendered without voice-over');
  log('FINAL →', final); log(pr.stdout.trim().replace(/\n/g, ' · '));
}
