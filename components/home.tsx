import { Fragment, type ReactNode } from 'react';
import CopyEmail from '@/components/copy-email';
import Experience from '@/components/experience';
import Feed from '@/components/feed';
import FilterMenu from '@/components/top-bar';
import Mark from '@/components/mark';
import ModeToggle from '@/components/mode-toggle';
import PhotosToggle from '@/components/photos-toggle';
import { FilterProvider, type Filter } from '@/components/feed-filter';
import { getFeed } from '@/lib/sanity';
import data from '../data.json';

function renderInlineLinks(text: string): ReactNode[] {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    if (match[2] === '#photos') {
      nodes.push(<PhotosToggle key={key++}>{match[1]}</PhotosToggle>);
    } else {
      nodes.push(
        <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

function Label({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-muted-foreground/55 text-[0.625rem] tracking-[0.18em] uppercase">
      {children}
    </h3>
  );
}

export default async function Home({ photosVisible = false }: { photosVisible?: boolean }) {
  const { about, working, experience, clients } = data;
  const feed = await getFeed();
  const counts: Record<Filter, number> = {
    all: feed.length,
    projects: feed.filter((item) => item.type === 'project').length,
    photos: feed.filter((item) => item.type === 'photo').length,
  };

  return (
    <FilterProvider initialPhotosVisible={photosVisible}>
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-[30rem] space-y-14 text-left">
          <header className="space-y-5">
            <Mark />
            <h1 className="text-foreground/90 text-[0.72rem] leading-[1.6] tracking-[0.18em] uppercase">
              Michael Ciccarelli
              <br />
              <span className="text-muted-foreground/60">Software Engineer</span>
            </h1>
          </header>

          <div className="text-foreground/70 space-y-5 text-[0.72rem] leading-[1.6] tracking-[0.01em]">
            {about.map((paragraph, i) => (
              <p key={i}>{renderInlineLinks(paragraph)}</p>
            ))}
            {working.map((paragraph, i) => (
              <p key={i}>{renderInlineLinks(paragraph)}</p>
            ))}
          </div>

          <section className="space-y-2">
            <Label>Connect</Label>
            <div className="text-foreground/70 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.04em] uppercase">
              <span className="normal-case">
                <CopyEmail email="m@relli.cc" />
              </span>
              <a href="https://cal.com/ciccarelli/intro" target="_blank" rel="noopener noreferrer">
                Intro call
              </a>
              <a href="https://x.com/mcrxlli" target="_blank" rel="noopener noreferrer">
                Twitter/X
              </a>
              <a href="https://instagram.com/mciccarelli" target="_blank" rel="noopener noreferrer">
                IG
              </a>
              <a href="https://github.com/mciccarelli" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mciccarelli/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </section>

          <section className="space-y-4">
            <Label>Index</Label>
            <FilterMenu counts={counts} />
            <Feed items={feed} />
          </section>

          <Experience entries={experience} clients={clients} />


          <footer className="flex items-center">
            <ModeToggle className="-ml-1 opacity-30 transition-opacity duration-500 ease-out hover:opacity-100" />
          </footer>
        </div>
      </div>
    </FilterProvider>
  );
}
