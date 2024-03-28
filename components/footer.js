import { MONTH_NAMES } from '@/app/constants';

const Footer = ({ links }) => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const nextMonth = currMonth + 1 < 12 ? currMonth + 1 : 0;
  const avail = `${MONTH_NAMES[nextMonth]} ${currYear}`;
  const footerText = `freelance developer<br /> <a href="mailto:mic@hael.cc">available ${avail}</a>`;

  return (
    <div className="flex justify-between items-end w-full">
      <p className="mb-0 text-[10px]" dangerouslySetInnerHTML={{ __html: footerText }} />
      <ul className="text-right flex flex-col items-end">
        {links.map(({ text, href }, index) => (
          <li key={index} className="text-[10px]">
            {href ? (
              <a href={href} alt="">
                {text}
              </a>
            ) : (
              text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
