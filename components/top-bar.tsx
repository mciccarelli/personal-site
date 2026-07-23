'use client';

import { FILTERS, useFilter, type Filter } from '@/components/feed-filter';
import { cn } from '@/lib/utils';

const LABELS: Record<Filter, string> = {
  all: 'All',
  projects: 'Work',
  photos: 'Photos',
};

export default function FilterMenu({ counts }: { counts: Record<Filter, number> }) {
  const { filter, setFilter } = useFilter();

  return (
    <div
      className="border-border bg-background/85 inline-flex h-7 items-stretch border text-xs tracking-[0.08em] uppercase backdrop-blur-sm"
      aria-label="Filter feed"
      role="group"
    >
      {FILTERS.map((f) => {
        const selected = filter === f;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={selected}
            onClick={() => setFilter(f)}
            className={cn(
              'border-border/70 flex min-w-[4.25rem] cursor-pointer items-center justify-center gap-1.5 border-r px-2.5 transition-colors last:border-r-0',
              selected
                ? 'bg-foreground text-background'
                : 'text-muted-foreground/65 hover:bg-foreground/5 hover:text-foreground',
            )}
          >
            <span>{LABELS[f]}</span>
            <span className={selected ? 'text-background/60' : 'text-muted-foreground/45'}>
              {counts[f]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
