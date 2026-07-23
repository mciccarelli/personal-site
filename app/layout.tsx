import './globals.css';
import type { Metadata } from 'next';
import { FilterProvider } from '@/components/feed-filter';
import ModeToggle from '@/components/mode-toggle';
import ThemeProvider from '@/components/theme-provider';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="ciccarelli-ui-theme">
          <FilterProvider>
          <div className="min-h-dvh">
            <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-5 px-6 md:px-8">
              <div
                aria-hidden
                className="bg-foreground h-5 w-28"
                style={{
                  maskImage: "url('/ciccarelli.svg')",
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                  WebkitMaskImage: "url('/ciccarelli.svg')",
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                }}
              />
              <ModeToggle className="pointer-events-auto" />
            </header>
            <main>{children}</main>
          </div>
          </FilterProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
