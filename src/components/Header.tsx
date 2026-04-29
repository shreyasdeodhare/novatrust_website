import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const publicUrl = process.env.PUBLIC_URL || '';
  // Use PNG with transparency for logo
  const logoSrc = `${publicUrl}/novatrust.PNG`;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-white shadow-lg border-b border-[#4d818c]" style={{ background: '#38bdf8', height: '64px' }}>
      <div className="w-full h-full flex flex-row items-center justify-between px-4">
        {/* Logo and Nav in one row for desktop */}
        <div className="flex flex-row items-center h-full">
          <div className="flex items-center h-full bg-transparent p-0 m-0" style={{ height: '56px', minWidth: '120px' }}>
            <img
              src={logoSrc}
              alt="NovaTrust Logo"
              className="h-14 w-auto object-contain bg-transparent"
              style={{ maxHeight: '56px', background: 'transparent', minWidth: '100px' }}
            />
          </div>
          {/* Desktop Navigation (right of logo) */}
          <nav className="hidden lg:flex flex-row items-center gap-5 ml-4 h-full">
            <Link to="/" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Home</Link>
            <Link to="/about-chit-funds" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">About</Link>
            <Link to="/schemes" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Chits</Link>
            <Link to="/calculator" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Calculator</Link>
            <Link to="/live-auction" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Live Auction</Link>
            <Link to="/benefits" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Benefits</Link>
            <Link to="/terms" onClick={handleLinkClick} className="text-white font-semibold hover:text-[#ffd600] transition">Terms</Link>
            <Link to="/contact" onClick={handleLinkClick} className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#4d818c] shadow-lg hover:bg-[#ffd600] hover:text-[#4d818c] transition">Contact</Link>
          </nav>
        </div>
        {/* Call Button aligned right, fill space */}
        <div className="flex flex-1 flex-row items-center justify-end gap-4">
          <a href="tel:08067806700" className="flex items-center bg-white text-[#039be5] font-bold rounded-full px-6 py-2 shadow hover:bg-[#ffd600] hover:text-[#039be5] transition text-lg" style={{ minWidth: '200px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
            </svg>
            7755996577
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#ffd600] bg-white p-2 text-[#039be5] shadow-sm transition hover:bg-[#ffd600] hover:text-[#039be5] focus:outline-none focus:ring-2 focus:ring-[#ffd600] lg:hidden ml-2"
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
