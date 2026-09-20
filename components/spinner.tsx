'use client';

import { useEffect, useState } from 'react';
import spinners from 'unicode-animations';

type Name = keyof typeof spinners;

// a text spinner from unicode-animations; holds its first frame under reduced motion
export default function Spinner({ name = 'braille', className = '' }: { name?: Name; className?: string }) {
  const { frames, interval } = spinners[name];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), interval);
    return () => clearInterval(id);
  }, [frames.length, interval]);

  return (
    <span aria-hidden className={`font-mono whitespace-pre ${className}`}>
      {frames[i]}
    </span>
  );
}
