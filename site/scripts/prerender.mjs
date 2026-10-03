// Build sonrası: tüm rotalar için statik HTML üretir (SSG).
// Her rota kendi dist/ klasöründe index.html olarak kaydedilir — rewrite kuralı gerekmez.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const rawHtml = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
if (!rawHtml.includes('<!--app-->')) throw new Error('dist/index.html içinde <!--app--> yok');

// Uygulama script'i ilk boyamadan sonra yüklenir (FCP/LCP)
const entry = /<script type="module" crossorigin src="([^"]+)"><\/script>/;
if (!entry.test(rawHtml)) throw new Error('giriş script etiketi bulunamadı');
const template = rawHtml.replace(
  entry,
  (_, src) => `<script type="module">requestAnimationFrame(() => setTimeout(() => import(${JSON.stringify(src)})));</script>`,
);

function writeHtml(relPath, url) {
  const absPath = path.join(root, relPath);
  mkdirSync(path.dirname(absPath), { recursive: true });
  writeFileSync(absPath, template.replace('<!--app-->', render(url)));
  console.log(`✓ prerender: ${relPath}`);
}

// Ana sayfa
writeHtml('dist/index.html', '/');

// Blog listesi
writeHtml('dist/blog/index.html', '/blog');

// Bileşen detay sayfaları
const SLUGS = ['l-arjinin', 'tribulus-terrestris', 'epimedium', 'maca-koku', 'cuce-palmiye', 'ginkgo-biloba', 'e-vitamini', 'cinko'];
for (const slug of SLUGS) {
  writeHtml(`dist/blog/${slug}/index.html`, `/blog/${slug}`);
}

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
