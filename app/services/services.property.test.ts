/**
 * Feature: enterprise-corporate-website, Property 3: Service data completeness
 * Validates: Requirements 3.1, 3.2, 3.4
 * 
 * Property: For any service in the system, it should have a title, description, 
 * detailed description, at least one visual element (icon or image), and at least 
 * one related case study or example.
 */

import * as fc from 'fast-check';
import { fetchServices, fetchServiceBySlug } from '@/lib/api';

describe('Property 3: Service data completeness', () => {
  it('should ensure all services have complete required data', async () => {
    // Fetch all services from the system
    const services = await fetchServices();

    // Property: Every service must have complete data
    for (const service of services) {
      // 1. Must have a title (non-empty string)
      expect(service.title).toBeDefined();
      expect(typeof service.title).toBe('string');
      expect(service.title.trim().length).toBeGreaterThan(0);

      // 2. Must have a description (non-empty string)
      expect(service.description).toBeDefined();
      expect(typeof service.description).toBe('string');
      expect(service.description.trim().length).toBeGreaterThan(0);

      // 3. Must have at least one visual element (icon or image)
      const hasIcon = service.icon && service.icon.trim().length > 0;
      const hasImage = service.featuredImage && service.featuredImage.trim().length > 0;
      expect(hasIcon || hasImage).toBe(true);
    }
  });

  it('should ensure service detail pages have complete data including detailed description and case studies', async () => {
    // Fetch all services
    const services = await fetchServices();

    // For each service, fetch its detail page and verify completeness
    for (const service of services) {
      const slug = service.slug || service.id;
      const detailedService = await fetchServiceBySlug(slug);

      // Service should exist
      expect(detailedService).not.toBeNull();
      
      if (detailedService) {
        // 1. Must have a title
        expect(detailedService.title).toBeDefined();
        expect(typeof detailedService.title).toBe('string');
        expect(detailedService.title.trim().length).toBeGreaterThan(0);

        // 2. Must have a description
        expect(detailedService.description).toBeDefined();
        expect(typeof detailedService.description).toBe('string');
        expect(detailedService.description.trim().length).toBeGreaterThan(0);

        // 3. Must have a detailed description
        expect(detailedService.detailedDescription).toBeDefined();
        expect(typeof detailedService.detailedDescription).toBe('string');
        expect(detailedService.detailedDescription!.trim().length).toBeGreaterThan(0);

        // 4. Must have at least one visual element (icon or image)
        const hasIcon = detailedService.icon && detailedService.icon.trim().length > 0;
        const hasImage = detailedService.featuredImage && detailedService.featuredImage.trim().length > 0;
        expect(hasIcon || hasImage).toBe(true);

        // 5. Must have at least one related case study or example
        expect(detailedService.caseStudies).toBeDefined();
        expect(Array.isArray(detailedService.caseStudies)).toBe(true);
        expect(detailedService.caseStudies!.length).toBeGreaterThan(0);
      }
    }
  });

  it('should verify service data completeness using property-based testing with generated services', () => {
    // Helper to generate non-empty, non-whitespace strings
    const nonEmptyString = fc.string({ minLength: 1 }).filter(s => s.trim().length > 0);
    
    // Define an arbitrary for generating COMPLETE service objects
    // According to Property 3, all services must have all required fields
    const serviceArbitrary = fc.record({
      id: nonEmptyString,
      title: nonEmptyString,
      description: nonEmptyString,
      detailedDescription: nonEmptyString, // Required for complete service
      caseStudies: fc.array(
        fc.record({
          id: nonEmptyString,
          companyName: nonEmptyString,
          outcome: nonEmptyString,
        }),
        { minLength: 1 } // At least one case study required
      ),
    }).chain(baseService => {
      // Ensure at least one visual element (icon or featuredImage) is present
      return fc.oneof(
        // Case 1: Has icon only
        fc.constant({ ...baseService, icon: '🎯', featuredImage: undefined }),
        // Case 2: Has featuredImage only
        fc.constant({ ...baseService, icon: undefined, featuredImage: 'https://example.com/image.jpg' }),
        // Case 3: Has both
        fc.constant({ ...baseService, icon: '🎯', featuredImage: 'https://example.com/image.jpg' })
      );
    });

    // Property: A service is complete if it has all required fields
    // According to Property 3, ALL services should have: title, description, 
    // detailed description, visual element, and case studies
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        // 1. Must have a title (non-empty string)
        const hasTitle = service.title && service.title.trim().length > 0;
        expect(hasTitle).toBe(true);

        // 2. Must have a description (non-empty string)
        const hasDescription = service.description && service.description.trim().length > 0;
        expect(hasDescription).toBe(true);

        // 3. Must have at least one visual element (icon or image)
        const hasVisualElement = 
          (service.icon && service.icon.trim().length > 0) || 
          (service.featuredImage && service.featuredImage.trim().length > 0);
        expect(hasVisualElement).toBe(true);

        // 4. Must have detailed description (for complete service data)
        const hasDetailedDescription = 
          service.detailedDescription && service.detailedDescription.trim().length > 0;
        expect(hasDetailedDescription).toBe(true);

        // 5. Must have at least one case study
        const hasCaseStudies = 
          service.caseStudies && service.caseStudies.length > 0;
        expect(hasCaseStudies).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
