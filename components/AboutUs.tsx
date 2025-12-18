'use client';

import React, { useEffect, useState } from 'react';
import { fetchAboutUsSection, type AboutUsSection } from '@/lib/api';

const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutUsSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAboutUsSection()
      .then((data) => {
        setAboutData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching about us section:', error);
        setIsLoading(false);
      });
  }, []);

  // Loading state
  if (isLoading || !aboutData) {
    return (
      <section className="relative py-20 md:py-28 px-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="h-12 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-6" />
            <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const { companyName, mainDescription, secondaryDescription, stats, values, achievements } = aboutData;

  return (
    <section 
      id="about" 
      className="relative py-20 md:py-28 px-4 overflow-hidden" 
      aria-label="About Us"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 30%, #FFFFFF 70%, #F8FAFC 100%)'
      }}
    >
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-3"
          style={{
            background: 'radial-gradient(circle, #8B1538 0%, transparent 60%)',
            animation: 'float 35s ease-in-out infinite'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-5 rounded-full backdrop-blur-md border"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              borderColor: 'rgba(139, 21, 56, 0.2)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide" style={{ color: '#8B1538' }}>
              WHO WE ARE
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#0F172A', letterSpacing: '-0.02em' }}
          >
            About Us
          </h2>
          
          {/* Enhanced Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#64748B' }}
          >
            Empowering businesses through innovative technology solutions and strategic partnerships
          </p>
        </div>

        {/* Premium Main Content Card with Glass UI */}
        <div className="max-w-6xl mx-auto mb-20 animate-slide-up">
          <div 
            className="relative rounded-3xl overflow-hidden group"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
            }}
          >
            {/* Top Gradient Bar */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ 
                background: 'linear-gradient(90deg, #8B1538, #2563EB, #8B1538)', 
                backgroundSize: '200% 100%', 
                animation: 'shimmer 3s linear infinite' 
              }} 
            />

            {/* Decorative Corner Elements */}
            <div 
              className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top right, #8B1538 0%, transparent 70%)',
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-40 h-40 opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at bottom left, #2563EB 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 p-10 md:p-14">
              {/* Company Name with Premium Styling */}
              <div className="text-center mb-8">
                <h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 inline-block"
                  style={{ 
                    background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {companyName}
                </h3>
              </div>

              {/* Main Description */}
              <div className="space-y-6 max-w-4xl mx-auto">
                <p 
                  className="text-lg md:text-xl leading-relaxed text-center"
                  style={{ color: '#475569' }}
                  dangerouslySetInnerHTML={{ __html: mainDescription }}
                />

                {secondaryDescription && (
                  <>
                    <div 
                      className="w-16 h-1 mx-auto rounded-full"
                      style={{ background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)' }}
                    />

                    <p 
                      className="text-base md:text-lg leading-relaxed text-center"
                      style={{ color: '#64748B' }}
                      dangerouslySetInnerHTML={{ __html: secondaryDescription }}
                    />
                  </>
                )}
              </div>

              {/* Achievement Badges */}
              {achievements && achievements.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
                  {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="relative p-4 rounded-xl text-center group cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(139, 21, 56, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div className="relative z-10">
                      <div 
                        className="text-sm font-bold mb-1 transition-colors duration-300"
                        style={{ color: '#8B1538' }}
                      >
                        {achievement.title}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: '#64748B' }}
                      >
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Stats Section with Glass Cards */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animationDelay: `${index * 100}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 21, 56, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Gradient Background on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}15 100%)`
                }}
              />
              
              {/* Top Border Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: stat.color }}
              />
              
              <div className="relative z-10 p-6 text-center">
                <div 
                  className="text-4xl md:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {stat.icon}
                </div>
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-xs md:text-sm font-semibold"
                  style={{ color: '#475569' }}
                >
                  {stat.label}
                </div>
              </div>

              {/* Shine Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                  animation: 'shine 2s ease-in-out infinite'
                }} 
              />
            </div>
            ))}
          </div>
        )}

        {/* Premium Core Values Grid with Enhanced Cards */}
        {values && values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-6xl mx-auto">
            {values.map((value, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animationDelay: `${index * 150}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 21, 56, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Gradient Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)'
                }}
              />
              
              {/* Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)',
                  animation: 'expandWidth 0.5s ease-out'
                }}
              />

              <div className="relative z-10 p-8">
                {/* Icon Container with Glass Effect */}
                <div 
                  className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
                    border: '1px solid rgba(139, 21, 56, 0.15)',
                    boxShadow: 'inset 0 2px 8px rgba(139, 21, 56, 0.1)'
                  }}
                >
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ 
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                      animation: 'shine 2s ease-in-out infinite'
                    }} 
                  />
                  <span className="text-4xl relative z-10">{value.icon}</span>
                </div>
                
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
                >
                  {value.title}
                </h3>
                
                <p 
                  className="text-sm md:text-base leading-relaxed mb-4"
                  style={{ color: '#475569' }}
                >
                  {value.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {value.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: 'rgba(139, 21, 56, 0.08)',
                        color: '#8B1538',
                        border: '1px solid rgba(139, 21, 56, 0.15)'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div 
                className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(139, 21, 56, 0.1) 100%)'
                }}
              />
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
        }

        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
