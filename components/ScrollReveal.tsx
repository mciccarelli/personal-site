'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  perLetter?: boolean;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  perLetter = false,
  stagger = 0.03,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (perLetter) {
      const letters = el.querySelectorAll('.letter');
      gsap.set(letters, { y: 30, opacity: 0, filter: 'blur(4px)' });

      gsap.to(letters, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play reverse play reverse',
        },
      });
    } else {
      gsap.set(el, { y: 20, opacity: 0, filter: 'blur(8px)' });

      gsap.to(el, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, perLetter, stagger]);

  if (perLetter && typeof children === 'string') {
    const letters = children.split('');
    return (
      <Tag ref={ref as React.RefObject<never>} className={className}>
        {letters.map((char, i) => (
          <span key={i} className="letter inline-block" style={{ opacity: 0 }}>
            {char === ' ' ? '\u00A0' : char}
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
