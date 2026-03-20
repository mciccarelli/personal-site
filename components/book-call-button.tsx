'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog } from '@base-ui-components/react';
import { useTheme } from '@/components/theme-provider';

export default function BookCallButton() {
	const [open, setOpen] = useState(false);
	const { theme } = useTheme();
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		if (theme === 'system') {
			setResolvedTheme(
				window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			);
		} else {
			setResolvedTheme(theme as 'light' | 'dark');
		}
	}, [theme]);

	const handleBackdropClick = useCallback(() => setOpen(false), []);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger
				className="text-foreground/90 hover:text-foreground transition-colors underline decoration-red-500 underline-offset-2 cursor-pointer"
			>
				book a call
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Backdrop
					className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
					onClick={handleBackdropClick}
				/>
				<Dialog.Popup className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
					<div className="flex flex-col items-end gap-2 w-full max-w-5xl pointer-events-auto">
						<button
							onClick={() => setOpen(false)}
							className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
						>
							close
						</button>
						<div
							className="bg-background border border-border rounded-md shadow-lg w-full overflow-hidden"
							style={{ height: 'min(90vh, 800px)' }}
						>
							{open && (
								<iframe
									src={`https://cal.com/ciccarelli/intro?layout=column_view&theme=${resolvedTheme}`}
									className="w-full h-full border-0"
									allow="payment"
								/>
							)}
						</div>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
