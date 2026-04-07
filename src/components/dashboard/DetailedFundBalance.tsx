import React from 'react';

interface FundBalance {
  total_contributed: number;
  total_received: number;
  current_balance: number;
  pending_amount: number;
}

interface DetailedFundBalanceProps {
  balance: FundBalance;
}

const DetailedFundBalance: React.FC<DetailedFundBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Fund Balance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 mb-1">Total Contributed</p>
          <p className="text-xl font-bold text-blue-900">₹{balance.total_contributed.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Total Received</p>
          <p className="text-xl font-bold text-green-900">₹{balance.total_received.toLocaleString()}</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600 mb-1">Current Balance</p>
          <p className="text-xl font-bold text-purple-900">₹{balance.current_balance.toLocaleString()}</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-sm text-orange-600 mb-1">Pending Amount</p>
          <p className="text-xl font-bold text-orange-900">₹{balance.pending_amount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Net Position:</span>
          <span className={`text-lg font-semibold ${
            balance.current_balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {balance.current_balance >= 0 ? '+' : ''}₹{balance.current_balance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedFundBalance; 