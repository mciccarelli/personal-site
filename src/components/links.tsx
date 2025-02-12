'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlinkingDot } from '@/components';
import data from '@/app/data.json';

interface ListItemProps {
	text: string;
	href: string;
}

const ListItem: React.FC<ListItemProps> = ({ text, href }) => {
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
					'hidden md:flex opacity-0 transition-opacity absolute -left-2.5 top-1/2 -translate-y-1/2',
					{
						'opacity-100': isHovered
					}
				)}
			>
				<BlinkingDot />
			</div>
			{text === 'Resume' ? (
				<a href={data?.resume} title="Download Resume [.PDF]" className="flex items-center gap-x-1">
					Resume
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="size-3"
					>
						<path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
						<path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
					</svg>
				</a>
			) : (
				<a className="whitespace-nowrap flex gap-x-px items-center" href={href}>
					{text}{' '}
				</a>
			)}
		</div>
	);
};

interface LinkItem {
	text: string;
	href: string;
}

interface LinksProps {
	items: LinkItem[];
}

const Links: React.FC<LinksProps> = ({ items }) => {
	return (
		<div className="flex flex-col gap-y-px">
			{items.map(({ text, href }, index) => {
				return <ListItem key={index} text={text} href={href} />;
			})}
		</div>
	);
};

export default Links;
