'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BlinkingDot } from '@/components';
import { cn } from '@/lib/utils';

interface ProjectItem {
	title: string;
	role?: string;
	url?: string;
	repository?: string;
	year: number;
	image?: string;
	description: string;
	technologies?: string;
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
					className="relative  mb-1"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: index * 0.05,
						ease: [0.21, 0.47, 0.32, 0.98]
					}}
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div
						className={cn('hidden md:flex opacity-0 transition-opacity absolute -left-3.5 top-1', {
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
									: 'text-muted-foreground'
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
									<div className="text-xs text-muted-foreground pt-1 space-y-0.5 pb-2">
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
													className="text-muted-foreground hover:text-foreground underline underline-offset-2"
												>
													Visit
												</Link>
											)}
											{project.repository && (
												<Link
													href={project.repository}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted-foreground hover:text-foreground underline underline-offset-2"
												>
													Source
												</Link>
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
