// right arrow drawn at text size, used wherever a link leads somewhere
// nudged up: uppercase caps sit high in this font's line box, so box-centre reads low
export default function Arrow({ className = 'size-[1em] -translate-y-[0.1em]' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
