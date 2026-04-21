import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const schemes = [
  {
    title: 'Basic Chit Fund',
    description: 'Entry-level chit fund with affordable monthly subscription. Total value: ₹1,00,000, Duration: 20 months, Monthly subscription: ₹5,000.',
    image: '/indian_family_happy.png',
    amount: '₹1,00,000',
    duration: '20 months',
    monthlyContribution: '₹5,000'
  },
  {
    title: 'Standard Chit Fund',
    description: 'Standard chit fund with balanced value and duration. Total value: ₹2,00,000, Duration: 25 months, Monthly subscription: ₹8,000.',
    image: '/indian_family_savings.png',
    amount: '₹2,00,000',
    duration: '25 months',
    monthlyContribution: '₹8,000'
  },
  {
    title: 'Premium Chit Fund',
    description: 'Premium chit fund with higher value and longer duration. Total value: ₹3,00,000, Duration: 30 months, Monthly subscription: ₹10,000.',
    image: '/indian_business_woman.png',
    amount: '₹3,00,000',
    duration: '30 months',
    monthlyContribution: '₹10,000'
  },
  {
    title: 'Gold Chit Fund',
    description: 'High-value chit fund for serious investors. Total value: ₹5,00,000, Duration: 40 months, Monthly subscription: ₹12,500.',
    image: '/indian_family_home.png',
    amount: '₹5,00,000',
    duration: '40 months',
    monthlyContribution: '₹12,500'
  },
  {
    title: 'Platinum Chit Fund',
    description: 'Platinum chit fund with higher monthly subscription. Total value: ₹5,00,000, Duration: 25 months, Monthly subscription: ₹20,000.',
    image: '/indian_investment_growth.png',
    amount: '₹5,00,000',
    duration: '25 months',
    monthlyContribution: '₹20,000'
  },
  {
    title: 'Diamond Chit Fund',
    description: 'High-value chit fund with longer duration. Total value: ₹10,00,000, Duration: 50 months, Monthly subscription: ₹20,000.',
    image: '/profit_growth_chart.png',
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
  const [currentSlide, setCurrentSlide] = useState(0);
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
    monthlyDividend: '',
    // New calculator fields
    monthSalary: 50000,
    emi: 5000,
    surplusIncome: 45000,
    tenure: 60,
    calculatorType: 'income'
  });
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [calculatorResults, setCalculatorResults] = useState({
    totalFundValue: '',
    totalInvestment: '',
    netProfit: '',
    roiPercentage: '',
    monthlyDividend: ''
  });
  const [showTerms, setShowTerms] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState('');

  const openApplyModal = (schemeName: string) => {
    setSelectedScheme(schemeName);
    setIsApplyModalOpen(true);
  };


  const heroSlides = [
    {
      title: "Government Verified Chit Fund",
      subtitle: "100% Secure, Transparent & Lawful",
      description: "We are proudly registered and verified by the government. Your investments are completely secure with full regulatory compliance.",
      image: "/indian_family_savings.png",
      cta: "Verify Us"
    },
    {
      title: "Happy Family, Happy Future",
      subtitle: "Secure your family's future with NovaTrust Chits",
      description: "Savings for a happier family and a brighter tomorrow. Start your journey today.",
      image: "/indian_family_home.png",
      cta: "Join Now"
    },
    {
      title: "Fuel Your Business With NovaTrust Chits",
      subtitle: "Expand and diversify your business with convenient access to funds",
      description: "Pay online and grow your business with our hassle-free borrowing solutions.",
      image: "/indian_business_woman.png",
      cta: "Get Started"
    },
    {
      title: "NovaTrust Chits For Hassle-Free Borrowing",
      subtitle: "See your dreams take shape tomorrow",
      description: "Bid for the prize money and get instant funds when you need them.",
      image: "/indian_family_happy.png",
      cta: "Explore Options"
    },
    {
      title: "Compulsory Saving & Investment With Us",
      subtitle: "Smart saving for a happy future",
      description: "Your investment works early for you with our secure chit fund schemes.",
      image: "/indian_family_savings.png",
      cta: "Start Saving"
    },
    {
      title: "Become Our Agent",
      subtitle: "Empower Yourself & Materialize Your Dreams",
      description: "Join NovaTrust Chits as a consultant. Empower yourself financially while helping your community save and grow with trusted chit funds.",
      image: "/indian_business_woman.png",
      cta: "Join Us"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name.includes('Salary') || name.includes('emi') || name.includes('surplus') || name.includes('tenure') ? parseInt(value) : value });
  };


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // New calculator function based on Muthoot
  const calculateNewChitFund = () => {
    const { emi, surplusIncome, tenure, calculatorType } = formData;

    let applicableEMI = 0;
    let maxChitValue = 0;

    if (calculatorType === 'income') {
      // Income based: EMI = (Surplus Income * Tenure) / (Tenure + 1) or similar logic
      // Simplified calculation
      applicableEMI = Math.round(surplusIncome / 2); // Rough estimate
      maxChitValue = applicableEMI * tenure;
    } else if (calculatorType === 'instalment') {
      // Instalment based
      applicableEMI = emi;
      maxChitValue = emi * tenure;
    } else if (calculatorType === 'amount') {
      // Amount based - need to adjust
      maxChitValue = surplusIncome * 10; // Rough
      applicableEMI = Math.round(maxChitValue / tenure);
    }

    setFormData({
      ...formData,
      totalFundValue: maxChitValue.toLocaleString(),
      monthlyContribution: applicableEMI.toString()
    });
  };

  const handleShowTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTerms(true);
    setTimeout(() => scrollToSection('terms'), 100); // ensure section is rendered before scroll
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-surface relative overflow-hidden">
      <Header />
      {/* Hero Carousel Section */}
      <section id="hero" className="relative overflow-hidden min-h-[500px] pt-32 lg:pt-40 pb-10 lg:pb-16 bg-[#ecfdf5]">
        <div className="absolute inset-0 bg-[#ecfdf5] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/95 via-slate-100/70 to-blue-50/50"></div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-4 min-h-[500px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 will-change-opacity ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div className="w-full min-h-[500px] flex flex-col lg:flex-row items-center justify-center relative z-10 gap-8 py-8 transform-gpu">
                <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
                  <div className="inline-block rounded-full px-6 py-2 mb-4 bg-[#056160]/10 border border-[#D4A574] shadow-sm">
                    <span className="text-sm font-semibold text-[#056160]">🚀 Most Trusted Chit Fund Platform</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-[#056160]">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg mb-6 text-[#056160] font-medium line-clamp-2 md:line-clmap-none">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Link to="/calculator" className="inline-flex">
                      <div className="bg-white text-[#056160] px-8 py-3 rounded-full font-bold shadow-xl hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                        {slide.cta}
                      </div>
                    </Link>
                    <Link to="/live-auction" className="inline-flex">
                      <div className="bg-gradient-to-r from-[#056160] to-[#044c4c] text-white px-8 py-3 rounded-full font-bold shadow-xl hover:from-[#044c4c] hover:to-slate-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                        Join Live Auction
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="overflow-hidden rounded-3xl border-4 border-[#D4A574] ring-1 ring-yellow-200 shadow-[0_20px_60px_rgba(212,165,116,0.2)] bg-white w-full max-w-[480px]"
                    style={{ aspectRatio: '3 / 2' }}>
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-[#D4A574]' : 'bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-6">Welcome to NovaTrust</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">NovaTrust Chits is committed to providing a safe, transparent, and rewarding chit fund experience. Our mission is to help you save, grow, and achieve your financial goals with ease and trust.</p>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4A574]">
            <img src="/profit_growth_chart.png" alt="Financial Growth" className="mx-auto w-32 h-32 object-cover rounded-full shadow-xl mb-6 ring-4 ring-yellow-300" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-4">Empowering Your Financial Journey</h3>
            <p className="text-lg text-gray-600">Join our community of satisfied members who have achieved their financial dreams through our transparent chit fund schemes.</p>
          </div>
        </div>
      </section>

      {/* What is a Chit Fund */}
      <section className="py-16 bg-blue-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="w-full px-4 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-6">What is a Chit Fund?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A Chit Fund is a traditional Indian financial instrument that seamlessly combines the benefits of <strong>saving</strong> and <strong>borrowing</strong>. In a chit fund, a group of individuals come together and contribute a fixed amount of money every month into a common pool.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Each month, this collected pool is auctioned out to the members. The member who bids the highest discount takes the money, which can be used for business growth, personal emergencies, or big purchases. The discount is then distributed among all members as a dividend, significantly reducing their next monthly contribution!
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700"><span className="text-[#056160] mr-3 text-xl">✅</span> Promotes disciplined compulsory savings</li>
                <li className="flex items-center text-gray-700"><span className="text-[#056160] mr-3 text-xl">✅</span> Easy access to credit without strict banking rules</li>
                <li className="flex items-center text-gray-700"><span className="text-[#056160] mr-3 text-xl">✅</span> Earn high dividends compared to bank deposits</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img src="/indian_family_savings.png" alt="Indian Family Savings" className="rounded-3xl shadow-2xl object-cover w-full h-[400px] border-4 border-white transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
        <div className="w-full px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-12 text-center">🔄 How NovaTrust Chits Work</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">1️⃣</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Join a Group</h3>
                <p className="text-gray-600">Become a member of a chit fund group with 20 members contributing monthly.</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">2️⃣</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Monthly Contributions</h3>
                <p className="text-gray-600">Pay your monthly installment along with other members to build the fund.</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">3️⃣</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Monthly Auction</h3>
                <p className="text-gray-600">Participate in transparent auctions to win the prize money each month.</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">4️⃣</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Receive Dividends</h3>
                <p className="text-gray-600">Earn monthly dividends on your contributions until the group completes.</p>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6">The Chit Cycle Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-bold text-[#056160] mb-2">Pooling</h4>
                  <p className="text-sm text-gray-600">20 members contribute monthly to create the chit amount.</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-[#044c4c] mb-2">Auction</h4>
                  <p className="text-sm text-gray-600">One member wins through bidding, taking a discount.</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-xl">
                  <h4 className="font-bold text-teal-800 mb-2">Distribution</h4>
                  <p className="text-sm text-gray-600">Prize money distributed, dividends paid to remaining members.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
        <div className="w-full px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-12 text-center">✨ Benefits of NovaTrust</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Benefit Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Lowest Intermediation Cost</h3>
              <p className="text-gray-700 text-center text-sm">Cost of intermediation is the lowest in the industry, maximizing your returns.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Tax Free Dividend</h3>
              <p className="text-gray-700 text-center text-sm">Enjoy tax-free dividends on your chit fund investments.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Easy Accessibility</h3>
              <p className="text-gray-700 text-center text-sm">Access your funds and manage your investments with utmost ease.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">No Interest Hikes</h3>
              <p className="text-gray-700 text-center text-sm">No periodic interest hikes - your rates remain stable and predictable.</p>
            </div>





            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Better Than Banks</h3>
              <p className="text-gray-700 text-center text-sm">Chit funds are easier, simpler, faster and cheaper than bank borrowing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest with Us Section */}
      <section id="why-invest" className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
        <div className="w-full px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-12 text-center">🌟 Why Invest with Us?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Why Invest Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🕐</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Round-the-Clock Support</h3>
              <p className="text-gray-700 text-center text-sm">Customers can obtain their payments at any time with round-the-clock services.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Flexible Payments</h3>
              <p className="text-gray-700 text-center text-sm">Pay your chit amount on daily , weekly basis or monthly basis as per your convenience.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🛡️</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">100% Money Guarantee</h3>
              <p className="text-gray-700 text-center text-sm">Complete guarantee for customers' money with full security.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">👁️</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Transparent Verification</h3>
              <p className="text-gray-700 text-center text-sm">Internal customers can verify company payments to chit winners.</p>
            </div>





            <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#D4A574] hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📝</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-3 text-center">Hassle-Free Documentation</h3>
              <p className="text-gray-700 text-center text-sm">Minimal documentation requirements for a smooth experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Section */}
      <section id="schemes" className="py-20 bg-[#ecfdf5]">
        <div className="px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-12 text-center">Our Chit Fund Schemes</h2>

          {/* Schemes Table */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 transform hover:scale-105 transition-transform duration-300 border border-[#D4A574]">
            <div className="px-8 py-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">Available Chit Fund Schemes</h3>

              <div className="overflow-x-auto rounded-2xl shadow-lg border border-[#D4A574]">
                <table className="min-w-full border-collapse overflow-hidden">
                  <thead className="bg-[#056160] text-white">
                    <tr>
                      <th className="text-center py-5 md:py-6 px-4 md:px-8 font-bold text-lg md:text-xl tracking-wide border-b-2 border-[#D4A574]">
                        💰 MONTHLY SUBSCRIPTION
                      </th>
                      <th className="text-center py-5 md:py-6 px-4 md:px-8 font-bold text-lg md:text-xl tracking-wide border-b-2 border-[#D4A574] border-l border-[#044c4c]/50">
                        ⏰ DURATION (MONTHS)
                      </th>
                      <th className="text-center py-5 md:py-6 px-4 md:px-8 font-bold text-lg md:text-xl tracking-wide border-b-2 border-[#D4A574] border-l border-[#044c4c]/50">
                        🎯 FUND VALUE
                      </th>
                      <th className="text-center py-5 md:py-6 px-4 md:px-8 font-bold text-lg md:text-xl tracking-wide border-b-2 border-[#D4A574] border-l border-[#044c4c]/50">
                        ⚡ ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gradient-to-r from-blue-50 to-slate-50 hover:from-blue-100 hover:to-slate-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹5,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">20</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹1,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Basic Chit Fund - ₹1,00,000')} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-teal-950 font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-amber-500/20">Apply Now</button>
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹8,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">25</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹2,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Standard Chit Fund - ₹2,00,000')} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-teal-950 font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-amber-500/20">Apply Now</button>
                      </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-blue-50 to-slate-50 hover:from-blue-100 hover:to-slate-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹10,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">30</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹3,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Premium Chit Fund - ₹3,00,000')} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-teal-950 font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-amber-500/20">Apply Now</button>
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹12,500</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">40</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹5,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Gold Chit Fund - ₹5,00,000')} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-teal-950 font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-amber-500/20">Apply Now</button>
                      </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-blue-50 to-slate-50 hover:from-blue-100 hover:to-slate-100 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹20,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">25</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹5,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Platinum Chit Fund - ₹5,00,000')} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-teal-950 font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-amber-500/20">Apply Now</button>
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 transform hover:scale-105">
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹20,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold text-gray-800">50</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8 text-xl md:text-3xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent">₹10,00,000</td>
                      <td className="text-center py-4 md:py-8 px-4 md:px-8">
                        <button onClick={() => openApplyModal('Diamond Chit Fund - ₹10,00,000')} className="bg-gradient-to-r from-[#D4A574] to-yellow-500 text-[#056160] font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:scale-105 transition-all shadow-md shadow-yellow-500/20">Apply Now</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Scheme Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl border border-[#D4A574]">
                <div className="h-80 md:h-[450px] bg-blue-100 relative overflow-hidden">
                  <img src={scheme.image} alt={scheme.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#044c4c]/80 via-transparent to-transparent"></div>
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
      <section id="calculator" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">🧮 NovaTrust Chit Calculators</h2>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
              <div className="px-8 py-10">
                {/* Calculator Type Tabs */}
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setFormData({ ...formData, calculatorType: 'income' })}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${formData.calculatorType === 'income' ? 'bg-[#056160] text-white' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      Income Based
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, calculatorType: 'instalment' })}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${formData.calculatorType === 'instalment' ? 'bg-[#056160] text-white' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      Instalment Based
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, calculatorType: 'amount' })}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${formData.calculatorType === 'amount' ? 'bg-[#056160] text-white' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      Amount Based
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-6">📊 Enter Your Details</h3>

                    {formData.calculatorType === 'income' && (
                      <>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">💰 Month Salary (₹)</label>
                          <input
                            type="range"
                            name="monthSalary"
                            min="10000"
                            max="200000"
                            step="5000"
                            value={formData.monthSalary}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center mt-2">
                            <span className="text-lg font-bold text-green-800">₹{formData.monthSalary.toLocaleString()}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">💸 EMI / Commitments (₹)</label>
                          <input
                            type="range"
                            name="emi"
                            min="0"
                            max="50000"
                            step="1000"
                            value={formData.emi}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center mt-2">
                            <span className="text-lg font-bold text-green-800">₹{formData.emi.toLocaleString()}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">📈 Surplus Income (₹)</label>
                          <input
                            type="range"
                            name="surplusIncome"
                            min="0"
                            max="100000"
                            step="5000"
                            value={formData.surplusIncome}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center mt-2">
                            <span className="text-lg font-bold text-green-800">₹{formData.surplusIncome.toLocaleString()}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {formData.calculatorType === 'instalment' && (
                      <>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">💰 Monthly Instalment (₹)</label>
                          <input
                            type="range"
                            name="monthlyContribution"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={formData.monthlyContribution}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center mt-2">
                            <span className="text-lg font-bold text-green-800">₹{formData.monthlyContribution.toLocaleString()}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {formData.calculatorType === 'amount' && (
                      <>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">🎯 Desired Chit Amount (₹)</label>
                          <input
                            type="range"
                            name="totalFundValue"
                            min="50000"
                            max="1000000"
                            step="25000"
                            value={formData.totalFundValue}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center mt-2">
                            <span className="text-lg font-bold text-green-800">₹{formData.totalFundValue.toLocaleString()}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">⏰ Tenure (Months)</label>
                      <input
                        type="range"
                        name="tenure"
                        min="12"
                        max="120"
                        step="6"
                        value={formData.tenure}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center mt-2">
                        <span className="text-lg font-bold text-green-800">{formData.tenure} months</span>
                      </div>
                    </div>

                    <button
                      onClick={calculateNewChitFund}
                      className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse text-lg"
                    >
                      🧮 Calculate
                    </button>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-6">📈 Results</h3>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">💰 Applicable Chits EMI Value</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ₹{formData.monthlyContribution || '0'}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300">
                        <div className="text-sm text-gray-600 mb-1">🎯 MAX Chit Value</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          ₹{formData.totalFundValue || '0'}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                      <h4 className="font-bold text-gray-800 mb-2">💡 How it works:</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• EMI is calculated based on your income and commitments</li>
                        <li>• Max Chit Value = EMI × Tenure</li>
                        <li>• Choose a plan that fits your financial capacity</li>
                        <li>• Contact us for personalized chit fund recommendations</li>
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
      <section id="services" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="w-full px-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">🚀 NovaTrust Other  Services</h2>
          <p className="text-xl text-center text-gray-700 mb-10 max-w-2xl mx-auto">Unlock your dreams with our range of modern loan services, tailored for every stage of life. Fast, transparent, and customer-first!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Home Loan & Mortgage Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏠</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Home & Mortgage Loan</h3>
              <p className="text-gray-700 text-center text-base">Make your dream home a reality with flexible, low-interest home and mortgage loans. Quick approval, minimal paperwork, and expert guidance every step of the way.</p>
            </div>
            {/* Car Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚗</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Car Loan</h3>
              <p className="text-gray-700 text-center text-base">Drive your dreams with our easy and affordable car loans. Enjoy fast disbursal, attractive rates, and a hassle-free process for new or used vehicles.</p>
            </div>
            {/* Education Loan */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col items-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">Education Loan</h3>
              <p className="text-gray-700 text-center text-base">Invest in your future with our education loans. Cover tuition, living expenses, and more with flexible repayment options and expert support for students and parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auction Section */}
      <section id="auction" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-6">🎯 Live Auction</h2>
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
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-8 flex flex-col items-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-emerald-100">
                <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions Section */}
      {
        showTerms && (
          <section id="terms" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            <div className="px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">Terms and Conditions</h2>
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
                  <div className="px-8 py-10">
                    <p className="font-bold text-lg text-gray-700 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-6">Novatrust Chits Private Ltd Rules</h3>
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
                      <button onClick={() => setShowTerms(false)} className="text-amber-600 underline hover:text-amber-700 font-semibold transition-colors duration-300">Hide Terms</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="w-full px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Contact Info */}
            <div className="w-full h-full text-center bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-8 shadow-xl border border-emerald-100 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl text-gray-800 mb-3 font-bold">NovaTrust Chits Pvt Ltd</h3>
              <div className="flex flex-col items-start space-y-5 max-w-sm mx-auto w-full text-left">
                <div className="flex items-start">
                  <span className="mr-4 text-xl">📞</span>
                  <span className="font-bold text-lg text-gray-700">7755996577</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-4 text-xl">✉️</span>
                  <span className="font-bold text-lg text-gray-700">info@novatrust.co.in</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-4 text-xl mt-1">📍</span>
                  <span className="text-lg text-gray-700">Main Address:Survey No. 28/P, Plot No. 33, 21 Leaves, Chh. Sambhajinagar (Aurangabad) - 431 001</span>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full h-full flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12 h-full flex flex-col justify-center bg-green-50 rounded-3xl shadow-lg border border-green-100">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">Thank You!</h3>
                  <p className="text-lg text-neutral-600 mb-8">Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                  <button onClick={() => setSubmitted(false)} className="px-8 py-3 mx-auto bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 rounded-xl hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">Send Another Message</button>
                </div>
              ) : (
                <form action="https://formsubmit.co/info@novatrust.co.in" method="POST" className="space-y-6 bg-white h-full rounded-3xl shadow-2xl p-8 border border-green-100 flex flex-col justify-between">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <input id="name" name="name" type="text" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg transition-all duration-300 placeholder-gray-400" placeholder="Full Name" />
                      </div>
                      <div>
                        <input id="email" name="email" type="email" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg transition-all duration-300 placeholder-gray-400" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <input id="phone" name="phone" type="tel" className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg transition-all duration-300 placeholder-gray-400" placeholder="Phone Number" />
                      </div>
                      <div>
                        <input id="subject" name="subject" type="text" required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg transition-all duration-300 placeholder-gray-400" placeholder="Subject" />
                      </div>
                    </div>
                    <div>
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg transition-all duration-300 placeholder-gray-400" placeholder="Your message"></textarea>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl">Send Message</button>
                    {/* Terms link below submit button */}
                    <div className="text-center mt-4">
                      <a href="#terms" className="text-amber-600 underline hover:text-amber-700 font-semibold transition-colors duration-300" onClick={handleShowTerms}>Read Terms and Conditions</a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917755996577"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group border-2 border-white"
        aria-label="Chat with us on WhatsApp"
      >
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-lg opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
          <span className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-gray-900"></span>
        </span>
      </a>

      {/* Apply Form Modal */}
      {
        isApplyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative shadow-[0_0_50px_rgba(5,97,96,0.3)] border border-teal-100">
              <button onClick={() => setIsApplyModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold transition-colors">&times;</button>
              <h3 className="text-2xl font-bold mb-2 text-[#056160]">Apply for Scheme</h3>
              <p className="text-gray-600 mb-6 font-semibold bg-emerald-50 p-3 rounded-lg border border-emerald-100">{selectedScheme}</p>

              <form action="https://formsubmit.co/info@novatrust.co.in" method="POST" className="space-y-4">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="Scheme_Applied" value={selectedScheme} />
                <input type="hidden" name="_subject" value="New Chit Fund Application" />
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#056160] focus:border-[#056160] outline-none transition-all placeholder-gray-400" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#056160] focus:border-[#056160] outline-none transition-all placeholder-gray-400" placeholder="youremail@example.com" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#056160] focus:border-[#056160] outline-none transition-all placeholder-gray-400" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#056160] to-teal-800 hover:to-teal-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-4">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )
      }

      <Footer />
    </div>
  );
};

export default LandingPage;
