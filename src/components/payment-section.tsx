'use client';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBtc, IconEth, IconSol } from '@/components';

interface Wallet {
	symbol: string;
	address: string;
}

interface PaymentSectionProps {
	wallets: Wallet[];
}

export default function PaymentSection({ wallets }: PaymentSectionProps) {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const copyToClipboard = (text: string, index: number) => {
		navigator.clipboard.writeText(text);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	return (
		<div className="space-y-1">
			<h3 className="text-sm uppercase tracking-wider pl-4">Payment</h3>
			<div className="space-y-1 text-xs text-foreground/80">
				<div className="flex items-center gap-1">
					<DollarSign className="w-4 h-4 text-foreground/40 opacity-60" />
					<a
						className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer no-underline"
						href="https://buy.stripe.com/bJebJ10Zc0ck30Iga80Ba05"
					>
						stripe
					</a>
				</div>
				{wallets.map((wallet, index) => (
					<div key={index} className="flex items-center gap-1">
						<span className="opacity-60">
							{wallet.symbol === 'ETH' && <IconEth />}
							{wallet.symbol === 'BTC' && <IconBtc />}
							{wallet.symbol === 'SOL' && <IconSol />}
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={() => copyToClipboard(wallet.address, index)}
									className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
								>
									{`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
								</button>
							</TooltipTrigger>
							<TooltipContent
								side="left"
								className="text-[10px] px-2 py-1 bg-foreground text-background border border-border/50"
							>
								{copiedIndex === index
									? `${wallet.symbol} copied ✓`
									: `Click to copy ${wallet.symbol} address`}
							</TooltipContent>
						</Tooltip>
					</div>
				))}
			</div>
		</div>
	);
}
