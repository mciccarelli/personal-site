import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, ModeToggle, ScrambledText, Sidebar } from '@/components';
import localFont from 'next/font/local';
import data from '@/app/data.json';

const CeraPro = localFont({
	src: [
		{
			path: '../../public/fonts/CeraPro-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/CeraPro-RegularItalic.woff2',
			weight: '400',
			style: 'italic'
		},
		{
			path: '../../public/fonts/CeraPro-Bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../../public/fonts/CeraPro-BoldItalic.woff2',
			weight: '700',
			style: 'italic'
		}
	]
});

export const metadata: Metadata = {
	title: data?.siteTitle,
	description: data?.siteDescription
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={CeraPro.className}>
				<ThemeProvider defaultTheme="system" storageKey="kolumn-ui-theme">
					{/* <div className="flex min-h-screen flex-col items-center justify-between">
						<div className="flex justify-end w-full">
							<div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-8 max-w-6xl p-4 xl:p-2">
								<Sidebar />
								<div className="md:col-span-2 md:order-first mb-4">{children}</div>
								<div className="md:hidden flex">foot</div>
								<div className="hidden md:block fixed bottom-4 left-5 opacity-20 hover:opacity-50 transition-opacity ease-in-out">
									icon
								</div>
							</div>
						</div>
					</div> */}
					<div className="min-h-dvh p-4 flex flex-col gap-y-4 justify-between">
						<header className="relative flex justify-between">
							<div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl w-full">
								<div className="col-span-1">
									<ScrambledText />
									{/* <svg
										className="w-4"
										viewBox="0 0 110 158"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M30.315 76.5075C30.315 78.6749 30.315 78.7471 30.315 76.7243V76.941V77.1577V77.3745V77.1577V76.941V76.7243V76.5075V76.2908V76.0741V75.8573V75.6406V75.4239V75.2071V74.9904V74.7737V74.5569V74.3402V74.1235V73.9067V73.69V73.2565V73.0398V72.823V72.6063V72.3896V72.1728V71.9561V71.7394V71.5226V71.0892V70.8724V70.6557V68.7051C30.315 52.5222 31.0367 34.3164 32.4803 14.0878L37.6772 15.1715C36.378 32.5103 35.7283 49.6324 35.7283 66.5377V71.7394V73.69L30.315 76.5075ZM38.7598 108.584L79.252 85.8272L75.7874 81.2757L38.9764 101.649L38.7598 108.584ZM39.1929 98.8313L74.2717 79.3251L61.7126 63.7202L40.2756 74.3402L39.1929 98.8313ZM38.5433 111.619L37.6772 131.125C38.2546 131.269 39.0486 131.486 40.0591 131.775C41.0696 131.92 41.8635 132.064 42.4409 132.209C45.1837 132.931 47.9987 133.292 50.8858 133.292L31.1811 149.981C30.1706 149.114 29.1601 148.391 28.1496 147.813C27.2835 147.38 26.273 146.947 25.1181 146.513C23.9633 146.224 22.9528 146.007 22.0866 145.863C21.3648 145.718 20.21 145.502 18.622 145.213C17.0341 144.924 15.8071 144.707 14.9409 144.562C13.4974 144.273 11.2598 144.707 8.22835 145.863C8.66142 145.285 9.3832 144.562 10.3937 143.695C11.4042 142.829 12.126 142.106 12.5591 141.528C13.1365 140.95 13.6417 140.228 14.0748 139.361C14.6522 138.349 14.9409 137.338 14.9409 136.326C15.6627 128.957 15.8071 121.877 15.374 115.086C14.9409 108.151 14.7244 103.888 14.7244 102.299V97.7476C12.8478 95.2913 10.9711 93.4129 9.09449 92.1125C6.64042 90.5231 3.60892 89.2949 0 88.428L14.7244 78.0247V73.4733C12.9921 71.5949 11.4042 70.15 9.96063 69.1385C7.07349 67.2602 4.04199 66.032 0.866142 65.454L14.9409 55.4842V52.2332C14.9409 50.3548 15.0131 48.1152 15.1575 45.5144C15.4462 42.9136 15.4462 40.4572 15.1575 38.1454C15.0131 35.6891 14.5079 31.8601 13.6417 26.6584C13.4974 25.7915 13.1365 25.2135 12.5591 24.9245C11.9816 24.4911 10.8268 24.3466 9.09449 24.4911C7.50656 24.4911 6.56824 24.4911 6.27953 24.4911C15.374 20.8788 23.5302 16.9053 30.748 12.5706C36.5223 9.24736 42.6575 5.05715 49.1535 0C55.9383 2.74531 67.8478 5.27389 84.8819 7.58573C88.0577 8.0192 91.1614 8.0192 94.1929 7.58573C92.605 8.88614 91.3058 10.331 90.2953 11.9204C89.2848 13.3653 88.2021 15.316 87.0472 17.7723C85.8924 20.2286 85.0262 21.9625 84.4488 22.9739C83.1496 24.9968 82.7887 28.7535 83.3661 34.2442C80.3346 28.3201 77.231 24.5633 74.0551 22.9739C70.7349 21.24 67.3425 20.0119 63.878 19.2894C60.5577 18.567 56.7323 18.0613 52.4016 17.7723C48.2152 17.3388 44.6063 16.7609 41.5748 16.0384L38.5433 15.3882C38.9764 22.7572 39.2651 31.9323 39.4094 42.9136C39.6982 53.8948 39.9869 62.6365 40.2756 69.1385V71.7394V71.5226V71.3059L81.2008 50.4993L86.6142 57.0014C94.4095 66.2487 100.256 74.7014 104.154 82.3594C108.051 89.8729 110 97.8198 110 106.2C110 117.615 105.381 128.452 96.1417 138.711C87.0472 148.969 78.3136 155.399 69.9409 158C74.7047 154.677 78.5302 151.426 81.4173 148.247C84.3045 145.213 86.3255 142.106 87.4803 138.927C88.7795 135.604 89.5735 132.786 89.8622 130.475C90.1509 128.163 90.2953 125.128 90.2953 121.372C90.2953 117.182 90.0066 113.569 89.4291 110.535C88.9961 107.356 88.4908 105.117 87.9134 103.816C87.4803 102.516 86.4698 100.348 84.8819 97.3141C83.4383 94.2798 82.3556 91.968 81.6339 90.3786L80.5512 87.9945L38.5433 111.619ZM37.0276 130.908L35.7283 76.5075L30.315 79.3251L32.9134 128.741L37.0276 130.908Z"
											fill="currentColor"
										/>
									</svg> */}
								</div>
								<div className="col-span-2">{data?.headline}</div>
							</div>
							<ModeToggle />
						</header>
						<main className="grid grid-cols-3 flex-1 max-w-4xl">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
