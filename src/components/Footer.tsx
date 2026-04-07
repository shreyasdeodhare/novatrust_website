import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-30"></div>
                <img
                  src={`${process.env.PUBLIC_URL}/novatrust-golden-ornate-logo.svg`}
                  alt="NovaTrust Logo"
                  className="relative w-10 h-10 object-contain shadow-xl ring-2 ring-yellow-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm shadow-xl ring-2 ring-blue-300" style={{display: 'none'}}>
                  <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" fill="url(#gradient)"/>
                    <path d="M16 32 C16 24 22 20 28 20 C34 20 40 24 40 32 C40 40 34 44 28 44 C22 44 16 40 16 32 Z M48 32 C48 24 42 20 36 20 C30 20 24 24 24 32 C24 40 30 44 36 44 C42 44 48 40 48 32 Z" fill="#ffecd2" opacity="0.9"/>
                    <path d="M32 32 Q36 28 40 32 Q44 36 40 40 Q36 44 32 40 Q28 36 32 32" fill="none" stroke="#ffd89b" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                    <path d="M32 24 L36 32 L32 40 L28 32 Z" fill="#ffd89b" opacity="0.9"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#667eea"/>
                        <stop offset="100%" stop-color="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">NovaTrust Chits & Finance</h3>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Your trusted partner for secure and transparent chit funds. Building financial futures with integrity and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/novatrustchits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.59.12 4.694.287 3.94.54c-.82.277-1.518.64-2.207 1.33C.64 2.56.277 3.26 0 4.08c-.253.754-.42 1.65-.473 2.85C-.04 8.136 0 8.536 0 12.157c0 3.62-.014 4.02-.067 5.226-.053 1.2-.22 2.096-.473 2.85-.277.82-.64 1.518-1.33 2.207C.56 23.36 1.26 23.723 2.08 24c.754.253 1.65.42 2.85.473C7.864 24.04 8.264 24 11.885 24c3.62 0 4.02-.014 5.226-.067 1.2-.053 2.096-.22 2.85-.473.82-.277 1.518-.64 2.207-1.33.69-.69 1.053-1.39 1.33-2.207.253-.754.42-1.65.473-2.85.053-1.206.067-1.606.067-5.227 0-3.62.014-4.02.067-5.226.053-1.2.22-2.096.473-2.85.277-.82.64-1.518 1.33-2.207C23.36.64 22.66.277 21.84 0c-.754-.253-1.65-.42-2.85-.473C16.136-.04 15.736 0 12.115 0h-.098zM11.885 2.15c3.546 0 3.966.014 5.366.08 1.327.063 2.054.283 2.526.47.608.24 1.04.527 1.494.98.453.454.74.886.98 1.494.187.472.407 1.2.47 2.526.066 1.4.08 1.82.08 5.366 0 3.546-.014 3.966-.08 5.366-.063 1.327-.283 2.054-.47 2.526-.24.608-.527 1.04-.98 1.494-.454.453-.886.74-1.494.98-.472.187-1.2.407-2.526.47-1.4.066-1.82.08-5.366.08-3.546 0-3.966-.014-5.366-.08-1.327-.063-2.054-.283-2.526-.47-.608-.24-1.04-.527-1.494-.98-.453-.454-.74-.886-.98-1.494-.187-.472-.407-1.2-.47-2.526-.066-1.4-.08-1.82-.08-5.366 0-3.546.014-3.966.08-5.366.063-1.327.283-2.054.47-2.526.24-.608.527-1.04.98-1.494.454-.453.886-.74 1.494-.98.472-.187 1.2-.407 2.526-.47 1.4-.066 1.82-.08 5.366-.08z"/>
                  <circle cx="12" cy="12" r="3.5"/>
                </svg>
              </a>
              <a
                href="mailto:kartik.lahot03@gmail.com"
                className="text-slate-300 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
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
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Legal & Support</h4>
            <ul className="space-y-2">
              <li><Link to="/benefits" className="text-slate-300 hover:text-white transition-colors duration-300">Benefits</Link></li>
              <li><Link to="/legal" className="text-slate-300 hover:text-white transition-colors duration-300">Legal</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><a href="mailto:kartik.lahot03@gmail.com" className="text-slate-300 hover:text-white transition-colors duration-300">Email Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 NovaTrust Chits & Finance Private Limited. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Registered under Chit Funds Act, 1982 | License No: [Your License Number]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;