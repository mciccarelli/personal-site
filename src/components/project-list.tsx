'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlinkingDot } from '@/components';

interface ListItemProps {
	title: string;
	description: string;
	url: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, description, url }) => {
	const [isHovered, setIsHovered] = useState(false);
	function handleMouseEnter() {
		setIsHovered(true);
	}
	function handleMouseLeave() {
		setIsHovered(false);
	}
	return (
		<div
			className="flex flex-col md:flex-row gap-x-1.5 relative md:flex-1"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className={cn(
					'hidden md:flex opacity-0 transition-opacity absolute -left-3 top-1/2 -translate-y-1/2',
					{
						'opacity-100': isHovered
					}
				)}
			>
				<BlinkingDot />
			</div>
			<a
				className="whitespace-nowrap flex gap-x-px items-center"
				href={url}
				target="_blank"
				title="Visit site"
			>
				{title}{' '}
			</a>
			<div
				className={cn('md:line-clamp-1 md:opacity-0', {
					'md:opacity-100': isHovered
				})}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</div>
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
				return <ListItem key={index} title={title} description={description} url={url} />;
			})}
		</div>
	);
};

export default ProjectList;
