import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BecomeAgentPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fffc] pt-16">
      <Header />

      <section className="relative overflow-hidden bg-[#ecfdf5]">
        <div className="absolute left-0 top-6 grid grid-cols-5 gap-4 opacity-60">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} className="h-5 w-5 rounded-full bg-[#4d818c]/10" />
          ))}
        </div>

        <div className="mx-auto grid min-h-[300px] max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-[#056160] md:text-5xl">Become Our Agent</h1>
            <p className="mt-4 max-w-xl text-base font-semibold text-slate-700">
              Join NovaTrust Chits to empower yourself and materialize your dreams.
            </p>
          </div>

          <div className="relative h-56 overflow-hidden rounded-2xl border border-[#D4A574]/60 shadow-xl md:h-72">
            <img src="/indian_business_woman.png" alt="NovaTrust agent consultant" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#056160]/30 via-transparent to-[#D4A574]/20" />
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border border-[#D4A574]/50 bg-white p-6 shadow-xl md:p-8">
            <h2 className="text-2xl font-bold text-slate-950">
              Registering As An Agent/Consultant With NovaTrust Chits Private Limited
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              NovaTrust Chits gives you an excellent opportunity to empower yourself financially and add value to people's lives. We are looking for agents and consultants to work with us to enroll people in chit plans and build disciplined savings within the community.
            </p>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-[#056160]">Who can be an Agent/Consultant?</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                Anyone who wants to represent NovaTrust Chits with trust, responsibility, and professionalism can apply.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 md:text-base">
                <li className="rounded-2xl bg-[#ecfdf5] px-4 py-3">Minimum qualification: 12th pass or equivalent from a recognised board or institution.</li>
                <li className="rounded-2xl bg-[#ecfdf5] px-4 py-3">Age: 18 years and above.</li>
                <li className="rounded-2xl bg-[#ecfdf5] px-4 py-3">Good communication skills and a willingness to guide customers responsibly.</li>
              </ul>
            </div>

            <div className="mt-10 rounded-3xl bg-[#056160] p-6 text-white">
              <h3 className="text-xl font-bold">Agent Responsibilities</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                Agents help explain NovaTrust Chits plans, assist interested customers, and coordinate with the company team for onboarding and follow-up.
              </p>
            </div>
          </section>

          <aside className="rounded-3xl border border-[#D4A574]/40 bg-[#eef8ff] p-6 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">We'd love to hear from you</h2>
                  <p className="mt-1 text-sm font-medium text-slate-600">Please fill out the form and our team will contact you.</p>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Name</span>
                  <input className="mt-2 w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" placeholder="Full name" required />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Mobile Number</span>
                  <input type="tel" className="mt-2 w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" placeholder="Mobile number" required />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Alternative Mobile Number</span>
                  <input type="tel" className="mt-2 w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" placeholder="Alternative mobile number" />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Email Address</span>
                  <input type="email" className="mt-2 w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" placeholder="Email address" required />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Query Type</span>
                  <select className="mt-2 w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" defaultValue="agent">
                    <option value="agent">Become an Agent</option>
                    <option value="consultant">Become a Consultant</option>
                    <option value="callback">Request Callback</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Message</span>
                  <textarea className="mt-2 min-h-[100px] w-full rounded-xl border border-transparent bg-white px-4 py-3 outline-none focus:border-[#056160] focus:ring-2 focus:ring-[#056160]/20" placeholder="Type your message" />
                </label>

                <button type="submit" className="rounded-full bg-[#056160] px-8 py-3 font-bold text-white shadow-lg transition hover:bg-[#044c4c]">
                  Submit
                </button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <h2 className="text-2xl font-bold text-slate-950">Thank you!</h2>
                <p className="mt-3 text-slate-700">Your agent enquiry has been received.</p>
                <Link to="/" className="mt-6 inline-flex rounded-full bg-[#056160] px-6 py-3 font-bold text-white transition hover:bg-[#044c4c]">
                  Back to Home
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeAgentPage;
