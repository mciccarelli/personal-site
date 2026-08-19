'use client';

import { Collapsible } from '@base-ui-components/react/collapsible';

interface Entry {
  company: string;
  role: string;
  years: string;
}

export default function Experience({ entries, clients }: { entries: Entry[]; clients: string }) {
  return (
    <Collapsible.Root render={<section className="space-y-3" />}>
      <h3 className="text-[0.625rem]">
        <Collapsible.Trigger className="group text-muted-foreground/55 hover:text-foreground/75 flex cursor-pointer items-center gap-1.5 tracking-[0.18em] uppercase transition-colors outline-none">
          Previously
          <span aria-hidden className="text-muted-foreground/50 group-data-[panel-open]:hidden">
            +
          </span>
          <span aria-hidden className="text-muted-foreground/50 hidden group-data-[panel-open]:inline">
            &minus;
          </span>
        </Collapsible.Trigger>
      </h3>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="text-foreground/70 space-y-1.5 pt-3 text-xs leading-[1.45] tracking-[0.03em] uppercase">
          {entries.map((e) => (
            <div key={e.company}>
              {e.company}{' '}
              <span className="text-muted-foreground/60">
                — {e.role}, {e.years}
              </span>
            </div>
          ))}
          <div className="pt-1.5">
            Clients <span className="text-muted-foreground/60">— {clients}</span>
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
