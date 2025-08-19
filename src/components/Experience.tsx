"use client";

import technologiesData from '../data/technologies.json';
import experiencesData from '../data/experiences.json';
import clientsData from '../data/clients.json';
import { Experience as ExperienceType, Client } from '../types';
import { getLogoUrl } from '../utils/logo';
import { useDisplay } from '../hooks/useDisplay';
import { extractDomain } from '../utils/url';

const Experience = () => {
  const { isRetina, isDarkMode } = useDisplay();

  // Create a map for quick technology lookup by ID
  const technologiesMap = new Map(
    technologiesData.technologies.map(tech => [tech.id, tech.name])
  );

  // Create a map for quick client lookup by ID
  const clientsMap = new Map(
    clientsData.clients.map(client => [client.id, client as Client])
  );

  const experiences = experiencesData.experiences as ExperienceType[];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="space-y-8">
          {experiences.map((experience, index) => {
            const client = clientsMap.get(experience.clientId);
            const domain = extractDomain(client?.url || null);
            const logoUrl = domain 
              ? getLogoUrl(
                  domain, 
                  64, 
                  isDarkMode ? 'dark' : 'light', 
                  isRetina
                )
              : null;

            return (
              <div key={index} className="relative experience-item">
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="timeline-line absolute left-6 top-16 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Client Logo */}
                  <div className="timeline-logo flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-slate-600 overflow-hidden">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${client?.name} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          // Fallback to default icon if logo fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    {/* Fallback icon */}
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-50 dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {experience.title}
                      </h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {experience.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                      {client?.name}
                    </h4>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{experience.location}</span>
                      </div>
                      {experience.remote && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-green-600 dark:text-green-400 font-medium">Remote</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((techId, techIndex) => {
                        const techName = technologiesMap.get(techId);
                        return techName ? (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {techName}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
