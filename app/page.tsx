import Feed from '@/components/feed';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageGrid from '@/components/page-grid';
import data from '../data.json';

export default function Home() {
	const { projects } = data;

	return (
		<TooltipProvider>
			<PageGrid>
				<div className="md:col-start-3 md:col-span-2">
					<Feed items={projects} />
				</div>
			</PageGrid>
		</TooltipProvider>
	);
}
