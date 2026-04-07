import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS configuration - Get from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS environment variables not set. Using placeholder values.');
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_email: 'kartik.lahot03@gmail.com'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setLoading(false);
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setLoading(false);
        alert('Failed to send message. Please try again or contact us directly.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 pt-24 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Reach out to NovaTrust for onboarding, scheme guidance or any questions about your chit fund journey.</p>
          </div>
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">
            Back Home
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Name</span>
                  <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Your full name" required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" placeholder="name@example.com" required />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Subject</span>
                <input name="subject" value={form.subject} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" placeholder="What can we help you with?" required />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} className="mt-2 w-full min-h-[170px] rounded-3xl border border-slate-200 px-4 py-4 focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Tell us what you need." required />
              </label>

              <button type="submit" className="w-full rounded-full bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition">{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          ) : (
            <div className="rounded-3xl bg-blue-50 p-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank you!</h2>
              <p className="text-slate-700 mb-6">We have received your message and will contact you shortly.</p>
              <Link to="/" className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Return Home</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
