'use client';

import { Collapsible } from '@base-ui-components/react/collapsible';

// description first, stack last — both folded away until asked for; toggle matches the rail's Previously
export default function ProjectDetails({
  description,
  technologies,
}: {
  description?: string;
  technologies?: string;
}) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="group label hover:text-foreground focus-visible:text-foreground inline-flex cursor-pointer items-center gap-[1ch] transition-colors outline-none">
        Details
        <span aria-hidden className="group-data-[panel-open]:hidden">
          [+]
        </span>
        <span aria-hidden className="hidden group-data-[panel-open]:inline">
          [&minus;]
        </span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="pt-1">
          {description && <p className="text-foreground/85 text-pretty">{description}</p>}
          {technologies && (
            <div className="text-muted-foreground mt-2">Stack: {technologies}</div>
          )}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
