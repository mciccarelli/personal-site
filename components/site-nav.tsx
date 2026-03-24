'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import BlinkingDot from '@/components/blinking-dot';
import { cn } from '@/lib/utils';

const navItems = [
	{ label: 'projects', href: '/' },
	{ label: 'information', href: '/information' },
	{ label: 'hire', href: '/hire' },
];

export default function SiteNav() {
	const pathname = usePathname();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<nav className="space-y-0.5">
			{navItems.map((item, index) => {
				const isActive = pathname === item.href;
				return (
					<div
						key={item.href}
						className="relative"
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<div
							className={cn(
								'flex opacity-0 transition-opacity absolute -left-3.5 top-[3px]',
								{ 'opacity-100': hoveredIndex === index || isActive }
							)}
						>
							<BlinkingDot variant={isActive ? 'default' : 'subdued'} />
						</div>
						<Link
							href={item.href}
							className={cn(
								'text-xs transition-colors block no-underline hover:no-underline',
								isActive
									? 'text-foreground'
									: 'text-foreground/50 hover:text-foreground'
							)}
						>
							{item.label}
						</Link>
					</div>
				);
			})}
		</nav>
	);
}
