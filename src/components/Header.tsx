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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100 text-teal-900 shadow-lg border-b-4 border-b-[#D4A574]">
      <div className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-4 relative">
        <Link to="/" className="flex items-center group">
          <div className="flex items-center justify-center w-64 md:w-80 h-32 md:h-36 transition-transform duration-300 transform group-hover:scale-110">
            <img
              src={logoSrc}
              alt="NovaTrust Logo"
              className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse-strong"
              style={{ animationDuration: '4s' }}
            />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#D4A574] bg-white p-2 text-[#056160] shadow-sm transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-[#D4A574] lg:hidden"
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-wrap items-center gap-6">
          <Link to="/" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="text-[#056160] font-semibold hover:text-[#D4A574] transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="rounded-full bg-[#056160] px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[#044c4c] transition">Contact</Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-[#D4A574] shadow-lg`}>
        <div className="w-full px-4 py-4 space-y-2">
          <Link to="/" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Home</Link>
          <Link to="/about-chit-funds" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">About</Link>
          <Link to="/schemes" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Schemes</Link>
          <Link to="/calculator" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Calculator</Link>
          <Link to="/live-auction" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Live Auction</Link>
          <Link to="/benefits" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Benefits</Link>
          <Link to="/terms" onClick={handleLinkClick} className="block rounded-xl px-4 py-3 text-[#056160] font-semibold hover:bg-yellow-50 transition">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block rounded-full bg-[#056160] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-[#044c4c] transition">Contact</Link>
        </div>
      </div>
    </header >
  );
};

export default Header;
