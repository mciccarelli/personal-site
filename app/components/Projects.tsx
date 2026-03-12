'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { projects } from '@/app/data';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.project-item');
    gsap.set(items, { y: 40, opacity: 0, filter: 'blur(6px)' });

    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="projects" className="mt-24 min-h-dvh px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div ref={listRef} className="space-y-1 text-right md:col-span-3 md:col-start-2 md:-space-y-2">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="project-item" style={{ opacity: 0 }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="block w-full py-1 text-right md:py-0.5"
                >
                  <span
                    className={`font-serif text-3xl leading-none tracking-tight uppercase transition-colors duration-300 hover:text-white md:text-5xl lg:text-6xl ${isOpen ? 'text-white' : 'text-neutral-500'}`}
                  >
                    {project.title}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-6 text-right md:pb-8">
                        <p className="font-sans text-sm leading-relaxed tracking-tight">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-end items-baseline gap-x-6 gap-y-2">
                          <span className="font-mono text-[10px] text-neutral-500 uppercase">
                            {project.role}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500 uppercase">
                            {project.technologies}
                          </span>
                        </div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block font-mono text-[10px] tracking-widest text-neutral-500 uppercase transition-colors hover:text-white"
                        >
                          Visit &rarr;
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
