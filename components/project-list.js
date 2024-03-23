import React from 'react';
import { ScrollBlurImage } from '@/components';

const ProjectList = ({ items }) => {
  return (
    <div>
      <h2>Selected Projects</h2>
      <div>
        {items.map(({ id, title, description, year, role, image, url, hideLink }, index) => {
          return (
            <div key={index} className="flex flex-col mb-12">
              <div className="block px-2">
                <ScrollBlurImage imageUrl={image} />
              </div>
              <h2 className="mb-2">{title}</h2>
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: description }} />
              <p className="mb-0">
                {!hideLink && (
                  <a href={url} target="_blank">
                    Visit Website &rarr;
                  </a>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
