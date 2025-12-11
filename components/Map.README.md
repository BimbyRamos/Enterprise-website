# Map Component

An interactive Google Maps component for displaying office locations with markers.

## Features

- **Interactive Map Display**: Shows an interactive Google Map with zoom and pan functionality
- **Custom Markers**: Displays markers for each location with custom titles
- **Info Windows**: Click on markers to see location names
- **Responsive**: Adapts to different screen sizes
- **SSR Safe**: Uses dynamic import to avoid server-side rendering issues
- **Accessible**: Includes proper ARIA labels for screen readers

## Prerequisites

You need a Google Maps API key. Get one from:
https://console.cloud.google.com/google/maps-apis/

Add it to your `.env.local` file:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Usage

```tsx
import Map from '@/components/Map';

<Map
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={15}
  markers={[
    {
      position: { lat: 40.7128, lng: -74.0060 },
      title: 'New York Office',
    },
  ]}
  className="h-[300px]"
/>
```

## Props

- `center` (required): Object with `lat` and `lng` properties for map center
- `zoom` (optional): Zoom level (default: 13)
- `markers` (optional): Array of marker objects with `position` and `title`
- `className` (optional): Additional CSS classes for styling

## Implementation Details

- Uses Google Maps JavaScript API
- Dynamically loads the API script on component mount
- Cleans up markers on component unmount
- Updates map center and markers when props change
- Includes map controls: zoom, map type, street view, fullscreen

## Accessibility

- Includes `role="region"` for screen readers
- Provides `aria-label` describing the map purpose
- Keyboard accessible through native Google Maps controls

## Requirements Validated

This component satisfies Requirement 7.4:
- Integrates Google Maps for office locations
- Displays interactive maps with zoom and pan functionality
- Shows markers with location names
