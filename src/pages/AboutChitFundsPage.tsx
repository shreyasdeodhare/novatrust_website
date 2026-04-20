import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutChitFundsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50 pt-24 pb-20">
      <Header />
      <div className="flex-1 w-full px-4 max-w-7xl mx-auto text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#056160] to-[#044c4c] bg-clip-text text-transparent mb-8 text-left">
          About Chit Funds
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Chit Fund?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            A chit fund is a savings scheme where a group of people contribute a fixed amount regularly to a common pool.
            The collected money is then auctioned or distributed to members based on a predetermined cycle.
            It's a traditional Indian financial instrument that combines savings, borrowing, and investment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Chit Funds Work (Step-by-Step)</h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Formation:</strong> A group of people (typically 10-50) agree to form a chit fund with a fixed monthly contribution and duration.</li>
            <li><strong>Monthly Contributions:</strong> Each member pays a fixed amount every month into the common pool.</li>
            <li><strong>Auction/Distribution:</strong> The pooled money is given to one member each month through bidding or lottery.</li>
            <li><strong>Continuation:</strong> This process continues until all members have received their share.</li>
            <li><strong>Completion:</strong> The fund concludes when all members have been paid out.</li>
          </ol>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Roles in Chit Fund</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-700 mb-2">Foreman (Organizer)</h3>
              <p className="text-sm text-gray-700">Manages the fund, conducts auctions, ensures compliance, and handles administrative tasks.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-600 mb-2">Members</h3>
              <p className="text-sm text-gray-700">Active participants who contribute monthly and participate in auctions to receive funds.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-600 mb-2">Subscribers</h3>
              <p className="text-sm text-gray-700">Members who have already received their chit amount and continue contributing dividends.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chit Cycle Explanation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A chit cycle refers to the complete duration of the chit fund scheme. For example, in a 20-month chit fund:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
            <li>Month 1-19: Members bid for the pooled amount, winner gets funds minus discount</li>
            <li>Month 20: Last member automatically receives the remaining amount</li>
            <li>Throughout: All members continue monthly contributions</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bidding / Auction Process</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The auction determines who receives the monthly pooled amount:
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Announcement:</strong> Foreman announces the total available amount for auction.</li>
            <li><strong>Bidding:</strong> Members bid by offering discounts (e.g., "I'll take ₹95,000 for ₹1,00,000 pool").</li>
            <li><strong>Winner Selection:</strong> Lowest discount wins the auction.</li>
            <li><strong>Payment:</strong> Winner pays the discounted amount immediately.</li>
            <li><strong>Distribution:</strong> Winner receives the full pooled amount, remaining goes to foreman as commission.</li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutChitFundsPage;