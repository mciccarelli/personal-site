import data from '@/app/data.json';
import { Footer, Wallets } from '@/components';

export default function Sidebar({}) {
  const { bio, experience, clients, capabilities, contact, footerLinks, crypto, projects } = data;

  return (
    <div className="col-span-2 flex flex-col md:px-4">
      <div className="flex flex-col md:sticky md:top-10 md:h-[calc(100vh_-_40px)]">
        <div className="flex flex-col gap-y-8 flex-1 overflow-auto">
          <div>
            <h2>About</h2>
            <div className="bio" dangerouslySetInnerHTML={{ __html: bio }} />
          </div>
          <div>
            <h2>Experience</h2>
            {experience.map(({ company, role, tenure }, index) => (
              <li key={index} className="grid grid-cols-2 gap-4">
                <span className="md:col-span-1 flex">
                  {company}
                  <span className="hidden lg:flex">
                    {role ? ',' : ''} {role}
                  </span>
                </span>
                <span className="md:col-span-1">{tenure}</span>
              </li>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2>Clients</h2>
              {clients.map((client, index) => (
                <li key={index} className="">
                  {client}
                </li>
              ))}
            </div>
            <div>
              <h2>Capabilities</h2>
              {capabilities.map((skill, index) => (
                <li key={index} className="">
                  {skill}
                </li>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2>Contact</h2>
              {contact.map(({ text, href }, index) => (
                <li key={index} className="">
                  {href ? (
                    <a href={href} alt="" className="flex items-center gap-x-px">
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </div>
            <div>
              <h2>Onchain</h2>
              <Wallets data={crypto} />
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-between py-4 items-end">
          <Footer links={footerLinks} />
        </div>
      </div>
    </div>
  );
}
