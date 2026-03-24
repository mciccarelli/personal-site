'use client';

import { motion } from 'motion/react';

interface CurtainRevealProps {
	children: React.ReactNode;
	className?: string;
}

export default function CurtainReveal({ children, className }: CurtainRevealProps) {
	return (
		<motion.div
			initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
			animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
			transition={{
				clipPath: {
					duration: 0.8,
					delay: 0.2,
					ease: [0.4, 0, 0.2, 1],
				},
				opacity: {
					duration: 0.5,
					delay: 0.2,
					ease: 'easeOut',
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
