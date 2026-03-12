import type { Metadata } from 'next';
import { TextReveal } from '@/components/TextReveal';

export const metadata: Metadata = {
  title: 'Information',
  description:
    'Fullstack engineer building interfaces, component systems, and modern web applications. React, Next.js, TypeScript.',
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function InformationPage() {
  return (
    <main className="flex flex-col px-4 pt-28 pb-24 font-sans md:pt-24" style={{ gap: '5rem' }}>
      {/* About */}
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 max-w-5xl space-y-4 md:col-span-3">
          <TextReveal
            as="p"
            className="text-foreground font-sans text-xl font-medium leading-[1.35] tracking-tight md:text-2xl"
          >
            Fullstack engineer. Most of the work lives where technical rigor and design quality
            have to coexist.
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.15}
            className="text-foreground font-sans text-xl font-medium leading-[1.35] tracking-tight md:text-2xl"
          >
            Day to day that means React, Next.js, and TypeScript — building interfaces, component
            systems, and the infrastructure behind modern web applications.
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.3}
            className="text-foreground font-sans text-xl font-medium leading-[1.35] tracking-tight md:text-2xl"
          >
            Projects frequently involve motion and interaction, headless CMS architecture, API
            integrations, e-commerce, and fintech — payments, web3, and decentralized
            applications.
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.45}
            className="text-foreground font-sans text-xl font-medium leading-[1.35] tracking-tight md:text-2xl"
          >
            Independent, based in Las Vegas. Available for consulting and select project work.{' '}
            <a
              href="/contact"
              className="underline-offset-4"
            >
              Get in touch
            </a>
            .
          </TextReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2 md:col-start-2">
          <TextReveal
            as="h2"
            delay={0.4}
            className="mb-6 font-mono text-[10px] text-neutral-500 uppercase"
          >
            FAQ
          </TextReveal>
          <TextReveal delay={0.45}>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm leading-snug font-medium tracking-tight">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-neutral-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TextReveal>
        </div>
      </section>
    </main>
  );
}
