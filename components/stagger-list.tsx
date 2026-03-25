'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useWatermarkReady } from '@/hooks/use-watermark-ready';

interface StaggerListProps {
	children: React.ReactNode;
	className?: string;
}

export default function StaggerList({ children, className }: StaggerListProps) {
	const ready = useWatermarkReady();
	const items = React.Children.toArray(children);

	return (
		<div className={className}>
			{items.map((child, index) => (
				<motion.div
					key={index}
					initial={false}
					animate={{ opacity: ready ? 1 : 0 }}
					transition={{
						duration: 0.25,
						delay: ready ? index * 0.03 : 0,
						ease: 'easeOut',
					}}
				>
					{child}
				</motion.div>
			))}
		</div>
	);
}
