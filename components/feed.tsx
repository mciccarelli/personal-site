'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PreviewCard } from '@base-ui-components/react';
import BlinkingDot from '@/components/blinking-dot';
import { cn } from '@/lib/utils';

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

export default function Feed({ items }: FeedProps) {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const toggleExpanded = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<div className="space-y-0">
			{items.map((project, index) => (
				<motion.div
					key={index}
					className="relative mb-1"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.3,
						delay: 0.5 + index * 0.04,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
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
									<div className="text-xs text-muted-foreground pt-1 space-y-0.5 pb-2 normal-case">
										<div>{project.description}</div>
										{(project.role || project.technologies) && (
											<div className="text-muted-foreground/60">
												{project.role && project.technologies
													? `${project.role} • ${project.technologies}`
													: project.role || project.technologies}
											</div>
										)}
										<div className="flex gap-3 mt-1">
											{project.url && (
												<Link
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted-foreground hover:text-foreground no-underline hover:underline hover:decoration-red-500 underline-offset-2"
												>
													visit
												</Link>
											)}
											{project.image && (
												<PreviewCard.Root>
													<PreviewCard.Trigger
														className="text-muted-foreground hover:text-foreground no-underline hover:underline hover:decoration-red-500 underline-offset-2 cursor-pointer"
													>
														preview
													</PreviewCard.Trigger>
													<PreviewCard.Portal>
														<PreviewCard.Positioner sideOffset={12} side="right" align="start" collisionPadding={16}>
															<PreviewCard.Popup className="z-[150] rounded-sm border border-border bg-background shadow-lg overflow-hidden">
																<img
																	src={project.image}
																	alt={project.title}
																	className="w-[480px] block"
																/>
															</PreviewCard.Popup>
														</PreviewCard.Positioner>
													</PreviewCard.Portal>
												</PreviewCard.Root>
											)}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</article>
				</motion.div>
			))}
		</div>
	);
}
