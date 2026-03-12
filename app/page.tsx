'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import FAQ from './components/FAQ';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FooterMark from './components/FooterMark';

function useClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' PST',
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Home() {
  const time = useClock();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolledPastHero(window.scrollY > 32);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>
      <Hero time={time} scrolledPastHero={scrolledPastHero} />
      <About visible={scrolledPastHero} />
      <FAQ />
      <Projects />
      <Contact />
      <FooterMark />
    </main>
  );
}
