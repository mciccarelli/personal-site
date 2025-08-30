import { Feed, PaymentSection } from '@/components';
import { TooltipProvider } from '@/components/ui/tooltip';
import data from '@/app/data.json';

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
												{item.role}
												{item.company ? `, ${item.company}` : ''}
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

						{/* Services */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Services</h3>
							<ul className="space-y-1 text-xs text-foreground/80">
								{expertise.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>

						{/* Contact & Payment - Split Columns on Desktop, Stacked on Mobile */}
						<div className="flex flex-col space-y-8 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:space-y-0">
							{/* Contact */}
							<div className="space-y-1">
								<h3 className="text-sm uppercase tracking-wider pl-4">Contact</h3>
								<div className="space-y-1 text-xs text-foreground/80">
									<div>
										<a href="mailto:hello@m1ke.xyz">hello[at]m1ke.xyz</a>
									</div>
									<div>
										<a href="http://cal.com/thirdindex/15min">Schedule a call</a>
									</div>
									<div>
										<a href="http://linkedin.com/in/mciccarelli/">LinkedIn</a>,{' '}
										<a href="https://github.com/mciccarelli">GitHub</a>
									</div>

									<div>
										<a href="https://x.com/mcrxlli">X</a>, <a href="https://t.me/mcrelli">TG</a>,{' '}
										<a href="https://signal.me/#eu/GVhbLY_OWFgXipDTou2OTpIonm05xVhb4iAywFVWb5PBl_qAd2JMF56o6JNiLkoo">
											Signal
										</a>
									</div>
								</div>
							</div>

							{/* Payment */}
							<PaymentSection wallets={wallets} />
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
