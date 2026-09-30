# Sipariş tıklama takibi (landing → Alvione)

Landing sayfalarındaki her "Sipariş ver" tıklamasını **zamanıyla** kaydeder ve bir panelde gösterir.

- Sipariş linki: https://alvione.com.tr/novacolin-aphroharmony-60-tablet-alvione
- Kayıt yeri: sizin Google E-Tablonuz (`Tiklamalar` sayfası): her satır bir olay.
- Panel: bugün / 7 gün / 30 gün / tüm zamanlar tıklama ve ziyaret sayısı, tıklama oranı, günlük ve saatlik grafik, landing, kaynak (UTM), kampanya, buton ve cihaz kırılımı, son 100 tıklamanın tam saati.

| Landing | Kod | `landing` adı | Butonlar (`data-track`) |
|---|---|---|---|
| Poster sitesi (aphroharmonyv2.vercel.app) | `site/src/lib/order.ts` | `aphroharmonyv2` | `nav`, `yuzen-buton`, `kampanya-serit`, `kampanya-siparis` (kampanya kapalıyken `siparis-bolumu`) |
| Eski landing (kök `index.html`) | `index.html` en alttaki betik | `aphroharmony-v1` | `nav`, `kampanya-serit`, `kampanya-hero`, `kampanya-siparis` |

`kampanya-*` butonları SRTN %5 indirim kampanyasına aittir; paneldeki "Buton" tablosunda kampanya tıklamaları ayrı görünür. Kodun kaç siparişte kullanıldığını ise Alvione panelindeki kupon raporu gösterir.

## Kurulum (bir kez, ~5 dakika)

1. Google Drive'da yeni bir E-Tablo açın (ör. "AphroHarmony Tıklamalar") → **Uzantılar → Apps Script**.
2. `takip/tiklama-takip.gs` dosyasının tamamını yapıştırın (varsayılan kodu silin).
3. En üstteki `PANEL_KEY` değerini yalnızca sizin bildiğiniz uzun bir parolayla değiştirin → **Kaydet**.
4. **Dağıt → Yeni dağıtım → Tür: Web uygulaması**
   - Yürütme: **Ben** · Erişim: **Herkes** → **Dağıt** → Google izinlerini onaylayın.
5. Verilen, `/exec` ile biten URL'yi kopyalayın ve iki yere yapıştırın:
   - `site/src/lib/order.ts` → `export const TRACK_ENDPOINT = '...';`
   - `index.html` → `const TRACK_ENDPOINT = '...';`
6. Siteyi yeniden yayınlayın (`cd site && npm run build` + Vercel deploy / git push).

## Paneli açmak

```
<exec URL>?key=<PANEL_KEY>
```
Yer imlerine ekleyin. Anahtar olmadan sayfa "Yetkisiz." der. Ham veriler E-Tablo'da da durur (filtre, pivot, grafik yapılabilir).

## Reklam / reels linkleri: kaynağı ayırmak için UTM

Landing linkini paylaşırken kaynak ekleyin; panelde "Kaynak" ve "Kampanya" tablolarında ayrı görünür:

```
https://aphroharmonyv2.vercel.app/?utm_source=instagram&utm_medium=reels&utm_campaign=ekim-lansman&utm_content=video1
https://aphroharmonyv2.vercel.app/?utm_source=tiktok&utm_medium=video&utm_campaign=ekim-lansman
https://aphroharmonyv2.vercel.app/?utm_source=instagram&utm_medium=bio
```
UTM yoksa kaynak, geldiği site (`ref: l.instagram.com` gibi) ya da `doğrudan` olarak yazılır.

## Neyi sayar, neyi saymaz

- **Tıklama** = landing'den Alvione ürün sayfasına giden tıklama. Alvione'da siparişin tamamlanıp tamamlanmadığını **göremez**; bunun için Alvione'dan satış raporu (veya kupon kodu / UTM'li satış raporu) istenmeli.
- **Ziyaret** = oturum başına bir kez sayılan landing açılışı; tıklama oranı buna göre hesaplanır.
- Aynı oturumda 3 saniye içinde aynı butona çift tıklama tek sayılır.
- Reklam engelleyiciler veya JavaScript yüklenmeden yapılan çok hızlı tıklamalar kaçabilir; sayılar gerçek değerin alt sınırıdır.
- Kişisel veri (ad, telefon, IP) tutulmaz; yalnızca rastgele oturum kimliği, cihaz tipi (mobil/masaüstü), UTM ve geldiği site adı.

## Kodu değiştirirseniz

Apps Script'te **Dağıt → Dağıtımları yönet → Düzenle (kalem) → Sürüm: Yeni sürüm → Dağıt**. URL aynı kalır.
