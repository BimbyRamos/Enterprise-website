'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/api';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    fetchServiceBySlug(slug)
      .then((data) => {
        if (!data) {
          setError('Service not found');
        } else {
          setService(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching service:', err);
        setError('Failed to load service details. Please try again later.');
        setIsLoading(false);
      });
  }, [slug]);

  // Premium Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-wide section-padding">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-2/3 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-2xl" />
            <div className="h-8 w-1/2 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-2xl" />
                ))}
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Error state
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {error === 'Service not found' ? 'Service Not Found' : 'Something Went Wrong'}
          </h1>
          <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
            {error === 'Service not found' 
              ? 'The service you are looking for does not exist or has been moved.' 
              : error}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-visible-ring"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Breadcrumb */}
      <nav className="bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-100 py-4 px-4" aria-label="Breadcrumb">
        <div className="container-wide">
          <ol className="flex items-center space-x-3 text-sm">
            <li>
              <Link href="/" className="text-neutral-500 hover:text-primary-600 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/services" className="text-neutral-500 hover:text-primary-600 transition-colors font-medium">
                Services
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-neutral-900 font-semibold">{service.title}</li>
          </ol>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        <div className="container-wide relative z-10">
          <div className="max-w-4xl animate-fade-in">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-4 mb-8">
              <div 
                className="w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  border: '1px solid rgba(139, 21, 56, 0.2)'
                }}
              >
                <span className="text-5xl" role="img" aria-label={`${service.title} icon`}>
                  {service.icon}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-8">
              {service.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 focus-visible-ring"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 font-semibold rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 transition-all duration-300 focus-visible-ring"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding px-4">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <div className="animate-slide-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Overview
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                  Transform Your Business
                </h2>
                <div className="text-lg md:text-xl text-neutral-600 leading-relaxed space-y-4">
                  {service.detailedDescription && typeof service.detailedDescription === 'string' ? (
                    <p>{service.detailedDescription}</p>
                  ) : service.detailedDescription && Array.isArray(service.detailedDescription) ? (
                    service.detailedDescription.map((block: any, index: number) => {
                      if (block.type === 'paragraph') {
                        return (
                          <p key={index}>
                            {block.children?.map((child: any, childIndex: number) => child.text).join('')}
                          </p>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p>{service.description}</p>
                  )}
                </div>
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div id="features" className="animate-slide-up animation-delay-200">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-50 text-secondary-700 rounded-full text-sm font-semibold mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="group p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg 
                              className="w-6 h-6 text-primary-600" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                              />
                            </svg>
                          </div>
                          <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium">
                            {feature}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="animate-slide-up animation-delay-400">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-semantic-success/10 text-semantic-success rounded-full text-sm font-semibold mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Benefits
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
                    Why Choose This Service
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-neutral-900 leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Stories */}
              {service.caseStudies && service.caseStudies.length > 0 && (
                <div className="animate-slide-up animation-delay-600">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Success Stories
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
                    Proven Results
                  </h2>
                  <div className="space-y-6">
                    {service.caseStudies.map((caseStudy, index) => (
                      <div 
                        key={caseStudy.id}
                        className="group p-8 rounded-2xl bg-white border-2 border-neutral-100 hover:border-primary-200 hover:shadow-2xl transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                            {caseStudy.companyName}
                          </h3>
                          {caseStudy.industry && (
                            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border border-primary-200">
                              {caseStudy.industry}
                            </span>
                          )}
                        </div>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                          {caseStudy.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Premium Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* CTA Card */}
                <div className="group p-8 rounded-2xl text-white shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600" />
                  <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">
                      Ready to Transform?
                    </h3>
                    <p className="mb-6 opacity-90 leading-relaxed">
                      Let's discuss how this service can accelerate your business growth and digital transformation journey.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full py-4 px-6 text-center font-semibold rounded-xl bg-white text-primary-700 hover:bg-neutral-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Schedule Consultation
                    </Link>
                  </div>
                </div>

                {/* Related Services */}
                {service.relatedServices && service.relatedServices.length > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 shadow-lg">
                    <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Related Services
                    </h3>
                    <ul className="space-y-2">
                      {service.relatedServices.map((relatedService) => (
                        <li key={relatedService.id}>
                          <Link
                            href={`/services/${relatedService.slug || relatedService.id}`}
                            className="flex items-center gap-3 p-4 rounded-xl hover:bg-white border border-transparent hover:border-primary-200 hover:shadow-md transition-all duration-300 group"
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                              {relatedService.icon}
                            </span>
                            <span className="font-semibold text-neutral-700 group-hover:text-primary-600 transition-colors">
                              {relatedService.title}
                            </span>
                            <svg className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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
