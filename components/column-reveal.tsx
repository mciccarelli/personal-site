'use client';

interface ColumnRevealProps {
	children: React.ReactNode;
	className?: string;
}

export default function ColumnReveal({ children, className }: ColumnRevealProps) {
	return (
		<div className={className}>
			{children}
		</div>
	);
}
