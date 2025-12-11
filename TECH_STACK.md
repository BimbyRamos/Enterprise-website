# Tech Stack - Enterprise Corporate Website

## 🚀 Overview

This is a modern, enterprise-grade corporate website built with cutting-edge web technologies, focusing on performance, scalability, and premium user experience.

---

## 📦 Core Framework & Runtime

### **Next.js 14.2.0**
- **Type**: React Framework
- **Features Used**:
  - App Router (latest routing system)
  - Server Components
  - Client Components
  - Dynamic imports
  - Image optimization
  - Standalone output mode
  - Optimized CSS (experimental)
- **Why**: Industry-leading React framework with excellent SEO, performance, and developer experience

### **React 18.2.0**
- **Type**: UI Library
- **Features Used**:
  - Hooks (useState, useEffect, etc.)
  - Client-side interactivity
  - Component composition
  - Error boundaries
- **Why**: Most popular and mature UI library with excellent ecosystem

### **TypeScript 5.0+**
- **Type**: Programming Language
- **Configuration**: Strict mode enabled
- **Features**:
  - Type safety
  - IntelliSense support
  - Better refactoring
  - Compile-time error detection
- **Why**: Reduces bugs, improves code quality, and enhances developer productivity

---

## 🎨 Styling & Design

### **Tailwind CSS 3.4.0**
- **Type**: Utility-First CSS Framework
- **Custom Configuration**:
  - Custom color palette (Primary: #8B1538, Secondary: #2563EB)
  - Extended spacing system
  - Custom shadows (card, premium, glow effects)
  - Responsive breakpoints
  - Custom font sizes
- **Why**: Rapid development, consistent design, small bundle size

### **PostCSS 8.4.0**
- **Type**: CSS Processor
- **Purpose**: Transforms CSS with JavaScript plugins
- **Used For**: Tailwind CSS processing

### **Autoprefixer 10.4.0**
- **Type**: PostCSS Plugin
- **Purpose**: Automatically adds vendor prefixes for browser compatibility

---

## 🧪 Testing

### **Jest 30.2.0**
- **Type**: Testing Framework
- **Configuration**: jsdom environment for DOM testing
- **Purpose**: Unit and integration testing

### **React Testing Library 16.3.0**
- **Type**: Testing Utilities
- **Purpose**: Component testing with user-centric approach
- **Includes**:
  - @testing-library/jest-dom (custom matchers)
  - @testing-library/user-event (user interaction simulation)

### **fast-check 4.4.0**
- **Type**: Property-Based Testing Library
- **Purpose**: Generate test cases automatically
- **Why**: Catches edge cases that example-based tests miss

---

## 🛠️ Development Tools

### **ESLint 8.57.0**
- **Type**: Linter
- **Configuration**: Next.js recommended config
- **Purpose**: Code quality and consistency

### **Prettier 3.2.0**
- **Type**: Code Formatter
- **Purpose**: Consistent code formatting across the project

### **TypeScript Compiler**
- **Target**: ES2020
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` for root imports

---

## 🗺️ Maps & Location

### **Leaflet** (Dynamic Import)
- **Type**: Interactive Maps Library
- **Implementation**: Dynamically imported to avoid SSR issues
- **Purpose**: Display office locations with interactive maps
- **Features**:
  - Custom markers
  - Zoom controls
  - Responsive design

---

## 🏗️ Architecture & Patterns

### **App Router Structure**
```
app/
├── page.tsx                 # Homepage
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── contact/
│   └── page.tsx           # Contact page
├── services/
│   ├── page.tsx           # Services listing
│   └── [slug]/
│       └── page.tsx       # Individual service pages
└── industries/
    ├── page.tsx           # Industries listing
    └── [slug]/
        └── page.tsx       # Individual industry pages
```

### **Component Structure**
```
components/
├── Hero.tsx               # Hero section
├── Navigation.tsx         # Main navigation
├── Footer.tsx            # Footer
├── AboutUs.tsx           # About section
├── FeaturedServices.tsx  # Services showcase
├── Projects.tsx          # Projects portfolio
├── Industries.tsx        # Industries section
├── Contact.tsx           # Contact section
├── Map.tsx              # Interactive map
├── Button.tsx           # Reusable button
└── ErrorBoundary.tsx    # Error handling
```

### **API Layer**
```
lib/
└── api.ts               # API utilities and mock data
```

---

## 🎯 Design System

### **Color Palette**
- **Primary**: #8B1538 (Burgundy Red)
- **Secondary**: #2563EB (Blue)
- **Neutral**: Grayscale from #F8FAFC to #0F172A
- **Semantic**: Success, Warning, Error, Info colors

### **Typography**
- **Font Family**: Inter (sans-serif)
- **Sizes**: Responsive (h1-h6, body, small, caption)
- **Line Heights**: Optimized for readability

### **Spacing System**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### **Effects**
- **Shadows**: Card, card-hover, premium, glow
- **Transitions**: Fast (150ms), Medium (300ms), Slow (500ms)
- **Animations**: Float, shimmer, fade-in, pulse

---

## 🐳 Containerization

### **Docker**
- **Frontend Dockerfile**: Optimized Next.js container
- **Backend Dockerfile**: API server container
- **Strapi Dockerfile**: CMS container
- **Docker Compose**: Multi-container orchestration
  - Development mode (docker-compose.dev.yml)
  - Production mode (docker-compose.yml)

---

## 🌐 Browser Support

### **Modern Browsers**
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### **Features**
- WebP image format
- CSS Grid & Flexbox
- ES2020 JavaScript features
- CSS Custom Properties
- Backdrop filters (glassmorphism)

---

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: ≥ 1440px

### **Approach**
- Mobile-first design
- Fluid typography
- Responsive images
- Touch-friendly interactions

---

## ⚡ Performance Optimizations

### **Next.js Features**
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Automatic route-based splitting
- **Dynamic Imports**: Lazy loading for heavy components
- **Standalone Output**: Optimized production builds

### **Custom Optimizations**
- Lazy loading for maps (avoid SSR issues)
- Optimized CSS (experimental feature enabled)
- Minimal JavaScript bundles
- Efficient re-renders with React hooks

---

## 🔒 Security

### **Best Practices**
- TypeScript for type safety
- ESLint for code quality
- No sensitive data in client code
- Environment variables for configuration
- Strict mode enabled

---

## 📊 Key Features

### **UI/UX**
- ✅ Premium glassmorphism design
- ✅ Smooth animations and transitions
- ✅ Responsive across all devices
- ✅ Accessible components
- ✅ SEO optimized

### **Functionality**
- ✅ Dynamic routing
- ✅ Contact form with validation
- ✅ Interactive maps
- ✅ Service/Industry detail pages
- ✅ Error boundaries
- ✅ Loading states

### **Developer Experience**
- ✅ TypeScript for type safety
- ✅ Hot module replacement
- ✅ Fast refresh
- ✅ Path aliases (@/*)
- ✅ Prettier formatting
- ✅ ESLint linting
- ✅ Jest testing

---

## 🚀 Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

---

## 📦 Dependencies Summary

### **Production Dependencies** (3)
- next: 14.2.0
- react: 18.2.0
- react-dom: 18.2.0

### **Development Dependencies** (16)
- TypeScript & Types
- Testing libraries (Jest, React Testing Library, fast-check)
- Styling tools (Tailwind, PostCSS, Autoprefixer)
- Code quality (ESLint, Prettier)

**Total Package Size**: Minimal and optimized

---

## 🎨 Design Philosophy

### **Premium UI/UX**
- Apple-inspired glassmorphism
- Smooth micro-interactions
- Consistent spacing and typography
- Brand-focused color scheme
- Professional and modern aesthetic

### **Performance First**
- Minimal JavaScript
- Optimized images
- Code splitting
- Lazy loading
- Fast page loads

### **Developer Friendly**
- Type-safe codebase
- Clear component structure
- Reusable components
- Well-documented code
- Easy to maintain

---

## 🔮 Future Considerations

### **Potential Additions**
- [ ] Strapi CMS integration (Dockerfiles ready)
- [ ] Backend API (Dockerfile ready)
- [ ] Analytics integration
- [ ] A/B testing
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)
- [ ] Dark mode support

---

## 📝 Notes

- **Node Version**: Recommended 20.x LTS
- **Package Manager**: npm (can use yarn/pnpm)
- **Deployment**: Vercel, AWS, or any Node.js host
- **Environment**: Development and production configs ready

---

**Last Updated**: December 10, 2025
**Version**: 0.1.0
**Status**: Production Ready ✅
