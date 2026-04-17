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
    <header className="fixed top-0 left-0 right-0 z-50 bg-green-950 text-white shadow-xl border-b border-green-900/40">
      <div className="w-full px-4 py-4 flex flex-wrap items-center justify-between gap-4 relative">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-14 h-14 p-1 rounded-full bg-slate-950/70 shadow-xl ring-1 ring-white/25 overflow-hidden">
            <img
              src={logoSrc}
              alt="NovaTrust Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold tracking-[0.2em] text-white leading-tight">NOVATRUST</span>
            <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase">Chits</span>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-green-800/40 bg-green-950 p-2 text-slate-100 shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-amber-400 md:hidden"
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
          <Link to="/" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="text-slate-100 hover:text-amber-400 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-green-950 shadow-lg hover:bg-amber-500 transition">Contact</Link>
        </nav>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-green-950 border-t border-green-900 shadow-lg`}>
        <div className="w-full px-4 py-4 space-y-2">
          <Link to="/" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-slate-100 hover:bg-green-900 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white hover:bg-green-900 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-semibold text-green-950 shadow-lg hover:bg-amber-500 transition">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
