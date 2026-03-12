import { ScrollReveal } from '@/components/ScrollReveal';

export default function FooterMark() {
  return (
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
  );
}
