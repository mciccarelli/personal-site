'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Code2 } from 'lucide-react';

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

export function Feed({ items }: FeedProps) {
	const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observers = itemRefs.current.map((ref, index) => {
			if (!ref) return null;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleItems((prev) => new Set(prev).add(index));
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: '0px 0px -50px 0px',
				}
			);

			observer.observe(ref);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [items]);

	return (
		<div className="space-y-20 md:space-y-32">
			{items.map((project, index) => (
				<div
					key={index}
					ref={(el) => {
						itemRefs.current[index] = el;
					}}
					className={`transition-all duration-700 ease-out ${
						visibleItems.has(index)
							? 'opacity-100 translate-y-0 blur-0'
							: 'opacity-0 translate-y-8 blur-sm'
					}`}
				>
					<article className="space-y-3">
						{project.image && (
							<div className="relative w-full overflow-hidden rounded-sm bg-black">
								<Image
									src={project.image}
									alt={project.title}
									width={1200}
									height={800}
									className="w-full h-auto"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
									style={{ objectFit: 'contain' }}
								/>
							</div>
						)}
						<div className="space-y-1">
							<div className="flex items-baseline justify-between gap-4">
								<h3 className="text-sm font-medium flex items-baseline gap-2">
									{project.url ? (
										<Link
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:underline underline-offset-2 no-underline hover:decoration-red-500"
										>
											{project.title}
										</Link>
									) : (
										<span>{project.title}</span>
									)}
									{project.role && (
										<span className="text-xs font-normal text-muted-foreground">
											({project.role})
										</span>
									)}
								</h3>
								<div className="flex items-center gap-2">
									{project.url && (
										<Link
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground hover:text-foreground transition-colors no-underline"
											aria-label={`Visit ${project.title}`}
										>
											<ExternalLink className="w-3.5 h-3.5" />
										</Link>
									)}
									{project.repository && (
										<Link
											href={project.repository}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground hover:text-foreground transition-colors no-underline"
											aria-label={`View source code for ${project.title}`}
										>
											<Code2 className="w-3.5 h-3.5" />
										</Link>
									)}
								</div>
							</div>
							<p className="text-xs text-muted-foreground">
								{project.description}
								{project.technologies && (
									<span className="text-muted-foreground/60"> {project.technologies}</span>
								)}
							</p>
						</div>
					</article>
				</div>
			))}
		</div>
	);
}