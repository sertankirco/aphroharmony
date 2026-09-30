// Çok silik botanik filigran: maca yaprağı + kök + dal motifleri.
// Tek SVG sembolü tekrar edilir; opacity .watermark sınıfında (~0.06).

const Sprig = ({ x, y, r, s }: { x: number; y: number; r: number; s: number }) => (
  <use href="#aph-sprig" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
);

export function Botanical({ seed = 0 }: { seed?: number }) {
  const items = [
    { x: 80, y: 120, r: -24, s: 1.1 },
    { x: 1260, y: 90, r: 32, s: 1.3 },
    { x: 640, y: 520, r: 8, s: 0.8 },
    { x: 180, y: 760, r: 150, s: 1.2 },
    { x: 1180, y: 720, r: -140, s: 1 },
    { x: 900, y: 260, r: -60, s: 0.7 },
    { x: 380, y: 360, r: 110, s: 0.65 },
  ].map((it, i) => ({ ...it, r: it.r + seed * 37 * (i % 2 ? 1 : -1) }));

  return (
    <div className="watermark" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <g id="aph-sprig" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
            {/* ana gövde */}
            <path d="M0 0C10 -60 8 -130 -6 -210" />
            {/* maca yaprakları: dar, lobsuz, hafif kıvrık */}
            <path d="M2 -40c-30 -8 -52 -26 -60 -52 26 2 48 16 60 52Z" />
            <path d="M4 -70c26 -14 40 -36 42 -62 -24 8 -40 28 -42 62Z" />
            <path d="M0 -112c-28 -12 -44 -34 -46 -60 24 6 40 26 46 60Z" />
            <path d="M-2 -150c22 -16 32 -38 30 -62 -20 10 -32 30 -30 62Z" />
            <path d="M-6 -210c-10 -14 -10 -28 -2 -40 8 12 8 26 2 40Z" />
            {/* yaprak damarları */}
            <path d="M2 -40-40 -78M4 -70 36 -118M0 -112-36 -158M-2 -150 22 -196" strokeWidth=".9" />
            {/* kök yumrusu */}
            <path d="M0 0c-18 8 -22 30 -8 44 14 14 30 4 30 -14 0 -16 -10 -30 -22 -30Z" />
            <path d="M-2 44c-4 18 -14 30 -28 40M10 40c8 14 10 30 6 46" strokeWidth=".9" />
          </g>
        </defs>
        {items.map((it, i) => (
          <Sprig key={i} {...it} />
        ))}
      </svg>
    </div>
  );
}
