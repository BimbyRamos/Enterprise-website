'use client';

import React, { useState } from 'react';

interface IndustryCategory {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  description: string;
  keyPoints: string[];
  stats?: { value: string; label: string }[];
}

const industriesData: IndustryCategory[] = [
  {
    id: 'pj-lhuillier',
    title: 'PJ Lhuillier Group',
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #8B1538 0%, #B91429 100%)',
    description: 'Powering the technology backbone of one of the Philippines\' most trusted conglomerates, delivering innovative solutions across diverse business verticals',
    keyPoints: [
      'Integrated enterprise technology infrastructure',
      'Multi-brand digital transformation initiatives',
      'Centralized data management and analytics',
      'Cross-business process optimization'
    ],
    stats: [
      { value: '50+', label: 'Years of Trust' },
      { value: 'Nationwide', label: 'Coverage' }
    ]
  },
  {
    id: 'financial-services',
    title: 'Financial Services & FinTech',
    icon: '💳',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    description: 'Cutting-edge financial technology solutions enabling secure, compliant, and scalable digital financial services across the Philippines',
    keyPoints: [
      'Digital payment and remittance platforms',
      'Pawnshop management systems',
      'Foreign exchange and money transfer solutions',
      'Mobile banking and digital wallet integration',
      'Regulatory compliance and security frameworks'
    ],
    stats: [
      { value: '24/7', label: 'Availability' },
      { value: 'Bank-Grade', label: 'Security' }
    ]
  },
  {
    id: 'microfinance',
    title: 'Microfinance Operations',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    description: 'Empowering financial inclusion through technology-driven microfinance solutions that serve communities and drive economic growth',
    keyPoints: [
      'Loan origination and management systems',
      'Credit scoring and risk assessment tools',
      'Mobile-first customer engagement platforms',
      'Agent network management technology',
      'Portfolio monitoring and analytics'
    ],
    stats: [
      { value: 'Inclusive', label: 'Access' },
      { value: 'Scalable', label: 'Platform' }
    ]
  },
  {
    id: 'enterprise-systems',
    title: 'Enterprise Systems',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    description: 'Comprehensive enterprise solutions that streamline operations, enhance productivity, and drive digital transformation across organizations',
    keyPoints: [
      'ERP and business management systems',
      'Workflow automation and digitization',
      'Data analytics and business intelligence',
      'Cloud infrastructure and integration',
      'Cybersecurity and compliance management'
    ],
    stats: [
      { value: 'Enterprise', label: 'Grade' },
      { value: 'Integrated', label: 'Solutions' }
    ]
  }
];

const Industries: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="industries" 
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 21, 56, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(139, 21, 56, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 20s linear infinite'
        }} />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full backdrop-blur-md border border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">
              Industries We Serve
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Driving Innovation Across
            <span className="block mt-2 bg-gradient-to-r from-red-400 via-red-500 to-blue-500 bg-clip-text text-transparent">
              Key Industry Sectors
            </span>
          </h2>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering enterprise-grade technology solutions that power growth, 
            enhance efficiency, and drive digital transformation
          </p>
        </div>

        {/* Premium Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {industriesData.map((industry, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={industry.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Card Container */}
                <div 
                  className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(10px)',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered 
                      ? '0 20px 60px rgba(139, 21, 56, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                    }}
                  />

                  {/* Top Gradient Bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                    style={{
                      background: industry.gradient,
                      transform: isHovered ? 'scaleX(1)' : 'scaleX(0.5)',
                      transformOrigin: 'left'
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    {/* Icon Container */}
                    <div className="flex items-start justify-between mb-6">
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500"
                        style={{
                          background: industry.gradient,
                          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                        }}
                      >
                        <span className="text-4xl filter drop-shadow-lg">{industry.icon}</span>
                      </div>

                      {/* Stats */}
                      {industry.stats && (
                        <div className="flex gap-3">
                          {industry.stats.map((stat, idx) => (
                            <div 
                              key={idx}
                              className="text-right"
                              style={{
                                opacity: isHovered ? 1 : 0.7,
                                transform: isHovered ? 'translateY(0)' : 'translateY(-5px)',
                                transition: 'all 0.3s ease',
                                transitionDelay: `${idx * 50}ms`
                              }}
                            >
                              <div className="text-lg font-bold text-white">{stat.value}</div>
                              <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {industry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-300 leading-relaxed mb-6">
                      {industry.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-3">
                      {industry.keyPoints.map((point, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 transition-all duration-300"
                          style={{
                            opacity: isHovered ? 1 : 0.8,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                            transitionDelay: `${idx * 50}ms`
                          }}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: industry.gradient }}
                          />
                          <span className="text-sm text-gray-400 leading-relaxed">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Shine Effect */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: industry.gradient
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium CTA Section */}
        <div className="relative mt-20">
          <div 
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(90deg, #8B1538, #2563EB, #8B1538)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '2px'
              }}
            />

            <div className="relative p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Partner with us to leverage cutting-edge technology solutions tailored to your industry needs
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)'
                }}
              >
                <span>Get Started Today</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideBackground {
          from { transform: translateX(0); }
          to { transform: translateX(60px); }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Industries;
