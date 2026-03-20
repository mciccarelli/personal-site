import SiteNav from '@/components/site-nav';

const TAGLINE = 'design engineer & consultant';

export default function PageGrid({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative z-10 grid grid-cols-1 md:grid-cols-8 md:gap-x-12 px-8 md:pl-10 md:pr-8 pt-6 pb-24 md:pb-16">
			{/* Tagline — above nav on mobile */}
			<div className="md:hidden text-[0.6rem] text-muted-foreground/40 mb-4 max-w-[200px]">
				{TAGLINE}
			</div>

			<div className="md:col-span-2 md:sticky md:top-6 self-start mb-6 md:mb-0">
				<SiteNav />
			</div>
			{children}
		</div>
	);
}
