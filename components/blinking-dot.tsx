'use client';

import { motion } from 'motion/react';

interface BlinkingDotProps {
	variant?: 'default' | 'subdued';
}

export default function BlinkingDot({ variant = 'default' }: BlinkingDotProps) {
	if (variant === 'default') {
		return <div className="w-2 h-2 rounded-full bg-accent" />;
	}

	return (
		<motion.div
			className="w-2 h-2 rounded-full bg-accent/40"
			animate={{ opacity: [1, 0, 1] }}
			transition={{
				duration: 1,
				repeat: Infinity,
				ease: 'easeInOut'
			}}
		/>
	);
}
