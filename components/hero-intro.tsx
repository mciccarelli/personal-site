import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeroIntroProps = {
  className?: string;
};

export default function HeroIntro({ className }: HeroIntroProps) {
  return (
    <p className={cn('text-xs', className)}>
      <span className="font-medium text-foreground">michael ciccarelli</span> — design
      engineer building bespoke websites, platforms, and the systems behind them. open
      to collaborations and consulting. <Link href="/information">more</Link>
    </p>
  );
}
