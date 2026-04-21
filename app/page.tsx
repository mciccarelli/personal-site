import { Fragment, type ReactNode } from 'react';
import Clock from '@/components/clock';
import ModeToggle from '@/components/mode-toggle';
import SocialLinks from '@/components/social-links';
import data from '../data.json';

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      className="text-foreground/40 group-hover:text-foreground -mt-1 inline-block h-3 w-3 transition-colors"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

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

export default function Home() {
  const { bio, cta, timeline } = data;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-20 text-sm lowercase md:px-8">
      <div className="mb-12 flex items-center justify-between">
        <ModeToggle />
        <Clock />
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-24">
        <div className="md:sticky md:top-6 md:self-start">
          <section className="text-foreground/80 mb-10 space-y-6">
            <h1 className="text-foreground font-medium">michael ciccarelli</h1>
            {bio.map((text, i) => (
              <p key={i}>{renderInlineLinks(text)}</p>
            ))}
          </section>

          <section className="text-foreground/80 mb-14 space-y-1 md:mb-0">
            <div>
              <span className="tracking-wider uppercase">email</span> —{' '}
              <a href="mailto:mc@thirdindex.co">mc@thirdindex.co</a>
            </div>
            <div>
              <SocialLinks />
            </div>
          </section>
        </div>

        <section>
          <ol className="space-y-8">
            {timeline.map((item, i) => (
              <li key={i} className="text-foreground/80">
                <div>
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
                    {item.location ? `, ${item.location}` : ''}, {item.year}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
