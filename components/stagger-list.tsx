'use client';

import React from 'react';
import { motion } from 'motion/react';

interface StaggerListProps {
	children: React.ReactNode;
	className?: string;
}

export default function StaggerList({ children, className }: StaggerListProps) {
	const items = React.Children.toArray(children);

	return (
		<div className={className}>
			{items.map((child, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.25,
						delay: index * 0.03,
						ease: 'easeOut',
					}}
				>
					{child}
				</motion.div>
			))}
		</div>
	);
}
