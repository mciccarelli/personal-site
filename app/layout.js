// import { Noto_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

// const notoSansMono = Noto_Sans_Mono({
//   subsets: ["latin"],
//   display: "swap",
// });
// const IBMPlex = localFont({
//   src: [
//     {
//       path: "../public/fonts/IBMPlexMono-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/IBMPlexMono-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/IBMPlexMono-Medium.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/IBMPlexMono-MediumItalic.woff2",
//       weight: "700",
//       style: "italic",
//     },
//   ],
// });

const CeraPro = localFont({
  src: [
    {
      path: "../public/fonts/CeraPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CeraPro-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/CeraPro-BoldItalic.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CeraPro-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata = {
  title: "michael ciccarelli",
  description: "freelance software engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={CeraPro.className}>{children}</body>
    </html>
  );
}
