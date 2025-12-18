'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug?: string;
  detailedDescription?: string;
  features?: string[] | Array<{ title: string; description: string; icon: string }>;
  benefits?: string[];
}

export interface FeaturedServicesProps {
  services: Service[];
  isLoading?: boolean;
}

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ services, isLoading = false }) => {
  const [selectedService, setSelectedService] = useState<number>(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const serviceDetails: Record<string, {
    tagline: string;
    benefits: string[];
    features: Array<{ title: string; description: string; icon: string }>;
  }> = {
    'enterprise-architecture-consultancy': {
      tagline: 'Strategic ICT architecture aligned with business goals',
      benefits: ['EA Roadmapping', 'Technology Scanning', 'ICT Tech Governance', 'RFP Execution'],
      features: [
        { title: 'EA Roadmapping', description: 'Strategic planning', icon: '🗺️' },
        { title: 'Tech Scanning', description: 'Emerging technologies', icon: '🔍' },
        { title: 'Governance', description: 'Framework establishment', icon: '⚖️' },
        { title: 'RFP Execution', description: 'Process management', icon: '📋' }
      ]
    },
    'business-consultancy': {
      tagline: 'Optimize ICT investments and drive business growth',
      benefits: ['ICT Business Analysis', 'ICT Project Management', 'Efficiency Optimization', 'Growth Solutions'],
      features: [
        { title: 'Business Analysis', description: 'Needs assessment', icon: '📊' },
        { title: 'Project Management', description: 'ICT delivery', icon: '🎯' },
        { title: 'Optimization', description: 'Efficiency gains', icon: '⚡' },
        { title: 'Growth', description: 'Business value', icon: '💡' }
      ]
    },
    'platform-development-factory': {
      tagline: 'Custom platforms tailored to your business requirements',
      benefits: ['Custom Development', 'Scalable Architecture', 'Security Integration', 'Seamless Integration'],
      features: [
        { title: 'Custom Build', description: 'Tailored solutions', icon: '🏭' },
        { title: 'Scalability', description: 'Growth-ready', icon: '🏗️' },
        { title: 'Security', description: 'Protected systems', icon: '🔒' },
        { title: 'Integration', description: 'Seamless connection', icon: '🔄' }
      ]
    },
    'platform-management-buy': {
      tagline: 'Maximize value and performance of ICT platforms',
      benefits: ['Platform Selection', 'Procurement Support', 'Performance Management', 'Risk Minimization'],
      features: [
        { title: 'Selection', description: 'Right platform', icon: '🛠️' },
        { title: 'Procurement', description: 'Acquisition support', icon: '📋' },
        { title: 'Management', description: 'Value maximization', icon: '⚡' },
        { title: 'Risk Control', description: 'Operational safety', icon: '🔧' }
      ]
    },
    'platform-management-ai': {
      tagline: 'AI-driven solutions for automation and innovation',
      benefits: ['AI Development', 'Process Automation', 'Enhanced Decision-Making', 'Business Opportunities'],
      features: [
        { title: 'AI Platforms', description: 'Intelligent systems', icon: '🤖' },
        { title: 'Automation', description: 'Process efficiency', icon: '⚡' },
        { title: 'Decision Support', description: 'Smart insights', icon: '🧠' },
        { title: 'Innovation', description: 'New opportunities', icon: '📈' }
      ]
    },
    'managed-cloud-infrastructure': {
      tagline: 'Reliable, secure, and cost-efficient cloud operations',
      benefits: ['Cloud Management', 'Infrastructure Oversight', 'Security Assurance', 'Cost Efficiency'],
      features: [
        { title: 'Cloud Mgmt', description: 'End-to-end control', icon: '☁️' },
        { title: 'Reliability', description: 'Always available', icon: '📊' },
        { title: 'Security', description: 'Protected data', icon: '🔒' },
        { title: 'Efficiency', description: 'Cost optimized', icon: '⚡' }
      ]
    },
    'ict-managed-services': {
      tagline: 'Keep your ICT systems running smoothly 24/7',
      benefits: ['ICT Service Desk', 'Deskside Support', 'Technical Support', 'VIP Support', 'Application Management'],
      features: [
        { title: 'Service Desk', description: 'Helpdesk support', icon: '📞' },
        { title: 'Tech Support', description: 'Technical assistance', icon: '🔧' },
        { title: 'VIP Support', description: 'Priority service', icon: '⭐' },
        { title: 'App Mgmt', description: 'Fixed enhancements', icon: '💻' }
      ]
    },
    'operations-maintenance': {
      tagline: 'Consistent performance with minimal downtime',
      benefits: ['System Monitoring', 'Proactive Maintenance', 'Performance Optimization', 'Downtime Prevention'],
      features: [
        { title: 'Monitoring', description: 'Ongoing oversight', icon: '⚙️' },
        { title: 'Maintenance', description: 'Regular upkeep', icon: '🔧' },
        { title: 'Optimization', description: 'Peak performance', icon: '⚡' },
        { title: 'Reliability', description: 'Minimal downtime', icon: '✅' }
      ]
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white" aria-label="Featured services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
            <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="h-96 bg-gray-200 animate-pulse rounded-3xl" />
        </div>
      </section>
    );
  }

  const currentService = services[selectedService];
  const currentSlug = currentService?.slug || 'enterprise-architecture-consultancy';
  
  // Use CMS data if available, otherwise fall back to hardcoded details
  const cmsDetails = currentService ? {
    tagline: currentService.description || 'Comprehensive ICT solutions for your business',
    benefits: currentService.benefits || [],
    features: currentService.features || []
  } : null;
  
  const details = cmsDetails || serviceDetails[currentSlug] || {
    tagline: 'Comprehensive ICT solutions for your business',
    benefits: ['Expert Consultation', 'Tailored Solutions', 'Proven Results', 'Ongoing Support'],
    features: [
      { title: 'Consultation', description: 'Expert guidance', icon: '💡' },
      { title: 'Implementation', description: 'Seamless delivery', icon: '🚀' },
      { title: 'Support', description: '24/7 assistance', icon: '🛟' },
      { title: 'Optimization', description: 'Continuous improvement', icon: '📈' }
    ]
  };
  
  // Convert features to proper format if they're strings
  const formattedFeatures = Array.isArray(details.features) 
    ? details.features.map((feature, index) => {
        if (typeof feature === 'string') {
          return {
            title: feature,
            description: feature,
            icon: ['💡', '🚀', '🛟', '📈', '⚡', '🔧', '📊', '🎯'][index % 8]
          };
        }
        return feature;
      })
    : [];

  return (
    <section 
      id="services" 
      className="relative py-24 px-4 overflow-hidden" 
      aria-label="Featured services"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)', animation: 'float 25s ease-in-out infinite' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', animation: 'float 30s ease-in-out infinite reverse' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full backdrop-blur-md border border-red-100"
            style={{ background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)' }}>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold" style={{ color: '#8B1538' }}>What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Products & Services
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive ICT solutions designed to accelerate growth and drive digital transformation
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Click any service to explore</span>
          </div>
        </div>

        {/* Apple Glass UI Card with Premium Glassmorphism */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, #8B1538, #2563EB, #8B1538)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }} />

          {/* Glass Tabs - Horizontal Scrollable Navigation */}
          <div className="border-b relative"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
              borderColor: 'rgba(139, 21, 56, 0.1)'
            }}>
            {/* Scroll hint badge - Top right */}
            <div className="absolute top-4 right-6 z-30 scroll-indicator-animate">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-md"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.12), rgba(37, 99, 235, 0.12))',
                  color: '#8B1538',
                  border: '1.5px solid rgba(139, 21, 56, 0.25)',
                  boxShadow: '0 2px 8px rgba(139, 21, 56, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                }}>
                <svg className="w-4 h-4 scroll-arrow-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="tracking-wide">Scroll to explore</span>
                <svg className="w-4 h-4 scroll-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(139, 21, 56, 0.02) 0%, rgba(37, 99, 235, 0.02) 100%)' }} />
            
            {/* Enhanced scroll fade indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-20"
              style={{ background: 'linear-gradient(to right, rgba(248, 250, 252, 0.95), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-20"
              style={{ background: 'linear-gradient(to left, rgba(248, 250, 252, 0.95), transparent)' }} />
            
            {/* Scrollable container with enhanced padding for scrollbar */}
            <div 
              className="overflow-x-auto px-4 py-3 pb-6 relative z-10 services-scroll"
              style={{
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-3 min-w-max">
                {services.map((service, index) => {
                  const isActive = selectedService === index;
                  const isHovered = hoveredTab === index;
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(index)}
                      onMouseEnter={() => setHoveredTab(index)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className="flex-shrink-0 px-6 py-5 rounded-2xl transition-all duration-300 relative group cursor-pointer"
                      style={{
                        width: '240px',
                        background: isActive 
                          ? 'rgba(255, 255, 255, 0.95)' 
                          : isHovered 
                          ? 'rgba(255, 255, 255, 0.7)' 
                          : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: isActive 
                          ? '1.5px solid rgba(139, 21, 56, 0.2)' 
                          : '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: isActive 
                          ? '0 8px 32px rgba(139, 21, 56, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)' 
                          : isHovered 
                          ? '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.04)',
                        transform: isActive ? 'translateY(-2px) scale(1.02)' : isHovered ? 'translateY(-1px)' : 'translateY(0)'
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                          style={{ 
                            background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)',
                            animation: 'expandWidth 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                          }} />
                      )}
                      
                      <div className="flex flex-col items-center text-center gap-3 relative z-10">
                        {/* Icon container with glass effect */}
                        <div 
                          className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: isActive 
                              ? 'linear-gradient(135deg, rgba(139, 21, 56, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)'
                              : isHovered
                              ? 'linear-gradient(135deg, rgba(139, 21, 56, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)'
                              : 'rgba(0, 0, 0, 0.02)',
                            border: isActive ? '1px solid rgba(139, 21, 56, 0.15)' : '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: isActive ? 'inset 0 2px 8px rgba(139, 21, 56, 0.1)' : 'none',
                            transform: isActive ? 'scale(1.1) rotate(-3deg)' : isHovered ? 'scale(1.05)' : 'scale(1)'
                          }}
                        >
                          {/* Shine effect */}
                          {(isActive || isHovered) && (
                            <div className="absolute inset-0 opacity-30"
                              style={{ 
                                background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                                animation: 'shine 2s ease-in-out infinite'
                              }} />
                          )}
                          <span className="text-3xl relative z-10">{service.icon}</span>
                        </div>
                        
                        {/* Text content */}
                        <div className="space-y-1.5">
                          <h3 className={`font-bold transition-all duration-300 leading-tight ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                            style={{ 
                              fontSize: '0.875rem',
                              letterSpacing: '-0.01em'
                            }}>
                            {service.title}
                          </h3>
                          <p className="text-xs font-medium transition-colors duration-300" 
                            style={{ 
                              color: isActive ? '#8B1538' : '#9CA3AF',
                              letterSpacing: '0.01em'
                            }}>
                            {isActive ? '● Active' : 'Tap to explore'}
                          </p>
                        </div>
                        
                        {/* Chevron indicator for active tab */}
                        {isActive && (
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full"
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15), rgba(37, 99, 235, 0.15))',
                              animation: 'pulse 2s ease-in-out infinite'
                            }}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B1538' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139, 21, 56, 0.1) 50%, transparent 100%)' }} />
          </div>

          {/* Content Panel with Enhanced Glass UI */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Service Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0F172A' }}>
                    {currentService.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#8B1538' }}>
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B1538' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link 
                  href={`/services/${currentSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                  }}
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Right Column - Features Grid */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#8B1538' }}>
                  Core Features
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {formattedFeatures.map((feature, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(139, 21, 56, 0.1)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h5 className="font-bold text-sm mb-1" style={{ color: '#0F172A' }}>
                        {feature.title}
                      </h5>
                      <p className="text-xs text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
