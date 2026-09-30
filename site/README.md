# AphroHarmony — poster site

Tek sayfalık, scroll animasyonlu tanıtım sitesi. Vite + React + TypeScript, Tailwind v4, GSAP + ScrollTrigger.
Tasarım dili Refero'daki "Hungry Tiger" sisteminin **kurallarından** uyarlandı (logo, isim, görsel ve metin alınmadı).

```bash
npm install
npm run dev       # geliştirme
npm run build     # tip kontrolü + build + prerender (dist/)
npm run preview   # dist/'i 4173 portunda sunar
npm run check     # dist/index.html üzerinde uyum kontrolü (../scripts/check-compliance.mjs)
node scripts/shots.mjs   # preview açıkken masaüstü + mobil ekran görüntüleri → shots/
```

## Renkler (`src/index.css` → `:root`)

Ürün fotoğrafından örneklendi. Tek parlak vurgu altın; derinlik yalnızca üç lacivert tonla verilir (gölge/glow yok).

| Değişken | Değer | Rol |
|---|---|---|
| `--canvas` | `#0b1c3d` | Sayfa zemini, tüm bölümlerde aynı |
| `--surface-1` | `#081530` | Kart, input, rozet |
| `--surface-2` | `#040b1c` | En derin yüzey (sol panel, footer) |
| `--line` | `#1c3563` | İnce çerçeve |
| `--gold` | `#e8b858` | Etiketteki altın: buton, çizgi, ikon, başlık, metin |
| `--amber` | `#8c3404` | Şişedeki kehribar: "İçinde ne var" sağ paneli |
| `--amber-deep` | `#5e1a02` | Kehribar panel üstündeki silik dekor |

Tailwind'de aynı adlarla kullanılabilir: `bg-canvas`, `bg-surface-1`, `text-gold`, `bg-amber`…

## Yazı tipleri

- **Antonio 700**: tek display font (Salmond yerine). Ölçek: `.t-display` 213px, `.t-heading-lg` 160px, `.t-heading` 65px, `.t-heading-sm` 29px; line-height 0.84–1.05, büyüdükçe tracking daralır (-0.02em → +0.02em).
- **Inter 500**: gövde (en fazla 18px / 1.4), buton etiketleri (13px), caption (11px, +0.02em).
- `@fontsource` ile yerel olarak sunulur (yalnızca latin + latin-ext), `font-display: swap`. Antonio build'de preload edilir.
- Sayfa `lang="tr"`: CSS `uppercase`, `i` harfini `İ` yapar. Marka adları (NOVACOLIN) bu yüzden kaynakta büyük harfle yazıldı; Instagram kullanıcı adı `normal-case`.

## Bileşen kuralları

Buton / rozet / input / ikon kutusu tam hap (`9999px`); 6px radius sadece kartlarda. Ghost buton: 1px altın çerçeve, `8px 17px`, 13px. Tek dolgu buton: sipariş CTA'sı. Bölümler arası `1px dotted` altın çizgi. İkonlar 1.5px çizgi, dolgusuz. Botanik filigran (`Botanical.tsx`) ~%6 opaklıkta. Şişe çerçevesiz; arkasında yalnızca çok hafif sıcak rim-light (radial-gradient, gölge değil).

## Animasyon mantığı (`src/lib/motion.ts`)

- Sayfada her durak için bir **anchor** kutusu var (`#a-hero`, `#a-story`, `#a-formula` yatık, `#a-order`). SSR, JS'siz ve `prefers-reduced-motion` durumunda anchor'lar statik şişeyi gösterir.
- Hareket açıkken `html.motion` sınıfı eklenir; anchor'lar görünmez olur ve **tek sabit şişe** (`.stage`) anchor'ların ölçülen kutuları arasında uçar. Hedefler her `ScrollTrigger.refresh`'te yeniden ölçüldüğü için her ekran boyutunda şişe tam anchor'a oturur.
- Geçişler (hepsi `scrub: true`, sadece `transform` + `opacity`):
  - **A** hero → hikaye: küçülür, `rotateY` ile 2.5D döner, dev yazıların önünden geçer.
  - **B** hikaye → içerik: `-90°` yatar ve kehribar panele oturur.
  - **C** içerik bölümü **pin** (masaüstü `+=80%`; mobilde pin yok), formül listesi stagger ile girer.
  - **D** panelle birlikte yukarı kayıp söner → **E** siparişte aşağıdan dik geri gelir → **F** anchor'la birlikte kayıp söner.
- Başlık harfleri stagger ile girer (`Split.tsx`, erişilebilir ad `aria-label`'da); `data-drift` satırları ve `.marquee` şeritleri scroll ile yatay kayar.
- `gsap.matchMedia`: mobilde daha az dönüş, pin yok, daha kısa mesafeler; reduced-motion'da hiçbir animasyon kurulmaz.
- Hero şişesi SSR'da anchor olarak boyanır (LCP), sabit sahne aynı noktada devralır.

### 360° görüntü dizisi

`src/lib/sequence.ts` içindeki `BOTTLE_SEQUENCE`'ı doldurun (ör. `public/assets/seq/bottle-000.webp … 119`). Sahne otomatik olarak `<img>` yerine `<canvas>` kullanır ve A+B geçişlerinin ilerlemesine göre kare çizer; CSS 3D dönüş yine üstüne eklenir (istenirse `spinY` 0 yapılabilir).

## Görseller

`public/assets/bottle.webp` (354×683) ve `bottle@2x.webp` (709×1366): `../aphroharmonyproduct.png` zaten şeffaf zeminliydi; yalnızca kırpıldı, yarı saydam alfa (253) düzeltildi ve WebP'ye çevrildi. Etiket değiştirilmedi. Kaynak 1059×1486 olduğu için daha büyük bir sürüm üretilmedi.

## Uyum

- Sipariş Alvione ürün sayfasından: `src/lib/order.ts` → `ORDER_URL` (https://alvione.com.tr/novacolin-aphroharmony-60-tablet-alvione). Menü, sipariş bölümü ve yüzen buton bu linke yeni sekmede gider; Instagram (`@alvione.official`) yalnızca sorular için. Sayfada kişisel veri toplayan form **yok**.
- Tıklama takibi: `data-track="…"` taşıyan her link tıklandığında `TRACK_ENDPOINT`'e (Google Apps Script → Sheets) kayıt gider; oturum başına bir "view" da gönderilir. Kurulum ve panel: `../takip/README.md`. `TRACK_ENDPOINT` boşsa takip kapalıdır, linkler çalışmaya devam eder.
- `npm run check` kök kurallarını olduğu gibi uygular (sipariş linki ve `data-track` zorunlu).
- İçerik bileşenleri yalnızca küçük puntolu formül listesinde; 5 uyarı + footer yasal satırı sayfada.
- Canonical/OG adresleri `https://aphroharmonyv2.vercel.app/` — başka bir alan adına yayınlanırsa `index.html`'de güncelleyin.
