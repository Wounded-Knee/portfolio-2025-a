const Footer = () => {
  // Technology logos configuration - hardcoded monochrome logos
  const techLogos = [
    {
      id: 'nextjs',
      name: 'Next.js',
      logo: '/logos/monochrome/nextjs.svg',
      url: 'https://nextjs.org/'
    },
    {
      id: 'react',
      name: 'React',
      logo: '/logos/monochrome/react.svg',
      url: 'https://reactjs.org/'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      logo: '/logos/monochrome/typescript.svg',
      url: 'https://www.typescriptlang.org/'
    },
    {
      id: 'tailwindcss',
      name: 'Tailwind CSS',
      logo: '/logos/monochrome/tailwind.svg',
      url: 'https://tailwindcss.com/'
    },
    {
      id: 'aws',
      name: 'AWS',
      logo: '/logos/monochrome/aws.svg',
      url: 'https://aws.amazon.com/'
    },
    {
      id: 'logo-dev',
      name: 'Logo.dev',
      logo: '/logos/monochrome/logo.dev.svg',
      url: 'https://logo.dev/',
      customAriaLabel: 'Logos provided by Logo.dev'
    },
    {
      id: 'github',
      name: 'GitHub',
      logo: '/logos/monochrome/github.svg',
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
                      src={tech.logo}
                      alt={tech.name} 
                      className="h-6 w-auto rounded opacity-50 invert-0 dark:invert hover:opacity-100 transition-all duration-200"
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
