import type { Metadata } from 'next';
import ServicesSection from '@/components/services-section';
import ContactForm from '@/components/contact-form';
import BookCallButton from '@/components/book-call-button';
import ColumnReveal from '@/components/column-reveal';
import StaggerList from '@/components/stagger-list';
import data from '../../data.json';

export const metadata: Metadata = {
  title: 'Hire',
};

export default function EngagePage() {
  const { services, process: processSteps } = data;

  return (
    <>
      {/* Services — cols 3-4 */}
      <ColumnReveal className="mb-10 md:col-span-2 md:col-start-3 md:mb-0">
        <p className="text-foreground/80 mb-4 text-xs">
          my typical engagements are listed below. <br />
          send a message or <BookCallButton /> to discuss a project.
        </p>
        <ServicesSection services={services} />
      </ColumnReveal>

      {/* Headline + Process steps — cols 5-6 */}
      <ColumnReveal className="mb-10 md:col-span-2 md:col-start-5 md:mb-0">
        <h1 className="text-foreground mb-1 font-serif text-xl leading-tight font-light">
          let&apos;s build something.
        </h1>
        <p className="text-muted-foreground mb-4 text-xs">
          tell me what you need and how involved you want to be. i&apos;ll work around you.
        </p>

        <StaggerList className="text-foreground/80 space-y-3 text-xs">
          {processSteps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-muted-foreground w-4 shrink-0 text-right">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </StaggerList>
      </ColumnReveal>

      {/* Contact form — cols 7-8 */}
      <ColumnReveal className="space-y-3 md:col-span-2 md:col-start-7">
        <ContactForm />
      </ColumnReveal>
    </>
  );
}
