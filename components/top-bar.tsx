'use client';

import { Tabs } from '@base-ui-components/react/tabs';
import { motion } from 'motion/react';
import { FILTERS, useFilter, type Filter } from '@/components/feed-filter';

const LABELS: Record<Filter, string> = {
	all: 'All',
	projects: 'Work',
	photos: 'Photos',
};

export default function FilterMenu({ counts }: { counts: Record<Filter, number> }) {
	const { filter, setFilter, photosVisible } = useFilter();

	// filters only exist once the photos easter egg is on
	if (!photosVisible) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
		>
		<Tabs.Root
			value={filter}
			orientation="vertical"
			onValueChange={(value) => setFilter(value as Filter)}
		>
			<Tabs.List
				aria-label="Filter feed"
				className="flex flex-col items-start gap-1.5 text-xs uppercase md:items-end"
			>
				{FILTERS.map((f) => (
					<Tabs.Tab
						key={f}
						value={f}
						className="group text-muted-foreground/50 hover:text-foreground/75 aria-selected:text-foreground flex cursor-pointer items-center gap-1.5 tracking-[0.08em] uppercase transition-colors outline-none"
					>
						<span
							aria-hidden
							className="size-1.5 bg-red-500 opacity-0 transition-opacity duration-200 group-aria-selected:opacity-100"
						/>
						{LABELS[f]}
						<span className="text-[0.625rem] opacity-45">{counts[f]}</span>
					</Tabs.Tab>
				))}
			</Tabs.List>
		</Tabs.Root>
		</motion.div>
	);
}
