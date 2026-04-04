import { cn } from '@/lib/utils';

type HeroIntroProps = {
  className?: string;
};

export default function HeroIntro({ className }: HeroIntroProps) {
  return (
    <p className={cn('text-xs', className)}>
      <span className="font-medium text-foreground">michael ciccarelli</span> — design
      engineer building interfaces and systems. product
      interfaces, web platforms, and the systems behind them. independent. available for
      consulting and select engagements.
    </p>
  );
}
