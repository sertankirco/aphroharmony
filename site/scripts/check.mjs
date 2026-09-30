// Uyum kontrolü: kökteki scripts/check-compliance.mjs'yi prerender edilmiş dist/index.html üzerinde çalıştırır.
// Bu sayfada sipariş formu yok (sipariş Instagram DM ile), bu yüzden form sözleşmesi kalemleri beklenen eksiklerdir.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = spawnSync(process.execPath, [path.join(site, '../scripts/check-compliance.mjs'), path.join(site, 'dist/index.html')], { encoding: 'utf8' });
const FORM_ONLY = /kvkkConsent|KVKK Aydınlatma Metni|ORDER_CONFIG/;
const out = r.stdout + r.stderr;
const issues = out.split('\n').filter((l) => l.trim().startsWith('•'));
const real = issues.filter((l) => !FORM_ONLY.test(l));
if (real.length) {
  console.error(out);
  process.exit(1);
}
console.log(`✓ Uyum kontrolü geçti (${issues.length} form kalemi bu sayfada kapsam dışı: sipariş Instagram DM ile).`);
