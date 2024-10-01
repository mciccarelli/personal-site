import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, ModeToggle, ScrambledText } from '@/components';
import { siteTitle, siteDescription, headline } from '@/app/data.json';
import localFont from 'next/font/local';
// import { Inconsolata } from 'next/font/google';
// const monoFont = Inconsolata({ subsets: ['latin'], display: 'swap' });

const CeraPro = localFont({
	src: [
		{
			path: '../../public/fonts/CeraPro-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/CeraPro-RegularItalic.woff2',
			weight: '400',
			style: 'italic'
		},
		{
			path: '../../public/fonts/CeraPro-Bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../../public/fonts/CeraPro-BoldItalic.woff2',
			weight: '700',
			style: 'italic'
		}
	]
});

export const metadata: Metadata = {
	title: siteTitle,
	description: siteDescription
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={CeraPro.className}>
				<ThemeProvider defaultTheme="system" storageKey="kolumn-ui-theme">
					<div className="min-h-dvh p-4 flex flex-col gap-y-4 justify-between">
						<header className="relative flex justify-between">
							<div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl w-full">
								<div className="col-span-1">
									<ScrambledText />
								</div>
								<div className="col-span-2">{headline}</div>
							</div>
							<ModeToggle />
						</header>
						<main className="grid grid-cols-3 flex-1 max-w-4xl">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
