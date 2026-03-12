'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Cal, { getCalApi } from '@calcom/embed-react';
import { TextReveal } from '@/components/TextReveal';
import { TextScramble } from '@/components/TextScramble';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail, Github, Instagram, Linkedin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── Data ────────────────────────────────────────────────────────────────────

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

const faqs = [
  {
    question: 'What kind of work do you take on?',
    answer:
      "Frontend architecture, design engineering, technical consulting, and hands-on build work. I'm most useful on projects where design quality and engineering rigor need to coexist — product interfaces, design systems, complex interactive builds.",
  },
  {
    question: 'How do engagements typically work?',
    answer:
      'It depends on what you need. Embedded with your team as a principal-level IC, fractional technical leadership, or scoped project work. I adapt to your workflow and tools.',
  },
  {
    question: "What's your stack?",
    answer:
      "Next.js, React, TypeScript on the frontend. Node.js, PostgreSQL, Supabase on the backend. Tailwind, Framer Motion, GSAP for styling and animation. Sanity, Contentful, and Shopify (headless) for content and commerce. Stack is flexible — I pick what fits the project.",
  },
  {
    question: 'Do you work with agencies?',
    answer:
      'Yes. I partner with agencies and studios as a senior dev resource, and work directly with founders and product teams. I plug into whatever process you already have running.',
  },
  {
    question: 'Can you work within an existing codebase?',
    answer:
      "That's a lot of what I do — inheriting projects, improving architecture, shipping features inside established systems. I audit first, then get to work.",
  },
];

// ─── Clock ───────────────────────────────────────────────────────────────────

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

// ─── Social Icons ────────────────────────────────────────────────────────────

function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`text-muted-foreground flex list-none gap-4 ${className ?? ''}`}>
      <li>
        <a href="mailto:m@ciccarel.li" className="hover:text-foreground transition-colors">
          <Mail size={16} />
        </a>
      </li>
      <li>
        <a href="https://github.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Github size={16} />
        </a>
      </li>
      <li>
        <a href="https://x.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
      </li>
      <li>
        <a href="https://instagram.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Instagram size={16} />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/mciccarelli/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Linkedin size={16} />
        </a>
      </li>
    </ul>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const time = useClock();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Projects
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('message');

  useEffect(() => {
    if (activeTab === 'call') {
      (async function () {
        const cal = await getCalApi({ namespace: '15min' });
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          theme: 'dark',
          cssVarsPerTheme: {
            dark: {
              'cal-bg': 'transparent',
              'cal-text': 'hsl(348 45.45% 97.84%)',
              'cal-text-muted': 'hsl(240 5% 64.9%)',
              'cal-border': 'hsl(240 3.7% 15.9%)',
              'cal-border-subtle': 'hsl(240 3.7% 15.9%)',
              'cal-bg-emphasis': 'hsl(30 11.11% 7%)',
              'cal-brand': 'hsl(0 100% 47%)',
              'cal-brand-emphasis': 'hsl(0 100% 40%)',
              'cal-brand-text': 'hsl(348 45.45% 97.84%)',
            },
          },
        });
      })();
    }
  }, [activeTab]);

  // Trigger scramble after ~32px of scroll, reverse when back to top
  useEffect(() => {
    function onScroll() {
      setScrolledPastHero(window.scrollY > 32);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="flex min-h-dvh flex-col justify-between px-4 pt-28 pb-4 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <TextReveal
            as="h1"
            perWord
            className="text-foreground col-span-1 font-sans text-2xl leading-[1.10] font-bold tracking-tight text-balance md:col-span-3 md:text-3xl"
          >
            MICHAEL CICCARELLI is a software engineer building modern web applications and digital
            interfaces. Two decades working across fintech, media, e-commerce, and emerging technology —
            clients include Condé Nast, Amazon, VICE, and Pentagram.
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
            <span className={`block transition-opacity duration-300 ${scrolledPastHero ? 'opacity-0' : 'opacity-100'}`}>
              {time}
            </span>
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section id="about" className="mt-12 scroll-mt-48 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 space-y-4 md:col-span-2 md:col-start-2">
            <p className={`text-foreground font-sans text-lg font-medium leading-[1.4] tracking-tight transition-all duration-700 md:text-xl ${scrolledPastHero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Full-stack engineer and creative technologist — most of my work sits at the intersection of technical rigor and design quality.
            </p>
            <p className={`text-foreground font-sans text-lg font-medium leading-[1.4] tracking-tight transition-all duration-700 delay-100 md:text-xl ${scrolledPastHero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Day to day that means TypeScript and modern frameworks: building interfaces, component systems, and the infrastructure behind complex web applications.
            </p>
            <p className={`text-foreground font-sans text-lg font-medium leading-[1.4] tracking-tight transition-all duration-700 delay-200 md:text-xl ${scrolledPastHero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Projects frequently involve motion and interaction, headless CMS architecture, API integrations, e-commerce, and fintech.
            </p>
            <p className={`text-foreground font-sans text-lg font-medium leading-[1.4] tracking-tight transition-all duration-700 delay-300 md:text-xl ${scrolledPastHero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Independent, based in Las Vegas. Available for consulting and select project work.{' '}
              <a href="#contact" className="underline-offset-4">
                Get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2 md:col-start-2">
            <h2 className="mb-6 font-mono text-[10px] text-neutral-500 uppercase">FAQ</h2>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm leading-snug font-medium tracking-tight text-neutral-500 transition-colors duration-300 hover:text-white data-[state=open]:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-neutral-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────────────── */}
      <section id="projects" className="mt-24 min-h-dvh px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-3 md:col-start-1 -space-y-1 md:-space-y-2">
            {projects.map((project, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <ScrollReveal delay={i * 0.05}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="block w-full py-0 text-left md:py-0.5"
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
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section id="contact" className="min-h-dvh px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2 md:col-start-2">
            <h2 className="text-muted-foreground mb-4 font-mono text-[10px] tracking-widest uppercase">
              Contact
            </h2>

            <div className="mb-4 md:hidden">
              <SocialIcons />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList className="relative z-10">
                  <TabsTrigger value="message">send a message</TabsTrigger>
                  <TabsTrigger value="call">schedule a call</TabsTrigger>
                </TabsList>
                <SocialIcons className="hidden md:flex" />
              </div>

              <TabsContent value="message">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-muted-foreground block font-mono text-xs uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-neutral-800/40 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-muted-foreground block font-mono text-xs uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-neutral-800/40 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-muted-foreground block font-mono text-xs uppercase">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-neutral-800/40 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                      placeholder="Your company"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-muted-foreground block font-mono text-xs uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="border-neutral-800/40 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="pt-8">
                    <button type="submit" disabled={isSubmitting} className="btn w-full md:w-auto">
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="border-neutral-800/40 border p-4">
                      <p className="text-muted-foreground font-mono text-sm">Thanks! I&apos;ll be in touch soon.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="border-neutral-800/40 border p-4">
                      <p className="text-muted-foreground font-mono text-sm">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    </div>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="call" className="-mx-4 mt-0 md:-mx-32 lg:-mx-48">
                <div className="-mt-4 h-[700px] overflow-hidden">
                  <Cal
                    namespace="15min"
                    calLink="ciccarelli/15min"
                    style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                    config={{ layout: 'month_view', theme: 'dark' }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ── Footer mark ─────────────────────────────────────────────────── */}
      <footer className="overflow-hidden px-4 pt-24 pb-8">
        <ScrollReveal
          as="p"
          perLetter
          stagger={0.04}
          className="text-center font-serif text-[15vw] leading-none tracking-tight text-neutral-800/40 uppercase select-none"
        >
          Ciccarelli
        </ScrollReveal>
      </footer>

    </main>
  );
}
