import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import Footer from './Footer';

/**
 * Feature: enterprise-corporate-website, Property 10: Social media link behavior
 * Validates: Requirements 8.5
 * 
 * Property: For any social media icon in the footer, clicking it should open 
 * the corresponding URL in a new browser tab (target="_blank" with rel="noopener noreferrer")
 */

describe('Footer - Property-Based Tests', () => {
  describe('Property 10: Social media link behavior', () => {
    it('should have all social media links open in new tab with proper security attributes', () => {
      // This property test verifies that ALL social media links follow the same pattern
      // We test this by rendering the footer and checking each social link
      
      fc.assert(
        fc.property(
          // We don't need to generate random data here since we're testing a fixed set of social links
          // Instead, we verify the property holds for all existing social links
          fc.constant(null),
          () => {
            const { container } = render(<Footer />);
            
            // Find all social media links (they have aria-label starting with "Visit our")
            const socialLinks = Array.from(
              container.querySelectorAll('a[aria-label^="Visit our"]')
            ) as HTMLAnchorElement[];
            
            // Property: Every social media link must have target="_blank"
            const allHaveTargetBlank = socialLinks.every(
              (link) => link.getAttribute('target') === '_blank'
            );
            
            // Property: Every social media link must have rel="noopener noreferrer" for security
            const allHaveProperRel = socialLinks.every((link) => {
              const rel = link.getAttribute('rel');
              return rel?.includes('noopener') && rel?.includes('noreferrer');
            });
            
            // Property: Every social media link must have a valid href starting with https://
            const allHaveValidHref = socialLinks.every((link) => {
              const href = link.getAttribute('href');
              return href && href.startsWith('https://');
            });
            
            // Property: There should be at least one social media link
            const hasLinks = socialLinks.length > 0;
            
            // All properties must hold
            return allHaveTargetBlank && allHaveProperRel && allHaveValidHref && hasLinks;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should verify each individual social link has correct attributes', () => {
      // Additional property test: For each social platform, verify the link structure
      const socialPlatforms = ['LinkedIn', 'Twitter', 'Facebook', 'Instagram'];
      
      fc.assert(
        fc.property(
          fc.constantFrom(...socialPlatforms),
          (platform) => {
            const { container, unmount } = render(<Footer />);
            
            // Find the specific social link by aria-label (use getAllByLabelText since multiple renders may exist)
            const links = screen.getAllByLabelText(`Visit our ${platform} page`) as HTMLAnchorElement[];
            const link = links[0]; // Take the first one
            
            // Property: Link must exist
            const exists = link !== null;
            
            // Property: Link must open in new tab
            const opensInNewTab = link.getAttribute('target') === '_blank';
            
            // Property: Link must have security attributes
            const rel = link.getAttribute('rel');
            const hasSecurityAttrs = rel?.includes('noopener') && rel?.includes('noreferrer');
            
            // Property: Link must have valid href
            const href = link.getAttribute('href');
            const hasValidHref = href !== null && href.startsWith('https://');
            
            // Clean up after each property test
            unmount();
            
            // All properties must hold for this social platform
            return exists && opensInNewTab && hasSecurityAttrs && hasValidHref;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain link properties regardless of component state', () => {
      // Property: Social media link attributes should be consistent across multiple renders
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          (renderCount) => {
            const results = [];
            
            for (let i = 0; i < renderCount; i++) {
              const { container, unmount } = render(<Footer />);
              
              const socialLinks = Array.from(
                container.querySelectorAll('a[aria-label^="Visit our"]')
              ) as HTMLAnchorElement[];
              
              // Check that all links have the required attributes
              const allValid = socialLinks.every((link) => {
                const target = link.getAttribute('target');
                const rel = link.getAttribute('rel');
                const href = link.getAttribute('href');
                
                return (
                  target === '_blank' &&
                  rel?.includes('noopener') &&
                  rel?.includes('noreferrer') &&
                  href?.startsWith('https://')
                );
              });
              
              results.push(allValid);
              unmount();
            }
            
            // Property: All renders should produce valid links
            return results.every((result) => result === true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Additional Footer Tests', () => {
    it('should render company information section', () => {
      render(<Footer />);
      expect(screen.getByText('Enterprise Corp')).toBeInTheDocument();
    });

    it('should render newsletter signup form', () => {
      render(<Footer />);
      expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('should render quick links organized by categories', () => {
      render(<Footer />);
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Industries')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
    });

    it('should render copyright notice with current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });
  });
});
