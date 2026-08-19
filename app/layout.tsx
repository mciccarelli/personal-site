import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://relli.cc'),
  title: 'michael ciccarelli',
  description:
    'Software engineer in Las Vegas. Twenty years building for the web. Runs Third Index, a design and engineering studio.',
  keywords: [
    'michael ciccarelli',
    'software engineer',
    'design engineer',
    'creative developer',
    'frontend engineer',
    'frontend developer',
    'React',
    'Next.js',
    'TypeScript',
    'frontend engineering',
    'third index',
    'design engineering studio',
    'product interfaces',
    'design systems',
    'ui components',
    'animation',
    'motion',
    'Las Vegas',
  ],
  authors: [{ name: 'Michael Ciccarelli' }],
  creator: 'Michael Ciccarelli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Michael Ciccarelli',
    title: 'Michael Ciccarelli',
    description:
      'Software engineer in Las Vegas. Twenty years building for the web. Runs Third Index, a design and engineering studio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli',
    description:
      'Software engineer in Las Vegas. Twenty years building for the web. Runs Third Index, a design and engineering studio.',
  },
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
          <main className="min-h-dvh">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
