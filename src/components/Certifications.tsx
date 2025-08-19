import certificationsData from '../data/certifications.json';
import { Certification as CertificationType } from '../types';

const Certifications = () => {
  const certifications = certificationsData.certifications as CertificationType[];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
    return expiry <= threeMonthsFromNow && expiry > now;
  };

  const getStatusBadge = (expiryDate: string | null) => {
    if (!expiryDate) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
          No Expiry
        </span>
      );
    }
    
    if (isExpired(expiryDate)) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
          Expired
        </span>
      );
    }
    
    if (isExpiringSoon(expiryDate)) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
          Expiring Soon
        </span>
      );
    }
    
    return (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
        Active
      </span>
    );
  };

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning.
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Header with logo and status */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={certification.logo}
                      alt={`${certification.issuer} logo`}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {certification.issuer}
                      </h3>
                    </div>
                  </div>
                  {getStatusBadge(certification.expiryDate)}
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {certification.name}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {certification.description}
                </p>
              </div>
              
              {/* Details */}
              <div className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Credential ID:</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      {certification.credentialId}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Issued:</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {formatDate(certification.issueDate)}
                    </span>
                  </div>
                  
                  {certification.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                      <span className={`${
                        isExpired(certification.expiryDate) 
                          ? 'text-red-600 dark:text-red-400' 
                          : isExpiringSoon(certification.expiryDate)
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {formatDate(certification.expiryDate)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Action button */}
                <div className="mt-6">
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Verify Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
