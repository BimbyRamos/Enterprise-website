'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProjects, type Project } from '@/lib/api';

// Map Strapi status values to display values
const mapProjectStatus = (status: string): 'Completed' | 'In Progress' | 'Planned' => {
  if (status === 'InProgress') return 'In Progress';
  if (status === 'Completed') return 'Completed';
  if (status === 'Planned') return 'Planned';
  return 'Completed'; // Default fallback
};

const mockProjects: any[] = [
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Strapi on component mount
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const PROJECTS_PER_PAGE = 12;

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div 
      className="min-h-screen relative py-16 md:py-24 px-4 overflow-hidden" 
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <button 
            onClick={() => {
              router.push('/#projects');
              // Small delay to ensure navigation completes before scrolling
              setTimeout(() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  const headerOffset = 80;
                  const elementPosition = projectsSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-4 transition-colors duration-300 hover:opacity-80 cursor-pointer"
            style={{ color: '#8B1538' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#0F172A' }}
          >
            All Projects
          </h1>
          <div 
            className="w-24 h-1 mx-auto mb-6 rounded-full" 
            style={{ background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)' }} 
          />
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#475569' }}
          >
            Explore our complete portfolio of innovative ICT solutions and successful implementations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {currentProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const mappedStatus = mapProjectStatus(project.status);
            const statusColors = getStatusColor(mappedStatus);

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

                {/* Animated Border Glow */}
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
                      {mappedStatus}
                    </span>

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
                    <div className="space-y-4 mb-5">
                      {project.challenge && (
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="text-sm font-bold mb-2" style={{ color: '#0F172A' }}>
                            Challenge
                          </h4>
                          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                            {project.challenge}
                          </p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="text-sm font-bold mb-2" style={{ color: '#0F172A' }}>
                            Solution
                          </h4>
                          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                            {project.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="flex gap-3 mt-auto pt-4">
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="flex-1 flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: '#8B1538',
                        color: '#FFFFFF'
                      }}
                    >
                      <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: currentPage === 1 ? '#E5E7EB' : '#8B1538',
                color: currentPage === 1 ? '#9CA3AF' : 'white'
              }}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: currentPage === page ? '#8B1538' : 'white',
                  color: currentPage === page ? 'white' : '#475569',
                  border: `2px solid ${currentPage === page ? '#8B1538' : '#E5E7EB'}`
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: currentPage === totalPages ? '#E5E7EB' : '#8B1538',
                color: currentPage === totalPages ? '#9CA3AF' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
