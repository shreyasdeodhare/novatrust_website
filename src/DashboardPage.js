import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-primary-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-primary-600 font-bold text-lg">NT</span>
            </div>
            <h1 className="text-xl font-bold">NovaTrust Dashboard</h1>
          </div>
          
          <button 
            className="px-4 py-2 bg-white text-primary-600 rounded-md hover:bg-primary-50"
            onClick={() => navigate('/')}
          >
            Sign Out
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="material-card p-6 md:col-span-3">
            <h2 className="text-xl font-bold text-neutral-800 mb-2">Welcome to Your Dashboard</h2>
            <p className="text-neutral-600">
              This is a placeholder dashboard for the NovaTrust Chit Fund application. In the future, this will display your chit fund information, payment history, and more.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="material-card p-6 flex flex-col">
            <div className="rounded-full w-12 h-12 bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-1">Total Balance</h3>
            <p className="text-3xl font-bold text-primary-600 mb-2">₹250,000</p>
            <p className="text-sm text-neutral-500">Updated today</p>
          </div>
          
          <div className="material-card p-6 flex flex-col">
            <div className="rounded-full w-12 h-12 bg-secondary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-1">Next Payment</h3>
            <p className="text-3xl font-bold text-secondary-600 mb-2">₹25,000</p>
            <p className="text-sm text-neutral-500">Due on 15 Aug 2023</p>
          </div>
          
          <div className="material-card p-6 flex flex-col">
            <div className="rounded-full w-12 h-12 bg-success-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-1">Progress</h3>
            <p className="text-3xl font-bold text-success-600 mb-2">60%</p>
            <p className="text-sm text-neutral-500">12 of 20 months completed</p>
          </div>
          
          {/* Recent Activity */}
          <div className="material-card p-6 md:col-span-3">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">15 Jul 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">Monthly Payment</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">₹25,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="material-chip-success">Paid</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">15 Jun 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">Monthly Payment</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">₹25,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="material-chip-success">Paid</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">15 May 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">Monthly Payment</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">₹25,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="material-chip-success">Paid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NovaTrust Chit Fund Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
