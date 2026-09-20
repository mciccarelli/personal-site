import Clock from '@/components/clock';
import DeckColumn from '@/components/deck-column';
import DeckNav from '@/components/deck-nav';
import { Contact, Engagements, Intro } from '@/components/rail-blocks';
import ModeToggle from '@/components/mode-toggle';
import PhotoColumn from '@/components/photo-column';
import ProjectCard from '@/components/project-card';
import { getExperiments, getFeed } from '@/lib/sanity';
import data from '../data.json';

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
  const { experience, clients } = data;
  const [feed, experiments] = await Promise.all([getFeed(), getExperiments()]);
  // the feed arrives newest first from the query
  const projects = feed.filter((item) => item.type === 'project');
  const photos = feed.filter((item) => item.type === 'photo');

  return (
    <div className="deck">
      <aside className="deck-rail px-5 pt-8 pb-5 [--label-col:30%]">
        <header>
          <h1 className="text-foreground font-semibold">relli.cc</h1>
        </header>

        <div className="mt-10 space-y-8">
          <Intro />
          <Engagements />
          <Contact />

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
          description="Client and studio work."
        >
          {projects.length === 0 && <Empty />}
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </DeckColumn>

        <DeckColumn
          id="workbench"
          label="Workbench"
          count={experiments.length}
          description="Experiments and prototypes."
        >
          {experiments.length === 0 && <Empty />}
          {experiments.map((e) => (
            <ProjectCard key={e.title} project={e} />
          ))}
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
