'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { projects } from '@/app/data';
import ProjectImage from '@/components/ProjectImage';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Target and smoothed position
  const targetPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  // Mouse offset within the hovered button (normalized -1 to 1)
  const mouseOffset = useRef({ x: 0, y: 0 });

  const activeIndex = hoverIndex ?? openIndex;

  // Parallax range — how much the mouse shifts the image within the left col
  const PARALLAX_X = 20;
  const PARALLAX_Y = 24;

  const animatePosition = useCallback(() => {
    // Compute final position: anchor + mouse parallax
    const finalX = targetPos.current.x + mouseOffset.current.x * PARALLAX_X;
    const finalY = targetPos.current.y + mouseOffset.current.y * PARALLAX_Y;

    smoothPos.current.x += (finalX - smoothPos.current.x) * 0.1;
    smoothPos.current.y += (finalY - smoothPos.current.y) * 0.1;

    if (imageWrapRef.current) {
      imageWrapRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
    }

    rafRef.current = requestAnimationFrame(animatePosition);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animatePosition);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animatePosition]);

  // When hoverIndex changes, snap the anchor to that item's row
  useEffect(() => {
    if (activeIndex == null || !sectionRef.current) return;

    const itemEl = itemRefs.current[activeIndex];
    if (!itemEl) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();

    // Left column area: 16px from left edge of section
    const x = 16;
    // Vertically center the image (~180px tall) on the hovered item
    const imgHeight = 180;
    const y = itemRect.top - sectionRect.top + (itemRect.height - imgHeight) / 2;

    targetPos.current.x = x;
    targetPos.current.y = y;
  }, [activeIndex]);

  // Track mouse for parallax offset
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Normalize mouse position within section to -1..1
      mouseOffset.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseOffset.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <section ref={sectionRef} id="projects" className="relative mt-24 min-h-dvh px-4 py-24">
      {/* Desktop cursor-following image — positioned absolutely within section */}
      <div
        ref={imageWrapRef}
        className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 transition-opacity duration-500"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          >
            <ProjectImage
              src={project.image}
              visible={activeIndex === i}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        <div ref={listRef} className="-space-y-1 text-right md:col-span-3 md:col-start-2 md:-space-y-4">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="project-item"
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="block w-full py-0.5 text-right md:py-0"
                >
                  <span
                    className={`font-serif text-4xl leading-[0.85] tracking-tight uppercase transition-colors duration-300 hover:text-white md:text-7xl lg:text-9xl ${isOpen ? 'text-white' : 'text-neutral-500'}`}
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
                      {/* Mobile image — plain img, no 3D */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="mt-3 w-full md:hidden"
                      />

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
