import './globals.css';
import localFont from 'next/font/local';
import data from './data.json';
import { ScrambledText, Footer } from '@/components';

const CeraPro = localFont({
  src: [
    {
      path: '../public/fonts/CeraPro-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/CeraPro-RegularItalic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/fonts/CeraPro-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/CeraPro-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    }
  ]
});

export const metadata = {
  title: data.title,
  description: data.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={CeraPro.className}>
        <div className="min-h-dvh p-4 flex flex-col gap-y-4 justify-between">
          <header className="grid grid-cols-3 max-w-4xl">
            <div className="col-span-1">
              <ScrambledText />
            </div>
            <div className="col-span-2">{data.headline}</div>
          </header>
          <main className="grid grid-cols-3 flex-1 max-w-4xl">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
