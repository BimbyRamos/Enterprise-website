import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Enterprise Corporate Website',
  description: 'Transform your business with our enterprise solutions. Explore our services, success stories, and latest insights in technology and innovation.',
  openGraph: {
    title: 'Enterprise Corporate Website | Professional Solutions & Services',
    description: 'Leading provider of enterprise solutions and professional services. Discover our expertise across industries with innovative technology and strategic consulting.',
    type: 'website',
    url: 'https://www.example.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Enterprise Corporate Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Corporate Website | Professional Solutions & Services',
    description: 'Leading provider of enterprise solutions and professional services.',
    images: ['/og-image.jpg'],
  },
};
