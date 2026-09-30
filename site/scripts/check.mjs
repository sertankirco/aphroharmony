// Uyum kontrolü: kökteki scripts/check-compliance.mjs'yi prerender edilmiş dist/index.html üzerinde çalıştırır.
// Sipariş Alvione ürün sayfasından alınır; kurallar sipariş linkinin ve tıklama takibinin sayfada olmasını ister.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = spawnSync(process.execPath, [path.join(site, '../scripts/check-compliance.mjs'), path.join(site, 'dist/index.html')], { stdio: 'inherit' });
process.exit(r.status ?? 1);
