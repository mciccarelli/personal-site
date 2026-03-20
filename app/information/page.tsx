import type { Metadata } from 'next';
import Clock from '@/components/clock';
import StaggerItem from '@/components/stagger-item';
import SocialLinks from '@/components/social-links';

export const metadata: Metadata = {
	title: 'Information',
};

const aboutParagraphs = [
	'michael ciccarelli is a design engineer building web interfaces and product systems. two decades across fintech, media, and e-commerce — focused on interaction, motion, and the details that shape how products feel.',
	'my work spans frontend engineering, interaction and interface design, and application architecture — including design systems, APIs and backend systems, headless CMS, e-commerce platforms, and emerging areas like AI and web3.',
];

export default function InformationPage() {
	return (
		<>
			{/* Contact info — cols 3-4 */}
			<div className="md:col-start-3 md:col-span-2 mb-10 md:mb-0">
				<div className="space-y-1 text-xs text-foreground/80">
					<StaggerItem index={0}>
						michael ciccarelli
					</StaggerItem>
					<StaggerItem index={1}>
						email <a href="mailto:m@ciccarel.li">m@ciccarel.li</a>
					</StaggerItem>
					<StaggerItem index={2}>
						<SocialLinks />
					</StaggerItem>
				</div>
			</div>

			{/* About — cols 7-8 */}
			<div className="md:col-start-7 md:col-span-2">
				<div className="text-xs text-foreground/80 space-y-4">
					{aboutParagraphs.map((text, i) => (
						<StaggerItem key={i} index={i} baseDelay={0.25}>
							{text}
						</StaggerItem>
					))}
					<StaggerItem index={aboutParagraphs.length} baseDelay={0.25}>
						independent, based in las vegas, nevada <Clock />
					</StaggerItem>
				</div>
			</div>
		</>
	);
}
