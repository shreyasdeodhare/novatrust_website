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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#f0fdfa] via-[#e0f2ec] to-[#ccf5dc] text-[#064c4c] shadow-lg border-b-4 border-b-[#D4A574]">
      <div className="w-full flex flex-col items-center justify-center px-2 py-1 lg:px-4 lg:py-2">
        {/* Centered logo */}
        <div className="flex items-center justify-center h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-44 lg:h-32 lg:w-60 transition-transform duration-300 transform hover:scale-105 mx-auto">
          <img
            src={logoSrc}
            alt="NovaTrust Logo"
            className="h-full w-auto object-contain drop-shadow-[0_0_18px_rgba(6,76,76,0.3)] hover:drop-shadow-[0_0_30px_rgba(6,76,76,0.5)] animate-pulse-strong remove-black-bg"
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#D4A574] bg-white p-2 text-[#064c4c] shadow-sm transition hover:bg-[#D4A574] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] lg:hidden mt-2"
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

        {/* Desktop Navigation (centered below logo) */}
        <nav className="hidden lg:flex flex-wrap items-center gap-8 justify-center mt-2">
          <Link to="/" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="text-[#064c4c] font-semibold hover:text-[#D4A574] transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="rounded-full bg-[#D4A574] px-5 py-2 text-sm font-semibold text-[#064c4c] shadow-lg hover:bg-[#c29466] transition">Contact</Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-slate-900 border-t border-[#D4A574] shadow-lg`}>
        <div className="w-full px-4 py-4 space-y-2">
          <Link to="/" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-white font-semibold hover:bg-slate-800 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block rounded-full bg-[#D4A574] px-5 py-3 text-center text-sm font-semibold text-[#056160] shadow-lg hover:bg-[#c29466] transition">Contact</Link>
        </div>
      </div>
    </header >
  );
};

export default Header;
