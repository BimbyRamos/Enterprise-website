'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuickLink {
  label: string;
  href: string;
}

interface QuickLinkCategory {
  title: string;
  links: QuickLink[];
}

const quickLinkCategories: QuickLinkCategory[] = [
  {
    title: 'Products and Services',
    links: [
      { label: 'Enterprise Architecture Consultancy', href: '/#services' },
      { label: 'Business Consultancy', href: '/#services' },
      { label: 'Platform Development Factory', href: '/#services' },
      { label: 'Platform Management (Buy & Manage)', href: '/#services' },
      { label: 'Platform Management (AI Build)', href: '/#services' },
      { label: 'Managed Cloud & Infrastructure', href: '/#services' },
      { label: 'ICT Managed Services', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Industries', href: '/#industries' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'PJ Lhuillier Group', href: '/#industries' },
      { label: 'Financial Services & FinTech', href: '/#industries' },
      { label: 'Microfinance Operations', href: '/#industries' },
      { label: 'Enterprise Systems', href: '/#industries' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
];

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/enterprise-corp',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/enterprise_corp',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/enterprisecorp',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/enterprise_corp',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const Footer: React.FC = () => {
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
      // TODO: Replace with actual API call in task 8.5
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
    <footer 
      className="text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #8B1538 100%)'
      }}
    >
      {/* Animated Background Elements */}
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

      {/* Background pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        {/* Top Accent Line */}
        <div 
          className="w-24 h-1 mx-auto mb-12 rounded-full"
          style={{ background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)' }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-block">
              <img 
                src="/Logo Footer Dec 10.jpg" 
                alt="Networld Capital Ventures, Inc." 
                className="h-20 w-auto mb-6 transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2))'
                }}
              />
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed text-base">
              The ICT arm of the PJ Lhuillier Group, delivering comprehensive technology solutions that empower businesses to thrive in the digital age.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-neutral-300">
                <span style={{ color: '#8B1538', fontSize: '18px' }}>📍</span>
                <span className="text-sm">156 Jupiter, Makati City, Metro Manila</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <span style={{ color: '#8B1538', fontSize: '18px' }}>📞</span>
                <a href="tel:(02)88955338" className="text-sm hover:text-primary-400 transition-colors">
                  (02) 8895 5338
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <span style={{ color: '#8B1538', fontSize: '18px' }}>✉️</span>
                <a href="mailto:info@networldcapital.com" className="text-sm hover:text-primary-400 transition-colors">
                  info@networldcapital.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-gradient-to-br hover:from-primary-700 hover:to-secondary-700 text-neutral-400 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-3 focus-visible-ring"
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-label={`Visit our ${social.name} page`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {quickLinkCategories.map((category, catIndex) => (
            <div key={category.title} style={{ animationDelay: `${catIndex * 100}ms` }}>
              <h3 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
                {category.title}
                <div 
                  className="h-0.5 flex-1 rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, rgba(139, 21, 56, 0.5) 0%, transparent 100%)',
                    maxWidth: '40px'
                  }}
                />
              </h3>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.href} className="group">
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary-400 transition-all duration-300 focus-visible-ring rounded inline-flex items-center gap-2"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const targetId = link.href.substring(1);
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            const headerOffset = 80;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }}
                    >
                      <span className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden">
              {/* Decorative gradient */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: 'radial-gradient(circle at 30% 50%, #8B1538 0%, transparent 70%)'
                }}
              />
              
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)'
                    }}
                  >
                    <span className="text-2xl">📬</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Stay Informed</h3>
                </div>
                <p className="text-neutral-300 mb-8 text-base">
                  Get the latest insights on ICT solutions, technology trends, and digital transformation strategies delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="flex-1 px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-all duration-300"
                    required
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: isSubmitting ? '#64748B' : 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)'
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
                {message && (
                  <div
                    className={`mt-4 p-3 rounded-xl ${
                      message.includes('Thank you') 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-neutral-400 text-sm">
              <p>
                © {new Date().getFullYear()} Networld Capital Ventures, Inc. All rights reserved.
              </p>
              <span className="hidden md:inline text-neutral-600">|</span>
              <p className="text-neutral-500">
                Part of PJ Lhuillier Group of Companies
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-neutral-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-neutral-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-neutral-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
