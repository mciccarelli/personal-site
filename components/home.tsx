import Clock from '@/components/clock';
import CopyEmail from '@/components/copy-email';
import Mark from '@/components/mark';
import ModeToggle from '@/components/mode-toggle';
import { renderInlineLinks } from '@/components/inline-links';
import WorkStrip from '@/components/work-strip';
import { getWork } from '@/lib/sanity';
import data from '../data.json';

const CALL_URL = 'https://cal.com/ciccarelli/intro';

const EMAIL = 'mc@relli.cc';
const HANDLE = 'mciccarelli';

// one handle everywhere; the networks are the links
const NETWORKS = [
  { name: 'X', href: `https://x.com/${HANDLE}` },
  { name: 'Instagram', href: `https://instagram.com/${HANDLE}` },
  { name: 'GitHub', href: `https://github.com/${HANDLE}` },
  { name: 'LinkedIn', href: `https://linkedin.com/in/${HANDLE}` },
];

// one column of prose, the work running off the right edge, then the record
export default async function Home() {
  const work = await getWork();

  return (
    <div className="pt-8 pb-12 sm:pt-12">
      <header className="page flex items-center justify-between">
        <a href="/" aria-label="relli.cc, home" className="hover:no-underline">
          <Mark className="h-6 w-[50px]" />
        </a>
        <ModeToggle className="-mr-1 opacity-60 transition-opacity hover:opacity-100" />
      </header>

      <section className="page prose-intro mt-12 sm:mt-16">
        {[...data.intro, ...data.studio].map((paragraph, i) => (
          <p key={i}>{renderInlineLinks(paragraph)}</p>
        ))}
        <a className="cta mt-6" href={CALL_URL} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
      </section>

      {work.length > 0 && (
        <div className="mt-16">
          <WorkStrip items={work} />
        </div>
      )}

      <section className="page mt-16" aria-labelledby="experience">
        <h2 id="experience" className="section-label">
          experience
        </h2>
        <ul className="mt-3">
          {data.experience.map((e) => (
            <li key={e.company} className="record">
              <span className="text-foreground">{e.company}</span>
              <span className="text-muted-foreground truncate">{e.role}</span>
              <span className="text-muted-foreground text-right tabular-nums">{e.years}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6">
          Clients include {data.clients.replace(/\.$/, '')}.{' '}
          <a
            className="link"
            href="/michael-ciccarelli_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </p>
      </section>

      <p className="page text-foreground/70 mt-16">{renderInlineLinks(data.photos)}</p>

      <section className="page mt-16" aria-labelledby="contact">
        <h2 id="contact" className="section-label">
          contact
        </h2>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <CopyEmail email={EMAIL} />
          {NETWORKS.map((n) => (
            <a key={n.name} className="link" href={n.href} target="_blank" rel="noopener noreferrer">
              {n.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="page text-muted-foreground mt-16 flex justify-between">
        <span>Michael Ciccarelli</span>
        <Clock location="Las Vegas" />
      </footer>
    </div>
  );
}
