import Feed from '@/components/feed';
import PaymentSection from '@/components/payment-section';
import { TooltipProvider } from '@/components/ui/tooltip';
import data from '../data.json';

export default function Home() {
	const { bio, projects, expertise, wallets, experience } = data;

	return (
		<TooltipProvider>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 md:px-8 pt-4 pb-16">
				{/* Left Whitespace */}
				<div className="hidden md:block md:col-span-5"></div>

				{/* Content Area */}
				<div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Right Column - Everything (First on mobile) */}
					<div className="space-y-8 md:order-2">
						{/* About */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">About</h3>
							<div className="text-xs text-foreground/80">
								<p dangerouslySetInnerHTML={{ __html: bio }} />
							</div>
						</div>

						{/* Experience */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Experience</h3>
							<div className="space-y-1 text-xs text-foreground/80">
								{experience.map((item, index) => (
									<div key={index} className="flex justify-between gap-4">
										<span className="flex-1">
											{item.role}
											{item.company && (
												<>
													, <span dangerouslySetInnerHTML={{ __html: item.company }} />
												</>
											)}
										</span>
										<span className="whitespace-nowrap">
											{item.start}—{item.end}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Specialties */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Specialties</h3>
							<ul className="space-y-1 text-xs text-foreground/80">
								{expertise.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>

						{/* Contact & Payment */}
						<div className="space-y-1">
							<div className="flex flex-col md:flex-row md:gap-8">
								{/* Contact */}
								<div className="flex-1 space-y-1">
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
								<div className="flex-1 mt-8 md:mt-0">
									<PaymentSection wallets={wallets} />
								</div>
							</div>
						</div>
					</div>

					{/* Left Column - Projects (Last on mobile) */}
					<div className="md:order-1">
						<h3 className="text-sm uppercase tracking-wider pl-4 mb-1">Projects</h3>
						<Feed items={projects} />
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
