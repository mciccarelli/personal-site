import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, ModeToggle, SiteName } from '@/components';
import { IBM_Plex_Mono } from 'next/font/google';

import data from '@/app/data.json';

export const ibm_plex_mono = IBM_Plex_Mono({
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
			<body className={ibm_plex_mono.className}>
				<ThemeProvider defaultTheme="system" storageKey="haelcc-ui-theme">
					<div className="min-h-dvh flex flex-col">
						<header className="relative flex justify-between p-4">
							<SiteName />
							<ModeToggle />
						</header>
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
