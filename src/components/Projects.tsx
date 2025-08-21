'use client';

import { useState, useEffect, useRef } from 'react';
import technologiesData from '../data/technologies.json';
import projectsData from '../data/projects.json';
import clientsData from '../data/clients.json';
import CaseStudyModal from './CaseStudyModal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Create a map for quick technology lookup by ID
  const technologiesMap = new Map(
    technologiesData.technologies.map(tech => [tech.id, tech.name])
  );

  // Create a map for quick client lookup by ID
  const clientsMap = new Map(
    clientsData.clients.map(client => [client.id, client.name])
  );

  const projects = projectsData.projects;

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = (activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)
  ).sort((a, b) => {
    let scores = [a,b].map(candidate => {
      let score = 0;
      if (candidate.image) score += 1;
      if (candidate.featured) score += 5;
      if (candidate.caseStudy) score += 2;
      return score;
    });
    if (a.dateCompleted && b.dateCompleted) {
      const dateA = new Date(a.dateCompleted);
      const dateB = new Date(b.dateCompleted);
      if (dateA > dateB) scores[0] += 1;
      if (dateB > dateA) scores[1] += 1;
    }
    return scores[0] === scores[1] ? 0 : [-1,1][scores.indexOf(Math.max(...scores))];
  });

  // Filter projects that have case studies for navigation
  const projectsWithCaseStudies = filteredProjects.filter(project => project.caseStudy);

  const openCaseStudy = (projectId: number) => {
    const projectIndex = projectsWithCaseStudies.findIndex(p => p.id === projectId);
    setCurrentProjectIndex(projectIndex);
    setSelectedProject(projectId);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  const navigateToProject = (newIndex: number) => {
    setCurrentProjectIndex(newIndex);
    setSelectedProject(projectsWithCaseStudies[newIndex].id);
  };

  const navigateToNext = () => {
    const nextIndex = (currentProjectIndex + 1) % projectsWithCaseStudies.length;
    navigateToProject(nextIndex);
  };

  const navigateToPrevious = () => {
    const prevIndex = currentProjectIndex === 0 ? projectsWithCaseStudies.length - 1 : currentProjectIndex - 1;
    navigateToProject(prevIndex);
  };



  const currentProject = selectedProject ? projectsWithCaseStudies[currentProjectIndex] : null;

  return (
    <>
      <section id="projects" className="py-20 bg-white dark:bg-slate-900" aria-labelledby="projects-heading">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="projects-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto" aria-hidden="true"></div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project category filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  aria-controls={`projects-${filter.id}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="tabpanel"
            id={`projects-${activeFilter}`}
            aria-label={`${activeFilter === 'all' ? 'All' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} projects`}
          >
            {filteredProjects.map((project) => {
              const clientName = clientsMap.get(project.clientId);
              return (
                <article
                  key={project.id}
                  className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                >
                  {/* Project Image/Video */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    {project.image && (
                      (() => {
                        const fileExtension = project.image.split('.').pop()?.toLowerCase();
                        const isVideo = fileExtension === 'webm' || fileExtension === 'mp4' || fileExtension === 'mov';
                        
                        if (isVideo) {
                          return (
                            <video 
                              src={`/project-photos/${project.clientId}/${project.image}`}
                              className="object-cover object-top w-full h-full"
                              muted
                              loop
                              playsInline
                              autoPlay
                              aria-label={`Video demonstration of ${project.title} project`}
                            />
                          );
                        } else {
                          return (
                            <img 
                              src={`/project-photos/${project.clientId}/${project.image}`} 
                              alt={`Screenshot of ${project.title} project`} 
                              className="object-cover object-top w-full h-full" 
                            />
                          );
                        }
                      })()
                    )}
                    {!project.image && (
                      <div className="text-white text-center">
                        <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <p className="text-sm opacity-90">{project.title}</p>
                        {clientName && (
                          <p className="text-xs opacity-75 mt-1">{clientName}</p>
                        )}
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                      {project.technologies.map((techId, index) => {
                        const techName = technologiesMap.get(techId);
                        return techName ? (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {techName}
                          </span>
                        ) : null;
                      })}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.caseStudy && (
                        <button
                          onClick={() => openCaseStudy(project.id)}
                          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${project.githubUrl ? 'flex-1' : 'w-full'}`}
                          aria-label={`View case study for ${project.title}`}
                        >
                          Case Study
                        </button>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`text-center bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${project.caseStudy ? 'flex-1' : 'w-full'}`}
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={selectedProject !== null}
        onClose={closeCaseStudy}
        currentProject={currentProject}
        currentProjectIndex={currentProjectIndex}
        totalProjects={filteredProjects.length}
        onNavigateNext={navigateToNext}
        onNavigatePrevious={navigateToPrevious}
        technologiesMap={technologiesMap}
        clientsMap={clientsMap}
      />
    </>
  );
};

export default Projects;
