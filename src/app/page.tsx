import { ProjectList } from '@/components';
import data from '@/app/data.json';

export default function Home() {
	const { projects, bio, expertise } = data;

	return (
		<div className="grid grid-cols-12 gap-4 px-4">
			<div className="col-span-12 md:col-span-6 flex flex-col gap-12">
				<div className="max-w-xl space-y-12">
					<div className="text-balance md:max-w-lg" dangerouslySetInnerHTML={{ __html: bio }} />
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
	);
}
