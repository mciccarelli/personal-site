import data from './data.json';
import { ProjectList, Footer, Wallets } from '@/components';

export default function Home() {
  const { bio, experience, clients, capabilities, contact, footerLinks, crypto, projects } = data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-0">
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[1080px]">
          <div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-8 w-full">
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
                      {contact.map(({ text, href }, index) => (
                        <li key={index} className="">
                          {href ? (
                            <a href={href} alt="" className="flex items-center gap-x-px">
                              {text}
                              {/* <svg
                                className="w-4 h-4 -rotate-45 opacity-0"
                                clipRule="evenodd"
                                fillRule="evenodd"
                                strokeLinejoin="round"
                                strokeMiterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="m14.523 18.787 6.255-6.26a.747.747 0 0 0 0-1.06l-6.255-6.258a.75.75 0 0 0-1.056.004.746.746 0 0 0-.004 1.056l4.978 4.978H3.749a.75.75 0 0 0 0 1.5h14.692l-4.979 4.979a.746.746 0 0 0 .006 1.054.752.752 0 0 0 .533.222c.19 0 .378-.072.522-.215z"
                                  fill="currentColor"
                                />
                              </svg> */}
                            </a>
                          ) : (
                            text
                          )}
                        </li>
                      ))}
                    </div>
                    <div>
                      <h2>On-chain</h2>
                      <Wallets data={crypto} />
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex justify-between py-4 items-end">
                  <Footer links={footerLinks} />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 md:order-first mb-4">{projects && <ProjectList items={projects} />}</div>
            <div className="md:hidden flex">
              <Footer links={footerLinks} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
