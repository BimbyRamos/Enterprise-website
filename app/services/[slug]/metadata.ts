import { Metadata } from 'next';
import { fetchServiceBySlug } from '@/lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await fetchServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} | Our Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'website',
      images: service.featuredImage ? [service.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description,
      images: service.featuredImage ? [service.featuredImage] : [],
    },
  };
}
