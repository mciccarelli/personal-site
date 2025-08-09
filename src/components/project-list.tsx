'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BlinkingDot, ProjectDescription } from '@/components';

interface ListItemProps {
	title: string;
	description: string;
	url: string;
	index: number;
}

const ListItem: React.FC<ListItemProps> = ({ title, description, url, index }) => {
	const [isHovered, setIsHovered] = useState(false);

	function handleMouseEnter() {
		setIsHovered(true);
	}

	function handleMouseLeave() {
		setIsHovered(false);
	}

	return (
		<motion.div
			className="flex flex-col md:flex-row gap-x-1.5 relative md:flex-1"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.05,
				ease: [0.21, 0.47, 0.32, 0.98]
			}}
		>
			<div
				className={cn('hidden md:flex opacity-0 transition-opacity absolute -left-3.5 top-1.5', {
					'opacity-100': isHovered
				})}
			>
				<BlinkingDot />
			</div>
			<a
				className="whitespace-nowrap no-underline flex gap-x-px items-center"
				href={url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{title}{' '}
			</a>
			<div className="hidden md:block">
				<ProjectDescription text={description} trigger={isHovered} setTrigger={setIsHovered} />
			</div>
			<div className="block md:hidden" dangerouslySetInnerHTML={{ __html: description }} />
		</motion.div>
	);
};

interface ProjectItem {
	title: string;
	description: string;
	year: number;
	url: string;
}

interface ProjectListProps {
	items: ProjectItem[];
}

const ProjectList: React.FC<ProjectListProps> = ({ items }) => {
	return (
		<div className="flex flex-col gap-y-4 md:gap-y-px">
			{items.map(({ title, description, url }, index) => {
				return (
					<ListItem key={index} index={index} title={title} description={description} url={url} />
				);
			})}
		</div>
	);
};

export default ProjectList;
