import { Fragment, type ReactNode } from 'react';
import ModeToggle from '@/components/mode-toggle';
import SocialLinks from '@/components/social-links';
import SiteTabs from '@/components/site-tabs';
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

export default function Home() {
  const { bio, timeline, work, photos } = data;

  return (
    <div className="mx-auto max-w-2xl px-6 pt-6 pb-20 text-sm lowercase md:px-8">
      <div className="mb-8">
        <ModeToggle />
      </div>

      <div className="md:max-w-2xl">
        <div>
          <section className="text-foreground/90 mb-7 space-y-6">
            <h1 className="text-foreground font-medium">michael ciccarelli</h1>
            <div>
              {bio.map((text, i) => (
                <p key={i}>{renderInlineLinks(text)}</p>
              ))}
            </div>
          </section>

          <section className="text-foreground/60 mb-8 space-y-1">
            <div>
              <span className="tracking-wider uppercase">email</span> —{' '}
              <a href="mailto:m@ciccarel.li">m@ciccarel.li</a>
            </div>
            <div>
              <span className="tracking-wider uppercase">booking</span> —{' '}
              <a href="https://cal.com/ciccarelli/intro" target="_blank" rel="noopener noreferrer">
                cal.com/ciccarelli/intro
              </a>
            </div>
            <div>
              <span className="tracking-wider uppercase">social</span> — <SocialLinks />
            </div>
          </section>

          <SiteTabs timeline={timeline} work={work} photos={photos} />
        </div>
      </div>
    </div>
  );
}
