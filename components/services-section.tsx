'use client';

import { Collapsible } from '@base-ui-components/react';
import { motion } from 'motion/react';
import BlinkingDot from '@/components/blinking-dot';

interface Service {
	title: string;
	description: string;
	deliverables: string[];
	timeline?: string;
	price: string;
}

interface ServicesSectionProps {
	services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
	return (
		<div>
			<div className="space-y-0 text-xs">
				{services.map((service, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.3,
							delay: 0.15 + index * 0.04,
							ease: [0.25, 0.1, 0.25, 1],
						}}
					>
					<Collapsible.Root className="group/service relative">
						<div className="flex opacity-0 transition-opacity absolute -left-3.5 top-[5px] group-hover/service:opacity-100 group-has-data-[panel-open]/service:opacity-100">
							<BlinkingDot variant="subdued" />
						</div>
						<div className="flex opacity-0 transition-opacity absolute -left-3.5 top-[5px] group-has-data-[panel-open]/service:opacity-100 group-hover/service:group-has-data-[panel-open]/service:opacity-100">
							<BlinkingDot variant="default" />
						</div>
						<Collapsible.Trigger className="w-full text-left text-xs text-foreground/80 hover:text-foreground cursor-pointer transition-colors py-0.5 data-[panel-open]:text-foreground lowercase">
							{service.title}
						</Collapsible.Trigger>
						<Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
							<div className="text-muted-foreground pb-3 pt-0.5 normal-case space-y-2">
								<p className="mb-0">{service.description}</p>
								<ul className="space-y-0.5 pt-1">
									{service.deliverables.map((item, j) => (
										<li key={j} className="text-muted-foreground/70">— {item}</li>
									))}
								</ul>
								{service.timeline && <p className="text-foreground/60 mb-0">{service.timeline}</p>}
								<p className="text-foreground/60 mb-0">{service.price}</p>
							</div>
						</Collapsible.Panel>
					</Collapsible.Root>
					</motion.div>
				))}
			</div>
		</div>
	);
}
