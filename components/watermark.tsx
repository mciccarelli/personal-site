'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const LETTERS = 'CICCARELLI'.split('');

export default function Watermark() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

	useEffect(() => {
		const container = containerRef.current;
		const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
		if (!container || letters.length === 0) return;

		const handleMouseMove = (e: MouseEvent) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			letters.forEach((letter) => {
				const rect = letter.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;

				const dx = mouseX - cx;
				const dy = mouseY - cy;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const radius = 250;

				if (distance < radius) {
					const strength = 1 - distance / radius;
					const eased = strength * strength;
					const pushY = -eased * 18;
					const pushX = -(dx / radius) * eased * 8;
					const rotate = (dx / radius) * eased * 4;

					gsap.to(letter, {
						y: pushY,
						x: pushX,
						rotation: rotate,
						duration: 0.4,
						ease: 'power2.out',
						overwrite: 'auto',
					});
				} else {
					gsap.to(letter, {
						y: 0,
						x: 0,
						rotation: 0,
						duration: 0.6,
						ease: 'power2.out',
						overwrite: 'auto',
					});
				}
			});
		};

		const handleMouseLeave = () => {
			letters.forEach((letter) => {
				gsap.to(letter, {
					y: 0,
					x: 0,
					rotation: 0,
					duration: 0.8,
					ease: 'elastic.out(1, 0.4)',
					overwrite: 'auto',
				});
			});
		};

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="hidden md:flex fixed left-0 right-0 z-[201] pointer-events-auto select-none items-center justify-center px-6 cursor-default bottom-[8vh]"
			aria-hidden="true"
			data-intro-watermark
		>
			<span
				className="text-foreground/[0.07] leading-none whitespace-nowrap normal-case flex"
				style={{
					fontFamily: "'Saol Display', serif",
					fontSize: 'clamp(3rem, 11vw, 16rem)',
				}}
			>
				{LETTERS.map((letter, i) => (
					<span
						key={i}
						ref={(el) => { lettersRef.current[i] = el; }}
						data-intro-letter
						className="inline-block will-change-transform"
					>
						{letter}
					</span>
				))}
			</span>
		</div>
	);
}
