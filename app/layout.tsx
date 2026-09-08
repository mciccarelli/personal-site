import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://relli.cc'),
  title: 'michael ciccarelli',
  description:
    'Design engineer in Las Vegas. Product interfaces, design systems, and frontend architecture. Runs Third Index, an independent studio.',
  keywords: [
    'michael ciccarelli',
    'design engineer',
    'software engineer',
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
      'Design engineer in Las Vegas. Product interfaces, design systems, and frontend architecture. Runs Third Index, an independent studio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli',
    description:
      'Design engineer in Las Vegas. Product interfaces, design systems, and frontend architecture. Runs Third Index, an independent studio.',
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
