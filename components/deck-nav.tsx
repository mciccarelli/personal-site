'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DeckNavItem {
  id: string;
  label: string;
}

// the rail's table of contents: jumps to a column and tracks which one is in view
export default function DeckNav({ items }: { items: DeckNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('[data-deck-columns]');
    const cols = Array.from(document.querySelectorAll<HTMLElement>('[data-deck-col]'));
    if (!container || cols.length === 0) return;

    const update = () => {
      const horizontal = getComputedStyle(container).overflowX === 'auto';
      // stacked layout: the last section never reaches the top, so the end of the page means the last one
      if (!horizontal && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
        setActive(cols[cols.length - 1].id);
        return;
      }
      // otherwise the column nearest the leading edge of whatever is scrolling
      // the leading edge sits past the rail, which the columns scroll underneath
      const edge =
        container.getBoundingClientRect().left + parseFloat(getComputedStyle(container).paddingLeft);
      const distance = (col: HTMLElement) =>
        horizontal
          ? Math.abs(col.getBoundingClientRect().left - edge)
          : Math.abs(col.getBoundingClientRect().top - 24);
      const nearest = cols.reduce((a, b) => (distance(b) < distance(a) ? b : a));
      setActive(nearest.id);
    };

    update();
    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav aria-label="Columns" className="flex flex-col">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={jump(item.id)}
          aria-current={active === item.id ? 'true' : undefined}
          className={cn(
            'row no-underline transition-colors hover:no-underline',
            active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/75',
          )}
        >
          <span aria-hidden className="justify-self-end">
            {active === item.id ? '■' : ''}
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
