import React, { createContext, useState, useContext } from 'react';

const SupplyChainContext = createContext();

export const useSupplyChain = () => {
  const context = useContext(SupplyChainContext);
  if (!context) {
    throw new Error('useSupplyChain must be used within a SupplyChainProvider');
  }
  return context;
};

export const SupplyChainProvider = ({ children }) => {
  const [roles, setRoles] = useState({
    rms: [
      { id: 1, name: 'PharmaChem Suppliers', place: 'Mumbai, India', address: '0x123...abc' }
    ],
    man: [
      { id: 1, name: 'HealthCure Pharmaceuticals', place: 'Hyderabad, India', address: '0x456...def' }
    ],
    dis: [
      { id: 1, name: 'MediDistribute Inc.', place: 'Delhi, India', address: '0x789...ghi' }
    ],
    ret: [
      { id: 1, name: 'Apollo Pharmacy', place: 'Bangalore, India', address: '0xabc...jkl' }
    ]
  });

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', desc: 'Pain relief and fever reducer', stage: 'Distributed', stageNum: 3 },
    { id: 2, name: 'Amoxicillin 250mg', desc: 'Antibiotic capsules', stage: 'Manufactured', stageNum: 2 }
  ]);

  const addRole = (roleType, roleData) => {
    const newRole = {
      id: roles[roleType].length + 1,
      ...roleData
    };
    
    setRoles(prev => ({
      ...prev,
      [roleType]: [...prev[roleType], newRole]
    }));
  };

  const addMedicine = (medicineData) => {
    const newMedicine = {
      id: medicines.length + 1,
      ...medicineData,
      stage: 'Ordered',
      stageNum: 0
    };
    
    setMedicines(prev => [...prev, newMedicine]);
  };

  const updateMedicineStage = (medicineId, newStage, stageNum) => {
    setMedicines(prev => 
      prev.map(med => 
        med.id === medicineId 
          ? { ...med, stage: newStage, stageNum: stageNum }
          : med
      )
    );
  };

  const value = {
    roles,
    medicines,
    addRole,
    addMedicine,
    updateMedicineStage
  };

  return (
    <SupplyChainContext.Provider value={value}>
      {children}
    </SupplyChainContext.Provider>
  );
};