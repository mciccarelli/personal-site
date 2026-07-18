'use client';

import { useState } from 'react';

export type Row = {
  title: string;
  sup?: string;
  meta?: string;
  url?: string;
  thumbnail?: string;
  video?: string;
};

export default function Rows({ items }: { items: Row[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? items[hovered] : null;
  const preview = active && (active.video || active.thumbnail) ? active : null;

  return (
    <>
      <ul>
        {items.map((item, i) => {
          const isHovered = hovered === i;
          const dimmed = hovered !== null && !isHovered;

          const inner = (
            <>
              <span className={`transition-colors duration-200 ${dimmed ? 'text-faint' : 'text-foreground'}`}>
                {item.title}
                {item.sup ? (
                  <sup
                    className={`ml-0.5 text-[0.625rem] transition-colors duration-200 ${
                      dimmed ? 'text-faint' : 'text-muted'
                    }`}
                  >
                    {item.sup}
                  </sup>
                ) : null}
              </span>
              <span
                className={`flex shrink-0 items-center gap-1.5 transition-colors duration-200 ${
                  dimmed ? 'text-faint' : isHovered && item.url ? 'text-foreground' : 'text-muted'
                }`}
              >
                {item.meta}
                {item.url ? (
                  <span
                    aria-hidden
                    className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  >
                    &rarr;
                  </span>
                ) : null}
              </span>
            </>
          );

          const rowClass = 'flex items-baseline justify-between gap-4 py-1';

          return (
            <li
              key={item.title}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setHovered(i);
              }}
              onPointerLeave={() => setHovered(null)}
            >
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {inner}
                </a>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      {preview ? (
        <div
          aria-hidden
          className="pointer-events-none fixed right-8 bottom-8 z-50 hidden w-[26rem] overflow-hidden rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] md:block"
        >
          {preview.video ? (
            <video src={preview.video} autoPlay muted loop playsInline className="block h-auto w-full" />
          ) : (
            <img src={preview.thumbnail} alt="" className="block h-auto w-full" />
          )}
        </div>
      ) : null}
    </>
  );
}
