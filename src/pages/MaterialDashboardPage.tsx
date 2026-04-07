import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserChitFunds, getUserFundBalance } from '../services/fundService';
import MaterialDashboardLayout from '../components/dashboard/MaterialDashboardLayout';
import { 
  FiArrowUp, 
  FiArrowDown, 
  FiDollarSign, 
  FiCalendar, 
  FiClock,
  FiAlertCircle,
  FiPlusCircle,
  FiBarChart2,
  FiTrendingUp
} from 'react-icons/fi';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
  Filler,
} from 'chart.js';

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

const MaterialDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [chitFunds, setChitFunds] = useState<any[]>([]);
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [fundBalance, setFundBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch user's chit funds
        const { success, chitFunds, error } = await getUserChitFunds(user.id);
        
        if (success && chitFunds) {
          setChitFunds(chitFunds);
          
          // Select the first fund by default
          if (chitFunds.length > 0) {
            setSelectedFund(chitFunds[0]);
            
            // Fetch detailed fund balance
            const { success: balanceSuccess, balance, error: balanceError } = 
              await getUserFundBalance(user.id, chitFunds[0].id);
            
            if (balanceSuccess && balance) {
              setFundBalance(balance);
            } else if (balanceError) {
              setError((balanceError as any)?.message || 'Failed to fetch fund balance');
            }
          }
        } else if (error) {
          setError((error as any)?.message || 'Failed to fetch chit funds');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const handleFundChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!user) return;
    
    const fundId = e.target.value;
    const fund = chitFunds.find(f => f.id === fundId);
    
    if (fund) {
      setSelectedFund(fund);
      setLoading(true);
      
      try {
        // Fetch detailed fund balance
        const { success: balanceSuccess, balance, error: balanceError } = 
          await getUserFundBalance(user.id, fund.id);
        
        if (balanceSuccess && balance) {
          setFundBalance(balance);
        } else if (balanceError) {
          setError((balanceError as any)?.message || 'Failed to fetch fund balance');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Prepare chart data
  const paymentChartData = {
    labels: Array.from({ length: fundBalance?.completedMonths || 0 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Monthly Contribution',
        data: Array(fundBalance?.completedMonths || 0).fill(fundBalance?.monthlyContribution || 0),
        borderColor: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [5, 5],
      },
      {
        label: 'Net Monthly Payment',
        data: fundBalance?.netMonthlyPayments || [],
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Dividend',
        data: fundBalance?.dividends.map((d: any) => d.amount) || [],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
      }
    ]
  };
  
  const progressChartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [
          fundBalance?.completedMonths || 0,
          (fundBalance?.durationMonths || 0) - (fundBalance?.completedMonths || 0)
        ],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(209, 213, 219, 0.8)',
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(209, 213, 219, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);
          }
        }
      }
    },
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };
  
  if (loading) {
    return (
      <MaterialDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="material-progress-circular material-progress-circular-primary w-12 h-12"></div>
          <p className="ml-4 text-neutral-600">Loading dashboard data...</p>
        </div>
      </MaterialDashboardLayout>
    );
  }
  
  return (
    <MaterialDashboardLayout title="Dashboard">
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded mb-6 flex items-start">
          <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Fund selector */}
      {chitFunds.length > 0 ? (
        <div className="material-card mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <label htmlFor="fund-selector" className="block text-sm font-medium text-neutral-700 mb-1">
                Select Chit Fund
              </label>
              <select
                id="fund-selector"
                className="form-input max-w-xs"
                value={selectedFund?.id || ''}
                onChange={handleFundChange}
              >
                {chitFunds.map((fund) => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name} - ₹{fund.total_amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            
            <Link 
              to="/manage-fund" 
              className="btn-material-contained-primary flex items-center justify-center"
            >
              <FiPlusCircle className="mr-2 h-4 w-4" />
              Create New Fund
            </Link>
          </div>
        </div>
      ) : (
        <div className="material-card mb-6 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <FiPlusCircle className="h-8 w-8" />
            </div>
            <h3 className="h5 mb-2">No Chit Funds Found</h3>
            <p className="text-neutral-600 mb-6">You don't have any chit funds yet. Create or join one to get started.</p>
            <Link to="/manage-fund" className="btn-material-contained-primary">
              Create Your First Fund
            </Link>
          </div>
        </div>
      )}
      
      {selectedFund && fundBalance && (
        <>
          {/* Overview Cards */}
          <div className="material-grid-cols-4 mb-6">
            <div className="material-card p-6">
              <div className="flex items-start">
                <div className="rounded-full p-3 bg-primary-100 text-primary-600 mr-4">
                  <FiDollarSign className="h-6 w-6" />
                </div>
                <div>
                  <p className="caption text-neutral-500">Total Fund Value</p>
                  <h3 className="h4 text-neutral-900">₹{fundBalance.totalAmount.toLocaleString()}</h3>
                  <p className="caption text-neutral-500 mt-1">
                    Net: ₹{fundBalance.netChitAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="material-card p-6">
              <div className="flex items-start">
                <div className="rounded-full p-3 bg-secondary-100 text-secondary-600 mr-4">
                  <FiBarChart2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="caption text-neutral-500">Your Position</p>
                  <h3 className={`h4 ${fundBalance.netPosition >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {fundBalance.netPosition >= 0 ? '+' : ''}₹{Math.abs(fundBalance.netPosition).toLocaleString()}
                  </h3>
                  <p className="caption text-neutral-500 mt-1">
                    {fundBalance.netPosition >= 0 ? 'Profit' : 'Investment'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="material-card p-6">
              <div className="flex items-start">
                <div className="rounded-full p-3 bg-accent-100 text-accent-600 mr-4">
                  <FiCalendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="caption text-neutral-500">Progress</p>
                  <h3 className="h4 text-neutral-900">
                    {fundBalance.completedMonths} / {fundBalance.durationMonths}
                  </h3>
                  <p className="caption text-neutral-500 mt-1">
                    {Math.round(fundBalance.progressPercentage)}% Complete
                  </p>
                </div>
              </div>
            </div>
            
            <div className="material-card p-6">
              <div className="flex items-start">
                <div className="rounded-full p-3 bg-success-100 text-success-600 mr-4">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="caption text-neutral-500">Projected Final</p>
                  <h3 className={`h4 ${fundBalance.projectedFinalPosition >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {fundBalance.projectedFinalPosition >= 0 ? '+' : ''}₹{Math.abs(fundBalance.projectedFinalPosition).toLocaleString()}
                  </h3>
                  <p className="caption text-neutral-500 mt-1">
                    {fundBalance.projectedFinalPosition >= 0 ? 'Projected Profit' : 'Projected Loss'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Row */}
          <div className="material-grid-cols-2 mb-6">
            <div className="material-card">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="h6">Payment Analysis</h3>
              </div>
              <div className="p-4 h-80">
                <Line data={paymentChartData} options={chartOptions} />
              </div>
            </div>
            
            <div className="material-card">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="h6">Fund Progress</h3>
              </div>
              <div className="p-4 flex flex-col md:flex-row items-center">
                <div className="w-48 h-48 mb-4 md:mb-0">
                  <Doughnut data={progressChartData} options={doughnutOptions} />
                </div>
                <div className="md:ml-6 flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">
                        {fundBalance.completedMonths} of {fundBalance.durationMonths} months
                      </span>
                      <span className="text-sm font-medium text-neutral-700">
                        {Math.round(fundBalance.progressPercentage)}%
                      </span>
                    </div>
                    <div className="material-progress-linear">
                      <div 
                        className="material-progress-linear-value"
                        style={{ width: `${fundBalance.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Total Paid</p>
                      <p className="text-lg font-medium text-neutral-900">₹{fundBalance.totalPaid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Remaining</p>
                      <p className="text-lg font-medium text-neutral-900">₹{fundBalance.remainingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {fundBalance.hasWon ? (
                    <div className="mt-4 bg-success-50 border border-success-200 rounded p-2 text-sm text-success-700">
                      You won the auction in month {fundBalance.winMonth}
                    </div>
                  ) : (
                    <div className="mt-4 bg-primary-50 border border-primary-200 rounded p-2 text-sm text-primary-700">
                      You haven't won an auction yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="material-card mb-6">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h3 className="h6">Payment Details</h3>
              <Link to="/payments" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="material-table">
                <thead className="material-table-header">
                  <tr>
                    <th className="material-table-header-cell">Month</th>
                    <th className="material-table-header-cell">Monthly Contribution</th>
                    <th className="material-table-header-cell">Dividend</th>
                    <th className="material-table-header-cell">Net Payment</th>
                    <th className="material-table-header-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="material-table-body">
                  {fundBalance.dividends.map((dividend: any, index: number) => (
                    <tr key={index} className="material-table-row">
                      <td className="material-table-cell">Month {dividend.month_number}</td>
                      <td className="material-table-cell">₹{fundBalance.monthlyContribution.toLocaleString()}</td>
                      <td className="material-table-cell text-success-600">₹{dividend.amount.toLocaleString()}</td>
                      <td className="material-table-cell">₹{(fundBalance.netMonthlyPayments[index] || 0).toLocaleString()}</td>
                      <td className="material-table-cell">
                        <span className="material-chip-success">Paid</span>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Next payment row */}
                  {fundBalance.completedMonths < fundBalance.durationMonths && (
                    <tr className="material-table-row bg-neutral-50">
                      <td className="material-table-cell">Month {fundBalance.completedMonths + 1}</td>
                      <td className="material-table-cell">₹{fundBalance.monthlyContribution.toLocaleString()}</td>
                      <td className="material-table-cell text-neutral-400">--</td>
                      <td className="material-table-cell">₹{fundBalance.monthlyContribution.toLocaleString()}</td>
                      <td className="material-table-cell">
                        <span className="material-chip-warning">Upcoming</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Payment action */}
            <div className="p-4 border-t border-neutral-200 flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-600">
                  Next payment of <span className="font-medium">₹{fundBalance.monthlyContribution.toLocaleString()}</span> due on {new Date().toLocaleDateString()}
                </p>
              </div>
              <button className="btn-material-contained-primary">
                Make Payment
              </button>
            </div>
          </div>
          
          {/* Upcoming Auctions */}
          <div className="material-card">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h3 className="h6">Upcoming Auctions</h3>
              <Link to="/auctions" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-600 mb-4">
                <FiClock className="h-8 w-8" />
              </div>
              <h3 className="h6 mb-2">No Upcoming Auctions</h3>
              <p className="text-neutral-600 mb-6">There are no auctions scheduled at this time.</p>
              <button className="btn-material-outlined-primary">
                View Auction Calendar
              </button>
            </div>
          </div>
        </>
      )}
    </MaterialDashboardLayout>
  );
};

export default MaterialDashboardPage;
