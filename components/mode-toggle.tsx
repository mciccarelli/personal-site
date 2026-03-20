'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [nextMode, setNextMode] = useState('');

	useEffect(() => {
		const isLight =
			theme === 'light' ||
			(theme === 'system' && !document.documentElement.classList.contains('dark'));
		setNextMode(isLight ? 'dark' : 'light');
	}, [theme]);

	const toggleTheme = () => {
		setTheme(nextMode === 'dark' ? 'dark' : 'light');
	};

	return (
		<button
			onClick={toggleTheme}
			className="group flex items-center gap-2 cursor-pointer pointer-events-auto"
			aria-label="Toggle theme"
		>
			<span className="w-2 h-2 rounded-full border-2 border-foreground bg-foreground shrink-0" />
			<span className="text-xs text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
				{nextMode}
			</span>
		</button>
	);
}
