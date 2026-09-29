#!/usr/bin/env node
/**
 * AphroHarmony uyum kontrolü — APHROHARMONY_MASTER_CONTEXT.md Bölüm 4 ve 6'ya göre.
 * Kökteki tüm .html dosyalarını tarar; sorun varsa listeler ve 1 koduyla çıkar.
 *
 *   node scripts/check-compliance.mjs            # kökteki *.html
 *   node scripts/check-compliance.mjs taslak.html
 *
 * Kurallar compliance-rules.json dosyasındadır; yeni bir yasaklı ifade eklemek için orayı düzenleyin.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rules = JSON.parse(readFileSync(path.join(root, 'compliance-rules.json'), 'utf8'));

const args = process.argv.slice(2);
const files = args.length
    ? args.map(f => path.resolve(f))
    : readdirSync(root).filter(f => f.endsWith('.html') && !f.startsWith('_')).map(f => path.join(root, f));

const lower = s => s.toLocaleLowerCase('tr');
// Unicode harf sınırı: "kür" eşleşsin, "Türkiye" içindeki harfler eşleşmesin
const wordRe = w => new RegExp(`(?<![\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'u');

let failed = 0;

for (const file of files) {
    if (!existsSync(file)) { console.error(`✗ ${file} bulunamadı`); failed++; continue; }
    const html = readFileSync(file, 'utf8');
    const text = lower(html.replace(/<!--[\s\S]*?-->/g, ' '));
    const errors = [];
    const lineOf = (needle) => {
        const i = text.indexOf(needle);
        return i < 0 ? '' : `:${text.slice(0, i).split('\n').length}`;
    };

    for (const b of rules.banned) {
        const needle = lower(b.text);
        const hit = b.word ? wordRe(needle).exec(text) : (text.includes(needle) ? { index: text.indexOf(needle) } : null);
        if (hit) errors.push(`Yasaklı ifade "${b.text}"${lineOf(hit[0] ?? needle)} — ${b.reason}`);
    }

    for (const r of rules.required) {
        if (!text.includes(lower(r.text))) errors.push(`Eksik: ${r.label} ("${r.text}")`);
    }

    const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1].trim() ?? '';
    const [tmin, tmax] = rules.titleLength;
    if ([...title].length < tmin || [...title].length > tmax)
        errors.push(`Title ${[...title].length} karakter (${tmin}-${tmax} olmalı): "${title}"`);

    const desc = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(html)?.[1] ?? '';
    const [dmin, dmax] = rules.descriptionLength;
    if ([...desc].length < dmin || [...desc].length > dmax)
        errors.push(`Meta description ${[...desc].length} karakter (${dmin}-${dmax} olmalı)`);

    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) errors.push(`${h1} adet <h1> var (tam 1 olmalı)`);

    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\balt="[^"]{5,}"/i.test(m[0])) errors.push(`Alt metni eksik/kısa görsel: ${m[0].slice(0, 80)}…`);
        if (!/\bwidth=/i.test(m[0]) || !/\bheight=/i.test(m[0])) errors.push(`width/height eksik görsel: ${m[0].slice(0, 80)}…`);
    }

    const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i.exec(html);
    if (ld) { try { JSON.parse(ld[1]); } catch (e) { errors.push(`JSON-LD geçersiz: ${e.message}`); } }

    const rel = path.relative(root, file);
    if (errors.length) {
        failed++;
        console.error(`\n✗ ${rel} — ${errors.length} sorun`);
        for (const e of errors) console.error(`   • ${e}`);
    } else {
        console.log(`✓ ${rel} — uyum kontrolü geçti`);
    }
}

if (failed) {
    console.error('\nKurallar: APHROHARMONY_MASTER_CONTEXT.md §4/§6, DESIGN_BRIEF.md, compliance-rules.json');
    process.exit(1);
}
