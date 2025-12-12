import React, { useState } from 'react';
import { useSupplyChain } from '../../context/SupplyChainContext';
import Navbar from '../common/Navbar';
import PageHeader from '../common/PageHeader';
import qrimg from '../../assets/qrcode.png'

const TrackPage = ({ currentUser, onLogout, navigateTo }) => {
  const { medicines } = useSupplyChain();
  const [trackingId, setTrackingId] = useState('');
  const [trackedMedicine, setTrackedMedicine] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const medicineId = parseInt(trackingId);
    const medicine = medicines.find(m => m.id === medicineId);

    if (medicine) {
      setTrackedMedicine(medicine);
      setShowDetails(true);
    } else {
      alert('Medicine not found!');
    }
  };

  const resetTracking = () => {
    setTrackingId('');
    setTrackedMedicine(null);
    setShowDetails(false);
  };

  const supplyChainStages = [
    { stage: 'Ordered', description: 'Medicine order placed', icon: '📋', step: 0 },
    { stage: 'Raw Material Supplied', description: 'Raw materials supplied to manufacturer', icon: '🏭', step: 1 },
    { stage: 'Manufactured', description: 'Medicine manufactured and quality checked', icon: '🔧', step: 2 },
    { stage: 'Distributed', description: 'Medicine distributed to pharmacies', icon: '🚚', step: 3 },
    { stage: 'Received by Pharmacy', description: 'Medicine received at pharmacy', icon: '💊', step: 4 },
    { stage: 'Sold to Patient', description: 'Medicine sold to end patient', icon: '👤', step: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <PageHeader 
        currentUser={currentUser} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
        title="Track Medicines"
        subtitle="Monitor the journey of medicines through the supply chain"
      />

      <div className="container mx-auto p-6">
        {!showDetails ? (
          // Track List View
          <div className="table-container p-6">
            <div className="mb-8">
              <h5 className="text-2xl font-bold mb-6 text-gray-800">All Medicines</h5>
              <div className="table-container">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="table-header">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicines.map(medicine => (
                      <tr key={medicine.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => {
                        setTrackingId(medicine.id.toString());
                        setTrackedMedicine(medicine);
                        setShowDetails(true);
                      }}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{medicine.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medicine.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{medicine.desc}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            medicine.stageNum === 0 ? 'bg-blue-100 text-blue-800' :
                            medicine.stageNum === 1 ? 'bg-yellow-100 text-yellow-800' :
                            medicine.stageNum === 2 ? 'bg-orange-100 text-orange-800' :
                            medicine.stageNum === 3 ? 'bg-purple-100 text-purple-800' :
                            medicine.stageNum === 4 ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {medicine.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-container p-6">
              <h5 className="text-xl font-semibold mb-4 text-gray-800">Enter Medicine ID to Track it</h5>
              <form onSubmit={handleTrackSubmit} className="flex gap-4">
                <input
                  type="number"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Medicine ID"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Track Medicine
                </button>
              </form>
            </div>
          </div>
        ) : (
          // Track Details View
          <div className="table-container p-6">
            {/* Medicine Details */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Medicine Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><b>Medicine ID:</b> <span className="text-blue-600 font-mono">{trackedMedicine.id}</span></p>
                  <p><b>Name:</b> <span className="text-gray-800">{trackedMedicine.name}</span></p>
                </div>
                <div>
                  <p><b>Description:</b> <span className="text-gray-800">{trackedMedicine.desc}</span></p>
                  <p><b>Current Stage:</b> 
                    <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${
                      trackedMedicine.stageNum === 0 ? 'bg-blue-500 text-white' :
                      trackedMedicine.stageNum === 1 ? 'bg-yellow-500 text-white' :
                      trackedMedicine.stageNum === 2 ? 'bg-orange-500 text-white' :
                      trackedMedicine.stageNum === 3 ? 'bg-purple-500 text-white' :
                      trackedMedicine.stageNum === 4 ? 'bg-green-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {trackedMedicine.stage}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Supply Chain Flow */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-6 text-gray-800">Supply Chain Journey</h4>
              <div className="space-y-4">
                {supplyChainStages.map((stage, index) => (
                  <div
                    key={stage.stage}
                    className={`flex items-center p-4 rounded-lg border-2 ${
                      trackedMedicine.stageNum >= stage.step
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    } ${trackedMedicine.stageNum === stage.step ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      trackedMedicine.stageNum >= stage.step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <span className="text-xl">{stage.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-semibold ${
                        trackedMedicine.stageNum >= stage.step ? 'text-green-800' : 'text-gray-500'
                      }`}>
                        {stage.stage}
                        {trackedMedicine.stageNum === stage.step && (
                          <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">Current</span>
                        )}
                      </h5>
                      <p className={`text-sm ${
                        trackedMedicine.stageNum >= stage.step ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                    {trackedMedicine.stageNum > stage.step && (
                      <div className="text-green-500 text-xl">✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Image Section */}
            <div className="mb-8 p-6 bg-white border-2 border-gray-200 rounded-xl">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Medicine QR Code</h4>
                <div className="flex flex-col items-center justify-center">
                  {/* QR Code Image */}
                  <div className="w-48 h-48 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <img 
                      src={qrimg} 
                      alt="Medicine QR Code" 
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-center text-gray-500">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-xs">img</div>
                      <div className="text-xs mt-1">Place image in public folder</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm max-w-md">
                    This QR code contains medicine verification data and can be scanned 
                    by supply chain participants to update status and verify authenticity.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetTracking}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                Track Another Medicine
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;