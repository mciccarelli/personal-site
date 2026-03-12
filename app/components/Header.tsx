'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/information', label: 'information' },
  { href: '/projects', label: 'projects' },
  { href: '/contact', label: 'contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Mobile */}
      <nav className="flex items-start justify-between p-4 font-mono text-[10px] uppercase md:hidden">
        <Link
          href="/"
          className={`no-underline transition-colors hover:text-foreground hover:no-underline ${
            pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          ciccarel.li
        </Link>
        <div className="flex flex-col items-end gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 hover:text-foreground hover:decoration-accent ${
                pathname === link.href
                  ? 'text-foreground decoration-accent'
                  : 'text-muted-foreground decoration-transparent'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop */}
      <nav className="hidden p-4 font-mono text-[10px] uppercase md:grid md:grid-cols-4">
        <div>
          <Link
            href="/"
            className={`no-underline transition-colors hover:text-foreground hover:no-underline ${
              pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            michael ciccarelli
          </Link>
        </div>

        <div className="flex items-center">
          {navLinks.slice(0, 2).map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && <span className="text-muted-foreground">,&nbsp;</span>}
              <Link
                href={link.href}
                className={`transition-all duration-300 hover:text-foreground hover:decoration-accent ${
                  pathname === link.href
                    ? 'text-foreground decoration-accent'
                    : 'text-muted-foreground decoration-transparent'
                }`}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
        <div>
          <Link
            href="/contact"
            className={`transition-all duration-300 hover:text-foreground hover:decoration-accent ${
              pathname === '/contact'
                ? 'text-foreground decoration-accent'
                : 'text-muted-foreground decoration-transparent'
            }`}
          >
            contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
