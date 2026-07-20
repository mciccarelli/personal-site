import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://ciccarel.li'),
  title: 'michael ciccarelli — design engineer',
  description:
    'Design engineer with 20+ years of frontend engineering — design systems, UI components, interaction, and motion. Runs Third Index, a design engineering studio for startups and consumer brands. Based in Las Vegas.',
  keywords: [
    'michael ciccarelli',
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
    title: 'Michael Ciccarelli — Design Engineer',
    description:
      'Design engineer with 20+ years of frontend engineering — design systems, UI components, interaction, and motion. Runs Third Index, a design engineering studio for startups and consumer brands. Based in Las Vegas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli — Design Engineer',
    description:
      'Design engineer with 20+ years of frontend engineering — design systems, UI components, interaction, and motion. Runs Third Index, a design engineering studio for startups and consumer brands. Based in Las Vegas.',
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
        <main className="min-h-dvh">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
