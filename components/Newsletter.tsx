'use client';

import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call (will be replaced with actual API in later tasks)
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="relative py-20 md:py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Top Gradient Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ 
              background: 'linear-gradient(90deg, #8B1538, #2563EB, #8B1538)', 
              backgroundSize: '200% 100%', 
              animation: 'shimmer 3s linear infinite' 
            }} 
          />

          {/* Decorative gradient overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at 30% 50%, #8B1538 0%, transparent 70%)'
            }}
          />
          
          <div className="relative p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div 
                className="w-14 h-14 flex items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)',
                  border: '1px solid rgba(139, 21, 56, 0.2)'
                }}
              >
                <span className="text-3xl">📬</span>
              </div>
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Stay Informed
              </h2>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
            </div>

            <p 
              className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#64748B' }}
            >
              Get the latest insights on ICT solutions, technology trends, and digital transformation strategies delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="flex-1 px-6 py-4 rounded-xl text-base transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid rgba(139, 21, 56, 0.15)',
                  color: '#0F172A',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8B1538';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 21, 56, 0.15)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                style={{
                  background: isSubmitting ? '#64748B' : 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                  boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 21, 56, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.3)';
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Subscribe
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl ${
                  message.includes('Thank you') 
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}
                role="status"
                aria-live="polite"
              >
                <p className="text-sm font-semibold">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
