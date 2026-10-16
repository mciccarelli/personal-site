import CopyEmail from '@/components/copy-email';
import { renderInlineLinks } from '@/components/inline-links';
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

// one narrow column of text: who, what I make, how to reach me
export default function Home() {
  return (
    <div className="pt-8 pb-16 sm:pt-12">
      <section className="page prose-intro">
        {[...data.intro, data.photos].map((paragraph, i) => (
          <p key={i}>{renderInlineLinks(paragraph)}</p>
        ))}
      </section>

      <section className="page mt-12" aria-labelledby="work">
        <h2 id="work" className="section-label">
          studio and products
        </h2>
        <ul className="mt-3">
          {data.products.map((p) => (
            <li key={p.name} className="product">
              <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
              <span className="text-muted-foreground text-right">{p.year}</span>
              <span className="text-muted-foreground col-span-2 text-pretty">{p.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="page mt-12" aria-labelledby="contact">
        <h2 id="contact" className="section-label">
          contact
        </h2>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <CopyEmail email={EMAIL} />
          <a className="link" href={CALL_URL} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          {NETWORKS.map((n) => (
            <a key={n.name} className="link" href={n.href} target="_blank" rel="noopener noreferrer">
              {n.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
