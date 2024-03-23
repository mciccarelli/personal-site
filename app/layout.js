import localFont from 'next/font/local';

import './globals.css';

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
  description: 'brooklyn-based freelance software engineer and consultant specializing in web development'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={CeraPro.className}>{children}</body>
    </html>
  );
}
