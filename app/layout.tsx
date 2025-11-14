import './globals.css';
import type { Metadata } from 'next';
import ModeToggle from '@/components/mode-toggle';
import ThemeProvider from '@/components/theme-provider';
import { Source_Code_Pro } from 'next/font/google';

import data from '../data.json';

const source_code_pro = Source_Code_Pro({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: data?.siteTitle,
	description: data?.siteDescription,
	icons: {
		icon: '/favicon.ico'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={source_code_pro.className}>
				<ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
					<div className="min-h-dvh flex flex-col">
						<header className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center">
							<ModeToggle />
						</header>
						<main className="flex-1 pt-[36px] md:container md:ml-auto">{children}</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
