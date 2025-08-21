'use client';

import { useEffect, useRef } from 'react';
import { Project } from '../types';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProject: Project | null;
  currentProjectIndex: number;
  totalProjects: number;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  technologiesMap: Map<string, string>;
  clientsMap: Map<string, string>;
}

const CaseStudyModal = ({
  isOpen,
  onClose,
  currentProject,
  currentProjectIndex,
  totalProjects,
  onNavigateNext,
  onNavigatePrevious,
  technologiesMap,
  clientsMap
}: CaseStudyModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowRight') {
          onNavigateNext();
        } else if (e.key === 'ArrowLeft') {
          onNavigatePrevious();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigateNext, onNavigatePrevious]);

  // Focus management for modal
  useEffect(() => {
    if (isOpen && modalRef.current && currentProject) {
      // Focus the modal when it opens
      modalRef.current.focus();
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Opened case study for ${currentProject.title}`;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [isOpen, currentProject]);

  if (!isOpen || !currentProject) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-label="Close case study"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {false && totalProjects > 1 && (
          <>
            <button
              ref={previousButtonRef}
              onClick={onNavigatePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View previous project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              ref={nextButtonRef}
              onClick={onNavigateNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View next project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 id="modal-title" className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentProject.title}
              </h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                {currentProject.category}
              </span>
            </div>
            {clientsMap.get(currentProject.clientId) && (
              <p id="modal-description" className="text-lg text-gray-600 dark:text-gray-400">
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
            {currentProject.caseStudy && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Case Study
                </h3>
                <div className="prose dark:prose-invert max-w-none space-y-6">
                  {/* Situation */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Situation</h4>
                    {currentProject.caseStudy.situation.map((text, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Task */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Task</h4>
                    {currentProject.caseStudy.task.map((text, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Action */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Action</h4>
                    {currentProject.caseStudy.action.map((text, index) => (
                      <div key={index} 
                        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    ))}
                  </div>

                  {/* Result */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Result</h4>
                    {currentProject.caseStudy.result.map((text, index) => (
                      <div key={index} 
                        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technologies Used */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-3" aria-label="Technologies and tools used">
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
                {(currentProject.liveUrl || currentProject.githubUrl) && (
                  <div className="flex space-x-4">
                    {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Visit live ${currentProject.title} project (opens in new tab)`}
                      >
                        View Live Project
                      </a>
                    )}
                    {currentProject.githubUrl && currentProject.githubUrl !== '#' && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`View ${currentProject.title} source code on GitHub (opens in new tab)`}
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
