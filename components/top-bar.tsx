'use client';

import { Select } from '@base-ui-components/react/select';
import { ChevronDown } from 'lucide-react';
import { FILTERS, useFilter, type Filter } from '@/components/feed-filter';

const LABELS: Record<Filter, string> = {
  all: 'All',
  projects: 'Work',
  photos: 'Photos',
};

export default function FilterMenu({ counts }: { counts: Record<Filter, number> }) {
  const { filter, setFilter } = useFilter();

  return (
    <Select.Root value={filter} onValueChange={(value) => setFilter(value as Filter)}>
      <Select.Trigger
        aria-label="Filter feed"
        className="border-border bg-background/85 text-foreground/75 hover:text-foreground hover:border-foreground/35 flex h-7 min-w-[5.75rem] cursor-pointer items-center justify-between gap-2 border px-2.5 text-xs tracking-[0.08em] uppercase backdrop-blur-sm transition-colors outline-none"
      >
        <span>
          {LABELS[filter]} <span className="text-muted-foreground/45">{counts[filter]}</span>
        </span>
        <ChevronDown aria-hidden className="text-muted-foreground/60 size-3" strokeWidth={1.5} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner side="bottom" sideOffset={4} align="end" alignItemWithTrigger={false}>
          <Select.Popup className="border-border bg-background z-50 min-w-[5.75rem] border text-xs uppercase shadow-[0_4px_16px_-8px_rgba(0,0,0,0.3)] transition-opacity duration-75 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
            {FILTERS.map((f) => (
              <Select.Item
                key={f}
                value={f}
                className="text-muted-foreground/65 data-[highlighted]:bg-foreground data-[highlighted]:text-background flex cursor-pointer items-center px-2.5 py-1.5 tracking-[0.08em] outline-none"
              >
                <Select.ItemText>
                  {LABELS[f]} {counts[f]}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
