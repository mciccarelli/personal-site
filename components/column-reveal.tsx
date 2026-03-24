'use client';

import { motion } from 'motion/react';

interface ColumnRevealProps {
	children: React.ReactNode;
	className?: string;
}

export default function ColumnReveal({ children, className }: ColumnRevealProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.15,
				ease: 'easeOut',
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
