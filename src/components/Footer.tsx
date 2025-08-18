const Footer = () => {
  return (
    <footer className="py-8 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <a 
            href="https://logo.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Logos provided by Logo.dev
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
