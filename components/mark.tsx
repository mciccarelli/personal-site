const MASK = {
  maskImage: "url('/mc.svg')",
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'left center',
  WebkitMaskImage: "url('/mc.svg')",
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'left center',
} as const;

export default function Mark({ className = 'h-8 w-[68px]' }: { className?: string }) {
  return <div aria-hidden className={`bg-foreground ${className}`} style={MASK} />;
}
