'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import FeaturedServices from '@/components/FeaturedServices';
import Projects from '@/components/Projects';
import Industries from '@/components/Industries';
import Newsletter from '@/components/Newsletter';
import InsightsFeed from '@/components/InsightsFeed';
import ErrorBoundary from '@/components/ErrorBoundary';
import { fetchServices, fetchLatestArticles } from '@/lib/api';
import type { Service, Article } from '@/lib/api';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    // Fetch services
    fetchServices()
      .then((data) => {
        setServices(data);
        setIsLoadingServices(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setIsLoadingServices(false);
      });

    // Fetch articles
    fetchLatestArticles(3)
      .then((data) => {
        setArticles(data);
        setIsLoadingArticles(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setIsLoadingArticles(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* About Us Section */}
      <ErrorBoundary>
        <AboutUs />
      </ErrorBoundary>

      {/* Products and Services Section - Redesigned Compact Version */}
      <ErrorBoundary>
        <FeaturedServices services={services} isLoading={isLoadingServices} />
      </ErrorBoundary>

      {/* Projects Section */}
      <ErrorBoundary>
        <Projects />
      </ErrorBoundary>

      {/* Industries Section */}
      <ErrorBoundary>
        <Industries />
      </ErrorBoundary>

      {/* Insights Section */}
      <ErrorBoundary>
        <InsightsFeed articles={articles} isLoading={isLoadingArticles} />
      </ErrorBoundary>

      {/* Newsletter Section */}
      <ErrorBoundary>
        <Newsletter />
      </ErrorBoundary>
    </>
  );
}
