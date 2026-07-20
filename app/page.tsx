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
        <Label>Want to work together?</Label>
        <p className="mb-3">
          I run{' '}
          <a
            href="https://thirdindex.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            Third Index
          </a>
          , a small studio for startups and consumer brands — fractional design engineering,
          product interfaces, and commerce.
        </p>
        <p className="flex gap-5">
          <a
            href="https://cal.com/ciccarelli/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            Book an intro call &rarr;
          </a>
          <a
            href="https://thirdindex.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-muted"
          >
            thirdindex.co &rarr;
          </a>
        </p>
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Projects</Label>
        <Rows items={projects} />
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Recent Client Work</Label>
        <Rows items={work} />
        <p className="text-muted mt-4">Other clients: {clients}</p>
      </section>

      <hr className="border-border" />

      <section className="py-7">
        <Label>Contact</Label>
        <p>
          You can contact me by email <CopyEmail email="m@ciccarel.li" />. Find me on{' '}
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
