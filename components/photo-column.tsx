'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import DeckColumn from '@/components/deck-column';
import Lightbox from '@/components/lightbox';
import type { FeedItem } from '@/components/feed';

type PhotoSet = Extract<FeedItem, { type: 'photo' }>;

// photo sets often carry the year in the title; the column has its own year stop
function setTitle(set: PhotoSet) {
  return set.title.split(' — ')[0].replace(/\s+(19|20)\d{2}$/, '');
}

export default function PhotoColumn({ sets }: { sets: PhotoSet[] }) {
  const [open, setOpen] = useState<{ set: PhotoSet; index: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setOpen((current) => {
      if (!current) return current;
      const count = current.set.images.length;
      return { ...current, index: (current.index + dir + count) % count };
    });
  }, []);

  return (
    <>
      <DeckColumn
        id="photos"
        label="Photos"
        count={sets.length}
        description="Places and light, in sets. Click a set to page through it."
      >
        {sets.length === 0 && (
          <div className="row">
            <span className="text-muted-foreground">&mdash;</span>
            <span className="text-muted-foreground">Nothing here yet.</span>
          </div>
        )}
        {sets.map((set) => {
          const cover = set.images[0];
          return (
            <button
              key={set.title}
              type="button"
              onClick={() => setOpen({ set, index: 0 })}
              className="group block w-full cursor-pointer text-left"
            >
              <img
                src={cover.src}
                width={cover.width}
                height={cover.height}
                alt=""
                loading="lazy"
                className="bg-secondary mb-3 block h-auto w-full"
              />
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-foreground/85 group-hover:text-foreground min-w-0 transition-colors">
                  {setTitle(set)}
                </span>
                <span className="text-muted-foreground shrink-0">
                  {[
                    set.date.slice(0, 4),
                    set.title.split(' — ')[1] ?? cover.camera,
                    set.images.length > 1 ? `${set.images.length} photos` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </div>
            </button>
          );
        })}
      </DeckColumn>

      <AnimatePresence>
        {open && (
          <Lightbox
            key={open.set.title}
            title={open.set.title}
            images={open.set.images}
            index={open.index}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}
