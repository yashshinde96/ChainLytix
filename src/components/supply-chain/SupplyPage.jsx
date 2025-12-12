import React, { useState } from 'react';
import { useSupplyChain } from '../../context/SupplyChainContext';
import Navbar from '../common/Navbar';
import PageHeader from '../common/PageHeader';

const SupplyPage = ({ currentUser, onLogout, navigateTo }) => {
  const { medicines, updateMedicineStage } = useSupplyChain();
  const [formData, setFormData] = useState({
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: ''
  });

  const supplySteps = [
    {
      id: 1,
      title: "Supply Raw Materials",
      description: "(Only a registered Raw Material Supplier can perform this step)",
      formKey: "step1",
      stage: "Raw Material Supplied",
      stageNum: 1
    },
    {
      id: 2,
      title: "Manufacture",
      description: "(Only a registered Manufacturer can perform this step)",
      formKey: "step2",
      stage: "Manufactured",
      stageNum: 2
    },
    {
      id: 3,
      title: "Distribute",
      description: "(Only a registered Distributor can perform this step)",
      formKey: "step3",
      stage: "Distributed",
      stageNum: 3
    },
    {
      id: 4,
      title: "Pharmacy Received",
      description: "(Only a registered Pharmacy can perform this step)",
      formKey: "step4",
      stage: "Received by Pharmacy",
      stageNum: 4
    },
    {
      id: 5,
      title: "Mark as Sold to Patient",
      description: "(Only a registered Pharmacy can perform this step)",
      formKey: "step5",
      stage: "Sold to Patient",
      stageNum: 5
    }
  ];

  const handleSupplyStep = (e, step) => {
    e.preventDefault();
    const medicineId = parseInt(formData[step.formKey]);
    const medicine = medicines.find(m => m.id === medicineId);

    if (!medicine) {
      alert('Medicine not found!');
      return;
    }

    if (medicine.stageNum !== step.stageNum - 1) {
      alert(`Medicine must be at stage ${step.stageNum - 1} before moving to stage ${step.stageNum}`);
      return;
    }

    updateMedicineStage(medicineId, step.stage, step.stageNum);
    alert(`Medicine ${medicineId} moved to ${step.stage} stage!`);
    setFormData(prev => ({ ...prev, [step.formKey]: '' }));
  };

  const handleInputChange = (stepKey, value) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <PageHeader 
        currentUser={currentUser} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
        title="Supply Chain Management"
        subtitle="Manage the flow of medicines through the supply chain"
      />

      <div className="container mx-auto p-6">
        {/* Supply Chain Flow Overview */}
        <div className="table-container p-6 mb-8">
          <h6 className="text-lg font-semibold mb-4 text-gray-800">Supply Chain Flow</h6>
          <p className="text-gray-600 mb-4">
            Medicine Order → Raw Material Supplier → Manufacturer → Distributor → Pharmacy → Patient
          </p>
          
          {/* Flow Visualization */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            {['Ordered', 'Raw Material', 'Manufactured', 'Distributed', 'Pharmacy', 'Patient'].map((stage, index) => (
              <div key={stage} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <span className="text-lg">{['📋', '🏭', '🔧', '🚚', '💊', '👤'][index]}</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">{stage}</span>
              </div>
            ))}
          </div>

          {/* Medicines Table */}
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Medicine ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {medicines.map(medicine => (
                  <tr key={medicine.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{medicine.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{medicine.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{medicine.desc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        medicine.stageNum === 0 ? 'bg-blue-500 text-white' :
                        medicine.stageNum === 1 ? 'bg-yellow-500 text-white' :
                        medicine.stageNum === 2 ? 'bg-orange-500 text-white' :
                        medicine.stageNum === 3 ? 'bg-purple-500 text-white' :
                        medicine.stageNum === 4 ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
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

        {/* Supply Steps */}
        {supplySteps.map((step) => (
          <div key={step.id} className="table-container p-6 mb-6">
            <h5 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h5>
            <p className="text-gray-600 text-sm mb-4">{step.description}</p>
            <form onSubmit={(e) => handleSupplyStep(e, step)} className="flex gap-4">
              <input
                type="number"
                value={formData[step.formKey]}
                onChange={(e) => handleInputChange(step.formKey, e.target.value)}
                placeholder="Enter Medicine ID"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                {step.title.split(' ')[0]}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyPage;