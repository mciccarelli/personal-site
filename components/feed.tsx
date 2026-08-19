'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { useFilter } from '@/components/feed-filter';

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
  caption?: string | null;
  camera?: string | null;
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

// hover preview lives in the gutter beside the centered column, never over the text
const COLUMN_W = 480;
const MAX_PREVIEW_W = 320;
const MIN_PREVIEW_W = 160;
const PREVIEW_H = 280;

// rows fan in one after another on load and on every filter/photos change
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025, delayChildren: 0.04 } },
  exit: { transition: { duration: 0.14 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14, ease: 'easeIn' } },
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}-01T00:00:00Z`));
}

function photoTitle(item: PhotoItem) {
  // photo sets often carry the year in the title; the index has its own year column
  return item.title.split(' — ')[0].replace(/\s+(19|20)\d{2}$/, '');
}

function itemMeta(item: FeedItem) {
  if (item.type === 'photo') {
    return [
      'Photography',
      formatDate(item.date),
      item.title.split(' — ')[1],
      item.images.length > 1 ? `${item.images.length} photos` : null,
    ]
      .filter(Boolean)
      .join(' · ');
  }
  return [formatDate(item.date), item.role, item.technologies].filter(Boolean).join(' · ');
}

export default function Feed({ items }: FeedProps) {
  const { filter, photosVisible } = useFilter();
  const [active, setActive] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [canHover, setCanHover] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [lightbox, setLightbox] = useState<{ photo: PhotoItem; index: number } | null>(null);

  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const visible = sorted.filter((item) => {
    if (item.type === 'photo' && !photosVisible) return false;
    if (filter === 'all') return true;
    return filter === 'projects' ? item.type === 'project' : item.type === 'photo';
  });

  // imagery is a pointer affordance only — touch devices stay text-only
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onMove = (e: MouseEvent) => setCursor({ y: e.clientY, x: e.clientX });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [active]);

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
  const preview = active !== null ? visible[active] : null;
  const previewMedia =
    preview?.type === 'photo'
      ? { image: preview.images[0].src, video: undefined }
      : { image: preview?.image, video: preview?.video };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const gutter = (viewport.w - COLUMN_W) / 2;
  const previewW = Math.min(MAX_PREVIEW_W, gutter - 40);
  const previewPos = {
    left: viewport.w - gutter + (gutter - previewW) / 2,
    top: clamp(cursor.y - PREVIEW_H / 2, 24, Math.max(24, viewport.h - PREVIEW_H - 24)),
  };
  const showPreview = canHover && previewW >= MIN_PREVIEW_W;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.ul
          key={`${filter}-${photosVisible}`}
          className="space-y-2"
          variants={listVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {visible.map((item, index) => {
            const label = item.type === 'photo' ? photoTitle(item) : item.title;
            const year = item.date.slice(0, 4);
            const inner = (
              <>
                <span>{label}</span>
                <span className="text-muted-foreground/45 tabular-nums">{year}</span>
              </>
            );
            const dimmed = active !== null && active !== index;
            const rowClass = cn(
              'flex w-full cursor-pointer items-baseline justify-between gap-6 uppercase no-underline',
              'transition-[color,opacity] duration-300 ease-out hover:no-underline',
              active === index ? 'text-foreground' : 'text-foreground/80',
              dimmed ? 'opacity-30' : 'opacity-100',
            );

            return (
              <motion.li
                key={item.title}
                variants={rowVariants}
                onMouseEnter={(e) => {
                  setCursor({ x: e.clientX, y: e.clientY });
                  setActive(index);
                }}
                onMouseLeave={() => setActive(null)}
                className="text-[0.72rem] tracking-[0.06em] uppercase"
              >
                {item.type === 'photo' ? (
                  <button
                    type="button"
                    className={rowClass}
                    onClick={() => setLightbox({ photo: item, index: 0 })}
                  >
                    {inner}
                  </button>
                ) : item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {inner}
                  </Link>
                ) : (
                  <span className={rowClass.replace('cursor-pointer ', '')}>{inner}</span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      <AnimatePresence>
        {showPreview && preview && (
          <motion.div
            key="preview"
            aria-hidden
            className="pointer-events-none fixed z-40"
            style={{ left: previewPos.left, top: previewPos.top, width: previewW }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          >
            {previewMedia.video ? (
              <video
                src={previewMedia.video}
                autoPlay
                muted
                loop
                playsInline
                className="block h-auto max-h-[58vh] w-full object-contain object-top shadow-lg"
              />
            ) : previewMedia.image ? (
              <img
                src={previewMedia.image}
                alt=""
                loading="lazy"
                className="block h-auto max-h-[58vh] w-full object-contain object-top shadow-lg"
              />
            ) : null}
            <div className="text-muted-foreground/70 mt-2 text-left text-[0.625rem] leading-[1.4] tracking-[0.04em] uppercase">
              {itemMeta(preview)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {lightbox && current && (
        <motion.div
          key={lightbox.photo.title}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-6 md:p-8"
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
    </>
  );
}
