'use client';

import React from 'react';

interface ServiceDetailProps {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  index: number;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  id,
  slug,
  icon,
  title,
  description,
  index
}) => {
  // Enhanced service information
  const serviceDetails: Record<string, {
    tagline: string;
    benefits: string[];
    features: Array<{ title: string; description: string; icon: string }>;
    stats: Array<{ value: string; label: string }>;
  }> = {
    'network-infrastructure': {
      tagline: 'Building the backbone of your digital infrastructure',
      benefits: [
        'Reduce downtime by up to 99.9% with redundant systems',
        'Scale seamlessly as your business grows',
        'Enterprise-grade security protecting your data',
        'Expert 24/7 monitoring and support'
      ],
      features: [
        { title: 'SD-WAN Solutions', description: 'Intelligent routing for optimal performance', icon: '🌐' },
        { title: 'Network Security', description: 'Multi-layered protection against threats', icon: '🛡️' },
        { title: 'Load Balancing', description: 'Distribute traffic for maximum efficiency', icon: '⚖️' },
        { title: 'Monitoring & Analytics', description: 'Real-time insights into network health', icon: '📊' }
      ],
      stats: [
        { value: '99.9%', label: 'Uptime Guarantee' },
        { value: '<10ms', label: 'Average Latency' },
        { value: '24/7', label: 'Expert Support' }
      ]
    },
    'digital-transformation': {
      tagline: 'Transform your business for the digital age',
      benefits: [
        'Streamline operations with intelligent automation',
        'Enhance customer experience across all touchpoints',
        'Make data-driven decisions with advanced analytics',
        'Stay competitive in rapidly evolving markets'
      ],
      features: [
        { title: 'Process Automation', description: 'Eliminate manual tasks and boost efficiency', icon: '⚡' },
        { title: 'Cloud Migration', description: 'Seamless transition to cloud infrastructure', icon: '☁️' },
        { title: 'Digital Strategy', description: 'Roadmap for your digital journey', icon: '🗺️' },
        { title: 'Change Management', description: 'Smooth adoption across your organization', icon: '🔄' }
      ],
      stats: [
        { value: '40%', label: 'Cost Reduction' },
        { value: '3x', label: 'Faster Processes' },
        { value: '85%', label: 'User Adoption' }
      ]
    },
    'cloud-solutions': {
      tagline: 'Scalable, secure, and cost-effective cloud infrastructure',
      benefits: [
        'Pay only for what you use with flexible pricing',
        'Scale resources up or down instantly',
        'Access your data from anywhere, anytime',
        'Automatic backups and disaster recovery'
      ],
      features: [
        { title: 'Multi-Cloud Strategy', description: 'Leverage AWS, Azure, and Google Cloud', icon: '☁️' },
        { title: 'Cloud Migration', description: 'Seamless transition with zero downtime', icon: '🚀' },
        { title: 'Auto-Scaling', description: 'Automatic resource optimization', icon: '📈' },
        { title: 'Disaster Recovery', description: 'Business continuity guaranteed', icon: '🔄' }
      ],
      stats: [
        { value: '50%', label: 'Cost Savings' },
        { value: '10x', label: 'Faster Deployment' },
        { value: '99.99%', label: 'Availability' }
      ]
    },
    'cybersecurity': {
      tagline: 'Comprehensive protection against evolving cyber threats',
      benefits: [
        'Protect sensitive data with military-grade encryption',
        'Detect and respond to threats in real-time',
        'Ensure compliance with industry regulations',
        'Minimize risk with proactive security measures'
      ],
      features: [
        { title: 'Threat Detection', description: 'AI-powered threat identification', icon: '🔍' },
        { title: 'Security Audits', description: 'Comprehensive vulnerability assessments', icon: '🔐' },
        { title: 'Compliance Management', description: 'Meet regulatory requirements', icon: '📋' },
        { title: 'Incident Response', description: '24/7 security operations center', icon: '🚨' }
      ],
      stats: [
        { value: '99.9%', label: 'Threat Detection' },
        { value: '<5min', label: 'Response Time' },
        { value: '100%', label: 'Compliance Rate' }
      ]
    },
    'data-analytics': {
      tagline: 'Transform data into actionable business intelligence',
      benefits: [
        'Make informed decisions with real-time insights',
        'Identify trends and opportunities before competitors',
        'Optimize operations with predictive analytics',
        'Visualize complex data in intuitive dashboards'
      ],
      features: [
        { title: 'Real-time Analytics', description: 'Instant insights from your data', icon: '⚡' },
        { title: 'Predictive Modeling', description: 'Forecast trends and outcomes', icon: '🔮' },
        { title: 'Custom Dashboards', description: 'Tailored visualizations for your needs', icon: '📊' },
        { title: 'Data Integration', description: 'Unified view across all sources', icon: '🔗' }
      ],
      stats: [
        { value: '10x', label: 'Faster Insights' },
        { value: '95%', label: 'Accuracy Rate' },
        { value: 'Real-time', label: 'Data Processing' }
      ]
    },
    'it-consulting': {
      tagline: 'Strategic guidance for your technology initiatives',
      benefits: [
        'Align technology with business objectives',
        'Optimize IT investments for maximum ROI',
        'Navigate complex technology decisions with confidence',
        'Accelerate digital initiatives with expert guidance'
      ],
      features: [
        { title: 'Strategic Planning', description: 'Long-term technology roadmaps', icon: '🎯' },
        { title: 'Technology Assessment', description: 'Evaluate current infrastructure', icon: '🔍' },
        { title: 'Vendor Selection', description: 'Choose the right technology partners', icon: '🤝' },
        { title: 'Implementation Support', description: 'Hands-on guidance throughout', icon: '🛠️' }
      ],
      stats: [
        { value: '200%', label: 'Average ROI' },
        { value: '30%', label: 'Cost Optimization' },
        { value: '15+', label: 'Years Experience' }
      ]
    }
  };

  const details = serviceDetails[slug] || serviceDetails['network-infrastructure'];
  const isEven = index % 2 === 0;

  return (
    <section 
      id={slug || id} 
      className="relative py-16 md:py-20 px-4 scroll-mt-20 overflow-hidden"
      style={{
        background: isEven 
          ? 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
      }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div 
          className={`absolute ${isEven ? 'top-20 right-10' : 'bottom-20 left-10'} w-96 h-96 rounded-full`}
          style={{
            background: `radial-gradient(circle, ${isEven ? '#8B1538' : '#2563EB'} 0%, transparent 70%)`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <div 
              className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center rounded-2xl shadow-lg group hover:scale-110 hover:rotate-3 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
              }}
            >
              <span className="text-5xl md:text-6xl" role="img" aria-label={`${title} icon`}>
                {icon}
              </span>
            </div>
            <div className="flex-1">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ color: '#0F172A' }}
              >
                {title}
              </h2>
              <p 
                className="text-lg md:text-xl font-medium mb-4"
                style={{ color: '#8B1538' }}
              >
                {details.tagline}
              </p>
              <p 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#475569' }}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
            {details.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-200 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-1 text-center group"
              >
                <div 
                  className="text-2xl md:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: '#8B1538' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-xs md:text-sm font-medium"
                  style={{ color: '#64748B' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              style={{ color: '#0F172A' }}
            >
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-white p-6 rounded-2xl border border-neutral-200 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.03) 0%, rgba(37, 99, 235, 0.03) 100%)'
                    }}
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <div 
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                      }}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-lg font-bold mb-2"
                        style={{ color: '#0F172A' }}
                      >
                        {feature.title}
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#64748B' }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-200 shadow-card relative overflow-hidden">
            {/* Decorative background */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, #8B1538 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 50%)'
              }}
            />
            
            <div className="relative z-10">
              <h3 
                className="text-2xl md:text-3xl font-bold mb-8 text-center"
                style={{ color: '#0F172A' }}
              >
                Why Choose This Solution?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.benefits.map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 group"
                  >
                    <div 
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)'
                      }}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="white" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: '#475569' }}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
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
      `}</style>
    </section>
  );
};

export default ServiceDetail;
