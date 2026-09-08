import { Fragment, type ReactNode } from 'react';
import CopyEmail from '@/components/copy-email';
import Experience from '@/components/experience';
import Feed from '@/components/feed';
import FilterMenu from '@/components/top-bar';
import Mark from '@/components/mark';
import ModeToggle from '@/components/mode-toggle';
import PhotosSwitch from '@/components/photos-switch';
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

const CONTACT = [
  { label: 'X', value: '@mcrxlli', href: 'https://x.com/mcrxlli' },
  { label: 'IG', value: '@mciccarelli', href: 'https://instagram.com/mciccarelli' },
  { label: 'GH', value: '@mciccarelli', href: 'https://github.com/mciccarelli' },
  { label: 'IN', value: '/in/mciccarelli', href: 'https://www.linkedin.com/in/mciccarelli/' },
];

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
      <div className="px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="mx-auto w-full max-w-[36rem]">
          {/* name at the label stop, title at the value stop, mark below like a blind stamp */}
          <header className="row-stack">
            <h1 className="leading-[1.6]">
              <span className="text-muted-foreground block">relli.cc</span>
              <span className="text-foreground block font-semibold">Michael Ciccarelli</span>
            </h1>
            <p className="text-foreground/85 sm:self-end">Design Engineer</p>
          </header>

          <div className="mt-28 space-y-12 md:mt-36">
            <section className="space-y-5">
              <div className="row-stack">
                <span className="label">About:</span>
                <div className="text-foreground/85">
                  {about.map((paragraph, i) => (
                    <p key={i} className="text-pretty">
                      {renderInlineLinks(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
              <div className="row-stack">
                <span className="label">Studio:</span>
                <div className="text-foreground/85">
                  {working.map((paragraph, i) => (
                    <p key={i} className="text-pretty">
                      {renderInlineLinks(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="row">
                <span className="label">E:</span>
                <CopyEmail email="m@relli.cc" />
              </div>
              <div className="row">
                <span className="label">Cal:</span>
                <a href="https://cal.com/ciccarelli/intro" target="_blank" rel="noopener noreferrer">
                  cal.com/ciccarelli/intro
                </a>
              </div>
              {CONTACT.map((c) => (
                <div key={c.label} className="row">
                  <span className="label">{c.label}:</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.value}
                  </a>
                </div>
              ))}
            </section>

            <section>
              <div className="row">
                <span className="label">Index:</span>
                <div className="flex items-center gap-4">
                  <FilterMenu counts={counts} />
                  <span className="ml-auto flex">
                    <PhotosSwitch />
                  </span>
                </div>
              </div>
              <Feed items={feed} />
            </section>

            <Experience entries={experience} clients={clients} />

            {/* maker's mark closes the page, stamped at the value stop */}
            <footer className="row items-center">
              <ModeToggle className="-ml-1 opacity-30 transition-opacity duration-500 ease-out hover:opacity-100" />
              <Mark emboss className="h-6 w-[52px]" />
            </footer>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
}
