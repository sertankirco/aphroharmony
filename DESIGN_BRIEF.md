# AphroHarmony — Tasarım Brief'i (yeniden tasarım için)

> Bu dosyayı ve `APHROHARMONY_MASTER_CONTEXT.md`'yi tasarım aracına (Claude, v0, Lovable, Cursor vb.) **tasarımdan önce** verin.
> Görsel dil tamamen serbesttir. Aşağıdaki **içerik, SEO ve form sözleşmesi** değişmez.
> Kontrol: `node scripts/check-compliance.mjs` — geçmeyen sayfa commit edilemez (pre-commit) ve GitHub'da kırmızı görünür.

---

## 1. Ürün gerçekleri (yalnızca bunlar)
- **Ürün:** AphroHarmony — Novacolin. Kategori: **takviye edici gıda**.
- **8 bileşen:** L-Arjinin · Demir dikeni (Tribulus terrestris) ekstresi · Epimedium ekstresi · Lepidyum (Maca kökü) ekstresi · Cüce palmiye ekstresi · Ginkgo Biloba ekstresi · E vitamini · Çinko. *(Dozaj bilinmiyor; yazmayın.)*
- **Kullanım:** 18 yaş ve üzeri yetişkinler için günde 1 tablet tüketilmesi tavsiye edilir.
- **İçermez:** Şeker, tuz, nişasta, maya, buğday, glüten, soya, süt ürünleri, aroma, renklendirici, tatlandırıcı, koruyucu.
- **Uygunluk:** Vegan ve vejetaryen bireylerin kullanımına uygundur.
- **Uyarılar (5'i de sayfada olmalı):**
  1. Tavsiye edilen günlük porsiyonu aşmayın.
  2. Takviye edici gıdalar günlük beslenmenin yerine geçemez.
  3. Çocukların ulaşamayacağı yerde saklayın.
  4. Hamilelik ve emzirme dönemiyle, hastalık veya ilaç kullanılması durumlarında doktorunuza danışınız.
  5. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz.
- **Footer'da zorunlu:** "Takviye edici gıdadır. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz."
- **Sipariş:** yalnızca Alvione ürün sayfası — https://alvione.com.tr/novacolin-aphroharmony-60-tablet-alvione. Sayfada kendi paket/fiyat tablosu yok (eski 1.290 / 2.190 / 2.990 TL paketleri kullanılmaz); fiyat ve kargo Alvione'da.

## 2. Asla yazılmayacaklar
Tam liste: `compliance-rules.json`. Özetle:
- **Cinsel ima:** hakimiyet, sarsılmaz, özel anlar, partner, bedensel özgüven, akşam/gece saati vurgusu, "güç" ile cinsel bağlam.
- **Sağlık/etki iddiası:** biyoyararlanım, hücresel, adaptojen, oksijen, zihinsel sis, çöküş, salınım, 24 saat, yan etkisiz, kalp ritmi, tedavi/iyileştirme, klinik/kanıtlanmış.
- **İlaç karşılaştırması:** sentetik ilaç/uyarıcı, çarpıntı, tolerans, eczane, damar.
- **Uydurma:** Awwwards, Limited/Exclusive/Batch, VIP / aynı gün kargo, garanti, sınırlı stok, "kür", %100 doğal, bakanlık onayı, "6 doğal bileşen", uçtan uca şifreleme, **Ginseng** (içerikte yok).
- **Görsel:** Unsplash/stok ürün görseli, etiketi yeniden tasarlamak, kutu/blister/tablet çizmek.
- **Hitap:** İkinci tekil şahısla eksiklik ima etmek ("Eskisi kadar dinamik değil misin?").

## 3. Korunacak teknik parçalar
1. **`<head>` SEO bloğu** — `<!-- SEO BLOĞU -->` ile `<!-- /SEO BLOĞU -->` arasını olduğu gibi taşıyın (title ≤60, meta description 120–160, canonical, Open Graph, Twitter kartı, favicon, Product JSON-LD).
2. **Tek `<h1>`**, Türkçe ve görünür. Dekoratif büyük yazılar `<div aria-hidden="true">`.
3. **Ürün görseli:** `assets/aphroharmony-product-640|1059.webp/.jpg` (`<picture>` + `width="1059" height="1486"` + Türkçe `alt`). Fotoğraf siyah zeminli; koyu tasarımda doğrudan oturur.
4. **Sipariş sözleşmesi:** her "Sipariş ver" butonu `href="https://alvione.com.tr/novacolin-aphroharmony-60-tablet-alvione"` + `target="_blank" rel="noopener"` + benzersiz `data-track="<buton-adı>"` (ör. `nav`, `hero`, `siparis-bolumu`). Sayfanın sonundaki `TRACK_ENDPOINT` tıklama takibi betiği korunur (bkz. `takip/README.md`). Sipariş formu, KVKK kutusu ve kişisel veri toplama **yok**.
5. **Animasyonlar:** GSAP/Lenis yüklenemezse veya `prefers-reduced-motion` açıksa içerik görünür kalmalı; sipariş linkleri ve takip betiği animasyon koduna bağımlı olmamalı.
6. Kütüphane sürümleri sabit (`@latest` yok).

## 4. Tasarım aracına verilecek hazır istem
```
Ekteki APHROHARMONY_MASTER_CONTEXT.md ve DESIGN_BRIEF.md bağlayıcıdır.
index.html için yeni bir görsel tasarım yap; görsel dil serbest.
DESIGN_BRIEF.md §1'deki metinleri aynen kullan, §2'deki hiçbir ifadeyi kullanma,
§3'teki SEO bloğunu, sipariş sözleşmesini (Alvione linki + data-track + TRACK_ENDPOINT betiği) ve görsel dosyalarını koru.
Yeni iddia, rakam, rozet veya kampanya uydurma.
Bitince `node scripts/check-compliance.mjs` hatasız geçmeli.
```
