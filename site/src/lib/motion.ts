import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOTTLE_SEQUENCE, createSequence } from './sequence';

/**
 * Scroll sahnesi.
 *
 * Tek bir sabit (position: fixed) şişe, sayfadaki "anchor" kutuları arasında uçar:
 *   hero (merkez, float) → hikaye (küçük, sağda) → içerik (yatık, sağ panelde, pin)
 *   → kaybolur (kullanım kartları) → sipariş (tekrar dik) → footer'da kaybolur.
 *
 * Her geçiş kendi ScrollTrigger'ına bağlı (scrub: true) ve hedefler anchor'ların
 * ölçülen kutularından hesaplanır; böylece her ekran boyutunda şişe tam anchor'a oturur.
 * Sadece transform + opacity animasyonu yapılır.
 */

type State = { x: number; y: number; scale: number; rotation: number; opacity: number };
type StateFn = () => State;

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

/** State fonksiyonunu, her refresh'te yeniden ölçülen GSAP değerlerine çevirir */
const vars = (fn: StateFn, extra: Partial<State> = {}) => ({
  x: () => fn().x + (extra.x ?? 0),
  y: () => fn().y + (extra.y ?? 0),
  scale: () => fn().scale * (extra.scale ?? 1),
  rotation: () => (extra.rotation ?? fn().rotation),
  opacity: () => (extra.opacity ?? fn().opacity),
});

/** Hero görselinin tarayıcının seçtiği (önbellekteki) sürümünü canvas'a bir kez çizer */
function drawStill(canvas: HTMLCanvasElement, source: HTMLImageElement) {
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d')?.drawImage(img, 0, 0);
  };
  img.src = source.currentSrc || source.src;
}

export function initMotion(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const html = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
      motionOK: '(prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const { desktop, motionOK } = ctx.conditions as Record<string, boolean>;
      if (!motionOK) return; // reduced-motion: statik anchor görselleri görünür kalır

      html.classList.add('motion');

      const stage = $('.stage');
      const float = $('.stage-float', stage);
      const hero = $('#hero');
      const formula = $('#icerik');
      const heroA = $('#a-hero');
      const storyA = $('#a-story');
      const formulaA = $('#a-formula');
      const orderA = $('#a-order');
      const usage = $('#kullanim');
      const vh = () => window.innerHeight;

      /** anchor kutusunu sahnedeki şişenin x/y/scale değerine çevirir */
      const measure = (anchor: HTMLElement, relTo: HTMLElement | null): State => {
        const a = anchor.getBoundingClientRect();
        const h = stage.offsetHeight || 1;
        const lying = anchor.dataset.lying !== undefined;
        const cy = a.top + a.height / 2;
        return {
          x: a.left + a.width / 2 - window.innerWidth / 2,
          // relTo: anchor'ın bölüm içindeki konumu (bölüm üstü ekran üstündeyken);
          // null: geçiş anchor "center center" olduğunda biter → y = 0
          y: relTo ? cy - relTo.getBoundingClientRect().top - vh() / 2 : 0,
          scale: (lying ? a.width : a.height) / h,
          rotation: lying ? -90 : 0,
          opacity: 1,
        };
      };

      const S = {
        hero: () => measure(heroA, hero),
        story: () => ({ ...measure(storyA, null), rotation: 5 }),
        formula: () => measure(formulaA, desktop ? formula : null),
        order: () => ({ ...measure(orderA, null), rotation: -4 }),
      };

      gsap.set(stage, { xPercent: -50, yPercent: -50, transformPerspective: 1100, ...S.hero() });

      // Görüntü dizisi varsa kareleri, yoksa tek fotoğrafı canvas'a çiz (tek fotoğraf 2.5D döner).
      // Canvas bilinçli: sahnedeki kopya bir LCP adayı olmaz, SSR'daki hero <img> LCP kalır.
      const canvas = $<HTMLCanvasElement>('canvas', stage);
      const seq = BOTTLE_SEQUENCE ? createSequence(canvas, BOTTLE_SEQUENCE) : null;
      if (!seq) drawStill(canvas, $<HTMLImageElement>('img', heroA));
      const spinY = desktop ? 34 : 18;

      // ── Giriş: hero harf stagger'ı saf CSS'tedir (index.css, JS beklemez).
      // Şişe SSR'daki hero görseliyle aynı yerde belirir → LCP gecikmez; burada sadece float.
      gsap.to(float, { y: -14, rotation: 1.2, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // ── A: hero → hikaye (küçülür, döner, başlığın önünden geçer) ─────────
      const a = gsap.timeline({
        scrollTrigger: {
          trigger: hero, start: 'top top', endTrigger: storyA, end: 'center center',
          scrub: true, invalidateOnRefresh: true,
          onUpdate: seq ? (st) => seq.render(st.progress * 0.5) : undefined,
        },
      });
      a.fromTo(stage, vars(S.hero), { ...vars(S.story), ease: 'none', duration: 1, immediateRender: false })
        .fromTo(stage, { rotationY: 0 }, { rotationY: -spinY, ease: 'sine.inOut', duration: 0.5, immediateRender: false }, 0)
        .to(stage, { rotationY: 0, ease: 'sine.inOut', duration: 0.5 }, 0.5);

      // ── B: hikaye → içerik (yatık pozisyon, sağ panele oturur) ────────────
      const b = gsap.timeline({
        scrollTrigger: {
          trigger: storyA, start: 'center center',
          ...(desktop ? { endTrigger: formula, end: 'top top' } : { endTrigger: formulaA, end: 'center center' }),
          scrub: true, invalidateOnRefresh: true,
          onUpdate: seq ? (st) => seq.render(0.5 + st.progress * 0.5) : undefined,
        },
      });
      b.fromTo(stage, vars(S.story), { ...vars(S.formula), ease: 'power1.inOut', duration: 1, immediateRender: false })
        .fromTo(stage, { rotationY: 0 }, { rotationY: spinY, ease: 'sine.inOut', duration: 0.5, immediateRender: false }, 0)
        .to(stage, { rotationY: 0, ease: 'sine.inOut', duration: 0.5 }, 0.5);

      // ── C: içerik bölümü pin (masaüstü) + formül listesi stagger ──────────
      let pin: ScrollTrigger | null = null;
      const listItems = $$('.formula-item');
      if (desktop) {
        pin = ScrollTrigger.create({ trigger: formula, start: 'top top', end: '+=80%', pin: true, anticipatePin: 1 });
        gsap.fromTo(listItems, { opacity: 0, x: -24 }, {
          opacity: 1, x: 0, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: formula, start: 'top top', end: '+=55%', scrub: true },
        });
        gsap.fromTo(stage, { rotation: -90 }, {
          rotation: -84, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: formula, start: 'top top', end: '+=80%', scrub: true },
        });
      } else {
        gsap.from(listItems, {
          opacity: 0, x: -16, stagger: 0.06, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.formula-list', start: 'top 85%' },
        });
      }

      // ── D: içerik → kullanım (panelle birlikte yukarı kayar ve söner) ─────
      const dDist = 0.55;
      const dFrom = desktop ? { rotation: -84 } : {};
      gsap.fromTo(stage, vars(S.formula, dFrom), {
        ...vars(S.formula, { ...dFrom, opacity: 0 }),
        y: () => S.formula().y - vh() * dDist,
        rotation: -130,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          ...(pin
            ? { start: () => pin!.end, end: () => pin!.end + vh() * dDist }
            : { trigger: formulaA, start: 'center center', end: `center ${50 - dDist * 100}%` }),
          scrub: true, invalidateOnRefresh: true,
        },
      });

      // ── E: sipariş (aşağıdan dik olarak geri gelir) ───────────────────────
      const e = gsap.timeline({
        scrollTrigger: {
          trigger: '#siparis', start: 'top 60%', endTrigger: orderA, end: 'center center',
          scrub: true, invalidateOnRefresh: true,
        },
      });
      e.fromTo(stage, { ...vars(S.order, { opacity: 0, rotation: 16, scale: 0.7 }), y: () => vh() * 0.55 },
        { ...vars(S.order), ease: 'power2.out', duration: 1, immediateRender: false })
        .fromTo(stage, { rotationY: spinY }, { rotationY: 0, ease: 'sine.out', duration: 1, immediateRender: false }, 0);

      // ── F: sipariş anchor'ı yukarı kayarken onu izler ve söner ───────────
      // (E'nin bittiği noktadan başlar; aradaki boşlukta şişe sabit kalmaz)
      const fDist = desktop ? 0.4 : 0.2;
      gsap.fromTo(stage, vars(S.order), {
        ...vars(S.order, { opacity: 0 }),
        y: () => -vh() * fDist,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: orderA, start: 'center center', end: `center ${50 - fDist * 100}%`, scrub: true, invalidateOnRefresh: true },
      });

      // ── Dev başlıklar: harf stagger + yatay kayma ─────────────────────────
      $$('.split:not(.hero-title)').forEach((el) => {
        gsap.from($$('.c', el), {
          yPercent: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.022,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
      const drift = desktop ? 7 : 4;
      $$('[data-drift]').forEach((el) => {
        const dir = Number(el.dataset.drift) || 1;
        gsap.fromTo(el, { x: `${drift * dir}vw` }, {
          x: `${-drift * dir}vw`, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      $$('.marquee').forEach((el) => {
        const dir = Number(el.dataset.dir) || -1;
        const span = desktop ? 30 : 45;
        gsap.fromTo(el, { xPercent: dir < 0 ? 0 : -span }, {
          xPercent: dir < 0 ? -span : 0, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      gsap.from('.step-card', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: usage, start: 'top 60%' },
      });

      return () => html.classList.remove('motion');
    },
  );

  // Font ve görseller geldikçe ölçümleri yenile
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });

  return () => {
    window.removeEventListener('load', refresh);
    mm.revert();
  };
}
