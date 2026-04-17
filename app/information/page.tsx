import type { Metadata } from 'next';
import Image from 'next/image';
import ColumnReveal from '@/components/column-reveal';
import CurtainReveal from '@/components/curtain-reveal';
import StaggerList from '@/components/stagger-list';
import SocialLinks from '@/components/social-links';
import DelayedFade from '@/components/delayed-fade';

export const metadata: Metadata = {
  title: 'Information',
};

const aboutParagraphs = [
  'two decades building for the web — creative agencies, fintech, media, and e-commerce. focused on frontend engineering, motion, and implementation detail.',
  'past clients include modern treasury, amazon, condé nast, and pentagram. work spans editorial platforms, marketing and portfolio sites, design systems, trading infrastructure, payments, and commerce — often embedded as a principal-level ic where engineering and design quality are both non-negotiable.',
  'i prototype in code and ship production interfaces. ai is part of the workflow — cursor and claude code as default tools, not experiments.',
];

export default function InformationPage() {
  return (
    <>
      {/* Contact info — cols 5-6 */}
      <ColumnReveal className="order-1 mb-6 md:order-none md:col-span-2 md:col-start-5 md:row-start-1 md:mb-0">
        <StaggerList className="text-foreground/80 space-y-1 text-xs">
          <div>michael ciccarelli</div>
          <div>
            email <a href="mailto:mc@thirdindex.co">mc@thirdindex.co</a>
          </div>
          <SocialLinks />
        </StaggerList>
      </ColumnReveal>

      {/* Photo — cols 3-4, between contact and about on mobile */}
      <ColumnReveal className="order-2 mb-6 md:order-none md:col-span-2 md:col-start-3 md:row-start-1 md:mb-0">
        <CurtainReveal className="max-w-[200px] overflow-hidden md:max-w-none">
          <Image
            src="/mc.jpg"
            alt="Michael Ciccarelli"
            width={800}
            height={1002}
            loading="eager"
            className="-mb-px block w-full"
          />
        </CurtainReveal>
        <DelayedFade delay={1}>
          <a
            href="https://kelvonagee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-muted-foreground mt-1 block text-[10px] transition-colors"
          >
            photo: kelvon agee
          </a>
        </DelayedFade>
      </ColumnReveal>

      {/* About — cols 7-8 */}
      <ColumnReveal className="order-3 md:order-none md:col-span-2 md:col-start-7 md:row-start-1">
        <div className="text-foreground/80 space-y-4 text-xs">
          {aboutParagraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <p>
            based in las vegas, nevada. independent, consulting through{' '}
            <a href="https://thirdindex.co" target="_blank" rel="noopener noreferrer">
              third index
            </a>
            , a small digital studio.
          </p>
        </div>
      </ColumnReveal>
    </>
  );
}
