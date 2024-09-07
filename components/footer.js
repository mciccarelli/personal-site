import { MONTH_NAMES, EMAIL_ADDRESS } from '@/app/constants';

const Footer = ({ links }) => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const nextMonth = currMonth + 1 < 12 ? currMonth + 1 : 0;
  const avail = `${MONTH_NAMES[nextMonth]} ${currYear}`;
  const footerText = `available for hire: ${avail}<br /><a href="mailto:${EMAIL_ADDRESS}">project inquiry &rarr;</a>`;

  return (
    <div className="flex justify-between items-end w-full">
      <p className="mb-0 text-[10px]" dangerouslySetInnerHTML={{ __html: footerText }} />
    </div>
  );
};

export default Footer;
