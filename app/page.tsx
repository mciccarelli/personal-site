import Feed from '@/components/feed';
import PaymentSection from '@/components/payment-section';
import { TooltipProvider } from '@/components/ui/tooltip';
import data from '../data.json';

export default function Home() {
	const { bio, projects, expertise, wallets, experience } = data;

	return (
		<TooltipProvider>
			<div className="flex flex-col-reverse md:grid md:grid-cols-12 px-4 lg:px-0 gap-8 lg:gap-0 pt-4">
				{/* Left Column - Empty Space on Desktop */}
				<div className="hidden xl:block lg:col-span-1 xl:col-span-3" />

				{/* Center Column - Scrollable Projects */}
				<div className="md:col-span-6 lg:col-span-6 xl:col-span-5 md:overflow-y-auto md:pr-8 md:pl-4">
					<div className="pb-8 md:pl-2.5">
						<h3 className="text-sm uppercase tracking-wider pl-4 mb-1">Projects</h3>
						<Feed items={projects} />
					</div>
				</div>

				{/* Right Column - Sticky Info */}
				<div className="md:col-span-6 lg:col-span-5 xl:col-span-4 md:sticky md:top-[52px] md:h-fit md:pl-8 md:pr-8">
					<div className="space-y-8">
						{/* About */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">About</h3>
							<div className="text-xs text-foreground/80 text-balance">
								<p dangerouslySetInnerHTML={{ __html: bio }} />
							</div>
						</div>

						{/* Experience */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Experience</h3>
							<div className="space-y-1 text-xs text-foreground/80">
								{/* Mobile: stacked, Desktop: grid */}
								<div className="hidden lg:grid lg:grid-cols-[1fr_auto] lg:gap-8">
									<div className="space-y-1">
										{experience.map((item, index) => (
											<div key={index}>
												{item.role}, <span dangerouslySetInnerHTML={{ __html: item.company }} />
											</div>
										))}
									</div>
									<div className="space-y-1 text-right">
										{experience.map((item, index) => (
											<div key={index}>
												{item.start}—{item.end}
											</div>
										))}
									</div>
								</div>
								{/* Mobile: combined */}
								<div className="lg:hidden space-y-1">
									{experience.map((item, index) => (
										<div key={index} className="flex justify-between">
											<span>
												{item.role}
												{item.company ? `, ${item.company}` : ''}
											</span>
											<span>
												{item.start}—{item.end}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Capabilities */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">specialties</h3>
							<ul className="space-y-1 text-xs text-foreground/80">
								{expertise.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>

						{/* Contact */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Contact</h3>
							<div className="space-y-1 text-xs text-foreground/80">
								<div>
									<a href="mailto:mic@hael.cc">mic@hael.cc</a>
								</div>
								<div>
									<a href="http://cal.com/thirdindex/15min">schedule a call</a>
								</div>
								<div>
									<a href="https://github.com/mciccarelli">github</a>,{' '}
									<a href="http://linkedin.com/in/mciccarelli/">linkedin</a>
								</div>
								<div>
									<a href="https://x.com/mciccarelli">twitter/x</a>,{' '}
									<a href="https://t.me/mciccarelli">tg</a>
								</div>
							</div>
						</div>

						{/* Payment */}
						<PaymentSection wallets={wallets} />
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
