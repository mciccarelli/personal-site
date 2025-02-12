'use client';

import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<button
			onClick={toggleTheme}
			className="w-2 h-2 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white self-center"
			aria-label="Toggle theme"
		/>
	);
}
