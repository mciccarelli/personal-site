const MASK = {
  maskImage: "url('/mc.svg')",
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: "url('/mc.svg')",
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
} as const;

export default function Mark({
  className = 'h-8 w-[68px]',
  emboss = false,
}: {
  className?: string;
  emboss?: boolean;
}) {
  if (!emboss) return <div aria-hidden className={`bg-foreground ${className}`} style={MASK} />;

  // the shadow has to sit on a wrapper: a filter on the masked element is clipped by the mask
  return (
    <div aria-hidden className={`emboss ${className}`}>
      <div className="bg-background size-full" style={MASK} />
    </div>
  );
}
