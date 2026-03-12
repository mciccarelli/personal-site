import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

const saolDisplay = localFont({
  src: [
    { path: '../public/fonts/SaolDisplay-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/SaolDisplay-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/SaolDisplay-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-saol-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Michael Ciccarelli — Fullstack Engineer',
    template: '%s — Michael Ciccarelli',
  },
  description:
    'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  keywords: [
    'fullstack engineer',
    'frontend developer',
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
    title: 'Michael Ciccarelli — Fullstack Engineer',
    description:
      'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli — Fullstack Engineer',
    description:
      'Fullstack engineer building modern web applications, interfaces, and design systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  },
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceCodePro.variable} ${saolDisplay.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
