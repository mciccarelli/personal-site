import data from './data.json';
import { ProjectList } from '@/components';

export default function Home() {
  const { projects, bio, links, resume } = data;

  return (
    <div className="col-span-3 md:col-span-2 md:col-start-2 flex flex-col justify-between gap-y-10">
      <div className="flex flex-col gap-y-10">
        <div className="pt-10 md:pt-40">
          <h2>Info</h2>
          <div className="bio mb-4" dangerouslySetInnerHTML={{ __html: bio }} />
          <p className="flex flex-col md:flex-row md:items-center gap-y-4 gap-x-1">
            <a href={resume} title="Download Resume in PDF Format" className="flex items-center gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
                <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
              </svg>
              Download Resume
            </a>
            <span className="flex items-center gap-x-1">
              <span className="hidden md:flex">—</span>For all inquiries, please email:{' '}
              <a href="mailto:mic@hael.cc">mic@hael.cc</a>
            </span>
          </p>
        </div>
        {projects && <ProjectList items={projects} />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>More</h2>
          {links.map(({ text, href }, index) => (
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
      </div>
    </div>
  );
}
