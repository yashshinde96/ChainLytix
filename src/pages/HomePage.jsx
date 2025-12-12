import React from 'react';
import Navbar from '../components/common/Navbar';

const HomePage = ({ currentUser, onLogout, navigateTo }) => {
  const features = [
    {
      title: 'Register Roles',
      description: 'Manage supply chain participants',
      onClick: () => navigateTo('roles'),
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Order Medicines',
      description: 'Create new medicine orders',
      onClick: () => navigateTo('addmed'),
      icon: '💊',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Track Medicines',
      description: 'Monitor medicine journey',
      onClick: () => navigateTo('track'),
      icon: '📊',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Supply Medicines',
      description: 'Manage supply chain flow',
      onClick: () => navigateTo('supply'),
      icon: '🚚',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6 pt-20">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Pharmaceutical Supply Chain Manager
            </h1>
            <p className="text-gray-600 text-lg">
              Streamline your pharmaceutical supply chain with blockchain-powered tracking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.onClick}
                className={`p-6 text-left rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r ${feature.color} text-white`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-blue-100 text-sm mt-1">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Supply Chain Flow</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="text-center">
                <div className="font-semibold">Order</div>
                <div>📋</div>
              </span>
              <span className="text-xl">→</span>
              <span className="text-center">
                <div className="font-semibold">Raw Material</div>
                <div>🏭</div>
              </span>
              <span className="text-xl">→</span>
              <span className="text-center">
                <div className="font-semibold">Manufacture</div>
                <div>🔧</div>
              </span>
              <span className="text-xl">→</span>
              <span className="text-center">
                <div className="font-semibold">Distribute</div>
                <div>🚚</div>
              </span>
              <span className="text-xl">→</span>
              <span className="text-center">
                <div className="font-semibold">Pharmacy</div>
                <div>💊</div>
              </span>
              <span className="text-xl">→</span>
              <span className="text-center">
                <div className="font-semibold">Patient</div>
                <div>👤</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;