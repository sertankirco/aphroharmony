/**
 * 360° görüntü dizisi (image-sequence) için hazır kanca.
 *
 * Şu an tek fotoğraf var; şişe CSS 3D transform ile 2.5D döner.
 * Gerçek bir 360° kare dizisi ya da videodan çıkarılmış kareler eklendiğinde:
 *
 *   1. Kareleri public/assets/seq/ altına koyun: bottle-000.webp … bottle-119.webp
 *      (ffmpeg -i spin.mp4 -vf "scale=-2:1366,format=rgba" public/assets/seq/bottle-%03d.webp)
 *   2. Aşağıdaki BOTTLE_SEQUENCE'ı doldurun (null yerine).
 *
 * Sahne otomatik olarak <img> yerine <canvas> kullanır ve scroll ilerlemesine
 * göre kare çizer (motion.ts → sequence.render(progress)).
 */
export type SequenceConfig = {
  /** {i} → sıfır dolgulu kare numarası */
  pattern: string;
  frames: number;
  pad: number;
  width: number;
  height: number;
};

export const BOTTLE_SEQUENCE: SequenceConfig | null = null;
// Örnek:
// export const BOTTLE_SEQUENCE: SequenceConfig | null = {
//   pattern: '/assets/seq/bottle-{i}.webp', frames: 120, pad: 3, width: 709, height: 1366,
// };

export function createSequence(canvas: HTMLCanvasElement, cfg: SequenceConfig) {
  canvas.width = cfg.width;
  canvas.height = cfg.height;
  const ctx = canvas.getContext('2d');
  const imgs: HTMLImageElement[] = [];
  let current = -1;

  const src = (i: number) => cfg.pattern.replace('{i}', String(i).padStart(cfg.pad, '0'));

  const draw = (i: number) => {
    const img = imgs[i];
    if (!ctx || !img || !img.complete || !img.naturalWidth) return false;
    ctx.clearRect(0, 0, cfg.width, cfg.height);
    ctx.drawImage(img, 0, 0, cfg.width, cfg.height);
    current = i;
    return true;
  };

  // İlk kare hemen, kalanlar boşta yüklenir
  for (let i = 0; i < cfg.frames; i++) {
    const img = new Image();
    img.decoding = 'async';
    if (i === 0) img.onload = () => draw(0);
    imgs.push(img);
  }
  imgs[0].src = src(0);
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? window.requestIdleCallback(cb) : setTimeout(cb, 200);
  idle(() => imgs.forEach((img, i) => i > 0 && (img.src = src(i))));

  return {
    /** progress 0..1 → kare */
    render(progress: number) {
      const i = Math.round(Math.min(1, Math.max(0, progress)) * (cfg.frames - 1));
      if (i === current) return;
      // Kare henüz yüklenmediyse en yakın yüklü kareyi göster
      for (let d = 0; d < cfg.frames; d++) {
        if (draw(i - d) || draw(i + d)) return;
      }
    },
  };
}
