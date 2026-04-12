import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CalculatorPage: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [duration, setDuration] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [winMonth, setWinMonth] = useState('');
  const [results, setResults] = useState({
    totalFundValue: '',
    totalInvestment: '',
    netProfit: '',
    roiPercentage: '',
    monthlyDividend: ''
  });

  const calculate = () => {
    const monthly = parseInt(monthlyContribution) || 0;
    const months = parseInt(duration) || 0;
    const bid = parseInt(bidAmount) || 0;
    const win = parseInt(winMonth) || 0;

    if (!monthly || !months || !bid || !win || win > months) {
      alert('Please enter valid values and ensure your winning month is within duration.');
      return;
    }

    const totalFundValue = monthly * months;
    const totalInvestment = monthly * win;
    const netProfit = bid - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? ((netProfit / totalInvestment) * 100).toFixed(2) : '0';
    const remainingMonths = months - win;
    const monthlyDividend = remainingMonths > 0 ? Math.round((totalFundValue - bid) / remainingMonths) : 0;

    setResults({
      totalFundValue: totalFundValue.toLocaleString(),
      totalInvestment: totalInvestment.toLocaleString(),
      netProfit: netProfit.toLocaleString(),
      roiPercentage,
      monthlyDividend: monthlyDividend.toLocaleString()
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-violet-50 to-amber-50 pt-24 pb-20">
      <Header />
      <div className="flex-1 w-full px-4 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Chit Fund Calculator</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Estimate your fund return, cash flow and auction outcome with a simple, transparent calculator.</p>
          </div>
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-semibold shadow-lg hover:from-amber-500 hover:to-yellow-500 transition">
            Home Page
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Contribution (₹)</label>
                <input value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} type="number" placeholder="5000" className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (months)</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)} type="number" placeholder="20" className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Bid Amount (₹)</label>
                <input value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} type="number" placeholder="95000" className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Winning Month</label>
                <input value={winMonth} onChange={(e) => setWinMonth(e.target.value)} type="number" placeholder="5" className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" />
              </div>
              <button onClick={calculate} className="w-full rounded-full bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition">Calculate Return</button>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-indigo-700 to-amber-500 text-white p-8 shadow-2xl border border-amber-200">
            <h2 className="text-2xl font-semibold mb-4">Projected Outcome</h2>
            <div className="space-y-4">
              <div className="rounded-3xl bg-amber-100/40 p-5">
                <span className="block text-sm text-amber-700">Total Fund Value</span>
                <p className="text-3xl font-bold mt-2">₹{results.totalFundValue || '0'}</p>
              </div>
              <div className="rounded-3xl bg-amber-100/40 p-5">
                <span className="block text-sm text-amber-700">Investment Till Winning Month</span>
                <p className="text-3xl font-bold mt-2">₹{results.totalInvestment || '0'}</p>
              </div>
              <div className="rounded-3xl bg-amber-100/40 p-5">
                <span className="block text-sm text-amber-700">Net Profit / Discount</span>
                <p className="text-3xl font-bold mt-2">₹{results.netProfit || '0'}</p>
              </div>
              <div className="rounded-3xl bg-amber-100/40 p-5">
                <span className="block text-sm text-amber-700">ROI</span>
                <p className="text-3xl font-bold mt-2">{results.roiPercentage || '0'}%</p>
              </div>
              <div className="rounded-3xl bg-amber-100/40 p-5">
                <span className="block text-sm text-amber-700">Monthly Dividend Rate</span>
                <p className="text-3xl font-bold mt-2">₹{results.monthlyDividend || '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
