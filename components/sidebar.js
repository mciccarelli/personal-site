import data from '@/app/data.json';
import { Footer, Wallets } from '@/components';

export default function Sidebar({}) {
  const { bio, experience, clients, capabilities, contact, footerLinks, crypto, resume } = data;

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
            {/* <a href={resume} title="download .pdf" className="flex items-center gap-x-1 mt-4 uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
                <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
              </svg>
              resume.pdf
            </a> */}
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
              <h2>Technical Skills</h2>
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
