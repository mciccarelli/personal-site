'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TextReveal } from '@/components/TextReveal';

const projects = [
  {
    title: 'bankroll.fyi',
    role: 'Design & Development',
    url: 'https://bankroll.fyi',
    description:
      'Bet tracker app for managing wagers, tracking performance, and analyzing betting history.',
    technologies: 'Next.js, Tailwind, Supabase',
  },
  {
    title: 'Legend',
    role: 'Frontend Development',
    url: 'https://legend.xyz',
    description:
      'Marketing site for Legend, an embedded smart contract wallet built as a UI/UX layer on top of existing open DeFi protocols.',
    technologies: 'Next.js, Tailwind, WebGL',
  },
  {
    title: 'Amazon: The Bar',
    role: 'Frontend Development',
    url: 'https://amazonthe.bar',
    description:
      'Portfolio for creative collective featuring custom animations and dynamic layouts.',
    technologies: 'Next.js, Sanity, Tailwind, Motion',
  },
  {
    title: 'One/Of',
    role: 'Design & Development',
    url: 'https://shoponeof.com',
    description: 'E-commerce platform with custom booking system and Shopify checkout.',
    technologies: 'Shopify (Headless), Next.js, Sanity, Cal.com',
  },
  {
    title: 'Modern Treasury',
    role: 'Frontend Development',
    url: 'https://moderntreasury.com',
    description:
      'Marketing site for fintech platform that processes $1 billion in instant payments annually.',
    technologies: 'Next.js, Sanity, Tailwind',
  },
  {
    title: 'Elara World',
    role: 'Fullstack Development',
    url: 'https://elara.world',
    description: 'Community hub combining content publishing with integrated merchandise store.',
    technologies: 'Next.js, Sanity, Shopify',
  },
  {
    title: 'Revolve Law',
    role: 'Fullstack Development',
    url: 'https://revolvelawgroup.com',
    description: 'Professional services site with subtle animations and streamlined contact flows.',
    technologies: 'Next.js, Tailwind, Sanity',
  },
  {
    title: 'Kelvon Agee',
    role: 'Design & Development',
    url: 'https://kelvonagee.com',
    description:
      'Photography portfolio with optimized image delivery and immersive viewing experience.',
    technologies: 'Next.js, Cloudinary',
  },
  {
    title: 'The Well',
    role: 'Fullstack Development',
    url: 'https://the-well.com',
    description:
      'Wellness platform merging e-commerce with appointment booking and member management.',
    technologies: 'Vue.js, Sanity, Shopify',
  },
  {
    title: 'El Dorado',
    role: 'Frontend Development',
    url: 'https://eldo.us/',
    description:
      'Minimalist architecture portfolio emphasizing visual storytelling and project narratives.',
    technologies: 'Next.js, Contentful',
  },
  {
    title: 'VICE',
    role: 'Lead Frontend Development',
    url: 'https://vice.com',
    description:
      'High-traffic editorial platform serving millions of readers with real-time content delivery.',
    technologies: 'React.js, Redux, Node.js',
  },
];

export default function WorkPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="px-4 pt-28 pb-24 md:pt-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3 md:col-start-1 -space-y-1 md:-space-y-2">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="block w-full py-0 text-left md:py-0.5"
                >
                  <TextReveal
                    as="span"
                    delay={0.05 + i * 0.04}
                    className={`font-serif text-3xl leading-none tracking-tight uppercase transition-colors duration-300 hover:text-white md:text-5xl lg:text-6xl ${isOpen ? 'text-white' : 'text-neutral-500'}`}
                  >
                    {project.title}
                  </TextReveal>
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
                      <div className="pt-3 pb-6 md:pb-8">
                        <p className="font-sans text-sm leading-relaxed tracking-tight">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
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
    </main>
  );
}
