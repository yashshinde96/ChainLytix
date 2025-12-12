import React from 'react';

const MedicineTable = ({ medicines, onTrack, onSupply }) => {
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
    <div className="table-container overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Medicine Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Stage
            </th>
            {(onTrack || onSupply) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                  {medicine.id}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-xl mr-3">💊</span>
                  <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{medicine.desc}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStageBadgeColor(medicine.stage)}`}>
                  {medicine.stage}
                </span>
              </td>
              {(onTrack || onSupply) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onTrack && (
                    <button
                      onClick={() => onTrack(medicine.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Track
                    </button>
                  )}
                  {onSupply && (
                    <button
                      onClick={() => onSupply(medicine.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Supply
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;