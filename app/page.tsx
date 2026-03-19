import Clock from '@/components/clock';
import Feed from '@/components/feed';
import ServicesSection from '@/components/services-section';
import BookCallDrawer from '@/components/book-call-drawer';
import ContactDrawer from '@/components/contact-drawer';
import { TooltipProvider } from '@/components/ui/tooltip';
import data from '../data.json';

export default function Home() {
	const { bio, expertise, projects, services, process: processSteps } = data;

	return (
		<TooltipProvider>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-[30px] md:px-8 pt-4 pb-16">
				{/* Left Whitespace */}
				<div className="hidden md:block"></div>

				{/* Middle Column - Projects (Last on mobile) */}
				<div className="order-2 md:order-1">
					<h3 className="text-sm uppercase tracking-wider pl-4 mb-1">Projects</h3>
					<Feed items={projects} />
				</div>

				{/* Right Column - Everything (First on mobile) */}
				<div className="space-y-8 order-1 md:order-2">
					{/* About */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">About</h3>
						<div className="text-xs text-foreground/80">
							{bio.map((paragraph, i) => (
								<p key={i}>
									{paragraph}
									{i === bio.length - 1 && <> <Clock /></>}
								</p>
							))}
						</div>
					</div>

					{/* Focus Areas */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Focus areas</h3>
						<ul className="space-y-1 text-xs text-foreground/80">
							{expertise.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<ServicesSection services={services} />

					{/* Contact */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Contact</h3>
						<div className="space-y-1 text-xs text-foreground/80">
							<div><BookCallDrawer /></div>
							<div><ContactDrawer processSteps={processSteps} /></div>
							<div>
								<a href="mailto:m@ciccarel.li">m@ciccarel.li</a>
							</div>
						</div>
					</div>

					{/* Social */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Social</h3>
						<div className="space-y-1 text-xs text-foreground/80">
							<div>
								<a href="https://x.com/mciccarelli">twitter/x</a>,{' '}
								<a href="https://instagram.com/mciccarelli">ig</a>,{' '}
								<a href="https://t.me/mciccarelli">tg</a>
							</div>
							<div>
								<a href="https://github.com/mciccarelli">github</a>,{' '}
								<a href="https://www.linkedin.com/in/mciccarelli/">linkedin</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
