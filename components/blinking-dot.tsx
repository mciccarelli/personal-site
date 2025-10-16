'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlinkingDotProps {
	variant?: 'default' | 'subdued';
}

export default function BlinkingDot({ variant = 'default' }: BlinkingDotProps) {
	if (variant === 'default') {
		return (
			<div className="w-2 h-2 rounded-full bg-accent" />
		);
	}
	
	return (
		<motion.div
			className="w-2 h-2 rounded-full bg-accent/40"
			animate={{ opacity: [1, 0, 1] }} // Blinking effect
			transition={{
				duration: 1, // Duration of one blink
				repeat: Infinity, // Loop it infinitely
				ease: 'easeInOut' // Smooth animation
			}}
		/>
	);
}
