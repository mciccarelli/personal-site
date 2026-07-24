'use client';

import { useFilter } from '@/components/feed-filter';

export default function PhotosLink() {
	const { setFilter } = useFilter();

	const handleClick = () => {
		setFilter('photos');
		// on mobile the feed lives below the sidebar — bring it into view
		if (window.matchMedia('(max-width: 767px)').matches) {
			document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="text-foreground/90 hover:text-foreground cursor-pointer no-underline transition-colors hover:underline hover:decoration-red-500 underline-offset-2"
		>
			photos
		</button>
	);
}
