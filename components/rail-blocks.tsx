import { Fragment, type ReactNode } from 'react';
import Arrow from '@/components/arrow';
import CopyEmail from '@/components/copy-email';
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

export const CALL_URL = 'https://cal.com/ciccarelli/intro';

export const EMAIL = 'mc@relli.cc';
export const HANDLE = 'mciccarelli';

// one handle everywhere; the networks are the links
export const NETWORKS = [
  { label: 'X', href: 'https://x.com/mcrxlli' },
  { label: 'IG', href: `https://instagram.com/${HANDLE}` },
  { label: 'GH', href: `https://github.com/${HANDLE}` },
  { label: 'IN', href: `https://linkedin.com/in/${HANDLE}` },
];

// "x.com/mciccarelli"
const reveal = (href: string) => href.replace(/^https?:\/\//, '');

export function Intro() {
  return (
    <section className="text-foreground/85">
      {data.intro.map((paragraph, i) => (
        <p key={i} className="mb-3 leading-[1.75] text-balance last:mb-0">
          {renderInlineLinks(paragraph)}
        </p>
      ))}
    </section>
  );
}

// the offer: rates on the label grid, then the one action
export function Engagements() {
  return (
    <section>
      <h3 className="label mb-1">Engagements:</h3>
      {/* "Sprint: 2 weeks, from $10k." splits at the first colon into the label / value grid */}
      {data.rates.map((line) => {
        const [label, value] = line.split(/:\s*(.+)/);
        return (
          <div key={label} className="row">
            <span className="label">{label}:</span>
            <span className="whitespace-nowrap">{value}</span>
          </div>
        );
      })}
      <a className="intro-cta mt-3" href={CALL_URL} target="_blank" rel="noopener noreferrer">
        Book a call
        <Arrow />
      </a>
    </section>
  );
}

export function Contact() {
  return (
    <section>
      <h3 className="label mb-1">Contact:</h3>
      <div>
        <CopyEmail email={EMAIL} />
      </div>
      {/* the strip is the positioned box, so every link's reveal lands in the same spot below it */}
      <div className="relative flex gap-3">
        {NETWORKS.map((n) => (
          <a
            key={n.label}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${n.label}, ${reveal(n.href)}`}
            data-handle={reveal(n.href)}
            className="handle"
          >
            {n.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function Previously() {
  return (
    <section className="space-y-4">
      <div className="text-foreground/85">
        {data.experience.map((e) => (
          <div key={e.company} className="row">
            <span className="text-muted-foreground">{e.years}</span>
            <span>
              {e.company}
              <span className="text-muted-foreground"> · {e.role}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="row">
        <span className="label">Clients:</span>
        <span className="text-foreground/85">{data.clients}</span>
      </div>
      <div className="row">
        <span className="label">PDF:</span>
        <a href="/michael-ciccarelli_resume.pdf" target="_blank" rel="noopener noreferrer">
          Download resume
        </a>
      </div>
    </section>
  );
}
