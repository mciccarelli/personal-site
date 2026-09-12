import { Fragment, type ReactNode } from 'react';
import Arrow from '@/components/arrow';
import Clock from '@/components/clock';
import CopyEmail from '@/components/copy-email';
import DeckColumn from '@/components/deck-column';
import DeckNav from '@/components/deck-nav';
import ModeToggle from '@/components/mode-toggle';
import PhotoColumn from '@/components/photo-column';
import ProjectCard from '@/components/project-card';
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
    if (match[2].startsWith('#')) {
      nodes.push(
        <a key={key++} href={match[2]}>
          {match[1]}
        </a>,
      );
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

const COLUMNS = [
  { id: 'projects', label: 'Projects' },
  { id: 'workbench', label: 'Workbench' },
  { id: 'photos', label: 'Photos' },
  { id: 'resume', label: 'Resume' },
];

function Empty() {
  return (
    <div className="row">
      <span className="text-muted-foreground">&mdash;</span>
      <span className="text-muted-foreground">Nothing here yet.</span>
    </div>
  );
}

// the /photos route still renders the deck; photos have their own column now
export default async function Home(_props: { photosVisible?: boolean } = {}) {
  const { about, experience, clients } = data;
  const feed = await getFeed();
  // the feed arrives newest first from the query
  const projects = feed.filter((item) => item.type === 'project');
  const photos = feed.filter((item) => item.type === 'photo');

  return (
    <div className="deck">
      <aside className="deck-rail px-5 pt-8 pb-5">
        <header>
          <h1 className="text-foreground font-semibold">Michael Ciccarelli</h1>
        </header>

        <div className="mt-10 space-y-8">
          <section className="text-foreground/85">
            {about.map((paragraph, i) => (
              <p key={i} className="mb-3 leading-[1.75] text-balance">
                {renderInlineLinks(paragraph)}
              </p>
            ))}
            <a
              className="intro-cta mt-5"
              href="https://cal.com/ciccarelli/intro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book an intro call
              <Arrow />
            </a>
          </section>

          <section>
            <div className="row">
              <span className="label">E:</span>
              <CopyEmail email="mikecicc@gmail.com" />
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

          <DeckNav items={COLUMNS} />
        </div>

        {/* local time on the left, theme toggle on the right */}
        <footer className="mt-auto flex items-center justify-between pt-10">
          <Clock location="Las Vegas" />
          <ModeToggle className="-mr-1 opacity-30 transition-opacity duration-500 ease-out hover:opacity-100" />
        </footer>
      </aside>

      <div data-deck-columns className="deck-columns">
        <DeckColumn
          id="projects"
          label="Projects"
          count={projects.length}
          description="Client and studio work, newest first."
        >
          {projects.length === 0 && <Empty />}
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </DeckColumn>

        <DeckColumn
          id="workbench"
          label="Workbench"
          count={0}
          description="Experiments and prototypes."
        >
          <Empty />
        </DeckColumn>

        <PhotoColumn sets={photos} />

        <DeckColumn id="resume" label="Resume" description="Roles and clients, most recent first.">
          <div className="text-foreground/85">
            {experience.map((e) => (
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
            <span className="text-foreground/85">{clients}</span>
          </div>
          <div className="row">
            <span className="label">PDF:</span>
            <a href="/michael-ciccarelli_resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume
            </a>
          </div>
        </DeckColumn>
      </div>
    </div>
  );
}
