import { Fragment, type ReactNode } from 'react';
import CopyEmail from '@/components/copy-email';
import FilterMenu from '@/components/top-bar';
import { type Filter } from '@/components/feed-filter';
import Feed from '@/components/feed';
import Experience from '@/components/experience';
import { getFeed } from '@/lib/sanity';
import data from '../data.json';

export const revalidate = 60;

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
    nodes.push(
      <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

function Section({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="space-y-2 md:space-y-[var(--rail-sub)]">
      <h3 className="text-muted-foreground/70 text-[0.625rem] tracking-[0.18em] uppercase">
        {title}
      </h3>
      <div
        className={
          compact
            ? 'text-foreground/70 space-y-1.5 text-xs leading-[1.45] tracking-[0.03em] uppercase'
            : 'text-foreground/70 space-y-[var(--rail-para)] text-[0.72rem] leading-[1.55] tracking-[0.005em] normal-case'
        }
      >
        {children}
      </div>
    </section>
  );
}

export default async function Home() {
  const { about, working, experience, clients } = data;
  const feed = await getFeed();
  const counts: Record<Filter, number> = {
    all: feed.length,
    projects: feed.filter((item) => item.type === 'project').length,
    photos: feed.filter((item) => item.type === 'photo').length,
  };

  return (
    <div className="px-6 md:grid md:min-h-dvh md:grid-cols-12 md:gap-x-8 md:px-8">
      {/* Right — sticky identity column */}
      <aside className="border-border/40 flex flex-col justify-between gap-8 border-b pt-20 pb-7 md:col-span-3 md:col-start-10 md:row-start-1 md:sticky md:top-0 md:h-dvh md:overflow-y-auto md:border-b-0 md:pt-8 md:pb-9">
        <div className="space-y-8 md:space-y-[var(--rail-gap)]">
          <h1 className="text-foreground/90 text-[0.72rem] leading-[1.25] tracking-[0.08em] uppercase">
            Michael Ciccarelli
            <br />
            ENGINEER, AMONG OTHER THINGS
          </h1>

          <Section title="About">
            {about.map((paragraph, i) => (
              <p key={i}>{renderInlineLinks(paragraph)}</p>
            ))}
          </Section>

          <Section title="Working together">
            {working.map((paragraph, i) => (
              <p key={i}>{renderInlineLinks(paragraph)}</p>
            ))}
          </Section>

          <Experience entries={experience} clients={clients} />
        </div>

        <div className="grid grid-cols-2 gap-8 md:block md:space-y-[var(--rail-gap)]">
          <Section title="Contact" compact>
            <div className="space-y-1.5">
              <div>
                <a
                  href="https://cal.com/ciccarelli/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book an intro call
                </a>
              </div>
              <div>
                <CopyEmail email="m@ciccarel.li" />
              </div>
            </div>
          </Section>

          <Section title="Social" compact>
            <div className="space-y-1.5">
              <div>
                <a href="https://x.com/mciccarelli" target="_blank" rel="noopener noreferrer">
                  twitter/x
                </a>
                <span className="text-muted-foreground/40"> · </span>
                <a
                  href="https://instagram.com/mciccarelli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ig
                </a>
              </div>
              <div>
                <a href="https://github.com/mciccarelli" target="_blank" rel="noopener noreferrer">
                  github
                </a>
                <span className="text-muted-foreground/40"> · </span>
                <a
                  href="https://www.linkedin.com/in/mciccarelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin
                </a>
              </div>
            </div>
          </Section>

        </div>
      </aside>

      {/* Filters — right-aligned toward feed */}
      <div className="pt-10 md:col-span-4 md:col-start-1 md:row-start-1 md:flex md:justify-end md:pt-8">
        <div className="h-fit md:sticky md:top-8">
          <FilterMenu counts={counts} />
        </div>
      </div>

      {/* Center — scrollable feed */}
      <div id="feed" className="pt-10 pb-20 md:col-span-5 md:col-start-5 md:row-start-1 md:pt-8 md:pb-24">
        <Feed items={feed} />
      </div>
    </div>
  );
}
