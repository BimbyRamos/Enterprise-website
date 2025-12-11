'use client';

import React from 'react';
import Button from './Button';

export interface HeroProps {
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subtext,
  ctaText,
  ctaLink,
  backgroundImage,
}) => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Premium Background with Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              role="img"
              aria-label="Hero background"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-secondary-900/95" />
          </>
        ) : (
          <>
            {/* Solid gradient background */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(135deg, #8B1538 0%, #6B0F2A 50%, #1E40AF 100%)'
              }}
            />
            {/* Animated gradient orbs */}
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)' }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ 
                backgroundColor: 'rgba(139, 21, 56, 0.2)',
                animationDelay: '0.2s'
              }}
            />
          </>
        )}
        
        {/* Grid overlay for tech feel */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 backdrop-blur-sm rounded-full text-sm font-medium"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#60A5FA' }}
          />
          ICT Solutions & Strategic Innovation
        </div>

        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
          style={{ color: 'white' }}
        >
          {headline}
        </h1>
        
        <p 
          className="text-base md:text-lg lg:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          {subtext}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              if (ctaLink.startsWith('#')) {
                const targetId = ctaLink.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  const headerOffset = 80;
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              } else {
                window.location.href = ctaLink;
              }
            }}
            className="shadow-premium hover:shadow-glow hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
            {ctaText}
            <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          
          <button
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 text-lg font-semibold rounded-button backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            style={{
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: 'white' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-xs md:text-sm"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
