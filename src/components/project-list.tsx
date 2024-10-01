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
				{/* <svg
					className={cn('size-3.5 opacity-0', { 'opacity-50': isHovered })}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
						clipRule="evenodd"
					/>
				</svg> */}
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
