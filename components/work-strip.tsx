'use client';

import { useEffect, useRef, useState } from 'react';
import Media from '@/components/media';
import type { WorkItem } from '@/lib/sanity';

// one row of frames that starts on the column's edge and runs off the right of the page
export default function WorkStrip({ items }: { items: WorkItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // step by one frame, frames are all the same width
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const frame = el?.querySelector<HTMLElement>('[data-frame]');
    if (!el || !frame) return;
    el.scrollBy({ left: dir * (frame.offsetWidth + 8), behavior: 'smooth' });
  };

  return (
    <section aria-label="Selected work">
      <div className="page flex items-baseline justify-between">
        <h2 className="section-label">selected work</h2>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous"
            disabled={edge.start}
            onClick={() => step(-1)}
            className="strip-btn"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={edge.end}
            onClick={() => step(1)}
            className="strip-btn"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div ref={ref} className="strip mt-3">
        {items.map((item, i) => (
          <Frame key={item.title} item={item} eager={i < 2} />
        ))}
      </div>
    </section>
  );
}

function Frame({ item, eager }: { item: WorkItem; eager: boolean }) {
  const { title, url, role, date, kind, image, imageWidth, imageHeight, video } = item;
  const meta = [kind === 'experiment' ? 'Experiment' : role, date.slice(0, 4)]
    .filter(Boolean)
    .join(' · ');

  const plate = (
    <div className="plate">
      <div className="plate-inner">
        {video ? (
          <Media src={video} video eager={eager} />
        ) : image ? (
          <Media src={image} width={imageWidth} height={imageHeight} alt={title} eager={eager} />
        ) : null}
      </div>
    </div>
  );

  return (
    <article data-frame className="frame">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block" tabIndex={-1}>
          {plate}
        </a>
      ) : (
        plate
      )}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="link">
            {title}
          </a>
        ) : (
          <span className="text-foreground">{title}</span>
        )}
        <span className="text-muted-foreground shrink-0">
          {meta}
        </span>
      </div>
    </article>
  );
}
