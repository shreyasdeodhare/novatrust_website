import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Schemes data from the provided table
const mockSchemes = [
  {
    id: 1,
    name: 'Basic Chit Fund',
    amount: 100000,
    duration: 20,
    monthlyContribution: 5000,
    members: 20,
    description: 'Entry-level chit fund with affordable monthly subscription.',
    features: [
      'Total value: ₹1,00,000',
      'Duration: 20 months',
      'Monthly subscription: ₹5,000',
      'Maximum members: 20',
      'Foreman commission: 6%',
      'Online auction system',
      'Standard customer support'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Standard Chit Fund',
    amount: 200000,
    duration: 25,
    monthlyContribution: 8000,
    members: 25,
    description: 'Standard chit fund with balanced value and duration.',
    features: [
      'Total value: ₹2,00,000',
      'Duration: 25 months',
      'Monthly subscription: ₹8,000',
      'Maximum members: 25',
      'Foreman commission: 6%',
      'Online auction system',
      'Regular customer support'
    ],
    popular: false
  },
  {
    id: 3,
    name: 'Premium Chit Fund',
    amount: 300000,
    duration: 30,
    monthlyContribution: 10000,
    members: 30,
    description: 'Premium chit fund with higher value and longer duration.',
    features: [
      'Total value: ₹3,00,000',
      'Duration: 30 months',
      'Monthly subscription: ₹10,000',
      'Maximum members: 30',
      'Foreman commission: 6%',
      'Online auction system',
      'Priority customer support'
    ],
    popular: true
  },
  {
    id: 4,
    name: 'Gold Chit Fund',
    amount: 500000,
    duration: 40,
    monthlyContribution: 12500,
    members: 40,
    description: 'High-value chit fund for serious investors with medium-term goals.',
    features: [
      'Total value: ₹5,00,000',
      'Duration: 40 months',
      'Monthly subscription: ₹12,500',
      'Maximum members: 40',
      'Foreman commission: 6%',
      'Online auction system',
      'Premium customer support'
    ],
    popular: false
  },
  {
    id: 5,
    name: 'Platinum Chit Fund',
    amount: 500000,
    duration: 25,
    monthlyContribution: 20000,
    members: 25,
    description: 'Platinum chit fund with higher monthly subscription for faster fund accumulation.',
    features: [
      'Total value: ₹5,00,000',
      'Duration: 25 months',
      'Monthly subscription: ₹20,000',
      'Maximum members: 25',
      'Foreman commission: 6%',
      'Premium auction system',
      'VIP customer support'
    ],
    popular: false
  },
  {
    id: 6,
    name: 'Diamond Chit Fund',
    amount: 1000000,
    duration: 50,
    monthlyContribution: 20000,
    members: 50,
    description: 'High-value chit fund with longer duration for significant savings.',
    features: [
      'Total value: ₹10,00,000',
      'Duration: 50 months',
      'Monthly subscription: ₹20,000',
      'Maximum members: 50',
      'Foreman commission: 6%',
      'Premium auction system',
      'VIP customer support',
      'Financial advisory services'
    ],
    popular: false
  },
  {
    id: 7,
    name: 'Elite Chit Fund',
    amount: 1000000,
    duration: 40,
    monthlyContribution: 25000,
    members: 40,
    description: 'Our highest value chit fund for serious investors with long-term goals.',
    features: [
      'Total value: ₹10,00,000',
      'Duration: 40 months',
      'Monthly subscription: ₹25,000',
      'Maximum members: 40',
      'Foreman commission: 6%',
      'Premium auction system',
      'VIP customer support',
      'Financial advisory services',
      'Priority auction access'
    ],
    popular: false
  }
];

const SchemesPage = () => {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Function to handle scheme selection
  const handleSchemeSelect = (scheme) => {
    setSelectedScheme(scheme);
    // In a real app, you might store this in state/localStorage
    // and then redirect to signup or login
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedScheme(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/nt-logo-2024.svg" alt="NovaTrust Logo" className="w-10 h-10 rounded-full bg-primary-500 object-cover" />
            <h1 className="ml-3 text-xl font-bold text-neutral-900">Novatrust Chits and Finance Private Ltd</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/about-us" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Us
            </Link>
            <Link to="/about-chit-funds" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Chit Funds
            </Link>
            <Link to="/schemes" className="text-primary-600 font-medium">
              Schemes
            </Link>
            <Link to="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Novatrust Chit Fund Schemes</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Choose from our range of chit fund schemes designed to match your financial goals and budget. Click on any scheme for more details.
          </p>
        </div>

        {/* Schemes comparison - Styled like the screenshot */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Available Chit Fund Schemes</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-primary-600 text-white text-center py-4 px-6 font-bold text-lg">
                      MONTHLY SUBSCRIPTION
                    </th>
                    <th className="bg-primary-600 text-white text-center py-4 px-6 font-bold text-lg">
                      DURATION (MONTHS)
                    </th>
                    <th className="bg-primary-600 text-white text-center py-4 px-6 font-bold text-lg">
                      FUND VALUE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockSchemes.map((scheme, index) => (
                    <tr
                      key={scheme.id}
                      className={index % 2 === 0 ? 'bg-neutral-300' : 'bg-neutral-400'}
                      onClick={() => handleSchemeSelect(scheme)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="text-center py-4 px-6 text-xl font-medium">
                        {scheme.monthlyContribution.toLocaleString()}
                      </td>
                      <td className="text-center py-4 px-6 text-xl font-medium">
                        {scheme.duration}
                      </td>
                      <td className="text-center py-4 px-6 text-xl font-medium">
                        {scheme.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12 p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">How to Join Our Chit Fund Schemes</h3>
          <p className="text-neutral-600 mb-4">
            Click on any scheme in the table above to view more details and join. Our chit fund schemes are designed to help you save and grow your money with transparency and security.
          </p>
          <p className="text-neutral-600">
            All schemes include a 6% foreman commission as per the Chit Fund Act regulations. The monthly subscription amounts are fixed for the entire duration of the scheme.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">How do I join a chit fund scheme?</h3>
                <p className="text-neutral-600">
                  To join a chit fund scheme, you need to create an account, select your preferred scheme, and complete the registration process. You'll need to provide identification documents and set up your payment method.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">What happens if I miss a monthly payment?</h3>
                <p className="text-neutral-600">
                  If you miss a monthly payment, you'll be charged a late fee as per the terms of the agreement. Consistent missed payments may result in termination of your membership and legal action to recover dues.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">How does the auction process work?</h3>
                <p className="text-neutral-600">
                  Each month, members bid for the pot by offering a discount on the total amount. The member willing to accept the lowest amount wins the auction. The difference between the total pot and the winning bid is distributed among all members as a dividend.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Is my money safe with Novatrust Chits and Finance Private Ltd?</h3>
                <p className="text-neutral-600">
                  Yes, Novatrust Chits and Finance Private Ltd is a registered chit fund company that follows all regulatory requirements. We maintain separate accounts for each chit fund scheme and provide complete transparency in all transactions.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Can I withdraw from a chit fund before it completes?</h3>
                <p className="text-neutral-600">
                  Yes, you can transfer your position to another person with the approval of the company. However, there may be transfer fees and other conditions as per the terms of the agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scheme details modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-neutral-900">{selectedScheme.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-neutral-600 mb-6">{selectedScheme.description}</p>

              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Scheme Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Total Value</p>
                    <p className="text-lg font-medium text-neutral-900">₹{selectedScheme.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Duration</p>
                    <p className="text-lg font-medium text-neutral-900">{selectedScheme.duration} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Monthly Contribution</p>
                    <p className="text-lg font-medium text-neutral-900">₹{selectedScheme.monthlyContribution.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Members</p>
                    <p className="text-lg font-medium text-neutral-900">{selectedScheme.members}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {selectedScheme.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-primary-900 mb-2">Example Calculation</h3>
                <p className="text-neutral-600 mb-3">
                  Here's an example of how this chit fund would work:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Total pot:</strong> ₹{selectedScheme.amount.toLocaleString()}</p>
                  <p><strong>Foreman's commission (6%):</strong> ₹{(selectedScheme.amount * 0.06).toLocaleString()}</p>
                  <p><strong>Net chit amount:</strong> ₹{(selectedScheme.amount * 0.94).toLocaleString()}</p>
                  <p><strong>If a member bids at 10% discount:</strong> They would receive ₹{(selectedScheme.amount * 0.94 * 0.9).toLocaleString()}</p>
                  <p><strong>Dividend per member:</strong> ₹{((selectedScheme.amount * 0.94 * 0.1) / selectedScheme.members).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    closeModal();
                    navigate('/signup');
                  }}
                  className="flex-1 bg-primary-600 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Join This Scheme
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-neutral-100 text-neutral-800 font-medium py-2 px-4 rounded-md hover:bg-neutral-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  NT
                </div>
                <span className="ml-2 text-lg font-bold text-neutral-900">Novatrust Chits and Finance Private Ltd</span>
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

export default SchemesPage;
