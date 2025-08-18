import experiencesData from '../data/experiences.json';
import technologiesData from '../data/technologies.json';
import clientsData from '../data/clients.json';
import certificationsData from '../data/certifications.json';

const About = () => {
  // Calculate statistics dynamically
  const calculateYearsExperience = () => {
    const experiences = experiencesData.experiences;
    if (experiences.length === 0) return 0;
    
    // Get the earliest experience date
    const earliestDate = new Date(experiences[experiences.length - 1].period.split(' - ')[0]);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - earliestDate.getFullYear();
    
    return Math.max(yearsDiff, 1); // Minimum 1 year
  };

  const calculateMajorCompanies = () => {
    // Count unique companies (excluding personal projects)
    const companyIds = new Set(
      experiencesData.experiences
        .map(exp => exp.clientId)
        .filter(clientId => {
          const client = clientsData.clients.find(c => c.id === clientId);
          return client && client.type === 'company';
        })
    );
    return companyIds.size;
  };

  const calculateTechnologies = () => {
    return technologiesData.technologies.length;
  };

  const calculateCertifications = () => {
    return certificationsData.certifications.length;
  };

  const yearsExperience = calculateYearsExperience();
  const majorCompanies = calculateMajorCompanies();
  const technologies = calculateTechnologies();
  const certifications = calculateCertifications();

  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a Senior Front-End Software Engineer with over {yearsExperience} years of experience 
              building responsive, accessible web applications. My expertise lies in React, TypeScript, 
              and modern frontend technologies, with a strong focus on user experience and performance.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I've worked with major companies like LinkedIn, Wells Fargo, and Quicken, 
              delivering high-impact solutions that improve user engagement and business metrics. 
              My approach combines technical excellence with accessibility best practices to create 
              inclusive digital experiences.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm passionate about mentoring junior developers, contributing to code reviews, 
              and staying current with emerging technologies. I hold certifications in Advanced React 
              and TypeScript, and I'm committed to continuous learning and professional growth.
            </p>
            
            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{yearsExperience}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{majorCompanies}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Major Companies</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{technologies}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{certifications}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Frontend Development with React & TypeScript
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Responsive & Accessible UI Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  State Management with Redux
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Testing & Quality Assurance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Code Review & Mentoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
