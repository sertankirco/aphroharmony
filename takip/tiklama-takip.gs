/**
 * AphroHarmony — landing page → Alvione sipariş tıklama takibi (Google Sheets + panel)
 *
 * Landing sayfaları iki tür olay gönderir:
 *   view  : ziyaretçi landing sayfasını açtı (oturum başına 1 kez)
 *   click : ziyaretçi "Sipariş ver" butonuna tıklayıp alvione.com.tr'ye gitti
 *
 * KURULUM (bir kez, ~5 dk) — ayrıntılar: takip/README.md
 * 1. Yeni Google E-Tablo → Uzantılar → Apps Script. Bu dosyanın tamamını yapıştırın.
 * 2. PANEL_KEY'i kendinize özel uzun bir parolayla değiştirin, kaydedin.
 * 3. Dağıt → Yeni dağıtım → Tür: Web uygulaması | Yürütme: Ben | Erişim: Herkes → Dağıt, izin verin.
 * 4. /exec ile biten URL'yi:
 *      site/src/lib/order.ts   → TRACK_ENDPOINT
 *      index.html (kök)        → TRACK_ENDPOINT
 *    alanlarına yapıştırın, siteyi yeniden yayınlayın.
 * 5. Panel: <exec URL>?key=<PANEL_KEY>   (yer imlerine ekleyin; anahtarı paylaşmayın)
 * Kodu değiştirirseniz: Dağıt → Dağıtımları yönet → Düzenle → Sürüm: Yeni sürüm.
 */

const PANEL_KEY = 'BURAYA-UZUN-BIR-PAROLA-YAZIN';
const SHEET_NAME = 'Tiklamalar';
const TZ = 'Europe/Istanbul';
const HEADERS = ['Zaman', 'Olay', 'Landing', 'Sayfa', 'Buton', 'Kaynak (utm_source)', 'Ortam (utm_medium)',
  'Kampanya (utm_campaign)', 'İçerik (utm_content)', 'Referans', 'Cihaz', 'Oturum'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.type !== 'view' && d.type !== 'click') return out({ ok: false });
    const clean = (v, n) => {
      const s = String(v == null ? '' : v).slice(0, n || 120);
      return /^[=+\-@]/.test(s) ? "'" + s : s; // formül enjeksiyonunu engelle
    };
    const sheet = getSheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      // Aynı oturumdan 3 sn içinde gelen aynı tıklamayı (çift tık) yok say
      const last = sheet.getLastRow();
      if (d.type === 'click' && last > 1) {
        const prev = sheet.getRange(last, 1, 1, HEADERS.length).getValues()[0];
        if (prev[1] === 'click' && prev[11] === d.sid && prev[4] === d.button && Date.now() - prev[0].getTime() < 3000) {
          return out({ ok: true, dup: true });
        }
      }
      sheet.appendRow([new Date(), d.type, clean(d.landing, 40), clean(d.page, 200), clean(d.button, 40),
        clean(d.utm_source), clean(d.utm_medium), clean(d.utm_campaign), clean(d.utm_content),
        clean(d.ref), clean(d.device, 20), clean(d.sid, 40)]);
    } finally {
      lock.releaseLock();
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false });
  }
}

function doGet(e) {
  if (!e.parameter.key || e.parameter.key !== PANEL_KEY || PANEL_KEY.indexOf('BURAYA') === 0) {
    return HtmlService.createHtmlOutput('<p style="font-family:sans-serif">Yetkisiz.</p>');
  }
  const days = Math.min(Math.max(parseInt(e.parameter.gun, 10) || 30, 1), 365);
  const t = HtmlService.createTemplate(PANEL_HTML);
  t.data = JSON.stringify(summary(days)).replace(/</g, '\\u003c');
  t.days = days;
  // Panel Google'ın iframe'inde çalışır; aralık linkleri tam /exec adresini kullanmalı
  t.base = JSON.stringify(ScriptApp.getService().getUrl() + '?key=' + encodeURIComponent(PANEL_KEY));
  return t.evaluate().setTitle('AphroHarmony · Sipariş tıklamaları')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy HH:mm:ss');
  }
  return sh;
}

function summary(days) {
  const rows = getSheet().getDataRange().getValues().slice(1);
  const now = new Date();
  const fmt = (d, f) => Utilities.formatDate(d, TZ, f);
  const today = fmt(now, 'yyyy-MM-dd');
  const since = new Date(now.getTime() - days * 864e5);
  const r = {
    today: { view: 0, click: 0 }, d7: { view: 0, click: 0 }, range: { view: 0, click: 0 }, all: { view: 0, click: 0 },
    daily: {}, hourly: new Array(24).fill(0), byLanding: {}, byButton: {}, bySource: {}, byCampaign: {}, byDevice: {},
    recent: [], generated: fmt(now, 'dd.MM.yyyy HH:mm'),
  };
  for (let i = 0; i < days; i++) r.daily[fmt(new Date(now.getTime() - i * 864e5), 'yyyy-MM-dd')] = { view: 0, click: 0 };
  const inc = (o, k, type) => { k = k || '(yok)'; o[k] = o[k] || { view: 0, click: 0 }; o[k][type]++; };

  rows.forEach((row) => {
    const ts = row[0], type = row[1];
    if (!(ts instanceof Date) || (type !== 'view' && type !== 'click')) return;
    r.all[type]++;
    if (fmt(ts, 'yyyy-MM-dd') === today) r.today[type]++;
    if (now - ts < 7 * 864e5) r.d7[type]++;
    if (ts < since) return;
    r.range[type]++;
    const day = fmt(ts, 'yyyy-MM-dd');
    if (r.daily[day]) r.daily[day][type]++;
    inc(r.byLanding, row[2], type);
    inc(r.bySource, row[5] || (row[9] ? 'ref: ' + row[9] : 'doğrudan'), type);
    inc(r.byCampaign, row[7], type);
    inc(r.byDevice, row[10], type);
    if (type === 'click') {
      r.hourly[Number(fmt(ts, 'H'))]++;
      inc(r.byButton, row[4], type);
    }
  });
  for (let i = rows.length - 1; i >= 0 && r.recent.length < 100; i--) {
    const row = rows[i];
    if (row[1] === 'click' && row[0] instanceof Date) {
      r.recent.push([fmt(row[0], 'dd.MM.yyyy HH:mm:ss'), row[2], row[4], row[5] || '', row[7] || '', row[9] || '', row[10]]);
    }
  }
  return r;
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

const PANEL_HTML = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><base target="_top">
<style>
:root{--bg:#0b1c3d;--card:#081530;--line:#1c3563;--gold:#e8b858;--text:#f3ead8;--muted:#9fb0cc}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:20px 16px 40px}
h1{font-size:20px;margin:0 0 4px}h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--gold);margin:0 0 12px}
.sub{color:var(--muted);font-size:12px;margin-bottom:18px}.wrap{max-width:1100px;margin:0 auto}
.grid{display:grid;gap:12px}.kpis{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:12px}
.two{grid-template-columns:repeat(auto-fit,minmax(320px,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:14px 16px;min-width:0}
.kpi .v{font-size:28px;font-weight:700;color:var(--gold);font-variant-numeric:tabular-nums}.kpi .l{color:var(--muted);font-size:12px}
.kpi .s{font-size:12px;margin-top:2px}
table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:6px 8px;border-bottom:1px solid var(--line);white-space:nowrap}
th{color:var(--muted);font-weight:500}td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
.scroll{overflow-x:auto}.bars{display:flex;align-items:flex-end;gap:2px;height:140px}
.bars div{flex:1;background:var(--gold);border-radius:2px 2px 0 0;min-height:1px;position:relative}
.bars div:hover{opacity:.7}.axis{display:flex;justify-content:space-between;color:var(--muted);font-size:11px;margin-top:6px}
.range a{color:var(--gold);margin-right:10px;font-size:13px}.range a.on{font-weight:700;text-decoration:none}
</style></head><body><div class="wrap">
<h1>Sipariş tıklamaları</h1>
<div class="sub">Landing sayfalarından alvione.com.tr sipariş sayfasına giden tıklamalar · Güncelleme: <span id="gen"></span> (İstanbul saati)</div>
<div class="range" id="range"></div><br>
<div class="grid kpis" id="kpis"></div>
<div class="grid two">
  <div class="card"><h2>Günlük tıklama (son <?= days ?> gün)</h2><div class="bars" id="daily"></div><div class="axis" id="dailyAxis"></div></div>
  <div class="card"><h2>Saatlere göre tıklama</h2><div class="bars" id="hourly"></div><div class="axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div></div>
  <div class="card scroll"><h2>Landing sayfası</h2><table id="byLanding"></table></div>
  <div class="card scroll"><h2>Kaynak (utm_source / referans)</h2><table id="bySource"></table></div>
  <div class="card scroll"><h2>Kampanya</h2><table id="byCampaign"></table></div>
  <div class="card scroll"><h2>Buton ve cihaz</h2><table id="byButton"></table><br><table id="byDevice"></table></div>
</div>
<div class="card scroll" style="margin-top:12px"><h2>Son 100 tıklama</h2><table id="recent"></table></div>
</div>
<script>
const D = <?!= data ?>, DAYS = <?= days ?>, BASE = <?!= base ?>;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rate = (o) => o.view ? (100 * o.click / o.view).toFixed(1) + '%' : '–';
$('gen').textContent = D.generated;
$('range').innerHTML = [1, 7, 30, 90, 365].map((d) => '<a class="' + (d === DAYS ? 'on' : '') + '" href="' + esc(BASE) + '&gun=' + d + '">' + (d === 1 ? 'Bugün' : d + ' gün') + '</a>').join('');
const kpi = (l, o) => '<div class="card kpi"><div class="l">' + l + '</div><div class="v">' + o.click + '</div><div class="s">tıklama · ' + o.view + ' ziyaret · oran ' + rate(o) + '</div></div>';
$('kpis').innerHTML = kpi('Bugün', D.today) + kpi('Son 7 gün', D.d7) + kpi('Seçili aralık (' + DAYS + ' gün)', D.range) + kpi('Tüm zamanlar', D.all);
function bars(el, vals, labels) {
  const max = Math.max(1, ...vals);
  $(el).innerHTML = vals.map((v, i) => '<div title="' + esc(labels[i]) + ': ' + v + ' tıklama" style="height:' + (100 * v / max) + '%"></div>').join('');
}
const days = Object.keys(D.daily).sort();
bars('daily', days.map((d) => D.daily[d].click), days.map((d) => d.split('-').reverse().join('.')));
$('dailyAxis').innerHTML = '<span>' + days[0].split('-').reverse().join('.') + '</span><span>' + days[days.length - 1].split('-').reverse().join('.') + '</span>';
bars('hourly', D.hourly, D.hourly.map((_, h) => (h < 10 ? '0' : '') + h + ':00'));
function table(el, obj, head, withRate) {
  const rows = Object.entries(obj).sort((a, b) => b[1].click - a[1].click || b[1].view - a[1].view);
  $(el).innerHTML = '<tr><th>' + head + '</th><th class="n">Tıklama</th>' + (withRate ? '<th class="n">Ziyaret</th><th class="n">Oran</th>' : '') + '</tr>' +
    (rows.length ? rows.map(([k, o]) => '<tr><td>' + esc(k) + '</td><td class="n">' + o.click + '</td>' + (withRate ? '<td class="n">' + o.view + '</td><td class="n">' + rate(o) + '</td>' : '') + '</tr>').join('') : '<tr><td colspan="4">Henüz veri yok</td></tr>');
}
table('byLanding', D.byLanding, 'Landing', true);
table('bySource', D.bySource, 'Kaynak', true);
table('byCampaign', D.byCampaign, 'Kampanya', true);
table('byButton', D.byButton, 'Buton', false);
table('byDevice', D.byDevice, 'Cihaz', true);
$('recent').innerHTML = '<tr><th>Zaman</th><th>Landing</th><th>Buton</th><th>Kaynak</th><th>Kampanya</th><th>Referans</th><th>Cihaz</th></tr>' +
  (D.recent.length ? D.recent.map((r) => '<tr>' + r.map((c) => '<td>' + esc(c) + '</td>').join('') + '</tr>').join('') : '<tr><td colspan="7">Henüz tıklama yok</td></tr>');
</script></body></html>`;
