'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { projects } from '@/app/data';

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="mt-24 min-h-dvh px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="space-y-1 text-right md:col-span-3 md:col-start-2 md:-space-y-2">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <ScrollReveal delay={i * 0.05}>
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
                </ScrollReveal>

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
