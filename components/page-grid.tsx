import SiteNav from '@/components/site-nav';
import ModeToggle from '@/components/mode-toggle';
import Watermark from '@/components/watermark';
import IntroSequence from '@/components/intro-sequence';

const TAGLINE = 'design engineer & consultant';

export default function PageGrid({ children }: { children: React.ReactNode }) {
	return (
		<IntroSequence>
			<div className="relative min-h-dvh overflow-hidden">
				<Watermark />

				{/* Page content */}
				<div
					className="relative z-10 grid grid-cols-1 md:grid-cols-8 md:gap-x-12 px-8 md:pl-10 md:pr-8 pt-6 pb-24 md:pb-16"
					data-intro-content
				>
					{/* Tagline — above nav on mobile */}
					<div className="md:hidden text-[0.6rem] text-muted-foreground/40 mb-4 max-w-[200px]">
						{TAGLINE}
					</div>

					<div className="md:col-span-2 md:sticky md:top-6 self-start mb-6 md:mb-0">
						<SiteNav />
					</div>
					{children}
				</div>

				{/* Theme toggle — fixed bottom-left */}
				<div className="fixed bottom-5 left-5 md:left-7 z-50" data-intro-chrome>
					<ModeToggle />
				</div>

				{/* Tagline — fixed bottom-right on desktop */}
				<div className="hidden md:block fixed bottom-5 right-8 z-50 text-[0.6rem] text-muted-foreground/40" data-intro-chrome>
					{TAGLINE}
				</div>
			</div>
		</IntroSequence>
	);
}
