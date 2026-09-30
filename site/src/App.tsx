import { useEffect } from 'react';
import { Botanical } from './components/Botanical';
import { BottleAnchor } from './components/Bottle';
import { ArrowIcon, BagIcon, InstagramIcon, LeafIcon, ShieldIcon, TabletIcon } from './components/Icons';
import { Split } from './components/Split';

const INSTAGRAM = 'https://www.instagram.com/alvione.official/';

const INGREDIENTS = [
  'L-Arjinin',
  'Demir dikeni (Tribulus terrestris) ekstresi',
  'Epimedium ekstresi',
  'Lepidyum (Maca kökü) ekstresi',
  'Cüce palmiye ekstresi',
  'Ginkgo Biloba ekstresi',
  'E vitamini',
  'Çinko',
];

const STEPS = [
  {
    n: '01',
    title: 'Günde 1 tablet',
    text: '18 yaş ve üzeri yetişkinler için günde 1 tablet tüketilmesi tavsiye edilir.',
    Icon: TabletIcon,
  },
  {
    n: '02',
    title: 'Porsiyonu aşmayın',
    text: 'Tavsiye edilen günlük porsiyonu aşmayın. Takviye edici gıdalar günlük beslenmenin yerine geçemez.',
    Icon: LeafIcon,
  },
  {
    n: '03',
    title: 'Saklayın, danışın',
    text: 'Çocukların ulaşamayacağı yerde saklayın. Hamilelik ve emzirme dönemiyle, hastalık veya ilaç kullanılması durumlarında doktorunuza danışınız.',
    Icon: ShieldIcon,
  },
];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-canvas/85 backdrop-blur-[2px]">
      <nav className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:px-8" aria-label="Ana menü">
        <div className="flex gap-2">
          <a className="btn-ghost hidden md:inline-flex" href="#hikaye">Hikaye</a>
          <a className="btn-ghost hidden md:inline-flex" href="#icerik">İçerik</a>
          <a className="btn-ghost hidden md:inline-flex" href="#kullanim">Kullanım</a>
        </div>
        <a href="#hero" className="font-display text-[22px] font-bold uppercase leading-none tracking-[-0.005em] md:text-[26px]">
          AphroHarmony
        </a>
        <div className="flex justify-end">
          <a className="btn-ghost" href="#siparis">Sipariş</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh flex-col items-center overflow-hidden px-4 pt-24 text-center md:px-8 md:pt-28">
      <Botanical />
      <p className="hero-fade t-caption relative z-10">NOVACOLIN · Takviye edici gıda · 60 tablet</p>
      <Split as="h1" text="DENGENİ BUL" className="hero-title t-display relative z-10 mt-4 md:mt-5" />
      <p className="hero-fade t-heading relative z-10 mt-3 md:mt-4">Günün tek adımı</p>
      <BottleAnchor
        id="a-hero"
        eager
        sizes="(max-width: 767px) 40vw, 30vh"
        className="relative z-10 mt-6 h-[44svh] w-auto aspect-[709/1366] md:mt-7 md:h-[46svh]"
      />
      <p className="hero-fade t-small relative z-10 mt-auto max-w-[36ch] pb-6 pt-6 opacity-80">
        18 yaş ve üzeri yetişkinler için günde 1 tablet. Aşağı kaydırın.
      </p>
    </section>
  );
}

function Marquee({ text, dir = -1, outline = false }: { text: string; dir?: number; outline?: boolean }) {
  const row = Array.from({ length: 4 }, () => text).join(' · ') + ' · ';
  return (
    <div className="relative overflow-hidden py-6 md:py-10" aria-hidden="true">
      <div className={`marquee t-heading-lg ${outline ? 't-outline' : ''}`} data-dir={dir}>
        {row}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section id="hikaye" className="dotted relative">
      <Botanical seed={1} />
      <div className="relative z-10 mx-auto grid min-h-svh max-w-[1440px] items-center gap-10 px-4 py-20 md:grid-cols-[1.35fr_1fr] md:px-8 md:py-28">
        <div>
          <p className="t-caption mb-5">01 — Marka hikayesi</p>
          <h2 className="t-heading-lg" aria-label="Sade bir rutin">
            <span className="block" data-drift="1" aria-hidden="true">Sade</span>
            <span className="block" data-drift="-1" aria-hidden="true">bir</span>
            <span className="block" data-drift="1" aria-hidden="true">rutin.</span>
          </h2>
          <p className="t-body mt-8 max-w-[46ch] opacity-90">
            AphroHarmony, Novacolin'in takviye edici gıda serisindendir. Bitkisel ekstreler, L-Arjinin,
            E vitamini ve çinkoyu tek bir tablette bir araya getirir. Karmaşık programlar yok; günlük rutine
            eklenen tek bir adım.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="pill pill-gold">60 tablet</span>
            <span className="pill">Günde 1 tablet</span>
            <span className="pill">Vegan uygun</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end md:pr-[6vw]">
          <BottleAnchor id="a-story" sizes="(max-width: 767px) 34vw, 22vh" className="h-[38svh] aspect-[709/1366] md:h-[44svh]" />
        </div>
      </div>
    </section>
  );
}

function Formula() {
  return (
    <section id="icerik" className="dotted relative md:h-svh md:overflow-hidden">
      <div className="mx-auto grid h-full max-w-[1440px] md:grid-cols-2">
        {/* Sol: koyu panel */}
        <div className="relative flex flex-col justify-center bg-surface-2 px-4 py-16 md:px-10 md:pb-10 md:pt-24">
          <Botanical seed={2} />
          <div className="relative z-10">
            <p className="t-caption mb-5">02 — Formül</p>
            <Split as="h2" text="İÇİNDE NE VAR?" className="t-heading-lg" />
            <p className="t-body mt-6 max-w-[44ch] opacity-90">
              Bitkisel ekstreler, L-Arjinin, E vitamini ve çinko: toplam 8 bileşen. Miktarlar için ürün
              etiketine bakınız.
            </p>
            <ol className="formula-list mt-7 grid max-w-[560px] grid-cols-1 gap-x-8 sm:grid-cols-2" aria-label="Formül (8 bileşen)">
              {INGREDIENTS.map((ing, i) => (
                <li key={ing} className="formula-item t-small flex gap-3 border-b border-dotted border-gold/40 py-2">
                  <span className="opacity-60 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ol>
            <p className="t-small mt-5 max-w-[60ch] opacity-70">
              İçermez: şeker, tuz, nişasta, maya, buğday, glüten, soya, süt ürünleri, aroma, renklendirici,
              tatlandırıcı, koruyucu. Vegan ve vejetaryen bireylerin kullanımına uygundur.
            </p>
          </div>
        </div>
        {/* Sağ: kehribar panel — şişe yatık olarak buraya oturur */}
        <div className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-amber px-4 py-14 md:min-h-0 md:pt-24">
          <div className="t-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-amber-deep/60" aria-hidden="true">
            08
          </div>
          <BottleAnchor
            id="a-formula"
            lying
            sizes="(max-width: 767px) 40vw, 22vw"
            className="relative z-10 w-[82vw] max-w-[640px] md:w-[min(40vw,68svh)]"
          />
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2">
            <span className="pill">8 bileşen</span>
            <span className="pill">60 tablet</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Usage() {
  return (
    <section id="kullanim" className="dotted relative">
      <Botanical seed={3} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
        <p className="t-caption mb-5">03 — Kullanım</p>
        <Split as="h2" text="NASIL KULLANILIR" className="t-heading-lg" />
        <ol className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {STEPS.map(({ n, title, text, Icon }) => (
            <li key={n} className="step-card card flex min-h-[240px] flex-col p-4 md:min-h-[300px] md:p-5">
              <div className="flex items-center justify-between">
                <span className="icon-btn h-11 w-11" aria-hidden="true">
                  <Icon />
                </span>
                <span className="t-heading opacity-70" aria-hidden="true">{n}</span>
              </div>
              <h3 className="t-heading-sm mt-auto pt-10">{title}</h3>
              <p className="t-small mt-3 opacity-85">{text}</p>
            </li>
          ))}
        </ol>
        <p className="t-small mt-6 opacity-70">Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz.</p>
      </div>
    </section>
  );
}

function Order() {
  return (
    <section id="siparis" className="dotted relative overflow-hidden">
      <Botanical seed={4} />
      <Marquee text="Günde bir tablet" outline dir={1} />
      <div className="relative z-10 mx-auto grid min-h-svh max-w-[1440px] items-center gap-10 px-4 pb-20 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="t-caption mb-5">04 — Sipariş</p>
          <Split as="h2" text="SİPARİŞ İÇİN YAZIN" className="t-heading-lg" />
          <p className="t-body mt-7 max-w-[42ch] opacity-90">
            Siparişlerinizi Instagram üzerinden, direkt mesajla alıyoruz. Size dönüş yapıp siparişinizi birlikte
            netleştirelim.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn-fill" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-[18px] w-[18px]" />
              Instagram'dan sipariş ver
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a className="btn-ghost normal-case" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              @alvione.official
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <BottleAnchor id="a-order" sizes="(max-width: 767px) 34vw, 24vh" className="h-[40svh] aspect-[709/1366] md:h-[50svh]" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dotted relative bg-surface-2">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16">
        <div aria-hidden="true" className="t-heading-lg t-outline opacity-50">AphroHarmony</div>
        <p className="t-body mt-8 max-w-[70ch]">
          Bu ürün bir gıda takviyesidir. Hastalıkların tedavisinde kullanılmaz. Dengeli ve çeşitli beslenmenin
          yerine geçmez. Önerilen günlük kullanım miktarını aşmayınız.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dotted border-gold/40 pt-6 pr-16 md:pr-20">
          <p className="t-caption opacity-70">© 2026 NOVACOLIN · AphroHarmony · Takviye edici gıda</p>
          <a className="btn-ghost" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2 md:bottom-6 md:right-6">
      <a className="icon-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram: @alvione.official">
        <InstagramIcon />
      </a>
      <a className="icon-btn" href="#siparis" aria-label="Sipariş bölümüne git">
        <BagIcon />
      </a>
    </div>
  );
}

/** Sabit sahne: scroll ile anchor'lar arasında uçan tek şişe */
function Stage() {
  return (
    <div className="stage" aria-hidden="true">
      <div className="stage-intro h-full">
        <div className="stage-float rim h-full">
          {/* canvas: tek fotoğraf ya da görüntü dizisi buraya çizilir (motion.ts) */}
          <canvas />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import('./lib/motion').then(({ initMotion }) => {
      if (!cancelled) dispose = initMotion();
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <>
      <a href="#hikaye" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn-fill">
        İçeriğe geç
      </a>
      <Nav />
      <Stage />
      <main>
        <Hero />
        <Marquee text="NOVACOLIN · AphroHarmony" dir={-1} />
        <Story />
        <Formula />
        <Usage />
        <Order />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
