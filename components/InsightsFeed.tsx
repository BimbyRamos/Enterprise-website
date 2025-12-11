'use client';

import React from 'react';
import Link from 'next/link';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  category?: string;
  slug?: string;
}

export interface InsightsFeedProps {
  articles: Article[];
  isLoading?: boolean;
}

const InsightsFeed: React.FC<InsightsFeedProps> = ({ articles, isLoading = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <section className="py-3xl px-4 bg-neutral-light-gray" aria-label="Latest insights">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-2xl">
            <div className="h-10 w-64 bg-neutral-medium-gray animate-pulse rounded mx-auto mb-md" />
            <div className="h-6 w-96 bg-neutral-medium-gray animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-white rounded-card overflow-hidden shadow-card">
                <div className="w-full h-48 bg-neutral-medium-gray animate-pulse" />
                <div className="p-lg">
                  <div className="h-4 w-20 bg-neutral-medium-gray animate-pulse rounded mb-md" />
                  <div className="h-6 w-full bg-neutral-medium-gray animate-pulse rounded mb-md" />
                  <div className="h-4 w-full bg-neutral-medium-gray animate-pulse rounded mb-sm" />
                  <div className="h-4 w-5/6 bg-neutral-medium-gray animate-pulse rounded mb-md" />
                  <div className="h-4 w-24 bg-neutral-medium-gray animate-pulse rounded" />
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
      id="insights"
      className="py-16 md:py-24 px-4" 
      aria-label="Latest insights"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            className="inline-block px-4 py-2 mb-3 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              color: '#1E40AF'
            }}
          >
            Knowledge Hub
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#0F172A' }}
          >
            Latest Insights
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: '#475569' }}
          >
            Expert perspectives on ICT solutions, technology trends, and digital transformation
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {articles.slice(0, 3).map((article, index) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary-300 shadow-card hover:shadow-premium transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Image */}
              {article.featuredImage && (
                <div className="relative w-full h-56 bg-neutral-200 overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-3">
                  {article.category && (
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: 'rgba(139, 21, 56, 0.1)',
                        color: '#8B1538'
                      }}
                    >
                      {article.category}
                    </span>
                  )}
                  <time
                    dateTime={article.publishedAt}
                    className="text-xs"
                    style={{ color: '#64748B' }}
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </div>

                {/* Title */}
                <h3 
                  className="text-lg md:text-xl font-bold mb-3 transition-colors duration-300 line-clamp-2"
                  style={{ color: '#0F172A' }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p 
                  className="text-sm md:text-base mb-5 line-clamp-3 leading-relaxed"
                  style={{ color: '#475569' }}
                >
                  {article.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={article.slug ? `/insights/${article.slug}` : `/insights/${article.id}`}
                  className="inline-flex items-center font-semibold group-hover:gap-2 transition-all duration-300"
                  style={{ color: '#8B1538' }}
                >
                  <span>Read Article</span>
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
              </div>

              {/* Decorative element */}
              <div 
                className="h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{
                  background: 'linear-gradient(90deg, #8B1538 0%, #2563EB 100%)'
                }}
              />
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-button transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: '#8B1538',
              color: 'white'
            }}
          >
            Explore All Insights
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

export default InsightsFeed;
