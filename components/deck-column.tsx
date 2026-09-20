import type { ReactNode } from 'react';
import { ColumnCount, MediaProvider } from '@/components/media-state';

export default function DeckColumn({
  id,
  label,
  count,
  description,
  children,
}: {
  id: string;
  label: string;
  count?: number;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-deck-col className="deck-col">
      {/* the provider spans header and body so the count can reflect media still loading below */}
      <MediaProvider>
        <header className="mx-5 pt-8 pb-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="label">{label}:</span>
            {count !== undefined && <ColumnCount count={count} />}
          </div>
          <p className="text-muted-foreground mt-3 text-pretty">{description}</p>
        </header>
        <div className="space-y-8 px-5 pt-6 pb-12">{children}</div>
      </MediaProvider>
    </section>
  );
}
