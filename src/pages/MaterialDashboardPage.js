import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock user data - in a real app, this would come from your API/backend
const mockUserData = {
  id: 'user123',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  joinDate: '2022-05-15',
  profileImage: null, // Would be a URL in a real app
};

// Mock chit fund data - in a real app, this would come from your API/backend
const mockChitFunds = [
  {
    id: 'fund1',
    name: 'Gold Chit Fund',
    totalAmount: 500000,
    durationMonths: 20,
    monthlyContribution: 25000,
    startDate: '2023-01-15',
    completedMonths: 8,
    totalPaid: 200000,
    remainingAmount: 300000,
    nextPaymentDate: '2023-09-15',
    status: 'active'
  },
  {
    id: 'fund2',
    name: 'Silver Chit Fund',
    totalAmount: 200000,
    durationMonths: 15,
    monthlyContribution: 13333,
    startDate: '2023-03-20',
    completedMonths: 6,
    totalPaid: 80000,
    remainingAmount: 120000,
    nextPaymentDate: '2023-09-20',
    status: 'active'
  }
];

// Mock payment history data
const mockPaymentHistory = {
  'fund1': [
    { id: 'p1', month: 8, date: '2023-08-15', amount: 25000, status: 'paid' },
    { id: 'p2', month: 7, date: '2023-07-15', amount: 25000, status: 'paid' },
    { id: 'p3', month: 6, date: '2023-06-15', amount: 25000, status: 'paid' },
    { id: 'p4', month: 5, date: '2023-05-15', amount: 25000, status: 'paid' },
    { id: 'p5', month: 4, date: '2023-04-15', amount: 25000, status: 'paid' },
    { id: 'p6', month: 3, date: '2023-03-15', amount: 25000, status: 'paid' },
    { id: 'p7', month: 2, date: '2023-02-15', amount: 25000, status: 'paid' },
    { id: 'p8', month: 1, date: '2023-01-15', amount: 25000, status: 'paid' },
  ],
  'fund2': [
    { id: 'p9', month: 6, date: '2023-08-20', amount: 13333, status: 'paid' },
    { id: 'p10', month: 5, date: '2023-07-20', amount: 13333, status: 'paid' },
    { id: 'p11', month: 4, date: '2023-06-20', amount: 13333, status: 'paid' },
    { id: 'p12', month: 3, date: '2023-05-20', amount: 13333, status: 'paid' },
    { id: 'p13', month: 2, date: '2023-04-20', amount: 13333, status: 'paid' },
    { id: 'p14', month: 1, date: '2023-03-20', amount: 13333, status: 'paid' },
  ]
};

// Mock upcoming payments data
const mockUpcomingPayments = {
  'fund1': [
    { id: 'up1', month: 9, dueDate: '2023-09-15', amount: 25000, status: 'due' },
    { id: 'up2', month: 10, dueDate: '2023-10-15', amount: 25000, status: 'upcoming' },
    { id: 'up3', month: 11, dueDate: '2023-11-15', amount: 25000, status: 'upcoming' },
  ],
  'fund2': [
    { id: 'up4', month: 7, dueDate: '2023-09-20', amount: 13333, status: 'due' },
    { id: 'up5', month: 8, dueDate: '2023-10-20', amount: 13333, status: 'upcoming' },
    { id: 'up6', month: 9, dueDate: '2023-11-20', amount: 13333, status: 'upcoming' },
  ]
};

const MaterialDashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUserData);
  const [chitFunds, setChitFunds] = useState(mockChitFunds);
  const [selectedFund, setSelectedFund] = useState(mockChitFunds[0]);
  const [payments, setPayments] = useState(mockPaymentHistory['fund1']);
  const [upcomingPayments, setUpcomingPayments] = useState(mockUpcomingPayments['fund1']);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'payments', 'analytics'

  // Calculate total savings across all funds
  const totalSavings = chitFunds.reduce((sum, fund) => sum + fund.totalPaid, 0);

  // Calculate total remaining amount across all funds
  const totalRemaining = chitFunds.reduce((sum, fund) => sum + fund.remainingAmount, 0);

  // Calculate next payment date (the earliest one)
  const nextPaymentDates = chitFunds.map(fund => new Date(fund.nextPaymentDate));
  const nextPaymentDate = new Date(Math.min(...nextPaymentDates));

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle fund selection
  const handleFundChange = (fundId) => {
    const fund = chitFunds.find(f => f.id === fundId);
    if (fund) {
      setSelectedFund(fund);
      setPayments(mockPaymentHistory[fundId] || []);
      setUpcomingPayments(mockUpcomingPayments[fundId] || []);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would call your logout API here
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} md:ml-0`}>
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <img src="/nt-logo-2024.svg" alt="NovaTrust Logo" className="w-10 h-10 rounded-full bg-primary-500 object-cover" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-neutral-900">NovaTrust Chits &  Finance Private Ltd</h1>
              <p className="text-xs text-neutral-500">Chits and Finance Pvt Ltd</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <span className="text-neutral-600 font-medium">{user.name.charAt(0)}</span>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-900">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {/* Main Navigation Links */}
          <div className="mb-6 pb-6 border-b border-neutral-200">
            <p className="text-xs uppercase text-neutral-500 font-medium mb-2 px-4">Main Navigation</p>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Schemes
                </Link>
              </li>
              <li>
                <Link to="/about-chit-funds" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  About Chit Funds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboard Navigation */}
          <div>
            <p className="text-xs uppercase text-neutral-500 font-medium mb-2 px-4">Dashboard</p>
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  My Funds
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Transactions
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Auctions
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                    NT
                  </div>
                  <h1 className="ml-2 text-lg font-bold text-neutral-900">NovaTrust Chits &  Finance Private Ltd </h1>                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                </div>

                <div className="relative">
                  <button className="flex items-center text-neutral-600 hover:text-neutral-900">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-neutral-600 font-medium">{user.name.charAt(0)}</span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="mt-2 border-t pt-2 hidden md:block">
              <nav className="flex space-x-8">
                <Link to="/" className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium">
                  Home
                </Link>
                <Link to="/about-us" className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium">
                  About Us
                </Link>
                <Link to="/schemes" className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium">
                  Schemes
                </Link>
                <Link to="/about-chit-funds" className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium">
                  About Chit Funds
                </Link>
                <Link to="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium">
                  Contact
                </Link>
                <Link to="/dashboard" className="text-primary-600 font-medium text-sm">
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600">Loading dashboard content...</p>
            </div>
          ) : (
            <>
              {/* Welcome section */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-neutral-600">Here's an overview of your chit funds and savings.</p>
              </div>

              {/* Overview cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Savings Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="rounded-full p-3 bg-primary-100 text-primary-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Total Savings</p>
                      <h3 className="text-2xl font-bold text-neutral-900">₹{totalSavings.toLocaleString()}</h3>
                      <p className="text-xs text-green-600 mt-1">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          {Math.round((totalSavings / (totalSavings + totalRemaining)) * 100)}% of total
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active Funds Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="rounded-full p-3 bg-secondary-100 text-secondary-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Active Funds</p>
                      <h3 className="text-2xl font-bold text-neutral-900">{chitFunds.length}</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {chitFunds.filter(fund => fund.status === 'active').length} active, {chitFunds.filter(fund => fund.status !== 'active').length} completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Payment Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="rounded-full p-3 bg-warning-100 text-warning-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Next Payment</p>
                      <h3 className="text-2xl font-bold text-neutral-900">
                        {nextPaymentDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {Math.ceil((nextPaymentDate - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remaining Amount Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="rounded-full p-3 bg-error-100 text-error-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Remaining Amount</p>
                      <h3 className="text-2xl font-bold text-neutral-900">₹{totalRemaining.toLocaleString()}</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Across all active funds
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fund selector */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <label htmlFor="fund-selector" className="block text-sm font-medium text-neutral-700 mb-1">
                      Select Chit Fund
                    </label>
                    <select
                      id="fund-selector"
                      className="w-full md:w-64 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={selectedFund?.id || ''}
                      onChange={(e) => handleFundChange(e.target.value)}
                    >
                      {chitFunds.map((fund) => (
                        <option key={fund.id} value={fund.id}>
                          {fund.name} - ₹{fund.totalAmount.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Join New Fund
                    </span>
                  </button>
                </div>
              </div>

              {/* Selected Fund Overview */}
              {selectedFund && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-neutral-900">{selectedFund.name}</h2>
                        <p className="text-neutral-600">Started on {new Date(selectedFund.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                        <p className="text-xl font-bold text-neutral-900">₹{selectedFund.totalAmount.toLocaleString()}</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">Monthly Contribution</p>
                        <p className="text-xl font-bold text-neutral-900">₹{selectedFund.monthlyContribution.toLocaleString()}</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">Duration</p>
                        <p className="text-xl font-bold text-neutral-900">{selectedFund.durationMonths} months</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">Next Payment Due</p>
                        <p className="text-xl font-bold text-neutral-900">
                          {new Date(selectedFund.nextPaymentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-neutral-700">
                          {selectedFund.completedMonths} of {selectedFund.durationMonths} months completed
                        </span>
                        <span className="text-sm font-medium text-neutral-700">
                          {Math.round((selectedFund.completedMonths / selectedFund.durationMonths) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: `${(selectedFund.completedMonths / selectedFund.durationMonths) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Total Paid</p>
                        <p className="text-xl font-bold text-neutral-900">₹{selectedFund.totalPaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Remaining Amount</p>
                        <p className="text-xl font-bold text-neutral-900">₹{selectedFund.remainingAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Remaining Months</p>
                        <p className="text-xl font-bold text-neutral-900">{selectedFund.durationMonths - selectedFund.completedMonths}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <p className="text-sm text-neutral-600 mb-4 sm:mb-0">
                        Your next payment of ₹{selectedFund.monthlyContribution.toLocaleString()} is due on {new Date(selectedFund.nextPaymentDate).toLocaleDateString()}.
                      </p>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MaterialDashboardPage;
