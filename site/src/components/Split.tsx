import type { CSSProperties, ElementType } from 'react';

// Başlığı kelime/harf span'lerine böler (harf stagger için).
// Erişilebilir ad aria-label'da; görsel span'ler ekran okuyucudan gizli.
export function Split({
  as: Tag = 'div',
  text,
  className = '',
  id,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  id?: string;
}) {
  const words = text.split(' ');
  let i = 0; // --i: CSS stagger sırası
  return (
    <Tag id={id} className={`split ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span className="w" aria-hidden="true" key={wi}>
          {[...w].map((ch, ci) => (
            <span className="c" key={ci} style={{ '--i': i++ } as CSSProperties}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
