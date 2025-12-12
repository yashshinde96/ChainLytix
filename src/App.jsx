import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { SupplyChainProvider } from './context/SupplyChainContext';
import AppRoutes from './components/auth/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <SupplyChainProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </SupplyChainProvider>
    </AuthProvider>
  );
}

export default App;