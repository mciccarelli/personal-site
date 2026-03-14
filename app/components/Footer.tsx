export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-muted-foreground grid grid-cols-2 items-center p-4 font-mono text-[10px] uppercase md:grid-cols-4">
      <div>&copy; {currentYear}</div>
      <div className="hidden md:block md:col-start-3">
        &rarr;&nbsp;
        <a href="mailto:m@ciccarel.li" className="hover:text-foreground transition-colors">
          m@ciccarel.li
        </a>
      </div>
    </footer>
  );
}
