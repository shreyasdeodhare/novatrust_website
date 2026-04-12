import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const schemes = [
  {
    title: 'Basic Chit Fund',
    description: 'Entry-level plan for individuals starting their chit journey, ideal for first-time subscribers.',
    details: '₹1,00,000 | 20 months | ₹5,000/month',
  },
  {
    title: 'Standard Chit Fund',
    description: 'A balanced plan for members seeking steady returns and manageable monthly contributions.',
    details: '₹2,00,000 | 25 months | ₹8,000/month',
  },
  {
    title: 'Premium Chit Fund',
    description: 'Higher-value scheme designed for members who want strong liquidity and competitive bidding.',
    details: '₹3,00,000 | 30 months | ₹10,000/month',
  },
  {
    title: 'Gold Chit Fund',
    description: 'Premium membership with bigger fund value and enhanced bidding power.',
    details: '₹5,00,000 | 40 months | ₹12,500/month',
  },
  {
    title: 'Platinum Chit Fund',
    description: 'For high-value investors who want faster results and premium support.',
    details: '₹5,00,000 | 25 months | ₹20,000/month',
  },
];

const SchemesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-violet-50 to-amber-50 pt-24 pb-20">
      <Header />
      <div className="flex-1 w-full px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Chit Fund Schemes</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Choose from our curated plans designed for safety, growth and guaranteed member benefits with transparent charges.</p>
          </div>
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-semibold shadow-lg hover:from-amber-500 hover:to-yellow-500 transition">
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {schemes.map((scheme) => (
            <div key={scheme.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">{scheme.title}</h2>
                <span className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-700 text-sm font-semibold">Popular</span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{scheme.description}</p>
              <p className="text-sm font-semibold uppercase text-slate-500 tracking-wider">Plan details</p>
              <p className="text-xl font-semibold text-slate-900 mt-2">{scheme.details}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchemesPage;
