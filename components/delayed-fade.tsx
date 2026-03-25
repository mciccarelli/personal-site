'use client';

import { motion } from 'motion/react';
import { useWatermarkReady } from '@/hooks/use-watermark-ready';

interface DelayedFadeProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export default function DelayedFade({ children, delay = 0, className }: DelayedFadeProps) {
	const ready = useWatermarkReady();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={ready ? { opacity: 1 } : { opacity: 0 }}
			transition={{
				duration: 0.4,
				delay: ready ? delay : 0,
				ease: 'easeOut',
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
