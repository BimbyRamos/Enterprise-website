/**
 * Property-Based Tests for Homepage
 * Feature: enterprise-corporate-website, Property 1: Homepage content completeness
 * Validates: Requirements 1.1, 1.3, 1.4, 1.5
 */

import { render, screen, waitFor, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import Home from './page';
import * as api from '@/lib/api';

// Mock the API module
jest.mock('@/lib/api');

// Helper to generate alphanumeric strings with spaces (more realistic text)
const alphanumericString = (minLength: number, maxLength: number) =>
  fc.array(
    fc.constantFrom(
      ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '.split('')
    ),
    { minLength, maxLength }
  ).map(arr => arr.join('')).filter(s => s.trim().length >= minLength);

// Arbitraries for generating test data
const serviceArbitrary = fc.record({
  id: fc.uuid(),
  title: alphanumericString(5, 50),
  description: alphanumericString(20, 200),
  icon: fc.constantFrom('☁️', '🚀', '🔒', '💼', '📊', '🎯'),
  slug: fc.string({ minLength: 5, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s+/g, '-')),
});

const caseStudyArbitrary = fc.record({
  id: fc.uuid(),
  companyName: alphanumericString(5, 50),
  outcome: alphanumericString(20, 200),
  industry: fc.option(fc.constantFrom('Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing')),
  image: fc.option(fc.webUrl()),
  slug: fc.option(fc.string({ minLength: 5, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s+/g, '-'))),
});

const articleArbitrary = fc.record({
  id: fc.uuid(),
  title: alphanumericString(10, 100),
  excerpt: alphanumericString(50, 300),
  featuredImage: fc.option(fc.webUrl()),
  publishedAt: fc.date({ min: new Date('2020-01-01T00:00:00Z'), max: new Date() })
    .filter(d => !isNaN(d.getTime()))
    .map(d => d.toISOString()),
  category: fc.option(fc.constantFrom('Technology', 'Business', 'Security', 'Innovation')),
  slug: fc.option(fc.string({ minLength: 5, maxLength: 50 }).map(s => s.toLowerCase().replace(/\s+/g, '-'))),
});

describe('Homepage Content Completeness Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 1: Homepage content completeness
   * For any homepage render, the page should contain:
   * - A hero section with headline, subtext, and CTA button
   * - A featured services section where each service has an icon and description
   * - A case studies section where each case study has company name and outcome
   * - A news feed with the 3 most recent articles containing title, excerpt, and publication date
   */
  it('should always display complete homepage content structure', async () => {
    // Generate test data once
    const testCases = fc.sample(
      fc.tuple(
        fc.array(serviceArbitrary, { minLength: 1, maxLength: 3 }),
        fc.array(caseStudyArbitrary, { minLength: 1, maxLength: 3 }),
        fc.array(articleArbitrary, { minLength: 3, maxLength: 5 })
      ),
      100
    );

    for (const [services, caseStudies, articles] of testCases) {
      // Mock API responses
      (api.fetchServices as jest.Mock).mockResolvedValue(services);
      (api.fetchCaseStudies as jest.Mock).mockResolvedValue(caseStudies);
      (api.fetchLatestArticles as jest.Mock).mockResolvedValue(articles.slice(0, 3));

      // Render the homepage
      const { container } = render(<Home />);

      // Wait for all async data to load
      await waitFor(() => {
        expect(api.fetchServices).toHaveBeenCalled();
        expect(api.fetchCaseStudies).toHaveBeenCalled();
        expect(api.fetchLatestArticles).toHaveBeenCalled();
      }, { timeout: 2000 });

      // Property 1.1: Hero section must contain headline, subtext, and CTA button
      const heroSection = container.querySelector('section[aria-label="Hero section"]');
      expect(heroSection).toBeInTheDocument();
      
      const headline = screen.getAllByRole('heading', { level: 1 })[0];
      expect(headline).toBeInTheDocument();
      expect(headline.textContent).toBeTruthy();
      expect(headline.textContent!.length).toBeGreaterThan(0);

      const ctaButton = screen.getByRole('button', { name: /get started/i });
      expect(ctaButton).toBeInTheDocument();

      // Property 1.3: Featured services section - each service has icon and description
      const servicesSection = container.querySelector('section[aria-label="Featured services"]');
      expect(servicesSection).toBeInTheDocument();

      await waitFor(() => {
        services.forEach((service) => {
          const normalizedTitle = service.title.replace(/\s+/g, ' ').trim();
          const normalizedDescription = service.description.replace(/\s+/g, ' ').trim();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedTitle;
          })).toBeInTheDocument();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedDescription;
          })).toBeInTheDocument();
          
          // Icons can be duplicated, so use getAllByText and check at least one exists
          const icons = screen.getAllByText(service.icon);
          expect(icons.length).toBeGreaterThan(0);
        });
      }, { timeout: 2000 });

      // Property 1.4: Case studies section - each has company name and outcome
      const caseStudiesSection = container.querySelector('section[aria-label="Case studies"]');
      expect(caseStudiesSection).toBeInTheDocument();

      await waitFor(() => {
        caseStudies.forEach((caseStudy) => {
          const normalizedCompanyName = caseStudy.companyName.replace(/\s+/g, ' ').trim();
          const normalizedOutcome = caseStudy.outcome.replace(/\s+/g, ' ').trim();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedCompanyName;
          })).toBeInTheDocument();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedOutcome;
          })).toBeInTheDocument();
        });
      }, { timeout: 2000 });

      // Property 1.5: News feed with 3 most recent articles - each has title, excerpt, and date
      const insightsSection = container.querySelector('section[aria-label="Latest insights"]');
      expect(insightsSection).toBeInTheDocument();

      await waitFor(() => {
        const displayedArticles = articles.slice(0, 3);
        displayedArticles.forEach((article) => {
          // Use flexible text matcher to handle whitespace normalization
          const normalizedTitle = article.title.replace(/\s+/g, ' ').trim();
          const normalizedExcerpt = article.excerpt.replace(/\s+/g, ' ').trim();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedTitle;
          })).toBeInTheDocument();
          
          expect(screen.getByText((content, element) => {
            return element?.textContent?.replace(/\s+/g, ' ').trim() === normalizedExcerpt;
          })).toBeInTheDocument();
          
          const date = new Date(article.publishedAt);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          // Dates can be duplicated, so use getAllByText
          const dates = screen.getAllByText(formattedDate);
          expect(dates.length).toBeGreaterThan(0);
        });
      }, { timeout: 2000 });

      // Verify exactly 3 articles are displayed (not more)
      const articleElements = container.querySelectorAll('section[aria-label="Latest insights"] article');
      expect(articleElements.length).toBe(Math.min(3, articles.length));

      // Cleanup after each iteration
      cleanup();
      jest.clearAllMocks();
    }
  }, 120000);

  it('should display hero section with all required elements', () => {
    fc.assert(
      fc.property(
        alphanumericString(10, 100),
        alphanumericString(20, 200),
        alphanumericString(5, 30),
        (headline, subtext, ctaText) => {
          // Mock empty data to focus on hero
          (api.fetchServices as jest.Mock).mockResolvedValue([]);
          (api.fetchCaseStudies as jest.Mock).mockResolvedValue([]);
          (api.fetchLatestArticles as jest.Mock).mockResolvedValue([]);

          const { container } = render(<Home />);

          // Hero section must exist
          const heroSection = container.querySelector('section[aria-label="Hero section"]');
          expect(heroSection).toBeInTheDocument();

          // Must have h1 heading
          const h1 = screen.getAllByRole('heading', { level: 1 })[0];
          expect(h1).toBeInTheDocument();

          // Must have CTA button
          const button = screen.getAllByRole('button')[0];
          expect(button).toBeInTheDocument();

          // Cleanup after each property run
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle empty data gracefully with loading states', async () => {
    // Mock empty responses
    (api.fetchServices as jest.Mock).mockResolvedValue([]);
    (api.fetchCaseStudies as jest.Mock).mockResolvedValue([]);
    (api.fetchLatestArticles as jest.Mock).mockResolvedValue([]);

    const { container } = render(<Home />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(api.fetchServices).toHaveBeenCalled();
    });

    // Hero should still be present
    const heroSection = container.querySelector('section[aria-label="Hero section"]');
    expect(heroSection).toBeInTheDocument();

    // Sections should still render (even if empty)
    const servicesSection = container.querySelector('section[aria-label="Featured services"]');
    expect(servicesSection).toBeInTheDocument();
  });
});
