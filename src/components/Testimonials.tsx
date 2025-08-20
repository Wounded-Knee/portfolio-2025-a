'use client';

import { useState } from 'react';
import testimonialsData from '../data/testimonials.json';
import { Testimonial } from '../types';

const Testimonials = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const testimonials = testimonialsData.testimonials as Testimonial[];

  const formatTestimony = (testimony: string) => {
    return testimony.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  const toggleCardExpansion = (testimonialId: string) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(testimonialId)) {
      newExpandedCards.delete(testimonialId);
    } else {
      newExpandedCards.add(testimonialId);
    }
    setExpandedCards(newExpandedCards);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const isExpanded = expandedCards.has(testimonial.id);
            
            return (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Testimonial Header */}
                <div className="flex items-start space-x-4 mb-6">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src={`/testimonial-photos/${testimonial.photo}`}
                      alt={`${testimonial.name} profile photo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback initials */}
                    <span className="text-white text-lg font-bold hidden">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Person Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {testimonial.currentRole} at {testimonial.currentCompany}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.relationship}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="space-y-4">
                  <div 
                    className={`text-gray-700 dark:text-gray-300 leading-relaxed overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-none' : 'max-h-40'
                    }`}
                  >
                    {formatTestimony(testimonial.testimony)}
                  </div>
                  
                  {/* Read More Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleCardExpansion(testimonial.id)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Quote Icon */}
                <div className="mt-6 flex justify-end">
                  <svg className="w-8 h-8 text-blue-200 dark:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
