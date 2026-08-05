import './globals.css';
import type { Metadata } from 'next';
import Clock from '@/components/clock';
import { FilterProvider } from '@/components/feed-filter';
import ModeToggle from '@/components/mode-toggle';
import ThemeProvider from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://ciccarel.li'),
  title: 'michael ciccarelli',
  description:
    'Design engineer in Las Vegas. 20+ years building for the web. Runs Third Index, a small design and engineering studio.',
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
      'Design engineer in Las Vegas. 20+ years building for the web. Runs Third Index, a small design and engineering studio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Ciccarelli',
    description:
      'Design engineer in Las Vegas. 20+ years building for the web. Runs Third Index, a small design and engineering studio.',
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
          <FilterProvider>
            <div className="min-h-dvh">
              <div
                aria-hidden
                className="pointer-events-none fixed top-[9px] left-[11px] z-50 size-[52px] bg-white mix-blend-difference md:top-5 md:left-[19px]"
                style={{
                  maskImage: "url('/c.svg')",
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                  WebkitMaskImage: "url('/c.svg')",
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                }}
              />
              <main>{children}</main>
              <div className="text-muted-foreground/65 fixed bottom-5 left-6 z-50 flex items-center gap-2 md:bottom-8 text-xs tracking-[0.04em] uppercase md:left-8">
                <ModeToggle className="-ml-1" />
                <span>
                  Las Vegas, Nevada <span className="text-muted-foreground/40">·</span> <Clock />
                </span>
              </div>
            </div>
          </FilterProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
