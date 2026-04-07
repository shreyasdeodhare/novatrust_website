import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 pt-24 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-8 text-left">
          Legal & Awareness
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chit Funds Act 1982</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Chit Funds Act, 1982 is a central legislation in India that regulates chit funds. 
            It defines chit funds as arrangements where people contribute to a common fund and receive money through auctions or draws.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Act ensures fair practices, protects participants, and provides a legal framework for chit fund operations.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Legal Structure of Chit Funds</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Registration:</strong> Chit funds must be registered with the Registrar of Chits in the respective state.</li>
            <li><strong>Foreman License:</strong> The organizer (foreman) must obtain a license to operate chit funds.</li>
            <li><strong>Participant Limits:</strong> Maximum number of subscribers is regulated (typically 50-100 per chit).</li>
            <li><strong>Reserve Fund:</strong> A portion of contributions must be maintained as a reserve for contingencies.</li>
            <li><strong>Audit Requirements:</strong> Regular audits and financial reporting are mandatory.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Rights in Chit Funds</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Right to Information:</strong> Access to all chit fund details, rules, and financial statements.</li>
            <li><strong>Fair Treatment:</strong> Equal opportunity to participate in auctions and receive benefits.</li>
            <li><strong>Refund Rights:</strong> Right to withdraw or get refund under certain conditions.</li>
            <li><strong>Complaint Resolution:</strong> Access to grievance redressal mechanisms.</li>
            <li><strong>Data Protection:</strong> Protection of personal and financial information.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Organizer (Foreman) Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Compliance:</strong> Ensure all operations follow Chit Funds Act and regulations.</li>
            <li><strong>Transparency:</strong> Maintain accurate records and provide regular updates to members.</li>
            <li><strong>Fair Auctions:</strong> Conduct auctions impartially and maintain bidding records.</li>
            <li><strong>Fund Management:</strong> Handle contributions, distributions, and reserve funds properly.</li>
            <li><strong>Dispute Resolution:</strong> Address member complaints and resolve issues promptly.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Transparency Rules</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Clear Terms:</strong> All rules, fees, and procedures must be clearly communicated.</li>
            <li><strong>Financial Disclosure:</strong> Regular statements showing contributions, distributions, and balances.</li>
            <li><strong>Auction Records:</strong> Detailed records of all auctions, bids, and winners.</li>
            <li><strong>Reserve Fund Status:</strong> Regular updates on reserve fund utilization and balances.</li>
            <li><strong>Regulatory Compliance:</strong> Adherence to all legal reporting and audit requirements.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;