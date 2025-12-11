'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchServices } from '@/lib/api';
import type { Service } from '@/lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Skeleton */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="h-12 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-6" />
            <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
        </section>

        {/* Services Grid Skeleton */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-xl mb-6" />
                  <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-red text-white font-semibold rounded-lg hover:bg-primary-dark-red transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="py-20 px-4"
        style={{
          background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span 
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: 'rgba(139, 21, 56, 0.1)',
              color: '#8B1538'
            }}
          >
            Our Services
          </span>
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: '#0F172A' }}
          >
            Comprehensive Solutions for Your Business
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: '#475569' }}
          >
            Explore our full range of services designed to drive innovation, enhance efficiency, and accelerate your business growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug || service.id}`}
                className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red focus-visible:ring-offset-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.03) 0%, rgba(37, 99, 235, 0.03) 100%)'
                  }}
                />
                
                <div className="relative flex flex-col h-full">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                    }}
                  >
                    <span className="text-3xl" role="img" aria-label={`${service.title} icon`}>
                      {service.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ color: '#0F172A' }}
                  >
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p 
                    className="text-base flex-grow leading-relaxed mb-6"
                    style={{ color: '#475569' }}
                  >
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div 
                    className="flex items-center font-semibold group-hover:gap-2 transition-all duration-300"
                    style={{ color: '#8B1538' }}
                  >
                    <span>Learn More</span>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: '#0F172A' }}
          >
            Ready to Get Started?
          </h2>
          <p 
            className="text-lg mb-8"
            style={{ color: '#475569' }}
          >
            Contact us today to discuss how our services can help transform your business
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: '#8B1538',
              color: 'white'
            }}
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
