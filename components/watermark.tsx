'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Particle {
	homeX: number;
	homeY: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
}

export default function Watermark() {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const mouseRef = useRef({ x: -9999, y: -9999, active: false });
	const rafRef = useRef<number>(0);

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;

		const init = () => {
			const rect = container.getBoundingClientRect();
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

					for (let y = 0; y < off.height; y += gap) {
						for (let x = 0; x < off.width; x += gap) {
							const i = (y * off.width + x) * 4;
							if (pixels[i + 3] > 128) {
								const px = x / dpr;
								const py = y / dpr;
								particles.push({ homeX: px, homeY: py, x: px, y: py, vx: 0, vy: 0 });
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
			rafRef.current = requestAnimationFrame(animate);

			gsap.to(container, {
				opacity: 1,
				duration: 0.3,
				ease: 'power2.out',
				onComplete: () => {
					window.dispatchEvent(new Event('watermark-ready'));
				},
			});
		});

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);

		const handleResize = () => {
			init().then(() => {
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
			className="hidden md:flex fixed left-0 right-0 z-0 select-none items-center justify-center px-6 cursor-default bottom-[8vh]"
			aria-hidden="true"
			style={{ height: 'clamp(12rem, 25vw, 30rem)' }}
		>
			<canvas ref={canvasRef} className="w-full h-full pointer-events-auto" />
		</div>
	);
}
