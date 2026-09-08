'use client';

import { Collapsible } from '@base-ui-components/react/collapsible';

interface Entry {
  company: string;
  role: string;
  years: string;
}

export default function Experience({ entries, clients }: { entries: Entry[]; clients: string }) {
  return (
    <Collapsible.Root render={<section />}>
      <h3 className="row">
        <Collapsible.Trigger className="group label hover:text-foreground inline-flex cursor-pointer items-center gap-1 transition-colors outline-none">
          Previously:
          <span aria-hidden className="group-data-[panel-open]:hidden">
            +
          </span>
          <span aria-hidden className="hidden group-data-[panel-open]:inline">
            &minus;
          </span>
        </Collapsible.Trigger>
      </h3>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="text-foreground/85">
          {entries.map((e) => (
            <div key={e.company} className="row">
              <span className="text-muted-foreground">{e.years}</span>
              <span>
                {e.company}
                <span className="text-muted-foreground"> · {e.role}</span>
              </span>
            </div>
          ))}
          <div className="row mt-4">
            <span className="label">Clients:</span>
            <span>{clients}</span>
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
