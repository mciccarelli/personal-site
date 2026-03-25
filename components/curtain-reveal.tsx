'use client';

import { motion } from 'motion/react';
import { useWatermarkReady } from '@/hooks/use-watermark-ready';

interface CurtainRevealProps {
	children: React.ReactNode;
	className?: string;
}

export default function CurtainReveal({ children, className }: CurtainRevealProps) {
	const ready = useWatermarkReady();

	return (
		<motion.div
			initial={false}
			animate={ready
				? { clipPath: 'inset(0 0 0% 0)', opacity: 1 }
				: { clipPath: 'inset(0 0 100% 0)', opacity: 0 }
			}
			transition={{
				clipPath: {
					duration: 0.8,
					delay: ready ? 0.2 : 0,
					ease: [0.4, 0, 0.2, 1],
				},
				opacity: {
					duration: 0.5,
					delay: ready ? 0.2 : 0,
					ease: 'easeOut',
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
