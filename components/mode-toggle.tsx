'use client';

import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export default function ModeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<button
			onClick={toggleTheme}
			className={cn('text-foreground cursor-pointer p-1', className)}
			aria-label="Toggle theme"
		>
			{/* split circle — light/dark */}
			<svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
				<circle cx="8" cy="8" r="6.75" />
				<path d="M8 1.25 A 6.75 6.75 0 0 1 8 14.75 Z" fill="currentColor" stroke="none" />
			</svg>
		</button>
	);
}
