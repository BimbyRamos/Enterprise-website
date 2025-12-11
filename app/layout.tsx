import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Enterprise Corporate Website | Professional Solutions & Services',
    template: '%s | Enterprise Corporate Website',
  },
  description: 'Leading provider of enterprise solutions and professional services. Discover our expertise across industries with innovative technology and strategic consulting.',
  keywords: ['enterprise solutions', 'professional services', 'consulting', 'technology', 'business solutions'],
  authors: [{ name: 'Enterprise Corporate' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com',
    siteName: 'Enterprise Corporate Website',
    title: 'Enterprise Corporate Website | Professional Solutions & Services',
    description: 'Leading provider of enterprise solutions and professional services. Discover our expertise across industries with innovative technology and strategic consulting.',
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
    description: 'Leading provider of enterprise solutions and professional services. Discover our expertise across industries with innovative technology and strategic consulting.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-neutral-white focus:rounded-button"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
