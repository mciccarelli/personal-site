import type { Metadata } from 'next';
import Clock from '@/components/clock';
import StaggerItem from '@/components/stagger-item';
import SocialLinks from '@/components/social-links';

export const metadata: Metadata = {
  title: 'Information',
};

const aboutParagraphs = [
  'michael ciccarelli is a design engineer building web interfaces and product systems. two decades across fintech, media, and e-commerce — focused on interaction, motion, and details that shape how products feel.',
  'i build interfaces and the systems behind them — from component libraries to APIs, headless platforms, and backend systems, across commerce, payments, and emerging areas like AI and crypto.',
];

export default function InformationPage() {
  return (
    <>
      {/* Contact info — cols 3-4 */}
      <div className="mb-10 md:col-span-2 md:col-start-3 md:mb-0">
        <div className="text-foreground/80 space-y-1 text-xs">
          <StaggerItem index={0}>michael ciccarelli</StaggerItem>
          <StaggerItem index={1}>
            email <a href="mailto:m@ciccarel.li">m@ciccarel.li</a>
          </StaggerItem>
          <StaggerItem index={2}>
            <SocialLinks />
          </StaggerItem>
        </div>
      </div>

      {/* About — cols 7-8 */}
      <div className="md:col-span-2 md:col-start-7">
        <div className="text-foreground/80 space-y-4 text-xs">
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
