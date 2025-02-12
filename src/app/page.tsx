import { Links, ProjectList } from '@/components';
import data from '@/app/data.json';

export default function Home() {
	const { projects, bio, emailAddress, calLink, links, experience } = data;

	return (
		<div className="container mx-auto px-4">
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-8 md:col-start-2 flex flex-col gap-4">
					<div className="pt-10 md:pt-20 max-w-xl">
						<div className="bio mb-4" dangerouslySetInnerHTML={{ __html: bio }} />
						<p>
							<a className="fancy-link" href={calLink} title="">
								book an intro call
							</a>{' '}
							for project inquiries, or drop me an email at{' '}
							<a className="fancy-link" href={`mailto:${emailAddress}`}>
								{emailAddress}
							</a>
						</p>
					</div>
					<div>
						<h2>Projects</h2>
						<ProjectList items={projects} />
					</div>
					<div>
						<h2>Elsewhere</h2>
						<Links items={links} />
					</div>
				</div>
			</div>
		</div>
	);
}
