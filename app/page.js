import data from './data.json';
import { ProjectList } from '@/app/components';

export default function Home() {
  const { bio, experience, clients, capabilities, links, projects } = data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[1080px]">
          <div className="flex flex-col md:grid md:grid-cols-4 w-full">
            <div className="md:col-span-2 order-last md:order-first mb-4 p-4 md:p-6">
              {projects && <ProjectList items={projects} />}
            </div>
            <div className="col-span-2 p-4 md:p-6">
              <div className="md:sticky md:top-10 flex flex-col gap-8 mb-12 md:mb-0">
                <div dangerouslySetInnerHTML={{ __html: bio }} />
                <div className="w-full">
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
                        <a href={href} alt="">
                          {text}
                        </a>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
