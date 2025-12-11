'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import FeaturedServices from '@/components/FeaturedServices';
import Projects from '@/components/Projects';
import Industries from '@/components/Industries';
import ErrorBoundary from '@/components/ErrorBoundary';
import { fetchServices } from '@/lib/api';
import type { Service } from '@/lib/api';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

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
  }, []);

  return (
    <>
      {/* Hero Section */}
      <ErrorBoundary>
        <Hero
          headline="Empowering Innovation Through ICT Solutions"
          subtext="Networld Capital Ventures, Inc. - The ICT arm of the PJ Lhuillier Group, delivering comprehensive technology solutions"
          ctaText="Explore Solutions"
          ctaLink="/contact"
        />
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
    </>
  );
}
