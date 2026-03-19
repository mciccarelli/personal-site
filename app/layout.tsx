import './globals.css';
import type { Metadata } from 'next';
import ModeToggle from '@/components/mode-toggle';
import ThemeProvider from '@/components/theme-provider';
import { Source_Code_Pro } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const source_code_pro = Source_Code_Pro({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: {
		default: 'michael ciccarelli — design engineer',
		template: '%s — michael ciccarelli',
	},
	description:
		'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
	keywords: [
		'design engineer',
		'fullstack engineer',
		'React',
		'Next.js',
		'TypeScript',
		'web applications',
		'design systems',
		'freelance developer',
		'Las Vegas',
	],
	authors: [{ name: 'Michael Ciccarelli' }],
	creator: 'Michael Ciccarelli',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'Michael Ciccarelli',
		title: 'michael ciccarelli — design engineer',
		description:
			'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'michael ciccarelli — design engineer',
		description:
			'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
	},
	icons: {
		icon: { url: '/favicon.svg', type: 'image/svg+xml' }
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
						<header className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center pointer-events-none">
							<ModeToggle />
						</header>
						<main className="flex-1 pt-[36px] md:container md:ml-auto">{children}</main>
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
