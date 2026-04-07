import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const benefits = [
  {
    title: 'Lowest Intermediation Cost',
    description: 'Minimal service charges so more of your contribution remains invested.',
  },
  {
    title: 'Tax-Efficient Returns',
    description: 'Benefit from legal chit fund structures and well-managed contributions.',
  },
  {
    title: 'Easy Participation',
    description: 'Simple onboarding and transparent rules for first-time and experienced members.',
  },
  {
    title: 'Stable Growth',
    description: 'A reliable way to save and access funds without hidden interest rates.',
  },
  {
    title: 'Better than Bank Savings',
    description: 'Chit funds can yield faster liquidity and higher returns than traditional savings.',
  },
];

const BenefitsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 pt-24 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose NovaTrust</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Discover the key advantages of our chit fund approach and how it helps you reach your financial goals faster.</p>
          </div>
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h2>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BenefitsPage;
