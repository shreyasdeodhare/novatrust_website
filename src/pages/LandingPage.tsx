import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const schemes = [
  {
    title: 'Basic Chit Fund',
    description: 'Entry-level chit fund with affordable monthly subscription. Total value: ₹1,00,000, Duration: 20 months, Monthly subscription: ₹5,000.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹1,00,000',
    duration: '20 months',
    monthlyContribution: '₹5,000'
  },
  {
    title: 'Standard Chit Fund',
    description: 'Standard chit fund with balanced value and duration. Total value: ₹2,00,000, Duration: 25 months, Monthly subscription: ₹8,000.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹2,00,000',
    duration: '25 months',
    monthlyContribution: '₹8,000'
  },
  {
    title: 'Premium Chit Fund',
    description: 'Premium chit fund with higher value and longer duration. Total value: ₹3,00,000, Duration: 30 months, Monthly subscription: ₹10,000.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹3,00,000',
    duration: '30 months',
    monthlyContribution: '₹10,000'
  },
  {
    title: 'Gold Chit Fund',
    description: 'High-value chit fund for serious investors. Total value: ₹5,00,000, Duration: 40 months, Monthly subscription: ₹12,500.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹5,00,000',
    duration: '40 months',
    monthlyContribution: '₹12,500'
  },
  {
    title: 'Platinum Chit Fund',
    description: 'Platinum chit fund with higher monthly subscription. Total value: ₹5,00,000, Duration: 25 months, Monthly subscription: ₹20,000.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹5,00,000',
    duration: '25 months',
    monthlyContribution: '₹20,000'
  },
  {
    title: 'Diamond Chit Fund',
    description: 'High-value chit fund with longer duration. Total value: ₹10,00,000, Duration: 50 months, Monthly subscription: ₹20,000.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amount: '₹10,00,000',
    duration: '50 months',
    monthlyContribution: '₹20,000'
  }
];

const features = [
  { icon: '💎', title: 'Transparent', desc: 'Clear, open process for all members.' },
  { icon: '🤝', title: 'Trustworthy', desc: 'Your financial dreams, our trusted commitment.' },
  { icon: '📈', title: 'Growth', desc: 'Grow your savings with flexible plans.' },
  { icon: '🔒', title: 'Secure', desc: 'Your money is safe with us.' },
];

const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    // Calculator fields
    monthlyContribution: '',
    duration: '',
    bidAmount: '',
    winMonth: '',
    totalFundValue: '',
    totalInvestment: '',
    netProfit: '',
    roiPercentage: '',
    monthlyDividend: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [calculatorResults, setCalculatorResults] = useState({
    totalFundValue: '',
    totalInvestment: '',
    netProfit: '',
    roiPercentage: '',
    monthlyDividend: ''
  });
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        ...formData,
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: ''
      });
    }, 1500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculator function
  const calculateChitFund = () => {
    const monthly = parseInt(formData.monthlyContribution) || 0;
    const duration = parseInt(formData.duration) || 0;
    const bidAmount = parseInt(formData.bidAmount) || 0;
    const winMonth = parseInt(formData.winMonth) || 0;

    // Validation
    if (!monthly || !duration || !bidAmount || !winMonth) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    if (winMonth > duration) {
      alert('Win month cannot be greater than duration');
      return;
    }

    if (bidAmount > monthly * duration) {
      alert('Bid amount cannot be greater than total fund value');
      return;
    }

    // Calculate values
    const totalFundValue = monthly * duration;
    const totalInvestment = monthly * winMonth;
    const netProfit = bidAmount - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? ((netProfit / totalInvestment) * 100).toFixed(2) : '0';
    const remainingMonths = duration - winMonth;
    const monthlyDividend = remainingMonths > 0 ? Math.round((totalFundValue - bidAmount) / remainingMonths) : 0;

    // Update calculator results
    setCalculatorResults({
      totalFundValue: totalFundValue.toLocaleString(),
      totalInvestment: totalInvestment.toLocaleString(),
      netProfit: netProfit.toLocaleString(),
      roiPercentage: roiPercentage,
      monthlyDividend: monthlyDividend.toLocaleString()
    });
  };

  const handleShowTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTerms(true);
    setTimeout(() => scrollToSection('terms'), 100); // ensure section is rendered before scroll
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-blue-50 via-cyan-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <Header />
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block glass rounded-full px-6 py-2 mb-4">
              <span className="text-sm font-semibold">🚀 Most Trusted Chit Fund Platform</span>
            </div>
          
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              NovaTrust Chits Private Limited
            </h1>
            <p className="text-2xl mb-8 opacity-90">Your trusted partner for secure and transparent chit funds with live auctions!</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculator" className="inline-flex">
                <div className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-blue-200">
                  Try Calculator
                </div>
              </Link>
              <Link to="/live-auction" className="inline-flex">
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  Join Live Auction
                </div>
              </Link>
            </div>
            <div className="mt-8 flex justify-center md:justify-start">
            
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80" alt="NovaTrust Finance and Trust" className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-blue-200" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">Welcome to NovaTrust</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">NovaTrust Chits is committed to providing a safe, transparent, and rewarding chit fund experience. Our mission is to help you save, grow, and achieve your financial goals with ease and trust.</p>
          <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-3xl p-8 shadow-xl border border-blue-100">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="About Us" className="mx-auto w-32 h-32 object-cover rounded-full shadow-xl mb-6 ring-4 ring-blue-200" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">Empowering Your Financial Journey</h3>
            <p className="text-lg text-gray-600">Join our community of satisfied members who have achieved their financial dreams through our transparent chit fund schemes.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">✨ Benefits of NovaTrust</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Benefit Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Lowest Intermediation Cost</h3>
              <p className="text-gray-700 text-center text-sm">Cost of intermediation is the lowest in the industry, maximizing your returns.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Tax Free Dividend</h3>
              <p className="text-gray-700 text-center text-sm">Enjoy tax-free dividends on your chit fund investments.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Easy Accessibility</h3>
              <p className="text-gray-700 text-center text-sm">Access your funds and manage your investments with utmost ease.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">No Interest Hikes</h3>
              <p className="text-gray-700 text-center text-sm">No periodic interest hikes - your rates remain stable and predictable.</p>
            </div>

            

            

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Better Than Banks</h3>
              <p className="text-gray-700 text-center text-sm">Chit funds are easier, simpler, faster and cheaper than bank borrowing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest with Us Section */}
      <section id="why-invest" className="py-20 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center">🌟 Why Invest with Us?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Why Invest Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🕐</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Round-the-Clock Support</h3>
              <p className="text-gray-700 text-center text-sm">Customers can obtain their payments at any time with round-the-clock services.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Flexible Payments</h3>
              <p className="text-gray-700 text-center text-sm">Pay your chit amount on daily , weekly basis or monthly basis as per your convenience.</p>
            </div>
 
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🛡️</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">100% Money Guarantee</h3>
              <p className="text-gray-700 text-center text-sm">Complete guarantee for customers' money with full security.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">👁️</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Transparent Verification</h3>
              <p className="text-gray-700 text-center text-sm">Internal customers can verify company payments to chit winners.</p>
            </div>

            

            

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📝</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Hassle-Free Documentation</h3>
              <p className="text-gray-700 text-center text-sm">Minimal documentation requirements for a smooth experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Section */}
      <section id="schemes" className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">Our Chit Fund Schemes</h2>
          
          {/* Schemes Table */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 transform hover:scale-105 transition-transform duration-300 border border-teal-100">
            <div className="px-8 py-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Available Chit Fund Schemes</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white text-center py-4 md:py-8 px-4 md:px-8 font-bold text-lg md:text-xl rounded-t-2xl shadow-lg">
                        💰 MONTHLY SUBSCRIPTION
                      </th>
                      <th className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white text-center py-4 md:py-8 px-4 md:px-8 font-bold text-lg md:text-xl shadow-lg">
                        ⏰ DURATION (MONTHS)
                      </th>
                      <th className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white text-center py-4 md:py-8 px-4 md:px-8 font-bold text-lg md:text-xl rounded-t-2xl shadow-lg">
                        🎯 FUND VALUE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹5,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">20</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹1,00,000</td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹8,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">25</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹2,00,000</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹10,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">30</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹3,00,000</td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹12,500</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">40</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹5,00,000</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹20,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">25</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹5,00,000</td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">₹20,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">50</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹10,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Scheme Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-teal-100">
                <div className="h-48 bg-gradient-to-br from-teal-400 via-cyan-400 to-emerald-400 relative">
                  <img src={scheme.image} alt={scheme.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{scheme.title}</h3>
                    <p className="text-2xl font-bold text-yellow-300 mb-2">{scheme.amount}</p>
                    <p className="text-lg text-white">Duration: {scheme.duration}</p>
                    <p className="text-lg text-white">Monthly: {scheme.monthlyContribution}</p>
                  </div>
                </div>
                <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">🧮 Chit Fund Calculator</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
              <div className="px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">📊 Enter Details</h3>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">💰 Monthly Contribution (₹)</label>
                      <input 
                        type="number" 
                        name="monthlyContribution"
                        value={formData.monthlyContribution || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                        placeholder="e.g., 5000"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">⏰ Duration (Months)</label>
                      <input 
                        type="number" 
                        name="duration"
                        value={formData.duration || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                        placeholder="e.g., 20"
                        min="1"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">🎯 Expected Bid Amount (₹)</label>
                      <input 
                        type="number" 
                        name="bidAmount"
                        value={formData.bidAmount || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                        placeholder="e.g., 80000"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">📅 Month to Win Auction</label>
                      <input 
                        type="number" 
                        name="winMonth"
                        value={formData.winMonth || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                        placeholder="e.g., 10"
                        min="1"
                        max="100"
                      />
                    </div>
                    
                    <button 
                      onClick={calculateChitFund}
                      className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse text-lg"
                    >
                      🧮 Calculate Returns
                    </button>
                  </div>
                  
                  {/* Results Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">📈 Results</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">💰 Total Fund Value</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          ₹{formData.totalFundValue || '0'}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">💸 Total Investment</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                          ₹{formData.totalInvestment || '0'}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">📊 Net Profit/Loss</div>
                        <div className={`text-2xl font-bold ${parseInt(formData.netProfit || '0') >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          ₹{formData.netProfit || '0'}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">📈 ROI Percentage</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          {formData.roiPercentage || '0'}%
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-4 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">🎁 Monthly Dividend</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                          ₹{formData.monthlyDividend || '0'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-xl border border-blue-200">
                      <h4 className="font-bold text-gray-800 mb-2">💡 How it works:</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Total Fund Value = Monthly Contribution × Duration</li>
                        <li>• Total Investment = Monthly Contribution × Win Month</li>
                        <li>• Net Profit = Bid Amount - Total Investment</li>
                        <li>• ROI = (Net Profit ÷ Total Investment) × 100</li>
                        <li>• Monthly Dividend = (Total Fund Value - Bid Amount) ÷ Remaining Months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center">🚀 NovaTrust Loan Services</h2>
          <p className="text-xl text-center text-gray-700 mb-10 max-w-2xl mx-auto">Unlock your dreams with our range of modern loan services, tailored for every stage of life. Fast, transparent, and customer-first!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Home Loan & Mortgage Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏠</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Home & Mortgage Loan</h3>
              <p className="text-gray-700 text-center text-base">Make your dream home a reality with flexible, low-interest home and mortgage loans. Quick approval, minimal paperwork, and expert guidance every step of the way.</p>
            </div>
            {/* Car Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-cyan-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚗</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3 text-center">Car Loan</h3>
              <p className="text-gray-700 text-center text-base">Drive your dreams with our easy and affordable car loans. Enjoy fast disbursal, attractive rates, and a hassle-free process for new or used vehicles.</p>
            </div>
            {/* Education Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Education Loan</h3>
              <p className="text-gray-700 text-center text-base">Invest in your future with our education loans. Cover tuition, living expenses, and more with flexible repayment options and expert support for students and parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auction Section */}
      <section id="auction" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">🎯 Live Auction</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience transparent and exciting live chit fund auctions with real-time bidding.
            Our auctions are conducted fairly with complete transparency and secure payment processing.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h3>
              <p className="text-gray-600">
                Live auction platform is under development. Stay tuned for exciting auction experiences!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {features.map((f, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-3xl p-8 flex flex-col items-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-blue-100">
                <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions Section */}
      {showTerms && (
        <section id="terms" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">Terms and Conditions</h2>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
                <div className="px-8 py-10">
                  <p className="font-bold text-lg text-gray-700 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">Novatrust Chits Private Ltd Rules</h3>
                  <div className="space-y-6">
                    <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
                      <li>To become a member or a guarantor in Novatrust Chits Private Ltd, one must be at least 20 years old.</li>
                      <li>A person who wants to join the group must submit a photo, Aadhaar card, ration card, and PAN card, and can join by paying an advance amount of ₹1000.</li>
                      <li>A member can hold any number of tickets in a single group.</li>
                      <li>Members who join the chit group will be issued a registered Form No. 8 agreement for the chit value by Novatrust Chits Private Ltd, as per the 1982 Chit Fund Act.</li>
                      <li>Before the group begins, Novatrust Chits Private Ltd provides a list of 20 individuals registered with the government to the group members through both online and offline methods.</li>
                      <li>Novatrust Chits Private Ltd provides group members with a receipt for the fixed deposit made as collateral in the name of the group for its security, as per the Chit Fund Act, 1982.</li>
                      <li>Novatrust Chits Private Ltd will operate the group only after providing the required security to the registrar and obtaining approval from the joint chit registrar.</li>
                      <li>The installment amount must be paid one day before the chit date. Those who do so will be given a bonus ranging from ₹100 to ₹150.</li>
                      <li>Members must collect a receipt immediately after paying their installment. If they claim to have paid without a receipt, the company will not be held responsible.</li>
                      <li>If a chit group member wishes to receive the chit amount within six months, they must inform the company before joining the group. If they wish to receive it after seven months, they must give at least one month's prior notice.</li>
                      <li>New members joining the chit group must have a minimum CIBIL score of 550.</li>
                      <li>To receive the chit amount, two guarantors are required: (A) a Novatrust Chits Private Ltd chit group member and (B) a government employee. The documents of both the member and the guarantors must be of the same type.</li>
                      <li>A member receiving the chit amount who provides the required deposit or registers a mortgage for the remaining months does not need to submit any additional documents or guarantees.</li>
                      <li>Members who wish to receive the chit amount after 12 months must provide some form of guarantee. For those receiving it after 15 months, submitting their own documents will be sufficient.</li>
                      <li>The member who is going to receive the chit amount can get the amount on the very next day after completing the required security procedures for the remaining monthly installments.</li>
                      <li>Novatrust Chits Private Ltd members can avail insurance for their chit value. The premium will be 1% of the chit value, and this offer is applicable to individuals between 20 and 50 years of age.</li>
                      <li>The foreman commission is 5% of the chit amount, and this commission is included in the monthly installment.</li>
                      <li>Novatrust Chits Private Ltd charges commission on the chit value of individual members, but does not charge commission on the total amount of the chit group.</li>
                      <li>The foreman commission and service charges cover the subscriber's investment security fee, government registration stamp duty, online service charges for daily and monthly installment payments, agreement fee for chit amount disbursement, and 24/7 website-based account statement maintenance service charges.</li>
                      <li>Documents to be submitted by the auction winning customer: Proof of ID, Proof of Address, Proof of Income, Detailed documents of own house and 3 bank cheque for security will be mandatory. Also 2 guarantors will be required and their documents will be the same.</li>
                      <li>If a member delays the payment of their pending chit installment within  15 days from the chit date, a 3% penalty must be paid. Similarly, if the delay extends to next 1days, a 2% penalty or interest will be charged.</li>
                      <li>If a member's cheque is bounced by the bank for any reason, a bounce charge of ₹500 will be collected.</li>
                      <li>If a member keeps their chit installment pending for up to 30 days from the chit date, they will not be eligible to receive the chit amount for the next five months.</li>
                      <li>If a member wishes to cancel their ticket and transfer it to a new subscriber, a 1% processing fee will be charged on the chit value.</li>
                      <li>If a member cancels their ticket and later joins a new group, they will be eligible to receive the chit amount only after six months.</li>
                      <li>As per the agreement between the company and the customer, if the chit installment remains unpaid for up to 30days from the chit date, the company has the right to cancel the member's ticket without their consent.</li>
                      <li>As per the agreement, if a member who has taken the chit amount fails to pay the chit installments for two consecutive months, they will not be eligible to receive any rebate amount for the remaining monthly installments.</li>
                      <li>If a member who has taken the chit amount fails to pay their pending dues for more than two months, legal action will be taken under the 1982 Chit Fund Act. The concerned subscriber and guarantors will be responsible for bearing all legal expenses.</li>
                      <li>After the chit group ends, the subscriber can collect all their related documents.</li>
                      <li>The company will not disclose any subscriber's transactions to any other person without the consent of the concerned subscriber.</li>
                      <li>All guarantees accepted by the Novatrust Chits Private Ltd management must be in written form only.</li>
                    </ol>
                  </div>
                  <div className="text-center mt-8">
                    <button onClick={() => setShowTerms(false)} className="text-blue-600 underline hover:text-emerald-600 font-semibold transition-colors duration-300">Hide Terms</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">Contact Us</h2>
          <div className="max-w-3xl mx-auto mb-12 text-center bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 rounded-3xl p-8 shadow-xl border border-blue-100 flex flex-col items-center justify-center">
            <p className="text-2xl text-gray-700 mb-4 font-semibold">NovaTrust Chits Pvt Ltd</p>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-lg text-gray-600 flex items-center"><span className="mr-2">📞</span> <span className="font-bold">7755996577</span></p>
              <p className="text-lg text-gray-600 flex items-center"><span className="mr-2">✉️</span> <span className="font-bold">info@novatrust.co.in</span></p>
              <p className="text-lg text-gray-600 flex items-center"><span className="mr-2">📍</span> Survey No. 28/P, Plot No. 33, 21 Leaves, Flat No. 702, Chh. Sambhajinagar (Aurangabad) - 431 001</p>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <div className="text-center py-12 bg-green-50 rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">Thank You!</h3>
                <p className="text-lg text-neutral-600 mb-8">Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white rounded-xl hover:from-blue-700 hover:via-cyan-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <input id="name" name="name" type="text" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all duration-300" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <input id="email" name="email" type="email" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all duration-300" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                      <div>
                      <input id="phone" name="phone" type="tel" className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all duration-300" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    </div>
                  <div>
                      <input id="subject" name="subject" type="text" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all duration-300" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                    </div>
                  </div>
                  <div>
                    <textarea id="message" name="message" rows={6} required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all duration-300" placeholder="Your message" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:via-cyan-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                </div>
                {/* Terms link below submit button */}
                <div className="text-center mt-4">
                  <a href="#terms" className="text-blue-600 underline hover:text-emerald-600 font-semibold transition-colors duration-300" onClick={handleShowTerms}>Read Terms and Conditions</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
