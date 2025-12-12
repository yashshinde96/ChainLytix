import React from 'react';

const PageHeader = ({ currentUser, onLogout, navigateTo, title, subtitle }) => {
  return (
    <div className="bg-white border-b border-gray-200 pt-20 px-6 py-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex-1">
            <span className="text-sm text-gray-600 font-mono">
              <b>Current Account:</b> 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <span>🏠</span>
              <span>HOME</span>
            </button>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        {title && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-2">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;