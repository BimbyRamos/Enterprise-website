'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  technologies?: string[];
  status: 'Completed' | 'In Progress' | 'Planned';
  client?: string;
  duration?: string;
  team?: string;
  outcome?: string;
  metrics?: Array<{ label: string; value: string }>;
  challenge?: string;
  solution?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Network Modernization',
    description: 'Complete overhaul of legacy network infrastructure for a major financial institution, improving reliability and security.',
    category: 'Network Infrastructure',
    technologies: ['SD-WAN', 'Cisco', 'Fortinet'],
    status: 'Completed',
    client: 'Major Financial Institution',
    duration: '6 months',
    team: '12 specialists',
    challenge: 'Legacy infrastructure causing frequent downtime and security vulnerabilities',
    solution: 'Implemented modern SD-WAN architecture with enterprise-grade security protocols',
    outcome: 'Achieved 99.9% uptime and enhanced security posture',
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Cost Reduction', value: '35%' },
      { label: 'Security Score', value: '+85%' }
    ],
    testimonial: {
      quote: 'The transformation exceeded our expectations. Network reliability is now world-class.',
      author: 'John Martinez',
      position: 'CTO'
    }
  },
  {
    id: '2',
    title: 'Cloud Migration Initiative',
    description: 'Seamless migration of on-premise applications to cloud infrastructure, reducing operational costs by 40%.',
    category: 'Cloud Solutions',
    technologies: ['AWS', 'Azure', 'Kubernetes'],
    status: 'Completed',
    client: 'Enterprise Corporation',
    duration: '8 months',
    team: '15 engineers',
    challenge: 'Complex on-premise infrastructure with high operational costs and limited scalability',
    solution: 'Multi-cloud strategy with containerized applications and automated scaling',
    outcome: 'Zero-downtime migration with significant cost savings',
    metrics: [
      { label: 'Cost Savings', value: '40%' },
      { label: 'Performance', value: '+60%' },
      { label: 'Scalability', value: '10x' }
    ],
    testimonial: {
      quote: 'Flawless execution. Our infrastructure is now more agile and cost-effective.',
      author: 'Sarah Chen',
      position: 'VP of Operations'
    }
  },
  {
    id: '3',
    title: 'Digital Banking Platform',
    description: 'Development and deployment of a modern digital banking platform serving over 1 million users.',
    category: 'Digital Transformation',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    status: 'In Progress',
    client: 'Leading Bank',
    duration: '12 months',
    team: '20 developers',
    challenge: 'Outdated banking systems unable to meet modern customer expectations',
    solution: 'Built responsive, secure platform with real-time transactions and AI-powered insights',
    outcome: 'Enhanced customer experience with modern digital services',
    metrics: [
      { label: 'Active Users', value: '1M+' },
      { label: 'Satisfaction', value: '95%' },
      { label: 'Transactions', value: '5M/day' }
    ]
  },
  {
    id: '4',
    title: 'Cybersecurity Framework Implementation',
    description: 'Comprehensive security framework deployment including threat detection, prevention, and response systems.',
    category: 'Cybersecurity',
    technologies: ['SIEM', 'EDR', 'Zero Trust'],
    status: 'Completed',
    client: 'Healthcare Provider',
    duration: '5 months',
    team: '8 security experts',
    challenge: 'Increasing cyber threats and regulatory compliance requirements',
    solution: 'Deployed zero-trust architecture with AI-powered threat detection and response',
    outcome: 'Achieved 100% compliance and enhanced threat protection',
    metrics: [
      { label: 'Threats Blocked', value: '99.9%' },
      { label: 'Compliance', value: '100%' },
      { label: 'Response Time', value: '-75%' }
    ],
    testimonial: {
      quote: 'Our security posture has never been stronger. Peace of mind for our patients.',
      author: 'Dr. Michael Roberts',
      position: 'Chief Security Officer'
    }
  },
  {
    id: '5',
    title: 'Business Intelligence Dashboard',
    description: 'Real-time analytics platform providing actionable insights across multiple business units.',
    category: 'Data Analytics',
    technologies: ['Power BI', 'Tableau', 'Python'],
    status: 'In Progress',
    client: 'Retail Corporation',
    duration: '7 months',
    team: '10 data scientists',
    challenge: 'Data silos preventing unified business insights and strategic decision-making',
    solution: 'Integrated analytics platform with real-time dashboards and predictive modeling',
    outcome: 'Real-time insights driving strategic decisions',
    metrics: [
      { label: 'Data Sources', value: '50+' },
      { label: 'Faster Insights', value: '10x' },
      { label: 'ROI', value: '+250%' }
    ]
  },
  {
    id: '6',
    title: 'IT Infrastructure Optimization',
    description: 'Strategic assessment and optimization of IT infrastructure for improved performance and cost efficiency.',
    category: 'IT Consulting',
    technologies: ['ITIL', 'DevOps', 'Automation'],
    status: 'Completed',
    client: 'Manufacturing Company',
    duration: '4 months',
    team: '6 consultants',
    challenge: 'Inefficient IT operations causing productivity losses and high costs',
    solution: 'Implemented DevOps practices with automated workflows and ITIL best practices',
    outcome: 'Optimized infrastructure with improved ROI',
    metrics: [
      { label: 'ROI Increase', value: '200%' },
      { label: 'Efficiency', value: '+45%' },
      { label: 'Downtime', value: '-90%' }
    ],
    testimonial: {
      quote: 'Remarkable transformation. Our IT operations are now a competitive advantage.',
      author: 'David Thompson',
      position: 'Operations Director'
    }
  }
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const categories = ['All', 'Network Infrastructure', 'Cloud Solutions', 'Digital Transformation', 'Cybersecurity', 'Data Analytics', 'IT Consulting'];

  const filteredProjects = selectedCategory === 'All' 
    ? mockProjects 
    : mockProjects.filter(p => p.category === selectedCategory);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: '#16A34A', border: '#22C55E' };
      case 'In Progress':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563EB', border: '#3B82F6' };
      case 'Planned':
        return { bg: 'rgba(139, 21, 56, 0.1)', text: '#8B1538', border: '#8B1538' };
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Network Infrastructure': '🌐',
      'Cloud Solutions': '☁️',
      'Digital Transformation': '🚀',
      'Cybersecurity': '🔒',
      'Data Analytics': '📊',
      'IT Consulting': '💼'
    };
    return icons[category] || '⚡';
  };

  return (
    <section 
      id="projects" 
      className="relative py-16 md:py-24 px-4 overflow-hidden" 
      aria-label="Projects"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" style={{ opacity: 1, visibility: 'visible' }}>
          <span 
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(139, 21, 56, 0.1)',
              color: '#8B1538'
            }}
          >
            Our Work
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ 
              color: '#0F172A',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              opacity: 1,
              visibility: 'visible'
            }}
          >
            Featured Projects
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-6 rounded-full" 
            style={{ 
              background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)',
              opacity: 1
            }} 
          />
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#475569', opacity: 1 }}
          >
            Delivering excellence through innovative ICT solutions and strategic implementations that transform businesses and drive measurable results
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: selectedCategory === category ? '#8B1538' : 'white',
                color: selectedCategory === category ? 'white' : '#475569',
                border: `2px solid ${selectedCategory === category ? '#8B1538' : '#E5E7EB'}`,
                boxShadow: selectedCategory === category ? '0 4px 12px rgba(139, 21, 56, 0.2)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const statusColors = getStatusColor(project.status);

            return (
              <div
                key={project.id}
                className="group relative bg-white rounded-3xl border-2 border-neutral-200 hover:border-primary-500 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated Gradient Background */}
                <div 
                  className="absolute inset-0 transition-all duration-500 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
                    zIndex: 0
                  }}
                />

                {/* Animated Border Glow - Outside the card */}
                <div 
                  className="absolute -inset-1 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    filter: 'blur(15px)',
                    zIndex: -1
                  }}
                />
                
                <div className="relative p-8 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border-2 transition-all duration-300"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          borderColor: statusColors.border
                        }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: statusColors.text }}
                        />
                        {project.status}
                      </span>
                    </div>

                    {/* Category Icon */}
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-xl shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
                      }}
                    >
                      <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                    </div>
                  </div>

                  {/* Category Label */}
                  <div 
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 self-start"
                    style={{
                      backgroundColor: 'rgba(139, 21, 56, 0.1)',
                      color: '#8B1538'
                    }}
                  >
                    {project.category}
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary-600"
                    style={{ color: '#0F172A' }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm md:text-base leading-relaxed mb-5"
                    style={{ color: '#475569' }}
                  >
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-5">
                    {project.client && (
                      <div className="flex items-center gap-2 text-sm">
                        <span style={{ color: '#8B1538' }}>👤</span>
                        <span style={{ color: '#64748B' }}>{project.client}</span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center gap-2 text-sm">
                        <span style={{ color: '#8B1538' }}>⏱️</span>
                        <span style={{ color: '#64748B' }}>{project.duration}</span>
                      </div>
                    )}
                    {project.team && (
                      <div className="flex items-center gap-2 text-sm">
                        <span style={{ color: '#8B1538' }}>👥</span>
                        <span style={{ color: '#64748B' }}>{project.team}</span>
                      </div>
                    )}
                  </div>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {project.metrics.map((metric, idx) => (
                        <div 
                          key={idx}
                          className="text-center p-3 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: 'rgba(139, 21, 56, 0.05)',
                            border: '1px solid rgba(139, 21, 56, 0.1)'
                          }}
                        >
                          <div 
                            className="text-lg font-bold mb-1"
                            style={{ color: '#8B1538' }}
                          >
                            {metric.value}
                          </div>
                          <div 
                            className="text-xs font-medium"
                            style={{ color: '#64748B' }}
                          >
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-105"
                          style={{
                            borderColor: '#E5E7EB',
                            color: '#475569',
                            backgroundColor: '#F9FAFB'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="space-y-4 mb-5 relative" style={{ opacity: 1, zIndex: 5 }}>
                      {project.challenge && (
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="text-sm font-bold mb-2" style={{ color: '#0F172A', opacity: 1 }}>
                            Challenge
                          </h4>
                          <p className="text-sm leading-relaxed" style={{ color: '#475569', opacity: 1 }}>
                            {project.challenge}
                          </p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="text-sm font-bold mb-2" style={{ color: '#0F172A', opacity: 1 }}>
                            Solution
                          </h4>
                          <p className="text-sm leading-relaxed" style={{ color: '#475569', opacity: 1 }}>
                            {project.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-3 mt-auto pt-4">
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="flex-1 flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: '#8B1538',
                        color: '#FFFFFF',
                        opacity: 1,
                        zIndex: 10
                      }}
                    >
                      <span style={{ color: '#FFFFFF', opacity: 1 }}>
                        {isExpanded ? 'Show Less' : 'View Details'}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="#FFFFFF"
                        viewBox="0 0 24 24"
                        style={{ opacity: 1 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, transparent 100%)'
                  }}
                />

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl transition-all duration-500 group-hover:scale-x-100"
                  style={{
                    background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Success Stats Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div 
            className="relative bg-white p-8 md:p-12 rounded-3xl border border-neutral-200 shadow-premium overflow-hidden"
          >
            {/* Gradient Background */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, #8B1538 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 50%)'
              }}
            />
            
            <div className="relative z-10">
              <h3 
                className="text-2xl md:text-3xl font-bold text-center mb-8"
                style={{ color: '#0F172A' }}
              >
                Our Impact in Numbers
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '500+', label: 'Projects Delivered', icon: '🚀' },
                  { value: '98%', label: 'Success Rate', icon: '⭐' },
                  { value: '15+', label: 'Years Experience', icon: '📅' },
                  { value: '24/7', label: 'Support Available', icon: '🛡️' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div 
                      className="text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: '#8B1538' }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: '#64748B' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div 
            className="inline-block p-8 md:p-10 rounded-3xl border border-neutral-200 shadow-card bg-white"
          >
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: '#0F172A' }}
            >
              Ready to Start Your Project?
            </h3>
            <p 
              className="text-base md:text-lg mb-6 max-w-2xl"
              style={{ color: '#64748B' }}
            >
              Let's discuss how we can help transform your business with innovative ICT solutions
            </p>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)'
              }}
            >
              Get in Touch
              <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Projects;
