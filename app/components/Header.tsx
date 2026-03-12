'use client';

const navLinks = [
  { href: '#about', label: 'information' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Mobile */}
      <nav className="flex items-start justify-between p-4 font-mono text-[10px] uppercase md:hidden">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-muted-foreground hover:text-foreground no-underline transition-colors hover:no-underline"
        >
          ciccarel.li
        </a>
        <div className="flex flex-col items-end gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop */}
      <nav className="hidden p-4 font-mono text-[10px] uppercase md:grid md:grid-cols-4">
        <div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-muted-foreground hover:text-foreground no-underline transition-colors hover:no-underline"
          >
            michael ciccarelli
          </a>
        </div>

        <div className="flex items-center">
          {navLinks.slice(0, 2).map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && <span className="text-muted-foreground">,&nbsp;</span>}
              <a
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <div>
          <a
            href="#contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            contact
          </a>
        </div>
      </nav>
    </header>
  );
}
