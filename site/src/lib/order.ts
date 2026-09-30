// Sipariş bağlantısı ve tıklama takibi.
// Tüm "Sipariş ver" butonları ORDER_URL'ye gider; tıklamalar TRACK_ENDPOINT'e (Google Apps Script → Sheets) yazılır.
// Kurulum: ../../../takip/README.md

export const ORDER_URL = 'https://alvione.com.tr/novacolin-aphroharmony-60-tablet-alvione';

/** Apps Script web uygulamasının /exec ile biten adresi. Boşsa takip kapalıdır, linkler yine çalışır. */
export const TRACK_ENDPOINT = '';

const LANDING = 'aphroharmonyv2';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

function safeStore(store: 'localStorage' | 'sessionStorage') {
  try {
    return window[store];
  } catch {
    return null;
  }
}

function sessionId() {
  const s = safeStore('sessionStorage');
  let id = s?.getItem('aph_sid');
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    s?.setItem('aph_sid', id);
  }
  return id;
}

/** Ziyaretçinin geldiği reklam/reels bilgisini (UTM) oturum boyunca saklar */
function attribution() {
  const s = safeStore('sessionStorage');
  const q = new URLSearchParams(location.search);
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = q.get(k) ?? s?.getItem('aph_' + k) ?? '';
    if (v) s?.setItem('aph_' + k, v);
    out[k] = v;
  }
  if (!s?.getItem('aph_ref')) s?.setItem('aph_ref', document.referrer ? new URL(document.referrer).hostname : '');
  out.ref = s?.getItem('aph_ref') ?? '';
  return out;
}

function send(type: 'view' | 'click', button = '') {
  if (!TRACK_ENDPOINT || typeof window === 'undefined') return;
  const body = JSON.stringify({
    type,
    landing: LANDING,
    page: location.hostname + location.pathname,
    button,
    sid: sessionId(),
    device: matchMedia('(max-width: 767px)').matches ? 'mobil' : 'masaüstü',
    ...attribution(),
  });
  const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
  if (!navigator.sendBeacon?.(TRACK_ENDPOINT, blob)) {
    fetch(TRACK_ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, body }).catch(() => {});
  }
}

/** Sayfa görüntülemesi: oturum başına bir kez (tıklama oranı için) */
export function trackView() {
  const s = safeStore('sessionStorage');
  if (s?.getItem('aph_viewed')) return;
  s?.setItem('aph_viewed', '1');
  send('view');
}

/** data-track="…" taşıyan her linke tıklanınca kaydeder */
export function initOrderTracking() {
  trackView();
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.('a[data-track]');
    if (a) send('click', a.getAttribute('data-track') ?? '');
  };
  // auxclick: orta tık / yeni sekmede aç
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('auxclick', onClick, true);
  };
}
