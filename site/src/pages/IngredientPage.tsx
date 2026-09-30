import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getIngredient, INGREDIENTS } from '../data/ingredients';

const INSTAGRAM = 'https://www.instagram.com/alvione.official/';

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (el) el.setAttribute('content', description);
    return () => {
      document.title = 'AphroHarmony — Novacolin Takviye Edici Gıda';
      el?.setAttribute(
        'content',
        "AphroHarmony, Novacolin'in takviye edici gıdası: bitkisel ekstreler, L-Arjinin, E vitamini ve çinko. 18 yaş ve üzeri yetişkinler için günde 1 tablet.",
      );
    };
  }, [title, description]);
}

function IngNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-canvas/85 backdrop-blur-[2px]">
      <nav
        className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:px-8"
        aria-label="Bileşen menü"
      >
        <div className="flex gap-2">
          <Link className="btn-ghost" to="/blog">
            ← Tüm Bileşenler
          </Link>
        </div>
        <Link
          to="/"
          className="font-display text-[22px] font-bold uppercase leading-none tracking-[-0.005em] md:text-[26px]"
        >
          AphroHarmony
        </Link>
        <div className="flex justify-end">
          <a
            className="btn-ghost hidden md:inline-flex"
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sipariş
          </a>
        </div>
      </nav>
    </header>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="t-caption opacity-60">404</p>
      <h1 className="t-heading">Bileşen Bulunamadı</h1>
      <Link className="btn-fill" to="/blog">
        Tüm Bileşenler
      </Link>
    </div>
  );
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="t-caption opacity-60">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/" className="hover:text-gold transition-colors">Ana Sayfa</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link to="/blog" className="hover:text-gold transition-colors">Bileşenler</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-gold">{name}</li>
      </ol>
    </nav>
  );
}

export default function IngredientPage() {
  const { slug } = useParams<{ slug: string }>();
  const ingredient = getIngredient(slug ?? '');

  useMeta(
    ingredient ? ingredient.metaTitle : 'Bileşen Bulunamadı — AphroHarmony',
    ingredient ? ingredient.metaDescription : 'AphroHarmony formülündeki bu bileşen bulunamadı.',
  );

  if (!ingredient) return <NotFound />;

  const related = INGREDIENTS.filter((i) => i.slug !== ingredient.slug).slice(0, 3);

  return (
    <>
      <IngNav />

      <main className="pt-[68px] md:pt-[72px]">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="dotted px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[860px]">
            <Breadcrumb name={ingredient.name} />
            <h1 className="t-heading-lg mt-6 max-w-[14ch]">{ingredient.name}</h1>
            {ingredient.latinName && (
              <p className="t-body mt-2 italic opacity-50">{ingredient.latinName}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="pill pill-gold">{ingredient.tagline}</span>
              <span className="pill">AphroHarmony — 8 bileşenden biri</span>
            </div>
            <p className="t-body mt-8 max-w-[66ch] leading-relaxed opacity-90">
              {ingredient.intro}
            </p>
          </div>
        </section>

        {/* ── Uzun form içerik bölümleri ───────────────── */}
        <div className="mx-auto max-w-[860px] px-4 md:px-8">
          {ingredient.sections.map((section, i) => (
            <section
              key={section.heading}
              className={`py-10 md:py-14 ${i !== 0 ? 'dotted' : ''}`}
            >
              <h2 className="t-heading mb-6">{section.heading}</h2>
              {section.text.split('\n\n').map((para, j) => (
                <p key={j} className="t-body mb-4 max-w-[68ch] leading-relaxed opacity-90 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* ── SSS / FAQ ────────────────────────────────── */}
        <section className="dotted bg-surface-2 px-4 py-16 md:px-8 md:py-20" aria-label="Sık Sorulan Sorular">
          <div className="mx-auto max-w-[860px]">
            <p className="t-caption mb-8 opacity-60">SSS</p>
            <h2 className="t-heading mb-10">Sık Sorulan Sorular</h2>
            <dl className="divide-y divide-dotted divide-gold/20">
              {ingredient.faq.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="t-heading-sm mb-3">{item.q}</dt>
                  <dd className="t-body max-w-[64ch] opacity-85 leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="dotted bg-amber px-4 py-16 text-center md:px-8 md:py-20">
          <p className="t-caption mb-4 text-amber-deep/70">Takviye edici gıda · 60 tablet</p>
          <h2 className="t-heading text-amber-deep">
            {ingredient.name} AphroHarmony'de
          </h2>
          <p className="t-body mx-auto mt-5 max-w-[46ch] text-amber-deep/80 leading-relaxed">
            {ingredient.name}, AphroHarmony'nin 8 bileşenli formülünde yer almaktadır.
            Bitkisel ekstreler, L-Arjinin, E vitamini ve çinko — hepsi tek bir tablette.
            18 yaş ve üzeri yetişkinler için günde 1 tablet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-amber-deep bg-amber-deep px-7 py-4 text-[13px] font-medium uppercase tracking-[0.01em] text-gold transition-colors hover:bg-transparent hover:text-amber-deep"
            >
              Ürünü İncele →
            </Link>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-deep px-7 py-4 text-[13px] font-medium uppercase tracking-[0.01em] text-amber-deep transition-colors hover:bg-amber-deep hover:text-gold"
            >
              Instagram'dan Sipariş Ver
            </a>
          </div>
        </section>

        {/* ── Diğer bileşenler ──────────────────────────── */}
        <section className="dotted px-4 py-14 md:px-8 md:py-18">
          <div className="mx-auto max-w-[1440px]">
            <p className="t-caption mb-8 opacity-60">Diğer Bileşenler</p>
            <ol className="grid gap-3 sm:grid-cols-3" aria-label="İlgili bileşenler">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/blog/${r.slug}`}
                    className="card flex flex-col gap-3 p-5 transition-colors hover:bg-surface-2"
                  >
                    <p className="t-caption opacity-50">{r.latinName ?? 'Temel bileşen'}</p>
                    <p className="t-heading-sm mt-1">{r.name}</p>
                    <p className="t-small opacity-60 mt-auto pt-4 border-t border-dotted border-gold/20">
                      {r.tagline}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Link className="btn-ghost" to="/blog">
                Tüm 8 Bileşeni Gör
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="dotted bg-surface-2">
        <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16">
          <p className="t-body max-w-[70ch] opacity-80">
            Bu ürün bir gıda takviyesidir. Hastalıkların önlenmesi veya tedavi edilmesi
            amacıyla kullanılmaz. Dengeli ve çeşitli beslenmenin yerine geçemez. Önerilen
            günlük kullanım miktarını aşmayınız. Çocukların ulaşamayacağı yerde saklayın.
            Hamilelik ve emzirme dönemiyle, hastalık veya ilaç kullanılması durumlarında
            doktorunuza danışınız.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dotted border-gold/40 pt-6">
            <p className="t-caption opacity-70">© 2026 NOVACOLIN · AphroHarmony · Takviye edici gıda</p>
            <Link className="btn-ghost" to="/">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
