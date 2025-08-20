'use client';

import { useState } from 'react';
import technologiesData from '../data/technologies.json';
import { Technology } from '../types';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  // Create a map for quick technology lookup by ID
  const technologiesMap = new Map(
    (technologiesData.technologies as Technology[]).map(tech => [tech.id, tech])
  );

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: ['react', 'javascript', 'html5', 'css3', 'sass', 'typescript', 'redux', 'emberjs', 'backbonejs', 'jquery']
    },
    backend: {
      title: 'Backend Development',
      skills: ['nodejs', 'express', 'mongodb', 'rest', 'websockets', 'axios']
    },
    tools: {
      title: 'Tools & DevOps',
      skills: ['git', 'jira', 'figma', 'jest', 'mocha', 'webpack', 'grunt', 'docker', 'lighthouse', 'contentful', 'liquid']
    }
  };

  return (
    <section id="skills" className="py-20" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="skills-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto" aria-hidden="true"></div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1" role="tablist" aria-label="Skill category tabs">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeCategory === category
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                role="tab"
                aria-selected={activeCategory === category}
                aria-controls={`skills-${category}`}
              >
                {skillCategories[category as keyof typeof skillCategories].title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Grid */}
        <div 
          className="grid md:grid-cols-2 gap-8"
          role="tabpanel"
          id={`skills-${activeCategory}`}
          aria-label={`${skillCategories[activeCategory as keyof typeof skillCategories].title} skills`}
        >
          {skillCategories[activeCategory as keyof typeof skillCategories].skills
            .map((skillId) => technologiesMap.get(skillId))
            .filter((technology) => technology && technology.level > 0)
            .map((technology, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {technology!.name}
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400" aria-label={`${technology!.level} percent proficiency`}>
                    {technology!.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2" role="progressbar" aria-valuenow={technology!.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${technology!.name} proficiency level`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${technology!.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
        
        {/* Additional Skills */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Additional Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list" aria-label="Additional professional skills">
            {[
              'Accessibility (ADA/Section 508)', 'Agile/Scrum', 'Code Review', 'Mentoring',
              'Performance Optimization', 'SEO', 'Testing', 'Documentation',
              'Responsive Design', 'Mobile-First Development', 'Pixel-Perfect Implementation',
              'Third-Party Integrations'
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                role="listitem"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
