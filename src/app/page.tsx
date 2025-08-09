'use client';

import { useState } from 'react';
import { ProjectList, IconBtc, IconEth, IconSol } from '@/components';
import data from '@/app/data.json';
import { DollarSign } from 'lucide-react';

export default function Home() {
	const { bio, projects, expertise, wallets, experience } = data;
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	return (
		<div className="flex flex-col-reverse lg:grid lg:grid-cols-12 min-h-[calc(100vh-8rem-36px)] px-4 lg:px-0 gap-8 lg:gap-0 pt-4">
			{/* Left Column - Empty Space on Desktop */}
			<div className="hidden lg:block lg:col-span-5" />

			{/* Center Column - Scrollable Projects */}
			<div className="lg:col-span-4 lg:overflow-y-auto lg:pr-8 lg:pl-4">
				<div className="pb-8">
					<h3 className="text-sm uppercase tracking-wider pl-4">Selected Projects</h3>

					<ProjectList items={projects} />
				</div>
			</div>

			{/* Right Column - Sticky Info */}
			<div className="lg:col-span-3 lg:sticky lg:top-[52px] lg:h-fit lg:pl-8 lg:pr-8">
				<div className="space-y-8">
					{/* About */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">About</h3>
						<div className="text-xs text-foreground/80">
							<p dangerouslySetInnerHTML={{ __html: bio }} />
						</div>
					</div>

					{/* Experience */}
					<div className="space-y-1">
						<h3 className="text-sm uppercase tracking-wider pl-4">Experience</h3>
						<div className="space-y-1 text-xs text-foreground/80">
							{/* Mobile: stacked, Desktop: grid */}
							<div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
								<div className="space-y-1">
									{experience.map((item, index) => (
										<div key={index}>
											{item.role}
											{item.company ? `, ${item.company}` : ''}
										</div>
									))}
								</div>
								<div className="space-y-1">
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
					<div className="grid grid-cols-2 gap-8">
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
								<div>
									<DollarSign className="w-4 h-4 inline-block text-foreground/40 scale-[.85]" />
									&nbsp;
									<a
										className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer no-underline"
										href="https://buy.stripe.com/bJebJ10Zc0ck30Iga80Ba05"
									>
										Stripe
									</a>
								</div>
								{wallets.map((wallet, index) => (
									<div key={index} className="flex items-center gap-1 relative">
										<span className="opacity-60">
											{wallet.symbol === 'ETH' && <IconEth />}
											{wallet.symbol === 'BTC' && <IconBtc />}
											{wallet.symbol === 'SOL' && <IconSol />}
										</span>
										<button
											onClick={() => {
												navigator.clipboard.writeText(wallet.address);
												setCopiedIndex(index);
												setTimeout(() => setCopiedIndex(null), 2000);
											}}
											className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
											title={wallet.address}
										>
											{`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
										</button>
										{copiedIndex === index && (
											<span className="absolute -right-4 text-[9px] uppercase">
												{wallet.symbol} copied ✓
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
