import data from './data.json';
import { ProjectList, Wallets } from '@/components';

export default function Home() {
  const { bio, experience, clients, capabilities, links, crypto, projects } = data;
  const currYear = new Date().getFullYear();
  const footerText = `© ${currYear} hael.cc. all rights reserved.`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-0">
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[1080px]">
          <div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-8 w-full">
            <div className="col-span-2 flex flex-col md:px-4">
              <div className="flex flex-col md:sticky md:top-10 md:h-[calc(100vh_-_40px)]">
                <div className="flex flex-col gap-y-8 flex-1">
                  <div>
                    <h2>About</h2>
                    <div className="bio" dangerouslySetInnerHTML={{ __html: bio }} />
                  </div>
                  <div>
                    <h2>Experience</h2>
                    {experience.map(({ company, role, tenure }, index) => (
                      <li key={index} className="grid grid-cols-2 gap-4">
                        <span className="md:col-span-1">
                          {company}
                          {role ? ',' : ''} {role}
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
                      {links.map(({ text, href }, index) => (
                        <li key={index} className="">
                          {href ? (
                            <a href={href} alt="">
                              {text}
                            </a>
                          ) : (
                            text
                          )}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex justify-between py-4 ">
                  <p className="mb-0 opacity-50">{footerText}</p>
                  <Wallets data={crypto} />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 md:order-first mb-4">{projects && <ProjectList items={projects} />}</div>
            <div className="md:hidden flex justify-between py-4">
              <p className="mb-0 opacity-50">{footerText}</p>
              <Wallets data={crypto} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
