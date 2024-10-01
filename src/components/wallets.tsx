'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useCopyToClipboard, truncateWalletAddress } from '@/lib/utils';
import { IconBtc, IconCheck, IconEth, IconSol } from '@/components';

const delay = 2;

interface WalletData {
	symbol: string;
	address: string;
	ens?: string;
}

interface WalletsProps {
	data: WalletData[];
}

export default function Wallets({ data }: WalletsProps) {
	const [copiedText, copy] = useCopyToClipboard();
	const [tooltip, setTooltip] = useState(false);
	// const ensAddress = data.find(({ symbol }) => symbol === 'ETH')?.ens ?? '';

	const handleCopy = (text: string) => {
		setTooltip(false);
		if (copy) {
			copy(text)
				.then(() => {
					console.log('Copied!', { text });
					setTooltip(true);
				})
				.catch((error) => {
					console.error('Failed to copy!', error);
				});
		}
	};

	useEffect(() => {
		if (tooltip === false) return;
		let timer1 = setTimeout(() => setTooltip(false), delay * 1000);

		return () => {
			clearTimeout(timer1);
		};
	}, [tooltip]);

	return (
		<div className="flex items-center md:justify-end gap-x-1.5 relative w-full">
			{data.map(({ symbol, address, ens }, index) => (
				<div
					key={index}
					className="flex items-center cursor-pointer gap-x-1 opacity-20 hover:opacity-100 transition-opacity"
					onClick={() => handleCopy(address)}
				>
					{symbol === 'BTC' && <IconBtc />}
					{symbol === 'ETH' && <IconEth />}
					{symbol === 'SOL' && <IconSol />}
					{/* <div className="uppercase">{symbol}</div> */}
				</div>
			))}
			{tooltip && (
				<div className="absolute md:-top-6 top-1/2 -translate-y-1/2 md:translate-y-0 right-0 uppercase text-center whitespace-nowrap flex items-center gap-x-px">
					<IconCheck />
					{truncateWalletAddress(typeof copiedText === 'string' ? copiedText : '')} copied{' '}
				</div>
			)}
		</div>
	);
}
