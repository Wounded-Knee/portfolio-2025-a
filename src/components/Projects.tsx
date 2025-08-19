'use client';

import { useState, useEffect } from 'react';
import technologiesData from '../data/technologies.json';
import projectsData from '../data/projects.json';
import clientsData from '../data/clients.json';

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
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openCaseStudy = (projectId: number) => {
    const projectIndex = filteredProjects.findIndex(p => p.id === projectId);
    setCurrentProjectIndex(projectIndex);
    setSelectedProject(projectId);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  const navigateToNext = () => {
    const nextIndex = (currentProjectIndex + 1) % filteredProjects.length;
    setCurrentProjectIndex(nextIndex);
    setSelectedProject(filteredProjects[nextIndex].id);
  };

  const navigateToPrevious = () => {
    const prevIndex = currentProjectIndex === 0 ? filteredProjects.length - 1 : currentProjectIndex - 1;
    setCurrentProjectIndex(prevIndex);
    setSelectedProject(filteredProjects[prevIndex].id);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject !== null) {
        if (e.key === 'Escape') {
          closeCaseStudy();
        } else if (e.key === 'ArrowRight') {
          navigateToNext();
        } else if (e.key === 'ArrowLeft') {
          navigateToPrevious();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentProjectIndex, filteredProjects]);

  const currentProject = selectedProject ? filteredProjects[currentProjectIndex] : null;

  return (
    <>
      <section id="projects" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const clientName = clientsMap.get(project.clientId);
              return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    {project.image && (
                      <img src={`/project-photos/${project.clientId}/${project.image}`} alt={project.title} className="object-cover object-top" />
                    )}
                    {!project.image && (
                      <div className="text-white text-center">
                        <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <p className="text-sm opacity-90">{project.title}</p>
                        {clientName && (
                          <p className="text-xs opacity-75 mt-1">{clientName}</p>
                        )}
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
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
                    <div className="flex flex-wrap gap-2 mb-6">
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
                    

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={closeCaseStudy}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeCaseStudy}
              className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={navigateToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={navigateToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="p-8 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {currentProject.title}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {currentProject.category}
                  </span>
                </div>
                {clientsMap.get(currentProject.clientId) && (
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {clientsMap.get(currentProject.clientId)}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Project Overview */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Project Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Detailed Case Study Content */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Case Study
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      This project represents a significant milestone in my career, showcasing my expertise in modern web development practices and my ability to deliver high-quality solutions for complex business requirements.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      The development process involved close collaboration with design teams, product managers, and stakeholders to ensure the final product met all functional and aesthetic requirements while maintaining high performance standards.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Key achievements included improved user experience metrics, enhanced accessibility compliance, and successful deployment to production environments with minimal downtime.
                    </p>
                  </div>
                </div>

                {/* Technologies Used */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentProject.technologies.map((techId, index) => {
                      const techName = technologiesMap.get(techId);
                      return techName ? (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium"
                        >
                          {techName}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                  >
                    View Live Project
                  </a>
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
