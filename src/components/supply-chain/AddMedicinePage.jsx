import React, { useState } from 'react';
import { useSupplyChain } from '../../context/SupplyChainContext';
import Navbar from '../common/Navbar';
import PageHeader from '../common/PageHeader';

const AddMedicinePage = ({ currentUser, onLogout, navigateTo }) => {
  const { medicines, addMedicine } = useSupplyChain();
  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine({
      name: formData.name,
      desc: formData.desc
    });

    alert('Medicine ordered successfully!');
    setFormData({ name: '', desc: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getStageBadgeColor = (stage) => {
    switch (stage) {
      case 'Ordered': return 'bg-blue-100 text-blue-800';
      case 'Raw Material Supplied': return 'bg-yellow-100 text-yellow-800';
      case 'Manufactured': return 'bg-orange-100 text-orange-800';
      case 'Distributed': return 'bg-purple-100 text-purple-800';
      case 'Received by Pharmacy': return 'bg-green-100 text-green-800';
      case 'Sold to Patient': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen gradient-bg-addmed">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <PageHeader 
        currentUser={currentUser} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
        title="Order Medicines"
        subtitle="Add new medicine orders to the supply chain"
      />

      <div className="container mx-auto p-6 pt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
          {/* Order Form Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order New Medicine</h2>
              <p className="text-gray-600">Add medicine details to start the supply chain process</p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-2">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    id="medicineName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Paracetamol 500mg, Amoxicillin 250mg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="medicineDesc" className="block text-sm font-medium text-gray-700 mb-2">
                    Medicine Description *
                  </label>
                  <input
                    type="text"
                    id="medicineDesc"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    placeholder="e.g., Pain relief and fever reducer, Antibiotic capsules"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  📦 Place Medicine Order
                </button>
              </div>
            </form>
          </div>

          {/* Current Orders Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Current Orders</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {medicines.length} medicine{medicines.length !== 1 ? 's' : ''} ordered
              </span>
            </div>

            {medicines.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">💊</div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No medicines ordered yet</h4>
                <p className="text-gray-500">Start by placing your first medicine order above</p>
              </div>
            ) : (
              <div className="table-container overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Medicine Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Current Stage
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicines.map((medicine) => (
                      <tr key={medicine.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                            {medicine.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">💊</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">{medicine.desc}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStageBadgeColor(medicine.stage)}`}>
                            {medicine.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              navigateTo('track');
                              // In a real app, you would set the tracking ID in context or state
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Track
                          </button>
                          <button
                            onClick={() => navigateTo('supply')}
                            className="text-green-600 hover:text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Supply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {medicines.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{medicines.filter(m => m.stage === 'Ordered').length}</div>
                <div className="text-sm text-blue-800">Ordered</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{medicines.filter(m => m.stage === 'Raw Material Supplied').length}</div>
                <div className="text-sm text-yellow-800">Raw Materials</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{medicines.filter(m => m.stage === 'Manufactured').length}</div>
                <div className="text-sm text-orange-800">Manufactured</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{medicines.filter(m => m.stage === 'Distributed' || m.stage === 'Received by Pharmacy' || m.stage === 'Sold to Patient').length}</div>
                <div className="text-sm text-green-800">In Distribution</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMedicinePage;