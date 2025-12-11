'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  businessHours: string;
  coordinates: { lat: number; lng: number };
}

interface ContactProps {
  locations: Location[];
  isLoading?: boolean;
}

const Contact: React.FC<ContactProps> = ({ locations, isLoading = false }) => {
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak with our team',
      detail: '(02) 8895 5338',
      action: 'tel:+6288955338',
      color: '#8B1538'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      description: 'Send us a message',
      detail: 'info@networldcapital.com',
      action: 'mailto:info@networldcapital.com',
      color: '#2563EB'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come to our office',
      detail: 'Makati City, Philippines',
      action: '#map',
      color: '#8B1538'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with support',
      detail: 'Available 24/7',
      action: '#chat',
      color: '#2563EB'
    }
  ];

  const quickLinks = [
    { icon: '📅', title: 'Schedule Consultation', description: 'Book a meeting with our experts' },
    { icon: '📄', title: 'Download Brochure', description: 'Get our company overview' },
    { icon: '💼', title: 'Career Opportunities', description: 'Join our growing team' },
    { icon: '🎯', title: 'Request Quote', description: 'Get a custom solution quote' },
  ];

  const location = locations[0]; // Since there's only one office

  return (
    <section 
      id="contact" 
      className="relative py-20 md:py-28 px-4 overflow-hidden" 
      aria-label="Contact Us"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 30%, #FFFFFF 70%, #F8FAFC 100%)'
      }}
    >
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-5 rounded-full backdrop-blur-md border"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              borderColor: 'rgba(139, 21, 56, 0.2)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide" style={{ color: '#8B1538' }}>
              GET IN TOUCH
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#0F172A', letterSpacing: '-0.02em' }}
          >
            Contact Us
          </h2>
          
          {/* Enhanced Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#64748B' }}
          >
            Ready to transform your business with innovative ICT solutions? Reach out to us today.
          </p>
        </div>

        {/* Main Content Grid - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Contact Methods & Quick Links */}
          <div className="space-y-6">
            {/* Contact Methods - Glass UI Cards */}
            <div 
              className="relative rounded-3xl overflow-hidden p-8"
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

              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Get In Touch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    onMouseEnter={() => setHoveredMethod(index)}
                    onMouseLeave={() => setHoveredMethod(null)}
                    className="group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: hoveredMethod === index 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: `1.5px solid ${hoveredMethod === index ? method.color + '40' : 'rgba(0, 0, 0, 0.05)'}`,
                      boxShadow: hoveredMethod === index 
                        ? `0 8px 24px ${method.color}30` 
                        : '0 2px 8px rgba(0, 0, 0, 0.05)',
                      transform: hoveredMethod === index ? 'translateY(-4px) scale(1.02)' : 'translateY(0)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
                        style={{
                          background: hoveredMethod === index 
                            ? `${method.color}15` 
                            : 'rgba(0, 0, 0, 0.03)',
                          border: `1px solid ${method.color}20`,
                          transform: hoveredMethod === index ? 'scale(1.1) rotate(-5deg)' : 'scale(1)'
                        }}
                      >
                        <span className="text-2xl">{method.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 
                          className="text-sm font-bold mb-1"
                          style={{ color: '#0F172A' }}
                        >
                          {method.title}
                        </h4>
                        <p 
                          className="text-xs mb-1"
                          style={{ color: '#64748B' }}
                        >
                          {method.description}
                        </p>
                        <p 
                          className="text-xs font-semibold truncate"
                          style={{ color: method.color }}
                        >
                          {method.detail}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div 
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    className="group p-4 rounded-xl text-left transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(139, 21, 56, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 21, 56, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <div>
                        <div 
                          className="text-sm font-bold mb-0.5"
                          style={{ color: '#0F172A' }}
                        >
                          {link.title}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: '#64748B' }}
                        >
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Office Location with Map */}
          {!isLoading && location && (
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

              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
                      border: '1px solid rgba(139, 21, 56, 0.15)'
                    }}
                  >
                    <span className="text-3xl">📍</span>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-2"
                      style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
                    >
                      Our Office
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: '#64748B' }}
                    >
                      Visit us at our headquarters
                    </p>
                  </div>
                </div>

                {/* Office Details */}
                <div className="space-y-4 mb-6">
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(139, 21, 56, 0.1)'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span style={{ color: '#8B1538', fontSize: '20px' }}>🏢</span>
                      <div>
                        <div 
                          className="text-xs font-semibold mb-1"
                          style={{ color: '#8B1538' }}
                        >
                          ADDRESS
                        </div>
                        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                          {location.address}
                        </p>
                        <p className="text-sm" style={{ color: '#64748B' }}>
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(139, 21, 56, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: '#8B1538', fontSize: '18px' }}>📞</span>
                        <div 
                          className="text-xs font-semibold"
                          style={{ color: '#8B1538' }}
                        >
                          PHONE
                        </div>
                      </div>
                      <a 
                        href={`tel:${location.phone}`} 
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#0F172A' }}
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(139, 21, 56, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: '#8B1538', fontSize: '18px' }}>✉️</span>
                        <div 
                          className="text-xs font-semibold"
                          style={{ color: '#8B1538' }}
                        >
                          EMAIL
                        </div>
                      </div>
                      <a 
                        href={`mailto:${location.email}`} 
                        className="text-sm font-medium hover:underline truncate block"
                        style={{ color: '#0F172A' }}
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(139, 21, 56, 0.1)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: '#8B1538', fontSize: '18px' }}>🕐</span>
                      <div 
                        className="text-xs font-semibold"
                        style={{ color: '#8B1538' }}
                      >
                        BUSINESS HOURS
                      </div>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                      {location.businessHours}
                    </p>
                  </div>
                </div>

                {/* Map */}
                <div 
                  id="map"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '2px solid rgba(139, 21, 56, 0.15)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Map
                    center={location.coordinates}
                    zoom={15}
                    markers={[
                      {
                        position: location.coordinates,
                        title: location.name,
                      },
                    ]}
                    className="h-[400px]"
                  />
                </div>

                {/* Get Directions Button */}
                <button
                  className="w-full mt-6 py-4 px-6 rounded-xl font-bold transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 21, 56, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.3)';
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Directions
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
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

          <div className="p-8 md:p-12 text-center">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
            >
              Ready to Get Started?
            </h3>
            <p 
              className="text-base md:text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#64748B' }}
            >
              Let's discuss how we can help transform your business with our innovative ICT solutions. 
              Our team of experts is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                  boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 21, 56, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.3)';
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Schedule a Consultation
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
              
              <button
                className="group px-8 py-4 rounded-xl font-bold transition-all duration-300"
                style={{
                  color: '#8B1538',
                  border: '2px solid #8B1538',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#8B1538';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.color = '#8B1538';
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Download Brochure
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </button>
            </div>
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

export default Contact;
