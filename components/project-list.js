'use client';

import { useState } from 'react';
import { cn } from '@/app/utils';

const ListItem = ({ year, title, description, url }) => {
  const [isHovered, setIsHovered] = useState(false);
  function handleMouseEnter() {
    setIsHovered(true);
  }
  function handleMouseLeave() {
    setIsHovered(false);
  }
  return (
    <div
      className="flex flex-col md:flex-row gap-x-1.5 relative md:flex-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className={cn(
          'text-snow/90 hidden md:flex opacity-0 transition-opacity absolute -left-4 top-1/2 -translate-y-1/2',
          {
            'opacity-100': isHovered
          }
        )}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
          <path
            fillRule="evenodd"
            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <a className="whitespace-nowrap hover:no-underline" href={url} target="_blank" title="Visit site">
        {title}
      </a>
      <div
        className={cn(
          'text-white/20 md:line-clamp-1 md:opacity-0 transition-opacity duration-200 delay-100 ease-in-out',
          {
            'md:opacity-100': isHovered
          }
        )}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const ProjectList = ({ items }) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-px">
      {items.map(({ title, description, year, url }, index) => {
        return <ListItem key={index} year={year} title={title} description={description} url={url} />;
      })}
    </div>
  );
};

export default ProjectList;
