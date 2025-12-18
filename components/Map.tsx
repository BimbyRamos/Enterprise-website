'use client';

import { useEffect, useRef, useState } from 'react';

// Type declarations for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
  }>;
  className?: string;
}

export default function Map({ center, zoom = 13, markers = [], className = '' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // Check if API key is configured
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setError('API_KEY_NOT_CONFIGURED');
      setIsLoading(false);
      console.error('❌ Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local');
      console.log('📖 See GOOGLE_MAPS_SETUP_GUIDE.md for instructions');
      return;
    }

    // Check if Google Maps API is already loaded
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      initializeMap();
    } else {
      // Load Google Maps API
      loadGoogleMapsScript();
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    // Update map center and markers when props change
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(center);
      updateMarkers();
    }
  }, [center, markers]);

  const loadGoogleMapsScript = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setError('API_KEY_NOT_CONFIGURED');
      setIsLoading(false);
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          initializeMap();
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.google || !window.google.maps) {
          setError('LOAD_TIMEOUT');
          setIsLoading(false);
        }
      }, 10000);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeMap();
    };
    script.onerror = () => {
      console.error('❌ Failed to load Google Maps API');
      setError('LOAD_FAILED');
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      return;
    }

    try {
      // Create map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      // Add markers
      updateMarkers();
      setIsLoading(false);
      setError(null);
      console.log('✅ Google Maps loaded successfully');
    } catch (err) {
      console.error('❌ Error initializing map:', err);
      setError('INIT_FAILED');
      setIsLoading(false);
    }
  };

  const updateMarkers = () => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: googleMapRef.current!,
        title: markerData.title,
        animation: window.google.maps.Animation.DROP,
      });

      // Add click listener to show info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px; font-weight: 600;">${markerData.title}</div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current!, marker);
      });

      markersRef.current.push(marker);
    });
  };

  // Fallback UI when API key is not configured
  if (error === 'API_KEY_NOT_CONFIGURED') {
    return (
      <div
        className={`w-full h-full min-h-[300px] rounded-lg flex flex-col items-center justify-center p-8 text-center ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
          border: '2px dashed rgba(139, 21, 56, 0.2)'
        }}
      >
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#0F172A' }}>
          Map Configuration Needed
        </h3>
        <p className="text-sm mb-4 max-w-md" style={{ color: '#64748B' }}>
          Google Maps API key is not configured. Please add your API key to display the interactive map.
        </p>
        <div className="text-xs font-mono p-3 rounded-lg mb-4" style={{ background: 'rgba(0, 0, 0, 0.05)', color: '#64748B' }}>
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        </div>
        <a
          href="https://console.cloud.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
            color: '#FFFFFF'
          }}
        >
          Get API Key →
        </a>
        <p className="text-xs mt-4" style={{ color: '#94A3B8' }}>
          See GOOGLE_MAPS_SETUP_GUIDE.md for instructions
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`w-full h-full min-h-[300px] rounded-lg flex items-center justify-center ${className}`}
        style={{ background: 'rgba(0, 0, 0, 0.02)' }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm" style={{ color: '#64748B' }}>Loading map...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`w-full h-full min-h-[300px] rounded-lg flex flex-col items-center justify-center p-8 text-center ${className}`}
        style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '2px dashed rgba(239, 68, 68, 0.2)'
        }}
      >
        <div className="text-5xl mb-3">⚠️</div>
        <h3 className="text-lg font-bold mb-2" style={{ color: '#DC2626' }}>
          Map Load Error
        </h3>
        <p className="text-sm" style={{ color: '#64748B' }}>
          {error === 'LOAD_FAILED' && 'Failed to load Google Maps API'}
          {error === 'LOAD_TIMEOUT' && 'Map loading timed out'}
          {error === 'INIT_FAILED' && 'Failed to initialize map'}
        </p>
        <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
          Check browser console for details
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`w-full h-full min-h-[300px] rounded-lg ${className}`}
      role="region"
      aria-label="Interactive map showing office location"
    />
  );
}
