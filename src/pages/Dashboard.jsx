import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const getDashboardTitle = () => {
    if (!user) return 'Dashboard';
    const role = (user.role?.name || '').toLowerCase();
    if (role === 'super admin') return 'Super Admin Dashboard';
    if (role === 'metro') return 'Metro Dashboard';
    if (role === 'sub council') return 'Sub Council Dashboard';
    if (role === 'zone') return 'Zonal Dashboard';
    if (role === 'user') return 'User Dashboard';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getDashboardTitle()}</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name || 'Member'}!</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">This is a placeholder dashboard. Module widgets will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


