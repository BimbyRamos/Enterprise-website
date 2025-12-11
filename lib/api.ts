// API utility functions for fetching data
// Note: These are placeholder implementations that will be replaced with actual API calls
// once the backend is implemented

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug?: string;
  detailedDescription?: string;
  featuredImage?: string;
  features?: string[];
  benefits?: string[];
  caseStudies?: CaseStudy[];
  relatedServices?: Service[];
}

export interface CaseStudy {
  id: string;
  companyName: string;
  outcome: string;
  industry?: string;
  image?: string;
  slug?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  category?: string;
  slug?: string;
}

export interface CaseExample {
  id: string;
  title: string;
  description: string;
  outcome: string;
  metrics?: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug?: string;
  featuredImage?: string;
  caseExamples?: CaseExample[];
  statistics?: Statistic[];
  testimonials?: Testimonial[];
  relatedServices?: Service[];
  relatedArticles?: Article[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  businessHours: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}

// Mock data for development - will be replaced with actual API calls
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Enterprise Architecture Consultancy',
    description: 'We help organizations design and implement a strategic ICT architecture. From creating roadmaps and scanning emerging technologies to establishing governance frameworks and managing RFP processes, we ensure your technology aligns with business goals.',
    icon: '🏛️',
    slug: 'enterprise-architecture-consultancy',
  },
  {
    id: '2',
    title: 'Business Consultancy',
    description: 'Our experts provide insights and guidance to optimize ICT investments. We analyze business needs, manage ICT projects, and deliver solutions that drive efficiency and growth.',
    icon: '💼',
    slug: 'business-consultancy',
  },
  {
    id: '3',
    title: 'Platform Development Factory',
    description: 'We design and build custom platforms tailored to your business requirements, ensuring scalability, security, and seamless integration with existing systems.',
    icon: '🏭',
    slug: 'platform-development-factory',
  },
  {
    id: '4',
    title: 'Platform Management (Buy & Manage)',
    description: 'We assist in selecting, procuring, and managing ICT platforms to maximize value and performance while minimizing operational risks.',
    icon: '🛠️',
    slug: 'platform-management-buy',
  },
  {
    id: '5',
    title: 'Platform Management (AI Build)',
    description: 'We develop AI-driven platforms and solutions to automate processes, enhance decision-making, and unlock new business opportunities.',
    icon: '🤖',
    slug: 'platform-management-ai',
  },
  {
    id: '6',
    title: 'Managed Cloud & Infrastructure',
    description: 'End-to-end management of cloud environments and IT infrastructure, ensuring reliability, security, and cost efficiency for your operations.',
    icon: '☁️',
    slug: 'managed-cloud-infrastructure',
  },
  {
    id: '7',
    title: 'ICT Managed Services',
    description: 'Comprehensive support services to keep your ICT systems running smoothly—from helpdesk and technical assistance to VIP support and application maintenance.',
    icon: '🔧',
    slug: 'ict-managed-services',
  },
  {
    id: '8',
    title: 'Operations & Maintenance',
    description: 'We provide ongoing monitoring, maintenance, and optimization of ICT systems to ensure consistent performance and minimal downtime.',
    icon: '⚙️',
    slug: 'operations-maintenance',
  },
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    companyName: 'TechCorp Global',
    outcome: 'Achieved 40% reduction in operational costs through cloud migration',
    industry: 'Technology',
    slug: 'techcorp-global',
  },
  {
    id: '2',
    companyName: 'FinanceFirst',
    outcome: 'Improved customer satisfaction by 65% with digital transformation',
    industry: 'Finance',
    slug: 'financefirst',
  },
  {
    id: '3',
    companyName: 'HealthPlus',
    outcome: 'Enhanced data security and achieved HIPAA compliance',
    industry: 'Healthcare',
    slug: 'healthplus',
  },
];

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Cloud Computing in Enterprise',
    excerpt: 'Explore how cloud technologies are reshaping enterprise operations and driving innovation across industries.',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Technology',
    slug: 'future-of-cloud-computing',
  },
  {
    id: '2',
    title: 'Cybersecurity Best Practices for 2024',
    excerpt: 'Learn essential cybersecurity strategies to protect your organization from emerging threats.',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Security',
    slug: 'cybersecurity-best-practices-2024',
  },
  {
    id: '3',
    title: 'Digital Transformation Success Stories',
    excerpt: 'Discover how leading companies are leveraging digital transformation to achieve remarkable results.',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Business',
    slug: 'digital-transformation-success-stories',
  },
];

const mockIndustries: Industry[] = [
  {
    id: '1',
    name: 'Healthcare',
    description: 'Transforming patient care and operational efficiency through innovative technology solutions.',
    icon: '🏥',
    slug: 'healthcare',
  },
  {
    id: '2',
    name: 'Financial Services',
    description: 'Empowering financial institutions with secure, scalable, and compliant technology platforms.',
    icon: '💰',
    slug: 'financial-services',
  },
  {
    id: '3',
    name: 'Manufacturing',
    description: 'Driving Industry 4.0 transformation with smart manufacturing and IoT solutions.',
    icon: '🏭',
    slug: 'manufacturing',
  },
  {
    id: '4',
    name: 'Retail & E-commerce',
    description: 'Creating seamless omnichannel experiences that drive customer engagement and sales.',
    icon: '🛒',
    slug: 'retail-ecommerce',
  },
  {
    id: '5',
    name: 'Education',
    description: 'Revolutionizing learning experiences with digital platforms and educational technology.',
    icon: '🎓',
    slug: 'education',
  },
  {
    id: '6',
    name: 'Energy & Utilities',
    description: 'Optimizing energy management and sustainability through smart grid and IoT solutions.',
    icon: '⚡',
    slug: 'energy-utilities',
  },
];

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Networld Capital Ventures, Inc. Headquarters',
    address: '156 Jupiter, Makati City',
    city: 'Metro Manila',
    country: 'Philippines',
    phone: '(02) 8895 5338',
    email: 'info@networldcapital.com',
    coordinates: { lat: 14.5547, lng: 121.0244 },
    businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM PHT'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchServices(): Promise<Service[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
  // if (!response.ok) throw new Error('Failed to fetch services');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockServices;
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`);
  // if (!response.ok) {
  //   if (response.status === 404) return null;
  //   throw new Error('Failed to fetch service');
  // }
  // return response.json();
  
  await delay(500); // Simulate network delay
  const service = mockServices.find(s => s.slug === slug);
  if (!service) return null;
  
  // Return service with extended details
  return {
    ...service,
    detailedDescription: `${service.description} Our comprehensive approach ensures that you receive tailored solutions that meet your specific business needs. We leverage cutting-edge technology and industry best practices to deliver exceptional results.`,
    features: [
      'Expert consultation and strategy development',
      'Implementation and deployment support',
      'Ongoing maintenance and optimization',
      '24/7 technical support and monitoring'
    ],
    benefits: [
      'Reduced operational costs',
      'Improved efficiency and productivity',
      'Enhanced security and compliance',
      'Scalable solutions for future growth'
    ],
    caseStudies: mockCaseStudies.slice(0, 2),
    relatedServices: mockServices.filter(s => s.id !== service.id).slice(0, 2)
  };
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies`);
  // if (!response.ok) throw new Error('Failed to fetch case studies');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockCaseStudies;
}

export async function fetchLatestArticles(limit: number = 3): Promise<Article[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights?limit=${limit}&sort=publishedAt:desc`);
  // if (!response.ok) throw new Error('Failed to fetch articles');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockArticles.slice(0, limit);
}

export async function fetchIndustries(): Promise<Industry[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/industries`);
  // if (!response.ok) throw new Error('Failed to fetch industries');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockIndustries;
}

export async function fetchIndustryBySlug(slug: string): Promise<Industry | null> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/industries/${slug}`);
  // if (!response.ok) {
  //   if (response.status === 404) return null;
  //   throw new Error('Failed to fetch industry');
  // }
  // return response.json();
  
  await delay(500); // Simulate network delay
  const industry = mockIndustries.find(i => i.slug === slug);
  if (!industry) return null;
  
  // Return industry with extended details
  return {
    ...industry,
    caseExamples: [
      {
        id: '1',
        title: 'Digital Transformation Initiative',
        description: 'Implemented comprehensive digital solutions to modernize operations',
        outcome: 'Achieved 45% improvement in operational efficiency and 30% cost reduction',
        metrics: '45% efficiency gain, 30% cost reduction'
      },
      {
        id: '2',
        title: 'Cloud Migration Project',
        description: 'Migrated legacy systems to modern cloud infrastructure',
        outcome: 'Reduced infrastructure costs by 40% while improving system reliability',
        metrics: '40% cost savings, 99.9% uptime'
      }
    ],
    statistics: [
      { id: '1', label: 'Projects Completed', value: '150+' },
      { id: '2', label: 'Client Satisfaction', value: '98%' },
      { id: '3', label: 'Average ROI', value: '250%' },
      { id: '4', label: 'Years of Experience', value: '15+' }
    ],
    testimonials: [
      {
        id: '1',
        quote: 'Their expertise in our industry was evident from day one. They delivered solutions that exceeded our expectations.',
        author: 'John Smith',
        position: 'CTO',
        company: 'Industry Leader Inc.'
      }
    ],
    relatedServices: mockServices.slice(0, 3),
    relatedArticles: mockArticles.slice(0, 2)
  };
}

export async function fetchLocations(): Promise<Location[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/locations`);
  // if (!response.ok) throw new Error('Failed to fetch locations');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockLocations;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmissionResponse> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // if (!response.ok) throw new Error('Failed to submit contact form');
  // return response.json();
  
  await delay(1000); // Simulate network delay
  
  // Simulate validation
  if (!data.email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email format'
    };
  }
  
  if (!data.name || !data.email || !data.message) {
    return {
      success: false,
      message: 'Please fill in all required fields'
    };
  }
  
  return {
    success: true,
    message: 'Thank you for contacting us. We will get back to you shortly.'
  };
}
