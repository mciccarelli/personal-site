'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import Lightbox from '@/components/lightbox';

export interface CanvasSet {
  title: string;
  fullTitle: string;
  year: string;
  images: { src: string; width: number; height: number }[];
}

// world geometry, in canvas pixels at 100%
const COL_W = 320;
const COL_GAP = 160;
const HEADER = 36;
const MIN_Z = 0.15;
const MAX_Z = 2;
// the legend never grows past this
const MAP_W = 240;
const MAP_H = 56;

// stable scatter: the same photo lands in the same place on every visit
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const sized = (src: string, w: number) => `${src}?w=${w}&auto=format&q=80`;

type View = { x: number; y: number; z: number };

interface Placed {
  set: number;
  index: number;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// one set per column, each photo a little narrower or offset than the last, gaps uneven
function layout(sets: CanvasSet[]) {
  const photos: Placed[] = [];
  const columns = sets.map((set, i) => {
    const left = i * (COL_W + COL_GAP);
    const top = Math.round(rand(i * 7 + 1) * 160);
    let y = top + HEADER;
    set.images.forEach((img, j) => {
      const seed = i * 101 + j * 17;
      const w = Math.round(COL_W * (0.6 + 0.4 * rand(seed)));
      const x = left + Math.round((COL_W - w) * rand(seed + 3));
      const h = Math.round((w * img.height) / img.width);
      photos.push({ set: i, index: j, src: img.src, x, y, w, h });
      y += h + 40 + Math.round(rand(seed + 5) * 90);
    });
    return { left, top, bottom: y };
  });
  const width = Math.max(COL_W, sets.length * (COL_W + COL_GAP) - COL_GAP);
  const height = Math.max(0, ...columns.map((c) => c.bottom));
  return { photos, columns, width, height };
}

export default function PhotoCanvas({ sets }: { sets: CanvasSet[] }) {
  const router = useRouter();
  const world = useMemo(() => layout(sets), [sets]);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View | null>(null);
  const [open, setOpen] = useState<{ set: number; index: number } | null>(null);
  const surface = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // keep some of the world on screen whatever the pan
  const clamp = useCallback(
    (v: View, vw = viewport.w, vh = viewport.h): View => {
      const z = Math.min(MAX_Z, Math.max(MIN_Z, v.z));
      const slackX = vw * 0.5;
      const slackY = vh * 0.5;
      return {
        z,
        x: Math.min(slackX, Math.max(vw - world.width * z - slackX, v.x)),
        y: Math.min(slackY, Math.max(vh - world.height * z - slackY, v.y)),
      };
    },
    [viewport, world],
  );

  // zoom about a screen point, so whatever is under the cursor stays under it
  const zoomAt = useCallback(
    (factor: number, px: number, py: number) => {
      setView((v) => {
        if (!v) return v;
        const z = Math.min(MAX_Z, Math.max(MIN_Z, v.z * factor));
        const k = z / v.z;
        return clamp({ z, x: px - (px - v.x) * k, y: py - (py - v.y) * k });
      });
    },
    [clamp],
  );

  useLayoutEffect(() => {
    const measure = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    measure();
    const narrow = window.innerWidth < 640;
    setView({ z: narrow ? 0.5 : 0.7, x: narrow ? 20 : 64, y: narrow ? 120 : 140 });
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // trackpad scroll pans; pinch (which arrives as ctrl + wheel) or cmd + scroll zooms
  useEffect(() => {
    const el = surface.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
      } else {
        setView((v) => v && clamp({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [clamp, zoomAt]);

  // drag with one pointer to pan, two to pinch
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const pointers = new Map<number, { x: number; y: number }>();
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    let pinch = 0;

    const onMove = (ev: PointerEvent) => {
      const last = pointers.get(ev.pointerId);
      if (!last) {
        if (pointers.size === 1) pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
        return;
      }
      const next = { x: ev.clientX, y: ev.clientY };
      if (pointers.size === 2) {
        const [a, b] = [...pointers.entries()].map(([id, p]) => (id === ev.pointerId ? next : p));
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch) zoomAt(dist / pinch, (a.x + b.x) / 2, (a.y + b.y) / 2);
        pinch = dist;
        moved.current = true;
      } else {
        const dx = next.x - last.x;
        const dy = next.y - last.y;
        if (Math.abs(dx) + Math.abs(dy) > 0) {
          setView((v) => v && clamp({ ...v, x: v.x + dx, y: v.y + dy }));
        }
      }
      if (Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) > 4) moved.current = true;
      pointers.set(ev.pointerId, next);
    };
    const onDown = (ev: PointerEvent) => {
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      pinch = 0;
    };
    const onUp = (ev: PointerEvent) => {
      pointers.delete(ev.pointerId);
      pinch = 0;
      if (pointers.size === 0) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        surface.current?.removeAttribute('data-dragging');
      }
    };
    surface.current?.setAttribute('data-dragging', '');
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  // escape leaves the canvas; arrows nudge it
  useEffect(() => {
    if (open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/');
      const step = 120;
      const nudge: Record<string, [number, number]> = {
        ArrowLeft: [step, 0],
        ArrowRight: [-step, 0],
        ArrowUp: [0, step],
        ArrowDown: [0, -step],
      };
      const d = nudge[e.key];
      if (d) {
        e.preventDefault();
        setView((v) => v && clamp({ ...v, x: v.x + d[0], y: v.y + d[1] }));
      }
      if (e.key === '+' || e.key === '=') zoomAt(1.25, viewport.w / 2, viewport.h / 2);
      if (e.key === '-') zoomAt(0.8, viewport.w / 2, viewport.h / 2);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, router, clamp, zoomAt, viewport]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((o) => {
        if (!o) return o;
        const count = sets[o.set].images.length;
        return { ...o, index: (o.index + dir + count) % count };
      }),
    [sets],
  );

  // bring a column's left edge to the left of the screen
  const goToColumn = (i: number) => {
    const col = world.columns[i];
    if (!col) return;
    setView((v) => v && clamp({ ...v, x: 64 - col.left * v.z, y: Math.min(v.y, 140 - col.top * v.z) }));
  };

  if (!view) return <div className="fixed inset-0" />;

  // what is on screen, in world units
  const seen = {
    left: -view.x / view.z,
    top: -view.y / view.z,
    width: viewport.w / view.z,
    height: viewport.h / view.z,
  };
  const leftOf = world.columns.filter((c) => c.left + COL_W < seen.left).length;
  const rightOf = world.columns.filter((c) => c.left > seen.left + seen.width).length;

  // stretched to the legend's box: columns read across, depth reads down
  const sx = Math.min(MAP_W, viewport.w - 160) / world.width;
  const sy = MAP_H / world.height;
  const map = { w: world.width * sx, h: MAP_H };

  // click or drag in the legend centers the screen on that point
  const onMapPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const jump = (cx: number, cy: number) => {
      const wx = (cx - rect.left) / sx;
      const wy = (cy - rect.top) / sy;
      setView((v) => v && clamp({ ...v, x: viewport.w / 2 - wx * v.z, y: viewport.h / 2 - wy * v.z }));
    };
    jump(e.clientX, e.clientY);
    const onMove = (ev: PointerEvent) => jump(ev.clientX, ev.clientY);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const current = open ? sets[open.set] : null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        ref={surface}
        onPointerDown={onPointerDown}
        className="canvas absolute inset-0"
        style={{
          backgroundPosition: `${view.x}px ${view.y}px`,
          backgroundSize: `${24 * view.z}px ${24 * view.z}px`,
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.z})` }}
        >
          {sets.map((set, i) => (
            <div
              key={set.fullTitle}
              className="text-muted-foreground absolute flex justify-between gap-4 whitespace-nowrap"
              style={{
                left: world.columns[i].left,
                top: world.columns[i].top,
                width: COL_W,
                fontSize: `${Math.min(28, 9 / view.z)}px`,
              }}
            >
              <span className="text-foreground">{set.title}</span>
              <span>{set.year}</span>
            </div>
          ))}
          {world.photos.map((p) => (
            <button
              key={p.src}
              type="button"
              aria-label={`${sets[p.set].fullTitle}, photo ${p.index + 1}`}
              onClick={() => {
                if (!moved.current) setOpen({ set: p.set, index: p.index });
              }}
              className="canvas-photo absolute block"
              style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
            >
              <img
                src={sized(p.src, 800)}
                alt=""
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                draggable={false}
                // cached photos can finish before hydration and never fire onLoad
                ref={(el) => {
                  if (el?.complete) el.setAttribute('data-loaded', '');
                }}
                onLoad={(e) => e.currentTarget.setAttribute('data-loaded', '')}
                className="block size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* the way out, always in the same corner */}
      <Link href="/" className="back-link fixed top-5 left-5 z-10">
        <span aria-hidden>&larr;</span> Back
      </Link>
      <div className="text-muted-foreground pointer-events-none fixed top-5 right-5 z-10 flex h-10 items-center">
        Photos · {world.photos.length}
      </div>

      {/* legend: the whole canvas in miniature, with the screen drawn on it */}
      <div className="legend fixed bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="legend-btn"
            aria-label="Previous column"
            disabled={leftOf === 0}
            onClick={() => goToColumn(leftOf - 1)}
          >
            &larr;&nbsp;{leftOf}
          </button>
          <div
            className="legend-map relative cursor-pointer overflow-hidden"
            style={{ width: map.w, height: map.h }}
            onPointerDown={onMapPointer}
          >
            {world.photos.map((p) => (
              <span
                key={p.src}
                className="bg-muted-foreground/40 absolute"
                style={{ left: p.x * sx, top: p.y * sy, width: p.w * sx, height: Math.max(1, p.h * sy) }}
              />
            ))}
            <span
              className="border-foreground absolute border"
              style={{
                left: seen.left * sx,
                top: seen.top * sy,
                width: seen.width * sx,
                height: seen.height * sy,
              }}
            />
          </div>
          <button
            type="button"
            className="legend-btn"
            aria-label="Next column"
            disabled={rightOf === 0}
            onClick={() => goToColumn(leftOf + 1)}
          >
            {rightOf}&nbsp;&rarr;
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-muted-foreground hidden sm:inline">Drag to pan · pinch to zoom</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="legend-btn"
              aria-label="Zoom out"
              onClick={() => zoomAt(0.8, viewport.w / 2, viewport.h / 2)}
            >
              &minus;
            </button>
            <span className="w-[4ch] text-center">{Math.round(view.z * 100)}%</span>
            <button
              type="button"
              className="legend-btn"
              aria-label="Zoom in"
              onClick={() => zoomAt(1.25, viewport.w / 2, viewport.h / 2)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && current && (
          <Lightbox
            key={current.fullTitle}
            title={current.fullTitle}
            images={current.images.map((img) => ({ ...img, src: sized(img.src, 2400) }))}
            index={open.index}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
