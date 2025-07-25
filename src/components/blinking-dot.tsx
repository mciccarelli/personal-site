'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BlinkingDot() {
	return (
		<motion.div
			className="w-1.25 h-1.25 translate-y-px bg-accent rounded-full"
			animate={{ opacity: [1, 0, 1] }} // Blinking effect
			transition={{
				duration: 1, // Duration of one blink
				repeat: Infinity, // Loop it infinitely
				ease: 'easeInOut' // Smooth animation
			}}
		/>
	);
}
