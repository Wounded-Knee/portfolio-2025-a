"use client";

import { useDisplay } from '../hooks/useDisplay';
import { getLogoUrl } from '../utils/logo';
import { extractDomain } from '../utils/url';

const Footer = () => {
  const { isRetina, isDarkMode } = useDisplay();

  // Technology logos configuration
  const techLogos = [
    {
      id: 'nextjs',
      name: 'Next.js',
      domain: 'nextjs.org',
      url: 'https://nextjs.org/'
    },
    {
      id: 'react',
      name: 'React',
      domain: 'reactjs.org',
      url: 'https://reactjs.org/',
      // Override for React logo - logo.dev doesn't handle React logo well
      logoOverride: {
        light: '/logos/react-light.png',
        dark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
      }
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      domain: 'typescriptlang.org',
      url: 'https://www.typescriptlang.org/'
    },
    {
      id: 'tailwindcss',
      name: 'Tailwind CSS',
      domain: 'tailwindcss.com',
      url: 'https://tailwindcss.com/',
      // Override for Tailwind CSS logo - logo.dev doesn't handle Tailwind logo well
      logoOverride: {
        light: '/logos/tailwind-light.png',
        dark: '/logos/tailwind-light.png'
      }
    },
    {
      id: 'posthog',
      name: 'PostHog',
      domain: 'posthog.com',
      url: 'https://posthog.com/'
    },
    {
      id: 'aws',
      name: 'AWS',
      domain: 'aws.amazon.com',
      url: 'https://aws.amazon.com/',
      // Override for AWS logo - logo.dev doesn't handle AWS logo well
      logoOverride: {
        light: '/logos/aws.png',
        dark: '/logos/aws.png'
      }
    },
    {
      id: 'logo-dev',
      name: 'Logo.dev',
      domain: 'logo.dev',
      url: 'https://logo.dev/',
      customAriaLabel: 'Logos provided by Logo.dev'
    },
    {
      id: 'github',
      name: 'GitHub',
      domain: 'github.com',
      url: 'https://github.com/Wounded-Knee/portfolio-2025-a/',
      customAriaLabel: 'View source code on GitHub'
    }
  ];

  return (
    <footer className="py-8 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-3">Built with:</p>
            <div className="flex justify-center items-center space-x-4">
              {techLogos.map((tech) => {
                // Use override if available, otherwise use logo.dev
                const logoSrc = tech.logoOverride 
                  ? tech.logoOverride[isDarkMode ? 'dark' : 'light']
                  : getLogoUrl(tech.domain, 24, isDarkMode ? 'dark' : 'light', isRetina);
                
                // Generate aria-label consistently
                const ariaLabel = tech.customAriaLabel 
                  ? `${tech.customAriaLabel} (opens in new tab)`
                  : `${tech.name} (opens in new tab)`;
                
                return (
                  <a 
                    key={tech.id}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded group"
                    aria-label={ariaLabel}
                  >
                    <img 
                      src={logoSrc}
                      alt={tech.name} 
                      className="h-6 w-auto rounded grayscale hover:grayscale-0 focus:grayscale-0 transition-all duration-200"
                    />
                  </a>
                );
              })}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            <p>
              <a 
                href="https://www.w3.org/WAI/WCAG21/AA/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="WCAG 2.1 AA guidelines (opens in new tab)"
              >
                WCAG 2.1 AA
              </a>
              {' '}accessibility standards, featuring keyboard navigation, screen reader compatibility, 
              high contrast ratios, and semantic HTML structure.
            </p>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
