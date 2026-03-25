'use client';

import { useWatermarkReady } from '@/hooks/use-watermark-ready';

export default function IntroReveal({ children, className }: { children: React.ReactNode; className?: string }) {
	const ready = useWatermarkReady();

	return (
		<div
			className={className}
			style={{
				opacity: ready ? 1 : 0,
				transition: 'opacity 0.6s ease-out',
			}}
		>
			{children}
		</div>
	);
}
