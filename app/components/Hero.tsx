'use client';

import { TextReveal } from '@/components/TextReveal';
import { TextScramble } from '@/components/TextScramble';

interface HeroProps {
  time: string;
  scrolledPastHero: boolean;
}

export default function Hero({ time, scrolledPastHero }: HeroProps) {
  return (
    <section className="flex min-h-dvh flex-col justify-between px-4 pt-28 pb-4 md:pt-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <TextReveal
          as="h1"
          perWord
          className="text-foreground col-span-1 font-sans text-2xl leading-tight font-bold tracking-tight md:col-span-3 md:text-3xl lg:text-4xl"
        >
          MICHAEL CICCARELLI is a software engineer with two decades building web platforms and
          digital interfaces across fintech, media, e-commerce, and emerging technology.
        </TextReveal>
      </div>
      <div className="mt-12 grid grid-cols-1 font-mono text-[10px] text-neutral-500 uppercase md:grid-cols-4">
        <div className="md:col-start-2">
          <TextScramble
            startText="Las Vegas, NV"
            endText="About"
            triggered={scrolledPastHero}
            className="block"
          />
          <span
            className={`block transition-opacity duration-300 ${scrolledPastHero ? 'opacity-0' : 'opacity-100'}`}
          >
            {time}
          </span>
        </div>
      </div>
    </section>
  );
}
