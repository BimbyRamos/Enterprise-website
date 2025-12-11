'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { submitContactForm, fetchLocations, type ContactFormData, type Location } from '@/lib/api';
import dynamic from 'next/dynamic';

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(err => console.error('Failed to fetch locations:', err))
      .finally(() => setLocationsLoading(false));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit status when user starts editing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus({ type: 'success', message: response.message });
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: response.message });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred while submitting the form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)' }}>
      {/* Premium Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        {/* Gradient Background */}
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
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
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
            We're Here to Help
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'white' }}
          >
            Contact Us
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Get in touch with our team. We're here to help you transform your business with innovative ICT solutions.
          </p>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 max-w-4xl mx-auto">
            {[
              { icon: '📞', label: 'Call Us', value: '24/7 Support' },
              { icon: '✉️', label: 'Email Us', value: 'Quick Response' },
              { icon: '📍', label: 'Visit Us', value: '1 Location' },
              { icon: '💬', label: 'Live Chat', value: 'Instant Help' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div 
                  className="text-sm md:text-base font-semibold mb-1"
                  style={{ color: 'white' }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-xs md:text-sm"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="relative">
            {/* Decorative Background */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 20% 50%, #8B1538 0%, transparent 70%)'
              }}
            />

            <div className="relative bg-white p-8 md:p-10 rounded-3xl border-2 border-neutral-200 shadow-premium">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-xl shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
                  }}
                >
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#0F172A' }}>
                    Send us a message
                  </h2>
                </div>
              </div>
              
              <p className="text-base mb-8" style={{ color: '#64748B' }}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Name <span style={{ color: '#8B1538' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.name ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  style={{ 
                    backgroundColor: errors.name ? 'rgba(239, 68, 68, 0.05)' : 'white',
                    boxShadow: errors.name ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm font-medium" style={{ color: '#DC2626' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Email <span style={{ color: '#8B1538' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@company.com"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.email ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  style={{ 
                    backgroundColor: errors.email ? 'rgba(239, 68, 68, 0.05)' : 'white',
                    boxShadow: errors.email ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm font-medium" style={{ color: '#DC2626' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Phone <span className="text-xs" style={{ color: '#64748B' }}>(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+63 (02) 1234 5678"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.phone ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  style={{ 
                    backgroundColor: errors.phone ? 'rgba(239, 68, 68, 0.05)' : 'white',
                    boxShadow: errors.phone ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-2 text-sm font-medium" style={{ color: '#DC2626' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Subject <span style={{ color: '#8B1538' }}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.subject ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  style={{ 
                    backgroundColor: errors.subject ? 'rgba(239, 68, 68, 0.05)' : 'white',
                    boxShadow: errors.subject ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-2 text-sm font-medium" style={{ color: '#DC2626' }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Message <span style={{ color: '#8B1538' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-vertical ${
                    errors.message ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  style={{ 
                    backgroundColor: errors.message ? 'rgba(239, 68, 68, 0.05)' : 'white',
                    boxShadow: errors.message ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm font-medium" style={{ color: '#DC2626' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-xl border-2 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {submitStatus.type === 'success' ? '✅' : '⚠️'}
                    </span>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: submitStatus.type === 'success' ? '#15803D' : '#DC2626' }}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: isSubmitting ? '#94A3B8' : 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
            </div>
          </div>

          {/* Office Locations */}
          <div className="relative">
            {/* Decorative Background */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 70%)'
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-xl shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
                  }}
                >
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#0F172A' }}>
                    Our Office
                  </h2>
                </div>
              </div>
              
              <p className="text-base mb-8" style={{ color: '#64748B' }}>
                Visit us at our headquarters or reach out through any of our contact channels.
              </p>

              {locationsLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-neutral-200">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                      <div className="h-[300px] bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {locations.map((location, index) => (
                    <div 
                      key={location.id} 
                      className="group relative bg-white p-6 md:p-8 rounded-3xl border-2 border-neutral-200 hover:border-primary-500 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Gradient Background */}
                      <div 
                        className="absolute inset-0 transition-all duration-500 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
                          zIndex: 0
                        }}
                      />

                      {/* External Glow */}
                      <div 
                        className="absolute -inset-1 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-30 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                          filter: 'blur(15px)',
                          zIndex: -1
                        }}
                      />

                      <div className="relative">
                        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A', opacity: 1 }}>
                          {location.name}
                        </h3>
                        
                        <div className="space-y-3 mb-6">
                          {/* Address */}
                          <div className="flex items-start gap-3">
                            <span style={{ color: '#8B1538', fontSize: '18px' }}>🏢</span>
                            <p className="text-sm" style={{ color: '#475569', opacity: 1 }}>
                              {location.address}<br />
                              {location.city}, {location.country}
                            </p>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3">
                            <span style={{ color: '#8B1538', fontSize: '18px' }}>📞</span>
                            <a 
                              href={`tel:${location.phone}`} 
                              className="text-sm font-medium hover:underline transition-colors duration-300"
                              style={{ color: '#8B1538', opacity: 1 }}
                            >
                              {location.phone}
                            </a>
                          </div>

                          {/* Email */}
                          <div className="flex items-center gap-3">
                            <span style={{ color: '#8B1538', fontSize: '18px' }}>✉️</span>
                            <a 
                              href={`mailto:${location.email}`} 
                              className="text-sm font-medium hover:underline transition-colors duration-300"
                              style={{ color: '#8B1538', opacity: 1 }}
                            >
                              {location.email}
                            </a>
                          </div>

                          {/* Hours */}
                          <div className="flex items-start gap-3">
                            <span style={{ color: '#8B1538', fontSize: '18px' }}>🕐</span>
                            <p className="text-sm" style={{ color: '#475569', opacity: 1 }}>
                              {location.businessHours}
                            </p>
                          </div>
                        </div>
                        
                        {/* Interactive Map */}
                        <div className="rounded-xl overflow-hidden border-2 border-neutral-200 group-hover:border-primary-300 transition-colors duration-500">
                          <Map
                            center={location.coordinates}
                            zoom={15}
                            markers={[
                              {
                                position: location.coordinates,
                                title: location.name,
                              },
                            ]}
                            className="h-[300px]"
                          />
                        </div>

                        {/* Get Directions Button */}
                        <button
                          className="w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            backgroundColor: '#8B1538',
                            color: '#FFFFFF',
                            opacity: 1
                          }}
                        >
                          Get Directions
                          <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Decorative corner element */}
                      <div 
                        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, transparent 100%)'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
