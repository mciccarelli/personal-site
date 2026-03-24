import type { Metadata } from 'next';
import Clock from '@/components/clock';
import ColumnReveal from '@/components/column-reveal';
import StaggerList from '@/components/stagger-list';
import SocialLinks from '@/components/social-links';

export const metadata: Metadata = {
  title: 'Information',
};

const aboutParagraphs = [
  'two decades across fintech, media, and e-commerce — focused on interaction, motion, and the craft of building for the web.',
  'past clients include modern treasury, amazon, condé nast, and pentagram. work spans trading infrastructure, payments, design systems, editorial platforms, and commerce experiences — often embedded as a principal-level ic where engineering rigor and design quality need to coexist.',
  'i build interfaces and the systems behind them.',
];

export default function InformationPage() {
  return (
    <>
      {/* Contact info — cols 3-4 */}
      <ColumnReveal className="mb-10 md:col-span-2 md:col-start-3 md:mb-0">
        <StaggerList className="text-foreground/80 space-y-1 text-xs">
          <div>michael ciccarelli</div>
          <div>
            email <a href="mailto:m@ciccarel.li">m@ciccarel.li</a>
          </div>
          <SocialLinks />
        </StaggerList>
      </ColumnReveal>

      {/* About — cols 7-8 */}
      <ColumnReveal className="md:col-span-2 md:col-start-7">
        <div className="text-foreground/80 space-y-4 text-xs">
          {aboutParagraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <p>
            independent, based in las vegas, nevada <Clock />
          </p>
        </div>
      </ColumnReveal>
    </>
  );
}
