'use client';

import { useEffect, useState } from 'react';
import { LogoObject } from '../utils/logo';

interface Technology {
  name: string;
  logo?: LogoObject;
  url?: string;
}

interface TechnologyCarouselProps {
  technologies: Technology[];
  speed?: number; // pixels per second
  isDarkMode?: boolean;
}

const TechnologyCarousel = ({ technologies, speed = 50, isDarkMode = false }: TechnologyCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the technologies array to create seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  const getLogoSrc = (tech: Technology) => {
    if (tech.logo) {
      return isDarkMode ? tech.logo.dark : tech.logo.light;
    }
    return null;
  };

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
        {duplicatedTechnologies.map((tech, index) => {
          const logoSrc = getLogoSrc(tech);
          
          return (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center group"
            >
              {logoSrc ? (
                tech.url ? (
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <img
                      src={logoSrc}
                      alt={tech.name}
                      className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                    />
                  </a>
                ) : (
                  <div className="flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img
                      src={logoSrc}
                      alt={tech.name}
                      className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                    />
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-gray-400 dark:text-gray-600 text-lg font-medium">
                    {tech.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechnologyCarousel;
