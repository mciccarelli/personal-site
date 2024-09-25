import { MONTH_NAMES, EMAIL_ADDRESS } from '@/app/constants';

const Footer = ({ links }) => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const nextMonth = currMonth + 1 < 12 ? currMonth + 1 : 0;
  const avail = `${MONTH_NAMES[nextMonth]} ${currYear}`;
  const footerText = `available for hire: ${avail}<br />`;

  return (
    <div className="flex justify-between items-center w-full">
      <p className="mb-0 text-[10px]" dangerouslySetInnerHTML={{ __html: footerText }} />
      <p className="mb-0 text-[10px]">
        <a href="mailto:${EMAIL_ADDRESS}">project inquiry &rarr;</a>
      </p>
    </div>
  );
};

export default Footer;
