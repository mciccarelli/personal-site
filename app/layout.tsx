import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'michael ciccarelli — design engineer',
  description:
    'Design engineer building product interfaces and web platforms. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  keywords: [
    'michael ciccarelli',
    'design engineer',
    'frontend engineer',
    'React',
    'Next.js',
    'TypeScript',
    'web platforms',
    'product interfaces',
    'design systems',
    'Las Vegas',
  ],
  authors: [{ name: 'michael ciccarelli' }],
  creator: 'michael ciccarelli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'michael ciccarelli',
    title: 'michael ciccarelli — design engineer',
    description:
      'Design engineer building product interfaces and web platforms. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'michael ciccarelli — design engineer',
    description:
      'Design engineer building product interfaces and web platforms. React, Next.js, TypeScript. Independent, based in Las Vegas.',
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
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
          <main className="min-h-dvh lowercase">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
