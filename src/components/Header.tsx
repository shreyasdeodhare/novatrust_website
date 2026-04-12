import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const publicUrl = process.env.PUBLIC_URL || '';
  const logoSrc = `${publicUrl}/novatruatfinal.jpg`;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950 via-purple-900 to-slate-950 text-white shadow-xl border-b border-indigo-800/40">
      <div className="w-full px-4 py-4 flex flex-wrap items-center justify-between gap-4 relative">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <img
              src={logoSrc}
              alt="NovaTrust Logo"
              className="w-full h-full object-contain rounded-full shadow-lg ring-2 ring-slate-200"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">NovaTrust</p>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent">Chits</h1>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-indigo-700/40 bg-slate-950/90 p-2 text-slate-100 shadow-sm transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 md:hidden"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>

        <nav className="hidden md:flex flex-wrap items-center gap-6">
          <Link to="/" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-300 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg hover:from-amber-500 hover:to-yellow-500 transition">Contact</Link>
        </nav>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-slate-950/95 border-t border-indigo-800 shadow-lg`}>
        <div className="w-full px-4 py-4 space-y-2">
          <Link to="/" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-100 hover:bg-indigo-950 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-lg hover:from-amber-500 hover:to-yellow-500 transition">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
