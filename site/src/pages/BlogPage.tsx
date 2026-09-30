import { Link } from 'react-router-dom';
import { INGREDIENTS, type Ingredient } from '../data/ingredients';

const INSTAGRAM = 'https://www.instagram.com/alvione.official/';

function BlogNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-canvas/85 backdrop-blur-[2px]">
      <nav
        className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:px-8"
        aria-label="Blog menü"
      >
        <div className="flex gap-2">
          <Link className="btn-ghost hidden md:inline-flex" to="/">
            ← Ana Sayfa
          </Link>
        </div>
        <Link to="/blog" className="font-display text-[22px] font-bold uppercase leading-none tracking-[-0.005em] md:text-[26px]">
          AphroHarmony
        </Link>
        <div className="flex justify-end">
          <a className="btn-ghost" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            Sipariş
          </a>
        </div>
      </nav>
    </header>
  );
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link
      to={`/blog/${ingredient.slug}`}
      className="card group flex flex-col gap-4 p-5 transition-colors duration-200 hover:bg-surface-2 focus-visible:ring-1 focus-visible:ring-gold"
      aria-label={`${ingredient.name} hakkında daha fazla bilgi`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="t-caption opacity-60">{ingredient.latinName ?? 'Temel bileşen'}</p>
        <span className="t-caption opacity-40 group-hover:opacity-70 transition-opacity">→</span>
      </div>
      <h2 className="t-heading-sm mt-auto">{ingredient.name}</h2>
      <p className="t-small opacity-75">{ingredient.tagline}</p>
      <div className="mt-auto pt-4 border-t border-dotted border-gold/30">
        <span className="t-caption text-gold/70 group-hover:text-gold transition-colors">Daha fazla</span>
      </div>
    </Link>
  );
}

function BlogFooter() {
  return (
    <footer className="dotted bg-surface-2">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16">
        <p className="t-body max-w-[70ch] opacity-80">
          Bu ürün bir gıda takviyesidir. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla
          kullanılmaz. Dengeli ve çeşitli beslenmenin yerine geçemez. Önerilen günlük kullanım
          miktarını aşmayınız.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dotted border-gold/40 pt-6">
          <p className="t-caption opacity-70">© 2026 NOVACOLIN · AphroHarmony · Takviye edici gıda</p>
          <Link className="btn-ghost" to="/">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogNav />

      <main className="pt-[68px] md:pt-[72px]">
        {/* Hero */}
        <section className="dotted relative px-4 py-20 text-center md:px-8 md:py-28">
          <p className="t-caption mb-4 opacity-60">NOVACOLIN · AphroHarmony · Formül</p>
          <h1 className="t-heading-lg mx-auto max-w-[12ch]">Formülü Tanı</h1>
          <p className="t-body mx-auto mt-6 max-w-[48ch] opacity-80">
            AphroHarmony, 8 farklı bileşeni tek bir tablette bir araya getirir. Her bileşenin
            hikayesini, fitokimyasal profilini ve araştırma geçmişini burada bulabilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="pill pill-gold">8 bileşen</span>
            <span className="pill">Takviye edici gıda</span>
            <span className="pill">Günde 1 tablet</span>
          </div>
        </section>

        {/* Izgara */}
        <section
          id="icerikler"
          className="dotted mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20"
        >
          <p className="t-caption mb-10 opacity-60">Tüm bileşenler — 8 / 8</p>
          <ol
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="AphroHarmony bileşenleri"
          >
            {INGREDIENTS.map((ing) => (
              <li key={ing.slug}>
                <IngredientCard ingredient={ing} />
              </li>
            ))}
          </ol>
        </section>

        {/* CTA Bant */}
        <section className="dotted bg-surface-2 px-4 py-16 text-center md:px-8 md:py-20">
          <p className="t-caption mb-4 opacity-60">Takviye edici gıda · 60 tablet</p>
          <h2 className="t-heading mx-auto max-w-[18ch]">AphroHarmony'i İncelemeye Hazır mısınız?</h2>
          <p className="t-body mx-auto mt-5 max-w-[44ch] opacity-80">
            18 yaş ve üzeri yetişkinler için günde 1 tablet. Siparişler Instagram üzerinden alınmaktadır.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="btn-fill" to="/">
              Ürünü İncele
            </Link>
            <a
              className="btn-ghost"
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              @alvione.official
            </a>
          </div>
        </section>
      </main>

      <BlogFooter />
    </>
  );
}
