import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AboutChitFundsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/nt-logo-2024.svg" alt="NovaTrust Logo" className="w-10 h-10 rounded-full bg-primary-500 object-cover" />
            <div>
              <h1 className="ml-3 text-xl font-bold text-neutral-900">Novatrust</h1>
              <p className="ml-3 text-xs text-neutral-600">Chits and Finance Private Ltd</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/about-us" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Us
            </Link>
            <Link to="/about-chit-funds" className="text-primary-600 font-medium">
              About Chit Funds
            </Link>
            <Link to="/schemes" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Schemes
            </Link>
            <Link to="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">Understanding Chit Funds</h1>

            <div className="prose prose-lg max-w-none">
              <h2>What is a Chit Fund?</h2>
              <p>
                A chit fund is a type of rotating savings and credit association (ROSCA) that combines features of both savings and credit. It's a financial instrument popular in India that helps people save money and access funds when needed.
              </p>

              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 my-6">
                <p className="text-primary-700 font-medium">
                  In simple terms, a chit fund is a group of people who agree to contribute a fixed amount regularly (usually monthly) for a specific period. Each member gets a turn to receive the collected sum, minus a small fee.
                </p>
              </div>

              <h2>How Does a Chit Fund Work?</h2>
              <ol>
                <li>
                  <strong>Formation:</strong> A group of people (typically 20-50) form a chit fund group, agreeing to contribute a fixed amount regularly for a predetermined period.
                </li>
                <li>
                  <strong>Regular Contributions:</strong> Each member contributes an equal amount at regular intervals (usually monthly).
                </li>
                <li>
                  <strong>Auction Process:</strong> At each interval, an auction is conducted where members bid for the collected amount (called the "pot").
                </li>
                <li>
                  <strong>Winning Bid:</strong> The member who is willing to accept the lowest amount wins the auction. The difference between the total pot and the winning bid is distributed among all members as a dividend.
                </li>
                <li>
                  <strong>Rotation:</strong> Each member can win the auction only once during the chit fund's term. This ensures everyone gets a turn to access the funds.
                </li>
                <li>
                  <strong>Completion:</strong> The chit fund completes when all members have had their turn to receive the pot.
                </li>
              </ol>

              <h2>Example of a Chit Fund</h2>
              <p>Let's understand with a simple example:</p>

              <div className="bg-neutral-100 p-6 rounded-lg my-6">
                <h3 className="text-lg font-medium mb-4">Example: 10-Month Chit Fund with 10 Members</h3>

                <ul className="space-y-4">
                  <li>
                    <strong>Monthly Contribution:</strong> ₹10,000 per member
                  </li>
                  <li>
                    <strong>Total Monthly Collection:</strong> ₹1,00,000 (10 members × ₹10,000)
                  </li>
                  <li>
                    <strong>Foreman's Commission:</strong> 5% of the total pot (₹5,000)
                  </li>
                  <li>
                    <strong>Net Chit Amount:</strong> ₹95,000 (₹1,00,000 - ₹5,000)
                  </li>
                </ul>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Month 1 Auction:</h4>
                  <ul className="space-y-2">
                    <li>Member A bids the lowest and agrees to take ₹80,000</li>
                    <li>Discount: ₹15,000 (₹95,000 - ₹80,000)</li>
                    <li>Dividend per member: ₹1,500 (₹15,000 ÷ 10 members)</li>
                    <li>Each member's net contribution: ₹8,500 (₹10,000 - ₹1,500)</li>
                    <li>Member A receives: ₹80,000</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Subsequent Months:</h4>
                  <p>
                    The process repeats with different members winning the auction each month. Members who have already won cannot bid again. The auction amount varies based on members' needs for funds.
                  </p>
                </div>
              </div>

              <h2>Benefits of Chit Funds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-2">For Savers</h3>
                  <ul className="space-y-2">
                    <li>Disciplined savings mechanism</li>
                    <li>Higher returns than traditional savings accounts</li>
                    <li>Dividend income from auctions</li>
                    <li>No need for collateral</li>
                    <li>Community-based financial support</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">For Borrowers</h3>
                  <ul className="space-y-2">
                    <li>Quick access to funds without lengthy procedures</li>
                    <li>Lower interest rates compared to personal loans</li>
                    <li>No strict credit score requirements</li>
                    <li>Flexible repayment through continued contributions</li>
                    <li>No additional collateral required</li>
                  </ul>
                </div>
              </div>

              <h2>Risks and Considerations</h2>
              <ul>
                <li>
                  <strong>Regulatory Compliance:</strong> Ensure the chit fund is registered and follows legal requirements.
                </li>
                <li>
                  <strong>Default Risk:</strong> If members stop contributing after receiving their pot, it affects other members.
                </li>
                <li>
                  <strong>Operator Credibility:</strong> Choose a reputable chit fund operator with a proven track record.
                </li>
                <li>
                  <strong>Liquidity Timing:</strong> You may not get the pot when you need it most, as it depends on the auction process.
                </li>
                <li>
                  <strong>Documentation:</strong> Ensure all terms and conditions are clearly documented and understood.
                </li>
              </ul>

              <h2>How Novatrust Chits and Finance Private Ltd Makes Chit Funds Better</h2>
              <p>
              Novatrust Chits and Finance Private Ltd modernizes the traditional chit fund concept with technology and enhanced security:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="text-primary-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">Enhanced Security</h3>
                  <p className="text-sm text-neutral-600">
                    Digital contracts, secure payments, and transparent record-keeping ensure your money is safe.
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="text-primary-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">Digital Management</h3>
                  <p className="text-sm text-neutral-600">
                    Track your contributions, dividends, and auction status in real-time through our dashboard.
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="text-primary-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">Online Auctions</h3>
                  <p className="text-sm text-neutral-600">
                    Participate in auctions remotely, with transparent bidding and instant results.
                  </p>
                </div>
              </div>

              <h2>Ready to Get Started?</h2>
              <p>
                Join Novatrust Chits and Finance Private Ltd today to experience a modern, secure, and transparent chit fund platform. Our digital approach makes saving and accessing funds easier than ever.
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Create Your Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  NT
                </div>
                <span className="ml-2 text-lg font-bold text-neutral-900">NovaTrust</span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Secure, Transparent Chits and Finance Services</p>
            </div>

            <div className="flex space-x-6">
              <Link to="/terms" className="text-neutral-500 hover:text-primary-600">
                Terms of Service
              </Link>
              <a href="#" className="text-neutral-500 hover:text-primary-600">
                Privacy Policy
              </a>
              <Link to="/contact" className="text-neutral-500 hover:text-primary-600">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Novatrust Chits and Finance Private Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutChitFundsPage;
