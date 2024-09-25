import React from 'react';
import { ScrollBlurImage } from '@/components';

const ProjectList = ({ items }) => {
  return (
    <div className="py-8">
      <h2>Recent Projects</h2>
      <div className="flex flex-col gap-y-10 md:gap-y-20">
        {items.map(({ id, title, description, year, role, image, url, hideLink }, index) => {
          return (
            <div key={index} className="flex flex-col gap-y2">
              <div className="block px-2">
                {!hideLink ? (
                  <a href={url} target="_blank">
                    <ScrollBlurImage imageUrl={image} />
                  </a>
                ) : (
                  <ScrollBlurImage imageUrl={image} />
                )}
              </div>
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: description }} />
              <div className="px-2 flex items-center justify-between">
                <p dangerouslySetInnerHTML={{ __html: role }} />
                <p>
                  {!hideLink && (
                    <a href={url} target="_blank">
                      Visit Website &rarr;
                    </a>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
