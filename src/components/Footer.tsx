const Footer = () => {
  return (
    <footer className="py-8 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <a 
            href="https://logo.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
            aria-label="Visit Logo.dev for logo resources (opens in new tab)"
          >
            Logos provided by Logo.dev
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
