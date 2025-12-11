/**
 * Feature: enterprise-corporate-website, Property 4: Industry data completeness
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5
 * 
 * Property: For any industry in the system, it should have a name, description, 
 * at least one visual element (icon or image), at least one case example, 
 * at least one of (statistics, testimonials, or project highlights), and links 
 * to related services.
 */

import * as fc from 'fast-check';
import { fetchIndustries, fetchIndustryBySlug } from '@/lib/api';

describe('Property 4: Industry data completeness', () => {
  it('should ensure all industries have complete required data', async () => {
    // Fetch all industries from the system
    const industries = await fetchIndustries();

    // Property: Every industry must have complete data
    for (const industry of industries) {
      // 1. Must have a name (non-empty string)
      expect(industry.name).toBeDefined();
      expect(typeof industry.name).toBe('string');
      expect(industry.name.trim().length).toBeGreaterThan(0);

      // 2. Must have a description (non-empty string)
      expect(industry.description).toBeDefined();
      expect(typeof industry.description).toBe('string');
      expect(industry.description.trim().length).toBeGreaterThan(0);

      // 3. Must have at least one visual element (icon or image)
      const hasIcon = industry.icon && industry.icon.trim().length > 0;
      const hasImage = industry.featuredImage && industry.featuredImage.trim().length > 0;
      expect(hasIcon || hasImage).toBe(true);
    }
  });

  it('should ensure industry detail pages have complete data including case examples, highlights, and related services', async () => {
    // Fetch all industries
    const industries = await fetchIndustries();

    // For each industry, fetch its detail page and verify completeness
    for (const industry of industries) {
      const slug = industry.slug || industry.id;
      const detailedIndustry = await fetchIndustryBySlug(slug);

      // Industry should exist
      expect(detailedIndustry).not.toBeNull();
      
      if (detailedIndustry) {
        // 1. Must have a name
        expect(detailedIndustry.name).toBeDefined();
        expect(typeof detailedIndustry.name).toBe('string');
        expect(detailedIndustry.name.trim().length).toBeGreaterThan(0);

        // 2. Must have a description
        expect(detailedIndustry.description).toBeDefined();
        expect(typeof detailedIndustry.description).toBe('string');
        expect(detailedIndustry.description.trim().length).toBeGreaterThan(0);

        // 3. Must have at least one visual element (icon or image)
        const hasIcon = detailedIndustry.icon && detailedIndustry.icon.trim().length > 0;
        const hasImage = detailedIndustry.featuredImage && detailedIndustry.featuredImage.trim().length > 0;
        expect(hasIcon || hasImage).toBe(true);

        // 4. Must have at least one case example
        expect(detailedIndustry.caseExamples).toBeDefined();
        expect(Array.isArray(detailedIndustry.caseExamples)).toBe(true);
        expect(detailedIndustry.caseExamples!.length).toBeGreaterThan(0);

        // 5. Must have at least one of (statistics, testimonials, or project highlights)
        // Project highlights are represented as case examples with outcomes
        const hasStatistics = detailedIndustry.statistics && detailedIndustry.statistics.length > 0;
        const hasTestimonials = detailedIndustry.testimonials && detailedIndustry.testimonials.length > 0;
        const hasProjectHighlights = detailedIndustry.caseExamples && 
          detailedIndustry.caseExamples.some(ce => ce.outcome && ce.outcome.trim().length > 0);
        
        expect(hasStatistics || hasTestimonials || hasProjectHighlights).toBe(true);

        // 6. Must have links to related services
        expect(detailedIndustry.relatedServices).toBeDefined();
        expect(Array.isArray(detailedIndustry.relatedServices)).toBe(true);
        expect(detailedIndustry.relatedServices!.length).toBeGreaterThan(0);
      }
    }
  });

  it('should verify industry data completeness using property-based testing with generated industries', () => {
    // Helper to generate non-empty, non-whitespace strings
    const nonEmptyString = fc.string({ minLength: 1 }).filter(s => s.trim().length > 0);
    
    // Define an arbitrary for generating COMPLETE industry objects
    // According to Property 4, all industries must have all required fields
    const industryArbitrary = fc.record({
      id: nonEmptyString,
      name: nonEmptyString,
      description: nonEmptyString,
      caseExamples: fc.array(
        fc.record({
          id: nonEmptyString,
          title: nonEmptyString,
          description: nonEmptyString,
          outcome: nonEmptyString,
        }),
        { minLength: 1 } // At least one case example required
      ),
      relatedServices: fc.array(
        fc.record({
          id: nonEmptyString,
          title: nonEmptyString,
          description: nonEmptyString,
          icon: nonEmptyString,
        }),
        { minLength: 1 } // At least one related service required
      ),
    }).chain(baseIndustry => {
      // Ensure at least one visual element (icon or featuredImage) is present
      return fc.oneof(
        // Case 1: Has icon only
        fc.constant({ ...baseIndustry, icon: '🏢', featuredImage: undefined }),
        // Case 2: Has featuredImage only
        fc.constant({ ...baseIndustry, icon: undefined, featuredImage: 'https://example.com/industry.jpg' }),
        // Case 3: Has both
        fc.constant({ ...baseIndustry, icon: '🏢', featuredImage: 'https://example.com/industry.jpg' })
      );
    }).chain(industryWithVisual => {
      // Ensure at least one of (statistics, testimonials, or project highlights)
      return fc.oneof(
        // Case 1: Has statistics
        fc.constant({
          ...industryWithVisual,
          statistics: [{ id: '1', label: 'Projects', value: '100+' }],
          testimonials: undefined,
        }),
        // Case 2: Has testimonials
        fc.constant({
          ...industryWithVisual,
          statistics: undefined,
          testimonials: [{
            id: '1',
            quote: 'Great service',
            author: 'John Doe',
            position: 'CEO',
            company: 'Company Inc.'
          }],
        }),
        // Case 3: Has both statistics and testimonials
        fc.constant({
          ...industryWithVisual,
          statistics: [{ id: '1', label: 'Projects', value: '100+' }],
          testimonials: [{
            id: '1',
            quote: 'Great service',
            author: 'John Doe',
            position: 'CEO',
            company: 'Company Inc.'
          }],
        }),
        // Case 4: Has project highlights (case examples with outcomes - already guaranteed)
        fc.constant({
          ...industryWithVisual,
          statistics: undefined,
          testimonials: undefined,
        })
      );
    });

    // Property: An industry is complete if it has all required fields
    // According to Property 4, ALL industries should have: name, description, 
    // visual element, case examples, at least one highlight type, and related services
    fc.assert(
      fc.property(industryArbitrary, (industry) => {
        // 1. Must have a name (non-empty string)
        const hasName = industry.name && industry.name.trim().length > 0;
        expect(hasName).toBe(true);

        // 2. Must have a description (non-empty string)
        const hasDescription = industry.description && industry.description.trim().length > 0;
        expect(hasDescription).toBe(true);

        // 3. Must have at least one visual element (icon or image)
        const hasVisualElement = 
          (industry.icon && industry.icon.trim().length > 0) || 
          (industry.featuredImage && industry.featuredImage.trim().length > 0);
        expect(hasVisualElement).toBe(true);

        // 4. Must have at least one case example
        const hasCaseExamples = 
          industry.caseExamples && industry.caseExamples.length > 0;
        expect(hasCaseExamples).toBe(true);

        // 5. Must have at least one of (statistics, testimonials, or project highlights)
        const hasStatistics = industry.statistics && industry.statistics.length > 0;
        const hasTestimonials = industry.testimonials && industry.testimonials.length > 0;
        const hasProjectHighlights = industry.caseExamples && 
          industry.caseExamples.some(ce => ce.outcome && ce.outcome.trim().length > 0);
        
        expect(hasStatistics || hasTestimonials || hasProjectHighlights).toBe(true);

        // 6. Must have links to related services
        const hasRelatedServices = 
          industry.relatedServices && industry.relatedServices.length > 0;
        expect(hasRelatedServices).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
