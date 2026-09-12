'use client';

import { Popover } from '@base-ui-components/react/popover';
import Arrow from '@/components/arrow';
import type { FeedItem } from '@/components/feed';

type Project = Extract<FeedItem, { type: 'project' }>;

export default function ProjectCard({ project }: { project: Project }) {
  const { title, role, url, technologies, image, imageWidth, imageHeight, video } = project;

  // media keeps its own proportions: full column width, height follows
  const media = video ? (
    <video
      src={video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="bg-secondary block h-auto w-full"
    />
  ) : image ? (
    <img
      src={image}
      width={imageWidth}
      height={imageHeight}
      alt=""
      loading="lazy"
      className="bg-secondary block h-auto w-full"
    />
  ) : null;

  return (
    <article>
      {media &&
        (url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="mb-3 block">
            {media}
          </a>
        ) : (
          <div className="mb-3">{media}</div>
        ))}
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-foreground/85 min-w-0">
          {title}
          {role && <span className="text-muted-foreground">: {role}</span>}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {technologies && (
            <Popover.Root>
              <Popover.Trigger
                aria-label={`Stack for ${title}`}
                className="text-muted-foreground hover:text-foreground data-[popup-open]:text-foreground inline-flex size-[1.4em] cursor-pointer items-center justify-center rounded-full border border-current text-[0.8em] leading-none transition-colors outline-none"
              >
                i
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner side="top" align="end" sideOffset={8}>
                  <Popover.Popup className="bg-background text-foreground/85 border-border max-w-64 border px-3 py-2 shadow-sm outline-none">
                    <span className="text-muted-foreground">Stack: </span>
                    {technologies}
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${title}`}
              className="inline-flex items-center gap-[0.5ch]"
            >
              Visit
              <Arrow />
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
