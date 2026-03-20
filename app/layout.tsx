import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	display: 'swap',
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
			<body className={spaceGrotesk.className}>
				<ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
					<main className="min-h-dvh lowercase">{children}</main>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
