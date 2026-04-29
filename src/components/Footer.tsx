import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  // Use the same logo as the header
  const logoSrc = `${publicUrl}/novatrust.PNG`;

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-[#044c4c] to-slate-800 text-white py-16 border-t-4 border-t-[#D4A574]">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative h-10 w-auto overflow-visible flex items-center justify-center mr-4 bg-transparent p-0 m-0">
                <img
                  src={logoSrc}
                  alt="NovaTrust Logo"
                  className="h-10 w-auto object-contain bg-transparent"
                  style={{ maxHeight: '48px', background: 'transparent' }}
                />
              </div>
              <h3 className="text-2xl font-bold text-[#D4A574] tracking-wider">NOVATRUST CHITS</h3>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Your trusted partner for secure and transparent chit funds. Building financial futures with integrity and innovation.
            </p>
            <div className="flex space-x-5 text-white">
              <a
                href="https://facebook.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300 w-8 h-8 flex items-center justify-center transform"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href="https://instagram.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300 w-8 h-8 flex items-center justify-center transform"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" /><stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" /><stop offset="100%" stopColor="#bc1888" /></linearGradient></defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="mailto:info@novatrust.co.in"
                className="hover:scale-110 transition-transform duration-300 w-8 h-8 flex items-center justify-center transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.73V42.5h8.5C44.3,42.5,45,41.8,45,41V16.2z" />
                  <path fill="#1e88e5" d="M3,16.2l3.6,1.96l6.4,5.52V42.5H4.5c-0.8,0-1.5-0.7-1.5-1.5V16.2z" />
                  <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.68 24,31.93 35,23.68 36,17" />
                  <path fill="#c62828" d="M3,12.29l6.19,4.64l3.81-2.93V11.2c0-3.3,3.64-5.3,6.5-3.66L24,11l4.5-3.46 c2.86-1.64,6.5,0.36,6.5,3.66v2.8l4.8,3.69L45,12.29c0-1.1-1.3-1.7-2.3-1.1L24,25.54L5.3,11.19C4.3,10.6,3,11.2,3,12.29z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4A574]">Quick Links</h4>
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
            <h4 className="text-lg font-semibold mb-4 text-[#D4A574]">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/benefits" className="text-slate-300 hover:text-white transition-colors duration-300">Benefits</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><a href="mailto:info@novatrust.co.in" className="text-slate-300 hover:text-white transition-colors duration-300">Email Support</a></li>
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