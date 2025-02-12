'use client';
import { Wallets } from '@/components';
import data from '@/app/data.json';

const Footer = () => {
	return (
		<div className="flex md:justify-end items-center w-full p-4">
			<Wallets data={data?.wallets} />
		</div>
	);
};

export default Footer;
