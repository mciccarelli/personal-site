import { faqs } from '@/app/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <section id="faq" className="mt-20 px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2 md:col-start-2 max-w-2xl">
          <h2 className="mb-6 font-mono text-[10px] text-neutral-500 uppercase">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm leading-snug font-medium tracking-tight text-neutral-500 transition-colors duration-300 hover:text-white data-[state=open]:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground font-sans text-sm leading-relaxed pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
