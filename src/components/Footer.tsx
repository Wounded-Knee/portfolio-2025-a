const Footer = () => {
  // Technology logos configuration - hardcoded monochrome logos
  const techLogos = [
    {
      id: 'nextjs',
      name: 'Next.js',
      logo: '/logos/monochrome/nextjs.svg',
      url: 'https://nextjs.org/',
      customAriaLabel: 'Built with Next.js'
    },
    {
      id: 'react',
      name: 'React',
      logo: '/logos/monochrome/react.svg',
      url: 'https://reactjs.org/',
      customAriaLabel: 'Built with React'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      logo: '/logos/monochrome/typescript.svg',
      url: 'https://www.typescriptlang.org/',
      customAriaLabel: 'Typed with TypeScript'
    },
    {
      id: 'tailwindcss',
      name: 'Tailwind CSS',
      logo: '/logos/monochrome/tailwind.svg',
      url: 'https://tailwindcss.com/',
      customAriaLabel: 'Styled with Tailwind CSS'
    },
    {
      id: 'aws',
      name: 'AWS',
      logo: '/logos/monochrome/aws.svg',
      url: 'https://aws.amazon.com/',
      customAriaLabel: 'Hosted on AWS S3 and CloudFront'
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
    },
    {
      id: 'wcag',
      name: 'WCAG 2.1 AA',
      logo: '/logos/monochrome/wcag.svg',
      url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
      customAriaLabel: 'WCAG 2.1 AA'
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
                    title={ariaLabel}
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
