import Arrow from '@/components/arrow';
import Reveal, { RevealIcon } from '@/components/reveal';
import type { FeedItem } from '@/components/feed';

type Project = Extract<FeedItem, { type: 'project' }>;

export default function ProjectCard({ project }: { project: Project }) {
  const { title, role, url, technologies, image, imageWidth, imageHeight, video } = project;

  // media keeps its own proportions: full column width, height follows
  const media = video ? (
    <video src={video} autoPlay muted loop playsInline preload="metadata" className="bg-secondary block h-auto w-full" />
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

  const detail = [role, technologies].filter(Boolean).join(' · ');

  return (
    <article className="card">
      {media &&
        (url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="mb-3 block">
            {media}
          </a>
        ) : (
          <div className="mb-3">{media}</div>
        ))}
      {/* title at rest; visit and the detail line type themselves in on hover where hover exists */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-foreground/85">{title}</span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${title}`}
            className="text-foreground/85 inline-flex shrink-0 items-center gap-[0.5ch]"
          >
            <Reveal text="Visit" />
            <RevealIcon index={5}>
              <Arrow />
            </RevealIcon>
          </a>
        )}
      </div>
      {detail && (
        <div className="text-muted-foreground truncate">
          <Reveal text={detail} />
        </div>
      )}
    </article>
  );
}
