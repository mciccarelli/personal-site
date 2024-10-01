import { Logo, ProjectList } from '@/components';
import { projects, bio, emailAddress, links, resume } from '@/app/data.json';

export default function Home() {
	return (
		<div className="col-span-3 md:col-span-2 md:col-start-2 flex flex-col justify-between gap-y-10">
			<div className="flex flex-col gap-y-10">
				<div className="pt-10 md:pt-40">
					<h2>Info</h2>
					<div className="bio mb-4" dangerouslySetInnerHTML={{ __html: bio }} />
					<p>
						For all inquiries, please email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
					</p>
				</div>
				<div>
					<h2>Recent Projects</h2>
					<ProjectList items={projects} />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<h2>More</h2>
					{links.map(({ text, href }, index) => (
						<li key={index}>
							{text === 'Resume' ? (
								<a
									href={resume}
									title="Download Resume in PDF Format"
									className="flex items-center gap-x-1"
								>
									Resume
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="size-3"
									>
										<path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
										<path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
									</svg>
								</a>
							) : (
								<a href={href} className="flex items-center gap-x-px">
									{text}
								</a>
							)}
						</li>
					))}
				</div>
			</div>
		</div>
	);
}
