import { ProjectList } from '@/components';
import data from '@/app/data.json';

export default function Home() {
	const { projects, bio, expertise } = data;

	return (
		<div className="container mx-auto px-4">
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-10 md:col-start-1 lg:col-start-4 lg:col-span-8 flex flex-col gap-12">
					<div className="max-w-xl space-y-12 pt-12 md:pt-24">
						<div className="space-y-4">
							<h2>About</h2>
							<div className="text-balance" dangerouslySetInnerHTML={{ __html: bio }} />
							<p>
								For project inquiries:{' '}
								<a className="fancy-link" href="https://cal.com/haelcc/30min">
									schedule a call
								</a>
								.
								<br />
								You can also{' '}
								<a className="fancy-link" href="mailto:mic@hael.cc">
									Email me
								</a>{' '}
								or find me on{' '}
								<a className="fancy-link" href="https://t.me/mcrelli">
									Telegram
								</a>{' '}
								and{' '}
								<a className="fancy-link" href="https://x.com/mcrxlli">
									X/Twitter
								</a>
								.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-8">
							<div className="space-y-4">
								<h2>Expertise</h2>
								<ul className="list-disc list-inside">
									{expertise.map((item) => (
										<li key={item} className="text-foreground/80 marker:text-foreground">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<h2>Recent Projects</h2>
						<ProjectList items={projects} />
					</div>
				</div>
			</div>
		</div>
	);
}
