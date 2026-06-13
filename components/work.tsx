'use client';

import { useState, type PointerEvent } from 'react';

type WorkItem = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  thumbnail?: string;
  video?: string;
  featured?: boolean;
};

type Hovered = {
  item: WorkItem;
  x: number;
  y: number;
};

export default function Work({ items }: { items: WorkItem[] }) {
  const featured = items.filter((item) => item.featured && (item.thumbnail || item.video));
  const [hovered, setHovered] = useState<Hovered | null>(null);

  const track = (event: PointerEvent<HTMLAnchorElement>, item: WorkItem) => {
    if (event.pointerType !== 'mouse') return;
    setHovered({ item, x: event.clientX, y: event.clientY });
  };

  return (
    <section>
      <h2 className="text-muted-foreground mb-6 font-normal tracking-wider uppercase">
        selected work
      </h2>

      <ol className="group/work space-y-8">
        {featured.map((item, i) => (
          <li
            key={item.url}
            className="text-foreground/80 transition-opacity duration-300 group-hover/work:[&:not(:hover)]:opacity-40 md:flex md:gap-6"
          >
            <span className="text-muted-foreground mb-1 block tabular-nums md:mb-0 md:w-20 md:shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="md:flex-1">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
                onPointerEnter={(event) => track(event, item)}
                onPointerMove={(event) => track(event, item)}
                onPointerLeave={() => setHovered(null)}
              >
                {item.title}
              </a>
              <span className="text-muted-foreground"> — {item.role}</span>
              <p className="text-muted-foreground mt-1">{item.description}</p>
              <p className="text-muted-foreground/70 mt-1 tracking-wider uppercase">
                {item.technologies}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {hovered ? (
        <div
          aria-hidden
          className="border-border bg-popover pointer-events-none fixed z-50 hidden w-56 overflow-hidden border p-2 md:block"
          style={{
            left: Math.min(hovered.x + 20, (typeof window !== 'undefined' ? window.innerWidth : 0) - 244),
            top: hovered.y + 20,
          }}
        >
          <span className="block aspect-[4/3] w-full overflow-hidden">
            {hovered.item.video ? (
              <video
                src={hovered.item.video}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img src={hovered.item.thumbnail} alt="" className="h-full w-full object-contain" />
            )}
          </span>
        </div>
      ) : null}
    </section>
  );
}
