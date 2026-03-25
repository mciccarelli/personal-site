'use client';

import { useState, useEffect } from 'react';

// Global flag — once the watermark has finished, all future consumers resolve immediately
let hasCompleted = false;

function onReady() {
	hasCompleted = true;
}

if (typeof window !== 'undefined') {
	window.addEventListener('watermark-ready', onReady, { once: true });
}

export function useWatermarkReady() {
	const [ready, setReady] = useState(hasCompleted);

	useEffect(() => {
		if (hasCompleted) {
			setReady(true);
			return;
		}

		const isMd = window.matchMedia('(min-width: 768px)').matches;
		if (!isMd) {
			setReady(true);
			return;
		}

		const reveal = () => setReady(true);
		window.addEventListener('watermark-ready', reveal, { once: true });
		const fallback = setTimeout(reveal, 3000);
		return () => {
			window.removeEventListener('watermark-ready', reveal);
			clearTimeout(fallback);
		};
	}, []);

	return ready;
}
