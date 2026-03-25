'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Particle {
	homeX: number;
	homeY: number;
	startX: number;
	startY: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	delay: number;
}

export default function Watermark() {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const mouseRef = useRef({ x: -9999, y: -9999, active: false });
	const rafRef = useRef<number>(0);
	const entryRef = useRef({ start: 0, settled: false, phase: 'intro' as 'intro' | 'done' });

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;

		const init = () => {
			const rect = container.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return Promise.resolve();
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;

			return new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => {
					const off = document.createElement('canvas');
					off.width = canvas.width;
					off.height = canvas.height;
					const offCtx = off.getContext('2d');
					if (!offCtx) return;

					// Scale SVG to fill width — container is oversized to avoid clipping
					const scale = (rect.width * 0.85) / img.naturalWidth;
					const drawW = img.naturalWidth * scale;
					const drawH = img.naturalHeight * scale;
					const drawX = (rect.width - drawW) / 2;
					const drawY = (rect.height - drawH) / 2;

					offCtx.scale(dpr, dpr);
					offCtx.drawImage(img, drawX, drawY, drawW, drawH);

					const imageData = offCtx.getImageData(0, 0, off.width, off.height);
					const pixels = imageData.data;
					const gap = Math.round(4 * dpr);
					const particles: Particle[] = [];

					const centerX = rect.width / 2;
					const centerY = rect.height / 2;

					for (let y = 0; y < off.height; y += gap) {
						for (let x = 0; x < off.width; x += gap) {
							const i = (y * off.width + x) * 4;
							if (pixels[i + 3] > 128) {
								const px = x / dpr;
								const py = y / dpr;
								// Scatter from center with random spread
								const angle = Math.random() * Math.PI * 2;
								const spread = 30 + Math.random() * 120;
								const startX = centerX + Math.cos(angle) * spread;
								const startY = centerY + Math.sin(angle) * spread;
								// Stagger: particles closer to center resolve first
								const distFromCenter = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
								const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
								const delay = (distFromCenter / maxDist) * 0.3;
								particles.push({ homeX: px, homeY: py, startX, startY, x: startX, y: startY, vx: 0, vy: 0, delay });
							}
						}
					}

					particlesRef.current = particles;
					resolve();
				};
				img.src = '/CICCARELLI.svg';
			});
		};

		const getColor = () => {
			const isDark = document.documentElement.classList.contains('dark');
			return isDark ? 'rgba(250, 245, 243, 0.14)' : 'rgba(10, 9, 8, 0.22)';
		};

		// Timing
		const DOT_HOLD = 400;
		const DOT_FADE = 300;
		const DOT_TOTAL = DOT_HOLD + DOT_FADE;
		const SCATTER_DURATION = 1200;
		const DOT_RADIUS = 32;

		const accentHSL = (() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue('--accent').trim();
		})();

		const animate = () => {
			const rect = container.getBoundingClientRect();
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, rect.width, rect.height);

			const mouse = mouseRef.current;
			const particles = particlesRef.current;
			const color = getColor();
			const radius = 130;
			const mouseLocalX = mouse.x - rect.left;
			const mouseLocalY = mouse.y - rect.top;

			const entry = entryRef.current;
			const now = performance.now();
			const elapsed = now - entry.start;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			if (entry.phase === 'intro') {
				// --- Dot ---
				if (elapsed < DOT_TOTAL) {
					let dotAlpha = 1;
					let dotR = DOT_RADIUS;
					if (elapsed > DOT_HOLD) {
						const ft = (elapsed - DOT_HOLD) / DOT_FADE;
						const ease = 1 - Math.pow(1 - ft, 3);
						dotAlpha = 1 - ease;
						dotR = DOT_RADIUS * (1 - ease);
					}
					ctx.beginPath();
					ctx.arc(centerX, centerY, dotR, 0, Math.PI * 2);
					ctx.fillStyle = `hsla(${accentHSL} / ${dotAlpha})`;
					ctx.fill();
				}

				// --- Particles: start after dot hold ---
				if (elapsed > DOT_HOLD) {
					const particleElapsed = elapsed - DOT_HOLD;
					const globalT = Math.min(particleElapsed / SCATTER_DURATION, 1);

					ctx.fillStyle = color;
					ctx.beginPath();

					for (const p of particles) {
						const pt = Math.max(0, Math.min((globalT - p.delay) / (1 - p.delay), 1));
						const ease = 1 - Math.pow(1 - pt, 5);
						p.x = p.startX + (p.homeX - p.startX) * ease;
						p.y = p.startY + (p.homeY - p.startY) * ease;
						ctx.rect(p.x, p.y, 1.5, 1.5);
					}

					ctx.fill();

					// Fire ready early so page fades in while particles finish settling
					if (!entry.settled && globalT >= 0.7) {
						entry.settled = true;
						window.dispatchEvent(new Event('watermark-ready'));
					}

					if (globalT >= 1) {
						entry.phase = 'done';
					}
				}
			}

			// Phase: done (interactive)
			else if (entry.phase === 'done') {
				ctx.fillStyle = color;
				ctx.beginPath();

				for (const p of particles) {
					if (mouse.active) {
						const dx = p.x - mouseLocalX;
						const dy = p.y - mouseLocalY;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < radius && dist > 0) {
							const force = ((radius - dist) / radius) * 3;
							p.vx += (dx / dist) * force;
							p.vy += (dy / dist) * force;
						}
					}

					p.vx += (p.homeX - p.x) * 0.025;
					p.vy += (p.homeY - p.y) * 0.025;
					p.vx *= 0.9;
					p.vy *= 0.9;
					p.x += p.vx;
					p.y += p.vy;

					ctx.rect(p.x, p.y, 1.5, 1.5);
				}

				ctx.fill();
			}

			rafRef.current = requestAnimationFrame(animate);
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
		};

		const handleMouseLeave = () => {
			mouseRef.current = { ...mouseRef.current, active: false };
		};

		gsap.set(container, { opacity: 0 });

		init().then(() => {
			entryRef.current.start = performance.now();
			entryRef.current.phase = 'intro';
			rafRef.current = requestAnimationFrame(animate);

			// Fade in container immediately — dot is the first visible thing
			gsap.to(container, {
				opacity: 1,
				duration: 0.3,
				ease: 'power2.out',
			});
		});

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);

		const handleResize = () => {
			init().then(() => {
				// On resize, skip entry animation — snap particles to home
				entryRef.current.settled = true;
				entryRef.current.phase = 'done';
				for (const p of particlesRef.current) {
					p.x = p.homeX;
					p.y = p.homeY;
					p.startX = p.homeX;
					p.startY = p.homeY;
					p.vx = 0;
					p.vy = 0;
				}
				if (!rafRef.current) {
					rafRef.current = requestAnimationFrame(animate);
				}
			});
		};
		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(rafRef.current);
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="hidden md:flex fixed left-0 right-0 z-0 select-none items-end justify-center px-6 cursor-default bottom-5"
			aria-hidden="true"
			style={{ height: 'clamp(12rem, 25vw, 30rem)' }}
		>
			<canvas ref={canvasRef} className="w-full h-full pointer-events-auto" />
		</div>
	);
}
