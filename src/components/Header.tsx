import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <img
              src="/novatrust-golden-ornate-logo.svg"
              alt="NovaTrust Logo"
              className="w-full h-full object-contain rounded-full shadow-lg ring-2 ring-slate-200"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">NovaTrust</p>
            <h1 className="text-lg font-bold text-slate-900">Chits & Finance</h1>
          </div>
        </Link>

        <nav className="hidden md:flex flex-wrap items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition">Home</Link>
          <Link to="/about-chit-funds" className="text-slate-600 hover:text-blue-600 transition">About</Link>
          <Link to="/schemes" className="text-slate-600 hover:text-blue-600 transition">Schemes</Link>
          <Link to="/calculator" className="text-slate-600 hover:text-blue-600 transition">Calculator</Link>
          <Link to="/live-auction" className="text-slate-600 hover:text-blue-600 transition">Live Auction</Link>
          <Link to="/benefits" className="text-slate-600 hover:text-blue-600 transition">Benefits</Link>
          <Link to="/legal" className="text-slate-600 hover:text-blue-600 transition">Legal</Link>
          <Link to="/terms" className="text-slate-600 hover:text-blue-600 transition">Terms</Link>
          <Link to="/contact" className="rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-emerald-700 transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
