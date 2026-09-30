// Build sonrası: React çıktısını dist/index.html içine gömer (SEO, ilk boyama, JS'siz içerik).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const file = path.join(root, 'dist/index.html');
const html = readFileSync(file, 'utf8');
if (!html.includes('<!--app-->')) throw new Error('dist/index.html içinde <!--app--> yok');
// Uygulama script'i ilk boyamadan sonra yüklenir: poster HTML'i JS'yi beklemeden görünür (FCP/LCP)
const entry = /<script type="module" crossorigin src="([^"]+)"><\/script>/;
if (!entry.test(html)) throw new Error('giriş script etiketi bulunamadı');
const out = html
  .replace('<!--app-->', render())
  .replace(entry, (_, src) => `<script type="module">requestAnimationFrame(() => setTimeout(() => import(${JSON.stringify(src)})));</script>`);
writeFileSync(file, out);
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('✓ prerender: dist/index.html');
