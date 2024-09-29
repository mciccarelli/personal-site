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
          'text-white/50 hidden md:flex opacity-0 transition-opacity absolute -left-8 top-1/2 -translate-y-1/2',
          {
            'opacity-100': isHovered
          }
        )}>
        {year}
      </div>
      <a className="whitespace-nowrap hover:no-underline" href={url} target="_blank" title="Visit site">
        {title}
      </a>
      <div
        className={cn('text-white/50 md:line-clamp-1 md:opacity-0 md:transition-opacity', {
          'md:opacity-100': isHovered
        })}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const ProjectList = ({ items }) => {
  return (
    <div>
      <h2>Projects</h2>
      <div className="flex flex-col gap-y-4 md:gap-y-px">
        {items.map(({ title, description, year, url }, index) => {
          return <ListItem key={index} year={year} title={title} description={description} url={url} />;
        })}
      </div>
    </div>
  );
};

export default ProjectList;
