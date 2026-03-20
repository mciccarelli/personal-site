'use client';

import { motion } from 'motion/react';

interface StaggerItemProps {
	children: React.ReactNode;
	index: number;
	baseDelay?: number;
	className?: string;
}

export default function StaggerItem({ children, index, baseDelay = 0.5, className }: StaggerItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: baseDelay + index * 0.05,
				ease: [0.25, 0.1, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
