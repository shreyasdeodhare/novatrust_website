import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const logoSrc = `${publicUrl}/novatruatfinal.jpg`;

  return (
    <footer className="bg-green-950 text-white py-12 border-t border-amber-500/20">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 p-1 rounded-full bg-slate-950/70 shadow-xl ring-1 ring-white/25 overflow-hidden">
                <img
                  src={logoSrc}
                  alt="NovaTrust Logo"
                  className="relative w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="ml-2 text-xl font-bold text-amber-400 tracking-wider">NOVATRUST CHITS</h3>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Your trusted partner for secure and transparent chit funds. Building financial futures with integrity and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300 shadow-sm rounded-full bg-white flex items-center justify-center w-8 h-8"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href="https://instagram.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300 shadow-sm rounded-md bg-white flex items-center justify-center overflow-hidden w-8 h-8 p-[5px]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" /><stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" /><stop offset="100%" stopColor="#bc1888" /></linearGradient></defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="mailto:kartik.lahot03@gmail.com"
                className="text-slate-300 hover:text-amber-200 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/about-chit-funds" className="text-slate-300 hover:text-white transition-colors duration-300">About Chit Funds</Link></li>
              <li><Link to="/schemes" className="text-slate-300 hover:text-white transition-colors duration-300">Schemes</Link></li>
              <li><Link to="/calculator" className="text-slate-300 hover:text-white transition-colors duration-300">Calculator</Link></li>
              <li><Link to="/live-auction" className="text-slate-300 hover:text-white transition-colors duration-300">Live Auction</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/benefits" className="text-slate-300 hover:text-white transition-colors duration-300">Benefits</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><a href="mailto:kartik.lahot03@gmail.com" className="text-slate-300 hover:text-white transition-colors duration-300">Email Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 NovaTrust Chits Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;