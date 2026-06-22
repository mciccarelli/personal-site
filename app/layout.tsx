import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'michael ciccarelli — software engineer, frontend',
  description:
    'Software engineer with 20+ years building for the web, focused on the frontend — design systems, UI components, interaction, and motion. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  keywords: [
    'michael ciccarelli',
    'software engineer',
    'frontend engineer',
    'frontend developer',
    'React',
    'Next.js',
    'TypeScript',
    'web platforms',
    'product interfaces',
    'design systems',
    'ui components',
    'animation',
    'motion',
    'Las Vegas',
  ],
  authors: [{ name: 'michael ciccarelli' }],
  creator: 'michael ciccarelli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'michael ciccarelli',
    title: 'michael ciccarelli — software engineer, frontend',
    description:
      'Software engineer with 20+ years building for the web, focused on the frontend — design systems, UI components, interaction, and motion. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'michael ciccarelli — software engineer, frontend',
    description:
      'Software engineer with 20+ years building for the web, focused on the frontend — design systems, UI components, interaction, and motion. React, Next.js, TypeScript. Independent, based in Las Vegas.',
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
