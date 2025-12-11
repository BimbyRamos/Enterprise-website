'use client';

import React from 'react';
import Link from 'next/link';

export interface CaseStudy {
  id: string;
  companyName: string;
  outcome: string;
  industry?: string;
  image?: string;
  slug?: string;
}

export interface CaseStudiesProps {
  caseStudies: CaseStudy[];
  isLoading?: boolean;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies, isLoading = false }) => {
  if (isLoading) {
    return (
      <section className="py-3xl px-4 bg-neutral-white" aria-label="Case studies">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-2xl">
            <div className="h-10 w-64 bg-neutral-medium-gray animate-pulse rounded mx-auto mb-md" />
            <div className="h-6 w-96 bg-neutral-medium-gray animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-light-gray rounded-card overflow-hidden">
                <div className="w-full h-48 bg-neutral-medium-gray animate-pulse" />
                <div className="p-lg">
                  <div className="h-6 w-3/4 bg-neutral-medium-gray animate-pulse rounded mb-md" />
                  <div className="h-4 w-full bg-neutral-medium-gray animate-pulse rounded mb-sm" />
                  <div className="h-4 w-5/6 bg-neutral-medium-gray animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 md:py-32 px-4 text-white relative overflow-hidden" 
      aria-label="Case studies"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1E40AF 100%)'
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: 'rgba(139, 21, 56, 0.3)',
              color: '#FCA5A5',
              border: '1px solid rgba(139, 21, 56, 0.5)'
            }}
          >
            Portfolio Success
          </span>
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{ color: 'white' }}
          >
            Proven Track Record
          </h2>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            Real results from companies we've partnered with to achieve extraordinary growth
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((caseStudy, index) => (
            <article
              key={caseStudy.id}
              className="group relative bg-neutral-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700 hover:border-primary-500/50 shadow-card hover:shadow-premium transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              {caseStudy.image && (
                <div className="relative w-full h-56 bg-neutral-700 overflow-hidden">
                  <img
                    src={caseStudy.image}
                    alt={`${caseStudy.companyName} case study`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {caseStudy.industry && (
                  <span 
                    className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4"
                    style={{
                      backgroundColor: 'rgba(37, 99, 235, 0.2)',
                      color: '#93C5FD',
                      border: '1px solid rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    {caseStudy.industry}
                  </span>
                )}
                
                <h3 
                  className="text-2xl font-bold mb-4 transition-colors duration-300"
                  style={{ color: 'white' }}
                >
                  {caseStudy.companyName}
                </h3>
                
                <p 
                  className="mb-6 leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {caseStudy.outcome}
                </p>
                
                {caseStudy.slug && (
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex items-center font-semibold group-hover:gap-2 transition-all duration-300"
                    style={{ color: '#FCA5A5' }}
                  >
                    <span>View Details</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Decorative gradient */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.2) 0%, transparent 100%)'
                }}
              />
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-sm font-semibold rounded-button transition-all duration-300 hover:bg-white/20"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Explore All Success Stories
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
