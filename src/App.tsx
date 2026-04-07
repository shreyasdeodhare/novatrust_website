import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutChitFundsPage from './pages/AboutChitFundsPage';
import LegalPage from './pages/LegalPage';
import SchemesPage from './pages/SchemesPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import LiveAuctionPage from './pages/LiveAuctionPage';
import BenefitsPage from './pages/BenefitsPage';

// Styles
import './styles/index.css';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
        {/* Main Route */}
          <Route path="/" element={<LandingPage />} />
        
        {/* Additional Pages */}
          <Route path="/about-chit-funds" element={<AboutChitFundsPage />} />
          <Route path="/about-us" element={<Navigate replace to="/about-chit-funds" />} />
          <Route path="/about" element={<Navigate replace to="/about-chit-funds" />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/live-auction" element={<LiveAuctionPage />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
        
        {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
};

export default App;
