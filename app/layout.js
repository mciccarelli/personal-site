import './globals.css';
import localFont from 'next/font/local';
import data from './data.json';
import { Footer, Sidebar, IconC } from '@/components';

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
  title: 'michael ciccarelli',
  description: 'freelance software engineer and consultant specializing in web development.'
};

export default function RootLayout({ children }) {
  const { footerLinks } = data;

  return (
    <html lang="en">
      <body className={CeraPro.className}>
        <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-0">
          <div className="flex justify-end w-full">
            <div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-8 max-w-5xl">
              <Sidebar />
              <div className="md:col-span-2 md:order-first mb-4">{children}</div>
              <div className="md:hidden flex">
                <Footer links={footerLinks} />
              </div>
              <div className="hidden md:block fixed bottom-4 left-4 opacity-50 hover:opacity-75 transition-opacity ease-in-out">
                <IconC />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
