'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFilter, type Filter } from '@/components/feed-filter';
import FilterMenu from '@/components/top-bar';

interface ProjectItem {
  type: 'project';
  title: string;
  role?: string;
  url?: string;
  description: string;
  technologies?: string;
  image?: string;
  video?: string;
  date: string;
}

interface PhotoImage {
  src: string;
  width: number;
  height: number;
}

interface PhotoItem {
  type: 'photo';
  title: string;
  date: string;
  images: PhotoImage[];
}

export type FeedItem = ProjectItem | PhotoItem;

interface FeedProps {
  items: FeedItem[];
}

// slight offsets/rotations for the stacked "pile" look on collections
const PILE_TRANSFORMS = [
  'rotate(1.75deg) translate(6px, 4px)',
  'rotate(-1.5deg) translate(-5px, 7px)',
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}-01T00:00:00Z`));
}

function projectMeta(item: ProjectItem) {
  return [formatDate(item.date), item.role, item.technologies].filter(Boolean).join(' · ');
}

export default function Feed({ items }: FeedProps) {
  const { filter } = useFilter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ photo: PhotoItem; index: number } | null>(null);

  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const counts: Record<Filter, number> = {
    all: sorted.length,
    projects: sorted.filter((item) => item.type === 'project').length,
    photos: sorted.filter((item) => item.type === 'photo').length,
  };
  const visible = sorted.filter((item) => {
    if (filter === 'all') return true;
    return filter === 'projects' ? item.type === 'project' : item.type === 'photo';
  });

  const openPhoto = (photo: PhotoItem) => {
    // lightbox is tablet+ only
    if (window.matchMedia('(min-width: 768px)').matches) setLightbox({ photo, index: 0 });
  };

  const step = (dir: 1 | -1) => {
    setLightbox((current) => {
      if (!current) return current;
      const count = current.photo.images.length;
      return { ...current, index: (current.index + dir + count) % count };
    });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox !== null]);

  const current = lightbox ? lightbox.photo.images[lightbox.index] : null;

  return (
    <div className="relative">
      <div className="sticky top-[17px] z-40 mx-auto mb-4 flex max-w-xl justify-end md:mb-14 lg:max-w-2xl">
        <FilterMenu counts={counts} />
      </div>

      <div key={filter} className="mx-auto max-w-xl space-y-14 lg:max-w-2xl">
        {visible.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{
              duration: 0.5,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: Math.min(index * 0.04, 0.16),
            }}
          >
            {item.type === 'photo' ? (
              <figure>
                <div
                  className="relative md:cursor-zoom-in"
                  onClick={() => openPhoto(item)}
                  style={
                    item.images.length > 1
                      ? { aspectRatio: `${item.images[0].width} / ${item.images[0].height}` }
                      : undefined
                  }
                >
                  {item.images.length > 1 ? (
                    <>
                      {item.images.slice(1, 3).map((img, i) => (
                        <img
                          key={img.src}
                          src={img.src}
                          width={img.width}
                          height={img.height}
                          alt=""
                          loading="lazy"
                          aria-hidden
                          className="absolute inset-0 h-full w-full object-cover shadow-md"
                          style={{ transform: PILE_TRANSFORMS[i] }}
                        />
                      ))}
                      <img
                        src={item.images[0].src}
                        width={item.images[0].width}
                        height={item.images[0].height}
                        alt=""
                        loading="lazy"
                        className="relative block h-full w-full object-cover shadow-sm"
                      />
                    </>
                  ) : (
                    <img
                      src={item.images[0].src}
                      width={item.images[0].width}
                      height={item.images[0].height}
                      alt=""
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                  )}
                </div>
                <figcaption className={cn('mt-4 space-y-2', item.images.length > 1 && 'mt-6')}>
                  <div className="text-foreground/75 text-sm tracking-[0.08em] uppercase">
                    {item.title.split(' — ')[0]}
                  </div>
                  <div className="text-muted-foreground/55 text-xs leading-[1.3] tracking-[0.04em] uppercase">
                    Photography
                    {` · ${formatDate(item.date)}`}
                    {item.title.split(' — ')[1] ? ` · ${item.title.split(' — ')[1]}` : ''}
                    {item.images.length > 1 ? ` · ${item.images.length} photos` : ''}
                  </div>
                </figcaption>
              </figure>
            ) : (
              <article
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {(item.video || item.image) && (
                  <div className="mb-4">
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.title}`}
                        className="group block no-underline hover:no-underline"
                      >
                        {item.video ? (
                          <video
                            src={item.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
                          />
                        ) : (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
                          />
                        )}
                      </Link>
                    ) : item.video ? (
                      <video
                        src={item.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="block h-auto w-full"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="block h-auto w-full"
                      />
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <div
                    className={cn(
                      'text-sm tracking-[0.08em] uppercase transition-colors duration-300',
                      hoveredIndex === index ? 'text-foreground' : 'text-foreground/75',
                    )}
                  >
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 no-underline hover:no-underline"
                      >
                        {item.title}
                        <ArrowUpRight className="size-3" strokeWidth={1.25} />
                      </Link>
                    ) : (
                      item.title
                    )}
                  </div>

                  <div className="text-foreground/60 space-y-1.5 text-xs leading-[1.3] tracking-[0.02em]">
                    <div>{item.description}</div>
                    <div className="text-muted-foreground/55 tracking-[0.04em] uppercase">
                      {projectMeta(item)}
                    </div>
                    {item.url && (
                      <div className="pt-2">
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/50 hover:text-foreground inline-flex items-center gap-1 tracking-[0.08em] uppercase no-underline transition-colors hover:no-underline"
                        >
                          Live site
                          <ArrowUpRight className="size-3" strokeWidth={1.25} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )}
          </motion.div>
        ))}
      </div>

      {lightbox && current && (
        <motion.div
          key={lightbox.photo.title}
          className="fixed inset-0 z-50 hidden items-center justify-center p-8 md:flex md:cursor-zoom-out"
          onClick={() => setLightbox(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="bg-background/60 absolute inset-0 backdrop-blur-md" />
          <motion.img
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt=""
            className="relative h-auto max-h-full w-auto max-w-full shadow-2xl"
            initial={{ scale: 0.97, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          />
          <div className="text-muted-foreground absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.06em]">
            {lightbox.photo.title}
            {lightbox.photo.images.length > 1
              ? ` · ${lightbox.index + 1}/${lightbox.photo.images.length}`
              : ''}
          </div>
          {lightbox.photo.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="text-foreground/70 hover:text-foreground absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer p-4 text-lg transition-colors"
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="text-foreground/70 hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-4 text-lg transition-colors"
              >
                &rarr;
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
