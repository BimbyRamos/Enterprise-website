'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import emailjs from '@emailjs/browser';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  businessHours: string;
  coordinates: { lat: number; lng: number };
}

interface ContactProps {
  locations: Location[];
  isLoading?: boolean;
}

const Contact: React.FC<ContactProps> = ({ locations, isLoading = false }) => {
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    from_phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.from_name.trim()) {
      errors.from_name = 'Name is required';
    }
    
    if (!formData.from_email.trim()) {
      errors.from_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      errors.from_email = 'Invalid email format';
    }
    
    if (!formData.from_phone.trim()) {
      errors.from_phone = 'Phone is required';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS not configured. Please add environment variables.');
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );
      
      setFormStatus('success');
      setFormData({
        from_name: '',
        from_email: '',
        from_phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak with our team',
      detail: '(02) 8895 5338',
      action: 'tel:+6288955338',
      color: '#8B1538'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      description: 'Send us a message',
      detail: 'info@networldcapital.com',
      action: 'mailto:info@networldcapital.com',
      color: '#2563EB'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come to our office',
      detail: 'Makati City, Philippines',
      action: '#map',
      color: '#8B1538'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with support',
      detail: 'Available 24/7',
      action: '#chat',
      color: '#2563EB'
    }
  ];

  const quickLinks = [
    { icon: '📅', title: 'Schedule Consultation', description: 'Book a meeting with our experts' },
    { icon: '📄', title: 'Download Brochure', description: 'Get our company overview' },
    { icon: '💼', title: 'Career Opportunities', description: 'Join our growing team' },
    { icon: '🎯', title: 'Request Quote', description: 'Get a custom solution quote' },
  ];

  const location = locations[0]; // Since there's only one office

  return (
    <section 
      id="contact" 
      className="relative py-20 md:py-28 px-4 overflow-hidden" 
      aria-label="Contact Us"
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-5 rounded-full backdrop-blur-md border"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              borderColor: 'rgba(139, 21, 56, 0.2)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide" style={{ color: '#8B1538' }}>
              GET IN TOUCH
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#0F172A', letterSpacing: '-0.02em' }}
          >
            Contact Us
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
            Ready to transform your business with innovative ICT solutions? Reach out to us today.
          </p>
        </div>

        {/* Main Content Grid - Three Columns */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-1">
            <div 
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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

              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="from_name" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: formErrors.from_name ? '2px solid #EF4444' : '1px solid rgba(139, 21, 56, 0.2)',
                      color: '#0F172A'
                    }}
                    placeholder="John Doe"
                  />
                  {formErrors.from_name && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {formErrors.from_name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="from_email" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: formErrors.from_email ? '2px solid #EF4444' : '1px solid rgba(139, 21, 56, 0.2)',
                      color: '#0F172A'
                    }}
                    placeholder="john@example.com"
                  />
                  {formErrors.from_email && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {formErrors.from_email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label 
                    htmlFor="from_phone" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="from_phone"
                    name="from_phone"
                    value={formData.from_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: formErrors.from_phone ? '2px solid #EF4444' : '1px solid rgba(139, 21, 56, 0.2)',
                      color: '#0F172A'
                    }}
                    placeholder="+63 123 456 7890"
                  />
                  {formErrors.from_phone && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {formErrors.from_phone}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: formErrors.subject ? '2px solid #EF4444' : '1px solid rgba(139, 21, 56, 0.2)',
                      color: '#0F172A'
                    }}
                    placeholder="How can we help?"
                  />
                  {formErrors.subject && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: formErrors.message ? '2px solid #EF4444' : '1px solid rgba(139, 21, 56, 0.2)',
                      color: '#0F172A'
                    }}
                    placeholder="Tell us about your project..."
                  />
                  {formErrors.message && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: formStatus === 'sending' 
                      ? 'linear-gradient(135deg, #64748B 0%, #475569 100%)'
                      : 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (formStatus !== 'sending') {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 21, 56, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.3)';
                  }}
                >
                  {formStatus === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Success Message */}
                {formStatus === 'success' && (
                  <div 
                    className="p-4 rounded-xl flex items-center gap-3"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#16A34A' }}>
                        Message sent successfully!
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {formStatus === 'error' && (
                  <div 
                    className="p-4 rounded-xl flex items-center gap-3"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#DC2626' }}>
                        Failed to send message
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        Please try again or contact us directly.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Middle Column - Contact Methods & Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods - Glass UI Cards */}
            <div 
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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

              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Get In Touch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    onMouseEnter={() => setHoveredMethod(index)}
                    onMouseLeave={() => setHoveredMethod(null)}
                    className="group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: hoveredMethod === index 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: `1.5px solid ${hoveredMethod === index ? method.color + '40' : 'rgba(0, 0, 0, 0.05)'}`,
                      boxShadow: hoveredMethod === index 
                        ? `0 8px 24px ${method.color}30` 
                        : '0 2px 8px rgba(0, 0, 0, 0.05)',
                      transform: hoveredMethod === index ? 'translateY(-4px) scale(1.02)' : 'translateY(0)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
                        style={{
                          background: hoveredMethod === index 
                            ? `${method.color}15` 
                            : 'rgba(0, 0, 0, 0.03)',
                          border: `1px solid ${method.color}20`,
                          transform: hoveredMethod === index ? 'scale(1.1) rotate(-5deg)' : 'scale(1)'
                        }}
                      >
                        <span className="text-2xl">{method.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 
                          className="text-sm font-bold mb-1"
                          style={{ color: '#0F172A' }}
                        >
                          {method.title}
                        </h4>
                        <p 
                          className="text-xs mb-1"
                          style={{ color: '#64748B' }}
                        >
                          {method.description}
                        </p>
                        <p 
                          className="text-xs font-semibold truncate"
                          style={{ color: method.color }}
                        >
                          {method.detail}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div 
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
              >
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    className="group p-4 rounded-xl text-left transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(139, 21, 56, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 21, 56, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <div>
                        <div 
                          className="text-sm font-bold mb-0.5"
                          style={{ color: '#0F172A' }}
                        >
                          {link.title}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: '#64748B' }}
                        >
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Office Location with Map */}
          {!isLoading && location && (
            <div className="lg:col-span-1">
            <div 
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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

              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
                      border: '1px solid rgba(139, 21, 56, 0.15)'
                    }}
                  >
                    <span className="text-3xl">📍</span>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-2"
                      style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
                    >
                      Our Office
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: '#64748B' }}
                    >
                      Visit us at our headquarters
                    </p>
                  </div>
                </div>

                {/* Office Details */}
                <div className="space-y-4 mb-6">
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(139, 21, 56, 0.1)'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span style={{ color: '#8B1538', fontSize: '20px' }}>🏢</span>
                      <div>
                        <div 
                          className="text-xs font-semibold mb-1"
                          style={{ color: '#8B1538' }}
                        >
                          ADDRESS
                        </div>
                        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                          {location.address}
                        </p>
                        <p className="text-sm" style={{ color: '#64748B' }}>
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(139, 21, 56, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: '#8B1538', fontSize: '18px' }}>📞</span>
                        <div 
                          className="text-xs font-semibold"
                          style={{ color: '#8B1538' }}
                        >
                          PHONE
                        </div>
                      </div>
                      <a 
                        href={`tel:${location.phone}`} 
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#0F172A' }}
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(139, 21, 56, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: '#8B1538', fontSize: '18px' }}>✉️</span>
                        <div 
                          className="text-xs font-semibold"
                          style={{ color: '#8B1538' }}
                        >
                          EMAIL
                        </div>
                      </div>
                      <a 
                        href={`mailto:${location.email}`} 
                        className="text-sm font-medium hover:underline truncate block"
                        style={{ color: '#0F172A' }}
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(139, 21, 56, 0.1)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: '#8B1538', fontSize: '18px' }}>🕐</span>
                      <div 
                        className="text-xs font-semibold"
                        style={{ color: '#8B1538' }}
                      >
                        BUSINESS HOURS
                      </div>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                      {location.businessHours}
                    </p>
                  </div>
                </div>

                {/* Map */}
                <div 
                  id="map"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '2px solid rgba(139, 21, 56, 0.15)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Map
                    center={location.coordinates}
                    zoom={15}
                    markers={[
                      {
                        position: location.coordinates,
                        title: location.name,
                      },
                    ]}
                    className="h-[400px]"
                  />
                </div>

                {/* Get Directions Button */}
                <button
                  className="w-full mt-6 py-4 px-6 rounded-xl font-bold transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 21, 56, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 21, 56, 0.3)';
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Directions
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            </div>
          )}
        </div>


      </div>

      {/* Add keyframe animations */}
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
      `}</style>
    </section>
  );
};

export default Contact;
