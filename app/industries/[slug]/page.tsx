'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchIndustryBySlug } from '@/lib/api';
import type { Industry } from '@/lib/api';

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    fetchIndustryBySlug(slug)
      .then((data) => {
        if (!data) {
          setError('Industry not found');
        } else {
          setIndustry(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching industry:', err);
        setError('Failed to load industry details. Please try again later.');
        setIsLoading(false);
      });
  }, [slug]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded mb-6" />
          <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !industry) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error === 'Industry not found' ? 'Industry Not Found' : 'Oops! Something went wrong'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error === 'Industry not found' 
              ? 'The industry you are looking for does not exist.' 
              : error}
          </p>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-red text-white font-semibold rounded-lg hover:bg-primary-dark-red transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/industries" className="text-gray-500 hover:text-gray-700">
                Industries
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{industry.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-20 h-20 flex items-center justify-center rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
              }}
            >
              <span className="text-4xl" role="img" aria-label={`${industry.name} icon`}>
                {industry.icon}
              </span>
            </div>
            <div>
              <h1 
                className="text-4xl md:text-5xl font-bold"
                style={{ color: '#0F172A' }}
              >
                {industry.name}
              </h1>
            </div>
          </div>
          <p 
            className="text-xl max-w-3xl"
            style={{ color: '#475569' }}
          >
            {industry.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Statistics */}
              {industry.statistics && industry.statistics.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ color: '#0F172A' }}
                  >
                    Our Impact
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {industry.statistics.map((stat) => (
                      <div 
                        key={stat.id}
                        className="p-6 rounded-xl text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)'
                        }}
                      >
                        <div 
                          className="text-3xl font-bold mb-2"
                          style={{ color: '#8B1538' }}
                        >
                          {stat.value}
                        </div>
                        <div 
                          className="text-sm font-medium"
                          style={{ color: '#475569' }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Examples */}
              {industry.caseExamples && industry.caseExamples.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ color: '#0F172A' }}
                  >
                    Success Stories
                  </h2>
                  <div className="space-y-6">
                    {industry.caseExamples.map((caseExample) => (
                      <div 
                        key={caseExample.id}
                        className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                      >
                        <h3 
                          className="text-xl font-bold mb-3"
                          style={{ color: '#0F172A' }}
                        >
                          {caseExample.title}
                        </h3>
                        <p 
                          className="text-base mb-4"
                          style={{ color: '#475569' }}
                        >
                          {caseExample.description}
                        </p>
                        <div 
                          className="p-4 rounded-lg mb-3"
                          style={{
                            backgroundColor: 'rgba(139, 21, 56, 0.05)'
                          }}
                        >
                          <div 
                            className="text-sm font-semibold mb-1"
                            style={{ color: '#8B1538' }}
                          >
                            Outcome
                          </div>
                          <p 
                            className="text-base"
                            style={{ color: '#0F172A' }}
                          >
                            {caseExample.outcome}
                          </p>
                        </div>
                        {caseExample.metrics && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg 
                              className="w-5 h-5" 
                              fill="none" 
                              stroke="#8B1538" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                              />
                            </svg>
                            <span style={{ color: '#475569' }}>
                              {caseExample.metrics}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {industry.testimonials && industry.testimonials.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ color: '#0F172A' }}
                  >
                    Client Testimonials
                  </h2>
                  <div className="space-y-6">
                    {industry.testimonials.map((testimonial) => (
                      <div 
                        key={testimonial.id}
                        className="p-8 rounded-xl border border-gray-200 bg-gray-50"
                      >
                        <svg 
                          className="w-10 h-10 mb-4 opacity-20" 
                          fill="#8B1538" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p 
                          className="text-lg mb-6 italic"
                          style={{ color: '#0F172A' }}
                        >
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                            style={{ backgroundColor: '#8B1538' }}
                          >
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <div 
                              className="font-bold"
                              style={{ color: '#0F172A' }}
                            >
                              {testimonial.author}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ color: '#475569' }}
                            >
                              {testimonial.position}, {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {industry.relatedArticles && industry.relatedArticles.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ color: '#0F172A' }}
                  >
                    Related Insights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {industry.relatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/insights/${article.slug || article.id}`}
                        className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all"
                      >
                        {article.category && (
                          <span 
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
                            style={{
                              backgroundColor: 'rgba(139, 21, 56, 0.1)',
                              color: '#8B1538'
                            }}
                          >
                            {article.category}
                          </span>
                        )}
                        <h3 
                          className="text-lg font-bold mb-2 group-hover:text-primary-red transition-colors"
                          style={{ color: '#0F172A' }}
                        >
                          {article.title}
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: '#475569' }}
                        >
                          {article.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* CTA Card */}
                <div 
                  className="p-8 rounded-2xl text-white"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538 0%, #B91429 100%)'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="mb-6 opacity-90">
                    Let's discuss how our industry expertise can help you achieve your goals.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full py-3 px-6 text-center font-semibold rounded-lg bg-white hover:bg-gray-100 transition-colors"
                    style={{ color: '#8B1538' }}
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Related Services */}
                {industry.relatedServices && industry.relatedServices.length > 0 && (
                  <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                    <h3 
                      className="text-xl font-bold mb-4"
                      style={{ color: '#0F172A' }}
                    >
                      Related Services
                    </h3>
                    <ul className="space-y-3">
                      {industry.relatedServices.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`/services/${service.slug || service.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
                          >
                            <span className="text-2xl">{service.icon}</span>
                            <span 
                              className="font-medium group-hover:text-primary-red transition-colors"
                              style={{ color: '#0F172A' }}
                            >
                              {service.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
