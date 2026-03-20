import type { Metadata } from 'next';
import ServicesSection from '@/components/services-section';
import ContactForm from '@/components/contact-form';
import BookCallButton from '@/components/book-call-button';
import PageGrid from '@/components/page-grid';
import StaggerItem from '@/components/stagger-item';
import data from '../../data.json';

export const metadata: Metadata = {
	title: 'Engage',
};

export default function EngagePage() {
	const { services, process: processSteps } = data;

	return (
		<PageGrid>
			{/* Services — cols 3-4 */}
			<div className="md:col-start-3 md:col-span-2 mb-10 md:mb-0">
				<ServicesSection services={services} />
			</div>

			{/* Process steps — cols 5-6 */}
			<div className="md:col-start-5 md:col-span-2 mb-10 md:mb-0">
				<div className="space-y-3 text-xs text-foreground/80">
					{processSteps.map((step, index) => (
						<StaggerItem key={index} index={index} baseDelay={0.7}>
							<div className="flex gap-3">
								<span className="text-muted-foreground shrink-0 w-4 text-right">
									{String(index + 1).padStart(2, '0')}
								</span>
								<span>{step}</span>
							</div>
						</StaggerItem>
					))}
				</div>
			</div>

			{/* Contact form — cols 7-8 */}
			<StaggerItem index={0} baseDelay={0.9} className="md:col-start-7 md:col-span-2 space-y-3">
				<p className="text-xs text-foreground/80">
					send a message or <BookCallButton /> to discuss your project.
				</p>
				<ContactForm />
			</StaggerItem>
		</PageGrid>
	);
}
