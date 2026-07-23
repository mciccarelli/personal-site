import { Fragment, type ReactNode } from 'react';
import Clock from '@/components/clock';
import CopyEmail from '@/components/copy-email';
import Feed, { type FeedItem } from '@/components/feed';
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
    <section className="space-y-1.5 md:space-y-2">
      <h3 className="text-muted-foreground/70 text-[0.625rem] tracking-[0.18em] uppercase">
        {title}
      </h3>
      <div
        className={
          compact
            ? 'text-foreground/70 space-y-1 text-xs leading-[1.35] tracking-[0.03em] uppercase'
            : 'text-foreground/70 space-y-2 text-[0.72rem] leading-[1.45] tracking-[0.005em] normal-case'
        }
      >
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const { about, working, experience, clients, feed } = data;

  return (
    <div className="md:grid md:min-h-dvh md:grid-cols-[minmax(17rem,28vw)_minmax(0,1fr)]">
      {/* Left — fixed identity column */}
      <aside className="border-border/40 order-1 flex flex-col justify-between gap-8 border-b px-6 pt-18 pb-7 md:sticky md:top-0 md:h-dvh md:overflow-y-auto md:border-b-0 md:px-8 md:pt-24 md:pb-8">
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-2">
            <h1 className="text-foreground/90 text-[0.72rem] leading-[1.25] tracking-[0.08em] uppercase">
              Michael Ciccarelli
              <br />
              DESIGN ENGINEER
            </h1>
            <p className="text-muted-foreground/65 max-w-[20rem] text-xs leading-[1.35] tracking-[0.04em] uppercase">
              Available for fractional product UI, design systems, and custom web builds.
            </p>
          </div>

          <Section title="About">
            {about.map((paragraph, i) => (
              <p key={i} className="mb-0">
                {renderInlineLinks(paragraph)}
              </p>
            ))}
          </Section>

          <Section title="Working together">
            {working.map((paragraph, i) => (
              <p key={i} className="mb-0">
                {renderInlineLinks(paragraph)}
              </p>
            ))}
          </Section>

          <Section title="Previous experience" compact>
            <div className="space-y-1">
              {experience.map((e) => (
                <div key={e.company}>
                  {e.company}{' '}
                  <span className="text-muted-foreground/60">
                    — {e.role}, {e.years}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Selected clients" compact>
            <p className="mb-0">{clients}</p>
          </Section>
        </div>

        <div className="grid grid-cols-2 gap-6 md:block md:space-y-8">
          <Section title="Contact" compact>
            <div className="space-y-1">
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
              <div className="text-muted-foreground/60">
                Las Vegas, Nevada <span className="text-muted-foreground/40">·</span> <Clock />
              </div>
            </div>
          </Section>

          <Section title="Social" compact>
            <div className="space-y-1">
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

      {/* Right — scrollable feed */}
      <div className="order-2 px-6 pt-7 pb-20 md:px-12 md:pt-[17px] md:pb-24 lg:px-16">
        <Feed items={feed as FeedItem[]} />
      </div>
    </div>
  );
}
