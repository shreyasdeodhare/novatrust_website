import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserChitFunds, getChitFundPayments, getUserPaymentSummary, getUserFundBalance } from '../services/fundService';
import { FiHome, FiPieChart, FiUsers, FiDollarSign, FiCalendar, FiSettings, FiLogOut, FiBell, FiSearch } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import DetailedFundBalance from '../components/dashboard/DetailedFundBalance';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [chitFunds, setChitFunds] = useState<any[]>([]);
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [paymentSummary, setPaymentSummary] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
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

            // Fetch payment summary for the selected fund
            const { success: summarySuccess, summary, error: summaryError } =
              await getUserPaymentSummary(user.id, chitFunds[0].id);

            if (summarySuccess && summary) {
              setPaymentSummary(summary);
            } else if (summaryError) {
              setError((summaryError as any)?.message || 'Failed to fetch payment summary');
            }

            // Fetch payments for the selected fund
            const { success: paymentsSuccess, payments, error: paymentsError } =
              await getChitFundPayments(chitFunds[0].id, user.id);

            if (paymentsSuccess && payments) {
              setPayments(payments);
            } else if (paymentsError) {
              setError((paymentsError as any)?.message || 'Failed to fetch payments');
            }

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

  const handleFundSelect = async (fund: any) => {
    if (!user) return;

    setSelectedFund(fund);
    setLoading(true);

    try {
      // Fetch payment summary for the selected fund
      const { success: summarySuccess, summary, error: summaryError } =
        await getUserPaymentSummary(user.id, fund.id);

      if (summarySuccess && summary) {
        setPaymentSummary(summary);
      } else if (summaryError) {
        setError((summaryError as any)?.message || 'Failed to fetch payment summary');
      }

      // Fetch payments for the selected fund
      const { success: paymentsSuccess, payments, error: paymentsError } =
        await getChitFundPayments(fund.id, user.id);

      if (paymentsSuccess && payments) {
        setPayments(payments);
      } else if (paymentsError) {
        setError((paymentsError as any)?.message || 'Failed to fetch payments');
      }

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
  };

  const handleLogout = async () => {
    await logout();
  };

  // Prepare chart data
  const chartData = {
    labels: payments.map(payment => `Month ${payment.month_number}`),
    datasets: [
      {
        label: 'Payment Amount',
        data: payments.map(payment => payment.amount),
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Payments',
      },
    },
  };

  if (loading && !selectedFund) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Fund selector */}
          {chitFunds.length > 0 ? (
            <div className="mb-6">
              <label htmlFor="fund-selector" className="block text-sm font-medium text-gray-700 mb-1">
                Select Chit Fund
              </label>
              <select
                id="fund-selector"
                className="input"
                value={selectedFund?.id || ''}
                onChange={(e) => {
                  const fund = chitFunds.find(f => f.id === e.target.value);
                  if (fund) handleFundSelect(fund);
                }}
              >
                {chitFunds.map((fund) => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name} - ₹{fund.total_amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-6">
              You don't have any chit funds yet. <Link to="/manage-fund" className="font-medium underline">Create or join one</Link>.
            </div>
          )}

          {selectedFund && paymentSummary && (
            <>
              {/* Fund overview */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Fund Overview</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedFund.name}</h3>
                      <p className="text-gray-600">Started on {new Date(selectedFund.start_date).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-gray-900">₹{paymentSummary.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Monthly Contribution</p>
                      <p className="text-xl font-bold text-gray-900">₹{paymentSummary.monthlyContribution.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="text-xl font-bold text-gray-900">{paymentSummary.durationMonths} months</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Next Payment Due</p>
                      <p className="text-xl font-bold text-gray-900">
                        {new Date(selectedFund.start_date).setMonth(
                          new Date(selectedFund.start_date).getMonth() + paymentSummary.completedMonths
                        ) > Date.now()
                          ? new Date(
                              new Date(selectedFund.start_date).setMonth(
                                new Date(selectedFund.start_date).getMonth() + paymentSummary.completedMonths
                              )
                            ).toLocaleDateString()
                          : 'Overdue'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Fund Balance */}
              {fundBalance && (
                <div className="mb-6">
                  <DetailedFundBalance balance={fundBalance} />
                </div>
              )}

              {/* Payment progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Progress</h3>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {paymentSummary.completedMonths} of {paymentSummary.durationMonths} months
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round(paymentSummary.progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${paymentSummary.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                      <p className="text-xl font-bold text-gray-900">₹{paymentSummary.totalPaid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Remaining</p>
                      <p className="text-xl font-bold text-gray-900">₹{paymentSummary.remainingAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="btn btn-primary w-full">Make Payment</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>

                  {payments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {payments.slice(0, 5).map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                Month {payment.month_number}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {new Date(payment.payment_date).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                ₹{payment.amount.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  payment.status === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : payment.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {payments.length > 5 && (
                        <div className="mt-4 text-center">
                          <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                            View all payments
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No payment history available.</p>
                  )}
                </div>
              </div>

              {/* Payment chart */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h3>

                {payments.length > 0 ? (
                  <div className="h-80">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No payment data available for chart.</p>
                )}
              </div>

              {/* Upcoming auctions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Auctions</h3>

                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                  No upcoming auctions scheduled for this fund.
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
