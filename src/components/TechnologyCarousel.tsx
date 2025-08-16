'use client';

import { useEffect, useState } from 'react';

interface Technology {
  name: string;
  logo: string;
  url?: string;
}

interface TechnologyCarouselProps {
  technologies: Technology[];
  speed?: number; // pixels per second
}

const TechnologyCarousel = ({ technologies, speed = 50 }: TechnologyCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the technologies array to create seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 py-12">
      <div 
        className="flex items-center space-x-24"
        style={{
          animation: isHovered ? 'none' : 'moveLeft 30s linear infinite',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style jsx>{`
          @keyframes moveLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
        {duplicatedTechnologies.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center group"
          >
            {tech.url ? (
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </a>
            ) : (
              <div className="flex items-center justify-center transition-all duration-300 hover:scale-110">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyCarousel;
