import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LiveAuctionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 pt-24 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Live Auction Experience</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Join our upcoming live auctions for transparent bidding, real-time member participation and trusted payout procedures.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">
            Speak with us
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-xl border border-slate-200 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mx-auto mb-6 text-4xl">🎯</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Live Auction Experience</h2>
          <p className="text-slate-700 leading-relaxed mb-6">Experience our transparent live auctions conducted through Zoom calls and online platforms. All members can participate remotely with real-time bidding and instant results.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {['Zoom Call Auctions', 'Online Bidding Platform', 'Real-time Participation'].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 p-5 text-left shadow-sm">
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
