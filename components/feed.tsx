'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import BlinkingDot from '@/components/blinking-dot';
import { cn } from '@/lib/utils';
import { useWatermarkReady } from '@/hooks/use-watermark-ready';

interface ProjectItem {
	title: string;
	role?: string;
	url?: string;
	description: string;
	technologies?: string;
	image?: string;
}

interface FeedProps {
	items: ProjectItem[];
}

interface PreviewCard {
	id: number;
	image: string;
	title: string;
	y: number;
}

let cardId = 0;
const EXIT_DELAY = 1200;

export default function Feed({ items }: FeedProps) {
	const ready = useWatermarkReady();
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
	const [activeCard, setActiveCard] = useState<PreviewCard | null>(null);
	const [exitingCards, setExitingCards] = useState<PreviewCard[]>([]);
	const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());
	const containerRef = useRef<HTMLDivElement>(null);

	const handleImageLoad = useCallback((src: string) => {
		setLoadedImages(prev => new Set(prev).add(src));
	}, []);

	const showPreview = useCallback((project: ProjectItem, index: number) => {
		if (!project.image) return;

		const row = rowRefs.current.get(index);
		if (!row) return;

		const y = row.offsetTop;
		const id = ++cardId;

		setActiveCard(prev => {
			if (prev && prev.image !== project.image) {
				const exiting = prev;
				setExitingCards(ex => ex.some(c => c.id === exiting.id) ? ex : [...ex, exiting]);
				setTimeout(() => {
					setExitingCards(ex => ex.filter(c => c.id !== exiting.id));
				}, EXIT_DELAY);
			}
			return { id, image: project.image!, title: project.title, y };
		});
	}, []);

	const hidePreview = useCallback(() => {
		setActiveCard(prev => {
			if (prev) {
				setExitingCards(ex => ex.some(c => c.id === prev.id) ? ex : [...ex, prev]);
				setTimeout(() => {
					setExitingCards(ex => ex.filter(c => c.id !== prev.id));
				}, EXIT_DELAY);
			}
			return null;
		});
	}, []);

	const toggleExpanded = (index: number) => {
		setExpandedIndex(prev => {
			const next = prev === index ? null : index;
			if (next === null && hoveredIndex === null) {
				hidePreview();
			}
			return next;
		});
	};

	const allCards = [...exitingCards.map(c => ({ ...c, exiting: true })), ...(activeCard ? [{ ...activeCard, exiting: false }] : [])];

	return (
		<div className="relative" ref={containerRef}>
		<div className="hidden md:block pointer-events-none">
			<AnimatePresence>
				{allCards.map((card) => (
					<motion.div
						key={`${card.exiting ? 'exit' : 'active'}-${card.id}`}
						className="absolute z-[100] rounded-sm border border-border bg-background shadow-lg overflow-hidden"
						style={{
							top: card.y,
							right: 'calc(100% + 32px)',
						}}
						initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
						animate={card.exiting
							? { clipPath: 'inset(100% 0 0 0)', opacity: 0 }
							: { clipPath: 'inset(0 0 0% 0)', opacity: 1 }
						}
						exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
						transition={{
							clipPath: {
								duration: 0.6,
								delay: card.exiting ? 0.4 : 0,
								ease: [0.4, 0, 0.2, 1],
							},
							opacity: {
								duration: 0.4,
								delay: card.exiting ? 0.4 : 0,
								ease: 'easeOut',
							},
						}}
					>
						<div className="relative w-[560px]">
							{!loadedImages.has(card.image) && (
								<div className="w-[560px] aspect-video bg-muted animate-pulse" />
							)}
							<motion.img
								src={card.image}
								alt={card.title}
								className="w-[560px] block"
								initial={{ opacity: 0 }}
								animate={{ opacity: loadedImages.has(card.image) ? 1 : 0 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
								onLoad={() => handleImageLoad(card.image)}
							/>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>

		<div className="space-y-0">
			{items.map((project, index) => (
				<motion.div
					key={index}
					ref={(el) => { if (el) rowRefs.current.set(index, el); }}
					className="relative mb-1"
					initial={{ opacity: 0, y: 6 }}
					animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
					transition={{
						duration: 0.3,
						delay: index * 0.04,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					onMouseEnter={() => {
						setHoveredIndex(index);
						showPreview(project, index);
					}}
					onMouseLeave={() => {
						setHoveredIndex(null);
						if (expandedIndex !== index) {
							hidePreview();
						}
					}}
				>
					<div
						className={cn('flex opacity-0 transition-opacity absolute -left-3.5 top-[3px]', {
							'opacity-100': hoveredIndex === index || expandedIndex === index
						})}
					>
						<BlinkingDot variant={expandedIndex === index ? 'default' : 'subdued'} />
					</div>

					<article>
						<div
							className={cn(
								'text-xs cursor-pointer select-none transition-colors',
								expandedIndex === index || hoveredIndex === index
									? 'text-foreground'
									: 'text-foreground/80'
							)}
							onClick={() => toggleExpanded(index)}
						>
							{project.title}
						</div>

						<AnimatePresence>
							{expandedIndex === index && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{
										height: 'auto',
										opacity: 1
									}}
									exit={{
										height: 0,
										opacity: 0
									}}
									transition={{
										height: {
											duration: 0.2,
											ease: [0.32, 0.72, 0, 1]
										},
										opacity: {
											duration: 0.15,
											ease: 'easeInOut'
										}
									}}
									style={{ overflow: 'visible' }}
								>
									<div className="text-xs text-muted-foreground pt-1 space-y-0.5 pb-2 lowercase">
										<div>{project.description}</div>
										{(project.role || project.technologies) && (
											<div className="text-muted-foreground/60">
												{project.role && project.technologies
													? `${project.role} • ${project.technologies}`
													: project.role || project.technologies}
											</div>
										)}
										{project.url && (
										<div className="flex gap-3 mt-1">
											<Link
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-muted-foreground hover:text-foreground underline decoration-red-500 underline-offset-2"
											>
												visit
											</Link>
										</div>
									)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</article>
				</motion.div>
			))}
		</div>
		</div>
	);
}
