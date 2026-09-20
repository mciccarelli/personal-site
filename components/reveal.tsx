import type { ReactNode } from 'react';

// text as one span per character, each carrying its index so css can stagger the reveal
export default function Reveal({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className="reveal-ch" style={{ '--i': i } as React.CSSProperties}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

export function RevealIcon({ children, index }: { children: ReactNode; index: number }) {
  return (
    <span aria-hidden className="reveal-ch inline-flex" style={{ '--i': index } as React.CSSProperties}>
      {children}
    </span>
  );
}
