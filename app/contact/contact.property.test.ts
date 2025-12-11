/**
 * Feature: enterprise-corporate-website, Property 8: Form validation and submission
 * Validates: Requirements 7.2
 * 
 * Property: For any form submission (contact, application, newsletter), the system 
 * should reject submissions with invalid email formats or missing required fields, 
 * accept submissions with valid data, and return appropriate success or error responses.
 */

import * as fc from 'fast-check';
import { submitContactForm, type ContactFormData } from '@/lib/api';

describe('Property 8: Form validation and submission (Contact Form)', () => {
  it('should reject contact form submissions with invalid email formats', async () => {
    // Generate invalid email formats
    const invalidEmailArbitrary = fc.oneof(
      fc.constant('notanemail'),
      fc.constant('missing@domain'),
      fc.constant('@nodomain.com'),
      fc.constant('spaces in@email.com'),
      fc.constant('double@@domain.com'),
      fc.string().filter(s => !s.includes('@')),
      fc.string().filter(s => s.includes('@') && !s.includes('.'))
    );

    await fc.assert(
      fc.asyncProperty(
        invalidEmailArbitrary,
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 10 }),
        async (invalidEmail, name, subject, message) => {
          const formData: ContactFormData = {
            name: name.trim() || 'Test Name',
            email: invalidEmail,
            phone: '',
            subject: subject.trim() || 'Test Subject',
            message: message.trim() || 'Test message with enough characters'
          };

          const response = await submitContactForm(formData);
          
          // Property: Invalid email should result in failure
          expect(response.success).toBe(false);
          expect(response.message).toBeDefined();
          expect(typeof response.message).toBe('string');
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should reject contact form submissions with missing required fields', async () => {
    // Test various combinations of missing required fields
    const testCases = [
      { name: '', email: 'test@example.com', phone: '', subject: 'Test', message: 'Test message here' },
      { name: 'John', email: '', phone: '', subject: 'Test', message: 'Test message here' },
      { name: 'John', email: 'test@example.com', phone: '', subject: '', message: 'Test message here' },
      { name: 'John', email: 'test@example.com', phone: '', subject: 'Test', message: '' },
      { name: '', email: '', phone: '', subject: '', message: '' },
    ];

    for (const formData of testCases) {
      const response = await submitContactForm(formData);
      
      // Property: Missing required fields should result in failure
      expect(response.success).toBe(false);
      expect(response.message).toBeDefined();
      expect(typeof response.message).toBe('string');
    }
  });

  it('should accept contact form submissions with valid data', async () => {
    // Generate valid email addresses
    const validEmailArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9]+$/.test(s)),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9]+$/.test(s)),
      fc.constantFrom('com', 'org', 'net', 'edu', 'io')
    ).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

    const nonEmptyString = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0);
    const messageString = fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length >= 10);

    await fc.assert(
      fc.asyncProperty(
        validEmailArbitrary,
        nonEmptyString,
        nonEmptyString,
        messageString,
        async (email, name, subject, message) => {
          const formData: ContactFormData = {
            name: name.trim(),
            email: email,
            phone: '', // Phone is optional
            subject: subject.trim(),
            message: message.trim()
          };

          const response = await submitContactForm(formData);
          
          // Property: Valid data should result in success
          expect(response.success).toBe(true);
          expect(response.message).toBeDefined();
          expect(typeof response.message).toBe('string');
          expect(response.message.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return appropriate response structure for all submissions', async () => {
    // Generate any form data (valid or invalid)
    const anyFormDataArbitrary = fc.record({
      name: fc.string(),
      email: fc.string(),
      phone: fc.string(),
      subject: fc.string(),
      message: fc.string()
    });

    await fc.assert(
      fc.asyncProperty(anyFormDataArbitrary, async (formData) => {
        const response = await submitContactForm(formData);
        
        // Property: Response must always have the correct structure
        expect(response).toBeDefined();
        expect(typeof response).toBe('object');
        expect(response).toHaveProperty('success');
        expect(typeof response.success).toBe('boolean');
        expect(response).toHaveProperty('message');
        expect(typeof response.message).toBe('string');
        expect(response.message.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should validate phone numbers when provided (optional field)', async () => {
    const validEmailArbitrary = fc.constant('test@example.com');
    const nonEmptyString = fc.constant('Test Name');
    const messageString = fc.constant('This is a test message with enough characters');
    
    // Generate various phone number formats
    const phoneArbitrary = fc.oneof(
      fc.constant('+1 (555) 123-4567'), // Valid format
      fc.constant('555-123-4567'), // Valid format
      fc.constant('5551234567'), // Valid format
      fc.constant('+44 20 7123 4567'), // Valid format
      fc.constant(''), // Empty is valid (optional)
    );

    await fc.assert(
      fc.asyncProperty(
        validEmailArbitrary,
        nonEmptyString,
        nonEmptyString,
        messageString,
        phoneArbitrary,
        async (email, name, subject, message, phone) => {
          const formData: ContactFormData = {
            name,
            email,
            phone,
            subject,
            message
          };

          const response = await submitContactForm(formData);
          
          // Property: Valid phone formats (or empty) should not cause rejection
          // when all other fields are valid
          expect(response.success).toBe(true);
        }
      ),
      { numRuns: 50 }
    );
  });
});
