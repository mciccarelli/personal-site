'use client';

interface AboutProps {
  visible: boolean;
}

export default function About({ visible }: AboutProps) {
  const base = 'text-foreground font-sans text-lg font-medium leading-[1.4] tracking-tight transition-all duration-700 md:text-xl';
  const show = visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

  return (
    <section id="about" className="mt-12 scroll-mt-48 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 space-y-4 md:col-span-2 md:col-start-2">
          <p className={`${base} ${show}`}>
            Full-stack engineer and creative technologist — most of my work sits at the intersection of technical rigor and design quality.
          </p>
          <p className={`${base} delay-100 ${show}`}>
            Day to day that means TypeScript and modern web frameworks: building interfaces, component systems, and the infrastructure behind complex web applications.
          </p>
          <p className={`${base} delay-200 ${show}`}>
            Projects frequently involve motion and interaction, headless CMS architecture, API integrations, e-commerce, and fintech.
          </p>
          <p className={`${base} delay-300 ${show}`}>
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
