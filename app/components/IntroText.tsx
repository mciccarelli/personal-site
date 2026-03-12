import { TextReveal } from '@/components/TextReveal';

export default function IntroText() {
  return (
    <TextReveal
      as="h1"
      perWord
      className="text-foreground col-span-1 text-balance font-sans text-3xl leading-[1.10] font-bold tracking-tight md:col-span-3 md:text-4xl"
    >
      MICHAEL CICCARELLI is a software engineer building modern web applications and digital
      interfaces. Two decades working across fintech, media, e-commerce, and emerging technology —
      with clients including Condé Nast, Amazon, VICE, and Pentagram.
    </TextReveal>
  );
}
