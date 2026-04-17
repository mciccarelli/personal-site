import { cn } from '@/lib/utils';

type HeroIntroProps = {
  className?: string;
};

export default function HeroIntro({ className }: HeroIntroProps) {
  return (
    <p className={cn('text-xs', className)}>
      <span className="font-medium text-foreground">michael ciccarelli</span> — design
      engineer building for the web. i run{' '}
      <a href="https://thirdindex.co" target="_blank" rel="noopener noreferrer">
        third index
      </a>
      , a small digital studio. available for collaborations and consulting.
    </p>
  );
}
