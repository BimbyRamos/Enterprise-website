// API utility functions for fetching data from Strapi CMS
// Strapi API URL from environment variable
const STRAPI_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug?: string;
  detailedDescription?: string;
  featuredImage?: string;
  features?: string[] | Array<{ title: string; description: string; icon: string }>;
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
  publishedAt: string; // Note: In Strapi this is publicationDate
  category?: string;
  slug?: string;
  content?: string;
  author?: string;
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
  keyPoints?: string[];
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

// Helper function to transform Strapi response format
function transformStrapiData<T>(strapiData: any): T[] {
  if (!strapiData || !Array.isArray(strapiData)) return [];
  
  return strapiData.map((item: any) => ({
    id: item.id?.toString() || item.documentId?.toString(),
    ...item.attributes || item
  }));
}

function transformStrapiSingleItem<T>(strapiItem: any): T | null {
  if (!strapiItem) return null;
  
  return {
    id: strapiItem.id?.toString() || strapiItem.documentId?.toString(),
    ...strapiItem.attributes || strapiItem
  } as T;
}

// Helper to get image URL from Strapi
function getStrapiImageUrl(image: any): string | undefined {
  if (!image) return undefined;
  
  const imageData = image.data || image;
  if (!imageData) return undefined;
  
  const url = imageData.attributes?.url || imageData.url;
  if (!url) return undefined;
  
  // If URL is relative, prepend Strapi URL
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services?populate=*`);
    
    if (!response.ok) {
      console.error('Failed to fetch services from Strapi:', response.statusText);
      // Fallback to mock data if Strapi is unavailable
      return mockServices;
    }
    
    const json = await response.json();
    const services = transformStrapiData<any>(json.data);
    
    // Transform Strapi data to match our interface
    return services.map(service => ({
      id: service.id,
      title: service.Title || service.title, // Handle both Title and title
      description: service.description,
      icon: service.icon,
      slug: service.slug,
      detailedDescription: service.detailedDescription,
      features: service.features,
      benefits: service.benefits,
      featuredImage: getStrapiImageUrl(service.featuredImage)
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fallback to mock data on error
    return mockServices;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch service from Strapi:', response.statusText);
      // Fallback to mock data
      const service = mockServices.find(s => s.slug === slug);
      if (!service) return null;
      
      return {
        ...service,
        detailedDescription: `${service.description} Our comprehensive approach ensures that you receive tailored solutions that meet your specific business needs.`,
        features: ['Expert consultation', 'Implementation support', 'Ongoing maintenance', '24/7 support'],
        benefits: ['Reduced costs', 'Improved efficiency', 'Enhanced security', 'Scalable solutions'],
        caseStudies: mockCaseStudies.slice(0, 2),
        relatedServices: mockServices.filter(s => s.id !== service.id).slice(0, 2)
      };
    }
    
    const json = await response.json();
    if (!json.data || json.data.length === 0) return null;
    
    const service = transformStrapiSingleItem<Service>(json.data[0]);
    if (!service) return null;
    
    return {
      ...service,
      featuredImage: getStrapiImageUrl((service as any).featuredImage)
    };
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return null;
  }
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
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publicationDate:desc&pagination[limit]=${limit}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch articles from Strapi:', response.statusText);
      return mockArticles.slice(0, limit);
    }
    
    const json = await response.json();
    const articles = transformStrapiData<Article>(json.data);
    
    // Transform Strapi data to match our interface
    return articles.map(article => ({
      ...article,
      publishedAt: (article as any).publicationDate || article.publishedAt,
      featuredImage: getStrapiImageUrl((article as any).featuredImage)
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return mockArticles.slice(0, limit);
  }
}

export async function fetchIndustries(): Promise<Industry[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/industries?populate=*`);
    
    if (!response.ok) {
      console.error('Failed to fetch industries from Strapi:', response.statusText);
      return mockIndustries;
    }
    
    const json = await response.json();
    const industries = transformStrapiData<any>(json.data);
    
    // Transform Strapi data to match our interface
    return industries.map(industry => ({
      id: industry.id,
      name: industry.title, // Strapi uses 'title', we use 'name'
      description: industry.description,
      icon: industry.icon,
      slug: industry.slug,
      gradient: industry.gradient, // Pass through gradient from CMS
      featuredImage: getStrapiImageUrl(industry.featuredImage),
      statistics: industry.stats || [],
      keyPoints: industry.keyPoints || []
    }));
  } catch (error) {
    console.error('Error fetching industries:', error);
    return mockIndustries;
  }
}

export async function fetchIndustryBySlug(slug: string): Promise<Industry | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/industries?filters[slug][$eq]=${slug}&populate=*`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch industry from Strapi:', response.statusText);
      // Fallback to mock data
      const industry = mockIndustries.find(i => i.slug === slug);
      if (!industry) return null;
      
      return {
        ...industry,
        keyPoints: [
          'Digital Transformation Initiative',
          'Cloud Infrastructure Management',
          'Enterprise Security Solutions'
        ],
        statistics: [
          { id: '1', label: 'Projects Completed', value: '150+' },
          { id: '2', label: 'Client Satisfaction', value: '98%' }
        ],
        relatedServices: mockServices.slice(0, 3),
        relatedArticles: mockArticles.slice(0, 2)
      };
    }
    
    const json = await response.json();
    if (!json.data || json.data.length === 0) return null;
    
    const industry = json.data[0];
    const attributes = industry.attributes || industry;
    
    return {
      id: industry.id?.toString() || industry.documentId?.toString(),
      name: attributes.title,
      description: attributes.description,
      icon: attributes.icon,
      slug: attributes.slug,
      featuredImage: getStrapiImageUrl(attributes.featuredImage),
      statistics: attributes.stats || [],
      keyPoints: attributes.keyPoints || []
    };
  } catch (error) {
    console.error('Error fetching industry by slug:', error);
    return null;
  }
}

export async function fetchLocations(): Promise<Location[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/locations`);
  // if (!response.ok) throw new Error('Failed to fetch locations');
  // return response.json();
  
  await delay(500); // Simulate network delay
  return mockLocations;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  projectStatus: 'Completed' | 'InProgress' | 'Planned';
  client?: string;
  duration?: string;
  team?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  technologies?: string[];
  metrics?: Array<{ label: string; value: string }>;
  image?: string;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects?populate=*`);
    
    if (!response.ok) {
      console.error('Failed to fetch projects from Strapi:', response.statusText);
      return [];
    }
    
    const json = await response.json();
    const projects = transformStrapiData<any>(json.data);
    
    // Transform Strapi data to match our interface
    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      projectStatus: project.projectStatus,
      client: project.client,
      duration: project.duration,
      team: project.team,
      challenge: project.challenge,
      solution: project.solution,
      outcome: project.outcome,
      technologies: project.technologies || [],
      metrics: project.metrics || [],
      image: getStrapiImageUrl(project.image)
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
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

// Hero Section Interface
export interface HeroSection {
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  stats?: Array<{ value: string; label: string }>;
}

// About Us Section Interface
export interface AboutUsSection {
  companyName: string;
  mainDescription: string;
  secondaryDescription?: string;
  stats?: Array<{ value: string; label: string; icon: string; color: string }>;
  values?: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  achievements?: Array<{ title: string; description: string }>;
}

// Fetch Hero Section (Single Type)
export async function fetchHeroSection(): Promise<HeroSection | null> {
  try {
    // Try new endpoint first (hero-section), then fallback to old (hero)
    let response = await fetch(`${STRAPI_URL}/api/hero-section?populate=*`);
    
    if (!response.ok) {
      console.log('Trying fallback endpoint /api/hero...');
      response = await fetch(`${STRAPI_URL}/api/hero?populate=*`);
    }
    
    if (!response.ok) {
      console.error('Failed to fetch hero section from Strapi:', response.statusText);
      console.log('Using fallback data. Please check:');
      console.log('1. Strapi is running on http://localhost:1337');
      console.log('2. Hero content type exists in Strapi');
      console.log('3. API permissions are set (Settings → Roles → Public → Hero → find)');
      // Return default hero data
      return {
        headline: 'Transforming Businesses Through Innovative ICT Solutions',
        subtext: 'Partner with the ICT arm of PJ Lhuillier Group for comprehensive technology solutions that drive growth, efficiency, and digital transformation across your enterprise.',
        ctaText: 'Get Started',
        ctaLink: '#contact',
        stats: [
          { value: '15+', label: 'Years Experience' },
          { value: '500+', label: 'Projects Delivered' },
          { value: '98%', label: 'Client Satisfaction' },
          { value: '24/7', label: 'Support Available' },
        ]
      };
    }
    
    const json = await response.json();
    console.log('Hero section fetched successfully from CMS');
    const data = json.data?.attributes || json.data;
    
    if (!data) {
      console.warn('No hero data found in response');
      return null;
    }
    
    return {
      headline: data.headline,
      subtext: data.subtext,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
      backgroundImage: getStrapiImageUrl(data.backgroundImage),
      stats: data.stats || []
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    // Return default hero data on error
    return {
      headline: 'Transforming Businesses Through Innovative ICT Solutions',
      subtext: 'Partner with the ICT arm of PJ Lhuillier Group for comprehensive technology solutions that drive growth, efficiency, and digital transformation across your enterprise.',
      ctaText: 'Get Started',
      ctaLink: '#contact',
      stats: [
        { value: '15+', label: 'Years Experience' },
        { value: '500+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '24/7', label: 'Support Available' },
      ]
    };
  }
}

// Fetch About Us Section (Single Type)
export async function fetchAboutUsSection(): Promise<AboutUsSection | null> {
  try {
    // Try new endpoint first (about-us-section), then fallback to old (about-us)
    let response = await fetch(`${STRAPI_URL}/api/about-us-section?populate=*`);
    
    if (!response.ok) {
      console.log('Trying fallback endpoint /api/about-us...');
      response = await fetch(`${STRAPI_URL}/api/about-us?populate=*`);
    }
    
    if (!response.ok) {
      console.error('Failed to fetch about us section from Strapi:', response.statusText);
      console.log('Using fallback data. Please check:');
      console.log('1. Strapi is running on http://localhost:1337');
      console.log('2. About Us content type exists in Strapi');
      console.log('3. API permissions are set (Settings → Roles → Public → About Us → find)');
      // Return default about us data
      return {
        companyName: 'Networld Capital Ventures, Inc.',
        mainDescription: "is the ICT arm of the PJ Lhuillier Group ('Cebuana Lhuillier') of Companies, offering a wide range of innovative ICT solutions that empower businesses to thrive in the digital age.",
        secondaryDescription: 'With over 15 years of excellence, we combine deep industry expertise with cutting-edge technology to deliver transformative solutions that drive growth, efficiency, and competitive advantage.',
        stats: [
          { value: '15+', label: 'Years of Excellence', icon: '📅', color: '#8B1538' },
          { value: '500+', label: 'Projects Delivered', icon: '🚀', color: '#2563EB' },
          { value: '98%', label: 'Client Satisfaction', icon: '⭐', color: '#8B1538' },
          { value: '24/7', label: 'Support Available', icon: '🛡️', color: '#2563EB' },
        ],
        values: [
          {
            icon: '🏢',
            title: 'Part of PJ Lhuillier Group',
            description: 'Backed by the trusted Cebuana Lhuillier brand with decades of proven excellence in serving Filipino communities',
            features: ['Established Legacy', 'Trusted Brand', 'Financial Stability']
          },
          {
            icon: '💻',
            title: 'Comprehensive ICT Solutions',
            description: 'End-to-end technology services from infrastructure to cloud, tailored to your unique business needs',
            features: ['Full-Stack Services', 'Custom Solutions', 'Scalable Architecture']
          },
          {
            icon: '🎯',
            title: 'Innovation Focused',
            description: 'Driving digital transformation and sustainable growth through cutting-edge technology and strategic partnerships',
            features: ['Latest Technology', 'Future-Ready', 'Continuous Innovation']
          },
        ],
        achievements: [
          { title: 'Industry Leader', description: 'Recognized as a top ICT provider in the Philippines' },
          { title: 'Certified Partners', description: 'Official partners with leading technology vendors' },
          { title: 'Award Winning', description: 'Multiple industry awards for excellence and innovation' },
        ]
      };
    }
    
    const json = await response.json();
    console.log('About Us section fetched successfully from CMS');
    const data = json.data?.attributes || json.data;
    
    if (!data) {
      console.warn('No about us data found in response');
      return null;
    }
    
    return {
      companyName: data.companyName,
      mainDescription: data.mainDescription,
      secondaryDescription: data.secondaryDescription,
      stats: data.stats || [],
      values: data.values || [],
      achievements: data.achievements || []
    };
  } catch (error) {
    console.error('Error fetching about us section:', error);
    // Return default about us data on error
    return {
      companyName: 'Networld Capital Ventures, Inc.',
      mainDescription: "is the ICT arm of the PJ Lhuillier Group ('Cebuana Lhuillier') of Companies, offering a wide range of innovative ICT solutions that empower businesses to thrive in the digital age.",
      secondaryDescription: 'With over 15 years of excellence, we combine deep industry expertise with cutting-edge technology to deliver transformative solutions that drive growth, efficiency, and competitive advantage.',
      stats: [
        { value: '15+', label: 'Years of Excellence', icon: '📅', color: '#8B1538' },
        { value: '500+', label: 'Projects Delivered', icon: '🚀', color: '#2563EB' },
        { value: '98%', label: 'Client Satisfaction', icon: '⭐', color: '#8B1538' },
        { value: '24/7', label: 'Support Available', icon: '🛡️', color: '#2563EB' },
      ],
      values: [
        {
          icon: '🏢',
          title: 'Part of PJ Lhuillier Group',
          description: 'Backed by the trusted Cebuana Lhuillier brand with decades of proven excellence in serving Filipino communities',
          features: ['Established Legacy', 'Trusted Brand', 'Financial Stability']
        },
        {
          icon: '💻',
          title: 'Comprehensive ICT Solutions',
          description: 'End-to-end technology services from infrastructure to cloud, tailored to your unique business needs',
          features: ['Full-Stack Services', 'Custom Solutions', 'Scalable Architecture']
        },
        {
          icon: '🎯',
          title: 'Innovation Focused',
          description: 'Driving digital transformation and sustainable growth through cutting-edge technology and strategic partnerships',
          features: ['Latest Technology', 'Future-Ready', 'Continuous Innovation']
        },
      ],
      achievements: [
        { title: 'Industry Leader', description: 'Recognized as a top ICT provider in the Philippines' },
        { title: 'Certified Partners', description: 'Official partners with leading technology vendors' },
        { title: 'Award Winning', description: 'Multiple industry awards for excellence and innovation' },
      ]
    };
  }
}
