import Feed from '@/components/feed';
import data from '../data.json';

export default function Home() {
	const { projects } = data;

	return (
		<div className="md:col-start-3 md:col-span-2">
			<Feed items={projects} />
		</div>
	);
}
