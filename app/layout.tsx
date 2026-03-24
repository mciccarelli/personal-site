import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';
import { Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Watermark from '@/components/watermark';
import ModeToggle from '@/components/mode-toggle';
import SiteNav from '@/components/site-nav';
import IntroReveal from '@/components/intro-reveal';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'michael ciccarelli',
    template: '%s — michael ciccarelli',
  },
  description:
    'Design engineer building web interfaces and product systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  keywords: [
    'design engineer',
    'React',
    'Next.js',
    'TypeScript',
    'web interfaces',
    'product systems',
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
    title: 'michael ciccarelli',
    description:
      'Design engineer building web interfaces and product systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'michael ciccarelli',
    description:
      'Design engineer building web interfaces and product systems. React, Next.js, TypeScript. Independent, based in Las Vegas.',
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
      <body className={spaceGrotesk.className}>
        <ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
          <main className="min-h-dvh overflow-hidden lowercase">
            <Watermark />

            <IntroReveal>
              <div className="relative z-10 grid grid-cols-1 px-8 pt-6 pb-24 md:grid-cols-8 md:gap-x-12 md:pr-8 md:pb-16 md:pl-10">
                {/* Intro — mobile only, above nav */}
                <div className="text-foreground/60 mb-4 max-w-[200px] text-xs md:hidden">
                  michael ciccarelli is a design engineer building web interfaces and product systems.
                </div>

                <div className="mb-6 self-start md:sticky md:top-6 md:col-span-2 md:mb-0">
                  <SiteNav />
                </div>
                {children}
              </div>

              <div className="fixed bottom-5 left-5 z-50 md:left-7">
                <ModeToggle />
              </div>
            </IntroReveal>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
