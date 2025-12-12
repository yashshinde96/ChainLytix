import React from 'react';

const Navbar = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      onLogout();
    }
  };

  return (
    <nav className="navbar-gradient fixed top-0 left-0 right-0 z-50 shadow-lg py-4 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            ⚕ ChainLytix
          </span>
          <span className="text-xs text-blue-100 font-medium tracking-wide hidden sm:inline">
            Pharmaceutical Supply Chain Intelligence
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">
            👤 {currentUser}
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;