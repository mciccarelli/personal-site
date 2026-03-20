'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IntroReveal({ children, className }: { children: React.ReactNode; className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, { opacity: 0 });

		const reveal = () => {
			gsap.to(el, {
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
			});
		};

		// On desktop, wait for watermark. On mobile (no watermark), reveal after a short delay.
		const isMd = window.matchMedia('(min-width: 768px)').matches;

		if (isMd) {
			window.addEventListener('watermark-ready', reveal, { once: true });
			// Fallback if watermark never fires (e.g. slow load)
			const fallback = setTimeout(reveal, 2000);
			return () => {
				window.removeEventListener('watermark-ready', reveal);
				clearTimeout(fallback);
			};
		} else {
			const timeout = setTimeout(reveal, 200);
			return () => clearTimeout(timeout);
		}
	}, []);

	return (
		<div ref={ref} className={className} style={{ opacity: 0 }}>
			{children}
		</div>
	);
}
