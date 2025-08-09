import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, ModeToggle } from '@/components';
import { IBM_Plex_Mono, IBM_Plex_Sans, Inter } from 'next/font/google';

import data from '@/app/data.json';

export const ibm_plex_mono = IBM_Plex_Mono({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700']
});

export const ibm_plex_sans = IBM_Plex_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700']
});

export const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: data?.siteTitle,
	description: data?.siteDescription
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider defaultTheme="system" storageKey="m1ke-ui-theme">
					<div className="min-h-dvh flex flex-col">
						<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm px-3 py-1.5">
							<ModeToggle />
						</header>
						<main className="flex-1 pt-[36px]">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
