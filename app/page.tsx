import Feed from '@/components/feed';
import ColumnReveal from '@/components/column-reveal';
import data from '../data.json';

export default function Home() {
  const { projects } = data;

  return (
    <>
      <ColumnReveal className="md:col-span-2 md:col-start-5">
        <Feed items={projects} />
      </ColumnReveal>

      <ColumnReveal className="hidden md:col-span-2 md:col-start-7 md:block">
        <p className="text-foreground/80 text-xs">
          michael ciccarelli — design engineer building interfaces and the systems behind them.
        </p>
      </ColumnReveal>
    </>
  );
}
