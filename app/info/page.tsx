import type { Metadata } from 'next';
import { Contact, Engagements, Intro, Previously } from '@/components/rail-blocks';

export const metadata: Metadata = {
  title: 'info · michael ciccarelli',
  alternates: { canonical: '/info' },
};

// the deck's rail on its own: who, how to reach, and where before
export default function InfoPage() {
  return (
    <div className="max-w-[26rem] px-5 pt-8 pb-16 [--label-col:30%]">
      <header>
        <h1 className="text-foreground font-semibold">relli.cc</h1>
      </header>
      <div className="mt-10 space-y-8">
        <Intro />
        <Engagements />
        <Contact />
        <Previously />
      </div>
    </div>
  );
}
