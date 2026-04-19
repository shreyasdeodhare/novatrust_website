import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LiveAuctionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 pb-20">
      <Header />
      <div className="flex-1 w-full px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Live Auction Experience</h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">Join our upcoming live auctions for transparent bidding, real-time member participation and trusted payout procedures.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-400 text-white font-semibold shadow-lg hover:from-emerald-500 hover:to-green-500 transition">
            Speak with us
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-xl border border-emerald-100 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto mb-6 text-4xl">🎯</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Live Auction Experience</h2>
          <p className="text-slate-700 leading-relaxed mb-6">Experience our transparent live auctions conducted through Zoom calls and online platforms. All members can participate remotely with real-time bidding and instant results.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {['Zoom Call Auctions', 'Online Bidding Platform', 'Real-time Participation'].map((item) => (
              <div key={item} className="rounded-3xl border border-emerald-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="font-semibold text-slate-900 mb-2">{item}</p>
                <p className="text-slate-600">{item === 'Zoom Call Auctions' ? 'Join live auctions through secure Zoom calls with video verification.' : item === 'Online Bidding Platform' ? 'Participate in auctions from anywhere using our secure online platform.' : 'Experience real-time bidding with instant results and transparent processes.'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiveAuctionPage;
