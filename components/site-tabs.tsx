'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Work from '@/components/work';

// Measure before paint on the client; fall back to useEffect during SSR to
// avoid the layout-effect warning.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type TimelineItem = {
  year: string;
  title: string;
  role: string;
  location?: string;
  description: string;
  url?: string;
};

type WorkItem = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  thumbnail?: string;
  video?: string;
  featured?: boolean;
};

const TABS = ['experience', 'work', 'photos'] as const;
type Tab = (typeof TABS)[number];

// Photos isn't ready to ship yet — hide its tab but keep the panel wired up so
// re-enabling is just removing the filter.
const VISIBLE_TABS = TABS.filter((tab) => tab !== 'photos');

export default function SiteTabs({
  timeline,
  work,
}: {
  timeline: TimelineItem[];
  work: WorkItem[];
}) {
  const [active, setActive] = useState<Tab>('experience');
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <div>
      <nav
        role="tablist"
        aria-label="sections"
        className="relative mb-8 flex gap-5 pb-2 tracking-wider uppercase"
      >
        {pill ? (
          <span
            aria-hidden
            className="bg-foreground absolute bottom-0 h-px transition-all duration-300 ease-out"
            style={{ left: pill.left, width: pill.width }}
          />
        ) : null}
        {VISIBLE_TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[tab] = el;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={`cursor-pointer transition-colors ${
                isActive ? 'text-foreground' : 'text-muted-foreground/50 hover:text-foreground/80'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {active === 'experience' ? (
        <section>
          <h2 className="text-muted-foreground mb-6 font-normal tracking-wider uppercase">
            previous experience
          </h2>
          <ol className="group/timeline space-y-8">
            {timeline.map((item, i) => (
              <li
                key={i}
                className="text-foreground/80 transition-opacity duration-300 group-hover/timeline:[&:not(:hover)]:opacity-40 md:flex md:gap-6"
              >
                <span className="text-muted-foreground [li:hover>&]:text-accent mb-1 block tabular-nums transition-colors duration-300 md:mb-0 md:w-20 md:shrink-0">
                  {item.year}
                </span>
                <div className="md:flex-1">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="text-foreground">{item.title}</span>
                  )}
                  <span className="text-muted-foreground">
                    {' '}
                    — {item.role}
                    {item.location ? `, ${item.location}` : ''}
                  </span>
                  <p className="text-muted-foreground mt-1">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {active === 'work' ? <Work items={work} /> : null}

      {active === 'photos' ? (
        <section>
          <h2 className="text-muted-foreground mb-6 font-normal tracking-wider uppercase">
            photos
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border-border text-muted-foreground/40 flex aspect-square items-center justify-center border border-dashed text-xs"
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground/60 mt-6">
            coming soon — drop images into <code>public/photos/</code> to fill this in.
          </p>
        </section>
      ) : null}
    </div>
  );
}
