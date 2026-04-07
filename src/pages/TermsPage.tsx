import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 pt-24 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Clear terms and fair policies help members transact with confidence and transparency.</p>
          </div>
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">
            Return Home
          </Link>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Member Agreement</h2>
            <p className="text-slate-700 leading-relaxed">All members must provide accurate personal details and agree to the fund terms. Payments must be made on schedule and any late payment may be subject to standard penalties.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy & Data</h2>
            <p className="text-slate-700 leading-relaxed">NovaTrust maintains strict confidentiality of member information. Personal data is only used for registration, communication, and legal compliance.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Auction Rules</h2>
            <ul className="list-disc list-inside text-slate-700 space-y-3">
              <li>All auction bids are final once submitted.</li>
              <li>The lowest acceptable discount wins the bid.</li>
              <li>Winners must complete payment in accordance with the fund schedule.</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Policy</h2>
            <p className="text-slate-700 leading-relaxed">In selected cases, refunds may be processed in accordance with fund policy and applicable regulations. Contact support for any refund request.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
