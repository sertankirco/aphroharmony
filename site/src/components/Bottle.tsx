// Ürün fotoğrafı: etiket olduğu gibi, çerçevesiz/kartsız. Yeniden çizim yok.
export const BOTTLE_ALT =
  'AphroHarmony — Novacolin, 60 tablet: altın kapaklı kehribar cam şişe, lacivert-altın etiket';

export function BottleImg({
  sizes,
  eager = false,
  className = '',
}: {
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      className={`bottle-img ${className}`}
      src="/assets/bottle.webp"
      srcSet="/assets/bottle.webp 354w, /assets/bottle-480.webp 480w, /assets/bottle@2x.webp 709w"
      sizes={sizes}
      width={709}
      height={1366}
      alt={BOTTLE_ALT}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      {...(eager ? { fetchPriority: 'high' as const } : {})}
    />
  );
}

/**
 * Hareket sisteminin hedef noktası. SSR / JS yok / reduced-motion durumunda
 * statik şişeyi gösterir; hareket açıkken görünmez olur ve sabit sahnedeki
 * şişe bu kutunun konumuna/boyutuna uçar.
 */
export function BottleAnchor({
  id,
  sizes,
  className = '',
  lying = false,
  eager = false,
}: {
  id: string;
  sizes: string;
  className?: string;
  lying?: boolean;
  eager?: boolean;
}) {
  return (
    <div id={id} data-lying={lying || undefined} className={`anchor rim ${className}`}>
      <div className={lying ? 'lying-inner' : ''}>
        <BottleImg sizes={sizes} eager={eager} />
      </div>
    </div>
  );
}
