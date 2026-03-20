'use client';

import { Tooltip } from '@base-ui-components/react';

interface SocialLinkProps {
	href: string;
	label: string;
	tooltip: string;
}

export default function SocialLink({ href, label, tooltip }: SocialLinkProps) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger
					render={
						<a href={href} target="_blank" rel="noopener noreferrer" />
					}
				>
					{label}
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Positioner sideOffset={6} side="top">
						<Tooltip.Popup className="z-[100] bg-foreground text-background text-xs px-2 py-1 rounded">
							{tooltip}
						</Tooltip.Popup>
					</Tooltip.Positioner>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
