'use client';

import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';

function useResolvedTheme() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const update = () => {
			setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
		};
		update();

		const observer = new MutationObserver(update);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	}, []);

	return theme;
}

export default function BookCallDrawer() {
	const theme = useResolvedTheme();

	return (
		<>
			{/* Mobile: external link */}
			<a
				href="https://cal.com/ciccarelli/intro"
				target="_blank"
				rel="noopener noreferrer"
				className="md:hidden"
			>
				Book a Call
			</a>

			{/* Desktop: drawer */}
			<span className="hidden md:inline">
				<Drawer.Root direction="right" noBodyStyles handleOnly>
					<Drawer.Trigger className="text-foreground/90 transition-colors hover:text-foreground no-underline hover:underline hover:decoration-red-500 underline-offset-2 cursor-pointer">
						Book a Call
					</Drawer.Trigger>
					<Drawer.Portal>
						<Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
						<Drawer.Content
							className="fixed top-0 right-0 z-50 w-full max-w-md bg-background border-l border-border flex flex-col outline-none"
							style={{ height: '100dvh' }}
						>
							<div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
								<Drawer.Title className="text-sm tracking-wide m-0">
									Book a Call
								</Drawer.Title>
								<Drawer.Description className="sr-only">
									Schedule a call via Cal.com
								</Drawer.Description>
								<Drawer.Close className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
									Close
								</Drawer.Close>
							</div>
							<div className="flex-1 min-h-0">
								<iframe
									src={`https://cal.com/ciccarelli/intro?layout=column_view&theme=${theme}`}
									className="w-full h-full border-0"
									allow="payment"
								/>
							</div>
						</Drawer.Content>
					</Drawer.Portal>
				</Drawer.Root>
			</span>
		</>
	);
}
