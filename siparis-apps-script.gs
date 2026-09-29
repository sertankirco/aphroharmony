/**
 * AphroHarmony sipariş formu -> Google Sheets
 *
 * KURULUM
 * 1. Yeni bir Google E-Tablo açın. Uzantılar > Apps Script.
 * 2. Bu dosyanın içeriğini yapıştırın, NOTIFY_EMAIL'i doldurun, kaydedin.
 * 3. Dağıt > Yeni dağıtım > Tür: Web uygulaması
 *      Yürütme: Ben   |   Erişim: Herkes
 * 4. Verilen /exec ile biten URL'yi index.html içindeki ORDER_CONFIG.endpoint alanına yapıştırın.
 * 5. Kodu değiştirirseniz: Dağıt > Dağıtımları yönet > Düzenle > Yeni sürüm.
 */

const SHEET_NAME = 'Siparisler';
const NOTIFY_EMAIL = ''; // Boş bırakılırsa e-posta gönderilmez

function doPost(e) {
  try {
    const order = JSON.parse(e.postData.contents);
    const required = ['name', 'phone', 'address', 'package'];
    for (const key of required) {
      if (!order[key] || String(order[key]).trim() === '') {
        return json({ ok: false, error: 'Eksik alan: ' + key });
      }
    }
    if (order.kvkkConsent !== true) {
      return json({ ok: false, error: 'KVKK onayı yok' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tarih', 'Ad Soyad', 'Telefon', 'Paket', 'Adres', 'KVKK Onayı', 'Sayfa', 'Durum']);
    }
    // Başına ' eklenerek formül enjeksiyonu (=, +, -, @) engellenir
    const safe = (v) => "'" + String(v).slice(0, 500);
    sheet.appendRow([
      new Date(), safe(order.name), safe(order.phone), safe(order.package),
      safe(order.address), 'Evet', safe(order.page || ''), 'Yeni',
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'Yeni AphroHarmony siparişi',
        `Ad: ${order.name}\nTel: ${order.phone}\nPaket: ${order.package}\nAdres: ${order.address}`);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
