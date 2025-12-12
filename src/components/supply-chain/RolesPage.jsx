import React, { useState } from 'react';
import { useSupplyChain } from '../../context/SupplyChainContext';
import Navbar from '../common/Navbar';
import PageHeader from '../common/PageHeader';

const RolesPage = ({ currentUser, onLogout, navigateTo }) => {
  const { roles, addRole } = useSupplyChain();
  const [formData, setFormData] = useState({
    roleType: 'rms',
    address: '',
    name: '',
    place: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRole(formData.roleType, {
      name: formData.name,
      place: formData.place,
      address: formData.address
    });

    alert('Role registered successfully!');
    setFormData({ roleType: 'rms', address: '', name: '', place: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderTable = (data, title) => (
    <div className="mb-8">
      <h5 className="text-lg font-semibold mb-4 text-gray-800">{title}</h5>
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ethereum Address</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(role => (
              <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.place}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{role.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <PageHeader 
        currentUser={currentUser} 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
        title="Assign Roles"
        subtitle="Manage supply chain participants and their roles"
      />

      <div className="container mx-auto p-6">
        {/* Registration Form */}
        <div className="table-container p-6 mb-8">
          <h4 className="text-xl font-semibold mb-6 text-gray-800">Register New Role</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Type</label>
                <select
                  name="roleType"
                  value={formData.roleType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="rms">Raw Material Supplier</option>
                  <option value="man">Manufacturer</option>
                  <option value="dis">Distributor</option>
                  <option value="ret">Pharmacy/Retailer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ethereum Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Organization name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Based in"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Register Role
            </button>
          </form>
        </div>

        {/* Registered Roles */}
        <div className="table-container p-6">
          <h4 className="text-2xl font-bold mb-8 text-gray-800">Registered Roles</h4>
          {renderTable(roles.rms, "Raw Material Suppliers")}
          {renderTable(roles.man, "Manufacturers")}
          {renderTable(roles.dis, "Distributors")}
          {renderTable(roles.ret, "Pharmacies/Retailers")}
        </div>
      </div>
    </div>
  );
};

export default RolesPage;