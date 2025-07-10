import { ProjectList, Titles } from '@/components';
import data from '@/app/data.json';

export default function Home() {
	const { projects, expertise } = data;

	return (
		<div className="grid grid-cols-12 gap-4 px-4">
			<div className="col-span-12 md:col-span-6 flex flex-col gap-12">
				<div className="max-w-xl space-y-12">
					{/* <div className="text-balance md:max-w-lg" dangerouslySetInnerHTML={{ __html: bio }} /> */}
					<div className="flex flex-col gap-4 text-pretty">
						<div>
							michael ciccarelli: a <Titles /> building digital products, designing interactive
							experiences, and consulting on web development and emerging tech.
						</div>
						<div>
							my <a href="https://thirdindex.co">studio</a> covers the full spectrum—concept to
							deployment and everything in between.
						</div>
						<div>
							get in touch: <a href="http://cal.com/thirdindex/15min">book a call</a> or reach out
							via <a href="mailto:mikecicc@gmail.com">email</a>,{' '}
							<a href="https://t.me/mcrelli">tg</a>,{' '}
							<a href="https://signal.me/#eu/GVhbLY_OWFgXipDTou2OTpIonm05xVhb4iAywFVWb5PBl_qAd2JMF56o6JNiLkoo">
								signal
							</a>
							, <a href="https://x.com/mcrxlli">x</a>,{' '}
							<a href="https://www.instagram.com/m1ke.xyz">ig</a>.
						</div>
					</div>

					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-4">
							<h2>Focus Areas</h2>
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
					<h2>Selected Work</h2>
					<ProjectList items={projects} />
				</div>
			</div>
		</div>
	);
}
