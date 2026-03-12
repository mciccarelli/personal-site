'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  perWord?: boolean;
  stagger?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  perWord = false,
  stagger = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (perWord) {
      const words = el.querySelectorAll('.word');
      gsap.fromTo(
        words,
        {
          y: 20,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          delay,
          stagger,
          ease: 'power3.out',
        },
      );
    } else {
      gsap.fromTo(
        el,
        {
          y: 20,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          delay,
          ease: 'power3.out',
        },
      );
    }
  }, [delay, perWord, stagger]);

  if (perWord && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref as React.RefObject<never>} className={className}>
        {words.map((word, i) => (
          <span key={i} className="word inline-block" style={{ opacity: 0 }}>
            {word}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
