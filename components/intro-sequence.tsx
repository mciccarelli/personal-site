'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroSequenceProps {
	children: React.ReactNode;
}

const SESSION_KEY = 'intro-played';

export default function IntroSequence({ children }: IntroSequenceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === 'true';
		const container = containerRef.current;
		const bg = bgRef.current;
		if (!container || !bg) return;

		const content = container.querySelector<HTMLElement>('[data-intro-content]');
		const chrome = container.querySelector<HTMLElement>('[data-intro-chrome]');
		const watermark = container.querySelector<HTMLElement>('[data-intro-watermark]');
		const letters = container.querySelectorAll<HTMLElement>('[data-intro-letter]');

		if (alreadyPlayed) {
			gsap.set(bg, { display: 'none' });
			if (watermark) gsap.set(watermark, { zIndex: 0 });
			return;
		}

		// First visit — run intro
		if (content) gsap.set(content, { opacity: 0 });
		if (chrome) gsap.set(chrome, { opacity: 0 });

		const tl = gsap.timeline({
			onComplete: () => {
				sessionStorage.setItem(SESSION_KEY, 'true');
			},
		});

		// 1 — Letters drop in (animating the real watermark letters)
		tl.fromTo(
			letters,
			{ y: -40, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.04,
				ease: 'power3.out',
			}
		);

		// 2 — Hold
		tl.addLabel('reveal', '+=0.5');

		// 3 — Fade out overlay bg, drop watermark behind content
		tl.to(bg, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 'reveal');
		tl.set(bg, { display: 'none' });
		if (watermark) tl.set(watermark, { zIndex: 0 });

		// 4 — Fade in content + chrome
		if (content) {
			tl.to(content, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 'reveal+=0.2');
		}
		if (chrome) {
			tl.to(chrome, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 'reveal+=0.2');
		}

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div ref={containerRef}>
			<div
				ref={bgRef}
				className="fixed inset-0 z-[200] bg-background pointer-events-none"
			/>
			{children}
		</div>
	);
}
