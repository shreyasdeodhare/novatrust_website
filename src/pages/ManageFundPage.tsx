import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createChitFund } from '../services/fundService';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

const ManageFundPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'join'
  
  // Create Fund Form State
  const [fundName, setFundName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [startDate, setStartDate] = useState('');
  const [errors, setErrors] = useState<{
    fundName?: string;
    totalAmount?: string;
    durationMonths?: string;
    startDate?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Join Fund Form State
  const [fundCode, setFundCode] = useState('');
  const [joinErrors, setJoinErrors] = useState<{
    fundCode?: string;
    general?: string;
  }>({});
  const [isJoining, setIsJoining] = useState(false);
  const [joinSuccessMessage, setJoinSuccessMessage] = useState('');
  
  const validateCreateForm = () => {
    const newErrors: {
      fundName?: string;
      totalAmount?: string;
      durationMonths?: string;
      startDate?: string;
    } = {};
    
    if (!fundName) {
      newErrors.fundName = 'Fund name is required';
    }
    
    if (!totalAmount) {
      newErrors.totalAmount = 'Total amount is required';
    } else if (isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
      newErrors.totalAmount = 'Total amount must be a positive number';
    }
    
    if (!durationMonths) {
      newErrors.durationMonths = 'Duration is required';
    } else if (isNaN(Number(durationMonths)) || Number(durationMonths) <= 0 || !Number.isInteger(Number(durationMonths))) {
      newErrors.durationMonths = 'Duration must be a positive integer';
    }
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateJoinForm = () => {
    const newErrors: { fundCode?: string } = {};
    
    if (!fundCode) {
      newErrors.fundCode = 'Fund code is required';
    } else if (fundCode.length !== 8) {
      newErrors.fundCode = 'Fund code must be 8 characters';
    }
    
    setJoinErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCreateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      // Calculate monthly contribution
      const monthlyContribution = Math.round(Number(totalAmount) / Number(durationMonths));
      
      const fundData = {
        name: fundName,
        total_amount: Number(totalAmount),
        duration_months: Number(durationMonths),
        monthly_contribution: monthlyContribution,
        start_date: startDate,
        created_by: user?.id || '',
      };
      
      // In a real app, this would create the fund in your database
      // For demo, we'll simulate a successful creation
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`Chit fund "${fundName}" created successfully! Fund code: FUND1234`);
      
      // Reset form
      setFundName('');
      setTotalAmount('');
      setDurationMonths('');
      setStartDate('');
    } catch (error: any) {
      setErrors({ general: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateJoinForm()) return;
    
    setIsJoining(true);
    setJoinErrors({});
    setJoinSuccessMessage('');
    
    try {
      // In a real app, this would join the fund in your database
      // For demo, we'll simulate a successful join
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJoinSuccessMessage(`Successfully joined the chit fund with code ${fundCode}`);
      
      // Reset form
      setFundCode('');
    } catch (error: any) {
      setJoinErrors({ general: error.message || 'An unexpected error occurred' });
    } finally {
      setIsJoining(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Chit Funds</h1>
            <p className="text-gray-600">Create a new chit fund or join an existing one.</p>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'create'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('create')}
              >
                Create New Fund
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'join'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('join')}
              >
                Join Existing Fund
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'create' ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Create a New Chit Fund</h2>
                  
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                      {errors.general}
                    </div>
                  )}
                  
                  {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                      {successMessage}
                    </div>
                  )}
                  
                  <form onSubmit={handleCreateSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label htmlFor="fundName" className="form-label">
                          Fund Name
                        </label>
                        <input
                          id="fundName"
                          type="text"
                          className={`input ${errors.fundName ? 'border-red-500' : ''}`}
                          placeholder="Enter fund name"
                          value={fundName}
                          onChange={(e) => setFundName(e.target.value)}
                        />
                        {errors.fundName && <p className="form-error">{errors.fundName}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="totalAmount" className="form-label">
                          Total Amount (₹)
                        </label>
                        <input
                          id="totalAmount"
                          type="number"
                          className={`input ${errors.totalAmount ? 'border-red-500' : ''}`}
                          placeholder="Enter total amount"
                          value={totalAmount}
                          onChange={(e) => setTotalAmount(e.target.value)}
                        />
                        {errors.totalAmount && <p className="form-error">{errors.totalAmount}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="durationMonths" className="form-label">
                          Duration (Months)
                        </label>
                        <input
                          id="durationMonths"
                          type="number"
                          className={`input ${errors.durationMonths ? 'border-red-500' : ''}`}
                          placeholder="Enter duration in months"
                          value={durationMonths}
                          onChange={(e) => setDurationMonths(e.target.value)}
                        />
                        {errors.durationMonths && <p className="form-error">{errors.durationMonths}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="startDate" className="form-label">
                          Start Date
                        </label>
                        <input
                          id="startDate"
                          type="date"
                          className={`input ${errors.startDate ? 'border-red-500' : ''}`}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        {errors.startDate && <p className="form-error">{errors.startDate}</p>}
                      </div>
                    </div>
                    
                    {durationMonths && totalAmount && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Fund Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-lg font-semibold">₹{Number(totalAmount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-lg font-semibold">{durationMonths} months</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Monthly Contribution</p>
                            <p className="text-lg font-semibold">
                              ₹{(Number(totalAmount) / Number(durationMonths)).toLocaleString(undefined, {
                                maximumFractionDigits: 0
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating Fund...' : 'Create Fund'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Join an Existing Chit Fund</h2>
                  
                  {joinErrors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                      {joinErrors.general}
                    </div>
                  )}
                  
                  {joinSuccessMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                      {joinSuccessMessage}
                    </div>
                  )}
                  
                  <form onSubmit={handleJoinSubmit}>
                    <div className="form-group">
                      <label htmlFor="fundCode" className="form-label">
                        Fund Code
                      </label>
                      <input
                        id="fundCode"
                        type="text"
                        className={`input ${joinErrors.fundCode ? 'border-red-500' : ''}`}
                        placeholder="Enter 8-character fund code"
                        value={fundCode}
                        onChange={(e) => setFundCode(e.target.value.toUpperCase())}
                        maxLength={8}
                      />
                      {joinErrors.fundCode && <p className="form-error">{joinErrors.fundCode}</p>}
                      <p className="text-sm text-gray-500 mt-1">
                        Enter the 8-character code provided by the fund creator
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isJoining}
                      >
                        {isJoining ? 'Joining Fund...' : 'Join Fund'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          
          {/* Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Chit Funds</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Creating a Chit Fund</h3>
                <p className="text-gray-600 mb-4">
                  When you create a chit fund, you become the administrator of the fund. You'll be responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Setting up the fund parameters (amount, duration)</li>
                  <li>Inviting members to join the fund</li>
                  <li>Conducting monthly auctions</li>
                  <li>Ensuring timely payments from all members</li>
                  <li>Distributing the pot to the auction winner</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Joining a Chit Fund</h3>
                <p className="text-gray-600 mb-4">
                  When you join a chit fund, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Make monthly contributions for the entire duration</li>
                  <li>Participate in monthly auctions if interested</li>
                  <li>Abide by the rules set by the fund administrator</li>
                  <li>Provide necessary documentation for KYC compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageFundPage;
