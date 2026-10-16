import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

// mirrors the homepage intro; kept under 160 characters for search snippets
const description =
  'Michael Ciccarelli is an independent software engineer in Las Vegas, working across design and development. Frontend, interaction, and design systems.';

export const metadata: Metadata = {
  metadataBase: new URL('https://relli.cc'),
  title: 'relli · michael ciccarelli',
  description,
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
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli',
    description,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
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
        <main className="min-h-dvh">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
