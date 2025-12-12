import React, { useState } from 'react';

const QRScanner = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const handleManualInput = (e) => {
    e.preventDefault();
    if (scannedData.trim()) {
      try {
        const parsedData = JSON.parse(scannedData);
        onScan(parsedData);
        setScannedData('');
      } catch (error) {
        alert('Invalid QR code data format');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">QR Code Scanner</h4>
      
      <div className="space-y-4">
        {/* Simulated Camera View */}
        <div className="bg-gray-900 rounded-lg p-8 text-center border-4 border-gray-700">
          <div className="text-white mb-4">📷 Camera View</div>
          <div className="text-gray-400 text-sm">
            {isScanning ? 'Scanning for QR codes...' : 'Camera not active'}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Note: This is a simulated scanner. In a real app, this would use device camera.
          </div>
        </div>

        {/* Manual Input Fallback */}
        <div className="border-t pt-4">
          <h5 className="font-medium text-gray-700 mb-2">Manual QR Data Input</h5>
          <form onSubmit={handleManualInput} className="flex gap-2">
            <input
              type="text"
              value={scannedData}
              onChange={(e) => setScannedData(e.target.value)}
              placeholder="Paste QR code data here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Verify
            </button>
          </form>
        </div>

        {/* Scanner Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              isScanning 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;