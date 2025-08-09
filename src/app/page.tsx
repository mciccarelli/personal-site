'use client';

import { useState } from 'react';
import { ProjectList, IconBtc, IconEth, IconSol } from '@/components';
import data from '@/app/data.json';
import { DollarSign } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Home() {
	const { bio, projects, expertise, wallets, experience } = data;
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const copyToClipboard = (text: string, index: number) => {
		navigator.clipboard.writeText(text);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	return (
		<TooltipProvider>
			<div className="flex flex-col-reverse md:grid md:grid-cols-12 min-h-[calc(100vh-8rem-36px)] px-4 lg:px-0 gap-8 lg:gap-0 pt-4">
			{/* Left Column - Empty Space on Desktop */}
			<div className="hidden 2xl:block xl:col-span-1 2xl:col-span-3" />

			{/* Center Column - Scrollable Projects */}
			<div className="md:col-span-6 xl:col-span-6 2xl:col-span-5 md:overflow-y-auto md:pr-8 md:pl-4">
				<div className="pb-8 md:pl-2.5">
					<h3 className="text-sm uppercase tracking-wider pl-4 mb-px">Selected Projects</h3>
					<ProjectList items={projects} />
				</div>
			</div>

			{/* Right Column - Sticky Info */}
			<div className="md:col-span-6 xl:col-span-5 2xl:col-span-4 md:sticky md:top-[52px] md:h-fit md:pl-8 md:pr-8">
				<div className="space-y-8">
					{/* About */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">About</h3>
						<div className="text-xs text-foreground/80 text-balance">
							<p dangerouslySetInnerHTML={{ __html: bio }} />
						</div>
					</div>

					{/* Experience */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Experience</h3>
						<div className="space-y-1 text-xs text-foreground/80">
							{/* Mobile: stacked, Desktop: grid */}
							<div className="hidden lg:grid lg:grid-cols-[1fr_auto] lg:gap-8">
								<div className="space-y-1">
									{experience.map((item, index) => (
										<div key={index}>
											{item.role}
											{item.company ? `, ${item.company}` : ''}
										</div>
									))}
								</div>
								<div className="space-y-1 text-right">
									{experience.map((item, index) => (
										<div key={index}>
											{item.start}—{item.end}
										</div>
									))}
								</div>
							</div>
							{/* Mobile: combined */}
							<div className="lg:hidden space-y-1">
								{experience.map((item, index) => (
									<div key={index} className="flex justify-between">
										<span>
											{item.role}
											{item.company ? `, ${item.company}` : ''}
										</span>
										<span>
											{item.start}—{item.end}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Clients */}
					{/* <div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Clients</h3>
						<div className="text-xs text-foreground/80">
							Amazon, VICE, The Well, Elara, Condé Nast, ONE/OF, Pentagram, Knoll, GREY.
						</div>
					</div> */}

					{/* Services */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Services</h3>
						<ul className="space-y-1 text-xs text-foreground/80">
							{expertise.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>

					{/* Contact & Payment - Split Columns */}
					<div className="grid grid-cols-[1fr_auto] gap-8">
						{/* Contact */}
						<div className="space-y-1">
							<h3 className="text-sm uppercase tracking-wider pl-4">Contact</h3>
							<div className="space-y-1 text-xs text-foreground/80">
								<div>
									<a href="mailto:hello@m1ke.xyz">hello[at]m1ke.xyz</a>
								</div>
								<div>
									<a href="http://cal.com/thirdindex/15min">Schedule a call</a>
								</div>
								<div>
									<a href="http://linkedin.com/in/mciccarelli/">LinkedIn</a>,{' '}
									<a href="https://github.com/mciccarelli">GitHub</a>
								</div>

								<div>
									<a href="https://x.com/mcrxlli">X</a>, <a href="https://t.me/mcrelli">TG</a>,{' '}
									<a href="https://signal.me/#eu/GVhbLY_OWFgXipDTou2OTpIonm05xVhb4iAywFVWb5PBl_qAd2JMF56o6JNiLkoo">
										Signal
									</a>
								</div>
							</div>
						</div>

						{/* Payment */}
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
											<TooltipContent side="left" className="text-[10px] px-2 py-1 bg-foreground text-background border border-border/50">
												{copiedIndex === index ? `${wallet.symbol} copied ✓` : `Click to copy ${wallet.symbol} address`}
											</TooltipContent>
										</Tooltip>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</TooltipProvider>
	);
}
