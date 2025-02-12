import { Links, ProjectList } from '@/components';
import data from '@/app/data.json';

export default function Home() {
	const { projects, bio, emailAddress, calLink, links, experience } = data;

	return (
		<div className="col-span-3 md:col-span-2 md:col-start-2 flex flex-col gap-y-10">
			<div className="flex flex-col gap-y-10">
				<div className="pt-10 md:pt-40">
					{/* <h2>About</h2> */}
					<div className="bio mb-4" dangerouslySetInnerHTML={{ __html: bio }} />
					<p>
						<span className="flex items-center gap-x-1">
							<a className="fancy-link" href={calLink} title="">
								Book an intro call
							</a>
							for project inquiries, or drop me an email{' '}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="size-3"
							>
								<path
									fillRule="evenodd"
									d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
									clipRule="evenodd"
								/>
							</svg>
							<a className="fancy-link" href={`mailto:${emailAddress}`}>
								{emailAddress}
							</a>
						</span>
					</p>
				</div>

				<div className="col-span-4">
					<h2>Projects</h2>
					<ProjectList items={projects} />
				</div>

				{/* <div className="col-span-4">
					<h2>Experience</h2>
					{experience.map(({ company, title, dates, description }, index) => (
						<li key={index} className="grid grid-cols-2 gap-4">
							<span className="md:col-span-1 flex">
								{dates} -- {company}
								<span className="hidden lg:flex">
									{title ? ',' : ''} {title}
								</span>
							</span>
							<span className="md:col-span-1">{description}</span>
						</li>
					))}
				</div> */}
				<div className="col-span-1">
					<h2>Elsewhere</h2>
					<Links items={links} />
				</div>
			</div>
		</div>
	);
}
