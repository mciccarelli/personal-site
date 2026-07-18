import Clock from '@/components/clock';
import CopyEmail from '@/components/copy-email';
import Rows from '@/components/rows';
import data from '../data.json';

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className="text-muted mb-3 font-normal">{children}</h2>;
}

export default function Home() {
  const { header, bio, clients, projects, work } = data;

  return (
    <div className="mx-auto max-w-[34rem] px-6 pt-10 pb-10 md:pt-16">
      <header className="mb-7">
        <Label>{header}</Label>
        {bio.map((text, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {text}
          </p>
        ))}
      </header>

      <section className="mb-7">
        <Label>Selected Clients</Label>
        <p>{clients}</p>
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Projects</Label>
        <Rows items={projects} />
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Work</Label>
        <Rows items={work} />
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Contact</Label>
        <p className="mb-3">
          Available for fractional and contract work — design systems, product interfaces, marketing
          sites, and commerce.
        </p>
        <p>
          You can contact me by email <CopyEmail email="m@ciccarel.li" /> or{' '}
          <a
            href="https://cal.com/ciccarelli/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            book an intro call
          </a>
          . Find me on{' '}
          <a
            href="https://x.com/mciccarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            X (Twitter)
          </a>
          ,{' '}
          <a
            href="https://github.com/mciccarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            GitHub
          </a>
          ,{' '}
          <a
            href="https://linkedin.com/in/mciccarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            LinkedIn
          </a>{' '}
          or{' '}
          <a
            href="https://instagram.com/mciccarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            Instagram
          </a>
          .
        </p>
      </section>

      <footer className="text-muted flex items-baseline justify-between border-t border-border pt-7">
        <span>&copy;2026 All Rights Reserved</span>
        <Clock />
      </footer>
    </div>
  );
}
