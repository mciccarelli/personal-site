import Feed from '@/components/feed';
import ColumnReveal from '@/components/column-reveal';
import data from '../data.json';

export default function Home() {
  const { projects } = data;

  return (
    <>
      <ColumnReveal className="md:col-span-2 md:col-start-3">
        <Feed items={projects} />
      </ColumnReveal>

      <ColumnReveal className="md:col-span-2 md:col-start-7">
        <p className="text-foreground/80 text-xs">
          michael ciccarelli is a design engineer building web interfaces and product systems.
        </p>
      </ColumnReveal>
    </>
  );
}
