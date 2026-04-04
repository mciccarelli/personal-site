import Feed from '@/components/feed';
import ColumnReveal from '@/components/column-reveal';
import HeroIntro from '@/components/hero-intro';
import data from '../data.json';

export default function Home() {
  const { projects } = data;

  return (
    <>
      <ColumnReveal className="md:col-span-2 md:col-start-5">
        <Feed items={projects} />
      </ColumnReveal>

      <ColumnReveal className="hidden md:col-span-2 md:col-start-7 md:block">
        <HeroIntro className="text-foreground/80" />
      </ColumnReveal>
    </>
  );
}
