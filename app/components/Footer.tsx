/**
 * Footer component displays the site footer with copyright and time information
 *
 * Features:
 * - Copyright notice with dynamic current year
 * - Real-time clock display component
 * - Responsive layout with justified content
 * - Consistent typography and spacing
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-muted-foreground grid grid-cols-1 p-4 font-mono text-xs uppercase md:grid-cols-4">
      <div>© {currentYear}</div>
      <div className="md:col-start-3">
        &rarr;&nbsp;
        <a href="mailto:m@ciccarel.li" className="hover:text-foreground transition-colors">
          m@ciccarel.li
        </a>
      </div>
    </footer>
  );
}
