import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ContactCTAForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Thank You!</h3>
        <p className="text-neutral-600 mb-6">
          Your message has been sent successfully. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto space-y-4">
      <div>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="subject"
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          name="message"
          rows={3}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-primary-600 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

const AboutUsPage = () => {
  const navigate = useNavigate();

  // Team members data
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      bio: 'With over 20 years of experience in financial services, Rajesh founded NovaTrust Chits &  Finance Private Ltd to bring transparency and technology to the traditional chit fund industry.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Sharma',
      position: 'Chief Financial Officer',
      bio: 'Priya is a chartered accountant with expertise in financial management and regulatory compliance for financial institutions.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Vikram Singh',
      position: 'Chief Technology Officer',
      bio: 'Vikram leads our technology team, bringing his experience from top fintech companies to build secure and scalable solutions.',
      image: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    {
      name: 'Ananya Patel',
      position: 'Head of Customer Relations',
      bio: 'Ananya ensures that our customers receive exceptional service and support throughout their chit fund journey.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: 2015,
      title: 'Foundation',
      description: 'NovaTrust was founded with a vision to modernize the traditional chit fund industry.'
    },
    {
      year: 2017,
      title: 'Digital Transformation',
      description: 'Launched our first digital platform for managing chit funds online.'
    },
    {
      year: 2019,
      title: 'Expansion',
      description: 'Expanded operations to 5 states across India with over 10,000 active members.'
    },
    {
      year: 2021,
      title: 'Mobile App Launch',
      description: 'Released our mobile application for Android and iOS platforms.'
    },
    {
      year: 2023,
      title: 'Industry Recognition',
      description: 'Received "Most Innovative Fintech Solution" award for our transparent chit fund management system.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/novatrust-final-logo.svg?v=12345" alt="NovaTrust Logo" className="w-10 h-10 rounded-full bg-primary-500 object-cover" />
            <h1 className="ml-3 text-xl font-bold text-neutral-900">Novatrust Chits and Finance Private Ltd</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/about-us" className="text-primary-600 font-medium">
              About Us
            </Link>
            <Link to="/schemes" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Schemes
            </Link>
            <Link to="/about-chit-funds" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Chit Funds
            </Link>
            <Link to="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Novatrust Chits and Finance Private Ltd</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              We're on a mission to make chit funds transparent, secure, and accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
                <div className="prose prose-lg">
                  <p>
                  Novatrust Chits and Finance Private Ltd was founded in 2025 with a simple yet powerful vision: to transform the traditional chit fund industry through technology, transparency, and trust.
                  </p>
                  <p>
                    Our founder, Rajesh Kumar, experienced firsthand the challenges and lack of transparency in traditional chit funds. He saw an opportunity to leverage technology to create a more secure, transparent, and accessible system for everyone.
                  </p>
                  <p>
                    What started as a small operation has now grown into one of India's most trusted chit fund management platforms, serving thousands of members across the country.
                  </p>
                  <p>
                    Today, Novatrust Chits and Finance Private Ltd continues to innovate and improve the chit fund experience, making it easier for people to save, access funds, and achieve their financial goals.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 bg-primary-100 flex items-center justify-center p-8">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                  alt="NovaTrust modern business and trust"
                  className="rounded-lg shadow-md max-h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Our Mission & Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Trust & Transparency</h3>
              <p className="text-neutral-600">
                We believe in complete transparency in all our operations. Every transaction, auction, and payment is recorded and accessible to members.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Innovation</h3>
              <p className="text-neutral-600">
                We continuously innovate to improve the chit fund experience, leveraging technology to make the process more efficient, secure, and user-friendly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Community</h3>
              <p className="text-neutral-600">
                We foster a sense of community among our members, creating a supportive environment where everyone can achieve their financial goals together.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Journey section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Our Journey</h2>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary-200 transform md:translate-x-px"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Year bubble */}
                    <div className="absolute left-0 md:left-1/2 w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold transform -translate-x-1/2 text-sm">
                      {milestone.year}
                    </div>

                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                      <div className={`bg-primary-50 rounded-lg p-4 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">{milestone.title}</h3>
                        <p className="text-neutral-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-primary-600 rounded-lg shadow-md overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Novatrust Chits and Finance Private Ltd?</h2>
              <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
                Start your journey with Novatrust Chits and Finance Private Ltd today and experience a modern, transparent approach to chit funds.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <ContactCTAForm />
                <button
                  onClick={() => navigate('/schemes')}
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                >
                  View Our Schemes
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  NT
                </div>
                <span className="ml-2 text-lg font-bold text-neutral-900">NovaTrust</span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Secure, Transparent Chits and Finance Services</p>
            </div>

            <div className="flex space-x-6">
              <Link to="/terms" className="text-neutral-500 hover:text-primary-600">
                Terms of Service
              </Link>
              <a href="#" className="text-neutral-500 hover:text-primary-600">
                Privacy Policy
              </a>
              <Link to="/contact" className="text-neutral-500 hover:text-primary-600">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Novatrust Chits and Finance Private Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
