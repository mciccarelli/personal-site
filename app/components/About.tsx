'use client';

import { useState, useEffect } from 'react';

interface AboutProps {
  visible: boolean;
}

export default function About({ visible }: AboutProps) {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (visible && !hasShown) {
      setHasShown(true);
    }
  }, [visible, hasShown]);

  const base =
    'text-foreground font-sans text-lg font-medium leading-tight tracking-tight transition-all duration-700 md:text-xl';
  const show = hasShown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

  return (
    <section id="about" className="mt-12 scroll-mt-48 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 max-w-2xl space-y-4 md:col-span-2 md:col-start-2">
          <p className={`${base} ${show}`}>
            Full-stack engineer with a frontend focus and a strong bias toward design quality. I
            build product interfaces, design systems, and the infrastructure behind complex web
            applications.
          </p>
          <p className={`${base} delay-100 ${show}`}>
            Working day-to-day in TypeScript and modern web frameworks. Projects often involve
            motion and interaction, headless CMS, API integrations, e-commerce, fintech, and
            emerging tech (crypto, AI).
          </p>
          <p className={`${base} delay-200 ${show}`}>
            Independent, based in Las Vegas. Available for consulting and select project work.{' '}
            <a href="#contact" className="underline-offset-4">
              Get in touch
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
